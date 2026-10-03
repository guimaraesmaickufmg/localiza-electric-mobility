import React, { useState } from 'react';
import { NavTab, CarModel, CarCategory } from '../types';
import { CARS_DATA } from '../data/mockData';
import { Search, Filter, Zap, ArrowRight, CheckCircle2, Sliders } from 'lucide-react';

interface CarsCatalogViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenCarDetail: (car: CarModel) => void;
}

export const CarsCatalogView: React.FC<CarsCatalogViewProps> = ({
  onSelectTab,
  onOpenCarDetail,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CarCategory>('all');
  const [selectedTerm, setSelectedTerm] = useState<12 | 24 | 36 | 48>(36);
  const [selectedKm, setSelectedKm] = useState<number>(1000);

  const categories: { id: CarCategory; label: string }[] = [
    { id: 'all', label: 'Todos os Modelos' },
    { id: 'electric', label: '⚡ 100% Elétricos' },
    { id: 'hybrid', label: 'Híbridos' },
    { id: 'suv', label: 'SUVs & Crossovers' },
    { id: 'hatch', label: 'Hatches' },
    { id: 'sedan', label: 'Sedans' },
  ];

  const filteredCars = CARS_DATA.filter((car) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'electric' && car.isElectric) ||
      (selectedCategory === 'hybrid' && car.isHybrid) ||
      car.category === selectedCategory;

    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.version.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getCarPrice = (car: CarModel) => {
    const base = car.prices[selectedTerm] || car.monthlyBasePrice;
    const kmMultiplier =
      selectedKm === 1000 ? 1 : selectedKm === 1500 ? 1.12 : selectedKm === 2000 ? 1.25 : selectedKm === 2500 ? 1.38 : 1.5;
    return Math.round(base * kmMultiplier);
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Header */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 pt-4 pb-6">
        <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-3">
          <button
            onClick={() => onSelectTab('inicio')}
            className="hover:text-[#006b35] transition-colors cursor-pointer"
          >
            Início
          </button>
          <span>/</span>
          <span className="text-[#161c27] font-semibold">Carros e Planos</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#161c27] tracking-tight">
              Catálogo de Carros por Assinatura
            </h1>
            <p className="text-xs sm:text-sm text-[#3e4a3f] mt-1 max-w-2xl">
              Escolha seu 0km com IPVA, seguro total, revisões autorizadas e assistência 24h inclusos na mensalidade. Sem entrada e sem burocracia.
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-[#006b35] bg-[#adf3bb] px-3 py-1.5 rounded-full">
              {filteredCars.length} veículos encontrados
            </span>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 mb-8">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
          {/* Row 1: Search & Term / Km Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Busque por modelo, marca (ex: BYD, Fiat, Volvo) ou versão..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#f1f3ff] text-xs text-[#161c27] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#006b35]"
              />
            </div>

            {/* Term Selector */}
            <div className="md:col-span-3 flex items-center bg-[#f1f3ff] rounded-xl p-1 h-11">
              {([12, 24, 36, 48] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTerm(t)}
                  className={`flex-1 h-full rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedTerm === t
                      ? 'bg-[#006b35] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t}m
                </button>
              ))}
            </div>

            {/* Mileage Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedKm}
                onChange={(e) => setSelectedKm(parseInt(e.target.value, 10))}
                className="w-full h-11 px-3 rounded-xl bg-[#f1f3ff] text-xs font-semibold text-[#161c27] focus:outline-none focus:ring-2 focus:ring-[#006b35] cursor-pointer"
              >
                <option value={1000}>Franquia: 1.000 km/mês</option>
                <option value={1500}>Franquia: 1.500 km/mês</option>
                <option value={2000}>Franquia: 2.000 km/mês</option>
                <option value={2500}>Franquia: 2.500 km/mês</option>
                <option value={3000}>Franquia: 3.000 km/mês</option>
              </select>
            </div>
          </div>

          {/* Row 2: Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#006b35] text-white shadow-xs'
                    : 'bg-[#f1f3ff] text-gray-700 hover:bg-[#e8eeff]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCars.map((car) => {
              const currentPrice = getCarPrice(car);
              return (
                <div
                  key={car.id}
                  className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group border border-gray-100"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      {car.isElectric ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#daee00] text-[#1a1e00] text-[11px] font-extrabold">
                          <Zap className="w-3 h-3 fill-current" /> 100% Elétrico
                        </span>
                      ) : car.isHybrid ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#adf3bb] text-[#00210c] text-[11px] font-bold">
                          Híbrido Flex
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px] font-semibold">
                          Turbo Flex
                        </span>
                      )}
                      <span className="text-[11px] font-semibold text-[#006b35]">
                        Pronta Entrega
                      </span>
                    </div>

                    {/* Vehicle Visual */}
                    <div
                      onClick={() => onOpenCarDetail(car)}
                      className="relative h-44 rounded-2xl overflow-hidden bg-[#f1f3ff] flex items-center justify-center p-2 mb-4 group-hover:scale-[1.02] transition-transform cursor-pointer"
                    >
                      <img
                        src={car.imageUrl}
                        alt={car.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Title & Category */}
                    <div className="mb-3">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block">
                        {car.brand} • {car.categoryLabel}
                      </span>
                      <h3 className="text-base font-bold text-[#161c27] leading-snug">{car.name}</h3>
                      <p className="text-xs text-gray-500 truncate">{car.version}</p>
                    </div>

                    {/* Specs Quick Matrix */}
                    <div className="grid grid-cols-3 gap-1 py-2 bg-[#f1f3ff] rounded-xl px-2 text-center mb-4 text-xs">
                      <div>
                        <span className="text-[10px] text-gray-400 block">Autonomia</span>
                        <span className="font-bold text-[#161c27]">{car.specs.autonomyOrRange.split(' ')[0]}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 block">0-100 km/h</span>
                        <span className="font-bold text-[#161c27]">{car.specs.acceleration.split(' ')[0]}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-400 block">Potência</span>
                        <span className="font-bold text-[#161c27]">{car.specs.power.split(' ')[0]} cv</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-[10px] text-gray-400 block">A partir de</span>
                        <span className="text-xl font-black text-[#161c27]">
                          R$ {currentPrice.toLocaleString('pt-BR')}
                        </span>
                        <span className="text-[11px] text-gray-500"> /mês</span>
                      </div>
                      <span className="text-[10px] text-gray-500 bg-[#f1f3ff] px-2 py-0.5 rounded font-medium">
                        {selectedTerm}m • {selectedKm}km
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenCarDetail(car)}
                      className="w-full h-11 rounded-xl bg-[#006b35] text-white hover:bg-[#005227] text-xs font-bold flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                    >
                      Ver detalhes e planos
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl p-8 border border-gray-100">
            <p className="text-gray-500 text-sm">Nenhum veículo encontrado para os filtros selecionados.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-[#006b35] text-white text-xs font-bold cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
