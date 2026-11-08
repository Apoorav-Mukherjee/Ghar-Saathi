import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingForm from "@/components/booking/BookingForm";

export default function BookPage() {
  return (
    <>
      <Navbar />

      <main>
        <BookingForm />
      </main>

      <Footer />
    </>
  );
}