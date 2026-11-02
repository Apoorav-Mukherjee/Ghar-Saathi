import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import Statistics from "@/components/home/Statistics";
import AboutSection from "@/components/home/AboutSection";
import Services from "@/components/home/Services";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";
import BookingCTA from "@/components/home/BookingCTA";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>

        <Hero />

        <Statistics />

        <AboutSection />

        <Services />

        <HowItWorks />

        <Pricing />

        <BookingCTA />
      </main>

      <Footer />
    </>
  );
}