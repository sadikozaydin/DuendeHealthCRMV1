import React, { useState, useEffect } from 'react';
import { useModalBodyScroll } from '../../hooks/useModalBodyScroll';
import { 
  X, 
  XCircle, 
  Edit, 
  Globe, 
  Phone, 
  Mail, 
  MessageCircle,
  FileText,
  Flag,
  AlertTriangle,
  Info,
  Users,
  Building2,
  MapPin,
  Upload,
  Zap,
  MessageSquare,
  PhoneCall,
  Save,
  Loader2,
  Star
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useBranch } from '../../contexts/BranchContext';
import { updateLead } from '../../services/leadService';

interface Lead {
  id: string;
  lead_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  treatment_interest?: string;
  source?: string;
  status: string;
  assigned_to?: string;
  budget_range?: string;
  notes?: string;
  tags?: string[];
  last_contact_date?: string;
  next_follow_up?: string;
  created_at: string;
  updated_at: string;
  language?: string;
  priority?: string;
  campaign?: string;
  lead_score?: number;
  lead_temperature?: string;
  conversion_probability?: number;
  assigned_to_name?: string;
  assigned_to_position?: string;
  interaction_count?: number;
  sourceDetails?: string;
}

interface EditLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onLeadUpdated?: () => void;
}

const EditLeadModal: React.FC<EditLeadModalProps> = ({ isOpen, onClose, lead, onLeadUpdated }) => {
  console.log("EditLeadModal rendered with lead:", lead);
  
  // Modal açıkken body scroll'unu kapat
  useModalBodyScroll(isOpen);
  
  const { user } = useAuth();
  const { currentBranch } = useBranch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    treatmentInterest: '',
    source: '',
    sourceDetails: '',
    notes: '',
    priority: 'medium',
    isUrgent: false,
    isVIP: false,
    kvkkConsent: true,
    marketingConsent: false,
    budgetRange: '',
    language: '',
    status: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState<any>(null);

  // ESC tuşu ile kapatma fonksiyonu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseWithConfirm();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, hasChanges]);

  // Lead verilerini form'a yükle
  useEffect(() => {
    if (lead) {
      console.log("Loading lead data into form:", lead);
      const initialFormData = {
        firstName: lead.first_name || '',
        lastName: lead.last_name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        country: lead.country || '',
        city: lead.city || '',
        treatmentInterest: lead.treatment_interest || '',
        source: lead.source || '',
        sourceDetails: lead.sourceDetails || '',
        notes: lead.notes || '',
        priority: lead.priority || 'medium',
        isUrgent: lead.tags?.includes('Acil') || false,
        isVIP: lead.tags?.includes('VIP') || false,
        kvkkConsent: true, // Varsayılan olarak true
        marketingConsent: lead.tags?.includes('Marketing') || false,
        budgetRange: lead.budget_range || '',
        language: lead.language || '',
        status: lead.status || ''
      };
      
      setFormData(initialFormData);
      setOriginalData(initialFormData);
      setHasChanges(false);
      setError(null); // Clear any previous errors
    }
  }, [lead]);

  // Modal dışına tıklayarak kapatma
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseWithConfirm();
    }
  };

  // Değişiklik varsa onay alarak kapatma
  const handleCloseWithConfirm = () => {
    if (hasChanges) {
      if (window.confirm('Kaydedilmemiş değişiklikler var. Çıkmak istediğinizden emin misiniz?')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  // Kaynak türüne göre öncelik belirleme
  const getSourcePriorityClass = (source: string) => {
    const highPrioritySources = ['whatsapp', 'call_center', 'chat'];
    const mediumPrioritySources = ['website', 'email', 'referral', 'partner'];
    
    if (highPrioritySources.includes(source.toLowerCase())) {
      return 'border-red-500 bg-red-50';
    } else if (mediumPrioritySources.includes(source.toLowerCase())) {
      return 'border-yellow-500 bg-yellow-50';
    } else {
      return 'border-gray-300 bg-white';
    }
  };

  // Form değişikliklerini izleme
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Acil işaretlenirse önceliği yüksek yap
      if (field === 'isUrgent' && value === true) {
        newData.priority = 'high';
      }
      
      // Kaynak değişirse ve yüksek öncelikli bir kaynaksa önceliği güncelle
      if (field === 'source') {
        const highPrioritySources = ['whatsapp', 'call_center', 'chat'];
        if (highPrioritySources.includes(value.toLowerCase())) {
          newData.priority = 'high';
        }
      }
      
      // Değişiklik olup olmadığını kontrol et
      const hasAnyChange = Object.keys(newData).some(key => 
        newData[key] !== originalData?.[key]
      );
      
      setHasChanges(hasAnyChange);
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!lead) return;

    console.log("Submitting lead form with data:", formData);
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Etiketleri oluştur
      const tags = [
        formData.priority, 
        ...(formData.isUrgent ? ['Acil'] : []), 
        ...(formData.isVIP ? ['VIP'] : []),
        ...(formData.marketingConsent ? ['Marketing'] : [])
      ];
      
      // Update lead object
      const updatedLeadData = {
        id: lead.id,
        lead_id: lead.lead_id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        treatment_interest: formData.treatmentInterest,
        source: formData.source,
        sourceDetails: formData.sourceDetails,
        notes: formData.notes,
        tags,
        priority: formData.priority,
        budget_range: formData.budgetRange,
        language: formData.language,
        status: formData.status,
        updated_at: new Date().toISOString()
      };

      console.log("Updating lead with data:", updatedLeadData);

      // Call the API to update the lead
      const result = await updateLead(lead.id, updatedLeadData);
      
      if (result && result.success) {
        console.log("Lead updated successfully:", result);
        if (onLeadUpdated) {
          onLeadUpdated();
        }
        
        setHasChanges(false);
        onClose();
      } else {
        console.error("Lead update failed:", result.error);
        setError(result?.error || 'Lead güncellenirken bir hata oluştu.');
      }
    } catch (err) {
      console.error('Lead güncelleme hatası:', err);
      setError('Lead güncellenirken bir hata oluştu. Lütfen tüm zorunlu alanları doldurduğunuzdan emin olun.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  if (!lead) {
    console.log("No lead provided, showing error");
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] transition-opacity duration-300" 
        onClick={onClose}
        style={{ margin: 0, padding: 0, top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <div 
          className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Hata</h3>
            <p className="text-gray-600 mb-4">Lead bilgileri yüklenemedi.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tamam
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] transition-opacity duration-300" 
      onClick={handleBackdropClick}
      style={{ margin: 0, padding: 0, top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full flex flex-col max-h-[85vh]" 
        style={{ margin: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-md flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <Edit className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Lead Düzenle</h2>
                <div className="text-blue-100 text-sm">{lead?.lead_id || ''}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {hasChanges && (
                <span className="px-2 py-1 bg-yellow-500 bg-opacity-20 text-yellow-100 text-xs rounded-full">
                  Değişiklik var
                </span>
              )}
              <button
                onClick={handleCloseWithConfirm}
                className="ml-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-6 mt-4">
            <div className="flex items-center text-red-800">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="overflow-y-auto flex-grow p-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Lead Düzenleme</h4>
                  <p className="text-sm text-blue-700">
                    Lead ID: {lead.lead_id} • Oluşturulma: {new Date(lead.created_at).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soyad *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ülke *
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Ülke Seçin</option>
                    <option value="İspanya">İspanya</option>
                    <option value="İngiltere">İngiltere</option>
                    <option value="BAE">BAE</option>
                    <option value="Almanya">Almanya</option>
                    <option value="Fransa">Fransa</option>
                    <option value="İtalya">İtalya</option>
                    <option value="Rusya">Rusya</option>
                    <option value="Ukrayna">Ukrayna</option>
                    <option value="Suudi Arabistan">Suudi Arabistan</option>
                    <option value="Katar">Katar</option>
                    <option value="Kuveyt">Kuveyt</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şehir
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İlgilendiği Tedavi *
                </label>
                <select
                  value={formData.treatmentInterest}
                  onChange={(e) => handleInputChange('treatmentInterest', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Tedavi Seçin</option>
                  <option value="Kalp Cerrahisi">Kalp Cerrahisi</option>
                  <option value="Ortopedi">Ortopedi</option>
                  <option value="Onkoloji">Onkoloji</option>
                  <option value="Plastik Cerrahi">Plastik Cerrahi</option>
                  <option value="Saç Ekimi">Saç Ekimi</option>
                  <option value="Diş Tedavisi">Diş Tedavisi</option>
                  <option value="Göz Tedavisi">Göz Tedavisi</option>
                  <option value="Check-up">Check-up</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lead Kaynağı *
                </label>
                <select
                  value={formData.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${getSourcePriorityClass(formData.source)}`}
                  required
                >
                  <option value="">Kaynak Seçin</option>
                  <optgroup label="Yüksek Öncelikli Kanallar">
                    <option value="whatsapp">WhatsApp</option>
                    <option value="call_center">Çağrı Merkezi</option>
                    <option value="chat">Canlı Chat</option>
                  </optgroup>
                  <optgroup label="Orta Öncelikli Kanallar">
                    <option value="website">Website Form</option>
                    <option value="email">E-posta</option>
                    <option value="referral">Referans</option>
                    <option value="partner">Partner/Acenta</option>
                  </optgroup>
                  <optgroup label="Düşük Öncelikli Kanallar">
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="google_ads">Google Ads</option>
                    <option value="campaign">Kampanya</option>
                    <option value="other">Diğer</option>
                  </optgroup>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kaynak Detayı
                </label>
                <input
                  type="text"
                  value={formData.sourceDetails}
                  onChange={(e) => handleInputChange('sourceDetails', e.target.value)}
                  placeholder="Örn: Instagram kampanya adı, referans veren kişi..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bütçe Aralığı
                </label>
                <input
                  type="text"
                  value={formData.budgetRange}
                  onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                  placeholder="Örn: €30,000 - €50,000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dil
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Dil Seçin</option>
                  <option value="Türkçe">Türkçe</option>
                  <option value="İngilizce">İngilizce</option>
                  <option value="Arapça">Arapça</option>
                  <option value="İspanyolca">İspanyolca</option>
                  <option value="Almanca">Almanca</option>
                  <option value="Fransızca">Fransızca</option>
                  <option value="Rusça">Rusça</option>
                  <option value="İtalyanca">İtalyanca</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durum
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="contacted">İletişimde</option>
                  <option value="qualified">Nitelikli</option>
                  <option value="converted">Dönüştü</option>
                  <option value="lost">Kayıp</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notlar
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Lead hakkında ek bilgiler..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Öncelik *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <label className={`flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${formData.priority === 'high' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input
                      type="radio"
                      name="priority"
                      value="high"
                      checked={formData.priority === 'high'}
                      onChange={() => handleInputChange('priority', 'high')}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 mb-2"
                    />
                    <PhoneCall className="h-5 w-5 text-red-600 mb-1" />
                    <span className="text-sm font-medium text-gray-900 mb-1">Yüksek</span>
                    <span className="text-xs text-red-600">Acil yanıt gerektirir</span>
                  </label>
                  
                  <label className={`flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${formData.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input
                      type="radio"
                      name="priority"
                      value="medium"
                      checked={formData.priority === 'medium'}
                      onChange={() => handleInputChange('priority', 'medium')}
                      className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 mb-2"
                    />
                    <MessageSquare className="h-5 w-5 text-yellow-600 mb-1" />
                    <span className="text-sm font-medium text-gray-900 mb-1">Orta</span>
                    <span className="text-xs text-yellow-600">Standart yanıt süresi</span>
                  </label>
                  
                  <label className={`flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${formData.priority === 'low' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input
                      type="radio"
                      name="priority"
                      value="low"
                      checked={formData.priority === 'low'}
                      onChange={() => handleInputChange('priority', 'low')}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 mb-2"
                    />
                    <Mail className="h-5 w-5 text-green-600 mb-1" />
                    <span className="text-sm font-medium text-gray-900 mb-1">Düşük</span>
                    <span className="text-xs text-green-600">Rutin işlem</span>
                  </label>
                </div>
              </div>
              
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <input
                    type="checkbox"
                    id="isUrgent"
                    checked={formData.isUrgent}
                    onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <div>
                    <label htmlFor="isUrgent" className="text-sm font-medium text-gray-900 flex items-center">
                      <AlertTriangle className="h-4 w-4 text-red-600 mr-1" />
                      Acil İşaretli
                    </label>
                    <p className="text-xs text-gray-600">Lead acil yanıt gerektiriyor (öncelik yüksek olarak ayarlanır)</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <input
                    type="checkbox"
                    id="isVIP"
                    checked={formData.isVIP}
                    onChange={(e) => handleInputChange('isVIP', e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <div>
                    <label htmlFor="isVIP" className="text-sm font-medium text-gray-900 flex items-center">
                      <Star className="h-4 w-4 text-purple-600 mr-1" />
                      VIP Müşteri
                    </label>
                    <p className="text-xs text-gray-600">Özel ilgi gerektiren VIP müşteri</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="marketingConsent"
                  checked={formData.marketingConsent}
                  onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                  className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="marketingConsent" className="text-sm text-gray-700">
                  Ticari elektronik ileti almayı kabul ediyorum.
                </label>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-medium text-red-900">KVKK Bilgilendirmesi</span>
              </div>
              <p className="text-sm text-red-700 mb-3">
                Kişisel verilerin işlenmesi için açık rıza alınması gerekmektedir. Lead'e ait bilgiler KVKK kapsamında işlenecektir.
              </p>
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="kvkk-consent"
                  checked={formData.kvkkConsent}
                  onChange={(e) => handleInputChange('kvkkConsent', e.target.checked)}
                  className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="kvkk-consent" className="text-sm text-red-700">
                  Lead'in kişisel verilerinin KVKK kapsamında işleneceğine dair bilgilendirme yapıldı ve açık rıza alındı.
                </label>
              </div>
            </div>
          </form>
        </div>
        
        <div className="border-t border-gray-200 p-3 bg-gray-50 flex-shrink-0">
          <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleCloseWithConfirm}
            className="min-w-[100px] px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <XCircle className="h-4 w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">İptal</span>
          </button>
          <button
            onClick={handleSubmit}
            className="min-w-[120px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
            disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.phone || !formData.country || !formData.treatmentInterest || !formData.source || !formData.kvkkConsent || !hasChanges}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" />
                <span className="whitespace-nowrap">Kaydediliyor...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Kaydet</span>
              </>
            )}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLeadModal;