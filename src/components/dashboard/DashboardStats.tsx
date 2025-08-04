import React from 'react';
import { Users, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardStatsProps {
  className?: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ className = '' }) => {
  const { user } = useAuth();

  // Rol bazlı istatistikler
  const getRoleBasedStats = () => {
    switch (user?.role) {
      case 'super_admin':
      case 'admin':
        return [
          {
            title: 'Toplam Hastalar',
            value: '2,847',
            change: '+12%',
            changeType: 'positive',
            icon: Users,
            color: 'bg-red-500'
          },
          {
            title: 'Aylık Gelir',
            value: '₺18.2M',
            change: '+23%',
            changeType: 'positive',
            icon: DollarSign,
            color: 'bg-green-500'
          },
          {
            title: 'Aktif Tedaviler',
            value: '156',
            change: '+8%',
            changeType: 'positive',
            icon: Calendar,
            color: 'bg-blue-500'
          },
          {
            title: 'Dönüşüm Oranı',
            value: '68%',
            change: '+5%',
            changeType: 'positive',
            icon: TrendingUp,
            color: 'bg-purple-500'
          }
        ];
      case 'manager':
        return [
          {
            title: 'Ekip Performansı',
            value: '94%',
            change: '+8%',
            changeType: 'positive',
            icon: TrendingUp,
            color: 'bg-blue-500'
          },
          {
            title: 'Aktif Hastalar',
            value: '247',
            change: '+12%',
            changeType: 'positive',
            icon: Users,
            color: 'bg-green-500'
          },
          {
            title: 'Bu Hafta Gelir',
            value: '₺4.2M',
            change: '+15%',
            changeType: 'positive',
            icon: DollarSign,
            color: 'bg-purple-500'
          },
          {
            title: 'Randevular',
            value: '89',
            change: '+8%',
            changeType: 'positive',
            icon: Calendar,
            color: 'bg-orange-500'
          }
        ];
      case 'agent':
        return [
          {
            title: 'Yeni Lead\'ler',
            value: '23',
            change: '+15%',
            changeType: 'positive',
            icon: Users,
            color: 'bg-blue-500'
          },
          {
            title: 'Dönüşen Hastalar',
            value: '7',
            change: '+30%',
            changeType: 'positive',
            icon: TrendingUp,
            color: 'bg-green-500'
          },
          {
            title: 'Aylık Hedef',
            value: '87%',
            change: '+12%',
            changeType: 'positive',
            icon: Calendar,
            color: 'bg-purple-500'
          },
          {
            title: 'Komisyon',
            value: '₺45K',
            change: '+25%',
            changeType: 'positive',
            icon: DollarSign,
            color: 'bg-orange-500'
          }
        ];
      case 'doctor':
        return [
          {
            title: 'Bugünkü Hastalar',
            value: '12',
            change: '+2',
            changeType: 'positive',
            icon: Users,
            color: 'bg-blue-500'
          },
          {
            title: 'Bu Hafta Ameliyat',
            value: '8',
            change: '+3',
            changeType: 'positive',
            icon: Calendar,
            color: 'bg-green-500'
          },
          {
            title: 'Hasta Memnuniyeti',
            value: '4.9',
            change: '+0.2',
            changeType: 'positive',
            icon: TrendingUp,
            color: 'bg-purple-500'
          },
          {
            title: 'Başarı Oranı',
            value: '96%',
            change: '+2%',
            changeType: 'positive',
            icon: TrendingUp,
            color: 'bg-orange-500'
          }
        ];
      default:
        return [
          {
            title: 'Aktif Hastalar',
            value: '247',
            change: '+12%',
            changeType: 'positive',
            icon: Users,
            color: 'bg-red-500'
          },
          {
            title: 'Planlanan Tedaviler',
            value: '89',
            change: '+8%',
            changeType: 'positive',
            icon: Calendar,
            color: 'bg-green-500'
          },
          {
            title: 'Bu Ay Gelir',
            value: '₺18.2M',
            change: '+23%',
            changeType: 'positive',
            icon: DollarSign,
            color: 'bg-gray-800'
          },
          {
            title: 'Dönüşüm Oranı',
            value: '68%',
            change: '+5%',
            changeType: 'positive',
            icon: TrendingUp,
            color: 'bg-red-600'
          }
        ];
    }
  };

  const stats = [
    ...getRoleBasedStats()
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">
                  {user?.role === 'doctor' ? 'geçen haftaya göre' : 'geçen aya göre'}
                </span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${stat.color} transform transition-transform hover:scale-110`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;