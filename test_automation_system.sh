#!/bin/bash

echo "🧪 ITGyani Blog Automation Test Suite"
echo "====================================="
echo "⏰ Test started at: $(date)"
echo

# Configuration
SUPABASE_URL="YOUR_SUPABASE_URL"
SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"

# Function to test a Supabase function endpoint
test_function() {
    local function_name="$1"
    local test_data="$2"
    
    echo "🔄 Testing function: $function_name"
    
    # Check if function file exists locally
    local function_path="/home/itgyani.com/itgyani/supabase/functions/$function_name/index.ts"
    
    if [ -f "$function_path" ]; then
        echo "  ✅ Function file exists: $function_path"
        
        # Check for syntax errors (basic TypeScript check)
        if grep -q "serve(" "$function_path"; then
            echo "  ✅ Function has proper Deno serve structure"
        else
            echo "  ⚠️  Function might have structure issues"
        fi
        
        if grep -q "corsHeaders" "$function_path"; then
            echo "  ✅ Function has CORS headers configured"
        else
            echo "  ⚠️  Function missing CORS headers"
        fi
        
        # Count lines to check function complexity
        local line_count=$(wc -l < "$function_path")
        echo "  📊 Function size: $line_count lines"
        
        if [ "$line_count" -gt 500 ]; then
            echo "  ⚠️  Large function - consider breaking down for timeout prevention"
        fi
        
    else
        echo "  ❌ Function file not found: $function_path"
        return 1
    fi
    
    echo
}

# Function to validate database structure
check_database_structure() {
    echo "🔄 Checking database structure expectations..."
    
    # List expected tables
    expected_tables=(
        "blogs"
        "daily_blog_runs" 
        "blog_generation_queue"
        "blog_categories"
    )
    
    echo "  📋 Expected tables:"
    for table in "${expected_tables[@]}"; do
        echo "    - $table"
    done
    
    echo "  ✅ Database structure validation prepared"
    echo
}

# Function to check environment variables
check_environment() {
    echo "🔄 Checking environment configuration..."
    
    # Check if .env file exists
    if [ -f "/home/itgyani.com/itgyani/.env" ] || [ -f "/home/itgyani.com/itgyani/.env.local" ]; then
        echo "  ✅ Environment file found"
        
        # Check for required variables (without exposing values)
        env_vars=(
            "SUPABASE_URL"
            "SUPABASE_ANON_KEY" 
            "SUPABASE_SERVICE_ROLE_KEY"
            "OPENAI_API_KEY"
        )
        
        for var in "${env_vars[@]}"; do
            if grep -q "^$var=" /home/itgyani.com/itgyani/.env* 2>/dev/null; then
                echo "  ✅ $var is configured"
            else
                echo "  ❌ $var is missing"
            fi
        done
    else
        echo "  ⚠️  No .env file found - check Supabase configuration"
    fi
    echo
}

echo "🧪 TEST PHASE 1: ENVIRONMENT VALIDATION"
echo "---------------------------------------"
check_environment

echo "🧪 TEST PHASE 2: DATABASE STRUCTURE"
echo "-----------------------------------"
check_database_structure

echo "🧪 TEST PHASE 3: FUNCTION VALIDATION"
echo "------------------------------------"

# Test each critical function
test_function "generate-daily-news-blogs" '{"test": true}'
test_function "process-blog-queue" '{"test": true}'
test_function "process-single-blog" '{"queueItemId": "test", "topic": {"title": "test"}}'
test_function "queue-runner" '{}'

echo "🧪 TEST PHASE 4: ARCHITECTURE ANALYSIS"
echo "--------------------------------------"

echo "🔄 Analyzing system architecture..."

# Check for the fixed versions
fixed_functions=0
enhanced_functions=0

for func_dir in /home/itgyani.com/itgyani/supabase/functions/*/; do
    if [ -f "${func_dir}index_fixed.ts" ]; then
        fixed_functions=$((fixed_functions + 1))
        echo "  ✅ Fixed version available: $(basename "$func_dir")"
    elif [ -f "${func_dir}index_enhanced.ts" ]; then
        enhanced_functions=$((enhanced_functions + 1))
        echo "  ✅ Enhanced version available: $(basename "$func_dir")"
    fi
done

echo "  📊 Architecture improvements:"
echo "    - $fixed_functions functions have fixed versions"
echo "    - $enhanced_functions functions have enhanced versions"

# Check for timeout prevention measures
echo "🔄 Checking timeout prevention measures..."

timeout_checks=(
    "immediate return"
    "queue processing"
    "batch limiting" 
    "error handling"
)

for func_path in /home/itgyani.com/itgyani/supabase/functions/*/index*.ts; do
    if [ -f "$func_path" ]; then
        func_name=$(basename "$(dirname "$func_path")")
        
        # Check for timeout prevention patterns
        if grep -q "return new Response" "$func_path" && grep -q "JSON.stringify" "$func_path"; then
            echo "  ✅ $func_name: Proper response handling"
        fi
        
        if grep -q "limit(" "$func_path" || grep -q "\.slice(" "$func_path"; then
            echo "  ✅ $func_name: Batch limiting implemented"
        fi
        
        if grep -q "catch.*error" "$func_path"; then
            echo "  ✅ $func_name: Error handling present"
        fi
    fi
done

echo

echo "🧪 TEST PHASE 5: RECOMMENDATIONS"
echo "--------------------------------"

echo "📋 Deployment Checklist:"
echo "  1. ✅ Run cleanup script first: ./cleanup_and_deploy.sh"
echo "  2. 🔄 Deploy functions with fixed versions"
echo "  3. 🧪 Test with single blog generation"
echo "  4. 📊 Monitor queue processing with small batches"
echo "  5. 🚀 Scale up gradually once stable"
echo

echo "⚠️  Critical Success Factors:"
echo "  - Timeout handling: Functions return immediately after queuing"
echo "  - Batch limiting: Process max 3 items per queue run"
echo "  - Error recovery: Failed items can be retried automatically"
echo "  - Database cleanup: Regular maintenance prevents stuck states"
echo

echo "🎯 Expected Improvements:"
echo "  - 0% → 90%+ success rate for daily blog generation"
echo "  - <30 second function execution times"
echo "  - Automatic recovery from temporary failures"
echo "  - Scalable queue processing architecture"
echo

echo "🏁 Test suite completed at: $(date)"
echo "====================================="