import React, { useState } from 'react';
import { NavTab, CarModel } from '../types';
import { CARS_DATA } from '../data/mockData';
import {
  Zap,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Fuel,
  Info,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Ticket,
} from 'lucide-react';

interface ComparatorViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenCarDetail: (car: CarModel) => void;
}

export const ComparatorView: React.FC<ComparatorViewProps> = ({
  onSelectTab,
  onOpenCarDetail,
}) => {
  const [selectedTerm, setSelectedTerm] = useState<'12' | '24' | '36'>('36');
  const [simKm, setSimKm] = useState(1200);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // 3 cars for the comparator
  const fiat = CARS_DATA.find((c) => c.id === 'fiat-fastback')!;
  const byd = CARS_DATA.find((c) => c.id === 'byd-dolphin')!;
  const volvo = CARS_DATA.find((c) => c.id === 'volvo-ex30')!;

  // Dynamic TCO calculation:
  // Fiat: ~R$ 0.52 / km
  const fiatMonthlyFuel = Math.round(simKm * 0.52);
  const fiatYearlyFuel = fiatMonthlyFuel * 12;

  // BYD: ~R$ 0.14 / km
  const bydMonthlyEnergy = Math.round(simKm * 0.14);
  const bydYearlyEnergy = bydMonthlyEnergy * 12;
  const bydAnnualSavings = fiatYearlyFuel - bydYearlyEnergy;

  // Volvo: ~R$ 0.16 / km
  const volvoMonthlyEnergy = Math.round(simKm * 0.16);
  const volvoYearlyEnergy = volvoMonthlyEnergy * 12;
  const volvoAnnualSavings = fiatYearlyFuel - volvoYearlyEnergy;

  const faqs = [
    {
      q: 'Como funciona a recarga de um veículo 100% elétrico no dia a dia?',
      a: 'Você recebe o carro com o cabo de recarga de emergência para tomadas 220V com aterramento. Além disso, pode instalar um Wallbox em sua residência ou empresa, ou utilizar os milhares de eletropostos públicos e privados disponíveis nas rodovias e shoppings pelo Brasil. Em estações de carga rápida DC, o BYD e o Volvo recarregam de 20% a 80% em menos de 30 minutos.',
    },
    {
      q: 'Se eu exceder a franquia de 1.000 km/mês, o que acontece?',
      a: 'Os quilômetros não utilizados no mês acumulam para o mês seguinte dentro da vigência total do contrato. Caso ao final haja excedente total, você paga apenas uma taxa predeterminada por quilômetro extra rodado, estipulada com clareza no ato da contratação.',
    },
    {
      q: 'O que está verdadeiramente incluso na mensalidade da Localiza?',
      a: 'A mensalidade cobre o veículo zero quilômetro, emplacamento, IPVA integral, seguro contra colisão, furto, roubo e terceiros, todas as revisões programadas no manual com peças de desgaste natural e assistência 24h em território nacional. Você só cuida do abastecimento ou recarga.',
    },
  ];

  return (
    <div className="flex flex-col w-full pb-24">
      {/* Top Header Section */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4 pb-6">
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-3">
          <button
            onClick={() => onSelectTab('inicio')}
            className="hover:text-[#006b35] transition-colors cursor-pointer"
          >
            Início
          </button>
          <span>/</span>
          <span className="text-gray-800 font-semibold">Comparador de Veículos</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#adf3bb] text-[#00210c] text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5 text-[#006b35] fill-current" />
              <span>Simulador Comparativo</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#161c27] tracking-tight">
              Compare modelos e encontre o carro ideal para sua assinatura
            </h1>
            <p className="text-sm text-[#3e4a3f] mt-1 max-w-3xl">
              Avalie lado a lado motorização, custo real por quilômetro rodado, autonomia e todas as vantagens inclusas sem preocupações com IPVA, seguro ou depreciação.
            </p>
          </div>

          {/* Quick Plan Switcher */}
          <div className="flex items-center gap-1 bg-[#e3e8f9] p-1.5 rounded-xl self-start lg:self-auto text-xs">
            <span className="text-gray-600 px-2 font-semibold">Plano:</span>
            {(['12', '24', '36'] as const).map((term) => (
              <button
                key={term}
                onClick={() => setSelectedTerm(term)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  selectedTerm === term
                    ? 'bg-white text-[#006b35] shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {term} meses
              </button>
            ))}
            <span className="text-gray-300 mx-1">|</span>
            <span className="px-2 font-bold text-[#006b35]">Franquia 1.000 km/mês</span>
          </div>
        </div>
      </section>

      {/* EV Savings Highlight Bar */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 mb-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#e8eeff] to-[#f1f3ff] flex flex-col md:flex-row items-center justify-between gap-4 border border-[#dde2f3] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#daee00] text-[#1a1e00] flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 fill-current text-[#586100]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#161c27]">
                Economize até 73% por quilômetro rodado na ponta do lápis
              </h3>
              <p className="text-xs text-[#3e4a3f]">
                Carros 100% elétricos custam entre R$ 0,14 e R$ 0,16/km, contra R$ 0,52/km do motor flex a combustão.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectTab('mobilidade-eletrica')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#006b35] text-white hover:bg-[#005227] text-xs font-bold transition-colors shrink-0 shadow-xs cursor-pointer"
          >
            <span>Conheça a Experiência Elétrica</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3 Vehicle Header Cards */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Car 1: Fiat Fastback */}
          <div className="flex flex-col bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative group hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px] font-semibold">
                Combustão Turbo Flex
              </span>
              <Fuel className="w-4 h-4 text-gray-400" />
            </div>

            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-[#f1f3ff] my-2 flex items-center justify-center p-2">
              <img
                src={fiat.imageUrl}
                alt={fiat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium">
                Pronta Entrega
              </span>
            </div>

            <div className="mt-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Fiat</span>
                <h2 className="text-lg font-bold text-[#161c27]">{fiat.name}</h2>
                <p className="text-xs text-gray-500">{fiat.version}</p>
              </div>

              <div className="mt-4 pt-3 bg-[#f1f3ff] rounded-xl p-3">
                <span className="text-[10px] text-gray-500 block">Mensalidade sem entrada</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[#006b35]">
                    R$ {fiat.prices[selectedTerm as unknown as 12 | 24 | 36].toLocaleString('pt-BR')}
                  </span>
                  <span className="text-xs text-gray-500">/mês</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#296b3f] font-semibold mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Franquia 1.000 km inclusa</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenCarDetail(fiat)}
                className="mt-4 w-full py-2.5 rounded-xl bg-[#006b35] text-white hover:bg-[#005227] text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Assinar este modelo
              </button>
            </div>
          </div>

          {/* Car 2: BYD Dolphin */}
          <div className="flex flex-col bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative group hover:shadow-md transition-shadow">
            <button
              onClick={() => onSelectTab('mobilidade-eletrica')}
              className="flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-xl bg-[#daee00] text-[#1a1e00] hover:bg-[#bfd100] transition-colors mb-2 text-xs font-bold cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#586100] fill-current animate-pulse" />
                <span>⚡ Conheça a experiência elétrica</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-[#f1f3ff] my-2 flex items-center justify-center p-2">
              <img
                src={byd.imageUrl}
                alt={byd.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#006b35] text-white text-[10px] font-bold">
                100% Elétrico
              </span>
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-white/90 text-[#006b35] text-[10px] font-bold">
                Zero Emissões
              </span>
            </div>

            <div className="mt-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">BYD</span>
                <h2 className="text-lg font-bold text-[#161c27]">{byd.name}</h2>
                <p className="text-xs text-gray-500">{byd.version}</p>
              </div>

              <div className="mt-4 pt-3 bg-[#f1f3ff] rounded-xl p-3">
                <span className="text-[10px] text-gray-500 block">Mensalidade sem entrada</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[#006b35]">
                    R$ {byd.prices[selectedTerm as unknown as 12 | 24 | 36].toLocaleString('pt-BR')}
                  </span>
                  <span className="text-xs text-gray-500">/mês</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#296b3f] font-semibold mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Franquia 1.000 km inclusa</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenCarDetail(byd)}
                className="mt-4 w-full py-2.5 rounded-xl bg-[#006b35] text-white hover:bg-[#005227] text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Assinar este modelo
              </button>
            </div>
          </div>

          {/* Car 3: Volvo EX30 */}
          <div className="flex flex-col bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative group hover:shadow-md transition-shadow">
            <button
              onClick={() => onSelectTab('mobilidade-eletrica')}
              className="flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-xl bg-[#daee00] text-[#1a1e00] hover:bg-[#bfd100] transition-colors mb-2 text-xs font-bold cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#586100] fill-current animate-pulse" />
                <span>⚡ Conheça a experiência elétrica</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-[#f1f3ff] my-2 flex items-center justify-center p-2">
              <img
                src={volvo.imageUrl}
                alt={volvo.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#006b35] text-white text-[10px] font-bold">
                Premium 100% Elétrico
              </span>
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-white/90 text-[#006b35] text-[10px] font-bold">
                0-100 em 5.7s
              </span>
            </div>

            <div className="mt-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Volvo</span>
                <h2 className="text-lg font-bold text-[#161c27]">{volvo.name}</h2>
                <p className="text-xs text-gray-500">{volvo.version}</p>
              </div>

              <div className="mt-4 pt-3 bg-[#f1f3ff] rounded-xl p-3">
                <span className="text-[10px] text-gray-500 block">Mensalidade sem entrada</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[#006b35]">
                    R$ {volvo.prices[selectedTerm as unknown as 12 | 24 | 36].toLocaleString('pt-BR')}
                  </span>
                  <span className="text-xs text-gray-500">/mês</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#296b3f] font-semibold mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Franquia 1.000 km inclusa</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenCarDetail(volvo)}
                className="mt-4 w-full py-2.5 rounded-xl bg-[#006b35] text-white hover:bg-[#005227] text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Assinar este modelo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparative Specification Matrix */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 mb-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-200">
          {/* Category 1: Economia & Energia */}
          <div>
            <div className="px-5 py-3 bg-[#e8eeff] text-[#161c27] font-bold text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#006b35]" />
              <span>Economia de Combustível, Autonomia & Carregamento</span>
            </div>

            <div className="divide-y divide-gray-100 text-xs">
              {/* Row 1: Custo estimado por km */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 items-center bg-[#adf3bb]/15">
                <div className="md:col-span-1">
                  <span className="font-bold text-[#161c27] block">Custo estimado por km</span>
                  <span className="text-[10px] text-gray-500">Considerando tarifa média urbana</span>
                </div>
                <div className="md:col-span-1">
                  <span className="text-sm font-bold text-gray-800">R$ 0,52 / km</span>
                  <span className="text-[11px] text-[#ba1a1a] block">R$ 520,00 a cada 1.000 km</span>
                </div>
                <div className="md:col-span-1 bg-[#daee00]/30 p-2 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-extrabold text-[#006b35]">R$ 0,14 / km</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#daee00] text-[#1a1e00] text-[10px] font-black">
                      -73%
                    </span>
                  </div>
                  <span className="text-[11px] text-[#296b3f] font-bold block">R$ 140,00 a cada 1.000 km</span>
                </div>
                <div className="md:col-span-1 bg-[#daee00]/30 p-2 rounded-lg">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-extrabold text-[#006b35]">R$ 0,16 / km</span>
                    <span className="px-1.5 py-0.5 rounded bg-[#daee00] text-[#1a1e00] text-[10px] font-black">
                      -69%
                    </span>
                  </div>
                  <span className="text-[11px] text-[#296b3f] font-bold block">R$ 160,00 a cada 1.000 km</span>
                </div>
              </div>

              {/* Row 2: Autonomia homologada */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 items-center">
                <div className="md:col-span-1">
                  <span className="font-bold text-[#161c27] block">Autonomia homologada (PBEV)</span>
                  <span className="text-[10px] text-gray-500">Padrão oficial Inmetro</span>
                </div>
                <div className="md:col-span-1">
                  <p className="font-bold text-gray-800">Tanque 52L</p>
                  <p className="text-[10px] text-gray-500">~620 km estrada / ~500 km cidade</p>
                </div>
                <div className="md:col-span-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-[#006b35]">291 km</span>
                    <span className="px-2 py-0.5 rounded bg-[#adf3bb] text-[#00210c] text-[10px] font-bold">
                      100% PBEV
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500">Bateria Blade de 44.9 kWh</p>
                </div>
                <div className="md:col-span-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-[#006b35]">338 km</span>
                    <span className="px-2 py-0.5 rounded bg-[#adf3bb] text-[#00210c] text-[10px] font-bold">
                      100% PBEV
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500">Bateria LFP de 51 kWh</p>
                </div>
              </div>

              {/* Row 3: Tempo de recarga */}
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 items-center">
                <div className="md:col-span-1">
                  <span className="font-bold text-[#161c27] block">Tempo de Recarga / Abastecimento</span>
                  <span className="text-[10px] text-gray-500">Capacidades máximas aceitas</span>
                </div>
                <div className="md:col-span-1">
                  <p className="font-semibold text-gray-800">Postos de Combustível</p>
                  <p className="text-[10px] text-gray-500">Etanol ou Gasolina comum / aditivada</p>
                </div>
                <div className="md:col-span-1">
                  <p className="font-semibold text-[#006b35]">DC até 60 kW | AC 7 kW</p>
                  <p className="text-[10px] text-gray-500">30 min (30% a 80% em DC rápido)</p>
                </div>
                <div className="md:col-span-1">
                  <p className="font-semibold text-[#006b35]">DC até 134 kW | AC 11 kW</p>
                  <p className="text-[10px] text-gray-500">26 min (10% a 80% em ultra-rápido)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Category 2: Desempenho & Dimensões */}
          <div>
            <div className="px-5 py-3 bg-[#e8eeff] text-[#161c27] font-bold text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#006b35]" />
              <span>Desempenho & Dimensões</span>
            </div>

            <div className="divide-y divide-gray-100 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 items-center">
                <div className="md:col-span-1 font-bold text-[#161c27]">Potência & Torque</div>
                <div className="md:col-span-1">130 cv / 20,4 kgfm</div>
                <div className="md:col-span-1">95 cv / 18,3 kgfm (instantâneo)</div>
                <div className="md:col-span-1 font-semibold text-[#006b35]">272 cv / 35,0 kgfm (RWD)</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 items-center">
                <div className="md:col-span-1 font-bold text-[#161c27]">Aceleração 0-100 km/h</div>
                <div className="md:col-span-1">9,4 segundos</div>
                <div className="md:col-span-1">10,9 segundos</div>
                <div className="md:col-span-1 font-extrabold text-[#006b35]">5,7 segundos</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 items-center">
                <div className="md:col-span-1 font-bold text-[#161c27]">Capacidade do Porta-malas</div>
                <div className="md:col-span-1 font-bold">516 litros (VDA)</div>
                <div className="md:col-span-1">345 litros (expansível 1.310L)</div>
                <div className="md:col-span-1">318 litros (+ 7L frunk)</div>
              </div>
            </div>
          </div>

          {/* Category 3: Localiza Assinatura Inclusos */}
          <div>
            <div className="px-5 py-3 bg-[#adf3bb]/30 text-[#006b35] font-bold text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Pacote Localiza Assinatura (Tudo Incluso na Mensalidade)</span>
            </div>

            <div className="divide-y divide-gray-100 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 items-center">
                <div className="md:col-span-1 font-bold text-[#161c27]">IPVA, Licenciamento & Emplacamento</div>
                <div className="md:col-span-1 flex items-center gap-1 text-[#006b35] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Incluso (sem custo)
                </div>
                <div className="md:col-span-1 flex items-center gap-1 text-[#006b35] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Incluso (sem custo)
                </div>
                <div className="md:col-span-1 flex items-center gap-1 text-[#006b35] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Incluso (sem custo)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 items-center">
                <div className="md:col-span-1 font-bold text-[#161c27]">Seguro Total com Cobertura a Terceiros</div>
                <div className="md:col-span-1 flex items-center gap-1 text-[#006b35] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Incluso (cobertura total)
                </div>
                <div className="md:col-span-1 flex items-center gap-1 text-[#006b35] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Incluso (cobertura total)
                </div>
                <div className="md:col-span-1 flex items-center gap-1 text-[#006b35] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Incluso (cobertura total)
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 items-center">
                <div className="md:col-span-1 font-bold text-[#161c27]">Revisões Preventivas & Peças Desgaste</div>
                <div className="md:col-span-1 flex items-center gap-1 text-[#006b35] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Rede autorizada inclusa
                </div>
                <div className="md:col-span-1 flex items-center gap-1 text-[#006b35] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Rede BYD autorizada
                </div>
                <div className="md:col-span-1 flex items-center gap-1 text-[#006b35] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Rede Volvo autorizada
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 p-4 gap-4 items-center">
                <div className="md:col-span-1 font-bold text-[#161c27]">Assistência 24h & Carro Reserva</div>
                <div className="md:col-span-1 flex items-center gap-1 text-[#006b35] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 24h em todo o Brasil
                </div>
                <div className="md:col-span-1 flex items-center gap-1 text-[#006b35] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 24h + socorro de recarga
                </div>
                <div className="md:col-span-1 flex items-center gap-1 text-[#006b35] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 24h VIP + socorro de recarga
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Monthly TCO / Savings Simulator Calculator */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 mb-12">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-[#006b35] uppercase tracking-wider block">
                Calculadora Inteligente de Rodagem
              </span>
              <h3 className="text-xl font-bold text-[#161c27]">Simule sua economia mensal real</h3>
              <p className="text-xs text-gray-500 mt-1">
                Arraste a barra para indicar sua média de km rodados por mês e veja a diferença de gasto energético.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-[#f1f3ff] px-4 py-2 rounded-xl">
              <span className="text-xs text-gray-500">Quilometragem mensal:</span>
              <span className="text-base font-extrabold text-[#006b35]">
                {simKm.toLocaleString('pt-BR')} km
              </span>
            </div>
          </div>

          <div className="py-6">
            <input
              type="range"
              min={500}
              max={3500}
              step={100}
              value={simKm}
              onChange={(e) => setSimKm(parseInt(e.target.value, 10))}
              className="w-full accent-[#006b35] h-2.5 bg-gray-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
              <span>500 km/mês</span>
              <span>1.500 km/mês (Urbano médio)</span>
              <span>2.500 km/mês</span>
              <span>3.500 km/mês (Intenso)</span>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#f1f3ff] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-xs text-gray-500 block mb-1">Fiat Fastback (Flex)</span>
                <p className="text-xl font-extrabold text-[#161c27]">
                  R$ {fiatMonthlyFuel.toLocaleString('pt-BR')} / mês
                </p>
                <span className="text-[11px] text-gray-500">Custo com gasolina (~11.9 km/l)</span>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-200 text-xs text-gray-600">
                Total anual de combustível:{' '}
                <span className="font-bold text-[#161c27]">R$ {fiatYearlyFuel.toLocaleString('pt-BR')}</span>
              </div>
            </div>

            <div className="bg-[#adf3bb]/30 rounded-xl p-4 flex flex-col justify-between border border-[#adf3bb]">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[#006b35] font-bold">BYD Dolphin (Elétrico)</span>
                  <span className="px-2 py-0.5 rounded bg-[#daee00] text-[#1a1e00] text-[10px] font-extrabold">
                    Economia Máxima
                  </span>
                </div>
                <p className="text-xl font-black text-[#006b35]">
                  R$ {bydMonthlyEnergy.toLocaleString('pt-BR')} / mês
                </p>
                <span className="text-[11px] text-gray-600">Custo estimado de recarga residencial</span>
              </div>
              <div className="mt-4 pt-2 border-t border-[#adf3bb] text-xs text-[#006b35] font-semibold">
                Você economiza{' '}
                <strong className="underline font-extrabold">
                  R$ {bydAnnualSavings.toLocaleString('pt-BR')} / ano
                </strong>{' '}
                em relação à gasolina
              </div>
            </div>

            <div className="bg-[#f1f3ff] rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-800 font-bold">Volvo EX30 (Elétrico)</span>
                  <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-[10px] font-semibold">
                    Premium EV
                  </span>
                </div>
                <p className="text-xl font-extrabold text-[#161c27]">
                  R$ {volvoMonthlyEnergy.toLocaleString('pt-BR')} / mês
                </p>
                <span className="text-[11px] text-gray-500">Custo estimado de recarga elétrica</span>
              </div>
              <div className="mt-4 pt-2 border-t border-gray-200 text-xs text-[#006b35] font-semibold">
                Você economiza{' '}
                <strong className="underline font-extrabold">
                  R$ {volvoAnnualSavings.toLocaleString('pt-BR')} / ano
                </strong>{' '}
                em relação à gasolina
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Banner: AI Route Planner & Electric Hub Link */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* AI Route Planner Card */}
          <div className="rounded-2xl bg-gradient-to-br from-[#e8eeff] to-[#dde2f3] p-6 sm:p-8 flex flex-col justify-between border border-gray-200 shadow-xs">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#006b35] text-white text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Inteligência Artificial Localiza</span>
              </div>
              <h3 className="text-lg font-bold text-[#161c27]">Dúvida sobre a autonomia na sua rotina?</h3>
              <p className="text-xs text-[#3e4a3f] mt-2 leading-relaxed">
                Use nosso Planejador de Rotas com IA para prever pontos de recarga convenientes, custos por trajeto e recomendações personalizadas para sua cidade.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={() => onSelectTab('planejador-com-ia')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#006b35] text-xs font-bold hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
              >
                <span>Abrir Planejador de Rotas com IA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Electric Hub Card */}
          <div className="rounded-2xl bg-gradient-to-br from-[#daee00]/30 via-[#f1f3ff] to-white p-6 sm:p-8 flex flex-col justify-between border border-gray-200 shadow-xs">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#daee00] text-[#1a1e00] text-xs font-bold mb-3">
                <Zap className="w-3.5 h-3.5 text-[#586100] fill-current" />
                <span>Hub de Mobilidade Elétrica</span>
              </div>
              <h3 className="text-lg font-bold text-[#161c27]">A revolução elétrica com suporte 24h Localiza</h3>
              <p className="text-xs text-[#3e4a3f] mt-2 leading-relaxed">
                Entenda como funciona o carregador portátil, carregadores residenciais Wallbox homologados e a ampla rede parceira de eletropostos rápidos.
              </p>
            </div>
            <div className="pt-4">
              <button
                onClick={() => onSelectTab('mobilidade-eletrica')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006b35] text-white text-xs font-bold hover:bg-[#005227] transition-colors shadow-xs cursor-pointer"
              >
                <span>Explorar Hub Elétrico Completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs on Model Comparison */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 mb-12">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="text-xs font-bold text-[#006b35] uppercase tracking-wider block">
            Tire suas Dúvidas
          </span>
          <h3 className="text-2xl font-bold text-[#161c27] mt-1">Perguntas frequentes sobre assinatura e modelos</h3>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
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
      </section>

      {/* Sticky Bottom Summary Bar on Desktop */}
      <aside className="fixed bottom-4 left-4 right-4 z-40 max-w-4xl mx-auto bg-[#161c27]/95 backdrop-blur-md text-white rounded-2xl p-3.5 px-5 shadow-2xl flex items-center justify-between gap-4 border border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#daee00] text-[#1a1e00] flex items-center justify-center font-bold shrink-0">
            <Zap className="w-5 h-5 fill-current text-[#586100]" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">3 veículos selecionados para comparação</p>
            <p className="text-[11px] text-white/70 hidden sm:block">
              Valores válidos para contratações online com entrega garantida e IPVA incluso.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectTab('voucher-exclusivo')}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors hidden sm:inline-flex items-center gap-1 cursor-pointer"
          >
            <Ticket className="w-3.5 h-3.5 text-[#daee00]" />
            <span>Aplicar Voucher</span>
          </button>
          <button
            onClick={() => onSelectTab('carros-e-planos')}
            className="px-4 py-2 rounded-xl bg-[#006b35] text-white hover:bg-[#005227] text-xs font-bold transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            Ver Todos os Carros
          </button>
        </div>
      </aside>
    </div>
  );
};
