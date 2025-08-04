import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface TreatmentOverviewProps {
  className?: string;
}

const TreatmentOverview: React.FC<TreatmentOverviewProps> = ({ className = '' }) => {
  const { user } = useAuth();

  // Rol bazlı tedavi verileri
  const getRoleBasedTreatments = () => {
    switch (user?.role) {
      case 'doctor':
        return [
          { name: 'Bugünkü Hastalarım', patients: 12, revenue: '₺45K', trend: '+2' },
          { name: 'Bu Hafta Ameliyatlar', patients: 8, revenue: '₺180K', trend: '+3' },
          { name: 'Takip Randevuları', patients: 15, revenue: '₺22K', trend: '+5' },
          { name: 'Konsültasyonlar', patients: 6, revenue: '₺18K', trend: '+1' }
        ];
      case 'agent':
        return [
          { name: 'Aktif Lead\'ler', patients: 23, revenue: '₺0', trend: '+8' },
          { name: 'Teklif Aşaması', patients: 8, revenue: '₺450K', trend: '+3' },
          { name: 'Dönüşen Hastalar', patients: 7, revenue: '₺280K', trend: '+2' },
          { name: 'Takip Gereken', patients: 12, revenue: '₺0', trend: '+4' }
        ];
      default:
        return [
          { name: 'Kardiyoloji', patients: 45, revenue: '₺6.7M', trend: '+15%' },
          { name: 'Ortopedi', patients: 38, revenue: '₺5.4M', trend: '+8%' },
          { name: 'Onkoloji', patients: 32, revenue: '₺9.1M', trend: '+22%' },
          { name: 'Plastik Cerrahi', patients: 28, revenue: '₺4.2M', trend: '+12%' },
          { name: 'Diş Tedavisi', patients: 52, revenue: '₺2.6M', trend: '+18%' }
        ];
    }
  };

  const treatments = [
    ...getRoleBasedTreatments()
  ];

  const getTitle = () => {
    switch (user?.role) {
      case 'doctor': return 'Tıbbi Aktivitelerim';
      case 'agent': return 'Satış Performansım';
      default: return 'Tedavi Kategorileri';
    }
  };

  const getPatientLabel = () => {
    switch (user?.role) {
      case 'doctor': return 'hasta';
      case 'agent': return 'lead';
      default: return 'aktif hasta';
    }
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{getTitle()}</h3>
      <div className="space-y-4">
        {treatments.map((treatment) => (
          <div key={treatment.name} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:scale-[1.02]">
            <div>
              <h4 className="font-medium text-gray-900">{treatment.name}</h4>
              <p className="text-sm text-gray-500">{treatment.patients} {getPatientLabel()}</p>
            </div>
            <div className="text-right">
              {treatment.revenue !== '₺0' && (
                <p className="font-semibold text-gray-900">{treatment.revenue}</p>
              )}
              <p className="text-sm text-green-600">{treatment.trend}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreatmentOverview;