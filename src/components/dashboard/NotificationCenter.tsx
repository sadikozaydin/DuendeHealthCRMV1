import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  Calendar, 
  CreditCard, 
  FileText,
  MessageCircle,
  Activity,
  X,
  Eye,
  MoreHorizontal
} from 'lucide-react';

interface NotificationCenterProps {
  className?: string;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'urgent',
      icon: AlertTriangle,
      title: 'Acil Lead',
      message: 'Maria Rodriguez kalp cerrahisi için acil konsültasyon istiyor',
      time: '2 dakika önce',
      read: false,
      priority: 'high',
      action: 'lead_urgent'
    },
    {
      id: 2,
      type: 'appointment',
      icon: Calendar,
      title: 'Randevu Hatırlatması',
      message: 'Ahmed Hassan 30 dakika sonra randevuya gelecek',
      time: '5 dakika önce',
      read: false,
      priority: 'medium',
      action: 'appointment_reminder'
    },
    {
      id: 3,
      type: 'document',
      icon: FileText,
      title: 'Eksik Evrak',
      message: 'Sarah Thompson\'ın pasaport kopyası eksik',
      time: '1 saat önce',
      read: false,
      priority: 'medium',
      action: 'document_missing'
    },
    {
      id: 4,
      type: 'payment',
      icon: CreditCard,
      title: 'Ödeme Alındı',
      message: 'Hans Mueller €15,000 ödeme yaptı',
      time: '2 saat önce',
      read: true,
      priority: 'low',
      action: 'payment_received'
    },
    {
      id: 5,
      type: 'approval',
      icon: CheckCircle,
      title: 'Onay Bekliyor',
      message: 'Yeni tedavi planı onayınızı bekliyor',
      time: '3 saat önce',
      read: false,
      priority: 'medium',
      action: 'approval_pending'
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'text-red-600';
      case 'appointment': return 'text-blue-600';
      case 'document': return 'text-purple-600';
      case 'payment': return 'text-green-600';
      case 'approval': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Bildirimler</h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              Tümünü Okundu İşaretle
            </button>
          )}
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notifications.slice(0, 5).map((notification) => (
          <div
            key={notification.id}
            className={`border-l-4 p-3 rounded-r-lg transition-all duration-200 ${
              notification.read ? 'bg-gray-50 border-l-gray-300' : getPriorityColor(notification.priority)
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <notification.icon className={`h-5 w-5 mt-0.5 ${getIconColor(notification.type)}`} />
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                    {notification.title}
                  </h4>
                  <p className={`text-sm mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-700'}`}>
                    {notification.message}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 ml-2">
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-blue-600 hover:text-blue-700 p-1"
                    title="Okundu İşaretle"
                  >
                    <Eye className="h-3 w-3" />
                  </button>
                )}
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-400 hover:text-red-600 p-1"
                  title="Kaldır"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-8">
          <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Henüz bildirim yok</p>
        </div>
      )}

      {notifications.length > 5 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
            Tüm Bildirimleri Gör ({notifications.length - 5} daha)
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;