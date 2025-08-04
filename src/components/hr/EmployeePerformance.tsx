import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BarChart3, 
  Star, 
  TrendingUp, 
  Target, 
  Award,
  Plus,
  Eye,
  Edit,
  Calendar,
  User,
  CheckCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { getEvaluations, logAuditEvent, Evaluation } from '../../services/hrService';

interface EmployeePerformanceProps {
  employeeId: string;
  employeeName: string;
  canEdit?: boolean;
}

const EmployeePerformance: React.FC<EmployeePerformanceProps> = ({ 
  employeeId, 
  employeeName, 
  canEdit = false 
}) => {
  const { user } = useAuth();
  const [performanceReviews, setPerformanceReviews] = useState<Evaluation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewReviewModal, setShowNewReviewModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Evaluation | null>(null);

  useEffect(() => {
    loadPerformanceReviews();
  }, [employeeId]);

  const loadPerformanceReviews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getEvaluations(employeeId);
      if (result.success) {
        setPerformanceReviews(result.data);
      } else {
        setError(result.error || 'Performans değerlendirmeleri yüklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Error loading performance reviews:', error);
      setError('Performans değerlendirmeleri yüklenirken beklenmeyen hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewReview = async (review: Evaluation) => {
    // Log audit event
    await logAuditEvent('evaluation_viewed', 'evaluation', review.id, {
      employee_id: employeeId,
      period: review.period,
      viewed_by: user?.id
    });
    
    setSelectedReview(review);
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-blue-600';
    if (score >= 2.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 4.5) return 'bg-green-100';
    if (score >= 3.5) return 'bg-blue-100';
    if (score >= 2.5) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 4.5) return 'Mükemmel';
    if (score >= 3.5) return 'İyi';
    if (score >= 2.5) return 'Orta';
    return 'Geliştirilmeli';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  // Calculate average score
  const averageScore = performanceReviews.length > 0 
    ? performanceReviews.reduce((sum, review) => sum + review.overall_score, 0) / performanceReviews.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Performans Değerlendirme</h3>
          <p className="text-sm text-gray-600">{employeeName} - Performans Takibi</p>
        </div>
        {canEdit && (
          <button
            onClick={() => setShowNewReviewModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Yeni Değerlendirme</span>
          </button>
        )}
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <Star className="h-8 w-8 text-yellow-500" />
            <div>
              <div className={`text-2xl font-bold ${getScoreColor(averageScore)}`}>
                {averageScore.toFixed(1)}
              </div>
              <div className="text-sm text-gray-500">Ortalama Puan</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">{performanceReviews.length}</div>
              <div className="text-sm text-gray-500">Toplam Değerlendirme</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-blue-600" />
            <div>
              <div className="text-lg font-bold text-gray-900">{getPerformanceLevel(averageScore)}</div>
              <div className="text-sm text-gray-500">Performans Seviyesi</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center space-x-3">
            <Award className="h-8 w-8 text-purple-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {performanceReviews.filter(r => r.overall_score >= 4.5).length}
              </div>
              <div className="text-sm text-gray-500">Mükemmel Değerlendirme</div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <Loader2 className="h-8 w-8 text-blue-600 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">Performans değerlendirmeleri yükleniyor...</p>
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

      {/* Performance Reviews List */}
      {!isLoading && !error && (
        <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900">Değerlendirme Geçmişi</h4>
        </div>
        <div className="divide-y divide-gray-200">
          {performanceReviews.map((review) => (
            <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getScoreBackground(review.overall_score)}`}>
                      <span className={`text-lg font-bold ${getScoreColor(review.overall_score)}`}>
                        {review.overall_score.toFixed(1)}
                      </span>
                    </div>
                    <div>
                      <h5 className="text-lg font-medium text-gray-900">{review.period}</h5>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(review.evaluation_date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>Değerlendiren: {review.evaluator_name || 'Sistem'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Performance Categories */}
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">İş Kalitesi</div>
                      <div className={`text-lg font-semibold ${getScoreColor(review.work_quality)}`}>
                        {review.work_quality.toFixed(1)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Verimlilik</div>
                      <div className={`text-lg font-semibold ${getScoreColor(review.productivity)}`}>
                        {review.productivity.toFixed(1)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">İletişim</div>
                      <div className={`text-lg font-semibold ${getScoreColor(review.communication)}`}>
                        {review.communication.toFixed(1)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Takım Çalışması</div>
                      <div className={`text-lg font-semibold ${getScoreColor(review.teamwork)}`}>
                        {review.teamwork.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  {review.comments && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{review.comments}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleViewReview(review)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                    title="Detay Görüntüle"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  {canEdit && (
                    <button
                      onClick={() => {
                        setSelectedReview(review);
                        setShowNewReviewModal(true);
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

        {performanceReviews.length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Performans Değerlendirmesi Bulunamadı</h3>
            <p className="text-gray-600 mb-4">Henüz performans değerlendirmesi yapılmamış.</p>
            {canEdit && (
              <button
                onClick={() => setShowNewReviewModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                İlk Değerlendirmeyi Oluştur
              </button>
            )}
          </div>
        )}
      </div>
      )}

      {/* Performance Chart Placeholder */}
      {!isLoading && !error && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Performans Trendi</h4>
        <div className="text-center py-8 text-gray-500">
          <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <p>Performans grafikleri yakında eklenecek</p>
        </div>
      </div>
      )}

      {/* Review Detail Modal */}
      {selectedReview && !showNewReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Performans Değerlendirme Detayı
              </h3>
              <button
                onClick={() => setSelectedReview(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Değerlendirme Dönemi</label>
                  <p className="text-lg font-semibold text-gray-900">{selectedReview.period}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Değerlendirme Tarihi</label>
                  <p className="text-lg font-semibold text-gray-900">{formatDate(selectedReview.evaluation_date)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">İş Kalitesi</div>
                  <div className={`text-2xl font-bold ${getScoreColor(selectedReview.work_quality)}`}>
                    {selectedReview.work_quality.toFixed(1)}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Verimlilik</div>
                  <div className={`text-2xl font-bold ${getScoreColor(selectedReview.productivity)}`}>
                    {selectedReview.productivity.toFixed(1)}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">İletişim</div>
                  <div className={`text-2xl font-bold ${getScoreColor(selectedReview.communication)}`}>
                    {selectedReview.communication.toFixed(1)}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Takım Çalışması</div>
                  <div className={`text-2xl font-bold ${getScoreColor(selectedReview.teamwork)}`}>
                    {selectedReview.teamwork.toFixed(1)}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Liderlik</div>
                  <div className={`text-2xl font-bold ${getScoreColor(selectedReview.leadership)}`}>
                    {selectedReview.leadership.toFixed(1)}
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 mb-1">Genel Puan</div>
                  <div className={`text-2xl font-bold ${getScoreColor(selectedReview.overall_score)}`}>
                    {selectedReview.overall_score.toFixed(1)}
                  </div>
                </div>
              </div>

              {selectedReview.comments && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Yorumlar</label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{selectedReview.comments}</p>
                  </div>
                </div>
              )}

              {selectedReview.goals && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Hedefler</label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{selectedReview.goals}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Review Modal */}
      {showNewReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {selectedReview ? 'Değerlendirmeyi Düzenle' : 'Yeni Performans Değerlendirmesi'}
            </h3>
            <p className="text-gray-600 mb-4">
              Performans değerlendirme formu yakında eklenecek!
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowNewReviewModal(false);
                  setSelectedReview(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                İptal
              </button>
              <button
                onClick={() => {
                  setShowNewReviewModal(false);
                  setSelectedReview(null);
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

export default EmployeePerformance;