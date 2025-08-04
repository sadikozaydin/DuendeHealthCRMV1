import { useAuth } from '../contexts/AuthContext';

export const usePermissions = () => {
  const { user, hasPermission, hasRole, checkAccess } = useAuth();

  // Sayfa erişim kontrolleri
  const canAccessPage = (page: string): boolean => {
    const pagePermissions = {
      '/': ['dashboard.view'],
      '/leads': ['leads.view', 'leads.manage'],
      '/patients': ['patients.view'],
      '/appointments': ['appointments.view'],
      '/clinical-process': ['clinical.view', 'treatments.view'],
      '/documents': ['documents.view'],
      '/travel': ['travel.view'],
      '/analytics': ['reports.view'],
      '/inventory': ['inventory.view'],
      '/payments': ['payments.view'],
      '/communication': ['communication.view'],
      '/partners': ['partners.view'],
      '/patient-portal': ['portal.access'],
      '/ai-automation': ['settings.view'],
      '/settings': ['settings.view'],
      '/branches': ['branches.view']
    };

    const requiredPermissions = pagePermissions[page] || [];
    return requiredPermissions.some(permission => hasPermission(permission));
  };

  // Buton/aksiyon erişim kontrolleri
  const canPerformAction = (action: string): boolean => {
    const actionPermissions = {
      'create_patient': ['patients.create'],
      'edit_patient': ['patients.edit'],
      'delete_patient': ['patients.delete'],
      'view_patient_details': ['patients.view'],
      'create_lead': ['leads.create'],
      'edit_lead': ['leads.edit'],
      'assign_lead': ['leads.assign'],
      'create_appointment': ['appointments.create'],
      'edit_appointment': ['appointments.edit'],
      'cancel_appointment': ['appointments.cancel'],
      'view_financial_data': ['payments.view', 'reports.view'],
      'manage_users': ['users.manage'],
      'manage_settings': ['settings.manage'],
      'export_data': ['reports.export'],
      'send_communication': ['communication.send']
    };

    const requiredPermissions = actionPermissions[action] || [];
    return requiredPermissions.some(permission => hasPermission(permission));
  };

  // Veri filtreleme (kullanıcı sadece kendi verilerini görebilir mi?)
  const getDataFilter = () => {
    if (!user) return { type: 'none' };

    switch (user.role) {
      case 'super_admin':
      case 'admin':
        return { type: 'all' };
      
      case 'manager':
        return { type: 'branch', branchId: user.branch };
      
      case 'doctor':
      case 'nurse':
        return { type: 'assigned', userId: user.id };
      
      case 'agent':
        return { type: 'assigned', userId: user.id };
      
      case 'partner':
        return { type: 'partner', partnerId: user.id };
      
      case 'patient':
        return { type: 'own', userId: user.id };
      
      default:
        return { type: 'none' };
    }
  };

  // Menü öğelerini filtrele
  const getFilteredMenuItems = (menuItems: any[]) => {
    return menuItems.filter(item => {
      if (!item.requiredPermissions && !item.requiredRoles) return true;
      
      const roles = item.requiredRoles || [];
      const permissions = item.requiredPermissions || [];
      
      return checkAccess(roles, permissions);
    });
  };

  // Rol bazlı yönlendirme
  const getDefaultRoute = (): string => {
    if (!user) return '/login';

    switch (user.role) {
      case 'super_admin':
      case 'admin':
        return '/';
      
      case 'manager':
        return '/';
      
      case 'doctor':
        return '/patients';
      
      case 'nurse':
        return '/patients';
      
      case 'agent':
        return '/leads';
      
      case 'coordinator':
        return '/travel';
      
      case 'finance':
        return '/payments';
      
      case 'partner':
        return '/partner-portal';
      
      case 'patient':
        return '/patient-portal';
      
      default:
        return '/';
    }
  };

  return {
    user,
    hasPermission,
    hasRole,
    checkAccess,
    canAccessPage,
    canPerformAction,
    getDataFilter,
    getFilteredMenuItems,
    getDefaultRoute
  };
};