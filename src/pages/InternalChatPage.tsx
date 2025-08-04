import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatWindow from '../components/chat/ChatWindow';
import {
  getChatUsers,
  updateUserStatus,
  getChatStats,
  clearOldMessages
} from '../services/chatService';
import {
  MessageCircle,
  Users,
  Activity,
  Trash2
} from 'lucide-react';

interface ChatUser {
  id: string;
  name: string;
  role: string;
  avatar_url?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  last_seen: string;
}

const InternalChatPage: React.FC = () => {
  const { user } = useAuth();
  const [activeUser, setActiveUser] = useState<ChatUser | null>(null);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [chatStats, setChatStats] = useState<any>({});
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  useEffect(() => {
    if (user) {
      getChatUsers('tenant-001').then(result => {
        if (result.success && Array.isArray(result.data)) {
          setUsers(result.data);
        } else {
          console.error('Failed to load users:', result.error);
          setUsers([]);
        }
      }).catch(error => {
        console.error('Error loading users:', error);
        setUsers([]);
      });

      updateUserStatus(user.id, 'online');
      getChatStats(user.id).then(setChatStats).catch(console.error);
    }

    return () => {
      if (user) {
        updateUserStatus(user.id, 'offline');
      }
    };
  }, [user]);

  useEffect(() => {
    const cleanup = async () => {
      const cleanedCount = clearOldMessages(30);
      if (cleanedCount > 0) {
        console.log(`${cleanedCount} eski mesaj temizlendi`);
      }
      
      // Eski dosyaları da temizle
      try {
        const files = JSON.parse(localStorage.getItem('chat_files') || '[]');
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 30);
        
        const filteredFiles = files.filter((file: any) => 
          new Date(file.uploadedAt) > cutoffDate
        );
        
        if (filteredFiles.length < files.length) {
          localStorage.setItem('chat_files', JSON.stringify(filteredFiles));
          console.log(`${files.length - filteredFiles.length} eski dosya temizlendi`);
        }
      } catch (error) {
        console.error('Dosya temizleme hatası:', error);
      }
    };
    
    cleanup();
  }, []);

  if (!user) return null;

  const currentChatUser: ChatUser = {
    id: user.id,
    name: user.name,
    role: user.role,
    avatar_url: user.avatar,
    status: 'online',
    last_seen: new Date().toISOString()
  };

  const onlineCount = Array.isArray(users) ? users.filter(u => u.status === 'online').length : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">İç Sohbet Sistemi</h1>
          <p className="text-gray-600 mt-1">Ekip arkadaşlarınızla anlık mesajlaşma</p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Activity className="h-4 w-4 text-blue-600" />
            <span>{chatStats.totalMessages || 0} mesaj</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-green-600" />
            <span>{onlineCount} online</span>
          </div>
          {chatStats.unreadMessages > 0 && (
            <div className="flex items-center space-x-1 bg-red-100 text-red-800 px-2 py-1 rounded-full">
              <MessageCircle className="h-4 w-4" />
              <span>{chatStats.unreadMessages} okunmamış</span>
            </div>
          )}
          <button
            onClick={() => {
              clearOldMessages(7).then(cleaned => {
                alert(`${cleaned} eski mesaj temizlendi`);
                return getChatStats(user.id);
              }).then(setChatStats).catch(console.error);
            }}
            className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full hover:bg-yellow-200 transition-colors"
            title="7 günden eski mesajları temizle"
          >
            <Trash2 className="h-3 w-3" />
            <span className="text-xs">Temizle</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
        <div className="flex h-full">
          <ChatSidebar 
            users={users} 
            onSelectUser={setActiveUser} 
            selectedUser={activeUser}
            currentUserId={currentChatUser.id}
            onCreateGroup={() => setShowCreateGroup(true)}
          />

          {activeUser ? (
            <ChatWindow 
              currentUser={currentChatUser} 
              activeUser={activeUser} 
            />
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">İç Sohbet Sistemi</h3>
                <p className="text-gray-600 max-w-md">
                  Ekip arkadaşlarınızla güvenli ve hızlı iletişim kurun. 
                  Sol panelden bir kullanıcı seçerek sohbeti başlatın.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{onlineCount}</div>
                    <div className="text-sm text-gray-500">Online</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{chatStats.totalMessages || 0}</div>
                    <div className="text-sm text-gray-500">Mesaj</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{users.length}</div>
                    <div className="text-sm text-gray-500">Kullanıcı</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex justify-between items-center text-sm text-blue-800">
          <div className="flex items-center space-x-4">
            <span>💬 localStorage ile geçici saklama</span>
            <span>🚀 Supabase'e geçiş için hazır</span>
            <span>🧹 Otomatik temizlik: 30 gün</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Sistem Aktif</span>
          </div>
        </div>
      </div>

      {showCreateGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Grup Sohbeti Oluştur</h3>
            <p className="text-gray-600 mb-4">
              Grup sohbeti özelliği yakında eklenecek! Şu an sadece 1-on-1 mesajlaşma destekleniyor.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCreateGroup(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternalChatPage;
