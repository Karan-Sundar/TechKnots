import { Award, Layers, Lightbulb, ShieldCheck, Cpu, RadioTower } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const achievements = [
  {
    icon: <Cpu className="w-6 h-6 text-techknot-blue" />,
    title: 'Smart Solutions',
    description: 'Delivering intelligent home automation systems'
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-techknot-purple" />,
    title: 'Secure by Design',
    description: 'Prioritizing data security & encrypted communication'
  },
  {
    icon: <RadioTower className="w-6 h-6 text-techknot-blue" />,
    title: 'IoT Connected',
    description: 'Integrating multiple smart devices seamlessly'
  },
  {
    icon: <Layers className="w-6 h-6 text-techknot-purple" />,
    title: 'Modular Design',
    description: 'Flexible systems that adapt to any environment'
  },
];

const videoPlaylist = [
  {
    title: 'Smart Home Tour',
    videoSrc: 'smart_home_tour.mp4',
    thumbnail: 'smart_home_thumb.png',
    description: 'Experience a walkthrough of our flagship smart home project.'
  },
  {
    title: 'Energy Automation System',
    videoSrc: 'energy_automation.mp4',
    thumbnail: 'energy_thumb.png',
    description: 'How our tech helps manage and optimize home energy consumption.'
  },
  {
    title: 'Security Integration',
    videoSrc: 'security.mp4',
    thumbnail: 'security_thumb.png',
    description: 'Learn how TechKnots ensures 24/7 monitoring and safety.'
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
            TechKnots is redefining modern living by developing intelligent automation systems,
            connected IoT devices, and scalable energy solutions. Our mission is to build smarter
            and safer spaces powered by next-gen technology.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          <h3 className="text-2xl font-bold">Explore Our Innovations</h3>
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

        <div className="grid md:grid-cols-2 gap-10 items-center mt-16">
          <div className="space-y-6">
            <p className="text-gray-700 animate-fade-in">
              Our mission is to deliver seamless automation experiences that transform ordinary
              homes into intelligent environments. From smart lighting and energy monitoring to
              real-time remote access and home security, TechKnots brings futuristic living into
              reality.
            </p>
            <p className="text-gray-700 animate-fade-in">
              We collaborate with industry experts to ensure every product we develop is secure,
              scalable, and user-friendly. With a modular approach, our systems are adaptable to
              various living spaces — whether it's a smart apartment or an enterprise building.
            </p>
            <div className="p-4 bg-white rounded-lg shadow-md border-l-4 border-techknot-purple animate-fade-in">
              <p className="italic text-gray-700">
                "TechKnots isn't just about technology — it's about smarter, safer, and more sustainable living."
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
