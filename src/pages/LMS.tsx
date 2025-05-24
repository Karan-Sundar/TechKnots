import { useState } from 'react';
import RevealOnScroll from '@/components/RevealOnScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { BookOpen, Clock, Award, Users, CheckCircle, Filter, Video, Calendar, BookText, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VideoConference from '@/components/VideoConference';
import CourseViewer from '@/components/CourseViewer';

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  lessons: number;
  instructor: string;
  category: string;
  credits: number;
  image: string;
}

interface LiveSession {
  id: number;
  title: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  enrolled: number;
  status: 'upcoming' | 'live' | 'completed';
  image: string;
}

const LMS = () => {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCourse, setActiveCourse] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<'courses' | 'live' | 'course-viewer'>('courses');
  const [searchQuery, setSearchQuery] = useState('');

  // Updated courses with Techknots staff
  const courses = [
    {
      id: 1,
      title: 'IoT Fundamentals and Development',
      description: 'Learn the basics of IoT architecture, protocols, and device connectivity.',
      level: 'Beginner',
      duration: '15 hours',
      lessons: 12,
      instructor: 'Nixon',
      category: 'IoT',
      credits: 1,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    },
    {
      id: 2,
      title: 'PCB Designing and Fabrication',
      description: 'Master the art of PCB design, layout optimization, and fabrication techniques.',
      level: 'Intermediate',
      duration: '30 hours',
      lessons: 18,
      instructor: 'Abdul',
      category: 'Electronics',
      credits: 2,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    },
    {
      id: 3,
      title: 'Drone Technology using Image Processing',
      description: 'Build autonomous drones with advanced image processing capabilities.',
      level: 'Advanced',
      duration: '45 hours',
      lessons: 24,
      instructor: 'Annamalai',
      category: 'Robotics',
      credits: 3,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    },
    {
      id: 4,
      title: 'Blynk Mobile App Development',
      description: 'Create powerful IoT mobile applications using the Blynk platform and cloud computing.',
      level: 'Intermediate',
      duration: '30 hours',
      lessons: 15,
      instructor: 'Karan',
      category: 'Programming',
      credits: 2,
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    },
    {
      id: 5,
      title: 'Electric Vehicle and Their Advancements',
      description: 'Explore the world of electric vehicles, from basic principles to cutting-edge technologies.',
      level: 'Beginner',
      duration: '15 hours',
      lessons: 10,
      instructor: 'Nixon',
      category: 'Automotive',
      credits: 1,
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1',
    },
    {
      id: 6,
      title: 'Smart Home with Latest Sensor Modules',
      description: 'Build integrated smart home systems using advanced sensors and control mechanisms.',
      level: 'Intermediate',
      duration: '30 hours',
      lessons: 16,
      instructor: 'Reshi',
      category: 'IoT',
      credits: 2,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    },
    {
      id: 7,
      title: 'Deep Learning and NLP Applications',
      description: 'Learn advanced deep learning techniques for natural language processing applications.',
      level: 'Advanced',
      duration: '40 hours',
      lessons: 20,
      instructor: 'Annamalai',
      category: 'AI',
      credits: 3,
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f',
    },
    {
      id: 8,
      title: 'TinkerCAD for Beginners',
      description: 'Master the basics of 3D design and modeling using TinkerCAD.',
      level: 'Beginner',
      duration: '12 hours',
      lessons: 8,
      instructor: 'Reshi',
      category: 'Design',
      credits: 1,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22731cc25d',
    },
    {
      id: 9,
      title: 'Digital Electronics Fundamentals',
      description: 'Understand the principles of digital electronics, logic gates, and circuit design.',
      level: 'Intermediate',
      duration: '25 hours',
      lessons: 15,
      instructor: 'Abdul',
      category: 'Electronics',
      credits: 2,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    },
  ];

  const liveSessions: LiveSession[] = [
    {
      id: 1,
      title: 'Introduction to Arduino Programming',
      instructor: 'Nixon',
      date: '2025-05-15',
      time: '10:00 AM',
      duration: '1.5 hours',
      enrolled: 45,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    },
    {
      id: 2,
      title: 'PCB Design Workshop',
      instructor: 'Abdul',
      date: '2025-05-12',
      time: '2:00 PM',
      duration: '2 hours',
      enrolled: 32,
      status: 'live',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    },
    {
      id: 3,
      title: 'AI Agent Development',
      instructor: 'Reshi',
      date: '2025-05-20',
      time: '11:00 AM',
      duration: '1.5 hours',
      enrolled: 28,
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    },
    {
      id: 4,
      title: 'Smart Home Automation',
      instructor: 'Reshi',
      date: '2025-05-12',
      time: '3:00 PM',
      duration: '1 hour',
      status: 'live',
      enrolled: 50,
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
    },
    {
      id: 5,
      title: 'PC Building and Troubleshooting',
      instructor: 'Annamalai',
      date: '2025-05-18',
      time: '4:00 PM',
      duration: '2 hours',
      status: 'upcoming',
      enrolled: 35,
      image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086',
    },
    {
      id: 6,
      title: 'Software Stack Workshop',
      instructor: 'Karan',
      date: '2025-05-13',
      time: '1:00 PM',
      duration: '2.5 hours',
      status: 'upcoming',
      enrolled: 40,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    },
    {
      id: 6,
      title: 'Software Stack Workshop',
      instructor: 'Karan',
      date: '2025-05-13',
      time: '1:00 PM',
      duration: '2.5 hours',
      status: 'upcoming',
      enrolled: 40,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    },
    {
      id: 6,
      title: 'Software Stack Workshop',
      instructor: 'Karan',
      date: '2025-05-13',
      time: '1:00 PM',
      duration: '2.5 hours',
      status: 'upcoming',
      enrolled: 40,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    },
    {
      id: 6,
      title: 'Software Stack Workshop',
      instructor: 'Karan',
      date: '2025-05-13',
      time: '1:00 PM',
      duration: '2.5 hours',
      status: 'upcoming',
      enrolled: 40,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    }
  ];

  // Updated categories to match the new course offerings
  const categories = ['All', 'IoT', 'Electronics', 'Robotics', 'Programming', 'Automotive', 'AI', 'Design'];
  
  const filteredCourses = activeCategory === 'All' 
    ? courses 
    : courses.filter(course => course.category === activeCategory);
  
  const searchedCourses = searchQuery 
    ? filteredCourses.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredCourses;

  const handleEnrollCourse = (course: Course) => {
    toast({
      title: "Enrollment successful!",
      description: `You've been enrolled in ${course.title}. Start learning now!`,
    });
  };

  const handleJoinLiveSession = (session: LiveSession) => {
    if (session.status === 'live') {
      setActiveView('live');
      toast({
        title: "Joining live session",
        description: `Connecting to ${session.title} with ${session.instructor}`,
      });
    } else {
      toast({
        title: "Session not available",
        description: session.status === 'upcoming' 
          ? `This session will start on ${session.date} at ${session.time}`
          : "This session has ended",
        variant: "destructive"
      });
    }
  };

  const viewCourse = (courseId: number) => {
    setActiveCourse(courseId);
    setActiveView('course-viewer');
  };

  const backToCourses = () => {
    setActiveCourse(null);
    setActiveView('courses');
  };

  if (activeView === 'live') {
    return (
      <>
        <Navbar />
        
        <div className="pt-24 bg-techknot-ivory min-h-screen">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setActiveView('courses')}
                className="border-techknot-blue text-techknot-blue hover:bg-techknot-blue hover:text-white"
              >
                Back to Courses
              </Button>
            </div>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-techknot-purple mb-4">Live Session</h2>
            </div>
            
            <VideoConference />
          </div>
        </div>
        
        <Footer />
        <ScrollToTop />
      </>
    );
  }

  if (activeView === 'course-viewer' && activeCourse !== null) {
    return (
      <>
        <Navbar />
        
        <div className="pt-24 bg-techknot-ivory min-h-screen">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={backToCourses}
                className="border-techknot-blue text-techknot-blue hover:bg-techknot-blue hover:text-white"
              >
                Back to Courses
              </Button>
            </div>
            
            <CourseViewer courseId={activeCourse.toString()} />
          </div>
        </div>
        
        <Footer />
        <ScrollToTop />
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      <div className="pt-24 bg-techknot-ivory min-h-screen">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-techknot-purple mb-4">Learning Management Portal</h1>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Access our comprehensive courses designed to bridge the gap between theory and practical 
                implementation in engineering education.
              </p>
            </div>
          </RevealOnScroll>

          <Tabs defaultValue="courses" className="mb-10">
            <TabsList className="bg-gray-100 p-1 mb-8">
              <TabsTrigger value="courses" className="data-[state=active]:bg-techknot-blue data-[state=active]:text-white">
                <BookOpen size={16} className="mr-2" /> Courses
              </TabsTrigger>
              <TabsTrigger value="live-sessions" className="data-[state=active]:bg-techknot-blue data-[state=active]:text-white">
                <Video size={16} className="mr-2" /> Live Sessions
              </TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-techknot-blue data-[state=active]:text-white">
                <Calendar size={16} className="mr-2" /> Schedule
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-techknot-blue data-[state=active]:text-white">
                <BookText size={16} className="mr-2" /> Resources
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses" className="focus:outline-none">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                  <div className="flex items-center">
                    <Filter size={20} className="text-techknot-purple mr-2" />
                    <h3 className="text-lg font-semibold">Filter Courses:</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <Button
                        key={category}
                        variant={activeCategory === category ? "default" : "outline"}
                        className={activeCategory === category ? "bg-techknot-blue" : "border-techknot-blue text-techknot-blue"}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="w-full max-w-md mx-auto mb-8">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search courses by title, instructor, or keywords..."
                      className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-techknot-blue"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {searchedCourses.map((course, index) => (
                  <RevealOnScroll key={course.id} delay={index * 100}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all border border-gray-100">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-medium px-2 py-1 bg-techknot-lightpurple/20 text-techknot-purple rounded-full">
                            {course.category}
                          </span>
                          <span className="flex items-center text-xs text-gray-500">
                            <Award size={14} className="mr-1" /> {course.credits} {course.credits === 1 ? 'Credit' : 'Credits'}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{course.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>
                        
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock size={14} className="mr-1 text-techknot-blue" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <BookOpen size={14} className="mr-1 text-techknot-blue" />
                            <span>{course.lessons} Lessons</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Users size={14} className="mr-1 text-techknot-blue" />
                            <span>{course.level}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <CheckCircle size={14} className="mr-1 text-techknot-blue" />
                            <span>Certificate</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                          <span className="text-sm font-medium text-gray-700">Instructor: {course.instructor}</span>
                          <div className="space-x-2">
                            <Button 
                              variant="outline" 
                              className="border-techknot-blue text-techknot-blue hover:bg-techknot-blue hover:text-white"
                              onClick={() => viewCourse(course.id)}
                            >
                              View Course
                            </Button>
                            <Button 
                              className="bg-techknot-blue hover:bg-techknot-purple"
                              onClick={() => handleEnrollCourse(course)}
                            >
                              Enroll Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>

              {searchedCourses.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">No courses found for this category.</p>
                </div>
              )}

              {searchedCourses.length > 0 && (
                <div className="text-center pb-12">
                  <Button className="bg-techknot-blue hover:bg-techknot-purple">
                    Load More Courses
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="live-sessions" className="focus:outline-none">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-techknot-purple mb-6">Live Sessions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveSessions.map((session) => (
                    <RevealOnScroll key={session.id}>
                      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                        <div className="h-40 overflow-hidden relative">
                          <img 
                            src={session.image} 
                            alt={session.title}
                            className="w-full h-full object-cover"
                          />
                          <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-medium text-white ${
                            session.status === 'live' 
                              ? 'bg-green-500' 
                              : session.status === 'upcoming' 
                                ? 'bg-blue-500' 
                                : 'bg-gray-500'
                          }`}>
                            {session.status === 'live' ? 'LIVE NOW' : session.status === 'upcoming' ? 'UPCOMING' : 'COMPLETED'}
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-bold text-lg mb-1">{session.title}</h3>
                          <div className="text-sm text-gray-600 mb-3">
                            <p>Instructor: {session.instructor}</p>
                            <p className="flex items-center mt-1">
                              <Calendar size={14} className="mr-1" /> {session.date}, {session.time}
                            </p>
                            <p className="flex items-center mt-1">
                              <Clock size={14} className="mr-1" /> {session.duration}
                            </p>
                            <p className="flex items-center mt-1">
                              <Users size={14} className="mr-1" /> {session.enrolled} enrolled
                            </p>
                          </div>
                          
                          <div className="pt-3 border-t border-gray-100">
                            <Button 
                              className={`w-full ${
                                session.status === 'live' 
                                  ? 'bg-green-500 hover:bg-green-600' 
                                  : session.status === 'upcoming' 
                                    ? 'bg-blue-500 hover:bg-blue-600' 
                                    : 'bg-gray-500 hover:bg-gray-600'
                              }`}
                              onClick={() => handleJoinLiveSession(session)}
                              disabled={session.status === 'completed'}
                            >
                              {session.status === 'live' 
                                ? 'Join Now' 
                                : session.status === 'upcoming' 
                                  ? 'Set Reminder' 
                                  : 'Session Ended'
                              }
                            </Button>
                          </div>
                        </div>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="schedule" className="focus:outline-none">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-techknot-purple mb-6">Course Schedule</h2>
                <p className="text-gray-600 mb-4">View your upcoming course schedules and live sessions.</p>
                
                <div className="border rounded-lg overflow-hidden mb-6">
                  <div className="grid grid-cols-7 bg-gray-100 font-medium text-center">
                    <div className="p-2 border-r">Sun</div>
                    <div className="p-2 border-r">Mon</div>
                    <div className="p-2 border-r">Tue</div>
                    <div className="p-2 border-r">Wed</div>
                    <div className="p-2 border-r">Thu</div>
                    <div className="p-2 border-r">Fri</div>
                    <div className="p-2">Sat</div>
                  </div>
                  
                  <div className="grid grid-cols-7 text-center h-96">
                    {Array(35).fill(0).map((_, idx) => {
                      const hasEvent = idx === 8 || idx === 9 || idx === 16 || idx === 10 || idx === 18;
                      return (
                        <div key={idx} className={`p-2 border-t border-r ${idx % 7 === 6 ? '' : 'border-r'} min-h-[80px] relative`}>
                          <span className="text-sm text-gray-500">{idx + 1}</span>
                          {hasEvent && (
                            <div className={`absolute bottom-1 left-1 right-1 rounded p-1 text-xs ${
                              idx === 8 
                                ? 'bg-green-100 text-green-800' 
                                : idx === 9 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : idx === 16
                                    ? 'bg-purple-100 text-purple-800'
                                    : idx === 10
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-pink-100 text-pink-800'
                            }`}>
                              {idx === 8 ? 'PCB Design Workshop' : 
                               idx === 9 ? 'Smart Home Automation' : 
                               idx === 16 ? 'AI Agent Development' :
                               idx === 10 ? 'Software Stack Workshop' :
                               'PC Building Workshop'}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <Button className="bg-techknot-blue hover:bg-techknot-purple">
                  Add to Calendar
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="focus:outline-none">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold text-techknot-purple mb-6">Course Resources</h2>
                <p className="text-gray-600 mb-6">Download course materials, slides, and additional resources.</p>
                
                <div className="space-y-4">
                  {[
                    { title: 'IoT Fundamentals Workbook', type: 'PDF', size: '2.5 MB' },
                    { title: 'Arduino Code Examples', type: 'ZIP', size: '1.8 MB' },
                    { title: 'PCB Design Templates', type: 'ZIP', size: '5.2 MB' },
                    { title: 'Sensor Datasheets Collection', type: 'PDF', size: '3.7 MB' },
                    { title: 'Deep Learning Models', type: 'ZIP', size: '8.4 MB' },
                    { title: 'TinkerCAD Project Files', type: 'ZIP', size: '2.3 MB' },
                    { title: 'AI Development Guide', type: 'PDF', size: '4.2 MB' }
                  ].map((resource, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50">
                      <div>
                        <h3 className="font-medium">{resource.title}</h3>
                        <p className="text-sm text-gray-500">{resource.type} • {resource.size}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="border-techknot-blue text-techknot-blue hover:bg-techknot-blue hover:text-white"
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default LMS;