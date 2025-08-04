import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Filter, 
  Search, 
  Download,
  RefreshCw,
  Eye,
  Trash2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { getWebhookLogs, WebhookLog, triggerTestWebhook } from '../services/webhookService';
import { checkLocalStorageConnection, migrateToLocalStorage } from '../services/supabaseService';

const WebhookLogs = () => {
  const [logs, setLogs] = useState<WebhookLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<WebhookLog[]>([]);
  const [filters, setFilters] = useState({
    platform: 'all',
    success: 'all',
    tenantId: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState<WebhookLog | null>(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationResult, setMigrationResult] = useState<any>(null);

  // Logları yükle
  useEffect(() => {
    const loadLogs = () => {
      const allLogs = getWebhookLogs();
      setLogs(allLogs);
    };

    loadLogs();
    
    // Her 5 saniyede bir yenile
    const interval = setInterval(loadLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  // Supabase bağlantı durumu kontrolü
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await checkLocalStorageConnection();
      setIsSupabaseConnected(connected);
    };
    checkConnection();
  }, []);

  // Filtreleme
  useEffect(() => {
    let filtered = logs;

    if (filters.platform !== 'all') {
      filtered = filtered.filter(log => log.platform === filters.platform);
    }

    if (filters.success !== 'all') {
      filtered = filtered.filter(log => 
        filters.success === 'success' ? log.success : !log.success
      );
    }

    if (filters.tenantId !== 'all') {
      filtered = filtered.filter(log => log.tenantId === filters.tenantId);
    }

    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.leadId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.errorMessage?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.tenantId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLogs(filtered);
  }, [logs, filters, searchTerm]);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'meta': return '📘';
      case 'google': return '🔍';
      case 'tiktok': return '🎵';
      default: return '📡';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'meta': return 'bg-blue-100 text-blue-800';
      case 'google': return 'bg-red-100 text-red-800';
      case 'tiktok': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR');
  };

  const exportLogs = () => {
    const csv = [
      'Platform,Tenant,Zaman,Başarı,Lead ID,Hata,İşlem Süresi',
      ...filteredLogs.map(log => 
        `${log.platform},${log.tenantId},${log.timestamp},${log.success ? 'Evet' : 'Hayır'},${log.leadId || ''},${log.errorMessage || ''},${log.processingTime}ms`
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `webhook_logs_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearLogs = () => {
    if (window.confirm('Tüm webhook loglarını silmek istediğinizden emin misiniz?')) {
      localStorage.removeItem('webhook_logs');
      setLogs([]);
    }
  };

  // Test webhook tetikleme
  const handleTestWebhook = async (platform: 'meta' | 'google' | 'tiktok') => {
    try {
      const result = await triggerTestWebhook(platform);
      if (result.success) {
        alert(`${platform.toUpperCase()} test webhook başarıyla tetiklendi!`);
        // Logları yenile
        const allLogs = getWebhookLogs();
        setLogs(allLogs);
      }
    } catch (error) {
      alert(`Test webhook hatası: ${error.message}`);
    }
  };

  // LocalStorage'dan Supabase'e migration
  const handleMigration = async () => {
    if (!window.confirm('LocalStorage verilerini Supabase\'e taşımak istediğinizden emin misiniz?')) {
      return;
    }

    setIsMigrating(true);
    try {
      const result = await migrateToLocalStorage();
      setMigrationResult(result);
      alert(`Migration tamamlandı! ${result.migrated} lead taşındı, ${result.errors} hata.`);
    } catch (error) {
      alert(`Migration hatası: ${error.message}`);
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Webhook Logları</h1>
          <p className="text-gray-600 mt-1">Platform entegrasyonu ve webhook aktivite takibi</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={exportLogs}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>CSV İndir</span>
          </button>
          <button
            onClick={clearLogs}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>Logları Temizle</span>
          </button>
          <button
            onClick={handleMigration}
            disabled={isMigrating || !isSupabaseConnected}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <RefreshCw className={`h-4 w-4 ${isMigrating ? 'animate-spin' : ''}`} />
            <span>{isMigrating ? 'Taşınıyor...' : 'Supabase\'e Taşı'}</span>
          </button>
        </div>
      </div>

      {/* Supabase Connection Status */}
      <div className={`p-4 rounded-lg border ${isSupabaseConnected ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isSupabaseConnected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
          <span className={`font-medium ${isSupabaseConnected ? 'text-green-800' : 'text-yellow-800'}`}>
            Supabase Durumu: {isSupabaseConnected ? 'Bağlı' : 'LocalStorage Modu'}
          </span>
        </div>
        {!isSupabaseConnected && (
          <p className="text-yellow-700 text-sm mt-1">
            Supabase bağlantısı yok. Veriler LocalStorage'da saklanıyor.
          </p>
        )}
      </div>

      {/* Test Webhook Buttons */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">🧪 Webhook Test Aracı</h3>
        <p className="text-sm text-blue-700 mb-4">
          Gerçek webhook entegrasyonlarını test etmek için aşağıdaki butonları kullanın. Her test, gerçekçi payload ile webhook endpoint'inizi çağırır.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleTestWebhook('meta')}
            className="flex flex-col items-center justify-center space-y-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-colors"
          >
            <span className="text-2xl">📘</span>
            <span className="font-medium">Meta (Facebook/Instagram)</span>
            <span className="text-xs opacity-80">X-Hub-Signature-256</span>
          </button>
          <button
            onClick={() => handleTestWebhook('google')}
            className="flex flex-col items-center justify-center space-y-2 bg-red-600 hover:bg-red-700 text-white p-4 rounded-lg transition-colors"
          >
            <span className="text-2xl">🔍</span>
            <span className="font-medium">Google Ads</span>
            <span className="text-xs opacity-80">Authorization: Bearer</span>
          </button>
          <button
            onClick={() => handleTestWebhook('tiktok')}
            className="flex flex-col items-center justify-center space-y-2 bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-lg transition-colors"
          >
            <span className="text-2xl">🎵</span>
            <span className="font-medium">TikTok Ads</span>
            <span className="text-xs opacity-80">X-Tiktok-Signature</span>
          </button>
        </div>
        
        {/* Advanced Test Options */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-3">🔧 Gelişmiş Test Seçenekleri</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">Test Tenant ID</label>
              <select className="w-full border border-blue-300 rounded px-3 py-2 text-sm">
                <option value="tenant-001">tenant-001 (Default)</option>
                <option value="tenant-sagliktur">tenant-sagliktur</option>
                <option value="tenant-medicalpark">tenant-medicalpark</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-blue-800 mb-2">Test Senaryosu</label>
              <select className="w-full border border-blue-300 rounded px-3 py-2 text-sm">
                <option value="success">Başarılı Lead</option>
                <option value="missing_email">E-posta Eksik</option>
                <option value="invalid_phone">Geçersiz Telefon</option>
                <option value="duplicate_lead">Duplicate Lead</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Webhook</p>
              <p className="text-3xl font-bold text-blue-600">{logs.length}</p>
            </div>
            <Activity className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Başarılı</p>
              <p className="text-3xl font-bold text-green-600">
                {logs.filter(log => log.success).length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Başarısız</p>
              <p className="text-3xl font-bold text-red-600">
                {logs.filter(log => !log.success).length}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ort. İşlem Süresi</p>
              <p className="text-3xl font-bold text-purple-600">
                {logs.length > 0 ? Math.round(logs.reduce((acc, log) => acc + log.processingTime, 0) / logs.length) : 0}ms
              </p>
            </div>
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Log ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <select
              value={filters.platform}
              onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">Tüm Platformlar</option>
              <option value="meta">Meta</option>
              <option value="google">Google</option>
              <option value="tiktok">TikTok</option>
            </select>
            
            <select
              value={filters.success}
              onChange={(e) => setFilters({ ...filters, success: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="success">Başarılı</option>
              <option value="error">Başarısız</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform & Tenant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zaman
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lead ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlem Süresi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getPlatformIcon(log.platform)}</span>
                      <div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlatformColor(log.platform)}`}>
                          {log.platform.toUpperCase()}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">{log.tenantId}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(log.timestamp)}</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {log.success ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm ${log.success ? 'text-green-600' : 'text-red-600'}`}>
                        {log.success ? 'Başarılı' : 'Başarısız'}
                      </span>
                    </div>
                    {log.errorMessage && (
                      <div className="text-xs text-red-500 mt-1 truncate max-w-xs">
                        {log.errorMessage}
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">
                      {log.leadId || '-'}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.processingTime}ms</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="text-blue-600 hover:text-blue-700 p-1 rounded"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Henüz webhook logu yok</p>
          </div>
        )}
      </div>

      {/* Log Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Webhook Log Detayı</h3>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Platform</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPlatformColor(selectedLog.platform)}`}>
                    {selectedLog.platform.toUpperCase()}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Durum</label>
                  <div className="flex items-center space-x-2">
                    {selectedLog.success ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-600" />
                    )}
                    <span>{selectedLog.success ? 'Başarılı' : 'Başarısız'}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tenant ID</label>
                  <span className="text-sm text-gray-900">{selectedLog.tenantId}</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">İşlem Süresi</label>
                  <span className="text-sm text-gray-900">{selectedLog.processingTime}ms</span>
                </div>
              </div>
              
              {selectedLog.leadId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Lead ID</label>
                  <span className="text-sm font-mono text-gray-900">{selectedLog.leadId}</span>
                </div>
              )}
              
              {selectedLog.errorMessage && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hata Mesajı</label>
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <span className="text-sm text-red-800">{selectedLog.errorMessage}</span>
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payload</label>
                <pre className="bg-gray-50 border border-gray-200 rounded p-3 text-xs overflow-auto max-h-60">
                  {JSON.stringify(selectedLog.payload, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Production Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center space-x-2">
          <Info className="h-5 w-5" />
          <span>🚀 Production Hazırlığı</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">🔗 Webhook Endpoint'leri</h4>
            <div className="space-y-2 text-xs">
              <div className="bg-gray-100 p-2 rounded">
                <code>POST /api/webhooks/meta</code>
                <span className="text-gray-600 ml-2">(X-Hub-Signature)</span>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <code>POST /api/webhooks/google</code>
                <span className="text-gray-600 ml-2">(Bearer Token)</span>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <code>POST /api/webhooks/tiktok</code>
                <span className="text-gray-600 ml-2">(X-Tiktok-Signature)</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">🗄️ Veritabanı Durumu</h4>
            <div className="space-y-2 text-xs">
              <div className={`p-2 rounded ${isSupabaseConnected ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                <strong>Supabase:</strong> {isSupabaseConnected ? 'Bağlı ✅' : 'Bağlı Değil ⚠️'}
              </div>
              <div className="bg-blue-100 text-blue-800 p-2 rounded">
                <strong>LocalStorage:</strong> {JSON.parse(localStorage.getItem('crm_leads') || '[]').length} lead
              </div>
              {migrationResult && (
                <div className="bg-purple-100 text-purple-800 p-2 rounded">
                  <strong>Son Migration:</strong> {migrationResult.migrated} başarılı, {migrationResult.errors} hata
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebhookLogs;