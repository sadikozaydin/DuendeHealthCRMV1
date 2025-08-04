import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  Users, 
  Circle, 
  Minus,
  Clock,
  Send,
  Plus,
  Eye,
  Activity,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getChatUsers, getChatStats, updateUserStatus } from '../../services/chatService';

interface InternalChatWidgetProps {
  className?: string;
}

const InternalChatWidget: React.FC<InternalChatWidgetProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [chatStats, setChatStats] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      // Kullanıcıları yükle
      getChatUsers('tenant-001').then(result => {
        if (result.success && Array.isArray(result.data)) {
          setUsers(result.data);
        } else {
          setUsers([]);
        }
      }).catch(() => setUsers([]));

      // Chat istatistiklerini yükle
      getChatStats(user.id).then(setChatStats).catch(() => setChatStats({}));
      
      // Kullanıcıyı online yap
      updateUserStatus(user.id, 'online');
      
      setIsLoading(false);
    }
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Circle className="h-3 w-3 text-green-500 fill-current" />;
      case 'away': return <Minus className="h-3 w-3 text-yellow-500" />;
      case 'busy': return <Circle className="h-3 w-3 text-red-500 fill-current" />;
      default: return <Circle className="h-3 w-3 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const formatLastSeen = (lastSeen: string) => {
    const date = new Date(lastSeen);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Az önce';
    if (diffMinutes < 60) return `${diffMinutes} dk önce`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} sa önce`;
    return date.toLocaleDateString('tr-TR');
  };

  const onlineUsers = users.filter(u => u.status === 'online' && u.id !== user?.id);
  const awayBusyUsers = users.filter(u => ['away', 'busy'].includes(u.status) && u.id !== user?.id);
  const offlineUsers = users.filter(u => u.status === 'offline' && u.id !== user?.id);

  return (
    <div className={`rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">İç Sohbet Sistemi</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {onlineUsers.length} online
          </span>
        </div>
        <button 
          onClick={() => navigate('/internal-chat')}
          className="text-blue-600 hover:text-blue-700 p-1 rounded"
          title="Sohbet Sayfasına Git"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>

      {/* Chat İstatistikleri */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{onlineUsers.length}</div>
          <div className="text-xs text-gray-500">Online</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{chatStats.totalMessages || 0}</div>
          <div className="text-xs text-gray-500">Mesaj</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">{chatStats.unreadMessages || 0}</div>
          <div className="text-xs text-gray-500">Okunmamış</div>
        </div>
      </div>

      {/* Online Kullanıcılar */}
      {onlineUsers.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-800">
              Çevrimiçi ({onlineUsers.length})
            </span>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {onlineUsers.slice(0, 3).map((chatUser) => (
              <div
                key={chatUser.id}
                onClick={() => navigate('/internal-chat')}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <div className="relative">
                  <img
                    src={chatUser.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(chatUser.name)}&background=4F46E5`}
                    alt={chatUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(chatUser.status)}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{chatUser.name}</h4>
                  <p className="text-xs text-green-600">Çevrimiçi - Aktif</p>
                </div>
                <MessageCircle className="h-4 w-4 text-blue-600" />
              </div>
            ))}
            {onlineUsers.length > 3 && (
              <div className="text-center">
                <button 
                  onClick={() => navigate('/internal-chat')}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  +{onlineUsers.length - 3} kişi daha
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Meşgul/Uzakta Kullanıcılar */}
      {awayBusyUsers.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-sm font-medium text-yellow-800">
              Meşgul/Uzakta ({awayBusyUsers.length})
            </span>
          </div>
          <div className="space-y-2">
            {awayBusyUsers.slice(0, 2).map((chatUser) => (
              <div
                key={chatUser.id}
                onClick={() => navigate('/internal-chat')}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              >
                <div className="relative">
                  <img
                    src={chatUser.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(chatUser.name)}&background=F59E0B`}
                    alt={chatUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(chatUser.status)}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{chatUser.name}</h4>
                  <p className="text-xs text-yellow-600">
                    {chatUser.status === 'away' ? 'Uzakta' : 'Meşgul'}
                  </p>
                </div>
                <MessageCircle className="h-4 w-4 text-yellow-600" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Çevrimdışı Kullanıcılar */}
      {offlineUsers.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="text-sm font-medium text-gray-600">
              Çevrimdışı ({offlineUsers.length})
            </span>
          </div>
          <div className="space-y-2">
            {offlineUsers.slice(0, 2).map((chatUser) => (
              <div
                key={chatUser.id}
                onClick={() => navigate('/internal-chat')}
                className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors opacity-75"
              >
                <div className="relative">
                  <img
                    src={chatUser.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(chatUser.name)}&background=6B7280`}
                    alt={chatUser.name}
                    className="w-8 h-8 rounded-full object-cover grayscale"
                  />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(chatUser.status)}`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-600 truncate">{chatUser.name}</h4>
                  <p className="text-xs text-gray-500">
                    Son: {formatLastSeen(chatUser.last_seen)}
                  </p>
                </div>
                <MessageCircle className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hızlı Erişim Butonları */}
      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate('/internal-chat')}
            className="flex items-center justify-center space-x-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Sohbet Aç</span>
          </button>
          <button
            onClick={() => navigate('/internal-chat')}
            className="flex items-center justify-center space-x-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="text-sm font-medium">Yeni Grup</span>
          </button>
        </div>
      </div>

      {/* Sistem Durumu */}
      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wifi className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Sistem Aktif</span>
          </div>
          <div className="flex items-center space-x-1">
            <Activity className="h-3 w-3 text-green-600" />
            <span className="text-xs text-green-600">Gerçek zamanlı</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalChatWidget;