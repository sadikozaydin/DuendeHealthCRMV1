import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus,
  Calendar,
  FileText,
  Clipboard,
  Activity,
  Plane, 
  Stethoscope,
  Settings,
  MapPin,
  Package,
  CreditCard,
  MessageCircle,
  Globe,
  Briefcase,
  Bot,
  User,
  LogOut,
  DollarSign,
  ChevronRight,
  UserSearch
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBranch } from '../../contexts/BranchContext';
import { useSidebar } from '../../contexts/SidebarContext';
import { usePermissions } from '../../hooks/usePermissions';
import { useAuth } from '../../contexts/AuthContext';
import RoleGuard from '../auth/RoleGuard';

const Sidebar = () => {
  const { branchSettings } = useBranch();
  const { isExpanded, setIsExpanded } = useSidebar();
  const { getFilteredMenuItems, user } = usePermissions();
  const { logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navItems = [
    { 
      path: '/', 
      icon: LayoutDashboard, 
      label: t('navigation.dashboard'),
      requiredRoles: ['super_admin', 'admin', 'manager', 'doctor', 'nurse', 'agent', 'coordinator']
    },
    { 
      path: '/leads', 
      icon: UserPlus, 
      label: t('navigation.leads'),
      requiredRoles: ['super_admin', 'admin', 'manager', 'agent'],
      requiredPermissions: ['leads.view']
    },
    { 
      path: '/patients', 
      icon: Users, 
      label: t('navigation.patients'),
      requiredRoles: ['super_admin', 'admin', 'manager', 'doctor', 'nurse', 'agent', 'coordinator'],
      requiredPermissions: ['patients.view']
    },
    { 
      path: '/appointments', 
      icon: Calendar, 
      label: t('navigation.appointments'),
      requiredRoles: ['super_admin', 'admin', 'manager', 'doctor', 'nurse', 'coordinator'],
      requiredPermissions: ['appointments.view']
    },
    { 
      path: '/clinical-process', 
      icon: Activity, 
      label: t('navigation.treatments'),
      requiredRoles: ['super_admin', 'admin', 'doctor', 'nurse'],
      requiredPermissions: ['clinical.view']
    },
    { 
      path: '/documents', 
      icon: FileText, 
      label: t('navigation.documents'),
      requiredRoles: ['super_admin', 'admin', 'manager', 'doctor', 'nurse', 'agent', 'coordinator'],
      requiredPermissions: ['documents.view']
    },
    { 
      path: '/travel', 
      icon: Plane, 
      label: t('navigation.travel'),
      requiredRoles: ['super_admin', 'admin', 'manager', 'coordinator'],
      requiredPermissions: ['travel.view']
    },
    { 
      path: '/communication', 
      icon: MessageCircle, 
      label: t('navigation.communication'),
      requiredRoles: ['super_admin', 'admin', 'manager', 'agent', 'coordinator'],
      requiredPermissions: ['communication.view']
    },
    { 
      path: '/offers', 
      icon: DollarSign, 
      label: t('navigation.offers'),
      requiredRoles: ['super_admin', 'admin', 'manager', 'agent', 'coordinator'],
      requiredPermissions: ['offers.view']
    },
    { 
      path: '/internal-chat', 
      icon: Bot, 
      label: t('navigation.internalChat'),
      requiredRoles: ['super_admin', 'admin', 'manager', 'doctor', 'nurse', 'agent', 'coordinator'],
      requiredPermissions: ['communication.view']
    },
    { 
      path: '/hr', 
      icon: UserSearch, 
      label: 'İK & PDKS',
      requiredRoles: ['super_admin', 'admin', 'manager']
    },
    ...(branchSettings.isMultiBranch ? [{
      path: '/branches', 
      icon: MapPin, 
      label: t('navigation.branches'),
      requiredRoles: ['super_admin', 'admin'],
      requiredPermissions: ['branches.view']
    }] : []),
    { 
      path: '/settings', 
      icon: Settings, 
      label: t('navigation.settings'),
      requiredRoles: ['super_admin', 'admin'],
      requiredPermissions: ['settings.view']
    },
  ];

  // Kullanıcının rolüne göre menü öğelerini filtrele
  const filteredNavItems = getFilteredMenuItems(navItems);

  const handleMouseEnter = () => {
    if (!isExpanded && window.innerWidth >= 1024) {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) {
      setIsExpanded(false);
    }
  };
  return (
    <div 
      className={`${isExpanded ? 'w-64' : 'w-16'} bg-white border-gray-200 shadow-lg border-r flex flex-col transition-all duration-300 ease-in-out fixed top-0 left-0 z-50 h-screen`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo Section */}
      <div className={`${isExpanded ? 'p-4' : 'p-2'} border-b border-gray-200 transition-all duration-300 flex-shrink-0`}>
        <div className="flex justify-center">
          <div className="flex-shrink-0">
            {isExpanded ? (
              <img 
                src="/crmLogo_2.png" 
                alt="Duende Health CRM" 
                className="h-10 w-auto transition-all duration-300 opacity-0 animate-fade-in"
              />
            ) : (
              <img 
                src="/icon_health.png" 
                alt="Health Icon" 
                className="h-6 w-6 object-contain"
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className={`flex-1 ${isExpanded ? 'p-2' : 'p-1'} space-y-1 overflow-y-auto scrollbar-hide`}>
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center 
              ${isExpanded ? 'space-x-3 px-3 py-2' : 'justify-center px-1 py-1.5'} 
              rounded-lg transition-all duration-200 group relative 
              ${isActive ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            <item.icon className={`${isExpanded ? 'h-5 w-5' : 'h-4 w-4'} flex-shrink-0`} />
            {isExpanded && (
              <span className="font-medium opacity-0 animate-fade-in text-xs">{item.label}</span>
            )}
            {!isExpanded && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                {item.label}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-2 border-b-2 border-r-2 border-transparent border-r-gray-900"></div>
              </div>
            )}
          </NavLink>
        ))}
      </nav>
      
      {/* User Profile Section */}
      <div className={`border-t border-gray-200 ${isExpanded ? 'p-2' : 'p-1'} transition-all duration-300 flex-shrink-0`}>
        {isExpanded ? (
          <div className="opacity-0 animate-fade-in">
            <div className="flex items-center space-x-2 mb-1">
              <div className="relative">
                <img
                  src={user?.avatar || "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150"}
                  alt="Profile"
                  className="h-6 w-6 rounded-full object-cover"
                />
                <div className="absolute bottom-0 right-0 h-1.5 w-1.5 bg-green-400 border border-white rounded-full"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.role}</p>
              </div>
            </div>
            <div className="flex space-x-1">
              <button className="flex-1 flex items-center justify-center space-x-1 px-1 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors">
                <User className="h-2.5 w-2.5" />
                <span>Profil</span>
              </button>
              <button
                onClick={logout}
                className="flex items-center justify-center px-1 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Çıkış Yap"
              >
                <LogOut className="h-2.5 w-2.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-0.5">
            <div className="relative">
              <img
                src={user?.avatar || "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150"}
                alt="Profile"
                className="h-5 w-5 rounded-full object-cover border border-gray-200"
              />
              <div className="absolute bottom-0 right-0 h-1 w-1 bg-green-400 border border-white rounded-full"></div>
            </div>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded"
            >
              <LogOut className="h-2 w-2" />
            </button>
          </div>
        )}
      </div>
      
      {/* System Status */}
      <div className={`border-t border-gray-200 ${isExpanded ? 'p-1' : 'p-0.5'} transition-all duration-300 flex-shrink-0`}>
        {isExpanded ? (
          <div className="flex items-center space-x-1 p-1 bg-green-50 rounded opacity-0 animate-fade-in">
            <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium text-green-700">Aktif</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-1 w-1 bg-green-500 rounded-full"></div>
          </div>
        )}
      </div>

      {/* Expand/Collapse Indicator */}
      <div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
        <div className="bg-white border-gray-200 border rounded-full p-1 shadow-sm">
          <ChevronRight className={`h-2 w-2 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;