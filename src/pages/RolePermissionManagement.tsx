import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock, 
  Key, 
  UserCheck, 
  UserX, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  RefreshCw, 
  MoreHorizontal,
  Building2,
  MapPin,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Activity,
  BarChart3,
  FileText,
  Database,
  Bell,
  Mail,
  MessageCircle,
  Phone,
  CreditCard,
  Package,
  Calendar,
  Plane,
  Stethoscope,
  Heart,
  User,
  Crown,
  Star,
  Award,
  Target,
  Zap,
  Bot,
  Wifi,
  WifiOff,
  Server,
  Cloud,
  HardDrive,
  Network,
  Router,
  Cpu,
  Memory,
  Fingerprint,
  Scan,
  QrCode,
  Camera,
  Mic,
  Video,
  Headphones,
  Volume2,
  VolumeX,
  Copy,
  Share2,
  ExternalLink,
  Link,
  Hash,
  AtSign,
  Percent,
  DollarSign,
  Euro,
  Banknote,
  Timer,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  RotateCw,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  Move,
  MousePointer,
  Hand,
  Grab,
  Navigation,
  Compass,
  Map,
  Flag,
  Bookmark,
  Tag,
  Folder,
  FolderOpen,
  Archive,
  Inbox,
  Outbox,
  Send,
  Paperclip,
  Image,
  FileImage,
  FilePlus,
  FileX,
  FileCheck,
  FileClock,
  FileEdit,
  FileSearch,
  FileType,
  FileWarning,
  Layers,
  Layout,
  LayoutDashboard,
  Grid,
  List,
  Table,
  Columns,
  Rows,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Pentagon,
  Octagon,
  Diamond,
  Heart as HeartIcon,
  Star as StarIcon,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  Wind,
  Thermometer,
  Droplets,
  Flame,
  Snowflake,
  Umbrella,
  Rainbow,
  Sunrise,
  Sunset,
  Mountain,
  Trees,
  Flower,
  Leaf,
  Seedling,
  Cactus,
  PalmTree,
  Evergreen,
  Deciduous,
  Mushroom,
  Bug,
  Butterfly,
  Bird,
  Fish,
  Rabbit,
  Turtle,
  Snail,
  Ant,
  Bee,
  Ladybug,
  Spider,
  Worm,
  Feather,
  Paw,
  Bone,
  Egg,
  Milk,
  Cheese,
  Bread,
  Cookie,
  Cake,
  Pizza,
  Hamburger,
  Sandwich,
  Taco,
  Burrito,
  Hotdog,
  Fries,
  Popcorn,
  Pretzel,
  Bagel,
  Croissant,
  Waffle,
  Pancakes,
  Bacon,
  Sausage,
  Chicken,
  Turkey,
  Beef,
  Pork,
  Lamb,
  Shrimp,
  Lobster,
  Crab,
  Oyster,
  Clam,
  Squid,
  Octopus,
  Jellyfish,
  Shark,
  Whale,
  Dolphin,
  Seal,
  Penguin,
  Polar,
  Bear,
  Lion,
  Tiger,
  Leopard,
  Cheetah,
  Jaguar,
  Panther,
  Wolf,
  Fox,
  Dog,
  Cat,
  Horse,
  Cow,
  Pig,
  Sheep,
  Goat,
  Deer,
  Elk,
  Moose,
  Buffalo,
  Elephant,
  Rhino,
  Hippo,
  Giraffe,
  Zebra,
  Kangaroo,
  Koala,
  Panda,
  Monkey,
  Gorilla,
  Orangutan,
  Chimpanzee,
  Sloth,
  Armadillo,
  Hedgehog,
  Porcupine,
  Skunk,
  Raccoon,
  Opossum,
  Squirrel,
  Chipmunk,
  Beaver,
  Otter,
  Mole,
  Bat,
  Mouse,
  Rat,
  Hamster,
  GuineaPig,
  Ferret,
  Chinchilla,
  Gerbil,
  Capybara,
  Llama,
  Alpaca,
  Camel,
  Donkey,
  Mule,
  Zebra as ZebraIcon
} from 'lucide-react';

const RolePermissionManagement = () => {
  const [activeTab, setActiveTab] = useState('roles');
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPermissionMatrix, setShowPermissionMatrix] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    role: 'all',
    branch: 'all'
  });

  // Roller
  const roles = [
    {
      id: 1,
      name: 'Süper Admin',
      type: 'system',
      description: 'Sistem yöneticisi - tam yetki',
      icon: Crown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      userCount: 2,
      isActive: true,
      isSystem: true,
      permissions: {
        dashboard: { view: true, create: true, edit: true, delete: true, export: true, approve: true },
        leads: { view: true, create: true, edit: true, delete: true, export: true, approve: true },
        patients: { view: true, create: true, edit: true, delete: true, export: true, approve: true },
        appointments: { view: true, create: true, edit: true, delete: true, export: true, approve: true },
        clinical: { view: true, create: true, edit: true, delete: true, export: true, approve: true },
        documents: { view: true, create: true, edit: true, delete: true, export: true, approve: true },
        travel: { view: true, create: true, edit: true, delete: true, export: true, approve: true },
        inventory: { view: true, create: true, edit: true, delete: true, export: true, approve: true },
        payments: { view: true, create: true, edit: true, delete: true, export: true, approve: true },
        analytics: { view: true, create: true, edit: true, delete: true, export: true, approve: true },
        communication: { view: true, create: true, edit: true, delete: true, export: true, approve: true },
        settings: { view: true, create: true, edit: true, delete: true, export: true, approve: true }
      },
      restrictions: {
        dataAccess: 'all',
        branchAccess: 'all',
        timeRestriction: false,
        ipRestriction: false,
        deviceRestriction: false
      }
    },
    {
      id: 2,
      name: 'Klinik Yöneticisi',
      type: 'management',
      description: 'Klinik operasyonları yöneticisi',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      userCount: 5,
      isActive: true,
      isSystem: false,
      permissions: {
        dashboard: { view: true, create: false, edit: false, delete: false, export: true, approve: false },
        leads: { view: true, create: true, edit: true, delete: false, export: true, approve: true },
        patients: { view: true, create: true, edit: true, delete: false, export: true, approve: true },
        appointments: { view: true, create: true, edit: true, delete: false, export: true, approve: true },
        clinical: { view: true, create: true, edit: true, delete: false, export: true, approve: true },
        documents: { view: true, create: true, edit: true, delete: false, export: true, approve: true },
        travel: { view: true, create: true, edit: true, delete: false, export: true, approve: true },
        inventory: { view: true, create: true, edit: true, delete: false, export: true, approve: false },
        payments: { view: true, create: false, edit: false, delete: false, export: true, approve: false },
        analytics: { view: true, create: false, edit: false, delete: false, export: true, approve: false },
        communication: { view: true, create: true, edit: true, delete: false, export: false, approve: false },
        settings: { view: false, create: false, edit: false, delete: false, export: false, approve: false }
      },
      restrictions: {
        dataAccess: 'branch',
        branchAccess: 'assigned',
        timeRestriction: false,
        ipRestriction: false,
        deviceRestriction: false
      }
    },
    {
      id: 3,
      name: 'Satış Müdürü',
      type: 'sales',
      description: 'Satış ekibi yöneticisi',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      userCount: 3,
      isActive: true,
      isSystem: false,
      permissions: {
        dashboard: { view: true, create: false, edit: false, delete: false, export: true, approve: false },
        leads: { view: true, create: true, edit: true, delete: false, export: true, approve: true },
        patients: { view: true, create: true, edit: true, delete: false, export: true, approve: false },
        appointments: { view: true, create: true, edit: true, delete: false, export: false, approve: false },
        clinical: { view: false, create: false, edit: false, delete: false, export: false, approve: false },
        documents: { view: true, create: true, edit: true, delete: false, export: false, approve: false },
        travel: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        inventory: { view: false, create: false, edit: false, delete: false, export: false, approve: false },
        payments: { view: true, create: false, edit: false, delete: false, export: true, approve: false },
        analytics: { view: true, create: false, edit: false, delete: false, export: true, approve: false },
        communication: { view: true, create: true, edit: true, delete: false, export: false, approve: false },
        settings: { view: false, create: false, edit: false, delete: false, export: false, approve: false }
      },
      restrictions: {
        dataAccess: 'team',
        branchAccess: 'assigned',
        timeRestriction: false,
        ipRestriction: false,
        deviceRestriction: false
      }
    },
    {
      id: 4,
      name: 'Satış Temsilcisi',
      type: 'sales',
      description: 'Satış temsilcisi',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      userCount: 12,
      isActive: true,
      isSystem: false,
      permissions: {
        dashboard: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        leads: { view: true, create: true, edit: true, delete: false, export: false, approve: false },
        patients: { view: true, create: true, edit: true, delete: false, export: false, approve: false },
        appointments: { view: true, create: true, edit: true, delete: false, export: false, approve: false },
        clinical: { view: false, create: false, edit: false, delete: false, export: false, approve: false },
        documents: { view: true, create: true, edit: true, delete: false, export: false, approve: false },
        travel: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        inventory: { view: false, create: false, edit: false, delete: false, export: false, approve: false },
        payments: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        analytics: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        communication: { view: true, create: true, edit: true, delete: false, export: false, approve: false },
        settings: { view: false, create: false, edit: false, delete: false, export: false, approve: false }
      },
      restrictions: {
        dataAccess: 'own',
        branchAccess: 'assigned',
        timeRestriction: false,
        ipRestriction: false,
        deviceRestriction: false
      }
    },
    {
      id: 5,
      name: 'Doktor',
      type: 'medical',
      description: 'Tıbbi personel',
      icon: Stethoscope,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      userCount: 8,
      isActive: true,
      isSystem: false,
      permissions: {
        dashboard: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        leads: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        patients: { view: true, create: true, edit: true, delete: false, export: true, approve: true },
        appointments: { view: true, create: true, edit: true, delete: false, export: false, approve: true },
        clinical: { view: true, create: true, edit: true, delete: false, export: true, approve: true },
        documents: { view: true, create: true, edit: true, delete: false, export: true, approve: true },
        travel: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        inventory: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        payments: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        analytics: { view: true, create: false, edit: false, delete: false, export: true, approve: false },
        communication: { view: true, create: true, edit: true, delete: false, export: false, approve: false },
        settings: { view: false, create: false, edit: false, delete: false, export: false, approve: false }
      },
      restrictions: {
        dataAccess: 'assigned',
        branchAccess: 'assigned',
        timeRestriction: false,
        ipRestriction: false,
        deviceRestriction: false
      }
    },
    {
      id: 6,
      name: 'Muhasebe',
      type: 'finance',
      description: 'Finansal işlemler sorumlusu',
      icon: CreditCard,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      userCount: 4,
      isActive: true,
      isSystem: false,
      permissions: {
        dashboard: { view: true, create: false, edit: false, delete: false, export: true, approve: false },
        leads: { view: true, create: false, edit: false, delete: false, export: true, approve: false },
        patients: { view: true, create: false, edit: false, delete: false, export: true, approve: false },
        appointments: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        clinical: { view: false, create: false, edit: false, delete: false, export: false, approve: false },
        documents: { view: true, create: true, edit: true, delete: false, export: true, approve: false },
        travel: { view: true, create: false, edit: false, delete: false, export: true, approve: false },
        inventory: { view: true, create: true, edit: true, delete: false, export: true, approve: false },
        payments: { view: true, create: true, edit: true, delete: false, export: true, approve: true },
        analytics: { view: true, create: false, edit: false, delete: false, export: true, approve: false },
        communication: { view: true, create: true, edit: false, delete: false, export: false, approve: false },
        settings: { view: false, create: false, edit: false, delete: false, export: false, approve: false }
      },
      restrictions: {
        dataAccess: 'financial',
        branchAccess: 'assigned',
        timeRestriction: false,
        ipRestriction: false,
        deviceRestriction: false
      }
    },
    {
      id: 7,
      name: 'Partner/Acenta',
      type: 'external',
      description: 'Dış partner ve acentalar',
      icon: Star,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      userCount: 15,
      isActive: true,
      isSystem: false,
      permissions: {
        dashboard: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        leads: { view: true, create: true, edit: true, delete: false, export: false, approve: false },
        patients: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        appointments: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        clinical: { view: false, create: false, edit: false, delete: false, export: false, approve: false },
        documents: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        travel: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        inventory: { view: false, create: false, edit: false, delete: false, export: false, approve: false },
        payments: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        analytics: { view: true, create: false, edit: false, delete: false, export: false, approve: false },
        communication: { view: true, create: true, edit: true, delete: false, export: false, approve: false },
        settings: { view: false, create: false, edit: false, delete: false, export: false, approve: false }
      },
      restrictions: {
        dataAccess: 'referral',
        branchAccess: 'none',
        timeRestriction: true,
        ipRestriction: true,
        deviceRestriction: false
      }
    }
  ];

  // Kullanıcılar
  const users = [
    {
      id: 1,
      name: 'Dr. Mehmet Yılmaz',
      email: 'mehmet.yilmaz@sagliktur.com',
      roles: ['Süper Admin'],
      branch: 'Ana Merkez',
      status: 'active',
      lastLogin: '2025-01-14 16:30',
      loginDevice: 'Desktop',
      loginIP: '192.168.1.100',
      twoFactorEnabled: true,
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: '2024-01-01',
      permissions: {
        customPermissions: [],
        restrictions: {
          timeRestriction: false,
          ipWhitelist: [],
          deviceLimit: false
        }
      }
    },
    {
      id: 2,
      name: 'Dr. Fatma Kaya',
      email: 'fatma.kaya@sagliktur.com',
      roles: ['Klinik Yöneticisi', 'Doktor'],
      branch: 'Ana Merkez',
      status: 'active',
      lastLogin: '2025-01-14 15:45',
      loginDevice: 'Mobile',
      loginIP: '192.168.1.101',
      twoFactorEnabled: true,
      avatar: 'https://images.pexels.com/photos/7180651/pexels-photo-7180651.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: '2024-01-15',
      permissions: {
        customPermissions: ['patients.delete'],
        restrictions: {
          timeRestriction: false,
          ipWhitelist: [],
          deviceLimit: false
        }
      }
    },
    {
      id: 3,
      name: 'Ayşe Demir',
      email: 'ayse.demir@sagliktur.com',
      roles: ['Satış Müdürü'],
      branch: 'Ana Merkez',
      status: 'active',
      lastLogin: '2025-01-14 14:20',
      loginDevice: 'Tablet',
      loginIP: '192.168.1.102',
      twoFactorEnabled: false,
      avatar: 'https://images.pexels.com/photos/8376277/pexels-photo-8376277.jpeg?auto=compress&cs=tinysrgb&w=150',
      createdAt: '2024-02-01',
      permissions: {
        customPermissions: [],
        restrictions: {
          timeRestriction: true,
          ipWhitelist: ['192.168.1.0/24'],
          deviceLimit: true
        }
      }
    },
    {
      id: 4,
      name: 'Ali Özkan',
      email: 'ali.ozkan@sagliktur.com',
      roles: ['Satış Temsilcisi'],
      branch: 'Ana Merkez',
      status: 'inactive',
      lastLogin: '2025-01-10 09:15',
      loginDevice: 'Desktop',
      loginIP: '192.168.1.103',
      twoFactorEnabled: false,
      avatar: null,
      createdAt: '2024-03-01',
      permissions: {
        customPermissions: [],
        restrictions: {
          timeRestriction: true,
          ipWhitelist: [],
          deviceLimit: false
        }
      }
    }
  ];

  // Modüller ve izinler
  const modules = [
    { id: 'dashboard', name: 'Ana Panel', icon: LayoutDashboard, description: 'Genel dashboard ve istatistikler' },
    { id: 'leads', name: 'Lead Yönetimi', icon: Users, description: 'Potansiyel müşteri yönetimi' },
    { id: 'patients', name: 'Hasta Yönetimi', icon: Heart, description: 'Hasta kayıtları ve takibi' },
    { id: 'appointments', name: 'Randevu Yönetimi', icon: Calendar, description: 'Randevu planlama ve takibi' },
    { id: 'clinical', name: 'Klinik Süreç', icon: Activity, description: 'Tıbbi süreçler ve kayıtlar' },
    { id: 'documents', name: 'Evrak Yönetimi', icon: FileText, description: 'Belge ve onam yönetimi' },
    { id: 'travel', name: 'Seyahat Koordinasyonu', icon: Plane, description: 'Ulaşım ve konaklama' },
    { id: 'inventory', name: 'Stok Yönetimi', icon: Package, description: 'Envanter ve malzeme takibi' },
    { id: 'payments', name: 'Ödeme Yönetimi', icon: CreditCard, description: 'Finansal işlemler' },
    { id: 'analytics', name: 'Analitik', icon: BarChart3, description: 'Raporlar ve analizler' },
    { id: 'communication', name: 'İletişim Hub\'ı', icon: MessageCircle, description: 'Çoklu kanal iletişim' },
    { id: 'settings', name: 'Sistem Ayarları', icon: Settings, description: 'Sistem konfigürasyonu' }
  ];

  const permissions = ['view', 'create', 'edit', 'delete', 'export', 'approve'];
  const permissionLabels = {
    view: 'Görüntüleme',
    create: 'Oluşturma',
    edit: 'Düzenleme',
    delete: 'Silme',
    export: 'Dışa Aktarma',
    approve: 'Onaylama'
  };

  // Audit log
  const auditLogs = [
    {
      id: 1,
      user: 'Dr. Mehmet Yılmaz',
      action: 'Rol Oluşturma',
      target: 'Yeni Asistan Rolü',
      timestamp: '2025-01-14 16:30:15',
      ip: '192.168.1.100',
      device: 'Desktop',
      status: 'success',
      details: 'Yeni asistan rolü oluşturuldu'
    },
    {
      id: 2,
      user: 'Dr. Fatma Kaya',
      action: 'Kullanıcı Düzenleme',
      target: 'Ali Özkan',
      timestamp: '2025-01-14 15:45:22',
      ip: '192.168.1.101',
      device: 'Mobile',
      status: 'success',
      details: 'Kullanıcı rolü güncellendi'
    },
    {
      id: 3,
      user: 'Ayşe Demir',
      action: 'Yetki Değişikliği',
      target: 'Satış Temsilcisi Rolü',
      timestamp: '2025-01-14 14:20:33',
      ip: '192.168.1.102',
      device: 'Tablet',
      status: 'warning',
      details: 'Yetkisiz erişim denemesi'
    },
    {
      id: 4,
      user: 'Sistem',
      action: 'Otomatik Güvenlik',
      target: 'Ali Özkan',
      timestamp: '2025-01-14 13:15:44',
      ip: '192.168.1.103',
      device: 'Desktop',
      status: 'error',
      details: 'Şüpheli giriş aktivitesi tespit edildi'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAuditStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPermissionColor = (hasPermission: boolean) => {
    return hasPermission ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const renderPermissionMatrix = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
              Modül
            </th>
            {permissions.map((permission) => (
              <th key={permission} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                {permissionLabels[permission]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {modules.map((module) => (
            <tr key={module.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white z-10">
                <div className="flex items-center space-x-3">
                  <module.icon className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{module.name}</div>
                    <div className="text-xs text-gray-500">{module.description}</div>
                  </div>
                </div>
              </td>
              {permissions.map((permission) => {
                const hasPermission = selectedRole?.permissions[module.id]?.[permission] || false;
                return (
                  <td key={permission} className="px-3 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPermissionColor(hasPermission)}`}>
                      {hasPermission ? <CheckCircle className="h-3 w-3" /> : <UserX className="h-3 w-3" />}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderRoleDetail = (role) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${role.bgColor}`}>
              <role.icon className={`h-6 w-6 ${role.color}`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{role.name}</h2>
              <p className="text-gray-600">{role.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                <span>{role.userCount} kullanıcı</span>
                <span>•</span>
                <span className={role.isActive ? 'text-green-600' : 'text-red-600'}>
                  {role.isActive ? 'Aktif' : 'Pasif'}
                </span>
                {role.isSystem && (
                  <>
                    <span>•</span>
                    <span className="text-orange-600">Sistem Rolü</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedRole(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sol Panel - Genel Bilgiler */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Rol Bilgileri</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Rol Tipi:</span>
                    <p className="font-medium capitalize">{role.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Kullanıcı Sayısı:</span>
                    <p className="font-medium">{role.userCount}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Durum:</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(role.isActive ? 'active' : 'inactive')}`}>
                      {role.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Sistem Rolü:</span>
                    <p className="font-medium">{role.isSystem ? 'Evet' : 'Hayır'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Erişim Kısıtlamaları</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Veri Erişimi:</span>
                    <p className="font-medium capitalize">{role.restrictions.dataAccess}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Şube Erişimi:</span>
                    <p className="font-medium capitalize">{role.restrictions.branchAccess}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Zaman Kısıtı:</span>
                    <p className="font-medium">{role.restrictions.timeRestriction ? 'Var' : 'Yok'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">IP Kısıtı:</span>
                    <p className="font-medium">{role.restrictions.ipRestriction ? 'Var' : 'Yok'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Cihaz Kısıtı:</span>
                    <p className="font-medium">{role.restrictions.deviceRestriction ? 'Var' : 'Yok'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Orta ve Sağ Panel - Yetki Matrisi */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Yetki Matrisi</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-white">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Modül
                        </th>
                        {permissions.map((permission) => (
                          <th key={permission} className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                            {permissionLabels[permission].substring(0, 3)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {modules.map((module) => (
                        <tr key={module.id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <module.icon className="h-4 w-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900">{module.name}</span>
                            </div>
                          </td>
                          {permissions.map((permission) => {
                            const hasPermission = role.permissions[module.id]?.[permission] || false;
                            return (
                              <td key={permission} className="px-2 py-2 whitespace-nowrap text-center">
                                {hasPermission ? (
                                  <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                                ) : (
                                  <UserX className="h-4 w-4 text-red-600 mx-auto" />
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Son güncelleme: 2025-01-14 16:30
          </div>
          <div className="flex space-x-3">
            {!role.isSystem && (
              <>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
                  Düzenle
                </button>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors">
                  Sil
                </button>
              </>
            )}
            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors">
              Kopyala
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserDetail = (user) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full overflow-hidden">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                <span>{user.branch}</span>
                <span>•</span>
                <span className={user.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                  {user.status === 'active' ? 'Aktif' : 'Pasif'}
                </span>
                <span>•</span>
                <span>Kayıt: {user.createdAt}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedUser(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sol Panel */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Kullanıcı Bilgileri</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Roller:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.roles.map((role, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Şube:</span>
                    <p className="font-medium">{user.branch}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Durum:</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                      {user.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">2FA:</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${user.twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.twoFactorEnabled ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Son Giriş Bilgileri</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Tarih:</span>
                    <p className="font-medium">{user.lastLogin}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Cihaz:</span>
                    <p className="font-medium">{user.loginDevice}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">IP Adresi:</span>
                    <p className="font-medium">{user.loginIP}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Panel */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Özel İzinler</h3>
                {user.permissions.customPermissions.length > 0 ? (
                  <div className="space-y-2">
                    {user.permissions.customPermissions.map((permission, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                        <span className="text-sm text-gray-700">{permission}</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Özel izin bulunmuyor</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Güvenlik Kısıtlamaları</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Zaman Kısıtı:</span>
                    <p className="font-medium">{user.permissions.restrictions.timeRestriction ? 'Var' : 'Yok'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">IP Beyaz Liste:</span>
                    {user.permissions.restrictions.ipWhitelist.length > 0 ? (
                      <div className="mt-1">
                        {user.permissions.restrictions.ipWhitelist.map((ip, index) => (
                          <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1">
                            {ip}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="font-medium">Kısıt yok</p>
                    )}
                  </div>
                  <div>
                    <span className="text-gray-600">Cihaz Sınırı:</span>
                    <p className="font-medium">{user.permissions.restrictions.deviceLimit ? 'Var' : 'Yok'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Oluşturulma: {user.createdAt}
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
              Düzenle
            </button>
            <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm transition-colors">
              Şifre Sıfırla
            </button>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors">
              Deaktif Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rol ve Yetki Yönetimi</h1>
          <p className="text-gray-600 mt-1">Kullanıcı rolleri, yetkilendirme ve güvenlik yönetimi</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Yeni Kullanıcı</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Yeni Rol</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Kullanıcı</p>
              <p className="text-3xl font-bold text-blue-600">49</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+3 bu ay</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktif Roller</p>
              <p className="text-3xl font-bold text-green-600">7</p>
            </div>
            <Shield className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">Tümü aktif</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">2FA Kullanımı</p>
              <p className="text-3xl font-bold text-purple-600">67%</p>
            </div>
            <Key className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">33 kullanıcı</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Güvenlik Uyarıları</p>
              <p className="text-3xl font-bold text-red-600">2</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-sm text-red-600 mt-2">Acil müdahale</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'roles', label: 'Roller', icon: Shield, count: 7 },
              { id: 'users', label: 'Kullanıcılar', icon: Users, count: 49 },
              { id: 'permissions', label: 'Yetki Matrisi', icon: Key, count: null },
              { id: 'audit', label: 'Denetim Kayıtları', icon: Activity, count: null },
              { id: 'security', label: 'Güvenlik Ayarları', icon: Lock, count: null }
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
                {tab.count && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Sistem Rolleri</h3>
                <div className="flex space-x-2">
                  <button className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded">
                    Dışa Aktar
                  </button>
                  <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                    Yeni Rol
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    onClick={() => setSelectedRole(role)}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${role.bgColor} ${role.borderColor}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <role.icon className={`h-6 w-6 ${role.color}`} />
                        <div>
                          <h4 className="font-semibold text-gray-900">{role.name}</h4>
                          <p className="text-sm text-gray-600 capitalize">{role.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {role.isSystem && (
                          <Lock className="h-4 w-4 text-orange-600" />
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(role.isActive ? 'active' : 'inactive')}`}>
                          {role.isActive ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{role.userCount} kullanıcı</span>
                      </div>
                      <div className="flex space-x-1">
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Eye className="h-4 w-4" />
                        </button>
                        {!role.isSystem && (
                          <>
                            <button className="p-1 text-gray-400 hover:text-green-600">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Kullanıcı Listesi</h3>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Kullanıcı ara..."
                      className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filters.role}
                    onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="all">Tüm Roller</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.name}>{role.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kullanıcı
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roller
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Şube
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Son Giriş
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              {user.avatar ? (
                                <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                              ) : (
                                <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                                  <User className="h-5 w-5 text-gray-600" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {role}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.branch}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.lastLogin}</div>
                          <div className="text-xs text-gray-500">{user.loginDevice} • {user.loginIP}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(user.status)}`}>
                              {user.status === 'active' ? 'Aktif' : 'Pasif'}
                            </span>
                            {user.twoFactorEnabled && (
                              <Key className="h-4 w-4 text-green-600" title="2FA Aktif" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => setSelectedUser(user)}
                              className="text-blue-600 hover:text-blue-700 p-1 rounded"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700 p-1 rounded">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-700 p-1 rounded">
                              <UserX className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Yetki Matrisi</h3>
                <div className="flex space-x-2">
                  <select
                    value={selectedRole?.id || ''}
                    onChange={(e) => {
                      const role = roles.find(r => r.id === parseInt(e.target.value));
                      setSelectedRole(role || null);
                    }}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="">Rol Seçin</option>
                    {roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowPermissionMatrix(!showPermissionMatrix)}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    {showPermissionMatrix ? 'Gizle' : 'Tüm Matrisi Göster'}
                  </button>
                </div>
              </div>
              
              {selectedRole ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <selectedRole.icon className={`h-6 w-6 ${selectedRole.color}`} />
                    <h4 className="font-semibold text-gray-900">{selectedRole.name}</h4>
                  </div>
                  {renderPermissionMatrix()}
                </div>
              ) : showPermissionMatrix ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Tüm Roller - Yetki Matrisi</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-white">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-white z-10">
                            Rol / Modül
                          </th>
                          {modules.map((module) => (
                            <th key={module.id} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                              <div className="flex flex-col items-center space-y-1">
                                <module.icon className="h-4 w-4" />
                                <span>{module.name}</span>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {roles.map((role) => (
                          <tr key={role.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white z-10">
                              <div className="flex items-center space-x-3">
                                <role.icon className={`h-5 w-5 ${role.color}`} />
                                <span className="font-medium text-gray-900">{role.name}</span>
                              </div>
                            </td>
                            {modules.map((module) => {
                              const modulePermissions = role.permissions[module.id];
                              const hasAnyPermission = modulePermissions && Object.values(modulePermissions).some(p => p);
                              return (
                                <td key={module.id} className="px-3 py-4 whitespace-nowrap text-center">
                                  <div className={`w-6 h-6 rounded-full mx-auto ${
                                    hasAnyPermission ? 'bg-green-500' : 'bg-red-500'
                                  }`} title={hasAnyPermission ? 'Erişim var' : 'Erişim yok'}>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Shield className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>Yetki matrisini görüntülemek için bir rol seçin</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Denetim Kayıtları</h3>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option value="all">Tüm İşlemler</option>
                    <option value="login">Giriş</option>
                    <option value="role">Rol İşlemleri</option>
                    <option value="permission">Yetki Değişiklikleri</option>
                    <option value="security">Güvenlik</option>
                  </select>
                  <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                    Dışa Aktar
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kullanıcı
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hedef
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tarih/Saat
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP/Cihaz
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Durum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{log.user}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{log.action}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{log.target}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{log.timestamp}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{log.ip}</div>
                          <div className="text-xs text-gray-500">{log.device}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getAuditStatusColor(log.status)}`}>
                            {log.status === 'success' ? 'Başarılı' : 
                             log.status === 'warning' ? 'Uyarı' : 'Hata'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">Güvenlik Ayarları</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Şifre Politikası</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Minimum Şifre Uzunluğu</h5>
                        <p className="text-sm text-gray-600">En az 8 karakter</p>
                      </div>
                      <input
                        type="number"
                        defaultValue="8"
                        className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Büyük Harf Zorunlu</h5>
                        <p className="text-sm text-gray-600">En az 1 büyük harf</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Özel Karakter Zorunlu</h5>
                        <p className="text-sm text-gray-600">En az 1 özel karakter</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Şifre Yenileme Süresi</h5>
                        <p className="text-sm text-gray-600">Gün cinsinden</p>
                      </div>
                      <input
                        type="number"
                        defaultValue="90"
                        className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Oturum Güvenliği</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Otomatik Çıkış</h5>
                        <p className="text-sm text-gray-600">Dakika cinsinden</p>
                      </div>
                      <input
                        type="number"
                        defaultValue="30"
                        className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">Çoklu Oturum</h5>
                        <p className="text-sm text-gray-600">Aynı anda birden fazla cihaz</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">IP Kısıtlaması</h5>
                        <p className="text-sm text-gray-600">Belirli IP'lerden erişim</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">2FA Zorunluluğu</h5>
                        <p className="text-sm text-gray-600">Tüm kullanıcılar için</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                        <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Güvenlik Ayarlarını Kaydet
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Shield className="h-5 w-5 text-red-600" />
          <span>Güvenlik & Yasal Uyumluluk</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">KVKK/GDPR Uyumu</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Veri işleme izni</li>
              <li>• Erişim kayıtları</li>
              <li>• Veri silme hakkı</li>
              <li>• Şeffaflık raporu</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Audit & Denetim</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Tam aktivite logu</li>
              <li>• Yetki değişiklik geçmişi</li>
              <li>• Güvenlik uyarıları</li>
              <li>• Uyumluluk raporları</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Erişim Kontrolü</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Rol bazlı yetkilendirme</li>
              <li>• Çok faktörlü doğrulama</li>
              <li>• IP kısıtlaması</li>
              <li>• Cihaz yönetimi</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Veri Güvenliği</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 256-bit şifreleme</li>
              <li>• Güvenli oturum yönetimi</li>
              <li>• Veri maskeleme</li>
              <li>• Backup & recovery</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Role Detail Modal */}
      {selectedRole && renderRoleDetail(selectedRole)}

      {/* User Detail Modal */}
      {selectedUser && renderUserDetail(selectedUser)}
    </div>
  );
};

export default RolePermissionManagement;