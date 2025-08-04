// Webhook servisi - Gerçek entegrasyonlar için hazırlık
// Bu servis Meta, Google, TikTok webhook'larını handle edecek

import { saveLeadToLocalStorage, saveWebhookLogToLocalStorage } from './supabaseService';

export interface WebhookPayload {
  platform: 'meta' | 'google' | 'tiktok';
  tenantId: string;
  formId?: string;
  campaignId?: string;
  adId?: string;
  leadData: any;
  timestamp: string;
}

export interface ParsedLead {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  country?: string;
  city?: string;
  treatmentInterest?: string;
  source: string;
  sourceDetails: string;
  campaign?: string;
  adId?: string;
  formId?: string;
  tenantId: string;
  rawData: any;
}

// Meta (Facebook/Instagram) webhook parser
export const parseMetaWebhook = (payload: any): ParsedLead => {
  const leadData = payload.entry?.[0]?.changes?.[0]?.value?.leadgen_id || payload;
  
  return {
    firstName: leadData.field_data?.find(f => f.name === 'first_name')?.values?.[0] || '',
    lastName: leadData.field_data?.find(f => f.name === 'last_name')?.values?.[0] || '',
    email: leadData.field_data?.find(f => f.name === 'email')?.values?.[0] || '',
    phone: leadData.field_data?.find(f => f.name === 'phone_number')?.values?.[0] || '',
    country: leadData.field_data?.find(f => f.name === 'country')?.values?.[0] || '',
    city: leadData.field_data?.find(f => f.name === 'city')?.values?.[0] || '',
    treatmentInterest: leadData.field_data?.find(f => f.name === 'treatment')?.values?.[0] || 'Belirtilmemiş',
    source: 'meta',
    sourceDetails: `Meta Campaign: ${leadData.campaign_name || 'Unknown'}`,
    campaign: leadData.campaign_name,
    adId: leadData.ad_id,
    formId: leadData.form_id,
    tenantId: matchFormToTenant(leadData.form_id),
    rawData: payload
  };
};

// Google Ads webhook parser
export const parseGoogleWebhook = (payload: any): ParsedLead => {
  const leadData = payload.lead || payload;
  
  return {
    firstName: leadData.firstName || leadData.first_name || '',
    lastName: leadData.lastName || leadData.last_name || '',
    email: leadData.email || '',
    phone: leadData.phoneNumber || leadData.phone || '',
    country: leadData.country || '',
    city: leadData.city || '',
    treatmentInterest: leadData.treatment || leadData.service || 'Belirtilmemiş',
    source: 'google',
    sourceDetails: `Google Ads Campaign: ${leadData.campaignName || 'Unknown'}`,
    campaign: leadData.campaignName,
    adId: leadData.adGroupId,
    formId: leadData.formId,
    tenantId: matchCampaignToTenant(leadData.campaignName),
    rawData: payload
  };
};

// TikTok webhook parser
export const parseTikTokWebhook = (payload: any): ParsedLead => {
  const leadData = payload.data || payload;
  
  return {
    firstName: leadData.first_name || '',
    lastName: leadData.last_name || '',
    email: leadData.email || '',
    phone: leadData.phone_number || '',
    country: leadData.country || '',
    city: leadData.city || '',
    treatmentInterest: leadData.treatment_interest || 'Belirtilmemiş',
    source: 'tiktok',
    sourceDetails: `TikTok Campaign: ${leadData.campaign_name || 'Unknown'}`,
    campaign: leadData.campaign_name,
    adId: leadData.ad_id,
    formId: leadData.form_id,
    tenantId: matchTikTokToTenant(leadData.advertiser_id),
    rawData: payload
  };
};

// Form/Campaign ID'den tenant eşleştirme
export const matchFormToTenant = (formId: string): string => {
  const formTenantMap = {
    // Meta form ID'leri
    'meta_form_123': 'tenant-sagliktur',
    'meta_form_456': 'tenant-medicalpark',
    'meta_form_789': 'tenant-acibadem',
    // Varsayılan
    'default': 'tenant-001'
  };
  
  return formTenantMap[formId] || formTenantMap.default;
};

export const matchCampaignToTenant = (campaignName: string): string => {
  // Kampanya adından tenant belirleme
  if (campaignName?.includes('sagliktur')) return 'tenant-sagliktur';
  if (campaignName?.includes('medicalpark')) return 'tenant-medicalpark';
  if (campaignName?.includes('acibadem')) return 'tenant-acibadem';
  
  return 'tenant-001'; // varsayılan
};

export const matchTikTokToTenant = (advertiserId: string): string => {
  const advertiserTenantMap = {
    'tiktok_adv_123': 'tenant-sagliktur',
    'tiktok_adv_456': 'tenant-medicalpark',
    'default': 'tenant-001'
  };
  
  return advertiserTenantMap[advertiserId] || advertiserTenantMap.default;
};

// Webhook doğrulama (güvenlik)
export const verifyWebhookSignature = (payload: string, signature: string, secret: string): boolean => {
  try {
    // LocalStorage modunda basit doğrulama
    console.log('🔐 Webhook signature verification (LocalStorage mode)');
    
    // Basit uzunluk kontrolü
    if (!signature || signature.length < 10) {
      return false;
    }
    
    // Demo modunda her zaman true döndür
    return true;
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return false;
  }
};

// Webhook log interface
export interface WebhookLog {
  id: string;
  platform: 'meta' | 'google' | 'tiktok';
  tenantId: string;
  timestamp: string;
  success: boolean;
  leadId?: string;
  errorMessage?: string;
  payload: any;
  signature?: string;
  processingTime: number;
}

// Webhook log kaydetme
export const logWebhookActivity = (log: Omit<WebhookLog, 'id' | 'timestamp'>): WebhookLog => {
  const webhookLog: WebhookLog = {
    id: `webhook_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    ...log
  };
  
  // LocalStorage'a kaydet
  const existingLogs = JSON.parse(localStorage.getItem('webhook_logs') || '[]');
  existingLogs.unshift(webhookLog);
  
  // Son 1000 log'u tut
  if (existingLogs.length > 1000) {
    existingLogs.splice(1000);
  }
  
  localStorage.setItem('webhook_logs', JSON.stringify(existingLogs));
  
  return webhookLog;
};

// Webhook loglarını getir
export const getWebhookLogs = (platform?: string, tenantId?: string): WebhookLog[] => {
  const logs = JSON.parse(localStorage.getItem('webhook_logs') || '[]');
  
  return logs.filter((log: WebhookLog) => {
    if (platform && log.platform !== platform) return false;
    if (tenantId && log.tenantId !== tenantId) return false;
    return true;
  });
};

// Supabase geçiş hazırlığı
export const saveLeadToLocalStorage = async (lead: ParsedLead) => {
  console.log('💾 Saving lead to localStorage:', lead);
  return saveLeadToLocalStorage(lead);
};

// Tenant bazlı lead filtreleme
export const filterLeadsByTenant = (leads: any[], tenantId: string) => {
  return leads.filter(lead => lead.tenantId === tenantId || !lead.tenantId);
};

// Webhook endpoint URL'leri (production için)
export const WEBHOOK_ENDPOINTS = {
  meta: '/api/webhooks/meta',
  google: '/api/webhooks/google',
  tiktok: '/api/webhooks/tiktok'
};

// Webhook endpoint handlers
export const handleMetaWebhook = async (payload: WebhookPayload) => {
  const startTime = Date.now();
  
  try {
    console.log('Meta webhook received:', payload);
    
    // Güvenlik doğrulama
    const META_WEBHOOK_SECRET = import.meta.env.VITE_META_WEBHOOK_SECRET;
    if (META_WEBHOOK_SECRET && payload.signature) {
      if (!verifyWebhookSignature(JSON.stringify(payload.leadData), payload.signature, META_WEBHOOK_SECRET)) {
        throw new Error('Invalid webhook signature');
      }
    }
    
    const parsedLead = parseMetaWebhook(payload.leadData);
    
    // LocalStorage'e kaydet
    const saveResult = await saveLeadToLocalStorage({
      ...parsedLead,
      priority: 'high', // Meta lead'leri yüksek öncelikli
      status: 'contacted'
    });

    if (!saveResult.success) {
      throw new Error(saveResult.error || 'Failed to save lead');
    }

    const newLead = saveResult.data;
    
    // Event dispatch
    window.dispatchEvent(new CustomEvent('newLeadAdded', { detail: { lead: newLead } }));
    
    // Webhook log kaydet
    await saveWebhookLogToLocalStorage({
      platform: 'meta',
      tenantId: parsedLead.tenantId,
      success: true,
      leadId: newLead.lead_id,
      payload: payload.leadData,
      signature: payload.signature,
      processingTime: Date.now() - startTime
    });
    
    return { success: true, leadId: newLead.lead_id };
  } catch (error) {
    console.error('Meta webhook error:', error);
    
    // Hata log kaydet
    await saveWebhookLogToLocalStorage({
      platform: 'meta',
      tenantId: payload.tenantId || 'unknown',
      success: false,
      errorMessage: error.message,
      payload: payload.leadData,
      signature: payload.signature,
      processingTime: Date.now() - startTime
    });
    
    return { success: false, error: error.message };
  }
};

export const handleGoogleWebhook = async (payload: WebhookPayload) => {
  const startTime = Date.now();
  
  try {
    console.log('Google webhook received:', payload);
    
    // Google JWT token doğrulama
    const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
    if (GOOGLE_CLIENT_SECRET && payload.signature) {
      if (!verifyWebhookSignature(JSON.stringify(payload.leadData), payload.signature, GOOGLE_CLIENT_SECRET)) {
        throw new Error('Invalid Google webhook token');
      }
    }
    
    const parsedLead = parseGoogleWebhook(payload.leadData);
    
    // LocalStorage'e kaydet
    const saveResult = await saveLeadToLocalStorage({
      ...parsedLead,
      priority: 'high', // Google lead'leri yüksek öncelikli
      status: 'contacted'
    });

    if (!saveResult.success) {
      throw new Error(saveResult.error || 'Failed to save lead');
    }

    const newLead = saveResult.data;
    
    window.dispatchEvent(new CustomEvent('newLeadAdded', { detail: { lead: newLead } }));
    
    // Webhook log kaydet
    await saveWebhookLogToLocalStorage({
      platform: 'google',
      tenantId: parsedLead.tenantId,
      success: true,
      leadId: newLead.lead_id,
      payload: payload.leadData,
      signature: payload.signature,
      processingTime: Date.now() - startTime
    });
    
    return { success: true, leadId: newLead.lead_id };
  } catch (error) {
    console.error('Google webhook error:', error);
    
    await saveWebhookLogToLocalStorage({
      platform: 'google',
      tenantId: payload.tenantId || 'unknown',
      success: false,
      errorMessage: error.message,
      payload: payload.leadData,
      signature: payload.signature,
      processingTime: Date.now() - startTime
    });
    
    return { success: false, error: error.message };
  }
};

export const handleTikTokWebhook = async (payload: WebhookPayload) => {
  const startTime = Date.now();
  
  try {
    console.log('TikTok webhook received:', payload);
    
    // TikTok signature doğrulama
    const TIKTOK_WEBHOOK_SECRET = import.meta.env.VITE_TIKTOK_WEBHOOK_SECRET;
    if (TIKTOK_WEBHOOK_SECRET && payload.signature) {
      if (!verifyWebhookSignature(JSON.stringify(payload.leadData), payload.signature, TIKTOK_WEBHOOK_SECRET)) {
        throw new Error('Invalid TikTok webhook signature');
      }
    }
    
    const parsedLead = parseTikTokWebhook(payload.leadData);
    
    // LocalStorage'e kaydet
    const saveResult = await saveLeadToLocalStorage({
      ...parsedLead,
      priority: 'medium', // TikTok lead'leri orta öncelikli
      status: 'contacted'
    });

    if (!saveResult.success) {
      throw new Error(saveResult.error || 'Failed to save lead');
    }

    const newLead = saveResult.data;
    
    window.dispatchEvent(new CustomEvent('newLeadAdded', { detail: { lead: newLead } }));
    
    // Webhook log kaydet
    await saveWebhookLogToLocalStorage({
      platform: 'tiktok',
      tenantId: parsedLead.tenantId,
      success: true,
      leadId: newLead.lead_id,
      payload: payload.leadData,
      signature: payload.signature,
      processingTime: Date.now() - startTime
    });
    
    return { success: true, leadId: newLead.lead_id };
  } catch (error) {
    console.error('TikTok webhook error:', error);
    
    await saveWebhookLogToLocalStorage({
      platform: 'tiktok',
      tenantId: payload.tenantId || 'unknown',
      success: false,
      errorMessage: error.message,
      payload: payload.leadData,
      signature: payload.signature,
      processingTime: Date.now() - startTime
    });
    
    return { success: false, error: error.message };
  }
};

// Test webhook'u tetikleme
export const triggerTestWebhook = async (platform: 'meta' | 'google' | 'tiktok') => {
  // Enhanced test payloads with more realistic data
  const testPayloads = {
    meta: {
      platform: 'meta',
      tenantId: 'tenant-001',
      formId: 'meta_form_123',
      leadData: {
        object: 'page',
        entry: [{
          id: '123456789',
          time: Date.now(),
          changes: [{
            field: 'leadgen',
            value: {
              leadgen_id: 'test_lead_123',
              created_time: Date.now(),
              page_id: '123456789',
              form_id: 'meta_form_123',
              adgroup_id: 'meta_adgroup_123',
              ad_id: 'meta_ad_123',
              campaign_name: 'Meta Beauty Campaign 2025',
        field_data: [
          { name: 'first_name', values: ['Test'] },
          { name: 'last_name', values: ['Meta'] },
          { name: 'email', values: ['test.meta@example.com'] },
          { name: 'phone_number', values: ['+90 555 123 45 67'] },
          { name: 'treatment', values: ['Plastik Cerrahi'] },
          { name: 'country', values: ['Turkey'] },
          { name: 'city', values: ['Istanbul'] }
        ]
            }
          }]
        }]
      },
      timestamp: new Date().toISOString()
    },
    google: {
      platform: 'google',
      tenantId: 'tenant-001',
      campaignId: 'google_campaign_123',
      leadData: {
        firstName: 'Test',
        lastName: 'Google',
        email: 'test.google@example.com',
        phoneNumber: '+90 555 234 56 78',
        treatment: 'Kalp Cerrahisi',
        campaignName: 'Google Ads Kardiyoloji 2025',
        adGroupId: 'google_adgroup_123'
      },
      timestamp: new Date().toISOString()
    },
    tiktok: {
      platform: 'tiktok',
      tenantId: 'tenant-001',
      formId: 'tiktok_form_123',
      leadData: {
        first_name: 'Test',
        last_name: 'TikTok',
        email: 'test.tiktok@example.com',
        phone_number: '+90 555 345 67 89',
        treatment_interest: 'Saç Ekimi',
        campaign_name: 'TikTok Hair Transplant 2025',
        ad_id: 'tiktok_ad_123',
        advertiser_id: 'tiktok_adv_123'
      },
      timestamp: new Date().toISOString()
    }
  };
  
  // Log webhook test (Supabase ile)
  await saveWebhookLogToSupabase({
    platform,
    tenantId: 'tenant-001',
    success: true,
    leadId: 'test-lead',
    payload: testPayloads[platform],
    signature: 'test-signature',
    processingTime: Math.random() * 100 + 50 // 50-150ms simülasyon
  });
  
  const payload = testPayloads[platform];
  
  switch (platform) {
    case 'meta':
      return handleMetaWebhook(payload);
    case 'google':
      return handleGoogleWebhook(payload);
    case 'tiktok':
      return handleTikTokWebhook(payload);
  }
};

// Production API endpoint templates
export const PRODUCTION_TEMPLATES = {
  laravel: {
    routes: `
// routes/api.php
Route::post('/webhooks/meta', [WebhookController::class, 'handleMeta'])
    ->middleware('verify.meta.signature');
Route::post('/webhooks/google', [WebhookController::class, 'handleGoogle'])
    ->middleware('verify.google.token');
Route::post('/webhooks/tiktok', [WebhookController::class, 'handleTikTok'])
    ->middleware('verify.tiktok.signature');
    `,
    controller: `
// app/Http/Controllers/WebhookController.php
class WebhookController extends Controller {
    public function handleMeta(Request $request) {
        $payload = $request->all();
        $parsedLead = $this->parseMetaWebhook($payload);
        
        Lead::create([
            'lead_id' => 'LEAD-' . rand(100000, 999999),
            'tenant_id' => $this->matchFormToTenant($payload['form_id']),
            'first_name' => $parsedLead['firstName'],
            'last_name' => $parsedLead['lastName'],
            'email' => $parsedLead['email'],
            'phone' => $parsedLead['phone'],
            'source' => 'meta',
            'raw_data' => json_encode($payload)
        ]);
        
        return response()->json(['success' => true]);
    }
}
    `
  },
  
  express: `
// Express.js webhook endpoints
const express = require('express');
const app = express();

app.post('/api/webhooks/meta', verifyMetaSignature, async (req, res) => {
    try {
        const parsedLead = parseMetaWebhook(req.body);
        await saveLeadToDatabase(parsedLead);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/webhooks/google', verifyGoogleToken, async (req, res) => {
    try {
        const parsedLead = parseGoogleWebhook(req.body);
        await saveLeadToDatabase(parsedLead);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
  `,
  
  supabaseEdgeFunctions: `
// Supabase Edge Function: meta-webhook
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const payload = await req.json()
    const parsedLead = parseMetaWebhook(payload)
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    const { data, error } = await supabase
      .from('leads')
      .insert([parsedLead])
    
    if (error) throw error
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
})
  `
};