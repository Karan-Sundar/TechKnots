'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const backgroundImages = [
  'header.jpg',
  'header2.jpg',
  'header3.jpg',
  'header4.jpg',
  'header5.jpg',
];

const sideCarouselImages = [
  'header.jpg',
  'det1.jpg',
  'det2.jpg',
  'det3.jpg',
  'det4.jpg',
  'det5.jpg'

];

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">

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

      {/* Optional White Overlay for Clarity */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/40 backdrop-blur-2xl z-10" />

      {/* Decorative Blur Circles */}
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
                    'Tying the knot between theory and practice',
                    'Empowering engineers with real-world skills',
                    'Building the bridge between knowledge and experience'
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
              TechKnots provides hands-on engineering training from beginner to advanced levels, empowering students with real-world skills and industry expertise.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <Button size="lg" className="bg-gradient-tech hover:opacity-90 transition-opacity shadow-md">
                Explore Programs <ArrowRight size={16} className="ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-techknot-blue text-techknot-blue hover:bg-techknot-blue/10 shadow-md"
              >
                Contact Us
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
              <div className="flex -space-x-3">
                <div className="w-9 h-9 rounded-full bg-techknot-blue flex items-center justify-center text-white text-xs">4+</div>
                <div className="w-9 h-9 rounded-full bg-techknot-purple flex items-center justify-center text-white text-xs">U</div>
                <div className="w-9 h-9 rounded-full bg-techknot-lightblue flex items-center justify-center text-white text-xs">I</div>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">4+ years</span> of expertise with universities & IEEE
              </p>
            </div>
          </div>

          {/* Side Image Carousel */}
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
                    alt={`Detail Slide ${i + 1}`}
                    className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] object-cover rounded-xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
