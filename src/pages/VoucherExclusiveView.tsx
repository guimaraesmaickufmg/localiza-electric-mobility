import React, { useState } from 'react';
import { NavTab } from '../types';
import {
  Zap,
  CheckCircle2,
  Copy,
  Calendar,
  Info,
  QrCode,
  ShieldCheck,
  Lock,
  ChevronDown,
  Sparkles,
  Touchpad,
  MapPin,
  Key,
  ThumbsUp,
  BatteryCharging,
} from 'lucide-react';

interface VoucherExclusiveViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenBookingModal: () => void;
  onOpenTermsModal: () => void;
  onShowToast: (msg: string) => void;
}

export const VoucherExclusiveView: React.FC<VoucherExclusiveViewProps> = ({
  onSelectTab,
  onOpenBookingModal,
  onOpenTermsModal,
  onShowToast,
}) => {
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  const voucherCode = 'ELETRO-LOC-2025-X89';

  const copyCode = () => {
    navigator.clipboard?.writeText(voucherCode).catch(() => {});
    setCopied(true);
    onShowToast(`Código ${voucherCode} copiado com sucesso!`);
    setTimeout(() => setCopied(false), 3000);
  };

  const voucherFaqs = [
    {
      q: 'Quais documentos preciso apresentar na agência?',
      a: 'Você só precisa apresentar sua Carteira Nacional de Habilitação (CNH) válida e definitiva (categoria B ou superior) e um documento com foto original (ou aplicativo gov.br). O voucher digital será conferido pelo código ou QR code no seu smartphone.',
    },
    {
      q: 'O seguro e a assistência 24h estão inclusos na cortesia?',
      a: 'Sim! O voucher cobre a proteção integral do veículo contra colisões, roubo e danos a terceiros, além de assistência emergencial 24 horas por dia em todo o território nacional durante o período de 48 horas da sua experiência.',
    },
    {
      q: 'Como funciona a recarga e a devolução do veículo?',
      a: 'O carro é entregue com 100% de bateria carregada. Você pode recarregar gratuitamente em qualquer um dos eletropostos da rede parceira Localiza indicados no aplicativo. Na devolução, não há cobrança de taxa de recarga caso o nível da bateria esteja abaixo do inicial.',
    },
    {
      q: 'Posso transferir o voucher para um familiar ou colega?',
      a: 'O benefício é pessoal e intransferível, emitido exclusivamente em nome do titular do contrato de assinatura. No entanto, é permitido cadastrar um condutor adicional previamente no momento do agendamento sem nenhum custo extra.',
    },
  ];

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Breadcrumb */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-2">
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <button
            onClick={() => onSelectTab('inicio')}
            className="hover:text-[#006b35] transition-colors cursor-pointer"
          >
            Início
          </button>
          <span>/</span>
          <span>Benefícios</span>
          <span>/</span>
          <span className="text-[#161c27] font-semibold">Voucher Experiência Elétrica</span>
        </nav>
      </div>

      {/* Hero Header Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-12 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#adf3bb]/40 text-[#006b35] w-fit text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-[#006b35]" />
              <span>Benefício Exclusivo Para Clientes</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#161c27] tracking-tight leading-tight">
              Experimente a mobilidade{' '}
              <span className="text-[#006b35] underline decoration-[#daee00] decoration-4 underline-offset-4">
                elétrica
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#3e4a3f] max-w-2xl leading-relaxed">
              Você recebeu um voucher exclusivo para conhecer, na prática e na sua rotina, como um carro elétrico transforma seu dia a dia com torque instantâneo, silêncio absoluto e zero emissões.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#e8eeff] text-[#161c27] text-xs font-bold">
                <Zap className="w-4 h-4 text-[#006b35] fill-current" />
                <span>48h de Imersão Total</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#e8eeff] text-[#161c27] text-xs font-bold">
                <BatteryCharging className="w-4 h-4 text-[#006b35]" />
                <span>Recargas Inclusas</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#e8eeff] text-[#161c27] text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-[#006b35]" />
                <span>Seguro e Assistência 24h</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative overflow-hidden rounded-3xl shadow-xl bg-gray-100 group aspect-[4/3] border border-gray-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLdF8KqJz-zMqL9OMGtBKK5SNKuOIpP-iD0pCGXCFC-A8iXfri_rrnAI1jVKK35HWT1QdHIYSctmCbJz8hR71jWlKMgYihggk4eZrBkmNQAHw5u-T2He5GFKk0MFswQ-0Z24138Wd6nxqKzHpppFWj8NzbQb50J_Zwiz9hOUQbYH08vpKS49REH3LMgtuOYdlG5rV32gbr5e_hxi9L3mrdPNu9L9yVD91tJ7sxgXpYhy9PMKNxZREy"
                alt="Carro elétrico carregando"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] uppercase tracking-wide opacity-80 block">Modelo em Destaque</span>
                  <p className="text-sm font-bold">BYD Dolphin ou Similar 100% Elétrico</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#daee00] text-[#1a1e00] text-[11px] font-black flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-current" /> EV Puro
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIGITAL TICKET / BOARDING PASS SECTION */}
      <section className="w-full py-12 bg-[#f1f3ff] border-y border-[#dde2f3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-[#006b35] uppercase tracking-wider block">
              Passaporte de Test-Drive
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161c27] mt-1">
              Seu Bilhete de Experiência Elétrica
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              Apresente este bilhete digital na agência Localiza credenciada selecionada ou confirme seu agendamento online.
            </p>
          </div>

          {/* Ticket Container */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden relative border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Left Ticket Body (8 Cols) */}
              <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between relative bg-white">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#006b35] flex items-center justify-center text-white">
                        <Zap className="w-4 h-4 fill-current text-[#daee00]" />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 block uppercase leading-none font-bold">
                          Localiza
                        </span>
                        <span className="text-base font-extrabold text-[#006b35] tracking-tight">
                          Assinatura Premium
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#adf3bb] text-[#00210c] text-xs font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#006b35] animate-pulse"></span>
                      <span>DISPONÍVEL</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <span className="text-[10px] font-bold text-[#006b35] uppercase tracking-wider block">
                      Certificado de Cortesia
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#161c27] mt-1">
                      Voucher Experiência Elétrica Localiza
                    </h3>
                    <p className="text-xs text-[#3e4a3f] mt-2 leading-relaxed">
                      48 horas de experiência completa com um veículo 100% elétrico (
                      <strong className="text-[#161c27] font-semibold">BYD Dolphin ou similar</strong>) com franquia de 300 km inclusa, seguro de cobertura total e recargas liberadas na rede credenciada parceira.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                    <div className="p-3.5 rounded-2xl bg-[#f1f3ff] border border-gray-100">
                      <span className="text-[10px] text-gray-500 block">Cliente Titular Elegível</span>
                      <div className="text-sm font-bold text-[#161c27] mt-0.5">Mariana Albuquerque Silva</div>
                      <span className="text-[11px] text-[#006b35] font-semibold flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Cliente Ativa Assinatura
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#f1f3ff] border border-gray-100">
                      <span className="text-[10px] text-gray-500 block">Validade da Concessão</span>
                      <div className="text-sm font-bold text-[#161c27] mt-0.5">30 de Abril de 2025</div>
                      <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-1 font-medium">
                        Reserva prévia obrigatória
                      </span>
                    </div>
                  </div>
                </div>

                {/* Exclusive Code Box & Action Buttons */}
                <div className="pt-6 mt-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-[#e8eeff] border border-[#dde2f3]">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block">Código Exclusivo</span>
                      <span className="text-base sm:text-lg font-mono font-extrabold text-[#006b35] tracking-wider">
                        {voucherCode}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={copyCode}
                      className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 text-[#161c27] shadow-xs text-xs font-bold transition-all cursor-pointer border border-gray-200"
                    >
                      <Copy className="w-4 h-4 text-[#006b35]" />
                      <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onOpenBookingModal}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#006b35] hover:bg-[#005227] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Agendar Experiência</span>
                    </button>
                    <button
                      type="button"
                      onClick={onOpenTermsModal}
                      className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-[#f1f3ff] text-gray-700 hover:bg-gray-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Info className="w-4 h-4 text-gray-500" />
                      <span>Ver Regras do Benefício</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Ticket Stub (4 Cols - Green QR Code side) */}
              <div className="md:col-span-4 bg-[#006b35] text-white p-6 sm:p-8 flex flex-col items-center justify-between relative text-center">
                {/* Perforated edge notches */}
                <div className="absolute -left-3 top-0 bottom-0 hidden md:flex flex-col justify-around py-4 z-10">
                  <div className="w-6 h-6 rounded-full bg-[#f1f3ff] -ml-3"></div>
                  <div className="w-6 h-6 rounded-full bg-[#f1f3ff] -ml-3"></div>
                  <div className="w-6 h-6 rounded-full bg-[#f1f3ff] -ml-3"></div>
                  <div className="w-6 h-6 rounded-full bg-[#f1f3ff] -ml-3"></div>
                </div>

                <div className="w-full flex flex-col items-center">
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-[#daee00] text-[10px] uppercase font-bold tracking-widest mb-3">
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Token Digital</span>
                  </div>
                  <span className="text-xs text-white/80">Apresentação Presencial</span>
                  <p className="text-sm font-bold mt-0.5 text-white">Escaneie no Balcão</p>

                  {/* High fidelity SVG QR Code */}
                  <div className="mt-4 p-3 bg-white rounded-2xl shadow-lg">
                    <svg className="w-36 h-36" fill="none" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
                      <rect fill="white" height="140" rx="12" width="140"></rect>
                      <rect fill="#006b35" height="36" rx="4" width="36" x="16" y="16"></rect>
                      <rect fill="white" height="24" rx="2" width="24" x="22" y="22"></rect>
                      <rect fill="#006b35" height="12" width="12" x="28" y="28"></rect>
                      <rect fill="#006b35" height="36" rx="4" width="36" x="88" y="16"></rect>
                      <rect fill="white" height="24" rx="2" width="24" x="94" y="22"></rect>
                      <rect fill="#006b35" height="12" width="12" x="100" y="28"></rect>
                      <rect fill="#006b35" height="36" rx="4" width="36" x="16" y="88"></rect>
                      <rect fill="white" height="24" rx="2" width="24" x="22" y="94"></rect>
                      <rect fill="#006b35" height="12" width="12" x="28" y="100"></rect>
                      <rect fill="#161c27" height="8" width="16" x="60" y="16"></rect>
                      <rect fill="#161c27" height="24" width="8" x="68" y="28"></rect>
                      <rect fill="#161c27" height="8" width="32" x="20" y="60"></rect>
                      <rect fill="#008744" height="20" width="20" x="60" y="60"></rect>
                      <rect fill="#161c27" height="12" width="12" x="88" y="60"></rect>
                      <rect fill="#161c27" height="8" width="16" x="108" y="68"></rect>
                      <rect fill="#161c27" height="16" width="16" x="60" y="88"></rect>
                      <rect fill="#161c27" height="24" width="8" x="84" y="88"></rect>
                      <rect fill="#161c27" height="12" width="24" x="100" y="96"></rect>
                      <rect fill="#161c27" height="12" width="24" x="68" y="112"></rect>
                      <rect fill="#006b35" height="8" width="20" x="104" y="116"></rect>
                    </svg>
                  </div>
                  <span className="font-mono text-[11px] text-white/70 mt-2 font-semibold">
                    ID: LOC-EV-884920
                  </span>
                </div>

                <div className="mt-4 pt-2 text-center border-t border-white/10 w-full">
                  <span className="text-[11px] text-[#daee00] block font-extrabold">Recarga Garantida</span>
                  <p className="text-[11px] text-white/80 mt-0.5 leading-snug">
                    Entregue com 100% de bateria sem custo extra de reabastecimento na devolução.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS: 4 SIMPLE STEPS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#006b35] uppercase tracking-wider block">
            Passo a Passo Simples
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161c27] mt-1">
            Como Funciona a Sua Experiência
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Sem burocracia: veja como é fácil vivenciar o futuro da condução automotiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#e8eeff] text-[#006b35] flex items-center justify-center font-bold text-base mb-4 group-hover:bg-[#006b35] group-hover:text-white transition-colors">
                1
              </div>
              <h3 className="text-base font-bold text-[#161c27]">Escolha a Data</h3>
              <p className="text-xs text-[#3e4a3f] mt-2 leading-relaxed">
                Selecione no app ou portal o melhor período de 48 horas (incluindo fins de semana) para testar no seu ritmo.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[#006b35] text-xs font-semibold">
              <Touchpad className="w-4 h-4" />
              <span>Reserva 100% digital</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#e8eeff] text-[#006b35] flex items-center justify-center font-bold text-base mb-4 group-hover:bg-[#006b35] group-hover:text-white transition-colors">
                2
              </div>
              <h3 className="text-base font-bold text-[#161c27]">Selecione a Agência</h3>
              <p className="text-xs text-[#3e4a3f] mt-2 leading-relaxed">
                Escolha uma das agências credenciadas dotadas de pontos de recarga ultrarrápida mais perto de casa ou trabalho.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[#006b35] text-xs font-semibold">
              <MapPin className="w-4 h-4" />
              <span>Rede nacional credenciada</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#e8eeff] text-[#006b35] flex items-center justify-center font-bold text-base mb-4 group-hover:bg-[#006b35] group-hover:text-white transition-colors">
                3
              </div>
              <h3 className="text-base font-bold text-[#161c27]">Retire Pronto para Rodar</h3>
              <p className="text-xs text-[#3e4a3f] mt-2 leading-relaxed">
                Pegue as chaves e receba uma rápida orientação de bordo. O carro estará 100% carregado e pronto para 300 km.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[#006b35] text-xs font-semibold">
              <Key className="w-4 h-4" />
              <span>Check-in ágil em 3 minutos</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#e8eeff] text-[#006b35] flex items-center justify-center font-bold text-base mb-4 group-hover:bg-[#006b35] group-hover:text-white transition-colors">
                4
              </div>
              <h3 className="text-base font-bold text-[#161c27]">Avalie na sua Rotina</h3>
              <p className="text-xs text-[#3e4a3f] mt-2 leading-relaxed">
                Teste autonomia, silêncio ao rodar e carregamento residencial ou público. Decida com segurança sua próxima assinatura.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[#006b35] text-xs font-semibold">
              <ThumbsUp className="w-4 h-4" />
              <span>Decisão sem pressão comercial</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPARENCY & PRIVACY NOTICE */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="p-6 rounded-3xl bg-[#f1f3ff] border border-[#dde2f3] flex flex-col md:flex-row items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#006b35]/10 text-[#006b35] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-[#161c27]">
              Transparência e Diretrizes de Privacidade Localiza
            </h4>
            <p className="text-xs text-[#3e4a3f] mt-1 leading-relaxed">
              Este benefício é ofertado exclusivamente a clientes ativos com cadastro regular, sujeito a disponibilidade de frota na região desejada e vigência da campanha. Seus dados cadastrais são tratados com estrita segurança, conformidade total com a LGPD e nunca compartilhados externamente com fins de telemetria invasiva ou pontuações de crédito.
            </p>
          </div>
          <div className="shrink-0">
            <span className="px-3 py-1.5 rounded-full bg-white text-[#161c27] text-xs font-semibold flex items-center gap-1.5 shadow-2xs border border-[#dde2f3]">
              <Lock className="w-3.5 h-3.5 text-[#006b35]" />
              <span>Ambiente Seguro LGPD</span>
            </span>
          </div>
        </div>
      </section>

      {/* VOUCHER FAQS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-[#006b35] uppercase tracking-wider block">
              Tire Suas Dúvidas
            </span>
            <h2 className="text-2xl font-bold text-[#161c27] mt-1">Perguntas Frequentes sobre o Voucher</h2>
          </div>

          <div className="space-y-3">
            {voucherFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-[#161c27] hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        isOpen ? 'rotate-180 text-[#006b35]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-[#3e4a3f] leading-relaxed border-t border-gray-50">
                      <p className="mt-2">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
