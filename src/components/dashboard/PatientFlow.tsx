import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface PatientFlowProps {
  className?: string;
}

const PatientFlow: React.FC<PatientFlowProps> = ({ className = '' }) => {
  const { user } = useAuth();

  // Rol bazlı hasta akışı
  const getRoleBasedFlow = () => {
    switch (user?.role) {
      case 'doctor':
        return [
          { stage: 'Bugünkü Randevular', count: 12, color: 'bg-blue-100 text-blue-800' },
          { stage: 'Muayene Bekleyen', count: 8, color: 'bg-yellow-100 text-yellow-800' },
          { stage: 'Tedavi Altında', count: 15, color: 'bg-green-100 text-green-800' },
          { stage: 'Takip Gereken', count: 6, color: 'bg-purple-100 text-purple-800' }
        ];
      case 'nurse':
        return [
          { stage: 'Vital Takip', count: 18, color: 'bg-blue-100 text-blue-800' },
          { stage: 'İlaç Zamanı', count: 12, color: 'bg-yellow-100 text-yellow-800' },
          { stage: 'Bakım Gereken', count: 9, color: 'bg-green-100 text-green-800' },
          { stage: 'Taburcu Hazır', count: 4, color: 'bg-purple-100 text-purple-800' }
        ];
      case 'agent':
        return [
          { stage: 'Yeni Lead', count: 23, color: 'bg-blue-100 text-blue-800' },
          { stage: 'İletişimde', count: 15, color: 'bg-yellow-100 text-yellow-800' },
          { stage: 'Teklif Aşaması', count: 8, color: 'bg-orange-100 text-orange-800' },
          { stage: 'Dönüşen', count: 7, color: 'bg-green-100 text-green-800' }
        ];
      default:
        return [
          { stage: 'İlk Başvuru', count: 45, color: 'bg-blue-100 text-blue-800' },
          { stage: 'Tıbbi Konsültasyon', count: 32, color: 'bg-yellow-100 text-yellow-800' },
          { stage: 'Tedavi Planlaması', count: 28, color: 'bg-purple-100 text-purple-800' },
          { stage: 'Seyahat Koordinasyonu', count: 24, color: 'bg-orange-100 text-orange-800' },
          { stage: 'Aktif Tedavi', count: 18, color: 'bg-green-100 text-green-800' },
          { stage: 'Tedavi Sonrası Bakım', count: 15, color: 'bg-gray-100 text-gray-800' }
        ];
    }
  };

  const flowStages = [
    ...getRoleBasedFlow()
  ];

  const getTitle = () => {
    switch (user?.role) {
      case 'doctor': return 'Hasta Durumu';
      case 'nurse': return 'Hemşirelik Görevleri';
      case 'agent': return 'Lead Akışı';
      default: return 'Hasta Akış Süreci';
    }
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{getTitle()}</h3>
      <div className="space-y-4">
        {flowStages.map((stage) => (
          <div key={stage.stage} className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${stage.color} transition-all hover:scale-105`}>
                {stage.count}
              </span>
              <span className="text-gray-700">{stage.stage}</span>
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-red-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(stage.count / Math.max(...flowStages.map(s => s.count))) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientFlow;