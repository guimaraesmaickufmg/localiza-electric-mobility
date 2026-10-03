import React from 'react';
import { X, User, Car, Zap, Shield, Phone, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { NavTab } from '../../types';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tab: NavTab) => void;
  onOpenBooking: () => void;
}

export const AccountDrawer: React.FC<AccountDrawerProps> = ({
  isOpen,
  onClose,
  onSelectTab,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#006b35] text-white flex items-center justify-center font-bold text-lg">
                  MA
                </div>
                <div>
                  <h3 className="font-bold text-[#161c27]">Mariana Albuquerque Silva</h3>
                  <span className="text-xs text-[#006b35] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Cliente Ativa Assinatura
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Active Subscription Contract Card */}
            <div className="mt-6 p-4 rounded-2xl bg-[#f1f3ff] border border-[#dde2f3] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                  Contrato Ativo • #LOC-2024-8910
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#adf3bb] text-[#006b35]">
                  EM VIGÊNCIA
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center p-1 border border-gray-200">
                  <Car className="w-7 h-7 text-[#006b35]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#161c27]">BYD Dolphin EV 44.9 kWh</h4>
                  <p className="text-xs text-gray-500">Placa: ABC-1D23 • 36 meses</p>
                </div>
              </div>

              {/* Franquia Status Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Franquia do mês</span>
                  <span className="font-bold text-[#161c27]">650 km / 1.500 km</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-full bg-[#006b35] rounded-full" style={{ width: '43.3%' }}></div>
                </div>
                <span className="text-[10px] text-gray-400 block text-right">850 km disponíveis até 28/04</span>
              </div>
            </div>

            {/* Exclusive Voucher Quick Action */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-[#daee00]/30 to-[#f1f3ff] border border-[#daee00]/50 space-y-2.5">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#586100] fill-current" />
                <span className="text-xs font-bold text-[#1a1e00] uppercase tracking-wide">
                  Benefício Cortesia Disponível
                </span>
              </div>
              <h4 className="font-bold text-sm text-[#161c27]">Voucher Experiência Elétrica 48h</h4>
              <p className="text-xs text-gray-600 leading-snug">
                Código: <span className="font-mono font-bold text-[#006b35]">ELETRO-LOC-2025-X89</span> (Válido até 30 de Abril de 2025)
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#006b35] text-white text-xs font-bold hover:bg-[#005227] transition-colors cursor-pointer"
                >
                  Agendar Agora
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onSelectTab('voucher-exclusivo');
                  }}
                  className="py-2 px-3 rounded-xl bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-1"
                >
                  Ver Bilhete <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Quick Services Links */}
            <div className="mt-6 space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block px-1">
                Serviços do Assinante
              </span>
              <button
                onClick={() => {
                  onClose();
                  onSelectTab('planejador-com-ia');
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e8eeff] flex items-center justify-center text-[#006b35]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#161c27] block">Planejador de Viagens IA</span>
                    <span className="text-[11px] text-gray-400">Verifique paradas e impacto na franquia</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </button>

              <button
                onClick={() => {
                  onClose();
                  onSelectTab('comparador');
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e8eeff] flex items-center justify-center text-[#006b35]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#161c27] block">Comparar Outros Modelos</span>
                    <span className="text-[11px] text-gray-400">Upgrade de plano e novos elétricos</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Bottom SOS & Assistance */}
          <div className="pt-6 border-t border-gray-100 space-y-3">
            <div className="p-3 bg-gray-50 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Assistência 24h & Guincho</span>
                <span className="text-xs font-bold text-[#161c27]">0800 979 2020</span>
              </div>
              <a
                href="tel:08009792020"
                className="p-2 rounded-xl bg-[#006b35] text-white hover:bg-[#005227] transition-colors"
                title="Ligar para assistência"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Fechar Painel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
