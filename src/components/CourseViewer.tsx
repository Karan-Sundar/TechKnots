
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, BookOpen, Clock, Play, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RevealOnScroll from './RevealOnScroll';

interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  videoUrl?: string;
  description: string;
}

interface CourseViewerProps {
  courseId?: string;
}

const CourseViewer = ({ courseId = '1' }: CourseViewerProps) => {
  const { toast } = useToast();
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Sample course data (in a real app, this would be fetched from an API)
  const course = {
    id: courseId,
    title: 'IoT Fundamentals and Development',
    description: 'Learn the basics of IoT architecture, protocols, and device connectivity.',
    instructor: 'Dr. Ramesh Kumar',
    totalLessons: 12,
    completedLessons: 3,
    totalDuration: '15 hours',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    lessons: [
      {
        id: 1,
        title: 'Introduction to IoT',
        duration: '25 min',
        completed: true,
        videoUrl: 'https://www.example.com/video1',
        description: 'This lesson introduces the basic concepts of IoT and its applications in various fields.'
      },
      {
        id: 2,
        title: 'IoT Architecture and Protocols',
        duration: '40 min',
        completed: true,
        videoUrl: 'https://www.example.com/video2',
        description: 'Learn about the layered architecture of IoT systems and common protocols used for communication.'
      },
      {
        id: 3,
        title: 'Sensors and Actuators',
        duration: '35 min',
        completed: true,
        videoUrl: 'https://www.example.com/video3',
        description: 'Explore different types of sensors and actuators used in IoT devices and their working principles.'
      },
      {
        id: 4,
        title: 'Microcontrollers for IoT',
        duration: '45 min',
        completed: false,
        videoUrl: 'https://www.example.com/video4',
        description: 'Deep dive into popular microcontrollers like Arduino and ESP8266 used in IoT projects.'
      },
      {
        id: 5,
        title: 'Setting Up Your First IoT Device',
        duration: '60 min',
        completed: false,
        videoUrl: 'https://www.example.com/video5',
        description: 'Step-by-step guide to set up and program your first IoT device using Arduino.'
      },
      {
        id: 6,
        title: 'Connectivity Options in IoT',
        duration: '50 min',
        completed: false,
        videoUrl: 'https://www.example.com/video6',
        description: 'Learn about different wireless technologies like WiFi, Bluetooth, ZigBee, and LoRa for IoT connectivity.'
      }
    ]
  };

  const progressPercentage = (course.completedLessons / course.totalLessons) * 100;

  const handleLessonClick = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setIsVideoPlaying(false);
  };

  const markLessonCompleted = () => {
    if (!activeLesson) return;
    
    // In a real application, this would make an API call to update the lesson status
    toast({
      title: "Lesson completed!",
      description: `You've completed "${activeLesson.title}"`,
    });
    
    // Reset video state
    setIsVideoPlaying(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        {/* Left sidebar - lesson list */}
        <div className="md:w-1/3 bg-gray-50 border-r p-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold">{course.title}</h2>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock size={14} className="mr-1" />
              <span>{course.totalDuration}</span>
              <span className="mx-2">•</span>
              <BookOpen size={14} className="mr-1" />
              <span>{course.totalLessons} lessons</span>
            </div>
            
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span>Course progress</span>
                <span className="font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          </div>
          
          <h3 className="font-medium mb-3">Course Content</h3>
          <div className="space-y-2">
            {course.lessons.map((lesson) => (
              <button
                key={lesson.id}
                className={`w-full text-left px-3 py-3 rounded-md transition-colors ${
                  activeLesson?.id === lesson.id 
                    ? 'bg-techknot-blue text-white' 
                    : lesson.completed 
                      ? 'bg-green-50 text-gray-800' 
                      : 'hover:bg-gray-100 text-gray-800'
                }`}
                onClick={() => handleLessonClick(lesson)}
              >
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    {lesson.completed && <CheckCircle size={14} className="mr-2 text-green-500" />}
                    <span>{lesson.title}</span>
                  </span>
                  <span className="text-xs opacity-80">{lesson.duration}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Right content area - video player and lesson details */}
        <div className="md:w-2/3 p-4">
          {activeLesson ? (
            <>
              <div className="aspect-video bg-black rounded-lg mb-4 relative overflow-hidden">
                {isVideoPlaying ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <div className="text-white text-center">
                      <p className="mb-2">Video playback would appear here</p>
                      <p className="text-sm opacity-70">(This is a simulation)</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900 relative">
                    <Button 
                      className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-techknot-blue hover:bg-techknot-purple transition-transform hover:scale-110"
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      <Play size={24} />
                    </Button>
                    <img 
                      src={course.image} 
                      alt={activeLesson.title} 
                      className="w-full h-full object-cover opacity-50"
                    />
                  </div>
                )}
              </div>
              
              <h2 className="text-xl font-bold mb-2">{activeLesson.title}</h2>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock size={14} className="mr-1" />
                <span>{activeLesson.duration}</span>
                <span className="mx-2">•</span>
                <span>Lesson {activeLesson.id} of {course.totalLessons}</span>
              </div>
              
              <div className="prose max-w-none mb-6">
                <p>{activeLesson.description}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  className="border-techknot-blue text-techknot-blue hover:bg-techknot-blue hover:text-white"
                  onClick={() => {
                    const prevIndex = course.lessons.findIndex(l => l.id === activeLesson.id) - 1;
                    if (prevIndex >= 0) {
                      handleLessonClick(course.lessons[prevIndex]);
                    }
                  }}
                  disabled={course.lessons[0].id === activeLesson.id}
                >
                  Previous Lesson
                </Button>
                
                <Button 
                  className="bg-techknot-blue hover:bg-techknot-purple"
                  onClick={markLessonCompleted}
                  disabled={activeLesson.completed}
                >
                  {activeLesson.completed ? 'Completed' : 'Mark as Completed'}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-techknot-blue text-techknot-blue hover:bg-techknot-blue hover:text-white"
                  onClick={() => {
                    const nextIndex = course.lessons.findIndex(l => l.id === activeLesson.id) + 1;
                    if (nextIndex < course.lessons.length) {
                      handleLessonClick(course.lessons[nextIndex]);
                    }
                  }}
                  disabled={course.lessons[course.lessons.length - 1].id === activeLesson.id}
                >
                  Next Lesson
                </Button>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-techknot-blue/20 flex items-center justify-center mb-4">
                <BookOpen size={24} className="text-techknot-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Start Learning</h3>
              <p className="text-gray-600 mb-6">Select a lesson from the sidebar to begin your learning journey.</p>
              <Button 
                className="bg-techknot-blue hover:bg-techknot-purple"
                onClick={() => handleLessonClick(course.lessons[0])}
              >
                Start First Lesson
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t p-4 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-500">Instructor</div>
            <div className="font-medium">{course.instructor}</div>
          </div>
          
          <div className="flex items-center">
            <Button variant="outline" className="border-techknot-blue text-techknot-blue mr-2">
              Course Materials
            </Button>
            <Button className="bg-techknot-blue hover:bg-techknot-purple flex items-center gap-1">
              <Award size={16} />
              Get Certificate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
