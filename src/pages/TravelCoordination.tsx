import React, { useState } from 'react';
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Clock, 
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  CheckCircle,
  AlertTriangle,
  Car,
  Building2,
  Phone,
  Mail,
  MessageCircle,
  Navigation,
  Users,
  Luggage,
  CreditCard,
  FileText,
  Camera,
  Upload,
  Download,
  Bell,
  Star,
  Globe,
  Wifi,
  Coffee,
  Utensils,
  Bed,
  Shield,
  Heart,
  Activity,
  Settings,
  BarChart3,
  TrendingUp,
  DollarSign,
  Euro,
  Timer,
  Target,
  Award,
  Zap,
  Bot,
  Smartphone,
  Monitor,
  Tablet,
  Send,
  RefreshCw,
  ExternalLink,
  Copy,
  Share2,
  Flag,
  AlertCircle,
  Info,
  CheckSquare,
  XCircle,
  User,
  Building,
  Hotel,
  Route,
  Compass,
  Fuel,
  ParkingCircle
} from 'lucide-react';

const TravelCoordination = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    date: 'all'
  });

  // Seyahat koordinasyonu verileri
  const travelCoordinations = [
    {
      id: 1,
      patientName: 'Maria Rodriguez',
      patientId: 'P-2024-001',
      treatment: 'Kalp Cerrahisi',
      country: 'İspanya',
      city: 'Madrid',
      arrivalDate: '2025-01-20',
      departureDate: '2025-01-30',
      status: 'Planlandı',
      priority: 'Yüksek',
      coordinator: 'Fatma Yılmaz',
      totalCost: '€8,500',
      services: {
        flight: { status: 'Onaylandı', cost: '€450', details: 'Turkish Airlines TK1856' },
        accommodation: { status: 'Rezerve', cost: '€1,200', details: 'Medical Hotel Istanbul - 10 gece' },
        transfer: { status: 'Planlandı', cost: '€300', details: 'VIP transfer hizmeti' },
        visa: { status: 'Gerekli Değil', cost: '€0', details: 'AB vatandaşı' },
        insurance: { status: 'Aktif', cost: '€250', details: 'Seyahat + Sağlık sigortası' }
      },
      companions: 1,
      specialRequests: ['Diyabet hastası', 'Tekerlekli sandalye'],
      documents: ['Pasaport', 'Sağlık raporu', 'Sigorta poliçesi'],
      image: 'https://images.pexels.com/photos/7180651/pexels-photo-7180651.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      patientName: 'Ahmed Hassan',
      patientId: 'P-2024-002',
      treatment: 'Diz Protezi',
      country: 'BAE',
      city: 'Dubai',
      arrivalDate: '2025-01-25',
      departureDate: '2025-02-05',
      status: 'Devam Ediyor',
      priority: 'Orta',
      coordinator: 'Zeynep Demir',
      totalCost: '$12,000',
      services: {
        flight: { status: 'Tamamlandı', cost: '$800', details: 'Emirates EK122' },
        accommodation: { status: 'Check-in', cost: '$2,400', details: 'Acıbadem Maslak Hotel - 12 gece' },
        transfer: { status: 'Aktif', cost: '$400', details: 'Lüks araç + şoför' },
        visa: { status: 'Onaylandı', cost: '$100', details: 'Tıbbi vize' },
        insurance: { status: 'Aktif', cost: '$500', details: 'Kapsamlı sağlık sigortası' }
      },
      companions: 2,
      specialRequests: ['Halal yemek', 'Namaz vakti bilgilendirme'],
      documents: ['Pasaport', 'Vize', 'Tıbbi rapor', 'Sigorta'],
      image: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      patientName: 'Sarah Thompson',
      patientId: 'P-2024-003',
      treatment: 'Plastik Cerrahi',
      country: 'İngiltere',
      city: 'Londra',
      arrivalDate: '2025-02-01',
      departureDate: '2025-02-08',
      status: 'Beklemede',
      priority: 'Düşük',
      coordinator: 'Merve Şahin',
      totalCost: '£6,200',
      services: {
        flight: { status: 'Beklemede', cost: '£320', details: 'British Airways BA676' },
        accommodation: { status: 'Seçenek Sunuldu', cost: '£840', details: 'Boutique Hotel Nişantaşı - 7 gece' },
        transfer: { status: 'Beklemede', cost: '£180', details: 'Standart transfer' },
        visa: { status: 'Gerekli Değil', cost: '£0', details: 'İngiliz vatandaşı' },
        insurance: { status: 'Teklif Bekliyor', cost: '£200', details: 'Estetik cerrahi sigortası' }
      },
      companions: 0,
      specialRequests: ['Vejetaryen yemek'],
      documents: ['Pasaport', 'Sağlık raporu'],
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  // Seyahat hizmetleri
  const travelServices = [
    { id: 'flight', name: 'Uçak Bileti', icon: Plane, color: 'text-blue-600' },
    { id: 'accommodation', name: 'Konaklama', icon: Building2, color: 'text-green-600' },
    { id: 'transfer', name: 'Transfer', icon: Car, color: 'text-purple-600' },
    { id: 'visa', name: 'Vize İşlemleri', icon: FileText, color: 'text-orange-600' },
    { id: 'insurance', name: 'Sigorta', icon: Shield, color: 'text-red-600' },
    { id: 'guide', name: 'Rehber', icon: User, color: 'text-teal-600' }
  ];

  // Partner oteller
  const partnerHotels = [
    {
      id: 1,
      name: 'Medical Hotel Istanbul',
      category: 'Medikal Otel',
      rating: 4.8,
      location: 'Nişantaşı, İstanbul',
      features: ['Hasta Bakımı', 'Hemşire Hizmeti', '24/7 Doktor', 'Özel Beslenme'],
      priceRange: '€80-150/gece',
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 2,
      name: 'Acıbadem Maslak Hotel',
      category: 'Hastane Oteli',
      rating: 4.9,
      location: 'Maslak, İstanbul',
      features: ['Hastane Bağlantısı', 'Tıbbi Ekipman', 'Rehabilitasyon', 'Fizyoterapi'],
      priceRange: '$120-200/gece',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      id: 3,
      name: 'Boutique Hotel Nişantaşı',
      category: 'Butik Otel',
      rating: 4.6,
      location: 'Nişantaşı, İstanbul',
      features: ['Lüks Konaklama', 'Spa Hizmetleri', 'Concierge', 'Özel Transfer'],
      priceRange: '£90-180/gece',
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planlandı': return 'bg-blue-100 text-blue-800';
      case 'Devam Ediyor': return 'bg-green-100 text-green-800';
      case 'Tamamlandı': return 'bg-purple-100 text-purple-800';
      case 'Beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'İptal': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Yüksek': return 'bg-red-100 text-red-800';
      case 'Orta': return 'bg-yellow-100 text-yellow-800';
      case 'Düşük': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceStatusColor = (status: string) => {
    switch (status) {
      case 'Tamamlandı':
      case 'Onaylandı':
      case 'Aktif':
      case 'Check-in':
      case 'Rezerve': return 'bg-green-100 text-green-800';
      case 'Planlandı':
      case 'Beklemede':
      case 'Seçenek Sunuldu':
      case 'Teklif Bekliyor': return 'bg-yellow-100 text-yellow-800';
      case 'Gerekli Değil': return 'bg-gray-100 text-gray-800';
      case 'İptal': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Seyahat Koordinasyonu</h1>
          <p className="text-gray-600 mt-1">Uçak, konaklama, transfer ve vize işlemleri yönetimi</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Yeni Seyahat Planı</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktif Seyahatler</p>
              <p className="text-3xl font-bold text-blue-600">47</p>
            </div>
            <Plane className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+8 bu hafta</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Partner Oteller</p>
              <p className="text-3xl font-bold text-green-600">24</p>
            </div>
            <Building2 className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">3 şehirde</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ortalama Maliyet</p>
              <p className="text-3xl font-bold text-purple-600">€9.2K</p>
            </div>
            <CreditCard className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">Hasta başına</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Memnuniyet</p>
              <p className="text-3xl font-bold text-yellow-600">4.9</p>
            </div>
            <Star className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-sm text-yellow-600 mt-2">5 üzerinden</p>
        </div>
      </div>

      {/* Travel Services Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Seyahat Hizmetleri</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {travelServices.map((service) => (
            <div
              key={service.id}
              className="p-4 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <service.icon className={`h-6 w-6 ${service.color}`} />
                <span className="text-2xl font-bold text-gray-700">
                  {travelCoordinations.filter(t => 
                    Object.values(t.services).some(s => s.status === 'Aktif' || s.status === 'Onaylandı')
                  ).length}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{service.name}</h4>
              <p className="text-xs text-gray-600">Aktif hizmetler</p>
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
                placeholder="Hasta, destinasyon ara..."
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
              <option value="planned">Planlandı</option>
              <option value="ongoing">Devam Ediyor</option>
              <option value="completed">Tamamlandı</option>
              <option value="pending">Beklemede</option>
            </select>
            
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Türler</option>
              <option value="surgery">Cerrahi</option>
              <option value="treatment">Tedavi</option>
              <option value="checkup">Kontrol</option>
            </select>
            
            <select
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Tarihler</option>
              <option value="this-week">Bu Hafta</option>
              <option value="this-month">Bu Ay</option>
              <option value="next-month">Gelecek Ay</option>
            </select>
          </div>
        </div>
      </div>

      {/* Travel Coordinations List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hasta & Destinasyon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seyahat Detayları
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hizmet Durumu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Maliyet & Koordinatör
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {travelCoordinations.map((travel) => (
                <tr key={travel.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={travel.image}
                        alt={travel.patientName}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{travel.patientName}</div>
                        <div className="text-sm text-gray-500">{travel.patientId}</div>
                        <div className="text-xs text-gray-400 flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{travel.city}, {travel.country}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{travel.treatment}</div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Varış: {travel.arrivalDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Dönüş: {travel.departureDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{travel.companions} refakatçi</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(travel.status)}`}>
                          {travel.status}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(travel.priority)}`}>
                          {travel.priority}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        <span className={`px-1 py-0.5 rounded text-xs ${getServiceStatusColor(travel.services.flight.status)}`}>
                          ✈️ {travel.services.flight.status}
                        </span>
                        <span className={`px-1 py-0.5 rounded text-xs ${getServiceStatusColor(travel.services.accommodation.status)}`}>
                          🏨 {travel.services.accommodation.status}
                        </span>
                        <span className={`px-1 py-0.5 rounded text-xs ${getServiceStatusColor(travel.services.transfer.status)}`}>
                          🚗 {travel.services.transfer.status}
                        </span>
                        <span className={`px-1 py-0.5 rounded text-xs ${getServiceStatusColor(travel.services.visa.status)}`}>
                          📄 {travel.services.visa.status}
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{travel.totalCost}</div>
                    <div className="text-sm text-gray-600">{travel.coordinator}</div>
                    <div className="text-xs text-gray-500">Koordinatör</div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-700 p-1 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700 p-1 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-700 p-1 rounded">
                        <MessageCircle className="h-4 w-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-700 p-1 rounded">
                        <FileText className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Partner Hotels */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Partner Oteller</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Tümünü Gör
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {partnerHotels.map((hotel) => (
            <div key={hotel.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{hotel.name}</h4>
                    <p className="text-sm text-gray-600">{hotel.category}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{hotel.location}</span>
                </div>
                
                <div className="mb-3">
                  <h5 className="text-sm font-medium text-gray-900 mb-1">Özellikler</h5>
                  <div className="flex flex-wrap gap-1">
                    {hotel.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                    {hotel.features.length > 3 && (
                      <span className="text-xs text-gray-500">+{hotel.features.length - 3} daha</span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{hotel.priceRange}</span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Detaylar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Maliyet Dağılımı</h3>
          <div className="space-y-4">
            {[
              { service: 'Konaklama', percentage: 45, amount: '€4,140', color: 'bg-blue-500' },
              { service: 'Uçak Bileti', percentage: 25, amount: '€2,300', color: 'bg-green-500' },
              { service: 'Transfer', percentage: 15, amount: '€1,380', color: 'bg-purple-500' },
              { service: 'Sigorta', percentage: 10, amount: '€920', color: 'bg-orange-500' },
              { service: 'Vize & Diğer', percentage: 5, amount: '€460', color: 'bg-gray-500' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm font-medium text-gray-900">{item.service}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-16 text-right">{item.amount}</span>
                  <span className="text-sm text-gray-500 w-8 text-right">%{item.percentage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Seyahat Metrikleri</h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Timer className="h-5 w-5 text-blue-600" />
                <span className="text-xl font-bold text-blue-700">8.5</span>
              </div>
              <h4 className="font-medium text-blue-900">Ortalama Kalış Süresi</h4>
              <p className="text-sm text-blue-700">gün</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Target className="h-5 w-5 text-green-600" />
                <span className="text-xl font-bold text-green-700">94%</span>
              </div>
              <h4 className="font-medium text-green-900">Zamanında Varış</h4>
              <p className="text-sm text-green-700">başarı oranı</p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Award className="h-5 w-5 text-purple-600" />
                <span className="text-xl font-bold text-purple-700">4.9</span>
              </div>
              <h4 className="font-medium text-purple-900">Hizmet Memnuniyeti</h4>
              <p className="text-sm text-purple-700">5 üzerinden</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI & Automation Features */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span>Akıllı Seyahat Koordinasyonu & Otomasyonlar</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Otomatik Planlama</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Tedavi süresine göre konaklama önerisi</li>
              <li>• En uygun uçuş seçenekleri</li>
              <li>• Transfer rotası optimizasyonu</li>
              <li>• Vize gereksinim kontrolü</li>
              <li>• Sigorta kapsamı önerisi</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Gerçek Zamanlı Takip</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Uçuş durumu bildirimleri</li>
              <li>• Otel check-in/out takibi</li>
              <li>• Transfer araç konumu</li>
              <li>• Acil durum uyarıları</li>
              <li>• Hasta güvenlik takibi</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Maliyet Optimizasyonu</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Dinamik fiyat karşılaştırması</li>
              <li>• Sezon bazlı öneriler</li>
              <li>• Grup indirimi hesaplama</li>
              <li>• Erken rezervasyon avantajları</li>
              <li>• Bütçe takip ve uyarıları</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCoordination;