// Test script for blogService - Run this in browser console
// Instructions:
// 1. Open https://itgyani.com/admin/blog
// 2. Open browser DevTools (F12)
// 3. Go to Console tab
// 4. Paste this script and press Enter

console.log('🧪 Testing BlogService Integration...');

// Test 1: Import blogService
console.log('📦 Test 1: Importing blogService...');
try {
  // Try dynamic import
  import('../services/blogService.js').then(module => {
    const { blogService } = module;
    
    console.log('✅ BlogService imported successfully');
    
    // Test 2: Health check
    console.log('🏥 Test 2: Running health check...');
    const health = blogService.healthCheck();
    console.log('Health check result:', health);
    
    // Test 3: Get all blogs
    console.log('📚 Test 3: Testing getAllBlogs()...');
    const allBlogs = blogService.getAllBlogs();
    console.log('All blogs result:', {
      count: allBlogs?.length || 0,
      firstBlog: allBlogs?.[0] ? {
        id: allBlogs[0].id,
        title: allBlogs[0].title?.substring(0, 50) + '...',
        category: allBlogs[0].category
      } : null
    });
    
    // Test 4: Get paginated blogs
    console.log('📄 Test 4: Testing getBlogsPaginated()...');
    const paginatedBlogs = blogService.getBlogsPaginated(1);
    console.log('Paginated blogs result:', {
      currentPage: paginatedBlogs.currentPage,
      totalPages: paginatedBlogs.totalPages,
      totalBlogs: paginatedBlogs.totalBlogs,
      blogsOnPage: paginatedBlogs.blogs?.length || 0
    });
    
    // Test 5: Get statistics
    console.log('📊 Test 5: Testing getStatistics()...');
    const stats = blogService.getStatistics();
    console.log('Statistics result:', stats);
    
    // Test 6: Get categories
    console.log('🏷️ Test 6: Testing getCategories()...');
    const categories = blogService.getCategories();
    console.log('Categories result:', categories);
    
    console.log('✅ All tests completed successfully!');
    
    return {
      success: true,
      blogCount: allBlogs?.length || 0,
      categories: categories.length,
      stats
    };
    
  }).catch(error => {
    console.error('❌ BlogService import failed:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    });
  });
  
} catch (error) {
  console.error('❌ Dynamic import not supported, trying window access...');
  
  // Fallback: Try to access from window if already loaded
  if (window.blogService) {
    console.log('✅ Found blogService on window object');
    const blogService = window.blogService;
    
    const allBlogs = blogService.getAllBlogs();
    const stats = blogService.getStatistics();
    
    console.log('Test results:', {
      blogCount: allBlogs?.length || 0,
      stats
    });
  } else {
    console.error('❌ BlogService not found on window object');
    console.log('🔧 Troubleshooting steps:');
    console.log('1. Ensure the blogService.ts file exists in src/services/');
    console.log('2. Check that the admin page imports blogService correctly');
    console.log('3. Verify the build process includes the service files');
  }
}

// Alternative test using fetch if available
console.log('🌐 Alternative: Testing data files directly...');
Promise.all([
  fetch('/src/data/blogs.ts').catch(() => null),
  fetch('/src/data/metadata.ts').catch(() => null)
]).then(results => {
  console.log('Data files accessibility:', {
    blogsFile: results[0] ? 'Accessible' : 'Not accessible',
    metadataFile: results[1] ? 'Accessible' : 'Not accessible'
  });
});