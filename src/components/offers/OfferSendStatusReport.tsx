import React, { useEffect } from 'react';
import { useModalBodyScroll } from '../../hooks/useModalBodyScroll';
import { 
  X, 
  CheckCircle, 
  Send, 
  Mail, 
  MessageCircle, 
  Link, 
  Download, 
  Eye, 
  Copy, 
  Clock,
  XCircle
} from 'lucide-react';

interface SendResult {
  success: boolean;
  channels: string[];
  sentAt: string;
  trackingId: string;
  trackingUrl?: string;
  messagesSent: number;
  estimatedDelivery: string;
  recipient: {
    name: string;
    email: string;
    phone: string;
  };
  template: string;
  options: {
    attachPdf: boolean;
    trackViewing: boolean;
    sendCopyToMe: boolean;
  };
}

interface OfferSendStatusReportProps {
  isOpen: boolean;
  onClose: () => void;
  sendResult: SendResult;
  onComplete?: () => void;
}

const OfferSendStatusReport: React.FC<OfferSendStatusReportProps> = ({
  isOpen,
  onClose,
  sendResult,
  onComplete
}) => {
  // Modal açıkken body scroll'unu kapat
  useModalBodyScroll(isOpen);

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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] transition-opacity duration-300" 
      onClick={handleBackdropClick}
      style={{ margin: 0, padding: 0, top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full flex flex-col max-h-[85vh]" 
        style={{ margin: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white shadow-md flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">📊 Gönderim Durum Raporu</h2>
                <div className="text-green-100 text-sm">
                  Teklif başarıyla gönderildi
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mx-6 mt-6">
          <div className="flex items-center text-green-800">
            <CheckCircle className="h-5 w-5 mr-3" />
            <span className="text-lg font-medium">
              ✅ Teklif başarıyla {sendResult.messagesSent} kanal üzerinden gönderildi!
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-grow p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sol Panel - Gönderim Detayları */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Send className="h-5 w-5 text-blue-600" />
                  <span>Gönderim Detayları</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Alıcı:</span>
                    <span className="font-medium text-gray-900">{sendResult.recipient.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gönderim Zamanı:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(sendResult.sentAt).toLocaleString('tr-TR')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kanal Sayısı:</span>
                    <span className="font-medium text-gray-900">{sendResult.messagesSent} kanal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Şablon:</span>
                    <span className="font-medium text-gray-900">{sendResult.template}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Takip ID:</span>
                    <span className="font-mono text-sm bg-blue-100 px-2 py-1 rounded text-blue-900">
                      {sendResult.trackingId}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Gönderim Kanalları */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">📡 Kullanılan Kanallar</h3>
                <div className="space-y-3">
                  {sendResult.channels.map((channel, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {channel === 'email' && <Mail className="h-5 w-5 text-blue-600" />}
                        {channel === 'whatsapp' && <MessageCircle className="h-5 w-5 text-green-600" />}
                        {channel === 'customLink' && <Link className="h-5 w-5 text-purple-600" />}
                        {channel === 'downloadPdf' && <Download className="h-5 w-5 text-orange-600" />}
                        <span className="font-medium text-gray-900">
                          {channel === 'email' ? 'E-posta' :
                           channel === 'whatsapp' ? 'WhatsApp' :
                           channel === 'customLink' ? 'Özel Bağlantı' :
                           channel === 'downloadPdf' ? 'PDF İndirme' : channel}
                        </span>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sağ Panel - Takip ve Seçenekler */}
            <div className="space-y-6">
              {/* Takip Bilgileri */}
              {sendResult.options.trackViewing && sendResult.trackingUrl && (
                <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-purple-600" />
                    <span>Görüntüleme Takibi</span>
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-800">Takip Aktif</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Teklif görüntülendiğinde bildirim alacaksınız
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Takip URL'si:
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={sendResult.trackingUrl}
                          readOnly
                          className="flex-1 text-sm bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 font-mono"
                        />
                        <button
                          onClick={() => navigator.clipboard.writeText(sendResult.trackingUrl!)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Kopyala"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Aktif Seçenekler */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">⚙️ Aktif Seçenekler</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    {sendResult.options.attachPdf ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400" />
                    )}
                    <span className={`${sendResult.options.attachPdf ? 'text-green-700' : 'text-gray-500'}`}>
                      PDF otomatik eklendi
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {sendResult.options.trackViewing ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400" />
                    )}
                    <span className={`${sendResult.options.trackViewing ? 'text-green-700' : 'text-gray-500'}`}>
                      Görüntüleme takibi
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {sendResult.options.sendCopyToMe ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-gray-400" />
                    )}
                    <span className={`${sendResult.options.sendCopyToMe ? 'text-green-700' : 'text-gray-500'}`}>
                      Kopya size gönderildi
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Tahmini Teslimat */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span>Tahmini Teslimat</span>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-800">E-posta: Anında teslim edildi</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-yellow-800">WhatsApp: 1-2 dakika içinde</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              ✅ Gönderim başarıyla tamamlandı ve log kaydı oluşturuldu
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Raporu Kapat
              </button>
              <button
                onClick={() => {
                  if (onComplete) {
                    onComplete();
                  }
                  onClose();
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tamamla
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferSendStatusReport;