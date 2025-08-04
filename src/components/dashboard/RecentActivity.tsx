import React from 'react';
import { Clock, User, Calendar, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface RecentActivityProps {
  className?: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ className = '' }) => {
  const { user } = useAuth();

  // Rol bazlı aktiviteler
  const getRoleBasedActivities = () => {
    switch (user?.role) {
      case 'doctor':
        return [
          {
            id: 1,
            type: 'patient',
            icon: User,
            title: 'Hasta muayenesi tamamlandı',
            description: 'Maria Rodriguez kalp kontrolü yapıldı',
            time: '30 dakika önce',
            color: 'bg-blue-100 text-blue-600'
          },
          {
            id: 2,
            type: 'appointment',
            icon: Calendar,
            title: 'Ameliyat planlandı',
            description: 'Ahmed Hassan için bypass ameliyatı gelecek hafta',
            time: '1 saat önce',
            color: 'bg-green-100 text-green-600'
          },
          {
            id: 3,
            type: 'document',
            icon: FileText,
            title: 'Tıbbi rapor güncellendi',
            description: 'Sarah Thompson için ameliyat sonrası rapor',
            time: '2 saat önce',
            color: 'bg-purple-100 text-purple-600'
          }
        ];
      case 'agent':
        return [
          {
            id: 1,
            type: 'patient',
            icon: User,
            title: 'Yeni lead atandı',
            description: 'İspanya\'dan kalp cerrahisi talebi',
            time: '15 dakika önce',
            color: 'bg-blue-100 text-blue-600'
          },
          {
            id: 2,
            type: 'appointment',
            icon: Calendar,
            title: 'Konsültasyon randevusu',
            description: 'Maria Rodriguez ile video görüşme planlandı',
            time: '45 dakika önce',
            color: 'bg-green-100 text-green-600'
          },
          {
            id: 3,
            type: 'document',
            icon: FileText,
            title: 'Teklif gönderildi',
            description: 'Ahmed Hassan için tedavi teklifi hazırlandı',
            time: '2 saat önce',
            color: 'bg-purple-100 text-purple-600'
          }
        ];
      default:
        return [
          {
            id: 1,
            type: 'patient',
            icon: User,
            title: 'Yeni hasta kaydı',
            description: 'İspanya\'dan Maria Rodriguez kalp cerrahisi için kayıt oldu',
            time: '2 dakika önce',
            color: 'bg-blue-100 text-blue-600'
          },
          {
            id: 2,
            type: 'appointment',
            icon: Calendar,
            title: 'Tedavi planlandı',
            description: 'Ahmet Yılmaz\'ın diz protezi ameliyatı gelecek hafta için planlandı',
            time: '4 saat önce',
            color: 'bg-green-100 text-green-600'
          },
          {
            id: 3,
            type: 'document',
            icon: FileText,
            title: 'Tıbbi kayıtlar güncellendi',
            description: 'Ahmed Hassan için ameliyat öncesi belgeler tamamlandı',
            time: '6 saat önce',
            color: 'bg-purple-100 text-purple-600'
          },
          {
            id: 4,
            type: 'patient',
            icon: User,
            title: 'Tedavi tamamlandı',
            description: 'Sarah Johnson diş implantı işlemini başarıyla tamamladı',
            time: '1 gün önce',
            color: 'bg-orange-100 text-orange-600'
          }
        ];
    }
  };

  const activities = [
    ...getRoleBasedActivities()
  ];

  const getTitle = () => {
    switch (user?.role) {
      case 'doctor': return 'Son Tıbbi Aktiviteler';
      case 'agent': return 'Son Lead Aktiviteleri';
      case 'nurse': return 'Son Hemşirelik Aktiviteleri';
      default: return 'Son Aktiviteler';
    }
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{getTitle()}</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Tümünü Gör
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-[1.02]">
            <div className={`p-2 rounded-lg ${activity.color}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900">{activity.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <div className="flex items-center mt-2">
                <Clock className="h-3 w-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;