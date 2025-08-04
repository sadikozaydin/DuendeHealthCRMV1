import React from 'react';
import { useState, useEffect } from 'react';
import { useModalBodyScroll } from '../../hooks/useModalBodyScroll';
import { User, Users, Phone, Mail, MapPin, Calendar, Tag, FileText, Clock, Star, MessageCircle, ArrowRight, Flag, AlertTriangle, CheckCircle, Plus, Download, Upload, Globe, Languages, DollarSign, Briefcase, Heart, Shield, Target, TrendingUp, Stethoscope, RefreshCw, Handshake, MessageSquare, Zap, Flame, Thermometer, PhoneCall, Eye, Send } from 'lucide-react';
import { getStatusColor, getStatusName, getPriorityColor, getPriorityName, getTemperatureColor, getTemperatureName } from '../../utils/leadHelpers';
import MessageButton from '../common/MessageButton';
import LeadNotesList from './LeadNotesList';
import LeadDocumentsList from './LeadDocumentsList';
import LeadNoteModal from './LeadNoteModal';
import DocumentUploadModal from './DocumentUploadModal';
import OfferCreationModal from './OfferCreationModal';

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

interface LeadPreviewPopupProps {
  lead: Lead;
  onAssign?: (leadId: string, userId: string) => void;
  onClose?: () => void;
  onSendMessage?: (leadId: string) => void;
  onCall?: (leadId: string) => void;
  onAddNote?: (leadId: string) => void;
  onCreateOffer?: (leadId: string) => void;
  onAddDocument?: (leadId: string) => void;
  onStatusChange?: (leadId: string, status: string) => void;
}

export default function LeadPreviewPopup({ 
  lead, 
  onAssign, 
  onClose,
  onSendMessage,
  onCall,
  onAddNote,
  onCreateOffer,
  onAddDocument,
  onStatusChange
}: LeadPreviewPopupProps) {
  // Modal açıkken body scroll'unu kapat
  useModalBodyScroll(true);
  
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [refreshNotes, setRefreshNotes] = useState(0);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [refreshDocuments, setRefreshDocuments] = useState(0);
  const [showOfferModal, setShowOfferModal] = useState(false);
  
  // ESC tuşu ile kapatma fonksiyonu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);
  
  // Not modalı kapatma fonksiyonu
  const handleCloseNoteModal = () => {
    console.log("Closing note modal from LeadPreviewPopup");
    setShowNoteModal(false);
  };
  
  // Not kaydedildiğinde
  const handleNoteSaved = () => {
    console.log("Note saved, refreshing notes list");
    // Notlar listesini yenilemek için refresh trigger'ı güncelle
    setRefreshNotes(prev => prev + 1);
  };
  
  // Tarih formatı fonksiyonu
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Bilinmiyor';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', { 
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Geçersiz Tarih';
    }
  };

  const handleAssignToSelf = () => {
    if (onAssign) {
      onAssign(lead.id, 'current-user-id'); // This should be the actual current user ID
    }
  };

  // Kaynak ikonu
  const getSourceIcon = (source?: string) => {
    if (!source) return <Globe className="h-4 w-4 text-gray-400" />;
    
    switch (source.toLowerCase()) {
      case 'whatsapp': return <MessageSquare className="h-4 w-4 text-green-600" />;
      case 'call_center': return <PhoneCall className="h-4 w-4 text-blue-600" />;
      case 'chat': return <MessageCircle className="h-4 w-4 text-purple-600" />;
      case 'website': return <Globe className="h-4 w-4 text-gray-600" />;
      case 'email': return <Mail className="h-4 w-4 text-gray-600" />;
      case 'instagram': return <Globe className="h-4 w-4 text-pink-600" />;
      case 'facebook': return <Globe className="h-4 w-4 text-blue-600" />;
      case 'google_ads': return <Globe className="h-4 w-4 text-red-600" />;
      case 'referral': return <Users className="h-4 w-4 text-green-600" />;
      case 'partner': return <Handshake className="h-4 w-4 text-purple-600" />;
      case 'campaign': return <Target className="h-4 w-4 text-orange-600" />;
      default: return <Globe className="h-4 w-4 text-gray-400" />;
    }
  };

  // API çağrısı simülasyonu
  const simulateApiCall = async (action: string, leadId: string) => {
    console.log(`Simulating API call: ${action} for lead ${leadId}`);
    // Gerçek bir API çağrısı simülasyonu için 500ms bekle
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  };

  // Mesaj gönderme fonksiyonu
  const handleSendMessage = async () => {
    if (!lead.email && !lead.phone) {
      alert('Bu lead için iletişim bilgisi bulunamadı. Mesaj göndermek için e-posta veya telefon bilgisi ekleyin.');
      return;
    }
    
    try {
      // API çağrısı simülasyonu
      const result = await simulateApiCall('send_message', lead.id);
      
      if (result.success) {
        // Başarılı mesaj gönderimi
        if (onSendMessage) {
          onSendMessage(lead.id);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  // Arama fonksiyonu
  const handleCall = async () => {
    if (!lead.phone) {
      alert('Bu lead için telefon bilgisi bulunamadı. Arama yapmak için telefon bilgisi ekleyin.');
      return;
    }
    
    try {
      // API çağrısı simülasyonu
      const result = await simulateApiCall('call', lead.id);
      
      if (result.success) {
        // Başarılı arama
        if (onCall) {
          onCall(lead.id);
        }
      }
    } catch (error) {
      console.error('Error making call:', error);
      alert('Arama yapılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  // Teklif oluşturma fonksiyonu
  const handleCreateOffer = async () => {
    try {
      console.log("Opening offer creation modal");
      setShowOfferModal(true);
    } catch (error) {
      console.error('Error creating offer:', error);
      alert('Teklif oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };
  
  // Teklif oluşturma modalı kapatma fonksiyonu
  const handleCloseOfferModal = () => {
    console.log("Closing offer creation modal");
    setShowOfferModal(false);
  };
  
  // Teklif oluşturulduğunda
  const handleOfferCreated = () => {
    console.log("Offer created successfully");
    setShowOfferModal(false);
    if (onCreateOffer) {
      onCreateOffer(lead.id);
    }
  };

  // Not ekleme fonksiyonu
  const handleAddNote = async () => {
    try {
      console.log("Opening note modal");
      setShowNoteModal(true);
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Not eklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  // Doküman ekleme fonksiyonu
  const handleAddDocument = async () => {
    try {
      console.log("Opening document upload modal");
      setShowDocumentModal(true);
    } catch (error) {
      console.error('Error adding document:', error);
      alert('Doküman eklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };
  
  // Doküman yükleme modalı kapatma fonksiyonu
  const handleCloseDocumentModal = () => {
    console.log("Closing document upload modal");
    setShowDocumentModal(false);
  };
  
  // Doküman yüklendiğinde
  const handleDocumentUploaded = () => {
    console.log("Document uploaded");
    // Dokümanlar listesini yenilemek için refresh trigger'ı güncelle
    setRefreshDocuments(prev => prev + 1);
    if (onAddDocument) {
      onAddDocument(lead.id);
    }
  };

  // Durum değiştirme fonksiyonu
  const handleStatusChange = async (status: string) => {
    try {
      // API çağrısı simülasyonu
      const result = await simulateApiCall(`change_status_to_${status}`, lead.id);
      
      if (result.success) {
        // Başarılı durum değiştirme
        if (onStatusChange) {
          onStatusChange(lead.id, status);
        }
      }
    } catch (error) {
      console.error('Error changing status:', error);
      alert('Durum değiştirilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-xl max-w-2xl w-full flex flex-col max-h-[85vh]" 
      style={{ margin: 0 }}
      onClick={(e) => e.stopPropagation()} // Tıklamaların dışarı çıkmasını engelle
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-md flex-shrink-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg relative ${
              lead.priority === 'high' ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse' :
              lead.priority === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
              'bg-gradient-to-r from-green-500 to-green-600'
            }`}>
              {lead.first_name?.[0]}{lead.last_name?.[0]}
              <span className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                lead.priority === 'high' ? 'bg-red-500 animate-pulse' :
                lead.priority === 'medium' ? 'bg-yellow-500' :
                'bg-green-500'
              }`}></span>
            </div>
            <div>
              <h2 className="text-xl font-bold">{lead.first_name} {lead.last_name}</h2>
              <div className="flex items-center space-x-2 text-blue-100">
                <span className="text-sm">{lead.lead_id}</span>
                <span>•</span>
                <span className="text-sm">{formatDate(lead.created_at)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lead.status)}`}>
              {lead.status}
            </span>
            {lead.priority && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(lead.priority)}`}>
                {lead.priority}
              </span>
            )}
            {lead.lead_temperature && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTemperatureColor(lead.lead_temperature)}`}>
                {getTemperatureName(lead.lead_temperature)}
              </span>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="ml-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="overflow-y-auto flex-grow p-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Uyarılar */}
          {lead.priority === 'high' && (
            <div className="bg-red-50 rounded-lg p-3 border border-red-100">
              <h3 className="text-sm font-semibold text-red-800 mb-2 flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Uyarılar
              </h3>
              <div className="bg-red-100 p-2 rounded-lg border border-red-200">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-red-800">Yüksek Öncelikli Lead</div>
                    <div className="text-xs text-red-700">Hızlı yanıt gerektirir</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* İletişim Bilgileri */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
              <User className="mr-2 h-4 w-4" />
              İletişim Bilgileri
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lead.phone && (
                <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">{lead.phone}</div>
                    <div className="text-xs text-gray-500">Telefon</div>
                  </div>
                  <button 
                    onClick={handleCall}
                    className="ml-auto bg-blue-100 p-1 rounded-full text-blue-700 hover:bg-blue-200 transition-colors"
                    disabled={!lead.phone}
                  >
                    <Phone className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {lead.email && (
                <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <div className="flex-1 min-w-0 truncate">
                    <div className="text-sm font-medium text-gray-900 truncate">{lead.email}</div>
                    <div className="text-xs text-gray-500">E-posta</div>
                  </div>
                  <button 
                    onClick={handleSendMessage}
                    className="ml-auto bg-blue-100 p-1 rounded-full text-blue-700 hover:bg-blue-200 transition-colors"
                    disabled={!lead.email}
                  >
                    <Mail className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(lead.city || lead.country) && (
                <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {lead.city && lead.country ? `${lead.city}, ${lead.country}` : lead.city || lead.country}
                    </div>
                    <div className="text-xs text-gray-500">Lokasyon</div>
                  </div>
                  {lead.country && (
                    <div className="ml-auto text-base">
                      {lead.country === 'İspanya' ? '🇪🇸' : 
                       lead.country === 'İngiltere' ? '🇬🇧' : 
                       lead.country === 'Almanya' ? '🇩🇪' : 
                       lead.country === 'BAE' ? '🇦🇪' : 
                       lead.country === 'Türkiye' ? '🇹🇷' : '🌍'}
                    </div>
                  )}
                </div>
              )}
              
              {lead.language && (
                <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
                  <Languages className="h-4 w-4 text-blue-600" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900">{lead.language}</div>
                    <div className="text-xs text-gray-500">Dil</div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Tedavi ve Kaynak Bilgileri */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Tedavi Bilgileri */}
            <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
              <h3 className="text-sm font-semibold text-purple-800 mb-2 flex items-center">
                <Heart className="mr-2 h-4 w-4" />
                Tedavi Bilgileri
              </h3>
              
              <div className="space-y-2">
                {lead.treatment_interest && (
                  <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
                    <Stethoscope className="h-4 w-4 text-purple-600" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{lead.treatment_interest}</div>
                      <div className="text-xs text-gray-500">Tedavi</div>
                    </div>
                  </div>
                )}
                
                {lead.budget_range && (
                  <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
                    <DollarSign className="h-4 w-4 text-purple-600" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{lead.budget_range}</div>
                      <div className="text-xs text-gray-500">Bütçe</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Lead Kaynağı */}
            <div className="bg-green-50 rounded-lg p-3 border border-green-100">
              <h3 className="text-sm font-semibold text-green-800 mb-2 flex items-center">
                <Star className="mr-2 h-4 w-4" />
                Lead Kaynağı
              </h3>
              
              <div className="space-y-2">
                {lead.source && (
                  <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
                    {getSourceIcon(lead.source)}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">
                        {lead.source.charAt(0).toUpperCase() + lead.source.slice(1).toLowerCase().replace('_', ' ')}
                      </div>
                      <div className="text-xs text-gray-500">Kaynak</div>
                    </div>
                    {lead.sourceDetails && (
                      <div className="ml-auto text-xs text-gray-500">{lead.sourceDetails}</div>
                    )}
                  </div>
                )}
                
                {lead.lead_score !== undefined && (
                  <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
                    <Target className="h-4 w-4 text-green-600" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{lead.lead_score}/100</div>
                      <div className="text-xs text-gray-500">Lead Skoru</div>
                    </div>
                    {lead.lead_temperature && (
                      <span className={`ml-auto px-2 py-0.5 rounded-full text-xs ${getTemperatureColor(lead.lead_temperature)}`}>
                        {getTemperatureName(lead.lead_temperature)}
                      </span>
                    )}
                  </div>
                )}
                
                {lead.interaction_count !== undefined && (
                  <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{lead.interaction_count}</div>
                      <div className="text-xs text-gray-500">Etkileşim Sayısı</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Notlar ve Atama */}
          <div className="grid grid-cols-1 gap-4">
            {/* Hızlı Aksiyonlar */}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">Hızlı Aksiyonlar</h3>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => {
                    // İletişim sayfasına yönlendir
                    window.location.href = `/communication?recipient=${lead.id}&type=lead&name=${encodeURIComponent(`${lead.first_name} ${lead.last_name}`)}`;
                  }}
                  className="flex flex-col items-center justify-center p-2 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors disabled:opacity-50"
                  disabled={!lead.email && !lead.phone}
                >
                  <MessageCircle className="h-4 w-4 text-blue-600 mb-1" />
                  <span className="text-xs">Mesaj</span>
                </button>
                
                <button
                  onClick={handleCreateOffer}
                  className="flex flex-col items-center justify-center p-2 bg-white rounded-lg shadow-sm hover:bg-purple-50 transition-colors"
                >
                  <DollarSign className="h-4 w-4 text-purple-600 mb-1" />
                  <span className="text-xs">Teklif Ver</span>
                </button>
                
                <button
                 onClick={handleAddNote}
                  className="flex flex-col items-center justify-center p-2 bg-white rounded-lg shadow-sm hover:bg-orange-50 transition-colors"
                >
                 <FileText className="h-4 w-4 text-orange-600 mb-1" />
                 <span className="text-xs">Not</span>
                </button>
               
               <button
                 onClick={handleAddDocument}
                 className="flex flex-col items-center justify-center p-2 bg-white rounded-lg shadow-sm hover:bg-blue-50 transition-colors"
               >
                 <Upload className="h-4 w-4 text-blue-600 mb-1" />
                 <span className="text-xs">Doküman</span>
               </button>
              </div>
            </div>
            
            {/* Lead Notları Listesi */}
            <div>
              <LeadNotesList 
                leadId={lead.id}
                onAddNote={() => setShowNoteModal(true)}
                refreshTrigger={refreshNotes}
              />
            </div>
            
            {/* Lead Dokümanları Listesi */}
            <div className="mt-4">
              <LeadDocumentsList 
                leadId={lead.id}
                onAddDocument={() => setShowDocumentModal(true)}
                refreshTrigger={refreshDocuments}
              />
            </div>
            
            {/* Atama Bilgisi */}
            <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100 mt-3">
              <h3 className="text-sm font-semibold text-indigo-800 mb-2 flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Atama Bilgisi
              </h3>
              
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2">
                  {lead.assigned_to ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : ( 
                    <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" /> 
                  )} 
                  <div className="flex-1 min-w-0"> 
                    <div className="text-sm font-medium text-gray-900"> 
                      {lead.assigned_to ? (lead.assigned_to_name || 'Atanmış Kullanıcı') : 'Atama İşlemi Devam Ediyor'} 
                    </div> 
                    <div className="text-xs text-gray-500"> 
                      {lead.assigned_to ? (lead.assigned_to_position || 'Satış Temsilcisi') : 'En uygun temsilci otomatik atanacak'} 
                    </div>
                  </div>
                </div>
                
                {/* Atama bilgisi notu */}
                <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  <p>Öncelik bazlı atama algoritması:</p>
                  <ol className="list-decimal pl-4 mt-1 space-y-0.5">
                    <li><strong>Yüksek öncelik:</strong> En iyi dönüşüm oranına sahip temsilci</li>
                    <li><strong>Orta öncelik:</strong> En hızlı yanıt veren temsilci</li>
                    <li><strong>Düşük öncelik:</strong> En az iş yüküne sahip temsilci</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lead Skoru ve Sıcaklık */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
            <h3 className="text-sm font-semibold text-blue-800 mb-2 flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              Lead Skoru ve Sıcaklık
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              {/* Lead Skoru */}
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">Lead Skoru</h4>
                  <span className="text-lg font-bold text-blue-600">{lead.lead_score || 0}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div 
                    className={`h-2 rounded-full ${
                      (lead.lead_score || 0) >= 70 ? 'bg-green-500' :
                      (lead.lead_score || 0) >= 40 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${lead.lead_score || 0}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0</span>
                  <span>50</span>
                  <span>100</span>
                </div>
              </div>
              
              {/* Lead Sıcaklığı */}
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">Lead Sıcaklığı</h4>
                  <div className="flex items-center space-x-1">
                    {lead.lead_temperature === 'hot' ? (
                      <Flame className="h-4 w-4 text-red-600" />
                    ) : lead.lead_temperature === 'warm' ? (
                      <Thermometer className="h-4 w-4 text-orange-600" />
                    ) : (
                      <Thermometer className="h-4 w-4 text-blue-600" />
                    )}
                    <span className={`text-sm font-medium ${
                      lead.lead_temperature === 'hot' ? 'text-red-600' :
                      lead.lead_temperature === 'warm' ? 'text-orange-600' :
                      'text-blue-600'
                    }`}>
                      {getTemperatureName(lead.lead_temperature)}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  <p>Dönüşüm Olasılığı: <span className="font-medium">{lead.conversion_probability || 0}%</span></p>
                  <p className="mt-1">
                    {lead.lead_temperature === 'hot' 
                      ? 'Yüksek ilgi ve dönüşüm potansiyeli' 
                      : lead.lead_temperature === 'warm'
                      ? 'Orta seviye ilgi, takip gerekli'
                      : 'Düşük ilgi, daha fazla bilgilendirme gerekli'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-3 bg-gray-50 flex-shrink-0">
        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-800 mb-1">Lead Durumu Değiştir</h3>
          <div className="grid grid-cols-4 gap-2">
            {lead.status !== 'contacted' && (
              <button
                onClick={() => handleStatusChange('contacted')}
                className="p-2 rounded-lg transition-colors flex flex-col items-center justify-center bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              >
                <Phone className="h-3 w-3 mb-1" />
                <span className="text-xs">İletişimde</span>
              </button>
            )}
            
            {lead.status !== 'qualified' && (
              <button
                onClick={() => handleStatusChange('qualified')}
                className="p-2 rounded-lg transition-colors flex flex-col items-center justify-center bg-green-100 text-green-800 hover:bg-green-200"
              >
                <CheckCircle className="h-3 w-3 mb-1" />
                <span className="text-xs">Nitelikli</span>
              </button>
            )}
            
            {lead.status !== 'converted' && (
              <button
                onClick={() => handleStatusChange('converted')}
                className="p-2 rounded-lg transition-colors flex flex-col items-center justify-center bg-purple-100 text-purple-800 hover:bg-purple-200"
              >
                <Users className="h-3 w-3 mb-1" />
                <span className="text-xs">Dönüştü</span>
              </button>
            )}
            
            {lead.status !== 'lost' && (
              <button
                onClick={() => handleStatusChange('lost')}
                className="p-2 rounded-lg transition-colors flex flex-col items-center justify-center bg-red-100 text-red-800 hover:bg-red-200"
              >
                <Flag className="h-3 w-3 mb-1" />
                <span className="text-xs">Kaybedildi</span>
              </button>
            )}
            
            {/* Mevcut durum göstergesi */}
            <div className={`p-2 rounded-lg flex flex-col items-center justify-center ${
              lead.status === 'contacted' ? 'bg-yellow-200 text-yellow-800' :
              lead.status === 'qualified' ? 'bg-green-200 text-green-800' :
              lead.status === 'converted' ? 'bg-purple-200 text-purple-800' :
              lead.status === 'lost' ? 'bg-red-200 text-red-800' :
              'bg-gray-200 text-gray-800'
            }`}>
              <span className="text-xs font-medium">Mevcut:</span>
              <span className="text-xs">{getStatusName(lead.status)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-200">
          <div className="space-y-1">
            <div>Oluşturulma: {formatDate(lead.created_at)}</div>
            <div>Güncelleme: {formatDate(lead.updated_at)}</div>
          </div>
        </div>
      </div>

      {/* Lead Not Modalı */}
      {showNoteModal && (
        <LeadNoteModal
          isOpen={true}
          onClose={handleCloseNoteModal}
          leadId={lead.id}
          leadName={`${lead.first_name || ''} ${lead.last_name || ''}`}
          onNoteSaved={handleNoteSaved}
        />
      )}
      
      {/* Doküman Yükleme Modalı */}
      {showDocumentModal && (
        <DocumentUploadModal
          isOpen={true}
          onClose={handleCloseDocumentModal}
          leadId={lead.id}
          leadName={`${lead.first_name || ''} ${lead.last_name || ''}`}
          onDocumentUploaded={handleDocumentUploaded}
        />
      )}
      
      {/* Teklif Oluşturma Modalı */}
      {showOfferModal && (
        <OfferCreationModal
          isOpen={true}
          onClose={handleCloseOfferModal}
          lead={lead}
          onOfferCreated={handleOfferCreated}
        />
      )}
      
    </div>
  );
}