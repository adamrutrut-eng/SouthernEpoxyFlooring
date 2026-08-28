import ScrollHero from './components/ScrollHero';
import WorkLoopBackground from './components/WorkLoopBackground';
import SystemSection from './components/SystemSection';
import FinishSelector from './components/FinishSelector';
import SpecsSection from './components/SpecsSection';
import SpacesSection from './components/SpacesSection';
import ReviewsSection from './components/ReviewsSection';
import PricingSection from './components/PricingSection';
import BookingSection from './components/BookingSection';
import ClosingCTA from './components/ClosingCTA';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main style={{ background: '#050505' }}>
      <ScrollHero />
      <div style={{ position: 'relative' }}>
        <WorkLoopBackground />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <SystemSection />
          <FinishSelector />
          <SpecsSection />
          <SpacesSection />
          <ReviewsSection />
          <PricingSection />
          <BookingSection />
          <ClosingCTA />
        </div>
      </div>
      <Footer />
    </main>
  );
}
