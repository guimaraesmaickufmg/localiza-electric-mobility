import React, { useEffect } from 'react';
import { CheckCircle2, Zap } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClear }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClear();
    }, 4000);
    return () => clearTimeout(timer);
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-[#161c27] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-700 animate-slideUp">
      <div className="w-7 h-7 rounded-lg bg-[#daee00] text-[#1a1e00] flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-4 h-4 text-[#1a1e00]" />
      </div>
      <span className="text-xs font-semibold leading-snug max-w-sm">{message}</span>
    </div>
  );
};
