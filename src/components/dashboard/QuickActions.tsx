import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  UserPlus, 
  Calendar, 
  Search, 
  Upload, 
  MessageCircle,
  FileText,
  CreditCard,
  Plane,
  Users,
  Activity,
  BarChart3,
  Settings,
  Phone,
  Mail,
  Video,
  Plus,
  Edit,
  Eye,
  Download
} from 'lucide-react';

interface QuickActionsProps {
  className?: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getRoleBasedActions = () => {
    const actions = {
      super_admin: [
        { icon: UserPlus, label: 'Kullanıcı Ekle', action: () => navigate('/settings'), color: 'bg-blue-500' },
        { icon: BarChart3, label: 'Raporlar', action: () => navigate('/analytics'), color: 'bg-green-500' },
        { icon: Settings, label: 'Sistem Ayarları', action: () => navigate('/settings'), color: 'bg-purple-500' },
        { icon: Users, label: 'Tüm Hastalar', action: () => navigate('/patients'), color: 'bg-orange-500' }
      ],
      admin: [
        { icon: UserPlus, label: 'Yeni Lead', action: () => navigate('/leads'), color: 'bg-blue-500' },
        { icon: Calendar, label: 'Randevu Oluştur', action: () => navigate('/appointments'), color: 'bg-green-500' },
        { icon: Users, label: 'Hasta Yönetimi', action: () => navigate('/patients'), color: 'bg-purple-500' },
        { icon: BarChart3, label: 'Analitik', action: () => navigate('/analytics'), color: 'bg-orange-500' }
      ],
      manager: [
        { icon: UserPlus, label: 'Yeni Lead', action: () => navigate('/leads'), color: 'bg-blue-500' },
        { icon: Calendar, label: 'Randevu Planla', action: () => navigate('/appointments'), color: 'bg-green-500' },
        { icon: Users, label: 'Ekip Yönetimi', action: () => navigate('/settings'), color: 'bg-purple-500' },
        { icon: BarChart3, label: 'Performans', action: () => navigate('/analytics'), color: 'bg-orange-500' }
      ],
      doctor: [
        { icon: Calendar, label: 'Randevularım', action: () => navigate('/appointments'), color: 'bg-blue-500' },
        { icon: Users, label: 'Hastalarım', action: () => navigate('/patients'), color: 'bg-green-500' },
        { icon: FileText, label: 'Tıbbi Kayıtlar', action: () => navigate('/clinical-process'), color: 'bg-purple-500' },
        { icon: Activity, label: 'Tedavi Süreçleri', action: () => navigate('/clinical-process'), color: 'bg-orange-500' }
      ],
      nurse: [
        { icon: Calendar, label: 'Bugünkü Görevler', action: () => navigate('/appointments'), color: 'bg-blue-500' },
        { icon: Users, label: 'Hasta Bakımı', action: () => navigate('/patients'), color: 'bg-green-500' },
        { icon: Activity, label: 'Vital Takip', action: () => navigate('/clinical-process'), color: 'bg-purple-500' },
        { icon: FileText, label: 'Hemşire Notları', action: () => navigate('/documents'), color: 'bg-orange-500' }
      ],
      agent: [
        { icon: UserPlus, label: 'Yeni Lead Ekle', action: () => navigate('/leads'), color: 'bg-blue-500' },
        { icon: Phone, label: 'Lead Ara', action: () => window.open('tel:+905551234567'), color: 'bg-green-500' },
        { icon: MessageCircle, label: 'WhatsApp Gönder', action: () => navigate('/communication'), color: 'bg-purple-500' },
        { icon: Search, label: 'Lead Ara', action: () => navigate('/leads'), color: 'bg-orange-500' }
      ],
      coordinator: [
        { icon: Plane, label: 'Seyahat Planla', action: () => navigate('/travel'), color: 'bg-blue-500' },
        { icon: Calendar, label: 'Randevu Koordine', action: () => navigate('/appointments'), color: 'bg-green-500' },
        { icon: MessageCircle, label: 'Hasta İletişimi', action: () => navigate('/communication'), color: 'bg-purple-500' },
        { icon: FileText, label: 'Evrak Takibi', action: () => navigate('/documents'), color: 'bg-orange-500' }
      ],
      finance: [
        { icon: CreditCard, label: 'Ödeme Kaydet', action: () => navigate('/payments'), color: 'bg-blue-500' },
        { icon: BarChart3, label: 'Finansal Rapor', action: () => navigate('/analytics'), color: 'bg-green-500' },
        { icon: FileText, label: 'Fatura Oluştur', action: () => navigate('/payments'), color: 'bg-purple-500' },
        { icon: Download, label: 'Excel İndir', action: () => {}, color: 'bg-orange-500' }
      ],
      partner: [
        { icon: Users, label: 'Hastalarım', action: () => navigate('/patients'), color: 'bg-blue-500' },
        { icon: CreditCard, label: 'Komisyon Durumu', action: () => navigate('/payments'), color: 'bg-green-500' },
        { icon: BarChart3, label: 'Performansım', action: () => navigate('/analytics'), color: 'bg-purple-500' },
        { icon: MessageCircle, label: 'Destek', action: () => navigate('/communication'), color: 'bg-orange-500' }
      ],
      patient: [
        { icon: Calendar, label: 'Randevularım', action: () => navigate('/patient-portal'), color: 'bg-blue-500' },
        { icon: FileText, label: 'Belgelerim', action: () => navigate('/patient-portal'), color: 'bg-green-500' },
        { icon: CreditCard, label: 'Ödemelerim', action: () => navigate('/patient-portal'), color: 'bg-purple-500' },
        { icon: MessageCircle, label: 'Mesajlarım', action: () => navigate('/patient-portal'), color: 'bg-orange-500' }
      ]
    };

    return actions[user?.role] || actions.patient;
  };

  const quickActions = getRoleBasedActions();

  return (
    <div className={`rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Hızlı Erişim</h3>
        <span className="text-xs text-gray-500">Sık kullanılan işlemler</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
          >
            <div className={`p-3 rounded-lg ${action.color} text-white mb-2 group-hover:scale-110 transition-transform`}>
              <action.icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-gray-900 text-center">{action.label}</span>
          </button>
        ))}
      </div>

    </div>
  );
};

export default QuickActions;