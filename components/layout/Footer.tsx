import Link from "next/link";
import { siteConfig } from "@/config/site";

const footerLinks = {
  services: [
    { name: "Home Cleaning", href: "/services/cleaning" },
    { name: "Laundry", href: "/services/laundry" },
    { name: "Personal Cooking", href: "/services/cooking" },
  ],

  company: [
    { name: "About Us", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ],

  support: [
    { name: "Pricing", href: "/pricing" },
    { name: "Book a Service", href: "/book" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0D1C16] text-white">

      <div className="container-shell py-16">

        {/* TOP FOOTER */}

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* BRAND */}

          <div>

            <Link href="/" className="text-2xl font-black tracking-tight">
              {siteConfig.name}
              <span className="text-lime">.</span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
              Making everyday household tasks easier with dependable
              cleaning, laundry and cooking assistance.
            </p>

            <p className="mt-5 text-xs font-semibold text-lime">
              PROUDLY SERVING {siteConfig.city.toUpperCase()}
            </p>

          </div>

          {/* SERVICES */}

          <div>

            <h3 className="font-bold">Our Services</h3>

            <ul className="mt-6 space-y-4">

              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition hover:text-lime"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* COMPANY */}

          <div>

            <h3 className="font-bold">Company</h3>

            <ul className="mt-6 space-y-4">

              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition hover:text-lime"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* SUPPORT */}

          <div>

            <h3 className="font-bold">Support</h3>

            <ul className="mt-6 space-y-4">

              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition hover:text-lime"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

        </div>

        {/* LARGE BRAND TEXT */}

        <div className="mt-20 overflow-hidden">

          <h2 className="whitespace-nowrap text-[15vw] font-black leading-none tracking-[-0.08em] text-lime">
            {siteConfig.name.toLowerCase()}
          </h2>

        </div>

        {/* BOTTOM FOOTER */}

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-xs text-white/50 sm:flex-row">

          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <p>
            Made with care for homes in {siteConfig.city}.
          </p>

        </div>

      </div>

    </footer>
  );
}