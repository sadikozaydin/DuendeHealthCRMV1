import { useEffect } from 'react';

// Modal açıkken body scroll'unu kontrol eden hook
export const useModalBodyScroll = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      // Modal açıldığında body scroll'unu kapat
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Modal kapandığında eski duruma döndür
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);
};