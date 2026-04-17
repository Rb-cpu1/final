"use client";

import React from 'react';
import { CheckCircle, Download, FileText, Clock } from 'lucide-react';

interface PaymentSuccessProps {
  amount: number;
  transactionId: string;
  onNextStep: () => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ amount, transactionId, onNextStep }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-xl text-center border-t-8 border-green-600">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 p-6 rounded-full">
          <CheckCircle className="w-20 h-20 text-green-600" />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-slate-800 mb-4">Pagamento Confirmado com Sucesso!</h2>
      <p className="text-lg text-slate-600 mb-8">
        O valor de <span className="font-bold text-green-600">{amount.toLocaleString()} MT</span> foi processado e será transferido para a sua conta em até 24 horas úteis.
      </p>

      {/* Transaction Details */}
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8 text-left">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <FileText className="text-[#005a32]" />
          Detalhes da Transação
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-600">ID da Transação:</span>
            <span className="font-mono font-bold">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Valor:</span>
            <span className="font-bold">{amount.toLocaleString()} MT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Data:</span>
            <span className="font-bold">{new Date().toLocaleString('pt-PT')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Status:</span>
            <span className="font-bold text-green-600">Aprovado</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-8">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <Clock className="text-blue-600" />
          Próximos Passos
        </h3>
        <ol className="text-sm text-left space-y-2">
          <li className="flex items-start gap-2">
            <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
            <span>Aguarde o processamento do desembolso (até 24 horas)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
            <span>Verifique o valor na sua conta bancária</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
            <span>Utilize o recurso conforme planeado</span>
          </li>
        </ol>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={onNextStep}
          className="w-full bg-[#005a32] text-white py-4 rounded-lg font-bold text-xl hover:shadow-xl transition-all"
        >
          Continuar para Dashboard
        </button>
        
        <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Baftar Comprovante
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;