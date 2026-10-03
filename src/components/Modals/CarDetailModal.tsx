import React, { useState } from 'react';
import { CarModel } from '../../types';
import { X, CheckCircle2, Shield, Calendar, Gauge, Zap, Check, ArrowRight } from 'lucide-react';

interface CarDetailModalProps {
  car: CarModel | null;
  onClose: () => void;
  onNavigateToComparator: () => void;
  onShowToast: (msg: string) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  onClose,
  onNavigateToComparator,
  onShowToast,
}) => {
  const [selectedTerm, setSelectedTerm] = useState<12 | 24 | 36 | 48>(36);
  const [selectedKm, setSelectedKm] = useState<number>(1000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!car) return null;

  // Mileage multiplier
  const kmMultiplier = selectedKm === 1000 ? 1 : selectedKm === 1500 ? 1.12 : selectedKm === 2000 ? 1.25 : selectedKm === 2500 ? 1.38 : 1.5;
  const baseTermPrice = car.prices[selectedTerm] || car.monthlyBasePrice;
  const finalPrice = Math.round(baseTermPrice * kmMultiplier);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onShowToast(`Proposta simulada para o ${car.name}! Um consultor entrará em contato.`);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-gray-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header / Badges */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006b35]">
                {car.brand} • {car.categoryLabel}
              </span>
              {car.isElectric && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#daee00] text-[#1a1e00] flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-current" /> 100% Elétrico
                </span>
              )}
            </div>

            <h2 className="text-2xl font-extrabold text-[#161c27] mb-1">{car.name}</h2>
            <p className="text-xs text-gray-500 mb-4">{car.version}</p>

            {/* Vehicle Visual */}
            <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden bg-[#f1f3ff] flex items-center justify-center p-4 mb-6">
              <img
                src={car.imageUrl}
                alt={car.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
                onError={(e) => {
                  // Fallback styling
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-[#f1f3ff] rounded-xl text-center mb-6">
              <div>
                <span className="text-[11px] text-gray-500 block">Autonomia / Alcance</span>
                <span className="text-sm font-bold text-[#161c27]">{car.specs.autonomyOrRange}</span>
              </div>
              <div>
                <span className="text-[11px] text-gray-500 block">Aceleração</span>
                <span className="text-sm font-bold text-[#161c27]">{car.specs.acceleration}</span>
              </div>
              <div>
                <span className="text-[11px] text-gray-500 block">Potência</span>
                <span className="text-sm font-bold text-[#161c27]">{car.specs.power}</span>
              </div>
            </div>

            {/* Plan Customizer */}
            <div className="space-y-4 mb-6 p-4 rounded-2xl bg-gray-50 border border-gray-100">
              <h3 className="text-sm font-bold text-[#161c27]">Personalize seu plano de assinatura</h3>

              {/* Term Selection */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Duração do Contrato</label>
                <div className="grid grid-cols-4 gap-2">
                  {([12, 24, 36, 48] as const).map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setSelectedTerm(term)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedTerm === term
                          ? 'bg-[#006b35] text-white shadow-xs'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {term} meses
                    </button>
                  ))}
                </div>
              </div>

              {/* Mileage Selection */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Franquia Mensal de Rodagem</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[1000, 1500, 2000, 2500, 3000].map((km) => (
                    <button
                      key={km}
                      type="button"
                      onClick={() => setSelectedKm(km)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedKm === km
                          ? 'bg-[#006b35] text-white shadow-xs'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {km.toLocaleString('pt-BR')} km
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculated Monthly Price */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div>
                  <span className="text-xs text-gray-500 block">Mensalidade sem entrada</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[#006b35]">
                      R$ {finalPrice.toLocaleString('pt-BR')}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">/mês</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-gray-400 block">{selectedTerm} meses • {selectedKm} km/mês</span>
                  <span className="text-xs font-bold text-[#296b3f] flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Tudo incluso
                  </span>
                </div>
              </div>
            </div>

            {/* Inclusions Check List */}
            <div className="space-y-1.5 mb-6 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#006b35]" />
                <span>IPVA, licenciamento e emplacamento 100% quitados anualmente</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#006b35]" />
                <span>Seguro total com cobertura completa a terceiros e colisão</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#006b35]" />
                <span>Revisões preventivas autorizadas e trocas de desgaste natural</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#006b35]" />
                <span>Assistência mecânica emergencial e guincho 24h em todo o Brasil</span>
              </div>
            </div>

            {/* Form actions */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Seu Nome Completo"
                  defaultValue="Mariana Albuquerque Silva"
                  required
                  className="h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#006b35]"
                />
                <input
                  type="tel"
                  placeholder="Seu WhatsApp (DDD + Telefone)"
                  defaultValue="(11) 98765-4321"
                  required
                  className="h-11 px-3.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#006b35]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToComparator();
                  }}
                  className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Comparar com outros modelos
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-6 rounded-xl bg-[#006b35] hover:bg-[#005227] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Processando simulação...</span>
                  ) : (
                    <>
                      <span>Solicitar Proposta Online</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#adf3bb] text-[#006b35] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-[#161c27]">Simulação Enviada com Sucesso!</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              Obrigado! Sua proposta para o <strong className="text-[#006b35]">{car.name}</strong> ({selectedTerm} meses • {selectedKm.toLocaleString('pt-BR')} km/mês) por <strong className="text-[#161c27]">R$ {finalPrice.toLocaleString('pt-BR')}/mês</strong> foi registrada sob o protocolo <span className="font-mono font-bold text-gray-800">#LOC-PROP-2025</span>.
            </p>
            <div className="p-4 bg-gray-50 rounded-2xl max-w-sm mx-auto text-xs text-gray-500">
              Nosso time de consultores entrará em contato via WhatsApp e e-mail em até 15 minutos úteis.
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#006b35] text-white font-bold text-xs hover:bg-[#005227] transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
