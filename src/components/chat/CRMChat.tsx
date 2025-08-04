import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import { 
  ChatUser, 
  getMockUsers, 
  updateUserStatus, 
  getChatStats,
  clearOldMessages
} from '../../services/internalChatService';
import { 
  MessageCircle, 
  Users, 
  Activity, 
  BarChart3,
  Settings,
  X,
  Plus,
  Trash2
} from 'lucide-react';

interface CRMChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const CRMChat: React.FC<CRMChatProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [activeUser, setActiveUser] = useState<ChatUser | null>(null);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [chatStats, setChatStats] = useState<any>({});
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  // Kullanıcıları yükle
  useEffect(() => {
    if (isOpen && user) {
      const mockUsers = getMockUsers();
      setUsers(mockUsers);
      
      // Mevcut kullanıcıyı online yap
      updateUserStatus(user.id, 'online');
      
      // Chat istatistiklerini yükle
      const stats = getChatStats(user.id);
      setChatStats(stats);
    }

    // Cleanup - kullanıcıyı offline yap
    return () => {
      if (user) {
        updateUserStatus(user.id, 'offline');
      }
    };
  }, [isOpen, user]);

  // Eski mesajları temizle (30 günden eski)
  useEffect(() => {
    if (isOpen) {
      const cleanup = () => {
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
    }
  }, [isOpen]);

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  const currentChatUser: ChatUser = {
    id: user.id,
    name: user.name,
    role: user.role as any,
    avatar: user.avatar,
    status: 'online',
    lastSeen: new Date().toISOString()
  };

  const onlineCount = users.filter(u => u.status === 'online').length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-6 w-6" />
            <h2 className="text-xl font-bold">İç Sohbet Sistemi</h2>
            <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
              {onlineCount} online
            </span>
          </div>
          <div className="flex items-center space-x-3">
            {/* Chat Stats */}
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Activity className="h-4 w-4" />
                <span>{chatStats.totalMessages || 0} mesaj</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{chatStats.activeConversations || 0} sohbet</span>
              </div>
              {chatStats.unreadMessages > 0 && (
                <div className="flex items-center space-x-1 bg-red-500 bg-opacity-20 px-2 py-1 rounded-full">
                  <MessageCircle className="h-4 w-4" />
                  <span>{chatStats.unreadMessages} okunmamış</span>
                </div>
              )}
              <button
                onClick={() => {
                  const cleaned = clearOldMessages(7);
                  alert(`${cleaned} eski mesaj temizlendi`);
                  // Stats'ı yenile
                  const newStats = getChatStats(user.id);
                  setChatStats(newStats);
                }}
                className="flex items-center space-x-1 bg-yellow-500 bg-opacity-20 px-2 py-1 rounded-full hover:bg-yellow-500 hover:bg-opacity-30 transition-colors"
                title="7 günden eski mesajları temizle"
              >
                <Trash2 className="h-3 w-3" />
                <span className="text-xs">Temizle</span>
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex flex-1 overflow-hidden">
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

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm text-gray-600">
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

        {/* Create Group Modal */}
        {showCreateGroup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
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
    </div>
  );
};

export default CRMChat;