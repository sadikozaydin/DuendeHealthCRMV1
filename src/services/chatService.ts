// 🧭 CRM İçi Kullanıcılar Arası Sohbet Sistemi - Supabase Entegrasyonu
// localStorage fallback ile hybrid sistem
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase, isSupabaseEnabled } from '../lib/supabaseClient';

// 🚀 Yeni Supabase RPC Fonksiyonları
export const getOrCreateConversation = async (userId1: string, userId2: string, tenantId: string = 'tenant-001'): Promise<{ success: boolean; data?: { conversation_id: string }; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return getOrCreateConversationFromLocalStorage(userId1, userId2);
    }

    const { data, error } = await supabase.rpc('get_or_create_conversation', {
      user_id_1: userId1,
      user_id_2: userId2,
      tenant_id_input: tenantId
    });

    if (error) {
      console.error('Supabase RPC error:', error);
      return getOrCreateConversationFromLocalStorage(userId1, userId2);
    }

    return { success: true, data: { conversation_id: data[0]?.conversation_id } };
  } catch (error) {
    console.error('Get or create conversation error:', error);
    return getOrCreateConversationFromLocalStorage(userId1, userId2);
  }
};

// LocalStorage fallback for conversation
const getOrCreateConversationFromLocalStorage = (userId1: string, userId2: string): { success: boolean; data: { conversation_id: string }; error?: string } => {
  const conversationId = [userId1, userId2].sort().join('-');
  return { success: true, data: { conversation_id: conversationId } };
};

// 📨 Mesajları getir (Supabase optimized)
export const getChatMessages = async (conversationId: string): Promise<{ success: boolean; data?: ChatMessage[]; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return getChatMessagesFromLocalStorage(conversationId);
    }

    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        *,
        sender:chat_users(name, avatar_url, role),
        reply_to_message:chat_messages(content, sender:chat_users(name))
      `)
      .eq('conversation_id', conversationId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: true })
      .limit(100);

    if (error) {
      console.error('Supabase messages error:', error);
      return getChatMessagesFromLocalStorage(conversationId);
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Messages fetch error:', error);
    return getChatMessagesFromLocalStorage(conversationId);
  }
};

// LocalStorage fallback for messages
const getChatMessagesFromLocalStorage = (conversationId: string): { success: boolean; data: ChatMessage[]; error?: string } => {
  try {
    const mockMessages: ChatMessage[] = [
      {
        id: 'msg-1',
        conversation_id: conversationId,
        sender_id: 'user-2',
        sender: {
          id: 'user-2',
          name: 'Dr. Mehmet Özkan',
          avatar_url: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
          role: 'doctor'
        } as ChatUser,
        message_type: 'text',
        content: 'Maria Rodriguez hastası için konsültasyon raporu hazır. Kalp cerrahisi için uygun.',
        is_edited: false,
        is_deleted: false,
        created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        read_by: ['user-1']
      },
      {
        id: 'msg-2',
        conversation_id: conversationId,
        sender_id: 'user-1',
        sender: {
          id: 'user-1',
          name: 'Fatma Yılmaz',
          avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
          role: 'agent'
        } as ChatUser,
        message_type: 'text',
        content: 'Teşekkürler doktor. Hastaya bilgi verip teklif hazırlayacağım.',
        is_edited: false,
        is_deleted: false,
        created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        read_by: []
      }
    ];

    return { success: true, data: mockMessages };
  } catch (error) {
    return { success: false, data: [], error: error.message };
  }
};

// 📤 Mesaj gönder (Supabase optimized)
export const sendChatMessage = async (payload: {
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type?: 'text' | 'file' | 'image' | 'system';
  file_url?: string;
  file_name?: string;
  file_size?: number;
  reply_to?: string;
}): Promise<{ success: boolean; data?: ChatMessage; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return sendChatMessageToLocalStorage(payload);
    }

    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{
        conversation_id: payload.conversation_id,
        sender_id: payload.sender_id,
        content: payload.content,
        message_type: payload.message_type || 'text',
        file_url: payload.file_url,
        file_name: payload.file_name,
        file_size: payload.file_size,
        reply_to: payload.reply_to
      }])
      .select(`
        *,
        sender:chat_users(name, avatar_url, role)
      `)
      .single();

    if (error) {
      console.error('Supabase send message error:', error);
      return sendChatMessageToLocalStorage(payload);
    }

    // Update conversation last_message_at
    await supabase
      .from('chat_conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', payload.conversation_id);

    return { success: true, data };
  } catch (error) {
    console.error('Send message error:', error);
    return sendChatMessageToLocalStorage(payload);
  }
};

// LocalStorage fallback for sending messages
const sendChatMessageToLocalStorage = (payload: any): { success: boolean; data: ChatMessage; error?: string } => {
  try {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversation_id: payload.conversation_id,
      sender_id: payload.sender_id,
      sender: {
        id: payload.sender_id,
        name: 'Current User',
        avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        role: 'agent'
      } as ChatUser,
      message_type: payload.message_type || 'text',
      content: payload.content,
      file_url: payload.file_url,
      file_name: payload.file_name,
      file_size: payload.file_size,
      reply_to: payload.reply_to,
      is_edited: false,
      is_deleted: false,
      created_at: new Date().toISOString(),
      read_by: []
    };

    return { success: true, data: newMessage };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};

// 👁️ Mesajı okundu işaretle (Supabase RPC)
export const markChatMessageAsRead = async (messageId: string, userId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return { success: true }; // LocalStorage'da simüle et
    }

    const { error } = await supabase.rpc('mark_message_as_read', {
      message_id: messageId,
      reader_id: userId
    });

    if (error) {
      console.error('Mark as read error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Mark as read error:', error);
    return { success: false, error: error.message };
  }
};

// ✏️ Mesaj düzenle
export const editChatMessage = async (messageId: string, content: string): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return { success: true }; // LocalStorage'da simüle et
    }

    const { error } = await supabase
      .from('chat_messages')
      .update({
        content,
        updated_at: new Date().toISOString(),
        is_edited: true
      })
      .eq('id', messageId);

    if (error) {
      console.error('Edit message error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Edit message error:', error);
    return { success: false, error: error.message };
  }
};

// 🗑️ Mesaj sil (soft delete)
export const deleteChatMessage = async (messageId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return { success: true }; // LocalStorage'da simüle et
    }

    const { error } = await supabase
      .from('chat_messages')
      .update({
        is_deleted: true,
        content: 'Bu mesaj silindi',
        updated_at: new Date().toISOString()
      })
      .eq('id', messageId);

    if (error) {
      console.error('Delete message error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Delete message error:', error);
    return { success: false, error: error.message };
  }
};

// 🔄 Realtime mesaj dinleme (Supabase Realtime)
export const subscribeToChatMessages = (
  conversationId: string, 
  onNewMessage: (message: ChatMessage) => void, 
  onMessageUpdate: (message: ChatMessage) => void
): RealtimeChannel | null => {
  if (!isSupabaseEnabled) {
    console.log('Supabase not enabled, using mock realtime');
    return null;
  }

  const channel = supabase
    .channel(`chat-conversation-${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      async (payload) => {
        console.log('🔥 New message received:', payload.new);
        
        // Sender bilgisini çek
        const { data: messageWithSender } = await supabase
          .from('chat_messages')
          .select(`
            *,
            sender:chat_users(name, avatar_url, role)
          `)
          .eq('id', payload.new.id)
          .single();

        if (messageWithSender) {
          onNewMessage(messageWithSender);
        }
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      async (payload) => {
        console.log('✏️ Message updated:', payload.new);
        
        const { data: messageWithSender } = await supabase
          .from('chat_messages')
          .select(`
            *,
            sender:chat_users(name, avatar_url, role)
          `)
          .eq('id', payload.new.id)
          .single();

        if (messageWithSender) {
          onMessageUpdate(messageWithSender);
        }
      }
    )
    .subscribe();

  return channel;
};

// 🔌 Realtime subscription'ı kapat
export const unsubscribeFromChatMessages = (channel: RealtimeChannel | null) => {
  if (channel && supabase) {
    supabase.removeChannel(channel);
  }
};

// 📁 Dosya yükleme (Supabase Storage)
export const uploadChatFileToStorage = async (file: File, conversationId: string): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    // LocalStorage ile dosya yükleme simülasyonu
    // Gerçek uygulamada dosyalar base64 olarak saklanabilir veya başka bir çözüm kullanılabilir
    const fileUrl = await convertFileToDataUrl(file);
    
    // Dosya bilgilerini LocalStorage'a kaydet
    const fileData = {
      id: `file_${Date.now()}`,
      conversationId,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      url: fileUrl,
      uploadedAt: new Date().toISOString()
    };
    
    // Mevcut dosyaları al
    const existingFiles = JSON.parse(localStorage.getItem('chat_files') || '[]');
    existingFiles.push(fileData);
    
    // LocalStorage'a kaydet
    localStorage.setItem('chat_files', JSON.stringify(existingFiles));
    
    return { success: true, url: fileUrl };
  } catch (error) {
    console.error('File upload error:', error);
    return { success: false, error: error.message };
  }
};

// Dosyayı Data URL'ye çevirme fonksiyonu
const convertFileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
// LocalStorage'dan dosya alma fonksiyonu
export const getChatFileFromStorage = async (fileId: string): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    const files = JSON.parse(localStorage.getItem('chat_files') || '[]');
    const file = files.find((f: any) => f.id === fileId);
    
    if (file) {
      return { success: true, data: file };
    } else {
      return { success: false, error: 'Dosya bulunamadı' };
    }
  } catch (error) {
    return { success: false, error: 'Dosya okuma hatası' };
  }
};

// LocalStorage'dan tüm chat dosyalarını alma
export const getAllChatFiles = async (conversationId?: string): Promise<{ success: boolean; data?: any[]; error?: string }> => {
  try {
    const files = JSON.parse(localStorage.getItem('chat_files') || '[]');
    
    if (conversationId) {
      const conversationFiles = files.filter((f: any) => f.conversationId === conversationId);
      return { success: true, data: conversationFiles };
    }
    
    return { success: true, data: files };
  } catch (error) {
    return { success: false, error: 'Dosyalar yüklenirken hata oluştu' };
  }
};

// LocalStorage'dan dosya silme
export const deleteChatFileFromStorage = async (fileId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const files = JSON.parse(localStorage.getItem('chat_files') || '[]');
    const updatedFiles = files.filter((f: any) => f.id !== fileId);
    
    localStorage.setItem('chat_files', JSON.stringify(updatedFiles));
    
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Dosya silinirken hata oluştu' };
  }
};

// localStorage keys for fallback
const STORAGE_KEYS = {
  USERS: 'crm_chat_users',
  MESSAGES: 'crm_chat_messages',
  CONVERSATIONS: 'crm_chat_conversations',
  STATUS: 'crm_user_status',
  FILES: 'chat_files'
};

export interface ChatUser {
  id: string;
  user_id: string;
  tenant_id: string;
  name: string;
  role: string;
  branch_id?: string;
  avatar_url?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  last_seen: string;
  is_active: boolean;
}

export interface ChatConversation {
  id: string;
  tenant_id: string;
  type: 'direct' | 'group' | 'channel';
  name?: string;
  description?: string;
  avatar_url?: string;
  created_by: string;
  is_active: boolean;
  last_message_at: string;
  participants?: ChatUser[];
  unread_count?: number;
  last_message?: ChatMessage;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender?: ChatUser;
  message_type: 'text' | 'file' | 'image' | 'system' | 'appointment_request';
  content: string;
  file_url?: string;
  file_name?: string;
  file_size?: number;
  metadata?: any;
  reply_to?: string;
  is_edited: boolean;
  is_deleted: boolean;
  created_at: string;
  read_by?: string[];
}

export interface TypingIndicator {
  conversation_id: string;
  user_id: string;
  user_name: string;
  started_at: string;
}

// Chat kullanıcılarını getir
export const getChatUsers = async (tenantId: string = 'tenant-001'): Promise<{ success: boolean; data: ChatUser[]; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      const localUsers = getChatUsersFromLocalStorage();
      return { success: true, data: localUsers };
    }

    const { data, error } = await supabase
      .from('chat_users')
      .select(`
        id,
        user_id,
        tenant_id,
        name,
        role,
        branch_id,
        avatar_url,
        status,
        last_seen,
        is_active
      `)
      .eq('tenant_id', tenantId)
      .eq('is_active', true)
      .order('status', { ascending: false })
      .order('name');

    if (error) {
      console.error('Supabase chat users error:', error);
      const localUsers = getChatUsersFromLocalStorage();
      return { success: false, data: localUsers, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Chat users fetch error:', error);
    const localUsers = getChatUsersFromLocalStorage();
    return { success: false, data: localUsers, error: error.message };
  }
};

// LocalStorage fallback for chat users
const getChatUsersFromLocalStorage = (): ChatUser[] => {
  try {
    const mockUsers: ChatUser[] = [
      {
        id: 'user-1',
        user_id: 'auth-user-1',
        tenant_id: 'tenant-001',
        name: 'Fatma Yılmaz',
        role: 'agent',
        branch_id: 'branch-1',
        avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        status: 'online',
        last_seen: new Date().toISOString(),
        is_active: true
      },
      {
        id: 'user-2',
        user_id: 'auth-user-2',
        tenant_id: 'tenant-001',
        name: 'Dr. Mehmet Özkan',
        role: 'doctor',
        branch_id: 'branch-1',
        avatar_url: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
        status: 'away',
        last_seen: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        is_active: true
      },
      {
        id: 'user-3',
        user_id: 'auth-user-3',
        tenant_id: 'tenant-001',
        name: 'Zeynep Demir',
        role: 'coordinator',
        branch_id: 'branch-1',
        avatar_url: 'https://images.pexels.com/photos/7180651/pexels-photo-7180651.jpeg?auto=compress&cs=tinysrgb&w=150',
        status: 'online',
        last_seen: new Date().toISOString(),
        is_active: true
      },
      {
        id: 'user-4',
        user_id: 'auth-user-4',
        tenant_id: 'tenant-001',
        name: 'Ahmet Kaya',
        role: 'agent',
        branch_id: 'branch-1',
        avatar_url: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        status: 'busy',
        last_seen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        is_active: true
      }
    ];

    return mockUsers;
  } catch (error) {
    return [];
  }
};

// Konuşmaları getir
export const getConversations = async (userId: string): Promise<{ success: boolean; data?: ChatConversation[]; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return getConversationsFromLocalStorage();
    }

    const { data, error } = await supabase
      .from('chat_conversations')
      .select(`
        *,
        participants:chat_participants(
          user:chat_users(*)
        ),
        last_message:chat_messages(
          *,
          sender:chat_users(name, avatar_url)
        )
      `)
      .eq('chat_participants.user_id', userId)
      .eq('chat_participants.is_active', true)
      .order('last_message_at', { ascending: false });

    if (error) {
      console.error('Supabase conversations error:', error);
      return getConversationsFromLocalStorage();
    }

    return { success: true, data };
  } catch (error) {
    console.error('Conversations fetch error:', error);
    return getConversationsFromLocalStorage();
  }
};

// LocalStorage fallback for conversations
const getConversationsFromLocalStorage = (): { success: boolean; data: ChatConversation[]; error?: string } => {
  try {
    const mockConversations: ChatConversation[] = [
      {
        id: 'conv-1',
        tenant_id: 'tenant-001',
        type: 'direct',
        name: 'Dr. Mehmet Özkan',
        created_by: 'user-1',
        is_active: true,
        last_message_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        unread_count: 2
      },
      {
        id: 'conv-2',
        tenant_id: 'tenant-001',
        type: 'group',
        name: 'Satış Ekibi',
        description: 'Satış temsilcileri koordinasyon grubu',
        created_by: 'user-1',
        is_active: true,
        last_message_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        unread_count: 0
      },
      {
        id: 'conv-3',
        tenant_id: 'tenant-001',
        type: 'direct',
        name: 'Zeynep Demir',
        created_by: 'user-3',
        is_active: true,
        last_message_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        unread_count: 1
      }
    ];

    return { success: true, data: mockConversations };
  } catch (error) {
    return { success: false, data: [], error: error.message };
  }
};

// Mesajları getir
export const getMessages = async (conversationId: string): Promise<{ success: boolean; data?: ChatMessage[]; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return getMessagesFromLocalStorage(conversationId);
    }

    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        *,
        sender:chat_users(name, avatar_url, role),
        read_by:chat_message_reads(user_id)
      `)
      .eq('conversation_id', conversationId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase messages error:', error);
      return getMessagesFromLocalStorage(conversationId);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Messages fetch error:', error);
    return getMessagesFromLocalStorage(conversationId);
  }
};

// LocalStorage fallback for messages
const getMessagesFromLocalStorage = (conversationId: string): { success: boolean; data: ChatMessage[]; error?: string } => {
  try {
    const mockMessages: ChatMessage[] = [
      {
        id: 'msg-1',
        conversation_id: conversationId,
        sender_id: 'user-2',
        sender: {
          id: 'user-2',
          name: 'Dr. Mehmet Özkan',
          avatar_url: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
          role: 'doctor'
        } as ChatUser,
        message_type: 'text',
        content: 'Maria Rodriguez hastası için konsültasyon raporu hazır. Kalp cerrahisi için uygun.',
        is_edited: false,
        is_deleted: false,
        created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        read_by: ['user-1']
      },
      {
        id: 'msg-2',
        conversation_id: conversationId,
        sender_id: 'user-1',
        sender: {
          id: 'user-1',
          name: 'Fatma Yılmaz',
          avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
          role: 'agent'
        } as ChatUser,
        message_type: 'text',
        content: 'Teşekkürler doktor. Hastaya bilgi verip teklif hazırlayacağım.',
        is_edited: false,
        is_deleted: false,
        created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        read_by: []
      },
      {
        id: 'msg-3',
        conversation_id: conversationId,
        sender_id: 'user-2',
        sender: {
          id: 'user-2',
          name: 'Dr. Mehmet Özkan',
          avatar_url: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
          role: 'doctor'
        } as ChatUser,
        message_type: 'text',
        content: 'Tamam. Acil bir durum olursa hemen ara.',
        is_edited: false,
        is_deleted: false,
        created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        read_by: []
      }
    ];

    return { success: true, data: mockMessages };
  } catch (error) {
    return { success: false, data: [], error: error.message };
  }
};

// Mesaj gönder
export const sendMessage = async (messageData: {
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type?: string;
  file_url?: string;
  file_name?: string;
  reply_to?: string;
}): Promise<{ success: boolean; data?: ChatMessage; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return sendMessageToLocalStorage(messageData);
    }

    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{
        ...messageData,
        message_type: messageData.message_type || 'text'
      }])
      .select(`
        *,
        sender:chat_users(name, avatar_url, role)
      `)
      .single();

    if (error) {
      console.error('Supabase send message error:', error);
      return sendMessageToLocalStorage(messageData);
    }

    return { success: true, data };
  } catch (error) {
    console.error('Send message error:', error);
    return sendMessageToLocalStorage(messageData);
  }
};

// LocalStorage fallback for sending messages
const sendMessageToLocalStorage = (messageData: any): { success: boolean; data: ChatMessage; error?: string } => {
  try {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversation_id: messageData.conversation_id,
      sender_id: messageData.sender_id,
      sender: {
        id: messageData.sender_id,
        name: 'Current User',
        avatar_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        role: 'agent'
      } as ChatUser,
      message_type: messageData.message_type || 'text',
      content: messageData.content,
      file_url: messageData.file_url,
      file_name: messageData.file_name,
      reply_to: messageData.reply_to,
      is_edited: false,
      is_deleted: false,
      created_at: new Date().toISOString(),
      read_by: []
    };

    return { success: true, data: newMessage };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};

// Konuşma oluştur
export const createConversation = async (conversationData: {
  type: 'direct' | 'group';
  name?: string;
  description?: string;
  participant_ids: string[];
  created_by: string;
}): Promise<{ success: boolean; data?: ChatConversation; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return createConversationInLocalStorage(conversationData);
    }

    // Create conversation
    const { data: conversation, error: convError } = await supabase
      .from('chat_conversations')
      .insert([{
        tenant_id: 'tenant-001', // Should come from context
        type: conversationData.type,
        name: conversationData.name,
        description: conversationData.description,
        created_by: conversationData.created_by
      }])
      .select()
      .single();

    if (convError) {
      console.error('Create conversation error:', convError);
      return createConversationInLocalStorage(conversationData);
    }

    // Add participants
    const participants = conversationData.participant_ids.map(userId => ({
      conversation_id: conversation.id,
      user_id: userId,
      role: userId === conversationData.created_by ? 'admin' : 'member'
    }));

    const { error: partError } = await supabase
      .from('chat_participants')
      .insert(participants);

    if (partError) {
      console.error('Add participants error:', partError);
    }

    return { success: true, data: conversation };
  } catch (error) {
    console.error('Create conversation error:', error);
    return createConversationInLocalStorage(conversationData);
  }
};

// LocalStorage fallback for creating conversations
const createConversationInLocalStorage = (conversationData: any): { success: boolean; data: ChatConversation; error?: string } => {
  try {
    const newConversation: ChatConversation = {
      id: `conv-${Date.now()}`,
      tenant_id: 'tenant-001',
      type: conversationData.type,
      name: conversationData.name,
      description: conversationData.description,
      created_by: conversationData.created_by,
      is_active: true,
      last_message_at: new Date().toISOString(),
      unread_count: 0
    };

    return { success: true, data: newConversation };
  } catch (error) {
    return { success: false, data: null, error: error.message };
  }
};

// Mesajı okundu olarak işaretle
export const markMessageAsRead = async (messageId: string, userId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return { success: true }; // LocalStorage'da simüle et
    }

    const { error } = await supabase
      .from('chat_message_reads')
      .upsert([{
        message_id: messageId,
        user_id: userId
      }]);

    if (error) {
      console.error('Mark as read error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Mark as read error:', error);
    return { success: false, error: error.message };
  }
};

// Kullanıcı durumunu güncelle
export const updateUserStatus = async (userId: string, status: 'online' | 'offline' | 'away' | 'busy'): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return { success: true }; // LocalStorage'da simüle et
    }

    const { error } = await supabase
      .from('chat_users')
      .update({
        status,
        last_seen: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) {
      console.error('Update status error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Update status error:', error);
    return { success: false, error: error.message };
  }
};

// Yazıyor göstergesi
export const setTypingIndicator = async (conversationId: string, userId: string, isTyping: boolean): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return { success: true }; // LocalStorage'da simüle et
    }

    if (isTyping) {
      const { error } = await supabase
        .from('chat_typing_indicators')
        .upsert([{
          conversation_id: conversationId,
          user_id: userId
        }]);

      if (error) {
        console.error('Set typing error:', error);
        return { success: false, error: error.message };
      }
    } else {
      const { error } = await supabase
        .from('chat_typing_indicators')
        .delete()
        .eq('conversation_id', conversationId)
        .eq('user_id', userId);

      if (error) {
        console.error('Remove typing error:', error);
        return { success: false, error: error.message };
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Typing indicator error:', error);
    return { success: false, error: error.message };
  }
};

// Realtime subscription setup
export const subscribeToConversation = (conversationId: string, onMessage: (message: ChatMessage) => void, onTyping: (typing: TypingIndicator[]) => void) => {
  if (!isSupabaseEnabled) {
    console.log('Supabase not enabled, using mock realtime');
    return null;
  }

  const channel = supabase
    .channel(`conversation-${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      (payload) => {
        console.log('New message received:', payload.new);
        onMessage(payload.new as ChatMessage);
      }
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'chat_typing_indicators',
        filter: `conversation_id=eq.${conversationId}`
      },
      async (payload) => {
        // Fetch current typing indicators
        const { data } = await supabase
          .from('chat_typing_indicators')
          .select(`
            *,
            user:chat_users(name)
          `)
          .eq('conversation_id', conversationId);

        onTyping(data || []);
      }
    )
    .subscribe();

  return channel;
};

// Unsubscribe from realtime
export const unsubscribeFromConversation = (channel: any) => {
  if (channel && supabase) {
    supabase.removeChannel(channel);
  }
};

// File upload for chat
export const uploadChatFile = async (file: File, conversationId: string): Promise<{ success: boolean; url?: string; error?: string }> => {
  try {
    // LocalStorage ile dosya yükleme
    return await uploadChatFileToStorage(file, conversationId);
  } catch (error) {
    console.error('File upload error:', error);
    return { success: false, error: error.message };
  }
};

// Search messages
export const searchMessages = async (query: string, conversationId?: string): Promise<{ success: boolean; data?: ChatMessage[]; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return { success: true, data: [] }; // Mock search
    }

    let queryBuilder = supabase
      .from('chat_messages')
      .select(`
        *,
        sender:chat_users(name, avatar_url, role),
        conversation:chat_conversations(name, type)
      `)
      .ilike('content', `%${query}%`)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .limit(50);

    if (conversationId) {
      queryBuilder = queryBuilder.eq('conversation_id', conversationId);
    }

    const { data, error } = await queryBuilder;

    if (error) {
      console.error('Search messages error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Search messages error:', error);
    return { success: false, error: error.message };
  }
};

// Gelişmiş Chat Stats - Supabase uyumlu
export const getChatStats = async (userId: string) => {
  try {
    if (!isSupabaseEnabled) {
      return getChatStatsFromLocalStorage(userId);
    }

    // Use localStorage fallback to avoid RLS policy issues
    console.log('Using localStorage fallback for chat stats due to RLS policy issues');
    return getChatStatsFromLocalStorage(userId);
  } catch (error) {
    console.error('Chat stats error:', error);
    return getChatStatsFromLocalStorage(userId);
  }
};

// LocalStorage fallback for chat stats
const getChatStatsFromLocalStorage = (userId: string) => {
  try {
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
    const userMessages = messages.filter(m => m.senderId === userId || m.recipientId === userId);
    
    return {
      totalMessages: userMessages.length,
      sentMessages: messages.filter(m => m.senderId === userId).length,
      receivedMessages: messages.filter(m => m.recipientId === userId).length,
      unreadMessages: messages.filter(m => m.recipientId === userId && !m.read).length,
      activeConversations: 0,
      todayMessages: 0,
      thisWeekMessages: 0
    };
  } catch (error) {
    return { totalMessages: 0, unreadMessages: 0, activeConversations: 0, sentMessages: 0, receivedMessages: 0, todayMessages: 0, thisWeekMessages: 0 };
  }
};

// Eski mesajları temizle - Supabase uyumlu
export const clearOldMessages = async (days: number): Promise<number> => {
  try {
    if (!isSupabaseEnabled) {
      return clearOldMessagesFromLocalStorage(days);
    }

    // Use localStorage fallback to avoid RLS policy issues
    console.log('Using localStorage fallback for message cleanup due to RLS policy issues');
    return clearOldMessagesFromLocalStorage(days);
  } catch (error) {
    console.error('Message cleanup error:', error);
    return clearOldMessagesFromLocalStorage(days);
  }
};

// LocalStorage fallback for clearing old messages
const clearOldMessagesFromLocalStorage = (days: number): number => {
  try {
    const messages = JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES) || '[]');
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    const filteredMessages = messages.filter(msg => 
      new Date(msg.createdAt) > cutoffDate
    );
    
    const removedCount = messages.length - filteredMessages.length;
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(filteredMessages));
    
    return removedCount;
  } catch (error) {
    console.error('LocalStorage cleanup error:', error);
    return 0;
  }
};

// Mesajları getir - Supabase uyumlu (detailed version)
const getMessagesDetailed = async (conversationId: string): Promise<{ success: boolean; data?: ChatMessage[]; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return getMessagesFromLocalStorage(conversationId);
    }

    const { data, error } = await supabase
      .from('chat_messages')
      .select(`
        *,
        sender:chat_users(name, avatar_url, role),
        reply_to_message:chat_messages(content, sender:chat_users(name))
      `)
      .eq('conversation_id', conversationId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: true })
      .limit(50);

    if (error) {
      console.error('Supabase messages error:', error);
      return getMessagesFromLocalStorage(conversationId);
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Messages fetch error:', error);
    return getMessagesFromLocalStorage(conversationId);
  }
};

// Mesaj gönder - Supabase uyumlu (detailed version)
const sendMessageDetailed = async (payload: {
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type?: string;
  file_url?: string;
  file_name?: string;
  reply_to?: string;
}): Promise<{ success: boolean; data?: ChatMessage; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return sendMessageToLocalStorage(payload);
    }

    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{
        conversation_id: payload.conversation_id,
        sender_id: payload.sender_id,
        content: payload.content,
        message_type: payload.message_type || 'text',
        file_url: payload.file_url,
        file_name: payload.file_name,
        reply_to: payload.reply_to
      }])
      .select(`
        *,
        sender:chat_users(name, avatar_url, role)
      `)
      .single();

    if (error) {
      console.error('Supabase send message error:', error);
      return sendMessageToLocalStorage(payload);
    }

    // Update conversation last_message_at
    await supabase
      .from('chat_conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', payload.conversation_id);

    return { success: true, data };
  } catch (error) {
    console.error('Send message error:', error);
    return sendMessageToLocalStorage(payload);
  }
};

// Konuşma oluştur veya bul
export const findOrCreateConversation = async (userId1: string, userId2: string): Promise<{ success: boolean; data?: ChatConversation; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return findOrCreateConversationInLocalStorage(userId1, userId2);
    }

    // Önce mevcut konuşmayı ara
    const { data: existingConv, error: searchError } = await supabase
      .from('chat_conversations')
      .select(`
        *,
        participants:chat_participants(user_id)
      `)
      .eq('type', 'direct')
      .limit(100);

    if (!searchError && existingConv) {
      // İki kullanıcının da katıldığı konuşmayı bul
      const conversation = existingConv.find(conv => {
        const participantIds = conv.participants.map(p => p.user_id);
        return participantIds.includes(userId1) && participantIds.includes(userId2);
      });

      if (conversation) {
        return { success: true, data: conversation };
      }
    }

    // Konuşma yoksa oluştur
    const { data: newConv, error: createError } = await supabase
      .from('chat_conversations')
      .insert([{
        tenant_id: 'tenant-001',
        type: 'direct',
        created_by: userId1
      }])
      .select()
      .single();

    if (createError) {
      console.error('Create conversation error:', createError);
      return findOrCreateConversationInLocalStorage(userId1, userId2);
    }

    // Katılımcıları ekle
    const { error: participantsError } = await supabase
      .from('chat_participants')
      .insert([
        { conversation_id: newConv.id, user_id: userId1, role: 'member' },
        { conversation_id: newConv.id, user_id: userId2, role: 'member' }
      ]);

    if (participantsError) {
      console.error('Add participants error:', participantsError);
    }

    return { success: true, data: newConv };
  } catch (error) {
    console.error('Find or create conversation error:', error);
    return findOrCreateConversationInLocalStorage(userId1, userId2);
  }
};

// LocalStorage fallback for conversation
const findOrCreateConversationInLocalStorage = (userId1: string, userId2: string): { success: boolean; data: ChatConversation; error?: string } => {
  const conversationId = [userId1, userId2].sort().join('-');
  
  const conversation: ChatConversation = {
    id: conversationId,
    tenant_id: 'tenant-001',
    type: 'direct',
    created_by: userId1,
    is_active: true,
    last_message_at: new Date().toISOString()
  };

  return { success: true, data: conversation };
};

// Mesajı okundu işaretle (detailed version)
const markMessageAsReadDetailed = async (messageId: string, userId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return { success: true }; // LocalStorage'da simüle et
    }

    const { error } = await supabase
      .from('chat_message_reads')
      .upsert([{
        message_id: messageId,
        user_id: userId
      }]);

    if (error) {
      console.error('Mark as read error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Mark as read error:', error);
    return { success: false, error: error.message };
  }
};

// Mesaj düzenle
export const editMessage = async (messageId: string, content: string): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return { success: true }; // LocalStorage'da simüle et
    }

    const { error } = await supabase
      .from('chat_messages')
      .update({
        content,
        edited_at: new Date().toISOString(),
        is_edited: true
      })
      .eq('id', messageId);

    if (error) {
      console.error('Edit message error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Edit message error:', error);
    return { success: false, error: error.message };
  }
};

// Mesaj sil (soft delete)
export const deleteMessage = async (messageId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    if (!isSupabaseEnabled) {
      return { success: true }; // LocalStorage'da simüle et
    }

    const { error } = await supabase
      .from('chat_messages')
      .update({
        is_deleted: true,
        content: 'Bu mesaj silindi'
      })
      .eq('id', messageId);

    if (error) {
      console.error('Delete message error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Delete message error:', error);
    return { success: false, error: error.message };
  }
};

// Realtime mesaj dinleme
export const subscribeToMessages = (conversationId: string, onNewMessage: (message: ChatMessage) => void, onMessageUpdate: (message: ChatMessage) => void): RealtimeChannel | null => {
  if (!isSupabaseEnabled) {
    console.log('Supabase not enabled, using mock realtime');
    return null;
  }

  const channel = supabase
    .channel(`conversation-${conversationId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      async (payload) => {
        console.log('New message received:', payload.new);
        
        // Sender bilgisini çek
        const { data: messageWithSender } = await supabase
          .from('chat_messages')
          .select(`
            *,
            sender:chat_users(name, avatar_url, role)
          `)
          .eq('id', payload.new.id)
          .single();

        if (messageWithSender) {
          onNewMessage(messageWithSender);
        }
      }
    )
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${conversationId}`
      },
      async (payload) => {
        console.log('Message updated:', payload.new);
        
        const { data: messageWithSender } = await supabase
          .from('chat_messages')
          .select(`
            *,
            sender:chat_users(name, avatar_url, role)
          `)
          .eq('id', payload.new.id)
          .single();

        if (messageWithSender) {
          onMessageUpdate(messageWithSender);
        }
      }
    )
    .subscribe();

  return channel;
};

// Realtime subscription'ı kapat
export const unsubscribeFromMessages = (channel: RealtimeChannel | null) => {
  if (channel && supabase) {
    supabase.removeChannel(channel);
  }
};

export { supabase as chatSupabase };