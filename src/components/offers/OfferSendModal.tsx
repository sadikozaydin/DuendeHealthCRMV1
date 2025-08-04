import React, { useState, useEffect } from 'react';
import { useModalBodyScroll } from '../../hooks/useModalBodyScroll';
import { 
  X, 
  XCircle, 
  Send, 
  Mail, 
  MessageCircle, 
  Link, 
  Download, 
  Eye, 
  Copy, 
  CheckCircle, 
  AlertTriangle, 
  Loader2,
  User,
  Phone,
  Globe,
  FileText,
  Settings,
  Plus,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import OfferSendStatusReport from './OfferSendStatusReport';

interface OfferSendModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: any;
  onSent?: (result: any) => void;
}

const OfferSendModal: React.FC<OfferSendModalProps> = ({ 
  isOpen, 
  onClose, 
  offer,
  onSent 
}) => {
  const { user } = useAuth();
  
  // Modal açıkken body scroll'unu kapat
  useModalBodyScroll(isOpen);
  
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientEmail: '',
    recipientPhone: '',
    channels: {
      email: true,
      whatsapp: false,
      customLink: false,
      downloadPdf: false
    },
    selectedTemplate: 'template1',
    customMessage: '',
    options: {
      attachPdf: true,
      trackViewing: true,
      sendCopyToMe: false
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [sendResult, setSendResult] = useState<any>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    content: ''
  });

  // Mesaj şablonları
  const messageTemplates = [
    {
      id: 'template1',
      name: 'Standart Teklif Mesajı',
      subject: 'Özel Tedavi Teklifiniz - {PATIENT_NAME}',
      content: `Merhaba {PATIENT_NAME},

Sizin için özel olarak hazırladığımız tedavi teklifimizi ekte bulabilirsiniz.

Teklifimiz {VALID_UNTIL} tarihine kadar geçerlidir. Sorularınız için bizimle iletişime geçmekten çekinmeyin.

Saygılarımızla,
Duende Health CRM Ekibi`
    },
    {
      id: 'template2',
      name: 'Acil Teklif Mesajı',
      subject: 'Acil: Özel Tedavi Teklifiniz - {PATIENT_NAME}',
      content: `Sayın {PATIENT_NAME},

Talebiniz doğrultusunda hazırladığımız özel tedavi teklifimizi acilen gönderiyoruz.

Bu teklif {VALID_UNTIL} tarihine kadar geçerlidir. Hızlı karar vermeniz durumunda ek avantajlardan yararlanabilirsiniz.

Detaylı bilgi için: +90 212 XXX XX XX

Saygılarımızla,
Duende Health CRM Ekibi`
    },
    {
      id: 'template3',
      name: 'VIP Müşteri Mesajı',
      subject: 'VIP Tedavi Paketiniz Hazır - {PATIENT_NAME}',
      content: `Değerli {PATIENT_NAME},

VIP müşterimiz olarak sizin için özel olarak tasarladığımız tedavi paketimizi sunuyoruz.

Bu özel teklif {VALID_UNTIL} tarihine kadar geçerlidir ve sadece sizin için hazırlanmıştır.

Kişisel danışmanınız: {CONSULTANT_NAME}
Direkt iletişim: {CONSULTANT_PHONE}

Saygılarımızla,
Duende Health CRM Ekibi`
    }
  ];

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

  // Offer verilerini form'a yükle
  useEffect(() => {
    if (offer) {
      setFormData(prev => ({
        ...prev,
        recipientName: offer.leadName || offer.patientName || '',
        recipientEmail: offer.leadContact?.email || '',
        recipientPhone: offer.leadContact?.phone || '',
        customMessage: getTemplateContent('template1')
      }));
    }
  }, [offer]);

  // Modal dışına tıklayarak kapatma
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Form değişikliklerini izleme
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Kanal seçimi değiştirme
  const handleChannelChange = (channel: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: checked
      }
    }));
  };

  // Seçenek değiştirme
  const handleOptionChange = (option: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [option]: checked
      }
    }));
  };

  // Şablon içeriği getirme
  const getTemplateContent = (templateId: string): string => {
    const template = messageTemplates.find(t => t.id === templateId);
    if (!template) return '';
    
    // Geliştirilmiş placeholder parsing
    let content = template.content;
    content = content.replace(/{(\w+)}/g, (_, key) => {
      switch (key) {
        case 'PATIENT_NAME': return formData.recipientName || '[Hasta Adı]';
        case 'VALID_UNTIL': return offer?.validUntil || '[Geçerlilik Tarihi]';
        case 'CONSULTANT_NAME': return user?.name || '[Danışman Adı]';
        case 'CONSULTANT_PHONE': return '+90 212 XXX XX XX';
        case 'OFFER_TITLE': return offer?.title || '[Teklif Başlığı]';
        case 'OFFER_AMOUNT': return `${getCurrencySymbol(offer?.currency || 'EUR')}${(offer?.totalAmount || 0).toLocaleString()}`;
        case 'COMPANY_NAME': return 'Duende Health CRM';
        default: return `{${key}}`;
      }
    });
    
    return content;
  };

  // Şablon değiştirme
  const handleTemplateChange = (templateId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTemplate: templateId,
      customMessage: getTemplateContent(templateId)
    }));
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

  // Yeni şablon kaydetme
  const handleSaveNewTemplate = () => {
    if (!newTemplate.name.trim() || !newTemplate.content.trim()) {
      setError('Şablon adı ve içeriği gereklidir');
      return;
    }

    const newTemplateData = {
      id: `template_${Date.now()}`,
      name: newTemplate.name,
      subject: newTemplate.subject || `Özel Tedavi Teklifiniz - {PATIENT_NAME}`,
      content: newTemplate.content
    };

    // LocalStorage'a kaydet (gerçek uygulamada API'ye gönderilir)
    const existingTemplates = JSON.parse(localStorage.getItem('custom_message_templates') || '[]');
    existingTemplates.push(newTemplateData);
    localStorage.setItem('custom_message_templates', JSON.stringify(existingTemplates));

    // Yeni şablonu seç
    setFormData(prev => ({
      ...prev,
      selectedTemplate: newTemplateData.id,
      customMessage: getTemplateContent(newTemplateData.id)
    }));

    // Formu temizle
    setNewTemplate({ name: '', subject: '', content: '' });
    setShowTemplateEditor(false);
  };

  // Görüntüleme takibi için UUID oluşturma
  const generateTrackingToken = () => {
    return 'track_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  // Gönderim işlemi
  const handleSend = async () => {
    // Rol bazlı yetki kontrolü
    const allowedRoles = ['super_admin', 'admin', 'manager', 'agent', 'coordinator'];
    if (!user?.role || !allowedRoles.includes(user.role)) {
      setError('Teklif gönderme yetkiniz bulunmamaktadır. Sadece yöneticiler ve satış temsilcileri teklif gönderebilir.');
      return;
    }

    // Validasyon
    if (!formData.recipientName.trim()) {
      setError('Alıcı adı gereklidir');
      return;
    }

    if (!formData.recipientEmail.trim() && !formData.recipientPhone.trim()) {
      setError('En az bir iletişim bilgisi (e-posta veya telefon) gereklidir');
      return;
    }

    // En az bir kanal seçilmeli
    const selectedChannels = Object.values(formData.channels).some(Boolean);
    if (!selectedChannels) {
      setError('En az bir gönderim kanalı seçmelisiniz');
      return;
    }

    // E-posta kanalı seçiliyse e-posta adresi gerekli
    if (formData.channels.email && !formData.recipientEmail.trim()) {
      setError('E-posta kanalı seçili ancak e-posta adresi belirtilmemiş');
      return;
    }

    // WhatsApp kanalı seçiliyse telefon gerekli
    if (formData.channels.whatsapp && !formData.recipientPhone.trim()) {
      setError('WhatsApp kanalı seçili ancak telefon numarası belirtilmemiş');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Simüle edilmiş gönderim işlemi
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Görüntüleme takibi için token oluştur
      const trackingToken = formData.options.trackViewing ? generateTrackingToken() : null;
      const trackingUrl = trackingToken ? `${window.location.origin}/offer/track/${trackingToken}` : null;

      // Gönderim sonucu
      const result = {
        success: true,
        channels: Object.keys(formData.channels).filter(key => formData.channels[key]),
        sentAt: new Date().toISOString(),
        trackingId: trackingToken || `TRK-${Date.now()}`,
        trackingUrl: trackingUrl,
        messagesSent: Object.keys(formData.channels).filter(key => formData.channels[key]).length,
        estimatedDelivery: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 dakika sonra
        recipient: {
          name: formData.recipientName,
          email: formData.recipientEmail,
          phone: formData.recipientPhone
        },
        template: selectedTemplate?.name || 'Özel Mesaj',
        options: formData.options
      };

      // Gönderim log kaydı (LocalStorage'a kaydet)
      const sendLog = {
        id: `log_${Date.now()}`,
        offerId: offer?.id || offer?.offerId,
        offerTitle: offer?.title,
        recipient: result.recipient,
        channels: result.channels,
        sentBy: user?.name,
        sentAt: result.sentAt,
        trackingId: result.trackingId,
        trackingUrl: result.trackingUrl,
        template: formData.selectedTemplate,
        message: formData.customMessage,
        options: formData.options
      };

      // Mevcut logları al
      let existingLogs = [];
      const storedLogs = localStorage.getItem('offer_send_logs');
      if (storedLogs) {
        existingLogs = JSON.parse(storedLogs);
      }

      // Yeni log'u ekle
      existingLogs.push(sendLog);
      localStorage.setItem('offer_send_logs', JSON.stringify(existingLogs));

      // Durum raporunu göster
      setSendResult(result);
      setShowStatusModal(true);

      // Success mesajını da göster
      setSuccess(`Teklif başarıyla ${result.channels.length} kanal üzerinden gönderildi!`);

      // onSent callback'ini çağır ama modal'ı kapatma
      // if (onSent) {
      //   onSent(result);
      // }

    } catch (err) {
      console.error('Teklif gönderme hatası:', err);
      setError('Teklif gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const selectedTemplate = messageTemplates.find(t => t.id === formData.selectedTemplate);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] transition-opacity duration-300" 
      onClick={handleBackdropClick}
      style={{ margin: 0, padding: 0, top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="bg-white shadow-xl max-w-4xl w-full flex flex-col max-h-[90vh]" 
        style={{ margin: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 text-white shadow-md flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 flex items-center justify-center">
                <Send className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">📤 Teklif Gönderimi</h2>
                <div className="text-green-100 text-sm">
                  {offer?.title || 'Teklif'} - {offer?.offerId || offer?.id}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 bg-white bg-opacity-20 text-white p-2 hover:bg-opacity-30 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mx-6 mt-4">
            <div className="flex items-center text-green-800">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{success}</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 mx-4 mt-4">
            <div className="flex items-center text-red-800">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto flex-grow p-4 sm:p-6">
          <div className="space-y-6">
            {/* 1. Alıcı Bilgileri */}
            <div className="bg-blue-50 border border-blue-200 p-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>1. Alıcı Bilgileri</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İsim *
                  </label>
                  <input
                    type="text"
                    value={formData.recipientName}
                    onChange={(e) => handleInputChange('recipientName', e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Hasta adı"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={formData.recipientEmail}
                    onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ornek@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon (WhatsApp)
                  </label>
                  <input
                    type="tel"
                    value={formData.recipientPhone}
                    onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+90 555 123 45 67"
                  />
                </div>
              </div>
            </div>

            {/* 2. Gönderim Kanalları */}
            <div className="bg-green-50 border border-green-200 p-4">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>2. Gönderim Kanalları</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <label className="flex items-center space-x-3 p-3 border border-green-200 bg-white hover:bg-green-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.channels.email}
                    onChange={(e) => handleChannelChange('email', e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <Mail className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">E-posta ile gönder</span>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border border-green-200 bg-white hover:bg-green-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.channels.whatsapp}
                    onChange={(e) => handleChannelChange('whatsapp', e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">WhatsApp ile gönder</span>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border border-green-200 bg-white hover:bg-green-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.channels.customLink}
                    onChange={(e) => handleChannelChange('customLink', e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <Link className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">Özel bağlantı oluştur</span>
                </label>
                
                <label className="flex items-center space-x-3 p-3 border border-green-200 bg-white hover:bg-green-50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.channels.downloadPdf}
                    onChange={(e) => handleChannelChange('downloadPdf', e.target.checked)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <Download className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900">PDF olarak indir</span>
                </label>
              </div>
            </div>

            {/* 3. Mesaj Şablonu Seçimi */}
            <div className="bg-purple-50 border border-purple-200 p-4">
              <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>3. Mesaj Şablonu Seçimi</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <select
                    value={formData.selectedTemplate}
                    onChange={(e) => handleTemplateChange(e.target.value)}
                    className="flex-1 border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {messageTemplates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => setShowTemplateEditor(!showTemplateEditor)}
                    className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Yeni Şablon</span>
                  </button>
                </div>
                
                {/* Yeni Şablon Editörü */}
                {showTemplateEditor && (
                  <div className="bg-white border border-purple-300 rounded-lg p-4 mb-4">
                    <h4 className="font-medium text-purple-900 mb-3">Yeni Şablon Oluştur</h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Şablon Adı *
                        </label>
                        <input
                          type="text"
                          value={newTemplate.name}
                          onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Örn: Özel VIP Mesajı"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          E-posta Konusu
                        </label>
                        <input
                          type="text"
                          value={newTemplate.subject}
                          onChange={(e) => setNewTemplate(prev => ({ ...prev, subject: e.target.value }))}
                          placeholder="Özel Tedavi Teklifiniz - {PATIENT_NAME}"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mesaj İçeriği *
                        </label>
                        <textarea
                          rows={6}
                          value={newTemplate.content}
                          onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                          placeholder="Merhaba {PATIENT_NAME},&#10;&#10;Sizin için özel olarak hazırladığımız {OFFER_TITLE} teklifimizi sunuyoruz...&#10;&#10;Saygılarımızla,&#10;{COMPANY_NAME}"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Kullanılabilir değişkenler: {'{PATIENT_NAME}'}, {'{VALID_UNTIL}'}, {'{CONSULTANT_NAME}'}, {'{OFFER_TITLE}'}, {'{OFFER_AMOUNT}'}, {'{COMPANY_NAME}'}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveNewTemplate}
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Şablonu Kaydet
                        </button>
                        <button
                          onClick={() => {
                            setShowTemplateEditor(false);
                            setNewTemplate({ name: '', subject: '', content: '' });
                          }}
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          İptal
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedTemplate && (
                  <div className="bg-white border border-purple-300 p-4">
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta Konusu
                      </label>
                      <input
                        type="text"
                        value={selectedTemplate.subject.replace(/{(\w+)}/g, (_, key) => {
                          switch (key) {
                            case 'PATIENT_NAME': return formData.recipientName || '[Hasta Adı]';
                            case 'OFFER_TITLE': return offer?.title || '[Teklif Başlığı]';
                            default: return `{${key}}`;
                          }
                        })}
                        className="w-full border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mesaj İçeriği
                      </label>
                      <textarea
                        rows={8}
                        value={formData.customMessage}
                        onChange={(e) => handleInputChange('customMessage', e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Mesaj içeriğinizi buraya yazın..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 4. Ek Seçenekler */}
            <div className="bg-orange-50 border border-orange-200 p-4">
              <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>4. Ek Seçenekler</span>
              </h3>
              
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.options.attachPdf}
                    onChange={(e) => handleOptionChange('attachPdf', e.target.checked)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-900">Teklif PDF'ini otomatik olarak ekle</span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.options.trackViewing}
                    onChange={(e) => handleOptionChange('trackViewing', e.target.checked)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900">Görüntüleme takibi etkinleştir</span>
                    <p className="text-xs text-gray-600">Teklifin ne zaman görüntülendiğini takip eder</p>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.options.sendCopyToMe}
                    onChange={(e) => handleOptionChange('sendCopyToMe', e.target.checked)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-900">Kopyayı bana da gönder</span>
                </label>
              </div>
              
              {/* Kanal Bazlı Önizleme */}
              {(formData.channels.email || formData.channels.whatsapp) && (
                <div className="mt-4 p-3 bg-white rounded-lg border border-orange-300">
                  <h5 className="font-medium text-orange-900 mb-3">📱 Kanal Önizlemesi</h5>
                  <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0">
                    {formData.channels.email && (
                      <div className="bg-blue-50 p-2 rounded border border-blue-200">
                        <div className="flex items-center space-x-1 mb-1">
                          <Mail className="h-3 w-3 text-blue-600" />
                          <span className="text-xs font-medium text-blue-800">E-posta Görünümü</span>
                        </div>
                        <div className="text-xs text-blue-700 bg-white p-2 rounded border">
                          Konu: {selectedTemplate?.subject.replace('{PATIENT_NAME}', formData.recipientName || '[Hasta Adı]')}
                        </div>
                      </div>
                    )}
                    
                    {formData.channels.whatsapp && (
                      <div className="bg-green-50 p-2 rounded border border-green-200">
                        <div className="flex items-center space-x-1 mb-1">
                          <MessageCircle className="h-3 w-3 text-green-600" />
                          <span className="text-xs font-medium text-green-800">WhatsApp Görünümü</span>
                        </div>
                        <div className="text-xs text-green-700 bg-white p-2 rounded border">
                          {formData.customMessage.substring(0, 80)}...
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span>Seçilen kanallar: {Object.keys(formData.channels).filter(key => formData.channels[key]).length}</span>
                {formData.options.trackViewing && (
                  <span className="flex items-center space-x-1 text-blue-600">
                    <Eye className="h-3 w-3" />
                    <span className="text-xs">Takip aktif</span>
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2 disabled:bg-gray-100"
              >
                <XCircle className="h-4 w-4" />
                <span>İptal</span>
              </button>
              
              <button
                onClick={handleSend}
                disabled={isSubmitting || !formData.recipientName.trim() || !Object.values(formData.channels).some(Boolean)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Gönderiliyor...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Gönder</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Report Modal */}
      {showStatusModal && sendResult && (
        <OfferSendStatusReport
          isOpen={showStatusModal}
          onClose={() => setShowStatusModal(false)}
          sendResult={sendResult}
          onComplete={() => {
            setShowStatusModal(false);
            if (onSent && sendResult) {
              onSent(sendResult);
            }
            onClose();
          }}
        />
      )}
    </div>
  );
};

export default OfferSendModal;
