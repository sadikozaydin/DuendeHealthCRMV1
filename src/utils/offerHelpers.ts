// Teklif numarası oluşturma ve yönetimi için yardımcı fonksiyonlar

/**
 * Teklif numarası formatı: TEK-LD4512-202507-003
 * - TEK: Sabit prefix (Teklif)
 * - LD4512: Lead ID veya Hasta ID
 * - 202507: Yıl-Ay (YYYYMM)
 * - 003: O hasta için kaçıncı teklif (3 haneli)
 */

// Lead ID'den sadece sayısal kısmı çıkarma
export const extractLeadNumber = (leadId: string): string => {
  // LEAD-123456 -> 123456 veya P-2024-001 -> 2024001
  const numbers = leadId.replace(/[^0-9]/g, '');
  return numbers.slice(-6).padStart(6, '0'); // Son 6 haneyi al, eksikse 0 ile doldur
};

// Yıl-ay formatı oluşturma
export const getCurrentYearMonth = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  return `${year}${month}`;
};

// Hasta için teklif sayısını hesaplama (LocalStorage'dan)
export const getOfferCountForLead = (leadId: string): number => {
  try {
    const existingOffers = JSON.parse(localStorage.getItem('lead_offers') || '[]');
    const leadOffers = existingOffers.filter((offer: any) => 
      offer.leadId === leadId || offer.patientId === leadId
    );
    return leadOffers.length + 1; // Yeni teklif için +1
  } catch (error) {
    console.error('Error getting offer count:', error);
    return 1; // Hata durumunda ilk teklif olarak kabul et
  }
};

// Geliştirilmiş teklif numarası oluşturma
export const generateOfferId = (leadId: string, date: Date = new Date(), seq?: number): string => {
  const leadNumber = leadId.replace(/[^0-9]/g, '').padStart(6, '0');
  const yearMonth = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  const sequence = (seq || getOfferCountForLead(leadId)).toString().padStart(3, '0');
  
  return `TEK-${leadNumber}-${yearMonth}-${sequence}`;
};

// Backward compatibility
export const generateOfferNumber = (leadId: string): string => {
  return generateOfferId(leadId);
};

// Teklif numarasını parse etme
export const parseOfferNumber = (offerNumber: string) => {
  const regex = /^TEK-LD(\d{6})-(\d{6})-(\d{3})$/;
  const match = offerNumber.match(regex);
  
  if (!match) {
    return null;
  }
  
  const [, leadNumber, yearMonth, sequence] = match;
  const year = yearMonth.substring(0, 4);
  const month = yearMonth.substring(4, 6);
  
  return {
    leadNumber,
    year: parseInt(year),
    month: parseInt(month),
    sequence: parseInt(sequence),
    yearMonth,
    fullNumber: offerNumber
  };
};

// Teklif numarasının geçerliliğini kontrol etme
export const validateOfferNumber = (offerNumber: string): boolean => {
  return parseOfferNumber(offerNumber) !== null;
};

// Örnek kullanım:
// const leadId = "LEAD-123456";
// const offerNumber = generateOfferNumber(leadId); // TEK-LD123456-202507-001