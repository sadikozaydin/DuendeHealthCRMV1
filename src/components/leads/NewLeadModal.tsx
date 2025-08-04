import React, { useState, useEffect } from 'react';
import { useModalBodyScroll } from '../../hooks/useModalBodyScroll';
import { 
  X, 
  XCircle, 
  UserPlus, 
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
  Star
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useBranch } from '../../contexts/BranchContext';
import { addLead } from '../../services/leadService';

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadAdded?: () => void;
}

const NewLeadModal: React.FC<NewLeadModalProps> = ({ isOpen, onClose, onLeadAdded }) => {
  const { user } = useAuth();
  const { currentBranch } = useBranch();
  
  // Modal açıkken body scroll'unu kapat
  useModalBodyScroll(isOpen);
  
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
    kvkkConsent: false,
    marketingConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ESC tuşu ile kapatma fonksiyonu
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Submitting lead form with data:', formData);
    console.log('Submitting lead form with data:', formData);
    try {
      setIsSubmitting(true);
      setError(null);
      
      // Create new lead object
      const leadData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        treatmentInterest: formData.treatmentInterest,
        source: formData.source,
        sourceDetails: formData.sourceDetails,
        notes: formData.notes,
        tags: [
          formData.priority, 
          ...(formData.isUrgent ? ['Acil'] : []), 
          ...(formData.isVIP ? ['VIP'] : [])
        ],
        priority: formData.priority,
        branchId: currentBranch?.id || null,
        createdBy: user?.id || null,
      };

      // Call the API to save the lead
      const result = await addLead(leadData);
      console.log('Lead add result:', result);
      
      // Başarılı yanıt kontrolü
      if (result.success === false) {
        throw new Error(result.error || 'Lead eklenirken bir hata oluştu');
      }
      
      // Yeni lead'i leads listesine ekle
      if (result.data) {
        // Yeni lead'i doğrudan leads state'ine ekle
        window.dispatchEvent(new CustomEvent('newLeadAdded', { 
          detail: { lead: result.data }
        }));
      }

      // Başarılı yanıt kontrolü
      if (result.success === false) {
        throw new Error(result.error || 'Lead eklenirken bir hata oluştu');
      }
      
      // Reset form and close modal
      setFormData({
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
        kvkkConsent: false,
        marketingConsent: false
      });
      
      if (onLeadAdded) {
        onLeadAdded();
        console.log('onLeadAdded callback called');
      }
      
      onClose();
    } catch (err) {
      console.error('Lead ekleme hatası:', err);
      setError('Lead eklenirken bir hata oluştu. Lütfen tüm zorunlu alanları doldurduğunuzdan emin olun.');
    } finally {
      setIsSubmitting(false);
      console.log('Form submission completed');
    }
  };

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
                <UserPlus className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Yeni Lead Ekle</h2>
                <div className="text-blue-100 text-sm">Potansiyel hasta kaydı oluştur</div>
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

        {/* Form */}
        <div className="overflow-y-auto flex-grow p-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Akıllı Lead Önceliklendirme ve Atama Sistemi</h4>
                  <p className="text-sm text-blue-700">
                    Yeni bir potansiyel hasta kaydı oluşturuyorsunuz. Lead kaydedildiğinde, sistem otomatik olarak öncelik belirleyecek ve en uygun satış temsilcisine atama yapacaktır. Öncelik ve atama, geliş kanalı, tedavi türü, aciliyet ve diğer faktörlere göre belirlenir.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Hızlı Şablon Seçimi */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Zap className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900 mb-3">🚀 Hızlı Şablon Seçimi</h4>
                  <p className="text-sm text-purple-700 mb-3">
                    Test için hazır platform şablonlarından birini seçebilirsiniz:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          firstName: 'Maria',
                          lastName: 'Facebook',
                          email: 'maria.facebook@example.com',
                          phone: '+34 612 345 678',
                          country: 'İspanya',
                          city: 'Madrid',
                          treatmentInterest: 'Plastik Cerrahi',
                          source: 'meta',
                          sourceDetails: 'Facebook/Instagram Ads',
                          priority: 'high',
                          notes: 'Meta reklamından gelen potansiyel hasta.'
                        });
                      }}
                      className="flex items-center justify-center space-x-1 bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-2 rounded text-xs transition-colors"
                    >
                      <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">f</div>
                      <span>Meta</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          firstName: 'Ahmed',
                          lastName: 'Google',
                          email: 'ahmed.google@example.com',
                          phone: '+971 50 123 4567',
                          country: 'BAE',
                          city: 'Dubai',
                          treatmentInterest: 'Kalp Cerrahisi',
                          source: 'google',
                          sourceDetails: 'Google Search Ads',
                          priority: 'high',
                          notes: 'Google Ads üzerinden gelen lead.'
                        });
                      }}
                      className="flex items-center justify-center space-x-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-2 py-2 rounded text-xs transition-colors"
                    >
                      <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">G</div>
                      <span>Google</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          ...formData,
                          firstName: 'Sarah',
                          lastName: 'TikTok',
                          email: 'sarah.tiktok@example.com',
                          phone: '+44 7700 900123',
                          country: 'İngiltere',
                          city: 'Londra',
                          treatmentInterest: 'Saç Ekimi',
                          source: 'tiktok',
                          sourceDetails: 'TikTok Video Ads',
                          priority: 'medium',
                          notes: 'TikTok reklamından gelen genç hasta.'
                        });
                      }}
                      className="flex items-center justify-center space-x-1 bg-pink-100 hover:bg-pink-200 text-pink-800 px-2 py-2 rounded text-xs transition-colors"
                    >
                      <div className="w-4 h-4 bg-black rounded flex items-center justify-center text-white text-xs font-bold">T</div>
                      <span>TikTok</span>
                    </button>
                  </div>
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
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, treatmentInterest: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, source: e.target.value, priority: e.target.value === 'whatsapp' || e.target.value === 'call_center' || e.target.value === 'chat' ? 'high' : formData.priority })}
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
                {formData.source && (
                  <p className="text-xs mt-1 text-gray-500">
                    {formData.source === 'whatsapp' || formData.source === 'call_center' || formData.source === 'chat' 
                      ? '🔴 Yüksek öncelikli kanal - Hızlı yanıt gerektirir' 
                      : formData.source === 'website' || formData.source === 'email' || formData.source === 'referral' || formData.source === 'partner'
                      ? '🟡 Orta öncelikli kanal' 
                      : '🟢 Düşük öncelikli kanal'}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kaynak Detayı
                </label>
                <input
                  type="text"
                  value={formData.sourceDetails}
                  onChange={(e) => setFormData({ ...formData, sourceDetails: e.target.value })}
                  placeholder="Örn: Instagram kampanya adı, referans veren kişi..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notlar
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Lead hakkında ek bilgiler..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Akıllı Önceliklendirme ve Atama Sistemi
                </label>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Gelişmiş Önceliklendirme ve Atama Algoritması</span>
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Lead kaydedildiğinde, sistem aşağıdaki kriterlere göre öncelik belirleyecek ve otomatik atama yapacaktır:
                  </p>
                  <ul className="text-xs text-blue-700 mt-2 space-y-1 pl-5 list-disc">
                    <li><strong>Öncelik Belirleme:</strong></li>
                    <ul className="pl-5 space-y-1 mt-1">
                      <li>• <strong>Geliş Kanalı:</strong> WhatsApp, çağrı ve chat yüksek öncelikli</li>
                      <li>• <strong>Tedavi Türü:</strong> Kritik tedaviler (kalp, onkoloji) daha yüksek öncelikli</li>
                      <li>• <strong>Etiketler:</strong> VIP, Acil gibi etiketler önceliği artırır</li>
                      <li>• <strong>Yanıt Süresi:</strong> Uzun süre yanıt bekleyen lead'ler öne çıkar</li>
                    </ul>
                    <li><strong>Atama Algoritması:</strong></li>
                    <ul className="pl-5 space-y-1 mt-1">
                      <li>• <strong>1. Öncelik:</strong> Tedavi alanı VE dil yetkinliği tam eşleşen temsilciler</li>
                      <li>• <strong>2. Öncelik:</strong> Tedavi alanında uzmanlaşmış temsilciler</li>
                      <li>• <strong>3. Öncelik:</strong> Lead'in dilini bilen temsilciler</li>
                      <li>• <strong>4. Öncelik:</strong> Benzer dil grubunda yetkin temsilciler</li>
                      <li>• <strong>5. Öncelik:</strong> Lead önceliğine göre en uygun temsilci</li>
                    </ul>
                  </ul>
                  <p className="text-xs text-blue-700 mt-2">
                    <strong>Not:</strong> Sistem her zaman bir temsilci ataması yapar. Uygun eşleşme bulunamazsa, en yakın alternatif otomatik olarak seçilir.
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="bg-red-100 p-2 rounded-lg text-center">
                      <div className="text-xs font-medium text-red-800">Yüksek Öncelik</div>
                      <div className="text-xs text-red-700 mt-1">En iyi dönüşüm oranına sahip temsilciye atanır</div>
                    </div>
                    <div className="bg-yellow-100 p-2 rounded-lg text-center">
                      <div className="text-xs font-medium text-yellow-800">Orta Öncelik</div>
                      <div className="text-xs text-yellow-700 mt-1">En hızlı yanıt veren temsilciye atanır</div>
                    </div>
                    <div className="bg-green-100 p-2 rounded-lg text-center">
                      <div className="text-xs font-medium text-green-800">Düşük Öncelik</div>
                      <div className="text-xs text-green-700 mt-1">En az iş yüküne sahip temsilciye atanır</div>
                    </div>
                  </div>
                </div>
              </div>
              
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
                      onChange={() => setFormData({ ...formData, priority: 'high' })}
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
                      onChange={() => setFormData({ ...formData, priority: 'medium' })}
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
                      onChange={() => setFormData({ ...formData, priority: 'low' })}
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
                    onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked, priority: e.target.checked ? 'high' : formData.priority })}
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
                    onChange={(e) => setFormData({ ...formData, isVIP: e.target.checked })}
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
                  onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
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
                  onChange={(e) => setFormData({ ...formData, kvkkConsent: e.target.checked })}
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
              onClick={onClose}
              className="min-w-[100px] px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            >
              <XCircle className="h-4 w-4 flex-shrink-0" />
              <span className="whitespace-nowrap">İptal</span>
            </button>
            <button
              onClick={handleSubmit}
              className="min-w-[120px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center justify-center space-x-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.phone || !formData.country || !formData.treatmentInterest || !formData.source || !formData.kvkkConsent}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span className="whitespace-nowrap">Ekleniyor...</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">Lead Ekle</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLeadModal;