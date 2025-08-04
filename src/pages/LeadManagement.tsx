import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { 
  UserPlus, 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  FileText, 
  Download, 
  Upload, 
  RefreshCw,
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Flag,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Target,
  Award,
  Zap,
  Bot,
  Flame,
  Thermometer,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Globe,
  FileSpreadsheet,
  PieChart as PieChartIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBranch } from '../contexts/BranchContext';
import { getLeads, getLeadStats, updateLead } from '../services/leadService';
import { getStatusColor, getStatusName, getPriorityColor, getPriorityName, getTemperatureColor, getTemperatureName } from '../utils/leadHelpers';
import LeadFilters from '../components/leads/LeadFilters';
import NewLeadModal from '../components/leads/NewLeadModal';
import LeadImportModal from '../components/leads/LeadImportModal';
import EditLeadModal from '../components/leads/EditLeadModal';
import LeadPreviewPopup from '../components/leads/LeadPreviewPopup';
import LeadNoteModal from '../components/leads/LeadNoteModal';
import MessageButton from '../components/common/MessageButton';

const LeadManagement: React.FC = () => {
  const { user } = useAuth();
  const { currentBranch } = useBranch();
  const { t } = useTranslation();
  
  // Tarih formatı fonksiyonu
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Geçerli bir tarih mi kontrol et
      if (isNaN(date.getTime())) {
        return 'Geçersiz Tarih';
      }
      return date.toLocaleDateString('tr-TR');
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Geçersiz Tarih';
    }
  };
  
  // Örnek lead verileri
  const initialLeads = [
    {
      id: '1',
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
      last_contact_date: '2025-01-14T14:30:00',
      next_follow_up: '2025-01-16T10:00:00',
      created_at: '2025-01-14T10:15:00',
      updated_at: '2025-01-14T14:30:00',
      language: 'İspanyolca',
      priority: 'high',
      campaign: 'Kardiyoloji 2025',
      lead_score: 85,
      lead_temperature: 'hot',
      conversion_probability: 75,
      interaction_count: 3,
      sourceDetails: 'WhatsApp Business API'
    },
    {
      id: '2',
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
      last_contact_date: '2025-01-13T16:45:00',
      next_follow_up: '2025-01-17T11:30:00',
      created_at: '2025-01-10T09:20:00',
      updated_at: '2025-01-13T16:45:00',
      language: 'Arapça',
      priority: 'medium',
      campaign: 'Ortopedi 2025',
      lead_score: 72,
      lead_temperature: 'warm',
      conversion_probability: 65,
      interaction_count: 2,
      sourceDetails: 'Website Form'
    },
    {
      id: '3',
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
      last_contact_date: '2025-01-12T11:20:00',
      next_follow_up: '2025-01-18T14:00:00',
      created_at: '2025-01-12T09:15:00',
      updated_at: '2025-01-12T11:20:00',
      language: 'İngilizce',
      priority: 'low',
      campaign: 'Instagram Beauty 2025',
      lead_score: 45,
      lead_temperature: 'warm',
      conversion_probability: 40,
      interaction_count: 1,
      sourceDetails: 'Instagram Beauty Campaign'
    }
  ];
  
  // State for leads and filters
  const [leads, setLeads] = useState<any[]>([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    source: 'all',
    country: 'all',
    treatment: 'all',
    temperature: 'all',
    priority: 'all'
  });
  
  // State for modals and popups
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [showLeadPreview, setShowLeadPreview] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [leadStats, setLeadStats] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Grafik renkleri
  const CHART_COLORS = {
    meta: '#1877F2',
    google: '#EA4335',
    tiktok: '#FF0050',
    whatsapp: '#25D366',
    website: '#6366F1',
    email: '#8B5CF6',
    referral: '#10B981',
    instagram: '#E4405F',
    facebook: '#1877F2',
    other: '#6B7280'
  };

  // Sayfa yüklendiğinde lead'leri getir
  useEffect(() => {
    const fetchLeads = async () => {
      setIsLoading(true);
      try {
        const result = await getLeads();
        if (result.data) {
          setLeads(result.data);
        } else {
          console.error('No leads data returned:', result.error);
          setLeads([]);
        }
      } catch (error) {
        console.error('Error fetching leads:', error);
        setLeads([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeads();
  }, []);
  
  // Yeni lead eklendiğinde dinle
  useEffect(() => {
    const handleNewLeadAdded = (event: CustomEvent) => {
      console.log('New lead added event received:', event.detail.lead);
      
      // Toast bildirimi göster
      const lead = event.detail.lead;
      const platformName = lead.source === 'meta' ? 'META' : 
                          lead.source === 'google' ? 'GOOGLE' : 
                          lead.source === 'tiktok' ? 'TIKTOK' : 
                          lead.source?.toUpperCase() || 'UNKNOWN';
      
      setToastMessage(`🎉 Yeni ${platformName} lead eklendi: ${lead.first_name} ${lead.last_name}`);
      setShowToast(true);
      
      // Toast'ı 5 saniye sonra gizle
      setTimeout(() => setShowToast(false), 5000);
      
      // Yeni lead'i ekle ve state'i güncelle
      const updatedLeads = [event.detail.lead, ...leads];
      setLeads(updatedLeads);
      
      // LocalStorage'a kaydet
      try {
        localStorage.setItem('crm_leads', JSON.stringify(updatedLeads));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
    };
    
    window.addEventListener('newLeadAdded', handleNewLeadAdded as EventListener);
    
    return () => {
      window.removeEventListener('newLeadAdded', handleNewLeadAdded as EventListener);
    };
  }, [leads]);
  
  // Load lead stats on component mount
  useEffect(() => {
    const loadLeadStats = async () => {
      try {
        const result = await getLeadStats();
        if (result.data) {
          setLeadStats(result.data);
        }
      } catch (error) {
        console.error('Error loading lead stats:', error);
      }
    };
    
    loadLeadStats();
  }, [refreshTrigger]);
  
  // Filter leads based on search term and filters
  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      // Search term filter
      const matchesSearch = 
        `${lead.first_name} ${lead.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.phone && lead.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (lead.lead_id && lead.lead_id.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Status filter
      const matchesStatus = filters.status === 'all' || lead.status === filters.status;
      
      // Source filter
      const matchesSource = filters.source === 'all' || 
        (lead.source && (
          lead.source.toLowerCase() === filters.source.toLowerCase() ||
          // Backward compatibility for existing leads
          (filters.source === 'meta' && (lead.source === 'facebook' || lead.source === 'instagram')) ||
          (filters.source === 'google' && (lead.source === 'google_ads' || lead.source === 'google'))
        ));
      
      // Country filter
      const matchesCountry = filters.country === 'all' || 
        (lead.country && lead.country.toLowerCase() === filters.country.toLowerCase());
      
      // Treatment filter
      const matchesTreatment = filters.treatment === 'all' || 
        (lead.treatment_interest && lead.treatment_interest.toLowerCase() === filters.treatment.toLowerCase());
      
      // Temperature filter
      const matchesTemperature = filters.temperature === 'all' || 
        (lead.lead_temperature && lead.lead_temperature === filters.temperature);
      
      // Priority filter
      const matchesPriority = filters.priority === 'all' || 
        (lead.priority && lead.priority === filters.priority);
      
      return matchesSearch && matchesStatus && matchesSource && 
             matchesCountry && matchesTreatment && matchesTemperature && matchesPriority;
    });
  }, [leads, searchTerm, filters]);
  
  // Handle lead edit
  const handleEditLead = (lead: any) => {
    console.log('Opening edit modal for lead:', lead);
    setSelectedLead(lead);
    setShowEditModal(true);
  };
  
  // Handle lead preview
  const handleLeadPreview = (lead: any) => {
    setSelectedLead(lead);
    setShowLeadPreview(true);
  };
  
  // Handle lead note
  const handleAddNote = (lead: any) => {
    setSelectedLead(lead);
    // Not modalını aç
    setShowNoteModal(true);
  };
  
  // Handle lead updated
  const handleLeadUpdated = () => {
    console.log('Lead updated, refreshing list...');
    
    // Güncel lead listesini localStorage'dan yeniden yükle
    try {
      const storedLeads = localStorage.getItem('crm_leads');
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads));
      }
    } catch (e) {
      console.error('Error reloading leads from localStorage:', e);
    }
    
    // Refresh trigger'ı güncelle
    setRefreshTrigger(prev => prev + 1); 
  };
  
  // Lead ekleme işlemi tamamlandığında
  const handleLeadAdded = () => {
    console.log('Lead added, refreshing list...');
    // Refresh trigger'ı da güncelle (API çağrıları için)
    setRefreshTrigger(prev => prev + 1);
    
    // Güncel lead listesini localStorage'dan yeniden yükle
    try {
      const storedLeads = localStorage.getItem('crm_leads');
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads));
      }
    } catch (e) {
      console.error('Error reloading leads from localStorage:', e);
    }
  };

  // Lead durumunu güncelleme
  const handleStatusChange = async (leadId: string, status: string) => {
    try {
      // Lead'i bul
      const leadToUpdate = leads.find(lead => lead.id === leadId);
      if (!leadToUpdate) return;
      
      // Lead'i güncelle
      const updatedLeadData = {
        ...leadToUpdate,
        status: status,
        updated_at: new Date().toISOString()
      };
      
      // API'yi çağır
      const result = await updateLead(leadId, updatedLeadData);
      
      if (result.success) {
        // Lead listesini güncelle
        handleLeadUpdated();
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };
  
  // Lead simülasyon fonksiyonu
  const simulateLead = (platform: 'meta' | 'google' | 'tiktok', tenantId: string = 'tenant-001') => {
    const platformData = {
      meta: {
        firstName: 'Maria',
        lastName: 'Facebook',
        email: 'maria.facebook@example.com',
        phone: '+34 612 345 678',
        country: 'İspanya',
        city: 'Madrid',
        treatment: 'Plastik Cerrahi',
        campaign: 'Meta Beauty Campaign 2025',
        sourceDetails: 'Facebook/Instagram Ads',
        priority: 'high',
        temperature: 'hot',
        score: Math.floor(Math.random() * 20) + 80, // 80-100 arası
        notes: 'Meta (Facebook/Instagram) reklamından gelen potansiyel hasta. Estetik cerrahi konusunda bilgi almak istiyor.'
      },
      google: {
        firstName: 'Ahmed',
        lastName: 'Google',
        email: 'ahmed.google@example.com',
        phone: '+971 50 123 4567',
        country: 'BAE',
        city: 'Dubai',
        treatment: 'Kalp Cerrahisi',
        campaign: 'Google Ads Kardiyoloji 2025',
        sourceDetails: 'Google Search Ads',
        priority: 'high',
        temperature: 'hot',
        score: Math.floor(Math.random() * 15) + 85, // 85-100 arası
        notes: 'Google Ads üzerinden gelen lead. Kalp cerrahisi için acil bilgi talep ediyor.'
      },
      tiktok: {
        firstName: 'Sarah',
        lastName: 'TikTok',
        email: 'sarah.tiktok@example.com',
        phone: '+44 7700 900123',
        country: 'İngiltere',
        city: 'Londra',
        treatment: 'Saç Ekimi',
        campaign: 'TikTok Hair Transplant 2025',
        sourceDetails: 'TikTok Video Ads',
        priority: 'medium',
        temperature: 'warm',
        score: Math.floor(Math.random() * 25) + 60, // 60-85 arası
        notes: 'TikTok reklamından gelen genç hasta. Saç ekimi konusunda bilgi almak istiyor.'
      }
    };

    const data = platformData[platform];
    const lead = {
      id: `${platform}-${Date.now()}`,
      lead_id: `LEAD-${Math.floor(Math.random() * 900000 + 100000)}`,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      city: data.city,
      treatment_interest: data.treatment,
      source: platform,
      status: 'contacted', // Yeni lead'ler doğrudan contacted durumunda
      assigned_to: '1',
      assigned_to_name: 'Fatma Yılmaz',
      assigned_to_position: 'Satış Temsilcisi',
      budget_range: platform === 'google' ? '€40,000 - €60,000' : 
                   platform === 'meta' ? '€15,000 - €25,000' : 
                   '£8,000 - £12,000',
      notes: data.notes,
      tags: ['Simülasyon', data.priority, platform.toUpperCase()],
      last_contact_date: new Date().toISOString(),
      next_follow_up: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 gün sonra
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      language: platform === 'meta' ? 'İspanyolca' : 
               platform === 'google' ? 'Arapça' : 'İngilizce',
      priority: data.priority,
      campaign: data.campaign,
      lead_score: data.score,
      lead_temperature: data.temperature,
      conversion_probability: Math.floor(data.score * 0.8), // Skorun %80'i
      interaction_count: 1, // İlk etkileşim
      sourceDetails: data.sourceDetails,
      tenantId: tenantId
    };

    // LocalStorage'a kaydet
    const existing = JSON.parse(localStorage.getItem('crm_leads') || '[]');
    const updated = [lead, ...existing];
    localStorage.setItem('crm_leads', JSON.stringify(updated));

    // Event dispatch et
    const event = new CustomEvent('newLeadAdded', { detail: { lead } });
    window.dispatchEvent(event);

    // Başarı mesajı
    alert(`✅ ${platform.toUpperCase()} lead simülasyonu başarıyla eklendi!\n\nLead: ${data.firstName} ${data.lastName}\nTedavi: ${data.treatment}\nSkor: ${data.score}/100`);
  };

  // Toplu lead simülasyonu
  const simulateAllPlatforms = () => {
    simulateLead('meta');
    setTimeout(() => simulateLead('google'), 500);
    setTimeout(() => simulateLead('tiktok'), 1000);
    
    setTimeout(() => {
      setToastMessage('🎉 Tüm platformlardan test lead\'leri başarıyla eklendi! ✅ Meta ✅ Google ✅ TikTok');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 6000);
    }, 1500);
  };
  
  // Lead'leri JSON olarak dışa aktar
  const exportLeadsAsJSON = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalLeads: filteredLeads.length,
      filters: filters,
      searchTerm: searchTerm,
      leads: filteredLeads.map(lead => ({
        ...lead,
        exportedAt: new Date().toISOString()
      }))
    };
    
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    setToastMessage(`📤 ${filteredLeads.length} lead JSON formatında dışa aktarıldı!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  
  // Lead'leri CSV olarak dışa aktar
  const exportLeadsAsCSV = () => {
    const headers = [
      'Lead ID', 'Ad', 'Soyad', 'E-posta', 'Telefon', 'Ülke', 'Şehir',
      'Tedavi', 'Kaynak', 'Durum', 'Öncelik', 'Skor', 'Sıcaklık',
      'Atanan Kişi', 'Oluşturma Tarihi', 'Son İletişim'
    ];
    
    const csvData = filteredLeads.map(lead => [
      lead.lead_id || '',
      lead.first_name || '',
      lead.last_name || '',
      lead.email || '',
      lead.phone || '',
      lead.country || '',
      lead.city || '',
      lead.treatment_interest || '',
      lead.source || '',
      lead.status || '',
      lead.priority || '',
      lead.lead_score || '',
      lead.lead_temperature || '',
      lead.assigned_to_name || '',
      lead.created_at ? new Date(lead.created_at).toLocaleDateString('tr-TR') : '',
      lead.last_contact_date ? new Date(lead.last_contact_date).toLocaleDateString('tr-TR') : ''
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    setToastMessage(`📊 ${filteredLeads.length} lead CSV formatında dışa aktarıldı!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  
  // Platform dağılımı hesapla
  const getPlatformDistribution = () => {
    const distribution = {};
    filteredLeads.forEach(lead => {
      const source = lead.source || 'unknown';
      distribution[source] = (distribution[source] || 0) + 1;
    });
    return distribution;
  };
  
  const platformDistribution = getPlatformDistribution();

  // Tarih bazlı istatistikler
  const getDateBasedStats = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const todayLeads = filteredLeads.filter(lead => {
      const leadDate = new Date(lead.created_at);
      return leadDate >= today;
    });
    
    const weekLeads = filteredLeads.filter(lead => {
      const leadDate = new Date(lead.created_at);
      return leadDate >= thisWeek;
    });
    
    const monthLeads = filteredLeads.filter(lead => {
      const leadDate = new Date(lead.created_at);
      return leadDate >= thisMonth;
    });
    
    return {
      today: todayLeads.length,
      week: weekLeads.length,
      month: monthLeads.length
    };
  };
  
  const dateStats = getDateBasedStats();

  // Grafik için platform verisi hazırla
  const chartData = Object.entries(platformDistribution).map(([platform, count]) => ({
    name: platform === 'meta' ? 'Meta' :
          platform === 'google' ? 'Google' :
          platform === 'tiktok' ? 'TikTok' :
          platform === 'whatsapp' ? 'WhatsApp' :
          platform === 'website' ? 'Website' :
          platform === 'email' ? 'E-posta' :
          platform === 'referral' ? 'Referans' :
          platform === 'instagram' ? 'Instagram' :
          platform === 'facebook' ? 'Facebook' :
          platform.charAt(0).toUpperCase() + platform.slice(1),
    value: count as number,
    color: CHART_COLORS[platform] || CHART_COLORS.other,
    platform: platform
  })).sort((a, b) => b.value - a.value);

  // Son 7 günün günlük lead dağılımı
  const getDailyLeadDistribution = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayLeads = filteredLeads.filter(lead => {
        const leadDate = new Date(lead.created_at);
        return leadDate.toISOString().split('T')[0] === dateStr;
      });
      
      last7Days.push({
        date: date.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric' }),
        leads: dayLeads.length,
        meta: dayLeads.filter(l => l.source === 'meta').length,
        google: dayLeads.filter(l => l.source === 'google').length,
        tiktok: dayLeads.filter(l => l.source === 'tiktok').length,
        other: dayLeads.filter(l => !['meta', 'google', 'tiktok'].includes(l.source)).length
      });
    }
    return last7Days;
  };
  
  const dailyData = getDailyLeadDistribution();

  // CSV dönüştürücü fonksiyon
  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';

    const keys = Object.keys(data[0]);
    const csvRows = [
      keys.join(','), // header
      ...data.map(row => keys.map(k => `"${(row[k] ?? '').toString().replace(/"/g, '""')}"`).join(','))
    ];
    return csvRows.join('\n');
  };

  // Gelişmiş CSV dışa aktarma (özel sütunlarla)
  const exportLeadsAsAdvancedCSV = () => {
    const csvData = filteredLeads.map(lead => ({
      'Lead ID': lead.lead_id || '',
      'Ad': lead.first_name || '',
      'Soyad': lead.last_name || '',
      'E-posta': lead.email || '',
      'Telefon': lead.phone || '',
      'Ülke': lead.country || '',
      'Şehir': lead.city || '',
      'Tedavi': lead.treatment_interest || '',
      'Kaynak': lead.source || '',
      'Kaynak Detayı': lead.sourceDetails || '',
      'Durum': lead.status || '',
      'Öncelik': lead.priority || '',
      'Lead Skoru': lead.lead_score || '',
      'Sıcaklık': lead.lead_temperature || '',
      'Dönüşüm Olasılığı': lead.conversion_probability || '',
      'Atanan Kişi': lead.assigned_to_name || '',
      'Pozisyon': lead.assigned_to_position || '',
      'Bütçe': lead.budget_range || '',
      'Dil': lead.language || '',
      'Kampanya': lead.campaign || '',
      'Etkileşim Sayısı': lead.interaction_count || '',
      'Oluşturma Tarihi': lead.created_at ? new Date(lead.created_at).toLocaleDateString('tr-TR') : '',
      'Son İletişim': lead.last_contact_date ? new Date(lead.last_contact_date).toLocaleDateString('tr-TR') : '',
      'Sonraki Takip': lead.next_follow_up ? new Date(lead.next_follow_up).toLocaleDateString('tr-TR') : '',
      'Notlar': lead.notes || ''
    }));
    
    const csv = convertToCSV(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads_export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    setToastMessage(`📊 ${filteredLeads.length} lead CSV formatında dışa aktarıldı!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('leads.title')}</h1>
          <p className="text-gray-600 mt-1">{t('leads.subtitle')}</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={exportLeadsAsJSON}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors text-sm"
            >
              <Download className="h-4 w-4" />
              <span>JSON</span>
            </button>
            <button
              onClick={exportLeadsAsAdvancedCSV}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors text-sm"
            >
              <FileSpreadsheet className="h-4 w-4" />
              <span>CSV</span>
            </button>
          </div>
          <button
            onClick={() => setShowImportModal(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>{t('common.import')}</span>
          </button>
          <button
            onClick={() => setShowNewLeadModal(true)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>{t('leads.newLead')}</span>
          </button>
        </div>
      </div>

      {/* Lead Simülasyon Butonları */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-purple-900 mb-1">🧪 Reklam Platformu Lead Simülasyonu</h3>
            <p className="text-sm text-purple-700">Gerçek webhook entegrasyonu öncesi test lead'leri oluşturun</p>
          </div>
          <div className="flex items-center space-x-2 text-xs text-purple-600">
            <Bot className="h-4 w-4" />
            <span>Test Modu</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => simulateLead('meta')}
            className="flex items-center justify-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-3 rounded-lg transition-colors border border-blue-300 hover:border-blue-400"
          >
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">f</div>
            <span className="font-medium">Meta Lead Simüle Et</span>
          </button>
          
          <button
            onClick={() => simulateLead('google')}
            className="flex items-center justify-center space-x-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-3 rounded-lg transition-colors border border-yellow-300 hover:border-yellow-400"
          >
            <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">G</div>
            <span className="font-medium">Google Lead Simüle Et</span>
          </button>
          
          <button
            onClick={() => simulateLead('tiktok')}
            className="flex items-center justify-center space-x-2 bg-pink-100 hover:bg-pink-200 text-pink-800 px-4 py-3 rounded-lg transition-colors border border-pink-300 hover:border-pink-400"
          >
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs font-bold">T</div>
            <span className="font-medium">TikTok Lead Simüle Et</span>
          </button>
        </div>
        
        <div className="mt-3 flex justify-center">
          <button
            onClick={simulateAllPlatforms}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-colors border border-purple-400"
          >
            <Bot className="h-4 w-4" />
            <span className="font-medium">Tüm Platformlardan Lead Üret</span>
          </button>
        </div>
        
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-blue-50 p-2 rounded border border-blue-200">
            <span className="font-medium text-blue-800">Meta:</span>
            <span className="text-blue-700"> İspanya, Plastik Cerrahi, Yüksek Skor</span>
          </div>
          <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
            <span className="font-medium text-yellow-800">Google:</span>
            <span className="text-yellow-700"> BAE, Kalp Cerrahisi, Premium</span>
          </div>
          <div className="bg-pink-50 p-2 rounded border border-pink-200">
            <span className="font-medium text-pink-800">TikTok:</span>
            <span className="text-pink-700"> İngiltere, Saç Ekimi, Genç Segment</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('leads.totalLeads')}</p>
              <p className="text-3xl font-bold text-blue-600">{leadStats?.totalCount || 247}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+{leadStats?.totalGrowth || 12}% {t('common.thisMonth')}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('leads.conversionRate')}</p>
              <p className="text-3xl font-bold text-green-600">%{leadStats?.conversionRate || 14}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+{leadStats?.conversionGrowth || 5}% {t('common.increase')}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('leads.hotLeads')}</p>
              <p className="text-3xl font-bold text-red-600">{leadStats?.temperatureCounts?.find(t => t.temperature === 'hot')?.count || 78}</p>
            </div>
            <Flame className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-sm text-red-600 mt-2">{t('leads.highConversionPotential')}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('leads.averageResponse')}</p>
              <p className="text-3xl font-bold text-purple-600">{leadStats?.averageResponseTime || 2.3}sa</p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">-%{leadStats?.responseImprovement || 15} iyileşme</p>
        </div>
      </div>

      {/* Tarih Bazlı İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">Bugün Gelen</p>
              <p className="text-3xl font-bold text-blue-800">{dateStats.today}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-blue-600 mt-2">Son 24 saat</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700">Bu Hafta</p>
              <p className="text-3xl font-bold text-green-800">{dateStats.week}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">Son 7 gün</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">Bu Ay</p>
              <p className="text-3xl font-bold text-purple-800">{dateStats.month}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">Son 30 gün</p>
        </div>
      </div>

      {/* Grafiksel Analitik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Dağılımı Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5 text-purple-600" />
              <span>Platform Dağılımı</span>
            </h3>
            <span className="text-sm text-gray-500">Toplam: {filteredLeads.length}</span>
          </div>
          
          {chartData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value, percent }) => `${name}: ${value} (%${(percent * 100).toFixed(0)})`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [value, name]}
                    labelFormatter={() => 'Lead Sayısı'}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <PieChartIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>Henüz lead bulunmuyor</p>
              </div>
            </div>
          )}
        </div>

        {/* Son 7 Günün Günlük Dağılımı */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Son 7 Günün Dağılımı</span>
            </h3>
            <span className="text-sm text-gray-500">Günlük lead sayısı</span>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="meta" stackId="a" fill="#1877F2" name="Meta" />
                <Bar dataKey="google" stackId="a" fill="#EA4335" name="Google" />
                <Bar dataKey="tiktok" stackId="a" fill="#FF0050" name="TikTok" />
                <Bar dataKey="other" stackId="a" fill="#6B7280" name="Diğer" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Filters */}
      <LeadFilters 
        filters={filters}
        setFilters={setFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        leadStats={leadStats}
      />

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('leads.leadInfo')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('leads.contactInfo')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('leads.treatmentSource')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('leads.statusScore')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('leads.assignmentFollow')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('leads.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        {lead.image ? (
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${
                            lead.priority === 'high' ? 'bg-red-500 animate-pulse-fast' :
                            lead.priority === 'medium' ? 'bg-yellow-500 animate-pulse-medium' :
                            'bg-green-500 animate-pulse-slow'
                          }`}>
                            {(lead.first_name?.[0] || '?')}{(lead.last_name?.[0] || '?')}
                          </div>
                        ) : (
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold animate-pulse ${
                            lead.priority === 'high' ? 'bg-red-500 animate-pulse-fast' :
                            lead.priority === 'medium' ? 'bg-yellow-500 animate-pulse-medium' :
                            'bg-green-500 animate-pulse-slow'
                          }`}>
                            {(lead.first_name?.[0] || '?')}{(lead.last_name?.[0] || '?')}
                          </div>
                        )}
                        {lead.priority === 'high' && (
                          <div className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 border-2 border-white rounded-full animate-pulse-border"></div>
                        )}
                        {lead.priority === 'medium' && (
                          <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-500 border-2 border-white rounded-full animate-pulse-border-medium"></div>
                        )}
                        {lead.priority === 'low' && (
                          <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full animate-pulse-border-slow"></div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{lead.first_name || 'İsimsiz'} {lead.last_name || 'Lead'}</div>
                        <div className="text-xs text-gray-500">{lead.lead_id || `LEAD-${typeof lead.id === 'string' ? lead.id.slice(-6) : '000000'}`}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          <span>Eklenme: {lead.created_at ? new Date(lead.created_at).toLocaleDateString('tr-TR') : 'Bilinmiyor'}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {lead.phone && (
                      <div className="flex items-center space-x-1 text-sm text-gray-900">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{lead.phone}</span>
                      </div>
                    )}
                    {lead.email && (
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="truncate max-w-[150px]">{lead.email}</span>
                      </div>
                    )}
                    {lead.country && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        <span>{lead.city ? `${lead.city}, ${lead.country}` : lead.country}</span>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.treatment_interest}</div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                      <Globe className="h-3 w-3 text-gray-400" />
                      <span>{lead.source || 'Bilinmiyor'}</span>
                      {lead.sourceDetails && (
                        <span className="text-gray-400 truncate max-w-[100px]">({lead.sourceDetails})</span>
                      )}
                    </div>
                    {lead.language && (
                      <div className="text-xs text-gray-500 mt-1">
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                          {lead.language || 'Bilinmiyor'}
                        </span>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                        {getStatusName(lead.status || 'contacted') || 'İletişimde'}
                      </span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(lead.priority)}`}>
                        {getPriorityName(lead.priority || 'medium') || 'Orta'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="flex items-center space-x-1">
                        <Target className="h-3 w-3 text-blue-600" />
                        <span>{typeof lead.lead_score === 'number' ? lead.lead_score : 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Thermometer className="h-3 w-3 text-red-600" />
                        <span className={`${lead.lead_temperature ? getTemperatureColor(lead.lead_temperature) : 'text-gray-600'}`}>
                          {getTemperatureName(lead.lead_temperature || 'warm') || 'Ilımlı'}
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.assigned_to_name || 'Fatma Yılmaz'}</div>
                    <div className="text-xs text-gray-500">{lead.assigned_to_position || 'Satış Temsilcisi'}</div>
                    {lead.next_follow_up && (
                      <div className="flex items-center space-x-1 text-xs text-blue-600 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>Takip: {formatDate(lead.next_follow_up)}</span>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleLeadPreview(lead)}
                        className="text-blue-600 hover:text-blue-700 p-1 rounded"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleEditLead(lead)}
                        className="text-gray-600 hover:text-gray-700 p-1 rounded"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleAddNote(lead)}
                        className="text-purple-600 hover:text-purple-700 p-1 rounded"
                      >
                        <FileText className="h-4 w-4" />
                      </button>
                      <MessageButton
                        recipientId={lead.id}
                        recipientType="lead"
                        contactInfo={{
                          phone: lead.phone,
                          email: lead.email,
                          whatsapp: lead.phone
                        }}
                        size="sm"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI & Automation Features */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span>AI Destekli Lead Yönetimi & Otomasyonlar</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Akıllı Lead Skorlama</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Kaynak bazlı önceliklendirme</li>
              <li>• Tedavi türü analizi</li>
              <li>• Etkileşim geçmişi değerlendirmesi</li>
              <li>• Dönüşüm olasılığı hesaplama</li>
              <li>• Otomatik sıcaklık belirleme</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Otomatik Atama Sistemi</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Dil bazlı eşleştirme</li>
              <li>• Uzmanlık alanı eşleştirmesi</li>
              <li>• İş yükü dengeleme</li>
              <li>• Performans bazlı atama</li>
              <li>• Coğrafi bölge optimizasyonu</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Takip Otomasyonu</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Otomatik hatırlatıcılar</li>
              <li>• Çoklu kanal takibi</li>
              <li>• Yanıt süre analizi</li>
              <li>• Etkileşim önerileri</li>
              <li>• Dönüşüm tahminleri</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showNewLeadModal && (
        <NewLeadModal 
          isOpen={showNewLeadModal} 
          onClose={() => setShowNewLeadModal(false)} 
          onLeadAdded={handleLeadAdded}
        />
      )}
      
      {showImportModal && (
        <LeadImportModal 
          isOpen={showImportModal} 
          onClose={() => setShowImportModal(false)} 
        />
      )}
      
      {showEditModal && selectedLead && (
        <EditLeadModal 
          isOpen={showEditModal} 
          onClose={() => {
            setShowEditModal(false);
            setSelectedLead(null);
          }} 
          lead={selectedLead}
          onLeadUpdated={handleLeadUpdated}
        />
      )}
      
      {showLeadPreview && selectedLead && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]" 
          style={{ margin: 0, padding: 0, top: 0, left: 0, right: 0, bottom: 0 }}
          onClick={() => {
            setShowLeadPreview(false);
            setSelectedLead(null);
          }}
        >
          <LeadPreviewPopup
            lead={selectedLead}
            onClose={() => {
              setShowLeadPreview(false);
              setSelectedLead(null);
            }}
            onAddNote={() => {
              setShowLeadPreview(false);
              setShowNoteModal(true);
            }}
          />
        </div>
      )}
      
      {showNoteModal && selectedLead && (
        <LeadNoteModal
          isOpen={showNoteModal}
          onClose={() => {
            setShowNoteModal(false);
          }}
          leadId={selectedLead.id}
          leadName={`${selectedLead.first_name} ${selectedLead.last_name}`}
          onNoteSaved={() => {
            setShowNoteModal(false);
            // Notlar listesini yenilemek için refresh trigger'ı güncelle
            setRefreshTrigger(prev => prev + 1);
          }}
        />
      )}
      
      {/* Toast Bildirimi */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-md">
            <CheckCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-sm font-medium">{toastMessage}</span>
            <button 
              onClick={() => setShowToast(false)}
              className="ml-2 text-green-200 hover:text-white"
            >
              <XCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;