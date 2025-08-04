// ?妣 CRM 襤癟i Kullan覺c覺lar Aras覺 Sohbet Sistemi
// localStorage ile ge癟ici saklama, Supabase'e ge癟i? i癟in haz覺r yap覺

export interface ChatUser {
  id: string;
  name: string;
  role: 'agent' | 'admin' | 'doctor' | 'nurse' | 'coordinator' | 'manager' | 'super_admin';
  avatar?: string;
  branchId?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastSeen: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  createdAt: string;
  read?: boolean;
  messageType?: 'text' | 'file' | 'system';
  fileUrl?: string;
  fileName?: string;
}

export interface ChatConversation {
  id: string;
  participants: string[];
  lastMessage?: ChatMessage;
  lastActivity: string;
  unreadCount: number;
}

// ??儭?localStorage Keys
const STORAGE_KEYS = {
  MESSAGES: 'crm_internal_messages',
  CONVERSATIONS: 'crm_internal_conversations',
  USER_STATUS: 'crm_user_status',
  FILES: 'chat_files'
};

// Dosya yükleme fonksiyonu (LocalStorage için)
export const uploadFileToLocalStorage = async (file: File, conversationId: string): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    // Dosya boyutu kontrolü (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return { success: false, error: 'Dosya boyutu 5MB\'ı geçemez' };
    }
    
    // Dosyayı Data URL'ye çevir
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    
    // Dosya bilgilerini oluştur
    const fileData = {
      id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      conversationId,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      url: dataUrl,
      uploadedAt: new Date().toISOString()
    };
    
    // Mevcut dosyaları al
    const existingFiles = JSON.parse(localStorage.getItem(STORAGE_KEYS.FILES) || '[]');
    existingFiles.push(fileData);
    
    // LocalStorage'a kaydet
    localStorage.setItem(STORAGE_KEYS.FILES, JSON.stringify(existingFiles));
    
    return { success: true, url: dataUrl };
  } catch (error) {
    console.error('File upload error:', error);
    return { success: false, error: 'Dosya yüklenirken hata oluştu' };
  }
};

// Dosya silme fonksiyonu
export const deleteFileFromLocalStorage = async (fileId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const files = JSON.parse(localStorage.getItem(STORAGE_KEYS.FILES) || '[]');
    const updatedFiles = files.filter((f: any) => f.id !== fileId);
    
    localStorage.setItem(STORAGE_KEYS.FILES, JSON.stringify(updatedFiles));
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Dosya silinirken hata oluştu' };
  }
};

// ? Mesaj 襤?lemleri
export const getMessages = (): ChatMessage[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
  } catch (error) {
    console.error('Error getting messages:', error);
    return [];
  }
};

export const addMessage = (msg: ChatMessage): void => {
  try {
    const messages = getMessages();
    messages.push(msg);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));

    // Konu?may覺 g羹ncelle
    updateConversation(msg.senderId, msg.recipientId, msg);
    
    // Ger癟ek zamanl覺 g羹ncelleme i癟in event dispatch
    window.dispatchEvent(new CustomEvent('newInternalMessage', { detail: msg }));
  } catch (error) {
    console.error('Error adding message:', error);
  }
};

export const getConversationMessages = (userId1: string, userId2: string): ChatMessage[] => {
  const allMessages = getMessages();
  return allMessages.filter(
    (m) =>
      (m.senderId === userId1 && m.recipientId === userId2) ||
      (m.senderId === userId2 && m.recipientId === userId1)
  ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

export const markMessagesAsRead = (senderId: string, recipientId: string): void => {
  try {
    const messages = getMessages();
    const updatedMessages = messages.map(msg => {
      if (msg.senderId === senderId && msg.recipientId === recipientId) {
        return { ...msg, read: true };
      }
      return msg;
    });
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updatedMessages));
  } catch (error) {
    console.error('Error marking messages as read:', error);
  }
};

// ? Konu?ma 襤?lemleri
export const getConversations = (): ChatConversation[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CONVERSATIONS) || '[]');
  } catch (error) {
    console.error('Error getting conversations:', error);
    return [];
  }
};

export const updateConversation = (userId1: string, userId2: string, lastMessage: ChatMessage): void => {
  try {
    const conversations = getConversations();
    const conversationId = [userId1, userId2].sort().join('-');
    
    const existingIndex = conversations.findIndex(c => c.id === conversationId);
    
    const conversation: ChatConversation = {
      id: conversationId,
      participants: [userId1, userId2],
      lastMessage,
      lastActivity: lastMessage.createdAt,
      unreadCount: existingIndex >= 0 ? conversations[existingIndex].unreadCount + 1 : 1
    };
    
    if (existingIndex >= 0) {
      conversations[existingIndex] = conversation;
    } else {
      conversations.push(conversation);
    }
    
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  } catch (error) {
    console.error('Error updating conversation:', error);
  }
};

export const getUserConversations = (userId: string): ChatConversation[] => {
  const conversations = getConversations();
  return conversations
    .filter(c => c.participants.includes(userId))
    .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());
};

// ? Kullan覺c覺 Durumu 襤?lemleri
export const updateUserStatus = (userId: string, status: ChatUser['status']): void => {
  try {
    const statusData = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_STATUS) || '{}');
    statusData[userId] = {
      status,
      lastSeen: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.USER_STATUS, JSON.stringify(statusData));
    
    // Status de?i?ikli?i event'i
    window.dispatchEvent(new CustomEvent('userStatusChanged', { 
      detail: { userId, status } 
    }));
  } catch (error) {
    console.error('Error updating user status:', error);
  }
};

export const getUserStatus = (userId: string): { status: ChatUser['status']; lastSeen: string } => {
  try {
    const statusData = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_STATUS) || '{}');
    return statusData[userId] || { status: 'offline', lastSeen: new Date().toISOString() };
  } catch (error) {
    console.error('Error getting user status:', error);
    return { status: 'offline', lastSeen: new Date().toISOString() };
  }
};

// ?? Arama ve Filtreleme
export const searchMessages = (query: string, userId?: string): ChatMessage[] => {
  const messages = getMessages();
  return messages.filter(msg => {
    const matchesQuery = msg.content.toLowerCase().includes(query.toLowerCase());
    const matchesUser = !userId || msg.senderId === userId || msg.recipientId === userId;
    return matchesQuery && matchesUser;
  });
};

// ?完 Temizleme 襤?lemleri
export const clearOldMessages = (daysOld: number = 30): number => {
  try {
    const messages = getMessages();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);
    
    const filteredMessages = messages.filter(msg => 
      new Date(msg.createdAt) > cutoffDate
    );
    
    const removedCount = messages.length - filteredMessages.length;
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(filteredMessages));
    
    // Konu?malar覺 da g羹ncelle
    const conversations = getConversations();
    const updatedConversations = conversations.filter(conv => 
      new Date(conv.lastActivity) > cutoffDate
    );
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(updatedConversations));
    
    return removedCount;
  } catch (error) {
    console.error('Error clearing old messages:', error);
    return 0;
  }
};

// ?? Supabase Ge癟i? Haz覺rl覺?覺
export const migrateToSupabase = async () => {
  // Gelecekte Supabase entegrasyonu i癟in haz覺r fonksiyon
  console.log('Supabase migration ready - localStorage data can be migrated');
  
  const messages = getMessages();
  const conversations = getConversations();
  
  return {
    messages: messages.length,
    conversations: conversations.length,
    ready: true
  };
};

// ?? 襤statistikler
export const getChatStats = (userId: string) => {
  const messages = getMessages();
  const userMessages = messages.filter(m => m.senderId === userId || m.recipientId === userId);
  const conversations = getUserConversations(userId);
  
  return {
    totalMessages: userMessages.length,
    sentMessages: messages.filter(m => m.senderId === userId).length,
    receivedMessages: messages.filter(m => m.recipientId === userId).length,
    activeConversations: conversations.length,
    unreadMessages: messages.filter(m => m.recipientId === userId && !m.read).length,
    todayMessages: messages.filter(m => {
      const today = new Date().toDateString();
      return new Date(m.createdAt).toDateString() === today;
    }).length,
    thisWeekMessages: messages.filter(m => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(m.createdAt) > weekAgo;
    }).length
  };
};

// ? Mock Kullan覺c覺lar (Demo i癟in)
export const getMockUsers = (): ChatUser[] => [
  {
    id: 'user-1',
    name: 'Fatma Y覺lmaz',
    role: 'agent',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'online',
    lastSeen: new Date().toISOString(),
    branchId: 'branch-1'
  },
  {
    id: 'user-2',
    name: 'Dr. Mehmet ?zkan',
    role: 'doctor',
    avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'away',
    lastSeen: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    branchId: 'branch-1'
  },
  {
    id: 'user-3',
    name: 'Zeynep Demir',
    role: 'coordinator',
    avatar: 'https://images.pexels.com/photos/7180651/pexels-photo-7180651.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'online',
    lastSeen: new Date().toISOString(),
    branchId: 'branch-1'
  },
  {
    id: 'user-4',
    name: 'Ahmet Kaya',
    role: 'agent',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'busy',
    lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    branchId: 'branch-1'
  },
  {
    id: 'user-5',
    name: 'Merve ?ahin',
    role: 'nurse',
    avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'offline',
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    branchId: 'branch-1'
  },
  {
    id: 'user-6',
    name: 'Can Y覺ld覺z',
    role: 'manager',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'offline',
    lastSeen: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    branchId: 'branch-1'
  }
];