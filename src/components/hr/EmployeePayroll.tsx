import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  DollarSign, 
  Plus, 
  Download, 
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { getPayrollForMonth, PayrollRecord, formatSalary } from '../../services/employeeService';

interface EmployeePayrollProps {
  employeeId: string;
  employeeName: string;
  canViewSalary?: boolean;
}

const EmployeePayroll: React.FC<EmployeePayrollProps> = ({ 
  employeeId, 
  employeeName, 
  canViewSalary = true 
}) => {
  const { user } = useAuth();
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [yearlyStats, setYearlyStats] = useState({
    totalGross: 0,
    totalNet: 0,
    totalTax: 0,
    totalSocialSecurity: 0,
    averageGross: 0,
    averageNet: 0
  });

  useEffect(() => {
    loadPayrollData();
  }, [employeeId, selectedPeriod]);

  const loadPayrollData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getPayrollForMonth(selectedPeriod, employeeId);
      if (result.success) {
        setPayrollRecords(result.data);
        calculateYearlyStats(result.data);
      } else {
        setError(result.error || 'Bordro verileri yüklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Error loading payroll data:', error);
      setError('Bordro verileri yüklenirken beklenmeyen hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateYearlyStats = (records: PayrollRecord[]) => {
    if (records.length === 0) {
      setYearlyStats({
        totalGross: 0,
        totalNet: 0,
        totalTax: 0,
        totalSocialSecurity: 0,
        averageGross: 0,
        averageNet: 0
      });
      return;
    }

    const totals = records.reduce((acc, record) => ({
      totalGross: acc.totalGross + record.grossSalary,
      totalNet: acc.totalNet + record.netSalary,
      totalTax: acc.totalTax + record.taxDeduction,
      totalSocialSecurity: acc.totalSocialSecurity + record.socialSecurityDeduction
    }), { totalGross: 0, totalNet: 0, totalTax: 0, totalSocialSecurity: 0 });

    setYearlyStats({
      ...totals,
      averageGross: totals.totalGross / records.length,
      averageNet: totals.totalNet / records.length
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Ödendi';
      case 'approved': return 'Onaylandı';
      case 'draft': return 'Taslak';
      default: return status;
    }
  };

  const downloadPayslip = async (record: PayrollRecord) => {
    console.log('Downloading payslip for:', record.period);
    alert(`${record.period} dönemi bordrosu indiriliyor...`);
  };

  const viewPayslipDetail = async (record: PayrollRecord) => {
    console.log('Viewing payslip detail for:', record.period);
    alert(`${record.period} dönemi bordro detayları görüntüleniyor...`);
  };

  const navigatePeriod = (direction: 'prev' | 'next') => {
    const currentDate = new Date(selectedPeriod + '-01');
    if (direction === 'prev') {
      currentDate.setMonth(currentDate.getMonth() - 1);
    } else {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    setSelectedPeriod(currentDate.toISOString().slice(0, 7));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Bordro Yönetimi</h3>
          <p className="text-sm text-gray-600">{employeeName} - Maaş ve Ödemeler</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigatePeriod('prev')}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-gray-900 min-w-[120px] text-center">
            {new Date(selectedPeriod + '-01').toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })}
          </span>
          <button
            onClick={() => navigatePeriod('next')}
            disabled={isLoading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Yearly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {canViewSalary ? formatSalary(yearlyStats.averageGross) : '***'}
              </div>
              <div className="text-sm text-gray-500">Ortalama Brüt Maaş</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {canViewSalary ? formatSalary(yearlyStats.averageNet) : '***'}
              </div>
              <div className="text-sm text-gray-500">Ortalama Net Maaş</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{payrollRecords.length}</div>
              <div className="text-sm text-gray-500">Bordro Kaydı</div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">Bordro verileri yükleniyor...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center text-red-800">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        </div>
      )}

      {/* Payroll Records */}
      {!isLoading && !error && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900">Bordro Kayıtları</h4>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dönem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brüt Maaş
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Maaş
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kesintiler
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
                {payrollRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{record.period}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {canViewSalary ? formatSalary(record.grossSalary) : '***'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {canViewSalary ? formatSalary(record.netSalary) : '***'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {canViewSalary ? formatSalary(record.taxDeduction + record.socialSecurityDeduction) : '***'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(record.status)}`}>
                        {getStatusLabel(record.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => viewPayslipDetail(record)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded"
                          title="Detay Görüntüle"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => downloadPayslip(record)}
                          className="text-green-600 hover:text-green-800 p-1 rounded"
                          title="Bordro İndir"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {payrollRecords.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Bordro Kaydı Bulunamadı</h3>
              <p className="text-gray-600">
                {selectedPeriod} dönemi için bordro kaydı bulunmuyor.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeePayroll;