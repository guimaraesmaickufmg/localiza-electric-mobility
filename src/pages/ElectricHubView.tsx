import React, { useState } from 'react';
import { NavTab } from '../types';
import { FAQS_ELECTRIC } from '../data/mockData';
import {
  Zap,
  Calculator,
  Compass,
  CreditCard,
  BatteryCharging,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingDown,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';

interface ElectricHubViewProps {
  onSelectTab: (tab: NavTab) => void;
}

export const ElectricHubView: React.FC<ElectricHubViewProps> = ({ onSelectTab }) => {
  // Calculator state
  const [distanceKm, setDistanceKm] = useState(1500);
  const [combustionEfficiency, setCombustionEfficiency] = useState(11.5); // km/l
  const [electricConsumption, setElectricConsumption] = useState(14.5); // kWh / 100km
  const [fuelPrice, setFuelPrice] = useState(5.89); // R$/L
  const [homeTariff, setHomeTariff] = useState(0.85); // R$/kWh
  const [publicShare, setPublicShare] = useState(0.2); // 20%
  const [expandedFaq, setExpandedFaq] = useState<string | null>('1');

  // Math calculation
  const publicTariff = 2.1; // avg rapid charger
  const blendedKwhPrice = homeTariff * (1 - publicShare) + publicTariff * publicShare;

  // Monthly costs
  const monthlyFuelCost = (distanceKm / combustionEfficiency) * fuelPrice;
  const monthlyEnergyCost = (distanceKm / 100) * electricConsumption * blendedKwhPrice;

  // Maintenance R$/km
  const monthlyMaintComb = distanceKm * 0.26;
  const monthlyMaintEv = distanceKm * 0.12;

  const totalMonthlyComb = monthlyFuelCost + monthlyMaintComb;
  const totalMonthlyEv = monthlyEnergyCost + monthlyMaintEv;

  const monthlySavings = Math.max(0, totalMonthlyComb - totalMonthlyEv);
  const annualSavings = monthlySavings * 12;

  const combustionBarPct = 100;
  const evBarPct = Math.min(100, Math.max(15, (totalMonthlyEv / totalMonthlyComb) * 100));

  const formatBRL = (val: number) =>
    `R$ ${Math.round(val).toLocaleString('pt-BR')},00`;

  const scrollToCalculator = () => {
    document.getElementById('simulador-calculadora')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full">
      {/* TOP HERO SECTION */}
      <section className="w-full relative overflow-hidden bg-gradient-to-b from-[#f1f3ff] via-[#f9f9ff] to-white pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 pt-4 mb-6 text-xs text-gray-500 font-medium">
            <button
              onClick={() => onSelectTab('inicio')}
              className="hover:text-[#006b35] transition-colors cursor-pointer"
            >
              Início
            </button>
            <span>/</span>
            <span className="text-[#006b35] font-bold">Mobilidade elétrica</span>
          </nav>

          {/* Main Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#daee00] text-[#1a1e00] font-bold text-xs shadow-xs">
                <Zap className="w-3.5 h-3.5 text-[#586100] fill-current" />
                <span>HUB DE TRANSIÇÃO ENERGÉTICA</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#161c27] tracking-tight leading-tight">
                Será que um carro elétrico combina com a{' '}
                <span className="text-[#006b35] underline decoration-[#daee00] decoration-4 underline-offset-4">
                  sua rotina?
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#3e4a3f] max-w-2xl leading-relaxed">
                Compare custos em tempo real, entenda a autonomia real nas capitais brasileiras e descubra como a assinatura Localiza elimina todas as dúvidas e custos invisíveis.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={scrollToCalculator}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#006b35] hover:bg-[#005227] text-white font-bold text-sm transition-all shadow-md cursor-pointer"
                >
                  <Calculator className="w-4 h-4" />
                  <span>Simular minha economia</span>
                </button>
                <button
                  type="button"
                  onClick={() => onSelectTab('planejador-com-ia')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#e8eeff] hover:bg-[#dde2f3] text-[#161c27] font-bold text-sm transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#006b35]" />
                  <span>Planejar uma rota com IA</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-xs border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-[#adf3bb]/40 flex items-center justify-center text-[#006b35] shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#161c27]">Custos personalizados</p>
                    <p className="text-[11px] text-gray-500">Cálculo km e tarifas reais</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-xs border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-[#daee00]/40 flex items-center justify-center text-[#586100] shrink-0">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#161c27]">Rotas com recargas</p>
                    <p className="text-[11px] text-gray-500">Rede pública e rápida</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-xs border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-[#adf3bb]/40 flex items-center justify-center text-[#006b35] shrink-0">
                    <BatteryCharging className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#161c27]">Estimativa real</p>
                    <p className="text-[11px] text-gray-500">Autonomia garantida</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Photography Anchor */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gray-100 border border-gray-100">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrW6i8YS9xXCWp35oLCjgzOCZTlG7Xq6tUHnIvzP_8eTX4DAfYcawzBxZEz_tY-4PCfQY5VIEt5rBJ-oKLomRGD8nE7HqoDKIuSktSELXsnXPk_n0cD9plpxY5nGW06eaI3Psb_gPR4x9yEfZ0I_9GPVx872B6G-p10N7lrk44kQc9VDK6UICG-zDzRVSAn9AjqnnOelkevDLeTg0C2NyLbcfCh8ojZyNKBmt2AVjMZLloQG9kz6Nv"
                  alt="Carro elétrico carregando"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 lg:h-96 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl backdrop-blur-md bg-white/95 border border-white/20 flex items-center justify-between">
                  <div>
                    <span className="text-[#006b35] text-[10px] block uppercase tracking-wider font-extrabold">
                      100% Elétrico Localiza
                    </span>
                    <span className="text-[#161c27] text-sm font-bold">BYD Dolphin GS & Yuan Plus</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500 text-[10px] block font-semibold">Autonomia WLTP</span>
                    <span className="text-[#006b35] text-lg font-black">405 km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN SECTION: SIMULATOR & FAQS */}
      <section id="simulador-calculadora" className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Cost Simulator Form & Calculation Results */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Input Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-white shadow-md border border-gray-100">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <div>
                  <span className="text-xs font-bold text-[#006b35] uppercase tracking-wider block">
                    Calculadora Dinâmica
                  </span>
                  <h2 className="text-xl font-bold text-[#161c27]">Compare os custos na sua rotina</h2>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#adf3bb]/50 flex items-center justify-center text-[#006b35] shrink-0">
                  <Calculator className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-4">
                {/* Row 1: Vehicle selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Veículo a combustão atual
                    </label>
                    <select
                      value={combustionEfficiency}
                      onChange={(e) => setCombustionEfficiency(parseFloat(e.target.value))}
                      className="w-full h-11 px-3 rounded-lg bg-[#f1f3ff] text-xs font-medium text-[#161c27] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b35] cursor-pointer"
                    >
                      <option value={11.5}>Sedan 1.0 Turbo Flex (11,5 km/l)</option>
                      <option value={9.8}>SUV Compacto Flex (9,8 km/l)</option>
                      <option value={13.2}>Hatch Compacto 1.0 (13,2 km/l)</option>
                      <option value={8.5}>SUV Médio Flex (8,5 km/l)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Veículo elétrico desejado
                    </label>
                    <select
                      value={electricConsumption}
                      onChange={(e) => setElectricConsumption(parseFloat(e.target.value))}
                      className="w-full h-11 px-3 rounded-lg bg-[#f1f3ff] text-xs font-medium text-[#161c27] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b35] cursor-pointer"
                    >
                      <option value={14.5}>BYD Dolphin EV (14,5 kWh/100km)</option>
                      <option value={15.8}>BYD Yuan Plus EV (15,8 kWh/100km)</option>
                      <option value={14.0}>GWM Ora 03 Skin (14,0 kWh/100km)</option>
                      <option value={16.7}>Volvo EX30 (16,7 kWh/100km)</option>
                    </select>
                  </div>
                </div>

                {/* Distance Slider */}
                <div className="bg-[#f1f3ff] p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-700">Distância mensal estimada</span>
                    <span className="text-base font-extrabold text-[#006b35]">
                      {distanceKm.toLocaleString('pt-BR')} km/mês
                    </span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={4000}
                    step={100}
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(parseInt(e.target.value, 10))}
                    className="w-full accent-[#006b35] h-2 bg-gray-200 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-medium">
                    <span>500 km</span>
                    <span>2.000 km</span>
                    <span>4.000 km</span>
                  </div>
                </div>

                {/* Rates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Preço da Gasolina (R$/L)
                    </label>
                    <input
                      type="number"
                      step={0.05}
                      value={fuelPrice}
                      onChange={(e) => setFuelPrice(parseFloat(e.target.value) || 0)}
                      className="w-full h-11 px-3 rounded-lg bg-[#f1f3ff] text-xs font-medium text-[#161c27] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b35]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Tarifa Residencial (R$/kWh)
                    </label>
                    <input
                      type="number"
                      step={0.05}
                      value={homeTariff}
                      onChange={(e) => setHomeTariff(parseFloat(e.target.value) || 0)}
                      className="w-full h-11 px-3 rounded-lg bg-[#f1f3ff] text-xs font-medium text-[#161c27] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b35]"
                    />
                  </div>
                </div>

                {/* % in public chargers */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Divisão de Recarga (Pública Rápida vs Residencial)
                  </label>
                  <select
                    value={publicShare}
                    onChange={(e) => setPublicShare(parseFloat(e.target.value))}
                    className="w-full h-11 px-3 rounded-lg bg-[#f1f3ff] text-xs font-medium text-[#161c27] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b35] cursor-pointer"
                  >
                    <option value={0.1}>10% pública / 90% em casa (Uso Urbano Típico)</option>
                    <option value={0.2}>20% pública / 80% em casa (Misto)</option>
                    <option value={0.4}>40% pública / 60% em casa (Viagens Frequentes)</option>
                    <option value={0.8}>80% pública / 20% em casa (Sem tomada própria)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* RESULTS CARD */}
            <div className="p-6 md:p-8 rounded-2xl bg-white shadow-xl border border-gray-100 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#006b35] uppercase tracking-wider block">
                    Resultado da Projeção
                  </span>
                  <h3 className="text-lg font-bold text-[#161c27]">Economia operacional direta</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#adf3bb] text-[#00210c] text-xs font-bold">
                  Base {distanceKm.toLocaleString('pt-BR')} km
                </span>
              </div>

              {/* Visual Comparison Bar Chart */}
              <div className="bg-[#f1f3ff] p-4 rounded-xl flex flex-col gap-3">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  Custo Mensal Consolidado (Energia + Manutenção)
                </span>

                {/* Combustion Bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span> Carro Combustão
                    </span>
                    <span className="font-bold text-[#161c27]">{formatBRL(totalMonthlyComb)} /mês</span>
                  </div>
                  <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-[#ba1a1a]/80 rounded-full transition-all duration-500"
                      style={{ width: `${combustionBarPct}%` }}
                    ></div>
                  </div>
                </div>

                {/* Electric Bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-[#006b35] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#006b35]"></span> Carro Elétrico Localiza
                    </span>
                    <span className="font-extrabold text-[#006b35]">{formatBRL(totalMonthlyEv)} /mês</span>
                  </div>
                  <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-[#006b35] rounded-full transition-all duration-500"
                      style={{ width: `${evBarPct}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Quantitative Breakdown Grid */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-xl bg-[#f1f3ff]">
                  <span className="text-[10px] text-gray-500 block">Combustível mensal</span>
                  <span className="text-base font-bold text-[#161c27]">{formatBRL(monthlyFuelCost)}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f1f3ff]">
                  <span className="text-[10px] text-gray-500 block">Eletricidade mensal</span>
                  <span className="text-base font-bold text-[#006b35]">{formatBRL(monthlyEnergyCost)}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f1f3ff]">
                  <span className="text-[10px] text-gray-500 block">Manutenção combustão</span>
                  <span className="text-base font-bold text-[#161c27]">{formatBRL(monthlyMaintComb)}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f1f3ff]">
                  <span className="text-[10px] text-gray-500 block">Manutenção elétrico</span>
                  <span className="text-base font-bold text-[#006b35]">{formatBRL(monthlyMaintEv)}</span>
                </div>
              </div>

              {/* Highlight Annual & Monthly Total */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#e8eeff]">
                  <span className="text-[11px] text-gray-500 block">Economia Mensal Líquida</span>
                  <span className="text-2xl font-black text-[#006b35]">{formatBRL(monthlySavings)}</span>
                  <span className="text-[11px] text-gray-500 block mt-0.5">no bolso todo mês</span>
                </div>
                <div className="p-4 rounded-xl bg-[#e8eeff]">
                  <span className="text-[11px] text-gray-500 block">Economia Anual Estimada</span>
                  <span className="text-2xl font-black text-[#296b3f]">{formatBRL(annualSavings)}</span>
                  <span className="text-[11px] text-gray-500 block mt-0.5">em 12 meses rodados</span>
                </div>
              </div>

              {/* Yellow Highlight Banner */}
              <div className="p-4 rounded-xl bg-[#daee00] text-[#1a1e00] flex items-start gap-3 shadow-xs">
                <Zap className="w-6 h-6 text-[#006b35] shrink-0 fill-current" />
                <div className="text-xs font-bold leading-snug">
                  ⚡ Neste cenário, o elétrico apresenta o menor custo de uso com economia superior a 65% em energia e 50% em manutenção.
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: 8 Comprehensive FAQs Accordion */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#adf3bb]/50 text-[#006b35] text-xs font-bold uppercase tracking-wider mb-2">
                Tire Suas Dúvidas
              </div>
              <h2 className="text-2xl font-bold text-[#161c27]">Perguntas frequentes sobre elétricos</h2>
              <p className="text-xs text-gray-500 mt-1">
                Tudo o que você precisa saber para assinar com total tranquilidade.
              </p>
            </div>

            <div className="space-y-3">
              {FAQS_ELECTRIC.map((faq) => {
                const isOpen = expandedFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-xl bg-white shadow-xs border border-gray-100 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 text-sm font-bold text-[#161c27] hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-[#f1f3ff] flex items-center justify-center text-[#006b35] shrink-0">
                          <Zap className="w-3.5 h-3.5 fill-current" />
                        </span>
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          isOpen ? 'rotate-180 text-[#006b35]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#3e4a3f] leading-relaxed space-y-2 border-t border-gray-50 animate-fadeIn">
                        <p>{faq.answer}</p>
                        {faq.tip && (
                          <div className="p-3 rounded-lg bg-[#f1f3ff] flex items-start gap-2 text-xs font-medium text-[#161c27]">
                            <Lightbulb className="w-4 h-4 text-[#006b35] shrink-0 mt-0.5" />
                            <span>
                              <strong>Dica prática:</strong> {faq.tip}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CONVERSION CARD (Screen 5 Teaser) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#006b35] to-[#004d25] text-white p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#daee00] text-[#1a1e00] text-xs font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#586100]" />
              <span>Inteligência Artificial Integrada</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Quer testar uma rota real com seu futuro elétrico?
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Conte seu cenário de viagem (ex: São Paulo a Paraty ou Curitiba a Floripa) e receba uma análise de viabilidade completa com paradas estratégicas e tempo exato de recarga.
            </p>
          </div>

          <div className="z-10 shrink-0">
            <button
              onClick={() => onSelectTab('planejador-com-ia')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#daee00] hover:bg-[#bfd100] text-[#1a1e00] text-sm font-extrabold transition-all shadow-lg cursor-pointer"
            >
              <Compass className="w-5 h-5 text-[#1a1e00]" />
              <span>Testar planejador com IA</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
