"use client";

import { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  CreditCard, 
  AlertCircle,
  Download,
  Search,
  Filter,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

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

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterProvince, setFilterProvince] = useState<string>('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Senha de admin - em um app real, isso viria de variáveis de ambiente
  const ADMIN_PASSWORD = '2026MOZ';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta. Tente novamente.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setError('');
  };

  // Carregar dados do localStorage
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const savedData = localStorage.getItem('candidates');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setUsers(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setUsers([]);
        setLoading(false);
      }
    } else {
      // Se não houver dados, criar alguns dados de exemplo
      const mockData: UserData[] = [
        {
          id: '1',
          name: 'João Silva',
          nuit: '123456789',
          phone: '84-123-456',
          province: 'Maputo Cidade',
          reason: 'Compra de equipamentos para restaurante',
          amount: 50000,
          step: 'success',
          timestamp: '2024-08-15T10:30:00Z',
          paymentStatus: 'completed',
          paymentMethod: 'mpesa',
          transactionId: 'TXN123456789'
        },
        {
          id: '2',
          name: 'Maria Santos',
          nuit: '987654321',
          phone: '85-987-654',
          province: 'Maputo Província',
          reason: 'Expansão de negócio agrícola',
          amount: 100000,
          step: 'payment',
          timestamp: '2024-08-15T11:45:00Z',
          paymentStatus: 'pending',
          paymentMethod: 'emola'
        },
        {
          id: '3',
          name: 'Pedro Mendes',
          nuit: '456789123',
          phone: '82-456-789',
          province: 'Gaza',
          reason: 'Capital de giro para comércio',
          amount: 25000,
          step: 'result',
          timestamp: '2024-08-15T09:15:00Z'
        }
      ];
      setUsers(mockData);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.nuit.includes(searchTerm) ||
                         user.phone.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || user.step === filterStatus;
    const matchesProvince = filterProvince === 'all' || user.province === filterProvince;

    return matchesSearch && matchesStatus && matchesProvince;
  });

  const exportToCSV = () => {
    const headers = ['Nome', 'NUIT', 'Telefone', 'Província', 'Finalidade', 'Valor', 'Status', 'Data'];
    const csvContent = [
      headers.join(','),
      ...filteredUsers.map(user => [
        `"${user.name}"`,
        user.nuit,
        user.phone,
        user.province,
        `"${user.reason}"`,
        user.amount,
        user.step,
        new Date(user.timestamp).toLocaleString('pt-PT')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `dados_candidatos_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'payment': return 'bg-yellow-100 text-yellow-800';
      case 'result': return 'bg-blue-100 text-blue-800';
      case 'analysis': return 'bg-purple-100 text-purple-800';
      case 'form': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full border-2 border-[#005a32]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#005a32] rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Acesso Restrito</h2>
            <p className="text-gray-600">Digite a senha para acessar o painel administrativo</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Senha de Administrador</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005a32] focus:border-transparent pr-12"
                  placeholder="Digite sua senha..."
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#005a32] hover:bg-[#004a29] text-white py-3 rounded-lg font-bold transition-colors"
            >
              Acessar Painel
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            <p>© 2024 Governo de Moçambique</p>
            <p className="mt-1">Portal do Cidadão - Sistema Restrito</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-[#005a32] text-white border-b-4 border-yellow-400">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden">
              <img src="/logo-governo-oficial" alt="Brasão Moçambique" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-sm md:text-lg leading-tight">PAINEL ADMINISTRATIVO</h1>
              <p className="text-[10px] md:text-xs opacity-90 uppercase">Portal do Cidadão</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wider">Acesso Restrito</p>
              <p className="text-[10px] opacity-75 italic">Administrador</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Candidatos</p>
                <p className="text-2xl font-bold text-gray-800">{users.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aprovados</p>
                <p className="text-2xl font-bold text-gray-800">
                  {users.filter(u => u.step === 'success').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Em Pagamento</p>
                <p className="text-2xl font-bold text-gray-800">
                  {users.filter(u => u.step === 'payment').length}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Em Análise</p>
                <p className="text-2xl font-bold text-gray-800">
                  {users.filter(u => u.step === 'analysis' || u.step === 'result').length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por nome, NUIT ou telefone..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005a32] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005a32] focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">Todos Status</option>
                <option value="form">Formulário</option>
                <option value="analysis">Análise</option>
                <option value="result">Resultado</option>
                <option value="payment">Pagamento</option>
                <option value="success">Sucesso</option>
              </select>
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005a32] focus:border-transparent"
                value={filterProvince}
                onChange={(e) => setFilterProvince(e.target.value)}
              >
                <option value="all">Todas Províncias</option>
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
            
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-[#005a32] text-white rounded-lg hover:bg-[#004a29] transition-colors"
            >
              <Download className="w-5 h-5" />
              Exportar CSV
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NUIT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Província</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin w-6 h-6 border-2 border-[#005a32] border-t-transparent rounded-full"></div>
                        <span className="ml-2 text-gray-600">Carregando dados...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center text-gray-500">
                        <AlertCircle className="w-5 h-5 mr-2" />
                        Nenhum candidato encontrado
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.reason}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.nuit}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.province}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.amount.toLocaleString()} MT
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.step)}`}>
                          {user.step === 'form' && 'Formulário'}
                          {user.step === 'analysis' && 'Análise'}
                          {user.step === 'result' && 'Resultado'}
                          {user.step === 'payment' && 'Pagamento'}
                          {user.step === 'success' && 'Sucesso'}
                        </span>
                        {user.paymentStatus && (
                          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPaymentStatusColor(user.paymentStatus)}`}>
                            {user.paymentStatus === 'completed' && 'Pago'}
                            {user.paymentStatus === 'pending' && 'Pendente'}
                            {user.paymentStatus === 'failed' && 'Falhou'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.timestamp).toLocaleString('pt-PT')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;