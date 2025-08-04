import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  XCircle,
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  MessageCircle, 
  FileText, 
  Heart, 
  CheckCircle, 
  Star, 
  Bot,
  Calendar,
  Clock,
  AlertTriangle,
  CheckSquare,
  X
} from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  country: string;
  patientId: string;
  language: string;
  treatment: string;
  treatmentType: string;
  status: string;
  priority: string;
  stage: string;
  assignedDoctor: string;
  coordinator: string;
  assignedNurse?: string;
  admissionDate?: string;
  nextAppointment?: string;
  expectedDischargeDate?: string;
  image: string;
}

const Patients: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Mock data - in real app this would come from API
  const patients: Patient[] = [
    {
      id: '1',
      name: 'Ahmed Al-Rashid',
      age: 45,
      country: 'UAE',
      patientId: 'P-2024-001',
      language: 'Arabic/English',
      treatment: 'Kalp Bypass Ameliyatı',
      treatmentType: 'Kardiyovasküler Cerrahi',
      status: 'Tedavide',
      priority: 'Yüksek',
      stage: 'Ameliyat Sonrası',
      assignedDoctor: 'Dr. Mehmet Özkan',
      coordinator: 'Fatma Yılmaz',
      assignedNurse: 'Hemşire Ayşe',
      admissionDate: '15 Ocak 2024',
      nextAppointment: '22 Ocak 2024',
      expectedDischargeDate: '25 Ocak 2024',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      age: 32,
      country: 'USA',
      patientId: 'P-2024-002',
      language: 'English',
      treatment: 'Estetik Rinoplasti',
      treatmentType: 'Plastik Cerrahi',
      status: 'Konsültasyon',
      priority: 'Orta',
      stage: 'Ön Değerlendirme',
      assignedDoctor: 'Dr. Elif Kaya',
      coordinator: 'Zeynep Demir',
      nextAppointment: '20 Ocak 2024',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      name: 'Hans Mueller',
      age: 58,
      country: 'Germany',
      patientId: 'P-2024-003',
      language: 'German/English',
      treatment: 'Saç Ekimi (FUE)',
      treatmentType: 'Dermatoloji',
      status: 'Tamamlandı',
      priority: 'Düşük',
      stage: 'Takip',
      assignedDoctor: 'Dr. Can Yıldız',
      coordinator: 'Merve Şahin',
      admissionDate: '10 Ocak 2024',
      expectedDischargeDate: '12 Ocak 2024',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient.treatment.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = activeFilter === 'all' || 
                          (activeFilter === 'consultation' && patient.status === 'Konsültasyon') ||
                          (activeFilter === 'planning' && patient.status === 'Planlama') ||
                          (activeFilter === 'in-treatment' && patient.status === 'Tedavide') ||
                          (activeFilter === 'completed' && patient.status === 'Tamamlandı');
      
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Konsültasyon':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Planlama':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Tedavide':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Tamamlandı':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Yüksek':
        return 'bg-red-100 text-red-800';
      case 'Orta':
        return 'bg-yellow-100 text-yellow-800';
      case 'Düşük':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'Ön Değerlendirme':
        return <Calendar className="h-3 w-3 text-blue-500" />;
      case 'Ameliyat Öncesi':
        return <Clock className="h-3 w-3 text-yellow-500" />;
      case 'Ameliyat Sonrası':
        return <AlertTriangle className="h-3 w-3 text-orange-500" />;
      case 'Takip':
        return <CheckSquare className="h-3 w-3 text-green-500" />;
      default:
        return <Calendar className="h-3 w-3 text-gray-500" />;
    }
  };

  const renderPatientDetail = (patient: Patient) => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={(e) => e.target === e.currentTarget && setSelectedPatient(null)}
    >
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-fadeIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Hasta Detayları</h2>
          <button 
            onClick={() => setSelectedPatient(null)}
            className="text-gray-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <img
              className="h-16 w-16 rounded-full object-cover"
              src={patient.image}
              alt={patient.name}
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{patient.name}</h3>
              <p className="text-gray-600">{patient.age} yaş • {patient.country}</p>
              <p className="text-sm text-gray-500">{patient.patientId} • {patient.language}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Tedavi Bilgileri</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Tedavi:</span> {patient.treatment}</p>
                <p><span className="font-medium">Tür:</span> {patient.treatmentType}</p>
                <p><span className="font-medium">Durum:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(patient.status)}`}>
                    {patient.status}
                  </span>
                </p>
                <p><span className="font-medium">Öncelik:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getPriorityColor(patient.priority)}`}>
                    {patient.priority}
                  </span>
                </p>
                <p><span className="font-medium">Aşama:</span> {patient.stage}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Ekip & Tarihler</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Doktor:</span> {patient.assignedDoctor}</p>
                <p><span className="font-medium">Koordinatör:</span> {patient.coordinator}</p>
                {patient.assignedNurse && (
                  <p><span className="font-medium">Hemşire:</span> {patient.assignedNurse}</p>
                )}
                {patient.admissionDate && (
                  <p><span className="font-medium">Yatış:</span> {patient.admissionDate}</p>
                )}
                {patient.nextAppointment && (
                  <p><span className="font-medium">Randevu:</span> {patient.nextAppointment}</p>
                )}
                {patient.expectedDischargeDate && (
                  <p><span className="font-medium">Taburcu:</span> {patient.expectedDischargeDate}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ESC tuşu ile popup kapatma
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedPatient) {
        setSelectedPatient(null);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedPatient]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('patients.title')}</h1>
          <p className="text-gray-600 mt-1">{t('patients.subtitle')}</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>{t('patients.newPatient')}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('patients.totalPatients')}</p>
              <p className="text-3xl font-bold text-blue-600">247</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+12% bu ay</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('patients.activeTreatment')}</p>
              <p className="text-3xl font-bold text-green-600">89</p>
            </div>
            <Heart className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+8% bu hafta</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('patients.discharged')}</p>
              <p className="text-3xl font-bold text-purple-600">156</p>
            </div>
            <CheckCircle className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">Bu ay</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('patients.satisfaction')}</p>
              <p className="text-3xl font-bold text-yellow-600">4.8</p>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">5 üzerinden</p>
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
                placeholder="Hasta ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filtreler:</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {['all', 'consultation', 'planning', 'in-treatment', 'completed'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter === 'all' ? 'Tümü' : 
                 filter === 'consultation' ? 'Konsültasyon' :
                 filter === 'planning' ? 'Planlama' :
                 filter === 'in-treatment' ? 'Tedavide' : 'Tamamlandı'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Patient List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hasta Bilgileri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tedavi & Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sorumlu Ekip
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
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={patient.image}
                        alt={patient.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.age} yaş • {patient.country}</div>
                        <div className="text-xs text-gray-400 flex items-center space-x-1 mt-1">
                          <span>{patient.patientId}</span>
                          <span>•</span>
                          <span>{patient.language}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.treatment}</div>
                    <div className="text-xs text-gray-500">{patient.treatmentType}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(patient.priority)}`}>
                        {patient.priority}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                      {getStageIcon(patient.stage)}
                      <span>{patient.stage}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{patient.assignedDoctor}</div>
                    <div className="text-xs text-gray-500">{patient.coordinator}</div>
                    {patient.assignedNurse && (
                      <div className="text-xs text-gray-500">{patient.assignedNurse}</div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {patient.admissionDate && (
                      <div className="text-sm text-gray-900">Yatış: {patient.admissionDate}</div>
                    )}
                    {patient.nextAppointment && (
                      <div className="text-xs text-blue-600">Randevu: {patient.nextAppointment}</div>
                    )}
                    {patient.expectedDischargeDate && (
                      <div className="text-xs text-gray-500">Taburcu: {patient.expectedDischargeDate}</div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedPatient(patient)}
                        className="text-blue-600 hover:text-blue-700 p-1 rounded"
                      >
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

      {/* AI & Automation Info */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Bot className="h-5 w-5 text-green-600" />
          <span>AI Destekli Hasta Yönetimi & Otomasyonlar</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Akıllı Takip</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Otomatik randevu hatırlatıcıları</li>
              <li>• Risk faktörü uyarıları</li>
              <li>• İlaç etkileşim kontrolü</li>
              <li>• Vital bulgu anomali tespiti</li>
              <li>• Tedavi uyumsuzluk uyarıları</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Portal Entegrasyonu</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Çok dilli hasta portalı</li>
              <li>• Mobil uygulama desteği</li>
              <li>• Dijital onam sistemi</li>
              <li>• Belge yükleme/indirme</li>
              <li>• Canlı destek chat</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Güvenlik & Uyum</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• KVKK/GDPR uyumlu saklama</li>
              <li>• Şifreli veri transferi</li>
              <li>• Audit log sistemi</li>
              <li>• Rol bazlı erişim kontrolü</li>
              <li>• Otomatik yedekleme</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && renderPatientDetail(selectedPatient)}
    </div>
  );
};

export default Patients;