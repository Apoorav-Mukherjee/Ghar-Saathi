import {
  Sparkles,
  MapPin,
  CalendarDays,
  Headset,
} from "lucide-react";

const highlights = [
  {
    icon: Sparkles,
    value: "03",
    label: "Core household services",
  },
  {
    icon: MapPin,
    value: "01",
    label: "Launch city — Vrindavan",
  },
  {
    icon: CalendarDays,
    value: "Flexible",
    label: "One-time & monthly plans",
  },
  {
    icon: Headset,
    value: "Direct",
    label: "WhatsApp coordination",
  },
];

export default function Statistics() {
  return (
    <section className="bg-forest py-9">

      <div className="container-shell grid grid-cols-2 gap-8 md:grid-cols-4">

        {highlights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex flex-col items-center text-center md:items-start md:text-left"
            >

              <div className="flex items-center gap-2">

                <Icon size={19} className="text-lime" />

                <h3 className="text-2xl font-black tracking-tight text-lime sm:text-3xl">
                  {item.value}
                </h3>

              </div>

              <p className="mt-2 text-xs font-medium text-white/75 sm:text-sm">
                {item.label}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}