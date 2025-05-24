import { Award, BookOpen, Users, GraduationCap, Presentation, Hammer } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const achievements = [
  {
    icon: <Users className="w-6 h-6 text-techknot-blue" />,
    title: '4+ Years',
    description: 'Leading workshops and training programs'
  },
  {
    icon: <Award className="w-6 h-6 text-techknot-purple" />,
    title: 'Industry Experts',
    description: 'Professional trainers with teaching excellence'
  },
  {
    icon: <BookOpen className="w-6 h-6 text-techknot-blue" />,
    title: 'Real Projects',
    description: 'Electric vehicles, IoT smart home, mobile apps'
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-techknot-purple" />,
    title: 'IEEE Collaboration',
    description: 'Organizing seminars, workshops, and events'
  },
];

// Playlist with video data
const videoPlaylist = [
  {
    title: 'IoT Smart Home Workshop',
    videoSrc: 'iot_solar.mp4',
    thumbnail: 'iot_thumb.png',
    description: 'An in-depth workshop on IoT for smart homes.'
  },
  {
    title: 'Digital Electronics Workshop',
    videoSrc: 'de.mp4',
    thumbnail: 'de_thumb.png',
    description: 'Watch students build a flip-flop circuit in this workshop.'
  },
  {
    title: 'Robotics Workshop',
    videoSrc: 'robotics.mp4',
    thumbnail: 'robotics_thumb.png',
    description: 'A hands-on workshop on robotics and automation.'
    
  },
];

const About = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const openModal = (videoSrc: string) => {
    setCurrentVideo(videoSrc);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentVideo(null);
  };

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About <span className="text-gradient-tech">TechKnots</span></h2>
          <div className="w-24 h-1 bg-gradient-tech mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-700">
            TechKnots is a company that ties the knot between theory and practical syllabus
            in engineering. Our mission is to provide students with real-world engineering expertise
            that will benefit them in their future endeavors.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          <h3 className="text-2xl font-bold">Our Video Playlist</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoPlaylist.map((video, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => openModal(video.videoSrc)}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="rounded-t-xl w-full"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold">{video.title}</h4>
                  <p className="text-gray-600 text-sm">{video.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-4 max-w-3xl w-full relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>
              <video controls className="w-full h-80 rounded" autoPlay>
                <source src={currentVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}

        {/* Achievements Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center mt-16">
          <div className="space-y-6">
            <p className="text-gray-700 animate-fade-in">
              From beginner to advanced levels, we provide real-time, hands-on
              training for students. More than four years of expertise leading workshops and
              project trainings for large universities, as well as working with IEEE to organize
              seminars, workshops, hands-on training, and other events.
            </p>
            <p className="text-gray-700 animate-fade-in">
              Our achievements include training students to create real-time projects on electric vehicles, 
              IoT smart home, easy shopping cart mobile app and many more. We provide industry
              trainers who are also good communicators with students, motivating them to keep
              pushing forward in their careers.
            </p>
            <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-techknot-purple animate-fade-in">
              <p className="italic text-gray-700">
                "The outcome of our training is not only certification, but also the amount of skills 
                developed by each student that participates."
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {achievements.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow animate-fade-in"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
