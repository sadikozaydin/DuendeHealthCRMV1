import React, { useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Eye, EyeOff, Shield, Globe, Building2, Smartphone, AlertTriangle, CheckCircle, Loader2, Lock, User, Mail, Phone, Key, Languages, MapPin, Stethoscope, Heart, ChevronsDownUp as ChevronUpDown, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBranch } from '../contexts/BranchContext';
import { useTranslation } from 'react-i18next';

interface LoginFormData {
  identifier: string;
  password: string;
  twoFactorCode: string;
  selectedBranch: string;
  language: string;
  privacyConsent: boolean;
  kvkkConsent: boolean;
}

const Login = () => {
  const { login, isLoading, error } = useAuth();
  const { branches, branchSettings } = useBranch();
  const { t, i18n } = useTranslation();
  
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: '',
    password: '',
    twoFactorCode: '',
    selectedBranch: '',
    language: i18n.language || 'tr',
    privacyConsent: false,
    kvkkConsent: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [loginType, setLoginType] = useState<'email' | 'username' | 'phone'>('email');
  const [securityWarnings, setSecurityWarnings] = useState<string[]>([]);
  const [attemptCount, setAttemptCount] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Dil seçenekleri
  const languageOptions = React.useMemo(() => [
    { code: 'tr', name: 'Türkçe', flag: '/tr.png' },
    { code: 'en', name: 'English', flag: '/en.png' },
    { code: 'ar', name: 'العربية', flag: '/ar.png' },
    { code: 'es', name: 'Español', flag: '/es.png' },
    { code: 'de', name: 'Deutsch', flag: '/de.png' },
    { code: 'fr', name: 'Français', flag: '/fr.png' },
    { code: 'ru', name: 'Русский', flag: '/ru.png' }
  ], []);

  // Memoized current language data
  const currentLanguageData = React.useMemo(() => 
    languageOptions.find(lang => lang.code === formData.language) || languageOptions[0],
    [languageOptions, formData.language]
  );

  // Giriş türü tespiti
  const detectLoginType = React.useCallback((value: string) => {
    if (value.includes('@')) return 'email';
    if (value.match(/^\+?[\d\s-()]+$/)) return 'phone';
    return 'username';
  }, []);

  // Form değişiklik handler'ı
  const handleInputChange = React.useCallback((field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Dil değişikliği
    if (field === 'language' && typeof value === 'string') {
      i18n.changeLanguage(value);
    }

    // Password validation - sadece uyarı amaçlı, giriş engellemez
    if (field === 'password' && typeof value === 'string' && value.length > 0 && value.length < 6) {
      setPasswordError('Şifre çok kısa olabilir');
    } else {
      setPasswordError(null);
    }
    
    if (field === 'identifier' && typeof value === 'string') {
      setLoginType(detectLoginType(value));
    }
  }, [detectLoginType, i18n]);

  // Güvenlik kontrolü
  const performSecurityCheck = () => {
    const warnings: string[] = [];
    
    // Çoklu başarısız giriş kontrolü
    if (attemptCount >= 3) {
      warnings.push('Çoklu başarısız giriş denemesi tespit edildi');
    }
    
    // KVKK onay kontrolü
    if (!formData.kvkkConsent) {
      warnings.push('KVKK aydınlatma metni onayı gereklidir');
    }
    
    setSecurityWarnings(warnings);
    return formData.kvkkConsent; // Sadece KVKK onayı yeterli
  };

  // 2FA kod gönderme
  const send2FACode = async () => {
    try {
      // API call to send 2FA code
      setShow2FA(true);
    } catch (error) {
      console.error('2FA kod gönderme hatası:', error);
    }
  };

  // Login form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!performSecurityCheck()) {
      return;
    }

    if (isBlocked) {
      alert(`Hesabınız ${Math.ceil(blockTimeRemaining / 60)} dakika boyunca bloke edilmiştir.`);
      return;
    }

    try {
      await login({
        identifier: formData.identifier,
        password: formData.password,
        twoFactorCode: formData.twoFactorCode,
        branch: formData.selectedBranch,
        language: formData.language,
        loginType
      });
    } catch (error) {
      setAttemptCount(prev => prev + 1);
      
      // 5 başarısız denemeden sonra 30 dakika bloke
      if (attemptCount >= 4) {
        setIsBlocked(true);
        setBlockTimeRemaining(30 * 60); // 30 dakika
      }
    }
  };

  // Bloke süresi sayacı
  useEffect(() => {
    if (isBlocked && blockTimeRemaining > 0) {
      const timer = setInterval(() => {
        setBlockTimeRemaining(prev => {
          if (prev <= 1) {
            setIsBlocked(false);
            setAttemptCount(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isBlocked, blockTimeRemaining]);

  // Placeholder metni
  const getPlaceholder = () => {
    switch (loginType) {
      case 'email': return t('login.emailPlaceholder');
      case 'phone': return 'Telefon numaranız';
      case 'username': return t('login.username');
      default: return 'E-posta, telefon veya kullanıcı adı';
    }
  };

  // Icon seçimi
  const getInputIcon = () => {
    switch (loginType) {
      case 'email': return <Mail className="h-5 w-5 text-gray-400" />;
      case 'phone': return <Phone className="h-5 w-5 text-gray-400" />;
      case 'username': return <User className="h-5 w-5 text-gray-400" />;
      default: return <User className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo ve Başlık */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img 
                src="/icon_health.png" 
                alt="Health Icon" 
                className="h-20 w-20 object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{t('login.title')}</h1>
          <p className="text-gray-600 mt-2">{t('login.subtitle')}</p>
          
          {/* Şube Seçimi (Çoklu şube varsa) */}
          {branchSettings.isMultiBranch && (
            <div className="mt-4">
              <select
                value={formData.selectedBranch}
                onChange={(e) => handleInputChange('selectedBranch', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white text-gray-900"
              >
                <option value="">Şube Seçiniz</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name} - {branch.address}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Login Form */}
        <div className="bg-white border-gray-100 rounded-2xl shadow-xl p-8 border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dil Seçimi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Languages className="inline h-4 w-4 mr-1 text-gray-600" />
                {t('login.language')}
              </label>
              <Listbox value={formData.language} onChange={(value) => handleInputChange('language', value)}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-3 pl-4 pr-10 text-left shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500">
                    <span className="flex items-center">
                      <img 
                        src={currentLanguageData.flag} 
                        alt={currentLanguageData.name}
                        className="w-8 h-8 mr-3 object-cover rounded border border-gray-200 shadow-sm"
                      />
                      <span className="block truncate text-gray-900">
                        {currentLanguageData.name}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDown
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {languageOptions.map((language) => (
                        <Listbox.Option
                          key={language.code}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-4 pr-4 ${
                              active ? 'bg-red-100 text-red-900' : 'text-gray-900'
                            }`
                          }
                          value={language.code}
                        >
                          {({ selected }) => (
                            <div className="flex items-center">
                              <img 
                                src={language.flag} 
                                alt={language.name}
                                className="w-8 h-8 mr-3 object-cover rounded border border-gray-200 shadow-sm"
                              />
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {language.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-600">
                                  <Check className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            {/* Kullanıcı Girişi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('login.loginInfo')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  {getInputIcon()}
                </div>
                <input
                  type="text"
                  value={formData.identifier}
                  onChange={(e) => handleInputChange('identifier', e.target.value)}
                  placeholder={getPlaceholder()}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                E-posta, telefon numarası veya kullanıcı adınızı girebilirsiniz
              </p>
            </div>

            {/* Şifre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('login.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Şifrenizi girin"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${passwordError ? 'border-yellow-300 bg-yellow-50' : 'border-gray-300 bg-white text-gray-900'}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-600 mt-1">
                  ⚠️ {passwordError}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Demo şifre: <span className="font-mono bg-gray-100 px-1 rounded">123456</span>
              </p>
            </div>

            {/* Demo Bilgiler */}
            <div className="bg-blue-50 border-blue-200 border rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">
                🔐 {t('login.demoCredentials')}
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-blue-800 mb-2">Kullanıcı Adı / Şifre:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <p className="text-blue-700 font-mono text-xs">admin / 123456</p>
                      <p className="text-blue-600 text-xs">Sistem Yöneticisi</p>
                    </div>
                    <div>
                      <p className="text-blue-700 font-mono text-xs">yonetici / 123456</p>
                      <p className="text-blue-600 text-xs">Yönetici</p>
                    </div>
                    <div>
                      <p className="text-blue-700 font-mono text-xs">mudur / 123456</p>
                      <p className="text-blue-600 text-xs">Müdür</p>
                    </div>
                    <div>
                      <p className="text-blue-700 font-mono text-xs">doktor / 123456</p>
                      <p className="text-blue-600 text-xs">Doktor</p>
                    </div>
                    <div>
                      <p className="text-blue-700 font-mono text-xs">satis / 123456</p>
                      <p className="text-blue-600 text-xs">Satış Temsilcisi</p>
                    </div>
                    <div>
                      <p className="text-blue-700 font-mono text-xs">koordinator / 123456</p>
                      <p className="text-blue-600 text-xs">Koordinatör</p>
                    </div>
                    <div>
                      <p className="text-blue-700 font-mono text-xs">hasta / 123456</p>
                      <p className="text-blue-600 text-xs">Hasta</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-blue-200 pt-2">
                  <p className="text-xs text-blue-600">
                    💡 E-posta ile de giriş yapabilirsiniz: admin@sagliktur.com, doktor@sagliktur.com vb.
                  </p>
                </div>
              </div>
            </div>

            {/* 2FA Kodu (Gerekirse) */}
            {show2FA && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Shield className="inline h-4 w-4 mr-1" />
                  İki Faktörlü Doğrulama Kodu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Key className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.twoFactorCode}
                    onChange={(e) => handleInputChange('twoFactorCode', e.target.value)}
                    placeholder="6 haneli kod"
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-center text-lg tracking-widest"
                  />
                </div>
                <button
                  type="button"
                  onClick={send2FACode}
                  className="text-sm text-red-600 hover:text-red-700 mt-1"
                >
                  Kodu tekrar gönder
                </button>
              </div>
            )}

            {/* KVKK ve Gizlilik Onayları */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="kvkk"
                  checked={formData.kvkkConsent}
                  onChange={(e) => handleInputChange('kvkkConsent', e.target.checked)}
                  className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="kvkk" className="text-sm text-gray-700">
                  <span className="font-medium text-red-600">*</span> 
                  {t('login.kvkkConsent')}
                </label>
              </div>
              
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={formData.privacyConsent}
                  onChange={(e) => handleInputChange('privacyConsent', e.target.checked)}
                  className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="privacy" className="text-sm text-gray-700">
                  {t('login.marketingConsent')}
                </label>
              </div>
            </div>

            {/* Güvenlik Uyarıları */}
            {securityWarnings.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                  <span className="font-medium text-red-800">Güvenlik Uyarıları</span>
                </div>
                <ul className="text-sm text-red-700 space-y-1">
                  {securityWarnings.map((warning, index) => (
                    <li key={index}>• {warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Hata Mesajı */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-sm text-red-800">{error}</span>
                </div>
              </div>
            )}

            {/* Bloke Uyarısı */}
            {isBlocked && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-red-600 mr-2" />
                  <div>
                    <span className="font-medium text-red-800">Hesap Geçici Olarak Bloke Edildi</span>
                    <p className="text-sm text-red-700 mt-1">
                      Kalan süre: {Math.floor(blockTimeRemaining / 60)}:{(blockTimeRemaining % 60).toString().padStart(2, '0')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Giriş Butonu */}
            <button
              type="submit"
              disabled={isLoading || isBlocked || !formData.kvkkConsent || !formData.identifier || !formData.password}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>{t('login.loggingIn')}</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>{t('login.login')}</span>
                </>
              )}
            </button>

            {/* Şifre Sıfırlama */}
            <div className="text-center">
              <a
                href="/reset-password"
                className="text-sm text-red-600 hover:text-red-700 underline"
              >
                {t('login.forgotPassword')}
              </a>
            </div>
          </form>
        </div>

        {/* Rol Bazlı Açıklama */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-800">{t('login.accessInfo')}</span>
          </div>
          <p className="text-sm text-blue-700">{t('login.securityInfo')}</p>
        </div>

        {/* Güvenlik Bilgileri */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>🔒 {t('login.security.ssl')}</p>
          <p>🛡️ {t('login.security.compliance')}</p>
          <p>📱 {t('login.security.mfa')}</p>
          <p className="mt-2">© 2025 Duende Health CRM v1.0.1. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;