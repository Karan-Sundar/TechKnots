'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const backgroundImages = [
  'smart-switch.jpg',
  'iot-dashboard.jpg',
  'home-cam.jpg',
  'smart-home.jpg',
  'energy-control.jpg',
];

const sideCarouselImages = [
  'smart-switch.jpg',
  'iot-dashboard.jpg',
  'home-cam.jpg',
  'smart-home.jpg',
  'energy-control.jpg',
];

const productCategories = [
  'Smart Switches',
  'Energy Optimizers',
  'AI Devices',
];

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
      {/* Background Carousel */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="absolute inset-0 z-0 h-full w-full"
      >
        {backgroundImages.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={`Background Slide ${i + 1}`}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/40 backdrop-blur-2xl z-10" />

      {/* Decorative Circles */}
      <div className="absolute inset-0 z-20 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-techknot-blue/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 rounded-full bg-techknot-purple/10 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 z-30">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 bg-white/70 backdrop-blur-2xl rounded-2xl p-10 shadow-2xl border border-white/30">

          {/* Text Section */}
          <div className="lg:w-1/2 space-y-5 animate-fade-in text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-gray-900 drop-shadow">
              <span className="text-gradient-tech block">
                <Typewriter
                  words={[
                    'Innovating Smart Living Solutions',
                    'Pioneering Smart Home Automation',
                    'Connecting Homes to the Future',
                    'IoT-Powered Product Innovation'
                  ]}
                  loop
                  cursor
                  cursorStyle="|"
                  typeSpeed={60}
                  deleteSpeed={30}
                  delaySpeed={2000}
                />
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-700 max-w-xl mx-auto lg:mx-0">
              At TechKnots, we design cutting-edge smart home products and IoT solutions that enhance comfort, security, and efficiency — bringing the future of automation to your doorstep.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <Button size="lg" className="bg-gradient-tech hover:opacity-90 transition-opacity shadow-md">
                Explore Products <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-techknot-blue text-techknot-blue hover:bg-techknot-blue/10 shadow-md"
              >
                Get a Demo
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="flex -space-x-3">
                <div className="w-9 h-9 rounded-full bg-techknot-blue flex items-center justify-center text-white text-xs">AI</div>
                <div className="w-9 h-9 rounded-full bg-techknot-purple flex items-center justify-center text-white text-xs">IoT</div>
                <div className="w-9 h-9 rounded-full bg-techknot-lightblue flex items-center justify-center text-white text-xs">5G</div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Future-Ready</span> tech built for smart automation
              </p>
            </div>

            {/* Product Categories */}
            <div className="pt-6 flex flex-wrap justify-center lg:justify-start gap-3">
              {productCategories.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 text-sm bg-techknot-lightblue/20 text-techknot-blue rounded-full font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Side Product Carousel */}
          <div className="lg:w-1/2 w-full animate-fade-right flex justify-center">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop
              className="w-full max-w-md rounded-xl overflow-hidden shadow-lg"
            >
              {sideCarouselImages.map((src, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={src}
                    alt={`Product Slide ${i + 1}`}
                    className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover rounded-xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Live Demo CTA & Chatbot Button */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 text-center z-30">
          <Button className="bg-gradient-tech px-6 py-3 text-lg font-semibold shadow-lg hover:opacity-90">
            Watch Live Product Demo
          </Button>
          <Button className="bg-white text-techknot-blue border border-techknot-blue px-6 py-3 shadow-md hover:bg-techknot-blue/10">
            Talk to an Automation Expert
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
