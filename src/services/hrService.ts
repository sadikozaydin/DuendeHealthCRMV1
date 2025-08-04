
// Types
export interface EmployeeFile {
  id: string;
  employee_id: string;
  file_name: string;
  file_type: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  uploaded_by?: string;
  uploaded_at: string;
}

export interface Permission {
  id: string;
  employee_id: string;
  type: string;
  start_date: string;
  end_date: string;
  days: number;
  reason: string;
  status: string;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
}

export interface Attendance {
  id: string;
  employee_id: string;
  date: string;
  check_in?: string;
  check_out?: string;
  total_hours?: number;
  overtime?: number;
  is_late: boolean;
  is_early_leave: boolean;
  status: string;
  created_at: string;
}

export interface Payroll {
  id: string;
  employee_id: string;
  period: string;
  gross_salary: number;
  net_salary: number;
  overtime?: number;
  bonus?: number;
  deductions?: number;
  tax_deduction?: number;
  social_security_deduction?: number;
  paid_at?: string;
  status: string;
  created_at: string;
}

export interface Evaluation {
  id: string;
  employee_id: string;
  reviewer_id: string;
  period: string;
  score: number;
  goals: string[];
  achievements: string[];
  improvements: string[];
  comments?: string;
  status: string;
  created_at: string;
}

export interface Training {
  id: string;
  employee_id: string;
  training_name: string;
  provider: string;
  start_date: string;
  end_date: string;
  certificate_url?: string;
  status: string;
  score?: number;
  created_at: string;
}

// Service Response Type
interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Employee Files
export const getEmployeeFiles = async (employeeId: string): Promise<ServiceResponse<EmployeeFile[]>> => {
  try {
    const { data, error } = await supabase
      .from('employee_files')
      .select('*')
      .eq('employee_id', employeeId)
      .order('uploaded_at', { ascending: false });

    if (error) {
      console.error('Error fetching employee files:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching employee files:', error);
    return { success: false, error: 'Beklenmeyen hata oluştu' };
  }
};

// Permissions (Leave Requests)
export const getPermissions = async (employeeId: string): Promise<ServiceResponse<Permission[]>> => {
  try {
    const { data, error } = await supabase
      .from('permissions')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching permissions:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching permissions:', error);
    return { success: false, error: 'Beklenmeyen hata oluştu' };
  }
};

export const approvePermission = async (permissionId: string, approverId: string): Promise<ServiceResponse<void>> => {
  try {
    const { error } = await supabase
      .from('permissions')
      .update({
        status: 'approved',
        approved_by: approverId,
        approved_at: new Date().toISOString()
      })
      .eq('id', permissionId);

    if (error) {
      console.error('Error approving permission:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error approving permission:', error);
    return { success: false, error: 'Beklenmeyen hata oluştu' };
  }
};

// Attendance
export const getAttendance = async (employeeId: string): Promise<ServiceResponse<Attendance[]>> => {
  try {
    const { data, error } = await supabase
      .from('attendances')
      .select('*')
      .eq('employee_id', employeeId)
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching attendance:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching attendance:', error);
    return { success: false, error: 'Beklenmeyen hata oluştu' };
  }
};

// Payrolls
export const getPayrolls = async (employeeId: string): Promise<ServiceResponse<Payroll[]>> => {
  try {
    const { data, error } = await supabase
      .from('payrolls')
      .select('*')
      .eq('employee_id', employeeId)
      .order('period', { ascending: false });

    if (error) {
      console.error('Error fetching payrolls:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching payrolls:', error);
    return { success: false, error: 'Beklenmeyen hata oluştu' };
  }
};

// Evaluations
export const getEvaluations = async (employeeId: string): Promise<ServiceResponse<Evaluation[]>> => {
  try {
    const { data, error } = await supabase
      .from('evaluations')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching evaluations:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching evaluations:', error);
    return { success: false, error: 'Beklenmeyen hata oluştu' };
  }
};

// Trainings
export const getTrainings = async (employeeId: string): Promise<ServiceResponse<Training[]>> => {
  try {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .eq('employee_id', employeeId)
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Error fetching trainings:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching trainings:', error);
    return { success: false, error: 'Beklenmeyen hata oluştu' };
  }
};

// Audit Logging
export const logAuditEvent = async (
  action: string,
  resourceType: string,
  resourceId: string,
  details?: any
): Promise<ServiceResponse<void>> => {
  try {
    const { error } = await supabase
      .from('audit_logs')
      .insert({
        action,
        resource_type: resourceType,
        resource_id: resourceId,
        details
      });

    if (error) {
      console.error('Error logging audit event:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error logging audit event:', error);
    return { success: false, error: 'Beklenmeyen hata oluştu' };
  }
};

// Helper functions for UI (pure JavaScript, no JSX)
export const getLeaveTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    annual: 'Yıllık İzin',
    sick: 'Hastalık İzni',
    maternity: 'Doğum İzni',
    emergency: 'Acil Durum İzni',
    unpaid: 'Ücretsiz İzin'
  };
  return labels[type] || type;
};

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: 'Beklemede',
    approved: 'Onaylandı',
    rejected: 'Reddedildi',
    draft: 'Taslak',
    completed: 'Tamamlandı',
    paid: 'Ödendi',
    active: 'Aktif',
    inactive: 'Pasif',
    present: 'Mevcut',
    absent: 'Yok',
    late: 'Geç',
    half_day: 'Yarım Gün',
    enrolled: 'Kayıtlı',
    failed: 'Başarısız'
  };
  return labels[status] || status;
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    approved: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    rejected: 'bg-red-100 text-red-800',
    completed: 'bg-green-100 text-green-800',
    draft: 'bg-gray-100 text-gray-800',
    paid: 'bg-green-100 text-green-800',
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    present: 'bg-green-100 text-green-800',
    absent: 'bg-red-100 text-red-800',
    late: 'bg-yellow-100 text-yellow-800',
    half_day: 'bg-blue-100 text-blue-800',
    enrolled: 'bg-blue-100 text-blue-800',
    failed: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getLeaveTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    annual: 'bg-blue-100 text-blue-800',
    sick: 'bg-red-100 text-red-800',
    maternity: 'bg-pink-100 text-pink-800',
    emergency: 'bg-orange-100 text-orange-800',
    unpaid: 'bg-gray-100 text-gray-800'
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('tr-TR');
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(amount);
};

export const calculateDays = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};