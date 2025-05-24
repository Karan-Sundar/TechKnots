
import { Award, BookOpen, Briefcase, Calendar, GraduationCap } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Calendar className="h-6 w-6 text-white" />,
      title: "Workshops",
      description: "Engaging technical workshops led by industry experts"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      title: "Guest Lectures & Seminars",
      description: "Insights from industry professionals and academic experts"
    },
    {
      icon: <Award className="h-6 w-6 text-white" />,
      title: "Project Training",
      description: "Guided project development with competitions"
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-white" />,
      title: "Final Year Project Assistance",
      description: "Complete mentorship for final year projects"
    },
    {
      icon: <Briefcase className="h-6 w-6 text-white" />,
      title: "Entrepreneurial Support",
      description: "Funding and mentoring for entrepreneurial projects"
    }
  ];

  return (
    <section id="benefits" className="bg-gray-900 text-white section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional <span className="bg-gradient-to-r from-techknot-lightblue to-techknot-lightpurple bg-clip-text text-transparent">Benefits</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-techknot-lightblue to-techknot-lightpurple mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-300">
            Beyond our core programs, we provide these additional benefits based on MoU with educational institutions.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-techknot-blue to-techknot-purple rounded-full flex items-center justify-center mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 p-6 bg-gray-800 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-center">Our Commitment to Excellence</h3>
          <p className="text-gray-300 text-center">
            TechKnots' primary mission is to provide students with real-world engineering expertise that will benefit them in their future endeavours. 
            The outcome of our training is not only the certification, but also the amount of skills developed by each student that participates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
