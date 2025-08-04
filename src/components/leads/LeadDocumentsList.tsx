import React, { useState, useEffect } from 'react';
import { useModalBodyScroll } from '../../hooks/useModalBodyScroll';
import { 
  FileText, 
  Download, 
  Trash2, 
  Eye, 
  File, 
  Image, 
  FileSpreadsheet, 
  File as FilePdf,
  Loader2,
  AlertTriangle,
  Plus,
  Upload
} from 'lucide-react';

interface LeadDocument {
  id: string;
  leadId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  documentType: string;
  uploadedAt: string;
  status: string;
}

interface LeadDocumentsListProps {
  leadId: string;
  className?: string;
  showAddButton?: boolean;
  onAddDocument?: () => void;
  refreshTrigger?: number;
}

const LeadDocumentsList: React.FC<LeadDocumentsListProps> = ({ 
  leadId, 
  className = '',
  showAddButton = true,
  onAddDocument,
  refreshTrigger = 0
}) => {
  const [documents, setDocuments] = useState<LeadDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dokümanları yükle
  useEffect(() => {
    const loadDocuments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // LocalStorage'dan dokümanları al
        let allDocuments: LeadDocument[] = [];
        const storedDocuments = localStorage.getItem('lead_documents');
        
        if (storedDocuments) {
          allDocuments = JSON.parse(storedDocuments);
        }
        
        // Bu lead'e ait dokümanları filtrele
        const leadDocuments = allDocuments.filter(doc => doc.leadId === leadId);
        
        // Tarihe göre sırala (en yeniler üstte)
        leadDocuments.sort((a, b) => 
          new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        );
        
        setDocuments(leadDocuments);
      } catch (err) {
        console.error('Dokümanlar yüklenirken hata:', err);
        setError('Dokümanlar yüklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDocuments();
  }, [leadId, refreshTrigger]);

  // Doküman silme
  const handleDeleteDocument = async (documentId: string) => {
    if (window.confirm('Bu dokümanı silmek istediğinizden emin misiniz?')) {
      try {
        // LocalStorage'dan tüm dokümanları al
        let allDocuments: LeadDocument[] = [];
        const storedDocuments = localStorage.getItem('lead_documents');
        
        if (storedDocuments) {
          allDocuments = JSON.parse(storedDocuments);
        }
        
        // Silinecek dokümanı filtrele
        const updatedDocuments = allDocuments.filter(doc => doc.id !== documentId);
        
        // Güncellenmiş listeyi kaydet
        localStorage.setItem('lead_documents', JSON.stringify(updatedDocuments));
        
        // State'i güncelle
        setDocuments(prev => prev.filter(doc => doc.id !== documentId));
      } catch (err) {
        console.error('Doküman silinirken hata:', err);
        alert('Doküman silinirken bir hata oluştu');
      }
    }
  };

  // Doküman tipi ikonu
  const getDocumentTypeIcon = (documentType: string) => {
    switch (documentType) {
      case 'medical_report': return <FileText className="h-5 w-5 text-blue-600" />;
      case 'passport': return <FileText className="h-5 w-5 text-red-600" />;
      case 'insurance': return <FileText className="h-5 w-5 text-green-600" />;
      case 'consent_form': return <FileText className="h-5 w-5 text-purple-600" />;
      case 'travel_document': return <FileText className="h-5 w-5 text-orange-600" />;
      case 'visa': return <FileText className="h-5 w-5 text-yellow-600" />;
      default: return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  // Dosya tipi ikonu
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return <Image className="h-4 w-4 text-blue-600" />;
    } else if (['pdf'].includes(extension || '')) {
      return <FilePdf className="h-4 w-4 text-red-600" />;
    } else if (['xls', 'xlsx', 'csv'].includes(extension || '')) {
      return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
    } else {
      return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  // Dosya boyutu formatı
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Doküman tipi adı
  const getDocumentTypeName = (documentType: string) => {
    switch (documentType) {
      case 'medical_report': return 'Tıbbi Rapor';
      case 'passport': return 'Pasaport';
      case 'insurance': return 'Sigorta Belgesi';
      case 'consent_form': return 'Onam Formu';
      case 'travel_document': return 'Seyahat Belgesi';
      case 'visa': return 'Vize';
      default: return 'Diğer';
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
          <h3 className="font-medium text-gray-900">Lead Dokümanları</h3>
          {documents.length > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {documents.length}
            </span>
          )}
        </div>
        
        {showAddButton && onAddDocument && (
          <button
            onClick={onAddDocument}
            className="text-xs flex items-center space-x-1 px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
          >
            <Upload className="h-3 w-3" />
            <span>Doküman Ekle</span>
          </button>
        )}
      </div>
      
      <div className="divide-y divide-gray-100">
        {isLoading ? (
          <div className="p-6 text-center">
            <Loader2 className="h-8 w-8 text-blue-600 mx-auto mb-2 animate-spin" />
            <p className="text-gray-600">Dokümanlar yükleniyor...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-red-600">{error}</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="p-6 text-center">
            <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Henüz doküman eklenmemiş</p>
            {showAddButton && onAddDocument && (
              <button
                onClick={onAddDocument}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                + Doküman Ekle
              </button>
            )}
          </div>
        ) : (
          documents.map((document) => (
            <div key={document.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getDocumentTypeIcon(document.documentType)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-medium text-gray-900 truncate max-w-xs">{document.fileName}</h4>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        {getDocumentTypeName(document.documentType)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => alert('Doküman görüntüleme özelliği henüz eklenmedi')}
                        className="text-gray-400 hover:text-blue-600 p-1 rounded"
                        title="Görüntüle"
                      >
                        <Eye className="h-3 w-3" />
                      </button>
                      
                      <button
                        onClick={() => alert('Doküman indirme özelliği henüz eklenmedi')}
                        className="text-gray-400 hover:text-green-600 p-1 rounded"
                        title="İndir"
                      >
                        <Download className="h-3 w-3" />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteDocument(document.id)}
                        className="text-gray-400 hover:text-red-600 p-1 rounded"
                        title="Sil"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      {getFileIcon(document.fileName)}
                      <span>{formatFileSize(document.fileSize)}</span>
                    </div>
                    <span>•</span>
                    <span>{formatDate(document.uploadedAt)}</span>
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

export default LeadDocumentsList;