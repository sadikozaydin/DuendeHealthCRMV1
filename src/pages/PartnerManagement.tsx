import React, { useState } from 'react';
import { Users, Plus, Search, Filter, Eye, Edit, Trash2, Building2, MapPin, Phone, Mail, Globe, CreditCard, FileText, Calendar, TrendingUp, DollarSign, Euro, Banknote, Percent, CheckCircle, AlertTriangle, Clock, Star, Award, Target, BarChart3, Activity, Zap, Shield, Lock, Unlock, Key, Database, Settings, Bell, Download, Upload, Send, MessageCircle, Video, Plane, Car, Building, Languages, User, UserCheck, UserPlus, UserMinus, UserX, Briefcase, Handshake, PieChart, LineChart, MoreHorizontal, ExternalLink, Copy, Share2, Flag, Tag, Hash, AtSign, Link, Image, Paperclip, RefreshCw, Timer, AlertCircle, Info, HelpCircle, Wifi, WifiOff, Server, Cloud, Monitor, Smartphone, Tablet, Camera, Mic, Volume2, Headphones, Navigation, Compass, Route, Truck, Package, ShoppingBag, Store, Store as Storefront, Home, Hotel, Bed, Coffee, Utensils, Wifi as WifiIcon, Tv, AirVent, Bath, Car as CarIcon, Fuel, ParkingCircle, MapPin as LocationIcon, Navigation as DirectionsIcon, Compass as CompassIcon, Route as RouteIcon, Clock as TimeIcon, Calendar as CalendarIcon, CheckSquare, XCircle, PlayCircle, PauseCircle, StopCircle, SkipForward, SkipBack, FastForward, Rewind, RotateCcw, Repeat, Shuffle, Volume1, VolumeX, Mic as MicIcon, MicOff, Video as VideoIcon, VideoOff, PhoneCall, PhoneIncoming, PhoneOutgoing, PhoneMissed, Voicemail, MessageSquare, MessageSquarePlus, MessageSquareMore, MessageSquareX, Inbox, MailOpen, MailPlus, MailMinus, MailX, MailCheck, MailWarning, MailQuestion, MailSearch, Facebook, Instagram, Twitter, Linkedin, Youtube, Github, Chrome, Bookmark, BookmarkPlus, BookmarkMinus, BookmarkX, BookmarkCheck, Heart, HeartHandshake, ThumbsUp, ThumbsDown, Smile, Frown, Meh, Angry, Laugh, Sunrise as Surprised, Cone as Confused, EggFried as Worried, Copyleft as Sleepy, Pizza as Dizzy, MessageCircleQuestion as Expressionless, Contrast as Neutral, Redo as Relieved, Verified as Satisfied, FlameKindling as Kissing, Heart as KissingHeart, Linkedin as Winking, Glasses as Sunglasses, Glasses as NerdGlasses, Moon as Monocle, Cone as ConfusedIcon, EggFried as WorriedIcon, Pizza as DizzyIcon, Angry as AngryIcon, Image as Rage, Trophy as Triumph, Copyleft as SleepyIcon, Siren as Tired, BedSingle as Sleeping, Redo as RelievedIcon, BringToFront as Tongue, Link as Wink, CaseSensitive as Pensive, Cone as ConfusedFace, ArrowDownRight as Slightly_frowning_face, MonitorDown as White_frowning_face, PersonStanding as Persevering, SatelliteDish as Disappointed_relieved, Heart as Weary, Siren as Tired_face, FileWarning as Yawning, Trophy as TriumphIcon, Image as RageIcon, Contrast as NoEntry, Flame as Name, Angry as AngryFace } from 'lucide-react';

const PartnerManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    region: 'all'
  });

  // Partner türleri
  const partnerTypes = [
    { id: 'agency', name: 'Acente', icon: Building2, color: 'text-blue-600', description: 'Hasta yönlendiren acenteler' },
    { id: 'tourism', name: 'Turizm Firması', icon: Plane, color: 'text-green-600', description: 'Turizm ve seyahat organizasyonu' },
    { id: 'transport', name: 'Transfer/Ulaşım', icon: Car, color: 'text-purple-600', description: 'Transfer ve ulaşım hizmetleri' },
    { id: 'hotel', name: 'Otel/Konaklama', icon: Building, color: 'text-orange-600', description: 'Konaklama ve otel hizmetleri' },
    { id: 'marketing', name: 'Reklam/Dijital Ajans', icon: TrendingUp, color: 'text-pink-600', description: 'Pazarlama ve reklam ajansları' },
    { id: 'translation', name: 'Tercüman/Çeviri', icon: Languages, color: 'text-indigo-600', description: 'Çeviri ve tercümanlık hizmetleri' },
    { id: 'other', name: 'Diğer Servis', icon: Briefcase, color: 'text-gray-600', description: 'Diğer dış servis sağlayıcılar' }
  ];

  // Partner listesi
  const partners = [
    {
      id: 1,
      name: 'Madrid Health Tourism',
      type: 'agency',
      legalName: 'Madrid Health Tourism S.L.',
      taxNumber: 'ES-B12345678',
      tradeRegister: 'Madrid-123456',
      representative: 'Carlos Rodriguez',
      position: 'Genel Müdür',
      email: 'carlos@madridhealth.com',
      phone: '+34 91 123 45 67',
      whatsapp: '+34 612 345 678',
      address: 'Calle Gran Vía 123, Madrid, İspanya',
      country: 'İspanya',
      city: 'Madrid',
      website: 'www.madridhealth.com',
      status: 'active',
      contractStart: '2024-01-01',
      contractEnd: '2025-12-31',
      services: ['Hasta Yönlendirme', 'Danışmanlık', 'Tercümanlık'],
      regions: ['İspanya', 'Portekiz'],
      languages: ['İspanyolca', 'Portekizce', 'İngilizce'],
      commissionModel: 'percentage',
      commissionRate: 15,
      paymentTerms: '30 gün',
      bankInfo: {
        bankName: 'Banco Santander',
        iban: 'ES91 2100 0418 4502 0005 1332',
        swift: 'CAIXESBBXXX'
      },
      portalAccess: true,
      lastLogin: '2025-01-14 16:30',
      totalLeads: 247,
      convertedPatients: 89,
      conversionRate: 36,
      totalRevenue: '€125,000',
      totalCommission: '€18,750',
      pendingCommission: '€2,500',
      rating: 4.8,
      documents: ['Sözleşme.pdf', 'Vergi_Levhası.pdf', 'Ticaret_Sicil.pdf'],
      notes: 'Güvenilir partner, zamanında ödeme yapıyor. İspanya pazarında güçlü.',
      tags: ['VIP Partner', 'Yüksek Performans', 'Güvenilir'],
      kpis: {
        responseTime: '2.3 saat',
        patientSatisfaction: 4.7,
        documentCompliance: 98,
        paymentPunctuality: 100
      }
    },
    {
      id: 2,
      name: 'Dubai Medical Transfer',
      type: 'transport',
      legalName: 'Dubai Medical Transfer LLC',
      taxNumber: 'AE-123456789',
      tradeRegister: 'Dubai-987654',
      representative: 'Ahmed Al-Mansouri',
      position: 'Operations Manager',
      email: 'ahmed@dubaitransfer.ae',
      phone: '+971 4 123 4567',
      whatsapp: '+971 50 123 4567',
      address: 'Sheikh Zayed Road, Dubai, BAE',
      country: 'BAE',
      city: 'Dubai',
      website: 'www.dubaitransfer.ae',
      status: 'active',
      contractStart: '2024-03-01',
      contractEnd: '2025-02-28',
      services: ['Havalimanı Transfer', 'Hastane Transfer', 'Şehir İçi Ulaşım'],
      regions: ['BAE', 'Katar', 'Kuveyt'],
      languages: ['Arapça', 'İngilizce'],
      commissionModel: 'fixed',
      commissionRate: 50, // USD per transfer
      paymentTerms: '15 gün',
      bankInfo: {
        bankName: 'Emirates NBD',
        iban: 'AE070331234567890123456',
        swift: 'EBILAEAD'
      },
      portalAccess: true,
      lastLogin: '2025-01-13 14:20',
      totalLeads: 0,
      convertedPatients: 156,
      conversionRate: 0,
      totalRevenue: '$78,000',
      totalCommission: '$7,800',
      pendingCommission: '$1,200',
      rating: 4.9,
      documents: ['Service_Agreement.pdf', 'Insurance_Certificate.pdf'],
      notes: 'Mükemmel hizmet kalitesi, zamanında transfer sağlıyor.',
      tags: ['Premium Service', 'Zamanında', 'Güvenilir'],
      kpis: {
        responseTime: '15 dakika',
        patientSatisfaction: 4.9,
        documentCompliance: 100,
        paymentPunctuality: 100
      }
    },
    {
      id: 3,
      name: 'London Medical Hotel',
      type: 'hotel',
      legalName: 'London Medical Hotel Ltd.',
      taxNumber: 'GB-123456789',
      tradeRegister: 'London-456789',
      representative: 'Sarah Johnson',
      position: 'Guest Relations Manager',
      email: 'sarah@londonmedical.co.uk',
      phone: '+44 20 7123 4567',
      whatsapp: '+44 7700 900123',
      address: 'Harley Street 45, London, İngiltere',
      country: 'İngiltere',
      city: 'Londra',
      website: 'www.londonmedicalhotel.co.uk',
      status: 'warning',
      contractStart: '2023-06-01',
      contractEnd: '2025-05-31',
      services: ['Konaklama', 'Hasta Bakımı', 'Beslenme'],
      regions: ['İngiltere', 'İrlanda'],
      languages: ['İngilizce'],
      commissionModel: 'percentage',
      commissionRate: 10,
      paymentTerms: '45 gün',
      bankInfo: {
        bankName: 'Barclays Bank',
        iban: 'GB29 NWBK 6016 1331 9268 19',
        swift: 'BARCGB22'
      },
      portalAccess: false,
      lastLogin: null,
      totalLeads: 0,
      convertedPatients: 67,
      conversionRate: 0,
      totalRevenue: '£45,000',
      totalCommission: '£4,500',
      pendingCommission: '£3,200',
      rating: 4.2,
      documents: ['Hotel_Agreement.pdf', 'Health_Certificate.pdf'],
      notes: 'Ödeme gecikmesi var, takip edilmeli. Hizmet kalitesi iyi.',
      tags: ['Ödeme Gecikmesi', 'Takip Gerekli'],
      kpis: {
        responseTime: '4.5 saat',
        patientSatisfaction: 4.2,
        documentCompliance: 85,
        paymentPunctuality: 60
      }
    }
  ];

  // Komisyon modelleri
  const commissionModels = [
    { id: 'percentage', name: 'Yüzdesel', description: 'Gelirden yüzde olarak' },
    { id: 'fixed', name: 'Sabit Tutar', description: 'İşlem başına sabit tutar' },
    { id: 'tiered', name: 'Kademeli', description: 'Performansa göre kademeli' },
    { id: 'bonus', name: 'Bonus Sistemi', description: 'Hedef bazlı bonus' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    const partnerType = partnerTypes.find(t => t.id === type);
    return partnerType ? <partnerType.icon className={`h-4 w-4 ${partnerType.color}`} /> : <Building2 className="h-4 w-4 text-gray-600" />;
  };

  const getTypeName = (type: string) => {
    const partnerType = partnerTypes.find(t => t.id === type);
    return partnerType ? partnerType.name : 'Bilinmeyen';
  };

  const renderPartnerDetail = (partner) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 h-12 w-12">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                {getTypeIcon(partner.type)}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{partner.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{getTypeName(partner.type)}</span>
                <span>•</span>
                <span>{partner.city}, {partner.country}</span>
                <span>•</span>
                <span>{partner.representative}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(partner.status)}`}>
              {partner.status === 'active' ? 'Aktif' : 
               partner.status === 'warning' ? 'Uyarı' : 
               partner.status === 'inactive' ? 'Pasif' : 'Beklemede'}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{partner.rating}</span>
            </div>
            <button
              onClick={() => setSelectedPartner(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sol Panel - Genel Bilgiler */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                  <Building2 className="h-5 w-5" />
                  <span>Şirket Bilgileri</span>
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-blue-700 font-medium">Yasal Unvan:</span>
                    <p className="text-blue-800">{partner.legalName}</p>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Vergi No:</span>
                    <p className="text-blue-800">{partner.taxNumber}</p>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Ticaret Sicil:</span>
                    <p className="text-blue-800">{partner.tradeRegister}</p>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Web Sitesi:</span>
                    <p className="text-blue-800">{partner.website}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-4 flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>İletişim Bilgileri</span>
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-green-700 font-medium">Temsilci:</span>
                    <p className="text-green-800">{partner.representative} ({partner.position})</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">{partner.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span className="text-green-800">{partner.phone}</span>
                  </div>
                  {partner.whatsapp && (
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-800">{partner.whatsapp}</span>
                    </div>
                  )}
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-green-800">{partner.address}</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-4 flex items-center space-x-2">
                  <Briefcase className="h-5 w-5" />
                  <span>Hizmetler & Bölgeler</span>
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-purple-700 font-medium text-sm">Hizmetler:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {partner.services.map((service, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-purple-700 font-medium text-sm">Bölgeler:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {partner.regions.map((region, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-purple-700 font-medium text-sm">Diller:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {partner.languages.map((language, index) => (
                        <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orta Panel - Finansal Bilgiler */}
            <div className="space-y-6">
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-4 flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Komisyon & Ödeme</span>
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-yellow-700 font-medium">Komisyon Modeli:</span>
                    <p className="text-yellow-800 capitalize">
                      {partner.commissionModel === 'percentage' ? `%${partner.commissionRate} Yüzdesel` :
                       partner.commissionModel === 'fixed' ? `${partner.commissionRate} Sabit Tutar` :
                       partner.commissionModel}
                    </p>
                  </div>
                  <div>
                    <span className="text-yellow-700 font-medium">Ödeme Vadesi:</span>
                    <p className="text-yellow-800">{partner.paymentTerms}</p>
                  </div>
                  <div>
                    <span className="text-yellow-700 font-medium">Banka:</span>
                    <p className="text-yellow-800">{partner.bankInfo.bankName}</p>
                  </div>
                  <div>
                    <span className="text-yellow-700 font-medium">IBAN:</span>
                    <p className="text-yellow-800 font-mono text-xs">{partner.bankInfo.iban}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-4 flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Performans Özeti</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-green-700 text-sm">Toplam Lead:</span>
                    <span className="font-bold text-green-800">{partner.totalLeads}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700 text-sm">Dönüşen Hasta:</span>
                    <span className="font-bold text-green-800">{partner.convertedPatients}</span>
                  </div>
                  {partner.totalLeads > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-green-700 text-sm">Dönüşüm Oranı:</span>
                      <span className="font-bold text-green-800">%{partner.conversionRate}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-green-700 text-sm">Toplam Gelir:</span>
                    <span className="font-bold text-green-800">{partner.totalRevenue}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700 text-sm">Toplam Komisyon:</span>
                    <span className="font-bold text-green-800">{partner.totalCommission}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700 text-sm">Bekleyen Komisyon:</span>
                    <span className="font-bold text-orange-600">{partner.pendingCommission}</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-4 flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>KPI Metrikleri</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-orange-700 text-sm">Yanıt Süresi:</span>
                    <span className="font-medium text-orange-800">{partner.kpis.responseTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-700 text-sm">Hasta Memnuniyeti:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="font-medium text-orange-800">{partner.kpis.patientSatisfaction}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-700 text-sm">Evrak Uyumu:</span>
                    <span className="font-medium text-orange-800">%{partner.kpis.documentCompliance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-700 text-sm">Ödeme Dakikliği:</span>
                    <span className="font-medium text-orange-800">%{partner.kpis.paymentPunctuality}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Panel - Sözleşme & Portal */}
            <div className="space-y-6">
              <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="font-semibold text-indigo-900 mb-4 flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Sözleşme Bilgileri</span>
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-indigo-700 font-medium">Başlangıç:</span>
                    <p className="text-indigo-800">{partner.contractStart}</p>
                  </div>
                  <div>
                    <span className="text-indigo-700 font-medium">Bitiş:</span>
                    <p className="text-indigo-800">{partner.contractEnd}</p>
                  </div>
                  <div>
                    <span className="text-indigo-700 font-medium">Belgeler:</span>
                    <div className="space-y-1 mt-1">
                      {partner.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                          <span className="text-indigo-800 text-xs">{doc}</span>
                          <Download className="h-3 w-3 text-indigo-600 cursor-pointer" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg p-4">
                <h3 className="font-semibold text-teal-900 mb-4 flex items-center space-x-2">
                  <Monitor className="h-5 w-5" />
                  <span>Portal Erişimi</span>
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-teal-700">Portal Durumu:</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      partner.portalAccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {partner.portalAccess ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                  {partner.lastLogin && (
                    <div>
                      <span className="text-teal-700 font-medium">Son Giriş:</span>
                      <p className="text-teal-800">{partner.lastLogin}</p>
                    </div>
                  )}
                  <div className="space-y-2">
                    <button className="w-full bg-teal-100 hover:bg-teal-200 text-teal-800 py-2 px-3 rounded text-sm">
                      Portal Linki Gönder
                    </button>
                    <button className="w-full bg-teal-100 hover:bg-teal-200 text-teal-800 py-2 px-3 rounded text-sm">
                      Şifre Sıfırla
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Tag className="h-5 w-5" />
                  <span>Etiketler & Notlar</span>
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-700 font-medium text-sm">Etiketler:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {partner.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-700 font-medium text-sm">Notlar:</span>
                    <p className="text-gray-800 text-sm bg-white p-2 rounded mt-1">{partner.notes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Partner ID: {partner.id} • Son güncelleme: 2025-01-14 16:30
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
              Düzenle
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
              Portal Gönder
            </button>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors">
              Komisyon Öde
            </button>
            <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm transition-colors">
              Rapor İndir
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partner, Acenta ve 3. Şahıs Yönetimi</h1>
          <p className="text-gray-600 mt-1">Dış ortaklar, komisyon yönetimi ve portal sistemi</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Yeni Partner</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Partner</p>
              <p className="text-3xl font-bold text-red-600">247</p>
            </div>
            <Handshake className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+12 bu ay</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktif Sözleşmeler</p>
              <p className="text-3xl font-bold text-green-600">189</p>
            </div>
            <FileText className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">%76 aktif oran</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bekleyen Komisyon</p>
              <p className="text-3xl font-bold text-orange-600">€125K</p>
            </div>
            <DollarSign className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-sm text-orange-600 mt-2">Bu ay ödenecek</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ortalama Rating</p>
              <p className="text-3xl font-bold text-purple-600">4.7</p>
            </div>
            <Star className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">5 üzerinden</p>
        </div>
      </div>

      {/* Partner Types Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Partner Türleri ve Dağılım</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {partnerTypes.map((type) => (
            <div
              key={type.id}
              className="p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <type.icon className={`h-6 w-6 ${type.color}`} />
                <span className="text-2xl font-bold text-gray-700">
                  {partners.filter(p => p.type === type.id).length}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{type.name}</h4>
              <p className="text-xs text-gray-600">{type.description}</p>
            </div>
          ))}
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
                placeholder="Partner, şirket ara..."
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
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Türler</option>
              {partnerTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="warning">Uyarı</option>
              <option value="inactive">Pasif</option>
              <option value="pending">Beklemede</option>
            </select>
            
            <select
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Bölgeler</option>
              <option value="europe">Avrupa</option>
              <option value="middle-east">Orta Doğu</option>
              <option value="africa">Afrika</option>
              <option value="asia">Asya</option>
            </select>
          </div>
        </div>
      </div>

      {/* Partners List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Partner Bilgileri
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tür & Hizmetler
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performans
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Finansal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum & Portal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          {getTypeIcon(partner.type)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{partner.name}</div>
                        <div className="text-sm text-gray-500">{partner.representative}</div>
                        <div className="text-xs text-gray-400 flex items-center space-x-2">
                          <MapPin className="h-3 w-3" />
                          <span>{partner.city}, {partner.country}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getTypeName(partner.type)}</div>
                    <div className="text-sm text-gray-500">
                      {partner.services.slice(0, 2).join(', ')}
                      {partner.services.length > 2 && '...'}
                    </div>
                    <div className="text-xs text-gray-400">
                      {partner.regions.slice(0, 2).join(', ')}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-900">{partner.rating}</span>
                    </div>
                    {partner.totalLeads > 0 && (
                      <div className="text-sm text-gray-600">
                        {partner.convertedPatients}/{partner.totalLeads} hasta
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      {partner.totalLeads > 0 ? `%${partner.conversionRate} dönüşüm` : `${partner.convertedPatients} hasta`}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{partner.totalRevenue}</div>
                    <div className="text-sm text-green-600">{partner.totalCommission}</div>
                    {partner.pendingCommission !== '€0' && partner.pendingCommission !== '$0' && partner.pendingCommission !== '£0' && (
                      <div className="text-xs text-orange-600">Bekleyen: {partner.pendingCommission}</div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(partner.status)}`}>
                      {partner.status === 'active' ? 'Aktif' : 
                       partner.status === 'warning' ? 'Uyarı' : 
                       partner.status === 'inactive' ? 'Pasif' : 'Beklemede'}
                    </span>
                    <div className="text-xs text-gray-500 mt-1">
                      Portal: {partner.portalAccess ? 'Aktif' : 'Pasif'}
                    </div>
                    {partner.lastLogin && (
                      <div className="text-xs text-gray-400">
                        Son giriş: {partner.lastLogin.split(' ')[0]}
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedPartner(partner)}
                        className="text-blue-600 hover:text-blue-700 p-1 rounded"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 p-1 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-700 p-1 rounded">
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-700 p-1 rounded">
                        <CreditCard className="h-4 w-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-700 p-1 rounded">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Commission Models Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Percent className="h-5 w-5 text-green-600" />
          <span>Komisyon Modelleri</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {commissionModels.map((model) => (
            <div key={model.id} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">{model.name}</h4>
              <p className="text-sm text-gray-600">{model.description}</p>
              <div className="mt-3 text-xs text-gray-500">
                Kullanım: {partners.filter(p => p.commissionModel === model.id).length} partner
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Partner Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Partner Performans Analizi</span>
          </h3>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="text-xl font-bold text-blue-700">94%</span>
              </div>
              <h4 className="font-medium text-blue-900">Ortalama Başarı Oranı</h4>
              <p className="text-sm text-blue-700">Tüm partnerler</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Timer className="h-5 w-5 text-green-600" />
                <span className="text-xl font-bold text-green-700">2.8h</span>
              </div>
              <h4 className="font-medium text-green-900">Ortalama Yanıt Süresi</h4>
              <p className="text-sm text-green-700">Partner iletişimi</p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="text-xl font-bold text-purple-700">4.7</span>
              </div>
              <h4 className="font-medium text-purple-900">Ortalama Rating</h4>
              <p className="text-sm text-purple-700">Hasta değerlendirmesi</p>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span>Finansal Özet</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <h4 className="font-medium text-green-900">Toplam Komisyon</h4>
                <p className="text-sm text-green-700">Bu yıl ödenen</p>
              </div>
              <span className="text-2xl font-bold text-green-700">€2.4M</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div>
                <h4 className="font-medium text-orange-900">Bekleyen Ödemeler</h4>
                <p className="text-sm text-orange-700">Bu ay ödenecek</p>
              </div>
              <span className="text-2xl font-bold text-orange-700">€125K</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <h4 className="font-medium text-blue-900">Partner Geliri</h4>
                <p className="text-sm text-blue-700">Toplam ciro</p>
              </div>
              <span className="text-2xl font-bold text-blue-700">€16M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <span>Güvenlik & Yasal Uyumluluk</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Veri Güvenliği</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Partner sadece kendi datasına erişir</li>
              <li>• Tüm işlemler audit log'lu</li>
              <li>• 2FA zorunlu portal girişi</li>
              <li>• IP bazlı erişim kısıtlaması</li>
              <li>• Şifreli veri aktarımı</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Sözleşme Yönetimi</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Otomatik sözleşme takibi</li>
              <li>• Bitiş tarihi uyarıları</li>
              <li>• Dijital imza entegrasyonu</li>
              <li>• Yasal uyumluluk kontrolü</li>
              <li>• Arşivleme ve backup</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">KVKK/GDPR Uyumu</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Veri maskeleme ve anonimleştirme</li>
              <li>• Erişim hakkı yönetimi</li>
              <li>• Veri silme ve taşınabilirlik</li>
              <li>• Consent management</li>
              <li>• Uyumluluk raporları</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Partner Detail Modal */}
      {selectedPartner && renderPartnerDetail(selectedPartner)}
    </div>
  );
};

export default PartnerManagement;