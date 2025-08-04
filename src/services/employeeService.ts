// Employee Service - Supabase entegrasyonu için hazır

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  startDate: string;
  salary: number;
  status: 'active' | 'on_leave' | 'inactive';
  avatar?: string;
  performance: number;
  leaveBalance: number;
  lastCheckIn?: string;
  lastCheckOut?: string;
  employeeId: string;
  address?: string;
  emergencyContact?: string;
  bankAccount?: string;
  taxNumber?: string;
  socialSecurityNumber?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  totalHours?: number;
  overtime?: number;
  isLate: boolean;
  isEarlyLeave: boolean;
  status: 'present' | 'absent' | 'late' | 'half_day';
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'annual' | 'sick' | 'maternity' | 'emergency' | 'unpaid';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  period: string; // YYYY-MM format
  grossSalary: number;
  netSalary: number;
  overtime: number;
  bonus: number;
  deductions: number;
  taxDeduction: number;
  socialSecurityDeduction: number;
  paidAt?: string;
  status: 'draft' | 'approved' | 'paid';
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string;
  period: string;
  score: number;
  goals: string[];
  achievements: string[];
  improvements: string[];
  comments: string;
  status: 'draft' | 'completed';
  createdAt: string;
}

export interface TrainingRecord {
  id: string;
  employeeId: string;
  trainingName: string;
  provider: string;
  startDate: string;
  endDate: string;
  certificateUrl?: string;
  status: 'enrolled' | 'completed' | 'failed';
  score?: number;
}

// Employee CRUD Operations
export const getEmployees = async (): Promise<{ success: boolean; data: Employee[]; error?: string }> => {
  try {
    return getEmployeesFromLocalStorage();
  } catch (error) {
    console.error('Get employees error:', error);
    return getEmployeesFromLocalStorage();
  }
};

export const getEmployeeById = async (employeeId: string): Promise<{ success: boolean; data?: Employee; error?: string }> => {
  try {
    return getEmployeeFromLocalStorage(employeeId);
  } catch (error) {
    console.error('Get employee error:', error);
    return getEmployeeFromLocalStorage(employeeId);
  }
};

export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<{ success: boolean; data?: Employee; error?: string }> => {
  try {
    return createEmployeeInLocalStorage(employee);
  } catch (error) {
    console.error('Create employee error:', error);
    return createEmployeeInLocalStorage(employee);
  }
};

export const updateEmployee = async (employeeId: string, updates: Partial<Employee>): Promise<{ success: boolean; data?: Employee; error?: string }> => {
  try {
    return updateEmployeeInLocalStorage(employeeId, updates);
  } catch (error) {
    console.error('Update employee error:', error);
    return updateEmployeeInLocalStorage(employeeId, updates);
  }
};

// Attendance Operations
export const getAttendanceByEmployeeId = async (employeeId: string, month?: string): Promise<{ success: boolean; data: AttendanceRecord[]; error?: string }> => {
  try {
    return getAttendanceFromLocalStorage(employeeId, month);
  } catch (error) {
    console.error('Get attendance error:', error);
    return getAttendanceFromLocalStorage(employeeId, month);
  }
};

export const recordAttendance = async (attendance: Omit<AttendanceRecord, 'id'>): Promise<{ success: boolean; data?: AttendanceRecord; error?: string }> => {
  try {
    return recordAttendanceInLocalStorage(attendance);
  } catch (error) {
    console.error('Record attendance error:', error);
    return recordAttendanceInLocalStorage(attendance);
  }
};

// Leave Management
export const getLeaveRequests = async (employeeId?: string): Promise<{ success: boolean; data: LeaveRequest[]; error?: string }> => {
  try {
    return getLeaveRequestsFromLocalStorage(employeeId);
  } catch (error) {
    console.error('Get leave requests error:', error);
    return getLeaveRequestsFromLocalStorage(employeeId);
  }
};

export const createLeaveRequest = async (leaveRequest: Omit<LeaveRequest, 'id'>): Promise<{ success: boolean; data?: LeaveRequest; error?: string }> => {
  try {
    return createLeaveRequestInLocalStorage(leaveRequest);
  } catch (error) {
    console.error('Create leave request error:', error);
    return createLeaveRequestInLocalStorage(leaveRequest);
  }
};

// Payroll Operations
export const getPayrollForMonth = async (period: string, employeeId?: string): Promise<{ success: boolean; data: PayrollRecord[]; error?: string }> => {
  try {
    return getPayrollFromLocalStorage(period, employeeId);
  } catch (error) {
    console.error('Get payroll error:', error);
    return getPayrollFromLocalStorage(period, employeeId);
  }
};

// Performance Reviews
export const getPerformanceReviews = async (employeeId?: string): Promise<{ success: boolean; data: PerformanceReview[]; error?: string }> => {
  try {
    return getPerformanceReviewsFromLocalStorage(employeeId);
  } catch (error) {
    console.error('Get performance reviews error:', error);
    return getPerformanceReviewsFromLocalStorage(employeeId);
  }
};

// Training Records
export const getTrainingRecords = async (employeeId?: string): Promise<{ success: boolean; data: TrainingRecord[]; error?: string }> => {
  try {
    return getTrainingRecordsFromLocalStorage(employeeId);
  } catch (error) {
    console.error('Get training records error:', error);
    return getTrainingRecordsFromLocalStorage(employeeId);
  }
};

// LocalStorage Fallback Functions
const getEmployeesFromLocalStorage = (): { success: boolean; data: Employee[] } => {
  try {
    const stored = localStorage.getItem('hr_employees');
    if (stored) {
      return { success: true, data: JSON.parse(stored) };
    }
    
    // Mock data for demo
    const mockEmployees: Employee[] = [
      {
        id: '1',
        name: 'Dr. Mehmet Özkan',
        position: 'Kardiyolog',
        department: 'Tıp',
        email: 'mehmet.ozkan@duendehealth.com',
        phone: '+90 532 123 45 67',
        startDate: '2023-01-15',
        salary: 45000,
        status: 'active',
        avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150',
        performance: 4.8,
        leaveBalance: 15,
        lastCheckIn: '09:00',
        lastCheckOut: '18:30',
        employeeId: 'EMP001'
      },
      {
        id: '2',
        name: 'Fatma Yılmaz',
        position: 'Satış Temsilcisi',
        department: 'Satış',
        email: 'fatma.yilmaz@duendehealth.com',
        phone: '+90 532 234 56 78',
        startDate: '2023-03-20',
        salary: 25000,
        status: 'active',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        performance: 4.6,
        leaveBalance: 12,
        lastCheckIn: '08:45',
        lastCheckOut: '17:45',
        employeeId: 'EMP002'
      },
      {
        id: '3',
        name: 'Zeynep Demir',
        position: 'Koordinatör',
        department: 'Operasyon',
        email: 'zeynep.demir@duendehealth.com',
        phone: '+90 532 345 67 89',
        startDate: '2022-11-10',
        salary: 30000,
        status: 'active',
        avatar: 'https://images.pexels.com/photos/7180651/pexels-photo-7180651.jpeg?auto=compress&cs=tinysrgb&w=150',
        performance: 4.9,
        leaveBalance: 8,
        lastCheckIn: '09:15',
        lastCheckOut: '18:00',
        employeeId: 'EMP003'
      },
      {
        id: '4',
        name: 'Ahmet Kaya',
        position: 'Hemşire',
        department: 'Tıp',
        email: 'ahmet.kaya@duendehealth.com',
        phone: '+90 532 456 78 90',
        startDate: '2023-06-01',
        salary: 22000,
        status: 'on_leave',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        performance: 4.4,
        leaveBalance: 20,
        lastCheckIn: '-',
        lastCheckOut: '-',
        employeeId: 'EMP004'
      }
    ];
    
    localStorage.setItem('hr_employees', JSON.stringify(mockEmployees));
    return { success: true, data: mockEmployees };
  } catch (error) {
    return { success: false, data: [] };
  }
};

const getEmployeeFromLocalStorage = (employeeId: string): { success: boolean; data?: Employee; error?: string } => {
  try {
    const { data: employees } = getEmployeesFromLocalStorage();
    const employee = employees.find(emp => emp.id === employeeId);
    
    if (employee) {
      return { success: true, data: employee };
    } else {
      return { success: false, error: 'Employee not found' };
    }
  } catch (error) {
    return { success: false, error: 'Failed to get employee from localStorage' };
  }
};

const createEmployeeInLocalStorage = (employee: Omit<Employee, 'id'>): { success: boolean; data: Employee; error?: string } => {
  try {
    const { data: employees } = getEmployeesFromLocalStorage();
    const newEmployee: Employee = {
      ...employee,
      id: `emp_${Date.now()}`,
    };
    
    employees.push(newEmployee);
    localStorage.setItem('hr_employees', JSON.stringify(employees));
    
    return { success: true, data: newEmployee };
  } catch (error) {
    return { success: false, data: null, error: 'Failed to create employee in localStorage' };
  }
};

const updateEmployeeInLocalStorage = (employeeId: string, updates: Partial<Employee>): { success: boolean; data?: Employee; error?: string } => {
  try {
    const { data: employees } = getEmployeesFromLocalStorage();
    const index = employees.findIndex(emp => emp.id === employeeId);
    
    if (index !== -1) {
      employees[index] = { ...employees[index], ...updates };
      localStorage.setItem('hr_employees', JSON.stringify(employees));
      return { success: true, data: employees[index] };
    } else {
      return { success: false, error: 'Employee not found' };
    }
  } catch (error) {
    return { success: false, error: 'Failed to update employee in localStorage' };
  }
};

const getAttendanceFromLocalStorage = (employeeId: string, month?: string): { success: boolean; data: AttendanceRecord[] } => {
  try {
    // Mock attendance data
    const mockAttendance: AttendanceRecord[] = [
      {
        id: '1',
        employeeId,
        date: '2025-01-15',
        checkIn: '09:00',
        checkOut: '18:30',
        totalHours: 9.5,
        overtime: 0.5,
        isLate: false,
        isEarlyLeave: false,
        status: 'present'
      },
      {
        id: '2',
        employeeId,
        date: '2025-01-14',
        checkIn: '09:15',
        checkOut: '18:00',
        totalHours: 8.75,
        overtime: 0,
        isLate: true,
        isEarlyLeave: false,
        status: 'late'
      }
    ];
    
    return { success: true, data: mockAttendance };
  } catch (error) {
    return { success: false, data: [] };
  }
};

const recordAttendanceInLocalStorage = (attendance: Omit<AttendanceRecord, 'id'>): { success: boolean; data: AttendanceRecord } => {
  try {
    const newRecord: AttendanceRecord = {
      ...attendance,
      id: `att_${Date.now()}`,
    };
    
    return { success: true, data: newRecord };
  } catch (error) {
    return { success: false, data: null };
  }
};

const getLeaveRequestsFromLocalStorage = (employeeId?: string): { success: boolean; data: LeaveRequest[] } => {
  try {
    // Mock leave requests
    const mockLeaveRequests: LeaveRequest[] = [
      {
        id: '1',
        employeeId: employeeId || '1',
        type: 'annual',
        startDate: '2025-02-01',
        endDate: '2025-02-05',
        days: 5,
        reason: 'Yıllık izin',
        status: 'approved',
        createdAt: '2025-01-15T10:00:00Z'
      }
    ];
    
    return { success: true, data: mockLeaveRequests };
  } catch (error) {
    return { success: false, data: [] };
  }
};

const createLeaveRequestInLocalStorage = (leaveRequest: Omit<LeaveRequest, 'id'>): { success: boolean; data: LeaveRequest } => {
  try {
    const newRequest: LeaveRequest = {
      ...leaveRequest,
      id: `leave_${Date.now()}`,
    };
    
    return { success: true, data: newRequest };
  } catch (error) {
    return { success: false, data: null };
  }
};

const getPayrollFromLocalStorage = (period: string, employeeId?: string): { success: boolean; data: PayrollRecord[] } => {
  try {
    // Mock payroll data
    const mockPayroll: PayrollRecord[] = [
      {
        id: '1',
        employeeId: employeeId || '1',
        period,
        grossSalary: 45000,
        netSalary: 32400,
        overtime: 2500,
        bonus: 5000,
        deductions: 2100,
        taxDeduction: 8000,
        socialSecurityDeduction: 7000,
        status: 'paid'
      }
    ];
    
    return { success: true, data: mockPayroll };
  } catch (error) {
    return { success: false, data: [] };
  }
};

const getPerformanceReviewsFromLocalStorage = (employeeId?: string): { success: boolean; data: PerformanceReview[] } => {
  try {
    // Mock performance reviews
    const mockReviews: PerformanceReview[] = [
      {
        id: '1',
        employeeId: employeeId || '1',
        reviewerId: 'manager_1',
        period: '2024-Q4',
        score: 4.8,
        goals: ['Hasta memnuniyetini artırma', 'Yeni teknikleri öğrenme'],
        achievements: ['%95 hasta memnuniyeti', 'Yeni cerrahi teknik sertifikası'],
        improvements: ['Zaman yönetimi', 'Ekip iletişimi'],
        comments: 'Mükemmel performans gösterdi',
        status: 'completed',
        createdAt: '2024-12-15T10:00:00Z'
      }
    ];
    
    return { success: true, data: mockReviews };
  } catch (error) {
    return { success: false, data: [] };
  }
};

const getTrainingRecordsFromLocalStorage = (employeeId?: string): { success: boolean; data: TrainingRecord[] } => {
  try {
    // Mock training records
    const mockTraining: TrainingRecord[] = [
      {
        id: '1',
        employeeId: employeeId || '1',
        trainingName: 'Hasta Güvenliği Eğitimi',
        provider: 'Sağlık Bakanlığı',
        startDate: '2024-11-01',
        endDate: '2024-11-03',
        status: 'completed',
        score: 95
      },
      {
        id: '2',
        employeeId: employeeId || '1',
        trainingName: 'KVKK Uyum Eğitimi',
        provider: 'Duende Health',
        startDate: '2024-10-15',
        endDate: '2024-10-15',
        status: 'completed',
        score: 88
      }
    ];
    
    return { success: true, data: mockTraining };
  } catch (error) {
    return { success: false, data: [] };
  }
};

// Export utility functions
export const calculateWorkingHours = (checkIn: string, checkOut: string): number => {
  const start = new Date(`2000-01-01 ${checkIn}`);
  const end = new Date(`2000-01-01 ${checkOut}`);
  return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
};

export const calculateOvertime = (totalHours: number, standardHours: number = 8): number => {
  return Math.max(0, totalHours - standardHours);
};

export const formatSalary = (amount: number, currency: string = 'TRY'): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const getLeaveTypeLabel = (type: string): string => {
  const labels = {
    annual: 'Yıllık İzin',
    sick: 'Hastalık İzni',
    maternity: 'Doğum İzni',
    emergency: 'Acil Durum İzni',
    unpaid: 'Ücretsiz İzin'
  };
  return labels[type] || type;
};

export const getStatusLabel = (status: string): string => {
  const labels = {
    active: 'Aktif',
    on_leave: 'İzinli',
    inactive: 'Pasif',
    pending: 'Beklemede',
    approved: 'Onaylandı',
    rejected: 'Reddedildi',
    draft: 'Taslak',
    completed: 'Tamamlandı',
    paid: 'Ödendi'
  };
  return labels[status] || status;
};