import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate, formatDateTime } from '../../utils/dateHelpers';
import { useModalBodyScroll } from '../../hooks/useModalBodyScroll';
import { Offer, OfferPreviewSection, UserPermissions } from '../../types/offerTypes';
import { getLeadById } from '../../services/leadService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import OfferSendModal from './OfferSendModal';
import { 
  X, 
  User, 
  Calendar, 
  DollarSign, 
  CreditCard, 
  Mail, 
  Phone, 
  Globe, 
  FileText, 
  Download, 
  Send, 
  Edit,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Settings,
  Loader2,
  Shield,
  Star,
  Flag,
  MapPin
} from 'lucide-react';

interface OfferPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: Offer;
  sections?: OfferPreviewSection[];
  userPermissions?: UserPermissions;
  onEdit?: (offer: any) => void;
  onSend?: (offer: any) => void;
  onDownload?: (offer: any) => void;
  onStatusChange?: (offerId: string, status: string) => void;
  onPreviewPDF?: (offer: any) => void;
  isLoading?: boolean;
  loadingAction?: string;
}

const OfferPreviewModal: React.FC<OfferPreviewModalProps> = ({
  isOpen,
  onClose,
  offer,
  sections,
  userPermissions = {},
  onEdit,
  onSend,
  onDownload,
  onStatusChange,
  onPreviewPDF,
  isLoading = false,
  loadingAction = ''
}) => {
  const { t } = useTranslation();
  
  // Send modal state
  const [showSendModal, setShowSendModal] = useState(false);
  
  // Lead data state
  const [leadData, setLeadData] = useState<any>(null);
  const [isLoadingLead, setIsLoadingLead] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  
  // Modal açıkken body scroll'unu kapat
  useModalBodyScroll(isOpen);
  
  // Gizlilik kontrolleri (KVKK uyumlu)
  const isPublic = offer?.sharedExternally || false;
  
  // Load lead data when modal opens
  useEffect(() => {
    if (isOpen && offer && (offer.leadId || offer.patientId)) {
      const loadLeadData = async () => {
        const leadId = offer.leadId || offer.patientId || '';
        
        setIsLoadingLead(true);
        setLeadError(null);
        
        try {
          console.log('Fetching lead data for preview:', leadId);
          const leadResult = await getLeadById(leadId);
          
          if (leadResult.success && leadResult.data) {
            setLeadData(leadResult.data);
            console.log('Lead data loaded for preview:', leadResult.data);
          } else {
            console.error('Lead data fetch failed:', leadResult.error);
            setLeadError(leadResult.error || 'Lead bilgileri bulunamadı');
          }
        } catch (error) {
          console.error('Error loading lead data:', error);
          setLeadError('Lead bilgileri yüklenirken bir hata oluştu');
        } finally {
          setIsLoadingLead(false);
        }
      };
      
      loadLeadData();
    }
  }, [isOpen, offer]);
  
  // KVKK Uyumlu maskeleme fonksiyonları
  const maskPhone = useCallback((phone: string) => {
    if (!phone) return 'Belirtilmemiş';
    return isPublic ? phone.replace(/.(?=.{4})/g, '*') : phone;
  }, [isPublic]);

  const maskEmail = useCallback((email: string) => {
    if (!email) return 'Belirtilmemiş';
    if (isPublic) {
      return email.replace(/^(.)(.*)(@.*)$/, (_, a, b, c) => a + '*'.repeat(b.length) + c);
    }
    return email;
  }, [isPublic]);

  // ESC tuşu ile modal kapatma
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Modal backdrop click handler
  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  // Geçerlilik süresi sayacı
  const getValidityCountdown = useCallback(() => {
    if (!offer?.validUntil) return null;
    
    try {
      const validDate = new Date(offer.validUntil);
      const now = new Date();
      const diffTime = validDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) {
        return { text: 'Süresi dolmuş', color: 'text-red-600', bgColor: 'bg-red-50' };
      } else if (diffDays === 0) {
        return { text: 'Bugün sona eriyor', color: 'text-orange-600', bgColor: 'bg-orange-50' };
      } else if (diffDays <= 3) {
        return { text: `${diffDays} gün kaldı`, color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
      } else {
        return { text: `${diffDays} gün kaldı`, color: 'text-green-600', bgColor: 'bg-green-50' };
      }
    } catch (error) {
      return null;
    }
  }, [offer?.validUntil]);

  // Para birimi sembolü
  const getCurrencySymbol = useCallback((currency: string) => {
    switch (currency) {
      case 'EUR': return '€';
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'TRY': return '₺';
      default: return currency;
    }
  }, []);

  // Durum rengi
  const getStatusColorClass = useCallback((status: string) => {
    switch (status) {
      case 'Gönderildi': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Kabul Edildi': return 'bg-green-100 text-green-800 border-green-200';
      case 'Müzakere': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Reddedildi': return 'bg-red-100 text-red-800 border-red-200';
      case 'Süresi Doldu': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }, []);

  // Varsayılan bölümler
  const createDefaultSections = (): OfferPreviewSection[] => [
    {
      id: 'patient-info',
      title: t('offer.sections.patientInfo'),
      icon: <User className="h-5 w-5 text-blue-600" />,
      visible: true,
      render: (offer: Offer) => (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-blue-600" />
            <h4 className="font-medium text-blue-900">Lead (Hasta) Bilgileri</h4>
            {isLoadingLead && (
              <div className="flex items-center space-x-2 ml-auto">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <span className="text-xs text-blue-700">Hasta bilgileri yükleniyor...</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Hasta Adı ve Soyadı
              </label>
              <div className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium">
                {leadData ? `${leadData.first_name || ''} ${leadData.last_name || ''}`.trim() : 
                 offer.leadName || offer.patientName || 'Yükleniyor...'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Lead ID
              </label>
              <div className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium">
                {leadData?.lead_id || offer.leadId || offer.patientId || 'Yükleniyor...'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Teklif ID
              </label>
              <div className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium">
                {offer.offerId || offer.id || 'Otomatik oluşturulacak'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Telefon Numarası
              </label>
              <div className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>{leadData?.phone || offer.leadContact?.phone || 'Belirtilmemiş'}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                E-posta Adresi
              </label>
              <div className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="truncate">{leadData?.email || offer.leadContact?.email || 'Belirtilmemiş'}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                Lead Dili
              </label>
              <div className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 font-medium flex items-center space-x-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <span>{leadData?.language || 'Belirtilmemiş'}</span>
              </div>
            </div>
          </div>
          
          {/* Error state */}
          {leadError && (
            <div className="mt-3 p-2 bg-red-100 rounded text-xs text-red-600">
              Hata: {leadError}
            </div>
          )}
          
          {/* Debug bilgisi (geliştirme aşamasında) */}
          {process.env.NODE_ENV === 'development' && leadData && (
            <div className="mt-3 p-2 bg-gray-100 rounded text-xs text-gray-600">
              Debug: leadName: "{leadData.first_name} {leadData.last_name}", leadId: "{leadData.lead_id}"
            </div>
          )}
          
          {/* KVKK Uyarısı (Sadece public ise) */}
          {isPublic && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-xs text-yellow-800">
                    {t('offer.messages.privacyMasked')}
                    <a href="/privacy" className="underline ml-1 hover:text-yellow-900">
                      {t('offer.messages.privacyPolicy')}
                    </a>
                  </span>
                </div>
              </div>
             </div>
          )}
        </div>
      )
    },
    {
      id: 'services',
      title: t('offer.sections.services'),
      icon: <FileText className="h-5 w-5 text-green-600" />,
      visible: true,
      render: (offer: Offer) => (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-700">
                  {t('offer.fields.service')}
                </th>
                <th className="text-left py-2 text-sm font-medium text-gray-700">
                  {t('offer.fields.description')}
                </th>
                <th className="text-right py-2 text-sm font-medium text-gray-700">
                  {t('offer.fields.amount')}
                </th>
              </tr>
            </thead>
            <tbody>
              {offer.services?.length > 0 ? (
                offer.services.map((service: any, index: number) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 text-sm font-medium text-gray-900">
                      {service.name || t('offer.messages.noServices')}
                    </td>
                    <td className="py-3 text-sm text-gray-600">
                      {service.description || '-'}
                    </td>
                    <td className="py-3 text-sm font-medium text-gray-900 text-right">
                      {getCurrencySymbol(service.currency || offer.currency)}
                      {(service.amount || service.price || 0).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500">
                    <div className="flex flex-col items-center space-y-2">
                      <AlertTriangle className="h-8 w-8 text-gray-300" />
                      <span className="text-sm">{t('offer.messages.noServices')}</span>
                      <span className="text-xs text-gray-400">{t('offer.messages.addServices')}</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300">
                <td colSpan="2" className="py-3 text-right font-bold text-gray-900">
                  {t('offer.fields.total')}:
                </td>
                <td className="py-3 text-right font-bold text-xl text-blue-600">
                  {getCurrencySymbol(offer.currency || 'EUR')}
                  {(offer.totalAmount || offer.basePrice || 0).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )
    },
    {
      id: 'payment-terms',
      title: t('offer.sections.paymentTerms'),
      icon: <CreditCard className="h-5 w-5 text-purple-600" />,
      visible: true,
      render: (offer: Offer) => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-purple-800 mb-3">{t('offer.fields.paymentMethod')}</h5>
            <div className="space-y-2">
              {offer.paymentTerms ? (
                <p className="text-purple-700">{offer.paymentTerms}</p>
              ) : (
                <>
                  <p className="text-purple-700 flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    <span>{t('offer.paymentTerms.fullAdvance')}</span>
                  </p>
                  <p className="text-purple-700 flex items-center space-x-2">
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    <span>{t('offer.paymentTerms.beforeTreatment')}</span>
                  </p>
                </>
              )}
            </div>
          </div>
          
          <div>
            <h5 className="font-medium text-purple-800 mb-3">{t('offer.fields.contactInfo')}</h5>
            <div className="space-y-2 text-sm text-purple-700">
              <p className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-purple-600" />
                <span>info@duendehealth.com</span>
              </p>
              <p className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-purple-600" />
                <span>+90 212 XXX XX XX</span>
              </p>
              <p className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-purple-600" />
                <span>www.duendehealth.com</span>
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'status-change',
      title: t('offer.sections.statusChange'),
      icon: <Settings className="h-5 w-5 text-indigo-600" />,
      visible: !!onStatusChange && userPermissions.canChangeStatus !== false,
      render: (offer: Offer) => (
        <div>
          <select
            value={offer.status || t('offer.status.sent')}
            onChange={(e) => onStatusChange && onStatusChange(offer.id || offer.offerId, e.target.value)}
            className="w-full md:w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            <option value="Gönderildi">{t('offer.status.sent')}</option>
            <option value="Kabul Edildi">{t('offer.status.accepted')}</option>
            <option value="Müzakere">{t('offer.status.negotiating')}</option>
            <option value="Reddedildi">{t('offer.status.rejected')}</option>
            <option value="Süresi Doldu">{t('offer.status.expired')}</option>
          </select>
        </div>
      )
    }
  ];
  // Geliştirilmiş null kontrolü
  if (!isOpen || !offer || Object.keys(offer).length === 0) return null;

  // PDF oluşturma fonksiyonu
  const generatePDF = async () => {
    try {
      // PDF içeriği için özel bir div oluştur
      const pdfContent = document.createElement('div');
      pdfContent.style.width = '210mm'; // A4 genişliği
      pdfContent.style.padding = '20mm';
      pdfContent.style.backgroundColor = 'white';
      pdfContent.style.fontFamily = 'Arial, sans-serif';
      pdfContent.style.fontSize = '12px';
      pdfContent.style.lineHeight = '1.5';
      
      // PDF içeriğini oluştur
      pdfContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3B82F6; padding-bottom: 20px;">
          <h1 style="color: #1F2937; font-size: 24px; margin: 0;">${offer.title || t('offer.title')}</h1>
          <p style="color: #6B7280; margin: 10px 0 0 0;">${t('offer.offerId')}: ${offer.offerId || offer.id || 'TEK-000000-202501-001'}</p>
          <p style="color: #6B7280; margin: 5px 0 0 0;">${formatDate(offer.createdAt || offer.offerDate)}</p>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #1F2937; font-size: 16px; margin-bottom: 15px; border-bottom: 1px solid #E5E7EB; padding-bottom: 5px;">
            ${t('offer.sections.patientInfo')}
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 30%;">${t('offer.fields.fullName')}:</td>
              <td style="padding: 8px 0;">${offer.leadName || offer.patientName || t('offer.patientName')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">${t('offer.fields.patientId')}:</td>
              <td style="padding: 8px 0;">${offer.leadId || offer.patientId || t('offer.patientName')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">${t('offer.fields.phone')}:</td>
              <td style="padding: 8px 0;">${maskPhone(offer.leadContact?.phone || '')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">${t('offer.fields.email')}:</td>
              <td style="padding: 8px 0;">${maskEmail(offer.leadContact?.email || '')}</td>
            </tr>
          </table>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #1F2937; font-size: 16px; margin-bottom: 15px; border-bottom: 1px solid #E5E7EB; padding-bottom: 5px;">
            ${t('offer.sections.services')}
          </h2>
          <table style="width: 100%; border-collapse: collapse; border: 1px solid #E5E7EB;">
            <thead>
              <tr style="background-color: #F9FAFB;">
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #E5E7EB; font-weight: bold;">${t('offer.fields.service')}</th>
                <th style="padding: 12px; text-align: left; border-bottom: 1px solid #E5E7EB; font-weight: bold;">${t('offer.fields.description')}</th>
                <th style="padding: 12px; text-align: right; border-bottom: 1px solid #E5E7EB; font-weight: bold;">${t('offer.fields.amount')}</th>
              </tr>
            </thead>
            <tbody>
              ${offer.services?.length > 0 ? offer.services.map((service, index) => `
                <tr style="border-bottom: 1px solid #F3F4F6;">
                  <td style="padding: 12px; border-bottom: 1px solid #F3F4F6;">${service.name || t('offer.messages.noServices')}</td>
                  <td style="padding: 12px; border-bottom: 1px solid #F3F4F6;">${service.description || '-'}</td>
                  <td style="padding: 12px; text-align: right; border-bottom: 1px solid #F3F4F6; font-weight: bold;">
                    ${getCurrencySymbol(service.currency || offer.currency)}${(service.amount || service.price || 0).toLocaleString()}
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="3" style="padding: 20px; text-align: center; color: #6B7280;">${t('offer.messages.noServices')}</td>
                </tr>
              `}
            </tbody>
            <tfoot>
              <tr style="background-color: #F9FAFB; border-top: 2px solid #3B82F6;">
                <td colspan="2" style="padding: 15px; text-align: right; font-weight: bold; font-size: 14px;">${t('offer.fields.total')}:</td>
                <td style="padding: 15px; text-align: right; font-weight: bold; font-size: 16px; color: #3B82F6;">
                  ${getCurrencySymbol(offer.currency || 'EUR')}${(offer.totalAmount || offer.basePrice || 0).toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div style="margin-bottom: 25px;">
          <h2 style="color: #1F2937; font-size: 16px; margin-bottom: 15px; border-bottom: 1px solid #E5E7EB; padding-bottom: 5px;">
            ${t('offer.sections.paymentTerms')}
          </h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
              <h3 style="font-weight: bold; color: #7C3AED; margin-bottom: 10px;">${t('offer.fields.paymentMethod')}</h3>
              <p style="color: #7C3AED; margin: 0;">
                ${offer.paymentTerms || `${t('offer.paymentTerms.fullAdvance')}<br>${t('offer.paymentTerms.beforeTreatment')}`}
              </p>
            </div>
            <div>
              <h3 style="font-weight: bold; color: #7C3AED; margin-bottom: 10px;">${t('offer.fields.contactInfo')}</h3>
              <p style="color: #7C3AED; margin: 0;">
                📧 info@duendehealth.com<br>
                📞 +90 212 XXX XX XX<br>
                🌐 www.duendehealth.com
              </p>
            </div>
          </div>
        </div>
        
        ${offer.notes ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: #1F2937; font-size: 16px; margin-bottom: 15px; border-bottom: 1px solid #E5E7EB; padding-bottom: 5px;">
              ${t('offer.sections.notes')}
            </h2>
            <div style="background-color: #FEF3C7; border: 1px solid #F59E0B; padding: 15px; border-radius: 8px;">
              <p style="margin: 0; color: #92400E; white-space: pre-line;">${offer.notes}</p>
            </div>
          </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; text-align: center;">
          <p style="color: #6B7280; font-size: 10px; margin: 0;">
            ${t('offer.messages.legalText', { validUntil: formatDate(offer.validUntil) })}
          </p>
          <p style="color: #6B7280; font-size: 10px; margin: 10px 0 0 0;">
            ${t('offer.messages.createdBy', { 
              createdBy: offer.createdBy || 'Sistem',
              date: formatDateTime(offer.createdAt || offer.offerDate)
            })}
          </p>
        </div>
      `;
      
      // Geçici olarak body'ye ekle
      document.body.appendChild(pdfContent);
      
      // Canvas'a çevir
      const canvas = await html2canvas(pdfContent, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      // PDF oluştur
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      
      const imgWidth = 210; // A4 genişliği (mm)
      const pageHeight = 297; // A4 yüksekliği (mm)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      
      let position = 0;
      
      // İlk sayfa
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      // Eğer içerik birden fazla sayfaya sığmıyorsa
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      // Geçici elementi kaldır
      document.body.removeChild(pdfContent);
      
      // PDF'i indir
      const fileName = `Teklif_${offer.offerId || offer.id || 'TEK-000000'}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
    } catch (error) {
      console.error('PDF oluşturma hatası:', error);
      alert('PDF oluşturulurken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  const validityCountdown = getValidityCountdown();
  const isExpired = validityCountdown?.text === 'Süresi dolmuş' || offer.status === 'Süresi Doldu';
  
  // Bölümleri oluştur
  const sectionsToRender = sections || createDefaultSections();
  
  // Sadece görünür bölümleri filtrele
  const visibleSections = sectionsToRender.filter(section => section.visible !== false);

  return (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4"
      style={{ 
        margin: 0, 
        padding: '16px', 
        width: '100vw', 
        height: '100vh',
        animation: isOpen ? 'fadeIn 0.3s ease-out' : 'fadeOut 0.3s ease-out'
      }}
      style={{ margin: 0, padding: '16px', width: '100vw', height: '100vh' }}
    >
      <div 
        className="bg-white shadow-xl max-w-2xl w-full max-w-sm sm:max-w-2xl flex flex-col max-h-[85vh]"
        style={{ 
          margin: 0,
          animation: isOpen ? 'slideIn 0.3s ease-out' : 'slideOut 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{offer.leadName || offer.patientName || t('offer.patientName')}</h2>
                <div className="flex items-center space-x-2 text-blue-100">
                  <span className="text-sm font-medium">{t('offer.offerId')}: {offer.offerId || offer.id || 'TEK-000000-202501-001'}</span>
                  <span className="text-blue-200">•</span>
                  <span className="text-sm">{formatDate(offer.createdAt || offer.offerDate)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
              disabled={isLoading}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: 'calc(85vh - 200px)' }}>
          <div className="space-y-6">
            {/* Teklif Başlığı ve Durum */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{offer.title || t('offer.title')}</h1>
              <div className="flex items-center justify-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColorClass(offer.status || '')}`}>
                  {offer.status === 'Gönderildi' ? t('offer.status.sent') :
                   offer.status === 'Kabul Edildi' ? t('offer.status.accepted') :
                   offer.status === 'Müzakere' ? t('offer.status.negotiating') :
                   offer.status === 'Reddedildi' ? t('offer.status.rejected') :
                   offer.status === 'Süresi Doldu' ? t('offer.status.expired') :
                   offer.status || t('offer.status.sent')}
                </span>
                {offer.validUntil && (
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{t('offer.validUntil')}: {formatDate(offer.validUntil)}</span>
                  </div>
                )}
              </div>
              
              {/* Geçerlilik Süresi Sayacı */}
              {validityCountdown && (
                <div className={`mt-3 inline-flex items-center space-x-2 px-3 py-2 rounded-lg ${validityCountdown.bgColor}`}>
                  <Clock className={`h-4 w-4 ${validityCountdown.color}`} />
                  <span className={`text-sm font-medium ${validityCountdown.color}`}>
                    {validityCountdown.text}
                  </span>
                </div>
              )}
            </div>


            {/* Dinamik Bölümler */}
            {visibleSections.map((section) => (
              <div key={section.id} className={section.id === 'patient-info' ? "bg-blue-50 border border-blue-200 rounded-lg p-4" : "bg-gray-50 rounded-lg p-4"}>
                <h3 className={`font-semibold mb-3 flex items-center space-x-2 ${section.id === 'patient-info' ? 'text-blue-900' : 'text-gray-900'}`}>
                  {section.icon}
                  <span>{section.title}</span>
                </h3>
                {section.render(offer, t)}
              </div>
            ))}

            {/* Notlar */}
            {offer.notes && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2 flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>{t('offer.sections.notes')}</span>
                </h4>
                <div className="text-yellow-800 text-sm whitespace-pre-line break-words max-h-32 overflow-y-auto bg-white p-3 rounded border border-yellow-300">
                  {offer.notes}
                </div>
              </div>
            )}

            {/* Yasal Uyarı */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4">
              <div className="flex items-start space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <h5 className="font-medium text-gray-700 text-sm">{t('offer.sections.legalWarning')}</h5>
              </div>
              <p className="text-xs text-gray-600 text-center">
                {t('offer.messages.legalText', { validUntil: formatDate(offer.validUntil) })}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {/* Loading State */}
          {isLoading && (
            <div className="mb-3 flex items-center justify-center space-x-2 text-blue-600">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm font-medium">{loadingAction || t('offer.loading.processing')}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {t('offer.messages.createdBy', { 
                createdBy: offer.createdBy || 'Sistem',
                date: formatDateTime(offer.createdAt || offer.offerDate)
              })}
            </div>
            <div className="flex space-x-3">
              {/* Düzenle Butonu */}
              {onEdit && userPermissions.canEdit !== false && (
                <button
                  onClick={() => onEdit(offer)}
                  disabled={!offer || isLoading}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading && loadingAction === t('offer.loading.editing') ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Edit className="h-4 w-4" />
                  )}
                  <span>{t('offer.actions.edit')}</span>
                </button>
              )}
              
              {/* Gönder Butonu */}
              {onSend && userPermissions.canSend !== false && (
                <button
                  onClick={() => setShowSendModal(true)}
                  disabled={!offer || isExpired || isLoading}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isExpired || isLoading
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isLoading && loadingAction === t('offer.loading.sending') ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span>{isExpired ? t('offer.validity.expired') : t('offer.actions.send')}</span>
                </button>
              )}
              
              {/* PDF İndir Butonu */}
              <button
                onClick={generatePDF}
                disabled={!offer || isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading && loadingAction === t('offer.loading.downloading') ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span>{t('offer.actions.download')}</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Send Modal */}
        {showSendModal && (
          <OfferSendModal
            isOpen={showSendModal}
            onClose={() => setShowSendModal(false)}
            offer={offer}
            onSent={(result) => {
              console.log('Offer sent:', result);
              setShowSendModal(false);
              if (onSend) {
                onSend(offer);
              }
            }}
          />
        )}
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideOut {
          from { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to { 
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
};

export default OfferPreviewModal;