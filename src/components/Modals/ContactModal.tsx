import React, { useState } from 'react';
import { X, MessageSquare, Phone, Mail, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState('Dúvida sobre carro elétrico e recarga');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onShowToast('Mensagem enviada com sucesso! Um consultor responderá em breve.');
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
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
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#161c27]">Fale Conosco</h3>
                <span className="text-xs text-gray-500">Atendimento especializado Localiza Assinatura</span>
              </div>
            </div>

            {/* Direct Channels Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a
                href="https://wa.me/558009792020"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-[#e8eeff] hover:bg-[#dde2f3] rounded-2xl flex flex-col items-start gap-1 transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#006b35] text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#161c27] mt-1">WhatsApp Oficial</span>
                <span className="text-[10px] text-gray-500">Resposta em minutos</span>
              </a>

              <a
                href="tel:08009792020"
                className="p-3 bg-[#e8eeff] hover:bg-[#dde2f3] rounded-2xl flex flex-col items-start gap-1 transition-colors group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#006b35] text-white flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-[#161c27] mt-1">0800 979 2020</span>
                <span className="text-[10px] text-gray-500">Ligação Gratuita 24h</span>
              </a>
            </div>

            {/* Quick Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Assunto</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-gray-50 text-xs font-medium border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b35] cursor-pointer"
                >
                  <option>Dúvida sobre carro elétrico e recarga</option>
                  <option>Simular plano personalizado</option>
                  <option>Agendamento do Voucher 48h</option>
                  <option>Dúvida sobre contrato ativo</option>
                  <option>Outros assuntos</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  placeholder="Nome completo"
                  defaultValue="Mariana Albuquerque Silva"
                  className="w-full h-11 px-3 rounded-xl bg-gray-50 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b35]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">WhatsApp</label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 98765-4321"
                    defaultValue="(11) 98765-4321"
                    className="w-full h-11 px-3 rounded-xl bg-gray-50 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b35]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">E-mail</label>
                  <input
                    type="email"
                    required
                    placeholder="seu@email.com"
                    defaultValue="mariana.silva@exemplo.com"
                    className="w-full h-11 px-3 rounded-xl bg-gray-50 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b35]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Mensagem (opcional)</label>
                <textarea
                  rows={3}
                  placeholder="Conte como podemos te ajudar..."
                  className="w-full p-3 rounded-xl bg-gray-50 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#006b35] resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#006b35] hover:bg-[#005227] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enviar Mensagem</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#adf3bb] text-[#006b35] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#161c27]">Mensagem Enviada!</h3>
            <p className="text-xs text-gray-600 max-w-sm mx-auto leading-relaxed">
              Recebemos sua solicitação sobre <strong>{subject}</strong>. Nossa equipe de especialistas entrará em contato com você o mais breve possível.
            </p>
            <button
              onClick={resetAndClose}
              className="px-6 py-2 rounded-xl bg-[#006b35] text-white font-bold text-xs hover:bg-[#005227] transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
