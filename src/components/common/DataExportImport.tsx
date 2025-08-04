import React, { useState } from 'react';
import { 
  Download, 
  Upload, 
  Database, 
  AlertTriangle, 
  CheckCircle, 
  Trash2,
  Info,
  HardDrive,
  FileText
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const DataExportImport: React.FC = () => {
  const { exportAllData, importAllData, clearAllData, getStorageInfo } = useData();
  const [importFile, setImportFile] = useState<File | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const storageInfo = getStorageInfo();

  const handleExport = () => {
    try {
      const data = exportAllData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `duende-health-crm-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setMessage({ type: 'success', text: 'Veriler başarıyla dışa aktarıldı!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Dışa aktarma sırasında hata oluştu!' });
    }
  };

  const handleImport = () => {
    if (!importFile) {
      setMessage({ type: 'error', text: 'Lütfen bir dosya seçin!' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = e.target?.result as string;
        const success = importAllData(jsonData);
        
        if (success) {
          setMessage({ type: 'success', text: 'Veriler başarıyla içe aktarıldı!' });
          setImportFile(null);
          // Sayfayı yenile
          setTimeout(() => window.location.reload(), 2000);
        } else {
          setMessage({ type: 'error', text: 'İçe aktarma sırasında hata oluştu!' });
        }
      } catch (error) {
        setMessage({ type: 'error', text: 'Geçersiz dosya formatı!' });
      }
    };
    reader.readAsText(importFile);
  };

  const handleClearAll = () => {
    if (window.confirm('TÜM VERİLER SİLİNECEK! Bu işlem geri alınamaz. Emin misiniz?')) {
      if (window.confirm('Son kez soruyorum: Tüm sistem verilerini silmek istediğinizden emin misiniz?')) {
        clearAllData();
        setMessage({ type: 'success', text: 'Tüm veriler temizlendi!' });
        setTimeout(() => window.location.reload(), 2000);
      }
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Database className="h-6 w-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-900">Veri Yönetimi</h3>
      </div>

      {/* Storage Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <HardDrive className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium text-blue-900">Depolama Bilgileri</h4>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-blue-700">Kullanılan Alan:</span>
            <span className="font-medium text-blue-900">{formatBytes(storageInfo.used)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-blue-700">Toplam Alan:</span>
            <span className="font-medium text-blue-900">{formatBytes(storageInfo.total)}</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
            />
          </div>
          <div className="text-xs text-blue-600 text-center">
            %{storageInfo.percentage.toFixed(1)} kullanılıyor
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center space-x-2">
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-red-600" />
            )}
            <span className={`font-medium ${
              message.type === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {message.text}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Export */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Download className="h-5 w-5 text-green-600" />
            <h4 className="font-medium text-green-900">Veri Dışa Aktarma</h4>
          </div>
          <p className="text-sm text-green-700 mb-4">
            Tüm sistem verilerini JSON formatında yedekleyin
          </p>
          <button
            onClick={handleExport}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Verileri Dışa Aktar
          </button>
        </div>

        {/* Import */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Upload className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium text-blue-900">Veri İçe Aktarma</h4>
          </div>
          <p className="text-sm text-blue-700 mb-4">
            Yedek dosyasından verileri geri yükleyin
          </p>
          <div className="space-y-2">
            <input
              type="file"
              accept=".json"
              onChange={(e) => setImportFile(e.target.files?.[0] || null)}
              className="w-full text-sm border border-blue-300 rounded-lg px-3 py-2"
            />
            <button
              onClick={handleImport}
              disabled={!importFile}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Verileri İçe Aktar
            </button>
          </div>
        </div>

        {/* Clear All */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Trash2 className="h-5 w-5 text-red-600" />
            <h4 className="font-medium text-red-900">Veri Temizleme</h4>
          </div>
          <p className="text-sm text-red-700 mb-4">
            Tüm sistem verilerini kalıcı olarak silin
          </p>
          <button
            onClick={handleClearAll}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Tüm Verileri Sil
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-900 mb-1">Önemli Bilgiler</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Tüm veriler tarayıcınızın localStorage'ında saklanır</li>
              <li>• Tarayıcı verilerini temizlerseniz tüm bilgiler kaybolur</li>
              <li>• Düzenli olarak veri yedeği almanız önerilir</li>
              <li>• Maksimum depolama alanı yaklaşık 5MB'dır</li>
              <li>• Veriler otomatik olarak şifrelenmez, hassas bilgileri koruyun</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExportImport;