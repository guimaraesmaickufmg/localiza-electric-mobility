import React, { useState } from 'react';
import { NavTab, CarModel, CarCategory } from '../types';
import { CARS_DATA, TESTIMONIALS_DATA } from '../data/mockData';
import {
  Zap,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  Shield,
  Wrench,
  TrendingUp,
  Star,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Search,
  Filter,
} from 'lucide-react';

interface HomeViewProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenCarDetail: (car: CarModel) => void;
  onApplyCategoryFilter?: (category: CarCategory) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectTab,
  onOpenCarDetail,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<CarCategory>('electric');
  const [selectedTerm, setSelectedTerm] = useState<'12' | '24' | '36'>('36');
  const [selectedKm, setSelectedKm] = useState('1000');

  const slides = [
    {
      pill: 'Mobilidade Sustentável',
      title: 'Elétrico sem dúvidas.',
      subtitleHighlight: 'Mobilidade com confiança.',
      description:
        'Entenda os custos, a autonomia e como um carro elétrico pode funcionar perfeitamente na sua rotina diária sem surpresas.',
      primaryBtnText: 'Descobrir meu elétrico',
      primaryAction: () => onSelectTab('mobilidade-eletrica'),
      secondaryBtnText: 'Comparar custos',
      secondaryAction: () => onSelectTab('comparador'),
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuARiBtHWKY0QbsQFO-gfHWYWXAcqXUzbTdvAiY7a-HSZf8u4Owx-k9bV3D9r9wKSqGQCb3eClSekjMQaQzS6FHyBumeHR1mvuN50QxnDlwrCUru77IvrQQ5MJvmPuMV-uABmOr9Zocir74spC6T-ZwtHXmuvQRqOM62HoUPQEusO44hUe_eEyzZYKdOKvaqNQ8eKsk_O419Yf5OpIJYvZzJN7SxdbRFAZ3E_D_b2GJIq_1i63UAfQvA',
      badgeTitle: 'Rede de Recarga',
      badgeSubtitle: 'Mais de 4.800 pontos',
    },
    {
      pill: 'Família & Viagem',
      title: 'Espaço, robustez e',
      subtitleHighlight: 'Conforto total para viajar.',
      description:
        'SUVs modernos com porta-malas amplos, tecnologia de condução semi-autônoma e segurança máxima para sua família.',
      primaryBtnText: 'Ver SUVs Disponíveis',
      primaryAction: () => onSelectTab('carros-e-planos'),
      secondaryBtnText: 'Calcular Planos',
      secondaryAction: () => onSelectTab('comparador'),
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCLdF8KqJz-zMqL9OMGtBKK5SNKuOIpP-iD0pCGXCFC-A8iXfri_rrnAI1jVKK35HWT1QdHIYSctmCbJz8hR71jWlKMgYihggk4eZrBkmNQAHw5u-T2He5GFKk0MFswQ-0Z24138Wd6nxqKzHpppFWj8NzbQb50J_Zwiz9hOUQbYH08vpKS49REH3LMgtuOYdlG5rV32gbr5e_hxi9L3mrdPNu9L9yVD91tJ7sxgXpYhy9PMKNxZREy',
      badgeTitle: 'Porta-malas',
      badgeSubtitle: 'Até 600 Litros VDA',
    },
    {
      pill: 'Economia Urbana',
      title: 'Compactos ágeis para',
      subtitleHighlight: 'O trânsito do dia a dia.',
      description:
        'Hatches com excelente consumo de combustível, fáceis de manobrar e perfeitos para quem busca praticidade diária com custo fixo previsível.',
      primaryBtnText: 'Conhecer Compactos',
      primaryAction: () => onSelectTab('carros-e-planos'),
      secondaryBtnText: 'Ver Vantagens',
      secondaryAction: () => onSelectTab('inicio'),
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDF4wxmoQQehVVdIHt4lYpW5WuueChrRrXwOOFgtK4FwvYt7HPXsKgS5PjC7Xpk2n_s-1nFpC2q88wthSTic8oi5fTbUXyj7z8oZGwwDMf-uxXR-zcaf8GP7vE1foXPkWXnjsO3Yd7PZkAdInW0obF5Z1Et97ZXHT_Z2wNKD0HAj8ho_egnboLf7zRlVomYsN3lEo_GyJvsJjpJi24NxPfkR2RXfzGYwdI16ZdsUN91gCO-TK71xZSo',
      badgeTitle: 'Consumo Médio',
      badgeSubtitle: 'Até 17.8 km/litro',
    },
  ];

  const currentSlide = slides[activeSlide];

  // Featured 4 cars for the home showcase
  const featuredCars = CARS_DATA.slice(0, 4);

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SLIDER SECTION */}
      <section className="relative w-full overflow-hidden bg-[#f1f3ff] pt-4 pb-8">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white border border-gray-100">
            <div className="relative grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[560px] items-stretch">
              {/* Text Content Column */}
              <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-center z-10 bg-gradient-to-r from-white via-white/95 to-transparent">
                {/* Supertag Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#daee00] text-[#1a1e00] mb-4 w-fit shadow-xs font-bold text-xs uppercase tracking-wide">
                  <Zap className="w-3.5 h-3.5 text-[#586100] fill-current" />
                  <span>{currentSlide.pill}</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#161c27] mb-3 tracking-tight leading-tight">
                  {currentSlide.title} <br />
                  <span className="text-[#006b35]">{currentSlide.subtitleHighlight}</span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-[#3e4a3f] mb-6 max-w-lg leading-relaxed">
                  {currentSlide.description}
                </p>

                {/* Primary & Secondary Action CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
                  <button
                    onClick={currentSlide.primaryAction}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#006b35] text-white font-bold text-sm hover:bg-[#005227] transition-all shadow-md group cursor-pointer"
                  >
                    <span>{currentSlide.primaryBtnText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={currentSlide.secondaryAction}
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#e8eeff] text-[#006b35] font-bold text-sm hover:bg-[#dde2f3] transition-colors cursor-pointer"
                  >
                    {currentSlide.secondaryBtnText}
                  </button>
                </div>

                {/* Feature Check Line */}
                <div className="flex items-center gap-2 text-[#3e4a3f] text-xs font-medium pt-2">
                  <CheckCircle2 className="w-4 h-4 text-[#006b35] shrink-0" />
                  <span>Compare custos reais, planeje rotas e tire suas dúvidas com especialistas.</span>
                </div>
              </div>

              {/* Hero Photography Column */}
              <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full overflow-hidden bg-gray-100">
                <img
                  src={currentSlide.imageUrl}
                  alt={currentSlide.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-transparent to-transparent opacity-80 lg:opacity-40 pointer-events-none"></div>

                {/* Float Badge on photo */}
                <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-[#daee00] flex items-center justify-center text-[#1a1e00] font-bold">
                    <Zap className="w-5 h-5 fill-current text-[#586100]" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                      {currentSlide.badgeTitle}
                    </span>
                    <span className="text-sm text-[#161c27] font-bold">{currentSlide.badgeSubtitle}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Bottom Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3 bg-[#f1f3ff] border-t border-gray-100">
              <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
                {slides.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      activeSlide === idx
                        ? 'bg-[#006b35] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        activeSlide === idx ? 'bg-[#daee00]' : 'bg-gray-400'
                      }`}
                    ></span>
                    <span>0{idx + 1} {s.pill}</span>
                  </button>
                ))}
              </div>

              {/* Prev / Next controls */}
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  aria-label="Slide anterior"
                  onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-colors cursor-pointer border border-gray-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs text-gray-500 font-mono px-1">
                  0{activeSlide + 1} / 0{slides.length}
                </span>
                <button
                  aria-label="Próximo slide"
                  onClick={() => setActiveSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
                  className="w-8 h-8 rounded-lg bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-colors cursor-pointer border border-gray-200"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK SEARCH & INTERACTIVE FILTER BAR */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full -mt-6 z-20">
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-gray-100">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#006b35]" />
              <h2 className="text-base font-bold text-[#161c27]">
                Encontre o carro ideal para sua assinatura
              </h2>
            </div>
            <span className="hidden md:inline-flex text-xs text-gray-500 font-medium">
              Mais de 120 modelos 0km disponíveis
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Filter 1: Categoria */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as CarCategory)}
                className="w-full h-12 px-3 rounded-xl bg-[#f1f3ff] text-[#161c27] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#006b35] cursor-pointer"
              >
                <option value="all">Todas as categorias</option>
                <option value="electric">⚡ Elétricos & Híbridos</option>
                <option value="suv">SUVs e Crossovers</option>
                <option value="hatch">Hatches Econômicos</option>
                <option value="sedan">Sedans Executivos</option>
              </select>
            </div>

            {/* Filter 2: Período */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Período de Contrato
              </label>
              <div className="grid grid-cols-3 gap-1 bg-[#f1f3ff] p-1 rounded-xl h-12 items-center">
                {(['12', '24', '36'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTerm(t)}
                    className={`h-full rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedTerm === t
                        ? 'bg-[#006b35] text-white shadow-xs'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {t}m
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 3: Franquia Mensal */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Franquia Mensal
              </label>
              <select
                value={selectedKm}
                onChange={(e) => setSelectedKm(e.target.value)}
                className="w-full h-12 px-3 rounded-xl bg-[#f1f3ff] text-[#161c27] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#006b35] cursor-pointer"
              >
                <option value="1000">1.000 km / mês</option>
                <option value="1500">1.500 km / mês</option>
                <option value="2000">2.000 km / mês</option>
                <option value="2500">2.500 km / mês</option>
                <option value="3000">3.000 km / mês</option>
              </select>
            </div>

            {/* Search CTA */}
            <div>
              <button
                type="button"
                onClick={() => onSelectTab('carros-e-planos')}
                className="w-full h-12 rounded-xl bg-[#006b35] hover:bg-[#005227] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Ver 42 Carros no Catálogo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VANTAGENS DA ASSINATURA LOCALIZA */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#006b35] block mb-1">
            Mobilidade Sem Dores de Cabeça
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161c27]">
            Vantagens exclusivas da Assinatura Localiza
          </h2>
          <p className="text-sm text-[#3e4a3f] mt-2">
            Você aproveita o prazer de estrear um carro novo todo ano sem imobilizar seu capital ou se preocupar com burocracias.
          </p>
        </div>

        {/* Advantages 4 Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#e8eeff] flex items-center justify-center text-[#006b35] mb-4 group-hover:bg-[#006b35] group-hover:text-white transition-colors">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#161c27] mb-2">IPVA & Documentos Inclusos</h3>
              <p className="text-xs text-[#3e4a3f] leading-relaxed">
                Emplacamento, licenciamento anual e taxa de IPVA 100% quitados pela Localiza. Zero surpresas fiscais em janeiro.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs text-[#006b35] font-bold">
              <span>Incluso na parcela mensal</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#e8eeff] flex items-center justify-center text-[#006b35] mb-4 group-hover:bg-[#006b35] group-hover:text-white transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#161c27] mb-2">Seguro & Assistência 24h</h3>
              <p className="text-xs text-[#3e4a3f] leading-relaxed">
                Proteção completa contra roubo, colisão e danos a terceiros, com suporte de guincho e socorro mecânico 24 horas em todo o Brasil.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs text-[#006b35] font-bold">
              <span>Cobertura nacional 24/7</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#e8eeff] flex items-center justify-center text-[#006b35] mb-4 group-hover:bg-[#006b35] group-hover:text-white transition-colors">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#161c27] mb-2">Manutenção Preventiva</h3>
              <p className="text-xs text-[#3e4a3f] leading-relaxed">
                Revisões periódicas obrigatórias em concessionárias autorizadas e trocas de desgaste natural inclusas no contrato.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs text-[#006b35] font-bold">
              <span>Agendamento via App</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#daee00] flex items-center justify-center text-[#1a1e00] mb-4 group-hover:bg-[#006b35] group-hover:text-white transition-colors">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#161c27] mb-2">Zero Desvalorização</h3>
              <p className="text-xs text-[#3e4a3f] leading-relaxed">
                Livre-se da perda de 20% do valor do carro ao sair da concessionária. Seu dinheiro continua investido rendendo para você.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-xs text-[#296b3f] font-bold">
              <span>Capital sempre livre</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. DESTAQUES DA FROTA ELÉTRICA E MAIS BUSCADOS */}
      <section className="w-full bg-[#f1f3ff] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#006b35] text-xs font-bold mb-2 shadow-2xs border border-gray-200">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Catálogo em Alta</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161c27]">
                Destaques da Frota Elétrica e Mais Buscados
              </h2>
              <p className="text-sm text-[#3e4a3f] mt-1">Carros zero km prontos para transformar sua mobilidade.</p>
            </div>
            <button
              onClick={() => onSelectTab('carros-e-planos')}
              className="inline-flex items-center gap-1 text-sm text-[#006b35] hover:text-[#005227] font-bold transition-colors cursor-pointer"
            >
              <span>Ver catálogo completo (124)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car) => (
              <div
                key={car.id}
                className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group border border-gray-100"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {car.isElectric ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#daee00] text-[#1a1e00] text-[11px] font-bold">
                        <Zap className="w-3 h-3 fill-current" /> 100% Elétrico
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 text-[11px] font-semibold">
                        Turbo Flex
                      </span>
                    )}
                    <span className="text-[11px] font-semibold text-[#006b35]">
                      {car.isElectric ? 'Pronta Entrega' : 'Mais Vendido'}
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
                        R$ {car.monthlyBasePrice.toLocaleString('pt-BR')}
                      </span>
                      <span className="text-[11px] text-gray-500"> /mês</span>
                    </div>
                    <span className="text-[11px] text-gray-500 bg-[#f1f3ff] px-2 py-0.5 rounded font-medium">
                      36 meses
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
            ))}
          </div>
        </div>
      </section>

      {/* 5. SOCIAL PROOF & TESTIMONIALS + APP DOWNLOAD */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Testimonials */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-[#006b35] uppercase tracking-wider block mb-1">
                Histórias Reais
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#161c27]">
                Quem assina com a Localiza recomenda
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TESTIMONIALS_DATA.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 text-[#daee00] mb-3">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#daee00] text-[#daee00]" />
                      ))}
                    </div>
                    <p className="text-xs text-[#161c27] leading-relaxed mb-4 italic">
                      "{item.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                    <div className="w-9 h-9 rounded-full bg-[#f1f3ff] flex items-center justify-center text-[#006b35] font-bold text-xs">
                      {item.initials}
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-[#161c27]">{item.name}</span>
                      <span className="block text-[11px] text-gray-500">{item.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-8 pt-2">
              <div>
                <span className="text-2xl font-black text-[#006b35]">4.8 / 5</span>
                <span className="block text-xs text-gray-500">Avaliação média dos clientes</span>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div>
                <span className="text-2xl font-black text-[#006b35]">+50.000</span>
                <span className="block text-xs text-gray-500">Carros ativos em todo o Brasil</span>
              </div>
            </div>
          </div>

          {/* App Download Banner */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#006b35] to-[#005227] rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8cf9a9] text-[#00210c] text-xs font-bold mb-4">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Aplicativo Localiza Meu Carro</span>
              </div>

              <h3 className="text-2xl font-bold mb-2">Toda sua mobilidade na palma da mão</h3>
              <p className="text-xs text-white/80 leading-relaxed mb-6">
                Agende revisões preventivas, consulte apólices do seguro, acesse a rede credenciada de recarga e gerencie suas faturas com um clique.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => alert('Download do App Localiza Meu Carro disponível no Google Play Store.')}
                  className="h-12 px-4 rounded-xl bg-white text-[#161c27] hover:bg-gray-100 text-xs flex items-center gap-2.5 transition-colors shadow-md cursor-pointer"
                >
                  <span className="font-bold">Google Play</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Download do App Localiza Meu Carro disponível na Apple App Store.')}
                  className="h-12 px-4 rounded-xl bg-white text-[#161c27] hover:bg-gray-100 text-xs flex items-center gap-2.5 transition-colors shadow-md cursor-pointer"
                >
                  <span className="font-bold">App Store</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
