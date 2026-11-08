"use client";

import { useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";

type Address = {
  label: string;
  address: string;
  city: string;
  isDefault: boolean;
};

type ProfileFormProps = {
  initialPhone: string;
  initialAddresses: Address[];
};

export default function ProfileForm({
  initialPhone,
  initialAddresses,
}: ProfileFormProps) {
  const [phone, setPhone] = useState(initialPhone);

  const [addresses, setAddresses] = useState<Address[]>(
    initialAddresses
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function updateAddress(
    index: number,
    field: keyof Address,
    value: string | boolean
  ) {
    setAddresses((previous) =>
      previous.map((address, i) =>
        i === index ? { ...address, [field]: value } : address
      )
    );
  }

  function addAddress() {
    if (addresses.length >= 5) return;

    setAddresses((previous) => [
      ...previous,
      {
        label: "Home",
        address: "",
        city: "Vrindavan",
        isDefault: previous.length === 0,
      },
    ]);
  }

  function removeAddress(index: number) {
    setAddresses((previous) => {
      const updated = previous.filter((_, i) => i !== index);

      if (updated.length > 0 && !updated.some((a) => a.isDefault)) {
        updated[0].isDefault = true;
      }

      return updated;
    });
  }

  function setDefaultAddress(index: number) {
    setAddresses((previous) =>
      previous.map((address, i) => ({
        ...address,
        isDefault: i === index,
      }))
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: phone.trim(),
          addresses,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Profile update failed.");
      }

      setMessage("Your profile has been updated successfully.");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-forest";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
        <h2 className="text-xl font-bold text-ink">Contact details</h2>

        <p className="mt-2 text-sm text-muted">
          We use your mobile number to coordinate your bookings.
        </p>

        <label className="mt-6 block text-sm font-semibold text-ink">
          Mobile number
          <input
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Enter your 10-digit mobile number"
            maxLength={10}
            className={inputClass}
          />
        </label>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-ink">Saved addresses</h2>
            <p className="mt-2 text-sm text-muted">
              Save up to five addresses for quicker bookings.
            </p>
          </div>

          <button
            type="button"
            onClick={addAddress}
            disabled={addresses.length >= 5}
            className="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-3 text-sm font-semibold text-white disabled:opacity-50"
          >
            <Plus size={17} />
            Add address
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {addresses.map((address, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-bold text-ink">
                  Address {index + 1}
                </h3>

                <button
                  type="button"
                  onClick={() => removeAddress(index)}
                  className="inline-flex items-center gap-1 text-sm font-medium text-red-600"
                >
                  <Trash2 size={15} />
                  Remove
                </button>
              </div>

              <label className="mt-5 block text-sm font-semibold">
                Address label
                <input
                  value={address.label}
                  onChange={(event) =>
                    updateAddress(index, "label", event.target.value)
                  }
                  placeholder="Home, Work, etc."
                  className={inputClass}
                />
              </label>

              <label className="mt-4 block text-sm font-semibold">
                Full address
                <textarea
                  value={address.address}
                  onChange={(event) =>
                    updateAddress(index, "address", event.target.value)
                  }
                  placeholder="House number, street, landmark..."
                  rows={3}
                  className={inputClass}
                />
              </label>

              <label className="mt-4 block text-sm font-semibold">
                City
                <input
                  value={address.city}
                  onChange={(event) =>
                    updateAddress(index, "city", event.target.value)
                  }
                  placeholder="Vrindavan"
                  className={inputClass}
                />
              </label>

              <label className="mt-5 flex items-center gap-2 text-sm font-medium">
                <input
                  type="radio"
                  name="defaultAddress"
                  checked={address.isDefault}
                  onChange={() => setDefaultAddress(index)}
                  className="accent-forest"
                />
                Make this my default address
              </label>
            </div>
          ))}

          {addresses.length === 0 && (
            <p className="rounded-2xl bg-cream p-6 text-center text-sm text-muted">
              You haven't saved any addresses yet.
            </p>
          )}
        </div>
      </section>

      {message && (
        <p role="status" className="rounded-xl bg-green-50 p-4 text-sm text-green-700">
          {message}
        </p>
      )}

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-4 font-semibold text-white transition hover:bg-[#174D3B] disabled:opacity-60"
      >
        <Save size={18} />
        {loading ? "Saving changes..." : "Save profile"}
      </button>
    </form>
  );
}