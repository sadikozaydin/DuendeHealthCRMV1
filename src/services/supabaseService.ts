// LocalStorage tabanlı servis - Supabase tamamen kaldırıldı
// Tüm veriler localStorage'da saklanıyor

// Lead interface for LocalStorage
export interface LocalStorageLead {
  id?: string;
  lead_id: string;
  tenant_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  treatment_interest?: string;
  source: string;
  source_details?: string;
  campaign?: string;
  ad_id?: string;
  form_id?: string;
  raw_data?: any;
  status?: string;
  priority?: string;
  lead_score?: number;
  lead_temperature?: string;
  conversion_probability?: number;
  assigned_to?: string;
  tags?: string[];
  notes?: string;
  created_at?: string;
  updated_at?: string;
  last_contact_date?: string;
  next_follow_up?: string;
}

// Lead'i LocalStorage'e kaydetme
export const saveLeadToLocalStorage = async (leadData: any): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    console.log('💾 Saving lead to localStorage:', leadData);
    
    const lead: LocalStorageLead = {
      id: `local-${Date.now()}`,
      lead_id: leadData.lead_id || `LEAD-${Math.floor(Math.random() * 900000 + 100000)}`,
      tenant_id: leadData.tenantId || leadData.tenant_id || 'tenant-001',
      first_name: leadData.firstName || leadData.first_name || '',
      last_name: leadData.lastName || leadData.last_name || '',
      email: leadData.email,
      phone: leadData.phone,
      country: leadData.country,
      city: leadData.city,
      treatment_interest: leadData.treatmentInterest || leadData.treatment_interest,
      source: leadData.source || 'other',
      source_details: leadData.sourceDetails || leadData.source_details,
      campaign: leadData.campaign,
      ad_id: leadData.adId || leadData.ad_id,
      form_id: leadData.formId || leadData.form_id,
      raw_data: leadData.rawData || leadData,
      status: leadData.status || 'contacted',
      priority: leadData.priority || 'medium',
      lead_score: leadData.lead_score || 0,
      lead_temperature: leadData.lead_temperature || 'warm',
      conversion_probability: leadData.conversion_probability || 0,
      tags: leadData.tags || [],
      notes: leadData.notes || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Mevcut lead'leri al
    const existingLeads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
    existingLeads.unshift(lead);
    
    // LocalStorage'a kaydet
    localStorage.setItem('crm_leads', JSON.stringify(existingLeads));
    
    console.log('✅ Lead saved to localStorage successfully');
    return { success: true, data: lead };

  } catch (error) {
    console.error('❌ LocalStorage save error:', error);
    return { success: false, data: null, error: error.message };
  }
};

// LocalStorage'dan lead'leri getirme
export const getLeadsFromLocalStorage = async (tenantId?: string): Promise<{ success: boolean; data?: any[]; error?: string }> => {
  try {
    const leads = JSON.parse(localStorage.getItem('crm_leads') || '[]');
    
    // Tenant filtreleme
    const filteredLeads = tenantId 
      ? leads.filter((lead: any) => lead.tenant_id === tenantId || !lead.tenant_id)
      : leads;
    
    return { success: true, data: filteredLeads };
  } catch (error) {
    console.error('❌ LocalStorage read error:', error);
    return { success: false, data: [], error: error.message };
  }
};

// Webhook log'ları LocalStorage'e kaydetme
export const saveWebhookLogToLocalStorage = async (logData: any): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const log = {
      id: `log_${Date.now()}`,
      platform: logData.platform,
      tenant_id: logData.tenantId || logData.tenant_id,
      success: logData.success,
      lead_id: logData.leadId || logData.lead_id,
      error_message: logData.errorMessage || logData.error_message,
      payload: logData.payload,
      signature: logData.signature,
      processing_time: logData.processingTime || logData.processing_time,
      received_at: new Date().toISOString()
    };
    
    const existingLogs = JSON.parse(localStorage.getItem('webhook_logs') || '[]');
    existingLogs.unshift(log);
    
    // Son 1000 log'u tut
    if (existingLogs.length > 1000) {
      existingLogs.splice(1000);
    }
    
    localStorage.setItem('webhook_logs', JSON.stringify(existingLogs));
    
    return { success: true, data: log };
  } catch (error) {
    console.error('❌ Webhook log save error:', error);
    return { success: false, data: null, error: error.message };
  }
};

// Tenant bazlı veri filtreleme
export const filterDataByTenant = (data: any[], tenantId: string) => {
  return data.filter(item => 
    item.tenant_id === tenantId || 
    item.tenantId === tenantId || 
    !item.tenant_id
  );
};

// LocalStorage bağlantı durumu kontrolü
export const checkLocalStorageConnection = (): boolean => {
  try {
    const testKey = 'localStorage_test';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    console.error('❌ LocalStorage not available:', error);
    return false;
  }
};

// Migration helper - Supabase'den LocalStorage'e geçiş (artık gerekli değil)
export const migrateToLocalStorage = async (): Promise<{ success: boolean; migrated: number; errors: number }> => {
  console.log('📦 Already using LocalStorage - no migration needed');
  return { success: true, migrated: 0, errors: 0 };
};

// LocalStorage şemaları (referans için)
export const LOCALSTORAGE_SCHEMAS = {
  leads: `
-- LocalStorage Lead Structure
{
  id: string,
  lead_id: string,
  tenant_id: string,
  first_name: string,
  last_name: string,
  email?: string,
  phone?: string,
  country?: string,
  city?: string,
  treatment_interest?: string,
  source: string,
  source_details?: string,
  status: string,
  priority: string,
  lead_score: number,
  lead_temperature: string,
  conversion_probability: number,
  tags: string[],
  notes: string,
  created_at: string,
  updated_at: string
}
  `,
  
  webhook_logs: `
-- LocalStorage Webhook Log Structure
{
  id: string,
  platform: string,
  tenant_id: string,
  success: boolean,
  lead_id?: string,
  error_message?: string,
  payload: any,
  signature?: string,
  processing_time: number,
  received_at: string
}
  `
};

// Supabase bağımlılığı kaldırıldı
export const supabase = null;
export const isSupabaseEnabled = false;

console.log('🚀 LocalStorage Service: Fully independent from Supabase');