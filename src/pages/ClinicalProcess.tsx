import React, { useState } from 'react';
import { Activity, Calendar, Clock, User, FileText, CheckCircle, AlertTriangle, Plus, Filter, Search, Download, Upload, Eye, Edit, Trash2, Heart, Stethoscope, Pill, Camera, Clipboard, Users, Building2, Phone, Mail, MapPin, Star, TrendingUp, BarChart3, Target, Zap, Shield, Globe, Settings, Bell, RefreshCw, ChevronLeft, ChevronRight, MoreHorizontal, UserCheck, AlertCircle, PlayCircle, PauseCircle, StopCircle, RotateCcw, Thermometer, Droplets, Zap as Lightning, Brain, Scissors, Syringe, Ban as Bandage, Monitor, Wifi, Database, Lock, Unlock, Flag, Timer, Layers, Grid, List, Calendar as CalendarIcon, ChevronDown, ChevronUp, Bot } from 'lucide-react';

const ClinicalProcess = () => {
  const [activeView, setActiveView] = useState('calendar');
  const [calendarView, setCalendarView] = useState('day'); // day, week, month, year
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for clinical processes
  const clinicalProcesses = [
    {
      id: 1,
      patientId: 'P001',
      patientName: 'Maria Rodriguez',
      age: 45,
      diagnosis: 'Koroner Arter Hastalığı',
      treatment: 'Bypass Cerrahisi',
      doctor: 'Dr. Mehmet Yılmaz',
      team: ['Dr. Mehmet Yılmaz', 'Hemşire Ayşe', 'Anestezi Dr. Ali'],
      room: 'Ameliyathane 3',
      startDate: '2025-01-15',
      startTime: '08:00',
      duration: 240, // minutes
      status: 'Devam Ediyor',
      stage: 'Ameliyat',
      progress: 65,
      priority: 'Yüksek',
      riskLevel: 'Orta',
      vitals: {
        heartRate: 72,
        bloodPressure: '120/80',
        temperature: 36.5,
        oxygen: 98
      },
      medications: [
        { name: 'Aspirin', dose: '100mg', frequency: '1x1', route: 'Oral' },
        { name: 'Metoprolol', dose: '50mg', frequency: '2x1', route: 'Oral' }
      ],
      supplies: [
        { name: 'Stent', quantity: 2, lot: 'ST2025001', brand: 'Medtronic' },
        { name: 'Sutur', quantity: 5, lot: 'SU2025002', brand: 'Ethicon' }
      ],
      documents: [
        { name: 'Ameliyat Onamı', status: 'İmzalandı', date: '2025-01-14' },
        { name: 'Anestezi Onamı', status: 'İmzalandı', date: '2025-01-14' }
      ],
      timeline: [
        { time: '08:00', action: 'Hasta ameliyathaneye alındı', user: 'Hemşire Ayşe', status: 'completed' },
        { time: '08:15', action: 'Anestezi uygulandı', user: 'Dr. Ali Veli', status: 'completed' },
        { time: '08:30', action: 'Cerrahi başlatıldı', user: 'Dr. Mehmet Yılmaz', status: 'completed' },
        { time: '10:30', action: 'Bypass tamamlandı', user: 'Dr. Mehmet Yılmaz', status: 'in-progress' },
        { time: '12:00', action: 'Kapama işlemi', user: 'Dr. Mehmet Yılmaz', status: 'pending' }
      ],
      notes: 'Hasta ameliyat öncesi değerlendirmesi normal. Kardiyak fonksiyonlar stabil.',
      complications: [],
      nextSteps: ['Yoğun bakım transferi', 'Post-op takip', 'Mobilizasyon']
    },
    {
      id: 2,
      patientId: 'P002',
      patientName: 'Ahmed Hassan',
      age: 58,
      diagnosis: 'Diz Osteoartriti',
      treatment: 'Total Diz Protezi',
      doctor: 'Dr. Fatma Kaya',
      team: ['Dr. Fatma Kaya', 'Hemşire Zehra', 'Fizyoterapist Murat'],
      room: 'Ameliyathane 1',
      startDate: '2025-01-15',
      startTime: '10:00',
      duration: 120,
      status: 'Tamamlandı',
      stage: 'Post-Op Bakım',
      progress: 100,
      priority: 'Orta',
      riskLevel: 'Düşük',
      vitals: {
        heartRate: 68,
        bloodPressure: '110/70',
        temperature: 36.8,
        oxygen: 99
      },
      medications: [
        { name: 'İbuprofen', dose: '400mg', frequency: '3x1', route: 'Oral' },
        { name: 'Enoxaparin', dose: '40mg', frequency: '1x1', route: 'SC' }
      ],
      supplies: [
        { name: 'Diz Protezi', quantity: 1, lot: 'KP2025001', brand: 'Zimmer' },
        { name: 'Kemik Çimentosu', quantity: 1, lot: 'KC2025001', brand: 'Stryker' }
      ],
      documents: [
        { name: 'Ameliyat Onamı', status: 'İmzalandı', date: '2025-01-14' },
        { name: 'Protez Bilgi Formu', status: 'İmzalandı', date: '2025-01-14' }
      ],
      timeline: [
        { time: '10:00', action: 'Hasta ameliyathaneye alındı', user: 'Hemşire Zehra', status: 'completed' },
        { time: '10:15', action: 'Spinal anestezi', user: 'Dr. Mehmet Anestezi', status: 'completed' },
        { time: '10:30', action: 'Cerrahi başlatıldı', user: 'Dr. Fatma Kaya', status: 'completed' },
        { time: '11:30', action: 'Protez yerleştirildi', user: 'Dr. Fatma Kaya', status: 'completed' },
        { time: '12:00', action: 'Ameliyat tamamlandı', user: 'Dr. Fatma Kaya', status: 'completed' }
      ],
      notes: 'Ameliyat komplikasyonsuz tamamlandı. Protez optimal pozisyonda.',
      complications: [],
      nextSteps: ['Fizik tedavi başlangıcı', 'Mobilizasyon', 'Taburcu planlaması']
    }
  ];

  const todayProcesses = clinicalProcesses.filter(process => 
    process.startDate === '2025-01-15'
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Devam Ediyor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Tamamlandı': return 'bg-green-100 text-green-800 border-green-200';
      case 'Beklemede': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'İptal': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Yüksek': return 'bg-red-100 text-red-800';
      case 'Orta': return 'bg-yellow-100 text-yellow-800';
      case 'Düşük': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Yüksek': return 'text-red-600';
      case 'Orta': return 'text-yellow-600';
      case 'Düşük': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getTimelineStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <PlayCircle className="h-4 w-4 text-blue-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-gray-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const renderCalendarView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    
    if (calendarView === 'day') {
      return (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedDate.toLocaleDateString('tr-TR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24*60*60*1000))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setSelectedDate(new Date())}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded"
                >
                  Bugün
                </button>
                <button 
                  onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24*60*60*1000))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-96">
            {hours.map(hour => (
              <div key={hour} className="flex border-b border-gray-100">
                <div className="w-16 p-2 text-sm text-gray-500 text-right">
                  {hour.toString().padStart(2, '0')}:00
                </div>
                <div className="flex-1 p-2 min-h-[60px] relative">
                  {todayProcesses
                    .filter(process => parseInt(process.startTime.split(':')[0]) === hour)
                    .map(process => (
                      <div 
                        key={process.id}
                        onClick={() => setSelectedPatient(process)}
                        className="absolute left-2 right-2 bg-blue-100 border-l-4 border-blue-500 p-2 rounded cursor-pointer hover:bg-blue-200 transition-colors"
                        style={{ 
                          top: `${parseInt(process.startTime.split(':')[1]) * 60 / 60}px`,
                          height: `${Math.min(process.duration, 60)}px`
                        }}
                      >
                        <div className="text-sm font-medium text-blue-900">{process.patientName}</div>
                        <div className="text-xs text-blue-700">{process.treatment}</div>
                        <div className="text-xs text-blue-600">{process.doctor}</div>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (calendarView === 'week') {
      const weekDays = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
      return (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Haftalık Görünüm</h3>
          </div>
          <div className="grid grid-cols-8 gap-px bg-gray-200">
            <div className="bg-white p-2"></div>
            {weekDays.map(day => (
              <div key={day} className="bg-white p-2 text-center text-sm font-medium text-gray-700">
                {day}
              </div>
            ))}
            {hours.slice(8, 18).map(hour => (
              <React.Fragment key={hour}>
                <div className="bg-white p-2 text-sm text-gray-500 text-right">
                  {hour.toString().padStart(2, '0')}:00
                </div>
                {weekDays.map((day, dayIndex) => (
                  <div key={`${hour}-${dayIndex}`} className="bg-white p-1 min-h-[40px] border-r border-gray-100">
                    {/* Sample processes for demonstration */}
                    {hour === 9 && dayIndex === 0 && (
                      <div className="bg-blue-100 text-xs p-1 rounded">
                        <div className="font-medium">Maria R.</div>
                        <div>Kalp Cerrahisi</div>
                      </div>
                    )}
                    {hour === 10 && dayIndex === 0 && (
                      <div className="bg-green-100 text-xs p-1 rounded">
                        <div className="font-medium">Ahmed H.</div>
                        <div>Diz Protezi</div>
                      </div>
                    )}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      );
    }

    if (calendarView === 'month') {
      const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
      const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
      const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      
      return (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedDate.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })}
            </h3>
          </div>
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
              <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-700">
                {day}
              </div>
            ))}
            {Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-white p-2 h-24"></div>
            ))}
            {days.map(day => (
              <div key={day} className="bg-white p-2 h-24 border-r border-b border-gray-100">
                <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
                {day === 15 && (
                  <div className="space-y-1">
                    <div className="bg-blue-100 text-xs p-1 rounded">2 Ameliyat</div>
                    <div className="bg-green-100 text-xs p-1 rounded">5 Kontrol</div>
                  </div>
                )}
                {day === 16 && (
                  <div className="bg-yellow-100 text-xs p-1 rounded">3 Konsültasyon</div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (calendarView === 'year') {
      const months = Array.from({ length: 12 }, (_, i) => i);
      return (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{selectedDate.getFullYear()} Yılı</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 p-4">
            {months.map(month => (
              <div key={month} className="border border-gray-200 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-2">
                  {new Date(selectedDate.getFullYear(), month).toLocaleDateString('tr-TR', { month: 'long' })}
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Toplam İşlem:</span>
                    <span className="font-medium">{Math.floor(Math.random() * 50) + 10}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Başarı Oranı:</span>
                    <span className="font-medium text-green-600">{Math.floor(Math.random() * 10) + 90}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Komplikasyon:</span>
                    <span className="font-medium text-red-600">{Math.floor(Math.random() * 5)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  const renderPatientDetail = (patient) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Stethoscope className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{patient.patientName}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{patient.age} yaş</span>
                <span>•</span>
                <span>{patient.diagnosis}</span>
                <span>•</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedPatient(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Genel Bakış', icon: Eye },
              { id: 'timeline', label: 'Zaman Çizelgesi', icon: Clock },
              { id: 'vitals', label: 'Vital Bulgular', icon: Heart },
              { id: 'medications', label: 'İlaçlar', icon: Pill },
              { id: 'supplies', label: 'Sarf Malzeme', icon: Clipboard },
              { id: 'documents', label: 'Belgeler', icon: FileText },
              { id: 'team', label: 'Ekip', icon: Users }
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

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Ana Bilgiler */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Tedavi Bilgileri</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Tedavi:</span>
                      <p className="font-medium">{patient.treatment}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Doktor:</span>
                      <p className="font-medium">{patient.doctor}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Oda:</span>
                      <p className="font-medium">{patient.room}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Süre:</span>
                      <p className="font-medium">{patient.duration} dakika</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Öncelik:</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(patient.priority)}`}>
                        {patient.priority}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Risk Seviyesi:</span>
                      <span className={`font-medium ${getRiskColor(patient.riskLevel)}`}>
                        {patient.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">İlerleme Durumu</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Tedavi İlerlemesi</span>
                        <span>{patient.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${patient.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Mevcut Aşama:</strong> {patient.stage}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Doktor Notları</h3>
                  <p className="text-sm text-gray-700 bg-white p-3 rounded border-l-4 border-blue-500">
                    {patient.notes}
                  </p>
                </div>
              </div>

              {/* Sağ Panel */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Ekip Üyeleri</h3>
                  <div className="space-y-2">
                    {patient.team.map((member, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{member}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Sonraki Adımlar</h3>
                  <div className="space-y-2">
                    {patient.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Onam Durumu</h3>
                  <div className="space-y-2">
                    {patient.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{doc.name}</span>
                        <span className="text-green-600 font-medium">{doc.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">İşlem Zaman Çizelgesi</h3>
              <div className="space-y-4">
                {patient.timeline.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      {getTimelineStatusIcon(item.status)}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{item.action}</span>
                          <span className="text-sm text-gray-500">{item.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">Uygulayan: {item.user}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-900">Vital Bulgular</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    <span className="font-medium text-red-900">Nabız</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600">{patient.vitals.heartRate}</p>
                  <p className="text-sm text-red-700">atım/dk</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Droplets className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Tansiyon</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{patient.vitals.bloodPressure}</p>
                  <p className="text-sm text-blue-700">mmHg</p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Thermometer className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-900">Ateş</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{patient.vitals.temperature}°</p>
                  <p className="text-sm text-orange-700">Celsius</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightning className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-900">Oksijen</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{patient.vitals.oxygen}%</p>
                  <p className="text-sm text-green-700">SpO2</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Mevcut İlaçlar</h3>
              <div className="space-y-3">
                {patient.medications.map((med, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{med.name}</h4>
                        <p className="text-sm text-gray-600">
                          {med.dose} - {med.frequency} - {med.route}
                        </p>
                      </div>
                      <Pill className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'supplies' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Kullanılan Sarf Malzemeler</h3>
              <div className="space-y-3">
                {patient.supplies.map((supply, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{supply.name}</h4>
                        <p className="text-sm text-gray-600">
                          Miktar: {supply.quantity} | Lot: {supply.lot} | Marka: {supply.brand}
                        </p>
                      </div>
                      <Clipboard className="h-5 w-5 text-purple-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Belgeler ve Onamlar</h3>
              <div className="space-y-3">
                {patient.documents.map((doc, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-600">Tarih: {doc.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 font-medium text-sm">{doc.status}</span>
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Tedavi Ekibi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patient.team.map((member, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{member}</h4>
                        <p className="text-sm text-gray-600">Aktif</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Klinik Süreç Yönetimi</h1>
          <p className="text-gray-600 mt-1">Eksiksiz tedavi takibi, takvim yönetimi ve klinik süreç otomasyonu</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Upload className="h-4 w-4" />
            <span>Belge Yükle</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Yeni İşlem</span>
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bugünkü İşlemler</p>
              <p className="text-3xl font-bold text-blue-600">{todayProcesses.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm text-blue-600 mt-2">2 ameliyat, 3 kontrol</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Aktif Tedaviler</p>
              <p className="text-3xl font-bold text-green-600">24</p>
            </div>
            <Stethoscope className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-600 mt-2">18 devam ediyor</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Bekleyen Onamlar</p>
              <p className="text-3xl font-bold text-yellow-600">3</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
          <p className="text-sm text-yellow-600 mt-2">Acil: 1</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Başarı Oranı</p>
              <p className="text-3xl font-bold text-purple-600">96%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm text-purple-600 mt-2">Bu ay +2%</p>
        </div>
      </div>

      {/* AI Destekli Klinik Süreç Otomasyonu */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <span>🤖 AI Destekli Klinik Süreç Otomasyonu</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Akıllı Görev & Hatırlatma</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Tedaviye özel görev atamaları</li>
              <li>• Eksik malzeme/cihaz uyarıları</li>
              <li>• Onam/doküman kontrolü</li>
              <li>• Otomatik bildirimler</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Klinik Statü & İzleme</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Aktif tedavi takibi</li>
              <li>• Komplikasyon yönetimi</li>
              <li>• AI ile otomatik flag</li>
              <li>• Kapanan dosya uyarısı</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Klinik Karar Desteği</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Benzer vaka analizleri</li>
              <li>• Risk değerlendirmesi</li>
              <li>• Tedavi önerileri</li>
              <li>• Performans analizi</li>
            </ul>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'calendar', label: 'Klinik Takvimi', icon: CalendarIcon },
              { id: 'processes', label: 'Aktif Süreçler', icon: Activity },
              { id: 'analytics', label: 'Analitik', icon: BarChart3 }
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeView === view.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <view.icon className="h-4 w-4" />
                <span>{view.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeView === 'calendar' && (
            <div className="space-y-4">
              {/* Calendar Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-900">Klinik Takvimi</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setCalendarView('day')}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        calendarView === 'day' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Gün
                    </button>
                    <button
                      onClick={() => setCalendarView('week')}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        calendarView === 'week' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Hafta
                    </button>
                    <button
                      onClick={() => setCalendarView('month')}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        calendarView === 'month' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Ay
                    </button>
                    <button
                      onClick={() => setCalendarView('year')}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        calendarView === 'year' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      Yıl
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4" />
                    <span>Filtrele</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Plus className="h-4 w-4" />
                    <span>Yeni İşlem</span>
                  </button>
                </div>
              </div>

              {/* Calendar View */}
              {renderCalendarView()}
            </div>
          )}

          {activeView === 'processes' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Aktif Klinik Süreçler</h3>
              <div className="space-y-4">
                {clinicalProcesses.map((process) => (
                  <div 
                    key={process.id} 
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedPatient(process)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <Stethoscope className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{process.patientName}</h4>
                          <p className="text-gray-600">{process.treatment}</p>
                          <p className="text-sm text-gray-500">{process.doctor} • {process.room}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full border ${getStatusColor(process.status)}`}>
                          {process.status}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(process.priority)}`}>
                          {process.priority}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">Başlangıç</h5>
                        <p className="text-sm text-gray-600">{process.startDate} {process.startTime}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">Süre</h5>
                        <p className="text-sm text-gray-600">{process.duration} dakika</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">Aşama</h5>
                        <p className="text-sm text-gray-600">{process.stage}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-1">İlerleme</h5>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${process.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{process.progress}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{process.team.length} kişi</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <FileText className="h-4 w-4" />
                          <span>{process.documents.length} belge</span>
                        </span>
                        <span className={`flex items-center space-x-1 ${getRiskColor(process.riskLevel)}`}>
                          <AlertTriangle className="h-4 w-4" />
                          <span>{process.riskLevel} risk</span>
                        </span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Detayları Görüntüle →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeView === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Klinik Analitik</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-medium text-blue-900 mb-4">İşlem Performansı</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Günlük Ortalama:</span>
                      <span className="font-bold text-blue-900">12 işlem</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Başarı Oranı:</span>
                      <span className="font-bold text-blue-900">96%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Ortalama Süre:</span>
                      <span className="font-bold text-blue-900">145 dk</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
                  <h4 className="font-medium text-green-900 mb-4">Kaynak Kullanımı</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700">Oda Doluluk:</span>
                      <span className="font-bold text-green-900">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Ekip Verimliliği:</span>
                      <span className="font-bold text-green-900">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Malzeme Kullanımı:</span>
                      <span className="font-bold text-green-900">Optimal</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6">
                  <h4 className="font-medium text-purple-900 mb-4">Kalite Metrikleri</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-purple-700">Hasta Memnuniyeti:</span>
                      <span className="font-bold text-purple-900">4.8/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Komplikasyon:</span>
                      <span className="font-bold text-purple-900">2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-700">Tekrar İşlem:</span>
                      <span className="font-bold text-purple-900">1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && renderPatientDetail(selectedPatient)}

      {/* Randevu Türleri */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            <span>Randevu Türleri ve Kategoriler</span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">Klinik süreçlerde kullanılan randevu türleri ve renk kodları</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {/* Ameliyat Randevuları */}
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <h4 className="font-semibold text-red-900">Ameliyat</h4>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Kalp Cerrahisi</li>
                <li>• Ortopedik Cerrahi</li>
                <li>• Plastik Cerrahi</li>
                <li>• Genel Cerrahi</li>
              </ul>
              <div className="mt-3 text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                Yüksek Öncelik
              </div>
            </div>

            {/* Konsültasyon */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <h4 className="font-semibold text-blue-900">Konsültasyon</h4>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• İlk Değerlendirme</li>
                <li>• Uzman Görüşü</li>
                <li>• İkinci Görüş</li>
                <li>• Online Konsültasyon</li>
              </ul>
              <div className="mt-3 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                Orta Öncelik
              </div>
            </div>

            {/* Kontrol Muayenesi */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <h4 className="font-semibold text-green-900">Kontrol</h4>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Post-Op Kontrol</li>
                <li>• Rutin Kontrol</li>
                <li>• Takip Muayenesi</li>
                <li>• Periyodik Kontrol</li>
              </ul>
              <div className="mt-3 text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                Normal Öncelik
              </div>
            </div>

            {/* Tetkik ve Tahlil */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <h4 className="font-semibold text-purple-900">Tetkik</h4>
              </div>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Laboratuvar</li>
                <li>• Radyoloji</li>
                <li>• EKG/EKO</li>
                <li>• Biyopsi</li>
              </ul>
              <div className="mt-3 text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                Acil/Normal
              </div>
            </div>

            {/* Fizik Tedavi */}
            <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <h4 className="font-semibold text-orange-900">Fizik Tedavi</h4>
              </div>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Rehabilitasyon</li>
                <li>• Egzersiz Terapisi</li>
                <li>• Manuel Terapi</li>
                <li>• Elektroterapi</li>
              </ul>
              <div className="mt-3 text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">
                Düzenli Seans
              </div>
            </div>

            {/* Acil Durum */}
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
                <h4 className="font-semibold text-red-900">Acil</h4>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Acil Müdahale</li>
                <li>• Komplikasyon</li>
                <li>• Kritik Durum</li>
                <li>• Ambulans Çağrısı</li>
              </ul>
              <div className="mt-3 text-xs text-red-600 bg-red-200 px-2 py-1 rounded font-bold">
                EN YÜKSEK ÖNCELİK
              </div>
            </div>

            {/* Anestezi */}
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
                <h4 className="font-semibold text-indigo-900">Anestezi</h4>
              </div>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Anestezi Konsültasyonu</li>
                <li>• Pre-Op Değerlendirme</li>
                <li>• Ağrı Yönetimi</li>
                <li>• Sedasyon</li>
              </ul>
              <div className="mt-3 text-xs text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                Ameliyat Öncesi
              </div>
            </div>

            {/* Diş Tedavisi */}
            <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
                <h4 className="font-semibold text-teal-900">Diş Tedavisi</h4>
              </div>
              <ul className="text-sm text-teal-700 space-y-1">
                <li>• İmplant</li>
                <li>• Ortodonti</li>
                <li>• Endodonti</li>
                <li>• Estetik Diş</li>
              </ul>
              <div className="mt-3 text-xs text-teal-600 bg-teal-100 px-2 py-1 rounded">
                Özel Branş
              </div>
            </div>
          </div>

          {/* Renk Kodu Açıklaması */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">Renk Kodu Sistemi</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Ameliyat / Acil (Kırmızı)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Konsültasyon (Mavi)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Kontrol (Yeşil)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Tetkik (Mor)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Fizik Tedavi (Turuncu)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-indigo-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Anestezi (İndigo)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-teal-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Diş Tedavisi (Teal)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Diğer (Gri)</span>
              </div>
            </div>
          </div>

          {/* Kullanım Bilgisi */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">💡 Kullanım Bilgisi</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h5 className="font-medium mb-1">Takvim Görünümünde:</h5>
                <ul className="space-y-1">
                  <li>• Her randevu türü kendi renginde görünür</li>
                  <li>• Öncelik seviyesi border kalınlığı ile belirtilir</li>
                  <li>• Acil durumlar yanıp söner (animate-pulse)</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-1">Filtreleme:</h5>
                <ul className="space-y-1">
                  <li>• Randevu türüne göre filtreleme yapılabilir</li>
                  <li>• Öncelik seviyesine göre sıralama</li>
                  <li>• Doktor/ekip bazında görünüm</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalProcess;