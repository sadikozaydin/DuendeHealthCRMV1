import React from 'react';
import { Shield, ArrowLeft, Lock, Eye, Database, Globe, Users, FileText } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gizlilik Politikası</h1>
                <p className="text-gray-600">Duende Health CRM Sistemi</p>
              </div>
            </div>
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Geri Dön</span>
            </button>
          </div>

          {/* Content */}
          <div className="prose max-w-none">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Gizliliğiniz Bizim İçin Önemli</h2>
              <p className="text-blue-800">
                Bu gizlilik politikası, Duende Health CRM sistemi kullanırken kişisel bilgilerinizin 
                nasıl toplandığı, kullanıldığı ve korunduğu hakkında bilgi vermektedir.
              </p>
            </div>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Database className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">1. Topladığımız Bilgiler</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Doğrudan Sağladığınız Bilgiler</h3>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Hesap oluştururken verdiğiniz kişisel bilgiler</li>
                    <li>• Sağlık geçmişiniz ve tıbbi kayıtlarınız</li>
                    <li>• İletişim tercihleri ve bilgileri</li>
                    <li>• Ödeme ve faturalandırma bilgileri</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Otomatik Toplanan Bilgiler</h3>
                  <ul className="text-gray-700 space-y-1 text-sm">
                    <li>• Sistem kullanım logları ve aktivite kayıtları</li>
                    <li>• IP adresi ve cihaz bilgileri</li>
                    <li>• Tarayıcı türü ve sürümü</li>
                    <li>• Giriş ve çıkış zamanları</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">2. Bilgileri Nasıl Kullanıyoruz</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Hizmet Sunumu</h3>
                  <ul className="text-green-800 space-y-1 text-sm">
                    <li>• Sağlık hizmetlerinin koordinasyonu</li>
                    <li>• Randevu ve tedavi planlaması</li>
                    <li>• Seyahat organizasyonu</li>
                    <li>• Müşteri destek hizmetleri</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">İletişim</h3>
                  <ul className="text-purple-800 space-y-1 text-sm">
                    <li>• Randevu hatırlatmaları</li>
                    <li>• Tedavi güncellemeleri</li>
                    <li>• Önemli bildirimler</li>
                    <li>• Pazarlama iletişimi (onay ile)</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-2">Güvenlik</h3>
                  <ul className="text-orange-800 space-y-1 text-sm">
                    <li>• Hesap güvenliği sağlama</li>
                    <li>• Dolandırıcılık önleme</li>
                    <li>• Sistem güvenlik denetimleri</li>
                    <li>• Yasal uyumluluk</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">İyileştirme</h3>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• Hizmet kalitesini artırma</li>
                    <li>• Sistem performansı analizi</li>
                    <li>• Kullanıcı deneyimi geliştirme</li>
                    <li>• Yeni özellik geliştirme</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">3. Bilgi Güvenliği</h2>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-4">Güvenlik Önlemlerimiz</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-green-800 mb-2">Teknik Güvenlik</h4>
                    <ul className="text-green-700 space-y-1 text-sm">
                      <li>• End-to-end şifreleme</li>
                      <li>• Güvenli veri aktarımı (HTTPS)</li>
                      <li>• Düzenli güvenlik güncellemeleri</li>
                      <li>• Penetrasyon testleri</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-800 mb-2">İdari Güvenlik</h4>
                    <ul className="text-green-700 space-y-1 text-sm">
                      <li>• Personel güvenlik eğitimleri</li>
                      <li>• Erişim kontrolü ve yetkilendirme</li>
                      <li>• Düzenli güvenlik denetimleri</li>
                      <li>• Olay müdahale planları</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">4. Bilgi Paylaşımı</h2>
              </div>
              
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-2">Ne Zaman Paylaşırız?</h3>
                  <ul className="text-yellow-800 space-y-1 text-sm">
                    <li>• Açık rızanız olduğunda</li>
                    <li>• Hizmet sunumu için gerekli olduğunda</li>
                    <li>• Yasal yükümlülükler gereği</li>
                    <li>• Güvenlik tehditleri durumunda</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">Kimlerle Paylaşırız?</h3>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Sağlık hizmeti sağlayıcıları</li>
                    <li>• Güvenilir iş ortaklarımız</li>
                    <li>• Yasal otoriteler (gerektiğinde)</li>
                    <li>• Teknik hizmet sağlayıcıları</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">5. Haklarınız</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Erişim ve Kontrol</h3>
                  <ul className="text-blue-800 space-y-1 text-sm">
                    <li>• Verilerinizi görüntüleme</li>
                    <li>• Yanlış bilgileri düzeltme</li>
                    <li>• Hesabınızı silme</li>
                    <li>• Veri taşınabilirliği</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">İletişim Tercihleri</h3>
                  <ul className="text-purple-800 space-y-1 text-sm">
                    <li>• Pazarlama e-postalarından çıkma</li>
                    <li>• Bildirim ayarlarını değiştirme</li>
                    <li>• İletişim kanalı seçimi</li>
                    <li>• Rıza geri çekme</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">6. Uluslararası Veri Aktarımı</h2>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800 mb-3">
                  Hizmetlerimizin doğası gereği, verileriniz uluslararası sağlık hizmeti sağlayıcıları 
                  ile paylaşılabilir. Bu durumda:
                </p>
                <ul className="text-orange-700 space-y-1 text-sm">
                  <li>• Uygun güvenlik önlemleri alınır</li>
                  <li>• Veri koruma anlaşmaları imzalanır</li>
                  <li>• Yerel veri koruma yasalarına uyulur</li>
                  <li>• Düzenli denetimler yapılır</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Lock className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">7. Çerezler ve Takip Teknolojileri</h2>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Zorunlu Çerezler</h4>
                  <p className="text-gray-700 text-sm">Sistemin çalışması için gerekli olan çerezler</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Performans Çerezleri</h4>
                  <p className="text-gray-700 text-sm">Site performansını iyileştirmek için kullanılan çerezler</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-900">Pazarlama Çerezleri</h4>
                  <p className="text-gray-700 text-sm">Kişiselleştirilmiş içerik sunmak için kullanılan çerezler (onay ile)</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">8. İletişim</h2>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">
                  Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>E-posta:</strong> privacy@duendehealth.com</p>
                  <p><strong>Telefon:</strong> +90 212 XXX XX XX</p>
                  <p><strong>Adres:</strong> [Şirket Adresi]</p>
                  <p><strong>Veri Koruma Sorumlusu:</strong> dpo@duendehealth.com</p>
                </div>
              </div>
            </section>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Politika Güncellemeleri</h3>
              <p className="text-blue-800 text-sm mb-2">
                Bu gizlilik politikası en son 15 Ocak 2025 tarihinde güncellenmiştir. 
                Önemli değişiklikler olduğunda size bildirim göndereceğiz.
              </p>
              <p className="text-blue-800 text-sm">
                Politikamızı düzenli olarak gözden geçirmenizi öneririz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;