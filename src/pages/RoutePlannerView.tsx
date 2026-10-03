import React, { useState } from 'react';
import { NavTab, CarModel } from '../types';
import { CARS_DATA, ROUTE_DEFAULT_PLAN } from '../data/mockData';
import {
  Sparkles,
  Zap,
  MapPin,
  Clock,
  BatteryCharging,
  Leaf,
  Navigation,
  CheckCircle2,
  Shield,
  Timer,
  CreditCard,
  Sliders,
  Car,
  ChevronRight,
  RefreshCw,
  Share2,
  Maximize2,
  Bookmark,
  Calendar,
  Users,
} from 'lucide-react';

interface RoutePlannerViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenCarDetail: (car: CarModel) => void;
  onShowToast: (msg: string) => void;
}

export const RoutePlannerView: React.FC<RoutePlannerViewProps> = ({
  onSelectTab,
  onOpenCarDetail,
  onShowToast,
}) => {
  const [origin, setOrigin] = useState('São Paulo, SP (Av. Paulista)');
  const [intermediate, setIntermediate] = useState('');
  const [destination, setDestination] = useState('Paraty, RJ (Centro Histórico)');
  const [selectedCarId, setSelectedCarId] = useState('byd-dolphin');
  const [startBattery, setStartBattery] = useState(90);
  const [minArrivalBattery, setMinArrivalBattery] = useState(20);
  const [acEnabled, setAcEnabled] = useState(true);
  const [strategy, setStrategy] = useState<'security' | 'time' | 'cost'>('security');
  const [userPrompt, setUserPrompt] = useState(
    'Vou sair de São Paulo pela manhã, quero almoçar onde houver carregador de alta potência e garantir bateria para circular em Paraty.'
  );
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [routePlan, setRoutePlan] = useState(ROUTE_DEFAULT_PLAN);

  const selectedCar = CARS_DATA.find((c) => c.id === selectedCarId) || CARS_DATA[0];

  // Quick preset destinations
  const presets = [
    { label: 'Paraty, RJ', dest: 'Paraty, RJ (Centro Histórico)', dist: 278, time: '4h 15m' },
    { label: 'Campos do Jordão, SP', dest: 'Campos do Jordão, SP (Capivari)', dist: 172, time: '2h 20m' },
    { label: 'Curitiba, PR', dest: 'Curitiba, PR (Batel)', dist: 408, time: '5h 45m' },
    { label: 'Ilhabela, SP', dest: 'Ilhabela, SP (Balsa São Sebastião)', dist: 206, time: '3h 10m' },
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    setDestination(p.dest);
    onShowToast(`Destino alterado para ${p.label}. Clique em "Gerar rota otimizada com IA".`);
  };

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      onShowToast('Rota atualizada com sucesso! Seus pontos de recarga ideais foram recalculados com base na topografia viária.');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Context Header */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4 pb-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-3">
          <button
            onClick={() => onSelectTab('inicio')}
            className="hover:text-[#006b35] transition-colors cursor-pointer"
          >
            Início
          </button>
          <span>/</span>
          <button
            onClick={() => onSelectTab('mobilidade-eletrica')}
            className="hover:text-[#006b35] transition-colors cursor-pointer"
          >
            Mobilidade elétrica
          </button>
          <span>/</span>
          <span className="text-[#161c27] font-semibold">Planejador com IA</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#adf3bb] text-[#00210c] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#006b35]" />
              <span>Tecnologia Preditiva Exclusiva Localiza Assinatura</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#161c27] tracking-tight">
              Planeje sua rota elétrica com IA
            </h1>
            <p className="text-xs sm:text-sm text-[#3e4a3f] max-w-3xl mt-1">
              Simule viagens reais, descubra onde recarregar com tranquilidade e verifique o impacto na franquia do seu plano de assinatura.
            </p>
          </div>

          {/* AI Responsible Badge */}
          <div className="flex items-center gap-3 bg-[#e8eeff] p-3 rounded-xl max-w-md border border-[#dde2f3]">
            <Zap className="w-5 h-5 text-[#586100] shrink-0 fill-[#daee00]" />
            <p className="text-xs text-[#3e4a3f] leading-snug">
              Estimativas geradas por inteligência artificial com base em modelos de consumo, topografia viária e telemetria real.
            </p>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDE: Parameters Form (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-5 bg-[#006b35] rounded-full"></span>
                  <h2 className="text-base font-bold text-[#161c27]">Parâmetros da sua viagem</h2>
                </div>
                <span className="text-[10px] font-bold text-[#006b35] uppercase bg-[#f1f3ff] px-2.5 py-1 rounded-full">
                  Simulador 100% EV
                </span>
              </div>

              {/* Quick Presets */}
              <div className="pt-3 pb-1">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">
                  Destinos Rápidos Frequentes
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {presets.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectPreset(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        destination === p.dest
                          ? 'bg-[#006b35] text-white'
                          : 'bg-[#f1f3ff] text-gray-700 hover:bg-[#e8eeff]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleOptimize} className="space-y-4 pt-2">
                {/* Origin */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Ponto de partida
                  </label>
                  <div className="relative flex items-center">
                    <MapPin className="w-4 h-4 absolute left-3 text-[#006b35]" />
                    <input
                      type="text"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full h-11 pl-9 pr-3 rounded-xl bg-[#f1f3ff] text-xs font-medium text-[#161c27] focus:outline-none focus:ring-2 focus:ring-[#006b35]"
                    />
                  </div>
                </div>

                {/* Intermediate stops */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Paradas intermediárias (opcional)
                  </label>
                  <input
                    type="text"
                    value={intermediate}
                    onChange={(e) => setIntermediate(e.target.value)}
                    placeholder="Ex: São José dos Campos ou Ubatuba"
                    className="w-full h-11 px-3 rounded-xl bg-[#f1f3ff] text-xs font-medium text-[#161c27] focus:outline-none focus:ring-2 focus:ring-[#006b35]"
                  />
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Destino final</label>
                  <div className="relative flex items-center">
                    <MapPin className="w-4 h-4 absolute left-3 text-[#ba1a1a]" />
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full h-11 pl-9 pr-3 rounded-xl bg-[#f1f3ff] text-xs font-medium text-[#161c27] focus:outline-none focus:ring-2 focus:ring-[#006b35]"
                    />
                  </div>
                </div>

                {/* Vehicle Selection Card */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Veículo elétrico selecionado
                  </label>
                  <div className="p-3 bg-[#f1f3ff] rounded-xl flex items-center gap-3 border border-gray-100">
                    <div className="w-16 h-12 rounded-lg bg-white flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                      <img
                        src={selectedCar.imageUrl}
                        alt={selectedCar.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <select
                          value={selectedCarId}
                          onChange={(e) => setSelectedCarId(e.target.value)}
                          className="font-bold text-xs text-[#161c27] bg-transparent focus:outline-none cursor-pointer"
                        >
                          <option value="byd-dolphin">BYD Dolphin EV</option>
                          <option value="gwm-ora-03">GWM Ora 03 Skin</option>
                          <option value="volvo-ex30">Volvo EX30 Core</option>
                          <option value="byd-yuan-plus">BYD Yuan Plus EV</option>
                        </select>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#006b35] text-white">
                          Disponível
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate">
                        {selectedCar.specs.batteryOrEngine} • Autonomia {selectedCar.specs.autonomyOrRange}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Battery Sliders */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#f1f3ff] p-3 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-gray-500">Bateria na saída</span>
                      <span className="text-sm font-bold text-[#006b35]">{startBattery}%</span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={100}
                      value={startBattery}
                      onChange={(e) => setStartBattery(parseInt(e.target.value, 10))}
                      className="w-full accent-[#006b35] h-2 bg-gray-200 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="bg-[#f1f3ff] p-3 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-gray-500">Mínima na chegada</span>
                      <span className="text-sm font-bold text-[#161c27]">{minArrivalBattery}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={40}
                      value={minArrivalBattery}
                      onChange={(e) => setMinArrivalBattery(parseInt(e.target.value, 10))}
                      className="w-full accent-[#daee00] h-2 bg-gray-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* AC Toggle & Pax */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#f1f3ff]">
                    <div>
                      <span className="text-xs font-semibold text-[#161c27] block">Ar-condicionado</span>
                      <span className="text-[10px] text-gray-500">22°C constante</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={acEnabled}
                      onChange={(e) => setAcEnabled(e.target.checked)}
                      className="w-4 h-4 accent-[#006b35] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#f1f3ff] text-xs text-gray-700">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span>2 pax • 50 kg bagagem</span>
                  </div>
                </div>

                {/* Strategy 3 Pills */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Estratégia de recarga preferida
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setStrategy('security')}
                      className={`p-2 rounded-xl text-center text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        strategy === 'security'
                          ? 'bg-[#006b35] text-white shadow-xs'
                          : 'bg-[#f1f3ff] text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Shield className="w-4 h-4" />
                      <span>Maior Segurança</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStrategy('time')}
                      className={`p-2 rounded-xl text-center text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        strategy === 'time'
                          ? 'bg-[#006b35] text-white shadow-xs'
                          : 'bg-[#f1f3ff] text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Timer className="w-4 h-4" />
                      <span>Menor Tempo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStrategy('cost')}
                      className={`p-2 rounded-xl text-center text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        strategy === 'cost'
                          ? 'bg-[#006b35] text-white shadow-xs'
                          : 'bg-[#f1f3ff] text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Menor Custo</span>
                    </button>
                  </div>
                </div>

                {/* Subscription Allowance Quick Status */}
                <div className="p-3 bg-[#e8eeff] rounded-xl text-xs space-y-1">
                  <div className="flex justify-between font-bold text-[#161c27]">
                    <span>Plano Localiza Assinatura</span>
                    <span className="text-[#006b35]">Ciclo Mensal</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Franquia contratada: <strong>1.500 km</strong></span>
                    <span>KM já rodada: <strong>650 km</strong></span>
                  </div>
                </div>

                {/* Natural Language Prompt */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Conte mais sobre sua viagem (IA contextual)
                  </label>
                  <textarea
                    rows={2}
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#f1f3ff] text-xs text-[#161c27] focus:outline-none focus:ring-2 focus:ring-[#006b35] resize-none"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isOptimizing}
                  className="w-full h-12 bg-[#006b35] hover:bg-[#005227] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  {isOptimizing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-[#daee00]" />
                      <span>Otimizando trajetos e eletropostos...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-[#daee00] fill-current" />
                      <span>Gerar rota otimizada com IA</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE: Map & AI Insights (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Interactive Map Graphic Card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
              {/* Map Top Strip */}
              <div className="p-4 bg-[#f1f3ff] flex flex-wrap items-center justify-between gap-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#adf3bb] text-[#00210c] text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#006b35]" />
                    <span>Rota Viável com Alta Segurança</span>
                  </div>
                  <span className="text-gray-500 text-xs hidden sm:inline">
                    • Via SP-070 Ayrton Senna & Tamoios / Rio-Santos
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onShowToast('Visualização expandida ativada')}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
                    title="Expandir tela cheia"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onShowToast('Link da rota gerada copiado para compartilhar')}
                    className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200 cursor-pointer"
                    title="Compartilhar rota"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Map View Canvas */}
              <div className="relative w-full h-80 sm:h-96 bg-[#dde2f3] overflow-hidden">
                {/* Background Map Photography Texture */}
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyJpdXUVZ_RwsJKq8sI6sHbk64F4MbY96K7vj-1HHF53laMr_vePBqGdfnADJ4EEnTDtDI-6jao9I8_cpQUB3iqEkp6zLyeqByhGewKHqzNwLkfl7vzPrDqiWCibOHWr46Kr2tSTJeWl7cDP_SbN1IZIJxD4SQIXSUCkPZAoBzaI7nebKiRfjakomGevOU_MBHdzqnVvc1XtuqFrX_JTdj0tJj2_0esWk18HuRmGTsMM4nyIA0cjOj"
                  alt="Mapa da rota de São Paulo a Paraty"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {/* Stylized Vector Route Overlay */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  preserveAspectRatio="none"
                  viewBox="0 0 600 350"
                >
                  {/* Highway Line */}
                  <path
                    d="M 60,180 C 140,160 210,130 300,140 C 370,150 450,230 540,210"
                    fill="none"
                    stroke="#008744"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-lg"
                  />
                  {/* Regenerative Descent Highlight Segment */}
                  <path
                    d="M 370,150 C 410,190 460,225 500,218"
                    fill="none"
                    stroke="#daee00"
                    strokeWidth="5"
                    strokeDasharray="6,4"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Marker 1: São Paulo Origin */}
                <div className="absolute left-6 top-36 sm:left-10 sm:top-40 group cursor-pointer z-10">
                  <div className="flex flex-col items-center">
                    <div className="bg-[#006b35] text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-md flex items-center gap-1">
                      <span>São Paulo</span>
                      <span className="bg-[#daee00] text-[#1a1e00] px-1 rounded text-[10px]">90%</span>
                    </div>
                    <div className="w-4 h-4 bg-[#006b35] rounded-full border-2 border-white mt-1 shadow-md"></div>
                  </div>
                </div>

                {/* Marker 2: Graal SJC Rapid Charging Stop */}
                <div className="absolute left-[45%] top-[32%] -translate-x-1/2 group cursor-pointer z-20">
                  <div className="flex flex-col items-center">
                    <div className="bg-white text-[#161c27] px-3 py-1.5 rounded-xl shadow-xl border border-gray-200 flex items-center gap-2 hover:scale-105 transition-transform">
                      <Zap className="w-4 h-4 text-[#006b35] fill-current" />
                      <div>
                        <p className="text-[11px] font-extrabold leading-none">Parada 1: Graal SJC</p>
                        <p className="text-[9px] text-gray-500 font-medium">Chega: 52% → Sai: 85% (+28m)</p>
                      </div>
                    </div>
                    <div className="w-3.5 h-3.5 bg-[#daee00] rounded-full border-2 border-[#161c27] mt-1 shadow animate-pulse"></div>
                  </div>
                </div>

                {/* Marker 3: Optional Ubatuba point */}
                <div className="absolute left-[70%] top-[65%] -translate-x-1/2 group cursor-pointer z-10">
                  <div className="flex flex-col items-center opacity-90 hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-xs text-[#161c27] px-2 py-0.5 rounded-md shadow text-[9px] font-medium border border-gray-100">
                      Ubatuba • Ponto 50 kW (Opcional)
                    </div>
                    <div className="w-2.5 h-2.5 bg-gray-400 rounded-full border border-white mt-0.5"></div>
                  </div>
                </div>

                {/* Marker 4: Destination Paraty */}
                <div className="absolute right-6 bottom-20 sm:right-10 sm:bottom-24 group cursor-pointer z-10">
                  <div className="flex flex-col items-center">
                    <div className="bg-[#161c27] text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-md flex items-center gap-1.5">
                      <span>Paraty</span>
                      <span className="text-[#daee00] font-extrabold">34%</span>
                    </div>
                    <div className="w-4 h-4 bg-[#ba1a1a] rounded-full border-2 border-white mt-1 shadow-md"></div>
                  </div>
                </div>

                {/* Map Floating Legend */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md flex items-center gap-3 text-[10px] font-bold text-gray-700 border border-gray-100">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006b35]"></span>
                    <span>Trajeto Principal</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#daee00]"></span>
                    <span>Recarga Rápida</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 border-b-2 border-dashed border-[#586100]"></span>
                    <span>Regeneração Serra</span>
                  </div>
                </div>
              </div>

              {/* Quick Trip Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-200 text-center text-xs">
                <div className="bg-white p-3 flex flex-col items-center">
                  <span className="text-[10px] text-gray-500 font-semibold">Distância Total</span>
                  <span className="text-base font-extrabold text-[#161c27] mt-0.5">
                    {routePlan.distanceKm} km
                  </span>
                  <span className="text-[10px] text-gray-400">Trajeto só de ida</span>
                </div>

                <div className="bg-white p-3 flex flex-col items-center">
                  <span className="text-[10px] text-gray-500 font-semibold">Tempo Previsto</span>
                  <span className="text-base font-extrabold text-[#161c27] mt-0.5">
                    {routePlan.estimatedTime}
                  </span>
                  <span className="text-[10px] text-[#006b35] font-bold">
                    Inclui {routePlan.chargingTime} de recarga
                  </span>
                </div>

                <div className="bg-white p-3 flex flex-col items-center">
                  <span className="text-[10px] text-gray-500 font-semibold">Na Chegada</span>
                  <span className="text-base font-extrabold text-[#006b35] mt-0.5">
                    {routePlan.arrivalBatteryPct}%
                  </span>
                  <span className="text-[10px] text-gray-400">+14% de folga mínima</span>
                </div>

                <div className="bg-white p-3 flex flex-col items-center">
                  <span className="text-[10px] text-gray-500 font-semibold">CO₂ Evitado</span>
                  <span className="text-base font-extrabold text-[#296b3f] mt-0.5">
                    {routePlan.co2SavedKg} kg
                  </span>
                  <span className="text-[10px] text-gray-400">vs. carro à combustão</span>
                </div>
              </div>
            </div>

            {/* AI Insights & Charging Analysis Panel */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#e8eeff] flex items-center justify-center text-[#006b35]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#161c27]">Análise Preditiva do Especialista de IA</h3>
                    <p className="text-[11px] text-gray-500">
                      Simulação calibrada com consumo médio de 14.8 kWh / 100 km
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#f1f3ff] text-gray-700 text-xs font-bold">
                  Confiabilidade 98%
                </span>
              </div>

              {/* Recommended Charging Stop Card */}
              <div className="p-4 rounded-2xl bg-[#f1f3ff] flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#006b35] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-5 h-5 fill-current text-[#daee00]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#161c27]">
                        Graal Market São José dos Campos
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#adf3bb] text-[#00210c]">
                        Recomendado
                      </span>
                    </div>
                    <p className="text-xs text-[#3e4a3f] mt-0.5">
                      Rodovia Ayrton Senna / Carvalho Pinto km 94 • Rede Shell Recharge
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-1.5 text-[11px] text-gray-500">
                      <span className="flex items-center gap-1 font-semibold text-[#006b35]">
                        <span className="w-2 h-2 rounded-full bg-[#006b35]"></span> 4 plugues CCS2 livres
                      </span>
                      <span>•</span>
                      <span>Potência 60 kW DC</span>
                      <span>•</span>
                      <span>Parada de 28 min (Recupera ~33% da bateria)</span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white hover:bg-gray-50 text-[#161c27] text-xs font-bold shrink-0 flex items-center justify-center gap-1.5 transition-colors border border-gray-200"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#006b35]" />
                  <span>Abrir no Waze / Maps</span>
                </a>
              </div>

              {/* Explainable AI Box */}
              <div className="p-4 rounded-2xl bg-[#e8eeff] flex items-start gap-3 border border-[#dde2f3]">
                <Sparkles className="w-5 h-5 text-[#006b35] shrink-0 mt-0.5" />
                <div className="text-xs text-[#3e4a3f] space-y-1">
                  <p className="font-bold text-[#161c27]">Por que esta é a melhor rota segundo nossa IA?</p>
                  <p className="leading-relaxed">
                    Esta rota é viável com apenas <strong>1 parada de recarga rápida de 28 minutos</strong>. A topografia da Rodovia dos Tamoios conta com excelente <strong>regeneração de energia cinética na descida para o litoral</strong>, recuperando aproximadamente 4.2 kWh (cerca de 8% de bateria adicional), garantindo que você chegue ao Centro Histórico de Paraty com <strong>34% de carga restante</strong>, bem acima da margem de proteção de 20% definida por você.
                  </p>
                </div>
              </div>

              {/* Impact on Subscription Allowance (Franquia) */}
              <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#161c27]">
                      Impacto na Franquia do seu Plano de Assinatura
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#006b35]">Status: Muito Seguro</span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden flex">
                    {/* Used previously (650 km = 43.3%) */}
                    <div
                      className="h-full bg-gray-400"
                      style={{ width: '43.3%' }}
                      title="KM já utilizada: 650 km"
                    ></div>
                    {/* Trip roundtrip (556 km = 37.1%) */}
                    <div
                      className="h-full bg-[#006b35]"
                      style={{ width: '37.1%' }}
                      title="Viagem ida e volta: 556 km"
                    ></div>
                    {/* Free buffer (19.6%) */}
                    <div className="h-full bg-transparent" style={{ width: '19.6%' }}></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-500 font-medium">
                    <span>0 km</span>
                    <span className="text-[#161c27] font-bold">Uso projetado: 1.206 km (80.4%)</span>
                    <span>Franquia Total: 1.500 km</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-[#f1f3ff] text-xs gap-2">
                  <p className="text-gray-600">
                    Quilometragem da viagem (ida e volta: <strong>556 km</strong>) + saldo utilizado no mês (<strong>650 km</strong>) = <strong className="text-[#161c27]">1.206 km</strong>.
                  </p>
                  <span className="px-3 py-1 rounded bg-[#adf3bb] text-[#00210c] text-xs font-extrabold whitespace-nowrap self-start sm:self-center">
                    Sobra livre: 294 km
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenCarDetail(selectedCar)}
                    className="px-4 py-2 rounded-xl bg-[#f1f3ff] text-[#161c27] hover:bg-gray-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Detalhes do Veículo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onShowToast('Planejamento salvo com sucesso no seu perfil!')}
                    className="px-4 py-2 rounded-xl bg-[#f1f3ff] text-[#161c27] hover:bg-gray-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Salvar planejamento</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onShowToast('Exibindo todos os 4.800 eletropostos no mapa')}
                  className="px-4 py-2 rounded-xl bg-[#daee00] text-[#1a1e00] hover:bg-[#bfd100] text-xs font-extrabold transition-colors cursor-pointer shadow-xs"
                >
                  Ver todos pontos no mapa
                </button>
              </div>

              {/* Legal Note */}
              <p className="text-[11px] text-gray-500 leading-relaxed bg-[#f1f3ff] p-3 rounded-xl border border-gray-100">
                * As recomendações e autonomias apresentadas são estimativas geradas por modelos preditivos e podem variar de acordo com condições de tráfego, velocidade média praticada, estilo de condução do motorista, condições climáticas, lotação do veículo e disponibilidade operacional dos pontos de recarga em tempo real. A Localiza recomenda sempre consultar o aplicativo da concessionária ou rede de recarga antes de iniciar o deslocamento.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
