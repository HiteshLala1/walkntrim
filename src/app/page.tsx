import { About } from "@/components/About";
import { BookingCTA } from "@/components/BookingCTA";
import { ClientReviews } from "@/components/ClientReviews";
import { Deals } from "@/components/Deals";
import { Footer } from "@/components/Footer";
import { GroomsPackages } from "@/components/GroomsPackages";
import { Hero } from "@/components/Hero";
import { Location } from "@/components/Location";
import { Navbar } from "@/components/Navbar";
import { PromoBanner } from "@/components/PromoBanner";
import { Services } from "@/components/Services";
import { SocialShowcase } from "@/components/SocialShowcase";
import { ValueStrip } from "@/components/ValueStrip";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <ValueStrip />
        <PromoBanner />
        <Deals />
        <Services />
        <GroomsPackages />
        <About />
        <ClientReviews />
        <SocialShowcase />
        <BookingCTA />
        <Location />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
