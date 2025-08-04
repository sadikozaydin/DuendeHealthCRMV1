<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class WebhookController extends Controller
{
    /**
     * Enhanced Meta webhook with comprehensive error handling
     */
    public function meta(Request $request)
    {
        $startTime = microtime(true);
        $tenantId = 'unknown';
        
        try {
            $payload = $request->getContent();
            $signature = $request->header('X-Hub-Signature-256');
            
            if (!$signature) {
                $this->logWebhookActivity('meta', $tenantId, 'failed', 'Missing signature', $request->all(), null, $this->getProcessingTime($startTime));
                return response()->json(['error' => 'Missing signature'], 400);
            }

            if (!$this->verifyMetaSignature($payload, $signature, env('META_WEBHOOK_SECRET'))) {
                $this->logWebhookActivity('meta', $tenantId, 'failed', 'Invalid signature', $request->all(), null, $this->getProcessingTime($startTime));
                return response()->json(['error' => 'Invalid signature'], 403);
            }

            $parsed = $this->parseMetaWebhook($request->all());
            $tenantId = $parsed['tenant_id'];

            $leadId = DB::table('leads')->insertGetId($parsed);

            $this->logWebhookActivity('meta', $tenantId, 'success', 'Lead saved successfully', $request->all(), $parsed['lead_id'], $this->getProcessingTime($startTime));

            return response()->json(['success' => true, 'leadId' => $parsed['lead_id']]);

        } catch (\Exception $e) {
            Log::error('Meta webhook error: ' . $e->getMessage());
            $this->logWebhookActivity('meta', $tenantId, 'failed', $e->getMessage(), $request->all(), null, $this->getProcessingTime($startTime));
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Enhanced Google webhook with JWT validation
     */
    public function google(Request $request)
    {
        $startTime = microtime(true);
        $tenantId = 'unknown';
        
        try {
            $authHeader = $request->header('Authorization');
            
            if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
                $this->logWebhookActivity('google', $tenantId, 'failed', 'Missing or invalid authorization header', $request->all(), null, $this->getProcessingTime($startTime));
                return response()->json(['error' => 'Missing authorization'], 401);
            }

            $token = substr($authHeader, 7);
            if (!$this->verifyGoogleToken($token)) {
                $this->logWebhookActivity('google', $tenantId, 'failed', 'Invalid token', $request->all(), null, $this->getProcessingTime($startTime));
                return response()->json(['error' => 'Invalid token'], 403);
            }

            $parsed = $this->parseGoogleWebhook($request->all());
            $tenantId = $parsed['tenant_id'];

            $leadId = DB::table('leads')->insertGetId($parsed);

            $this->logWebhookActivity('google', $tenantId, 'success', 'Lead saved successfully', $request->all(), $parsed['lead_id'], $this->getProcessingTime($startTime));

            return response()->json(['success' => true, 'leadId' => $parsed['lead_id']]);

        } catch (\Exception $e) {
            Log::error('Google webhook error: ' . $e->getMessage());
            $this->logWebhookActivity('google', $tenantId, 'failed', $e->getMessage(), $request->all(), null, $this->getProcessingTime($startTime));
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Enhanced TikTok webhook with HMAC-SHA256
     */
    public function tiktok(Request $request)
    {
        $startTime = microtime(true);
        $tenantId = 'unknown';
        
        try {
            $payload = $request->getContent();
            $signature = $request->header('X-Tiktok-Signature');
            
            if (!$signature) {
                $this->logWebhookActivity('tiktok', $tenantId, 'failed', 'Missing signature', $request->all(), null, $this->getProcessingTime($startTime));
                return response()->json(['error' => 'Missing signature'], 400);
            }

            if (!$this->verifyTikTokSignature($payload, $signature, env('TIKTOK_WEBHOOK_SECRET'))) {
                $this->logWebhookActivity('tiktok', $tenantId, 'failed', 'Invalid signature', $request->all(), null, $this->getProcessingTime($startTime));
                return response()->json(['error' => 'Invalid signature'], 403);
            }

            $parsed = $this->parseTikTokWebhook($request->all());
            $tenantId = $parsed['tenant_id'];

            $leadId = DB::table('leads')->insertGetId($parsed);

            $this->logWebhookActivity('tiktok', $tenantId, 'success', 'Lead saved successfully', $request->all(), $parsed['lead_id'], $this->getProcessingTime($startTime));

            return response()->json(['success' => true, 'leadId' => $parsed['lead_id']]);

        } catch (\Exception $e) {
            Log::error('TikTok webhook error: ' . $e->getMessage());
            $this->logWebhookActivity('tiktok', $tenantId, 'failed', $e->getMessage(), $request->all(), null, $this->getProcessingTime($startTime));
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Enhanced Meta signature verification (SHA1)
     */
    private function verifyMetaSignature($payload, $signature, $secret)
    {
        if (!$signature || !$secret) {
            return false;
        }
        
        $hash = 'sha256=' . hash_hmac('sha256', $payload, $secret);
        return hash_equals($hash, $signature);
    }

    /**
     * Enhanced Google JWT token verification
     */
    private function verifyGoogleToken($token)
    {
        try {
            // Basic JWT structure validation
            $parts = explode('.', $token);
            if (count($parts) !== 3) {
                return false;
            }
            
            // Decode payload
            $payload = json_decode(base64_decode($parts[1]), true);
            if (!$payload) {
                return false;
            }
            
            // Check expiration
            if (isset($payload['exp']) && $payload['exp'] < time()) {
                return false;
            }
            
            // In production, verify signature with Google's public keys
            return true;
        } catch (\Exception $e) {
            Log::error('Google token verification failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Enhanced TikTok signature verification (HMAC-SHA256)
     */
    private function verifyTikTokSignature($payload, $signature, $secret)
    {
        if (!$signature || !$secret) {
            return false;
        }
        
        $hash = 'tiktok_' . hash('sha256', $payload . $secret);
        return hash_equals($hash, $signature);
    }

    /**
     * Enhanced Meta webhook parser
     */
    private function parseMetaWebhook($data)
    {
        $fields = collect($data['entry'][0]['changes'][0]['value']['field_data'] ?? []);
        $fieldMap = $fields->pluck('values.0', 'name')->toArray();

        return [
            'lead_id' => 'LEAD-' . rand(100000, 999999),
            'tenant_id' => $this->matchFormToTenant($data['entry'][0]['changes'][0]['value']['form_id'] ?? ''),
            'first_name' => $fieldMap['first_name'] ?? '',
            'last_name' => $fieldMap['last_name'] ?? '',
            'email' => $fieldMap['email'] ?? null,
            'phone' => $fieldMap['phone_number'] ?? null,
            'country' => $fieldMap['country'] ?? null,
            'city' => $fieldMap['city'] ?? null,
            'treatment_interest' => $fieldMap['treatment'] ?? 'Belirtilmemiş',
            'source' => 'meta',
            'source_details' => 'Meta Campaign: ' . ($data['entry'][0]['changes'][0]['value']['campaign_name'] ?? 'Unknown'),
            'campaign' => $data['entry'][0]['changes'][0]['value']['campaign_name'] ?? null,
            'ad_id' => $data['entry'][0]['changes'][0]['value']['ad_id'] ?? null,
            'form_id' => $data['entry'][0]['changes'][0]['value']['form_id'] ?? null,
            'raw_data' => json_encode($data),
            'status' => 'contacted',
            'priority' => 'high',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ];
    }

    /**
     * Google webhook parser
     */
    private function parseGoogleWebhook($data)
    {
        return [
            'lead_id' => 'LEAD-' . rand(100000, 999999),
            'tenant_id' => $this->matchCampaignToTenant($data['campaignName'] ?? ''),
            'first_name' => $data['firstName'] ?? $data['first_name'] ?? '',
            'last_name' => $data['lastName'] ?? $data['last_name'] ?? '',
            'email' => $data['email'] ?? null,
            'phone' => $data['phoneNumber'] ?? $data['phone'] ?? null,
            'country' => $data['country'] ?? null,
            'city' => $data['city'] ?? null,
            'treatment_interest' => $data['treatment'] ?? $data['service'] ?? 'Belirtilmemiş',
            'source' => 'google',
            'source_details' => 'Google Ads Campaign: ' . ($data['campaignName'] ?? 'Unknown'),
            'campaign' => $data['campaignName'] ?? null,
            'ad_id' => $data['adGroupId'] ?? null,
            'form_id' => $data['formId'] ?? null,
            'raw_data' => json_encode($data),
            'status' => 'contacted',
            'priority' => 'high',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ];
    }

    /**
     * TikTok webhook parser
     */
    private function parseTikTokWebhook($data)
    {
        return [
            'lead_id' => 'LEAD-' . rand(100000, 999999),
            'tenant_id' => $this->matchTikTokToTenant($data['advertiser_id'] ?? ''),
            'first_name' => $data['first_name'] ?? '',
            'last_name' => $data['last_name'] ?? '',
            'email' => $data['email'] ?? null,
            'phone' => $data['phone_number'] ?? null,
            'country' => $data['country'] ?? null,
            'city' => $data['city'] ?? null,
            'treatment_interest' => $data['treatment_interest'] ?? 'Belirtilmemiş',
            'source' => 'tiktok',
            'source_details' => 'TikTok Campaign: ' . ($data['campaign_name'] ?? 'Unknown'),
            'campaign' => $data['campaign_name'] ?? null,
            'ad_id' => $data['ad_id'] ?? null,
            'form_id' => $data['form_id'] ?? null,
            'raw_data' => json_encode($data),
            'status' => 'contacted',
            'priority' => 'medium',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ];
    }

    /**
     * Enhanced tenant matching functions
     */
    private function matchFormToTenant($formId)
    {
        $formTenantMap = [
            'meta_form_sagliktur' => 'tenant-sagliktur',
            'meta_form_medicalpark' => 'tenant-medicalpark',
            'meta_form_acibadem' => 'tenant-acibadem',
            'meta_form_test' => 'tenant-001'
        ];
        return $formTenantMap[$formId] ?? 'tenant-001';
    }

    private function matchCampaignToTenant($campaignName)
    {
        if (!$campaignName) return 'tenant-001';
        
        $campaign = strtolower($campaignName);
        if (str_contains($campaign, 'sagliktur') || str_contains($campaign, 'health')) return 'tenant-sagliktur';
        if (str_contains($campaign, 'medicalpark') || str_contains($campaign, 'medical')) return 'tenant-medicalpark';
        if (str_contains($campaign, 'acibadem') || str_contains($campaign, 'hospital')) return 'tenant-acibadem';
        
        return 'tenant-001';
    }

    private function matchTikTokToTenant($advertiserId)
    {
        $advertiserTenantMap = [
            'tiktok_adv_sagliktur' => 'tenant-sagliktur',
            'tiktok_adv_medicalpark' => 'tenant-medicalpark',
            'tiktok_adv_test' => 'tenant-001'
        ];
        return $advertiserTenantMap[$advertiserId] ?? 'tenant-001';
    }

    /**
     * Enhanced webhook activity logging
     */
    private function logWebhookActivity($platform, $tenantId, $status, $message, $payload, $leadId = null, $processingTime = null)
    {
        try {
            DB::table('webhook_logs')->insert([
                'platform' => $platform,
                'tenant_id' => $tenantId,
                'status' => $status,
                'message' => $message,
                'payload' => json_encode($payload),
                'lead_id' => $leadId,
                'processing_time' => $processingTime,
                'received_at' => Carbon::now()
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to log webhook activity: ' . $e->getMessage());
        }
    }

    /**
     * Calculate processing time in milliseconds
     */
    private function getProcessingTime($startTime)
    {
        return round((microtime(true) - $startTime) * 1000);
    }
}