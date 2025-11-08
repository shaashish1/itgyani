#!/bin/bash

echo "🚀 ITGyani Manual Function Deployment Guide"
echo "==========================================="
echo "⏰ Generated at: $(date)"
echo

echo "Since Supabase CLI installation failed, here are the manual deployment steps:"
echo

echo "📋 STEP 1: PREPARE FUNCTIONS FOR DEPLOYMENT"
echo "-------------------------------------------"
echo "✅ Functions are already prepared at:"
echo "   - /home/itgyani.com/itgyani/supabase/functions/generate-daily-news-blogs/index.ts"
echo "   - /home/itgyani.com/itgyani/supabase/functions/process-blog-queue/index.ts" 
echo "   - /home/itgyani.com/itgyani/supabase/functions/process-single-blog/index.ts"
echo "   - /home/itgyani.com/itgyani/supabase/functions/queue-runner/index.ts"
echo

echo "📋 STEP 2: DATABASE CLEANUP SQL QUERIES"
echo "---------------------------------------"
echo "Execute these SQL queries in your Supabase SQL Editor:"
echo

echo "-- Query 1: Clear stuck daily blog runs"
echo "UPDATE daily_blog_runs"
echo "SET status = 'failed',"
echo "    completed_at = NOW(),"
echo "    updated_at = NOW()"
echo "WHERE status = 'running'"
echo "  AND created_at < NOW() - INTERVAL '2 hours';"
echo

echo "-- Query 2: Clear stuck queue items"
echo "UPDATE blog_generation_queue"
echo "SET status = 'failed',"
echo "    error_message = 'Cleared by cleanup script - was stuck in processing',"
echo "    completed_at = NOW()"
echo "WHERE status = 'processing'"
echo "  AND created_at < NOW() - INTERVAL '1 hour';"
echo

echo "-- Query 3: Reset recent failed items for retry"
echo "UPDATE blog_generation_queue"
echo "SET status = 'pending',"
echo "    error_message = NULL,"
echo "    started_at = NULL,"
echo "    completed_at = NULL"
echo "WHERE status = 'failed'"
echo "  AND attempts < 2"
echo "  AND created_at > NOW() - INTERVAL '24 hours';"
echo

echo "📋 STEP 3: FUNCTION DEPLOYMENT OPTIONS"
echo "--------------------------------------"
echo "Option A - Using Supabase Dashboard:"
echo "1. Go to your Supabase project dashboard"
echo "2. Navigate to 'Edge Functions' section"
echo "3. For each function, click 'Create Function' or 'Edit'"
echo "4. Copy the content from the corresponding index.ts file"
echo "5. Deploy the function"
echo

echo "Option B - Using VS Code Extension:"
echo "1. Install 'Supabase' extension in VS Code"
echo "2. Connect to your project"
echo "3. Right-click on function folders and select 'Deploy'"
echo

echo "Option C - Using Docker/Local Supabase:"
echo "1. If you have local Supabase running, use: supabase functions deploy"
echo

echo "📋 STEP 4: VERIFICATION QUERIES"
echo "-------------------------------"
echo "Run these queries to verify system status:"
echo

echo "-- Check daily blog runs status"
echo "SELECT status, COUNT(*), MAX(created_at) as latest"
echo "FROM daily_blog_runs"
echo "WHERE created_at > NOW() - INTERVAL '7 days'"
echo "GROUP BY status;"
echo

echo "-- Check queue status"
echo "SELECT status, COUNT(*), MIN(created_at) as oldest"
echo "FROM blog_generation_queue"
echo "WHERE created_at > NOW() - INTERVAL '24 hours'"
echo "GROUP BY status;"
echo

echo "-- Check recent blogs"
echo "SELECT COUNT(*) as total, COUNT(CASE WHEN status='published' THEN 1 END) as published"
echo "FROM blogs"
echo "WHERE created_at > NOW() - INTERVAL '7 days';"
echo

echo "📋 STEP 5: TESTING ENDPOINTS"
echo "----------------------------"
echo "After deployment, test these endpoints:"
echo

echo "1. Test single blog generation:"
echo 'curl -X POST "YOUR_SUPABASE_URL/functions/v1/process-single-blog" \'
echo '  -H "Authorization: Bearer YOUR_SERVICE_KEY" \'
echo '  -H "Content-Type: application/json" \'
echo '  -d '"'"'{"queueItemId":"test","topic":{"title":"Test Blog"},"runId":"test"}'"'"
echo

echo "2. Test queue processing:"
echo 'curl -X POST "YOUR_SUPABASE_URL/functions/v1/process-blog-queue" \'
echo '  -H "Authorization: Bearer YOUR_SERVICE_KEY"'
echo

echo "3. Test daily blog generation:"
echo 'curl -X POST "YOUR_SUPABASE_URL/functions/v1/generate-daily-news-blogs" \'
echo '  -H "Authorization: Bearer YOUR_SERVICE_KEY"'
echo

echo "📋 STEP 6: MONITORING"
echo "---------------------"
echo "Monitor function logs in Supabase dashboard:"
echo "- Functions → [function-name] → Logs"
echo "- Look for success/error patterns"
echo "- Check execution times (should be <30 seconds)"
echo

echo "🎯 SUCCESS INDICATORS:"
echo "- Functions execute without timeout errors"
echo "- Queue items process from 'pending' → 'completed'"
echo "- New blogs appear in the blogs table"
echo "- Daily runs show 'completed' status"
echo

echo "🏁 Deployment guide completed at: $(date)"
echo "==========================================="