import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { 
  MessageCircle, 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Image,
  File,
  Mic,
  Clock,
  CheckCircle,
  User,
  Mail,
  Globe,
  Calendar,
  Star,
  Flag,
  Tag,
  Bookmark,
  Settings,
  RefreshCw,
  Trash2,
  Archive,
  AlertTriangle,
  Info,
  HelpCircle,
  MessageSquare,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getConversations, getConversationHistory, sendMessage } from '../services/communicationService';

const CommunicationHub = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // State for conversations and messages
  const [activeTab, setActiveTab] = useState('conversations');
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState('whatsapp');
  
  // Check for navigation state or URL parameters
  useEffect(() => {
    // Check if we have a selected conversation from navigation state
    const stateData = location.state;
    const recipientId = searchParams.get('recipient');
    const recipientType = searchParams.get('type');
    
    if (stateData?.selectedConversation || recipientId) {
      console.log('Received conversation data:', stateData || { recipientId, recipientType });
      
      // Set the selected conversation
      const conversationId = stateData?.selectedConversation || recipientId;
      const convType = stateData?.recipientType || recipientType || 'lead';
      const contactInfo = stateData?.contactInfo || {};
      
      // Find the conversation in the list or create a new one
      const existingConversation = conversations.find(c => 
        c.recipient_id === conversationId && c.recipient_type === convType
      );
      
      if (existingConversation) {
        setSelectedConversation(existingConversation);
        loadMessages(existingConversation.id);
      } else {
        // Create a temporary conversation object
        const newConversation = {
          id: `temp_${Date.now()}`,
          recipient_id: conversationId,
          recipient_type: convType,
          recipient_name: `${convType.charAt(0).toUpperCase() + convType.slice(1)} #${conversationId}`,
          last_message: '',
          last_message_time: new Date().toISOString(),
          unread_count: 0,
          channel: contactInfo.whatsapp ? 'whatsapp' : 
                  contactInfo.phone ? 'sms' : 
                  contactInfo.email ? 'email' : 'chat',
          status: 'active',
          contactInfo
        };
        
        setSelectedConversation(newConversation);
        // No messages to load yet for a new conversation
        setMessages([]);
      }
      
      // Switch to conversations tab
      setActiveTab('conversations');
    }
  }, [location, searchParams, conversations]);

  // Load conversations on component mount
  useEffect(() => {
    loadConversations();
  }, [filter]);

  // Load messages when a conversation is selected
  useEffect(() => {
    if (selectedConversation?.id && !selectedConversation.id.startsWith('temp_')) {
      loadMessages(selectedConversation.id);
    }
  }, [selectedConversation]);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  // Load conversations
  const loadConversations = async () => {
    setIsLoading(true);
    try {
      const result = await getConversations({ filter });
      if (result.success) {
        setConversations(result.conversations);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load messages for a conversation
  const loadMessages = async (conversationId) => {
    setIsLoading(true);
    try {
      const result = await getConversationHistory({
        recipientId: selectedConversation.recipient_id,
        recipientType: selectedConversation.recipient_type
      });
      
      if (result.success) {
        setMessages(result.messages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Send a message
  const handleSendMessage = async () => {
    if (!newMessage.trim() && attachments.length === 0) return;
    
    try {
      const result = await sendMessage({
        recipientId: selectedConversation.recipient_id,
        recipientType: selectedConversation.recipient_type,
        channel: selectedChannel,
        message: newMessage,
        attachments
      });
      
      if (result.success) {
        // Add the message to the list
        setMessages(prev => [...prev, {
          id: result.messageId,
          content: newMessage,
          sender: 'user',
          timestamp: new Date().toISOString(),
          status: 'sent',
          channel: selectedChannel
        }]);
        
        // Clear the input
        setNewMessage('');
        setAttachments([]);
        
        // Refresh conversations to update the last message
        loadConversations();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments(prev => [...prev, ...files]);
  };

  // Remove an attachment
  const handleRemoveAttachment = (index) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  // Filter conversations
  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.recipient_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && conversation.unread_count > 0) ||
                         filter === conversation.recipient_type;
    
    return matchesSearch && matchesFilter;
  });

  // Get channel icon
  const getChannelIcon = (channel) => {
    switch (channel) {
      case 'whatsapp': return <MessageSquare className="h-4 w-4 text-green-600" />;
      case 'sms': return <MessageCircle className="h-4 w-4 text-blue-600" />;
      case 'email': return <Mail className="h-4 w-4 text-purple-600" />;
      case 'chat': return <MessageCircle className="h-4 w-4 text-gray-600" />;
      default: return <MessageCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">İletişim Hub'ı</h1>
          <p className="text-gray-600 mt-1">Tüm iletişim kanallarını tek yerden yönetin</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Yeni Mesaj</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex h-[calc(80vh-100px)]">
          {/* Left Sidebar */}
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('conversations')}
                className={`flex-1 py-4 text-center font-medium text-sm ${
                  activeTab === 'conversations'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Konuşmalar
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`flex-1 py-4 text-center font-medium text-sm ${
                  activeTab === 'contacts'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Kişiler
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`flex-1 py-4 text-center font-medium text-sm ${
                  activeTab === 'templates'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Şablonlar
              </button>
            </div>
            
            {/* Search and Filter */}
            <div className="p-3 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex mt-2 space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    filter === 'all'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    filter === 'unread'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Okunmamış
                </button>
                <button
                  onClick={() => setFilter('lead')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    filter === 'lead'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Lead'ler
                </button>
                <button
                  onClick={() => setFilter('patient')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    filter === 'patient'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Hastalar
                </button>
              </div>
            </div>
            
            {/* Conversations List */}
            {activeTab === 'conversations' && (
              <div className="flex-1 overflow-y-auto">
                {isLoading && conversations.length === 0 ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : filteredConversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <MessageCircle className="h-12 w-12 text-gray-300 mb-2" />
                    <p>Henüz konuşma yok</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Yeni konuşma başlat
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation)}
                        className={`p-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                              {conversation.recipient_name?.charAt(0) || '?'}
                            </div>
                            {conversation.unread_count > 0 && (
                              <div className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                {conversation.unread_count}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {conversation.recipient_name}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {new Date(conversation.last_message_time).toLocaleTimeString('tr-TR', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {getChannelIcon(conversation.channel)}
                              <p className="text-sm text-gray-600 truncate">
                                {conversation.last_message || 'Yeni konuşma'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Contacts List */}
            {activeTab === 'contacts' && (
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Users className="h-12 w-12 text-gray-300 mb-2" />
                  <p>Kişiler listesi yakında eklenecek</p>
                </div>
              </div>
            )}
            
            {/* Templates List */}
            {activeTab === 'templates' && (
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <MessageSquare className="h-12 w-12 text-gray-300 mb-2" />
                  <p>Mesaj şablonları yakında eklenecek</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Content - Chat */}
          <div className="w-2/3 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {selectedConversation.recipient_name?.charAt(0) || '?'}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {selectedConversation.recipient_name}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="capitalize">{selectedConversation.recipient_type}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          {getChannelIcon(selectedConversation.channel)}
                          <span className="capitalize">{selectedConversation.channel}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                      <Phone className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                      <Video className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                      <Info className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Messages */}
                <div id="messages-container" className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <MessageCircle className="h-12 w-12 text-gray-300 mb-2" />
                      <p>Henüz mesaj yok</p>
                      <p className="text-sm">Aşağıdan ilk mesajınızı gönderebilirsiniz</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p>{message.content}</p>
                          <div
                            className={`text-xs mt-1 flex items-center justify-end space-x-1 ${
                              message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                            }`}
                          >
                            <span>
                              {new Date(message.timestamp).toLocaleTimeString('tr-TR', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            {message.sender === 'user' && (
                              <>
                                <span>•</span>
                                {message.status === 'sent' && <Clock className="h-3 w-3" />}
                                {message.status === 'delivered' && <CheckCircle className="h-3 w-3" />}
                                {message.status === 'read' && (
                                  <div className="flex">
                                    <CheckCircle className="h-3 w-3" />
                                    <CheckCircle className="h-3 w-3 -ml-1" />
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                {/* Channel Selection */}
                <div className="px-4 py-2 border-t border-gray-200 flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Kanal:</span>
                  <button
                    onClick={() => setSelectedChannel('whatsapp')}
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                      selectedChannel === 'whatsapp'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <MessageSquare className="h-3 w-3" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setSelectedChannel('sms')}
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                      selectedChannel === 'sms'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <MessageCircle className="h-3 w-3" />
                    <span>SMS</span>
                  </button>
                  <button
                    onClick={() => setSelectedChannel('email')}
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${
                      selectedChannel === 'email'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Mail className="h-3 w-3" />
                    <span>E-posta</span>
                  </button>
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  {attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="bg-gray-100 rounded-lg p-2 flex items-center space-x-2">
                          <File className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700 truncate max-w-[150px]">
                            {file.name}
                          </span>
                          <button
                            onClick={() => handleRemoveAttachment(index)}
                            className="text-gray-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Mesajınızı yazın..."
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                        <button className="text-gray-400 hover:text-gray-600 p-1">
                          <Smile className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Paperclip className="h-5 w-5" />
                          <input
                            id="file-upload"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() && attachments.length === 0}
                        className={`p-3 rounded-full transition-colors ${
                          !newMessage.trim() && attachments.length === 0
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <MessageCircle className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">İletişim Hub'ına Hoş Geldiniz</h3>
                <p className="text-center max-w-md mb-4">
                  Tüm iletişim kanallarınızı tek bir yerden yönetin. Konuşma başlatmak için soldaki listeden bir kişi seçin veya yeni bir mesaj oluşturun.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Yeni Mesaj</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* AI & Automation Features */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          <span>Akıllı İletişim Özellikleri</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Otomatik Yanıtlar</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Sık sorulan sorular için hazır yanıtlar</li>
              <li>• Çalışma saatleri dışında otomatik bilgilendirme</li>
              <li>• Dil bazlı otomatik yanıt seçimi</li>
              <li>• Kişiselleştirilmiş şablonlar</li>
              <li>• AI destekli yanıt önerileri</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Çoklu Kanal Yönetimi</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• WhatsApp Business API entegrasyonu</li>
              <li>• SMS gateway bağlantısı</li>
              <li>• E-posta entegrasyonu</li>
              <li>• Canlı chat widget</li>
              <li>• Kanal bazlı performans analizi</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">İletişim Analitiği</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Yanıt süreleri ve performans</li>
              <li>• Kanal bazlı dönüşüm oranları</li>
              <li>• Mesaj içerik analizi</li>
              <li>• Duygu analizi ve müşteri memnuniyeti</li>
              <li>• Ekip performans metrikleri</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationHub;