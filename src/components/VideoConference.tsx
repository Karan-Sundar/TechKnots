
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Video, VideoOff, Mic, MicOff, UserPlus, Monitor, MessageSquare, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import RevealOnScroll from './RevealOnScroll';

interface Participant {
  id: string;
  name: string;
  isVideoOn: boolean;
  isAudioOn: boolean;
  isScreenSharing: boolean;
}

const VideoConference = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{from: string; message: string; time: string}[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'Dr. Ramesh Kumar', isVideoOn: true, isAudioOn: true, isScreenSharing: false },
    { id: '2', name: 'Priya Singh', isVideoOn: true, isAudioOn: false, isScreenSharing: false },
    { id: '3', name: 'Arjun Patel', isVideoOn: false, isAudioOn: true, isScreenSharing: false },
  ]);

  useEffect(() => {
    if (isJoined && isVideoOn && localVideoRef.current) {
      // In a real implementation, this would use WebRTC to get the user's camera
      // For this demo, we'll just show a placeholder
      navigator.mediaDevices.getUserMedia({ video: true, audio: isAudioOn })
        .then(stream => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch(err => {
          console.error("Error accessing media devices:", err);
          toast({
            title: "Camera access failed",
            description: "Please check your camera permissions and try again.",
            variant: "destructive"
          });
          setIsVideoOn(false);
        });
    }
  }, [isJoined, isVideoOn, isAudioOn]);

  const joinMeeting = () => {
    if (!roomName || !userName) {
      toast({
        title: "Missing information",
        description: "Please enter both room name and your name.",
        variant: "destructive"
      });
      return;
    }
    
    setIsJoined(true);
    toast({
      title: "Meeting joined!",
      description: `You've joined ${roomName} as ${userName}`,
    });
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (!isVideoOn) {
      toast({
        title: "Video turned on",
        description: "Other participants can now see you.",
      });
    }
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    if (!isAudioOn) {
      toast({
        title: "Microphone turned on",
        description: "Other participants can now hear you.",
      });
    }
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    if (!isScreenSharing) {
      toast({
        title: "Screen sharing started",
        description: "You are now sharing your screen with other participants.",
      });
    } else {
      toast({
        title: "Screen sharing stopped",
        description: "You are no longer sharing your screen.",
      });
    }
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage = {
      from: userName || 'You',
      message: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  if (!isJoined) {
    return (
      <RevealOnScroll>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Join Video Session</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="roomName" className="block text-sm font-medium mb-1">Room Name</label>
              <input
                id="roomName"
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-techknot-blue focus:border-transparent"
                placeholder="Enter room name"
              />
            </div>
            <div>
              <label htmlFor="userName" className="block text-sm font-medium mb-1">Your Name</label>
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-techknot-blue focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>
            <Button 
              className="w-full bg-techknot-blue hover:bg-techknot-purple transition-colors"
              onClick={joinMeeting}
            >
              Join Meeting
            </Button>
          </div>
        </div>
      </RevealOnScroll>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-800 text-white flex items-center justify-between">
        <div className="flex items-center">
          <Video className="mr-2 text-techknot-blue" size={20} />
          <h2 className="font-semibold">{roomName || 'TechKnots Live Session'}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm bg-green-500 px-2 py-0.5 rounded-full">Live</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-white hover:bg-red-500 hover:text-white"
            onClick={() => {
              setIsJoined(false);
              toast({
                title: "Meeting left",
                description: "You've left the meeting.",
              });
            }}
          >
            Leave
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-100">
        <div className="md:col-span-2 space-y-4">
          <div className="relative w-full bg-black rounded-lg aspect-video overflow-hidden">
            {isVideoOn ? (
              <video 
                ref={localVideoRef}
                className="w-full h-full object-cover" 
                autoPlay 
                muted 
                playsInline
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center">
                  <span className="text-3xl text-white">{userName?.[0] || 'Y'}</span>
                </div>
              </div>
            )}
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-2 py-1 rounded-md">
              {userName} (You) {isScreenSharing && '- Sharing screen'}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {participants.map(participant => (
              <div key={participant.id} className="relative bg-black rounded-lg aspect-video overflow-hidden">
                {participant.isVideoOn ? (
                  <div className="w-full h-full bg-gray-800"></div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
                      <span className="text-xl text-white">{participant.name[0]}</span>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded-md text-sm">
                  {participant.name} {!participant.isAudioOn && <MicOff size={12} className="inline ml-1" />}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`bg-white border rounded-lg shadow overflow-hidden transition-all duration-300 ${isChatOpen ? 'block' : 'hidden md:block'}`}>
          <div className="p-3 border-b flex justify-between items-center">
            <h3 className="font-medium">Meeting Chat</h3>
            <button className="md:hidden" onClick={() => setIsChatOpen(false)}>
              <X size={18} />
            </button>
          </div>
          
          <div className="p-4 h-[300px] overflow-y-auto space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No messages yet. Start the conversation!
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`${msg.from === userName || msg.from === 'You' ? 'text-right' : ''}`}>
                  <div className={`inline-block max-w-[80%] px-3 py-2 rounded-lg ${msg.from === userName || msg.from === 'You' ? 'bg-techknot-blue text-white' : 'bg-gray-100'}`}>
                    <p className="text-sm font-medium">{msg.from}</p>
                    <p>{msg.message}</p>
                    <p className="text-xs opacity-70">{msg.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-3 border-t">
            <div className="flex">
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 p-2 border rounded-l-md focus:ring-2 focus:ring-techknot-blue focus:outline-none"
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <Button 
                className="rounded-l-none bg-techknot-blue hover:bg-techknot-purple"
                onClick={sendMessage}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-gray-800 flex items-center justify-center gap-4">
        <Button 
          variant={isAudioOn ? "default" : "outline"}
          className={`rounded-full p-3 ${isAudioOn ? 'bg-techknot-blue hover:bg-techknot-purple' : 'text-white border-white hover:bg-red-500 hover:text-white'}`}
          onClick={toggleAudio}
        >
          {isAudioOn ? <Mic size={20} /> : <MicOff size={20} />}
        </Button>
        <Button 
          variant={isVideoOn ? "default" : "outline"}
          className={`rounded-full p-3 ${isVideoOn ? 'bg-techknot-blue hover:bg-techknot-purple' : 'text-white border-white hover:bg-red-500 hover:text-white'}`}
          onClick={toggleVideo}
        >
          {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
        </Button>
        <Button 
          variant={isScreenSharing ? "default" : "outline"}
          className={`rounded-full p-3 ${isScreenSharing ? 'bg-techknot-blue hover:bg-techknot-purple' : 'text-white border-white hover:bg-gray-700'}`}
          onClick={toggleScreenShare}
        >
          <Monitor size={20} />
        </Button>
        <Button 
          variant="outline"
          className="rounded-full p-3 text-white border-white hover:bg-gray-700 md:hidden"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageSquare size={20} />
        </Button>
        <Button 
          variant="outline"
          className="rounded-full p-3 text-white border-white hover:bg-gray-700"
        >
          <UserPlus size={20} />
        </Button>
      </div>
    </div>
  );
};

export default VideoConference;
