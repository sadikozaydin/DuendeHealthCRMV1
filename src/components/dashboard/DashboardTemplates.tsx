import React from 'react';
import { 
  Layout, 
  BarChart3, 
  Users, 
  MessageCircle, 
  Calendar,
  Activity,
  Target,
  Zap
} from 'lucide-react';

interface DashboardTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  widgets: string[];
  layout: 'default' | 'compact' | 'custom';
  targetRole?: string[];
}

interface DashboardTemplatesProps {
  onSelectTemplate: (template: DashboardTemplate) => void;
  currentRole?: string;
}

const DashboardTemplates: React.FC<DashboardTemplatesProps> = ({ 
  onSelectTemplate, 
  currentRole 
}) => {
  const templates: DashboardTemplate[] = [
    {
      id: 'executive',
      name: 'Yönetici Dashboard',
      description: 'KPI\'lar, analitikler ve genel performans odaklı',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600',
      widgets: ['welcome', 'stats', 'analytics', 'performance', 'calendar', 'help'],
      layout: 'default',
      targetRole: ['super_admin', 'admin', 'manager']
    },
    {
      id: 'sales',
      name: 'Satış Dashboard',
      description: 'Lead yönetimi ve satış performansı odaklı',
      icon: Target,
      color: 'from-green-500 to-green-600',
      widgets: ['welcome', 'stats', 'quickActions', 'notifications', 'performance', 'internalChat'],
      layout: 'compact',
      targetRole: ['agent']
    },
    {
      id: 'medical',
      name: 'Tıbbi Dashboard',
      description: 'Hasta takibi ve klinik süreçler odaklı',
      icon: Activity,
      color: 'from-red-500 to-red-600',
      widgets: ['welcome', 'patientFlow', 'calendar', 'treatmentOverview', 'recentActivity', 'help'],
      layout: 'default',
      targetRole: ['doctor', 'nurse']
    },
    {
      id: 'communication',
      name: 'İletişim Dashboard',
      description: 'Mesajlaşma ve koordinasyon odaklı',
      icon: MessageCircle,
      color: 'from-purple-500 to-purple-600',
      widgets: ['welcome', 'notifications', 'internalChat', 'recentActivity', 'quickActions', 'calendar'],
      layout: 'default',
      targetRole: ['coordinator', 'agent']
    },
    {
      id: 'minimal',
      name: 'Minimal Dashboard',
      description: 'Sadece temel bilgiler, sade görünüm',
      icon: Layout,
      color: 'from-gray-500 to-gray-600',
      widgets: ['welcome', 'quickActions', 'notifications', 'help'],
      layout: 'compact',
      targetRole: ['all']
    },
    {
      id: 'power-user',
      name: 'Power User Dashboard',
      description: 'Tüm widget\'lar, maksimum bilgi',
      icon: Zap,
      color: 'from-orange-500 to-orange-600',
      widgets: ['welcome', 'stats', 'quickActions', 'notifications', 'calendar', 'patientFlow', 'recentActivity', 'treatmentOverview', 'analytics', 'performance', 'internalChat', 'help'],
      layout: 'custom',
      targetRole: ['super_admin', 'admin']
    }
  ];

  // Rol bazlı filtreleme
  const filteredTemplates = templates.filter(template => 
    !template.targetRole || 
    template.targetRole.includes('all') || 
    (currentRole && template.targetRole.includes(currentRole))
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-gray-100">
          📋 Hazır Dashboard Şablonları
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Rolünüze uygun hazır şablonlardan birini seçerek hızlıca başlayın
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className={`group relative overflow-hidden p-4 bg-gradient-to-br ${template.color} text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-left`}
          >
            <div className="absolute top-2 right-2 opacity-80 group-hover:opacity-100 transition-opacity">
              <template.icon className="h-6 w-6" />
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-2">{template.name}</h4>
              <p className="text-sm opacity-90 mb-3">{template.description}</p>
              
              <div className="space-y-1">
                <div className="text-xs opacity-80">
                  📊 {template.widgets.length} widget
                </div>
                <div className="text-xs opacity-80">
                  🎨 {template.layout === 'default' ? 'Standart' : template.layout === 'compact' ? 'Kompakt' : 'Özel'} düzen
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-white border-opacity-30">
                <div className="text-sm font-medium opacity-90">
                  Hemen Uygula →
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
        <div className="flex items-center space-x-2 text-sm text-blue-800 dark:text-blue-200">
          <Zap className="h-4 w-4" />
          <span>Şablon seçtikten sonra widget'ları istediğiniz gibi özelleştirebilirsiniz.</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplates;