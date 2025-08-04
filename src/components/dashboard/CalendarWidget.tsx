import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Eye,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface CalendarWidgetProps {
  className?: string;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Rol bazlı randevu verileri
  const getTodayAppointments = () => {
    const baseAppointments = [
      {
        id: 1,
        time: '09:00',
        title: 'Maria Rodriguez - Kalp Konsültasyonu',
        type: 'consultation',
        status: 'confirmed',
        location: 'Oda 101',
        duration: 30
      },
      {
        id: 2,
        time: '10:30',
        title: 'Ahmed Hassan - Kontrol Muayenesi',
        type: 'checkup',
        status: 'pending',
        location: 'Oda 203',
        duration: 20
      },
      {
        id: 3,
        time: '14:00',
        title: 'Sarah Thompson - Ameliyat Öncesi',
        type: 'pre_surgery',
        status: 'confirmed',
        location: 'Oda 305',
        duration: 45
      },
      {
        id: 4,
        time: '15:30',
        title: 'Hans Mueller - Takip Randevusu',
        type: 'followup',
        status: 'completed',
        location: 'Oda 102',
        duration: 15
      }
    ];

    // Rol bazlı filtreleme
    switch (user?.role) {
      case 'doctor':
        return baseAppointments.filter(apt => apt.type !== 'administrative');
      case 'nurse':
        return baseAppointments.filter(apt => apt.type === 'checkup' || apt.type === 'followup');
      case 'agent':
        return baseAppointments.filter(apt => apt.type === 'consultation');
      default:
        return baseAppointments;
    }
  };

  const appointments = getTodayAppointments();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'consultation': return '🩺';
      case 'checkup': return '📋';
      case 'pre_surgery': return '🏥';
      case 'followup': return '📅';
      default: return '📝';
    }
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Ajanda & Takvim</h3>
        </div>
        <button className="text-blue-600 hover:text-blue-700 p-1">
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Mini Takvim */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <h4 className="font-medium text-gray-900">
            {currentDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
          </h4>
          <button
            onClick={() => navigateMonth('next')}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
            <div key={day} className="p-1 font-medium text-gray-500">{day}</div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const dayNumber = i - 6; // Adjust for month start
            const isToday = dayNumber === new Date().getDate() && 
                           currentDate.getMonth() === new Date().getMonth();
            const isCurrentMonth = dayNumber > 0 && dayNumber <= 31;
            
            return (
              <div
                key={i}
                className={`p-1 text-xs cursor-pointer rounded ${
                  isToday ? 'bg-blue-600 text-white' :
                  isCurrentMonth ? 'hover:bg-gray-100' : 'text-gray-300'
                }`}
              >
                {isCurrentMonth ? dayNumber : ''}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bugünkü Randevular */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Bugünkü Randevular</h4>
          <span className="text-xs text-gray-500">{appointments.length} randevu</span>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="text-lg">{getTypeIcon(appointment.type)}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{appointment.time}</span>
                    <span className="text-xs text-gray-500">({appointment.duration}dk)</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{appointment.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{appointment.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(appointment.status)}`}>
                  {appointment.status === 'confirmed' ? 'Onaylandı' :
                   appointment.status === 'pending' ? 'Bekliyor' :
                   appointment.status === 'completed' ? 'Tamamlandı' : 'İptal'}
                </span>
                <button className="text-gray-400 hover:text-blue-600 p-1">
                  <Eye className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {appointments.length === 0 && (
          <div className="text-center py-6">
            <Calendar className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Bugün randevu yok</p>
          </div>
        )}
      </div>

      {/* Hızlı İstatistikler */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">
              {appointments.filter(a => a.status === 'confirmed').length}
            </div>
            <div className="text-xs text-gray-500">Onaylı</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">
              {appointments.filter(a => a.status === 'pending').length}
            </div>
            <div className="text-xs text-gray-500">Bekleyen</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {appointments.filter(a => a.status === 'completed').length}
            </div>
            <div className="text-xs text-gray-500">Tamamlanan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;