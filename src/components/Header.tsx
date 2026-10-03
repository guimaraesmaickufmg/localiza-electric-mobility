import React, { useState } from 'react';
import { NavTab } from '../types';
import { Phone, User, Zap, Menu, X, MessageSquare } from 'lucide-react';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenAccount: () => void;
  onOpenContact: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenAccount,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; highlight?: boolean }[] = [
    { id: 'inicio', label: 'Início' },
    { id: 'carros-e-planos', label: 'Carros e Planos' },
    { id: 'comparador', label: 'Comparador' },
    { id: 'mobilidade-eletrica', label: 'Mobilidade Elétrica' },
    { id: 'voucher-exclusivo', label: 'Voucher Exclusivo' },
    { id: 'planejador-com-ia', label: 'Planejador com IA', highlight: true },
  ];

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm bg-white/95 backdrop-blur-md">
      {/* Top Banner Notice */}
      <div className="bg-[#006b35] text-white py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1.5 truncate">
            <Zap className="w-3.5 h-3.5 text-[#daee00] shrink-0 fill-current" />
            <span className="truncate">
              ⚡ Novidade: Descubra a Mobilidade Elétrica com planos por assinatura e autonomia garantida.
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <a
              href="tel:08009792020"
              className="hover:underline flex items-center gap-1 text-[11px] font-bold text-white"
            >
              <Phone className="w-3 h-3" />
              0800 979 2020
            </a>
            <span className="text-white/40">|</span>
            <span className="text-[11px] text-white/90">Atendimento 24h</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="border-b border-[#dde2f3]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo Zone */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            {/* Localiza Assinatura Logo Icon & Wordmark */}
            <div className="flex items-center gap-1.5">
              <div className="w-9 h-9 rounded-xl bg-[#006b35] flex items-center justify-center text-white shadow-xs">
                <span className="font-extrabold text-xl tracking-tighter">C|</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-extrabold text-2xl tracking-tight text-[#006b35]">Localiza</span>
                <span className="text-gray-400 mx-1.5 font-light text-xl">|</span>
                <span className="font-bold text-lg text-[#161c27]">Assinatura</span>
                <span className="w-2 h-2 rounded-full bg-[#daee00] ml-1 mb-2 inline-block"></span>
              </div>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#e3e8f9] text-[#161c27] shadow-xs font-bold'
                      : 'text-[#3e4a3f] hover:text-[#161c27] hover:bg-[#e8eeff]/60'
                  }`}
                >
                  {item.label}
                  {item.highlight && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-[10px] uppercase font-extrabold rounded bg-[#daee00] text-[#1a1e00]">
                      Novo
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Zone: Fale Conosco + Minha Conta */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#e8eeff] text-[#161c27] hover:bg-[#dde2f3] text-xs font-bold transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#006b35]" />
              <span>Fale Conosco</span>
            </button>

            <button
              onClick={onOpenAccount}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#006b35] text-white hover:bg-[#005227] text-xs font-bold transition-all shadow-xs cursor-pointer group"
            >
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="hidden xs:inline">Entrar / Minha Conta</span>
              <span className="xs:hidden">Conta</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-gray-200 px-4 pt-3 pb-6 space-y-1 shadow-lg animate-fadeIn">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#006b35] text-white'
                    : 'text-[#161c27] hover:bg-[#f1f3ff]'
                }`}
              >
                <span>{item.label}</span>
                {item.highlight && (
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                    isActive ? 'bg-[#daee00] text-[#1a1e00]' : 'bg-[#e8eeff] text-[#006b35]'
                  }`}>
                    IA
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenContact();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#f1f3ff] text-[#006b35] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Fale com um Especialista
            </button>
            <a
              href="tel:08009792020"
              className="w-full py-2 text-center text-xs text-gray-500 font-medium flex items-center justify-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              0800 979 2020 • Atendimento 24h
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
