// Rol bazlı widget yönetimi için yardımcı fonksiyonlar

// Tüm mevcut widget ID'leri
export const allWidgetIds = [
  'welcome',
  'stats', 
  'quickActions',
  'notifications',
  'calendar',
  'patientFlow',
  'recentActivity',
  'treatmentOverview',
  'analytics',
  'performance',
  'internalChat',
  'help'
];

// Rol bazlı varsayılan widget'ları döndürür
export const getRoleBasedWidgets = (role?: string): string[] => {
  switch (role) {
    case 'super_admin':
    case 'admin':
      return [
        'welcome',
        'stats',
        'quickActions', 
        'notifications',
        'calendar',
        'patientFlow',
        'recentActivity',
        'treatmentOverview',
        'analytics',
        'performance',
        'internalChat',
        'help'
      ];
      
    case 'manager':
      return [
        'welcome',
        'stats',
        'quickActions',
        'notifications', 
        'calendar',
        'patientFlow',
        'recentActivity',
        'analytics',
        'performance',
        'internalChat',
        'help'
      ];
      
    case 'doctor':
      return [
        'welcome',
        'quickActions',
        'notifications',
        'calendar',
        'patientFlow',
        'treatmentOverview',
        'recentActivity',
        'internalChat',
        'help'
      ];
      
    case 'nurse':
      return [
        'welcome',
        'quickActions',
        'notifications',
        'calendar',
        'patientFlow',
        'recentActivity',
        'internalChat',
        'help'
      ];
      
    case 'agent':
      return [
        'welcome',
        'stats',
        'quickActions',
        'notifications',
        'calendar',
        'recentActivity',
        'performance',
        'internalChat',
        'help'
      ];
      
    case 'coordinator':
      return [
        'welcome',
        'quickActions',
        'notifications',
        'calendar',
        'patientFlow',
        'recentActivity',
        'internalChat',
        'help'
      ];
      
    case 'finance':
      return [
        'welcome',
        'stats',
        'quickActions',
        'notifications',
        'analytics',
        'performance',
        'help'
      ];
      
    case 'partner':
      return [
        'welcome',
        'quickActions',
        'notifications',
        'analytics',
        'help'
      ];
      
    case 'patient':
      return [
        'welcome',
        'quickActions',
        'notifications',
        'help'
      ];
      
    default:
      // Varsayılan widget'lar
      return [
        'welcome',
        'quickActions',
        'notifications',
        'calendar',
        'recentActivity',
        'help'
      ];
  }
};

// Widget kategorileri
export const widgetCategories = {
  general: ['welcome', 'quickActions', 'recentActivity', 'help'],
  analytics: ['stats', 'analytics', 'performance'],
  communication: ['notifications', 'internalChat'],
  management: ['calendar', 'patientFlow', 'treatmentOverview']
};

// Widget etiketleri
export const widgetLabels = {
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

// Widget açıklamaları
export const widgetDescriptions = {
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

// Widget kategorisi eşleştirmesi
export const widgetCategoryMap = {
  welcome: 'general',
  stats: 'analytics', 
  quickActions: 'general',
  notifications: 'communication',
  calendar: 'management',
  patientFlow: 'management',
  recentActivity: 'general',
  treatmentOverview: 'management',
  analytics: 'analytics',
  performance: 'analytics',
  internalChat: 'communication',
  help: 'general'
};