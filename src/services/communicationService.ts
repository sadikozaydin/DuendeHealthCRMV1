// İletişim servisi - mock veriler kullanır
// Gerçek uygulamada bu Supabase veya başka bir backend ile entegre olacaktır

// Mesaj gönderme fonksiyonu
export const sendMessage = async (params: {
  recipientId: string;
  recipientType: 'lead' | 'patient' | 'partner';
  channel: 'whatsapp' | 'sms' | 'email' | 'chat';
  message: string;
  attachments?: File[];
}) => {
  try {
    console.log('Sending message:', params);
    
    // Mock başarılı yanıt
    await new Promise(resolve => setTimeout(resolve, 800)); // Simüle edilmiş gecikme
    
    return {
      success: true,
      messageId: `msg_${Date.now()}`,
      status: 'sent',
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error sending message:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Mesaj gönderilirken bir hata oluştu.'
    };
  }
};

// Konuşma geçmişini getir
export const getConversationHistory = async (params: {
  recipientId: string;
  recipientType: 'lead' | 'patient' | 'partner';
  limit?: number;
  offset?: number;
}) => {
  console.log('Getting conversation history:', params);
  
  // Mock veri
  await new Promise(resolve => setTimeout(resolve, 500)); // Simüle edilmiş gecikme
  
  return {
    success: true,
    messages: [
      {
        id: 'msg_1',
        content: 'Merhaba, tedavi hakkında bilgi almak istiyorum.',
        sender: 'recipient',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'read',
        channel: 'whatsapp'
      },
      {
        id: 'msg_2',
        content: 'Merhaba, size nasıl yardımcı olabilirim?',
        sender: 'user',
        timestamp: new Date(Date.now() - 3500000).toISOString(),
        status: 'read',
        channel: 'whatsapp'
      },
      {
        id: 'msg_3',
        content: 'Kalp cerrahisi hakkında fiyat bilgisi alabilir miyim?',
        sender: 'recipient',
        timestamp: new Date(Date.now() - 3400000).toISOString(),
        status: 'read',
        channel: 'whatsapp'
      }
    ],
    total: 3
  };
};

// Konuşma listesini getir
export const getConversations = async (params: {
  limit?: number;
  offset?: number;
  filter?: string;
}) => {
  try {
    console.log('Getting conversations:', params);
    
    // Mock veri
    await new Promise(resolve => setTimeout(resolve, 500)); // Simüle edilmiş gecikme
    
    return {
      success: true,
      conversations: [
        {
          id: 'conv_1',
          recipient_id: '1',
          recipient_type: 'lead',
          recipient_name: 'Maria Rodriguez',
          last_message: 'Kalp cerrahisi hakkında fiyat bilgisi alabilir miyim?',
          last_message_time: new Date(Date.now() - 3400000).toISOString(),
          unread_count: 2,
          channel: 'whatsapp',
          status: 'active'
        },
        {
          id: 'conv_2',
          recipient_id: '2',
          recipient_type: 'patient',
          recipient_name: 'Ahmed Hassan',
          last_message: 'Randevu saatimi değiştirebilir miyiz?',
          last_message_time: new Date(Date.now() - 86400000).toISOString(),
          unread_count: 0,
          channel: 'email',
          status: 'active'
        },
        {
          id: 'conv_3',
          recipient_id: '3',
          recipient_type: 'partner',
          recipient_name: 'Madrid Health Tourism',
          last_message: 'Yeni hasta yönlendirmesi hakkında görüşebilir miyiz?',
          last_message_time: new Date(Date.now() - 172800000).toISOString(),
          unread_count: 1,
          channel: 'email',
          status: 'active'
        }
      ],
      total: 3
    };
  } catch (error) {
    console.error('Error getting conversations:', error);
    
    return {
      success: true,
      conversations: [],
      total: 0
    };
  }
};

// Mesaj durumunu güncelle
export const updateMessageStatus = async (messageId: string, status: 'sent' | 'delivered' | 'read' | 'failed') => {
  try {
    console.log('Updating message status:', messageId, status);
    
    // Mock başarılı yanıt
    await new Promise(resolve => setTimeout(resolve, 300)); // Simüle edilmiş gecikme
    
    return {
      success: true
    };
  } catch (error) {
    console.error('Error updating message status:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Mesaj durumu güncellenirken bir hata oluştu.'
    };
  }
};

// Okunmamış mesaj sayısını getir
export const getUnreadMessageCount = async () => {
  try {
    console.log('Getting unread message count');
    
    // Mock veri
    return {
      success: true,
      count: 3
    };
  } catch (error) {
    console.error('Error getting unread message count:', error);
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Okunmamış mesaj sayısı alınırken bir hata oluştu.',
      count: 0
    };
  }
};