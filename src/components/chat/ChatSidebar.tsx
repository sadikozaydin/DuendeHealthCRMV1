import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Users, 
  MessageCircle, 
  Circle, 
  Minus,
  Clock,
  Filter,
  Plus,
  Hash,
  Loader2
} from 'lucide-react';
import { getChatUsers, getOrCreateConversation } from '../../services/chatService';

interface ChatSidebarProps {
  users: ChatUser[];
  onSelectUser: (user: ChatUser) => void;
  selectedUser?: ChatUser;
  currentUserId: string;
  onCreateGroup?: () => void;
}

// ChatUser interface for compatibility
interface ChatUser {
  id: string;
  name: string;
  role: string;
  avatar_url?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  last_seen: string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ 
  users, 
  onSelectUser, 
  selectedUser,
  currentUserId,
  onCreateGroup
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all');
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  // 🚀 Kullanıcı seçimi ve conversation oluşturma
  const handleUserSelect = async (user: ChatUser) => {
    if (isConnecting === user.id) return; // Zaten bağlanıyor
    
    setIsConnecting(user.id);
    
    try {
      console.log('🔄 Connecting to user:', user.name);
      
      // Conversation oluştur veya bul
      const convResult = await getOrCreateConversation(currentUserId, user.id, 'tenant-001');
      
      if (convResult.success) {
        console.log('✅ Conversation ready:', convResult.data?.conversation_id);
        onSelectUser(user);
      } else {
        console.error('❌ Failed to create conversation:', convResult.error);
        alert('Konuşma oluşturulamadı: ' + (convResult.error || 'Bilinmeyen hata'));
      }
    } catch (error) {
      console.error('❌ User selection error:', error);
      alert('Bağlantı hatası: ' + (error instanceof Error ? error.message : 'Bilinmeyen hata'));
    } finally {
      setIsConnecting(null);
    }
  };

  // Filtrelenmiş kullanıcılar
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const userStatus = user.status;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'online' && userStatus === 'online') ||
                         (statusFilter === 'offline' && userStatus === 'offline');
    
    return matchesSearch && matchesStatus && user.id !== currentUserId;
  });

  // Kullanıcıları duruma göre grupla
  const onlineUsers = filteredUsers.filter(u => u.status === 'online');
  const awayBusyUsers = filteredUsers.filter(u => ['away', 'busy'].includes(u.status));
  const offlineUsers = filteredUsers.filter(u => u.status === 'offline');

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

  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      agent: 'Satış Temsilcisi',
      admin: 'Yönetici',
      doctor: 'Doktor',
      nurse: 'Hemşire',
      coordinator: 'Koordinatör',
      manager: 'Müdür',
      super_admin: 'Sistem Yöneticisi'
    };
    return roleNames[role] || role;
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

  const UserItem = ({ user, status }: { user: ChatUser; status: any }) => {
    const isConnectingToThisUser = isConnecting === user.id;
    
    return (
    <div
      key={user.id}
      onClick={() => handleUserSelect(user)}
      className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
        selectedUser?.id === user.id 
          ? 'bg-blue-50 border-l-blue-500' 
          : 'border-l-transparent'
      } ${isConnectingToThisUser ? 'opacity-50 cursor-wait' : ''}`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative group">
          {isConnectingToThisUser && (
            <div className="absolute inset-0 bg-white bg-opacity-75 rounded-full flex items-center justify-center">
              <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
            </div>
          )}
          <img
            src={user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4F46E5`}
            alt={user.name}
            className={`w-10 h-10 rounded-full object-cover transition-all ${
              status.status === 'offline' ? 'opacity-50 grayscale' : ''
            }`}
          />
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(status.status)}`}></div>
          
          {/* Tooltip */}
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
            {status.status === 'online' ? 'Çevrimiçi - Aktif' :
             status.status === 'away' ? 'Uzakta' :
             status.status === 'busy' ? 'Meşgul' :
             `Son: ${formatLastSeen(status.last_seen)}`}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-medium truncate ${
            status.status === 'offline' ? 'text-gray-600' : 'text-gray-900'
          }`}>
            {user.name}
            {isConnectingToThisUser && (
              <span className="ml-2 text-xs text-blue-600">(bağlanıyor...)</span>
            )}
          </h4>
          <div className="flex items-center space-x-2">
            <span className={`text-xs capitalize ${
              status.status === 'offline' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {getRoleDisplayName(user.role)}
            </span>
            <span className="text-xs text-gray-300">•</span>
            <span className={`text-xs ${
              status.status === 'online' ? 'text-green-600 font-medium' :
              status.status === 'away' ? 'text-yellow-600' :
              status.status === 'busy' ? 'text-red-600' :
              'text-gray-500'
            }`}>
              {status.status === 'online' ? 'Çevrimiçi' :
               status.status === 'away' ? 'Uzakta' :
               status.status === 'busy' ? 'Meşgul' :
               `Son: ${formatLastSeen(status.last_seen)}`}
            </span>
          </div>
        </div>
      </div>
    </div>
    );
  };

  return (
    <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">İç Sohbet</h3>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {onlineUsers.length} online
            </span>
          </div>
          
          {onCreateGroup && (
            <button
              onClick={onCreateGroup}
              className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              title="Grup Oluştur"
            >
              <Plus className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Kullanıcı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        
        {/* Status Filter */}
        <div className="flex space-x-1">
          {[
            { id: 'all', label: 'Tümü', count: filteredUsers.length },
            { id: 'online', label: 'Online', count: onlineUsers.length },
            { id: 'offline', label: 'Offline', count: offlineUsers.length }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setStatusFilter(filter.id as any)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                statusFilter === filter.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {/* Online Users */}
        {onlineUsers.length > 0 && (statusFilter === 'all' || statusFilter === 'online') && (
          <>
            <div className="p-3 bg-green-50 border-b border-green-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-800">
                  Çevrimiçi ({onlineUsers.length})
                </span>
              </div>
            </div>
            {onlineUsers.map((user) => (
              <UserItem key={user.id} user={user} status={{ status: user.status, last_seen: user.last_seen }} />
            ))}
          </>
        )}

        {/* Away/Busy Users */}
        {awayBusyUsers.length > 0 && statusFilter === 'all' && (
          <>
            <div className="p-3 bg-yellow-50 border-b border-yellow-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium text-yellow-800">
                  Meşgul/Uzakta ({awayBusyUsers.length})
                </span>
              </div>
            </div>
            {awayBusyUsers.map((user) => (
              <UserItem key={user.id} user={user} status={{ status: user.status, last_seen: user.last_seen }} />
            ))}
          </>
        )}

        {/* Offline Users */}
        {offlineUsers.length > 0 && (statusFilter === 'all' || statusFilter === 'offline') && (
          <>
            <div className="p-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600">
                  Çevrimdışı ({offlineUsers.length})
                </span>
              </div>
            </div>
            {offlineUsers.map((user) => (
              <UserItem key={user.id} user={user} status={{ status: user.status, last_seen: user.last_seen }} />
            ))}
          </>
        )}

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
            <Users className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-sm text-center">
              {searchTerm ? 'Arama sonucu bulunamadı' : 'Kullanıcı bulunamadı'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs text-blue-600 hover:text-blue-700 mt-2"
              >
                Aramayı temizle
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-3 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">{onlineUsers.length}</div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">{awayBusyUsers.length}</div>
            <div className="text-xs text-gray-500">Meşgul</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gray-600">{offlineUsers.length}</div>
            <div className="text-xs text-gray-500">Offline</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;