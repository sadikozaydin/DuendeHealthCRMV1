import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  Euro, 
  TrendingUp, 
  FileText, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Download,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Building2,
  User,
  Calendar,
  BarChart3,
  PieChart,
  TrendingDown,
  AlertTriangle,
  Shield,
  Lock,
  Unlock,
  Receipt,
  Banknote,
  Wallet,
  QrCode,
  Link,
  Mail,
  MessageCircle,
  Phone,
  Settings,
  Target,
  Award,
  Activity,
  Zap,
  Bot,
  Database,
  Archive,
  History,
  Bell,
  Flag,
  Star,
  ThumbsUp,
  ThumbsDown,
  Timer,
  MapPin,
  Languages,
  Camera,
  Paperclip,
  ExternalLink,
  Copy,
  Share2,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  X,
  Check,
  Minus,
  Hash,
  AtSign,
  Percent
} from 'lucide-react';

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    method: 'all',
    currency: 'all',
    dateRange: 'all'
  });

  // Ödeme verileri
  const payments = [
    {
      id: 'PAY001',
      patientName: 'Maria Rodriguez',
      patientId: 'P001',
      amount: 45000,
      currency: 'EUR',
      method: 'Credit Card',
      gateway: 'PayTR',
      status: 'completed',
      type: 'full_payment',
      treatment: 'Kalp Cerrahisi',
      invoiceNumber: 'INV-2025-001',
      transactionId: 'TXN123456789',
      date: '2025-01-14 16:30',
      dueDate: '2025-01-14',
      paidDate: '2025-01-14 16:30',
      paymentLink: 'https://pay.example.com/abc123',
      device: 'Mobile',
      location: 'Online',
      fees: 450,
      netAmount: 44550,
      exchangeRate: 1.0,
      originalAmount: 45000,
      originalCurrency: 'EUR',
      installments: 1,
      currentInstallment: 1,
      coordinator: 'Dr. Mehmet Yılmaz',
      branch: 'Ana Merkez',
      notes: 'Tam ödeme, ameliyat öncesi',
      tags: ['Acil', 'Tam Ödeme'],
      refundable: true,
      refundedAmount: 0,
      commission: 2250,
      agentCommission: 1125,
      riskScore: 5,
      fraudCheck: 'passed',
      documents: ['receipt.pdf', 'invoice.pdf'],
      notifications: [
        { type: 'email', sent: true, date: '2025-01-14 16:31' },
        { type: 'whatsapp', sent: true, date: '2025-01-14 16:32' },
        { type: 'sms', sent: true, date: '2025-01-14 16:33' }
      ]
    },
    {
      id: 'PAY002',
      patientName: 'Ahmed Hassan',
      patientId: 'P002',
      amount: 5000,
      currency: 'USD',
      method: 'Bank Transfer',
      gateway: 'Manual',
      status: 'pending',
      type: 'deposit',
      treatment: 'Diz Protezi',
      invoiceNumber: 'INV-2025-002',
      transactionId: null,
      date: '2025-01-13 14:20',
      dueDate: '2025-01-15',
      paidDate: null,
      paymentLink: 'https://pay.example.com/def456',
      device: 'Desktop',
      location: 'Dubai Office',
      fees: 0,
      netAmount: 5000,
      exchangeRate: 0.85,
      originalAmount: 5882,
      originalCurrency: 'EUR',
      installments: 3,
      currentInstallment: 1,
      coordinator: 'Dr. Fatma Kaya',
      branch: 'Ana Merkez',
      notes: 'Kapora ödemesi, 3 taksit planı',
      tags: ['Kapora', 'Taksitli'],
      refundable: true,
      refundedAmount: 0,
      commission: 250,
      agentCommission: 125,
      riskScore: 15,
      fraudCheck: 'pending',
      documents: ['proforma.pdf'],
      notifications: [
        { type: 'email', sent: true, date: '2025-01-13 14:21' },
        { type: 'whatsapp', sent: false, date: null }
      ]
    },
    {
      id: 'PAY003',
      patientName: 'Sarah Thompson',
      patientId: 'P003',
      amount: 15000,
      currency: 'GBP',
      method: 'PayPal',
      gateway: 'PayPal',
      status: 'failed',
      type: 'full_payment',
      treatment: 'Plastik Cerrahi',
      invoiceNumber: 'INV-2025-003',
      transactionId: 'PP987654321',
      date: '2025-01-12 10:15',
      dueDate: '2025-01-12',
      paidDate: null,
      paymentLink: 'https://pay.example.com/ghi789',
      device: 'Tablet',
      location: 'Online',
      fees: 300,
      netAmount: 14700,
      exchangeRate: 1.15,
      originalAmount: 17250,
      originalCurrency: 'EUR',
      installments: 1,
      currentInstallment: 1,
      coordinator: 'Dr. Ayşe Demir',
      branch: 'Ana Merkez',
      notes: 'Ödeme başarısız, kart limiti aşıldı',
      tags: ['Başarısız', 'Tekrar Dene'],
      refundable: false,
      refundedAmount: 0,
      commission: 0,
      agentCommission: 0,
      riskScore: 25,
      fraudCheck: 'failed',
      documents: [],
      notifications: [
        { type: 'email', sent: true, date: '2025-01-12 10:16' }
      ]
    }
  ];

  // Fatura verileri
  const invoices = [
    {
      id: 'INV-2025-001',
      patientName: 'Maria Rodriguez',
      amount: 45000,
      currency: 'EUR',
      status: 'paid',
      type: 'e-invoice',
      issueDate: '2025-01-14',
      dueDate: '2025-01-14',
      paidDate: '2025-01-14',
      treatment: 'Kalp Cerrahisi',
      items: [
        { description: 'Kalp Bypass Ameliyatı', quantity: 1, unitPrice: 35000, total: 35000 },
        { description: 'Hastane Konaklama (5 gün)', quantity: 5, unitPrice: 1500, total: 7500 },
        { description: 'Anestezi ve Malzemeler', quantity: 1, unitPrice: 2500, total: 2500 }
      ],
      taxRate: 0,
      taxAmount: 0,
      totalAmount: 45000,
      language: 'Spanish',
      notes: 'Acil kalp cerrahisi paketi'
    },
    {
      id: 'INV-2025-002',
      patientName: 'Ahmed Hassan',
      amount: 25000,
      currency: 'USD',
      status: 'partial',
      type: 'proforma',
      issueDate: '2025-01-13',
      dueDate: '2025-01-20',
      paidDate: null,
      treatment: 'Diz Protezi',
      items: [
        { description: 'Diz Protezi Ameliyatı', quantity: 1, unitPrice: 20000, total: 20000 },
        { description: 'Fizyoterapi (10 seans)', quantity: 10, unitPrice: 500, total: 5000 }
      ],
      taxRate: 0,
      taxAmount: 0,
      totalAmount: 25000,
      paidAmount: 5000,
      remainingAmount: 20000,
      language: 'Arabic',
      notes: '3 taksit planı mevcut'
    }
  ];

  // Finansal özet verileri
  const financialSummary = {
    today: {
      revenue: 125000,
      payments: 8,
      pending: 25000,
      failed: 5000
    },
    thisMonth: {
      revenue: 2850000,
      payments: 156,
      pending: 450000,
      refunds: 25000
    },
    currencies: [
      { code: 'EUR', amount: 1250000, rate: 1.0 },
      { code: 'USD', amount: 850000, rate: 0.85 },
      { code: 'GBP', amount: 450000, rate: 1.15 },
      { code: 'TRY', amount: 300000, rate: 0.03 }
    ],
    paymentMethods: [
      { method: 'Credit Card', amount: 1800000, percentage: 63 },
      { method: 'Bank Transfer', amount: 650000, percentage: 23 },
      { method: 'PayPal', amount: 250000, percentage: 9 },
      { method: 'Cash', amount: 150000, percentage: 5 }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'refunded': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'partial': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'refunded': return <RefreshCw className="h-4 w-4 text-purple-600" />;
      case 'partial': return <Minus className="h-4 w-4 text-blue-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'Credit Card': return <CreditCard className="h-4 w-4 text-blue-600" />;
      case 'Bank Transfer': return <Building2 className="h-4 w-4 text-green-600" />;
      case 'PayPal': return <Wallet className="h-4 w-4 text-purple-600" />;
      case 'Cash': return <Banknote className="h-4 w-4 text-orange-600" />;
      case 'QR Code': return <QrCode className="h-4 w-4 text-gray-600" />;
      default: return <CreditCard className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCurrencyIcon = (currency: string) => {
    switch (currency) {
      case 'EUR': return <Euro className="h-4 w-4 text-blue-600" />;
      case 'USD': return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'GBP': return <DollarSign className="h-4 w-4 text-purple-600" />;
      case 'TRY': return <DollarSign className="h-4 w-4 text-red-600" />;
      default: return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Mobile': return <Smartphone className="h-3 w-3" />;
      case 'Desktop': return <Monitor className="h-3 w-3" />;
      case 'Tablet': return <Tablet className="h-3 w-3" />;
      default: return <Monitor className="h-3 w-3" />;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    const symbols = { EUR: '€', USD: '$', GBP: '£', TRY: '₺' };
    return `${symbols[currency] || currency} ${amount.toLocaleString()}`;
  };

  const renderPaymentDetail = (payment) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-green-50">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 h-12 w-12">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-green-600 flex items-center justify-center">
                <span className="text-white font-medium text-lg">
                  {payment.patientName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{payment.patientName}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>ID: {payment.id}</span>
                <span>•</span>
                <span>{payment.treatment}</span>
                <span>•</span>
                <span>{formatCurrency(payment.amount, payment.currency)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(payment.status)}`}>
              {payment.status === 'completed' ? 'Tamamlandı' : 
               payment.status === 'pending' ? 'Beklemede' : 
               payment.status === 'failed' ? 'Başarısız' : payment.status}
            </span>
            <button
              onClick={() => setSelectedPayment(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sol Panel - Ödeme Bilgileri */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Ödeme Detayları</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Tutar:</span>
                        <p className="font-bold text-lg text-blue-600">{formatCurrency(payment.amount, payment.currency)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Yöntem:</span>
                        <div className="flex items-center space-x-1">
                          {getMethodIcon(payment.method)}
                          <span className="font-medium">{payment.method}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Gateway:</span>
                        <p className="font-medium">{payment.gateway}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">İşlem ID:</span>
                        <p className="font-medium text-xs">{payment.transactionId || 'Beklemede'}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Komisyon:</span>
                        <p className="font-medium text-red-600">-{formatCurrency(payment.fees, payment.currency)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Net Tutar:</span>
                        <p className="font-medium text-green-600">{formatCurrency(payment.netAmount, payment.currency)}</p>
                      </div>
                    </div>
                  </div>

                  {payment.installments > 1 && (
                    <div className="bg-white rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 mb-2">Taksit Bilgileri</h4>
                      <div className="text-sm">
                        <p>Toplam Taksit: {payment.installments}</p>
                        <p>Mevcut Taksit: {payment.currentInstallment}</p>
                        <p>Taksit Tutarı: {formatCurrency(payment.amount / payment.installments, payment.currency)}</p>
                      </div>
                    </div>
                  )}

                  {payment.exchangeRate !== 1.0 && (
                    <div className="bg-white rounded-lg p-3">
                      <h4 className="font-medium text-gray-900 mb-2">Döviz Bilgileri</h4>
                      <div className="text-sm">
                        <p>Orijinal: {formatCurrency(payment.originalAmount, payment.originalCurrency)}</p>
                        <p>Kur: {payment.exchangeRate}</p>
                        <p>Çevrilmiş: {formatCurrency(payment.amount, payment.currency)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Güvenlik */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Güvenlik & Risk</span>
                </h3>
                <div className="bg-white rounded-lg p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Risk Skoru:</span>
                    <span className={`font-medium ${
                      payment.riskScore <= 10 ? 'text-green-600' : 
                      payment.riskScore <= 25 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {payment.riskScore}/100
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fraud Kontrol:</span>
                    <span className={`font-medium ${
                      payment.fraudCheck === 'passed' ? 'text-green-600' : 
                      payment.fraudCheck === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {payment.fraudCheck === 'passed' ? 'Geçti' : 
                       payment.fraudCheck === 'pending' ? 'Beklemede' : 'Başarısız'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cihaz:</span>
                    <div className="flex items-center space-x-1">
                      {getDeviceIcon(payment.device)}
                      <span className="font-medium">{payment.device}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Konum:</span>
                    <span className="font-medium">{payment.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Orta Panel - Fatura & Tarihler */}
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-4 flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Fatura & Tarihler</span>
                </h3>
                
                <div className="bg-white rounded-lg p-3 space-y-3">
                  <div>
                    <span className="text-gray-600 text-sm">Fatura No:</span>
                    <p className="font-medium">{payment.invoiceNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Ödeme Tarihi:</span>
                    <p className="font-medium">{payment.date}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Vade Tarihi:</span>
                    <p className="font-medium">{payment.dueDate}</p>
                  </div>
                  {payment.paidDate && (
                    <div>
                      <span className="text-gray-600 text-sm">Ödendi:</span>
                      <p className="font-medium text-green-600">{payment.paidDate}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600 text-sm">Koordinatör:</span>
                    <p className="font-medium">{payment.coordinator}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Şube:</span>
                    <p className="font-medium">{payment.branch}</p>
                  </div>
                </div>
              </div>

              {/* Komisyonlar */}
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-3 flex items-center space-x-2">
                  <Percent className="h-5 w-5" />
                  <span>Komisyonlar</span>
                </h3>
                <div className="bg-white rounded-lg p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Klinik Komisyonu:</span>
                    <span className="font-medium">{formatCurrency(payment.commission, payment.currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Acenta Komisyonu:</span>
                    <span className="font-medium">{formatCurrency(payment.agentCommission, payment.currency)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600 font-medium">Toplam Komisyon:</span>
                    <span className="font-bold">{formatCurrency(payment.commission + payment.agentCommission, payment.currency)}</span>
                  </div>
                </div>
              </div>

              {/* Etiketler */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Etiketler</h3>
                <div className="flex flex-wrap gap-2">
                  {payment.tags?.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sağ Panel - Bildirimler & Belgeler */}
            <div className="space-y-6">
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-4 flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Bildirimler</span>
                </h3>
                
                <div className="space-y-3">
                  {payment.notifications?.map((notification, index) => (
                    <div key={index} className="bg-white rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {notification.type === 'email' && <Mail className="h-4 w-4 text-blue-600" />}
                          {notification.type === 'whatsapp' && <MessageCircle className="h-4 w-4 text-green-600" />}
                          {notification.type === 'sms' && <Phone className="h-4 w-4 text-purple-600" />}
                          <span className="text-sm font-medium capitalize">{notification.type}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {notification.sent ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          )}
                          <span className="text-xs text-gray-500">
                            {notification.sent ? 'Gönderildi' : 'Başarısız'}
                          </span>
                        </div>
                      </div>
                      {notification.date && (
                        <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Belgeler */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Paperclip className="h-5 w-5" />
                  <span>Belgeler</span>
                </h3>
                <div className="space-y-2">
                  {payment.documents?.length > 0 ? (
                    payment.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-red-600" />
                          <span className="text-sm">{doc}</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">Belge bulunmuyor</p>
                  )}
                </div>
              </div>

              {/* Ödeme Linki */}
              {payment.paymentLink && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                    <Link className="h-5 w-5" />
                    <span>Ödeme Linki</span>
                  </h3>
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 truncate">{payment.paymentLink}</span>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Copy className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-700">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notlar */}
              {payment.notes && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Notlar</h3>
                  <p className="text-sm text-gray-700 bg-white p-3 rounded">{payment.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex space-x-3">
            {payment.status === 'pending' && (
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
                Ödemeyi Onayla
              </button>
            )}
            {payment.status === 'failed' && (
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                Tekrar Dene
              </button>
            )}
            {payment.refundable && payment.status === 'completed' && (
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors">
                İade İşlemi
              </button>
            )}
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
              Fatura Görüntüle
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
              WhatsApp Gönder
            </button>
            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors">
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
          <h1 className="text-3xl font-bold text-gray-900">Ödeme & Finans Yönetimi</h1>
          <p className="text-gray-600 mt-1">Ödeme işlemleri, faturalama ve finansal analiz</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Ödeme Al</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <FileText className="h-4 w-4" />
            <span>Fatura Oluştur</span>
          </button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bugünkü Gelir</p>
              <p className="text-3xl font-bold text-green-600">€{financialSummary.today.revenue.toLocaleString()}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">{financialSummary.today.payments} ödeme</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bekleyen Ödemeler</p>
              <p className="text-3xl font-bold text-yellow-600">€{financialSummary.today.pending.toLocaleString()}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-sm text-yellow-600 mt-2">Takip gerekli</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aylık Gelir</p>
              <p className="text-3xl font-bold text-blue-600">€{(financialSummary.thisMonth.revenue / 1000).toFixed(0)}K</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-blue-600 mt-2">+18% geçen aya göre</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Başarısız Ödemeler</p>
              <p className="text-3xl font-bold text-red-600">€{financialSummary.today.failed.toLocaleString()}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-sm text-red-600 mt-2">Müdahale gerekli</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Genel Bakış', icon: BarChart3 },
              { id: 'payments', label: 'Ödemeler', icon: CreditCard },
              { id: 'invoices', label: 'Faturalar', icon: FileText },
              { id: 'analytics', label: 'Analitik', icon: PieChart },
              { id: 'gateways', label: 'Ödeme Yöntemleri', icon: Settings },
              { id: 'automation', label: 'Otomasyon', icon: Bot }
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

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Currency Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Para Birimi Dağılımı</h3>
                  <div className="space-y-3">
                    {financialSummary.currencies.map((currency, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getCurrencyIcon(currency.code)}
                          <span className="font-medium">{currency.code}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(currency.amount, currency.code)}</p>
                          <p className="text-xs text-gray-500">Kur: {currency.rate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ödeme Yöntemleri</h3>
                  <div className="space-y-3">
                    {financialSummary.paymentMethods.map((method, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getMethodIcon(method.method)}
                          <span className="font-medium">{method.method}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">€{method.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">%{method.percentage}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Son İşlemler</h3>
                <div className="space-y-3">
                  {payments.slice(0, 5).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between bg-white p-4 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {getStatusIcon(payment.status)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{payment.patientName}</h4>
                          <p className="text-sm text-gray-600">{payment.treatment}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(payment.amount, payment.currency)}</p>
                        <p className="text-sm text-gray-500">{payment.date.split(' ')[0]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Hasta, işlem ara..."
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
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="completed">Tamamlandı</option>
                    <option value="pending">Beklemede</option>
                    <option value="failed">Başarısız</option>
                    <option value="refunded">İade</option>
                  </select>
                  
                  <select
                    value={filters.method}
                    onChange={(e) => setFilters({ ...filters, method: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Yöntemler</option>
                    <option value="credit-card">Kredi Kartı</option>
                    <option value="bank-transfer">Havale/EFT</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash">Nakit</option>
                  </select>
                  
                  <select
                    value={filters.currency}
                    onChange={(e) => setFilters({ ...filters, currency: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Para Birimleri</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="GBP">GBP</option>
                    <option value="TRY">TRY</option>
                  </select>
                </div>
              </div>

              {/* Payments Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hasta & İşlem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tutar & Yöntem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum & Tarih
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Komisyon & Net
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-green-600 flex items-center justify-center">
                                <span className="text-white font-medium text-sm">
                                  {payment.patientName.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{payment.patientName}</div>
                              <div className="text-sm text-gray-500">{payment.treatment}</div>
                              <div className="text-xs text-gray-400">ID: {payment.id}</div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">{formatCurrency(payment.amount, payment.currency)}</div>
                          <div className="text-sm text-gray-500 flex items-center space-x-1">
                            {getMethodIcon(payment.method)}
                            <span>{payment.method}</span>
                          </div>
                          <div className="text-xs text-gray-400">{payment.gateway}</div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2 mb-1">
                            {getStatusIcon(payment.status)}
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                              {payment.status === 'completed' ? 'Tamamlandı' : 
                               payment.status === 'pending' ? 'Beklemede' : 
                               payment.status === 'failed' ? 'Başarısız' : payment.status}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">{payment.date}</div>
                          {payment.paidDate && (
                            <div className="text-xs text-green-600">Ödendi: {payment.paidDate.split(' ')[0]}</div>
                          )}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-red-600">-{formatCurrency(payment.fees, payment.currency)}</div>
                          <div className="text-sm font-medium text-green-600">{formatCurrency(payment.netAmount, payment.currency)}</div>
                          <div className="text-xs text-gray-500">Komisyon: {formatCurrency(payment.commission, payment.currency)}</div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => setSelectedPayment(payment)}
                              className="text-blue-600 hover:text-blue-700 p-1 rounded"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-700 p-1 rounded">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700 p-1 rounded">
                              <Download className="h-4 w-4" />
                            </button>
                            <button className="text-purple-600 hover:text-purple-700 p-1 rounded">
                              <Send className="h-4 w-4" />
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

          {activeTab === 'invoices' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{invoice.id}</h3>
                        <p className="text-gray-600">{invoice.patientName}</p>
                        <p className="text-sm text-gray-500">{invoice.treatment}</p>
                      </div>
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                        {invoice.status === 'paid' ? 'Ödendi' : 
                         invoice.status === 'partial' ? 'Kısmi' : 
                         invoice.status === 'pending' ? 'Beklemede' : invoice.status}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">Fatura Kalemleri</h4>
                        <div className="space-y-2">
                          {invoice.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span className="text-gray-600">{item.description} (x{item.quantity})</span>
                              <span className="font-medium">{formatCurrency(item.total, invoice.currency)}</span>
                            </div>
                          ))}
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between font-bold">
                            <span>Toplam:</span>
                            <span>{formatCurrency(invoice.totalAmount, invoice.currency)}</span>
                          </div>
                          {invoice.paidAmount && (
                            <>
                              <div className="flex justify-between text-green-600">
                                <span>Ödenen:</span>
                                <span>{formatCurrency(invoice.paidAmount, invoice.currency)}</span>
                              </div>
                              <div className="flex justify-between text-red-600">
                                <span>Kalan:</span>
                                <span>{formatCurrency(invoice.remainingAmount, invoice.currency)}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Düzenleme: {invoice.issueDate}</span>
                        <span>Vade: {invoice.dueDate}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors">
                          Görüntüle
                        </button>
                        <button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg transition-colors">
                          İndir
                        </button>
                        <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-sm py-2 rounded-lg transition-colors">
                          Gönder
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="h-6 w-6 text-blue-600" />
                    <span className="text-2xl font-bold text-blue-700">94%</span>
                  </div>
                  <h4 className="font-medium text-blue-900">Ödeme Başarı Oranı</h4>
                  <p className="text-sm text-blue-700">Son 30 gün</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Timer className="h-6 w-6 text-green-600" />
                    <span className="text-2xl font-bold text-green-700">2.3dk</span>
                  </div>
                  <h4 className="font-medium text-green-900">Ortalama Ödeme Süresi</h4>
                  <p className="text-sm text-green-700">Başlangıçtan tamamlanmaya</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Award className="h-6 w-6 text-purple-600" />
                    <span className="text-2xl font-bold text-purple-700">€2.8M</span>
                  </div>
                  <h4 className="font-medium text-purple-900">Aylık Ciro</h4>
                  <p className="text-sm text-purple-700">+18% artış</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingDown className="h-6 w-6 text-orange-600" />
                    <span className="text-2xl font-bold text-orange-700">0.8%</span>
                  </div>
                  <h4 className="font-medium text-orange-900">İade Oranı</h4>
                  <p className="text-sm text-orange-700">Hedef: 1% altı</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Ödeme Trend Analizi</h3>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {[65, 78, 82, 75, 88, 92, 85, 95, 88, 92, 85, 100].map((height, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-2">
                        {new Date(2024, index).toLocaleDateString('tr', { month: 'short' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gateways' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'PayTR', status: 'active', transactions: 1250, success: 96, icon: <CreditCard className="h-6 w-6" />, color: 'green' },
                  { name: 'İyzico', status: 'active', transactions: 890, success: 94, icon: <CreditCard className="h-6 w-6" />, color: 'green' },
                  { name: 'PayPal', status: 'active', transactions: 456, success: 98, icon: <Wallet className="h-6 w-6" />, color: 'green' },
                  { name: 'Stripe', status: 'inactive', transactions: 0, success: 0, icon: <CreditCard className="h-6 w-6" />, color: 'gray' },
                  { name: 'Bank Transfer', status: 'active', transactions: 234, success: 100, icon: <Building2 className="h-6 w-6" />, color: 'green' },
                  { name: 'QR Payment', status: 'testing', transactions: 12, success: 92, icon: <QrCode className="h-6 w-6" />, color: 'yellow' }
                ].map((gateway, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          gateway.color === 'green' ? 'bg-green-100 text-green-600' :
                          gateway.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {gateway.icon}
                        </div>
                        <h3 className="font-semibold text-gray-900">{gateway.name}</h3>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        gateway.status === 'active' ? 'bg-green-500' :
                        gateway.status === 'testing' ? 'bg-yellow-500' :
                        'bg-gray-300'
                      }`}></div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">İşlem Sayısı:</span>
                        <span className="font-medium">{gateway.transactions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Başarı Oranı:</span>
                        <span className="font-medium">{gateway.success}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Durum:</span>
                        <span className={`font-medium ${
                          gateway.status === 'active' ? 'text-green-600' :
                          gateway.status === 'testing' ? 'text-yellow-600' :
                          'text-gray-600'
                        }`}>
                          {gateway.status === 'active' ? 'Aktif' :
                           gateway.status === 'testing' ? 'Test' : 'Pasif'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors">
                        Ayarları Düzenle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'automation' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  <span>AI Destekli Ödeme Otomasyonları</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Akıllı Hatırlatmalar</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Ödeme vadesi yaklaşan hastalar</li>
                      <li>• Başarısız ödeme tekrar denemeleri</li>
                      <li>• Taksit ödeme hatırlatmaları</li>
                      <li>• Kişiselleştirilmiş mesajlar</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Fraud Tespiti</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Şüpheli işlem tespiti</li>
                      <li>• Risk skorlama algoritması</li>
                      <li>• Otomatik güvenlik kontrolleri</li>
                      <li>• Gerçek zamanlı uyarılar</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Dinamik Fiyatlandırma</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Döviz kuru otomasyonu</li>
                      <li>• Kampanya ve indirimler</li>
                      <li>• Sezonsal fiyat ayarları</li>
                      <li>• Partner komisyon hesaplama</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Otomasyon Kuralları</h3>
                  <div className="space-y-4">
                    {[
                      { rule: 'Ödeme Başarısız → 24 saat sonra hatırlatma', status: 'active' },
                      { rule: 'Yüksek tutar → Manuel onay gerekli', status: 'active' },
                      { rule: 'Yabancı kart → Ek güvenlik kontrolü', status: 'active' },
                      { rule: 'Taksit gecikme → Otomatik SMS gönder', status: 'active' },
                      { rule: 'İade talebi → Finans ekibine bildir', status: 'active' }
                    ].map((automation, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-700">{automation.rule}</span>
                        <div className={`w-3 h-3 rounded-full ${
                          automation.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performans Metrikleri</h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Activity className="h-5 w-5 text-green-600" />
                        <span className="text-xl font-bold text-green-700">+23%</span>
                      </div>
                      <h4 className="font-medium text-green-900">Ödeme Başarı Artışı</h4>
                      <p className="text-sm text-green-700">Otomasyon sonrası</p>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Timer className="h-5 w-5 text-blue-600" />
                        <span className="text-xl font-bold text-blue-700">-45%</span>
                      </div>
                      <h4 className="font-medium text-blue-900">Manuel İşlem Azalması</h4>
                      <p className="text-sm text-blue-700">Zaman tasarrufu</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Shield className="h-5 w-5 text-purple-600" />
                        <span className="text-xl font-bold text-purple-700">99.2%</span>
                      </div>
                      <h4 className="font-medium text-purple-900">Fraud Tespit Doğruluğu</h4>
                      <p className="text-sm text-purple-700">AI algoritması</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Detail Modal */}
      {selectedPayment && renderPaymentDetail(selectedPayment)}
    </div>
  );
};

export default PaymentManagement;