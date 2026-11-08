import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const profileSchema = z.object({
  phone: z.union([
    z.literal(""),
    z.string().regex(/^[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
  ]),
  addresses: z.array(
    z.object({
      label: z.string().trim().min(1).max(40),
      address: z.string().trim().min(5).max(500),
      city: z.string().trim().min(2).max(80),
      isDefault: z.boolean(),
    })
  ).max(5),
});

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Please sign in first." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = profileSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0]?.message || "Invalid profile details.",
        },
        { status: 400 }
      );
    }

    const { phone, addresses } = validation.data;

    // Allow at most one default address.
    if (addresses.filter((address) => address.isDefault).length > 1) {
      return NextResponse.json(
        { success: false, message: "Only one address can be the default." },
        { status: 400 }
      );
    }

    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      {
        $set: {
          phone,
          addresses,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("_id");

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: "Customer account not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your profile has been updated.",
    });
  } catch (error) {
    console.error("Profile update error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update your profile right now." },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Please sign in first." },
        { status: 401 }
      );
    }

    await connectDB();

    const customer = await User.findById(session.user.id)
      .select("name email phone addresses")
      .lean();

    if (!customer) {
      return NextResponse.json(
        { success: false, message: "Customer account not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      profile: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone || "",
        addresses: customer.addresses || [],
      },
    });
  } catch (error) {
    console.error("Profile fetch error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to load your profile." },
      { status: 500 }
    );
  }
}