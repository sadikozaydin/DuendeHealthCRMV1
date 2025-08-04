// Durum rengi
export const getStatusColor = (status: string) => {
  if (!status) return 'bg-gray-100 text-gray-800';
  
  switch (status) {
    case 'new': return 'bg-blue-100 text-blue-800'; // Artık kullanılmıyor
    case 'contacted': return 'bg-yellow-100 text-yellow-800';
    case 'qualified': return 'bg-green-100 text-green-800';
    case 'converted': return 'bg-purple-100 text-purple-800';
    case 'lost': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Durum adı
export const getStatusName = (status: string) => {
  if (!status) return 'İletişimde';
  
  switch (status) {
    case 'new': return 'Yeni'; // Artık kullanılmıyor
    case 'contacted': return 'İletişimde';
    case 'qualified': return 'Nitelikli';
    case 'converted': return 'Dönüştü';
    case 'lost': return 'Kayıp';
    default: return status || 'İletişimde';
  }
};

// Öncelik rengi
export const getPriorityColor = (priority?: string) => {
  if (!priority) return 'bg-yellow-100 text-yellow-800';
  
  switch (priority.toLowerCase()) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-yellow-100 text-yellow-800';
  }
};

// Öncelik adı
export const getPriorityName = (priority?: string) => {
  if (!priority) return 'Orta';
  
  switch (priority.toLowerCase()) {
    case 'high': return 'Yüksek';
    case 'medium': return 'Orta';
    case 'low': return 'Düşük';
    default: return priority || 'Orta';
  }
};

// Sıcaklık rengi
export const getTemperatureColor = (temperature?: string) => {
  if (!temperature) return 'text-orange-800';
  
  switch (temperature.toLowerCase()) {
    case 'hot': return 'text-red-800';
    case 'warm': return 'text-orange-800';
    case 'cold': return 'text-blue-800';
    default: return 'text-orange-800';
  }
};

// Sıcaklık adı
export const getTemperatureName = (temperature?: string) => {
  if (!temperature) return 'Ilımlı';
  
  switch (temperature.toLowerCase()) {
    case 'hot': return 'Sıcak';
    case 'warm': return 'Ilımlı';
    case 'cold': return 'Soğuk';
    default: return 'Ilımlı';
  }
};