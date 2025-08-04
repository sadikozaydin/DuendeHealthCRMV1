import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Key, 
  Database, 
  FileText, 
  Eye, 
  EyeOff,
  Settings, 
  Bell, 
  Globe, 
  Users, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Download, 
  Upload, 
  RefreshCw,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Info,
  HelpCircle,
  Zap,
  BarChart3,
  TrendingUp,
  Target,
  Award,
  Timer,
  Wifi,
  WifiOff,
  Server,
  Cloud,
  Monitor,
  Smartphone,
  Tablet,
  Camera,
  Mic,
  Volume2,
  Headphones,
  Phone,
  Mail,
  MessageCircle,
  Video,
  Calendar,
  User,
  Building,
  MapPin,
  CreditCard,
  Heart,
  Stethoscope,
  Plane,
  Car,
  Building2,
  DollarSign,
  Euro,
  Banknote,
  Percent,
  Hash,
  AtSign,
  Link,
  Image,
  Paperclip,
  Flag,
  Tag,
  Bookmark,
  Star,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  AlertCircle,
  XCircle,
  PlayCircle,
  PauseCircle,
  StopCircle,
  SkipForward,
  SkipBack,
  FastForward,
  Rewind,
  RotateCcw,
  Repeat,
  Shuffle,
  Volume1,
  VolumeX,
  MicOff,
  VideoOff,
  Languages,
  Briefcase,
  Package,
  Store,
  Home,
  Hotel,
  Bed,
  Coffee,
  Utensils,
  Navigation,
  Compass,
  Route,
  Truck
} from 'lucide-react';

const LegalSecurityCompliance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRegulation, setSelectedRegulation] = useState('TR');
  const [showPasswordPolicy, setShowPasswordPolicy] = useState(false);

  // Mevzuat ayarları
  const regulations = [
    {
      id: 'TR',
      name: 'Türkiye',
      laws: ['KVKK', 'Sağlık Bakanlığı Mevzuatı', 'Ticaret Kanunu'],
      status: 'active',
      compliance: 98,
      lastUpdate: '2025-01-10',
      description: 'Türkiye Cumhuriyeti yasal mevzuatı'
    },
    {
      id: 'EU',
      name: 'Avrupa Birliği',
      laws: ['GDPR', 'Medical Device Regulation', 'ePrivacy Directive'],
      status: 'active',
      compliance: 95,
      lastUpdate: '2025-01-08',
      description: 'Avrupa Birliği veri koruma ve tıbbi cihaz mevzuatı'
    },
    {
      id: 'US',
      name: 'Amerika Birleşik Devletleri',
      laws: ['HIPAA', 'FDA Regulations', 'CCPA'],
      status: 'inactive',
      compliance: 0,
      lastUpdate: null,
      description: 'ABD sağlık ve veri koruma mevzuatı'
    },
    {
      id: 'GLOBAL',
      name: 'Uluslararası',
      laws: ['ISO 27001', 'ISO 13485', 'WHO Guidelines'],
      status: 'active',
      compliance: 92,
      lastUpdate: '2025-01-05',
      description: 'Uluslararası standartlar ve kılavuzlar'
    }
  ];

  // Güvenlik politikaları
  const securityPolicies = [
    {
      id: 'password',
      name: 'Şifre Politikası',
      description: 'Minimum uzunluk, karmaşıklık ve periyodik değişim kuralları',
      status: 'active',
      lastUpdate: '2025-01-10',
      settings: {
        minLength: 12,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        maxAge: 90,
        preventReuse: 5,
        lockoutAttempts: 5,
        lockoutDuration: 30
      }
    },
    {
      id: '2fa',
      name: 'İki Faktörlü Kimlik Doğrulama',
      description: 'Rol bazlı 2FA zorunluluğu ve yöntem seçimi',
      status: 'active',
      lastUpdate: '2025-01-08',
      settings: {
        mandatoryRoles: ['admin', 'finance', 'doctor'],
        methods: ['sms', 'email', 'authenticator'],
        backupCodes: true,
        sessionTimeout: 480
      }
    },
    {
      id: 'session',
      name: 'Oturum Yönetimi',
      description: 'Oturum süresi, çoklu giriş kontrolü ve güvenlik',
      status: 'active',
      lastUpdate: '2025-01-05',
      settings: {
        maxDuration: 480,
        idleTimeout: 60,
        maxConcurrentSessions: 3,
        ipRestriction: false,
        deviceTracking: true
      }
    },
    {
      id: 'encryption',
      name: 'Veri Şifreleme',
      description: 'Aktarım ve depolama şifreleme ayarları',
      status: 'active',
      lastUpdate: '2025-01-01',
      settings: {
        transitEncryption: 'TLS 1.3',
        storageEncryption: 'AES-256',
        keyRotation: 90,
        backupEncryption: true
      }
    }
  ];

  // Audit log örnekleri
  const auditLogs = [
    {
      id: 1,
      timestamp: '2025-01-14 16:30:45',
      user: 'Dr. Mehmet Yılmaz',
      action: 'PATIENT_VIEW',
      resource: 'Patient ID: P001',
      ip: '192.168.1.100',
      device: 'Desktop',
      location: 'İstanbul, TR',
      status: 'SUCCESS',
      risk: 'LOW'
    },
    {
      id: 2,
      timestamp: '2025-01-14 16:28:12',
      user: 'Sarah Johnson',
      action: 'DATA_EXPORT',
      resource: 'Patient Reports (50 records)',
      ip: '10.0.0.25',
      device: 'Laptop',
      location: 'Ankara, TR',
      status: 'SUCCESS',
      risk: 'MEDIUM'
    },
    {
      id: 3,
      timestamp: '2025-01-14 16:25:33',
      user: 'Unknown',
      action: 'LOGIN_FAILED',
      resource: 'Admin Panel',
      ip: '185.94.188.123',
      device: 'Mobile',
      location: 'Madrid, ES',
      status: 'FAILED',
      risk: 'HIGH'
    },
    {
      id: 4,
      timestamp: '2025-01-14 16:20:15',
      user: 'Dr. Fatma Kaya',
      action: 'PATIENT_UPDATE',
      resource: 'Patient ID: P002',
      ip: '192.168.1.105',
      device: 'Tablet',
      location: 'İstanbul, TR',
      status: 'SUCCESS',
      risk: 'LOW'
    },
    {
      id: 5,
      timestamp: '2025-01-14 16:15:22',
      user: 'Ahmed Hassan',
      action: 'DOCUMENT_DELETE',
      resource: 'Medical Report #1234',
      ip: '172.16.0.50',
      device: 'Desktop',
      location: 'Dubai, AE',
      status: 'BLOCKED',
      risk: 'HIGH'
    }
  ];

  // Veri maskeleme kuralları
  const maskingRules = [
    {
      id: 'tc_identity',
      field: 'TC Kimlik No',
      pattern: '***-**-****',
      roles: ['nurse', 'receptionist'],
      description: 'TC kimlik numarasının son 4 hanesi hariç maskelenir'
    },
    {
      id: 'phone',
      field: 'Telefon Numarası',
      pattern: '+90 5** *** **##',
      roles: ['marketing', 'partner'],
      description: 'Telefon numarasının son 2 hanesi hariç maskelenir'
    },
    {
      id: 'email',
      field: 'E-posta Adresi',
      pattern: '***@***.com',
      roles: ['external'],
      description: 'E-posta adresinin kullanıcı adı ve domain maskelenir'
    },
    {
      id: 'financial',
      field: 'Finansal Bilgiler',
      pattern: '***,*** TL',
      roles: ['doctor', 'nurse'],
      description: 'Finansal tutarlar tamamen maskelenir'
    }
  ];

  // Uyumluluk kontrolleri
  const complianceChecks = [
    {
      id: 'data_retention',
      name: 'Veri Saklama Süresi',
      status: 'compliant',
      score: 100,
      description: 'Kişisel veriler yasal süre içinde saklanıyor',
      lastCheck: '2025-01-14',
      nextCheck: '2025-01-21'
    },
    {
      id: 'consent_management',
      name: 'Açık Rıza Yönetimi',
      status: 'compliant',
      score: 98,
      description: 'Tüm işlemler için geçerli açık rıza mevcut',
      lastCheck: '2025-01-13',
      nextCheck: '2025-01-20'
    },
    {
      id: 'access_control',
      name: 'Erişim Kontrolü',
      status: 'warning',
      score: 85,
      description: '3 kullanıcının yetki güncellemesi gerekiyor',
      lastCheck: '2025-01-12',
      nextCheck: '2025-01-19'
    },
    {
      id: 'data_encryption',
      name: 'Veri Şifreleme',
      status: 'compliant',
      score: 100,
      description: 'Tüm hassas veriler şifrelenmiş durumda',
      lastCheck: '2025-01-14',
      nextCheck: '2025-01-21'
    },
    {
      id: 'audit_logging',
      name: 'Denetim Kayıtları',
      status: 'compliant',
      score: 95,
      description: 'Tüm kritik işlemler loglanıyor',
      lastCheck: '2025-01-14',
      nextCheck: '2025-01-21'
    },
    {
      id: 'backup_security',
      name: 'Yedek Güvenliği',
      status: 'non_compliant',
      score: 60,
      description: 'Yedek şifreleme ayarları güncellenmeli',
      lastCheck: '2025-01-10',
      nextCheck: '2025-01-17'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'compliant':
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'warning':
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
      case 'non_compliant':
      case 'FAILED':
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      case 'BLOCKED':
        return 'bg-purple-100 text-purple-800';
      case 'LOW':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'compliant':
      case 'SUCCESS':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'inactive':
      case 'non_compliant':
      case 'FAILED':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'BLOCKED':
        return <Shield className="h-4 w-4 text-purple-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'LOW':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'MEDIUM':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'HIGH':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Info className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Yasal, Güvenlik ve Uyum Yönetimi</h1>
          <p className="text-gray-600 mt-1">KVKK/GDPR uyumu, güvenlik politikaları ve denetim sistemi</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="h-4 w-4" />
            <span>Uyumluluk Raporu</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Shield className="h-4 w-4" />
            <span>Güvenlik Taraması</span>
          </button>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Genel Uyumluluk</p>
              <p className="text-3xl font-bold text-green-600">94%</p>
            </div>
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">Hedef: %95</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktif Mevzuat</p>
              <p className="text-3xl font-bold text-blue-600">3</p>
            </div>
            <Globe className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-blue-600 mt-2">TR, EU, Global</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Güvenlik Skoru</p>
              <p className="text-3xl font-bold text-purple-600">A+</p>
            </div>
            <Lock className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">Son tarama: Bugün</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Risk Seviyesi</p>
              <p className="text-3xl font-bold text-yellow-600">Düşük</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-sm text-yellow-600 mt-2">2 uyarı var</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Genel Bakış', icon: BarChart3 },
              { id: 'regulations', label: 'Mevzuat Ayarları', icon: Globe },
              { id: 'security', label: 'Güvenlik Politikaları', icon: Shield },
              { id: 'privacy', label: 'Veri Gizliliği', icon: Lock },
              { id: 'audit', label: 'Denetim Kayıtları', icon: Activity },
              { id: 'compliance', label: 'Uyumluluk Kontrolleri', icon: CheckCircle },
              { id: 'incidents', label: 'Güvenlik Olayları', icon: AlertTriangle },
              { id: 'training', label: 'Eğitim & Dokümantasyon', icon: FileText }
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

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Uyumluluk ve Güvenlik Özeti</h3>
              
              {/* Regulation Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {regulations.filter(r => r.status === 'active').map((regulation) => (
                  <div key={regulation.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">{regulation.name}</h4>
                      <span className="text-2xl font-bold text-green-600">{regulation.compliance}%</span>
                    </div>
                    <div className="space-y-1">
                      {regulation.laws.map((law, index) => (
                        <span key={index} className="block text-xs text-gray-600">{law}</span>
                      ))}
                    </div>
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${regulation.compliance}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Activities */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Son Güvenlik Aktiviteleri</h4>
                <div className="space-y-3">
                  {auditLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-white rounded">
                      <div className="flex items-center space-x-3">
                        {getRiskIcon(log.risk)}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{log.action}</p>
                          <p className="text-xs text-gray-600">{log.user} • {log.timestamp}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'regulations' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Mevzuat ve Regülasyon Ayarları</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Yeni Mevzuat Ekle
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {regulations.map((regulation) => (
                  <div key={regulation.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{regulation.name}</h4>
                        <p className="text-sm text-gray-600">{regulation.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(regulation.status)}
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(regulation.status)}`}>
                          {regulation.status === 'active' ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Kapsanan Yasalar</h5>
                        <div className="space-y-1">
                          {regulation.laws.map((law, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span className="text-gray-700">{law}</span>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Uyumluluk Oranı:</span>
                        <span className="font-semibold text-green-600">{regulation.compliance}%</span>
                      </div>
                      
                      {regulation.lastUpdate && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Son Güncelleme:</span>
                          <span className="text-sm text-gray-900">{regulation.lastUpdate}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm">
                        Ayarlar
                      </button>
                      <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded text-sm">
                        Rapor
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Güvenlik Politikaları</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Yeni Politika
                </button>
              </div>
              
              <div className="space-y-4">
                {securityPolicies.map((policy) => (
                  <div key={policy.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{policy.name}</h4>
                        <p className="text-sm text-gray-600">{policy.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(policy.status)}
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(policy.status)}`}>
                          {policy.status === 'active' ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>
                    </div>
                    
                    {policy.id === 'password' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Minimum Uzunluk:</span>
                          <span className="font-medium text-gray-900 ml-2">{policy.settings.minLength} karakter</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Maksimum Yaş:</span>
                          <span className="font-medium text-gray-900 ml-2">{policy.settings.maxAge} gün</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Başarısız Deneme:</span>
                          <span className="font-medium text-gray-900 ml-2">{policy.settings.lockoutAttempts} kez</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Kilitleme Süresi:</span>
                          <span className="font-medium text-gray-900 ml-2">{policy.settings.lockoutDuration} dakika</span>
                        </div>
                      </div>
                    )}
                    
                    {policy.id === '2fa' && (
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Zorunlu Roller:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {policy.settings.mandatoryRoles.map((role, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-600">Desteklenen Yöntemler:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {policy.settings.methods.map((method, index) => (
                              <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                {method}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-600">Son güncelleme: {policy.lastUpdate}</span>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => policy.id === 'password' && setShowPasswordPolicy(!showPasswordPolicy)}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          {policy.id === 'password' && showPasswordPolicy ? 'Gizle' : 'Detaylar'}
                        </button>
                        <button className="text-gray-600 hover:text-gray-700 text-sm">
                          Düzenle
                        </button>
                      </div>
                    </div>
                    
                    {policy.id === 'password' && showPasswordPolicy && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-3">Detaylı Şifre Kuralları</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center space-x-2">
                            {policy.settings.requireUppercase ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                            <span>Büyük harf zorunlu</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {policy.settings.requireLowercase ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                            <span>Küçük harf zorunlu</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {policy.settings.requireNumbers ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                            <span>Rakam zorunlu</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {policy.settings.requireSpecialChars ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                            <span>Özel karakter zorunlu</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Veri Gizliliği ve Maskeleme</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">🔒 Veri Maskeleme Kuralları</h4>
                <p className="text-sm text-blue-700">
                  Hassas veriler rol bazlı olarak maskelenir. Sadece yetkili kullanıcılar tam veriyi görebilir.
                </p>
              </div>
              
              <div className="space-y-4">
                {maskingRules.map((rule) => (
                  <div key={rule.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{rule.field}</h4>
                        <p className="text-sm text-gray-600">{rule.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{rule.pattern}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Etkilenen Roller</h5>
                      <div className="flex flex-wrap gap-1">
                        {rule.roles.map((role, index) => (
                          <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        Test Et
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 text-sm">
                        Düzenle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2">✅ Şifreleme Durumu</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Aktarımda şifreleme: TLS 1.3</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Depolamada şifreleme: AES-256</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Anahtar rotasyonu: 90 günde bir</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Yedek şifreleme: Aktif</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Denetim Kayıtları</h3>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Kullanıcı, işlem ara..."
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
                        Zaman & Kullanıcı
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlem & Kaynak
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Konum & Cihaz
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum & Risk
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{log.user}</div>
                            <div className="text-sm text-gray-500">{log.timestamp}</div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{log.action}</div>
                            <div className="text-sm text-gray-500">{log.resource}</div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm text-gray-900">{log.location}</div>
                            <div className="text-sm text-gray-500 flex items-center space-x-1">
                              {log.device === 'Desktop' ? <Monitor className="h-3 w-3" /> :
                               log.device === 'Laptop' ? <Monitor className="h-3 w-3" /> :
                               log.device === 'Tablet' ? <Tablet className="h-3 w-3" /> :
                               <Smartphone className="h-3 w-3" />}
                              <span>{log.device}</span>
                              <span>•</span>
                              <span>{log.ip}</span>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                              {log.status}
                            </span>
                            <div className="flex items-center space-x-1">
                              {getRiskIcon(log.risk)}
                              <span className={`text-xs ${
                                log.risk === 'LOW' ? 'text-green-600' :
                                log.risk === 'MEDIUM' ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {log.risk}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Uyumluluk Kontrolleri</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Tüm Kontrolleri Çalıştır</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {complianceChecks.map((check) => (
                  <div key={check.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{check.name}</h4>
                        <p className="text-sm text-gray-600">{check.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          {getStatusIcon(check.status)}
                          <span className="text-2xl font-bold text-gray-900">{check.score}%</span>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(check.status)}`}>
                          {check.status === 'compliant' ? 'Uyumlu' :
                           check.status === 'warning' ? 'Uyarı' : 'Uyumsuz'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            check.score >= 95 ? 'bg-green-500' :
                            check.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${check.score}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Son kontrol: {check.lastCheck}</span>
                      <span>Sonraki: {check.nextCheck}</span>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded text-sm">
                        Detaylar
                      </button>
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm">
                        Düzelt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'incidents' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Güvenlik Olayları ve Müdahale</h3>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">🚨 Acil Durum Protokolü</h4>
                <p className="text-sm text-red-700">
                  Güvenlik ihlali tespit edildiğinde otomatik müdahale protokolü devreye girer.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Otomatik Müdahale</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Şüpheli hesap kilitleme</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>IP adresi engelleme</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Oturum sonlandırma</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Yönetici bilgilendirme</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Bildirim Sistemi</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-blue-600" />
                      <span>Email uyarısı</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-green-600" />
                      <span>WhatsApp bildirimi</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-orange-600" />
                      <span>Acil arama</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-purple-600" />
                      <span>Olay raporu</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Yasal Bildirim</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-blue-600" />
                      <span>KVKK Kurumu</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Siber Güvenlik Kurumu</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-orange-600" />
                      <span>Sağlık Bakanlığı</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span>Etkilenen kullanıcılar</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'training' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Eğitim ve Dokümantasyon</h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">📚 Zorunlu Eğitimler</h4>
                <p className="text-sm text-blue-700">
                  Tüm personel ve partnerler için yasal ve güvenlik eğitimleri zorunludur.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Eğitim Modülleri</h4>
                  
                  {[
                    { name: 'KVKK/GDPR Temel Eğitimi', duration: '45 dakika', completion: 95 },
                    { name: 'Güvenlik Farkındalığı', duration: '30 dakika', completion: 88 },
                    { name: 'Veri Güvenliği', duration: '60 dakika', completion: 92 },
                    { name: 'Acil Durum Protokolleri', duration: '20 dakika', completion: 78 }
                  ].map((training, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{training.name}</h5>
                        <span className="text-sm text-gray-600">{training.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${training.completion}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{training.completion}%</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Dokümantasyon</h4>
                  
                  {[
                    { name: 'Güvenlik Politikaları', type: 'PDF', size: '2.4 MB' },
                    { name: 'KVKK Uyum Rehberi', type: 'PDF', size: '1.8 MB' },
                    { name: 'Acil Durum Prosedürleri', type: 'PDF', size: '950 KB' },
                    { name: 'Veri İşleme Envanteri', type: 'Excel', size: '1.2 MB' }
                  ].map((doc, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <h5 className="font-medium text-gray-900">{doc.name}</h5>
                            <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-700">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-700">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">⚡ Hızlı İşlemler</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { label: 'Güvenlik Taraması', icon: <Shield className="h-5 w-5" />, color: 'blue' },
            { label: 'Uyumluluk Raporu', icon: <FileText className="h-5 w-5" />, color: 'green' },
            { label: 'Audit Log İndir', icon: <Download className="h-5 w-5" />, color: 'purple' },
            { label: 'Politika Güncelle', icon: <Edit className="h-5 w-5" />, color: 'orange' },
            { label: 'Acil Durum Testi', icon: <AlertTriangle className="h-5 w-5" />, color: 'red' },
            { label: 'Eğitim Planla', icon: <Users className="h-5 w-5" />, color: 'indigo' }
          ].map((action, index) => (
            <button
              key={index}
              className={`p-4 rounded-lg border-2 border-dashed transition-all hover:shadow-md ${
                action.color === 'blue' ? 'border-blue-300 hover:border-blue-500 hover:bg-blue-50' :
                action.color === 'green' ? 'border-green-300 hover:border-green-500 hover:bg-green-50' :
                action.color === 'purple' ? 'border-purple-300 hover:border-purple-500 hover:bg-purple-50' :
                action.color === 'orange' ? 'border-orange-300 hover:border-orange-500 hover:bg-orange-50' :
                action.color === 'red' ? 'border-red-300 hover:border-red-500 hover:bg-red-50' :
                'border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`p-2 rounded-lg ${
                  action.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  action.color === 'green' ? 'bg-green-100 text-green-600' :
                  action.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  action.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                  action.color === 'red' ? 'bg-red-100 text-red-600' :
                  'bg-indigo-100 text-indigo-600'
                }`}>
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 text-center">{action.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalSecurityCompliance;