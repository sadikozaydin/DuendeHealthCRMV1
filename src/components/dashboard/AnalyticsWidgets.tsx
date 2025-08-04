import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Activity,
  Target,
  Award,
  Globe,
  MapPin
} from 'lucide-react';

interface AnalyticsWidgetsProps {
  className?: string;
}

const AnalyticsWidgets: React.FC<AnalyticsWidgetsProps> = ({ className = '' }) => {
  const { user } = useAuth();

  // Rol bazlı analitik verileri
  const getRoleBasedAnalytics = () => {
    switch (user?.role) {
      case 'super_admin':
      case 'admin':
        return {
          title: 'Sistem Analitikleri',
          charts: [
            {
              title: 'Aylık Gelir Trendi',
              value: '₺18.2M',
              change: '+23%',
              trend: 'up',
              data: [65, 78, 85, 92, 88, 95, 102]
            },
            {
              title: 'Hasta Dağılımı',
              value: '2,847',
              change: '+12%',
              trend: 'up',
              data: [45, 52, 48, 61, 58, 67, 72]
            }
          ]
        };
      case 'manager':
        return {
          title: 'Yönetim Analitikleri',
          charts: [
            {
              title: 'Ekip Performansı',
              value: '94%',
              change: '+8%',
              trend: 'up',
              data: [78, 82, 85, 88, 91, 89, 94]
            },
            {
              title: 'Müşteri Memnuniyeti',
              value: '4.8/5',
              change: '+0.3',
              trend: 'up',
              data: [4.2, 4.3, 4.5, 4.6, 4.7, 4.8, 4.8]
            }
          ]
        };
      case 'agent':
        return {
          title: 'Satış Performansı',
          charts: [
            {
              title: 'Dönüşüm Oranı',
              value: '32%',
              change: '+5%',
              trend: 'up',
              data: [25, 27, 29, 28, 30, 31, 32]
            },
            {
              title: 'Aylık Hedef',
              value: '87%',
              change: '+12%',
              trend: 'up',
              data: [60, 65, 70, 75, 80, 85, 87]
            }
          ]
        };
      case 'doctor':
        return {
          title: 'Klinik Analitikleri',
          charts: [
            {
              title: 'Hasta Memnuniyeti',
              value: '4.9/5',
              change: '+0.2',
              trend: 'up',
              data: [4.5, 4.6, 4.7, 4.8, 4.8, 4.9, 4.9]
            },
            {
              title: 'Tedavi Başarı Oranı',
              value: '96%',
              change: '+2%',
              trend: 'up',
              data: [92, 93, 94, 95, 95, 96, 96]
            }
          ]
        };
      default:
        return {
          title: 'Genel Analitikler',
          charts: [
            {
              title: 'Sistem Kullanımı',
              value: '78%',
              change: '+5%',
              trend: 'up',
              data: [65, 68, 72, 75, 76, 77, 78]
            }
          ]
        };
    }
  };

  const analytics = getRoleBasedAnalytics();

  // Mini chart component
  const MiniChart = ({ data, trend }: { data: number[], trend: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    
    return (
      <div className="flex items-end space-x-1 h-12">
        {data.map((value, index) => {
          const height = ((value - min) / (max - min)) * 100;
          return (
            <div
              key={index}
              className={`w-2 rounded-t ${
                trend === 'up' ? 'bg-green-400' : 'bg-red-400'
              }`}
              style={{ height: `${Math.max(height, 10)}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className={`rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">{analytics.title}</h3>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          Detaylı Görünüm
        </button>
      </div>

      <div className="space-y-4">
        {analytics.charts.map((chart, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">{chart.title}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-2xl font-bold text-gray-900">{chart.value}</span>
                  <div className={`flex items-center space-x-1 ${
                    chart.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {chart.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">{chart.change}</span>
                  </div>
                </div>
              </div>
              <MiniChart data={chart.data} trend={chart.trend} />
            </div>
          </div>
        ))}
      </div>

      {/* Coğrafi Dağılım (Sadece admin ve üstü roller için) */}
      {(user?.role === 'super_admin' || user?.role === 'admin') && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
            <Globe className="h-4 w-4 text-blue-600" />
            <span>Hasta Coğrafi Dağılımı</span>
          </h4>
          <div className="space-y-2">
            {[
              { country: 'Türkiye', patients: 1247, percentage: 44 },
              { country: 'İspanya', patients: 589, percentage: 21 },
              { country: 'İngiltere', patients: 423, percentage: 15 },
              { country: 'Almanya', patients: 356, percentage: 12 },
              { country: 'Diğer', patients: 232, percentage: 8 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-700">{item.country}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-1">
                    <div 
                      className="bg-blue-500 h-1 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-gray-600 w-8 text-right">{item.patients}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KPI Özeti */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">94%</div>
            <div className="text-xs text-gray-500">Hedef</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">4.8</div>
            <div className="text-xs text-gray-500">Rating</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">+23%</div>
            <div className="text-xs text-gray-500">Büyüme</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidgets;