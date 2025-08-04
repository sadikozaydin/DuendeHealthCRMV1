import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  GraduationCap, 
  Plus, 
  CheckCircle, 
  Clock, 
  XCircle,
  Filter,
  Download,
  Eye,
  Edit,
  Calendar,
  User,
  Loader2,
  AlertTriangle,
  Award,
  Star
} from 'lucide-react';
import { getTrainingRecords, TrainingRecord } from '../../services/employeeService';
import { logAuditEvent } from '../../services/hrService';

interface EmployeeTrainingProps {
  employeeId: string;
  employeeName: string;
  canEdit?: boolean;
}

const EmployeeTraining: React.FC<EmployeeTrainingProps> = ({ 
  employeeId, 
  employeeName, 
  canEdit = false 
}) => {
  const { user } = useAuth();
  const [trainings, setTrainings] = useState<TrainingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewTrainingModal, setShowNewTrainingModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<TrainingRecord | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadTrainings();
  }, [employeeId]);

  const loadTrainings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getTrainingRecords(employeeId);
      if (result.success) {
        setTrainings(result.data);
      } else {
        setError(result.error || 'Eğitim kayıtları yüklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Error loading trainings:', error);
      setError('Eğitim kayıtları yüklenirken beklenmeyen hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'enrolled':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Tamamlandı';
      case 'enrolled': return 'Kayıtlı';
      case 'failed': return 'Başarısız';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'enrolled':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const handleViewTraining = async (training: TrainingRecord) => {
    // Log audit event
    await logAuditEvent('training_viewed', 'training', training.id, {
      employee_id: employeeId,
      training_name: training.trainingName,
      viewed_by: user?.id
    });
    
    setSelectedTraining(training);
  };

  const filteredTrainings = trainings.filter(training => {
    if (filterStatus === 'all') return true;
    return training.status === filterStatus;
  });

  const completedTrainings = trainings.filter(t => t.status === 'completed').length;
  const averageScore = trainings.length > 0 
    ? trainings.filter(t => t.score).reduce((sum, t) => sum + (t.score || 0), 0) / trainings.filter(t => t.score).length
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Eğitim ve Gelişim</h3>
          <p className="text-sm text-gray-600">{employeeName} - Eğitim Takibi</p>
        </div>
        {canEdit && (
          <button
            onClick={() => setShowNewTrainingModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Yeni Eğitim</span>
          </button>
        )}
      </div>

      {/* Training Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{trainings.length}</div>
              <div className="text-sm text-gray-500">Toplam Eğitim</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{completedTrainings}</div>
              <div className="text-sm text-gray-500">Tamamlanan</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <Star className="h-8 w-8 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {averageScore > 0 ? averageScore.toFixed(1) : '-'}
              </div>
              <div className="text-sm text-gray-500">Ortalama Puan</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <Award className="h-8 w-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {trainings.filter(t => t.certificateUrl).length}
              </div>
              <div className="text-sm text-gray-500">Sertifika</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex justify-between items-center">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">Tüm Eğitimler</option>
          <option value="enrolled">Kayıtlı</option>
          <option value="completed">Tamamlanan</option>
          <option value="failed">Başarısız</option>
        </select>
        
        <button
          onClick={() => alert('Eğitim raporu Excel formatında indiriliyor...')}
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
            <p className="text-gray-600">Eğitim kayıtları yükleniyor...</p>
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

      {/* Training Records */}
      {!isLoading && !error && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900">Eğitim Kayıtları</h4>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredTrainings.map((training) => (
              <div key={training.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h5 className="text-lg font-medium text-gray-900">{training.trainingName}</h5>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>Sağlayıcı: {training.provider}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(training.startDate)} - {formatDate(training.endDate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(training.status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(training.status)}`}>
                          {getStatusLabel(training.status)}
                        </span>
                      </div>
                      
                      {training.score && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-900">{training.score}/100</span>
                        </div>
                      )}
                      
                      {training.certificateUrl && (
                        <div className="flex items-center space-x-1">
                          <Award className="h-4 w-4 text-purple-600" />
                          <span className="text-sm text-purple-600">Sertifikalı</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleViewTraining(training)}
                      className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                      title="Detay Görüntüle"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {training.certificateUrl && (
                      <button
                        onClick={() => window.open(training.certificateUrl)}
                        className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors"
                        title="Sertifika İndir"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    )}
                    {canEdit && (
                      <button
                        onClick={() => {
                          setSelectedTraining(training);
                          setShowNewTrainingModal(true);
                        }}
                        className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        title="Düzenle"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTrainings.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Eğitim Kaydı Bulunamadı</h3>
              <p className="text-gray-600 mb-4">
                {filterStatus === 'all' 
                  ? 'Henüz eğitim kaydı oluşturulmamış.' 
                  : `${getStatusLabel(filterStatus)} durumunda eğitim bulunmuyor.`}
              </p>
              {canEdit && (
                <button
                  onClick={() => setShowNewTrainingModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  İlk Eğitimi Ekle
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Training Detail Modal */}
      {selectedTraining && !showNewTrainingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Eğitim Detayı</h3>
              <button
                onClick={() => setSelectedTraining(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Eğitim Adı</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedTraining.trainingName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Sağlayıcı</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedTraining.provider}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Başlangıç Tarihi</label>
                  <p className="text-gray-900">{formatDate(selectedTraining.startDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Bitiş Tarihi</label>
                  <p className="text-gray-900">{formatDate(selectedTraining.endDate)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Durum</label>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(selectedTraining.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedTraining.status)}`}>
                      {getStatusLabel(selectedTraining.status)}
                    </span>
                  </div>
                </div>
                {selectedTraining.score && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Puan</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-lg font-semibold text-gray-900">{selectedTraining.score}/100</span>
                    </div>
                  </div>
                )}
              </div>

              {selectedTraining.certificateUrl && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Sertifika</label>
                  <div className="mt-2">
                    <button
                      onClick={() => window.open(selectedTraining.certificateUrl)}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                    >
                      <Award className="h-4 w-4" />
                      <span>Sertifikayı Görüntüle</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedTraining(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Training Modal */}
      {showNewTrainingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {selectedTraining ? 'Eğitimi Düzenle' : 'Yeni Eğitim Kaydı'}
            </h3>
            <p className="text-gray-600 mb-4">
              Eğitim kayıt formu yakında eklenecek!
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowNewTrainingModal(false);
                  setSelectedTraining(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  setShowNewTrainingModal(false);
                  setSelectedTraining(null);
                }}
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

export default EmployeeTraining;