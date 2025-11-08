// Test frontend connection to Supabase
const { createClient } = require('@supabase/supabase-js');

// Use the same credentials as frontend
const url = 'https://gtwsglzyyislrgcyfxvt.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0d3NnbHp5eWlzbHJnY3lmeHZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNTU1NzMsImV4cCI6MjA3NDczMTU3M30.ha0Ui7HmR_PH9SmgBo0nRcaCsU57Jw1GI_l2M0ymWVg';

console.log('🧪 Testing Frontend Blog Loading Logic...\n');

async function testBlogQuery() {
  const supabase = createClient(url, key);
  
  try {
    console.log('📡 Testing exact query used by Blog.tsx...');
    
    // This is the exact query from Blog.tsx lines 57-63
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, author_id, category_id, tags, published_at, created_at, updated_at, status, meta_description, reading_time, featured_image_url')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('❌ Frontend query error:', error);
      console.error('🔍 Error details:', JSON.stringify(error, null, 2));
      return false;
    }

    console.log(`✅ Frontend query successful!`);
    console.log(`📊 Returned ${data.length} blogs`);
    console.log(`🏷️  First 3 blog titles:`);
    
    data.slice(0, 3).forEach((blog, i) => {
      console.log(`   ${i+1}. ${blog.title}`);
    });
    
    return { success: true, count: data.length, blogs: data };

  } catch (e) {
    console.error('❌ Connection failed:', e.message);
    return false;
  }
}

async function testCategoryQuery() {
  const supabase = createClient(url, key);
  
  try {
    console.log('\n📂 Testing category fetch...');
    
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug');
    
    if (error) {
      console.warn('⚠️  Categories query failed:', error.message);
      return { success: false, categories: [] };
    }
    
    console.log(`✅ Found ${data.length} categories`);
    return { success: true, categories: data };
    
  } catch (e) {
    console.warn('⚠️  Categories connection failed:', e.message);
    return { success: false, categories: [] };
  }
}

async function main() {
  const blogResult = await testBlogQuery();
  const categoryResult = await testCategoryQuery();
  
  console.log('\n📋 SUMMARY:');
  console.log('===========');
  
  if (blogResult && blogResult.success) {
    console.log(`✅ Blog Query: SUCCESS (${blogResult.count} blogs)`);
    console.log(`🎯 Expected Frontend Behavior: Display first 6 blogs with pagination`);
    
    if (blogResult.count > 6) {
      console.log(`📄 Page 1: ${Math.min(6, blogResult.count)} blogs`);
      console.log(`📄 Total Pages: ${Math.ceil(blogResult.count / 6)}`);
    }
    
  } else {
    console.log('❌ Blog Query: FAILED - Frontend will use demo posts');
    console.log('🎯 Expected Frontend Behavior: Display 8 demo posts');
  }
  
  if (categoryResult.success) {
    console.log(`✅ Category Query: SUCCESS (${categoryResult.categories.length} categories)`);
  } else {
    console.log('⚠️  Category Query: FAILED - Will use default categories');
  }
  
  console.log('\n🔍 Next Steps:');
  console.log('- Check browser console for JavaScript errors');
  console.log('- Verify .env variables are loaded in frontend');
  console.log('- Check network tab for failed API calls');
  console.log('- Clear browser cache and hard refresh');
}

main().catch(console.error);
