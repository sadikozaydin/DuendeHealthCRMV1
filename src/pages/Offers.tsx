import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Offer, UserPermissions } from '../types/offerTypes';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Send, 
  Copy,
  DollarSign,
  Euro,
  Calendar,
  User,
  Building2,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
  Heart,
  Bone,
  Brain,
  Scissors,
  Pill,
  Activity,
  Target,
  TrendingUp,
  Award,
  Zap,
  Bot,
  X,
  RefreshCw,
  Edit3,
  CreditCard,
  Mail,
  Phone,
  Globe
} from 'lucide-react';
import OfferPreviewModal from '../components/offers/OfferPreviewModal';
import OfferEditModal from '../components/offers/OfferEditModal';
import OfferSendModal from '../components/offers/OfferSendModal';
import OfferDeleteModal from '../components/offers/OfferDeleteModal';
import OfferCreationModal from '../components/leads/OfferCreationModal';
import { getLeads } from '../services/leadService';

import { generateOfferNumber } from '../utils/offerHelpers';

const Offers = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('offers');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editingOffer, setEditingOffer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [filters, setFilters] = useState({ category: 'all', status: 'all', currency: 'all' });
  // Teklif düzenleme fonksiyonu
  const handleEditOffer = (offer) => {
    console.log('Editing offer:', offer);
    setEditingOffer(offer);
    setShowEditModal(true);
  };

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewOffer, setPreviewOffer] = useState(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendOffer, setSendOffer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOffer, setDeleteOffer] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);

  // Yeni teklif oluşturma fonksiyonu
  const handleCreateNewOffer = () => {
    console.log('Opening offer creation modal');
    setShowCreateModal(true);
  };

  // Teklif oluşturulduğunda çalışacak fonksiyon
  const handleOfferCreated = (newOffer) => {
    console.log('New offer created:', newOffer);
    setShowCreateModal(false);
    // Burada normalde API'den teklifleri yeniden yüklersiniz
  };

  // Initialize lead data on component mount
  useEffect(() => {
    const initializeLeadData = async () => {
      try {
        console.log('Initializing lead data for Offers page...');
        await getLeads();
        console.log('Lead data initialized successfully');
      } catch (error) {
        console.error('Error initializing lead data:', error);
      }
    };

    initializeLeadData();
  }, []);

  // Handle delete confirmation from modal
  const handleConfirmDelete = (offerId: string) => {
    console.log('Deleting offer:', offerId);
    // Here you would typically make an API call to delete the offer
    // For now, we'll just close the modal and show a success message
    setShowDeleteModal(false);
    setDeleteOffer(null);
    // You could also update the activeOffers state to remove the deleted offer
    // setActiveOffers(prev => prev.filter(offer => offer.id !== offerId));
  };

  // Teklif şablonları
  // Teklif güncelleme fonksiyonu
  const handleOfferUpdated = () => {
    console.log('Offer updated, refreshing list...');
    setShowEditModal(false);
    setEditingOffer(null);
    // Burada normalde API'den teklifleri yeniden yüklersiniz
  };

  // ESC tuşu ile modal kapatma
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showPreviewModal) {
        setShowPreviewModal(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showPreviewModal]);

  // Modal backdrop click handler
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowPreviewModal(false);
    }
  };

  const offerTemplates = [
    {
      id: 1,
      name: 'Kalp Cerrahisi Paketi',
      category: 'Kardiyoloji',
      description: 'Bypass ameliyatı + 7 gün konaklama + transfer',
      basePrice: 35000,
      currency: 'EUR',
      services: [
        { name: 'Kalp Cerrahisi', price: 25000 },
        { name: 'Hastane Konaklaması', price: 8400 },
        { name: 'Transfer Hizmeti', price: 600 },
        { name: 'Tercümanlık', price: 1000 }
      ],
      validityDays: 30,
      paymentTerms: '50% peşin, 50% ameliyat öncesi',
      usageCount: 45,
      conversionRate: 68,
      lastUsed: '2025-01-10',
      status: 'active',
      tags: ['Premium', 'Yüksek Dönüşüm'],
      icon: '❤️'
    },
    {
      id: 2,
      name: 'Plastik Cerrahi Paketi',
      category: 'Plastik Cerrahi',
      description: 'Rinoplasti + 3 gün otel + VIP transfer',
      basePrice: 8500,
      currency: 'EUR',
      services: [
        { name: 'Rinoplasti Ameliyatı', price: 6000 },
        { name: 'Otel Konaklaması', price: 1800 },
        { name: 'VIP Transfer', price: 400 },
        { name: 'Aftercare Paketi', price: 300 }
      ],
      validityDays: 21,
      paymentTerms: '100% peşin',
      usageCount: 67,
      conversionRate: 72,
      lastUsed: '2025-01-12',
      status: 'active',
      tags: ['Popüler', 'Hızlı İşlem'],
      icon: '✨'
    },
    {
      id: 3,
      name: 'Diş İmplantı Paketi',
      category: 'Diş Tedavisi',
      description: 'Tam ağız implant + 5 gün konaklama',
      basePrice: 12000,
      currency: 'EUR',
      services: [
        { name: 'Diş İmplantı (12 adet)', price: 9600 },
        { name: 'Otel Konaklaması', price: 1600 },
        { name: 'Havalimanı Transferi', price: 200 },
        { name: 'Kontrol Randevuları', price: 600 }
      ],
      validityDays: 45,
      paymentTerms: '30% peşin, 70% tedavi öncesi',
      usageCount: 34,
      conversionRate: 58,
      lastUsed: '2025-01-08',
      status: 'active',
      tags: ['Uzun Vadeli'],
      icon: '🦷'
    },
    {
      id: 4,
      name: 'Ortopedi Paketi',
      category: 'Ortopedi',
      description: 'Diz protezi + rehabilitasyon + 10 gün konaklama',
      basePrice: 18000,
      currency: 'EUR',
      services: [
        { name: 'Diz Protezi Ameliyatı', price: 12000 },
        { name: 'Fizyoterapi (10 seans)', price: 2000 },
        { name: 'Medikal Otel', price: 3000 },
        { name: 'Özel Bakım', price: 1000 }
      ],
      validityDays: 60,
      paymentTerms: '40% peşin, 60% ameliyat öncesi',
      usageCount: 28,
      conversionRate: 75,
      lastUsed: '2025-01-14',
      status: 'active',
      tags: ['Yüksek Başarı'],
      icon: '🦴'
    },
    {
      id: 5,
      name: 'Saç Ekimi Paketi',
      category: 'Dermatoloji',
      description: 'FUE saç ekimi + 3 gün otel + özel bakım',
      basePrice: 4500,
      currency: 'EUR',
      services: [
        { name: 'FUE Saç Ekimi (4000 greft)', price: 3500 },
        { name: 'Otel Konaklaması', price: 600 },
        { name: 'Özel Bakım Kiti', price: 200 },
        { name: 'Transfer', price: 200 }
      ],
      validityDays: 14,
      paymentTerms: '100% peşin',
      usageCount: 89,
      conversionRate: 82,
      lastUsed: '2025-01-13',
      status: 'active',
      tags: ['En Popüler', 'Hızlı Karar'],
      icon: '💇‍♂️'
    },
    {
      id: 6,
      name: 'Check-up Paketi',
      category: 'Check-up',
      description: 'Kapsamlı sağlık taraması + 2 gün otel',
      basePrice: 2500,
      currency: 'EUR',
      services: [
        { name: 'Kapsamlı Check-up', price: 1800 },
        { name: 'Otel Konaklaması', price: 400 },
        { name: 'Transfer', price: 150 },
        { name: 'Rapor Hazırlama', price: 150 }
      ],
      validityDays: 90,
      paymentTerms: '100% peşin',
      usageCount: 156,
      conversionRate: 45,
      lastUsed: '2025-01-11',
      status: 'active',
      tags: ['Ekonomik', 'Hızlı'],
      icon: '🩺'
    }
  ];

  // Aktif teklifler
  const activeOffers = [
    {
      id: 'TEK-LD123456-202501-001',
      offerId: 'TEK-LD123456-202501-001',
      templateId: 1,
      templateName: 'Kalp Cerrahisi Paketi',
      leadName: 'Maria Rodriguez',
      leadId: 'LEAD-123456',
      totalAmount: 35000,
      currency: 'EUR',
      status: 'sent',
      sentDate: '2025-01-14',
      validUntil: '2025-02-13',
      lastActivity: '2025-01-14 16:30',
      responseStatus: 'pending',
      notes: 'Müşteri fiyat konusunda düşünüyor, 3 gün içinde cevap verecek'
    },
    {
      id: 'TEK-LD234567-202501-001',
      offerId: 'TEK-LD234567-202501-001',
      templateId: 2,
      templateName: 'Plastik Cerrahi Paketi',
      leadName: 'Sarah Thompson',
      leadId: 'LEAD-234567',
      totalAmount: 8500,
      currency: 'EUR',
      status: 'accepted',
      sentDate: '2025-01-12',
      validUntil: '2025-02-02',
      lastActivity: '2025-01-13 14:20',
      responseStatus: 'accepted',
      notes: 'Teklif kabul edildi, ödeme planı görüşülüyor'
    },
    {
      id: 'TEK-LD345678-202501-001',
      offerId: 'TEK-LD345678-202501-001',
      templateId: 5,
      templateName: 'Saç Ekimi Paketi',
      leadName: 'Hans Mueller',
      leadId: 'LEAD-345678',
      totalAmount: 4500,
      currency: 'EUR',
      status: 'negotiating',
      sentDate: '2025-01-10',
      validUntil: '2025-01-24',
      lastActivity: '2025-01-13 11:15',
      responseStatus: 'counter_offer',
      notes: 'Müşteri karşı teklif yaptı, %10 indirim istiyor'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'negotiating': return 'bg-orange-100 text-orange-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCurrencySymbol = (currency) => {
    switch (currency) {
      case 'EUR': return '€';
      case 'USD': return '$';
      case 'GBP': return '£';
      case 'TRY': return '₺';
      default: return currency;
    }
  };

  const getConversionColor = (rate) => {
    if (rate >= 70) return 'text-green-600';
    if (rate >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getOfferStatusColor = (status) => {
    switch (status) {
      case 'Gönderildi': return 'bg-blue-100 text-blue-800';
      case 'Kabul Edildi': return 'bg-green-100 text-green-800';
      case 'Reddedildi': return 'bg-red-100 text-red-800';
      case 'Müzakere': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Önizleme modalını aç
  const handlePreviewOffer = (template) => {
    // Mock teklif verisi oluştur
    const mockOffer = {
      id: generateOfferNumber('LEAD-123456'),
      offerId: generateOfferNumber('LEAD-123456'),
      title: template.name,
      patientName: 'Maria Rodriguez',
      patientId: 'LEAD-123456',
      offerDate: new Date().toLocaleDateString('tr-TR'),
      validUntil: new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('tr-TR'),
      status: 'Gönderildi',
      services: template.services,
      totalAmount: template.basePrice,
      currency: template.currency,
      paymentTerms: template.paymentTerms,
      notes: 'Bu teklif özel olarak sizin için hazırlanmıştır. Sorularınız için bizimle iletişime geçebilirsiniz.',
      template: template
    };
    
    setPreviewOffer(mockOffer);
    setShowPreviewModal(true);
  };

  const previewData = previewOffer;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('offers.title')}</h1>
          <p className="text-gray-600 mt-1">{t('offers.subtitle')}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('offers.activeTemplates')}</p>
              <p className="text-3xl font-bold text-blue-600">{offerTemplates.filter(t => t.status === 'active').length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">6 kategoride</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('offers.sentOffers')}</p>
              <p className="text-3xl font-bold text-green-600">{activeOffers.length}</p>
            </div>
            <Send className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">Bu ay</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('offers.averageConversion')}</p>
              <p className="text-3xl font-bold text-purple-600">
                {Math.round(offerTemplates.reduce((acc, t) => acc + t.conversionRate, 0) / offerTemplates.length)}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">Tüm şablonlar</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('offers.totalValue')}</p>
              <p className="text-3xl font-bold text-orange-600">€2.4M</p>
            </div>
            <DollarSign className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-sm text-orange-600 mt-2">Aktif teklifler</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'offers', label: 'Teklifler', icon: Send, count: activeOffers.length },
              { id: 'templates', label: 'Teklif Şablonları', icon: FileText, count: offerTemplates.length },
              { id: 'quick-templates', label: 'Hızlı Şablonlar', icon: Zap, count: offerTemplates.filter(t => t.tags.includes('Hızlı İşlem') || t.tags.includes('Hızlı Karar')).length },
              { id: 'analytics', label: 'Analitik', icon: TrendingUp, count: null },
              { id: 'settings', label: 'Ayarlar', icon: Target, count: null }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.count && (
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Aktif Teklifler</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleCreateNewOffer}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Yeni Teklif Oluştur
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Teklif & Lead
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tutar & Para Birimi
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tarihler
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {activeOffers.map((offer) => (
                      <tr key={offer.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{offer.templateName}</div>
                            <div className="text-sm text-gray-500">{offer.leadName}</div>
                            <div className="text-xs text-gray-400">{offer.leadId}</div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {getCurrencySymbol(offer.currency)}{offer.totalAmount.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">{offer.currency}</div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(offer.status)}`}>
                            {offer.status === 'sent' ? 'Gönderildi' :
                             offer.status === 'accepted' ? 'Kabul Edildi' :
                             offer.status === 'rejected' ? 'Reddedildi' :
                             offer.status === 'negotiating' ? 'Müzakere' : 'Süresi Doldu'}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            {offer.responseStatus === 'pending' ? 'Yanıt bekleniyor' :
                             offer.responseStatus === 'accepted' ? 'Kabul edildi' :
                             offer.responseStatus === 'counter_offer' ? 'Karşı teklif' : 'Reddedildi'}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Gönderim: {offer.sentDate}</div>
                          <div className="text-sm text-gray-500">Geçerli: {offer.validUntil}</div>
                          <div className="text-xs text-gray-400">Son aktivite: {offer.lastActivity}</div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => {
                                // Aktif teklif için önizleme verisi oluştur
                                const template = offerTemplates.find(t => t.id === offer.templateId);
                                if (template) {
                                  const mockOffer = {
                                    id: `OFFER-${offer.id}`,
                                    title: offer.templateName,
                                    patientName: offer.leadName,
                                    patientId: offer.leadId,
                                    offerDate: offer.sentDate,
                                    validUntil: offer.validUntil,
                                    status: offer.status === 'sent' ? 'Gönderildi' : 
                                            offer.status === 'accepted' ? 'Kabul Edildi' :
                                            offer.status === 'rejected' ? 'Reddedildi' :
                                            offer.status === 'negotiating' ? 'Müzakere' : 'Süresi Doldu',
                                    services: template.services,
                                    totalAmount: offer.totalAmount,
                                    currency: offer.currency,
                                    paymentTerms: template.paymentTerms,
                                    notes: offer.notes,
                                    template: template
                                  };
                                  setPreviewOffer(mockOffer);
                                  setShowPreviewModal(true);
                                }
                              }}
                              className="text-blue-600 hover:text-blue-700 p-1 rounded"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                             onClick={() => {
                               // Düzenlenecek teklif için detaylı veri hazırla
                               const editOffer: Offer = {
                                 id: offer.id,
                                 offerId: offer.offerId,
                                 title: offer.templateName,
                                 leadId: offer.leadId,
                                 totalAmount: offer.totalAmount,
                                 currency: offer.currency,
                                 status: offer.status,
                                 validUntil: offer.validUntil,
                                 sentDate: offer.sentDate,
                                 notes: offer.notes || '',
                                 services: [
                                   {
                                     name: 'Operasyon Ücreti',
                                     description: 'Kalp cerrahisi',
                                     amount: 20000,
                                     currency: offer.currency
                                   },
                                   {
                                     name: 'Konaklama',
                                     description: '5 gün otel konaklama',
                                     amount: 5000,
                                     currency: offer.currency
                                   }
                                 ]
                               };
                               handleEditOffer(editOffer);
                             }}
                             className="text-blue-600 hover:text-blue-700 p-1 rounded cursor-pointer"
                            >
                             <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => {
                                // Teklif gönderme modalını aç
                                const template = offerTemplates.find(t => t.id === offer.templateId);
                                if (template) {
                                  const sendOfferData = {
                                    id: offer.id,
                                    offerId: offer.offerId,
                                    title: offer.templateName,
                                    leadName: offer.leadName,
                                    leadId: offer.leadId,
                                    leadContact: {
                                      phone: '+34 612 345 678', // Mock data
                                      email: 'maria.rodriguez@example.com' // Mock data
                                    },
                                    totalAmount: offer.totalAmount,
                                    currency: offer.currency,
                                    validUntil: offer.validUntil,
                                    services: template.services,
                                    paymentTerms: template.paymentTerms,
                                    notes: offer.notes
                                  };
                                  setSendOffer(sendOfferData);
                                  setShowSendModal(true);
                                }
                              }}
                              className="text-green-600 hover:text-green-700 p-1 rounded cursor-pointer"
                            >
                              <Send className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => {
                                setDeleteOffer(offer);
                                setShowDeleteModal(true);
                              }}
                              className="text-red-600 hover:text-red-700 p-1 rounded cursor-pointer"
                              title="Teklifi Sil"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Teklif Şablonları</h3>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-colors">
                  <span>Yeni Teklif Şablonu Oluştur</span>
                </button>
              </div>
              
              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Şablon ara..."
                      className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Filtreler:</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Kategoriler</option>
                    <option value="Kardiyoloji">Kardiyoloji</option>
                    <option value="Plastik Cerrahi">Plastik Cerrahi</option>
                    <option value="Diş Tedavisi">Diş Tedavisi</option>
                    <option value="Ortopedi">Ortopedi</option>
                    <option value="Dermatoloji">Dermatoloji</option>
                    <option value="Check-up">Check-up</option>
                  </select>
                  
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="active">Aktif</option>
                    <option value="draft">Taslak</option>
                    <option value="archived">Arşivlenmiş</option>
                  </select>
                  
                  <select
                    value={filters.currency}
                    onChange={(e) => setFilters({ ...filters, currency: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Para Birimleri</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="TRY">TRY (₺)</option>
                  </select>
                </div>
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offerTemplates.map((template) => (
                  <div key={template.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{template.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {template.category}
                          </span>
                        </div>
                      </div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(template.status)}`}>
                        {template.status === 'active' ? 'Aktif' : 'Taslak'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Temel Fiyat:</span>
                        <span className="text-lg font-bold text-gray-900">
                          {getCurrencySymbol(template.currency)}{template.basePrice.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Kullanım:</span>
                        <span className="text-sm font-medium text-gray-900">{template.usageCount} kez</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Dönüşüm:</span>
                        <span className={`text-sm font-medium ${getConversionColor(template.conversionRate)}`}>
                          %{template.conversionRate}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Geçerlilik:</span>
                        <span className="text-sm text-gray-900">{template.validityDays} gün</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map((tag, index) => (
                          <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handlePreviewOffer(template)}
                        className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded text-sm transition-colors">
                        Önizle
                      </button>
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm transition-colors">
                        Düzenle
                      </button>
                      <button className="bg-green-100 hover:bg-green-200 text-green-700 py-2 px-3 rounded text-sm transition-colors">
                        Kullan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'quick-templates' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Hızlı Şablonlar</h3>
                <div className="flex space-x-2">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                    Yeni Hızlı Şablon Oluştur
                  </button>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-green-900 mb-2">⚡ Hızlı Şablonlar</h4>
                <p className="text-sm text-green-700">
                  Hızlı karar veren müşteriler için optimize edilmiş şablonlar. Kısa geçerlilik süresi ve basit ödeme koşulları.
                </p>
              </div>

              {/* Quick Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offerTemplates
                  .filter(template => template.tags.includes('Hızlı İşlem') || template.tags.includes('Hızlı Karar') || template.validityDays <= 21)
                  .map((template) => (
                  <div key={template.id} className="border border-green-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-green-50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{template.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {template.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4 text-green-600" />
                        <span className="text-xs text-green-600 font-medium">Hızlı</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Temel Fiyat:</span>
                        <span className="text-lg font-bold text-gray-900">
                          {getCurrencySymbol(template.currency)}{template.basePrice.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Geçerlilik:</span>
                        <span className="text-sm font-medium text-green-600">{template.validityDays} gün</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Dönüşüm:</span>
                        <span className={`text-sm font-medium ${getConversionColor(template.conversionRate)}`}>
                          %{template.conversionRate}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map((tag, index) => (
                          <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handlePreviewOffer(template)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition-colors">
                        Hızlı Kullan
                      </button>
                      <button 
                        onClick={() => handlePreviewOffer(template)}
                        className="bg-green-100 hover:bg-green-200 text-green-700 py-2 px-3 rounded text-sm transition-colors">
                        Önizle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Teklif Analitikleri</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="h-6 w-6 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-700">68%</span>
                  </div>
                  <h4 className="font-medium text-blue-900">Ortalama Dönüşüm</h4>
                  <p className="text-sm text-blue-700">Tüm şablonlar</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="h-6 w-6 text-green-600" />
                    <span className="text-2xl font-bold text-green-700">2.3</span>
                  </div>
                  <h4 className="font-medium text-green-900">Ortalama Yanıt Süresi</h4>
                  <p className="text-sm text-green-700">gün</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Award className="h-6 w-6 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-700">€18.5K</span>
                  </div>
                  <h4 className="font-medium text-purple-900">Ortalama Teklif Değeri</h4>
                  <p className="text-sm text-purple-700">Şablon başına</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                    <span className="text-2xl font-bold text-orange-700">+23%</span>
                  </div>
                  <h4 className="font-medium text-orange-900">Aylık Büyüme</h4>
                  <p className="text-sm text-orange-700">Teklif sayısı</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Teklif Ayarları</h3>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">⚙️ Genel Ayarlar</h4>
                <p className="text-sm text-yellow-700">
                  Teklif sistemi ayarları ve varsayılan değerler burada yapılandırılır.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Varsayılan Ayarlar</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Varsayılan Para Birimi
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="EUR">EUR (€)</option>
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="TRY">TRY (₺)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Varsayılan Geçerlilik Süresi
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="7">7 gün</option>
                      <option value="14">14 gün</option>
                      <option value="30">30 gün</option>
                      <option value="60">60 gün</option>
                      <option value="90">90 gün</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Varsayılan Ödeme Koşulları
                    </label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="full_advance">%100 Peşin</option>
                      <option value="50_50">%50 Peşin + %50 Tedavi Öncesi</option>
                      <option value="installment">Taksitli Ödeme</option>
                      <option value="after_treatment">Tedavi Sonrası</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Bildirim Ayarları</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Otomatik Hatırlatma</h5>
                        <p className="text-sm text-gray-600">Yanıtlanmayan teklifler için</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">E-posta Bildirimleri</h5>
                        <p className="text-sm text-gray-600">Teklif durumu değişikliklerinde</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">WhatsApp Bildirimleri</h5>
                        <p className="text-sm text-gray-600">Hızlı bildirimler için</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <OfferPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        offer={previewData}
        onEdit={(offer) => {
          setShowPreviewModal(false);
          setShowEditModal(true);
          setEditingOffer(offer);
        }}
        onSend={(offer) => {
          console.log('Teklif gönderiliyor:', offer);
          alert('Teklif başarıyla gönderildi!');
        }}
      />

      {/* Edit Modal */}
      {showEditModal && editingOffer && (
        <OfferEditModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditingOffer(null);
          }}
          offer={editingOffer}
          onOfferUpdated={handleOfferUpdated}
          onPreview={(draftOffer) => {
            setShowEditModal(false);
           setPreviewOffer(draftOffer as any);
            setShowPreviewModal(true);
          }}
         userPermissions={{
            canEdit: true,
            canUploadTemplate: true,
            canChangeStatus: true
          }}
        />
      )}

      {/* Send Modal */}
      {showSendModal && sendOffer && (
        <OfferSendModal
          isOpen={showSendModal}
          onClose={() => {
            setShowSendModal(false);
            setSendOffer(null);
          }}
          offer={sendOffer}
          onSent={() => {
            console.log('Teklif gönderildi');
            setShowSendModal(false);
            setSendOffer(null);
          }}
        />
      )}

      {/* Delete Modal */}
      {showDeleteModal && deleteOffer && (
        <OfferDeleteModal
          isOpen={showDeleteModal}
          onClose={() => {
            setShowDeleteModal(false);
            setDeleteOffer(null);
          }}
          offer={deleteOffer}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Create Offer Modal */}
      {showCreateModal && (
        <OfferCreationModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          lead={selectedLead}
          onOfferCreated={handleOfferCreated}
        />
      )}
    </div>
  );
};

export default Offers;