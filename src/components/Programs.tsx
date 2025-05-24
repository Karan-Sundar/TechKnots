
import { Clock, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Programs = () => {
  const programsData = [
    {
      title: "Hands-On Training",
      description: "Trained professionals provide comprehensive workshops and hands-on training sessions from fundamentals to advanced level.",
      details: [
        "Gain immense knowledge on both theory and practical fields",
        "One-day training sessions available",
        "Two-days training with mini projects",
        "Focus on deeper understanding of subject matter"
      ],
      icon: <Clock className="w-6 h-6" />,
      color: "bg-techknot-blue/10 text-techknot-blue"
    },
    {
      title: "Value Added Courses",
      description: "Courses designed to offer students the required skills to raise their employability quotient and equip them with necessary abilities.",
      details: [
        "1 credit (15 hours) courses",
        "2 credit (30 hours) courses",
        "3 credit (45 hours) courses",
        "Based on specific requirements"
      ],
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-techknot-purple/10 text-techknot-purple"
    },
    {
      title: "Final Year Project Training",
      description: "Help students develop ideas into reality with necessary industrial exposure and components for their final year projects.",
      details: [
        "Step-by-step guidance for project development",
        "Component identification and sourcing",
        "Quality testing and project evaluation",
        "Journal publication assistance"
      ],
      icon: <Award className="w-6 h-6" />,
      color: "bg-techknot-lightblue/10 text-techknot-lightblue"
    }
  ];

  return (
    <section id="programs" className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-gradient-tech">Programs</span></h2>
          <div className="w-24 h-1 bg-gradient-tech mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-700">
            We offer a variety of programs designed to enhance students' technical skills and provide them with practical experience
            that will help them excel in their careers.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programsData.map((program, index) => (
            <Card key={index} className="border-t-4 border-t-techknot-blue hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 rounded-full ${program.color} flex items-center justify-center mb-4`}>
                  {program.icon}
                </div>
                <CardTitle className="text-xl font-bold">{program.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {program.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {program.details.map((detail, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-techknot-purple"></div>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-techknot-blue text-techknot-blue hover:bg-techknot-blue/10">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
