import React from 'react';
import { Shield, ArrowLeft, FileText, Eye, Lock, Database, Users, Globe } from 'lucide-react';

const KVKK = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">KVKK Aydınlatma Metni</h1>
                <p className="text-gray-600">Kişisel Verilerin Korunması Kanunu</p>
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
              <h2 className="text-lg font-semibold text-blue-900 mb-2">Önemli Bilgilendirme</h2>
              <p className="text-blue-800">
                Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında 
                kişisel verilerinizin işlenmesi hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
              </p>
            </div>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-5 w-5 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">1. Veri Sorumlusu</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Kişisel verileriniz, Duende Health CRM sistemi aracılığıyla, 
                <strong> [Şirket Adı] </strong> tarafından aşağıda açıklanan kapsamda işlenmektedir.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Adres:</strong> [Şirket Adresi]</p>
                <p><strong>Telefon:</strong> [Telefon Numarası]</p>
                <p><strong>E-posta:</strong> [E-posta Adresi]</p>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Database className="h-5 w-5 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">2. İşlenen Kişisel Veriler</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Kimlik Bilgileri</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Ad, soyad</li>
                    <li>• TC kimlik numarası</li>
                    <li>• Doğum tarihi ve yeri</li>
                    <li>• Uyruk bilgisi</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">İletişim Bilgileri</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Telefon numarası</li>
                    <li>• E-posta adresi</li>
                    <li>• Adres bilgileri</li>
                    <li>• Acil durum iletişim bilgileri</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Sağlık Bilgileri</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Tıbbi geçmiş</li>
                    <li>• Tedavi bilgileri</li>
                    <li>• Laboratuvar sonuçları</li>
                    <li>• Görüntüleme sonuçları</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Finansal Bilgiler</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Ödeme bilgileri</li>
                    <li>• Sigorta bilgileri</li>
                    <li>• Fatura adresi</li>
                    <li>• Banka hesap bilgileri</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="h-5 w-5 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">3. Kişisel Verilerin İşlenme Amaçları</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Sağlık hizmetlerinin planlanması ve sunulması</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Tedavi süreçlerinin yönetimi ve takibi</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Seyahat ve konaklama organizasyonu</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Finansal işlemlerin gerçekleştirilmesi</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">Yasal yükümlülüklerin yerine getirilmesi</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <p className="text-gray-700">İletişim ve bilgilendirme faaliyetleri</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-5 w-5 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">4. Kişisel Verilerin Aktarılması</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Kişisel verileriniz, yukarıda belirtilen amaçlar doğrultusunda aşağıdaki kişi ve kuruluşlara aktarılabilir:
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700">Sağlık hizmeti sağlayıcıları (hastaneler, klinikler, doktorlar)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700">Seyahat ve konaklama hizmeti sağlayıcıları</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700">Ödeme hizmeti sağlayıcıları</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-gray-700">Yasal yükümlülükler gereği kamu kurum ve kuruluşları</span>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Lock className="h-5 w-5 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">5. Kişisel Verilerin Güvenliği</h2>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 mb-3">
                  Kişisel verilerinizin güvenliği için aşağıdaki teknik ve idari tedbirler alınmıştır:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-green-700">256-bit SSL şifreleme</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-green-700">Çok faktörlü kimlik doğrulama</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-green-700">Rol bazlı erişim kontrolü</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-green-700">Düzenli güvenlik denetimleri</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-5 w-5 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">6. Kişisel Veri Sahibinin Hakları</h2>
              </div>
              <p className="text-gray-700 mb-4">
                KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
              </p>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Bilgi Talep Etme Hakkı</h4>
                  <p className="text-blue-800 text-sm">Kişisel verilerinizin işlenip işlenmediğini öğrenme</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Erişim Hakkı</h4>
                  <p className="text-blue-800 text-sm">İşlenen kişisel verileriniz hakkında bilgi talep etme</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Düzeltme Hakkı</h4>
                  <p className="text-blue-800 text-sm">Yanlış veya eksik verilerin düzeltilmesini isteme</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Silme Hakkı</h4>
                  <p className="text-blue-800 text-sm">Belirli şartlarda verilerin silinmesini isteme</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-900">İtiraz Hakkı</h4>
                  <p className="text-blue-800 text-sm">Kişisel verilerin işlenmesine itiraz etme</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="h-5 w-5 text-red-600" />
                <h2 className="text-xl font-semibold text-gray-900">7. İletişim</h2>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">
                  KVKK kapsamındaki haklarınızı kullanmak için aşağıdaki iletişim bilgilerini kullanabilirsiniz:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>E-posta:</strong> kvkk@duendehealth.com</p>
                  <p><strong>Telefon:</strong> +90 212 XXX XX XX</p>
                  <p><strong>Adres:</strong> [Şirket Adresi]</p>
                </div>
              </div>
            </section>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-semibold text-red-900 mb-2">Son Güncelleme</h3>
              <p className="text-red-800 text-sm">
                Bu aydınlatma metni en son 15 Ocak 2025 tarihinde güncellenmiştir. 
                Değişiklikler web sitemizde yayınlandığı tarihte yürürlüğe girer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KVKK;