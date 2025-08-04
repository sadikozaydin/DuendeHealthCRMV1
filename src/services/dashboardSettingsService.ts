// Dashboard ayarları servisi - Supabase entegrasyonu

export interface DashboardSettings {
  layout: 'default' | 'compact' | 'custom';
  theme: 'light' | 'dark' | 'auto';
  widgetVisibility: Record<string, boolean>;
  widgetOrder: string[];
  gridLayout: any[];
  language: string;
}

// Kullanıcının dashboard ayarlarını yükle
export const loadDashboardSettings = async (userId: string): Promise<{ success: boolean; data?: DashboardSettings; error?: string }> => {
  try {
    return loadSettingsFromLocalStorage(userId);
  } catch (error) {
    console.error('Dashboard settings load error:', error);
    return loadSettingsFromLocalStorage(userId);
  }
};

// Dashboard ayarlarını kaydet
export const saveDashboardSettings = async (userId: string, settings: DashboardSettings): Promise<{ success: boolean; error?: string }> => {
  try {
    return saveSettingsToLocalStorage(userId, settings);
  } catch (error) {
    console.error('Dashboard settings save error:', error);
    return saveSettingsToLocalStorage(userId, settings);
  }
};

// LocalStorage fallback functions
const loadSettingsFromLocalStorage = (userId: string): { success: boolean; data: DashboardSettings } => {
  try {
    const stored = localStorage.getItem(`dashboard_settings_${userId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        success: true,
        data: { ...getDefaultSettings(), ...parsed }
      };
    }
    return {
      success: true,
      data: getDefaultSettings()
    };
  } catch (error) {
    return {
      success: true,
      data: getDefaultSettings()
    };
  }
};

const saveSettingsToLocalStorage = (userId: string, settings: DashboardSettings): { success: boolean } => {
  try {
    localStorage.setItem(`dashboard_settings_${userId}`, JSON.stringify(settings));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'LocalStorage save failed' };
  }
};

// Varsayılan ayarlar
const getDefaultSettings = (): DashboardSettings => ({
  layout: 'default',
  theme: 'light',
  widgetVisibility: {
    welcome: true,
    stats: true,
    quickActions: true,
    notifications: true,
    calendar: true,
    patientFlow: true,
    recentActivity: true,
    treatmentOverview: true,
    analytics: true,
    performance: true,
    internalChat: true,
    help: true
  },
  widgetOrder: [
    'welcome', 'stats', 'quickActions', 'notifications', 
    'calendar', 'patientFlow', 'recentActivity', 'treatmentOverview',
    'analytics', 'performance', 'internalChat', 'help'
  ],
  gridLayout: [],
  language: 'tr'
});

// Dashboard ayarlarını sıfırla
export const resetDashboardSettings = async (userId: string): Promise<{ success: boolean; error?: string }> => {
  const defaultSettings = getDefaultSettings();
  return await saveDashboardSettings(userId, defaultSettings);
};