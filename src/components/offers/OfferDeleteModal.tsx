import React, { useState, useEffect } from 'react';
import { useModalBodyScroll } from '../../hooks/useModalBodyScroll';
import { 
  X, 
  Trash2, 
  AlertTriangle, 
  User, 
  FileText, 
  Calendar, 
  DollarSign,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';

interface OfferDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: any;
  onConfirmDelete?: (offerId: string) => void;
}

const OfferDeleteModal: React.FC<OfferDeleteModalProps> = ({
  isOpen,
  onClose,
  offer,
  onConfirmDelete
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  
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

  // Para birimi sembolü
  const getCurrencySymbol = (currency: string) => {
    switch (currency) {
      case 'EUR': return '€';
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'TRY': return '₺';
      default: return currency;
    }
  };

  // Silme işlemi
  const handleDelete = async () => {
    if (confirmText !== 'SİL') {
      return;
    }

    setIsDeleting(true);

    try {
      // Simüle edilmiş silme işlemi
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (onConfirmDelete) {
        onConfirmDelete(offer.id || offer.offerId);
      }

      onClose();
    } catch (error) {
      console.error('Teklif silme hatası:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen || !offer) return null;

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
        <div className="sticky top-0 z-10 bg-gradient-to-r from-red-600 to-red-700 p-4 text-white shadow-md flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">🗑️ Teklif Silme Onayı</h2>
                <div className="text-red-100 text-sm">
                  Bu işlem geri alınamaz!
                </div>
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

        {/* Warning Message */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-6 mt-4">
          <div className="flex items-center text-red-800">
            <AlertTriangle className="h-5 w-5 mr-3" />
            <div>
              <span className="text-lg font-medium">⚠️ DİKKAT!</span>
              <p className="text-sm mt-1">
                Bu teklifi silmek üzeresiniz. Bu işlem <strong>geri alınamaz</strong> ve tüm ilgili veriler kalıcı olarak silinecektir.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-grow p-6">
          <div className="space-y-6">
            {/* Silinecek Teklif Bilgileri */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Silinecek Teklif Bilgileri</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    Teklif Başlığı
                  </label>
                  <div className="bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium">
                    {offer.templateName || offer.title || 'Teklif Başlığı Belirtilmemiş'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    Teklif ID
                  </label>
                  <div className="bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-mono text-sm">
                    {offer.offerId || offer.id || 'TEK-000000-202501-001'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    Hasta Adı
                  </label>
                  <div className="bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium flex items-center space-x-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <span>{offer.leadName || offer.patientName || 'Maria Rodriguez'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    Lead ID
                  </label>
                  <div className="bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium">
                    {offer.leadId || offer.patientId || 'LEAD-123456'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    Telefon Numarası
                  </label>
                  <div className="bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span>{offer.leadContact?.phone || '+34 612 345 678'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    E-posta Adresi
                  </label>
                  <div className="bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="truncate">{offer.leadContact?.email || 'maria.rodriguez@example.com'}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    Toplam Tutar
                  </label>
                  <div className="bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-bold text-lg flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                    <span>{getCurrencySymbol(offer.currency || 'EUR')}{(offer.totalAmount || 35000).toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-700 mb-1">
                    Durum
                  </label>
                  <div className="bg-white border border-blue-200 rounded-lg px-3 py-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      offer.status === 'sent' || offer.status === 'Gönderildi' ? 'bg-blue-100 text-blue-800' :
                      offer.status === 'accepted' || offer.status === 'Kabul Edildi' ? 'bg-green-100 text-green-800' :
                      offer.status === 'rejected' || offer.status === 'Reddedildi' ? 'bg-red-100 text-red-800' :
                      offer.status === 'negotiating' || offer.status === 'Müzakere' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {offer.status === 'sent' ? 'Gönderildi' :
                       offer.status === 'accepted' ? 'Kabul Edildi' :
                       offer.status === 'rejected' ? 'Reddedildi' :
                       offer.status === 'negotiating' ? 'Müzakere' :
                       offer.status || 'Gönderildi'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Silme Sonuçları Uyarısı */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-3 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Bu İşlemle Silinecek Veriler</span>
              </h3>
              
              <div className="space-y-2 text-sm text-yellow-800">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span>Teklif içeriği ve tüm hizmet detayları</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span>Gönderim geçmişi ve takip kayıtları</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span>İlgili e-posta ve mesaj logları</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span>Müşteri görüntüleme istatistikleri</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span>Teklif ile ilgili tüm notlar ve yorumlar</span>
                </div>
              </div>
            </div>

            {/* Onay Metni Girişi */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-3 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5" />
                <span>Silme İşlemini Onaylayın</span>
              </h3>
              
              <p className="text-sm text-red-700 mb-4">
                Bu işlemi onaylamak için aşağıdaki kutuya <strong>"SİL"</strong> yazın:
              </p>
              
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="SİL yazın"
                className="w-full border border-red-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-center font-bold text-lg"
                disabled={isDeleting}
              />
              
              {confirmText && confirmText !== 'SİL' && (
                <p className="text-xs text-red-600 mt-2">
                  ⚠️ Lütfen tam olarak "SİL" yazın (büyük harflerle)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-red-600 font-medium">
              ⚠️ Bu işlem geri alınamaz!
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <XCircle className="h-4 w-4" />
                <span>Hayır, İptal Et</span>
              </button>
              
              <button
                onClick={handleDelete}
                disabled={isDeleting || confirmText !== 'SİL'}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Siliniyor...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    <span>Evet, Sil</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDeleteModal;