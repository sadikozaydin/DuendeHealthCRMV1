import React, { useState } from 'react';
import { 
  Mail, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertTriangle, 
  Loader2, 
  Send, 
  Save, 
  XCircle 
} from 'lucide-react';
import { sendTestEmail } from '../../services/emailService';

interface EmailSettingsProps {
  onSave?: (settings: any) => void;
}

const EmailSettings: React.FC<EmailSettingsProps> = ({ onSave }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const [formData, setFormData] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: 'no-reply@duendehealthcrm.com',
    smtpPassword: 'Dd2024**',
    fromName: 'Duende Health CRM',
    secureConnection: 'tls',
    enableWelcomeEmail: true,
    enablePasswordReset: true,
    enableSecurityAlerts: true
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleToggle = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    setSaveResult(null);
    
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage for demo purposes
      localStorage.setItem('emailSettings', JSON.stringify(formData));
      
      if (onSave) {
        onSave(formData);
      }
      
      setSaveResult({
        success: true,
        message: 'E-posta ayarları başarıyla kaydedildi'
      });
    } catch (error) {
      setSaveResult({
        success: false,
        message: `Ayarlar kaydedilirken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendTestEmail = async () => {
    if (!testEmail) {
      setTestResult({
        success: false,
        message: 'Lütfen geçerli bir e-posta adresi girin'
      });
      return;
    }
    
    setIsSending(true);
    setTestResult(null);
    
    try {
      // Prepare the email settings
      const emailSettings = {
        smtpHost: formData.smtpHost,
        smtpPort: formData.smtpPort,
        smtpUsername: formData.smtpUsername,
        smtpPassword: formData.smtpPassword,
        fromName: formData.fromName,
        secureConnection: formData.secureConnection
      };
      
      // Use the email service to send test email
      const result = await sendTestEmail(emailSettings, testEmail);
      
      if (result.success) {
        setTestResult({
          success: true,
          message: `Test e-postası ${testEmail} adresine başarıyla gönderildi`
        });
      } else {
        setTestResult({
          success: false,
          message: `E-posta gönderilirken bir hata oluştu: ${result.error || 'Bilinmeyen hata'}`
        });
      }
    } catch (error) {
      console.error('E-posta gönderme hatası:', error);
      setTestResult({
        success: false,
        message: `E-posta gönderilirken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Mail className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium text-blue-900">SMTP Ayarları</h4>
        </div>
        <p className="text-sm text-blue-700">
          Bu ayarlar, sistem tarafından gönderilen e-postaların SMTP yapılandırmasını belirler. Kullanıcı bildirimleri, şifre sıfırlama ve otomatik e-postalar için kullanılır.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Sunucu
          </label>
          <input
            type="text"
            value={formData.smtpHost}
            onChange={(e) => handleInputChange('smtpHost', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SMTP Port
          </label>
          <input
            type="number"
            value={formData.smtpPort}
            onChange={(e) => handleInputChange('smtpPort', parseInt(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-posta Adresi
          </label>
          <input
            type="email"
            value={formData.smtpUsername}
            onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Şifre
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={formData.smtpPassword}
              onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            value={formData.fromName}
            onChange={(e) => handleInputChange('fromName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SSL/TLS
          </label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.secureConnection}
            onChange={(e) => handleInputChange('secureConnection', e.target.value)}
          >
            <option value="none">Yok</option>
            <option value="ssl">SSL</option>
            <option value="tls">TLS</option>
          </select>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">E-posta Bildirimleri</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">Yeni Kullanıcı Bildirimi</h5>
              <p className="text-sm text-gray-600">Yeni kullanıcı oluşturulduğunda hoş geldiniz e-postası</p>
            </div>
            <button 
              onClick={() => handleToggle('enableWelcomeEmail')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.enableWelcomeEmail ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.enableWelcomeEmail ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">Şifre Sıfırlama</h5>
              <p className="text-sm text-gray-600">Şifre sıfırlama bağlantıları</p>
            </div>
            <button 
              onClick={() => handleToggle('enablePasswordReset')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.enablePasswordReset ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.enablePasswordReset ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h5 className="font-medium text-gray-900">Güvenlik Uyarıları</h5>
              <p className="text-sm text-gray-600">Şüpheli giriş denemeleri ve güvenlik olayları</p>
            </div>
            <button 
              onClick={() => handleToggle('enableSecurityAlerts')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.enableSecurityAlerts ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.enableSecurityAlerts ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">Test ve Doğrulama</h4>
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
        
        {testResult && (
          <div className={`mt-3 p-3 rounded-lg ${
            testResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            <div className="flex items-center space-x-2">
              {testResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              )}
              <span>{testResult.message}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button 
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          <XCircle className="h-4 w-4" />
          <span>İptal</span>
        </button>
        <button 
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-blue-400 flex items-center space-x-2"
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Kaydediliyor...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Ayarları Kaydet</span>
            </>
          )}
        </button>
      </div>
      
      {saveResult && (
        <div className={`p-3 rounded-lg ${
          saveResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          <div className="flex items-center space-x-2">
            {saveResult.success ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            )}
            <span>{saveResult.message}</span>
          </div>
        </div>
      )}
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <h4 className="font-medium text-yellow-900 mb-1">Gmail SMTP Kullanımı Hakkında</h4>
        </div>
        <p className="text-sm text-yellow-700 ml-8">
          <strong>Gmail Kullanıcıları İçin:</strong> Gmail SMTP sunucusunu kullanıyorsanız, "Daha az güvenli uygulama erişimi"ni etkinleştirmeniz veya bir "Uygulama Şifresi" oluşturmanız gerekebilir.
        </p>
        <p className="text-sm text-yellow-700 mt-2 ml-8"></p>
      </div>
    </div>
  );
};

export default EmailSettings;