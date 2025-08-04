import React, { useState } from 'react';
import { User, Smartphone, Globe, Shield, Calendar, FileText, CreditCard, MessageCircle, Plane, Bell, Star, Download, Upload, Eye, Edit, Settings, Lock, Unlock, Key, Mail, Phone, Video, MapPin, Clock, CheckCircle, AlertTriangle, Info, Heart, Activity, Stethoscope, Pill, Camera, Paperclip, Send, Search, Filter, Plus, MoreHorizontal, ExternalLink, Copy, Share2, RefreshCw, Wifi, WifiOff, Monitor, Tablet, Languages, Flag, Building2, Car, Hotel, Navigation, QrCode, Fingerprint, Database, Cloud, Server, HelpCircle, Headphones, Mic, Volume2, Image, Link, Hash, AtSign, Percent, DollarSign, Euro, Banknote, TrendingUp, BarChart3, Target, Award, Timer, Zap, Bot, Users, UserCheck, UserPlus, Briefcase, Package, ShoppingBag, Store, Home, Bed, Coffee, Utensils, Tv, AirVent, Bath, Fuel, ParkingCircle, Route, Compass, Truck, PlayCircle, PauseCircle, StopCircle, SkipForward, SkipBack, FastForward, Rewind, RotateCcw, Repeat, Shuffle, Volume1, VolumeX, MicOff, VideoOff, PhoneCall, PhoneIncoming, PhoneOutgoing, PhoneMissed, Voicemail, MessageSquare, MessageSquarePlus, MessageSquareMore, MessageSquareX, Inbox, MailOpen, MailPlus, MailMinus, MailX, MailCheck, MailWarning, MailQuestion, MailSearch, Facebook, Instagram, Twitter, Linkedin, Youtube, Github, Chrome, Bookmark, BookmarkPlus, BookmarkMinus, BookmarkX, BookmarkCheck, ThumbsUp, ThumbsDown, Smile, Frown, Meh, Angry, Laugh, Moon, Sun, CloudRain, CloudSnow, Thermometer, Wind, Umbrella, Sunrise, Sunset, Mountain, Trees, Waves, Flame, Snowflake, Droplets, Zap as Lightning, Rainbow, Cloudy, Cloudy as PartlyCloudy } from 'lucide-react';

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Portal kullanıcıları (hastalar)
  const portalUsers = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      email: 'maria.rodriguez@email.com',
      phone: '+34 612 345 678',
      country: 'İspanya',
      language: 'İspanyolca',
      registrationDate: '2024-12-15',
      lastLogin: '2025-01-14 16:30',
      loginCount: 47,
      status: 'active',
      verificationStatus: {
        email: true,
        phone: true,
        identity: true,
        medical: false
      },
      preferences: {
        language: 'es',
        timezone: 'Europe/Madrid',
        notifications: {
          email: true,
          sms: true,
          push: true,
          whatsapp: true
        },
        theme: 'light',
        accessibility: false
      },
      treatmentJourney: {
        currentStage: 'treatment',
        stages: [
          { id: 'consultation', name: 'Konsültasyon', status: 'completed', date: '2024-12-20' },
          { id: 'planning', name: 'Tedavi Planlaması', status: 'completed', date: '2025-01-05' },
          { id: 'travel', name: 'Seyahat Koordinasyonu', status: 'completed', date: '2025-01-10' },
          { id: 'treatment', name: 'Tedavi', status: 'active', date: '2025-01-15' },
          { id: 'recovery', name: 'İyileşme', status: 'pending', date: null },
          { id: 'followup', name: 'Takip', status: 'pending', date: null }
        ]
      },
      appointments: [
        {
          id: 1,
          type: 'Ameliyat Öncesi Muayene',
          doctor: 'Dr. Mehmet Yılmaz',
          date: '2025-01-16',
          time: '09:00',
          location: 'Acıbadem Hastanesi - Oda 205',
          status: 'confirmed',
          notes: 'Açlık gerekli'
        },
        {
          id: 2,
          type: 'Kalp Cerrahisi',
          doctor: 'Prof. Dr. Ahmet Kaya',
          date: '2025-01-18',
          time: '08:00',
          location: 'Acıbadem Hastanesi - Ameliyathane 3',
          status: 'scheduled',
          notes: 'Bypass ameliyatı'
        }
      ],
      documents: [
        { id: 1, name: 'Pasaport Kopyası', type: 'identity', status: 'approved', uploadDate: '2024-12-16' },
        { id: 2, name: 'EKG Raporu', type: 'medical', status: 'approved', uploadDate: '2024-12-18' },
        { id: 3, name: 'Kan Tahlili', type: 'medical', status: 'pending', uploadDate: '2025-01-10' },
        { id: 4, name: 'Ameliyat Onamı', type: 'consent', status: 'signed', uploadDate: '2025-01-12' }
      ],
      payments: [
        { id: 1, description: 'Ameliyat Avansı', amount: '€15,000', status: 'paid', date: '2025-01-05' },
        { id: 2, description: 'Hastane Ücreti', amount: '€25,000', status: 'pending', date: '2025-01-18' },
        { id: 3, description: 'Doktor Ücreti', amount: '€8,000', status: 'pending', date: '2025-01-20' }
      ],
      travel: {
        flight: {
          outbound: { airline: 'Turkish Airlines', flight: 'TK1856', date: '2025-01-15', status: 'confirmed' },
          return: { airline: 'Turkish Airlines', flight: 'TK1857', date: '2025-01-25', status: 'confirmed' }
        },
        hotel: { name: 'Medical Suites Istanbul', checkIn: '2025-01-15', checkOut: '2025-01-25', status: 'confirmed' },
        transfers: [
          { type: 'Havalimanı Karşılama', date: '2025-01-15', status: 'scheduled' },
          { type: 'Hastane Transferi', date: '2025-01-16', status: 'scheduled' }
        ]
      },
      satisfaction: {
        overall: 4.8,
        communication: 4.9,
        service: 4.7,
        facilities: 4.6
      }
    },
    {
      id: 2,
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      phone: '+971 50 123 4567',
      country: 'BAE',
      language: 'Arapça',
      registrationDate: '2025-01-08',
      lastLogin: '2025-01-13 14:20',
      loginCount: 12,
      status: 'active',
      verificationStatus: {
        email: true,
        phone: true,
        identity: false,
        medical: false
      },
      preferences: {
        language: 'ar',
        timezone: 'Asia/Dubai',
        notifications: {
          email: true,
          sms: false,
          push: true,
          whatsapp: true
        },
        theme: 'dark',
        accessibility: true
      },
      treatmentJourney: {
        currentStage: 'planning',
        stages: [
          { id: 'consultation', name: 'Konsültasyon', status: 'completed', date: '2025-01-10' },
          { id: 'planning', name: 'Tedavi Planlaması', status: 'active', date: '2025-01-12' },
          { id: 'travel', name: 'Seyahat Koordinasyonu', status: 'pending', date: null },
          { id: 'treatment', name: 'Tedavi', status: 'pending', date: null },
          { id: 'recovery', name: 'İyileşme', status: 'pending', date: null },
          { id: 'followup', name: 'Takip', status: 'pending', date: null }
        ]
      },
      appointments: [
        {
          id: 1,
          type: 'Ortopedi Konsültasyonu',
          doctor: 'Dr. Fatma Kaya',
          date: '2025-01-20',
          time: '14:00',
          location: 'Video Görüşme',
          status: 'confirmed',
          notes: 'Online konsültasyon'
        }
      ],
      documents: [
        { id: 1, name: 'MR Raporu', type: 'medical', status: 'approved', uploadDate: '2025-01-09' },
        { id: 2, name: 'Kimlik Belgesi', type: 'identity', status: 'pending', uploadDate: '2025-01-11' }
      ],
      payments: [
        { id: 1, description: 'Konsültasyon Ücreti', amount: '$500', status: 'paid', date: '2025-01-10' }
      ],
      travel: null,
      satisfaction: {
        overall: 4.5,
        communication: 4.6,
        service: 4.4,
        facilities: 4.5
      }
    }
  ];

  // Portal özellikleri
  const portalFeatures = [
    {
      id: 'authentication',
      name: 'Kimlik Doğrulama',
      icon: Shield,
      color: 'text-green-600',
      description: 'Çoklu giriş yöntemleri ve güvenlik',
      features: [
        'Email/Telefon + Şifre',
        'WhatsApp/SMS OTP',
        'Google/Apple/Facebook Login',
        '2FA (İki Faktörlü Doğrulama)',
        'Biyometrik Giriş (Mobil)',
        'Otomatik Dil Tanıma',
        'KVKK/GDPR Onayları'
      ],
      stats: {
        totalUsers: 2847,
        activeUsers: 1923,
        verifiedUsers: 2156,
        securityScore: 98
      }
    },
    {
      id: 'dashboard',
      name: 'Kişisel Dashboard',
      icon: User,
      color: 'text-blue-600',
      description: 'Kişiselleştirilmiş ana ekran',
      features: [
        'Profil Fotoğrafı ve Bilgiler',
        'Tedavi Yolculuğu Haritası',
        'Son Randevular ve Bildirimler',
        'Hızlı İşlem Kısayolları',
        'Kişisel Tercihler',
        'Dil ve Tema Seçimi',
        'Bildirim Merkezi'
      ],
      stats: {
        dailyLogins: 456,
        avgSessionTime: '12.5 dk',
        featureUsage: 87,
        satisfaction: 4.7
      }
    },
    {
      id: 'appointments',
      name: 'Randevu Yönetimi',
      icon: Calendar,
      color: 'text-purple-600',
      description: 'Randevu alma ve takip sistemi',
      features: [
        'Online Randevu Alma',
        'Video Görüşme Entegrasyonu',
        'Randevu İptal/Değiştirme',
        'Harita ve Yol Tarifi',
        'Randevu Hatırlatmaları',
        'Doktor Bilgileri',
        'Randevu Geçmişi'
      ],
      stats: {
        totalAppointments: 1247,
        onlineBookings: 892,
        videoConsultations: 234,
        cancellationRate: 8
      }
    },
    {
      id: 'medical',
      name: 'Tıbbi Kayıtlar',
      icon: Stethoscope,
      color: 'text-red-600',
      description: 'Tedavi süreci ve tıbbi dosyalar',
      features: [
        'Tedavi Yolculuğu Takibi',
        'Tıbbi Raporlar ve Sonuçlar',
        'İlaç ve Prosedür Bilgileri',
        'Doktor Notları',
        'Fotoğraf ve Video Kayıtları',
        'Geri Bildirim Sistemi',
        'Şikayet ve Talep Formu'
      ],
      stats: {
        medicalRecords: 3421,
        treatmentPlans: 567,
        patientFeedback: 4.6,
        completionRate: 94
      }
    },
    {
      id: 'documents',
      name: 'Evrak Yönetimi',
      icon: FileText,
      color: 'text-orange-600',
      description: 'Belge yükleme ve onam sistemi',
      features: [
        'Belge Yükleme (PDF, Fotoğraf)',
        'Dijital İmza Sistemi',
        'Onam Formları',
        'Evrak Durumu Takibi',
        'Güvenli İndirme',
        'Otomatik Çeviri',
        'Evrak Arşivi'
      ],
      stats: {
        documentsUploaded: 5678,
        digitalSignatures: 2341,
        approvalRate: 96,
        processingTime: '2.3 saat'
      }
    },
    {
      id: 'payments',
      name: 'Ödeme Sistemi',
      icon: CreditCard,
      color: 'text-green-600',
      description: 'Online ödeme ve fatura yönetimi',
      features: [
        'Online Ödeme (Kart, Havale)',
        'Taksit Seçenekleri',
        'Fatura Görüntüleme',
        'Ödeme Geçmişi',
        'Otomatik Hatırlatmalar',
        'Çoklu Para Birimi',
        'Güvenli Ödeme Gateway'
      ],
      stats: {
        totalPayments: '€2.4M',
        onlinePayments: 78,
        averageAmount: '€8,500',
        successRate: 99.2
      }
    },
    {
      id: 'communication',
      name: 'İletişim Hub\'ı',
      icon: MessageCircle,
      color: 'text-indigo-600',
      description: 'Çoklu kanal iletişim sistemi',
      features: [
        'WhatsApp Entegrasyonu',
        'Portal İçi Mesajlaşma',
        'Video Görüşme',
        'Otomatik Çeviri',
        'Dosya Paylaşımı',
        'Canlı Destek',
        'Mesaj Geçmişi'
      ],
      stats: {
        totalMessages: 12847,
        responseTime: '18 dk',
        satisfactionRate: 4.8,
        languages: 12
      }
    },
    {
      id: 'travel',
      name: 'Seyahat Koordinasyonu',
      icon: Plane,
      color: 'text-cyan-600',
      description: 'Ulaşım ve konaklama yönetimi',
      features: [
        'Uçuş Bilgileri ve Check-in',
        'Otel Rezervasyonları',
        'Transfer Koordinasyonu',
        'Harita ve Navigasyon',
        'Acil Durum Yardımı',
        'QR Kod Entegrasyonu',
        'Seyahat Rehberi'
      ],
      stats: {
        travelPlans: 567,
        hotelBookings: 423,
        transfers: 1134,
        satisfaction: 4.9
      }
    }
  ];

  // Mobil uygulama özellikleri
  const mobileFeatures = [
    {
      id: 'offline',
      name: 'Offline Çalışma',
      icon: WifiOff,
      description: 'İnternet bağlantısı olmadan temel işlevler'
    },
    {
      id: 'push',
      name: 'Push Bildirimler',
      icon: Bell,
      description: 'Anlık bildirimler ve hatırlatmalar'
    },
    {
      id: 'biometric',
      name: 'Biyometrik Giriş',
      icon: Fingerprint,
      description: 'Parmak izi ve yüz tanıma ile giriş'
    },
    {
      id: 'camera',
      name: 'Kamera Entegrasyonu',
      icon: Camera,
      description: 'Belge fotoğraflama ve QR kod okuma'
    },
    {
      id: 'location',
      name: 'Konum Servisleri',
      icon: MapPin,
      description: 'Navigasyon ve yakındaki hizmetler'
    },
    {
      id: 'voice',
      name: 'Sesli Komutlar',
      icon: Mic,
      description: 'Sesli arama ve komut sistemi'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationIcon = (verified: boolean) => {
    return verified ? 
      <CheckCircle className="h-4 w-4 text-green-600" /> : 
      <AlertTriangle className="h-4 w-4 text-yellow-600" />;
  };

  const renderPatientDetail = (patient) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 h-12 w-12">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-medium text-lg">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{patient.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{patient.country}</span>
                <span>•</span>
                <span>{patient.language}</span>
                <span>•</span>
                <span>Kayıt: {patient.registrationDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(patient.status)}`}>
              {patient.status === 'active' ? 'Aktif' : 'Pasif'}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">{patient.satisfaction.overall}</span>
            </div>
            <button
              onClick={() => setSelectedPatient(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sol Panel - Profil ve Doğrulama */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profil Bilgileri</span>
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-blue-700 font-medium">Email:</span>
                    <p className="text-blue-800">{patient.email}</p>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Telefon:</span>
                    <p className="text-blue-800">{patient.phone}</p>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Son Giriş:</span>
                    <p className="text-blue-800">{patient.lastLogin}</p>
                  </div>
                  <div>
                    <span className="text-blue-700 font-medium">Giriş Sayısı:</span>
                    <p className="text-blue-800">{patient.loginCount}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-4 flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Doğrulama Durumu</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 text-sm">Email:</span>
                    {getVerificationIcon(patient.verificationStatus.email)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 text-sm">Telefon:</span>
                    {getVerificationIcon(patient.verificationStatus.phone)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 text-sm">Kimlik:</span>
                    {getVerificationIcon(patient.verificationStatus.identity)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 text-sm">Tıbbi:</span>
                    {getVerificationIcon(patient.verificationStatus.medical)}
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-4 flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Tercihler</span>
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-purple-700 font-medium">Dil:</span>
                    <p className="text-purple-800">{patient.language}</p>
                  </div>
                  <div>
                    <span className="text-purple-700 font-medium">Tema:</span>
                    <p className="text-purple-800 capitalize">{patient.preferences.theme}</p>
                  </div>
                  <div>
                    <span className="text-purple-700 font-medium">Bildirimler:</span>
                    <div className="flex space-x-2 mt-1">
                      {patient.preferences.notifications.email && <Mail className="h-3 w-3 text-purple-600" />}
                      {patient.preferences.notifications.sms && <Phone className="h-3 w-3 text-purple-600" />}
                      {patient.preferences.notifications.push && <Bell className="h-3 w-3 text-purple-600" />}
                      {patient.preferences.notifications.whatsapp && <MessageCircle className="h-3 w-3 text-purple-600" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Orta Panel - Tedavi Yolculuğu */}
            <div className="space-y-6">
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-4 flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Tedavi Yolculuğu</span>
                </h3>
                
                <div className="space-y-3">
                  {patient.treatmentJourney.stages.map((stage, index) => (
                    <div key={stage.id} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        stage.status === 'completed' ? 'bg-green-100 text-green-700' :
                        stage.status === 'active' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-500'
                      }`}>
                        {stage.status === 'completed' ? <CheckCircle className="h-4 w-4" /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 text-sm">{stage.name}</h5>
                        {stage.date && (
                          <p className="text-xs text-gray-500">{stage.date}</p>
                        )}
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        stage.status === 'completed' ? 'bg-green-500' :
                        stage.status === 'active' ? 'bg-blue-500' :
                        'bg-gray-300'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="font-semibold text-indigo-900 mb-4 flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Randevular</span>
                </h3>
                
                <div className="space-y-3">
                  {patient.appointments.map((appointment) => (
                    <div key={appointment.id} className="bg-white rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{appointment.type}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status === 'confirmed' ? 'Onaylandı' : 
                           appointment.status === 'scheduled' ? 'Planlandı' : 'Beklemede'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>{appointment.doctor}</p>
                        <p>{appointment.date} • {appointment.time}</p>
                        <p>{appointment.location}</p>
                        {appointment.notes && (
                          <p className="text-orange-600 font-medium">{appointment.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sağ Panel - Belgeler ve Ödemeler */}
            <div className="space-y-6">
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-4 flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Belgeler</span>
                </h3>
                
                <div className="space-y-2">
                  {patient.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between bg-white p-2 rounded">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                        <p className="text-xs text-gray-500">{doc.uploadDate}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                          doc.status === 'signed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {doc.status === 'approved' ? 'Onaylandı' :
                           doc.status === 'signed' ? 'İmzalandı' : 'Beklemede'}
                        </span>
                        <Download className="h-3 w-3 text-gray-600 cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-4 flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Ödemeler</span>
                </h3>
                
                <div className="space-y-2">
                  {patient.payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between bg-white p-2 rounded">
                      <div>
                        <span className="text-sm font-medium text-gray-900">{payment.description}</span>
                        <p className="text-xs text-gray-500">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-gray-900">{payment.amount}</span>
                        <p className={`text-xs ${
                          payment.status === 'paid' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {payment.status === 'paid' ? 'Ödendi' : 'Beklemede'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {patient.travel && (
                <div className="bg-cyan-50 rounded-lg p-4">
                  <h3 className="font-semibold text-cyan-900 mb-4 flex items-center space-x-2">
                    <Plane className="h-5 w-5" />
                    <span>Seyahat</span>
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-cyan-700 font-medium">Gidiş Uçuşu:</span>
                      <p className="text-cyan-800">{patient.travel.flight.outbound.airline} {patient.travel.flight.outbound.flight}</p>
                      <p className="text-cyan-800">{patient.travel.flight.outbound.date}</p>
                    </div>
                    <div>
                      <span className="text-cyan-700 font-medium">Konaklama:</span>
                      <p className="text-cyan-800">{patient.travel.hotel.name}</p>
                      <p className="text-cyan-800">{patient.travel.hotel.checkIn} - {patient.travel.hotel.checkOut}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Hasta ID: {patient.id} • Portal Kullanımı: {patient.loginCount} giriş
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
              Portal Gönder
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
              Mesaj Gönder
            </button>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors">
              Rapor İndir
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeatureDetail = (feature) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg bg-white`}>
              <feature.icon className={`h-6 w-6 ${feature.color}`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{feature.name}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
          <button
            onClick={() => setShowFeatureModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Özellikler */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Özellikler</h3>
              <div className="space-y-2">
                {feature.features.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* İstatistikler */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">İstatistikler</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(feature.stats).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-lg font-bold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>
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
          <h1 className="text-3xl font-bold text-gray-900">Hasta Portalı ve Mobil Uygulama</h1>
          <p className="text-gray-600 mt-1">Self-servis hasta portalı ve mobil uygulama yönetimi</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Smartphone className="h-4 w-4" />
            <span>Mobil App</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Globe className="h-4 w-4" />
            <span>Portal Ayarları</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kayıtlı Hastalar</p>
              <p className="text-3xl font-bold text-blue-600">2,847</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+156 bu ay</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktif Kullanıcılar</p>
              <p className="text-3xl font-bold text-green-600">1,923</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">%67 aktiflik</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mobil Kullanım</p>
              <p className="text-3xl font-bold text-purple-600">78%</p>
            </div>
            <Smartphone className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">Mobil vs Web</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Memnuniyet</p>
              <p className="text-3xl font-bold text-orange-600">4.7</p>
            </div>
            <Star className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-sm text-orange-600 mt-2">5 üzerinden</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Genel Bakış', icon: Eye },
              { id: 'users', label: 'Portal Kullanıcıları', icon: Users },
              { id: 'features', label: 'Portal Özellikleri', icon: Settings },
              { id: 'mobile', label: 'Mobil Uygulama', icon: Smartphone },
              { id: 'analytics', label: 'Kullanım Analitikleri', icon: BarChart3 },
              { id: 'security', label: 'Güvenlik & Uyumluluk', icon: Shield }
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
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Portal Genel Bakış</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-700">2,847</span>
                  </div>
                  <h4 className="font-medium text-blue-900">Toplam Kullanıcı</h4>
                  <p className="text-sm text-blue-700">Kayıtlı hasta sayısı</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Activity className="h-8 w-8 text-green-600" />
                    <span className="text-2xl font-bold text-green-700">67%</span>
                  </div>
                  <h4 className="font-medium text-green-900">Aktiflik Oranı</h4>
                  <p className="text-sm text-green-700">Son 30 gün</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Timer className="h-8 w-8 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-700">12.5dk</span>
                  </div>
                  <h4 className="font-medium text-purple-900">Ortalama Oturum</h4>
                  <p className="text-sm text-purple-700">Kullanıcı başına</p>
                </div>
              </div>

              {/* Platform Dağılımı */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Platform Kullanım Dağılımı</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-6 w-6 text-blue-600" />
                      <span className="font-medium text-gray-900">Mobil</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">78%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Monitor className="h-6 w-6 text-green-600" />
                      <span className="font-medium text-gray-900">Web</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">18%</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Tablet className="h-6 w-6 text-purple-600" />
                      <span className="font-medium text-gray-900">Tablet</span>
                    </div>
                    <span className="text-lg font-bold text-purple-600">4%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Portal Kullanıcıları</h3>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Hasta ara..."
                      className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                    Portal Davetiyesi Gönder
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hasta Bilgileri
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Portal Durumu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doğrulama
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aktivite
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {portalUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-medium text-sm">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                              <div className="text-xs text-gray-400">{user.country} • {user.language}</div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                            {user.status === 'active' ? 'Aktif' : 'Pasif'}
                          </span>
                          <div className="text-xs text-gray-500 mt-1">
                            Son giriş: {user.lastLogin.split(' ')[0]}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.loginCount} giriş
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            {getVerificationIcon(user.verificationStatus.email)}
                            {getVerificationIcon(user.verificationStatus.phone)}
                            {getVerificationIcon(user.verificationStatus.identity)}
                            {getVerificationIcon(user.verificationStatus.medical)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {Object.values(user.verificationStatus).filter(Boolean).length}/4 doğrulandı
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            Aşama: {user.treatmentJourney.currentStage}
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.appointments.length} randevu
                          </div>
                          <div className="text-xs text-gray-500">
                            {user.documents.length} belge
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => setSelectedPatient(user)}
                              className="text-blue-600 hover:text-blue-700 p-1 rounded"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700 p-1 rounded">
                              <MessageCircle className="h-4 w-4" />
                            </button>
                            <button className="text-purple-600 hover:text-purple-700 p-1 rounded">
                              <Send className="h-4 w-4" />
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
          )}

          {activeTab === 'features' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Portal Özellikleri</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portalFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    onClick={() => {
                      setSelectedFeature(feature);
                      setShowFeatureModal(true);
                    }}
                    className="p-6 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{feature.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                    <div className="text-xs text-gray-500">
                      {feature.features.length} özellik
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mobile' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Mobil Uygulama</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Mobil Özellikler */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Mobil Özel Özellikler</h4>
                  <div className="space-y-4">
                    {mobileFeatures.map((feature) => (
                      <div key={feature.id} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                        <feature.icon className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-gray-900 text-sm">{feature.name}</h5>
                          <p className="text-xs text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* App Store Bilgileri */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Uygulama Mağazası</h4>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">iOS App Store</span>
                        <span className="text-green-600 text-sm">Yayında</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Versiyon: 2.1.3</p>
                        <p>Rating: 4.8/5 (1,247 değerlendirme)</p>
                        <p>İndirme: 12,847</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Google Play Store</span>
                        <span className="text-green-600 text-sm">Yayında</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Versiyon: 2.1.3</p>
                        <p>Rating: 4.7/5 (2,156 değerlendirme)</p>
                        <p>İndirme: 18,923</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Huawei AppGallery</span>
                        <span className="text-yellow-600 text-sm">Beklemede</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Versiyon: 2.1.0</p>
                        <p>Durum: İnceleme aşamasında</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Push Notification Stats */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Push Bildirim İstatistikleri</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">89%</p>
                    <p className="text-sm text-gray-600">Açılma Oranı</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">2.3dk</p>
                    <p className="text-sm text-gray-600">Ortalama Yanıt</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">1,247</p>
                    <p className="text-sm text-gray-600">Günlük Bildirim</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">94%</p>
                    <p className="text-sm text-gray-600">Aktif Kullanıcı</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Kullanım Analitikleri</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="h-6 w-6 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-700">2,847</span>
                  </div>
                  <h4 className="font-medium text-blue-900">Toplam Kullanıcı</h4>
                  <p className="text-sm text-blue-700">+156 bu ay</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Activity className="h-6 w-6 text-green-600" />
                    <span className="text-2xl font-bold text-green-700">67%</span>
                  </div>
                  <h4 className="font-medium text-green-900">Aktiflik Oranı</h4>
                  <p className="text-sm text-green-700">Son 30 gün</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Timer className="h-6 w-6 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-700">12.5dk</span>
                  </div>
                  <h4 className="font-medium text-purple-900">Oturum Süresi</h4>
                  <p className="text-sm text-purple-700">Ortalama</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Star className="h-6 w-6 text-orange-600" />
                    <span className="text-2xl font-bold text-orange-700">4.7</span>
                  </div>
                  <h4 className="font-medium text-orange-900">Memnuniyet</h4>
                  <p className="text-sm text-orange-700">5 üzerinden</p>
                </div>
              </div>

              {/* Feature Usage */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Özellik Kullanım Oranları</h4>
                <div className="space-y-4">
                  {[
                    { feature: 'Randevu Alma', usage: 89, color: 'bg-blue-500' },
                    { feature: 'Belge Yükleme', usage: 76, color: 'bg-green-500' },
                    { feature: 'Ödeme Yapma', usage: 68, color: 'bg-purple-500' },
                    { feature: 'Mesajlaşma', usage: 82, color: 'bg-indigo-500' },
                    { feature: 'Tıbbi Kayıtlar', usage: 71, color: 'bg-orange-500' },
                    { feature: 'Seyahat Bilgileri', usage: 45, color: 'bg-cyan-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{item.feature}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${item.color}`}
                            style={{ width: `${item.usage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{item.usage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Güvenlik & Yasal Uyumluluk</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-medium text-green-900 mb-4 flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Güvenlik Önlemleri</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>End-to-end şifreleme</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>2FA zorunlu giriş</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Biyometrik doğrulama</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Session timeout</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>IP bazlı erişim kontrolü</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Audit log sistemi</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-medium text-blue-900 mb-4 flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>KVKK/GDPR Uyumu</span>
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Açık rıza yönetimi</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Veri taşınabilirlik hakkı</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Unutulma hakkı</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Veri minimizasyonu</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Anonimleştirme</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Uyumluluk raporları</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Security Metrics */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Güvenlik Metrikleri</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">99.8%</p>
                    <p className="text-sm text-gray-600">Uptime</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">0</p>
                    <p className="text-sm text-gray-600">Güvenlik İhlali</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">98%</p>
                    <p className="text-sm text-gray-600">2FA Kullanımı</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-600">A+</p>
                    <p className="text-sm text-gray-600">SSL Rating</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI & Automation Features */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span>AI Destekli Portal Özellikleri</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Akıllı Asistan</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 24/7 chatbot desteği</li>
              <li>• Çoklu dil desteği</li>
              <li>• Sesli komut tanıma</li>
              <li>• Akıllı randevu önerisi</li>
              <li>• Otomatik form doldurma</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Kişiselleştirme</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Kullanıcı davranış analizi</li>
              <li>• Özelleştirilmiş dashboard</li>
              <li>• Akıllı bildirim zamanlaması</li>
              <li>• İçerik önerileri</li>
              <li>• Adaptif arayüz</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Öngörülü Analitik</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Risk analizi ve uyarıları</li>
              <li>• Tedavi süreci tahmini</li>
              <li>• Memnuniyet öngörüsü</li>
              <li>• Churn prediction</li>
              <li>• Otomatik raporlama</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Integration Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Zap className="h-5 w-5 text-green-600" />
          <span>Entegrasyon Durumu</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'CRM Sistemi', status: 'connected', icon: Database, color: 'green' },
            { name: 'WhatsApp Business', status: 'connected', icon: MessageCircle, color: 'green' },
            { name: 'Payment Gateway', status: 'connected', icon: CreditCard, color: 'green' },
            { name: 'Google Calendar', status: 'connected', icon: Calendar, color: 'green' },
            { name: 'Zoom Video', status: 'warning', icon: Video, color: 'yellow' },
            { name: 'Apple Health', status: 'error', icon: Heart, color: 'red' }
          ].map((integration, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  integration.color === 'green' ? 'bg-green-100 text-green-600' :
                  integration.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  <integration.icon className="h-4 w-4" />
                </div>
                <span className="font-medium text-gray-900">{integration.name}</span>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                integration.status === 'connected' ? 'bg-green-500' :
                integration.status === 'warning' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && renderPatientDetail(selectedPatient)}

      {/* Feature Detail Modal */}
      {showFeatureModal && selectedFeature && renderFeatureDetail(selectedFeature)}
    </div>
  );
};

export default PatientPortal;