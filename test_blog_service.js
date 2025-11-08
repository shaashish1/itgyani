// BlogService Test and Validation
// Use this in browser console to test blogService functionality

(async function testBlogService() {
    console.log('🧪 Testing BlogService...');
    
    try {
        // Test importing blogService
        const { blogService } = await import('/src/services/blogService');
        console.log('✅ BlogService imported successfully');
        
        // Test getAllBlogs
        console.log('🔄 Testing getAllBlogs()...');
        const allBlogs = blogService.getAllBlogs();
        console.log('📊 All blogs result:', {
            count: allBlogs?.length || 0,
            firstBlog: allBlogs?.[0] ? {
                id: allBlogs[0].id,
                title: allBlogs[0].title,
                category: allBlogs[0].category
            } : null
        });
        
        // Test pagination
        console.log('🔄 Testing getBlogsPaginated()...');
        const paginatedBlogs = blogService.getBlogsPaginated(1);
        console.log('📄 Paginated blogs result:', {
            currentPage: paginatedBlogs.currentPage,
            totalPages: paginatedBlogs.totalPages,
            totalBlogs: paginatedBlogs.totalBlogs,
            blogsOnPage: paginatedBlogs.blogs?.length || 0
        });
        
        // Test statistics calculation
        const stats = {
            total: allBlogs?.length || 0,
            categories: (allBlogs || []).reduce((acc, blog) => {
                const category = blog.category || 'Uncategorized';
                acc[category] = (acc[category] || 0) + 1;
                return acc;
            }, {}),
            recentCount: (allBlogs || []).filter(blog => {
                const blogDate = new Date(blog.publishedAt);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return blogDate > weekAgo;
            }).length
        };
        
        console.log('📈 Statistics calculated:', stats);
        console.log('✅ BlogService test completed successfully!');
        
        return {
            success: true,
            blogCount: allBlogs?.length || 0,
            stats
        };
        
    } catch (error) {
        console.error('❌ BlogService test failed:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
        
        return {
            success: false,
            error: error.message
        };
    }
})();

// Instructions:
// 1. Open https://itgyani.com/admin/blog
// 2. Open browser DevTools (F12)
// 3. Paste this script in Console and press Enter
// 4. Check the test results