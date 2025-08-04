import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Target, 
  Award, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle,
  Star,
  Activity,
  Zap,
  Heart
} from 'lucide-react';

interface PerformanceMetricsProps {
  className?: string;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ className = '' }) => {
  const { user } = useAuth();

  // Rol bazlı performans metrikleri
  const getRoleBasedMetrics = () => {
    switch (user?.role) {
      case 'agent':
        return {
          title: 'Satış Performansınız',
          metrics: [
            {
              icon: Target,
              label: 'Aylık Hedef',
              value: '87%',
              target: '100%',
              color: 'text-blue-600',
              bgColor: 'bg-blue-50',
              progress: 87
            },
            {
              icon: Users,
              label: 'Yeni Lead',
              value: '23',
              target: '30',
              color: 'text-green-600',
              bgColor: 'bg-green-50',
              progress: 77
            },
            {
              icon: CheckCircle,
              label: 'Dönüşüm',
              value: '7',
              target: '10',
              color: 'text-purple-600',
              bgColor: 'bg-purple-50',
              progress: 70
            },
            {
              icon: Star,
              label: 'Müşteri Puanı',
              value: '4.8',
              target: '5.0',
              color: 'text-yellow-600',
              bgColor: 'bg-yellow-50',
              progress: 96
            }
          ]
        };
      case 'doctor':
        return {
          title: 'Klinik Performansınız',
          metrics: [
            {
              icon: Users,
              label: 'Hasta Sayısı',
              value: '34',
              target: '40',
              color: 'text-blue-600',
              bgColor: 'bg-blue-50',
              progress: 85
            },
            {
              icon: Heart,
              label: 'Başarı Oranı',
              value: '96%',
              target: '95%',
              color: 'text-green-600',
              bgColor: 'bg-green-50',
              progress: 100
            },
            {
              icon: Clock,
              label: 'Ortalama Süre',
              value: '25dk',
              target: '30dk',
              color: 'text-purple-600',
              bgColor: 'bg-purple-50',
              progress: 83
            },
            {
              icon: Star,
              label: 'Memnuniyet',
              value: '4.9',
              target: '5.0',
              color: 'text-yellow-600',
              bgColor: 'bg-yellow-50',
              progress: 98
            }
          ]
        };
      case 'nurse':
        return {
          title: 'Hemşirelik Performansınız',
          metrics: [
            {
              icon: Users,
              label: 'Hasta Bakımı',
              value: '12',
              target: '15',
              color: 'text-blue-600',
              bgColor: 'bg-blue-50',
              progress: 80
            },
            {
              icon: Activity,
              label: 'Vital Takip',
              value: '45',
              target: '50',
              color: 'text-green-600',
              bgColor: 'bg-green-50',
              progress: 90
            },
            {
              icon: CheckCircle,
              label: 'Görev Tamamlama',
              value: '98%',
              target: '95%',
              color: 'text-purple-600',
              bgColor: 'bg-purple-50',
              progress: 100
            },
            {
              icon: Clock,
              label: 'Yanıt Süresi',
              value: '3dk',
              target: '5dk',
              color: 'text-yellow-600',
              bgColor: 'bg-yellow-50',
              progress: 100
            }
          ]
        };
      case 'coordinator':
        return {
          title: 'Koordinasyon Performansınız',
          metrics: [
            {
              icon: Users,
              label: 'Aktif Hastalar',
              value: '18',
              target: '20',
              color: 'text-blue-600',
              bgColor: 'bg-blue-50',
              progress: 90
            },
            {
              icon: CheckCircle,
              label: 'Tamamlanan İşlem',
              value: '156',
              target: '150',
              color: 'text-green-600',
              bgColor: 'bg-green-50',
              progress: 100
            },
            {
              icon: Clock,
              label: 'Ortalama Yanıt',
              value: '2.3sa',
              target: '4sa',
              color: 'text-purple-600',
              bgColor: 'bg-purple-50',
              progress: 100
            },
            {
              icon: Star,
              label: 'Memnuniyet',
              value: '4.7',
              target: '4.5',
              color: 'text-yellow-600',
              bgColor: 'bg-yellow-50',
              progress: 100
            }
          ]
        };
      default:
        return {
          title: 'Genel Performans',
          metrics: [
            {
              icon: Activity,
              label: 'Sistem Kullanımı',
              value: '78%',
              target: '80%',
              color: 'text-blue-600',
              bgColor: 'bg-blue-50',
              progress: 98
            },
            {
              icon: Zap,
              label: 'Verimlilik',
              value: '94%',
              target: '90%',
              color: 'text-green-600',
              bgColor: 'bg-green-50',
              progress: 100
            }
          ]
        };
    }
  };

  const performanceData = getRoleBasedMetrics();

  return (
    <div className={`rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Award className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-900">{performanceData.title}</h3>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700">
          Detaylı Rapor
        </button>
      </div>

      <div className="space-y-4">
        {performanceData.metrics.map((metric, index) => (
          <div key={index} className={`p-4 rounded-lg ${metric.bgColor}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
                <span className="text-sm font-medium text-gray-900">{metric.label}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">{metric.value}</span>
                <span className="text-sm text-gray-500 ml-1">/ {metric.target}</span>
              </div>
            </div>
            
            <div className="w-full bg-white rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  metric.progress >= 100 ? 'bg-green-500' :
                  metric.progress >= 80 ? 'bg-blue-500' :
                  metric.progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(metric.progress, 100)}%` }}
              />
            </div>
            
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-600">
                {metric.progress >= 100 ? 'Hedef aşıldı!' :
                 metric.progress >= 80 ? 'Hedefe yakın' :
                 metric.progress >= 60 ? 'Orta seviye' : 'Gelişim gerekli'}
              </span>
              <span className="text-xs font-medium text-gray-700">
                %{metric.progress}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Genel Değerlendirme */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Genel Performans Skoru</h4>
              <p className="text-sm text-gray-600 mt-1">Bu ay ortalama performansınız</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {Math.round(performanceData.metrics.reduce((acc, metric) => acc + metric.progress, 0) / performanceData.metrics.length)}
              </div>
              <div className="text-sm text-gray-500">/ 100</div>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600 font-medium">
                Geçen aya göre +8% artış
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Motivasyon Mesajı */}
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">
            {performanceData.metrics.reduce((acc, metric) => acc + metric.progress, 0) / performanceData.metrics.length >= 90
              ? 'Mükemmel performans! Böyle devam edin! 🎉'
              : performanceData.metrics.reduce((acc, metric) => acc + metric.progress, 0) / performanceData.metrics.length >= 70
              ? 'İyi gidiyorsunuz! Hedeflere yaklaşıyorsunuz! 💪'
              : 'Biraz daha çaba ile hedeflere ulaşabilirsiniz! 🚀'
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;