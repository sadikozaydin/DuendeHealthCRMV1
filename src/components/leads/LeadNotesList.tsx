import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Phone, 
  MessageCircle, 
  Mail, 
  Users, 
  Video,
  Clock,
  Calendar,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  MoreHorizontal,
  Activity,
  DollarSign,
  Plane,
  AlertTriangle,
  Loader2,
  Plus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// LocalStorage'dan notları getirme fonksiyonu
const getLeadNotes = async (leadId, options) => {
  console.log('Getting lead notes from localStorage for lead ID:', leadId, options);
  
  try {
    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // LocalStorage'dan tüm notları al
    let allNotes = [];
    const storedNotes = localStorage.getItem('lead_notes');
    if (storedNotes) {
      allNotes = JSON.parse(storedNotes);
    }
    
    // Bu lead'e ait notları filtrele
    const leadNotes = allNotes.filter(note => note.leadId === leadId);
    
    // Özel notları filtrele (eğer gerekiyorsa)
    const filteredNotes = options?.includePrivate 
      ? leadNotes 
      : leadNotes.filter(note => !note.isPrivate);
    
    // Notları tarihe göre sırala (en yeniler üstte)
    filteredNotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return {
      success: true,
      data: filteredNotes,
      total: filteredNotes.length,
      error: null
    };
  } catch (error) {
    console.error('Error getting notes from localStorage:', error);
    return {
      success: false,
      data: [],
      total: 0,
      error: 'Notlar yüklenirken bir hata oluştu'
    };
  }
};
  
// LocalStorage'dan not silme fonksiyonu
const deleteLeadNote = async (noteId) => {
  console.log('Deleting lead note from localStorage:', noteId);
  
  try {
    // Simüle edilmiş gecikme
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mevcut notları al
    let allNotes = [];
    const storedNotes = localStorage.getItem('lead_notes');
    if (storedNotes) {
      allNotes = JSON.parse(storedNotes);
    }
    
    // Silinecek notu filtrele
    const updatedNotes = allNotes.filter(note => note.id !== noteId);
    
    // Güncellenmiş notları kaydet
    localStorage.setItem('lead_notes', JSON.stringify(updatedNotes));
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting note from localStorage:', error);
    return { 
      success: false, 
      error: 'Not silinirken bir hata oluştu' 
    };
  }
};

interface LeadNotesListProps {
  leadId: string;
  className?: string;
  showAddButton?: boolean;
  onAddNote?: () => void;
  onEditNote?: (note: any) => void;
  refreshTrigger?: number;
  refreshTrigger?: number;
}

const LeadNotesList: React.FC<LeadNotesListProps> = ({ 
  leadId, 
  className = '',
  showAddButton = true,
  onAddNote = () => {},
  onEditNote = () => {},
  refreshTrigger = 0
}) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPrivateNotes, setShowPrivateNotes] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Admin kontrolü
  useEffect(() => {
    if (user) {
      setIsAdmin(['super_admin', 'admin', 'manager'].includes(user.role));
    }
  }, [user]);

  // Notları yükle
  useEffect(() => {
    const loadNotes = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const result = await getLeadNotes(leadId, {
          includePrivate: isAdmin || showPrivateNotes
        });
        
        if (result.success) {
          setNotes(result.data);
        } else {
          setError(result.error || 'Notlar yüklenirken bir hata oluştu');
          setNotes([]);
        }
      } catch (err) {
        console.error('Notlar yüklenirken hata:', err);
        setError('Notlar yüklenirken beklenmeyen bir hata oluştu');
        setNotes([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNotes();
  }, [leadId, isAdmin, showPrivateNotes, refreshTrigger]);

  // Not silme
  const handleDeleteNote = async (noteId: string) => {
    if (window.confirm('Bu notu silmek istediğinizden emin misiniz?')) {
      try {
        const result = await deleteLeadNote(noteId);
        
        if (result.success) {
          // Notları güncelle
          setNotes(prev => prev.filter(note => note.id !== noteId));
        } else {
          alert(`Not silinirken bir hata oluştu: ${result.error}`);
        }
      } catch (err) {
        console.error('Not silinirken hata:', err);
        alert('Not silinirken beklenmeyen bir hata oluştu');
      }
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

  // Etkileşim kanalı ikonu
  const getChannelIcon = (channel?: string) => {
    switch (channel) {
      case 'phone': return <Phone className="h-3 w-3 text-gray-500" />;
      case 'whatsapp': return <MessageCircle className="h-3 w-3 text-gray-500" />;
      case 'email': return <Mail className="h-3 w-3 text-gray-500" />;
      case 'in_person': return <Users className="h-3 w-3 text-gray-500" />;
      case 'video': return <Video className="h-3 w-3 text-gray-500" />;
      default: return null;
    }
  };

  // Tarih formatı
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`rounded-lg border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium text-gray-900">Lead Notları</h3>
          {notes.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {notes.length}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {isAdmin && (
            <button
              onClick={() => setShowPrivateNotes(!showPrivateNotes)}
              className="text-xs flex items-center space-x-1 px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {showPrivateNotes ? (
                <>
                  <EyeOff className="h-3 w-3" />
                  <span>Özel Notları Gizle</span>
                </>
              ) : (
                <>
                  <Eye className="h-3 w-3" />
                  <span>Özel Notları Göster</span>
                </>
              )}
            </button>
          )}
          
          {showAddButton && onAddNote && (
            <button
              onClick={onAddNote}
              className="text-xs flex items-center space-x-1 px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
            >
              <Plus className="h-3 w-3" />
              <span>Not Ekle</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {isLoading ? (
          <div className="p-6 text-center">
            <Loader2 className="h-8 w-8 text-blue-600 mx-auto mb-2 animate-spin" />
            <p className="text-gray-600">Notlar yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-red-600">{error}</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="p-6 text-center">
            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Henüz not eklenmemiş</p>
            {showAddButton && onAddNote && (
              <button
                onClick={onAddNote}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Not Ekle
              </button>
            )}
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className={`p-4 ${note.isPrivate ? 'bg-red-50' : 'hover:bg-gray-50'}`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getNoteTypeIcon(note.noteType)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900">{note.noteType}</h4>
                      {note.isPrivate && (
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>Özel</span>
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {onEditNote && (
                        <button
                          onClick={() => onEditNote(note)}
                          className="text-gray-400 hover:text-blue-600 p-1 rounded"
                        >
                          <Edit className="h-3 w-3" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-gray-400 hover:text-red-600 p-1 rounded"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 whitespace-pre-line">{note.content}</p>
                  
                  <div className="flex flex-wrap items-center mt-2 text-xs text-gray-500 space-x-3">
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{note.userName}</span>
                      {note.userPosition && (
                        <span className="text-gray-400">({note.userPosition})</span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(note.createdAt)}</span>
                    </div>
                    
                    {note.interactionChannel && (
                      <div className="flex items-center space-x-1">
                        {getChannelIcon(note.interactionChannel)}
                        <span>
                          {note.interactionChannel === 'phone' ? 'Telefon' :
                           note.interactionChannel === 'whatsapp' ? 'WhatsApp' :
                           note.interactionChannel === 'email' ? 'E-posta' :
                           note.interactionChannel === 'in_person' ? 'Yüz Yüze' :
                           note.interactionChannel === 'video' ? 'Video' : 'Diğer'}
                          {note.interactionDuration && ` (${note.interactionDuration}dk)`}
                        </span>
                      </div>
                    )}
                    
                    {note.followUpRequired && note.followUpDate && (
                      <div className="flex items-center space-x-1 text-blue-600">
                        <Calendar className="h-3 w-3" />
                        <span>Takip: {formatDate(note.followUpDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeadNotesList;