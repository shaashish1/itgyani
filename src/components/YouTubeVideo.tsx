/**
 * YouTube Video Component for Academy
 * Provides embedded YouTube videos for educational content
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Clock, Eye, ThumbsUp, ExternalLink } from 'lucide-react';

interface YouTubeVideoProps {
  videoId: string;
  title: string;
  description: string;
  duration: string;
  views?: string;
  likes?: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail?: string;
  className?: string;
}

export const YouTubeVideo: React.FC<YouTubeVideoProps> = ({
  videoId,
  title,
  description,
  duration,
  views,
  likes,
  category,
  difficulty,
  thumbnail,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const thumbnailUrl = thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300';
      case 'intermediate': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300';
      case 'advanced': return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="relative aspect-video bg-black">
        {!isPlaying ? (
          <>
            <img 
              src={thumbnailUrl} 
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to default YouTube thumbnail
                e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group cursor-pointer"
                 onClick={() => setIsPlaying(true)}>
              <div className="bg-red-600 rounded-full p-4 group-hover:bg-red-700 transition-colors">
                <Play className="w-8 h-8 text-white fill-current" />
              </div>
            </div>
            <div className="absolute top-4 left-4">
              <Badge className={getDifficultyColor(difficulty)}>
                {difficulty}
              </Badge>
            </div>
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {duration}
            </div>
          </>
        ) : (
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-lg leading-tight line-clamp-2 flex-1">
            {title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="shrink-0"
          >
            <a href={watchUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
        <Badge variant="outline" className="w-fit">
          {category}
        </Badge>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-foreground/70 mb-4 line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-foreground/60">
          {views && (
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {views}
            </span>
          )}
          {likes && (
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" />
              {likes}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {duration}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

// YouTube Video Gallery Component
interface YouTubeVideoGalleryProps {
  videos: Array<Omit<YouTubeVideoProps, 'className'>>;
  title?: string;
  description?: string;
  className?: string;
}

export const YouTubeVideoGallery: React.FC<YouTubeVideoGalleryProps> = ({
  videos,
  title,
  description,
  className = ''
}) => {
  return (
    <div className={className}>
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <YouTubeVideo
            key={`${video.videoId}-${index}`}
            {...video}
          />
        ))}
      </div>
    </div>
  );
};

export default YouTubeVideo;