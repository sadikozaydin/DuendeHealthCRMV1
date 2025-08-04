import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface RoleGuardProps {
  children: React.ReactNode;
  roles?: string[];
  permissions?: string[];
  fallback?: React.ReactNode;
  requireAll?: boolean; // true: tüm roller/izinler gerekli, false: herhangi biri yeterli
}

const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  roles = [],
  permissions = [],
  fallback = null,
  requireAll = false
}) => {
  const { user, hasRole, hasPermission } = useAuth();

  if (!user) {
    return <>{fallback}</>;
  }

  // Süper admin her şeyi görebilir
  if (user.role === 'super_admin') {
    return <>{children}</>;
  }

  let hasAccess = false;

  if (requireAll) {
    // Tüm roller ve izinler gerekli
    const hasAllRoles = roles.length === 0 || roles.every(role => hasRole(role));
    const hasAllPermissions = permissions.length === 0 || permissions.every(permission => hasPermission(permission));
    hasAccess = hasAllRoles && hasAllPermissions;
  } else {
    // Herhangi bir rol veya izin yeterli
    const hasAnyRole = roles.length === 0 || roles.some(role => hasRole(role));
    const hasAnyPermission = permissions.length === 0 || permissions.some(permission => hasPermission(permission));
    hasAccess = hasAnyRole || hasAnyPermission;
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

export default RoleGuard;