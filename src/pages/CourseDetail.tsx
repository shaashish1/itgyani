import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft,
  PlayCircle,
  PauseCircle,
  Clock,
  Users,
  Star,
  BookOpen,
  CheckCircle,
  FileText,
  Video,
  Download,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Course data - in real implementation, fetch from API
  const courseData = {
    1: {
      title: "Introduction to n8n Automation",
      description: "Learn the fundamentals of workflow automation using n8n platform",
      duration: "2 hours",
      difficulty: "Beginner",
      students: "12.3K",
      rating: 4.8,
      instructor: "AI Automation Expert",
      totalLessons: 8,
      lessons: [
        {
          id: 1,
          title: "What is n8n and Workflow Automation?",
          duration: "15 min",
          type: "video",
          content: "Introduction to automation concepts and n8n platform overview",
          videoUrl: "/videos/lesson1.mp4" // Placeholder - replace with actual content
        },
        {
          id: 2,
          title: "Setting Up Your First Workflow",
          duration: "18 min",
          type: "hands-on",
          content: "Step-by-step guide to creating your first automation workflow",
          videoUrl: "/videos/lesson2.mp4"
        },
        {
          id: 3,
          title: "Understanding Nodes and Connections",
          duration: "20 min",
          type: "video",
          content: "Deep dive into n8n nodes and how to connect them effectively",
          videoUrl: "/videos/lesson3.mp4"
        },
        {
          id: 4,
          title: "Data Transformation Techniques",
          duration: "22 min",
          type: "hands-on",
          content: "Learn to manipulate and transform data between workflow steps",
          videoUrl: "/videos/lesson4.mp4"
        },
        {
          id: 5,
          title: "Error Handling and Debugging",
          duration: "16 min", 
          type: "video",
          content: "Best practices for handling errors and debugging workflows",
          videoUrl: "/videos/lesson5.mp4"
        },
        {
          id: 6,
          title: "Practical Exercise: Email Automation",
          duration: "25 min",
          type: "project",
          content: "Build a complete email automation workflow from scratch",
          videoUrl: "/videos/lesson6.mp4"
        },
        {
          id: 7,
          title: "Scheduling and Triggers",
          duration: "18 min",
          type: "video",
          content: "Understanding different trigger types and scheduling options",
          videoUrl: "/videos/lesson7.mp4"
        },
        {
          id: 8,
          title: "Final Project and Next Steps",
          duration: "26 min",
          type: "project",
          content: "Complete capstone project and guidance for continued learning",
          videoUrl: "/videos/lesson8.mp4"
        }
      ]
    }
    // Add more courses as needed
  };

  const course = courseData[parseInt(courseId || '1') as keyof typeof courseData];

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
            <Link to="/academy">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Academy
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentLessonData = course.lessons[currentLesson];
  const progress = (completedLessons.length / course.totalLessons) * 100;

  const markLessonComplete = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <Link to="/academy" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Academy
          </Link>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Badge className="mb-2">{course.difficulty}</Badge>
                <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students} students
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {course.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.totalLessons} lessons
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Course Progress</span>
                  <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>

            {/* Course Sidebar */}
            <div className="lg:col-span-1">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Course Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {course.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        currentLesson === index 
                          ? 'bg-primary/10 border-primary/20' 
                          : 'border-border hover:bg-muted/50'
                      }`}
                      onClick={() => setCurrentLesson(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {completedLessons.includes(lesson.id) ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
                          )}
                          <span className="font-medium text-sm">{lesson.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Video Player */}
            <Card className="glass-card mb-6">
              <CardContent className="p-0">
                <div className="relative bg-black rounded-t-lg aspect-video">
                  {/* Placeholder for video player */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Button
                      size="lg"
                      onClick={togglePlayPause}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                    >
                      {isPlaying ? (
                        <PauseCircle className="w-8 h-8" />
                      ) : (
                        <PlayCircle className="w-8 h-8" />
                      )}
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-black/50 backdrop-blur-sm rounded px-3 py-2">
                      <h3 className="text-white font-medium">{currentLessonData.title}</h3>
                      <p className="text-white/80 text-sm">{currentLessonData.duration}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lesson Content */}
            <Tabs defaultValue="overview" className="mb-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-4">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Lesson {currentLesson + 1}: {currentLessonData.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{currentLessonData.content}</p>
                    
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => markLessonComplete(currentLessonData.id)}
                        disabled={completedLessons.includes(currentLessonData.id)}
                      >
                        {completedLessons.includes(currentLessonData.id) ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          'Mark as Complete'
                        )}
                      </Button>
                      
                      {currentLesson > 0 && (
                        <Button
                          variant="outline"
                          onClick={() => setCurrentLesson(currentLesson - 1)}
                        >
                          <ChevronLeft className="w-4 h-4 mr-2" />
                          Previous Lesson
                        </Button>
                      )}
                      
                      {currentLesson < course.lessons.length - 1 && (
                        <Button
                          variant="outline"
                          onClick={() => setCurrentLesson(currentLesson + 1)}
                        >
                          Next Lesson
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="resources" className="mt-4">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Course Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Course Slides</p>
                          <p className="text-sm text-muted-foreground">PDF presentation materials</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Video className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Practice Files</p>
                          <p className="text-sm text-muted-foreground">Sample workflows and templates</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="discussion" className="mt-4">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Discussion & Q&A</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Discussion forum coming soon. Ask questions and share insights with other students.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Instructor Info */}
          <div className="lg:col-span-1">
            <Card className="glass-card mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">AI</span>
                  </div>
                  <h3 className="font-semibold">{course.instructor}</h3>
                  <p className="text-sm text-muted-foreground">Automation Specialist</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Course Stats */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Course Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completion Rate</span>
                  <span className="font-medium">87%</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Rating</span>
                  <span className="font-medium">{course.rating}/5</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Students</span>
                  <span className="font-medium">{course.students}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseDetail;