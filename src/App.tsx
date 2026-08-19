import React, { useState } from 'react';
import { SectorId, Currency } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SectorExplorer } from './components/SectorExplorer';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { QuickBookingModal } from './components/QuickBookingModal';
import { AboutSection } from './components/AboutSection';
import { ServiceCatalogModal } from './components/ServiceCatalogModal';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';

export default function App() {
  const [currentSector, setCurrentSector] = useState<SectorId>('food-beverages');
  const [currency, setCurrency] = useState<Currency>('NGN');

  // Modal States
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calculatorSector, setCalculatorSector] = useState<SectorId>('food-beverages');

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSector, setBookingSector] = useState<SectorId>('food-beverages');
  const [bookingServiceName, setBookingServiceName] = useState('');
  const [bookingEstimate, setBookingEstimate] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'NGN' ? 'USD' : 'NGN'));
  };

  const handleOpenCalculator = (sector?: SectorId) => {
    if (sector) setCalculatorSector(sector);
    else setCalculatorSector(currentSector);
    setIsCalculatorOpen(true);
  };

  const handleOpenBooking = (sector?: SectorId, serviceName?: string) => {
    if (sector) setBookingSector(sector);
    else setBookingSector(currentSector);
    setBookingServiceName(serviceName || '');
    setBookingEstimate('');
    setBookingNotes('');
    setIsBookingOpen(true);
  };

  const handleProceedFromCalculatorToBooking = (
    sector: SectorId,
    estimatedTotal: string,
    summary: string
  ) => {
    setBookingSector(sector);
    setBookingServiceName('Custom Calculated Package');
    setBookingEstimate(estimatedTotal);
    setBookingNotes(summary);
    setIsBookingOpen(true);
  };

  const handleCatalogBook = (sector: SectorId, serviceName: string) => {
    setBookingSector(sector);
    setBookingServiceName(serviceName);
    setBookingEstimate('');
    setBookingNotes(`Inquiry originated from the Master Catalog for ${serviceName}.`);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      
      {/* Fixed Navigation Bar */}
      <Navbar
        currentSector={currentSector}
        onSelectSector={setCurrentSector}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        onOpenCalculator={handleOpenCalculator}
        onOpenBooking={handleOpenBooking}
        onOpenCatalog={() => setIsCatalogOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Dynamic Hero Section */}
        <Hero
          currentSector={currentSector}
          onSelectSector={setCurrentSector}
          onOpenCalculator={handleOpenCalculator}
          onOpenBooking={handleOpenBooking}
        />

        {/* Interactive 4-Subsidiaries Explorer */}
        <SectorExplorer
          currentSector={currentSector}
          onSelectSector={setCurrentSector}
          currency={currency}
          onOpenCalculator={handleOpenCalculator}
          onOpenBooking={handleOpenBooking}
        />

        {/* Corporate Heritage, Mission, Vision & 5 Values */}
        <AboutSection 
          onOpenCatalog={() => setIsCatalogOpen(true)} 
        />

        {/* Client Reviews & Verified Testimonials */}
        <TestimonialsSection />

        {/* Comprehensive FAQs Knowledge Base */}
        <FaqSection />

        {/* Corporate Contact Hub, Branches & Messaging */}
        <ContactSection />
      </main>

      {/* Corporate Footer */}
      <Footer
        onSelectSector={setCurrentSector}
        onOpenCalculator={handleOpenCalculator}
        onOpenCatalog={() => setIsCatalogOpen(true)}
      />

      {/* Floating 24/7 WhatsApp Widget */}
      <WhatsAppFloatingButton />

      {/* Interactive Pricing Estimator Modal */}
      <QuoteCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        initialSector={calculatorSector}
        currency={currency}
        onProceedToBooking={handleProceedFromCalculatorToBooking}
      />

      {/* Quick Booking / RFP Modal */}
      <QuickBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialSector={bookingSector}
        initialServiceName={bookingServiceName}
        prefilledEstimate={bookingEstimate}
        prefilledNotes={bookingNotes}
      />

      {/* Comprehensive Service Catalog & Rate Directory Modal */}
      <ServiceCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        currency={currency}
        onBookService={handleCatalogBook}
      />

    </div>
  );
}
