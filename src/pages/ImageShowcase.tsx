import React from 'react';
import { ImageGallery, ReadMeButton, BlogThumbnail, PageHeader, SocialIcon } from '@/components/ImageComponents';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ImageShowcase = () => {
  return (
    <>
      <title>Image Gallery - Generated Images Showcase | ITGYANI</title>
      <meta name="description" content="Showcase of all generated images including Read Me buttons, blog thumbnails, page headers, and social icons for the ITGYANI website." />
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section with Page Header */}
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
            <div className="container mx-auto px-6 relative py-12">
              <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </div>
              
              <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="gradient-text">Generated Images</span><br />
                  Showcase
                </h1>
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  Explore all the custom-generated images for ITGYANI including Read Me buttons, 
                  blog thumbnails, page headers, and social icons.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Button Demo */}
          <section className="py-16 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12">Interactive Read Me Buttons</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <Card className="text-center p-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Primary Style</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ReadMeButton variant="primary" text="readMore" />
                    <ReadMeButton variant="primary" text="learnMore" />
                    <ReadMeButton variant="primary" text="getStarted" />
                  </CardContent>
                </Card>
                
                <Card className="text-center p-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Secondary Style</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ReadMeButton variant="secondary" text="readMore" />
                    <ReadMeButton variant="secondary" text="viewDetails" />
                    <ReadMeButton variant="secondary" text="exploreNow" />
                  </CardContent>
                </Card>
                
                <Card className="text-center p-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Outline Style</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ReadMeButton variant="outline" text="readMore" />
                    <ReadMeButton variant="outline" text="learnMore" />
                    <ReadMeButton variant="outline" text="viewDetails" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Blog Thumbnails Demo */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12">Blog Thumbnails Collection</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <BlogThumbnail type="aiAutomationGuide" className="aspect-video" />
                  <h3 className="font-semibold text-center">AI Automation Guide</h3>
                </div>
                
                <div className="space-y-4">
                  <BlogThumbnail type="businessTransformation" className="aspect-video" />
                  <h3 className="font-semibold text-center">Business Transformation</h3>
                </div>
                
                <div className="space-y-4">
                  <BlogThumbnail type="workflowOptimization" className="aspect-video" />
                  <h3 className="font-semibold text-center">Workflow Optimization</h3>
                </div>
                
                <div className="space-y-4">
                  <BlogThumbnail type="techInnovation" className="aspect-video" />
                  <h3 className="font-semibold text-center">Tech Innovation</h3>
                </div>
                
                <div className="space-y-4">
                  <BlogThumbnail type="caseStudySuccess" className="aspect-video" />
                  <h3 className="font-semibold text-center">Case Study Success</h3>
                </div>
                
                <div className="space-y-4">
                  <BlogThumbnail type="aiImplementation" className="aspect-video" />
                  <h3 className="font-semibold text-center">AI Implementation</h3>
                </div>
              </div>
            </div>
          </section>

          {/* Page Headers Demo */}
          <section className="py-16 bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12">Page Headers</h2>
              
              <div className="space-y-8 max-w-4xl mx-auto">
                <div>
                  <h3 className="font-semibold mb-4 text-center">Services Header</h3>
                  <PageHeader type="services" className="rounded-lg overflow-hidden" />
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4 text-center">Case Studies Header</h3>
                  <PageHeader type="caseStudies" className="rounded-lg overflow-hidden" />
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4 text-center">Blog Header</h3>
                  <PageHeader type="blog" className="rounded-lg overflow-hidden" />
                </div>
              </div>
            </div>
          </section>

          {/* Social Icons Demo */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12">Social Media Icons</h2>
              
              <div className="flex justify-center gap-8">
                <div className="text-center space-y-2">
                  <SocialIcon type="facebook" />
                  <p className="text-sm text-foreground/70">Facebook</p>
                </div>
                
                <div className="text-center space-y-2">
                  <SocialIcon type="twitter" />
                  <p className="text-sm text-foreground/70">Twitter/X</p>
                </div>
                
                <div className="text-center space-y-2">
                  <SocialIcon type="linkedin" />
                  <p className="text-sm text-foreground/70">LinkedIn</p>
                </div>
                
                <div className="text-center space-y-2">
                  <SocialIcon type="github" />
                  <p className="text-sm text-foreground/70">GitHub</p>
                </div>
              </div>
            </div>
          </section>

          {/* Usage Instructions */}
          <section className="py-16 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-950/20 dark:to-red-950/20">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12">How to Use These Images</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      📱 Read Me Buttons
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 mb-4">
                      Use these interactive buttons throughout your site for improved user engagement:
                    </p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Blog post cards</li>
                      <li>• Case study previews</li>
                      <li>• Service offerings</li>
                      <li>• Call-to-action sections</li>
                    </ul>
                    <div className="mt-4">
                      <ReadMeButton variant="primary" text="readMore" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="p-6">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      🖼️ Page Headers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/70 mb-4">
                      Professional headers for consistent branding across all pages:
                    </p>
                    <ul className="space-y-2 text-sm text-foreground/70">
                      <li>• Main page sections</li>
                      <li>• Blog and case studies</li>
                      <li>• Service pages</li>
                      <li>• Contact and about pages</li>
                    </ul>
                    <Button variant="outline" size="sm" className="mt-4">
                      Implementation Guide
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* All Images Gallery */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12">Complete Image Gallery</h2>
              <ImageGallery />
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ImageShowcase;