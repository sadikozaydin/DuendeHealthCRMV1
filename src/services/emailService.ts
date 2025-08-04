interface EmailSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromName: string;
  secureConnection: 'none' | 'ssl' | 'tls';
}

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

// Mock e-posta gönderme fonksiyonu
export async function sendEmail(settings: EmailSettings, options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  console.log('Sending email to:', options.to);
  console.log('Email subject:', options.subject);
  
  // Demo modunda e-posta gönderimi simülasyonu
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    messageId: `demo-${Date.now()}@example.com`,
    error: undefined
  };
}

// Test e-postası gönderme
export async function sendTestEmail(settings: EmailSettings, to: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    console.log('Sending test email to:', to);
    
    // Demo modunda e-posta gönderimi simülasyonu
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      messageId: `demo-${Date.now()}@example.com`,
      error: undefined
    };
  } catch (error) {
    console.error('Test email sending error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Hoş geldiniz e-postası gönderme
export async function sendWelcomeEmail(settings: EmailSettings, user: { name: string; email: string }, password: string, role: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    console.log('Sending welcome email to:', user.email);
    
    // Demo modunda e-posta gönderimi simülasyonu
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      messageId: `demo-${Date.now()}@example.com`,
      error: undefined
    };
  } catch (error) {
    console.error('Welcome email sending error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}