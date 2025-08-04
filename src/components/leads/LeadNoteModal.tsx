import React, { useState, useEffect } from 'react';
import { useModalBodyScroll } from '../../hooks/useModalBodyScroll';
import { 
  X, 
  XCircle, 
  FileText, 
  Phone, 
  MessageCircle, 
  Mail, 
  Users, 
  Video,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Save,
  Loader2,
  Activity,
  DollarSign,
  Plane,
  MoreHorizontal,
  Eye
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// LocalStorage'a not ekleme fonksiyonu
const addLeadNote = async (noteData) => {
  console.log('Adding lead note to localStorage:', noteData);
  
  try {
    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Yeni not objesi oluştur
    const newNote = {
      id: `note_${Date.now()}`,
      leadId: noteData.leadId,
      userId: 'current-user-id',
      userName: noteData.userName || 'Kullanıcı',
      userPosition: noteData.userPosition || 'Pozisyon',
      noteType: noteData.noteType,
      content: noteData.content,
      interactionChannel: noteData.interactionChannel,
      interactionDuration: noteData.interactionDuration,
      followUpRequired: noteData.followUpRequired,
      followUpDate: noteData.followUpDate,
      isPrivate: noteData.isPrivate,
      createdAt: new Date().toISOString()
    };
    
    // Mevcut notları localStorage'dan al
    let existingNotes = [];
    const storedNotes = localStorage.getItem('lead_notes');
    if (storedNotes) {
      existingNotes = JSON.parse(storedNotes);
    }
    
    // Yeni notu ekle
    existingNotes.push(newNote);
    
    // Güncellenmiş notları localStorage'a kaydet
    localStorage.setItem('lead_notes', JSON.stringify(existingNotes));
    
    return { 
      success: true, 
      data: newNote, 
      error: null 
    };
  } catch (error) {
    console.error('Error saving note to localStorage:', error);
    return {
      success: false,
      data: null,
      error: 'Not kaydedilirken bir hata oluştu'
    };
  }
};

const getNoteTypes = async () => {
  console.log('Getting note types');
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const mockNoteTypes = [
    { id: '1', name: 'Telefon Görüşmesi', description: 'Telefon üzerinden yapılan görüşme notları', color: 'blue', icon: 'phone', isActive: true },
    { id: '2', name: 'WhatsApp Görüşmesi', description: 'WhatsApp üzerinden yapılan görüşme notları', color: 'green', icon: 'message-circle', isActive: true },
    { id: '3', name: 'E-posta Yazışması', description: 'E-posta üzerinden yapılan yazışma notları', color: 'purple', icon: 'mail', isActive: true },
    { id: '4', name: 'Yüz Yüze Görüşme', description: 'Yüz yüze yapılan görüşme notları', color: 'orange', icon: 'users', isActive: true },
    { id: '5', name: 'Video Görüşme', description: 'Video konferans üzerinden yapılan görüşme notları', color: 'red', icon: 'video', isActive: true },
    { id: '6', name: 'Tedavi Bilgisi', description: 'Tedavi detayları ve tıbbi bilgiler', color: 'teal', icon: 'activity', isActive: true },
    { id: '7', name: 'Fiyat Teklifi', description: 'Verilen fiyat teklifleri ve detayları', color: 'green', icon: 'dollar-sign', isActive: true },
    { id: '8', name: 'Seyahat Planı', description: 'Seyahat ve konaklama detayları', color: 'blue', icon: 'plane', isActive: true },
    { id: '9', name: 'Takip Notu', description: 'Genel takip notları', color: 'gray', icon: 'file-text', isActive: true },
    { id: '10', name: 'Diğer', description: 'Diğer kategorilere uymayan notlar', color: 'gray', icon: 'more-horizontal', isActive: true }
  ];
  
  return {
    success: true,
    data: mockNoteTypes,
    error: null
  };
};

interface LeadNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  leadName: string;
  onNoteSaved?: () => void;
}

const LeadNoteModal: React.FC<LeadNoteModalProps> = ({ 
  isOpen, 
  onClose, 
  leadId, 
  leadName,
  onNoteSaved 
}) => {
  const { user } = useAuth();
  
  // Modal açıkken body scroll'unu kapat
  useModalBodyScroll(isOpen);
  
  const [formData, setFormData] = useState({
    noteType: 'Telefon Görüşmesi',
    content: '',
    interactionChannel: 'phone',
    interactionDuration: 5,
    followUpRequired: false,
    followUpDate: '',
    isPrivate: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noteTypes, setNoteTypes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Not tiplerini yükle
  useEffect(() => {
    const loadNoteTypes = async () => {
      setIsLoading(true);
      try {
        const result = await getNoteTypes();
        if (result.success) {
          setNoteTypes(result.data);
        } else {
          console.error('Not tipleri yüklenirken hata:', result.error);
          // Varsayılan not tipleri
          setNoteTypes([
            { id: '1', name: 'Telefon Görüşmesi', color: 'blue', icon: 'phone' },
            { id: '2', name: 'WhatsApp Görüşmesi', color: 'green', icon: 'message-circle' },
            { id: '3', name: 'E-posta Yazışması', color: 'purple', icon: 'mail' },
            { id: '4', name: 'Yüz Yüze Görüşme', color: 'orange', icon: 'users' },
            { id: '5', name: 'Video Görüşme', color: 'red', icon: 'video' },
            { id: '6', name: 'Tedavi Bilgisi', color: 'teal', icon: 'activity' },
            { id: '7', name: 'Fiyat Teklifi', color: 'green', icon: 'dollar-sign' },
            { id: '8', name: 'Seyahat Planı', color: 'blue', icon: 'plane' },
            { id: '9', name: 'Takip Notu', color: 'gray', icon: 'file-text' },
            { id: '10', name: 'Diğer', color: 'gray', icon: 'more-horizontal' }
          ]);
        }
      } catch (err) {
        console.error('Not tipleri yüklenirken beklenmeyen hata:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      loadNoteTypes();
    }
  }, [isOpen]);

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

  // Form değişikliklerini izleme
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Not tipi değiştiğinde etkileşim kanalını da güncelle
    if (field === 'noteType') {
      let channel = 'other';
      
      if (value === 'Telefon Görüşmesi') channel = 'phone';
      else if (value === 'WhatsApp Görüşmesi') channel = 'whatsapp';
      else if (value === 'E-posta Yazışması') channel = 'email';
      else if (value === 'Yüz Yüze Görüşme') channel = 'in_person';
      else if (value === 'Video Görüşme') channel = 'video';
      
      setFormData(prev => ({
        ...prev,
        interactionChannel: channel
      }));
    }
  };

  // Not kaydetme
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Form submitted");
    
    if (!formData.content.trim()) {
      setError('Not içeriği boş olamaz');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await addLeadNote({
        leadId: leadId,
        userName: user?.name,
        userPosition: user?.role === 'super_admin' ? 'Sistem Yöneticisi' : 
                      user?.role === 'admin' ? 'Yönetici' : 
                      user?.role === 'agent' ? 'Satış Temsilcisi' : 
                      user?.role === 'doctor' ? 'Doktor' : 
                      user?.role === 'nurse' ? 'Hemşire' : 'Kullanıcı',
        noteType: formData.noteType,
        content: formData.content,
        interactionChannel: formData.interactionChannel,
        interactionDuration: formData.interactionDuration,
        followUpRequired: formData.followUpRequired,
        followUpDate: formData.followUpRequired ? formData.followUpDate : undefined,
        isPrivate: formData.isPrivate
      });
      
      // Callback çağır
      if (result.success) {        
        console.log("Note saved successfully, closing modal");
        
        // Yeni not eklendiğini bildiren custom event
        const noteAddedEvent = new Event('leadNoteAdded');
        window.dispatchEvent(noteAddedEvent);
        
        // ÖNEMLİ: Önce modalı kapat, sonra callback'i çağır
        onClose();
        
        // Kısa bir gecikme ile callback'i çağır
        if (onNoteSaved) {
          setTimeout(() => {
            console.log("Calling onNoteSaved callback");
            onNoteSaved();
          }, 100);
        }
      } else {
        setError(result.error || 'Not kaydedilirken bir hata oluştu');
      }
    } catch (err) {
      console.error('Not kaydedilirken hata:', err);
      setError('Not kaydedilirken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Not tipi ikonu
  const getNoteTypeIcon = (type: string) => {
    switch (type) {
      case 'Telefon Görüşmesi': return <Phone className="h-5 w-5 text-blue-600" />;
      case 'WhatsApp Görüşmesi': return <MessageCircle className="h-5 w-5 text-green-600" />;
      case 'E-posta Yazışması': return <Mail className="h-5 w-5 text-purple-600" />;
      case 'Yüz Yüze Görüşme': return <Users className="h-5 w-5 text-orange-600" />;
      case 'Video Görüşme': return <Video className="h-5 w-5 text-red-600" />;
      case 'Tedavi Bilgisi': return <Activity className="h-5 w-5 text-teal-600" />;
      case 'Fiyat Teklifi': return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'Seyahat Planı': return <Plane className="h-5 w-5 text-blue-600" />;
      case 'Takip Notu': return <FileText className="h-5 w-5 text-gray-600" />;
      default: return <MoreHorizontal className="h-5 w-5 text-gray-600" />;
    }
  };

  if (!isOpen) return null;

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
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Lead Notu Ekle</h2>
                <div className="text-blue-100 text-sm">{leadName}</div>
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
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Lead Bilgileri</h4>
              </div>
              <p className="text-sm text-blue-700">
                <strong>Lead:</strong> {leadName} (ID: {leadId})
              </p>
              <p className="text-sm text-blue-700">
                <strong>Not Ekleyen:</strong> {user?.name} ({user?.role})
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Not Tipi *
                </label>
                <div className="relative">
                  <select
                    value={formData.noteType}
                    onChange={(e) => handleInputChange('noteType', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {noteTypes.map((type) => (
                      <option key={type.id} value={type.name}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İletişim Kanalı
                </label>
                <select
                  value={formData.interactionChannel}
                  onChange={(e) => handleInputChange('interactionChannel', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="phone">Telefon</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">E-posta</option>
                  <option value="in_person">Yüz Yüze</option>
                  <option value="video">Video Görüşme</option>
                  <option value="other">Diğer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Görüşme Süresi (dakika)
                </label>
                <input
                  type="number"
                  min="1"
                  max="240"
                  value={formData.interactionDuration}
                  onChange={(e) => handleInputChange('interactionDuration', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <input
                  type="checkbox"
                  id="followUpRequired"
                  checked={formData.followUpRequired}
                  onChange={(e) => handleInputChange('followUpRequired', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div>
                  <label htmlFor="followUpRequired" className="text-sm font-medium text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 text-blue-600 mr-1" />
                    Takip Gerekli
                  </label>
                  <p className="text-xs text-gray-600">Bu lead için takip hatırlatması oluştur</p>
                </div>
              </div>
            </div>
            
            {formData.followUpRequired && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Takip Tarihi *
                </label>
                <input
                  type="datetime-local"
                  value={formData.followUpDate}
                  onChange={(e) => handleInputChange('followUpDate', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={formData.followUpRequired}
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Not İçeriği *
              </label>
              <textarea
                rows={6}
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Görüşme detaylarını, alınan bilgileri ve sonraki adımları buraya yazın..."
                required
              />
            </div>
            
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <input
                type="checkbox"
                id="isPrivate"
                checked={formData.isPrivate}
                onChange={(e) => handleInputChange('isPrivate', e.target.checked)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <div>
                <label htmlFor="isPrivate" className="text-sm font-medium text-gray-900 flex items-center">
                  <Eye className="h-4 w-4 text-red-600 mr-1" />
                  Özel Not
                </label>
                <p className="text-xs text-gray-600">Bu not sadece siz ve yöneticiler tarafından görülebilir</p>
              </div>
            </div>
          </form>
        </div>
        
        <div className="border-t border-gray-200 p-3 bg-gray-50 flex-shrink-0">
          <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="min-w-[100px] px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <XCircle className="h-4 w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">İptal</span>
          </button>
          <button
            onClick={handleSubmit}
            className="min-w-[120px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
            disabled={isSubmitting || !formData.content.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" />
                <span className="whitespace-nowrap">Kaydediliyor...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Notu Kaydet</span>
              </>
            )}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadNoteModal;