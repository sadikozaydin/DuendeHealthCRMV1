import React, { useState } from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sendMessage } from '../../services/communicationService';

interface MessageButtonProps {
  recipientId: string;
  recipientType: 'lead' | 'patient' | 'partner';
  contactInfo?: {
    phone?: string;
    email?: string;
    whatsapp?: string;
  };
  className?: string;
  variant?: 'icon' | 'text' | 'full';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const MessageButton: React.FC<MessageButtonProps> = ({
  recipientId,
  recipientType,
  contactInfo,
  className = '',
  variant = 'icon',
  size = 'md',
  disabled = false
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Determine if the button should be disabled
  const shouldDisable = disabled || 
    !contactInfo || 
    (!contactInfo.phone && !contactInfo.email && !contactInfo.whatsapp);

  // Size classes
  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };

  // Icon size classes
  const iconSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  const handleClick = async () => {
    if (shouldDisable) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Navigate to communication hub with the selected conversation using state and URL parameters
      navigate('/communication', { 
        state: { 
          selectedConversation: recipientId,
          recipientType: recipientType,
          contactInfo: contactInfo
        },
        search: `?recipient=${recipientId}&type=${recipientType}`
      });
      
      // Log the action
      console.log(`Navigating to communication hub for ${recipientType} ID: ${recipientId}`);
      
      // Optional: Notify the communication hub that a new conversation is being initiated
      // This could be done through a global state manager or context
      
    } catch (err) {
      console.error('Error navigating to communication hub:', err);
      setError('İletişim sayfasına yönlendirme başarısız oldu.');
    } finally {
      setIsLoading(false);
    }
  };

  // Render different variants
  if (variant === 'text') {
    return (
      <button
        onClick={handleClick}
        disabled={shouldDisable || isLoading}
        className={`flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors ${sizeClasses[size]} ${className} ${shouldDisable ? 'opacity-50 cursor-not-allowed' : ''}`}
        title={shouldDisable ? 'İletişim bilgisi bulunamadı' : 'Mesaj Gönder'}
      >
        {isLoading ? (
          <Loader2 className={`${iconSizeClasses[size]} animate-spin`} />
        ) : (
          <MessageCircle className={iconSizeClasses[size]} />
        )}
        <span>Mesaj Gönder</span>
      </button>
    );
  }
  
  if (variant === 'full') {
    return (
      <button
        onClick={handleClick}
        disabled={shouldDisable || isLoading}
        className={`flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors ${sizeClasses[size]} ${className} ${shouldDisable ? 'opacity-50 cursor-not-allowed bg-gray-400 hover:bg-gray-400' : ''}`}
        title={shouldDisable ? 'İletişim bilgisi bulunamadı' : 'Mesaj Gönder'}
      >
        {isLoading ? (
          <Loader2 className={`${iconSizeClasses[size]} animate-spin`} />
        ) : (
          <MessageCircle className={iconSizeClasses[size]} />
        )}
        <span>Mesaj Gönder</span>
      </button>
    );
  }
  
  // Default icon variant
  return (
    <button
      onClick={handleClick}
      disabled={shouldDisable || isLoading}
      className={`text-green-600 hover:text-green-700 p-1 rounded transition-colors ${sizeClasses[size]} ${className} ${shouldDisable ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={shouldDisable ? 'İletişim bilgisi bulunamadı' : 'Mesaj Gönder'}
    >
      {isLoading ? (
        <Loader2 className={`${iconSizeClasses[size]} animate-spin`} />
      ) : (
        <MessageCircle className={iconSizeClasses[size]} />
      )}
    </button>
  );
};

export default MessageButton;