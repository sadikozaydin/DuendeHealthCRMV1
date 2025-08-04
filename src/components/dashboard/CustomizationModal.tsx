import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useModalBodyScroll } from '../../hooks/useModalBodyScroll';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  X, 
  Eye, 
  EyeOff, 
  Layout, 
  Palette, 
  Monitor, 
  Smartphone,
  RotateCcw,
  Save,
  Settings,
  Sun,
  Moon,
  Globe,
  Grid3X3,
  List,
  Layers,
  Zap,
  CheckCircle,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { DashboardSettings } from '../../services/dashboardSettingsService';
import DashboardTemplates from './DashboardTemplates';

interface CustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableWidgets: string[];
  settings: DashboardSettings;
  onSettingsChange: (settings: DashboardSettings) => void;
  lastSavedAt: Date | null;
  onSave: () => void;
  onReset: () => void;
  isSaving: boolean;
  lastSavedAt: Date | null;
  onSave: () => void;
  onReset: () => void;
  isSaving: boolean;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({
  isOpen,
  onClose,
  availableWidgets,
  settings,
  onSettingsChange,
  lastSavedAt,
  onSave,
  onReset,
  isSaving,
}) => {
  // Modal açıkken body scroll'unu kapat
  const { theme, setTheme } = useTheme();
  useModalBodyScroll(isOpen);
  const { i18n } = useTranslation();
  
  const [activeTab, setActiveTab] = useState('widgets');
  const [hasChanges, setHasChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState<DashboardSettings | null>(null);

  const [selectedCategory, setSelectedCategory] = useState('all');

  // ESC tuşu ile kapatma fonksiyonu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      setOriginalSettings(settings);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, settings]);

  // Değişiklik kontrolü
  useEffect(() => {
    if (originalSettings) {
      const changed = JSON.stringify(settings) !== JSON.stringify(originalSettings);
      setHasChanges(changed);
    }
  }, [settings, originalSettings]);

  // Modal dışına tıklayarak kapatma
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    if (hasChanges) {
      if (window.confirm('Kaydedilmemiş değişiklikler var. Çıkmak istediğinizden emin misiniz?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  // Widget kategorileri
  const widgetCategories = {
    all: 'Tümü',
    general: 'Genel',
    analytics: 'Analitik',
    communication: 'İletişim',
    management: 'Yönetim'
  };

  const widgetCategoryMap = {
    welcome: 'general', stats: 'analytics', quickActions: 'general', notifications: 'communication',
    calendar: 'management', patientFlow: 'management', recentActivity: 'general', treatmentOverview: 'management',
    analytics: 'analytics', performance: 'analytics', internalChat: 'communication', help: 'general'
  };

  const widgetLabels = {
    welcome: 'Hoş Geldiniz Paneli',
    stats: 'KPI İstatistikleri',
    quickActions: 'Hızlı Erişim',
    notifications: 'Bildirimler',
    calendar: 'Takvim & Ajanda',
    patientFlow: 'Hasta Akışı',
    recentActivity: 'Son Aktiviteler',
    treatmentOverview: 'Tedavi Özeti',
    analytics: 'Analitik Grafikler',
    performance: 'Performans Metrikleri',
    internalChat: 'İç Sohbet Sistemi',
    help: 'Yardım & Destek'
  };

  const widgetDescriptions = {
    welcome: 'Kişiselleştirilmiş karşılama ve günlük özet',
    stats: 'Önemli KPI\'lar ve sayısal veriler',
    quickActions: 'Sık kullanılan işlemler için hızlı butonlar',
    notifications: 'Sistem bildirimleri ve uyarılar',
    calendar: 'Randevular ve takvim görünümü',
    patientFlow: 'Hasta süreç akışı ve aşamalar',
    recentActivity: 'Son yapılan işlemler ve aktiviteler',
    treatmentOverview: 'Tedavi kategorileri ve özet bilgiler',
    analytics: 'Grafikler ve analitik veriler',
    performance: 'Kişisel performans metrikleri',
    internalChat: 'Ekip arkadaşları ile anlık mesajlaşma',
    help: 'Yardım, destek ve eğitim kaynakları'
  };

  // Filtrelenmiş widget'lar
  const filteredWidgets = selectedCategory === 'all' 
    ? availableWidgets 
    : availableWidgets.filter(widget => widgetCategoryMap[widget] === selectedCategory);

  const handleWidgetToggle = (widgetId: string) => {
    onSettingsChange({
      ...settings,
      widgetVisibility: {
        ...settings.widgetVisibility,
        [widgetId]: !settings.widgetVisibility[widgetId]
      }
    });
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    setTheme(theme);
  };

  const handleLayoutChange = (layout: 'default' | 'compact' | 'custom') => {
    onSettingsChange({
      ...settings,
      layout
    });
  };

  const handleLanguageChange = (language: string) => {
    onSettingsChange({
      ...settings,
      language
    });
    
    // Dil değişikliğini hemen uygula
    i18n.changeLanguage(language);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] transition-opacity duration-300" 
      onClick={handleBackdropClick}
      style={{ margin: 0, padding: 0, top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-4xl w-full flex flex-col max-h-[90vh]" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-md flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">🎛️ Dashboard Özelleştirme</h2>
                <div className="text-blue-100 text-sm">
                  Widget görünürlüğü, tema ve düzen ayarları
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {hasChanges && (
                <span className="px-3 py-1 bg-yellow-500 bg-opacity-20 text-yellow-100 text-sm rounded-full">
                  Kaydedilmemiş değişiklikler
                </span>
              )}
              <button
                onClick={handleClose}
                className="ml-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'widgets', label: 'Widget\'lar', icon: Grid3X3 },
              { id: 'theme', label: 'Tema & Görünüm', icon: Palette },
              { id: 'layout', label: 'Düzen', icon: Layout },
              { id: 'templates', label: 'Şablonlar', icon: Sparkles },
              { id: 'language', label: 'Dil & Bölge', icon: Globe }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-grow p-6 bg-white dark:bg-gray-900">
          {activeTab === 'widgets' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  <span>Widget Görünürlüğü</span>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  Dashboard'da görmek istediğiniz widget'ları seçin. Değişiklikler anında uygulanır.
                </p>
                
                {/* Kategori Filtreleri */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(widgetCategories).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedCategory(key)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === key
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredWidgets.map((widgetId) => (
                    <div
                      key={widgetId}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          settings.widgetVisibility[widgetId] 
                            ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400' 
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                        }`}>
                          {settings.widgetVisibility[widgetId] ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <EyeOff className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">{widgetLabels[widgetId]}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{widgetDescriptions[widgetId]}</p>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleWidgetToggle(widgetId)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.widgetVisibility[widgetId] ? 'bg-blue-600' : 'bg-gray-300'
                        } dark:bg-opacity-80`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.widgetVisibility[widgetId] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                  <Palette className="h-5 w-5 text-blue-600" />
                  <span>Tema Seçimi</span>
                </h3>
                
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'light', name: 'Açık Tema', icon: Sun, desc: 'Klasik beyaz tema', preview: 'bg-white' },
                    { id: 'dark', name: 'Koyu Tema', icon: Moon, desc: 'Göz dostu koyu tema', preview: 'bg-gray-900' },
                    { id: 'auto', name: 'Otomatik', icon: Monitor, desc: 'Sistem temasını takip et' }
                  ].map((themeOption) => (
                    <button
                      key={themeOption.id}
                      onClick={() => handleThemeChange(themeOption.id as 'light' | 'dark' | 'auto')}
                      className={`p-4 rounded-lg border-2 transition-all relative overflow-hidden ${
                        theme === themeOption.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900 dark:border-blue-400'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-gray-800'
                      }`}
                    >
                      {/* Tema Önizlemesi */}
                      {themeOption.preview && (
                        <div className={`absolute top-2 right-2 w-4 h-4 rounded-full ${themeOption.preview} border border-gray-300`}></div>
                      )}
                      <themeOption.icon className={`h-8 w-8 mx-auto mb-2 ${
                        theme === themeOption.id ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{themeOption.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{themeOption.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                  <Layout className="h-5 w-5 text-green-600" />
                  <span>Düzen Seçenekleri</span>
                </h3>
                
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'default', name: 'Varsayılan', icon: Grid3X3, desc: 'Standart grid düzeni' },
                    { id: 'compact', name: 'Kompakt', icon: List, desc: 'Daha sıkışık görünüm' },
                    { id: 'custom', name: 'Özel', icon: Layers, desc: 'Sürükle-bırak düzeni' }
                  ].map((layout) => (
                    <button
                      key={layout.id}
                      onClick={() => handleLayoutChange(layout.id as any)}
                      className={`p-4 rounded-lg border-2 transition-all bg-white dark:bg-gray-800 ${
                        settings.layout === layout.id
                          ? 'border-green-500 bg-green-50 dark:bg-green-900 dark:border-green-400'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <layout.icon className={`h-8 w-8 mx-auto mb-2 ${
                        settings.layout === layout.id ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'
                      }`} />
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{layout.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{layout.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <DashboardTemplates
                onSelectTemplate={(template) => {
                  // Şablon ayarlarını uygula
                  const newWidgetVisibility = {};
                  availableWidgets.forEach(widget => {
                    newWidgetVisibility[widget] = template.widgets.includes(widget);
                  });
                  
                  onSettingsChange({
                    ...settings,
                    layout: template.layout,
                    widgetVisibility: newWidgetVisibility,
                    widgetOrder: template.widgets
                  });
                  
                  // Başarı mesajı
                  alert(`✅ "${template.name}" şablonu uygulandı!`);
                }}
                currentRole={user?.role}
              />
            </div>
          )}

          {activeTab === 'language' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                  <Globe className="h-5 w-5 text-purple-600" />
                  <span>Dil ve Bölge Ayarları</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
                    { code: 'en', name: 'English', flag: '🇺🇸' },
                    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
                    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
                    { code: 'es', name: 'Español', flag: '🇪🇸' },
                    { code: 'fr', name: 'Français', flag: '🇫🇷' }
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`p-4 rounded-lg border-2 transition-all flex items-center space-x-3 bg-white dark:bg-gray-800 ${
                        settings.language === lang.code
                          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900 dark:border-purple-400'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <div className="text-left">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{lang.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{lang.code.toUpperCase()}</p>
                      </div>
                      {settings.language === lang.code && (
                        <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-800 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {lastSavedAt && (
                <span>Son kayıt: {lastSavedAt.toLocaleTimeString('tr-TR')}</span>
              )}
            </div>
            
            <button
              onClick={onReset}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Varsayılana Sıfırla</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={onSave}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Ayarları Kaydet</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;