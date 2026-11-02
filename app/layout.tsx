import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home Services | Vrindavan",
  description: "Cleaning, laundry and cooking services in Vrindavan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}