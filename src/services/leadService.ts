// Lead servisi - mock veriler kullanır
// Gerçek uygulamada bu Supabase veya başka bir backend ile entegre olacaktır

import LocalStorageManager from './localStorageService';

export type LeadPriority = 'high' | 'medium' | 'low';
export type LeadTemperature = 'hot' | 'warm' | 'cold';
export type LeadSource = 'website' | 'whatsapp' | 'call_center' | 'chat' | 'campaign' | 'referral' | 'instagram' | 'facebook' | 'google_ads' | 'email' | 'partner' | 'other';

// Lead skoru hesaplama için ağırlıklar
const SCORE_WEIGHTS = {
  source: {
    whatsapp: 25,
    call_center: 25,
    chat: 25,
    website: 15,
    email: 15,
    referral: 20,
    instagram: 10,
    facebook: 10,
    google_ads: 10,
    campaign: 5,
    partner: 15,
    other: 5
  },
  responseTime: {
    // Saat cinsinden
    lessThan1: 25,
    lessThan4: 20,
    lessThan24: 15,
    lessThan48: 10,
    moreThan48: 5
  },
  budget: {
    high: 20,
    medium: 15,
    low: 10,
    unknown: 5
  },
  treatmentType: {
    critical: 20, // Kalp cerrahisi, onkoloji gibi
    major: 15,    // Ortopedi, plastik cerrahi gibi
    standard: 10, // Diş, göz tedavileri gibi
    minor: 5      // Check-up, konsültasyon gibi
  },
  tags: {
    vip: 15,
    urgent: 15,
    follow_up: 10,
    returning: 10
  },
  interactionCount: {
    // Etkileşim sayısı
    moreThan5: 15,
    moreThan3: 10,
    moreThan1: 5,
    none: 0
  }
};

// Lead'leri getir
export const getLeads = async () => {
  try {
    console.log('Fetching leads...');

    // LocalStorage'dan lead'leri al
    const storedLeads = localStorage.getItem('crm_leads');
    if (storedLeads) {
      // LocalStorage'daki verileri temizle
      console.log('Clearing existing leads from localStorage');
      localStorage.removeItem('crm_leads');
    }
    
    console.log('Initializing with sample data');
    
    // Örnek lead verileri
    const sampleLeads = [];
    
    // Maria Rodriguez
    sampleLeads.push({
      id: 'lead-001',
      lead_id: 'LEAD-123456',
      first_name: 'Maria',
      last_name: 'Rodriguez',
      email: 'maria.rodriguez@example.com',
      phone: '+34 612 345 678',
      country: 'İspanya',
      city: 'Madrid',
      treatment_interest: 'Kalp Cerrahisi',
      source: 'whatsapp',
      status: 'contacted',
      assigned_to: '1',
      assigned_to_name: 'Fatma Yılmaz',
      assigned_to_position: 'Satış Temsilcisi',
      budget_range: '€30,000 - €50,000',
      notes: 'Bypass ameliyatı için bilgi istiyor. Fiyat ve tedavi süreci hakkında detaylı bilgi verildi.',
      tags: ['high', 'Acil', 'VIP'],
      last_contact_date: new Date().toISOString(),
      next_follow_up: new Date(Date.now() + 2*24*60*60*1000).toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      language: 'İspanyolca',
      priority: 'high',
      campaign: 'Kardiyoloji 2025',
      lead_score: 85,
      lead_temperature: 'hot',
      conversion_probability: 75,
      interaction_count: 3,
      sourceDetails: 'WhatsApp Business API',
      image: 'https://images.pexels.com/photos/7180651/pexels-photo-7180651.jpeg?auto=compress&cs=tinysrgb&w=150'
    });
    
    // Ahmed Hassan
    sampleLeads.push({
      id: 'lead-002',
      lead_id: 'LEAD-234567',
      first_name: 'Ahmed',
      last_name: 'Hassan',
      email: 'ahmed.hassan@example.com',
      phone: '+971 50 123 4567',
      country: 'BAE',
      city: 'Dubai',
      treatment_interest: 'Ortopedi',
      source: 'website',
      status: 'qualified',
      assigned_to: '2',
      assigned_to_name: 'Ahmet Kaya',
      assigned_to_position: 'Satış Temsilcisi',
      budget_range: '$40,000 - $60,000',
      notes: 'Diz protezi ameliyatı için fiyat teklifi istedi. Detaylı bilgi e-posta ile gönderildi.',
      tags: ['medium'],
      last_contact_date: new Date().toISOString(),
      next_follow_up: new Date(Date.now() + 3*24*60*60*1000).toISOString(),
      created_at: new Date(Date.now() - 4*24*60*60*1000).toISOString(),
      updated_at: new Date().toISOString(),
      language: 'Arapça',
      priority: 'medium',
      campaign: 'Ortopedi 2025',
      lead_score: 72,
      lead_temperature: 'warm',
      conversion_probability: 65,
      interaction_count: 2,
      sourceDetails: 'Website Form',
      image: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=150'
    });
    
    // Sarah Thompson
    sampleLeads.push({
      id: 'lead-003',
      lead_id: 'LEAD-345678',
      first_name: 'Sarah',
      last_name: 'Thompson',
      email: 'sarah.thompson@example.com',
      phone: '+44 7700 900123',
      country: 'İngiltere',
      city: 'Londra',
      treatment_interest: 'Plastik Cerrahi',
      source: 'instagram',
      status: 'contacted',
      assigned_to: '3',
      assigned_to_name: 'Zeynep Demir',
      assigned_to_position: 'Satış Temsilcisi',
      budget_range: '£20,000 - £30,000',
      notes: 'Rinoplasti için bilgi istiyor. Instagram reklamı üzerinden geldi.',
      tags: ['low'],
      last_contact_date: new Date().toISOString(),
      next_follow_up: new Date(Date.now() + 5*24*60*60*1000).toISOString(),
      created_at: new Date(Date.now() - 2*24*60*60*1000).toISOString(),
      updated_at: new Date().toISOString(),
      language: 'İngilizce',
      priority: 'low',
      campaign: 'Instagram Beauty 2025',
      lead_score: 45,
      lead_temperature: 'warm',
      conversion_probability: 40,
      interaction_count: 1,
      sourceDetails: 'Instagram Beauty Campaign',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    });
    
    // Hans Mueller
    sampleLeads.push({
      id: 'lead-004',
      lead_id: 'LEAD-456789',
      first_name: 'Hans',
      last_name: 'Mueller',
      email: 'hans.mueller@example.com',
      phone: '+49 151 1234 5678',
      country: 'Almanya',
      city: 'Berlin',
      treatment_interest: 'Saç Ekimi',
      source: 'referral',
      status: 'qualified',
      assigned_to: '1',
      assigned_to_name: 'Fatma Yılmaz',
      assigned_to_position: 'Satış Temsilcisi',
      budget_range: '€15,000 - €25,000',
      notes: 'FUE tekniği ile saç ekimi için bilgi aldı. Arkadaşı tarafından yönlendirildi.',
      tags: ['medium', 'Referans'],
      last_contact_date: new Date().toISOString(),
      next_follow_up: new Date(Date.now() + 1*24*60*60*1000).toISOString(),
      created_at: new Date(Date.now() - 5*24*60*60*1000).toISOString(),
      updated_at: new Date().toISOString(),
      language: 'Almanca',
      priority: 'medium',
      campaign: 'Referral Program',
      lead_score: 68,
      lead_temperature: 'warm',
      conversion_probability: 62,
      interaction_count: 3,
      sourceDetails: 'Referral: Thomas Weber',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    });
    
    // Fatima Al-Saud
    sampleLeads.push({
      id: 'lead-005',
      lead_id: 'LEAD-567890',
      first_name: 'Fatima',
      last_name: 'Al-Saud',
      email: 'fatima.alsaud@example.com',
      phone: '+966 50 123 4567',
      country: 'Suudi Arabistan',
      city: 'Riyad',
      treatment_interest: 'Diş İmplantı',
      source: 'partner',
      status: 'contacted',
      assigned_to: '2',
      assigned_to_name: 'Ahmet Kaya',
      assigned_to_position: 'Satış Temsilcisi',
      budget_range: '$20,000 - $30,000',
      notes: 'Tam ağız diş implantı için bilgi istiyor. Riyad\'daki partner kliniğimiz tarafından yönlendirildi.',
      tags: ['high', 'VIP'],
      last_contact_date: new Date().toISOString(),
      next_follow_up: new Date(Date.now() + 2*24*60*60*1000).toISOString(),
      created_at: new Date(Date.now() - 1*24*60*60*1000).toISOString(),
      updated_at: new Date().toISOString(),
      language: 'Arapça',
      priority: 'high',
      campaign: 'Partner Referral',
      lead_score: 92,
      lead_temperature: 'hot',
      conversion_probability: 85,
      interaction_count: 2,
      sourceDetails: 'Riyad Dental Clinic',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150'
    });
    
    // Örnek verileri localStorage'a kaydet
    localStorage.setItem('crm_leads', JSON.stringify(sampleLeads));
    console.log(`Saved ${sampleLeads.length} sample leads to localStorage`);
    
    return { 
      data: sampleLeads, 
      error: null 
    };
  } catch (error) {
    console.error('Error in getLeads:', error);
    // Genel hata durumunda da mock veri döndür
    return { data: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Lead kaynakları getir
export const getLeadSources = async () => {
  try {
    // Sabit bir liste döndür
    const mockSources = [
      { id: '1', name: 'Website', description: 'Website form submission' },
      { id: '2', name: 'Instagram', description: 'Instagram ads' },
      { id: '3', name: 'Facebook', description: 'Facebook ads' },
      { id: '4', name: 'Google Ads', description: 'Google search ads' },
      { id: '5', name: 'Referral', description: 'Referred by existing patient' },
      { id: '6', name: 'Partner', description: 'Partner agency' },
      { id: '7', name: 'WhatsApp', description: 'WhatsApp inquiry' },
      { id: '8', name: 'Email', description: 'Email inquiry' },
      { id: '9', name: 'Medical Tourism Fair', description: 'Medical tourism fair' }
    ];
    
    return { data: mockSources, error: null };
  } catch (error) {
    console.error('Error in getLeadSources:', error);
    return { data: [], error };
  }
};

// Lead skoru hesaplama
export const calculateLeadScore = (leadData: any): number => {
  let score = 0;
  
  // Kaynak puanı
  const source = leadData.source?.toLowerCase() as LeadSource;
  if (source && SCORE_WEIGHTS.source[source]) {
    score += SCORE_WEIGHTS.source[source];
  } else {
    score += SCORE_WEIGHTS.source.other;
  }
  
  // Yanıt süresi puanı
  const lastContactTime = leadData.last_contact_date ? new Date(leadData.last_contact_date).getTime() : null;
  if (lastContactTime) {
    const now = new Date().getTime();
    const hoursSinceLastContact = (now - lastContactTime) / (1000 * 60 * 60);
    
    if (hoursSinceLastContact < 1) {
      score += SCORE_WEIGHTS.responseTime.lessThan1;
    } else if (hoursSinceLastContact < 4) {
      score += SCORE_WEIGHTS.responseTime.lessThan4;
    } else if (hoursSinceLastContact < 24) {
      score += SCORE_WEIGHTS.responseTime.lessThan24;
    } else if (hoursSinceLastContact < 48) {
      score += SCORE_WEIGHTS.responseTime.lessThan48;
    } else {
      score += SCORE_WEIGHTS.responseTime.moreThan48;
    }
  }
  
  // Bütçe puanı
  if (leadData.budget_range) {
    const budget = leadData.budget_range.toLowerCase();
    if (budget.includes('high') || parseInt(budget.replace(/\D/g, '')) > 30000) {
      score += SCORE_WEIGHTS.budget.high;
    } else if (budget.includes('medium') || parseInt(budget.replace(/\D/g, '')) > 10000) {
      score += SCORE_WEIGHTS.budget.medium;
    } else if (budget.includes('low') || parseInt(budget.replace(/\D/g, '')) > 0) {
      score += SCORE_WEIGHTS.budget.low;
    } else {
      score += SCORE_WEIGHTS.budget.unknown;
    }
  } else {
    score += SCORE_WEIGHTS.budget.unknown;
  }
  
  // Tedavi türü puanı
  if (leadData.treatment_interest) {
    const treatment = leadData.treatment_interest.toLowerCase();
    if (treatment.includes('kalp') || treatment.includes('onkoloji') || treatment.includes('kanser') || treatment.includes('cardiac') || treatment.includes('cancer')) {
      score += SCORE_WEIGHTS.treatmentType.critical;
    } else if (treatment.includes('ortopedi') || treatment.includes('plastik') || treatment.includes('orthopedic') || treatment.includes('plastic')) {
      score += SCORE_WEIGHTS.treatmentType.major;
    } else if (treatment.includes('diş') || treatment.includes('göz') || treatment.includes('dental') || treatment.includes('eye')) {
      score += SCORE_WEIGHTS.treatmentType.standard;
    } else {
      score += SCORE_WEIGHTS.treatmentType.minor;
    }
  }
  
  // Etiket puanı
  if (leadData.tags && Array.isArray(leadData.tags)) {
    for (const tag of leadData.tags) {
      const tagLower = tag.toLowerCase();
      if (tagLower.includes('vip')) {
        score += SCORE_WEIGHTS.tags.vip;
      }
      if (tagLower.includes('urgent') || tagLower.includes('acil')) {
        score += SCORE_WEIGHTS.tags.urgent;
      }
      if (tagLower.includes('follow') || tagLower.includes('takip')) {
        score += SCORE_WEIGHTS.tags.follow_up;
      }
      if (tagLower.includes('return') || tagLower.includes('eski')) {
        score += SCORE_WEIGHTS.tags.returning;
      }
    }
  }
  
  // Etkileşim sayısı puanı
  const interactionCount = leadData.interaction_count || 0;
  if (interactionCount > 5) {
    score += SCORE_WEIGHTS.interactionCount.moreThan5;
  } else if (interactionCount > 3) {
    score += SCORE_WEIGHTS.interactionCount.moreThan3;
  } else if (interactionCount > 1) {
    score += SCORE_WEIGHTS.interactionCount.moreThan1;
  } else {
    score += SCORE_WEIGHTS.interactionCount.none;
  }
  
  // Yeni lead bonus puanı (son 24 saat içinde eklendiyse)
  const createdTime = new Date(leadData.created_at).getTime();
  const now = new Date().getTime();
  const hoursAgo = (now - createdTime) / (1000 * 60 * 60);
  if (hoursAgo < 24) {
    score += 10; // Yeni lead bonusu
  }
  
  // Acil işaretli lead'ler için bonus
  if (leadData.priority === 'high') {
    score += 15;
  }
  
  // Maksimum 100 puan
  return Math.min(Math.round(score), 100);
};

// Lead sıcaklığını hesaplama
export const calculateLeadTemperature = (score: number): LeadTemperature => {
  if (score >= 70) return 'hot';
  if (score >= 40) return 'warm';
  return 'cold';
};

// Lead dönüşüm olasılığını hesaplama
export const calculateConversionProbability = (score: number): number => {
  // Basit bir formül: skor yükseldikçe dönüşüm olasılığı artar
  return Math.round(score * 0.9); // Maksimum %90 olasılık
};

// Lead önceliğini hesaplama
export const calculateLeadPriority = (leadData: any): LeadPriority => {
  // Manuel olarak belirlenmiş öncelik varsa onu kullan
  if (leadData.priority) {
    return leadData.priority as LeadPriority;
  }
  
  // Skora göre öncelik belirle
  const score = calculateLeadScore(leadData);
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
};

// Kaynağa göre lead önceliğini belirle
export const getPriorityBySource = (source: string): LeadPriority => {
  // Canlı kanallar yüksek öncelikli
  if (['whatsapp', 'call_center', 'chat'].includes(source.toLowerCase())) {
    return 'high';
  }
  
  // Orta öncelikli kanallar
  if (['website', 'email', 'referral', 'partner'].includes(source.toLowerCase())) {
    return 'medium';
  }
  
  // Düşük öncelikli kanallar
  return 'low';
};

// Yeni lead ekle
export const addLead = async (leadData: any) => {
  try {
    console.log('Adding lead with data:', leadData);

    // Generate a unique lead_id
    const leadId = `LEAD-${Math.floor(Math.random() * 900000) + 100000}`;

    console.log('Generated lead_id:', leadId);
    
    // Otomatik agent atama
    const assignedAgent = await findBestMatchingAgent(leadData);
    
    // Lead skoru ve sıcaklık hesaplama
    const initialScore = calculateLeadScore({
      ...leadData,
      created_at: new Date().toISOString(),
      source: leadData.source || 'other',
      interaction_count: 0
    });
    
    const temperature = calculateLeadTemperature(initialScore);
    const conversionProbability = calculateConversionProbability(initialScore);
    
    // Öncelik belirleme (manuel veya otomatik)
    let priority = leadData.priority || 'medium';
    
    // Eğer öncelik belirtilmemişse, kaynağa göre otomatik belirle
    if (!leadData.priority && leadData.source) {
      priority = getPriorityBySource(leadData.source);
    }
    
    // Başarılı bir yanıt simüle et
    const mockLead = {
      id: `lead-${Date.now().toString()}`,
      lead_id: leadId,
      first_name: leadData.firstName || '',
      last_name: leadData.lastName || '',
      email: leadData.email,
      phone: leadData.phone,
      country: leadData.country,
      city: leadData.city,
      treatment_interest: leadData.treatmentInterest,
      source: leadData.source,
      budget_range: leadData.budgetRange || '',
      notes: leadData.notes,
      tags: leadData.tags || ['New Lead'],
      status: 'contacted', // Doğrudan 'contacted' durumuna geçiyor
      branch_id: leadData.branchId || null,
      created_by: leadData.createdBy || null,
      assigned_to: assignedAgent?.id || '1',
      assigned_to_name: assignedAgent?.name || 'Fatma Yılmaz',
      assigned_to_position: assignedAgent?.position || 'Satış Temsilcisi',
      lead_score: initialScore,
      lead_temperature: temperature,
      conversion_probability: conversionProbability,
      priority: priority,
      interaction_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    } as any;
    
    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // LocalStorage'a kaydet
    try {
      // Mevcut lead'leri al
      let existingLeads = [];
      const storedLeads = localStorage.getItem('crm_leads');
      if (storedLeads) {
        existingLeads = JSON.parse(storedLeads);
      }
      
      // Yeni lead'i ekle
      existingLeads.unshift(mockLead);
      
      // Güncellenmiş listeyi kaydet
      localStorage.setItem('crm_leads', JSON.stringify(existingLeads));
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
    
    console.log('Returning mock lead:', mockLead);
    
    // Açıkça success: true döndür
    return { 
      success: true, 
      data: mockLead, 
      error: null 
    };
  } catch (error) {
    console.error('Error in addLead:', error instanceof Error ? error.message : 'Unknown error');
    // Genel hata durumunda da mock veri döndür
    const mockLead = {
      id: `mock-${Date.now()}`,
      lead_id: `LEAD-${Date.now().toString().slice(-6)}`,
      first_name: leadData.firstName,
      last_name: leadData.lastName,
      email: leadData.email,
      phone: leadData.phone,
      country: leadData.country,
      city: leadData.city,
      treatment_interest: leadData.treatmentInterest,
      source: leadData.source,
      status: 'contacted',
      assigned_to: '1',
      assigned_to_name: 'Fatma Yılmaz',
      assigned_to_position: 'Satış Temsilcisi',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Hata durumunda da success: false döndür
    return { 
      success: false, 
      data: mockLead, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

// Geliştirilmiş agent eşleştirme algoritması
async function findBestMatchingAgent(leadData) {
  console.log('Finding best matching agent for lead:', leadData);

  // Öncelik belirleme
  let priority = leadData.priority || 'medium';
  if (!leadData.priority && leadData.source) {
    priority = getPriorityBySource(leadData.source);
  }
  
  // Tüm agent'ları getir
  const agents = [
    { 
      id: '1', 
      name: 'Fatma Yılmaz', 
      position: 'Satış Temsilcisi',
      languages: ['Türkçe', 'İngilizce', 'Arapça', 'İspanyolca'],
      specialties: ['Kalp Cerrahisi', 'Ortopedi'],
      currentLeads: 12,
      conversionRate: 68,
      responseTime: 1.2
    },
    { 
      id: '2', 
      name: 'Ahmet Kaya', 
      position: 'Satış Temsilcisi',
      languages: ['Türkçe', 'İngilizce', 'Almanca', 'Fransızca'],
      specialties: ['Plastik Cerrahi', 'Saç Ekimi'],
      currentLeads: 8,
      conversionRate: 72,
      responseTime: 0.8
    },
    { 
      id: '3', 
      name: 'Zeynep Demir', 
      position: 'Satış Temsilcisi',
      languages: ['Türkçe', 'İspanyolca', 'İngilizce', 'İtalyanca'],
      specialties: ['Diş Tedavisi', 'Göz Tedavisi'],
      currentLeads: 15,
      conversionRate: 65,
      responseTime: 1.5
    }
  ];
  
  // Atama algoritması simülasyonu
  try {
    // 1. Deneme: Tam eşleşme (tedavi + dil + öncelik)
    console.log('Attempt 1: Finding perfect match (treatment + language + priority)');
    const perfectMatches = agents.filter(agent => 
      agent.specialties.includes(leadData.treatmentInterest) && 
      agent.languages.some(lang => lang.toLowerCase() === leadData.language?.toLowerCase()) &&
      (priority === 'high' ? agent.conversionRate > 65 : true) // Yüksek öncelikli lead'ler için yüksek dönüşüm oranlı agent'lar
    );
    
    if (perfectMatches.length > 0) {
      // Önceliğe göre sıralama kriteri değişir
      let bestAgent;
      if (priority === 'high') {
        // Yüksek öncelikli lead'ler için en yüksek dönüşüm oranlı agent
        bestAgent = perfectMatches.sort((a, b) => b.conversionRate - a.conversionRate)[0];
      } else if (priority === 'medium') {
        // Orta öncelikli lead'ler için en hızlı yanıt veren agent
        bestAgent = perfectMatches.sort((a, b) => a.responseTime - b.responseTime)[0];
      } else {
        // Düşük öncelikli lead'ler için en düşük iş yüküne sahip agent
        bestAgent = perfectMatches.sort((a, b) => a.currentLeads - b.currentLeads)[0];
      }
      
      console.log('Perfect match found:', bestAgent.name);
      return bestAgent;
    }
    
    // 2. Deneme: Tedavi uzmanlığı eşleşmesi
    console.log('Attempt 2: Finding treatment specialty match');
    const treatmentMatches = agents.filter(agent => 
      agent.specialties.includes(leadData.treatmentInterest)
    );
    
    if (treatmentMatches.length > 0) {
      // En yüksek dönüşüm oranına sahip agent'ı seç
      let bestAgent;
      if (priority === 'high') {
        // Yüksek öncelikli lead'ler için en yüksek dönüşüm oranlı agent
        bestAgent = treatmentMatches.sort((a, b) => b.conversionRate - a.conversionRate)[0];
      } else {
        // Diğer öncelikler için en düşük iş yüküne sahip agent
        bestAgent = treatmentMatches.sort((a, b) => a.currentLeads - b.currentLeads)[0];
      }
      
      console.log('Treatment match found:', bestAgent.name);
      return bestAgent;
    }
    
    // 3. Deneme: Dil eşleşmesi
    console.log('Attempt 3: Finding language match');
    const languageMatches = agents.filter(agent => 
      agent.languages.some(lang => lang.toLowerCase() === leadData.language?.toLowerCase())
    );
    
    if (languageMatches.length > 0) {
      // En hızlı yanıt veren agent'ı seç
      let bestAgent;
      if (priority === 'high' || priority === 'medium') {
        // Yüksek/orta öncelikli lead'ler için en hızlı yanıt veren agent
        bestAgent = languageMatches.sort((a, b) => a.responseTime - b.responseTime)[0];
      } else {
        // Düşük öncelikli lead'ler için en düşük iş yüküne sahip agent
        bestAgent = languageMatches.sort((a, b) => a.currentLeads - b.currentLeads)[0];
      }
      
      console.log('Language match found:', bestAgent.name);
      return bestAgent;
    }
    
    // 4. Deneme: En yakın dil eşleşmesi
    console.log('Attempt 4: Finding closest language match');
    
    // Dil grupları (benzer diller)
    const languageGroups = [
      ['Türkçe', 'Azerice'], // Türki diller
      ['İngilizce', 'Almanca', 'Felemenkçe'], // Germen dilleri
      ['İspanyolca', 'İtalyanca', 'Portekizce', 'Fransızca'], // Latin dilleri
      ['Arapça', 'Farsça', 'Urduca'] // Sami/Hint-İran dilleri
    ];
    
    // Lead'in dili için en yakın dil grubunu bul
    let closestLanguageGroup = null;
    if (leadData.language) {
      for (const group of languageGroups) {
        if (group.some(lang => lang.toLowerCase() === leadData.language?.toLowerCase())) {
          closestLanguageGroup = group;
          break;
        }
      }
    }
    
    if (closestLanguageGroup) {
      // Bu dil grubundan herhangi bir dili bilen agent'ları bul
      const similarLanguageMatches = agents.filter(agent => 
        agent.languages.some(lang => closestLanguageGroup.includes(lang))
      );
      
      if (similarLanguageMatches.length > 0) {
        // Önceliğe göre en uygun agent'ı seç
        let bestAgent;
        if (priority === 'high') {
          bestAgent = similarLanguageMatches.sort((a, b) => b.conversionRate - a.conversionRate)[0];
        } else {
          bestAgent = similarLanguageMatches.sort((a, b) => a.currentLeads - b.currentLeads)[0];
        }
        
        console.log('Similar language match found:', bestAgent.name);
        return bestAgent;
      }
    }
    
    // 5. Son çare: Önceliğe göre en uygun agent'ı seç
    console.log('Fallback: Selecting agent based on priority');
    let bestAgent;
    
    if (priority === 'high') {
      // Yüksek öncelikli lead'ler için en yüksek dönüşüm oranlı agent
      bestAgent = agents.sort((a, b) => b.conversionRate - a.conversionRate)[0];
      console.log('High priority lead assigned to best performing agent:', bestAgent.name);
    } else if (priority === 'medium') {
      // Orta öncelikli lead'ler için en hızlı yanıt veren agent
      bestAgent = agents.sort((a, b) => a.responseTime - b.responseTime)[0];
      console.log('Medium priority lead assigned to fastest agent:', bestAgent.name);
    } else {
      // Düşük öncelikli lead'ler için en düşük iş yüküne sahip agent
      bestAgent = agents.sort((a, b) => a.currentLeads - b.currentLeads)[0];
      console.log('Low priority lead assigned to least busy agent:', bestAgent.name);
    }
    
    return bestAgent;
    
  } catch (error) {
    console.error('Error in agent matching algorithm:', error);
    // Hata durumunda varsayılan agent'ı döndür
    console.log('Error occurred, returning default agent');
    return { id: '1', name: 'Fatma Yılmaz', position: 'Satış Temsilcisi' };
  }
}

// Lead durumunu güncelle
export const updateLeadStatus = async (leadId, status) => {
  try {
    console.log(`Mock: Updating lead ${leadId} status to ${status}`);
    return { success: true, data: { id: leadId, status }, error: null };
  } catch (error) {
    console.error('Error in updateLeadStatus:', error);
    return { success: false, error };
  }
};

// Lead detayını getir
export const getLeadById = async (leadId) => {
  try {
    console.log('Fetching lead details for ID:', leadId);
    
    // LocalStorage'dan lead'leri al
    const storedLeads = localStorage.getItem('crm_leads');
    if (!storedLeads) {
      console.log('No leads found in localStorage');
      return { success: false, data: null, error: 'No leads found in storage' };
    }
    
    const leads = JSON.parse(storedLeads);
    const leadData = leads.find(lead => 
      lead.id === leadId || 
      lead.lead_id === leadId
    );
    
    if (leadData) {
      console.log('Lead data found:', leadData);
      return { success: true, data: leadData, error: null };
    } else {
      console.log('Lead not found for ID:', leadId);
      return { success: false, data: null, error: 'Lead not found' };
    }
  } catch (error) {
    console.error('Error in getLeadById:', error);
    return { success: false, data: null, error: error.message };
  }
};

// Lead güncelle
export const updateLead = async (leadId, leadData) => {
  try {
    console.log('Updating lead with ID in localStorage:', leadId);
    console.log('Update data for localStorage:', leadData);
    
    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mevcut leads listesini localStorage'dan al
    const existingLeads = LocalStorageManager.getItem('leads') || [];
    console.log(`Found ${existingLeads.length} leads in localStorage`);
    
    // Güncellenecek lead'i bul
    const leadIndex = existingLeads.findIndex(lead => String(lead.id) === String(leadId));
    console.log(`Lead index in array: ${leadIndex}`);
    
    // Lead'i güncelle veya yeni ekle
    const updatedLead = { 
      ...leadData,
      updated_at: new Date().toISOString(),
      // Lead skoru ve sıcaklık güncelleme
      lead_score: calculateLeadScore(leadData),
      lead_temperature: calculateLeadTemperature(calculateLeadScore(leadData)),
      conversion_probability: calculateConversionProbability(calculateLeadScore(leadData))
    };
    
    if (leadIndex >= 0) {
      // Mevcut lead'i güncelle
      console.log('Updating existing lead in localStorage');
      existingLeads[leadIndex] = {
        ...existingLeads[leadIndex],
        ...updatedLead
      };
    } else {
      // Lead bulunamadıysa, yeni ekle
      console.log('Lead not found, adding as new lead to localStorage');
      existingLeads.push(updatedLead);
    }
    
    // Güncellenmiş listeyi localStorage'a kaydet
    console.log('Saving updated leads to localStorage');
    LocalStorageManager.setItem('leads', existingLeads);
    
    console.log('Lead updated successfully:', updatedLead);
    
    return { 
      success: true, 
      data: updatedLead,
      error: null 
    };
    
  } catch (error) {
    console.error('Error in updateLead:', error);
    return { 
      success: false, 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

// Lead istatistiklerini getir
export const getLeadStats = async () => {
  try {
    // Mock istatistikler
    return {
      data: {
        totalCount: 247,
        lastMonthCount: 89,
        lastWeekCount: 23,
        statusCounts: [
          { status: 'new', count: 0 }, // Artık 'new' durumunda lead yok
          { status: 'contacted', count: 89 },
          { status: 'qualified', count: 45 },
          { status: 'converted', count: 34 },
          { status: 'lost', count: 12 }
        ],
        sourceCounts: [
          { source: 'Website', count: 45 },
          { source: 'WhatsApp', count: 56 },
          { source: 'Call Center', count: 38 },
          { source: 'Chat', count: 32 },
          { source: 'Instagram', count: 25 },
          { source: 'Facebook', count: 20 },
          { source: 'Google Ads', count: 15 },
          { source: 'Referral', count: 10 },
          { source: 'Partner', count: 6 }
        ],
        countryCounts: [
          { country: 'İspanya', count: 89 },
          { country: 'İngiltere', count: 67 },
          { country: 'BAE', count: 45 },
          { country: 'Almanya', count: 34 },
          { country: 'Diğer', count: 12 }
        ],
        treatmentCounts: [
          { treatment: 'Kalp Cerrahisi', count: 56 },
          { treatment: 'Ortopedi', count: 45 },
          { treatment: 'Plastik Cerrahi', count: 67 },
          { treatment: 'Diş İmplantı', count: 34 },
          { treatment: 'Saç Ekimi', count: 45 }
        ],
        temperatureCounts: [
          { temperature: 'hot', count: 78 },
          { temperature: 'warm', count: 112 },
          { temperature: 'cold', count: 57 }
        ],
        priorityCounts: [
          { priority: 'high', count: 65 },
          { priority: 'medium', count: 124 },
          { priority: 'low', count: 58 }
        ],
        conversionRate: 14,
        averageResponseTime: 2.3,
        totalGrowth: 12,
        conversionGrowth: 5,
        responseImprovement: 15
      },
      error: null
    };
  } catch (error) {
    console.error('Error in getLeadStats:', error);
    return { data: null, error };
  }
};

// Lead önceliğini güncelle
export const updateLeadPriority = async (leadId: string, priority: LeadPriority) => {
  try {
    console.log(`Mock: Updating lead ${leadId} priority to ${priority}`);
    return { success: true, data: { id: leadId, priority }, error: null };
  } catch (error) {
    console.error('Error in updateLeadPriority:', error);
    return { success: false, error };
  }
};

// Lead sıcaklığını güncelle
export const updateLeadTemperature = async (leadId: string, temperature: LeadTemperature) => {
  try {
    console.log(`Mock: Updating lead ${leadId} temperature to ${temperature}`);
    return { success: true, data: { id: leadId, temperature }, error: null };
  } catch (error) {
    console.error('Error in updateLeadTemperature:', error);
    return { success: false, error };
  }
};

// Lead etkileşimi ekle ve skoru güncelle
export const addLeadInteraction = async (leadId: string, interactionType: string) => {
  try {
    console.log(`Mock: Adding interaction ${interactionType} to lead ${leadId}`);
    
    // Gerçek uygulamada burada lead verisi çekilir ve skor yeniden hesaplanır
    // Şimdilik mock veri döndürelim
    const updatedScore = Math.floor(Math.random() * 30) + 70; // 70-100 arası rastgele skor
    const temperature = calculateLeadTemperature(updatedScore);
    const conversionProbability = calculateConversionProbability(updatedScore);
    
    return { 
      success: true, 
      data: { 
        id: leadId, 
        lead_score: updatedScore,
        lead_temperature: temperature,
        conversion_probability: conversionProbability,
        interaction_count: Math.floor(Math.random() * 5) + 1 // 1-5 arası rastgele etkileşim sayısı
      }, 
      error: null 
    };
  } catch (error) {
    console.error('Error in addLeadInteraction:', error);
    return { success: false, error };
  }
};