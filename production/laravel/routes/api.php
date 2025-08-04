<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebhookController;

/*
|--------------------------------------------------------------------------
| Webhook API Routes
|--------------------------------------------------------------------------
|
| Production-ready webhook endpoints for Meta, Google Ads, and TikTok
| Each endpoint includes signature verification and comprehensive logging
|
*/

// Webhook endpoints - No authentication required (verified by signatures)
Route::prefix('webhooks')->group(function () {
    
    // Meta (Facebook/Instagram) webhook
    Route::post('/meta', [WebhookController::class, 'meta'])
        ->name('webhooks.meta');
    
    // Google Ads webhook  
    Route::post('/google', [WebhookController::class, 'google'])
        ->name('webhooks.google');
    
    // TikTok webhook
    Route::post('/tiktok', [WebhookController::class, 'tiktok'])
        ->name('webhooks.tiktok');
    
    // Health check endpoint
    Route::get('/health', function () {
        return response()->json([
            'status' => 'ok',
            'timestamp' => now()->toISOString(),
            'endpoints' => [
                'POST /api/webhooks/meta',
                'POST /api/webhooks/google', 
                'POST /api/webhooks/tiktok'
            ]
        ]);
    })->name('webhooks.health');
});

/*
|--------------------------------------------------------------------------
| Webhook Management API (Protected)
|--------------------------------------------------------------------------
|
| These endpoints require authentication for webhook log management
|
*/

Route::middleware('auth:sanctum')->prefix('webhook-management')->group(function () {
    
    // Get webhook logs with filtering
    Route::get('/logs', function (Request $request) {
        $query = DB::table('webhook_logs')
            ->orderBy('received_at', 'desc');
        
        if ($request->platform) {
            $query->where('platform', $request->platform);
        }
        
        if ($request->tenant_id) {
            $query->where('tenant_id', $request->tenant_id);
        }
        
        if ($request->status) {
            $query->where('status', $request->status);
        }
        
        $logs = $query->paginate(50);
        
        return response()->json($logs);
    });
    
    // Get webhook statistics
    Route::get('/stats', function () {
        $stats = [
            'total_webhooks' => DB::table('webhook_logs')->count(),
            'successful_webhooks' => DB::table('webhook_logs')->where('status', 'success')->count(),
            'failed_webhooks' => DB::table('webhook_logs')->where('status', 'failed')->count(),
            'by_platform' => DB::table('webhook_logs')
                ->select('platform', DB::raw('count(*) as count'))
                ->groupBy('platform')
                ->get(),
            'by_tenant' => DB::table('webhook_logs')
                ->select('tenant_id', DB::raw('count(*) as count'))
                ->groupBy('tenant_id')
                ->get(),
            'recent_activity' => DB::table('webhook_logs')
                ->where('received_at', '>=', now()->subHours(24))
                ->count()
        ];
        
        return response()->json($stats);
    });
    
    // Retry failed webhook (manual reprocessing)
    Route::post('/retry/{logId}', function ($logId) {
        $log = DB::table('webhook_logs')->find($logId);
        
        if (!$log) {
            return response()->json(['error' => 'Log not found'], 404);
        }
        
        // Reprocess the webhook payload
        $payload = json_decode($log->payload, true);
        
        try {
            // Call appropriate webhook handler based on platform
            $controller = new WebhookController();
            
            switch ($log->platform) {
                case 'meta':
                    $result = $controller->meta(new Request($payload));
                    break;
                case 'google':
                    $result = $controller->google(new Request($payload));
                    break;
                case 'tiktok':
                    $result = $controller->tiktok(new Request($payload));
                    break;
                default:
                    return response()->json(['error' => 'Unknown platform'], 400);
            }
            
            return response()->json(['success' => true, 'result' => $result]);
            
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    });
});

/*
|--------------------------------------------------------------------------
| Environment Configuration Check
|--------------------------------------------------------------------------
*/

Route::get('/webhook-config', function () {
    return response()->json([
        'meta_secret_configured' => !empty(env('META_WEBHOOK_SECRET')),
        'google_secret_configured' => !empty(env('GOOGLE_CLIENT_SECRET')),
        'tiktok_secret_configured' => !empty(env('TIKTOK_WEBHOOK_SECRET')),
        'database_connected' => DB::connection()->getPdo() ? true : false,
        'environment' => app()->environment()
    ]);
})->middleware('auth:sanctum');