import React, { useState } from 'react';
import { NavTab, CarModel } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './pages/HomeView';
import { ElectricHubView } from './pages/ElectricHubView';
import { ComparatorView } from './pages/ComparatorView';
import { VoucherExclusiveView } from './pages/VoucherExclusiveView';
import { RoutePlannerView } from './pages/RoutePlannerView';
import { CarsCatalogView } from './pages/CarsCatalogView';
import { CarDetailModal } from './components/Modals/CarDetailModal';
import { BookingModal } from './components/Modals/BookingModal';
import { TermsModal } from './components/Modals/TermsModal';
import { AccountDrawer } from './components/Modals/AccountDrawer';
import { ContactModal } from './components/Modals/ContactModal';
import { Toast } from './components/Modals/Toast';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('inicio');
  const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleSelectTab = (tab: NavTab) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#161c27] flex flex-col font-sans">
      {/* Fixed Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenAccount={() => setAccountDrawerOpen(true)}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Main Content Area (padding top to account for fixed 2-tier header) */}
      <main className="flex-1 pt-28">
        {currentTab === 'inicio' && (
          <HomeView
            onSelectTab={handleSelectTab}
            onOpenCarDetail={(car) => setSelectedCar(car)}
          />
        )}

        {currentTab === 'carros-e-planos' && (
          <CarsCatalogView
            onSelectTab={handleSelectTab}
            onOpenCarDetail={(car) => setSelectedCar(car)}
          />
        )}

        {currentTab === 'comparador' && (
          <ComparatorView
            onSelectTab={handleSelectTab}
            onOpenCarDetail={(car) => setSelectedCar(car)}
          />
        )}

        {currentTab === 'mobilidade-eletrica' && (
          <ElectricHubView onSelectTab={handleSelectTab} />
        )}

        {currentTab === 'voucher-exclusivo' && (
          <VoucherExclusiveView
            onSelectTab={handleSelectTab}
            onOpenBookingModal={() => setBookingModalOpen(true)}
            onOpenTermsModal={() => setTermsModalOpen(true)}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'planejador-com-ia' && (
          <RoutePlannerView
            onSelectTab={handleSelectTab}
            onOpenCarDetail={(car) => setSelectedCar(car)}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Interactive Modals and Drawers */}
      <CarDetailModal
        car={selectedCar}
        onClose={() => setSelectedCar(null)}
        onNavigateToComparator={() => {
          setSelectedCar(null);
          handleSelectTab('comparador');
        }}
        onShowToast={showToast}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        onShowToast={showToast}
      />

      <TermsModal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
      />

      <AccountDrawer
        isOpen={accountDrawerOpen}
        onClose={() => setAccountDrawerOpen(false)}
        onSelectTab={handleSelectTab}
        onOpenBooking={() => {
          setAccountDrawerOpen(false);
          setBookingModalOpen(true);
        }}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        onShowToast={showToast}
      />

      <Toast message={toastMessage} onClear={() => setToastMessage(null)} />
    </div>
  );
}
