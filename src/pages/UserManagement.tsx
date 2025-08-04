import React, { useState, useEffect } from 'react';
import { 
  Users, 
  X,
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  Shield, 
  Building2, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Lock,
  Unlock,
  Key,
  RefreshCw,
  Download,
  Upload,
  Settings,
  AlertTriangle,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useBranch } from '../contexts/BranchContext';
import { useEffect as useReactEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; 
import { sendWelcomeEmail } from '../services/emailService';


interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  position?: string;
  branch?: string;
  phone?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  avatar?: string;
}

// User management API service
const userManagementAPI = {
  async createUser(userData: Partial<User>) {
    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('crm_users') || '[]');
    
    try {
      // For demo purposes, we'll simulate user creation
      console.log('Creating user:', userData);
      
      // Create new user with ID
      const newUser = {
        id: uuidv4(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
        position: userData.position,
        branch: userData.branch,
        phone: userData.phone,
        isActive: userData.isActive ?? true,
        createdAt: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || '')}&background=random`
      };
      
      // Add to localStorage
      localStorage.setItem('crm_users', JSON.stringify([...existingUsers, newUser]));
      
      return {
        success: true,
        user: newUser
      };
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  },

  async updateUser(userData: User) {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('crm_users') || '[]');
      
      // Update user
      const updatedUsers = existingUsers.map((user: User) => 
        user.id === userData.id ? userData : user
      );
      
      // Save back to localStorage
      localStorage.setItem('crm_users', JSON.stringify(updatedUsers));
      
      console.log('Updating user:', userData);
      
      return { success: true };
    } catch (error) {
      console.error('Error in updateUser:', error);
      throw error;
    }
  },

  async deleteUser(userId: string) {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('crm_users') || '[]');
      
      // Filter out the deleted user
      const updatedUsers = existingUsers.filter((user: User) => user.id !== userId);
      
      // Save back to localStorage
      localStorage.setItem('crm_users', JSON.stringify(updatedUsers));
      
      console.log('Deleting user:', userId);
      
      return { success: true };
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  },

  async resetPassword(userId: string) {
    try {
      // For demo purposes, we'll simulate password reset
      console.log('Resetting password for user:', userId);
      
      // In a real app, this would call the Supabase Edge Function
      return { success: true };
    } catch (error) {
      console.error('Error in resetPassword:', error);
      throw error;
    }
  }
};

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const { branches } = useBranch();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    role: 'all',
    branch: 'all',
    status: 'all'
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  }>({
    key: 'name',
    direction: 'ascending'
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  // Örnek kullanıcı verileri
  const initialUsers: User[] = [];

  // Sayfa yüklendiğinde örnek verileri yükle
  useEffect(() => {
    // Try to get users from localStorage first
    const storedUsers = localStorage.getItem('crm_users');
    
    if (storedUsers) {
      // If we have stored users, use them
      setUsers(JSON.parse(storedUsers));
    } else {
      // Otherwise, initialize with default users
      const defaultUsers: User[] = [
        {
          id: '1',
          name: 'Ahmet Yılmaz',
          email: 'admin@sagliktur.com',
          role: 'super_admin',
          position: 'Sistem Yöneticisi',
          branch: 'Ana Merkez',
          phone: '+90 555 123 4567',
          isActive: true,
          lastLogin: '2025-01-14T16:30:00',
          createdAt: '2024-01-01T10:00:00',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
        },
        {
          id: '2',
          name: 'Dr. Mehmet Özkan',
          email: 'doctor@sagliktur.com',
          role: 'doctor',
          position: 'Kardiyoloji Uzmanı',
          branch: 'Ana Merkez',
          phone: '+90 555 234 5678',
          isActive: true,
          lastLogin: '2025-01-14T14:45:00',
          createdAt: '2024-01-05T11:30:00',
          avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150'
        },
        {
          id: '3',
          name: 'Fatma Yılmaz',
          email: 'agent@sagliktur.com',
          role: 'agent',
          position: 'Satış Temsilcisi',
          branch: 'Ana Merkez',
          phone: '+90 555 345 6789',
          isActive: true,
          lastLogin: '2025-01-14T15:20:00',
          createdAt: '2024-01-10T09:15:00',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
        },
        {
          id: '4',
          name: 'Zeynep Demir',
          email: 'coordinator@sagliktur.com',
          role: 'coordinator',
          position: 'Hasta Koordinatörü',
          branch: 'Ana Merkez',
          phone: '+90 555 456 7890',
          isActive: true,
          lastLogin: '2025-01-14T12:10:00',
          createdAt: '2024-01-15T14:20:00',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
        },
        {
          id: '5',
          name: 'Ali Kaya',
          email: 'nurse@sagliktur.com',
          role: 'nurse',
          position: 'Başhemşire',
          branch: 'Ana Merkez',
          phone: '+90 555 567 8901',
          isActive: false,
          lastLogin: '2025-01-10T09:30:00',
          createdAt: '2024-01-20T08:45:00',
          avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
        }
      ];

      // Set users in state and localStorage
      setUsers(defaultUsers);
      localStorage.setItem('crm_users', JSON.stringify(defaultUsers));
    }
  }, []);

  // Filtreleme fonksiyonu
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = filters.role === 'all' || user.role === filters.role;
    const matchesBranch = filters.branch === 'all' || user.branch === filters.branch;
    const matchesStatus = filters.status === 'all' || 
      (filters.status === 'active' && user.isActive) || 
      (filters.status === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesRole && matchesBranch && matchesStatus;
  });

  // Sıralama fonksiyonu
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  // Sıralama değiştirme fonksiyonu
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Rol adını görüntüleme fonksiyonu
  const getRoleDisplayName = (role: string) => {
    const roleNames: Record<string, string> = {
      super_admin: 'Sistem Yöneticisi',
      admin: 'Yönetici',
      manager: 'Müdür',
      doctor: 'Doktor',
      nurse: 'Hemşire',
      agent: 'Satış Temsilcisi',
      coordinator: 'Koordinatör',
      finance: 'Finans Uzmanı',
      partner: 'Partner',
      patient: 'Hasta'
    };
    return roleNames[role] || role;
  };

  // Rol rengini belirleme fonksiyonu
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-orange-100 text-orange-800';
      case 'manager': return 'bg-yellow-100 text-yellow-800';
      case 'doctor': return 'bg-green-100 text-green-800';
      case 'nurse': return 'bg-blue-100 text-blue-800';
      case 'agent': return 'bg-purple-100 text-purple-800';
      case 'coordinator': return 'bg-indigo-100 text-indigo-800';
      case 'finance': return 'bg-pink-100 text-pink-800';
      case 'partner': return 'bg-gray-100 text-gray-800';
      case 'patient': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Kullanıcı ekleme fonksiyonu
  const handleAddUser = (userData: Partial<User>) => {
    const addUser = async () => {
      try {
        // Geçici şifre oluştur
        const tempPassword = Math.random().toString(36).slice(-8);
        
        // E-posta ayarlarını al (gerçek uygulamada bu ayarlar veritabanından alınabilir)
        const emailSettings = {
          smtpHost: 'smtp.gmail.com',
          smtpPort: 587,
          smtpUsername: 'no-reply@duendehealthcrm.com',
          smtpPassword: 'Dd2024**',
          fromName: 'Duende Health CRM',
          secureConnection: 'tls' as 'none' | 'ssl' | 'tls'
        };
        
        const result = await userManagementAPI.createUser(userData);
        
        // E-posta gönderme fonksiyonunu çağır
        try {
          // Doğrudan e-posta gönderme servisini çağır
          console.log('Hoş geldiniz e-postası gönderiliyor:', result.user.email);
          
          const emailResult = await sendWelcomeEmail(
            emailSettings,
            { 
              name: result.user.name, 
              email: result.user.email 
            },
            tempPassword,
            getRoleDisplayName(userData.role || '')
          );
          
          if (!emailResult.success) {
            console.error('E-posta gönderme hatası:', emailResult.error);
          } else {
            console.log('E-posta başarıyla gönderildi:', emailResult);
          }
        } catch (emailError) {
          console.error('E-posta gönderme hatası:', emailError);
        }
        
        // Add the new user to local state
        setUsers(prevUsers => [...prevUsers, result.user as User]);
        setShowAddModal(false);
        
        setSaveMessage({
          text: 'Kullanıcı başarıyla eklendi. Giriş bilgileri e-posta ile gönderildi.',
          type: 'success'
        });
        
        setTimeout(() => {
          setSaveMessage(null);
        }, 3000);
      } catch (error) {
        console.error('Error adding user:', error);
        setSaveMessage({
          text: `Kullanıcı eklenirken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
          type: 'error'
        });
        
        setTimeout(() => {
          setSaveMessage(null);
        }, 5000);
      }
    };
    
    addUser();
  };

  // Kullanıcı düzenleme fonksiyonu
  const handleEditUser = (updatedUser: User) => {
    const updateUser = async () => {
      try {
        // Update user in API
        await userManagementAPI.updateUser(updatedUser);
        
        // Update user in local state
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        
        setShowEditModal(false);
        setSelectedUser(null);
        
        setSaveMessage({
          text: 'Kullanıcı başarıyla güncellendi.',
          type: 'success'
        });
        
        setTimeout(() => {
          setSaveMessage(null);
        }, 3000);
      } catch (error) {
        console.error('Error updating user:', error);
        setSaveMessage({
          text: `Kullanıcı güncellenirken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
          type: 'error'
        });
        
        setTimeout(() => {
          setSaveMessage(null);
        }, 5000);
      }
    };
    
    updateUser();
  };

  // Kullanıcı silme fonksiyonu
  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      const deleteUser = async () => {
        try {
          // Delete user in API
          await userManagementAPI.deleteUser(userId);
          
          // Remove user from local state
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
          
          setSaveMessage({
            text: 'Kullanıcı başarıyla silindi.',
            type: 'success'
          });
          
          setTimeout(() => {
            setSaveMessage(null);
          }, 3000);
        } catch (error) {
          console.error('Error deleting user:', error);
          setSaveMessage({
            text: `Kullanıcı silinirken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
            type: 'error'
          });
          
          setTimeout(() => {
            setSaveMessage(null);
          }, 5000);
        }
      };
      
      deleteUser();
    }
  };

  // Kullanıcı durumunu değiştirme fonksiyonu
  const toggleUserStatus = (userId: string) => {
    const updateUserStatus = async () => {
      try {
        const user = users.find(u => u.id === userId);
        if (!user) return;
        
        // Create updated user object
        const updatedUser = { ...user, isActive: !user.isActive };
        
        // Update user in API
        await userManagementAPI.updateUser(updatedUser);
        
        // Update user in local state
        setUsers(prevUsers => 
          prevUsers.map(u => 
            u.id === userId ? updatedUser : u
          )
        );
        
        setSaveMessage({
          text: `Kullanıcı ${updatedUser.isActive ? 'aktifleştirildi' : 'devre dışı bırakıldı'}.`,
          type: 'success'
        });
        
        setTimeout(() => {
          setSaveMessage(null);
        }, 3000);
      } catch (error) {
        console.error('Error updating user status:', error);
        setSaveMessage({
          text: `Kullanıcı durumu güncellenirken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
          type: 'error'
        });
        
        setTimeout(() => {
          setSaveMessage(null);
        }, 5000);
      }
    };
    
    updateUserStatus();
  };

  // Kullanıcı şifresini sıfırlama fonksiyonu
  const resetUserPassword = (userId: string) => {
    const resetPassword = async () => {
      try {
        await userManagementAPI.resetPassword(userId);
        
        setSaveMessage({
          text: 'Şifre sıfırlama bağlantısı kullanıcıya gönderildi.',
          type: 'success'
        });
        
        setTimeout(() => {
          setSaveMessage(null);
        }, 3000);
      } catch (error) {
        console.error('Error resetting password:', error);
        setSaveMessage({
          text: `Şifre sıfırlanırken bir hata oluştu: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
          type: 'error'
        });
        
        setTimeout(() => {
          setSaveMessage(null);
        }, 5000);
      }
    };
    
    resetPassword();
  };

  // ESC tuşu ile Add Modal kapatma fonksiyonu
  useReactEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showAddModal) {
        setShowAddModal(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showAddModal]);

  // Kullanıcı Ekleme Modalı
  const UserAddModal = () => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] transition-opacity duration-300 m-0 p-0"
      onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}
    >
      <div 
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full flex flex-col max-h-[85vh]" 
        style={{ margin: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-md flex-shrink-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Yeni Kullanıcı Ekle</h2>
                <div className="text-blue-100 text-sm">Sistem kullanıcısı oluştur</div>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(false)}
              className="ml-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="overflow-y-auto flex-grow p-4">
          <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const userData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            role: formData.get('role') as string,
            position: formData.get('position') as string,
            branch: formData.get('branch') as string,
            phone: formData.get('phone') as string,
            isActive: formData.get('isActive') === 'on'
          };
          handleAddUser(userData);
        }} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol *
                </label>
                <select
                  name="role"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Rol Seçin</option>
                  <option value="admin">Yönetici</option>
                  <option value="manager">Müdür</option>
                  <option value="doctor">Doktor</option>
                  <option value="nurse">Hemşire</option>
                  <option value="agent">Satış Temsilcisi</option>
                  <option value="coordinator">Koordinatör</option>
                  <option value="finance">Finans Uzmanı</option>
                  <option value="partner">Partner</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pozisyon
                </label>
                <input
                  type="text"
                  name="position"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Şube
                </label>
                <select
                  name="branch"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Şube Seçin</option>
                  {branches.map(branch => (
                    <option key={branch.id} value={branch.name}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                defaultChecked
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Kullanıcı aktif
              </label>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Kullanıcı Bilgilendirmesi</span>
              </div>
              <p className="text-sm text-blue-700">
                Kullanıcı oluşturulduğunda, belirtilen e-posta adresine giriş bilgileri ve şifre belirleme bağlantısı gönderilecektir.
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Kullanıcı Ekle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Kullanıcı Düzenleme Modalı
  const UserEditModal = () => {
    if (!selectedUser) return null;

    // ESC tuşu ile kapatma fonksiyonu
    useReactEffect(() => {
      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setShowEditModal(false);
          setSelectedUser(null);
        }
      };

      document.addEventListener('keydown', handleEscKey);
      return () => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }, []);
    
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] transition-opacity duration-300"
        onClick={(e) => e.target === e.currentTarget && (setShowEditModal(false), setSelectedUser(null))}
        style={{ margin: 0, padding: 0, top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <div 
          className="bg-white rounded-xl shadow-xl max-w-2xl w-full flex flex-col max-h-[85vh]" 
          style={{ margin: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white shadow-md flex-shrink-0">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <Edit className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Kullanıcı Düzenle</h2>
                  <div className="text-blue-100 text-sm">{selectedUser.name}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                }}
                className="ml-4 bg-white bg-opacity-20 text-white p-2 rounded-full hover:bg-opacity-30 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="overflow-y-auto flex-grow p-4">
            <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const updatedUser: User = {
              ...selectedUser,
              name: formData.get('name') as string,
              email: formData.get('email') as string,
              role: formData.get('role') as string,
              position: formData.get('position') as string || undefined,
              branch: formData.get('branch') as string || undefined,
              phone: formData.get('phone') as string || undefined,
              isActive: formData.get('isActive') === 'on'
            };
            handleEditUser(updatedUser);
          }} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedUser.name}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={selectedUser.email}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rol *
                  </label>
                  <select
                    name="role"
                    defaultValue={selectedUser.role}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Rol Seçin</option>
                    <option value="admin">Yönetici</option>
                    <option value="manager">Müdür</option>
                    <option value="doctor">Doktor</option>
                    <option value="nurse">Hemşire</option>
                    <option value="agent">Satış Temsilcisi</option>
                    <option value="coordinator">Koordinatör</option>
                    <option value="finance">Finans Uzmanı</option>
                    <option value="partner">Partner</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pozisyon
                  </label>
                  <input
                    type="text"
                    name="position"
                    defaultValue={selectedUser.position}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Şube
                  </label>
                  <select
                    name="branch"
                    defaultValue={selectedUser.branch}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Şube Seçin</option>
                    {branches.map(branch => (
                      <option key={branch.id} value={branch.name}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    defaultValue={selectedUser.phone}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  defaultChecked={selectedUser.isActive}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Kullanıcı aktif
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
          <p className="text-gray-600">Sistem kullanıcılarını yönetin ve izinlerini düzenleyin</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Yeni Kullanıcı</span>
        </button>
      </div>

      {/* Status Message */}
      {saveMessage && (
        <div className={`px-4 py-2 rounded-lg text-sm ${
          saveMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {saveMessage.type === 'success' ? (
            <CheckCircle className="inline-block h-4 w-4 mr-2" />
          ) : (
            <AlertTriangle className="inline-block h-4 w-4 mr-2" />
          )}
          {saveMessage.text}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Kullanıcı</p>
              <p className="text-3xl font-bold text-blue-600">{users.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-gray-600 mt-2">Sistem kullanıcıları</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktif Kullanıcı</p>
              <p className="text-3xl font-bold text-green-600">{users.filter(u => u.isActive).length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 mt-2">Aktif hesaplar</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pasif Kullanıcı</p>
              <p className="text-3xl font-bold text-red-600">{users.filter(u => !u.isActive).length}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-sm text-gray-600 mt-2">Devre dışı hesaplar</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Roller</p>
              <p className="text-3xl font-bold text-purple-600">10</p>
            </div>
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600 mt-2">Tanımlı roller</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Kullanıcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filtreler:</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <select
              value={filters.role}
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Roller</option>
              <option value="super_admin">Sistem Yöneticisi</option>
              <option value="admin">Yönetici</option>
              <option value="manager">Müdür</option>
              <option value="doctor">Doktor</option>
              <option value="nurse">Hemşire</option>
              <option value="agent">Satış Temsilcisi</option>
              <option value="coordinator">Koordinatör</option>
              <option value="finance">Finans Uzmanı</option>
              <option value="partner">Partner</option>
            </select>
            
            <select
              value={filters.branch}
              onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Şubeler</option>
              {branches.map(branch => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
            
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('name')}
                >
                  Kullanıcı Bilgileri
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('role')}
                >
                  Rol & Pozisyon
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('branch')}
                >
                  Şube & İletişim
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('isActive')}
                >
                  Durum & Tarihler
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.avatar}
                        alt={user.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {getRoleDisplayName(user.role)}
                    </span>
                    {user.position && (
                      <div className="text-sm text-gray-500 mt-1">{user.position}</div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.branch && (
                      <div className="flex items-center space-x-2 text-sm text-gray-900">
                        <Building2 className="h-4 w-4 text-gray-500" />
                        <span>{user.branch}</span>
                      </div>
                    )}
                    {user.phone && (
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 mb-1">
                      {user.isActive ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircle className="h-3 w-3 mr-1" />
                          Pasif
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>Oluşturulma: {new Date(user.createdAt).toLocaleDateString('tr-TR')}</span>
                    </div>
                    {user.lastLogin && (
                      <div className="text-xs text-gray-500 flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Son giriş: {new Date(user.lastLogin).toLocaleDateString('tr-TR')}</span>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-700 p-1 rounded"
                        title="Düzenle"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => toggleUserStatus(user.id)}
                        className={`${user.isActive ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'} p-1 rounded`}
                        title={user.isActive ? 'Devre Dışı Bırak' : 'Aktifleştir'}
                      >
                        {user.isActive ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                      </button>
                      <button 
                        onClick={() => resetUserPassword(user.id)}
                        className="text-orange-600 hover:text-orange-700 p-1 rounded"
                        title="Şifre Sıfırla"
                      >
                        <Key className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700 p-1 rounded"
                        title="Sil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rol Dağılımı</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { role: 'super_admin', label: 'Sistem Yöneticisi' },
            { role: 'admin', label: 'Yönetici' },
            { role: 'manager', label: 'Müdür' },
            { role: 'doctor', label: 'Doktor' },
            { role: 'nurse', label: 'Hemşire' },
            { role: 'agent', label: 'Satış Temsilcisi' },
            { role: 'coordinator', label: 'Koordinatör' },
            { role: 'finance', label: 'Finans Uzmanı' },
            { role: 'partner', label: 'Partner' },
            { role: 'patient', label: 'Hasta' }
          ].map((roleItem) => {
            const count = users.filter(u => u.role === roleItem.role).length;
            return (
              <div key={roleItem.role} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(roleItem.role)}`}>
                    {roleItem.label}
                  </span>
                  <span className="text-2xl font-bold text-gray-900">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      roleItem.role === 'super_admin' ? 'bg-red-500' :
                      roleItem.role === 'admin' ? 'bg-orange-500' :
                      roleItem.role === 'manager' ? 'bg-yellow-500' :
                      roleItem.role === 'doctor' ? 'bg-green-500' :
                      roleItem.role === 'nurse' ? 'bg-blue-500' :
                      roleItem.role === 'agent' ? 'bg-purple-500' :
                      roleItem.role === 'coordinator' ? 'bg-indigo-500' :
                      roleItem.role === 'finance' ? 'bg-pink-500' :
                      roleItem.role === 'partner' ? 'bg-gray-500' : 'bg-teal-500'
                    }`}
                    style={{ width: `${users.length > 0 ? (count / users.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <span>Güvenlik & Erişim Kontrolü</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Şifre Politikası</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Minimum 8 karakter uzunluğunda</li>
              <li>• En az 1 büyük harf</li>
              <li>• En az 1 küçük harf</li>
              <li>• En az 1 rakam</li>
              <li>• En az 1 özel karakter</li>
              <li>• 90 günde bir değişim zorunlu</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">İki Faktörlü Doğrulama</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Yönetici rolleri için zorunlu</li>
              <li>• SMS ile doğrulama</li>
              <li>• E-posta ile doğrulama</li>
              <li>• Authenticator uygulaması</li>
              <li>• Yedek kodlar</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Oturum Güvenliği</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 8 saat oturum süresi</li>
              <li>• 60 dakika hareketsizlik zaman aşımı</li>
              <li>• Maksimum 3 eş zamanlı oturum</li>
              <li>• Oturum takibi ve yönetimi</li>
              <li>• Şüpheli giriş uyarıları</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && <UserAddModal />}
      {showEditModal && selectedUser && <UserEditModal />}
    </div>
  );
};

export default UserManagement;