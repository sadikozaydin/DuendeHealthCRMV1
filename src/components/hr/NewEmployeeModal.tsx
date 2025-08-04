import React, { useState, useEffect } from 'react';
import { useModalBodyScroll } from '../../hooks/useModalBodyScroll';
import { X, XCircle, UserPlus, User, Shield, FileText, Phone, Mail, Building2, Calendar, AlertTriangle, Info, Eye, EyeOff, Upload, Save, Loader2, CheckCircle, Globe, Key, Users, MapPin, Briefcase, Car as IdCard, Search, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useBranch } from '../../contexts/BranchContext';
import { sendWelcomeEmail } from '../../services/emailService';
import { queryTCIdentity, validateTCKN } from '../../services/tcIdentityService';

interface NewEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmployeeAdded?: () => void;
}

const NewEmployeeModal: React.FC<NewEmployeeModalProps> = ({ 
  isOpen, 
  onClose, 
  onEmployeeAdded 
}) => {
  const { user } = useAuth();
  const { branches } = useBranch();
  
  // Modal açıkken body scroll'unu kapat
  useModalBodyScroll(isOpen);
  
  const [activeTab, setActiveTab] = useState('basic');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isQueryingTC, setIsQueryingTC] = useState(false);
  const [tcQueryResult, setTcQueryResult] = useState<any>(null);
  const [tcError, setTcError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    // Temel Bilgiler
    fullName: '',
    firstName: '',
    lastName: '',
    tcknPassport: '',
    gender: '',
    birthDate: '',
    phone: '',
    email: '',
    department: '',
    position: '',
    startDate: new Date().toISOString().split('T')[0],
    branchId: '',
    
    // Kullanıcı Hesabı
    createUserAccount: false,
    role: 'employee',
    permissions: [],
    username: '',
    password: '',
    passwordConfirm: '',
    languagePreference: 'tr',
    enable2FA: false,
    
    // Evraklar / Ek Bilgiler
    cvFile: null as File | null,
    contractFile: null as File | null,
    certificates: [] as File[],
    notes: ''
  });

  // Departmanlar
  const departments = [
    { id: 'medical', name: 'Tıbbi Departman' },
    { id: 'administrative', name: 'İdari Departman' },
    { id: 'technical', name: 'Teknik Departman' },
    { id: 'sales', name: 'Satış Departmanı' },
    { id: 'finance', name: 'Finans Departmanı' },
    { id: 'hr', name: 'İnsan Kaynakları' },
    { id: 'it', name: 'Bilgi İşlem' },
    { id: 'operations', name: 'Operasyon' }
  ];

  // Roller
  const roles = [
    { id: 'employee', name: 'Personel', description: 'Temel personel yetkileri' },
    { id: 'doctor', name: 'Doktor', description: 'Tıbbi işlemler ve hasta yönetimi' },
    { id: 'nurse', name: 'Hemşire', description: 'Hasta bakımı ve tıbbi destek' },
    { id: 'agent', name: 'Satış Temsilcisi', description: 'Lead yönetimi ve satış' },
    { id: 'coordinator', name: 'Koordinatör', description: 'Süreç koordinasyonu' },
    { id: 'manager', name: 'Yönetici', description: 'Departman yönetimi' },
    { id: 'admin', name: 'Sistem Yöneticisi', description: 'Tam sistem erişimi' }
  ];

  // Dil seçenekleri
  const languages = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Modal dışına tıklayarak kapatma
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Form değişikliklerini izleme
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // E-posta değişirse kullanıcı adını otomatik doldur
      if (field === 'email' && value && !newData.username) {
        newData.username = value.split('@')[0];
      }
      
      // Ad değişirse kullanıcı adını otomatik doldur (e-posta yoksa)
      if (field === 'fullName' && value && !newData.email && !newData.username) {
        newData.username = value.toLowerCase().replace(/\s+/g, '.');
      }
      
      return newData;
    });
  };

  // TC kimlik sorgulama
  const handleTCQuery = async () => {
    const tckn = formData.tcknPassport.replace(/\s/g, ''); // Boşlukları temizle
    
    if (!validateTCKN(tckn)) {
      setTcError('Geçersiz TC kimlik numarası formatı');
      return;
    }
    
    setIsQueryingTC(true);
    setTcError(null);
    setTcQueryResult(null);
    
    try {
      const result = await queryTCIdentity(tckn);
      
      if (result.success && result.data) {
        setTcQueryResult(result.data);
        
        // Form alanlarını otomatik doldur
        setFormData(prev => ({
          ...prev,
          firstName: result.data!.firstName,
          lastName: result.data!.lastName,
          fullName: `${result.data!.firstName} ${result.data!.lastName}`,
          birthDate: result.data!.birthDate,
          gender: result.data!.gender
        }));
        
        setTcError(null);
      } else {
        setTcError(result.error || 'TC kimlik sorgulanamadı');
        setTcQueryResult(null);
      }
    } catch (error) {
      console.error('TC sorgulama hatası:', error);
      setTcError('TC kimlik sorgulama sırasında bir hata oluştu');
    } finally {
      setIsQueryingTC(false);
    }
  };

  // Dosya yükleme
  const handleFileUpload = (field: string, files: FileList | null) => {
    if (!files) return;
    
    if (field === 'certificates') {
      setFormData(prev => ({
        ...prev,
        certificates: [...prev.certificates, ...Array.from(files)]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: files[0]
      }));
    }
  };

  // Sertifika silme
  const removeCertificate = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
  };

  // Form validasyonu
  const validateForm = () => {
    const errors: string[] = [];
    
    // Temel bilgiler kontrolü
    if (!formData.fullName.trim()) errors.push('Ad-Soyad gereklidir');
    if (!formData.tcknPassport.trim()) errors.push('TCKN/Pasaport No gereklidir');
    if (!formData.department) errors.push('Departman seçimi gereklidir');
    if (!formData.position.trim()) errors.push('Görev bilgisi gereklidir');
    if (!formData.startDate) errors.push('İşe başlama tarihi gereklidir');
    if (!formData.branchId) errors.push('Şube/Lokasyon seçimi gereklidir');
    
    // Kullanıcı hesabı kontrolü
    if (formData.createUserAccount) {
      if (!formData.email.trim()) errors.push('Kullanıcı hesabı için e-posta gereklidir');
      if (!formData.username.trim()) errors.push('Kullanıcı adı gereklidir');
      if (!formData.password) errors.push('Parola gereklidir');
      if (formData.password !== formData.passwordConfirm) errors.push('Parolalar eşleşmiyor');
      if (formData.password && formData.password.length < 6) errors.push('Parola en az 6 karakter olmalıdır');
    }
    
    return errors;
  };

  // Form gönderme
  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Personel verisi oluştur
      const employeeData = {
        id: `emp_${Date.now()}`,
        employeeId: `EMP${String(Date.now()).slice(-6)}`,
        name: formData.fullName,
        tcknPassport: formData.tcknPassport,
        gender: formData.gender,
        birthDate: formData.birthDate,
        phone: formData.phone,
        email: formData.email,
        department: formData.department,
        position: formData.position,
        startDate: formData.startDate,
        branchId: formData.branchId,
        status: 'active',
        performance: 0,
        leaveBalance: 15, // Varsayılan yıllık izin
        notes: formData.notes,
        createdAt: new Date().toISOString(),
        createdBy: user?.id
      };

      // LocalStorage'a kaydet
      const existingEmployees = JSON.parse(localStorage.getItem('hr_employees') || '[]');
      existingEmployees.push(employeeData);
      localStorage.setItem('hr_employees', JSON.stringify(existingEmployees));

      // Kullanıcı hesabı oluştur
      if (formData.createUserAccount) {
        const userData = {
          id: `user_${Date.now()}`,
          employeeId: employeeData.id,
          name: formData.fullName,
          email: formData.email,
          username: formData.username,
          role: formData.role,
          permissions: formData.permissions,
          language: formData.languagePreference,
          enable2FA: formData.enable2FA,
          status: 'active',
          createdAt: new Date().toISOString()
        };

        // Kullanıcıları kaydet (gerçek uygulamada ayrı tablo)
        const existingUsers = JSON.parse(localStorage.getItem('system_users') || '[]');
        existingUsers.push(userData);
        localStorage.setItem('system_users', JSON.stringify(existingUsers));

        // Hoş geldiniz e-postası gönder
        try {
          const emailSettings = JSON.parse(localStorage.getItem('emailSettings') || '{}');
          if (emailSettings.smtpHost) {
            await sendWelcomeEmail(emailSettings, userData, formData.password, formData.role);
          }
        } catch (emailError) {
          console.warn('Hoş geldiniz e-postası gönderilemedi:', emailError);
        }
      }

      setSuccess('Personel başarıyla eklendi!');
      
      // Callback çağır
      if (onEmployeeAdded) {
        setTimeout(() => {
          onEmployeeAdded();
          onClose();
        }, 1500);
      }

    } catch (err) {
      console.error('Personel ekleme hatası:', err);
      setError('Personel eklenirken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] transition-opacity duration-300" 
      onClick={handleBackdropClick}
      style={{ margin: 0, padding: 0, top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div 
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full flex flex-col max-h-[90vh]" 
        style={{ margin: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white shadow-md flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">👥 Yeni Personel Ekle</h2>
                <div className="text-blue-100 text-sm">
                  Personel kaydı ve kullanıcı hesabı oluşturma
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="ml-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'basic', label: 'Temel Bilgiler', icon: User, required: true },
              { id: 'account', label: 'Kullanıcı Hesabı', icon: Shield, required: false },
              { id: 'documents', label: 'Evraklar & Ek Bilgiler', icon: FileText, required: false }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.required && <span className="text-red-500">*</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mx-6 mt-4">
            <div className="flex items-center text-green-800">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">{success}</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-6 mt-4">
            <div className="flex items-center text-red-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto flex-grow p-6">
          {/* Temel Bilgiler Sekmesi */}
          {activeTab === 'basic' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Temel Personel Bilgileri</h4>
                </div>
                <p className="text-sm text-blue-700">
                  Personelin temel kimlik ve iş bilgilerini girin. Kırmızı (*) işaretli alanlar zorunludur.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    TCKN / Pasaport No *
                  </label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={formData.tcknPassport}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, ''); // Sadece rakam
                          if (value.length <= 11) {
                            handleInputChange('tcknPassport', value);
                            setTcQueryResult(null);
                            setTcError(null);
                          }
                        }}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="12345678901"
                        maxLength={11}
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleTCQuery}
                      disabled={!formData.tcknPassport || formData.tcknPassport.length !== 11 || isQueryingTC}
                      className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors flex items-center space-x-2"
                    >
                      {isQueryingTC ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                      <span className="hidden sm:inline">
                        {isQueryingTC ? 'Sorgulanıyor...' : 'Sorgula'}
                      </span>
                    </button>
                  </div>
                  
                  {/* TC Sorgulama Sonucu */}
                  {tcQueryResult && (
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">TC Kimlik Doğrulandı</span>
                      </div>
                      <div className="text-xs text-green-700 space-y-1">
                        <p><strong>Ad:</strong> {tcQueryResult.firstName}</p>
                        <p><strong>Soyad:</strong> {tcQueryResult.lastName}</p>
                        <p><strong>Doğum Tarihi:</strong> {new Date(tcQueryResult.birthDate).toLocaleDateString('tr-TR')}</p>
                        <p><strong>Cinsiyet:</strong> {tcQueryResult.gender === 'male' ? 'Erkek' : tcQueryResult.gender === 'female' ? 'Kadın' : 'Belirtilmedi'}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* TC Sorgulama Hatası */}
                  {tcError && (
                    <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-red-800">{tcError}</span>
                      </div>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-1">
                    🔍 TC format kontrolü otomatik yapılır. Gerçek API entegrasyonu için api.turkiye.gov.tr'den başvuru yapılabilir.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad-Soyad *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        tcQueryResult ? 'border-green-300 bg-green-50' : 'border-gray-300'
                      }`}
                      placeholder="Örn: Mehmet Yılmaz"
                      readOnly={!!tcQueryResult}
                      required
                    />
                  </div>
                  {tcQueryResult && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ TC kimlik sorgulamasından otomatik dolduruldu
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cinsiyet
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className={`w-full border rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      tcQueryResult ? 'border-green-300 bg-green-50' : 'border-gray-300'
                    }`}
                    disabled={!!tcQueryResult}
                  >
                    <option value="">Seçiniz</option>
                    <option value="male">Erkek</option>
                    <option value="female">Kadın</option>
                    <option value="other">Belirtilmedi</option>
                  </select>
                  {tcQueryResult && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ TC kimlik sorgulamasından otomatik dolduruldu
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Doğum Tarihi
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        tcQueryResult ? 'border-green-300 bg-green-50' : 'border-gray-300'
                      }`}
                      readOnly={!!tcQueryResult}
                    />
                  </div>
                  {tcQueryResult && (
                    <p className="text-xs text-green-600 mt-1">
                      ✓ TC kimlik sorgulamasından otomatik dolduruldu
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+90 555 123 45 67"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta {formData.createUserAccount && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="mehmet.yilmaz@duendehealth.com"
                      required={formData.createUserAccount}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departman *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Departman Seçiniz</option>
                      {departments.map(dept => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Görevi *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Örn: Kardiyolog, Hemşire, Satış Temsilcisi"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İşe Başlama Tarihi *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şube / Lokasyon *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <select
                      value={formData.branchId}
                      onChange={(e) => handleInputChange('branchId', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Şube Seçiniz</option>
                      {branches.map(branch => (
                        <option key={branch.id} value={branch.id}>{branch.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Kullanıcı Hesabı Sekmesi */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <h4 className="font-medium text-purple-900">Kullanıcı Hesabı Oluşturma</h4>
                </div>
                <p className="text-sm text-purple-700">
                  Bu personel için sistem kullanıcı hesabı oluşturmak istiyorsanız aşağıdaki kutuyu işaretleyin.
                </p>
              </div>

              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
                <input
                  type="checkbox"
                  id="createUserAccount"
                  checked={formData.createUserAccount}
                  onChange={(e) => handleInputChange('createUserAccount', e.target.checked)}
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div>
                  <label htmlFor="createUserAccount" className="text-sm font-medium text-gray-900">
                    Bu personel için kullanıcı hesabı oluştur
                  </label>
                  <p className="text-xs text-gray-600">
                    İşaretlenirse personel sisteme giriş yapabilir
                  </p>
                </div>
              </div>

              {formData.createUserAccount && (
                <div className="space-y-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rol *
                      </label>
                      <select
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        {roles.map(role => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        {roles.find(r => r.id === formData.role)?.description}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dil Tercihi
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                          value={formData.languagePreference}
                          onChange={(e) => handleInputChange('languagePreference', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {languages.map(lang => (
                            <option key={lang.code} value={lang.code}>
                              {lang.flag} {lang.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kullanıcı Adı *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="mehmet.yilmaz"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parola *
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="En az 6 karakter"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Parola Tekrar *
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type={showPasswordConfirm ? 'text' : 'password'}
                          value={formData.passwordConfirm}
                          onChange={(e) => handleInputChange('passwordConfirm', e.target.value)}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Parolayı tekrar girin"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPasswordConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {formData.password && formData.passwordConfirm && formData.password !== formData.passwordConfirm && (
                        <p className="text-xs text-red-600 mt-1">Parolalar eşleşmiyor</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                    <input
                      type="checkbox"
                      id="enable2FA"
                      checked={formData.enable2FA}
                      onChange={(e) => handleInputChange('enable2FA', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div>
                      <label htmlFor="enable2FA" className="text-sm font-medium text-gray-900">
                        İki Faktörlü Kimlik Doğrulama (2FA) etkinleştir
                      </label>
                      <p className="text-xs text-gray-600">
                        Güvenlik için SMS veya e-posta doğrulama gerektirir
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Evraklar & Ek Bilgiler Sekmesi */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-900">Evraklar ve Ek Bilgiler</h4>
                </div>
                <p className="text-sm text-green-700">
                  Personelin özlük dosyası için gerekli evrakları yükleyebilirsiniz. Bu alan isteğe bağlıdır.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CV / Özgeçmiş
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload('cvFile', e.target.files)}
                      className="hidden"
                      id="cv-upload"
                    />
                    <label htmlFor="cv-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">CV yüklemek için tıklayın</p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX</p>
                    </label>
                    {formData.cvFile && (
                      <p className="text-xs text-green-600 mt-2">✓ {formData.cvFile.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İş Sözleşmesi
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload('contractFile', e.target.files)}
                      className="hidden"
                      id="contract-upload"
                    />
                    <label htmlFor="contract-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Sözleşme yüklemek için tıklayın</p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX</p>
                    </label>
                    {formData.contractFile && (
                      <p className="text-xs text-green-600 mt-2">✓ {formData.contractFile.name}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sertifikalar (Çoklu Yükleme)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    multiple
                    onChange={(e) => handleFileUpload('certificates', e.target.files)}
                    className="hidden"
                    id="certificates-upload"
                  />
                  <label htmlFor="certificates-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">Sertifikaları yüklemek için tıklayın</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG • Çoklu seçim yapabilirsiniz</p>
                  </label>
                  
                  {formData.certificates.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {formData.certificates.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                          <span className="text-xs text-gray-700">{file.name}</span>
                          <button
                            onClick={() => removeCertificate(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dahili Notlar
                </label>
                <textarea
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Personel hakkında dahili notlar, özel durumlar..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {formData.createUserAccount ? (
                <span className="flex items-center space-x-1 text-blue-600">
                  <Shield className="h-4 w-4" />
                  <span>Kullanıcı hesabı oluşturulacak</span>
                </span>
              ) : (
                <span>Sadece personel kaydı oluşturulacak</span>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <XCircle className="h-4 w-4" />
                <span>İptal</span>
              </button>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Ekleniyor...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Personeli Ekle</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewEmployeeModal;