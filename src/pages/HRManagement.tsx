import React, { useState, useEffect } from 'react';
import NewEmployeeModal from '../components/hr/NewEmployeeModal';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Download, 
  Upload,
  Calendar,
  Clock,
  DollarSign,
  BarChart3,
  GraduationCap,
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  CreditCard,
  Star,
  Award,
  CheckCircle,
  AlertTriangle,
  Briefcase
} from 'lucide-react';
import { getEmployees, Employee } from '../services/employeeService';
import { logAuditEvent } from '../services/hrService';
import EmployeeDocuments from '../components/hr/EmployeeDocuments';
import EmployeeAttendance from '../components/hr/EmployeeAttendance';
import EmployeeLeave from '../components/hr/EmployeeLeave';
import EmployeePayroll from '../components/hr/EmployeePayroll';
import EmployeePerformance from '../components/hr/EmployeePerformance';
import EmployeeTraining from '../components/hr/EmployeeTraining';

const HRManagement = () => {
  const [activeTab, setActiveTab] = useState('employees');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewEmployeeModal, setShowNewEmployeeModal] = useState(false);
  const [filters, setFilters] = useState({
    department: 'all',
    position: 'all',
    status: 'all'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setIsLoading(true);
    try {
      const result = await getEmployees();
      if (result.success) {
        setEmployees(result.data);
        // İlk çalışanı otomatik seç
        if (result.data.length > 0) {
          setSelectedEmployee(result.data[0]);
        }
      }
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on_leave': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'on_leave': return 'İzinli';
      case 'inactive': return 'Pasif';
      default: return 'Bilinmiyor';
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = filters.department === 'all' || employee.department === filters.department;
    const matchesPosition = filters.position === 'all' || employee.position === filters.position;
    const matchesStatus = filters.status === 'all' || employee.status === filters.status;
    
    return matchesSearch && matchesDepartment && matchesPosition && matchesStatus;
  });

  const renderTabContent = () => {
    if (!selectedEmployee) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Personel Seçin</h3>
            <p className="text-gray-600">Detayları görüntülemek için sol panelden bir personel seçin</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'employees':
        return (
          <div className="space-y-6">
            {/* Employee Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedEmployee.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedEmployee.name)}&background=random`}
                  alt={selectedEmployee.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedEmployee.name}</h2>
                  <p className="text-lg text-gray-600">{selectedEmployee.position}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedEmployee.status)}`}>
                      {getStatusText(selectedEmployee.status)}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{selectedEmployee.performance}/5.0</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{selectedEmployee.salary ? `₺${selectedEmployee.salary.toLocaleString()}` : 'Belirtilmemiş'}</div>
                  <div className="text-sm text-gray-500">Aylık Maaş</div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{selectedEmployee.leaveBalance}</div>
                    <div className="text-sm text-gray-500">Kalan İzin</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-green-600" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">{selectedEmployee.lastCheckIn || '-'}</div>
                    <div className="text-sm text-gray-500">Son Giriş</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-purple-600" />
                  <div>
                    <div className="text-lg font-bold text-gray-900">{selectedEmployee.lastCheckOut || '-'}</div>
                    <div className="text-sm text-gray-500">Son Çıkış</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{selectedEmployee.performance}</div>
                    <div className="text-sm text-gray-500">Performans</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kişisel Bilgiler</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900">İletişim Bilgileri</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{selectedEmployee.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{selectedEmployee.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{selectedEmployee.department}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">{selectedEmployee.position}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-md font-medium text-gray-900">İş Bilgileri</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">Başlangıç: {selectedEmployee.startDate}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">ID: {selectedEmployee.employeeId}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Star className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-900">Performans: {selectedEmployee.performance}/5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <EmployeeDocuments 
            employeeId={selectedEmployee.id} 
            employeeName={selectedEmployee.name}
            canEdit={true}
          />
        );

      case 'attendance':
        return (
          <EmployeeAttendance 
            employeeId={selectedEmployee.id} 
            employeeName={selectedEmployee.name}
          />
        );

      case 'leave':
        return (
          <EmployeeLeave 
            employeeId={selectedEmployee.id} 
            employeeName={selectedEmployee.name}
            canApprove={true}
          />
        );

      case 'payroll':
        return (
          <EmployeePayroll 
            employeeId={selectedEmployee.id} 
            employeeName={selectedEmployee.name}
            canViewSalary={true}
          />
        );

      case 'performance':
        return (
          <EmployeePerformance 
            employeeId={selectedEmployee.id} 
            employeeName={selectedEmployee.name}
            canEdit={true}
          />
        );

      case 'training':
        return (
          <EmployeeTraining 
            employeeId={selectedEmployee.id} 
            employeeName={selectedEmployee.name}
            canEdit={true}
          />
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Raporlama</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">📊 Rapor Modülü</h4>
              <p className="text-sm text-yellow-700">
                Detaylı raporlama özellikleri yakında eklenecek!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">İK & PDKS Yönetimi</h1>
          <p className="text-gray-600 mt-1">Personel yönetimi, izin takibi ve bordro işlemleri</p>
        </div>
        <button 
          onClick={() => setShowNewEmployeeModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Yeni Personel</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Personel</p>
              <p className="text-3xl font-bold text-blue-600">{employees.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">Aktif çalışan</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">İzinli Personel</p>
              <p className="text-3xl font-bold text-yellow-600">
                {employees.filter(e => e.status === 'on_leave').length}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-sm text-yellow-600 mt-2">Bugün izinli</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ortalama Performans</p>
              <p className="text-3xl font-bold text-green-600">4.7</p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">5 üzerinden</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aylık Bordro</p>
              <p className="text-3xl font-bold text-purple-600">₺122K</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">Bu ay toplam</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'employees', label: 'Personeller', icon: Users },
              { id: 'documents', label: 'Özlük Dosyası', icon: FileText },
              { id: 'leave', label: 'İzin & Vardiya', icon: Calendar },
              { id: 'attendance', label: 'Giriş / Çıkış', icon: Clock },
              { id: 'payroll', label: 'Bordro', icon: DollarSign },
              { id: 'performance', label: 'Performans', icon: BarChart3 },
              { id: 'training', label: 'Eğitimler', icon: GraduationCap },
              { id: 'reports', label: 'Raporlama', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex min-h-[600px]">
          {/* Left Panel - Employee List */}
          <div className="w-1/3 border-r border-gray-200 p-6">
            {/* Search and Filters */}
            <div className="space-y-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Personel ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">Tüm Departmanlar</option>
                  <option value="Tıp">Tıp</option>
                  <option value="Satış">Satış</option>
                  <option value="Operasyon">Operasyon</option>
                </select>
                
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="active">Aktif</option>
                  <option value="on_leave">İzinli</option>
                  <option value="inactive">Pasif</option>
                </select>
              </div>
            </div>

            {/* Employee Cards */}
            <div className="space-y-3 overflow-y-auto max-h-[500px]">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  onClick={() => setSelectedEmployee(employee)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedEmployee?.id === employee.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={employee.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=random`}
                      alt={employee.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{employee.name}</h3>
                      <p className="text-sm text-gray-600 truncate">{employee.position}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(employee.status)}`}>
                          {getStatusText(employee.status)}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-xs text-gray-600">{employee.performance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Tab Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* AI & Automation Features */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Users className="h-5 w-5 text-purple-600" />
          <span>🤖 Akıllı İK Yönetimi & Otomasyonlar</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Otomatik İzin Yönetimi</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Otomatik izin hesaplama ve bakiye takibi</li>
              <li>• Akıllı vardiya planlama algoritması</li>
              <li>• İzin çakışma kontrolü ve uyarıları</li>
              <li>• Yasal izin hakları otomatik hesaplama</li>
              <li>• Tatil günleri ve resmi tatil entegrasyonu</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">PDKS & Bordro Otomasyonu</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Otomatik mesai hesaplama</li>
              <li>• Geç kalma ve erken çıkış uyarıları</li>
              <li>• Bordro otomatik hesaplama</li>
              <li>• SGK ve vergi kesintileri</li>
              <li>• Performans bonusu hesaplama</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Performans & Eğitim</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Otomatik performans değerlendirme</li>
              <li>• Eğitim ihtiyaç analizi</li>
              <li>• Sertifika takip sistemi</li>
              <li>• Kariyer gelişim önerileri</li>
              <li>• KVKK uyumlu veri yönetimi</li>
            </ul>
          </div>
        </div>
      </div>

      {/* New Employee Modal */}
      {showNewEmployeeModal && (
        <NewEmployeeModal
          isOpen={showNewEmployeeModal}
          onClose={() => setShowNewEmployeeModal(false)}
          onEmployeeAdded={() => {
            setShowNewEmployeeModal(false);
            loadEmployees(); // Personel listesini yenile
          }}
        />
      )}
    </div>
  );
};

export default HRManagement;