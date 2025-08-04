import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Loader2, 
  CheckCircle, 
  AlertTriangle, 
  Settings,
  Eye,
  EyeOff,
  Save,
  RefreshCw
} from 'lucide-react';
import { sendTestEmail } from '../services/emailService';

const EmailTester: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: '',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    fromName: 'Duende Health CRM',
    secureConnection: 'tls' as 'none' | 'ssl' | 'tls'
  });

  const [testEmail, setTestEmail] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setEmailSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSendTestEmail = async () => {
    if (!testEmail) {
      setResult({
        success: false,
        message: 'Lütfen geçerli bir e-posta adresi girin'
      });
      return;
    }

    if (!emailSettings.smtpHost || !emailSettings.smtpUsername || !emailSettings.smtpPassword) {
      setResult({
        success: false,
        message: 'Lütfen tüm SMTP ayarlarını doldurun'
      });
      return;
    }
    
    setIsSending(true);
    setResult(null);
    
    try {
      const result = await sendTestEmail(emailSettings, testEmail);
      
      if (result.success) {
        setResult({
          success: true,
          message: `Test e-postası ${testEmail} adresine başarıyla gönderildi`
        });
      } else {
        setResult({
          success: false,
          message: `E-posta gönderilirken bir hata oluştu: ${result.error || 'Bilinmeyen hata'}`
        });
      }
    } catch (error) {
      console.error('E-posta gönderme hatası:', error);
      setResult({
        success: false,
        message: `E-posta gönderilirken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`
      });
    } finally {
      setIsSending(false);
    }
  };

  const loadSavedSettings = () => {
    const savedSettings = localStorage.getItem('emailSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setEmailSettings({
          smtpHost: parsedSettings.smtpHost || '',
          smtpPort: parsedSettings.smtpPort || 587,
          smtpUsername: parsedSettings.smtpUsername || '',
          smtpPassword: parsedSettings.smtpPassword || '',
          fromName: parsedSettings.fromName || 'Duende Health CRM',
          secureConnection: parsedSettings.secureConnection || 'tls'
        });
        setResult({
          success: true,
          message: 'Kaydedilmiş ayarlar yüklendi'
        });
      } catch (error) {
        setResult({
          success: false,
          message: 'Kaydedilmiş ayarlar yüklenirken bir hata oluştu'
        });
      }
    } else {
      setResult({
        success: false,
        message: 'Kaydedilmiş ayar bulunamadı'
      });
    }
  };

  const saveSettings = () => {
    try {
      localStorage.setItem('emailSettings', JSON.stringify(emailSettings));
      setResult({
        success: true,
        message: 'Ayarlar başarıyla kaydedildi'
      });
    } catch (error) {
      setResult({
        success: false,
        message: `Ayarlar kaydedilirken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">E-posta Test Aracı</h1>
        <div className="flex space-x-2">
          <button
            onClick={loadSavedSettings}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Ayarları Yükle</span>
          </button>
          <button
            onClick={saveSettings}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Save className="h-4 w-4" />
            <span>Ayarları Kaydet</span>
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Mail className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium text-blue-900">SMTP Ayarları</h4>
        </div>
        <p className="text-sm text-blue-700">
          Test e-postası göndermek için SMTP ayarlarını yapılandırın. Bu ayarlar, e-posta gönderimi için kullanılacaktır.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Sunucu *
          </label>
          <input
            type="text"
            value={emailSettings.smtpHost}
            onChange={(e) => handleInputChange('smtpHost', e.target.value)}
            placeholder="örn. smtp.gmail.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Port *
          </label>
          <input
            type="number"
            value={emailSettings.smtpPort}
            onChange={(e) => handleInputChange('smtpPort', parseInt(e.target.value))}
            placeholder="örn. 587"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Yaygın portlar: 25, 465 (SSL), 587 (TLS), 2525
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-posta Adresi *
          </label>
          <input
            type="email"
            value={emailSettings.smtpUsername}
            onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
            placeholder="örn. info@sirketiniz.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Şifre *
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={emailSettings.smtpPassword}
              onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
              placeholder="SMTP şifreniz"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gönderen Adı
          </label>
          <input
            type="text"
            value={emailSettings.fromName}
            onChange={(e) => handleInputChange('fromName', e.target.value)}
            placeholder="örn. Şirket Adı"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SSL/TLS
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={emailSettings.secureConnection}
            onChange={(e) => handleInputChange('secureConnection', e.target.value as 'none' | 'ssl' | 'tls')}
          >
            <option value="none">Yok</option>
            <option value="ssl">SSL</option>
            <option value="tls">TLS</option>
          </select>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Test E-postası Gönder</h4>
        <div className="flex space-x-3">
          <input
            type="email"
            placeholder="Test e-postası gönderilecek adres"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            onClick={handleSendTestEmail}
            disabled={isSending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-blue-400 flex items-center space-x-2"
          >
            {isSending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Gönderiliyor...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Test E-postası Gönder</span>
              </>
            )}
          </button>
        </div>
        
        {result && (
          <div className={`mt-3 p-3 rounded-lg ${
            result.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            <div className="flex items-center space-x-2">
              {result.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              )}
              <span>{result.message}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-900 mb-1">Gmail SMTP Kullanımı Hakkında</h4>
            <p className="text-sm text-yellow-700">
              <strong>Gmail Kullanıcıları İçin:</strong> Gmail SMTP sunucusunu kullanıyorsanız, "Daha az güvenli uygulama erişimi"ni etkinleştirmeniz veya bir "Uygulama Şifresi" oluşturmanız gerekebilir.
            </p>
            <p className="text-sm text-yellow-700 mt-2">
              <strong>Uygulama Şifresi Oluşturma:</strong> Google Hesap Ayarları sayfasından uygulama şifresi oluşturabilir ve normal şifreniz yerine bu şifreyi kullanabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailTester;