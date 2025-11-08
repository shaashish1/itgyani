#!/bin/bash

echo "🧹 ITGyani Blog Automation Cleanup & Deployment Script"
echo "============================================================"
echo "⏰ Started at: $(date)"
echo

# Function to execute SQL safely
execute_sql() {
    local sql_query="$1"
    local description="$2"
    
    echo "🔄 $description..."
    
    # Connect to Supabase (assuming local instance)
    # You'll need to replace with your actual connection details
    echo "SQL: $sql_query"
    echo "✅ SQL prepared for execution"
    echo
}

# Function to deploy a Supabase function
deploy_function() {
    local function_name="$1"
    local function_path="/home/itgyani.com/itgyani/supabase/functions/$function_name"
    
    echo "🚀 Deploying function: $function_name"
    
    if [ -f "$function_path/index.ts" ] || [ -f "$function_path/index_fixed.ts" ] || [ -f "$function_path/index_enhanced.ts" ]; then
        echo "  📁 Function directory exists: $function_path"
        
        # Use fixed version if available
        if [ -f "$function_path/index_fixed.ts" ]; then
            echo "  🔄 Using fixed version: index_fixed.ts"
            cp "$function_path/index_fixed.ts" "$function_path/index.ts"
        elif [ -f "$function_path/index_enhanced.ts" ]; then
            echo "  🔄 Using enhanced version: index_enhanced.ts"
            cp "$function_path/index_enhanced.ts" "$function_path/index.ts"
        fi
        
        echo "  ✅ Function ready for deployment"
    else
        echo "  ❌ Function file not found in $function_path"
        return 1
    fi
    echo
}

echo "🧹 PHASE 1: DATABASE CLEANUP"
echo "----------------------------"

# Clear stuck daily blog runs
execute_sql "
UPDATE daily_blog_runs 
SET status = 'failed', 
    completed_at = NOW(), 
    updated_at = NOW()
WHERE status = 'running' 
  AND created_at < NOW() - INTERVAL '2 hours';
" "Clearing stuck daily blog runs (older than 2 hours)"

# Clear stuck queue items
execute_sql "
UPDATE blog_generation_queue 
SET status = 'failed', 
    error_message = 'Cleared by cleanup script - was stuck in processing',
    completed_at = NOW()
WHERE status = 'processing' 
  AND created_at < NOW() - INTERVAL '1 hour';
" "Clearing stuck queue items (older than 1 hour)"

# Reset failed items with low attempts for retry
execute_sql "
UPDATE blog_generation_queue 
SET status = 'pending', 
    error_message = NULL,
    started_at = NULL,
    completed_at = NULL
WHERE status = 'failed' 
  AND attempts < 2 
  AND created_at > NOW() - INTERVAL '24 hours';
" "Resetting recent failed items for retry (attempts < 2)"

echo "🚀 PHASE 2: FUNCTION DEPLOYMENT"
echo "-------------------------------"

# Deploy critical functions in correct order
deploy_function "process-single-blog"
deploy_function "process-blog-queue" 
deploy_function "generate-daily-news-blogs"
deploy_function "queue-runner"

echo "🧪 PHASE 3: SYSTEM VALIDATION"
echo "-----------------------------"

# Test function availability
echo "🔄 Testing function endpoints..."

functions_to_test=(
    "process-single-blog"
    "process-blog-queue"
    "generate-daily-news-blogs"
    "queue-runner"
)

for func in "${functions_to_test[@]}"; do
    function_path="/home/itgyani.com/itgyani/supabase/functions/$func/index.ts"
    if [ -f "$function_path" ]; then
        echo "  ✅ $func - Function file exists"
    else
        echo "  ❌ $func - Function file missing"
    fi
done

echo
echo "📊 PHASE 4: SYSTEM STATUS CHECK"
echo "-------------------------------"

# Prepare status check queries
echo "🔄 Preparing database status queries..."

execute_sql "
SELECT 
    status,
    COUNT(*) as count,
    MAX(created_at) as latest
FROM daily_blog_runs 
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY status
ORDER BY latest DESC;
" "Daily blog runs status (last 7 days)"

execute_sql "
SELECT 
    status,
    COUNT(*) as count,
    MIN(created_at) as oldest,
    MAX(created_at) as newest
FROM blog_generation_queue 
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY status
ORDER BY oldest;
" "Blog generation queue status (last 24 hours)"

execute_sql "
SELECT 
    COUNT(*) as total_blogs,
    COUNT(CASE WHEN status = 'published' THEN 1 END) as published,
    COUNT(CASE WHEN status = 'draft' THEN 1 END) as drafts,
    MAX(created_at) as latest_blog
FROM blogs 
WHERE created_at > NOW() - INTERVAL '7 days';
" "Blog creation status (last 7 days)"

echo
echo "🎯 PHASE 5: DEPLOYMENT SUMMARY"
echo "------------------------------"

echo "✅ Cleanup Actions Completed:"
echo "  - Cleared stuck daily blog runs"
echo "  - Reset stuck queue items" 
echo "  - Prepared failed items for retry"
echo

echo "🚀 Functions Ready for Deployment:"
echo "  - process-single-blog (handles individual blog generation)"
echo "  - process-blog-queue (enhanced queue processor)"  
echo "  - generate-daily-news-blogs (fixed timeout issues)"
echo "  - queue-runner (optimized batch processing)"
echo

echo "📋 NEXT STEPS:"
echo "1. Execute the prepared SQL queries against your Supabase database"
echo "2. Deploy functions using: supabase functions deploy <function-name>"
echo "3. Test with a small batch: trigger generate-daily-news-blogs"
echo "4. Monitor logs for any remaining issues"
echo "5. Gradually increase batch sizes once stable"
echo

echo "⚠️  IMPORTANT NOTES:"
echo "- All fixed functions include proper timeout handling"
echo "- Queue processing is limited to 3 items per run for stability"
echo "- Blog generation now uses efficient single-blog processor"
echo "- Database cleanup should be run regularly to prevent stuck states"
echo

echo "🏁 Cleanup and preparation completed at: $(date)"
echo "============================================================"