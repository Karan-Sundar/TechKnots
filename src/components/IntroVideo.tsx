// components/IntroVideo.tsx
import { useEffect, useState } from 'react';

const IntroVideo = () => {
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(false);
    }, 5000); // Adjust to video length in ms

    return () => clearTimeout(timer);
  }, []);

  if (!showVideo) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <video
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default IntroVideo;
