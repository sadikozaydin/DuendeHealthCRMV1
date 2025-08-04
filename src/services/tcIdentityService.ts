// TC Kimlik Sorgulama Servisi
// Gerçek uygulamada Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü API'si kullanılır

interface TCIdentityResult {
  success: boolean;
  data?: {
    tckn: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    gender: string;
    verified: boolean;
  };
  error?: string;
}

// Mock TC kimlik veritabanı (demo amaçlı)
const mockTCDatabase = {
  '12345678901': {
    tckn: '12345678901',
    firstName: 'Mehmet',
    lastName: 'Yılmaz',
    birthDate: '1985-03-15',
    gender: 'male',
    verified: true
  },
  '98765432109': {
    tckn: '98765432109',
    firstName: 'Ayşe',
    lastName: 'Kaya',
    birthDate: '1990-07-22',
    gender: 'female',
    verified: true
  },
  '11111111111': {
    tckn: '11111111111',
    firstName: 'Fatma',
    lastName: 'Demir',
    birthDate: '1988-12-10',
    gender: 'female',
    verified: true
  },
  '22222222222': {
    tckn: '22222222222',
    firstName: 'Ali',
    lastName: 'Özkan',
    birthDate: '1992-05-08',
    gender: 'male',
    verified: true
  }
};

// TC kimlik numarası validasyonu
export const validateTCKN = (tckn: string): boolean => {
  // Boş veya 11 haneli değilse geçersiz
  if (!tckn || tckn.length !== 11) return false;
  
  // Tamamı aynı rakam olamaz
  if (/^(\d)\1{10}$/.test(tckn)) return false;
  
  // TC kimlik algoritması kontrolü
  const digits = tckn.split('').map(Number);
  
  // İlk 10 hanenin toplamı
  const sum1 = digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0);
  if (sum1 % 10 !== digits[10]) return false;
  
  // Tek ve çift hanelerin toplamı kontrolü
  const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
  const evenSum = digits[1] + digits[3] + digits[5] + digits[7];
  const checkDigit = ((oddSum * 7) - evenSum) % 10;
  if (checkDigit !== digits[9]) return false;
  
  return true;
};

// Ücretsiz alternatif: Sadece format kontrolü + manuel onay
export const validateTCWithManualApproval = async (tckn: string): Promise<{
  isValidFormat: boolean;
  requiresManualVerification: boolean;
  message: string;
}> => {
  const isValidFormat = validateTCKN(tckn);
  
  if (!isValidFormat) {
    return {
      isValidFormat: false,
      requiresManualVerification: false,
      message: 'Geçersiz TC kimlik numarası formatı'
    };
  }
  
  return {
    isValidFormat: true,
    requiresManualVerification: true,
    message: 'TC format geçerli. Manuel doğrulama için kimlik belgesi yükleyin.'
  };
};

// Gelecekte API entegrasyonu için hazır fonksiyon
export const enableRealAPIWhenReady = () => {
  console.log(`
    🔗 Gerçek API Entegrasyonu İçin:
    
    1. api.turkiye.gov.tr'den başvuru yapın
    2. API anahtarı alın  
    3. queryTCIdentityFromAPI fonksiyonunu aktif edin
    4. Mock fonksiyonu devre dışı bırakın
    
    💰 Maliyet: ~0.25₺/sorgu
    ⏱️ Süreç: 2-4 hafta
  `);
};
// TC kimlik sorgulama (Mock)
export const queryTCIdentity = async (tckn: string): Promise<TCIdentityResult> => {
  console.log('TC kimlik sorgulanıyor:', tckn);
  
  try {
    // TCKN validasyonu
    if (!validateTCKN(tckn)) {
      return {
        success: false,
        error: 'Geçersiz TC kimlik numarası formatı'
      };
    }
    
    // Simüle edilmiş API gecikmesi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock veritabanından sorgula
    const result = mockTCDatabase[tckn];
    
    if (result) {
      return {
        success: true,
        data: result
      };
    } else {
      return {
        success: false,
        error: 'TC kimlik numarası sistemde bulunamadı'
      };
    }
    
  } catch (error) {
    console.error('TC kimlik sorgulama hatası:', error);
    return {
      success: false,
      error: 'TC kimlik sorgulama servisinde hata oluştu'
    };
  }
};

// Gerçek API entegrasyonu için hazır fonksiyon
export const queryTCIdentityFromAPI = async (tckn: string): Promise<TCIdentityResult> => {
  try {
    // Gerçek API endpoint'i
    const response = await fetch('/api/tc-identity/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_TC_API_TOKEN}`
      },
      body: JSON.stringify({ tckn })
    });
    
    if (!response.ok) {
      throw new Error('API yanıt hatası');
    }
    
    const data = await response.json();
    
    return {
      success: true,
      data: {
        tckn: data.tckn,
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        gender: data.gender,
        verified: data.verified
      }
    };
    
  } catch (error) {
    console.error('TC API sorgulama hatası:', error);
    return {
      success: false,
      error: 'TC kimlik sorgulama API\'sinde hata oluştu'
    };
  }
};

// TC kimlik numarası maskeleme (KVKK uyumlu)
export const maskTCKN = (tckn: string): string => {
  if (!tckn || tckn.length !== 11) return tckn;
  return tckn.substring(0, 3) + '*****' + tckn.substring(8);
};

// Yaş hesaplama
export const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
};