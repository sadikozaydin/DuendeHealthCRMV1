import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Zap,
  Bot,
  Warehouse,
  Truck,
  ShoppingCart,
  Calendar,
  MapPin,
  User,
  FileText,
  Download,
  Upload,
  Bell,
  Settings,
  RefreshCw,
  QrCode,
  Scan,
  Camera,
  Smartphone,
  Monitor,
  Tablet,
  Building2,
  Users,
  DollarSign,
  Euro,
  Percent,
  Target,
  Award,
  Activity,
  Database,
  Shield,
  Lock,
  Unlock,
  Key,
  CreditCard,
  Phone,
  Mail,
  MessageCircle,
  Send,
  Share2,
  Copy,
  ExternalLink,
  History,
  Timer,
  Flag,
  Tag,
  Hash,
  AtSign,
  Star,
  Heart,
  Bookmark,
  Archive,
  Folder,
  FolderOpen,
  Image,
  Paperclip,
  Link,
  Globe,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Play,
  Pause,
  Stop,
  SkipForward,
  SkipBack,
  FastForward,
  Rewind,
  RotateCcw,
  Maximize,
  Minimize,
  Move,
  MoreHorizontal,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowUpLeft,
  ArrowDownRight,
  X,
  Check,
  Minus,
  Info,
  HelpCircle,
  AlertCircle,
  XCircle,
  CheckSquare,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Diamond,
  Layers,
  Grid,
  List,
  Layout,
  Sidebar,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Columns,
  Rows,
  Table,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  Timer as TimerIcon,
  Stopwatch,
  Hourglass,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSnow,
  Thermometer,
  Droplets,
  Wind,
  Compass,
  Navigation,
  Map,
  Route,
  Car,
  Plane,
  Train,
  Bus,
  Bike,
  Walk,
  Home,
  Office,
  School,
  Hospital,
  Store,
  Restaurant,
  Hotel,
  Bank,
  Church,
  Library,
  Museum,
  Theater,
  Stadium,
  Park,
  Beach,
  Mountain,
  Forest,
  Desert,
  Island,
  River,
  Lake,
  Ocean,
  Volcano,
  Earthquake,
  Fire,
  Flood,
  Storm,
  Tornado,
  Hurricane,
  Lightning,
  Rainbow,
  Sunrise,
  Sunset,
  Stars,
  Moon as MoonIcon,
  Sun as SunIcon,
  Earth,
  Globe as GlobeIcon,
  Satellite,
  Rocket,
  Ufo,
  Alien,
  Robot,
  Cpu,
  HardDrive,
  Memory,
  Motherboard,
  Gpu,
  Battery,
  BatteryLow,
  Power,
  PowerOff,
  Plug,
  Cable,
  Usb,
  Bluetooth,
  Wifi as WifiIcon,
  Signal,
  Antenna,
  Radio,
  Tv,
  Speaker,
  Headphones,
  Microphone,
  Camera as CameraIcon,
  Video as VideoIcon,
  Film,
  Music,
  Disc,
  Cassette,
  Vinyl,
  Guitar,
  Piano,
  Drum,
  Trumpet,
  Violin,
  Flute,
  Saxophone,
  Harp,
  Banjo,
  Accordion,
  Harmonica,
  Xylophone,
  Maracas,
  Tambourine,
  Cowbell,
  Triangle as TriangleIcon,
  Gong,
  Bell as BellIcon,
  Whistle,
  Horn,
  Siren,
  Alarm,
  Clock3,
  Clock6,
  Clock9,
  Clock12,
  Watch,
  Hourglass as HourglassIcon,
  Sandglass,
  Metronome,
  Pendulum,
  Gear,
  Cog,
  Wrench,
  Hammer,
  Screwdriver,
  Pliers,
  Saw,
  Drill,
  Axe,
  Pickaxe,
  Shovel,
  Rake,
  Hoe,
  Scissors,
  Knife,
  Fork,
  Spoon,
  Plate,
  Bowl,
  Cup,
  Glass,
  Bottle,
  Can,
  Jar,
  Box,
  Package as PackageIcon,
  Gift,
  Ribbon,
  Balloon,
  Cake,
  Cookie,
  Candy,
  Lollipop,
  IceCream,
  Pizza,
  Burger,
  Hotdog,
  Sandwich,
  Taco,
  Burrito,
  Salad,
  Soup,
  Bread,
  Croissant,
  Bagel,
  Donut,
  Pretzel,
  Waffle,
  Pancake,
  Egg,
  Bacon,
  Sausage,
  Chicken,
  Turkey,
  Duck,
  Fish,
  Shrimp,
  Lobster,
  Crab,
  Oyster,
  Clam,
  Squid,
  Octopus,
  Jellyfish,
  Starfish,
  Seahorse,
  Whale,
  Dolphin,
  Shark,
  Turtle,
  Penguin,
  Seal,
  Walrus,
  Polar,
  Bear,
  Panda,
  Koala,
  Sloth,
  Monkey,
  Gorilla,
  Orangutan,
  Chimpanzee,
  Baboon,
  Lemur,
  Lion,
  Tiger,
  Leopard,
  Cheetah,
  Jaguar,
  Panther,
  Lynx,
  Bobcat,
  Wildcat,
  Housecat,
  Dog,
  Wolf,
  Fox,
  Coyote,
  Jackal,
  Hyena,
  Elephant,
  Rhino,
  Hippo,
  Giraffe,
  Zebra,
  Horse,
  Donkey,
  Mule,
  Cow,
  Bull,
  Ox,
  Buffalo,
  Bison,
  Yak,
  Goat,
  Sheep,
  Lamb,
  Pig,
  Boar,
  Deer,
  Elk,
  Moose,
  Reindeer,
  Caribou,
  Antelope,
  Gazelle,
  Impala,
  Springbok,
  Wildebeest,
  Gnu,
  Kudu,
  Eland,
  Oryx,
  Ibex,
  Chamois,
  Bighorn,
  Dall,
  Stone,
  Mountain as MountainIcon,
  Goat as GoatIcon,
  Rabbit,
  Hare,
  Bunny,
  Squirrel,
  Chipmunk,
  Groundhog,
  Marmot,
  Prairie,
  Beaver,
  Otter,
  Mink,
  Weasel,
  Ferret,
  Stoat,
  Ermine,
  Marten,
  Fisher,
  Wolverine,
  Badger,
  Skunk,
  Raccoon,
  Opossum,
  Possum,
  Kangaroo,
  Wallaby,
  Wombat,
  Tasmanian,
  Devil,
  Quoll,
  Numbat,
  Echidna,
  Platypus,
  Anteater,
  Armadillo,
  Pangolin,
  Aardvark,
  Hedgehog,
  Porcupine,
  Shrew,
  Mole,
  Bat,
  Flying,
  Fruit,
  Vampire,
  Eagle,
  Hawk,
  Falcon,
  Kestrel,
  Osprey,
  Buzzard,
  Vulture,
  Condor,
  Owl,
  Barn,
  Screech,
  Great,
  Horned,
  Snowy,
  Tawny,
  Little,
  Burrowing,
  Short,
  Eared,
  Long,
  Whet,
  Boreal,
  Northern,
  Spotted,
  Barred,
  Strix,
  Asio,
  Bubo,
  Tyto,
  Athene,
  Glaucidium,
  Megascops,
  Otus,
  Surnia,
  Aegolius,
  Micrathene,
  Ninox,
  Pseudoscops,
  Pulsatrix,
  Lophostrix,
  Jubula,
  Ptilopsis,
  Asio as AsioIcon,
  Bubo as BuboIcon,
  Strix as StrixIcon,
  Tyto as TytoIcon,
  Athene as AtheneIcon,
  Glaucidium as GlaucidiumIcon,
  Megascops as MegascopsIcon,
  Otus as OtusIcon,
  Surnia as SurniaIcon,
  Aegolius as AegoliusIcon,
  Micrathene as MicratheneIcon,
  Ninox as NinoxIcon,
  Pseudoscops as PseudoscopsIcon,
  Pulsatrix as PulsatrixIcon,
  Lophostrix as LophostrixIcon,
  Jubula as JubulaIcon,
  Ptilopsis as PtilopsisIcon
} from 'lucide-react';
import { useBranch } from '../contexts/BranchContext';

const InventoryManagement = () => {
  const { currentBranch, branches, branchSettings } = useBranch();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    warehouse: 'all',
    category: 'all',
    status: 'all',
    supplier: 'all'
  });

  // Depo/Şube Listesi
  const warehouses = [
    {
      id: 'W001',
      name: 'Ana Depo',
      location: 'Merkez Bina - Bodrum Kat',
      manager: 'Ahmet Yılmaz',
      capacity: '1000 m²',
      utilization: 78,
      temperature: '18-22°C',
      humidity: '45-55%',
      lastInventory: '2025-01-10',
      status: 'active',
      branchId: '1'
    },
    {
      id: 'W002',
      name: 'Ameliyathane Deposu',
      location: 'Ameliyathane Katı',
      manager: 'Dr. Fatma Kaya',
      capacity: '150 m²',
      utilization: 92,
      temperature: '20-24°C',
      humidity: '40-50%',
      lastInventory: '2025-01-12',
      status: 'active',
      branchId: '1'
    },
    {
      id: 'W003',
      name: 'Eczane Deposu',
      location: 'Eczane - Soğuk Hava Deposu',
      manager: 'Eczacı Mehmet Öz',
      capacity: '80 m²',
      utilization: 65,
      temperature: '2-8°C',
      humidity: '35-45%',
      lastInventory: '2025-01-14',
      status: 'active',
      branchId: '1'
    }
  ];

  // Stok Kalemleri
  const inventoryItems = [
    {
      id: 'INV001',
      name: 'Cerrahi Eldiven (Lateks)',
      category: 'Tıbbi Malzeme',
      subcategory: 'Koruyucu Ekipman',
      brand: 'MedGlove Pro',
      model: 'LTX-7.5',
      barcode: '8690123456789',
      qrCode: 'QR8690123456789',
      unit: 'Kutu (100 adet)',
      currentStock: 245,
      minStock: 50,
      maxStock: 500,
      reorderPoint: 75,
      avgConsumption: 15, // günlük
      warehouse: 'W001',
      location: 'Raf A-12-3',
      supplier: 'MediSupply Ltd.',
      supplierCode: 'MS-GLV-001',
      costPrice: 45.50,
      salePrice: 65.00,
      currency: 'TRY',
      taxRate: 18,
      lastPurchase: '2025-01-10',
      lastUsage: '2025-01-14',
      expiryDate: '2026-12-31',
      lotNumber: 'LOT2024-456',
      serialNumber: null,
      status: 'active',
      riskLevel: 'low',
      aiPrediction: {
        daysUntilEmpty: 16,
        recommendedOrder: 150,
        trend: 'stable',
        seasonalFactor: 1.0
      },
      documents: ['Sertifika.pdf', 'Fatura_001.pdf'],
      photos: ['eldiven1.jpg', 'eldiven2.jpg'],
      usage: [
        { date: '2025-01-14', quantity: 12, reason: 'Ameliyat', patient: 'Maria Rodriguez', user: 'Dr. Mehmet' },
        { date: '2025-01-13', quantity: 18, reason: 'Poliklinik', patient: 'Ahmed Hassan', user: 'Hemşire Ayşe' }
      ]
    },
    {
      id: 'INV002',
      name: 'Paracetamol 500mg',
      category: 'İlaç',
      subcategory: 'Ağrı Kesici',
      brand: 'Pharmaco',
      model: 'PCT-500',
      barcode: '8690987654321',
      qrCode: 'QR8690987654321',
      unit: 'Kutu (20 tablet)',
      currentStock: 89,
      minStock: 100,
      maxStock: 300,
      reorderPoint: 120,
      avgConsumption: 8,
      warehouse: 'W003',
      location: 'Soğuk Dolap B-5',
      supplier: 'Pharma Dist. A.Ş.',
      supplierCode: 'PD-PCT-500',
      costPrice: 12.75,
      salePrice: 18.50,
      currency: 'TRY',
      taxRate: 8,
      lastPurchase: '2025-01-08',
      lastUsage: '2025-01-14',
      expiryDate: '2025-06-15',
      lotNumber: 'LOT2024-789',
      serialNumber: null,
      status: 'critical',
      riskLevel: 'high',
      aiPrediction: {
        daysUntilEmpty: 11,
        recommendedOrder: 200,
        trend: 'increasing',
        seasonalFactor: 1.2
      },
      documents: ['İlaç_Prospektüsü.pdf', 'İthalat_Belgesi.pdf'],
      photos: ['paracetamol1.jpg'],
      usage: [
        { date: '2025-01-14', quantity: 5, reason: 'Reçete', patient: 'Sarah Thompson', user: 'Dr. Ayşe' },
        { date: '2025-01-13', quantity: 8, reason: 'Acil', patient: 'John Smith', user: 'Dr. Mehmet' }
      ]
    },
    {
      id: 'INV003',
      name: 'Kalp Pili (Pacemaker)',
      category: 'Tıbbi Cihaz',
      subcategory: 'İmplant',
      brand: 'CardioTech',
      model: 'CT-PM-2024',
      barcode: '8691234567890',
      qrCode: 'QR8691234567890',
      unit: 'Adet',
      currentStock: 3,
      minStock: 2,
      maxStock: 10,
      reorderPoint: 3,
      avgConsumption: 0.5,
      warehouse: 'W002',
      location: 'Özel Kasa A-1',
      supplier: 'MedDevice International',
      supplierCode: 'MDI-PM-001',
      costPrice: 45000.00,
      salePrice: 65000.00,
      currency: 'EUR',
      taxRate: 18,
      lastPurchase: '2024-12-15',
      lastUsage: '2025-01-10',
      expiryDate: '2029-12-31',
      lotNumber: 'LOT2024-PM-123',
      serialNumber: 'SN-PM-2024-001',
      status: 'active',
      riskLevel: 'medium',
      aiPrediction: {
        daysUntilEmpty: 180,
        recommendedOrder: 2,
        trend: 'stable',
        seasonalFactor: 1.0
      },
      documents: ['CE_Sertifikası.pdf', 'Kullanım_Kılavuzu.pdf', 'Garanti_Belgesi.pdf'],
      photos: ['pacemaker1.jpg', 'pacemaker2.jpg', 'pacemaker3.jpg'],
      usage: [
        { date: '2025-01-10', quantity: 1, reason: 'Ameliyat', patient: 'Maria Rodriguez', user: 'Dr. Mehmet' }
      ]
    }
  ];

  // Stok Hareketleri
  const stockMovements = [
    {
      id: 'MOV001',
      type: 'in',
      itemId: 'INV001',
      itemName: 'Cerrahi Eldiven (Lateks)',
      quantity: 100,
      unit: 'Kutu',
      warehouse: 'W001',
      reason: 'Satın Alma',
      reference: 'PO-2025-001',
      supplier: 'MediSupply Ltd.',
      cost: 4550.00,
      user: 'Ahmet Yılmaz',
      date: '2025-01-10 14:30',
      notes: 'Acil sipariş - stok kritik seviyede'
    },
    {
      id: 'MOV002',
      type: 'out',
      itemId: 'INV002',
      itemName: 'Paracetamol 500mg',
      quantity: 5,
      unit: 'Kutu',
      warehouse: 'W003',
      reason: 'Hasta Kullanımı',
      reference: 'PAT-001',
      patient: 'Sarah Thompson',
      user: 'Dr. Ayşe Demir',
      date: '2025-01-14 16:45',
      notes: 'Ameliyat sonrası ağrı kontrolü'
    },
    {
      id: 'MOV003',
      type: 'transfer',
      itemId: 'INV001',
      itemName: 'Cerrahi Eldiven (Lateks)',
      quantity: 20,
      unit: 'Kutu',
      fromWarehouse: 'W001',
      toWarehouse: 'W002',
      reason: 'Depo Transferi',
      reference: 'TRF-2025-001',
      user: 'Hemşire Ayşe',
      date: '2025-01-12 09:15',
      notes: 'Ameliyathane deposu için transfer'
    }
  ];

  // Tedarikçiler
  const suppliers = [
    {
      id: 'SUP001',
      name: 'MediSupply Ltd.',
      contact: 'Mehmet Özkan',
      phone: '+90 212 123 45 67',
      email: 'info@medisupply.com',
      address: 'İstanbul, Türkiye',
      categories: ['Tıbbi Malzeme', 'Koruyucu Ekipman'],
      rating: 4.8,
      paymentTerms: '30 gün',
      deliveryTime: '3-5 gün',
      status: 'active'
    },
    {
      id: 'SUP002',
      name: 'Pharma Dist. A.Ş.',
      contact: 'Dr. Fatma Yılmaz',
      phone: '+90 212 987 65 43',
      email: 'orders@pharmadist.com',
      address: 'Ankara, Türkiye',
      categories: ['İlaç', 'Vitamin'],
      rating: 4.6,
      paymentTerms: '45 gün',
      deliveryTime: '1-2 gün',
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-red-600" />;
      case 'decreasing': return <TrendingDown className="h-4 w-4 text-green-600" />;
      case 'stable': return <Activity className="h-4 w-4 text-blue-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'in': return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'out': return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      case 'transfer': return <ArrowRight className="h-4 w-4 text-blue-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const renderItemDetail = (item) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 h-12 w-12">
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>Kod: {item.id}</span>
                <span>•</span>
                <span>Kategori: {item.category}</span>
                <span>•</span>
                <span>Marka: {item.brand}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(item.status)}`}>
              {item.status === 'active' ? 'Aktif' : item.status === 'critical' ? 'Kritik' : item.status}
            </span>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(item.riskLevel)}`}>
              {item.riskLevel === 'high' ? 'Yüksek Risk' : item.riskLevel === 'medium' ? 'Orta Risk' : 'Düşük Risk'}
            </span>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sol Panel - Stok Bilgileri */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-4 flex items-center space-x-2">
                  <Package className="h-5 w-5" />
                  <span>Stok Durumu</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Mevcut Stok</span>
                      <span className="text-2xl font-bold text-blue-600">{item.currentStock}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          item.currentStock <= item.minStock ? 'bg-red-500' : 
                          item.currentStock <= item.reorderPoint ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Min: {item.minStock}</span>
                      <span>Sipariş: {item.reorderPoint}</span>
                      <span>Max: {item.maxStock}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-white rounded-lg p-3">
                      <span className="text-gray-600">Birim:</span>
                      <p className="font-medium">{item.unit}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <span className="text-gray-600">Konum:</span>
                      <p className="font-medium">{item.location}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <span className="text-gray-600">Lot No:</span>
                      <p className="font-medium">{item.lotNumber}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <span className="text-gray-600">Son Kullanma:</span>
                      <p className="font-medium">{item.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fiyat Bilgileri */}
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-3 flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Fiyat Bilgileri</span>
                </h3>
                <div className="bg-white rounded-lg p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Alış Fiyatı:</span>
                    <span className="font-medium">{item.costPrice} {item.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Satış Fiyatı:</span>
                    <span className="font-medium">{item.salePrice} {item.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">KDV Oranı:</span>
                    <span className="font-medium">%{item.taxRate}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600">Kar Marjı:</span>
                    <span className="font-medium text-green-600">
                      %{(((item.salePrice - item.costPrice) / item.costPrice) * 100).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Orta Panel - AI Tahminleri */}
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-900 mb-4 flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span>AI Tahminleri</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Tükenme Tahmini</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-purple-600" />
                        <span className="font-bold text-purple-600">{item.aiPrediction.daysUntilEmpty} gün</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Günlük ortalama tüketim: {item.avgConsumption} {item.unit}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Önerilen Sipariş</span>
                      <span className="font-bold text-purple-600">{item.aiPrediction.recommendedOrder} {item.unit}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Mevsimsel faktör: x{item.aiPrediction.seasonalFactor}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Tüketim Trendi</span>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(item.aiPrediction.trend)}
                        <span className="font-medium capitalize">{item.aiPrediction.trend}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tedarikçi Bilgileri */}
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-3 flex items-center space-x-2">
                  <Truck className="h-5 w-5" />
                  <span>Tedarikçi</span>
                </h3>
                <div className="bg-white rounded-lg p-3 space-y-2">
                  <div>
                    <span className="text-gray-600 text-sm">Firma:</span>
                    <p className="font-medium">{item.supplier}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Ürün Kodu:</span>
                    <p className="font-medium">{item.supplierCode}</p>
                  </div>
                  <div>
                    <span className="text-gray-600 text-sm">Son Alım:</span>
                    <p className="font-medium">{item.lastPurchase}</p>
                  </div>
                </div>
              </div>

              {/* Belgeler */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Belgeler</span>
                </h3>
                <div className="space-y-2">
                  {item.documents?.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded">
                      <span className="text-sm text-gray-700">{doc}</span>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sağ Panel - Kullanım Geçmişi */}
            <div className="space-y-6">
              <div className="bg-yellow-50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-900 mb-4 flex items-center space-x-2">
                  <History className="h-5 w-5" />
                  <span>Son Kullanımlar</span>
                </h3>
                
                <div className="space-y-3">
                  {item.usage?.map((usage, index) => (
                    <div key={index} className="bg-white rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">{usage.quantity} {item.unit}</span>
                        <span className="text-xs text-gray-500">{usage.date}</span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center space-x-2">
                          <User className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-600">{usage.user}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Tag className="h-3 w-3 text-gray-400" />
                          <span className="text-gray-600">{usage.reason}</span>
                        </div>
                        {usage.patient && (
                          <div className="flex items-center space-x-2">
                            <Heart className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-600">{usage.patient}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fotoğraflar */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Camera className="h-5 w-5" />
                  <span>Fotoğraflar</span>
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {item.photos?.map((photo, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Barkod/QR */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <QrCode className="h-5 w-5" />
                  <span>Kodlar</span>
                </h3>
                <div className="space-y-2">
                  <div className="bg-white p-2 rounded">
                    <span className="text-xs text-gray-600">Barkod:</span>
                    <p className="font-mono text-sm">{item.barcode}</p>
                  </div>
                  <div className="bg-white p-2 rounded">
                    <span className="text-xs text-gray-600">QR Kod:</span>
                    <p className="font-mono text-sm">{item.qrCode}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Son güncelleme: {item.lastUsage}
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
              Düzenle
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors">
              Stok Hareketi
            </button>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors">
              Sipariş Ver
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
          <h1 className="text-3xl font-bold text-gray-900">Stok ve Depo Yönetimi</h1>
          <p className="text-gray-600 mt-1">AI destekli akıllı stok takibi ve depo yönetimi</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Scan className="h-4 w-4" />
            <span>Barkod Tara</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Yeni Ürün</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Ürün</p>
              <p className="text-3xl font-bold text-blue-600">1,247</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">+23 bu ay</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Kritik Stok</p>
              <p className="text-3xl font-bold text-red-600">18</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-sm text-red-600 mt-2">Acil sipariş gerekli</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Toplam Değer</p>
              <p className="text-3xl font-bold text-green-600">₺2.4M</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">Mevcut stok değeri</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Depo Doluluk</p>
              <p className="text-3xl font-bold text-purple-600">78%</p>
            </div>
            <Warehouse className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">Ortalama kapasite</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Genel Bakış', icon: BarChart3 },
              { id: 'inventory', label: 'Stok Listesi', icon: Package },
              { id: 'movements', label: 'Stok Hareketleri', icon: Activity },
              { id: 'warehouses', label: 'Depo Yönetimi', icon: Warehouse },
              { id: 'suppliers', label: 'Tedarikçiler', icon: Truck },
              { id: 'ai-insights', label: 'AI Öngörüleri', icon: Bot },
              { id: 'reports', label: 'Raporlar', icon: FileText }
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
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Kritik Stoklar */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Kritik Stok Uyarıları</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {inventoryItems.filter(item => item.status === 'critical').map((item) => (
                    <div key={item.id} className="bg-white rounded-lg p-4 border border-red-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <span className="text-red-600 font-bold">{item.currentStock}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Min: {item.minStock} | Sipariş: {item.reorderPoint}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-red-600">
                          {item.aiPrediction.daysUntilEmpty} gün sonra tükenir
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Depo Durumu */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {warehouses.map((warehouse) => (
                  <div key={warehouse.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">{warehouse.name}</h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {warehouse.status === 'active' ? 'Aktif' : warehouse.status}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{warehouse.location}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{warehouse.manager}</span>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Doluluk</span>
                          <span className="font-medium">{warehouse.utilization}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              warehouse.utilization > 90 ? 'bg-red-500' : 
                              warehouse.utilization > 75 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${warehouse.utilization}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Sıcaklık:</span>
                          <p className="font-medium">{warehouse.temperature}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Nem:</span>
                          <p className="font-medium">{warehouse.humidity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Son Hareketler */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Son Stok Hareketleri</h3>
                <div className="space-y-3">
                  {stockMovements.slice(0, 5).map((movement) => (
                    <div key={movement.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getMovementIcon(movement.type)}
                        <div>
                          <h4 className="font-medium text-gray-900">{movement.itemName}</h4>
                          <p className="text-sm text-gray-600">
                            {movement.quantity} {movement.unit} - {movement.reason}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{movement.user}</p>
                        <p className="text-xs text-gray-500">{movement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-4">
              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Ürün, kategori, barkod ara..."
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
                    value={filters.warehouse}
                    onChange={(e) => setFilters({ ...filters, warehouse: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Depolar</option>
                    {warehouses.map(warehouse => (
                      <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                    ))}
                  </select>
                  
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Kategoriler</option>
                    <option value="medical">Tıbbi Malzeme</option>
                    <option value="medicine">İlaç</option>
                    <option value="device">Tıbbi Cihaz</option>
                  </select>
                  
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="active">Aktif</option>
                    <option value="critical">Kritik</option>
                    <option value="warning">Uyarı</option>
                  </select>
                </div>
              </div>

              {/* Inventory Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ürün Bilgileri
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stok Durumu
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        AI Tahmin
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fiyat
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Depo/Konum
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {inventoryItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                <Package className="h-5 w-5 text-white" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              <div className="text-sm text-gray-500">{item.category} • {item.brand}</div>
                              <div className="text-xs text-gray-400">Kod: {item.id}</div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="text-lg font-bold text-gray-900">{item.currentStock}</div>
                            <div className="text-sm text-gray-500">{item.unit}</div>
                          </div>
                          <div className="w-20 bg-gray-200 rounded-full h-1 mt-1">
                            <div 
                              className={`h-1 rounded-full ${
                                item.currentStock <= item.minStock ? 'bg-red-500' : 
                                item.currentStock <= item.reorderPoint ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getStatusColor(item.status)}`}>
                            {item.status === 'active' ? 'Normal' : item.status === 'critical' ? 'Kritik' : item.status}
                          </span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(item.aiPrediction.trend)}
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.aiPrediction.daysUntilEmpty} gün
                              </div>
                              <div className="text-xs text-gray-500">
                                Sipariş: {item.aiPrediction.recommendedOrder}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.costPrice} {item.currency}</div>
                          <div className="text-xs text-gray-500">Satış: {item.salePrice} {item.currency}</div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{warehouses.find(w => w.id === item.warehouse)?.name}</div>
                          <div className="text-xs text-gray-500">{item.location}</div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => setSelectedItem(item)}
                              className="text-blue-600 hover:text-blue-700 p-1 rounded"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-700 p-1 rounded">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700 p-1 rounded">
                              <ShoppingCart className="h-4 w-4" />
                            </button>
                            <button className="text-purple-600 hover:text-purple-700 p-1 rounded">
                              <QrCode className="h-4 w-4" />
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

          {activeTab === 'movements' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hareket Tipi
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ürün
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Miktar
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Depo/Konum
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kullanıcı
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tarih
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stockMovements.map((movement) => (
                      <tr key={movement.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getMovementIcon(movement.type)}
                            <span className="text-sm font-medium capitalize">
                              {movement.type === 'in' ? 'Giriş' : movement.type === 'out' ? 'Çıkış' : 'Transfer'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{movement.itemName}</div>
                          <div className="text-sm text-gray-500">{movement.reason}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900">
                            {movement.quantity} {movement.unit}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {movement.type === 'transfer' 
                              ? `${warehouses.find(w => w.id === movement.fromWarehouse)?.name} → ${warehouses.find(w => w.id === movement.toWarehouse)?.name}`
                              : warehouses.find(w => w.id === movement.warehouse)?.name
                            }
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{movement.user}</div>
                          {movement.patient && (
                            <div className="text-xs text-gray-500">Hasta: {movement.patient}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {movement.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'warehouses' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {warehouses.map((warehouse) => (
                <div key={warehouse.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{warehouse.name}</h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {warehouse.status === 'active' ? 'Aktif' : warehouse.status}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{warehouse.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{warehouse.manager}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Warehouse className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{warehouse.capacity}</span>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Kapasite Kullanımı</span>
                        <span className="font-medium">{warehouse.utilization}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            warehouse.utilization > 90 ? 'bg-red-500' : 
                            warehouse.utilization > 75 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${warehouse.utilization}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="text-xs text-blue-600 font-medium">Sıcaklık</div>
                        <div className="text-sm font-bold text-blue-900">{warehouse.temperature}</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-xs text-green-600 font-medium">Nem</div>
                        <div className="text-sm font-bold text-green-900">{warehouse.humidity}</div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Son Sayım:</span>
                        <span className="font-medium">{warehouse.lastInventory}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors">
                        Detaylar
                      </button>
                      <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm py-2 rounded-lg transition-colors">
                        Sayım Yap
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'suppliers' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {suppliers.map((supplier) => (
                <div key={supplier.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">{supplier.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{supplier.contact}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{supplier.phone}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{supplier.email}</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{supplier.address}</span>
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium text-gray-700">Kategoriler:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {supplier.categories.map((category, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                      <div>
                        <span className="text-xs text-gray-500">Ödeme Vadesi:</span>
                        <p className="text-sm font-medium">{supplier.paymentTerms}</p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Teslimat:</span>
                        <p className="text-sm font-medium">{supplier.deliveryTime}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors">
                        Sipariş Ver
                      </button>
                      <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm py-2 rounded-lg transition-colors">
                        İletişim
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'ai-insights' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <span>AI Destekli Akıllı Öngörüler</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Tüketim Analizi</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span>Cerrahi malzeme tüketimi %15 arttı</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <TrendingDown className="h-4 w-4 text-red-600" />
                        <span>İlaç tüketimi %8 azaldı</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-blue-600" />
                        <span>Cihaz kullanımı stabil</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Otomatik Siparişler</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-orange-600" />
                        <span>3 ürün için sipariş önerisi</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>2 sipariş otomatik oluşturuldu</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span>1 kritik stok uyarısı</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Maliyet Optimizasyonu</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span>%12 maliyet tasarrufu</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span>Optimal stok seviyesi önerisi</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-purple-600" />
                        <span>En verimli tedarikçi analizi</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* AI Tahmin Grafikleri */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tüketim Trendi</h3>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {[65, 78, 82, 75, 88, 92, 85, 95, 88, 92, 85, 100].map((height, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-xs text-gray-500 mt-2">
                          {new Date(2024, index).toLocaleDateString('tr', { month: 'short' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Kategori Dağılımı</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Tıbbi Malzeme', value: 45, color: 'bg-blue-500' },
                      { name: 'İlaç', value: 30, color: 'bg-green-500' },
                      { name: 'Tıbbi Cihaz', value: 15, color: 'bg-purple-500' },
                      { name: 'Diğer', value: 10, color: 'bg-gray-500' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color.replace('bg-', '').replace('-500', '') }}></div>
                        <span className="text-sm text-gray-700 flex-1">{item.name}</span>
                        <span className="text-sm font-medium text-gray-900">%{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Stok Durum Raporu', desc: 'Mevcut stok durumu ve kritik seviyeler', icon: Package, color: 'blue' },
                  { title: 'Tüketim Analizi', desc: 'Aylık/yıllık tüketim trendleri', icon: BarChart3, color: 'green' },
                  { title: 'Maliyet Raporu', desc: 'Stok maliyeti ve karlılık analizi', icon: DollarSign, color: 'purple' },
                  { title: 'Tedarikçi Performansı', desc: 'Tedarikçi değerlendirme raporu', icon: Truck, color: 'orange' },
                  { title: 'Son Kullanma Raporu', desc: 'Yaklaşan son kullanma tarihleri', icon: Calendar, color: 'red' },
                  { title: 'Hareket Raporu', desc: 'Stok giriş/çıkış hareketleri', icon: Activity, color: 'indigo' }
                ].map((report, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className={`w-12 h-12 rounded-lg bg-${report.color}-100 flex items-center justify-center mb-4`}>
                      <report.icon className={`h-6 w-6 text-${report.color}-600`} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{report.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{report.desc}</p>
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors">
                        Görüntüle
                      </button>
                      <button className="px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI & Automation Panel */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span>AI Destekli Otomasyon & Entegrasyonlar</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Akıllı Tahmin</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Tüketim trend analizi</li>
              <li>• Mevsimsel talep tahmini</li>
              <li>• Otomatik sipariş önerileri</li>
              <li>• Kritik stok uyarıları</li>
              <li>• Maliyet optimizasyonu</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Otomatik İşlemler</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Barkod/QR kod tanıma</li>
              <li>• Otomatik stok güncellemesi</li>
              <li>• Tedarikçi entegrasyonu</li>
              <li>• ERP/Muhasebe senkronizasyonu</li>
              <li>• Mobil uygulama desteği</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Güvenlik & Uyumluluk</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Lot/seri numarası takibi</li>
              <li>• Son kullanma tarihi kontrolü</li>
              <li>• Audit trail ve loglama</li>
              <li>• KVKK/GDPR uyumluluğu</li>
              <li>• Rol bazlı erişim kontrolü</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && renderItemDetail(selectedItem)}
    </div>
  );
};

export default InventoryManagement;