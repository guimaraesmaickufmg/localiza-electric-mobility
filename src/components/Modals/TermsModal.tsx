import React from 'react';
import { X, ShieldAlert } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#006b35]/10 text-[#006b35] flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-[#161c27]">Regras e Condições do Benefício</h3>
        </div>

        <div className="space-y-3.5 text-xs text-[#3e4a3f] leading-relaxed">
          <p>
            <strong>1. Elegibilidade:</strong> Benefício exclusivo concedido a clientes cadastrados no programa Localiza Assinatura que receberam comunicação direta oficial.
          </p>
          <p>
            <strong>2. Veículos Aplicáveis:</strong> Frota composta por modelos compactos e médios 100% elétricos (ex: BYD Dolphin EV, Renault Kwid E-Tech ou equivalente homologado), mediante estoque no dia agendado.
          </p>
          <p>
            <strong>3. Franquia e Combustível Elétrico:</strong> Estão inclusos até 300 km rodados sem cobrança excedente. Recargas feitas em eletropostos da rede conveniada Localiza são gratuitas através da chave digital providenciada.
          </p>
          <p>
            <strong>4. Cancelamento ou Reagendamento:</strong> Pode ser feito sem encargos com até 12 horas de antecedência pelo aplicativo ou central de atendimento.
          </p>
          <p>
            <strong>5. Validade Improrrogável:</strong> O voucher deve ser utilizado e concluído até 30 de abril de 2025.
          </p>
          <p>
            <strong>6. Condutores:</strong> O benefício é emitido em nome do titular, sendo permitida a inclusão de um condutor adicional sem custos no momento da retirada.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#006b35] text-white font-bold text-xs hover:bg-[#005227] transition-colors cursor-pointer"
          >
            Compreendi
          </button>
        </div>
      </div>
    </div>
  );
};
