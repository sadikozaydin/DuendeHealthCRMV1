import React, { useState } from 'react';
import { Bot, Zap, TrendingUp, Target, Settings, Activity, BarChart3, Brain, Cpu, Database, Network, Workflow, GitBranch, Play, Pause, Store as Stop, SkipForward, RefreshCw, CheckCircle, AlertTriangle, Clock, Eye, Edit, Trash2, Plus, Search, Filter, Download, Upload, Send, MessageCircle, Mail, Phone, Bell, Calendar, User, Users, Building, MapPin, CreditCard, FileText, Image, Video, Mic, Camera, Globe, Languages, Shield, Lock, Key, Timer, Award, Star, ThumbsUp, ThumbsDown, Heart, Smile, Frown, AlertCircle, Info, HelpCircle, ExternalLink, Copy, Share2, Flag, Tag, Bookmark, Link, Hash, AtSign, Percent, DollarSign, Euro, Banknote, Package, Truck, Plane, Car, Building2, Hotel, Bed, Coffee, Utensils, Stethoscope, Pill, Syringe, Thermometer, Ban as Bandage, Scissors, Clipboard, Folder, Archive, Paperclip, Monitor, Smartphone, Tablet, Headphones, Volume2, VolumeX, Wifi, WifiOff, Server, Cloud, HardDrive, Router, Bluetooth, Radio, Tv, Speaker, Keyboard, Mouse, Printer, Scan as Scanner, Webcam, Gamepad2, Joystick, Headset, Microscope as Microphone } from 'lucide-react';

const AIAutomationImprovement = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);

  // Otomasyon iş akışları
  const automationWorkflows = [
    {
      id: 1,
      name: 'Yeni Lead İşleme',
      description: 'Gelen lead\'leri otomatik skorlama, atama ve ilk iletişim',
      status: 'active',
      trigger: 'Yeni lead kaydı',
      steps: [
        { id: 1, type: 'ai_scoring', name: 'AI Lead Skorlama', duration: '2s' },
        { id: 2, type: 'assignment', name: 'Otomatik Agent Atama', duration: '1s' },
        { id: 3, type: 'whatsapp', name: 'WhatsApp Hoş Geldin Mesajı', duration: '3s' },
        { id: 4, type: 'email', name: 'Email Bilgilendirme', duration: '5s' },
        { id: 5, type: 'task', name: 'Takip Görevi Oluştur', duration: '1s' }
      ],
      performance: {
        executions: 1247,
        successRate: 98.5,
        avgDuration: '12s',
        lastRun: '2 dakika önce'
      },
      aiComponents: ['Lead Scoring', 'Agent Matching', 'Language Detection'],
      channels: ['WhatsApp', 'Email', 'SMS'],
      conditions: [
        { field: 'lead_score', operator: '>', value: 70 },
        { field: 'country', operator: 'in', value: ['TR', 'ES', 'AE'] }
      ]
    },
    {
      id: 2,
      name: 'Randevu Hatırlatma',
      description: 'Otomatik randevu hatırlatmaları ve onay takibi',
      status: 'active',
      trigger: 'Randevu tarihi - 24 saat',
      steps: [
        { id: 1, type: 'check', name: 'Randevu Durumu Kontrol', duration: '1s' },
        { id: 2, type: 'translate', name: 'Dil Çevirisi', duration: '2s' },
        { id: 3, type: 'whatsapp', name: 'WhatsApp Hatırlatma', duration: '3s' },
        { id: 4, type: 'sms', name: 'SMS Yedek Hatırlatma', duration: '2s' },
        { id: 5, type: 'calendar', name: 'Takvim Güncelleme', duration: '1s' }
      ],
      performance: {
        executions: 892,
        successRate: 96.2,
        avgDuration: '9s',
        lastRun: '15 dakika önce'
      },
      aiComponents: ['Smart Scheduling', 'Language Translation', 'Sentiment Analysis'],
      channels: ['WhatsApp', 'SMS', 'Email', 'Push'],
      conditions: [
        { field: 'appointment_status', operator: '=', value: 'confirmed' },
        { field: 'patient_language', operator: '!=', value: 'tr' }
      ]
    },
    {
      id: 3,
      name: 'Ödeme Takibi',
      description: 'Geciken ödemelerin otomatik takibi ve hatırlatması',
      status: 'active',
      trigger: 'Ödeme vadesi geçti',
      steps: [
        { id: 1, type: 'payment_check', name: 'Ödeme Durumu Kontrol', duration: '2s' },
        { id: 2, type: 'risk_analysis', name: 'AI Risk Analizi', duration: '3s' },
        { id: 3, type: 'email', name: 'Nazik Hatırlatma Email', duration: '4s' },
        { id: 4, type: 'whatsapp', name: 'WhatsApp Mesajı', duration: '3s' },
        { id: 5, type: 'escalation', name: 'Yönetici Bilgilendirme', duration: '2s' }
      ],
      performance: {
        executions: 234,
        successRate: 89.7,
        avgDuration: '14s',
        lastRun: '1 saat önce'
      },
      aiComponents: ['Payment Risk Scoring', 'Customer Behavior Analysis'],
      channels: ['Email', 'WhatsApp', 'Phone'],
      conditions: [
        { field: 'payment_overdue_days', operator: '>', value: 3 },
        { field: 'payment_amount', operator: '>', value: 1000 }
      ]
    },
    {
      id: 4,
      name: 'Evrak Eksiklik Kontrolü',
      description: 'Hasta evraklarının otomatik kontrolü ve eksik bildirimi',
      status: 'warning',
      trigger: 'Tedavi tarihi - 7 gün',
      steps: [
        { id: 1, type: 'document_scan', name: 'AI Evrak Tarama', duration: '5s' },
        { id: 2, type: 'compliance_check', name: 'Yasal Uyumluluk Kontrol', duration: '3s' },
        { id: 3, type: 'missing_list', name: 'Eksik Liste Oluştur', duration: '2s' },
        { id: 4, type: 'patient_notify', name: 'Hasta Bilgilendirme', duration: '4s' },
        { id: 5, type: 'coordinator_alert', name: 'Koordinatör Uyarısı', duration: '1s' }
      ],
      performance: {
        executions: 156,
        successRate: 92.3,
        avgDuration: '15s',
        lastRun: '3 saat önce'
      },
      aiComponents: ['Document OCR', 'Compliance Checker', 'Smart Categorization'],
      channels: ['Email', 'WhatsApp', 'Portal'],
      conditions: [
        { field: 'treatment_date', operator: 'within', value: '7 days' },
        { field: 'document_completeness', operator: '<', value: 100 }
      ]
    }
  ];

  // AI modelleri ve tahmin sistemleri
  const aiModels = [
    {
      id: 'lead_scoring',
      name: 'Lead Skorlama Modeli',
      type: 'Classification',
      accuracy: 94.2,
      lastTrained: '2025-01-10',
      dataPoints: 15420,
      features: ['Ülke', 'Tedavi Türü', 'Bütçe', 'İletişim Kalitesi', 'Kaynak'],
      status: 'active',
      predictions: 1247,
      description: 'Gelen lead\'lerin dönüşüm potansiyelini tahmin eder'
    },
    {
      id: 'patient_satisfaction',
      name: 'Hasta Memnuniyet Tahmini',
      type: 'Regression',
      accuracy: 89.7,
      lastTrained: '2025-01-08',
      dataPoints: 8934,
      features: ['Tedavi Süreci', 'İletişim Skoru', 'Bekleme Süresi', 'Hizmet Kalitesi'],
      status: 'active',
      predictions: 892,
      description: 'Hasta memnuniyetini önceden tahmin ederek proaktif aksiyonlar alır'
    },
    {
      id: 'appointment_optimization',
      name: 'Randevu Optimizasyon',
      type: 'Optimization',
      accuracy: 91.5,
      lastTrained: '2025-01-05',
      dataPoints: 12678,
      features: ['Doktor Müsaitliği', 'Hasta Tercihi', 'Tedavi Süresi', 'Aciliyet'],
      status: 'training',
      predictions: 567,
      description: 'En uygun randevu zamanını ve doktor eşleşmesini önerir'
    },
    {
      id: 'fraud_detection',
      name: 'Fraud Tespit Sistemi',
      type: 'Anomaly Detection',
      accuracy: 96.8,
      lastTrained: '2025-01-12',
      dataPoints: 5432,
      features: ['Ödeme Davranışı', 'Coğrafi Konum', 'Cihaz Bilgisi', 'İşlem Sıklığı'],
      status: 'active',
      predictions: 23,
      description: 'Şüpheli aktiviteleri ve potansiyel fraud\'ları tespit eder'
    }
  ];

  // Sürekli iyileştirme önerileri
  const improvementSuggestions = [
    {
      id: 1,
      category: 'Process Optimization',
      title: 'Lead Yanıt Süresini %23 İyileştir',
      description: 'WhatsApp otomatik yanıt sistemini geliştirerek ortalama yanıt süresini 18 dakikadan 14 dakikaya düşürebiliriz.',
      impact: 'high',
      effort: 'medium',
      roi: '156%',
      status: 'pending',
      aiConfidence: 92,
      estimatedGain: '+€45,000/yıl',
      implementation: [
        'Akıllı chatbot entegrasyonu',
        'Otomatik dil tanıma',
        'Hızlı yanıt şablonları',
        'Agent workload balancing'
      ]
    },
    {
      id: 2,
      category: 'Revenue Optimization',
      title: 'Çapraz Satış Fırsatlarını %31 Artır',
      description: 'AI analizi ile hasta geçmişi ve tedavi verilerini kullanarak ek hizmet önerileri geliştirebiliriz.',
      impact: 'high',
      effort: 'low',
      roi: '234%',
      status: 'approved',
      aiConfidence: 87,
      estimatedGain: '+€78,000/yıl',
      implementation: [
        'Recommendation engine',
        'Patient journey mapping',
        'Personalized offers',
        'Timing optimization'
      ]
    },
    {
      id: 3,
      category: 'Cost Reduction',
      title: 'Transfer Maliyetlerini %18 Azalt',
      description: 'Rota optimizasyonu ve dinamik fiyatlandırma ile transfer maliyetlerini önemli ölçüde düşürebiliriz.',
      impact: 'medium',
      effort: 'high',
      roi: '89%',
      status: 'in_progress',
      aiConfidence: 78,
      estimatedGain: '+€23,000/yıl',
      implementation: [
        'Route optimization AI',
        'Dynamic pricing model',
        'Partner network expansion',
        'Real-time tracking'
      ]
    },
    {
      id: 4,
      category: 'Quality Improvement',
      title: 'Hasta Memnuniyetini %12 Yükselt',
      description: 'Proaktif iletişim ve kişiselleştirilmiş hizmet ile hasta deneyimini iyileştirebiliriz.',
      impact: 'high',
      effort: 'medium',
      roi: '145%',
      status: 'pending',
      aiConfidence: 85,
      estimatedGain: '+€34,000/yıl',
      implementation: [
        'Proactive communication',
        'Personalized care plans',
        'Feedback loop automation',
        'Quality monitoring'
      ]
    }
  ];

  // Performans metrikleri
  const performanceMetrics = [
    {
      name: 'Otomasyon Başarı Oranı',
      value: 94.2,
      unit: '%',
      trend: '+2.3%',
      trendDirection: 'up',
      target: 95,
      color: 'green'
    },
    {
      name: 'AI Model Doğruluğu',
      value: 91.8,
      unit: '%',
      trend: '+1.7%',
      trendDirection: 'up',
      target: 93,
      color: 'blue'
    },
    {
      name: 'Süreç Verimliliği',
      value: 87.5,
      unit: '%',
      trend: '+5.2%',
      trendDirection: 'up',
      target: 90,
      color: 'purple'
    },
    {
      name: 'Maliyet Tasarrufu',
      value: 156,
      unit: 'K€',
      trend: '+23%',
      trendDirection: 'up',
      target: 200,
      color: 'orange'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'warning':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'training':
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'inactive':
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'training':
      case 'in_progress':
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      case 'inactive':
      case 'rejected':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const renderWorkflowDetail = (workflow) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 h-12 w-12">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Workflow className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{workflow.name}</h2>
              <p className="text-gray-600">{workflow.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(workflow.status)}`}>
              {workflow.status === 'active' ? 'Aktif' : workflow.status === 'warning' ? 'Uyarı' : 'Pasif'}
            </span>
            <button
              onClick={() => setSelectedWorkflow(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sol Panel - Workflow Steps */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                  <GitBranch className="h-5 w-5" />
                  <span>İş Akışı Adımları</span>
                </h3>
                
                <div className="space-y-3">
                  {workflow.steps.map((step, index) => (
                    <div key={step.id} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-700 font-medium text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-blue-900">{step.name}</h4>
                        <p className="text-sm text-blue-700">Süre: {step.duration}</p>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-4 flex items-center space-x-2">
                  <Brain className="h-5 w-5" />
                  <span>AI Bileşenleri</span>
                </h3>
                
                <div className="space-y-2">
                  {workflow.aiComponents.map((component, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Cpu className="h-4 w-4 text-green-600" />
                      <span className="text-green-800 text-sm">{component}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-4 flex items-center space-x-2">
                  <Network className="h-5 w-5" />
                  <span>İletişim Kanalları</span>
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {workflow.channels.map((channel, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      {channel}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sağ Panel - Performance & Conditions */}
            <div className="space-y-6">
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-4 flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Performans Metrikleri</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-700 text-sm">Toplam Çalıştırma:</span>
                    <span className="font-bold text-yellow-800">{workflow.performance.executions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-700 text-sm">Başarı Oranı:</span>
                    <span className="font-bold text-yellow-800">{workflow.performance.successRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-700 text-sm">Ortalama Süre:</span>
                    <span className="font-bold text-yellow-800">{workflow.performance.avgDuration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-700 text-sm">Son Çalıştırma:</span>
                    <span className="font-bold text-yellow-800">{workflow.performance.lastRun}</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-4 flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Tetikleme Koşulları</span>
                </h3>
                
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded border-l-4 border-orange-500">
                    <h4 className="font-medium text-orange-900 text-sm">Tetikleyici:</h4>
                    <p className="text-orange-800 text-sm">{workflow.trigger}</p>
                  </div>
                  
                  {workflow.conditions.map((condition, index) => (
                    <div key={index} className="bg-white p-2 rounded text-sm">
                      <span className="font-medium text-orange-900">{condition.field}</span>
                      <span className="text-orange-700 mx-2">{condition.operator}</span>
                      <span className="text-orange-800">{Array.isArray(condition.value) ? condition.value.join(', ') : condition.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Kontrol Paneli</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center space-x-2 bg-green-100 hover:bg-green-200 text-green-700 py-2 px-3 rounded text-sm">
                    <Play className="h-4 w-4" />
                    <span>Başlat</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-2 px-3 rounded text-sm">
                    <Pause className="h-4 w-4" />
                    <span>Duraklat</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded text-sm">
                    <Edit className="h-4 w-4" />
                    <span>Düzenle</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-3 rounded text-sm">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analiz</span>
                  </button>
                </div>
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
          <h1 className="text-3xl font-bold text-gray-900">AI / Otomasyon & Sürekli İyileştirme</h1>
          <p className="text-gray-600 mt-1">Akıllı otomasyon, AI modelleri ve süreç optimizasyonu</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowWorkflowBuilder(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Yeni Otomasyon</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Brain className="h-4 w-4" />
            <span>AI Model Eğit</span>
          </button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                <p className={`text-3xl font-bold ${
                  metric.color === 'green' ? 'text-green-600' :
                  metric.color === 'blue' ? 'text-blue-600' :
                  metric.color === 'purple' ? 'text-purple-600' :
                  'text-orange-600'
                }`}>
                  {metric.value}{metric.unit}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                metric.color === 'green' ? 'bg-green-100' :
                metric.color === 'blue' ? 'bg-blue-100' :
                metric.color === 'purple' ? 'bg-purple-100' :
                'bg-orange-100'
              }`}>
                {metric.color === 'green' ? <CheckCircle className="h-6 w-6 text-green-600" /> :
                 metric.color === 'blue' ? <Brain className="h-6 w-6 text-blue-600" /> :
                 metric.color === 'purple' ? <Zap className="h-6 w-6 text-purple-600" /> :
                 <DollarSign className="h-6 w-6 text-orange-600" />}
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600 font-medium">{metric.trend}</span>
              <span className="text-sm text-gray-500 ml-1">hedef: {metric.target}{metric.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Genel Bakış', icon: BarChart3 },
              { id: 'workflows', label: 'Otomasyon İş Akışları', icon: Workflow },
              { id: 'ai_models', label: 'AI Modelleri', icon: Brain },
              { id: 'improvements', label: 'İyileştirme Önerileri', icon: TrendingUp },
              { id: 'monitoring', label: 'İzleme & Analiz', icon: Activity },
              { id: 'settings', label: 'Ayarlar', icon: Settings }
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
              <h3 className="text-lg font-semibold text-gray-900">AI & Otomasyon Özeti</h3>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Workflow className="h-8 w-8 text-blue-600" />
                    <span className="text-3xl font-bold text-blue-700">{automationWorkflows.length}</span>
                  </div>
                  <h4 className="font-medium text-blue-900">Aktif Otomasyon</h4>
                  <p className="text-sm text-blue-700">
                    {automationWorkflows.filter(w => w.status === 'active').length} çalışıyor, 
                    {automationWorkflows.filter(w => w.status === 'warning').length} uyarı
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <Brain className="h-8 w-8 text-green-600" />
                    <span className="text-3xl font-bold text-green-700">{aiModels.length}</span>
                  </div>
                  <h4 className="font-medium text-green-900">AI Modeli</h4>
                  <p className="text-sm text-green-700">
                    Ortalama doğruluk: {(aiModels.reduce((acc, model) => acc + model.accuracy, 0) / aiModels.length).toFixed(1)}%
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                    <span className="text-3xl font-bold text-purple-700">{improvementSuggestions.length}</span>
                  </div>
                  <h4 className="font-medium text-purple-900">İyileştirme Önerisi</h4>
                  <p className="text-sm text-purple-700">
                    Potansiyel kazanç: €{improvementSuggestions.reduce((acc, s) => acc + parseInt(s.estimatedGain.replace(/[^\d]/g, '')), 0).toLocaleString()}/yıl
                  </p>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Son AI & Otomasyon Aktiviteleri</h4>
                <div className="space-y-3">
                  {[
                    { time: '2 dakika önce', action: 'Yeni Lead İşleme otomasyonu çalıştırıldı', type: 'automation', status: 'success' },
                    { time: '15 dakika önce', action: 'Lead Skorlama modeli 247 tahmin yaptı', type: 'ai', status: 'success' },
                    { time: '1 saat önce', action: 'Ödeme Takibi otomasyonu 12 hatırlatma gönderdi', type: 'automation', status: 'success' },
                    { time: '3 saat önce', action: 'Hasta Memnuniyet modeli yeniden eğitildi', type: 'ai', status: 'training' },
                    { time: '6 saat önce', action: 'Yeni iyileştirme önerisi: Transfer optimizasyonu', type: 'improvement', status: 'new' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded">
                      <div className="flex items-center space-x-3">
                        {activity.type === 'automation' ? <Workflow className="h-4 w-4 text-blue-600" /> :
                         activity.type === 'ai' ? <Brain className="h-4 w-4 text-green-600" /> :
                         <TrendingUp className="h-4 w-4 text-purple-600" />}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(activity.status)}`}>
                        {activity.status === 'success' ? 'Başarılı' :
                         activity.status === 'training' ? 'Eğitiliyor' : 'Yeni'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workflows' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Otomasyon İş Akışları</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Yeni İş Akışı
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {automationWorkflows.map((workflow) => (
                  <div key={workflow.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{workflow.name}</h4>
                        <p className="text-sm text-gray-600">{workflow.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(workflow.status)}
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(workflow.status)}`}>
                          {workflow.status === 'active' ? 'Aktif' : workflow.status === 'warning' ? 'Uyarı' : 'Pasif'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Tetikleyici:</span>
                        <span className="font-medium text-gray-900">{workflow.trigger}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Adım Sayısı:</span>
                        <span className="font-medium text-gray-900">{workflow.steps.length}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Başarı Oranı:</span>
                        <span className="font-medium text-green-600">{workflow.performance.successRate}%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Son Çalıştırma:</span>
                        <span className="font-medium text-gray-900">{workflow.performance.lastRun}</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">AI Bileşenleri</h5>
                      <div className="flex flex-wrap gap-1">
                        {workflow.aiComponents.slice(0, 2).map((component, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {component}
                          </span>
                        ))}
                        {workflow.aiComponents.length > 2 && (
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                            +{workflow.aiComponents.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedWorkflow(workflow)}
                        className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded text-sm"
                      >
                        Detaylar
                      </button>
                      <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm">
                        Düzenle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ai_models' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">AI Modelleri ve Tahmin Sistemleri</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Yeni Model Eğit
                </button>
              </div>
              
              <div className="space-y-4">
                {aiModels.map((model) => (
                  <div key={model.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{model.name}</h4>
                        <p className="text-sm text-gray-600">{model.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <span className="text-2xl font-bold text-green-600">{model.accuracy}%</span>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(model.status)}`}>
                          {model.status === 'active' ? 'Aktif' : model.status === 'training' ? 'Eğitiliyor' : 'Pasif'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <span className="text-gray-600">Model Tipi:</span>
                        <p className="font-medium text-gray-900">{model.type}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Veri Noktası:</span>
                        <p className="font-medium text-gray-900">{model.dataPoints.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Son Eğitim:</span>
                        <p className="font-medium text-gray-900">{model.lastTrained}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Tahmin Sayısı:</span>
                        <p className="font-medium text-gray-900">{model.predictions.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Özellikler (Features)</h5>
                      <div className="flex flex-wrap gap-1">
                        {model.features.map((feature, index) => (
                          <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${model.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="bg-green-100 hover:bg-green-200 text-green-700 py-2 px-3 rounded text-sm">
                        Test Et
                      </button>
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded text-sm">
                        Yeniden Eğit
                      </button>
                      <button className="bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-3 rounded text-sm">
                        Analiz
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded text-sm">
                        Ayarlar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'improvements' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">AI Destekli İyileştirme Önerileri</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Yeni Analiz Çalıştır
                </button>
              </div>
              
              <div className="space-y-4">
                {improvementSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {suggestion.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{suggestion.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <span className="text-lg font-bold text-green-600">{suggestion.estimatedGain}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(suggestion.status)}`}>
                          {suggestion.status === 'pending' ? 'Beklemede' :
                           suggestion.status === 'approved' ? 'Onaylandı' :
                           suggestion.status === 'in_progress' ? 'Uygulanıyor' : 'Reddedildi'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <span className="text-xs text-gray-600">Etki</span>
                        <p className={`font-bold text-lg ${getImpactColor(suggestion.impact)}`}>
                          {suggestion.impact === 'high' ? 'Yüksek' : suggestion.impact === 'medium' ? 'Orta' : 'Düşük'}
                        </p>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-600">Efor</span>
                        <p className={`font-bold text-lg ${getEffortColor(suggestion.effort)}`}>
                          {suggestion.effort === 'high' ? 'Yüksek' : suggestion.effort === 'medium' ? 'Orta' : 'Düşük'}
                        </p>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-600">ROI</span>
                        <p className="font-bold text-lg text-green-600">{suggestion.roi}</p>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-600">AI Güven</span>
                        <p className="font-bold text-lg text-blue-600">{suggestion.aiConfidence}%</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Uygulama Adımları</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {suggestion.implementation.map((step, index) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-gray-700">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="bg-green-100 hover:bg-green-200 text-green-700 py-2 px-3 rounded text-sm">
                        Onayla
                      </button>
                      <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded text-sm">
                        Detaylar
                      </button>
                      <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-2 px-3 rounded text-sm">
                        Simülasyon
                      </button>
                      <button className="bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded text-sm">
                        Reddet
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'monitoring' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">İzleme ve Analiz Dashboard</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Real-time Monitoring */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Gerçek Zamanlı İzleme</h4>
                  <div className="space-y-4">
                    {[
                      { name: 'Aktif Otomasyonlar', value: '12/15', status: 'good' },
                      { name: 'AI Model Performansı', value: '94.2%', status: 'good' },
                      { name: 'Sistem Yükü', value: '67%', status: 'warning' },
                      { name: 'Hata Oranı', value: '0.3%', status: 'good' }
                    ].map((metric, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded">
                        <span className="text-sm text-gray-700">{metric.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{metric.value}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            metric.status === 'good' ? 'bg-green-500' :
                            metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Trends */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Performans Trendleri</h4>
                  <div className="space-y-4">
                    {[
                      { period: 'Son 24 Saat', automations: 1247, success: 98.5, ai_predictions: 892 },
                      { period: 'Son 7 Gün', automations: 8934, success: 97.2, ai_predictions: 6234 },
                      { period: 'Son 30 Gün', automations: 34567, success: 96.8, ai_predictions: 23456 }
                    ].map((trend, index) => (
                      <div key={index} className="p-3 bg-white rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{trend.period}</span>
                          <span className="text-sm text-green-600">{trend.success}% başarı</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Otomasyonlar:</span>
                            <span className="font-medium text-gray-900 ml-1">{trend.automations.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">AI Tahminler:</span>
                            <span className="font-medium text-gray-900 ml-1">{trend.ai_predictions.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* System Health */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Sistem Sağlığı</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h5 className="font-medium text-gray-900">Otomasyon Motoru</h5>
                    <p className="text-sm text-green-600">Çalışıyor</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <Brain className="h-8 w-8 text-green-600" />
                    </div>
                    <h5 className="font-medium text-gray-900">AI Modelleri</h5>
                    <p className="text-sm text-green-600">Aktif</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Database className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h5 className="font-medium text-gray-900">Veri Pipeline</h5>
                    <p className="text-sm text-yellow-600">Yavaş</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">AI & Otomasyon Ayarları</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Genel Ayarlar</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Otomatik Model Eğitimi</h5>
                        <p className="text-sm text-gray-600">AI modelleri otomatik olarak yeniden eğitilsin</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Akıllı Bildirimler</h5>
                        <p className="text-sm text-gray-600">AI önerilerini otomatik bildir</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Performans İzleme</h5>
                        <p className="text-sm text-gray-600">Detaylı performans logları tut</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Güvenlik Ayarları</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">AI Kararları Logla</h5>
                        <p className="text-sm text-gray-600">Tüm AI kararlarını kaydet</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Manuel Onay Gerekli</h5>
                        <p className="text-sm text-gray-600">Kritik işlemler için manuel onay</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Veri Anonimleştirme</h5>
                        <p className="text-sm text-gray-600">AI eğitiminde hassas veriyi anonimleştir</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>
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
          <span>Gelişmiş AI & Otomasyon Özellikleri</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Sürükle-Bırak İş Akışı Editörü</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Görsel iş akışı tasarımı</li>
              <li>• Koşullu dallanma</li>
              <li>• Çoklu tetikleyici desteği</li>
              <li>• Gerçek zamanlı test</li>
              <li>• Şablon kütüphanesi</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Makine Öğrenmesi Modelleri</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Otomatik feature engineering</li>
              <li>• Model performans izleme</li>
              <li>• A/B test desteği</li>
              <li>• Drift detection</li>
              <li>• AutoML entegrasyonu</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Sürekli İyileştirme Motoru</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Otomatik bottleneck tespiti</li>
              <li>• ROI bazlı öncelik sıralaması</li>
              <li>• Simülasyon ve tahmin</li>
              <li>• Karar destek sistemi</li>
              <li>• Performans benchmarking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Workflow Detail Modal */}
      {selectedWorkflow && renderWorkflowDetail(selectedWorkflow)}
    </div>
  );
};

export default AIAutomationImprovement;