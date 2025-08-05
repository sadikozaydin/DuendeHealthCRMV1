import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Settings as SettingsIcon, 
  Building2, 
  Users, 
  Shield, 
  Database, 
  Bell,
  Globe,
  Mail,
  CreditCard,
  FileText,
  BarChart3,
  HelpCircle,
  UserPlus,
  Zap,
  Bot,
  Package,
  Handshake
} from 'lucide-react';
import { useBranch } from '../contexts/BranchContext';
import LegalSecurityCompliance from './LegalSecurityCompliance';
import EmailSettings from '../components/settings/EmailSettings';
import AIAutomationImprovement from './AIAutomationImprovement';
import UserManagement from './UserManagement';
import InventoryManagement from './InventoryManagement';
import PartnerManagement from './PartnerManagement';
import PaymentManagement from './PaymentManagement';
import PatientPortal from './PatientPortal';
import DataExportImport from '../components/common/DataExportImport';

const Settings = () => {
  const { t } = useTranslation();
  const { branchSettings, toggleMultiBranch, branches } = useBranch();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: t('settings.generalSettings'), icon: SettingsIcon, description: 'Sistem genel ayarları ve tercihler' },
    { id: 'lead-assignment', label: t('settings.leadAssignment'), icon: UserPlus, description: 'Lead atama kuralları ve KPI metrikleri' },
    { id: 'integrations', label: t('settings.integrations'), icon: Zap, description: 'Harici servisler ve API entegrasyonları' },
    { id: 'roles', label: t('settings.roles'), icon: Shield, description: 'Kullanıcı rolleri ve yetkilendirme' },
    { id: 'users', label: t('settings.users'), icon: Users, description: 'Kullanıcı hesapları ve erişim kontrolü' },
    { id: 'notifications', label: t('settings.notifications'), icon: Bell, description: 'Sistem bildirimleri ve hatırlatıcılar' },
    { id: 'language', label: t('settings.language'), icon: Globe, description: 'Dil, para birimi ve bölge ayarları' },
    { id: 'email', label: t('settings.email'), icon: Mail, description: 'SMTP yapılandırması ve şablonlar' },
    { id: 'clinic', label: t('settings.clinic'), icon: Building2, description: 'Klinik ve şube bilgileri' },
    { id: 'payment', label: t('settings.payment'), icon: CreditCard, description: 'Ödeme yöntemleri ve gateway yapılandırması' },
    { id: 'templates', label: t('settings.templates'), icon: FileText, description: 'Sözleşme ve form şablonları' },
    { id: 'reports', label: t('settings.reports'), icon: BarChart3, description: 'Raporlama ve analiz yapılandırması' },
    { id: 'legal-security', label: t('settings.legalSecurity'), icon: Shield, description: 'KVKK/GDPR uyumu ve güvenlik politikaları' },
    { id: 'ai-automation', label: t('settings.aiAutomation'), icon: Bot, description: 'Yapay zeka ve otomasyon ayarları' },
    { id: 'data-management', label: t('settings.dataManagement'), icon: Database, description: 'LocalStorage veri yönetimi ve yedekleme' },
    { id: 'help', label: t('Even though your project is already optimized, it's now too big to handle. Try using a <code>.bolt/ignore</code> file or splitting your project into smaller parts. Need help? You'll find all the steps below.
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Genel Sistem Ayarları</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sistem Adı
            </label>
            <input
              type="text"
              defaultValue="SağlıkTur CRM"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şirket Adı
            </label>
            <input
              type="text"
              defaultValue="SağlıkTur Medikal"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Zaman Dilimi
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="Europe/Istanbul">Türkiye (UTC+3)</option>
              <option value="Europe/London">Londra (UTC+0)</option>
              <option value="Asia/Dubai">Dubai (UTC+4)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tarih Formatı
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Sistem Tercihleri</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">Otomatik Yedekleme</h5>
              <p className="text-sm text-gray-600">Günlük otomatik veri yedeklemesi</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">Gelişmiş Güvenlik</h5>
              <p className="text-sm text-gray-600">İki faktörlü kimlik doğrulama</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeadAssignment = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Otomatik Lead Atama Kuralları</h3>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-blue-900 mb-2">Otomatik Lead Dağıtımı</h4>
          <p className="text-sm text-blue-700">
            Gelen lead'ler belirlenen kurallara göre otomatik olarak satış temsilcilerine atanır
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Atama Yöntemi
            </label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent" disabled>
              <option value="round-robin" selected>Sıralı Dağıtım (Round Robin)</option>
              <option value="workload">İş Yükü Bazlı</option>
              <option value="performance">Performans Bazlı</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Sistem otomatik olarak lead'leri sırayla temsilcilere atar.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maksimum Lead/Temsilci
            </label>
            <input
              type="number"
              defaultValue="50"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Otomatik Atama KPI Metrikleri</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-900">Dönüşüm Hedefi</h5>
            <div className="mt-2">
              <input
                type="number"
                defaultValue="25"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <span className="text-xs text-gray-500">% dönüşüm oranı</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-900">Yanıt Süresi</h5>
            <div className="mt-2">
              <input
                type="number"
                defaultValue="30"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <span className="text-xs text-gray-500">dakika içinde</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-900">Takip Sıklığı</h5>
            <div className="mt-2">
              <input
                type="number"
                defaultValue="3"
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <span className="text-xs text-gray-500">gün arayla</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Harici Entegrasyonlar</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">WhatsApp Business API</h4>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Aktif</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Hasta iletişimi ve otomatik mesajlaşma</p>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="API Token"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Telefon Numarası"
                defaultValue="+90 555 123 45 67"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Meta Ads (Facebook/Instagram)</h4>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Beklemede</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Lead generation ve reklam yönetimi</p>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="App ID"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="App Secret"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">PayTR Ödeme Gateway</h4>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Aktif</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Online ödeme işlemleri</p>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Merchant ID"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Merchant Key"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Google Analytics</h4>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Pasif</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Web sitesi analitikleri</p>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Tracking ID"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Property ID"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClinicManagement = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Klinik Yapı Ayarları</h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-blue-900">Çoklu Şube Sistemi</h4>
              <p className="text-sm text-blue-700 mt-1">
                {branchSettings.isMultiBranch 
                  ? 'Sistem şu anda çoklu şube modunda çalışıyor'
                  : 'Sistem şu anda tek şube modunda çalışıyor'
                }
              </p>
            </div>
            <button
              onClick={toggleMultiBranch}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                branchSettings.isMultiBranch ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  branchSettings.isMultiBranch ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Tek Şube Modu</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Basit yönetim ve kurulum</li>
              <li>• Düşük maliyet</li>
              <li>• Hızlı başlangıç</li>
              <li>• Küçük-orta klinikler için ideal</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Çoklu Şube Modu</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Ölçeklenebilir yapı</li>
              <li>• Şube bazlı raporlama</li>
              <li>• Merkezi yönetim</li>
              <li>• Büyük hastane zincirleri için</li>
            </ul>
          </div>
        </div>

        {branchSettings.isMultiBranch && (
          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Mevcut Şubeler ({branches.length})</h4>
            <div className="space-y-2">
              {branches.map(branch => (
                <div key={branch.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-900">{branch.name}</span>
                    <span className="text-sm text-gray-500 ml-2">{branch.address}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    branch.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {branch.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderReportsAndAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Analitik & Raporlar</h3>
        <p className="text-gray-600 mb-6">Sistem performansı, hasta verileri ve iş zekası raporları</p>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Hasta</p>
              <p className="text-3xl font-bold text-blue-600">2,847</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+12% bu ay</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aylık Gelir</p>
              <p className="text-3xl font-bold text-green-600">₺18.2M</p>
            </div>
            <CreditCard className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+23% geçen aya göre</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Dönüşüm Oranı</p>
              <p className="text-3xl font-bold text-purple-600">68%</p>
            </div>
            <BarChart3 className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+5% artış</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktif Tedavi</p>
              <p className="text-3xl font-bold text-orange-600">156</p>
            </div>
            <FileText className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-sm text-blue-600 mt-2">Bu hafta</p>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Aylık Gelir Trendi</h4>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-blue-500 mx-auto mb-3" />
              <p className="text-gray-600">Gelir grafiği burada görünecek</p>
              <p className="text-sm text-gray-500">Chart.js entegrasyonu ile</p>
            </div>
          </div>
        </div>

        {/* Patient Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Hasta Dağılımı</h4>
          <div className="space-y-4">
            {[
              { country: 'Türkiye', patients: 1247, percentage: 44, color: 'bg-red-500' },
              { country: 'İspanya', patients: 589, percentage: 21, color: 'bg-yellow-500' },
              { country: 'İngiltere', patients: 423, percentage: 15, color: 'bg-blue-500' },
              { country: 'Almanya', patients: 356, percentage: 12, color: 'bg-black' },
              { country: 'Diğer', patients: 232, percentage: 8, color: 'bg-gray-400' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm font-medium text-gray-900">{item.country}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{item.patients}</span>
                  <span className="text-sm text-gray-500 w-8 text-right">%{item.percentage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Treatment Analytics */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Tedavi Kategorileri Performansı</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Kardiyoloji', patients: 456, revenue: '₺6.7M', growth: '+15%', color: 'text-red-600 bg-red-50' },
            { name: 'Ortopedi', patients: 389, revenue: '₺5.4M', growth: '+8%', color: 'text-blue-600 bg-blue-50' },
            { name: 'Onkoloji', patients: 234, revenue: '₺9.1M', growth: '+22%', color: 'text-purple-600 bg-purple-50' },
            { name: 'Plastik Cerrahi', patients: 567, revenue: '₺4.2M', growth: '+12%', color: 'text-pink-600 bg-pink-50' }
          ].map((treatment, index) => (
            <div key={index} className={`p-4 rounded-lg ${treatment.color}`}>
              <h5 className="font-semibold mb-2">{treatment.name}</h5>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Hasta:</span> {treatment.patients}</p>
                <p><span className="font-medium">Gelir:</span> {treatment.revenue}</p>
                <p><span className="font-medium">Büyüme:</span> {treatment.growth}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Generation */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Rapor Oluşturma</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">Finansal Rapor</h5>
            <p className="text-sm text-gray-600 mb-3">Gelir, gider ve karlılık analizi</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
              Rapor Oluştur
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">Hasta Raporu</h5>
            <p className="text-sm text-gray-600 mb-3">Hasta demografisi ve tedavi istatistikleri</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
              Rapor Oluştur
            </button>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">Performans Raporu</h5>
            <p className="text-sm text-gray-600 mb-3">KPI'lar ve hedef karşılaştırması</p>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm transition-colors">
              Rapor Oluştur
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Gerçek Zamanlı Metrikler</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-green-800">Bugünkü Randevular</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-2xl font-bold text-green-700">24</p>
            <p className="text-xs text-green-600">+3 son 1 saatte</p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-800">Aktif Kullanıcılar</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-2xl font-bold text-blue-700">47</p>
            <p className="text-xs text-blue-600">Online şu anda</p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-800">Yeni Lead'ler</span>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-2xl font-bold text-purple-700">12</p>
            <p className="text-xs text-purple-600">Bugün gelen</p>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-orange-800">Sistem Durumu</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-2xl font-bold text-orange-700">99.9%</p>
            <p className="text-xs text-orange-600">Uptime</p>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Veri Dışa Aktarma</h4>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg text-sm transition-colors">
            <FileText className="h-4 w-4" />
            <span>Excel (.xlsx)</span>
          </button>
          <button className="flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg text-sm transition-colors">
            <FileText className="h-4 w-4" />
            <span>PDF Raporu</span>
          </button>
          <button className="flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg text-sm transition-colors">
            <Database className="h-4 w-4" />
            <span>CSV Verisi</span>
          </button>
          <button className="flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg text-sm transition-colors">
            <BarChart3 className="h-4 w-4" />
            <span>Dashboard PNG</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderPlaceholderContent = (title: string) => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {title !== 'E-Posta Ayarları' ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            {title} modülü geliştirme aşamasındadır. Yakında kullanıma sunulacaktır.
          </p>
        </div>
      ) : renderEmailSettings()}
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Mail className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium text-blue-900">SMTP Ayarları</h4>
        </div>
        <p className="text-sm text-blue-700">
          Bu ayarlar, sistem tarafından gönderilen e-postaların yapılandırmasını belirler. Kullanıcı bildirimleri, şifre sıfırlama ve otomatik e-postalar için kullanılır.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Sunucu
          </label>
          <input
            type="text"
            defaultValue="smtp.gmail.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Port
          </label>
          <input
            type="number"
            defaultValue="587"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-posta Adresi
          </label>
          <input
            type="email"
            defaultValue="no-reply@duendehealthcrm.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Şifre
          </label>
          <div className="relative">
            <input
              type="password"
              defaultValue="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
              <Eye className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gönderen Adı
          </label>
          <input
            type="text"
            defaultValue="Duende Health CRM"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SSL/TLS
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue="tls"
          >
            <option value="none">Yok</option>
            <option value="ssl">SSL</option>
            <option value="tls">TLS</option>
          </select>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">E-posta Bildirimleri</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">Yeni Kullanıcı Bildirimi</h5>
              <p className="text-sm text-gray-600">Yeni kullanıcı oluşturulduğunda hoş geldiniz e-postası</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">Şifre Sıfırlama</h5>
              <p className="text-sm text-gray-600">Şifre sıfırlama bağlantıları</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">Güvenlik Uyarıları</h5>
              <p className="text-sm text-gray-600">Şüpheli giriş denemeleri ve güvenlik olayları</p>
            </div>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Test ve Doğrulama</h4>
        <div className="flex space-x-3">
          <input
            type="email"
            placeholder="Test e-postası gönderilecek adres"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Test E-postası Gönder
          </button>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          İptal
        </button>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          Ayarları Kaydet
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'lead-assignment':
        return renderLeadAssignment();
      case 'integrations':
        return renderIntegrations();
      case 'clinic':
        return renderClinicManagement();
      case 'roles':
        return <RolePermissionManagement />;
      case 'legal-security':
        return <LegalSecurityCompliance />;
      case 'ai-automation':
        return <AIAutomationImprovement />;
      case 'users':
        return <UserManagement />;
      case 'inventory':
        return <InventoryManagement />;
      case 'payments':
        return <PaymentManagement />;
      case 'patient-portal':
        return <PatientPortal />;
      case 'data-management':
        return <DataExportImport />;
      case 'reports':
        return renderReportsAndAnalytics();
      case 'notifications':
        return renderPlaceholderContent('Bildirim Ayarları'); 
      case 'language':
        return renderPlaceholderContent('Dil Ayarları');
      case 'email':
        return <EmailSettings />;
      case 'payment':
        return renderPlaceholderContent('Ödeme Ayarları');
      case 'templates':
        return renderPlaceholderContent('Belge Şablonları');
      case 'help':
        return renderPlaceholderContent('Yardım ve Destek');
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{t('settings.title')}</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 p-4 rounded-lg text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-5 w-5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{tab.label}</p>
                  <p className="text-xs text-gray-500 truncate">{tab.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
          
          {/* Save Button */}
        </div>
      </div>
    </div>
  );
};

export default Settings;