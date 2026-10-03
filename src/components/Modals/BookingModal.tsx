import React, { useState } from 'react';
import { X, Calendar, CheckCircle2 } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [agency, setAgency] = useState('1');
  const [date, setDate] = useState('2025-04-12');
  const [time, setTime] = useState('09:00');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onShowToast('Agendamento solicitado com sucesso! Você receberá a confirmação por e-mail e WhatsApp.');
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 animate-fadeIn">
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#006b35] text-white flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#161c27]">Agendar Experiência Elétrica</h3>
                <span className="text-xs text-gray-500 font-mono">Código: ELETRO-LOC-2025-X89</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Agência de Retirada (Credenciada com Eletroposto Rápido)
                </label>
                <select
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  className="w-full h-12 px-3 rounded-xl bg-[#f1f3ff] text-[#161c27] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#006b35] border border-transparent cursor-pointer"
                  required
                >
                  <option value="1">São Paulo - Av. Paulista / Bela Vista (Hub EV)</option>
                  <option value="2">São Paulo - Aeroporto de Congonhas</option>
                  <option value="3">Belo Horizonte - Savassi / Contorno</option>
                  <option value="4">Rio de Janeiro - Aeroporto Santos Dumont</option>
                  <option value="5">Curitiba - Batel / Centro Cívico</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Data de Início
                  </label>
                  <input
                    type="date"
                    value={date}
                    min="2025-03-01"
                    max="2025-04-30"
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl bg-[#f1f3ff] text-[#161c27] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#006b35]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                    Horário da Retirada
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full h-12 px-3 rounded-xl bg-[#f1f3ff] text-[#161c27] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#006b35] cursor-pointer"
                  >
                    <option>09:00</option>
                    <option>11:00</option>
                    <option>14:00</option>
                    <option>16:00</option>
                  </select>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f1f3ff] text-xs text-[#3e4a3f] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#006b35] shrink-0 mt-0.5" />
                <span>
                  <strong>Duração de 48 horas inclusa.</strong> Franquia total de 300 km com seguro e recargas parceiras ativas. O carro é entregue com 100% de bateria carregada.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#006b35] hover:bg-[#005227] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#adf3bb] text-[#006b35] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#161c27]">Agendamento Confirmado!</h3>
            <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
              Sua experiência elétrica de 48h com o <strong className="text-[#006b35]">BYD Dolphin EV</strong> foi agendada com sucesso para <strong>{new Date(date).toLocaleDateString('pt-BR')} às {time}</strong>.
            </p>
            <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-500 font-mono">
              Reserva vinculada ao Voucher: ELETRO-LOC-2025-X89
            </div>
            <button
              onClick={resetAndClose}
              className="px-6 py-2 rounded-xl bg-[#006b35] text-white font-bold text-xs hover:bg-[#005227] transition-colors cursor-pointer"
            >
              Concluído
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
