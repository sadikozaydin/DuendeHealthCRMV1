import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, 
  Plus, 
  CheckCircle, 
  Clock, 
  XCircle,
  Filter,
  Download,
  ChevronLeft,
  ChevronRight,
  User,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { getPermissions, approvePermission, logAuditEvent, Permission } from '../../services/hrService';

interface EmployeeLeaveProps {
  employeeId: string;
  employeeName: string;
  canApprove?: boolean;
}

const EmployeeLeave: React.FC<EmployeeLeaveProps> = ({ 
  employeeId, 
  employeeName, 
  canApprove = false 
}) => {
  const { user } = useAuth();
  const [leaveRequests, setLeaveRequests] = useState<Permission[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [leaveBalance, setLeaveBalance] = useState({
    annual: 15,
    sick: 10,
    used: 8,
    pending: 2
  });

  useEffect(() => {
    loadLeaveRequests();
  }, [employeeId]);

  const loadLeaveRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getPermissions(employeeId);
      if (result.success) {
        setLeaveRequests(result.data);
      } else {
        setError(result.error || 'İzin talepleri yüklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Error loading leave requests:', error);
      setError('İzin talepleri yüklenirken beklenmeyen hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const getLeaveTypeLabel = (type: string) => {
    const labels = {
      annual: 'Yıllık İzin',
      sick: 'Hastalık İzni',
      maternity: 'Doğum İzni',
      emergency: 'Acil Durum İzni',
      unpaid: 'Ücretsiz İzin'
    };
    return labels[type] || type;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'Beklemede',
      approved: 'Onaylandı',
      rejected: 'Reddedildi'
    };
    return labels[status] || status;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'annual':
        return 'bg-blue-100 text-blue-800';
      case 'sick':
        return 'bg-red-100 text-red-800';
      case 'maternity':
        return 'bg-pink-100 text-pink-800';
      case 'emergency':
        return 'bg-orange-100 text-orange-800';
      case 'unpaid':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const filteredRequests = leaveRequests.filter(request => {
    if (selectedFilter === 'all') return true;
    return request.status === selectedFilter;
  });

  const handleApprove = async (requestId: string) => {
    if (window.confirm('Bu izin talebini onaylamak istediğinizden emin misiniz?')) {
      try {
        const result = await approvePermission(requestId, user?.id || '');
        if (result.success) {
          // Log audit event
          await logAuditEvent('permission_approved', 'permission', requestId, {
            employee_id: employeeId,
            approved_by: user?.id
          });
          
          // Update local state
          setLeaveRequests(prev => 
            prev.map(req => 
              req.id === requestId 
                ? { ...req, status: 'approved', approved_at: new Date().toISOString() }
                : req
            )
          );
        } else {
          alert('İzin talebi onaylanırken hata oluştu: ' + result.error);
        }
      } catch (error) {
        console.error('Error approving leave request:', error);
        alert('İzin talebi onaylanırken beklenmeyen hata oluştu');
      }
    }
  };

  const handleReject = async (requestId: string) => {
    if (window.confirm('Bu izin talebini reddetmek istediğinizden emin misiniz?')) {
      try {
        // For now, just update locally since we don't have a reject function
        // In real implementation, you'd call rejectPermission(requestId, user?.id)
        
        // Log audit event
        await logAuditEvent('permission_rejected', 'permission', requestId, {
          employee_id: employeeId,
          rejected_by: user?.id
        });
        
        setLeaveRequests(prev => 
          prev.map(req => 
            req.id === requestId 
              ? { ...req, status: 'rejected' }
              : req
          )
        );
      } catch (error) {
        console.error('Error rejecting leave request:', error);
        alert('İzin talebi reddedilirken beklenmeyen hata oluştu');
      }
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">İzin & Vardiya Yönetimi</h3>
          <p className="text-sm text-gray-600">{employeeName} - İzin Takibi</p>
        </div>
        <button
          onClick={() => setShowNewRequestModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>İzin Talebi</span>
        </button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{leaveBalance.annual}</div>
              <div className="text-sm text-gray-500">Yıllık İzin Hakkı</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{leaveBalance.used}</div>
              <div className="text-sm text-gray-500">Kullanılan İzin</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{leaveBalance.pending}</div>
              <div className="text-sm text-gray-500">Bekleyen Talep</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-8 w-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{leaveBalance.annual - leaveBalance.used}</div>
              <div className="text-sm text-gray-500">Kalan İzin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Actions */}
      <div className="flex justify-between items-center">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Tüm Talepler</option>
          <option value="pending">Bekleyen</option>
          <option value="approved">Onaylanan</option>
          <option value="rejected">Reddedilen</option>
        </select>
        
        <button
          onClick={() => alert('İzin raporu Excel formatında indiriliyor...')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Rapor İndir</span>
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">İzin talepleri yükleniyor...</p>
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

      {/* Leave Requests Table */}
      {!isLoading && !error && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İzin Türü
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Başlangıç
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bitiş
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gün Sayısı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sebep
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                {canApprove && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((request) => (
                <tr key={request.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getLeaveTypeColor(request.type)}`}>
                      {getLeaveTypeLabel(request.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(request.start_date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(request.end_date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{request.days} gün</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate" title={request.reason}>
                      {request.reason}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(request.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                        {getStatusLabel(request.status)}
                      </span>
                    </div>
                  </td>
                  {canApprove && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Onayla
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Reddet
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRequests.length === 0 && !isLoading && !error && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">İzin Talebi Bulunamadı</h3>
            <p className="text-gray-600 mb-4">
              {selectedFilter === 'all' 
                ? 'Henüz izin talebi oluşturulmamış.' 
                : `${getStatusLabel(selectedFilter)} durumunda izin talebi bulunmuyor.`}
            </p>
            <button
              onClick={() => setShowNewRequestModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              İlk İzin Talebini Oluştur
            </button>
          </div>
        )}
        </div>
      )}

      {/* Calendar View */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-gray-900">İzin Takvimi</h4>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium text-gray-900 min-w-[120px] text-center">
              {currentDate.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })}
            </span>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="text-center py-8 text-gray-500">
          <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <p>İzin takvimi görünümü yakında eklenecek</p>
        </div>
      </div>

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Yeni İzin Talebi</h3>
            <p className="text-gray-600 mb-4">
              İzin talebi oluşturma özelliği yakında eklenecek!
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowNewRequestModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                İptal
              </button>
              <button
                onClick={() => setShowNewRequestModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLeave;