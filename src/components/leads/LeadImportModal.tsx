import React, { useState } from 'react';
import { useModalBodyScroll } from '../../hooks/useModalBodyScroll';
import { 
  X, 
  XCircle,
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  HelpCircle,
  Info,
  RefreshCw
} from 'lucide-react';

interface LeadImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LeadImportModal: React.FC<LeadImportModalProps> = ({ isOpen, onClose }) => {
  // Modal açıkken body scroll'unu kapat
  useModalBodyScroll(isOpen);
  
  const [step, setStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState<{
    success: number;
    errors: number;
    duplicates: number;
  } | null>(null);
  const [mappingFields, setMappingFields] = useState({
    name: 'name',
    email: 'email',
    phone: 'phone',
    country: 'country',
    treatment: 'treatment',
    source: 'source'
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleContinue = () => {
    if (step === 1 && file) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadResult({
            success: 156,
            errors: 3,
            duplicates: 12
          });
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleFieldMapping = (field: string, value: string) => {
    setMappingFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const downloadTemplate = () => {
    // Gerçek uygulamada bir CSV şablonu indirilecek
    alert('CSV şablonu indiriliyor...');
  };

  // ESC tuşu ile kapatma fonksiyonu
  React.useEffect(() => {
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

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Lead İçe Aktarma Hakkında</h4>
                  <p className="text-sm text-blue-700">
                    CSV veya Excel formatında lead listesi yükleyebilirsiniz. Şablona uygun formatta hazırlamanız önerilir.
                  </p>
                </div>
              </div>
            </div>
            
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
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
              />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">Dosya Yükle</h4>
              <p className="text-sm text-gray-600 mb-2">
                Dosyayı sürükleyip bırakın veya <span className="text-blue-600">gözatın</span>
              </p>
              <p className="text-xs text-gray-500">
                CSV, Excel (.xlsx, .xls) • Maksimum 5MB
              </p>
              
              {file && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">{file.name}</span>
                    <span className="text-xs text-green-600">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="text-green-700 hover:text-green-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={downloadTemplate}
                className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 mx-auto"
              >
                <Download className="h-4 w-4" />
                <span>Şablon İndir</span>
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <HelpCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 mb-1">Alan Eşleştirmesi</h4>
                  <p className="text-sm text-yellow-700">
                    Dosyanızdaki sütunları sistem alanlarıyla eşleştirin. Doğru eşleştirme, verilerin düzgün içe aktarılmasını sağlar.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg">
              <div className="grid grid-cols-2 gap-4 p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İsim Alanı
                  </label>
                  <select
                    value={mappingFields.name}
                    onChange={(e) => handleFieldMapping('name', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="name">İsim</option>
                    <option value="full_name">Tam İsim</option>
                    <option value="first_name">Ad</option>
                    <option value="customer_name">Müşteri Adı</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta Alanı
                  </label>
                  <select
                    value={mappingFields.email}
                    onChange={(e) => handleFieldMapping('email', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="email">E-posta</option>
                    <option value="mail">Mail</option>
                    <option value="email_address">E-posta Adresi</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon Alanı
                  </label>
                  <select
                    value={mappingFields.phone}
                    onChange={(e) => handleFieldMapping('phone', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="phone">Telefon</option>
                    <option value="phone_number">Telefon Numarası</option>
                    <option value="mobile">Cep Telefonu</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ülke Alanı
                  </label>
                  <select
                    value={mappingFields.country}
                    onChange={(e) => handleFieldMapping('country', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="country">Ülke</option>
                    <option value="nation">Ülke Adı</option>
                    <option value="location">Lokasyon</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tedavi Alanı
                  </label>
                  <select
                    value={mappingFields.treatment}
                    onChange={(e) => handleFieldMapping('treatment', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="treatment">Tedavi</option>
                    <option value="procedure">İşlem</option>
                    <option value="service">Hizmet</option>
                    <option value="treatment_type">Tedavi Türü</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kaynak Alanı
                  </label>
                  <select
                    value={mappingFields.source}
                    onChange={(e) => handleFieldMapping('source', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="source">Kaynak</option>
                    <option value="lead_source">Lead Kaynağı</option>
                    <option value="channel">Kanal</option>
                    <option value="origin">Köken</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Info className="h-4 w-4 text-blue-600" />
                  <span>Eşleştirilemeyen alanlar için varsayılan değerler kullanılacaktır.</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setStep(1)}
                className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 whitespace-nowrap"
              >
                <X className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Geri Dön</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={onClose}
                  className="min-w-[100px] px-4 py-2 border border-gray-300 rounded-3xl text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 whitespace-nowrap"
                >
                  <XCircle className="h-4 w-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">İptal</span>
                </button>
                <button
                  onClick={handleContinue}
                  className="min-w-[120px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl transition-colors flex items-center justify-center space-x-2 whitespace-nowrap"
                >
                  <Upload className="h-4 w-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">İçe Aktar</span>
                </button>
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            {isUploading ? (
              <div className="text-center py-6">
                <RefreshCw className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">İçe Aktarma Devam Ediyor</h4>
                <p className="text-sm text-gray-600 mb-6">Lütfen işlem tamamlanana kadar bekleyin...</p>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2 max-w-md mx-auto">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600">%{uploadProgress} tamamlandı</p>
              </div>
            ) : uploadResult ? (
              <div className="text-center py-6">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-medium text-gray-900 mb-2">İçe Aktarma Tamamlandı</h4>
                <p className="text-sm text-gray-600 mb-6">Lead'ler başarıyla içe aktarıldı.</p>
                
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{uploadResult.success}</div>
                    <div className="text-sm text-green-800">Başarılı</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-xl font-bold text-yellow-600">{uploadResult.duplicates}</div>
                    <div className="text-sm text-yellow-800">Yinelenen</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-xl font-bold text-red-600">{uploadResult.errors}</div>
                    <div className="text-sm text-red-800">Hatalı</div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    onClick={onClose}
                    className="min-w-[100px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 whitespace-nowrap"
                  >
                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">Tamam</span>
                  </button>
                  <button
                    onClick={() => {
                      // Gerçek uygulamada hata raporunu indirecek
                      alert('Hata raporu indiriliyor...');
                    }}
                    className="min-w-[120px] px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 whitespace-nowrap"
                  >
                    <Download className="h-4 w-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">Hata Raporu</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        );
      
      default:
        return null;
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
                <Upload className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Lead İçe Aktar</h2>
                <div className="text-blue-100 text-sm">
                  {step === 1 ? 'Dosya yükleme' : 
                   step === 2 ? 'Alan eşleştirme' : 
                   'İçe aktarma'}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {step < 3 && (
                <span className="px-2 py-1 bg-white bg-opacity-20 text-white text-xs rounded-full">
                  Adım {step}/3
                </span>
              )}
              <button
                onClick={onClose}
                className="ml-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4 overflow-y-auto flex-grow">
          {/* Steps Indicator */}
          {step < 3 && (
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <div className={`h-1 w-12 ${
                    step > 1 ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                </div>
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                  <div className={`h-1 w-12 ${
                    step > 2 ? 'bg-blue-600' : 'bg-gray-200'
                  }`}></div>
                </div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  3
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2">
                <span>Dosya Yükleme</span>
                <span>Alan Eşleştirme</span>
                <span>İçe Aktarma</span>
              </div>
            </div>
          )}
          
          {renderStepContent()}
        </div>
        
        <div className="border-t border-gray-200 p-3 bg-gray-50 flex-shrink-0">
          {step < 3 && (
            <div className="flex justify-end space-x-3">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                <X className="h-4 w-4 flex-shrink-0" />
                <span className="whitespace-nowrap">Geri Dön</span>
              </button>
            )}
            
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2 whitespace-nowrap"
            >
              <XCircle className="h-4 w-4 flex-shrink-0" />
              <span className="whitespace-nowrap">İptal</span>
            </button>
            
            <button
              onClick={handleContinue}
              disabled={step === 1 && !file}
              className={`px-4 py-2 rounded-md text-white transition-colors flex items-center space-x-2 whitespace-nowrap ${
                step === 1 && !file ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {step === 1 ? (
                <>
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">Devam Et</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">İçe Aktar</span>
                </>
              )}
            </button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadImportModal;