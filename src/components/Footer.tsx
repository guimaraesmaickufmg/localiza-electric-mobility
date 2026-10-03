import React from 'react';
import { NavTab } from '../types';
import { ShieldCheck, Lock, Phone } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenContact }) => {
  return (
    <footer className="w-full bg-[#f1f3ff] mt-16 border-t border-[#dde2f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Purpose Column */}
          <div className="lg:col-span-2 flex flex-col gap-3 pr-4">
            <div className="flex items-center gap-1.5">
              <div className="w-8 h-8 rounded-xl bg-[#006b35] flex items-center justify-center text-white">
                <span className="font-extrabold text-lg">C|</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-extrabold text-xl text-[#006b35]">Localiza</span>
                <span className="text-gray-400 mx-1 font-light">|</span>
                <span className="font-bold text-base text-[#161c27]">Assinatura</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#daee00] ml-1 mb-1 inline-block"></span>
              </div>
            </div>

            <p className="text-sm text-[#3e4a3f] max-w-sm leading-relaxed">
              Sua mobilidade inteligente, flexível e sustentável. Carros zero km por assinatura com IPVA, seguro total, manutenção preventiva e assistência 24h inclusos na mensalidade.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#161c27] text-xs font-semibold shadow-2xs border border-[#dde2f3]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#006b35]" />
                <span>Site Seguro SSL</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#161c27] text-xs font-semibold shadow-2xs border border-[#dde2f3]">
                <Lock className="w-3.5 h-3.5 text-[#006b35]" />
                <span>Proteção de Dados LGPD</span>
              </div>
            </div>
          </div>

          {/* Links Column 1: Institucional */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold text-[#161c27] mb-1">Institucional</h4>
            <a href="#sobre" onClick={(e) => { e.preventDefault(); onSelectTab('inicio'); }} className="text-sm text-[#3e4a3f] hover:text-[#006b35] transition-colors">
              Sobre a Localiza
            </a>
            <a href="#esg" onClick={(e) => { e.preventDefault(); onSelectTab('mobilidade-eletrica'); }} className="text-sm text-[#3e4a3f] hover:text-[#006b35] transition-colors">
              Sustentabilidade & ESG
            </a>
            <a href="#imprensa" onClick={(e) => { e.preventDefault(); onSelectTab('inicio'); }} className="text-sm text-[#3e4a3f] hover:text-[#006b35] transition-colors">
              Sala de Imprensa
            </a>
            <a href="#trabalhe" onClick={(e) => { e.preventDefault(); onSelectTab('inicio'); }} className="text-sm text-[#3e4a3f] hover:text-[#006b35] transition-colors">
              Trabalhe Conosco
            </a>
          </div>

          {/* Links Column 2: Soluções & Elétricos */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold text-[#161c27] mb-1">Soluções & Elétricos</h4>
            <button onClick={() => onSelectTab('mobilidade-eletrica')} className="text-left text-sm text-[#3e4a3f] hover:text-[#006b35] transition-colors cursor-pointer">
              Veículos Elétricos & Híbridos
            </button>
            <button onClick={() => onSelectTab('carros-e-planos')} className="text-left text-sm text-[#3e4a3f] hover:text-[#006b35] transition-colors cursor-pointer">
              Planos Mensais e Anuais
            </button>
            <button onClick={() => onSelectTab('comparador')} className="text-left text-sm text-[#3e4a3f] hover:text-[#006b35] transition-colors cursor-pointer">
              Comparativo Compra x Assinatura
            </button>
            <button onClick={() => onSelectTab('voucher-exclusivo')} className="text-left text-sm text-[#3e4a3f] hover:text-[#006b35] transition-colors cursor-pointer">
              Voucher Exclusivo 48h
            </button>
            <button onClick={() => onSelectTab('planejador-com-ia')} className="text-left text-sm text-[#3e4a3f] hover:text-[#006b35] transition-colors cursor-pointer">
              Planejador de Rotas com IA
            </button>
          </div>

          {/* Links Column 3: Suporte & Contato */}
          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-bold text-[#161c27] mb-1">Suporte & Contato</h4>
            <button onClick={onOpenContact} className="text-left text-sm text-[#3e4a3f] hover:text-[#006b35] transition-colors cursor-pointer">
              Perguntas Frequentes (FAQ)
            </button>
            <button onClick={onOpenContact} className="text-left text-sm text-[#3e4a3f] hover:text-[#006b35] transition-colors cursor-pointer">
              Central de Atendimento
            </button>
            <div className="pt-2">
              <span className="text-[11px] text-[#3e4a3f] block font-medium">Atendimento Telefônico Gratuito</span>
              <a href="tel:08009792020" className="text-lg font-bold text-[#006b35] hover:underline flex items-center gap-1.5 mt-0.5">
                <Phone className="w-4 h-4" />
                0800 979 2020
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-6 border-t border-[#dde2f3] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#3e4a3f]">
          <div className="text-center md:text-left">
            © 2025 Localiza Rent a Car S.A. - Todos os direitos reservados. CNPJ 16.670.085/0001-55
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button onClick={onOpenContact} className="hover:text-[#006b35] transition-colors cursor-pointer">
              Termos e Privacidade
            </button>
            <span>•</span>
            <button onClick={onOpenContact} className="hover:text-[#006b35] transition-colors cursor-pointer">
              Política de Cookies
            </button>
            <span>•</span>
            <button onClick={onOpenContact} className="hover:text-[#006b35] transition-colors cursor-pointer">
              Segurança da Informação
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
