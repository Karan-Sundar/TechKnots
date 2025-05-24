import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import emailjs from 'emailjs-com'; // Importing EmailJS

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send email using EmailJS
  const sendEmail = async (): Promise<boolean> => {
    try {
      const time = new Date().toLocaleString();
      const templateParams = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        time: time
      };

      await emailjs.send(
        'service_hivffqk', // Replace with your service ID
        'template_vuclgyg', // Replace with your template ID
        templateParams,
        'mzqFMrn3hwSfdM9ct' // Replace with your public key
      );

      return true;
    } catch (error) {
      console.error('EmailJS Error:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form validation error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await sendEmail();
      
      if (success) {
        setIsSubmitted(true);
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you soon.",
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { 
      icon: <Mail className="h-5 w-5" />, 
      title: "Email", 
      value: "info@techknots.com",
      link: "mailto:info@techknots.com"
    },
    { 
      icon: <Phone className="h-5 w-5" />, 
      title: "Phone", 
      value: "+91 98765 43210",
      link: "tel:+919876543210"
    },
    { 
      icon: <MapPin className="h-5 w-5" />, 
      title: "Location", 
      value: "Chennai, Tamil Nadu, India",
      link: "https://maps.google.com/?q=Chennai,Tamil+Nadu,India"
    }
  ];

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in <span className="text-gradient-tech">Touch</span></h2>
          <div className="w-24 h-1 bg-gradient-tech mx-auto mb-6"></div>
          <p className="max-w-3xl mx-auto text-gray-700">
            Contact us for more information about our programs, workshops, or to discuss collaboration opportunities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold">Contact Information</h3>
            <p className="text-gray-700">
              Reach out to us for any inquiries about our courses, workshops, or to discuss how we can help your institution.
            </p>
            
            <div className="space-y-4 mt-8">
              {contactInfo.map((item, index) => (
                <a 
                  key={index}
                  href={item.link}
                  target={item.title === "Location" ? "_blank" : undefined}
                  rel={item.title === "Location" ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-techknot-blue transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-techknot-blue/10 text-techknot-blue flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{item.title}</p>
                    <p className="font-medium">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
            
            <div className="pt-6">
              <h4 className="font-bold mb-2">Connect with us</h4>
              <div className="flex gap-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-techknot-blue text-white flex items-center justify-center hover:bg-techknot-purple transition-colors"
                  aria-label="Facebook"
                >
                  F
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-techknot-blue text-white flex items-center justify-center hover:bg-techknot-purple transition-colors"
                  aria-label="Twitter"
                >
                  T
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-techknot-blue text-white flex items-center justify-center hover:bg-techknot-purple transition-colors"
                  aria-label="LinkedIn"
                >
                  L
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-techknot-blue text-white flex items-center justify-center hover:bg-techknot-purple transition-colors"
                  aria-label="Instagram"
                >
                  I
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              
            
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-gray-600 mb-6">Thank you for contacting us. We'll get back to you soon.</p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-techknot-blue hover:bg-techknot-purple"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Enter subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={errors.subject ? "border-red-500" : ""}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                    )}
                  </div>

                  <div className="space-y-2 mt-4">
                    <label htmlFor="message" className="text-sm font-medium">Your Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Type your message here"
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="mt-6 w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
