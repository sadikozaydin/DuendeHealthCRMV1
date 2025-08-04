import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, 
  Plus, 
  Filter, 
  Search, 
  Clock, 
  User, 
  MapPin,
  ChevronLeft,
  ChevronRight,
  Heart,
  Bone,
  Brain,
  Eye,
  Scissors,
  Pill,
  Activity,
  Stethoscope
} from 'lucide-react';

const Appointments = () => {
  const { t } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [selectedFilters, setSelectedFilters] = useState({
    doctor: 'all',
    type: 'all',
    status: 'all'
  });

  // Randevu türleri ve kategoriler
  const appointmentCategories = [
    {
      id: 'cardiology',
      name: 'Kardiyoloji',
      icon: Heart,
      color: 'bg-red-100 text-red-700 border-red-200',
      count: 24,
      description: 'Kalp ve damar hastalıkları'
    },
    {
      id: 'orthopedics',
      name: 'Ortopedi',
      icon: Bone,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      count: 18,
      description: 'Kemik ve eklem tedavileri'
    },
    {
      id: 'neurology',
      name: 'Nöroloji',
      icon: Brain,
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      count: 12,
      description: 'Beyin ve sinir sistemi'
    },
    {
      id: 'ophthalmology',
      name: 'Göz Hastalıkları',
      icon: Eye,
      color: 'bg-green-100 text-green-700 border-green-200',
      count: 15,
      description: 'Göz muayene ve tedavileri'
    },
    {
      id: 'plastic-surgery',
      name: 'Plastik Cerrahi',
      icon: Scissors,
      color: 'bg-pink-100 text-pink-700 border-pink-200',
      count: 9,
      description: 'Estetik ve rekonstrüktif'
    },
    {
      id: 'pharmacy',
      name: 'İlaç Konsültasyonu',
      icon: Pill,
      color: 'bg-orange-100 text-orange-700 border-orange-200',
      count: 6,
      description: 'İlaç danışmanlığı'
    },
    {
      id: 'physiotherapy',
      name: 'Fizyoterapi',
      icon: Activity,
      color: 'bg-teal-100 text-teal-700 border-teal-200',
      count: 21,
      description: 'Fizik tedavi seansları'
    },
    {
      id: 'general',
      name: 'Genel Muayene',
      icon: Stethoscope,
      color: 'bg-gray-100 text-gray-700 border-gray-200',
      count: 33,
      description: 'Genel sağlık kontrolü'
    }
  ];

  const appointments = [
    {
      id: 1,
      patientName: 'Maria Rodriguez',
      doctorName: 'Dr. Mehmet Yılmaz',
      type: 'Kardiyoloji Konsültasyonu',
      date: '2025-01-15',
      time: '09:00',
      duration: 30,
      status: 'Onaylandı',
      room: 'Oda 101',
      notes: 'Kalp ritmi kontrolü'
    },
    {
      id: 2,
      patientName: 'Ahmed Hassan',
      doctorName: 'Dr. Fatma Kaya',
      type: 'Ortopedi Muayenesi',
      date: '2025-01-15',
      time: '10:30',
      duration: 45,
      status: 'Beklemede',
      room: 'Oda 203',
      notes: 'Diz ağrısı şikayeti'
    },
    {
      id: 3,
      patientName: 'Sarah Thompson',
      doctorName: 'Dr. Ayşe Demir',
      type: 'Plastik Cerrahi Konsültasyonu',
      date: '2025-01-15',
      time: '14:00',
      duration: 60,
      status: 'Onaylandı',
      room: 'Oda 305',
      notes: 'Rinoplasti değerlendirmesi'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Onaylandı': return 'bg-green-100 text-green-800';
      case 'Beklemede': return 'bg-yellow-100 text-yellow-800';
      case 'İptal': return 'bg-red-100 text-red-800';
      case 'Tamamlandı': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('appointments.title')}</h1>
          <p className="text-gray-600 mt-1">{t('appointments.subtitle')}</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>{t('appointments.newAppointment')}</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('appointments.todayAppointments')}</p>
              <p className="text-3xl font-bold text-red-600">24</p>
            </div>
            <Calendar className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('appointments.pendingApproval')}</p>
              <p className="text-3xl font-bold text-yellow-600">8</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('appointments.thisWeek')}</p>
              <p className="text-3xl font-bold text-green-600">156</p>
            </div>
            <User className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{t('appointments.occupancyRate')}</p>
              <p className="text-3xl font-bold text-purple-600">78%</p>
            </div>
            <MapPin className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Randevu Türleri ve Kategoriler */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Randevu Türleri ve Kategoriler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {appointmentCategories.map((category) => (
            <div
              key={category.id}
              className={`p-4 rounded-lg border-2 hover:shadow-md transition-all cursor-pointer ${category.color}`}
            >
              <div className="flex items-center justify-between mb-3">
                <category.icon className="h-6 w-6" />
                <span className="text-2xl font-bold">{category.count}</span>
              </div>
              <h4 className="font-semibold text-sm mb-1">{category.name}</h4>
              <p className="text-xs opacity-80">{category.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900 min-w-[200px] text-center">
                {formatDate(currentDate)}
              </h2>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {['day', 'week', 'month', 'year'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === mode
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {mode === 'day' ? 'Gün' : mode === 'week' ? 'Hafta' : mode === 'month' ? 'Ay' : 'Yıl'}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Hasta veya doktor ara..."
              className="pl-10 pr-4 py-2 w-full md:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtreler:</span>
          </div>

          <select
            value={selectedFilters.doctor}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, doctor: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tüm Doktorlar</option>
            <option value="dr-mehmet">Dr. Mehmet Yılmaz</option>
            <option value="dr-fatma">Dr. Fatma Kaya</option>
            <option value="dr-ayse">Dr. Ayşe Demir</option>
          </select>

          <select
            value={selectedFilters.type}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, type: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tüm Türler</option>
            <option value="consultation">Konsültasyon</option>
            <option value="surgery">Cerrahi</option>
            <option value="followup">Kontrol</option>
          </select>

          <select
            value={selectedFilters.status}
            onChange={(e) => setSelectedFilters({ ...selectedFilters, status: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="confirmed">Onaylandı</option>
            <option value="pending">Beklemede</option>
            <option value="cancelled">İptal</option>
          </select>
        </div>

        {/* Calendar View */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {viewMode === 'month' && (
            <div className="grid grid-cols-7 gap-0">
              {/* Calendar Header */}
              {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day) => (
                <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-700 border-b border-gray-200">
                  {day}
                </div>
              ))}
              
              {/* Calendar Days */}
              {Array.from({ length: 35 }, (_, i) => {
                const dayNumber = i - 6; // Adjust for month start
                const isCurrentMonth = dayNumber > 0 && dayNumber <= 31;
                const hasAppointments = isCurrentMonth && Math.random() > 0.7;
                
                return (
                  <div
                    key={i}
                    className={`min-h-[100px] p-2 border-b border-r border-gray-200 ${
                      isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
                    } cursor-pointer transition-colors`}
                  >
                    {isCurrentMonth && (
                      <>
                        <div className="text-sm font-medium text-gray-900 mb-1">
                          {dayNumber}
                        </div>
                        {hasAppointments && (
                          <div className="space-y-1">
                            <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded truncate">
                              09:00 Konsültasyon
                            </div>
                            <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded truncate">
                              14:00 Kontrol
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {viewMode !== 'month' && (
            <div className="p-6 text-center text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>{viewMode === 'day' ? 'Günlük' : viewMode === 'week' ? 'Haftalık' : 'Yıllık'} görünüm geliştirme aşamasındadır.</p>
            </div>
          )}
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Bugünkü Randevular</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {appointment.patientName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{appointment.patientName}</h4>
                    <p className="text-sm text-gray-600">{appointment.type}</p>
                    <p className="text-xs text-gray-500">{appointment.doctorName} • {appointment.room}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                    <p className="text-xs text-gray-500">{appointment.duration} dakika</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
              
              {appointment.notes && (
                <div className="mt-3 ml-14">
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {appointment.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointments;