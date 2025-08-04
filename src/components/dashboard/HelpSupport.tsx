import React, { useState } from 'react';
import { 
  HelpCircle, 
  Book, 
  Video, 
  MessageCircle, 
  Phone, 
  Mail,
  ExternalLink,
  Search,
  FileText,
  PlayCircle,
  Users,
  Lightbulb,
  Headphones
} from 'lucide-react';

interface HelpSupportProps {
  className?: string;
}

const HelpSupport: React.FC<HelpSupportProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('quick');

  const quickHelp = [
    {
      icon: Video,
      title: 'Hızlı Başlangıç Videosu',
      description: 'Sistemi kullanmaya başlamak için 5 dakikalık rehber',
      action: 'İzle',
      color: 'text-red-600'
    },
    {
      icon: Book,
      title: 'Kullanım Kılavuzu',
      description: 'Detaylı sistem dokümantasyonu ve özellikler',
      action: 'Oku',
      color: 'text-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'Canlı Destek',
      description: 'Uzmanlarımızla anında sohbet edin',
      action: 'Başlat',
      color: 'text-green-600'
    },
    {
      icon: Phone,
      title: 'Telefon Desteği',
      description: 'Acil durumlar için 7/24 telefon hattı',
      action: 'Ara',
      color: 'text-purple-600'
    }
  ];

  const faqItems = [
    {
      question: 'Hasta kaydı nasıl oluşturulur?',
      answer: 'Hastalar menüsünden "Yeni Hasta" butonuna tıklayarak hasta bilgilerini girebilirsiniz.',
      category: 'Hasta Yönetimi'
    },
    {
      question: 'Randevu nasıl planlanır?',
      answer: 'Takvim menüsünden uygun tarih ve saati seçerek randevu oluşturabilirsiniz.',
      category: 'Randevu Sistemi'
    },
    {
      question: 'Ödeme kaydı nasıl yapılır?',
      answer: 'Ödemeler menüsünden hasta seçerek ödeme bilgilerini girebilirsiniz.',
      category: 'Finansal İşlemler'
    },
    {
      question: 'Rapor nasıl alınır?',
      answer: 'Raporlar menüsünden istediğiniz rapor türünü seçerek Excel veya PDF formatında indirebilirsiniz.',
      category: 'Raporlama'
    }
  ];

  const tutorials = [
    {
      title: 'Sistem Tanıtımı',
      duration: '10:30',
      views: '1.2K',
      thumbnail: '🎬'
    },
    {
      title: 'Hasta Kayıt İşlemleri',
      duration: '8:45',
      views: '856',
      thumbnail: '👥'
    },
    {
      title: 'Randevu Yönetimi',
      duration: '12:15',
      views: '743',
      thumbnail: '📅'
    },
    {
      title: 'Raporlama ve Analitik',
      duration: '15:20',
      views: '634',
      thumbnail: '📊'
    }
  ];

  return (
    <div className={`rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <HelpCircle className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Yardım & Destek</h3>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          Destek Merkezi
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'quick', label: 'Hızlı Yardım', icon: Lightbulb },
          { id: 'faq', label: 'SSS', icon: HelpCircle },
          { id: 'tutorials', label: 'Videolar', icon: PlayCircle }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'quick' && (
        <div className="space-y-3">
          {quickHelp.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                {item.action}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="space-y-3">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="SSS'de ara..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          {faqItems.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{item.question}</h4>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <p className="text-sm text-gray-600 mt-2">{item.answer}</p>
                </div>
                <button className="text-gray-400 hover:text-blue-600 ml-2">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'tutorials' && (
        <div className="space-y-3">
          {tutorials.map((tutorial, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{tutorial.thumbnail}</div>
                <div>
                  <h4 className="font-medium text-gray-900">{tutorial.title}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{tutorial.duration}</span>
                    <span>•</span>
                    <span>{tutorial.views} görüntüleme</span>
                  </div>
                </div>
              </div>
              <PlayCircle className="h-5 w-5 text-blue-600" />
            </div>
          ))}
        </div>
      )}

      {/* Contact Support */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Headphones className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-900">Hala yardıma mı ihtiyacınız var?</span>
          </div>
          <p className="text-sm text-blue-700 mb-3">
            Uzman destek ekibimiz size yardımcı olmaya hazır.
          </p>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              <MessageCircle className="h-3 w-3" />
              <span>Canlı Destek</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg text-sm hover:bg-blue-50 transition-colors">
              <Mail className="h-3 w-3" />
              <span>E-posta Gönder</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-green-800">Sistem Durumu: Normal</span>
          </div>
          <span className="text-xs text-green-600">Son güncelleme: 2 dk önce</span>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;