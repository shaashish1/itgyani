/**
 * Browser-Compatible Blog Scheduling Service
 * 
 * Uses localStorage for browser-based scheduling
 */

export interface ScheduleRequest {
  topic: string;
  category: string;
  frequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'custom';
  customInterval?: {
    interval: 'hours' | 'days' | 'weeks' | 'months';
    count: number;
  };
  startDate?: string;
  autoPublish: boolean;
  keywords: string[];
  tone: string;
  audience: string;
  generateImages: boolean;
}

export interface ScheduledBlog {
  id: string;
  topic: string;
  category: string;
  frequency: string;
  scheduledFor: Date;
  status: 'scheduled' | 'generating' | 'generated' | 'published' | 'failed';
  autoPublish: boolean;
  keywords: string[];
  tone: string;
  audience: string;
  generateImages: boolean;
  createdAt: Date;
  lastAttempt?: Date;
  error?: string;
  generatedContent?: any;
}

class BrowserBlogSchedulingService {
  private readonly SCHEDULE_KEY = 'itgyani_blog_schedule';
  private readonly STATS_KEY = 'itgyani_schedule_stats';

  /**
   * Get all scheduled blogs from localStorage
   */
  private getAllScheduled(): ScheduledBlog[] {
    try {
      const scheduleData = localStorage.getItem(this.SCHEDULE_KEY);
      if (!scheduleData) return [];
      
      const schedules = JSON.parse(scheduleData);
      return schedules.map((schedule: any) => ({
        ...schedule,
        scheduledFor: new Date(schedule.scheduledFor),
        createdAt: new Date(schedule.createdAt),
        lastAttempt: schedule.lastAttempt ? new Date(schedule.lastAttempt) : undefined
      }));
    } catch (error) {
      console.error('Failed to load scheduled blogs:', error);
      return [];
    }
  }

  /**
   * Save all scheduled blogs to localStorage
   */
  private saveAllScheduled(schedules: ScheduledBlog[]): void {
    try {
      localStorage.setItem(this.SCHEDULE_KEY, JSON.stringify(schedules));
      this.updateStats();
    } catch (error) {
      console.error('Failed to save scheduled blogs:', error);
    }
  }

  /**
   * Calculate next run date based on frequency
   */
  private calculateNextRun(frequency: string, customInterval?: any, startDate?: string): Date {
    const now = new Date();
    const start = startDate ? new Date(startDate) : now;
    
    // If start date is in the future, use it
    if (start > now) {
      return start;
    }

    // Calculate next run based on frequency
    const nextRun = new Date(start);
    
    switch (frequency) {
      case 'daily':
        nextRun.setDate(nextRun.getDate() + 1);
        break;
      case 'weekly':
        nextRun.setDate(nextRun.getDate() + 7);
        break;
      case 'biweekly':
        nextRun.setDate(nextRun.getDate() + 14);
        break;
      case 'monthly':
        nextRun.setMonth(nextRun.getMonth() + 1);
        break;
      case 'custom':
        if (customInterval) {
          switch (customInterval.interval) {
            case 'hours':
              nextRun.setHours(nextRun.getHours() + customInterval.count);
              break;
            case 'days':
              nextRun.setDate(nextRun.getDate() + customInterval.count);
              break;
            case 'weeks':
              nextRun.setDate(nextRun.getDate() + (customInterval.count * 7));
              break;
            case 'months':
              nextRun.setMonth(nextRun.getMonth() + customInterval.count);
              break;
          }
        }
        break;
    }

    return nextRun;
  }

  /**
   * Schedule a blog for automated generation
   */
  scheduleBlog(request: ScheduleRequest): { success: boolean; data?: ScheduledBlog; error?: string } {
    try {
      const nextRun = this.calculateNextRun(
        request.frequency, 
        request.customInterval, 
        request.startDate
      );

      const scheduledBlog: ScheduledBlog = {
        id: `scheduled-${Date.now()}`,
        topic: request.topic,
        category: request.category,
        frequency: request.frequency,
        scheduledFor: nextRun,
        status: 'scheduled',
        autoPublish: request.autoPublish,
        keywords: request.keywords,
        tone: request.tone,
        audience: request.audience,
        generateImages: request.generateImages,
        createdAt: new Date()
      };

      const schedules = this.getAllScheduled();
      schedules.push(scheduledBlog);
      this.saveAllScheduled(schedules);

      return {
        success: true,
        data: scheduledBlog
      };

    } catch (error) {
      return {
        success: false,
        error: `Failed to schedule blog: ${error.message}`
      };
    }
  }

  /**
   * Get all scheduled blogs
   */
  getScheduledBlogs(): ScheduledBlog[] {
    return this.getAllScheduled();
  }

  /**
   * Cancel a scheduled blog
   */
  cancelScheduledBlog(id: string): { success: boolean; error?: string } {
    try {
      const schedules = this.getAllScheduled();
      const scheduleIndex = schedules.findIndex(s => s.id === id);

      if (scheduleIndex === -1) {
        return {
          success: false,
          error: 'Scheduled blog not found'
        };
      }

      schedules.splice(scheduleIndex, 1);
      this.saveAllScheduled(schedules);

      return { success: true };

    } catch (error) {
      return {
        success: false,
        error: `Failed to cancel scheduled blog: ${error.message}`
      };
    }
  }

  /**
   * Get schedule statistics
   */
  getScheduleStats(): {
    totalScheduled: number;
    pendingGeneration: number;
    generated: number;
    published: number;
    failed: number;
    queueHealth: 'good' | 'warning' | 'error';
    nextScheduled?: Date;
  } {
    const schedules = this.getAllScheduled();
    
    const stats = {
      totalScheduled: schedules.length,
      pendingGeneration: schedules.filter(s => s.status === 'scheduled').length,
      generated: schedules.filter(s => s.status === 'generated').length,
      published: schedules.filter(s => s.status === 'published').length,
      failed: schedules.filter(s => s.status === 'failed').length,
      queueHealth: 'good' as 'good' | 'warning' | 'error',
      nextScheduled: undefined as Date | undefined
    };

    // Find next scheduled blog
    const pendingSchedules = schedules
      .filter(s => s.status === 'scheduled')
      .sort((a, b) => a.scheduledFor.getTime() - b.scheduledFor.getTime());
    
    if (pendingSchedules.length > 0) {
      stats.nextScheduled = pendingSchedules[0].scheduledFor;
    }

    // Determine queue health
    const failureRate = stats.totalScheduled > 0 ? stats.failed / stats.totalScheduled : 0;
    
    if (failureRate > 0.5) {
      stats.queueHealth = 'error';
    } else if (failureRate > 0.2) {
      stats.queueHealth = 'warning';
    }

    return stats;
  }

  /**
   * Update schedule statistics
   */
  private updateStats(): void {
    try {
      const stats = this.getScheduleStats();
      localStorage.setItem(this.STATS_KEY, JSON.stringify(stats));
    } catch (error) {
      console.error('Failed to update schedule stats:', error);
    }
  }

  /**
   * Process scheduled blogs (would be called by a background service)
   */
  async processScheduledBlogs(): Promise<{
    success: boolean;
    data?: {
      processed: number;
      successful: number;
      failed: number;
      errors?: string[];
    };
    error?: string;
  }> {
    try {
      const schedules = this.getAllScheduled();
      const now = new Date();
      const dueSchedules = schedules.filter(s => 
        s.status === 'scheduled' && s.scheduledFor <= now
      );

      let successful = 0;
      let failed = 0;
      const errors: string[] = [];

      // Simulate processing (in a real implementation, this would call the AI services)
      for (const schedule of dueSchedules) {
        try {
          // Update status to generating
          schedule.status = 'generating';
          schedule.lastAttempt = new Date();
          
          // Simulate blog generation (replace with actual AI service calls)
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Simulate success/failure
          if (Math.random() > 0.1) { // 90% success rate
            schedule.status = schedule.autoPublish ? 'published' : 'generated';
            successful++;
          } else {
            schedule.status = 'failed';
            schedule.error = 'Simulated generation failure';
            failed++;
            errors.push(`Failed to generate blog for topic: ${schedule.topic}`);
          }

        } catch (error) {
          schedule.status = 'failed';
          schedule.error = error.message;
          failed++;
          errors.push(`Error processing ${schedule.topic}: ${error.message}`);
        }
      }

      // Save updated schedules
      this.saveAllScheduled(schedules);

      return {
        success: true,
        data: {
          processed: dueSchedules.length,
          successful,
          failed,
          errors: errors.length > 0 ? errors : undefined
        }
      };

    } catch (error) {
      return {
        success: false,
        error: `Failed to process scheduled blogs: ${error.message}`
      };
    }
  }

  /**
   * Update a scheduled blog status
   */
  updateScheduledBlogStatus(
    id: string, 
    status: ScheduledBlog['status'], 
    error?: string,
    generatedContent?: any
  ): { success: boolean; error?: string } {
    try {
      const schedules = this.getAllScheduled();
      const schedule = schedules.find(s => s.id === id);

      if (!schedule) {
        return {
          success: false,
          error: 'Scheduled blog not found'
        };
      }

      schedule.status = status;
      schedule.lastAttempt = new Date();
      
      if (error) {
        schedule.error = error;
      }
      
      if (generatedContent) {
        schedule.generatedContent = generatedContent;
      }

      this.saveAllScheduled(schedules);

      return { success: true };

    } catch (error) {
      return {
        success: false,
        error: `Failed to update scheduled blog status: ${error.message}`
      };
    }
  }

  /**
   * Clear all scheduled blogs (for testing/development)
   */
  clearAllSchedules(): void {
    try {
      localStorage.removeItem(this.SCHEDULE_KEY);
      localStorage.removeItem(this.STATS_KEY);
    } catch (error) {
      console.error('Failed to clear schedule data:', error);
    }
  }
}

// Export singleton instance
export const blogSchedulingService = new BrowserBlogSchedulingService();