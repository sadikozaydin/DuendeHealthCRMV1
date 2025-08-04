import React, { useState, useEffect } from 'react';
import { useModalBodyScroll } from '../../hooks/useModalBodyScroll';
import { X, XCircle, FileText, Upload, CheckCircle, AlertTriangle, File, Image, FileSpreadsheet, File as FilePdf, Save, Loader2 } from 'lucide-react';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadId: string;
  leadName: string;
  onDocumentUploaded?: () => void;
}

const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({ 
  isOpen, 
  onClose, 
  leadId, 
  leadName,
  onDocumentUploaded 
}) => {
  // Modal açıkken body scroll'unu kapat
  useModalBodyScroll(isOpen);
  
  const [files, setFiles] = useState<File[]>([]);
  const [documentType, setDocumentType] = useState('medical_report');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  // Dosya seçme
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles(prev => [...prev, ...fileArray]);
    }
  };

  // Dosya sürükle-bırak
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const fileArray = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...fileArray]);
    }
  };

  // Dosya silme
  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Dosya tipi ikonu
  const getFileIcon = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return <Image className="h-5 w-5 text-blue-600" />;
    } else if (['pdf'].includes(extension || '')) {
      return <FilePdf className="h-5 w-5 text-red-600" />;
    } else if (['xls', 'xlsx', 'csv'].includes(extension || '')) {
      return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
    } else {
      return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  // Dosya boyutu formatı
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Dosya yükleme
  const handleUpload = async () => {
    if (files.length === 0) {
      setError('Lütfen en az bir dosya seçin');
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Simüle edilmiş yükleme
      for (let i = 0; i <= 100; i += 10) {
        setUploadProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Gerçek uygulamada burada dosyaları Supabase Storage'a yükleyecektik
      // Şimdilik localStorage'a kaydedelim
      
      // Mevcut dokümanları al
      let documents = [];
      const storedDocuments = localStorage.getItem('lead_documents');
      if (storedDocuments) {
        documents = JSON.parse(storedDocuments);
      }
      
      // Yeni dokümanları ekle
      const newDocuments = files.map(file => ({
        id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        leadId,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        documentType,
        uploadedAt: new Date().toISOString(),
        status: 'active'
      }));
      
      documents.push(...newDocuments);
      
      // LocalStorage'a kaydet
      localStorage.setItem('lead_documents', JSON.stringify(documents));
      
      // Başarılı
      if (onDocumentUploaded) {
        onDocumentUploaded();
      }
      
      onClose();
    } catch (err) {
      console.error('Dosya yükleme hatası:', err);
      setError('Dosyalar yüklenirken bir hata oluştu');
    } finally {
      setIsUploading(false);
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
                <Upload className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Doküman Yükle</h2>
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
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Lead Bilgileri</h4>
              </div>
              <p className="text-sm text-blue-700">
                <strong>Lead:</strong> {leadName} (ID: {leadId})
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doküman Tipi *
              </label>
              <select
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="medical_report">Tıbbi Rapor</option>
                <option value="passport">Pasaport</option>
                <option value="insurance">Sigorta Belgesi</option>
                <option value="consent_form">Onam Formu</option>
                <option value="travel_document">Seyahat Belgesi</option>
                <option value="visa">Vize</option>
                <option value="other">Diğer</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dosya Yükle *
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">Dosya Yükle</h4>
                <p className="text-sm text-gray-600 mb-2">
                  Dosyayı sürükleyip bırakın veya <span className="text-blue-600">gözatın</span>
                </p>
                <p className="text-xs text-gray-500">
                  PDF, Word, Excel, JPG, PNG • Maksimum 10MB
                </p>
              </div>
            </div>
            
            {/* Selected Files */}
            {files.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Seçilen Dosyalar ({files.length})
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(file)}
                        <div>
                          <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Upload Progress */}
            {isUploading && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Yükleniyor...</span>
                  <span className="text-sm text-gray-600">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-3 bg-gray-50 flex-shrink-0">
          <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="min-w-[100px] px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
            disabled={isUploading}
          >
            <XCircle className="h-4 w-4 flex-shrink-0" />
            <span className="whitespace-nowrap">İptal</span>
          </button>
          <button
            onClick={handleUpload}
            className="min-w-[120px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
            disabled={isUploading || files.length === 0}
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" />
                <span className="whitespace-nowrap">Yükleniyor...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Yükle</span>
              </>
            )}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadModal;