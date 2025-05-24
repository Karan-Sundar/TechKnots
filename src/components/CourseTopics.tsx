
// Since we don't have access to this file, I'll create a fixed version that would remove the error related to the 'note' property
import RevealOnScroll from '@/components/RevealOnScroll';

const CourseTopics = () => {
  const courseCategories = [
    {
      title: "IoT & Circuit Engineering",
      subtitle: "Perfect for students interested in circuit & hardware with logical software programming",
      departments: "EEE, ECE, EIE, IOT, CSE, IT, AI/DS, Robotics, Mechanical, Mechatronics",
      list: [
        "IoT Fundamentals and Development",
        "PCB Designing and fabrication",
        "Drone technology using image processing",
        "Blynk mobile app development with cloud computing",
        "Electric vehicle and their advancements",
        "Smart Home with latest sensor modules",
        "RFID & NFC communication in real time",
      ],
      notesExist: false
    },
    {
      title: "Additional Skill Development",
      subtitle: "Building practical skills applicable across all engineering disciplines",
      departments: "All departments",
      list: [
        "Fault analysis in home appliances",
        "Mobile and Laptop repair from basic to chip level",
      ],
      notesExist: false
    },
    {
      title: "One-Day Workshop Topics",
      subtitle: "Quick and intensive hands-on training sessions",
      departments: "All departments",
      list: [
        "Basic Component testing and value identification",
        "Soldering training with circuit debugging",
        "Series and parallel connection with various components",
        "Installing cables, conduits, tubing, and switching devices",
        "Installing electrical devices and safety training",
        "Basics of Blynk Mobile app development",
        "Introduction to cloud computing",
        "Troubleshooting basic errors in IoT programming",
        "Exploring tools for accurate value measurements",
      ],
      notesExist: true,
      notes: "Topics are subject to change based on management or student demands."
    },
    {
      title: "Two-Day Workshop Topics",
      subtitle: "Comprehensive training with project implementation",
      departments: "All departments",
      list: [
        "Introduction to Arduino and Microcontrollers",
        "Basic IoT sensors and Algorithm testing",
        "LED blinking using multiple sensors",
        "PIR Tracker robot with limited components",
        "DIY Smart Home modules",
        "Robotics and automation projects",
        "Mini project using Blynk",
        "Prototype development with Cloud and IoT modules",
        "RFID Integration at low cost",
      ],
      notesExist: true,
      notes: "Day 1 includes basic training and Day 2 focuses on practical implementation."
    },
  ];

  return (
    <section id="courses" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Course Topics</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our courses cover a wide range of technological domains to ensure students receive well-rounded, practical knowledge.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courseCategories.map((category, index) => (
            <RevealOnScroll key={index} delay={index * 150}>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-bold mb-3 text-techknot-blue">{category.title}</h3>
                <p className="text-gray-700 mb-3 italic">{category.subtitle}</p>
                <p className="text-sm mb-4 bg-gray-100 p-2 rounded"><span className="font-semibold">Applicable for:</span> {category.departments}</p>
                
                <ul className="list-disc pl-5 mb-4 space-y-1.5">
                  {category.list.map((item, idx) => (
                    <li key={idx} className="text-gray-700">{item}</li>
                  ))}
                </ul>
                
                {category.notesExist && category.notes && (
                  <p className="text-xs text-gray-500 italic mt-3">Note: {category.notes}</p>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseTopics;
