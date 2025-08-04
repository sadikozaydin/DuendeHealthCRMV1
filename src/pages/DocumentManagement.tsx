import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  PenTool,
  Shield,
  Globe,
  Smartphone,
  Monitor,
  Camera,
  Paperclip,
  Send,
  Plus,
  Filter,
  Search,
  User,
  Calendar,
  MapPin,
  Languages,
  Building2,
  AlertTriangle,
  RefreshCw,
  Settings,
  Bell,
  Lock,
  Unlock,
  FileCheck,
  FilePlus,
  FileX,
  Zap,
  Bot,
  Activity,
  BarChart3,
  Users,
  Database,
  Wifi,
  WifiOff,
  QrCode,
  Fingerprint,
  Key,
  CreditCard,
  Phone,
  Mail,
  MessageCircle,
  Video,
  Image,
  Folder,
  FolderOpen,
  Archive,
  Star,
  Flag,
  Tag,
  Link,
  Share2,
  Copy,
  ExternalLink,
  History,
  Timer,
  Target,
  TrendingUp,
  Award,
  Bookmark,
  Hash,
  AtSign,
  Percent,
  DollarSign,
  Euro,
  Banknote,
  Heart
} from 'lucide-react';

const DocumentManagement = () => {
  const [activeTab, setActiveTab] = useState('consents');
  const [selectedDocument, setSelectedDocument] = useState(null);

  const consents = [
    {
      id: 1,
      patientName: 'Maria Rodriguez',
      documentType: 'Ameliyat Onamı',
      treatment: 'Kalp Cerrahisi',
      language: 'İspanyolca',
      status: 'İmzalandı',
      signedDate: '2025-01-14 14:30',
      signedDevice: 'Tablet',
      doctor: 'Dr. Mehmet Yılmaz',
      version: 'v2.1',
      ipAddress: '192.168.1.100',
      digitalSignature: 'SHA256:a1b2c3d4...',
      witnessName: 'Hemşire Ayşe Kaya',
      image: 'https://images.pexels.com/photos/7180651/pexels-photo-7180651.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      patientName: 'Ahmed Hassan',
      documentType: 'KVKK Aydınlatma Metni',
      treatment: 'Diz Protezi',
      language: 'Arapça',
      status: 'Bekliyor',
      signedDate: null,
      signedDevice: null,
      doctor: 'Dr. Fatma Kaya',
      version: 'v1.3',
      ipAddress: null,
      digitalSignature: null,
      witnessName: null,
      image: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      patientName: 'Sarah Thompson',
      documentType: 'Anestezi Onamı',
      treatment: 'Plastik Cerrahi',
      language: 'İngilizce',
      status: 'İmzalandı',
      signedDate: '2025-01-13 16:45',
      signedDevice: 'Mobil',
      doctor: 'Dr. Ayşe Demir',
      version: 'v1.8',
      ipAddress: '10.0.0.25',
      digitalSignature: 'SHA256:e5f6g7h8...',
      witnessName: 'Hemşire Zeynep Demir',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const templates = [
    {
      id: 1,
      name: 'Ameliyat Onamı',
      category: 'Cerrahi',
      languages: ['Türkçe', 'İngilizce', 'Arapça', 'İspanyolca'],
      version: 'v2.1',
      lastUpdated: '2025-01-10',
      usage: 45,
      status: 'Aktif',
      description: 'Cerrahi müdahaleler için genel onam formu'
    },
    {
      id: 2,
      name: 'KVKK Aydınlatma Metni',
      category: 'Yasal',
      languages: ['Türkçe', 'İngilizce'],
      version: 'v1.3',
      lastUpdated: '2025-01-08',
      usage: 128,
      status: 'Aktif',
      description: 'Kişisel verilerin korunması hakkında bilgilendirme'
    },
    {
      id: 3,
      name: 'Anestezi Onamı',
      category: 'Anestezi',
      languages: ['Türkçe', 'İngilizce', 'Arapça'],
      version: 'v1.8',
      lastUpdated: '2025-01-05',
      usage: 67,
      status: 'Aktif',
      description: 'Anestezi uygulaması için özel onam formu'
    },
    {
      id: 4,
      name: 'Taburcu Formu',
      category: 'Taburcu',
      languages: ['Türkçe', 'İngilizce'],
      version: 'v1.2',
      lastUpdated: '2025-01-03',
      usage: 89,
      status: 'Aktif',
      description: 'Hasta taburcu işlemleri için form'
    }
  ];

  const documentCategories = [
    { id: 'consent', name: 'Onam Formları', icon: FileCheck, count: 156, color: 'text-green-600' },
    { id: 'legal', name: 'Yasal Belgeler', icon: Shield, count: 89, color: 'text-blue-600' },
    { id: 'medical', name: 'Tıbbi Raporlar', icon: Heart, count: 234, color: 'text-red-600' },
    { id: 'discharge', name: 'Taburcu Evrakları', icon: FileText, count: 67, color: 'text-purple-600' },
    { id: 'insurance', name: 'Sigorta Belgeleri', icon: CreditCard, count: 45, color: 'text-orange-600' },
    { id: 'travel', name: 'Seyahat Evrakları', icon: Globe, count: 78, color: 'text-teal-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'İmzalandı': return 'bg-green-100 text-green-800';
      case 'Bekliyor': return 'bg-yellow-100 text-yellow-800';
      case 'Reddedildi': return 'bg-red-100 text-red-800';
      case 'Süresi Doldu': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'İmzalandı': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Bekliyor': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'Reddedildi': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'Süresi Doldu': return <AlertTriangle className="h-4 w-4 text-gray-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Tablet': return <Smartphone className="h-4 w-4 text-blue-600" />;
      case 'Mobil': return <Smartphone className="h-4 w-4 text-green-600" />;
      case 'PC': return <Monitor className="h-4 w-4 text-purple-600" />;
      default: return <Monitor className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Evrak & Onam Yönetimi</h1>
          <p className="text-gray-600 mt-1">Dijital imza, çok dilli onamlar ve belge şablonları</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Upload className="h-4 w-4" />
            <span>Şablon Yükle</span>
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <FileText className="h-4 w-4" />
            <span>Yeni Şablon</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Belge</p>
              <p className="text-3xl font-bold text-blue-600">1,247</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+89 bu ay</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">İmzalanan</p>
              <p className="text-3xl font-bold text-green-600">1,156</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">%92.7 başarı</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bekleyen</p>
              <p className="text-3xl font-bold text-yellow-600">67</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-sm text-yellow-600 mt-2">İmza bekliyor</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Şablon Sayısı</p>
              <p className="text-3xl font-bold text-purple-600">24</p>
            </div>
            <FilePlus className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">6 dilde</p>
        </div>
      </div>

      {/* Document Categories */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Belge Kategorileri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documentCategories.map((category) => (
            <div
              key={category.id}
              className="p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <category.icon className={`h-6 w-6 ${category.color}`} />
                <span className="text-2xl font-bold text-gray-700">{category.count}</span>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{category.name}</h4>
              <p className="text-xs text-gray-600">Aktif belgeler</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'consents', label: 'Onam Takibi', icon: FileCheck, count: 67 },
              { id: 'templates', label: 'Şablonlar', icon: FileText, count: 24 },
              { id: 'signatures', label: 'Dijital İmzalar', icon: PenTool, count: null },
              { id: 'compliance', label: 'Uyumluluk', icon: Shield, count: null },
              { id: 'analytics', label: 'Analitik', icon: BarChart3, count: null },
              { id: 'settings', label: 'Ayarlar', icon: Settings, count: null }
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
                {tab.count && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'consents' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Onam Takibi</h3>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Hasta, belge ara..."
                      className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                    Filtrele
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hasta & Belge
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tedavi & Doktor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İmza Durumu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Teknik Detaylar
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {consents.map((consent) => (
                      <tr key={consent.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={consent.image}
                              alt={consent.patientName}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{consent.patientName}</div>
                              <div className="text-sm text-gray-500">{consent.documentType}</div>
                              <div className="text-xs text-gray-400 flex items-center space-x-1">
                                <Languages className="h-3 w-3" />
                                <span>{consent.language}</span>
                                <span>•</span>
                                <span>{consent.version}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{consent.treatment}</div>
                          <div className="text-sm text-gray-500">{consent.doctor}</div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2 mb-1">
                            {getStatusIcon(consent.status)}
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(consent.status)}`}>
                              {consent.status}
                            </span>
                          </div>
                          {consent.signedDate && (
                            <div className="text-xs text-gray-500">{consent.signedDate}</div>
                          )}
                          {consent.signedDevice && (
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              {getDeviceIcon(consent.signedDevice)}
                              <span>{consent.signedDevice}</span>
                            </div>
                          )}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          {consent.ipAddress && (
                            <div className="text-xs text-gray-600 space-y-1">
                              <div>IP: {consent.ipAddress}</div>
                              <div>İmza: {consent.digitalSignature?.substring(0, 20)}...</div>
                              {consent.witnessName && (
                                <div>Tanık: {consent.witnessName}</div>
                              )}
                            </div>
                          )}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700 p-1 rounded">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700 p-1 rounded">
                              <Download className="h-4 w-4" />
                            </button>
                            <button className="text-purple-600 hover:text-purple-700 p-1 rounded">
                              <Send className="h-4 w-4" />
                            </button>
                            <button className="text-orange-600 hover:text-orange-700 p-1 rounded">
                              <RefreshCw className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Belge Şablonları</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Yeni Şablon
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 mt-2">
                          {template.category}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-700">
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Desteklenen Diller:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {template.languages.map((lang, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Versiyon: {template.version}</span>
                        <span>Kullanım: {template.usage} kez</span>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Son güncelleme: {template.lastUpdated}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded text-sm">
                        Önizle
                      </button>
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm">
                        Düzenle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'signatures' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Dijital İmza Sistemi</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">🔐 Güvenli Dijital İmza</h4>
                <p className="text-sm text-blue-700">
                  Tüm imzalar 256-bit şifreleme ile korunur ve yasal geçerliliğe sahiptir.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">İmza Yöntemleri</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <PenTool className="h-5 w-5 text-blue-600" />
                      <div>
                        <h5 className="font-medium text-gray-900">Dokunmatik İmza</h5>
                        <p className="text-sm text-gray-600">Tablet ve mobil cihazlarda</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <QrCode className="h-5 w-5 text-green-600" />
                      <div>
                        <h5 className="font-medium text-gray-900">QR Kod İmza</h5>
                        <p className="text-sm text-gray-600">Hızlı onay için</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Fingerprint className="h-5 w-5 text-purple-600" />
                      <div>
                        <h5 className="font-medium text-gray-900">Biyometrik İmza</h5>
                        <p className="text-sm text-gray-600">Parmak izi ile</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Güvenlik Özellikleri</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-green-600" />
                      <span className="text-sm text-gray-700">256-bit SSL şifreleme</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <span className="text-sm text-gray-700">Zaman damgası</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-orange-600" />
                      <span className="text-sm text-gray-700">Konum kaydı</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Database className="h-5 w-5 text-purple-600" />
                      <span className="text-sm text-gray-700">Blockchain kayıt</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Yasal Uyumluluk</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-medium text-green-900 mb-4">✅ Uyumluluk Durumu</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-800">KVKK Uyumu</span>
                      <span className="text-sm font-medium text-green-800">%100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-800">GDPR Uyumu</span>
                      <span className="text-sm font-medium text-green-800">%98</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-800">Sağlık Mevzuatı</span>
                      <span className="text-sm font-medium text-green-800">%95</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-800">Dijital İmza Yasası</span>
                      <span className="text-sm font-medium text-green-800">%100</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-medium text-blue-900 mb-4">📋 Denetim Kayıtları</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-800">Toplam İşlem:</span>
                      <span className="font-medium text-blue-800">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">Başarılı İmza:</span>
                      <span className="font-medium text-blue-800">1,156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">Reddedilen:</span>
                      <span className="font-medium text-blue-800">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-800">Bekleyen:</span>
                      <span className="font-medium text-blue-800">67</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Belge Analitikleri</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-700">1,247</span>
                  </div>
                  <h4 className="font-medium text-blue-900">Toplam Belge</h4>
                  <p className="text-sm text-blue-700">Bu ay</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="text-2xl font-bold text-green-700">92.7%</span>
                  </div>
                  <h4 className="font-medium text-green-900">İmza Başarı Oranı</h4>
                  <p className="text-sm text-green-700">Son 30 gün</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Timer className="h-6 w-6 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-700">2.3dk</span>
                  </div>
                  <h4 className="font-medium text-purple-900">Ortalama İmza Süresi</h4>
                  <p className="text-sm text-purple-700">Belge başına</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Globe className="h-6 w-6 text-orange-600" />
                    <span className="text-2xl font-bold text-orange-700">6</span>
                  </div>
                  <h4 className="font-medium text-orange-900">Desteklenen Dil</h4>
                  <p className="text-sm text-orange-700">Aktif şablonlar</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Belge Yönetimi Ayarları</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Genel Ayarlar</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Otomatik Hatırlatma</h5>
                        <p className="text-sm text-gray-600">İmzalanmayan belgeler için</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Çoklu Dil Desteği</h5>
                        <p className="text-sm text-gray-600">Otomatik dil tespiti</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Blockchain Kayıt</h5>
                        <p className="text-sm text-gray-600">İmzaların blockchain'e kaydı</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Güvenlik Ayarları</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">İki Faktörlü Doğrulama</h5>
                        <p className="text-sm text-gray-600">Kritik belgeler için</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">IP Kısıtlaması</h5>
                        <p className="text-sm text-gray-600">Belirli IP'lerden erişim</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Otomatik Arşivleme</h5>
                        <p className="text-sm text-gray-600">Eski belgelerin arşivlenmesi</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI & Automation Features */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Bot className="h-5 w-5 text-green-600" />
          <span>AI Destekli Belge Yönetimi & Otomasyonlar</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Akıllı Şablon Önerisi</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Tedavi türüne göre otomatik şablon seçimi</li>
              <li>• Hasta geçmişi bazlı özelleştirme</li>
              <li>• Eksik alan tespiti ve uyarı</li>
              <li>• Dil bazlı şablon optimizasyonu</li>
              <li>• Yasal gereklilik kontrolü</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Otomatik İş Akışı</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Belge gönderim zamanlaması</li>
              <li>• Hatırlatma sistemi</li>
              <li>• Onay süreç yönetimi</li>
              <li>• Otomatik arşivleme</li>
              <li>• Uyumluluk kontrolü</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Güvenlik & Analitik</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Fraud detection sistemi</li>
              <li>• Anormal aktivite tespiti</li>
              <li>• Performans analizi</li>
              <li>• Uyumluluk raporları</li>
              <li>• Tahminsel analitik</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManagement;