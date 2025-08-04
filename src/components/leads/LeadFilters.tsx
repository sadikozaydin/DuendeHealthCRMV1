import React from 'react';
import { Filter, Search, RefreshCw, Eye, Thermometer, Flag, Flame, MessageCircle, Phone } from 'lucide-react';

interface LeadFiltersProps {
  filters: {
    status: string;
    source: string;
    country: string;
    treatment: string;
    temperature: string;
    priority: string;
  };
  setFilters: (filters: any) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  leadStats?: any;
}

const LeadFilters: React.FC<LeadFiltersProps> = ({ 
  filters, 
  setFilters, 
  searchTerm, 
  setSearchTerm,
  leadStats
}) => {
  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    setFilters({
      status: 'all',
      source: 'all',
      country: 'all',
      treatment: 'all',
      temperature: 'all',
      priority: 'all'
    });
    setSearchTerm('');
  };

  // Kaynak grupları
  const sourceGroups = {
    highPriority: ['whatsapp', 'call_center', 'chat'],
    mediumPriority: ['website', 'email', 'referral', 'partner'],
    lowPriority: ['instagram', 'facebook', 'google_ads', 'campaign', 'other']
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Lead ara (isim, e-posta, telefon)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtreler:</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="contacted">İletişimde</option>
            <option value="qualified">Nitelikli</option>
            <option value="converted">Dönüştü</option>
            <option value="lost">Kayıp</option>
          </select>
          
          <select
            value={filters.source}
            onChange={(e) => handleFilterChange('source', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[180px]"
          >
            <option value="all">Tüm Kaynaklar</option>
            <optgroup label="Yüksek Öncelikli Kanallar">
              <option value="whatsapp">WhatsApp</option>
              <option value="call_center">Çağrı Merkezi</option>
              <option value="chat">Canlı Chat</option>
            </optgroup>
            <optgroup label="Orta Öncelikli Kanallar">
              <option value="website">Website</option>
              <option value="email">E-posta</option>
              <option value="referral">Referans</option>
              <option value="partner">Partner</option>
            </optgroup>
            <optgroup label="🚀 Reklam Platformları (Test)">
              <option value="meta">Meta (Facebook/Instagram)</option>
              <option value="google">Google Ads</option>
              <option value="tiktok">TikTok Ads</option>
            </optgroup>
            <optgroup label="Düşük Öncelikli Kanallar">
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="google_ads">Google Ads</option>
              <option value="campaign">Kampanya</option>
              <option value="other">Diğer</option>
            </optgroup>
          </select>
          
          <select
            value={filters.country}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tüm Ülkeler</option>
            <option value="İspanya">İspanya</option>
            <option value="İngiltere">İngiltere</option>
            <option value="BAE">BAE</option>
            <option value="Almanya">Almanya</option>
            <option value="Japonya">Japonya</option>
          </select>
          
          <select
            value={filters.treatment}
            onChange={(e) => handleFilterChange('treatment', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tüm Tedaviler</option>
            <option value="Kalp Cerrahisi">Kalp Cerrahisi</option>
            <option value="Plastik Cerrahi">Plastik Cerrahi</option>
            <option value="Ortopedi">Ortopedi</option>
            <option value="Diş İmplantı">Diş İmplantı</option>
            <option value="Saç Ekimi">Saç Ekimi</option>
            <option value="Check-up">Check-up</option>
          </select>
          
          <select
            value={filters.temperature}
            onChange={(e) => handleFilterChange('temperature', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tüm Sıcaklıklar</option>
            <option value="hot">Sıcak</option>
            <option value="warm">Ilımlı</option>
            <option value="cold">Soğuk</option>
          </select>
          
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tüm Öncelikler</option>
            <option value="high">Yüksek</option>
            <option value="medium">Orta</option>
            <option value="low">Düşük</option>
          </select>
          
          <button
            onClick={resetFilters}
            className="flex items-center space-x-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          >
            <RefreshCw className="h-3 w-3" />
            <span className="text-sm">Sıfırla</span>
          </button>
        </div>
      </div>
      
      {/* Hızlı Filtreler */}
      {leadStats && (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setFilters({...filters, temperature: 'hot'})}
            className="flex items-center space-x-1 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-full text-xs transition-colors"
          >
            <Flame className="h-3 w-3" />
            <span>Sıcak Lead'ler ({leadStats.temperatureCounts?.find(t => t.temperature === 'hot')?.count || 0})</span>
          </button>
          
          <button
            onClick={() => setFilters({...filters, priority: 'high'})}
            className="flex items-center space-x-1 px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-full text-xs transition-colors"
          >
            <Flag className="h-3 w-3" />
            <span>Yüksek Öncelikli ({leadStats.priorityCounts?.find(p => p.priority === 'high')?.count || 0})</span>
          </button>
          
          <button
            onClick={() => setFilters({...filters, source: 'whatsapp'})}
            className="flex items-center space-x-1 px-3 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded-full text-xs transition-colors"
          >
            <MessageCircle className="h-3 w-3" />
            <span>WhatsApp ({leadStats.sourceCounts?.find(s => s.source === 'WhatsApp')?.count || 0})</span>
          </button>
          
          <button
            onClick={() => setFilters({...filters, source: 'call_center'})}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-xs transition-colors"
          >
            <Phone className="h-3 w-3" />
            <span>Çağrı Merkezi ({leadStats.sourceCounts?.find(s => s.source === 'Call Center')?.count || 0})</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LeadFilters;