import React, { useState } from 'react';
import { 
  Activity, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  User, 
  Calendar, 
  FileText, 
  Heart, 
  Bone, 
  Brain, 
  Scissors, 
  Pill, 
  Stethoscope,
  Users,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Star,
  TrendingUp,
  Target,
  Award,
  Timer,
  BarChart3,
  DollarSign,
  Settings,
  Bell,
  Shield
} from 'lucide-react';

const TreatmentProcesses = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    department: 'all',
    priority: 'all'
  });

  // Tedavi süreçleri
  const treatmentProcesses = [
    {
      id: 1,
      patientName: 'Ahmed Al-Rashid',
      patientId: 'P-2024-001',
      treatment: 'Kalp Bypass Ameliyatı',
      department: 'Kardiyoloji',
      doctor: 'Dr. Mehmet Özkan',
      nurse: 'Hemşire Ayşe Kaya',
      status: 'Ameliyat Sonrası',
      priority: 'Yüksek',
      startDate: '2025-01-15',
      expectedEndDate: '2025-01-25',
      currentStage: 'Yoğun Bakım',
      progress: 65,
      vitals: {
        heartRate: 78,
        bloodPressure: '120/80',
        temperature: 36.8,
        oxygenSaturation: 98
      },
      medications: ['Aspirin 100mg', 'Metoprolol 50mg', 'Atorvastatin 20mg'],
      notes: 'Ameliyat başarılı, hasta stabil durumda',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      patientName: 'Sarah Johnson',
      patientId: 'P-2024-002',
      treatment: 'Estetik Rinoplasti',
      department: 'Plastik Cerrahi',
      doctor: 'Dr. Elif Kaya',
      nurse: 'Hemşire Zeynep Demir',
      status: 'Ameliyat Öncesi',
      priority: 'Orta',
      startDate: '2025-01-20',
      expectedEndDate: '2025-01-22',
      currentStage: 'Ön Değerlendirme',
      progress: 25,
      vitals: {
        heartRate: 72,
        bloodPressure: '115/75',
        temperature: 36.5,
        oxygenSaturation: 99
      },
      medications: ['Multivitamin'],
      notes: 'Ameliyat öncesi hazırlıklar devam ediyor',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      patientName: 'Hans Mueller',
      patientId: 'P-2024-003',
      treatment: 'Saç Ekimi (FUE)',
      department: 'Dermatoloji',
      doctor: 'Dr. Can Yıldız',
      nurse: 'Hemşire Merve Şahin',
      status: 'Tamamlandı',
      priority: 'Düşük',
      startDate: '2025-01-10',
      expectedEndDate: '2025-01-12',
      currentStage: 'Takip',
      progress: 100,
      vitals: {
        heartRate: 68,
        bloodPressure: '110/70',
        temperature: 36.6,
        oxygenSaturation: 99
      },
      medications: ['Antibiyotik krem'],
      notes: 'İşlem başarıyla tamamlandı, takip randevuları planlandı',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  // Tedavi aşamaları
  const treatmentStages = [
    { id: 'consultation', name: 'Konsültasyon', icon: User, color: 'text-blue-600' },
    { id: 'pre-assessment', name: 'Ön Değerlendirme', icon: FileText, color: 'text-yellow-600' },
    { id: 'pre-surgery', name: 'Ameliyat Öncesi', icon: Clock, color: 'text-orange-600' },
    { id: 'surgery', name: 'Ameliyat', icon: Activity, color: 'text-red-600' },
    { id: 'post-surgery', name: 'Ameliyat Sonrası', icon: Heart, color: 'text-purple-600' },
    { id: 'recovery', name: 'İyileşme', icon: TrendingUp, color: 'text-green-600' },
    { id: 'follow-up', name: 'Takip', icon: CheckCircle, color: 'text-teal-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Konsültasyon': return 'bg-blue-100 text-blue-800';
      case 'Ameliyat Öncesi': return 'bg-yellow-100 text-yellow-800';
      case 'Ameliyat Sonrası': return 'bg-purple-100 text-purple-800';
      case 'Tamamlandı': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Yüksek': return 'bg-red-100 text-red-800';
      case 'Orta': return 'bg-yellow-100 text-yellow-800';
      case 'Düşük': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'Kardiyoloji': return <Heart className="h-4 w-4 text-red-600" />;
      case 'Ortopedi': return <Bone className="h-4 w-4 text-blue-600" />;
      case 'Nöroloji': return <Brain className="h-4 w-4 text-purple-600" />;
      case 'Plastik Cerrahi': return <Scissors className="h-4 w-4 text-pink-600" />;
      case 'Dermatoloji': return <Pill className="h-4 w-4 text-green-600" />;
      default: return <Stethoscope className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tedavi Süreçleri</h1>
          <p className="text-gray-600 mt-1">Klinik süreçler, tedavi takibi ve hasta yönetimi</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Yeni Tedavi Süreci</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktif Tedaviler</p>
              <p className="text-3xl font-bold text-blue-600">89</p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+8 bu hafta</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kritik Hastalar</p>
              <p className="text-3xl font-bold text-red-600">12</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-sm text-red-600 mt-2">Yakın takip gerekli</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tamamlanan</p>
              <p className="text-3xl font-bold text-green-600">156</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">Bu ay</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ortalama Süre</p>
              <p className="text-3xl font-bold text-purple-600">8.5</p>
            </div>
            <Timer className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">gün</p>
        </div>
      </div>

      {/* Treatment Stages Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tedavi Aşamaları</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {treatmentStages.map((stage, index) => (
            <div key={stage.id} className="relative">
              <div className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                <stage.icon className={`h-8 w-8 ${stage.color} mb-2`} />
                <span className="text-sm font-medium text-gray-900 text-center">{stage.name}</span>
                <span className="text-xs text-gray-500 mt-1">
                  {treatmentProcesses.filter(p => p.currentStage === stage.name).length} hasta
                </span>
              </div>
              {index < treatmentStages.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Hasta, tedavi ara..."
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filtreler:</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="consultation">Konsültasyon</option>
              <option value="pre-surgery">Ameliyat Öncesi</option>
              <option value="post-surgery">Ameliyat Sonrası</option>
              <option value="completed">Tamamlandı</option>
            </select>
            
            <select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Bölümler</option>
              <option value="cardiology">Kardiyoloji</option>
              <option value="orthopedics">Ortopedi</option>
              <option value="plastic-surgery">Plastik Cerrahi</option>
              <option value="dermatology">Dermatoloji</option>
            </select>
            
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Öncelikler</option>
              <option value="high">Yüksek</option>
              <option value="medium">Orta</option>
              <option value="low">Düşük</option>
            </select>
          </div>
        </div>
      </div>

      {/* Treatment Processes List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hasta & Tedavi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bölüm & Ekip
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum & İlerleme
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vital Bulgular
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarihler
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {treatmentProcesses.map((process) => (
                <tr key={process.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={process.image}
                        alt={process.patientName}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{process.patientName}</div>
                        <div className="text-sm text-gray-500">{process.patientId}</div>
                        <div className="text-xs text-gray-400">{process.treatment}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 mb-1">
                      {getDepartmentIcon(process.department)}
                      <span className="text-sm text-gray-900">{process.department}</span>
                    </div>
                    <div className="text-sm text-gray-600">{process.doctor}</div>
                    <div className="text-xs text-gray-500">{process.nurse}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(process.status)}`}>
                        {process.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(process.priority)}`}>
                        {process.priority}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 mb-1">{process.currentStage}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${process.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">%{process.progress} tamamlandı</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Nabız:</span>
                        <span className="font-medium">{process.vitals.heartRate} bpm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tansiyon:</span>
                        <span className="font-medium">{process.vitals.bloodPressure}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Ateş:</span>
                        <span className="font-medium">{process.vitals.temperature}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">SpO2:</span>
                        <span className="font-medium">{process.vitals.oxygenSaturation}%</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Başlangıç: {process.startDate}</div>
                    <div className="text-sm text-gray-600">Bitiş: {process.expectedEndDate}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 p-1 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 p-1 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-700 p-1 rounded">
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-700 p-1 rounded">
                        <FileText className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clinical Protocols */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Klinik Protokoller ve Standartlar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-red-900 mb-2">Kardiyoloji Protokolleri</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Ameliyat öncesi değerlendirme</li>
              <li>• Yoğun bakım takibi</li>
              <li>• Rehabilitasyon programı</li>
              <li>• Taburcu kriterleri</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Ortopedi Protokolleri</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Görüntüleme standartları</li>
              <li>• Ameliyat sonrası mobilizasyon</li>
              <li>• Fizyoterapi programı</li>
              <li>• Kontrol randevuları</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Genel Protokoller</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Enfeksiyon kontrolü</li>
              <li>• İlaç güvenliği</li>
              <li>• Hasta güvenliği</li>
              <li>• Kalite standartları</li>
            </ul>
          </div>
        </div>
      </div>

      {/* AI & Automation Features */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Activity className="h-5 w-5 text-purple-600" />
          <span>Akıllı Tedavi Takibi & Otomasyonlar</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Vital Bulgu Takibi</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Otomatik vital bulgu kaydı</li>
              <li>• Anormal değer uyarıları</li>
              <li>• Trend analizi</li>
              <li>• Risk skorlaması</li>
              <li>• Acil durum bildirimleri</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">İlaç Yönetimi</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Otomatik ilaç hatırlatıcıları</li>
              <li>• Etkileşim kontrolü</li>
              <li>• Doz optimizasyonu</li>
              <li>• Yan etki takibi</li>
              <li>• Uyumluluk analizi</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Süreç Optimizasyonu</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Otomatik süreç ilerletme</li>
              <li>• Kaynak planlaması</li>
              <li>• Kapasite yönetimi</li>
              <li>• Performans analizi</li>
              <li>• Tahminsel analitik</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentProcesses;