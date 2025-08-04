import React, { useState, useEffect } from 'react';
import { useModalBodyScroll } from '../../hooks/useModalBodyScroll';
import { 
  X, 
  XCircle, 
  DollarSign, 
  Plus, 
  Trash2, 
  Save, 
  Loader2,
  AlertTriangle,
  Info,
  Calculator,
  FileText,
  Percent,
  Euro,
  Edit,
  Copy,
  Phone,
  Mail,
  Globe,
  Calendar,
  Clock,
  Hash
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getLeadById } from '../../services/leadService';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  currency: string;
}

interface OfferEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: any;
  onOfferUpdated?: () => void;
  onPreview?: (draftOffer: any) => void;
  userPermissions?: {
    canEdit?: boolean;
    canUploadTemplate?: boolean;
    canChangeStatus?: boolean;
  };
}

const OfferEditModal: React.FC<OfferEditModalProps> = ({ 
  isOpen, 
  onClose, 
  offer,
  onOfferUpdated,
  onPreview,
  userPermissions = {}
}) => {
  const { user } = useAuth();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    leadName: '',
    leadId: '',
    leadPhone: '',
    leadEmail: '',
    leadLanguage: '',
    offerNumber: '',
    currency: 'EUR',
    notes: '',
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'Gönderildi',
    discountType: 'none',
    discountValue: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState<any>(null);
  const [isLoadingLeadData, setIsLoadingLeadData] = useState(false);
  const [templateFile, setTemplateFile] = useState<File | null>(null);

  // Modal açıkken body scroll'unu kapat
  useModalBodyScroll(isOpen);

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

  // Offer verilerini form'a yükle
  useEffect(() => {
    if (offer) {
      console.log('Loading offer data into form:', offer);
      
      // Lead bilgilerini localStorage'dan çek
      const loadLeadData = async () => {
        const leadId = offer.leadId || offer.patientId || '';
        
        setIsLoadingLeadData(true);
        
        try {
          if (!leadId) {
            console.warn('Lead ID bulunamadı:', offer);
            setError('Bu teklif için lead bilgisi bulunamadı');
            setIsLoadingLeadData(false);
            return;
          }
          
          console.log('Fetching lead data for ID:', leadId);
          
          // getLeadById servisini kullan
          const leadResult = await getLeadById(leadId);
          
          if (leadResult.success && leadResult.data) {
            const leadData = leadResult.data;
            console.log('Lead data successfully fetched:', leadData);
            
            // Lead bilgilerini form'a aktar
            const leadName = `${leadData.first_name || ''} ${leadData.last_name || ''}`.trim();
            const leadPhone = leadData.phone || '';
            const leadEmail = leadData.email || '';
            const leadLanguage = leadData.language || '';
            
            // Form verilerini güncelle
            const initialFormData = {
              title: offer.title || '',
              leadName: leadName,
              leadId: leadData.lead_id || leadData.id || leadId,
              leadPhone: leadPhone,
              leadEmail: leadEmail,
              leadLanguage: leadLanguage,
              offerNumber: offer.offerId || offer.id || '',
              currency: offer.currency || 'EUR',
              notes: offer.notes || '',
              validUntil: offer.validUntil || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: offer.status || 'Gönderildi',
              discountType: 'none',
              discountValue: 0
            };
            
            console.log('Setting form data with lead info:', initialFormData);
            setFormData(initialFormData);
            setOriginalData(initialFormData);
            
          } else {
            console.error('Lead data fetch failed:', leadResult.error);
            
            // Lead bilgisi bulunamazsa, mevcut offer bilgilerini kullan
            const fallbackFormData = {
              title: offer.title || '',
              leadName: offer.leadName || offer.patientName || 'Bilinmeyen Hasta',
              leadId: leadId,
              leadPhone: offer.leadContact?.phone || 'Belirtilmemiş',
              leadEmail: offer.leadContact?.email || 'Belirtilmemiş',
              leadLanguage: 'Belirtilmemiş',
              offerNumber: offer.offerId || offer.id || '',
              currency: offer.currency || 'EUR',
              notes: offer.notes || '',
              validUntil: offer.validUntil || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: offer.status || 'Gönderildi',
              discountType: 'none',
              discountValue: 0
            };
            
            console.log('Using fallback form data:', fallbackFormData);
            setFormData(fallbackFormData);
            setOriginalData(fallbackFormData);
            setError(`Lead bilgileri bulunamadı (${leadResult.error}), mevcut bilgiler kullanılıyor`);
          }
          
        } catch (error) {
          console.error('Error loading lead data:', error);
          setError('Lead bilgileri yüklenirken bir hata oluştu');
          
          // Hata durumunda fallback veriler
          const errorFormData = {
            title: offer.title || '',
            leadName: offer.leadName || offer.patientName || 'Hata: Yüklenemedi',
            leadId: leadId,
            leadPhone: 'Hata: Yüklenemedi',
            leadEmail: 'Hata: Yüklenemedi',
            leadLanguage: 'Hata: Yüklenemedi',
            offerNumber: offer.offerId || offer.id || '',
            currency: offer.currency || 'EUR',
            notes: offer.notes || '',
            validUntil: offer.validUntil || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: offer.status || 'Gönderildi',
            discountType: 'none',
            discountValue: 0
          };
          
          setFormData(errorFormData);
          setOriginalData(errorFormData);
        } finally {
          setIsLoadingLeadData(false);
        }
      };
      
      // Hizmetleri yükle
      if (offer.services && Array.isArray(offer.services)) {
        const loadedServices = offer.services.map((service: any, index: number) => ({
          id: `service_${index + 1}`,
          name: service.name || '',
          description: service.description || '',
          quantity: service.quantity || 1,
          unitPrice: service.amount || service.price || 0,
          totalPrice: (service.quantity || 1) * (service.amount || service.price || 0),
          currency: service.currency || offer.currency || 'EUR'
        }));
        
        setServices(loadedServices);
      }
      
      // Lead verilerini yükle
      loadLeadData();
      
      setHasChanges(false);
      setError(null);
    }
  }, [offer]);

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

  // Form değişikliklerini izleme
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Değişiklik olup olmadığını kontrol et
      const hasAnyChange = originalData ? Object.keys(newData).some(key => 
        newData[key] !== originalData[key]
      ) : true;
      
      setHasChanges(hasAnyChange);
      return newData;
    });
  };

  // Yeni hizmet ekleme
  const addService = () => {
    const newService: ServiceItem = {
      id: `service_${Date.now()}`,
      name: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      totalPrice: 0,
      currency: formData.currency
    };
    
    setServices(prev => [...prev, newService]);
    setHasChanges(true);
  };

  // Hizmet kaldırma
  const removeService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
    setHasChanges(true);
  };

  // Hizmet güncelleme
  const updateService = (id: string, field: string, value: any) => {
    setServices(prev => prev.map(service => {
      if (service.id === id) {
        const updated = { ...service, [field]: value };
        
        // Miktar veya birim fiyat değişirse toplam fiyatı güncelle
        if (field === 'quantity' || field === 'unitPrice') {
          updated.totalPrice = updated.quantity * updated.unitPrice;
        }
        
        return updated;
      }
      return service;
    }));
    setHasChanges(true);
  };

  // Toplam hesaplama
  const calculateTotals = () => {
    const subtotal = services.reduce((sum, service) => sum + service.totalPrice, 0);
    
    let discount = 0;
    if (formData.discountType === 'percentage') {
      discount = (subtotal * formData.discountValue) / 100;
    } else if (formData.discountType === 'fixed') {
      discount = formData.discountValue;
    }
    
    const total = subtotal - discount;
    
    return { subtotal, discount, total };
  };

  // Para birimi sembolü
  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'EUR': return '€';
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'TRY': return '₺';
      default: return currency;
    }
  };

  // Şablon dosyası yükleme
  const handleTemplateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Dosya boyutu kontrolü (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Dosya boyutu 5MB\'ı geçemez');
        return;
      }
      
      // Dosya tipi kontrolü
      const allowedTypes = ['text/html', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setError('Sadece HTML ve PDF dosyaları desteklenir');
        return;
      }
      
      setTemplateFile(file);
      setHasChanges(true);
    }
  };

  // Form gönderme
  const handleSubmit = async () => {
    // Validasyon
    if (!formData.title.trim()) {
      setError('Teklif başlığı gereklidir');
      return;
    }

    if (services.length === 0) {
      setError('En az bir hizmet eklemelisiniz');
      return;
    }

    // Boş hizmet kontrolü
    const hasEmptyServices = services.some(service => 
      !service.name.trim() || service.unitPrice <= 0
    );
    if (hasEmptyServices) {
      setError('Tüm hizmetlerin adı ve tutarı doldurulmalıdır');
      return;
    }

    // Geçerlilik tarihi kontrolü
    const validDate = new Date(formData.validUntil);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (validDate < today) {
      setError('Geçerlilik tarihi bugünden eski olamaz');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 2000));

      const totals = calculateTotals();
      
      // Güncellenmiş teklif verisini oluştur
      const updatedOffer = {
        ...offer,
        title: formData.title,
        currency: formData.currency,
        services: services,
        subtotal: totals.subtotal,
        discount: totals.discount,
        totalAmount: totals.total,
        validUntil: formData.validUntil,
        status: formData.status,
        notes: formData.notes,
        discountType: formData.discountType,
        discountValue: formData.discountValue,
        templateFile: templateFile?.name,
        updatedBy: user?.name,
        updatedAt: new Date().toISOString()
      };

      console.log('Teklif güncellendi:', updatedOffer);

      if (onOfferUpdated) {
        onOfferUpdated();
      }

      setHasChanges(false);
      onClose();
    } catch (err) {
      console.error('Teklif güncelleme hatası:', err);
      setError('Teklif güncellenirken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Önizleme
  const handlePreview = () => {
    const totals = calculateTotals();
    
    const draftOffer = {
      ...offer,
      title: formData.title,
      currency: formData.currency,
      services: services,
      totalAmount: totals.total,
      validUntil: formData.validUntil,
      status: formData.status,
      notes: formData.notes
    };

    if (onPreview) {
      onPreview(draftOffer);
    }
  };

  if (!isOpen) return null;

  const totals = calculateTotals();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] transition-opacity duration-300" 
      onClick={handleBackdropClick}
      style={{ margin: 0, padding: 0, top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full flex flex-col max-h-[90vh]" 
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
                <h2 className="text-xl font-bold">Teklif Düzenle</h2>
                <div className="text-blue-100 text-sm">
                  {formData.offerNumber || 'Teklif düzenleme'}
                </div>
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

        {/* Content */}
        <div className="overflow-y-auto flex-grow p-6">
          <div className="space-y-6">
            {/* Lead (Hasta) Bilgileri */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Lead (Hasta) Bilgileri</h4>
                {isLoadingLeadData && (
                  <div className="flex items-center space-x-2 ml-auto">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-xs text-blue-700">Hasta bilgileri yükleniyor...</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Hasta Adı ve Soyadı
                  </label>
                  <div className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium">
                    {formData.leadName || 'Yükleniyor...'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Lead ID
                  </label>
                  <div className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium">
                    {formData.leadId || 'Yükleniyor...'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Teklif ID
                  </label>
                  <div className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium">
                    {formData.offerNumber || 'Otomatik oluşturulacak'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Telefon Numarası
                  </label>
                  <div className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>{formData.leadPhone || 'Belirtilmemiş'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    E-posta Adresi
                  </label>
                  <div className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="truncate">{formData.leadEmail || 'Belirtilmemiş'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-2">
                    Lead Dili
                  </label>
                  <div className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <span>{formData.leadLanguage || 'Belirtilmemiş'}</span>
                  </div>
                </div>
              </div>
              
              {/* Debug bilgisi (geliştirme aşamasında) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-3 p-2 bg-gray-100 rounded text-xs text-gray-600">
                  Debug: leadName: "{formData.leadName}", offerNumber: "{formData.offerNumber}"
                </div>
              )}
            </div>

            {/* Teklif Genel Bilgileri */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="h-5 w-5 text-gray-600" />
                <h4 className="font-medium text-gray-900">Teklif Bilgileri</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teklif Başlığı *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Teklif başlığı"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoadingLeadData}
                    required
                  />
                  {!formData.title && !isLoadingLeadData && (
                    <p className="text-xs text-red-600 mt-1">Teklif başlığı gereklidir</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ana Para Birimi
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoadingLeadData}
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="TRY">TRY (₺)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Geçerlilik Tarihi *
                  </label>
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => handleInputChange('validUntil', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoadingLeadData}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teklif Durumu
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoadingLeadData || !userPermissions.canChangeStatus}
                  >
                    <option value="Gönderildi">Gönderildi</option>
                    <option value="Kabul Edildi">Kabul Edildi</option>
                    <option value="Müzakere">Müzakere</option>
                    <option value="Reddedildi">Reddedildi</option>
                    <option value="Süresi Doldu">Süresi Doldu</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Hizmetler */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">Hizmetler ve Fiyatlandırma</h4>
                <button
                  onClick={addService}
                  disabled={isLoadingLeadData}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                >
                  <Plus className="h-4 w-4" />
                  <span>Hizmet Ekle</span>
                </button>
              </div>

              {services.length === 0 ? (
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz hizmet eklenmedi</h3>
                  <p className="text-gray-600 mb-4">Yukarıdaki "Hizmet Ekle" butonunu kullanarak hizmet ekleyin</p>
                  <button
                    onClick={addService}
                    disabled={isLoadingLeadData}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                  >
                    İlk Hizmeti Ekle
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {services.map((service, index) => (
                    <div key={service.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <h5 className="font-medium text-gray-900">Hizmet #{index + 1}</h5>
                        <button
                          onClick={() => removeService(service.id)}
                          disabled={isLoadingLeadData}
                          className="text-red-600 hover:text-red-700 p-1 disabled:text-gray-400"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Hizmet Adı *
                          </label>
                          <input
                            type="text"
                            value={service.name}
                            onChange={(e) => updateService(service.id, 'name', e.target.value)}
                            placeholder="Örn: Kalp Cerrahisi"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={isLoadingLeadData}
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Açıklama
                          </label>
                          <input
                            type="text"
                            value={service.description}
                            onChange={(e) => updateService(service.id, 'description', e.target.value)}
                            placeholder="Hizmet detayları..."
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={isLoadingLeadData}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Miktar *
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={service.quantity}
                            onChange={(e) => updateService(service.id, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={isLoadingLeadData}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Birim Fiyat *
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={service.unitPrice}
                            onChange={(e) => updateService(service.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={isLoadingLeadData}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Para Birimi
                          </label>
                          <select
                            value={service.currency}
                            onChange={(e) => updateService(service.id, 'currency', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            disabled={isLoadingLeadData}
                          >
                            <option value="EUR">EUR (€)</option>
                            <option value="USD">USD ($)</option>
                            <option value="GBP">GBP (£)</option>
                            <option value="TRY">TRY (₺)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Toplam
                          </label>
                          <div className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-900 font-semibold">
                            {getCurrencySymbol(service.currency)}{service.totalPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* İndirim ve Toplam */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* İndirim Ayarları */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-3">İndirim Ayarları</h4>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <label className={`flex flex-col items-center p-2 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.discountType === 'none' ? 'border-yellow-500 bg-yellow-100' : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name="discountType"
                      value="none"
                      checked={formData.discountType === 'none'}
                      onChange={(e) => handleInputChange('discountType', e.target.value)}
                      className="mb-1"
                      disabled={isLoadingLeadData}
                    />
                    <span className="text-xs font-medium">İndirim Yok</span>
                  </label>
                  
                  <label className={`flex flex-col items-center p-2 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.discountType === 'percentage' ? 'border-yellow-500 bg-yellow-100' : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name="discountType"
                      value="percentage"
                      checked={formData.discountType === 'percentage'}
                      onChange={(e) => handleInputChange('discountType', e.target.value)}
                      className="mb-1"
                      disabled={isLoadingLeadData}
                    />
                    <Percent className="h-3 w-3 mb-1" />
                    <span className="text-xs font-medium">Yüzde</span>
                  </label>
                  
                  <label className={`flex flex-col items-center p-2 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.discountType === 'fixed' ? 'border-yellow-500 bg-yellow-100' : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name="discountType"
                      value="fixed"
                      checked={formData.discountType === 'fixed'}
                      onChange={(e) => handleInputChange('discountType', e.target.value)}
                      className="mb-1"
                      disabled={isLoadingLeadData}
                    />
                    <Euro className="h-3 w-3 mb-1" />
                    <span className="text-xs font-medium">Sabit</span>
                  </label>
                </div>
                
                {formData.discountType !== 'none' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      İndirim Miktarı
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.discountValue}
                        onChange={(e) => handleInputChange('discountValue', parseFloat(e.target.value) || 0)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isLoadingLeadData}
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {formData.discountType === 'percentage' ? '%' : getCurrencySymbol(formData.currency)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Fiyat Özeti */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-4 flex items-center space-x-2">
                  <Calculator className="h-4 w-4" />
                  <span>Fiyat Özeti</span>
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-blue-800">Ara Toplam:</span>
                    <span className="text-sm font-medium text-blue-900">
                      {getCurrencySymbol(formData.currency)}{totals.subtotal.toLocaleString()}
                    </span>
                  </div>
                  
                  {totals.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-800">
                        İndirim ({formData.discountType === 'percentage' ? `%${formData.discountValue}` : 'Sabit'}):
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        -{getCurrencySymbol(formData.currency)}{totals.discount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  <div className="border-t border-blue-300 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-blue-900">Net Toplam:</span>
                      <span className="text-xl font-bold text-blue-900">
                        {getCurrencySymbol(formData.currency)}{totals.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Şablon Yükleme */}
            {userPermissions.canUploadTemplate && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-4">PDF veya HTML Şablon Dosyası</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Şablon Dosyası Yükle
                    </label>
                    <input
                      type="file"
                      accept=".html,.htm,.pdf"
                      onChange={handleTemplateUpload}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isLoadingLeadData}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Desteklenen formatlar: PDF, HTML • Maksimum dosya boyutu: 5MB
                    </p>
                  </div>
                  
                  {templateFile && (
                    <div className="bg-white p-3 rounded border border-purple-300">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-800">{templateFile.name}</span>
                        <span className="text-xs text-purple-600">
                          ({(templateFile.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Ek Notlar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ek Notlar ve Koşullar
              </label>
              <textarea
                rows={4}
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Teklif hakkında ek notlar..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoadingLeadData}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {services.length} hizmet • Toplam: {getCurrencySymbol(formData.currency)}{totals.total.toLocaleString()}
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleCloseWithConfirm}
                disabled={isSubmitting}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2 disabled:bg-gray-100"
              >
                <XCircle className="h-4 w-4" />
                <span>İptal</span>
              </button>
              
              {onPreview && (
                <button
                  onClick={handlePreview}
                  disabled={isSubmitting || isLoadingLeadData || !formData.title.trim() || services.length === 0}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FileText className="h-4 w-4" />
                  )}
                  <span>Önizle</span>
                </button>
              )}
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || isLoadingLeadData || !formData.title.trim() || services.length === 0 || !hasChanges}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Kaydet</span>
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

export default OfferEditModal;