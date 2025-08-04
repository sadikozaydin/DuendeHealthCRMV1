import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Globe, BarChart3, PieChart, LineChart, Activity, Target, Award, Timer, Calendar, Filter, Download, Share2, RefreshCw, Settings, Eye, Edit, Plus, Search, ChevronDown, ChevronUp, ArrowUp, ArrowDown, Minus, AlertTriangle, CheckCircle, Clock, Star, Heart, Brain, Zap, Shield, Database, FileText, Mail, Phone, MessageCircle, MapPin, Building, CreditCard, Plane, Car, Stethoscope, Pill, Scissors, Bone, Monitor, Smartphone, Tablet, Wifi, WifiOff, Bot, TrendingDown, Percent, Hash, AtSign, Link, ExternalLink, Copy, Flag, Bookmark, Archive, Trash2, MoreHorizontal, Info, HelpCircle, AlertCircle, XCircle, PlayCircle, PauseCircle, StopCircle, SkipForward, SkipBack, FastForward, Rewind, Volume2, VolumeX, Mic, MicOff, Video, VideoOff, Camera, Image, Paperclip, Send, Inbox, Bell, User, UserPlus, UserCheck, UserX, UserMinus, Crown, Key, Lock, Unlock, ShieldCheck, ShieldAlert, ShieldX, Fingerprint, Scan, QrCode, Barcode, CameraOff, ScanLine, Radar, Radio, Rss, Satellite, Signal, Antenna, Router, Server, HardDrive, Cpu, MemoryStick as Memory, Disc, Save, FolderOpen, Folder, File, FilePlus, FileMinus, FileX, FileCheck, FileEdit, FileSearch, FileText as FileTextIcon, FileImage, FileVideo, FileAudio, FileCode, FileSpreadsheet, FileBarChart, FilePieChart, FileLineChart, Layers, Layout, Grid, List, Table, Columns, Rows, Square, Circle, Triangle, Hexagon, Pentagon, Octagon, Diamond, Shapes, Palette, Brush, Pen, PenTool, Eraser, Highlighter, Type, Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify, Indent, Outdent, ListOrdered, ListOrdered as ListUnordered, Quote, Code, CodeSquare, Terminal, Command, Option, Bolt as Alt, Gift as Shift, Citrus as Ctrl, Space, Pointer as Enter, Backpack as Backspace, Delete, Table as Tab, Lock as CapsLock, Grape as Escape, Home, ListEnd as End, ImageUp as PageUp, ImageDown as PageDown, Dessert as Insert, Printer as PrintScreen, Scroll as ScrollLock, Pause, Lock as NumLock, AArrowDown as F1, AArrowDown as F2, AArrowDown as F3, AArrowDown as F4, AArrowDown as F5, AArrowDown as F6, AArrowDown as F7, AArrowDown as F8, AArrowDown as F9, Clock10 as F10, Clock11 as F11, Clock12 as F12 } from 'lucide-react';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedRole, setSelectedRole] = useState('admin');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState(['revenue', 'patients', 'conversion']);

  // Rol bazlı dashboard konfigürasyonu
  const roleConfigs = {
    admin: {
      name: 'Yönetici Dashboard',
      description: 'Tüm klinik/şube/ülke bazında genel performans',
      metrics: ['revenue', 'patients', 'conversion', 'satisfaction', 'leads', 'treatments']
    },
    branch_manager: {
      name: 'Şube Müdürü Dashboard',
      description: 'Kendi şubesi özelinde detaylı analiz',
      metrics: ['branch_revenue', 'branch_patients', 'staff_performance', 'capacity']
    },
    sales: {
      name: 'Satış Dashboard',
      description: 'Kaynak, kanal, kampanya, dönüşüm odaklı',
      metrics: ['leads', 'conversion', 'campaigns', 'sources', 'agent_performance']
    },
    doctor: {
      name: 'Doktor Dashboard',
      description: 'Hasta, tedavi, başarı/komplikasyon odaklı',
      metrics: ['patients', 'treatments', 'success_rate', 'complications', 'satisfaction']
    },
    finance: {
      name: 'Finans Dashboard',
      description: 'Tahsilat, bakiye, ödeme, maliyet, kampanya',
      metrics: ['revenue', 'collections', 'outstanding', 'costs', 'profitability']
    },
    partner: {
      name: 'Partner Dashboard',
      description: 'Yönlendirme, komisyon, performans',
      metrics: ['referrals', 'commission', 'conversion', 'partner_revenue']
    }
  };

  // Ana metrikler
  const mainMetrics = [
    {
      id: 'revenue',
      title: 'Toplam Gelir',
      value: '₺18.2M',
      change: '+23%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Bu ay toplam gelir',
      target: '₺20M',
      targetProgress: 91
    },
    {
      id: 'patients',
      title: 'Aktif Hastalar',
      value: '2,847',
      change: '+18%',
      changeType: 'positive',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Toplam aktif hasta sayısı',
      target: '3,000',
      targetProgress: 95
    },
    {
      id: 'conversion',
      title: 'Dönüşüm Oranı',
      value: '68%',
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Lead → Hasta dönüşümü',
      target: '70%',
      targetProgress: 97
    },
    {
      id: 'satisfaction',
      title: 'Memnuniyet Skoru',
      value: '4.8/5',
      change: '+0.2',
      changeType: 'positive',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'Hasta memnuniyet ortalaması',
      target: '4.9',
      targetProgress: 98
    },
    {
      id: 'leads',
      title: 'Yeni Lead\'ler',
      value: '1,247',
      change: '+12%',
      changeType: 'positive',
      icon: UserPlus,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Bu ay gelen lead sayısı',
      target: '1,300',
      targetProgress: 96
    },
    {
      id: 'response_time',
      title: 'Ortalama Yanıt Süresi',
      value: '18dk',
      change: '-5dk',
      changeType: 'positive',
      icon: Timer,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Lead yanıt süresi',
      target: '15dk',
      targetProgress: 83
    }
  ];

  // Tedavi kategorileri performansı
  const treatmentPerformance = [
    {
      category: 'Kardiyoloji',
      patients: 245,
      revenue: '₺6.7M',
      growth: '+15%',
      satisfaction: '96%',
      avgCost: '₺27,347',
      successRate: '94%',
      complications: '2%',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      category: 'Ortopedi',
      patients: 198,
      revenue: '₺5.4M',
      growth: '+8%',
      satisfaction: '94%',
      avgCost: '₺27,273',
      successRate: '96%',
      complications: '1.5%',
      icon: Bone,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      category: 'Onkoloji',
      patients: 156,
      revenue: '₺9.1M',
      growth: '+22%',
      satisfaction: '98%',
      avgCost: '₺58,333',
      successRate: '92%',
      complications: '3%',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      category: 'Plastik Cerrahi',
      patients: 134,
      revenue: '₺4.2M',
      growth: '+12%',
      satisfaction: '93%',
      avgCost: '₺31,343',
      successRate: '98%',
      complications: '0.5%',
      icon: Scissors,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      category: 'Diş Tedavisi',
      patients: 289,
      revenue: '₺2.6M',
      growth: '+18%',
      satisfaction: '95%',
      avgCost: '₺8,996',
      successRate: '99%',
      complications: '0.2%',
      icon: Pill,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  // Lead kaynakları analizi
  const leadSources = [
    {
      source: 'WhatsApp',
      leads: 456,
      conversion: '72%',
      cost: '₺145',
      revenue: '₺2.1M',
      quality: 'Yüksek',
      icon: MessageCircle,
      color: 'text-green-600',
      trend: '+15%'
    },
    {
      source: 'Meta Ads',
      leads: 342,
      conversion: '58%',
      cost: '₺289',
      revenue: '₺1.8M',
      quality: 'Orta',
      icon: Globe,
      color: 'text-blue-600',
      trend: '+8%'
    },
    {
      source: 'Google Ads',
      leads: 298,
      conversion: '64%',
      cost: '₺234',
      revenue: '₺1.6M',
      quality: 'Yüksek',
      icon: Search,
      color: 'text-orange-600',
      trend: '+12%'
    },
    {
      source: 'Organik',
      leads: 189,
      conversion: '78%',
      cost: '₺0',
      revenue: '₺1.2M',
      quality: 'Çok Yüksek',
      icon: TrendingUp,
      color: 'text-purple-600',
      trend: '+25%'
    },
    {
      source: 'Referans',
      leads: 156,
      conversion: '85%',
      cost: '₺50',
      revenue: '₺1.4M',
      quality: 'Çok Yüksek',
      icon: Users,
      color: 'text-indigo-600',
      trend: '+20%'
    }
  ];

  // Ülke bazlı performans
  const countryPerformance = [
    {
      country: 'Türkiye',
      flag: '🇹🇷',
      patients: 1247,
      revenue: '₺8.9M',
      growth: '+18%',
      avgStay: '8.5 gün',
      satisfaction: '4.7',
      topTreatment: 'Kardiyoloji'
    },
    {
      country: 'İspanya',
      flag: '🇪🇸',
      patients: 456,
      revenue: '₺3.2M',
      growth: '+25%',
      avgStay: '12.3 gün',
      satisfaction: '4.9',
      topTreatment: 'Onkoloji'
    },
    {
      country: 'İngiltere',
      flag: '🇬🇧',
      patients: 342,
      revenue: '₺2.8M',
      growth: '+15%',
      avgStay: '9.7 gün',
      satisfaction: '4.8',
      topTreatment: 'Plastik Cerrahi'
    },
    {
      country: 'BAE',
      flag: '🇦🇪',
      patients: 298,
      revenue: '₺2.1M',
      growth: '+22%',
      avgStay: '7.2 gün',
      satisfaction: '4.6',
      topTreatment: 'Ortopedi'
    },
    {
      country: 'Almanya',
      flag: '🇩🇪',
      patients: 234,
      revenue: '₺1.9M',
      growth: '+12%',
      avgStay: '11.1 gün',
      satisfaction: '4.8',
      topTreatment: 'Kardiyoloji'
    }
  ];

  // AI öngörüleri ve uyarılar
  const aiInsights = [
    {
      id: 1,
      type: 'prediction',
      title: 'Gelir Tahmini',
      message: 'Mevcut trend devam ederse, bu ay hedefi %15 aşacaksınız',
      confidence: '94%',
      impact: 'Pozitif',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: 'Kapasite artırımı önerisi'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Dönüşüm Oranı Düşüşü',
      message: 'Meta Ads kampanyalarında %8 düşüş tespit edildi',
      confidence: '87%',
      impact: 'Negatif',
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      action: 'Kampanya optimizasyonu gerekli'
    },
    {
      id: 3,
      type: 'opportunity',
      title: 'Yeni Pazar Fırsatı',
      message: 'Fransa\'dan gelen lead\'lerde %45 artış var',
      confidence: '91%',
      impact: 'Pozitif',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: 'Fransızca destek ekibi önerisi'
    },
    {
      id: 4,
      type: 'risk',
      title: 'Kapasite Riski',
      message: 'Kardiyoloji bölümünde %95 doluluk oranına ulaşıldı',
      confidence: '98%',
      impact: 'Kritik',
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      action: 'Acil kapasite planlaması'
    }
  ];

  // Operasyonel metrikler
  const operationalMetrics = [
    {
      metric: 'Randevu Doluluk Oranı',
      value: '87%',
      target: '85%',
      status: 'above',
      trend: '+3%',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      metric: 'Ortalama Kalış Süresi',
      value: '9.2 gün',
      target: '8.5 gün',
      status: 'above',
      trend: '+0.7',
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      metric: 'No-Show Oranı',
      value: '3.2%',
      target: '5%',
      status: 'below',
      trend: '-1.1%',
      icon: UserX,
      color: 'text-green-600'
    },
    {
      metric: 'Zamanında İşlem',
      value: '94%',
      target: '90%',
      status: 'above',
      trend: '+2%',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      metric: 'Oda Kapasitesi',
      value: '78%',
      target: '80%',
      status: 'below',
      trend: '+5%',
      icon: Building,
      color: 'text-blue-600'
    },
    {
      metric: 'Personel Verimliliği',
      value: '92%',
      target: '85%',
      status: 'above',
      trend: '+4%',
      icon: Users,
      color: 'text-green-600'
    }
  ];

  // Finansal analiz
  const financialAnalysis = [
    {
      category: 'Gelir',
      thisMonth: '₺18.2M',
      lastMonth: '₺14.8M',
      change: '+23%',
      changeType: 'positive',
      breakdown: [
        { item: 'Tedavi Gelirleri', amount: '₺15.1M', percentage: '83%' },
        { item: 'Konaklama', amount: '₺2.1M', percentage: '12%' },
        { item: 'Transfer & Diğer', amount: '₺1.0M', percentage: '5%' }
      ]
    },
    {
      category: 'Giderler',
      thisMonth: '₺12.4M',
      lastMonth: '₺11.8M',
      change: '+5%',
      changeType: 'negative',
      breakdown: [
        { item: 'Personel Giderleri', amount: '₺6.2M', percentage: '50%' },
        { item: 'Tıbbi Malzeme', amount: '₺3.1M', percentage: '25%' },
        { item: 'Operasyonel', amount: '₺2.1M', percentage: '17%' },
        { item: 'Pazarlama', amount: '₺1.0M', percentage: '8%' }
      ]
    },
    {
      category: 'Net Kâr',
      thisMonth: '₺5.8M',
      lastMonth: '₺3.0M',
      change: '+93%',
      changeType: 'positive',
      breakdown: [
        { item: 'Kâr Marjı', amount: '32%', percentage: '100%' }
      ]
    }
  ];

  const getChangeColor = (changeType: string) => {
    return changeType === 'positive' ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (changeType: string) => {
    return changeType === 'positive' ? ArrowUp : ArrowDown;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'above': return 'text-green-600';
      case 'below': return 'text-red-600';
      case 'on_target': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Ana Metrikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mainMetrics.slice(0, 6).map((metric) => {
          const ChangeIcon = getChangeIcon(metric.changeType);
          return (
            <div key={metric.id} className={`${metric.bgColor} p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-white`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className={`flex items-center space-x-1 ${getChangeColor(metric.changeType)}`}>
                  <ChangeIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
              <p className="text-sm text-gray-600 mb-3">{metric.title}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Hedef: {metric.target}</span>
                <span>{metric.targetProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div 
                  className={`h-1.5 rounded-full ${metric.color.replace('text-', 'bg-')}`}
                  style={{ width: `${metric.targetProgress}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Öngörüleri */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span>AI Destekli Öngörüler & Uyarılar</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiInsights.map((insight) => (
            <div key={insight.id} className={`${insight.bgColor} p-4 rounded-lg border border-gray-200`}>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white rounded-lg">
                  <insight.icon className={`h-4 w-4 ${insight.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{insight.message}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">Güven: {insight.confidence}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      insight.impact === 'Pozitif' ? 'bg-green-100 text-green-800' :
                      insight.impact === 'Negatif' ? 'bg-red-100 text-red-800' :
                      insight.impact === 'Kritik' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {insight.impact}
                    </span>
                  </div>
                  <button className="text-xs text-blue-600 hover:text-blue-700 mt-2">
                    {insight.action} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tedavi Kategorileri Performansı */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tedavi Kategorileri Performansı</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Kategori</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Hasta Sayısı</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Gelir</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Büyüme</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Memnuniyet</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Başarı Oranı</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Ortalama Maliyet</th>
              </tr>
            </thead>
            <tbody>
              {treatmentPerformance.map((treatment, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${treatment.bgColor}`}>
                        <treatment.icon className={`h-4 w-4 ${treatment.color}`} />
                      </div>
                      <span className="font-medium text-gray-900">{treatment.category}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{treatment.patients}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{treatment.revenue}</td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">{treatment.growth}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-gray-900">{treatment.satisfaction}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{treatment.successRate}</td>
                  <td className="py-3 px-4 text-gray-900">{treatment.avgCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderLeadAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Lead Kaynakları */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Kaynakları Analizi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leadSources.map((source, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <source.icon className={`h-5 w-5 ${source.color}`} />
                  <span className="font-medium text-gray-900">{source.source}</span>
                </div>
                <span className="text-green-600 text-sm font-medium">{source.trend}</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lead Sayısı:</span>
                  <span className="font-medium">{source.leads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dönüşüm:</span>
                  <span className="font-medium">{source.conversion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maliyet/Lead:</span>
                  <span className="font-medium">{source.cost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Toplam Gelir:</span>
                  <span className="font-medium text-green-600">{source.revenue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kalite:</span>
                  <span className={`font-medium ${
                    source.quality === 'Çok Yüksek' ? 'text-green-600' :
                    source.quality === 'Yüksek' ? 'text-blue-600' :
                    source.quality === 'Orta' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {source.quality}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dönüşüm Hunisi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Dönüşüm Hunisi</h3>
        <div className="space-y-4">
          {[
            { stage: 'Toplam Lead', count: 1247, percentage: 100, color: 'bg-blue-500' },
            { stage: 'Nitelikli Lead', count: 934, percentage: 75, color: 'bg-green-500' },
            { stage: 'İlk Temas', count: 823, percentage: 66, color: 'bg-yellow-500' },
            { stage: 'Teklif Gönderildi', count: 645, percentage: 52, color: 'bg-orange-500' },
            { stage: 'Hasta Oldu', count: 456, percentage: 37, color: 'bg-purple-500' },
            { stage: 'Tedavi Tamamlandı', count: 398, percentage: 32, color: 'bg-red-500' }
          ].map((stage, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-32 text-sm font-medium text-gray-700">{stage.stage}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
                <div 
                  className={`${stage.color} h-8 rounded-full flex items-center justify-center text-white text-sm font-medium transition-all duration-500`}
                  style={{ width: `${stage.percentage}%` }}
                >
                  {stage.count}
                </div>
              </div>
              <div className="w-16 text-sm text-gray-600">{stage.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFinancialTab = () => (
    <div className="space-y-6">
      {/* Finansal Özet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {financialAnalysis.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{item.category}</h3>
              <div className={`flex items-center space-x-1 ${getChangeColor(item.changeType)}`}>
                {React.createElement(getChangeIcon(item.changeType), { className: "h-4 w-4" })}
                <span className="text-sm font-medium">{item.change}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Bu Ay:</span>
                <span className="font-bold text-gray-900">{item.thisMonth}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Geçen Ay:</span>
                <span className="text-gray-600">{item.lastMonth}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Detay Dağılımı</h4>
              <div className="space-y-2">
                {item.breakdown.map((breakdownItem, breakdownIndex) => (
                  <div key={breakdownIndex} className="flex justify-between text-sm">
                    <span className="text-gray-600">{breakdownItem.item}:</span>
                    <span className="font-medium">{breakdownItem.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Aylık Gelir Trendi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aylık Gelir Trendi</h3>
        <div className="h-64 flex items-end justify-between space-x-2">
          {[
            { month: 'Oca', revenue: 12.4, target: 15.0 },
            { month: 'Şub', revenue: 14.2, target: 15.0 },
            { month: 'Mar', revenue: 16.8, target: 15.0 },
            { month: 'Nis', revenue: 15.3, target: 15.0 },
            { month: 'May', revenue: 17.9, target: 15.0 },
            { month: 'Haz', revenue: 19.2, target: 15.0 },
            { month: 'Tem', revenue: 18.7, target: 15.0 },
            { month: 'Ağu', revenue: 20.1, target: 15.0 },
            { month: 'Eyl', revenue: 18.9, target: 15.0 },
            { month: 'Eki', revenue: 21.3, target: 15.0 },
            { month: 'Kas', revenue: 19.8, target: 15.0 },
            { month: 'Ara', revenue: 18.2, target: 20.0 }
          ].map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex flex-col items-center space-y-1">
                <div 
                  className={`w-full rounded-t transition-all duration-300 hover:opacity-80 ${
                    data.revenue >= data.target ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ height: `${(data.revenue / 25) * 100}%` }}
                  title={`${data.month}: ₺${data.revenue}M`}
                ></div>
                <div 
                  className="w-full bg-gray-300 rounded-b opacity-50"
                  style={{ height: `${((data.target - data.revenue) / 25) * 100}%` }}
                  title={`Hedef: ₺${data.target}M`}
                ></div>
              </div>
              <span className="text-xs text-gray-500 mt-2">{data.month}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Gerçekleşen</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-600">Hedef Aşılan</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <span className="text-gray-600">Hedef</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOperationalTab = () => (
    <div className="space-y-6">
      {/* Operasyonel Metrikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operationalMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
                <h3 className="font-medium text-gray-900">{metric.metric}</h3>
              </div>
              <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                {metric.trend}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                <span className="text-sm text-gray-600">Hedef: {metric.target}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    metric.status === 'above' ? 'bg-green-500' :
                    metric.status === 'below' ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ 
                    width: `${Math.min(100, (parseFloat(metric.value) / parseFloat(metric.target)) * 100)}%` 
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Kapasite Analizi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Kapasite Analizi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Bölüm Bazlı Doluluk</h4>
            <div className="space-y-3">
              {[
                { department: 'Kardiyoloji', capacity: 95, color: 'bg-red-500' },
                { department: 'Ortopedi', capacity: 78, color: 'bg-blue-500' },
                { department: 'Onkoloji', capacity: 89, color: 'bg-purple-500' },
                { department: 'Plastik Cerrahi', capacity: 65, color: 'bg-pink-500' },
                { department: 'Diş Tedavisi', capacity: 72, color: 'bg-green-500' }
              ].map((dept, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-24 text-sm text-gray-700">{dept.department}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div 
                      className={`${dept.color} h-4 rounded-full flex items-center justify-center text-white text-xs font-medium`}
                      style={{ width: `${dept.capacity}%` }}
                    >
                      {dept.capacity}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Haftalık Randevu Dağılımı</h4>
            <div className="space-y-3">
              {[
                { day: 'Pazartesi', appointments: 45, capacity: 50 },
                { day: 'Salı', appointments: 48, capacity: 50 },
                { day: 'Çarşamba', appointments: 42, capacity: 50 },
                { day: 'Perşembe', appointments: 47, capacity: 50 },
                { day: 'Cuma', appointments: 44, capacity: 50 },
                { day: 'Cumartesi', appointments: 28, capacity: 35 },
                { day: 'Pazar', appointments: 15, capacity: 20 }
              ].map((day, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-20 text-sm text-gray-700">{day.day}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-blue-500 h-4 rounded-full flex items-center justify-center text-white text-xs font-medium"
                      style={{ width: `${(day.appointments / day.capacity) * 100}%` }}
                    >
                      {day.appointments}/{day.capacity}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {Math.round((day.appointments / day.capacity) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCountryAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Ülke Performansı */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ülke Bazlı Performans</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Ülke</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Hasta Sayısı</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Gelir</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Büyüme</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Ort. Kalış</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Memnuniyet</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Popüler Tedavi</th>
              </tr>
            </thead>
            <tbody>
              {countryPerformance.map((country, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-medium text-gray-900">{country.country}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{country.patients.toLocaleString()}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{country.revenue}</td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">{country.growth}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{country.avgStay}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-gray-900">{country.satisfaction}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-900">{country.topTreatment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Coğrafi Dağılım Haritası */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Hasta Coğrafi Dağılımı</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Bölge Bazlı Dağılım</h4>
            {[
              { region: 'Avrupa', percentage: 45, patients: 1123, color: 'bg-blue-500' },
              { region: 'Orta Doğu', percentage: 32, patients: 798, color: 'bg-green-500' },
              { region: 'Afrika', percentage: 15, patients: 374, color: 'bg-yellow-500' },
              { region: 'Asya', percentage: 8, patients: 199, color: 'bg-purple-500' }
            ].map((region, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-24 text-sm text-gray-700">{region.region}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6">
                  <div 
                    className={`${region.color} h-6 rounded-full flex items-center justify-center text-white text-sm font-medium`}
                    style={{ width: `${region.percentage}%` }}
                  >
                    {region.percentage}%
                  </div>
                </div>
                <div className="text-sm text-gray-600">{region.patients} hasta</div>
              </div>
            ))}
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Büyüme Trendleri</h4>
            <div className="space-y-3">
              {countryPerformance.slice(0, 4).map((country, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{country.flag}</span>
                    <span className="font-medium text-gray-900">{country.country}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-green-600 font-medium">{country.growth}</div>
                    <div className="text-xs text-gray-500">{country.patients} hasta</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomReportsTab = () => (
    <div className="space-y-6">
      {/* Rapor Oluşturucu */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Özel Rapor Oluşturucu</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Veri Kaynağı</h4>
            <div className="space-y-2">
              {[
                'Hasta Verileri',
                'Lead Verileri',
                'Finansal Veriler',
                'Operasyonel Veriler',
                'İletişim Verileri',
                'Seyahat Verileri'
              ].map((source, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-700">{source}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Zaman Aralığı</h4>
            <div className="space-y-2">
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Son 7 gün</option>
                <option>Son 30 gün</option>
                <option>Son 3 ay</option>
                <option>Son 6 ay</option>
                <option>Son 1 yıl</option>
                <option>Özel aralık</option>
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input type="date" className="border border-gray-300 rounded px-2 py-1 text-sm" />
                <input type="date" className="border border-gray-300 rounded px-2 py-1 text-sm" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Görselleştirme</h4>
            <div className="space-y-2">
              {[
                { type: 'Tablo', icon: Table },
                { type: 'Çubuk Grafik', icon: BarChart3 },
                { type: 'Pasta Grafik', icon: PieChart },
                { type: 'Çizgi Grafik', icon: LineChart },
                { type: 'KPI Kartları', icon: Target }
              ].map((viz, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input type="radio" name="visualization" className="border-gray-300" />
                  <viz.icon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{viz.type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Önizleme
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Rapor Oluştur
          </button>
        </div>
      </div>

      {/* Kayıtlı Raporlar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Kayıtlı Raporlar</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Tümünü Gör
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              name: 'Aylık Finansal Özet',
              description: 'Gelir, gider ve kâr analizi',
              lastRun: '2 saat önce',
              frequency: 'Aylık',
              format: 'PDF',
              icon: DollarSign,
              color: 'text-green-600'
            },
            {
              name: 'Lead Performans Raporu',
              description: 'Kaynak bazlı dönüşüm analizi',
              lastRun: '1 gün önce',
              frequency: 'Haftalık',
              format: 'Excel',
              icon: TrendingUp,
              color: 'text-blue-600'
            },
            {
              name: 'Hasta Memnuniyet Analizi',
              description: 'Anket sonuçları ve trendler',
              lastRun: '3 gün önce',
              frequency: 'Aylık',
              format: 'PDF',
              icon: Star,
              color: 'text-yellow-600'
            },
            {
              name: 'Operasyonel Verimlilik',
              description: 'Kapasite ve kaynak kullanımı',
              lastRun: '1 hafta önce',
              frequency: 'Haftalık',
              format: 'Dashboard',
              icon: Activity,
              color: 'text-purple-600'
            },
            {
              name: 'Ülke Bazlı Analiz',
              description: 'Coğrafi performans raporu',
              lastRun: '2 hafta önce',
              frequency: 'Aylık',
              format: 'Excel',
              icon: Globe,
              color: 'text-indigo-600'
            },
            {
              name: 'Tedavi Başarı Oranları',
              description: 'Tıbbi sonuçlar ve komplikasyonlar',
              lastRun: '1 ay önce',
              frequency: 'Üç Aylık',
              format: 'PDF',
              icon: Heart,
              color: 'text-red-600'
            }
          ].map((report, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <report.icon className={`h-5 w-5 ${report.color}`} />
                  <h4 className="font-medium text-gray-900">{report.name}</h4>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{report.description}</p>
              
              <div className="space-y-1 text-xs text-gray-500">
                <div className="flex justify-between">
                  <span>Son çalıştırma:</span>
                  <span>{report.lastRun}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sıklık:</span>
                  <span>{report.frequency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span>{report.format}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-3">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded text-xs">
                  Çalıştır
                </button>
                <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 px-2 rounded text-xs">
                  Düzenle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analitik & Raporlama</h1>
          <p className="text-gray-600 mt-1">AI destekli analiz ve rol bazlı dashboardlar</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Rol Seçici */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {Object.entries(roleConfigs).map(([key, config]) => (
              <option key={key} value={key}>{config.name}</option>
            ))}
          </select>
          
          {/* Zaman Aralığı */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7days">Son 7 gün</option>
            <option value="30days">Son 30 gün</option>
            <option value="3months">Son 3 ay</option>
            <option value="6months">Son 6 ay</option>
            <option value="1year">Son 1 yıl</option>
          </select>
          
          {/* Filtreler */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            <span>Filtreler</span>
          </button>
          
          {/* Dışa Aktarma */}
          <button className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
            <Download className="h-4 w-4" />
            <span>Dışa Aktar</span>
          </button>
          
          {/* Yenile */}
          <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
            <RefreshCw className="h-4 w-4" />
            <span>Yenile</span>
          </button>
        </div>
      </div>

      {/* Rol Açıklaması */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900">{roleConfigs[selectedRole].name}</h3>
        <p className="text-sm text-blue-700 mt-1">{roleConfigs[selectedRole].description}</p>
      </div>

      {/* Filtreler (Açılabilir) */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Gelişmiş Filtreler</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Şube</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Tüm Şubeler</option>
                <option>Ana Merkez</option>
                <option>Şube 1</option>
                <option>Şube 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tedavi Türü</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Tüm Tedaviler</option>
                <option>Kardiyoloji</option>
                <option>Ortopedi</option>
                <option>Onkoloji</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ülke</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Tüm Ülkeler</option>
                <option>Türkiye</option>
                <option>İspanya</option>
                <option>İngiltere</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lead Kaynağı</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm">
                <option>Tüm Kaynaklar</option>
                <option>WhatsApp</option>
                <option>Meta Ads</option>
                <option>Google Ads</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Genel Bakış', icon: BarChart3 },
              { id: 'leads', label: 'Lead Analizi', icon: TrendingUp },
              { id: 'financial', label: 'Finansal Analiz', icon: DollarSign },
              { id: 'operational', label: 'Operasyonel', icon: Activity },
              { id: 'countries', label: 'Ülke Analizi', icon: Globe },
              { id: 'reports', label: 'Özel Raporlar', icon: FileText }
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
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'leads' && renderLeadAnalyticsTab()}
          {activeTab === 'financial' && renderFinancialTab()}
          {activeTab === 'operational' && renderOperationalTab()}
          {activeTab === 'countries' && renderCountryAnalyticsTab()}
          {activeTab === 'reports' && renderCustomReportsTab()}
        </div>
      </div>

      {/* Güvenlik ve Uyumluluk */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-600" />
          <span>Güvenlik & Yasal Uyumluluk</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Veri Güvenliği</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• 256-bit şifreleme</li>
              <li>• Rol bazlı erişim</li>
              <li>• Audit log</li>
              <li>• Veri maskeleme</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">KVKK/GDPR</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Veri anonimleştirme</li>
              <li>• Silme hakkı</li>
              <li>• Taşınabilirlik</li>
              <li>• İzin yönetimi</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Denetim</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Tam aktivite logu</li>
              <li>• Erişim kayıtları</li>
              <li>• Değişiklik geçmişi</li>
              <li>• Uyumluluk raporları</li>
            </ul>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-medium text-orange-900 mb-2">Yedekleme</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Otomatik yedekleme</li>
              <li>• Çoklu lokasyon</li>
              <li>• Hızlı geri yükleme</li>
              <li>• Felaket kurtarma</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;