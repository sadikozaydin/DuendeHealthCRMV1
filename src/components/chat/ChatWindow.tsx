import React, { useState, useEffect, useRef } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreHorizontal,
  Check,
  CheckCheck,
  Clock,
  Image,
  File,
  X,
  Reply,
  Edit,
  Trash2,
  Download,
  Copy,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { 
  getOrCreateConversation,
  getChatMessages,
  sendChatMessage,
  markChatMessageAsRead,
  editChatMessage,
  deleteChatMessage,
  subscribeToChatMessages,
  unsubscribeFromChatMessages,
  uploadChatFileToStorage
} from '../../services/chatService';

// ChatUser interface for compatibility
interface ChatUser {
  id: string;
  name: string;
  role: string;
  avatar_url?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  last_seen: string;
}

interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender?: {
    name: string;
    avatar_url?: string;
    role: string;
  };
  content: string;
  message_type: 'text' | 'file' | 'image' | 'system';
  file_url?: string;
  file_name?: string;
  file_size?: number;
  reply_to?: string;
  reply_to_message?: {
    content: string;
    sender: {
      name: string;
    };
  };
  is_edited: boolean;
  is_deleted: boolean;
  created_at: string;
  edited_at?: string;
  read_by?: string[];
}

interface ChatWindowProps {
  currentUser: ChatUser;
  activeUser: ChatUser;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ currentUser, activeUser }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null);
  const [editingMessage, setEditingMessage] = useState<ChatMessage | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [hoveredMessage, setHoveredMessage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const realtimeChannelRef = useRef<RealtimeChannel | null>(null);

  // 🚀 Konuşmayı başlat ve mesajları yükle
  useEffect(() => {
    const initializeConversation = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log('🔄 Initializing conversation between:', currentUser.name, 'and', activeUser.name);
        
        // Konuşmayı bul veya oluştur
        const convResult = await getOrCreateConversation(currentUser.id, activeUser.id, 'tenant-001');
        
        if (convResult.success && convResult.data) {
          const newConversationId = convResult.data.conversation_id;
          setConversationId(newConversationId);
          
          console.log('✅ Conversation ID:', newConversationId);
          
          // Mesajları yükle
          const messagesResult = await getChatMessages(newConversationId);
          
          if (messagesResult.success && messagesResult.data) {
            setMessages(messagesResult.data);
            console.log('📨 Loaded messages:', messagesResult.data.length);
            
            // Okunmamış mesajları okundu işaretle
            const unreadMessages = messagesResult.data.filter(msg => 
              msg.sender_id === activeUser.id && 
              (!msg.read_by || !msg.read_by.includes(currentUser.id))
            );
            
            for (const msg of unreadMessages) {
              await markChatMessageAsRead(msg.id, currentUser.id);
            }
          }
        } else {
          setError('Konuşma oluşturulamadı: ' + (convResult.error || 'Bilinmeyen hata'));
        }
      } catch (err) {
        console.error('❌ Conversation initialization error:', err);
        setError('Bağlantı hatası: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
      } finally {
        setIsLoading(false);
      }
    };

    if (currentUser && activeUser) {
      initializeConversation();
    }

    return () => {
      // Cleanup realtime subscription
      if (realtimeChannelRef.current) {
        unsubscribeFromChatMessages(realtimeChannelRef.current);
        realtimeChannelRef.current = null;
      }
    };
  }, [currentUser, activeUser]);

  // 🔄 Realtime subscription kurma
  useEffect(() => {
    if (conversationId) {
      console.log('🔌 Setting up realtime subscription for conversation:', conversationId);
      
      // Önceki subscription'ı temizle
      if (realtimeChannelRef.current) {
        unsubscribeFromChatMessages(realtimeChannelRef.current);
      }

      // Yeni subscription kur
      const channel = subscribeToChatMessages(
        conversationId,
        (newMessage: ChatMessage) => {
          console.log('🔥 New message received:', newMessage);
          // Yeni mesaj geldi
          setMessages(prev => {
            // Duplicate kontrolü
            if (prev.find(m => m.id === newMessage.id)) {
              return prev;
            }
            return [...prev, newMessage];
          });
          
          // Eğer mesaj bize geldiyse okundu işaretle
          if (newMessage.sender_id === activeUser.id) {
            markChatMessageAsRead(newMessage.id, currentUser.id);
          }
        },
        (updatedMessage: ChatMessage) => {
          console.log('✏️ Message updated:', updatedMessage);
          // Mesaj güncellendi (düzenlendi, silindi, okundu)
          setMessages(prev => prev.map(msg => 
            msg.id === updatedMessage.id ? updatedMessage : msg
          ));
        }
      );

      realtimeChannelRef.current = channel;
    }

    return () => {
      if (realtimeChannelRef.current) {
        unsubscribeFromChatMessages(realtimeChannelRef.current);
        realtimeChannelRef.current = null;
      }
    };
  }, [conversationId, activeUser.id, currentUser.id]);

  // 📜 Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 📤 Mesaj gönder
  const handleSendMessage = async () => {
    if ((!newMessage.trim() && attachments.length === 0) || !conversationId || isSending) return;

    setIsSending(true);
    
    try {
      let fileUrl = '';
      let fileName = '';
      let fileSize = 0;
      
      // Dosya varsa yükle
      if (attachments.length > 0) {
        const uploadResult = await uploadChatFileToStorage(attachments[0], conversationId);
        if (uploadResult.success && uploadResult.url) {
          fileUrl = uploadResult.url;
          fileName = attachments[0].name;
          fileSize = attachments[0].size;
        } else {
          setError('Dosya yüklenirken hata oluştu: ' + (uploadResult.error || 'Bilinmeyen hata'));
          setIsSending(false);
          return;
        }
      }

      const result = await sendChatMessage({
        conversation_id: conversationId,
        sender_id: currentUser.id,
        content: newMessage.trim(),
        message_type: attachments.length > 0 ? 'file' : 'text',
        file_url: fileUrl || undefined,
        file_name: fileName || undefined,
        file_size: fileSize || undefined,
        reply_to: replyTo?.id
      });

      if (result.success) {
        console.log('✅ Message sent successfully');
        // Input'u temizle
        setNewMessage('');
        setAttachments([]);
        setReplyTo(null);
        setEditingMessage(null);
        setIsTyping(false);
        setError(null);
      } else {
        setError('Mesaj gönderilemedi: ' + (result.error || 'Bilinmeyen hata'));
      }
    } catch (err) {
      console.error('❌ Send message error:', err);
      setError('Mesaj gönderme hatası: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'));
    } finally {
      setIsSending(false);
    }
  };

  // ✏️ Mesaj düzenle
  const handleEditMessage = async (message: ChatMessage) => {
    if (editingMessage && newMessage.trim()) {
      // Düzenleme modunda - kaydet
      const result = await editChatMessage(editingMessage.id, newMessage.trim());
      
      if (result.success) {
        setEditingMessage(null);
        setNewMessage('');
        setError(null);
        console.log('✅ Message edited successfully');
      } else {
        setError('Mesaj düzenlenemedi: ' + (result.error || 'Bilinmeyen hata'));
      }
    } else {
      // Düzenleme moduna geç
      setEditingMessage(message);
      setNewMessage(message.content);
      setReplyTo(null);
    }
  };

  // 🗑️ Mesaj sil
  const handleDeleteMessage = async (messageId: string) => {
    if (window.confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
      const result = await deleteChatMessage(messageId);
      
      if (result.success) {
        console.log('✅ Message deleted successfully');
        setError(null);
      } else {
        setError('Mesaj silinemedi: ' + (result.error || 'Bilinmeyen hata'));
      }
    }
  };

  // 📁 Dosya ekleme
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      
      // Dosya boyutu kontrolü (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      const validFiles = files.filter(file => {
        if (file.size > maxSize) {
          setError(`${file.name} dosyası çok büyük (maksimum 5MB)`);
          return false;
        }
        return true;
      });
      
      if (validFiles.length > 0) {
        setAttachments(validFiles);
        setError(null);
      }
    }
  };

  // ⌨️ Typing indicator
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    
    if (!isTyping) {
      setIsTyping(true);
    }
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  // ⏎ Enter tuşu ile gönder
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (editingMessage) {
        handleEditMessage(editingMessage);
      } else {
        handleSendMessage();
      }
    }
  };

  // Dosya indirme fonksiyonu
  const handleDownloadFile = (fileUrl: string, fileName: string) => {
    if (fileUrl.startsWith('data:')) {
      // Data URL ise direkt indir
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Normal URL ise yeni sekmede aç
      window.open(fileUrl, '_blank');
    }
  };

  // 🎨 Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Çevrimiçi';
      case 'away': return 'Uzakta';
      case 'busy': return 'Meşgul';
      default: return 'Çevrimdışı';
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

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Bugün';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Dün';
    } else {
      return date.toLocaleDateString('tr-TR');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Toast notification eklenebilir
  };

  // 🔄 Loading state
  if (isLoading && messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Konuşma yükleniyor...</p>
          <p className="text-sm text-gray-500 mt-2">
            {currentUser.name} ↔ {activeUser.name}
          </p>
        </div>
      </div>
    );
  }

  // ❌ Error state
  if (error && !conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Yeniden Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* 📋 Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={activeUser.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(activeUser.name)}&background=random`}
                alt={activeUser.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(activeUser.status)}`}></div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{activeUser.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span className="capitalize">{activeUser.role}</span>
                <span>•</span>
                <span className={`${
                  activeUser.status === 'online' ? 'text-green-600' :
                  activeUser.status === 'away' ? 'text-yellow-600' :
                  activeUser.status === 'busy' ? 'text-red-600' :
                  'text-gray-500'
                }`}>
                  {getStatusText(activeUser.status)} {activeUser.status === 'offline' && `(${formatLastSeen(activeUser.last_seen)})`}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Phone className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Video className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Error Banner */}
        {error && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-700">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 💬 Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl mb-4">
              {activeUser.name.charAt(0)}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{activeUser.name}</h3>
            <p className="text-center max-w-md">
              {activeUser.name} ile henüz mesajlaşmadınız. İlk mesajı göndererek sohbeti başlatın!
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              const isOwn = message.sender_id === currentUser.id;
              const showDate = index === 0 || 
                formatDate(messages[index - 1].created_at) !== formatDate(message.created_at);
              
              return (
                <div key={message.id}>
                  {/* Date Separator */}
                  {showDate && (
                    <div className="flex justify-center my-4">
                      <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {formatDate(message.created_at)}
                      </span>
                    </div>
                  )}
                  
                  {/* Message */}
                  <div 
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'} group`}
                    onMouseEnter={() => setHoveredMessage(message.id)}
                    onMouseLeave={() => setHoveredMessage(null)}
                  >
                    <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'} relative`}>
                      {/* Message Actions (Hover) */}
                      {hoveredMessage === message.id && !message.is_deleted && (
                        <div className={`absolute top-0 ${isOwn ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} flex items-center space-x-1 bg-white border border-gray-200 rounded-lg shadow-lg p-1 z-10`}>
                          <button
                            onClick={() => setReplyTo(message)}
                            className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Yanıtla"
                          >
                            <Reply className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => copyToClipboard(message.content)}
                            className="p-1 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                            title="Kopyala"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                          {isOwn && (
                            <>
                              <button
                                onClick={() => handleEditMessage(message)}
                                className="p-1 text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
                                title="Düzenle"
                              >
                                <Edit className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteMessage(message.id)}
                                className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Sil"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </>
                          )}
                        </div>
                      )}
                      
                      <div
                        className={`rounded-lg px-4 py-2 ${
                          message.is_deleted 
                            ? 'bg-gray-100 text-gray-500 italic'
                            : isOwn
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        {/* Reply Preview */}
                        {message.reply_to_message && (
                          <div className={`mb-2 p-2 rounded border-l-2 ${
                            isOwn ? 'border-blue-300 bg-blue-500 bg-opacity-20' : 'border-gray-300 bg-gray-200'
                          }`}>
                            <div className="text-xs opacity-75 mb-1">
                              {message.reply_to_message.sender.name} yanıtlanıyor:
                            </div>
                            <div className="text-sm opacity-90">
                              {message.reply_to_message.content.substring(0, 100)}
                              {message.reply_to_message.content.length > 100 && '...'}
                            </div>
                          </div>
                        )}

                        {/* File Message */}
                        {message.message_type === 'file' && message.file_url && !message.is_deleted ? (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <File className="h-4 w-4" />
                              <span className="text-sm">{message.file_name}</span>
                              <button 
                                onClick={() => handleDownloadFile(message.file_url!, message.file_name!)}
                                className="hover:bg-black hover:bg-opacity-10 p-1 rounded"
                                title="Dosyayı İndir"
                              >
                                <Download className="h-3 w-3" />
                              </button>
                            </div>
                            {message.content && (
                              <p className="text-sm">{message.content}</p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        )}
                        
                        <div className={`flex items-center justify-between mt-1 text-xs ${
                          message.is_deleted ? 'text-gray-400' :
                          isOwn ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          <div className="flex items-center space-x-2">
                            <span>{formatTime(message.created_at)}</span>
                            {message.is_edited && !message.is_deleted && (
                              <span className="opacity-75">(düzenlendi)</span>
                            )}
                          </div>
                          {isOwn && !message.is_deleted && (
                            <div className="flex items-center space-x-1">
                              {message.read_by && message.read_by.includes(activeUser.id) ? (
                                <CheckCheck className="h-3 w-3" title="Okundu" />
                              ) : (
                                <Check className="h-3 w-3" title="Gönderildi" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* 💬 Reply Preview */}
      {replyTo && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Reply className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {replyTo.sender?.name || activeUser.name} kullanıcısına yanıt: 
                <span className="font-medium ml-1">
                  {replyTo.message_type === 'file' ? 
                    `📎 ${replyTo.file_name}` : 
                    replyTo.content.substring(0, 50) + (replyTo.content.length > 50 ? '...' : '')
                  }
                </span>
              </span>
            </div>
            <button
              onClick={() => setReplyTo(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* 📎 Attachments Preview */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="space-y-2">
            {attachments.map((file, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white p-2 rounded border">
                <Paperclip className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 flex-1 truncate">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </span>
                <button
                  onClick={() => setAttachments(prev => prev.filter((_, i) => i !== index))}
                  className="text-gray-500 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ⌨️ Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                title="Dosya Ekle"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <button 
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                title="Resim Ekle"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files) {
                      setAttachments(Array.from(files));
                    }
                  };
                  input.click();
                }}
              >
                <Image className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <Smile className="h-5 w-5" />
              </button>
              
              {editingMessage && (
                <div className="flex items-center space-x-2 text-sm text-yellow-600">
                  <Edit className="h-4 w-4" />
                  <span>Mesaj düzenleniyor...</span>
                  <button
                    onClick={() => {
                      setEditingMessage(null);
                      setNewMessage('');
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={newMessage}
                onChange={handleTyping}
                onKeyPress={handleKeyPress}
                placeholder={
                  editingMessage ? 'Mesajı düzenle...' :
                  replyTo ? `${replyTo.sender?.name || activeUser.name} kullanıcısına yanıt...` :
                  `${activeUser.name} ile mesajlaş...`
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={isLoading || isSending}
              />
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
              />
            </div>
          </div>
          
          <button
            onClick={editingMessage ? () => handleEditMessage(editingMessage) : handleSendMessage}
            disabled={(!newMessage.trim() && attachments.length === 0) || isLoading || isSending}
            className={`p-3 rounded-full transition-colors ${
              (newMessage.trim() || attachments.length > 0) && !isLoading && !isSending
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading || isSending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;