import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AlertTriangle, Shield, Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  requiredPermissions?: string[];
  fallbackPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  requiredPermissions = [],
  fallbackPath = '/login'
}) => {
  const { user, checkAccess } = useAuth();
  const location = useLocation();

  // Kullanıcı giriş yapmamış
  if (!user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Yetki kontrolü
  if (requiredRoles.length > 0 && !checkAccess(requiredRoles, requiredPermissions)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Erişim Reddedildi</h1>
          <p className="text-gray-600 mb-6">
            Bu sayfaya erişim yetkiniz bulunmamaktadır. Lütfen sistem yöneticiniz ile iletişime geçiniz.
          </p>
          
          <div className="bg-red-50 border-red-200 border rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm font-medium">Yetkisiz Erişim Girişimi</span>
            </div>
            <p className="text-xs text-red-600 mt-2">
              Bu girişim güvenlik loglarına kaydedilmiştir.
            </p>
          </div>
          
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Kullanıcı:</strong> {user.name}</p>
            <p><strong>Rol:</strong> {user.role}</p>
            <p><strong>Sayfa:</strong> {location.pathname}</p>
          </div>
          
          <div className="mt-6 space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Geri Dön
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Ana Sayfaya Git
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;