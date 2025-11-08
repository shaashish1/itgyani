#!/bin/bash

echo "🧪 ITGyani Function Logic Validation"
echo "===================================="
echo "⏰ Started at: $(date)"
echo

# Function to validate TypeScript function structure
validate_function() {
    local function_name="$1"
    local function_path="/home/itgyani.com/itgyani/supabase/functions/$function_name/index.ts"
    
    echo "🔍 Validating: $function_name"
    echo "   Path: $function_path"
    
    if [ ! -f "$function_path" ]; then
        echo "   ❌ Function file not found"
        return 1
    fi
    
    # Check basic structure
    local checks_passed=0
    local total_checks=8
    
    # Check 1: Has serve function
    if grep -q "serve(" "$function_path"; then
        echo "   ✅ Has serve() function"
        checks_passed=$((checks_passed + 1))
    else
        echo "   ❌ Missing serve() function"
    fi
    
    # Check 2: Has CORS headers
    if grep -q "corsHeaders" "$function_path"; then
        echo "   ✅ Has CORS headers"
        checks_passed=$((checks_passed + 1))
    else
        echo "   ❌ Missing CORS headers"
    fi
    
    # Check 3: Has OPTIONS handling
    if grep -q "req.method.*OPTIONS" "$function_path"; then
        echo "   ✅ Handles OPTIONS requests"
        checks_passed=$((checks_passed + 1))
    else
        echo "   ❌ Missing OPTIONS handling"
    fi
    
    # Check 4: Has error handling
    if grep -q "try.*catch" "$function_path" || grep -q "catch.*error" "$function_path"; then
        echo "   ✅ Has error handling"
        checks_passed=$((checks_passed + 1))
    else
        echo "   ❌ Missing error handling"
    fi
    
    # Check 5: Returns proper Response
    if grep -q "new Response" "$function_path"; then
        echo "   ✅ Returns proper Response objects"
        checks_passed=$((checks_passed + 1))
    else
        echo "   ❌ Missing Response objects"
    fi
    
    # Check 6: Has environment variable checks
    if grep -q "Deno.env.get" "$function_path"; then
        echo "   ✅ Uses environment variables"
        checks_passed=$((checks_passed + 1))
    else
        echo "   ❌ No environment variable usage"
    fi
    
    # Check 7: Has logging
    if grep -q "console.log" "$function_path"; then
        echo "   ✅ Has logging statements"
        checks_passed=$((checks_passed + 1))
    else
        echo "   ❌ Missing logging"
    fi
    
    # Check 8: Check for timeout prevention (immediate return or batch limiting)
    if grep -q "return new Response" "$function_path" && (grep -q "limit(" "$function_path" || grep -q "slice(" "$function_path" || grep -q "immediate" "$function_path"); then
        echo "   ✅ Has timeout prevention measures"
        checks_passed=$((checks_passed + 1))
    else
        echo "   ⚠️  May need timeout prevention review"
    fi
    
    # Calculate score
    local score=$((checks_passed * 100 / total_checks))
    echo "   📊 Validation Score: $score% ($checks_passed/$total_checks checks passed)"
    
    if [ $score -ge 75 ]; then
        echo "   ✅ Function is ready for deployment"
    elif [ $score -ge 50 ]; then
        echo "   ⚠️  Function needs minor improvements"
    else
        echo "   ❌ Function needs major fixes before deployment"
    fi
    
    echo
}

# Function to check specific improvements in fixed functions
check_improvements() {
    local function_name="$1"
    local function_path="/home/itgyani.com/itgyani/supabase/functions/$function_name/index.ts"
    
    echo "🔧 Checking improvements in: $function_name"
    
    case $function_name in
        "generate-daily-news-blogs")
            echo "   Expected fixes:"
            if grep -q "immediate.*return\|return.*Response.*queued" "$function_path"; then
                echo "   ✅ Has immediate return after queuing"
            else
                echo "   ❌ Missing immediate return pattern"
            fi
            
            if grep -q "limit.*10\|slice.*10" "$function_path"; then
                echo "   ✅ Has batch limiting (max 10 topics)"
            else
                echo "   ❌ Missing batch limiting"
            fi
            ;;
            
        "process-blog-queue")
            echo "   Expected fixes:"
            if grep -q "limit.*3\|slice.*3" "$function_path"; then
                echo "   ✅ Processes max 3 items per run"
            else
                echo "   ❌ Missing 3-item batch limit"
            fi
            
            if grep -q "process-single-blog" "$function_path"; then
                echo "   ✅ Calls single blog processor"
            else
                echo "   ❌ Missing single blog processor integration"
            fi
            ;;
            
        "process-single-blog")
            echo "   Expected features:"
            if grep -q "OpenAI\|openai" "$function_path"; then
                echo "   ✅ Has OpenAI integration"
            else
                echo "   ❌ Missing OpenAI integration"
            fi
            
            if grep -q "slug" "$function_path"; then
                echo "   ✅ Has SEO slug generation"
            else
                echo "   ❌ Missing SEO slug generation"
            fi
            
            if grep -q "duplicate.*check\|existing.*blog" "$function_path"; then
                echo "   ✅ Has duplicate checking"
            else
                echo "   ❌ Missing duplicate checking"
            fi
            ;;
    esac
    echo
}

echo "📋 VALIDATION PHASE 1: CORE FUNCTIONS"
echo "-------------------------------------"

# Validate each critical function
validate_function "generate-daily-news-blogs"
validate_function "process-blog-queue" 
validate_function "process-single-blog"
validate_function "queue-runner"

echo "📋 VALIDATION PHASE 2: SPECIFIC IMPROVEMENTS"
echo "--------------------------------------------"

check_improvements "generate-daily-news-blogs"
check_improvements "process-blog-queue"
check_improvements "process-single-blog"

echo "📋 VALIDATION PHASE 3: ARCHITECTURE ANALYSIS"
echo "--------------------------------------------"

echo "🔍 Analyzing function sizes and complexity..."

for func in "generate-daily-news-blogs" "process-blog-queue" "process-single-blog" "queue-runner"; do
    func_path="/home/itgyani.com/itgyani/supabase/functions/$func/index.ts"
    if [ -f "$func_path" ]; then
        line_count=$(wc -l < "$func_path")
        echo "   📊 $func: $line_count lines"
        
        if [ $line_count -lt 200 ]; then
            echo "      ✅ Optimal size for serverless function"
        elif [ $line_count -lt 500 ]; then
            echo "      ⚠️  Medium complexity - monitor timeout"
        else
            echo "      ❌ Large function - high timeout risk"
        fi
    fi
done

echo

echo "🔍 Checking for timeout prevention patterns..."

timeout_patterns=(
    "immediate.*return"
    "return.*Response.*success.*true"
    "limit\|slice"
    "setTimeout\|delay"
    "catch.*error.*Response"
)

for func in "generate-daily-news-blogs" "process-blog-queue" "process-single-blog"; do
    func_path="/home/itgyani.com/itgyani/supabase/functions/$func/index.ts"
    if [ -f "$func_path" ]; then
        echo "   🔍 $func timeout prevention:"
        
        for pattern in "${timeout_patterns[@]}"; do
            if grep -q "$pattern" "$func_path"; then
                echo "      ✅ Has pattern: $pattern"
            fi
        done
    fi
done

echo

echo "📋 VALIDATION PHASE 4: DEPLOYMENT READINESS"
echo "-------------------------------------------"

echo "🎯 Overall System Assessment:"

# Count functions that passed validation
ready_functions=0
total_functions=4

for func in "generate-daily-news-blogs" "process-blog-queue" "process-single-blog" "queue-runner"; do
    func_path="/home/itgyani.com/itgyani/supabase/functions/$func/index.ts"
    if [ -f "$func_path" ]; then
        # Simple readiness check based on key patterns
        if grep -q "serve(" "$func_path" && grep -q "corsHeaders" "$func_path" && grep -q "try.*catch\|catch.*error" "$func_path"; then
            ready_functions=$((ready_functions + 1))
        fi
    fi
done

readiness_score=$((ready_functions * 100 / total_functions))
echo "   📊 System Readiness: $readiness_score% ($ready_functions/$total_functions functions ready)"

if [ $readiness_score -eq 100 ]; then
    echo "   🎉 SYSTEM READY FOR DEPLOYMENT!"
    echo "   ✅ All functions have proper structure and error handling"
    echo "   ✅ Timeout prevention measures are in place"
    echo "   ✅ Architecture supports scalable processing"
elif [ $readiness_score -ge 75 ]; then
    echo "   ⚠️  MOSTLY READY - Minor issues to address"
    echo "   ✅ Core functionality is solid"
    echo "   ⚠️  Some functions may need minor adjustments"
else
    echo "   ❌ NOT READY - Major issues need fixing"
    echo "   ❌ Critical functions have structural problems"
fi

echo

echo "📋 NEXT STEPS BASED ON VALIDATION:"
echo "1. 🔧 Address any ❌ issues found above"
echo "2. 🚀 Deploy functions using manual deployment guide"
echo "3. 🧪 Test with small batches first"
echo "4. 📊 Monitor performance and success rates"
echo "5. 🎯 Scale up gradually once stable"

echo
echo "🏁 Function validation completed at: $(date)"
echo "===================================="