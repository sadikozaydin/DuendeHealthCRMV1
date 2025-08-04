import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Trash2,
  Plus,
  Search,
  Filter,
  File,
  Image,
  FileSpreadsheet,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { getEmployeeFiles, logAuditEvent, EmployeeFile } from '../../services/hrService';

interface EmployeeDocumentsProps {
  employeeId: string;
  employeeName: string;
  canEdit?: boolean;
}

const EmployeeDocuments: React.FC<EmployeeDocumentsProps> = ({ 
  employeeId, 
  employeeName, 
  canEdit = true 
}) => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<EmployeeFile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, [employeeId]);

  const loadDocuments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getEmployeeFiles(employeeId);
      if (result.success) {
        setDocuments(result.data);
      } else {
        setError(result.error || 'Dokümanlar yüklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Error loading documents:', error);
      setError('Dokümanlar yüklenirken beklenmeyen hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels = {
      contract: 'İş Sözleşmesi',
      id_card: 'Kimlik Belgesi',
      diploma: 'Diploma/Sertifika',
      certificate: 'Sertifika',
      medical: 'Sağlık Raporu',
      other: 'Diğer'
    };
    return labels[type] || type;
  };

  const getDocumentTypeColor = (type: string) => {
    const colors = {
      contract: 'bg-blue-100 text-blue-800',
      id_card: 'bg-green-100 text-green-800',
      diploma: 'bg-purple-100 text-purple-800',
      certificate: 'bg-orange-100 text-orange-800',
      medical: 'bg-red-100 text-red-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || colors.other;
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) {
      return <FileText className="h-5 w-5 text-red-600" />;
    } else if (mimeType.includes('image')) {
      return <Image className="h-5 w-5 text-blue-600" />;
    } else if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) {
      return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
    } else {
      return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.file_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.file_type === filterType;
    return matchesSearch && matchesType;
  });

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const handleDownload = (document: Document) => {
    // Log audit event
    logAuditEvent('document_downloaded', 'employee_file', document.id, {
      employee_id: employeeId,
      file_name: document.file_name,
      downloaded_by: user?.id
    });
    
    console.log('Downloading document:', document.file_name);
    alert(`${document.file_name} dosyası indiriliyor...`);
  };

  const handleView = (document: EmployeeFile) => {
    // Log audit event
    logAuditEvent('document_viewed', 'employee_file', document.id, {
      employee_id: employeeId,
      file_name: document.file_name,
      viewed_by: user?.id
    });
    
    console.log('Viewing document:', document.file_name);
    alert(`${document.file_name} dosyası görüntüleniyor...`);
  };

  const handleDelete = (documentId: string) => {
    if (window.confirm('Bu dokümanı silmek istediğinizden emin misiniz?')) {
      // Log audit event
      logAuditEvent('document_deleted', 'employee_file', documentId, {
        employee_id: employeeId,
        deleted_by: user?.id
      });
      
      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Özlük Dosyası</h3>
          <p className="text-sm text-gray-600">{employeeName} - Personel Belgeleri</p>
        </div>
        {canEdit && (
          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Belge Ekle</span>
          </button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Belge ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Tüm Belgeler</option>
          <option value="contract">İş Sözleşmesi</option>
          <option value="id_card">Kimlik Belgesi</option>
          <option value="diploma">Diploma</option>
          <option value="certificate">Sertifika</option>
          <option value="medical">Sağlık Raporu</option>
          <option value="other">Diğer</option>
        </select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">Dokümanlar yükleniyor...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-800">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Documents Grid */}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((document) => (
          <div key={document.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                {getFileIcon(document.mime_type || '')}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{document.file_name}</h4>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getDocumentTypeColor(document.file_type)}`}>
                    {getDocumentTypeLabel(document.file_type)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleView(document)}
                  className="text-blue-600 hover:text-blue-800 p-1 rounded"
                  title="Görüntüle"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDownload(document)}
                  className="text-green-600 hover:text-green-800 p-1 rounded"
                  title="İndir"
                >
                  <Download className="h-4 w-4" />
                </button>
                {canEdit && (
                  <button
                    onClick={() => handleDelete(document.id)}
                    className="text-red-600 hover:text-red-800 p-1 rounded"
                    title="Sil"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="space-y-2 text-xs text-gray-500">
              <div>Boyut: {formatFileSize(document.file_size || 0)}</div>
              <div>Yüklenme: {formatDate(document.uploaded_at)}</div>
              <div>Yükleyen: {document.uploaded_by || 'Sistem'}</div>
            </div>
          </div>
        ))}
        </div>
      )}

      {filteredDocuments.length === 0 && !isLoading && !error && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belge Bulunamadı</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterType !== 'all' 
              ? 'Arama kriterlerinize uygun belge bulunamadı.' 
              : 'Henüz belge yüklenmemiş.'}
          </p>
          {canEdit && (
            <button
              onClick={handleUpload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              İlk Belgeyi Ekle
            </button>
          )}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Yeni Belge Ekle</h3>
            <p className="text-gray-600 mb-4">
              Belge yükleme özelliği yakında eklenecek!
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                İptal
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDocuments;