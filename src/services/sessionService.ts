// Kullanıcı oturum takibi için mock servis
// Gerçek uygulamada bu Supabase veya başka bir backend ile entegre olacaktır

// Kullanıcı oturum bilgilerini kaydet/güncelle
export const trackUserSession = async (userId: string) => {
  console.log('Tracking user session for user ID:', userId);
  
  try {
    // Demo modunda çalışıyor, gerçek bir API çağrısı yok
    await new Promise(resolve => setTimeout(resolve, 300)); // Simüle edilmiş gecikme
    
    return { 
      success: true, 
      sessionId: `mock-session-${Date.now()}`,
      message: 'Demo modunda çalışıyor'
    };
  } catch (error) {
    console.error('Oturum takibi sırasında beklenmeyen hata:', error);
    return { 
      success: true, 
      sessionId: `mock-session-${Date.now()}`,
      message: 'Demo modunda çalışıyor - hata durumu'
    };
  }
};

// Kullanıcı oturumunu sonlandır
export const endUserSession = async (userId: string) => {
  console.log('Ending user session for user ID:', userId);
  
  try {
    // Demo modunda çalışıyor, gerçek bir API çağrısı yok
    await new Promise(resolve => setTimeout(resolve, 300)); // Simüle edilmiş gecikme
    
    return { 
      success: true,
      message: 'Demo modunda çalışıyor'
    };
  } catch (error) {
    console.error('Oturum sonlandırma sırasında beklenmeyen hata:', error);
    return { 
      success: true,
      message: 'Demo modunda çalışıyor - hata durumu'
    };
  }
};