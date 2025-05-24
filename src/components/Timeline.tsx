
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Timeline = () => {
  const timelineData = [
    {
      title: "15 Hours – 1 credit",
      color: "border-techknot-blue",
      steps: [
        "Course syllabus for 15+ hours shared with management and students",
        "Mini project is compulsory and guided by our trainers",
        "Project validation judged by management and TechKnots team",
        "Valid certification provided upon course completion"
      ]
    },
    {
      title: "30 Hours – 2 credits",
      color: "border-techknot-purple",
      steps: [
        "Course syllabus for 30+ hours shared with management and students",
        "Mini project is compulsory and guided by our trainers",
        "Students trained for paper presentation competition with their project",
        "Fun and educational competition with special recognition certificate",
        "Project validation and competition judged by management and TechKnots team"
      ]
    },
    {
      title: "45 Hours – 3 credits",
      color: "border-techknot-lightblue",
      steps: [
        "Course syllabus for 45+ hours shared with management and students",
        "Advanced level project is compulsory and guided by our trainers",
        "Students trained to present in project expo competition",
        "Fun and educational competition with special recognition certificate",
        "Project validation and competition judged by management and TechKnots team"
      ]
    }
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Course <span className="text-gradient-tech">Timeline</span></h2>
          <div className="w-24 h-1 bg-gradient-tech mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-700">
            Our Value Added Courses are structured into different credit options to accommodate various learning needs and schedules.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {timelineData.map((item, index) => (
            <Card key={index} className={`border-t-4 ${item.color} hover:shadow-lg transition-shadow`}>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-6">{item.title}</h3>
                <ul className="space-y-4">
                  {item.steps.map((step, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-3 mt-1">
                        <Check className="h-5 w-5 text-techknot-purple" />
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-bold mb-4 text-center">Course Structure Information</h3>
          <p className="text-gray-700 mb-4">
            A detailed course syllabus with content and time split up will be provided to the students based on the course structure.
            The course can be divided into hybrid sessions (online and offline) based on management demands and student convenience, 
            with no disruption to their academics.
          </p>
          <p className="text-gray-700">
            Each course requires students to complete practical assignments by the end of the course period for valid certification from TechKnots.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
