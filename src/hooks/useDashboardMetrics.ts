import { useState, useEffect } from 'react';

interface DashboardMetrics {
  activeUsers: number;
  newLeads: number;
  conversionRate: number;
  leadGrowth: string;
  conversionGrowth: string;
}

export const useDashboardMetrics = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeUsers: 0,
    newLeads: 0,
    conversionRate: 0,
    leadGrowth: '0%',
    conversionGrowth: '0%'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = () => {
      try {
        setLoading(true);
        
        // LocalStorage'dan mevcut metrikleri al veya varsayılan değerleri kullan
        const storedMetrics = localStorage.getItem('dashboardMetrics');
        let currentMetrics: DashboardMetrics;
        
        if (storedMetrics) {
          currentMetrics = JSON.parse(storedMetrics);
        } else {
          // İlk kez için demo veriler
          currentMetrics = {
            activeUsers: Math.floor(Math.random() * 20) + 30, // 30-50 arası
            newLeads: Math.floor(Math.random() * 15) + 15, // 15-30 arası
            conversionRate: Math.floor(Math.random() * 20) + 20, // 20-40 arası
            leadGrowth: `+${Math.floor(Math.random() * 20) + 5}%`, // +5% - +25% arası
            conversionGrowth: `+${Math.floor(Math.random() * 10) + 1}%` // +1% - +11% arası
          };
        }
        
        // Küçük rastgele değişiklikler ekle (gerçek zamanlı güncelleme simülasyonu)
        const updatedMetrics = {
          activeUsers: Math.max(1, currentMetrics.activeUsers + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3)),
          newLeads: Math.max(1, currentMetrics.newLeads + (Math.random() > 0.7 ? 1 : 0)),
          conversionRate: Math.max(1, Math.min(100, currentMetrics.conversionRate + (Math.random() > 0.8 ? 1 : -1) * Math.floor(Math.random() * 2))),
          leadGrowth: `+${Math.max(1, parseInt(currentMetrics.leadGrowth.replace('+', '').replace('%', '')) + (Math.random() > 0.7 ? 1 : -1))}%`,
          conversionGrowth: `+${Math.max(1, parseInt(currentMetrics.conversionGrowth.replace('+', '').replace('%', '')) + (Math.random() > 0.8 ? 0.5 : -0.5))}%`
        };
        
        // LocalStorage'a kaydet
        localStorage.setItem('dashboardMetrics', JSON.stringify(updatedMetrics));
        
        setMetrics(updatedMetrics);
        setError(null);
      } catch (err) {
        console.error('Dashboard metrikleri oluşturulurken hata:', err);
        setError('Metrikler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };
    
    // İlk yükleme
    fetchMetrics();
    
    // Periyodik güncelleme (her 30 saniyede bir)
    const interval = setInterval(fetchMetrics, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  return { metrics, loading, error };
};