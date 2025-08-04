// Merkezi tarih yardımcı fonksiyonları
export const formatDate = (dateString: string, locale: string = 'tr-TR', options?: Intl.DateTimeFormatOptions) => {
  if (!dateString) return 'Belirtilmemiş';
  
  try {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    return new Date(dateString).toLocaleDateString(locale, { ...defaultOptions, ...options });
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Geçersiz tarih';
  }
};

export const formatDateTime = (dateString: string, locale: string = 'tr-TR') => {
  return formatDate(dateString, locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getRelativeTime = (dateString: string, locale: string = 'tr-TR') => {
  if (!dateString) return 'Bilinmiyor';
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `${Math.abs(diffDays)} gün önce`;
    } else if (diffDays === 0) {
      return 'Bugün';
    } else if (diffDays === 1) {
      return 'Yarın';
    } else {
      return `${diffDays} gün sonra`;
    }
  } catch (error) {
    return 'Geçersiz tarih';
  }
};