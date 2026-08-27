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
  // The quote form only exists when the server actually has SMTP
  // credentials — otherwise Calendly stands alone.
  const smtpConfigured = Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );

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
          <BookingSection smtpConfigured={smtpConfigured} />
          <ClosingCTA />
        </div>
      </div>
      <Footer />
    </main>
  );
}
