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
  Zap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  currency: string;
}

interface OfferCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: any;
  onOfferCreated?: () => void;
}

const OfferCreationModal: React.FC<OfferCreationModalProps> = ({ 
  isOpen, 
  onClose, 
  lead,
  onOfferCreated 
}) => {
  const { user } = useAuth();
  
  // Modal açıkken body scroll'unu kapat
  useModalBodyScroll(isOpen);
  
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [offerData, setOfferData] = useState({
    title: '',
    description: '',
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 gün sonra
    currency: 'EUR',
    discountType: 'none',
    discountValue: 0,
    notes: '',
    paymentTerms: 'full_advance',
    installmentCount: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Teklif şablonları
  const offerTemplates = [
    {
      id: 'cardiac',
      name: 'Kalp Cerrahisi',
      description: 'Cerrahi + Konaklama + Transfer',
      icon: '❤️',
      color: 'from-red-500 to-red-600',
      services: [
        {
          name: 'Kalp Cerrahisi',
          description: 'Bypass ameliyatı, yoğun bakım dahil',
          quantity: 1,
          unitPrice: 25000,
          currency: 'EUR'
        },
        {
          name: 'Hastane Konaklaması',
          description: '7 gece medikal otel',
          quantity: 7,
          unitPrice: 120,
          currency: 'EUR'
        },
        {
          name: 'Havalimanı Transferi',
          description: 'VIP karşılama ve uğurlama',
          quantity: 2,
          unitPrice: 50,
          currency: 'EUR'
        }
      ]
    },
    {
      id: 'plastic',
      name: 'Plastik Cerrahi',
      description: 'Estetik + Otel + Tercüman',
      icon: '✨',
      color: 'from-pink-500 to-pink-600',
      services: [
        {
          name: 'Plastik Cerrahi',
          description: 'Rinoplasti ameliyatı',
          quantity: 1,
          unitPrice: 8000,
          currency: 'EUR'
        },
        {
          name: 'Otel Konaklaması',
          description: '3 gece lüks otel',
          quantity: 3,
          unitPrice: 200,
          currency: 'EUR'
        },
        {
          name: 'Tercümanlık',
          description: 'Tıbbi tercümanlık hizmeti',
          quantity: 8,
          unitPrice: 40,
          currency: 'EUR'
        }
      ]
    },
    {
      id: 'dental',
      name: 'Diş İmplantı',
      description: 'İmplant + Konaklama',
      icon: '🦷',
      color: 'from-blue-500 to-blue-600',
      services: [
        {
          name: 'Diş İmplantı',
          description: 'Tam ağız implant tedavisi',
          quantity: 12,
          unitPrice: 800,
          currency: 'EUR'
        },
        {
          name: 'Konaklama',
          description: '5 gece apart otel',
          quantity: 5,
          unitPrice: 80,
          currency: 'EUR'
        }
      ]
    },
    {
      id: 'orthopedic',
      name: 'Ortopedi',
      description: 'Cerrahi + Fizyoterapi + Otel',
      icon: '🦴',
      color: 'from-green-500 to-green-600',
      services: [
        {
          name: 'Ortopedik Cerrahi',
          description: 'Diz/kalça protezi ameliyatı',
          quantity: 1,
          unitPrice: 15000,
          currency: 'EUR'
        },
        {
          name: 'Fizyoterapi',
          description: '10 seans rehabilitasyon',
          quantity: 10,
          unitPrice: 80,
          currency: 'EUR'
        },
        {
          name: 'Otel Konaklaması',
          description: '12 gece medikal otel',
          quantity: 12,
          unitPrice: 150,
          currency: 'EUR'
        }
      ]
    },
    {
      id: 'checkup',
      name: 'Check-up',
      description: 'Kapsamlı Sağlık Kontrolü',
      icon: '🩺',
      color: 'from-purple-500 to-purple-600',
      services: [
        {
          name: 'Kapsamlı Check-up',
          description: 'Tüm vücut taraması ve testler',
          quantity: 1,
          unitPrice: 1500,
          currency: 'EUR'
        },
        {
          name: 'Otel Konaklaması',
          description: '2 gece otel',
          quantity: 2,
          unitPrice: 150,
          currency: 'EUR'
        },
        {
          name: 'Transfer',
          description: 'Havalimanı-otel-hastane',
          quantity: 1,
          unitPrice: 100,
          currency: 'EUR'
        }
      ]
    },
    {
      id: 'hair_transplant',
      name: 'Saç Ekimi',
      description: 'FUE + Otel + Transfer',
      icon: '💇‍♂️',
      color: 'from-amber-500 to-amber-600',
      services: [
        {
          name: 'Saç Ekimi (FUE)',
          description: '4000 greft saç ekimi',
          quantity: 1,
          unitPrice: 3500,
          currency: 'EUR'
        },
        {
          name: 'Otel Konaklaması',
          description: '3 gece otel + özel bakım',
          quantity: 3,
          unitPrice: 120,
          currency: 'EUR'
        },
        {
          name: 'Transfer',
          description: 'Havalimanı ve klinik transferi',
          quantity: 2,
          unitPrice: 40,
          currency: 'EUR'
        }
      ]
    }
  ];

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Modal dışına tıklayarak kapatma
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
      currency: offerData.currency
    };
    
    setServices(prev => [...prev, newService]);
  };

  // Hizmet kaldırma
  const removeService = (id: string) => {
    setServices(prev => prev.filter(service => service.id !== id));
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
  };

  // Toplam hesaplama
  const calculateTotals = () => {
    const subtotal = services.reduce((sum, service) => sum + service.totalPrice, 0);
    
    let discount = 0;
    if (offerData.discountType === 'percentage') {
      discount = (subtotal * offerData.discountValue) / 100;
    } else if (offerData.discountType === 'fixed') {
      discount = offerData.discountValue;
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

  // Şablon yükleme
  const loadTemplate = (templateId: string) => {
    const template = offerTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    // Şablon hizmetlerini yükle
    const templateServices = template.services.map((service, index) => ({
      id: `${templateId}_${index + 1}`,
      name: service.name,
      description: service.description,
      quantity: service.quantity,
      unitPrice: service.unitPrice,
      totalPrice: service.quantity * service.unitPrice,
      currency: service.currency
    }));
    
    setServices(templateServices);
    setOfferData(prev => ({
      ...prev,
      title: `${template.name} Paketi`,
      description: `${template.description} tedavi paketi`,
      currency: template.services[0]?.currency || 'EUR'
    }));
  };

  // Form gönderme
  const handleSubmit = async () => {
    if (services.length === 0) {
      setError('En az bir hizmet eklemelisiniz');
      return;
    }

    if (!offerData.title.trim()) {
      setError('Teklif başlığı gereklidir');
      return;
    }

    // Boş hizmet kontrolü
    const hasEmptyServices = services.some(service => !service.name.trim() || service.unitPrice <= 0);
    if (hasEmptyServices) {
      setError('Tüm hizmetlerin adı ve fiyatı doldurulmalıdır');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 2000));

      const totals = calculateTotals();
      
      // Teklif verisini oluştur
      const offerPayload = {
        leadId: lead.id,
        leadName: `${lead.first_name} ${lead.last_name}`,
        title: offerData.title,
        description: offerData.description,
        services: services,
        subtotal: totals.subtotal,
        discount: totals.discount,
        total: totals.total,
        currency: offerData.currency,
        validUntil: offerData.validUntil,
        paymentTerms: offerData.paymentTerms,
        installmentCount: offerData.installmentCount,
        notes: offerData.notes,
        createdBy: user?.name,
        createdAt: new Date().toISOString()
      };

      console.log('Teklif oluşturuldu:', offerPayload);

      // LocalStorage'a kaydet (demo için)
      const existingOffers = JSON.parse(localStorage.getItem('lead_offers') || '[]');
      existingOffers.push({
        id: `offer_${Date.now()}`,
        ...offerPayload
      });
      localStorage.setItem('lead_offers', JSON.stringify(existingOffers));

      if (onOfferCreated) {
        onOfferCreated();
      }

      onClose();
    } catch (err) {
      console.error('Teklif oluşturma hatası:', err);
      setError('Teklif oluşturulurken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
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
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Teklif Oluştur</h2>
                <div className="text-blue-100 text-sm">
                  {lead?.first_name} {lead?.last_name} için özel teklif
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
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
            {/* Teklif Genel Bilgileri */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Teklif Bilgileri</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teklif Başlığı *
                  </label>
                  <input
                    type="text"
                    value={offerData.title}
                    onChange={(e) => setOfferData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Örn: Kalp Cerrahisi Tedavi Paketi"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ana Para Birimi
                  </label>
                  <select
                    value={offerData.currency}
                    onChange={(e) => setOfferData(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="TRY">TRY (₺)</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teklif Açıklaması
                </label>
                <textarea
                  rows={3}
                  value={offerData.description}
                  onChange={(e) => setOfferData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Teklif hakkında genel açıklama..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Hızlı Şablonlar */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-medium text-green-900 mb-3 flex items-center space-x-2">
                <Zap className="h-5 w-5 text-green-600" />
                <span>Hızlı Şablonlar</span>
              </h4>
              <p className="text-sm text-green-700 mb-4">
                Hazır şablonlardan birini seçerek hızlıca başlayabilirsiniz:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {offerTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template.id)}
                    className={`group relative overflow-hidden p-4 bg-gradient-to-br ${template.color} text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300`}
                  >
                    <div className="absolute top-2 right-2 text-2xl opacity-80 group-hover:opacity-100 transition-opacity">
                      {template.icon}
                    </div>
                    
                    <div className="text-left">
                      <h5 className="font-bold text-lg mb-2">{template.name}</h5>
                      <p className="text-sm opacity-90 mb-3">{template.description}</p>
                      
                      <div className="space-y-1">
                        {template.services.slice(0, 2).map((service, index) => (
                          <div key={index} className="text-xs opacity-80">
                            • {service.name}
                          </div>
                        ))}
                        {template.services.length > 2 && (
                          <div className="text-xs opacity-80">
                            • +{template.services.length - 2} hizmet daha
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-white border-opacity-30">
                        <div className="text-sm font-medium">
                          Tahmini: €{template.services.reduce((sum, s) => sum + (s.quantity * s.unitPrice), 0).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </button>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-white rounded-lg border border-green-300">
                <div className="flex items-center space-x-2 text-sm text-green-800">
                  <Info className="h-4 w-4" />
                  <span>Şablon seçtikten sonra hizmetleri düzenleyebilir, yeni hizmetler ekleyebilirsiniz.</span>
                </div>
              </div>
            </div>

            {/* Hizmetler */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">Hizmetler ve Fiyatlandırma</h4>
                <button
                  onClick={addService}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
                          className="text-red-600 hover:text-red-700 p-1"
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

            {/* İndirim ve Ödeme Koşulları */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* İndirim Ayarları */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-3">İndirim Ayarları</h4>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <label className={`flex flex-col items-center p-2 border-2 rounded-lg cursor-pointer transition-colors ${
                    offerData.discountType === 'none' ? 'border-yellow-500 bg-yellow-100' : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name="discountType"
                      value="none"
                      checked={offerData.discountType === 'none'}
                      onChange={(e) => setOfferData(prev => ({ ...prev, discountType: e.target.value }))}
                      className="mb-1"
                    />
                    <span className="text-xs font-medium">İndirim Yok</span>
                  </label>
                  
                  <label className={`flex flex-col items-center p-2 border-2 rounded-lg cursor-pointer transition-colors ${
                    offerData.discountType === 'percentage' ? 'border-yellow-500 bg-yellow-100' : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name="discountType"
                      value="percentage"
                      checked={offerData.discountType === 'percentage'}
                      onChange={(e) => setOfferData(prev => ({ ...prev, discountType: e.target.value }))}
                      className="mb-1"
                    />
                    <Percent className="h-3 w-3 mb-1" />
                    <span className="text-xs font-medium">Yüzde</span>
                  </label>
                  
                  <label className={`flex flex-col items-center p-2 border-2 rounded-lg cursor-pointer transition-colors ${
                    offerData.discountType === 'fixed' ? 'border-yellow-500 bg-yellow-100' : 'border-gray-200 hover:bg-gray-50'
                  }`}>
                    <input
                      type="radio"
                      name="discountType"
                      value="fixed"
                      checked={offerData.discountType === 'fixed'}
                      onChange={(e) => setOfferData(prev => ({ ...prev, discountType: e.target.value }))}
                      className="mb-1"
                    />
                    <Euro className="h-3 w-3 mb-1" />
                    <span className="text-xs font-medium">Sabit</span>
                  </label>
                </div>
                
                {offerData.discountType !== 'none' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      İndirim Miktarı
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={offerData.discountValue}
                        onChange={(e) => setOfferData(prev => ({ ...prev, discountValue: parseFloat(e.target.value) || 0 }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        {offerData.discountType === 'percentage' ? '%' : getCurrencySymbol(offerData.currency)}
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
                      {getCurrencySymbol(offerData.currency)}{totals.subtotal.toLocaleString()}
                    </span>
                  </div>
                  
                  {totals.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-800">
                        İndirim ({offerData.discountType === 'percentage' ? `%${offerData.discountValue}` : 'Sabit'}):
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        -{getCurrencySymbol(offerData.currency)}{totals.discount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  
                  <div className="border-t border-blue-300 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-blue-900">Net Toplam:</span>
                      <span className="text-xl font-bold text-blue-900">
                        {getCurrencySymbol(offerData.currency)}{totals.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ödeme Koşulları */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-4">Ödeme Koşulları</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ödeme Şekli
                  </label>
                  <select
                    value={offerData.paymentTerms}
                    onChange={(e) => setOfferData(prev => ({ ...prev, paymentTerms: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="full_advance">Tam Peşin (%100)</option>
                    <option value="50_50">%50 Peşin + %50 Tedavi Öncesi</option>
                    <option value="installment">Taksitli Ödeme</option>
                    <option value="after_treatment">Tedavi Sonrası Ödeme</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Geçerlilik Tarihi (Otomatik: 14 gün)
                  </label>
                  <input
                    type="date"
                    value={offerData.validUntil}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-600 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Teklif tarihi itibariyle otomatik olarak 14 gün geçerlidir
                  </p>
                </div>
              </div>

              {offerData.paymentTerms === 'installment' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taksit Sayısı
                  </label>
                  <select
                    value={offerData.installmentCount}
                    onChange={(e) => setOfferData(prev => ({ ...prev, installmentCount: parseInt(e.target.value) }))}
                    className="w-full md:w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={2}>2 Taksit</option>
                    <option value={3}>3 Taksit</option>
                    <option value={4}>4 Taksit</option>
                    <option value={6}>6 Taksit</option>
                    <option value={12}>12 Taksit</option>
                  </select>
                  
                  {totals.total > 0 && (
                    <div className="mt-2 p-3 bg-white rounded border border-purple-300">
                      <span className="text-sm text-purple-800">
                        Taksit tutarı: {getCurrencySymbol(offerData.currency)}{(totals.total / offerData.installmentCount).toLocaleString()} / ay
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Ek Notlar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ek Notlar ve Koşullar
              </label>
              <textarea
                rows={4}
                value={offerData.notes}
                onChange={(e) => setOfferData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Teklif koşulları, özel durumlar, ek bilgiler..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {services.length} hizmet • Toplam: {getCurrencySymbol(offerData.currency)}{totals.total.toLocaleString()}
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <XCircle className="h-4 w-4" />
                <span>İptal</span>
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || services.length === 0 || !offerData.title.trim()}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Oluşturuluyor...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Teklifi Oluştur</span>
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

export default OfferCreationModal;