import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones, Globe, Users, Briefcase, Shield } from "lucide-react";
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "info@oponmeta.com",
      available: "24/7 response within 2 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team",
      contact: "+234 (0) 800 LEARN (53276)",
      available: "Mon-Fri, 8AM-6PM WAT"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with us instantly",
      contact: "Available on our website",
      available: "Mon-Fri, 9AM-5PM WAT"
    },
    {
      icon: Headphones,
      title: "Video Support",
      description: "Screen sharing assistance",
      contact: "Schedule a call",
      available: "By appointment"
    }
  ];

  const emailContacts = [
    {
      icon: Mail,
      title: "General Inquiries",
      description: "Questions about our platform and services",
      email: "info@oponmeta.com",
      color: "text-blue-400"
    },
    {
      icon: Headphones,
      title: "Customer Service",
      description: "Technical support and account assistance",
      email: "info@oponmeta.com",
      color: "text-green-400"
    },
    {
      icon: Users,
      title: "Partnerships",
      description: "Business collaborations and partnerships",
      email: "info@oponmeta.com",
      color: "text-purple-400"
    },
    {
      icon: Briefcase,
      title: "Career Opportunities",
      description: "Job inquiries and career information",
      email: "info@oponmeta.com",
      color: "text-orange-400"
    },
    {
      icon: Shield,
      title: "Administrative",
      description: "Internal management and administrative matters",
      email: "info@oponmeta.com",
      color: "text-red-400"
    }
  ];

  const offices = [
    {
      city: "Lagos",
      country: "Nigeria",
      address: "Victoria Island Business District, Lagos, Nigeria",
      description: "West Africa Regional Hub"
    },
    {
      city: "Cape Town",
      country: "South Africa",
      address: "V&A Waterfront, Cape Town, South Africa",
      description: "Southern Africa Operations"
    },
    {
      city: "Nairobi",
      country: "Kenya",
      address: "Westlands Business District, Nairobi, Kenya",
      description: "East Africa Regional Office"
    },
    {
      city: "Accra",
      country: "Ghana",
      address: "Airport City, Accra, Ghana",
      description: "Partnership Development Center"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLiveChat = () => {
    toast.info('Live chat feature would be implemented here');
  };

  const handleCallback = () => {
    toast.info('Callback request feature would be implemented here');
  };

  const handleFAQ = () => {
    toast.info('FAQ section would be implemented here');
  };

  return (
    <div className="min-h-screen bg-[#0a1834]">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-yellow-400">
            We're here to support your success. Reach out anytime with questions, feedback, or partnership ideas from anywhere in the world.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Website and General Contact Info */}
        <div className="mb-12">
          <Card className="bg-[#11204a] border-[#16203a]">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <Globe className="h-8 w-8 text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Visit Our Website</h2>
              </div>
              <p className="text-yellow-400 mb-4">Explore our platform and discover all we have to offer</p>
              <span className="text-2xl font-bold text-yellow-400">
                oponmeta.com
              </span>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-[#11204a] border-[#16203a]">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                <p className="text-yellow-400 mb-4">We respond promptly to all inquiries.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white">First Name</Label>
                      <Input 
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-2 bg-white/10 border-white/20 text-white placeholder-gray-300"
                        placeholder="First Name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white">Last Name</Label>
                      <Input 
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-2 bg-white/10 border-white/20 text-white placeholder-gray-300"
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white">Email Address</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-2 bg-white/10 border-white/20 text-white placeholder-gray-300"
                      placeholder="Email Address"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-white">Subject</Label>
                    <Input 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="mt-2 bg-white/10 border-white/20 text-white placeholder-gray-300"
                      placeholder="Subject of your inquiry"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="mt-2 bg-white/10 border-white/20 text-white placeholder-gray-300 min-h-[120px]"
                      placeholder="Please provide details about your request or feedback."
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    size="lg" 
                    disabled={isSubmitting}
                    className="w-full bg-white text-purple-900 hover:bg-gray-100 disabled:bg-gray-400"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-purple-900 border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Contact Methods</h3>
                <p className="text-yellow-400 mb-4">Choose the best way to reach our global support team.</p>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <method.icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{method.title}</h4>
                        <p className="text-yellow-400 text-sm">{method.description}</p>
                        <p className="text-yellow-400 text-sm font-medium">{method.contact}</p>
                        <p className="text-yellow-400 text-xs">{method.available}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-6">Quick Support</h3>
                <p className="text-yellow-400 mb-4">Need help fast? Try our live chat or request a callback.</p>
                <div className="space-y-3">
                  <Button 
                    size="sm" 
                    onClick={handleLiveChat}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Live Chat
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleCallback}
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Request Callback
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Email Contact Directory */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Email Directory</h2>
            <p className="text-xl text-yellow-400">
              Contact the right team for your specific needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emailContacts.map((contact, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <contact.icon className={`h-5 w-5 ${contact.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{contact.title}</h3>
                      <p className="text-yellow-400 text-sm">{contact.description}</p>
                    </div>
                  </div>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-yellow-400 hover:text-white font-medium transition-colors duration-300"
                  >
                    {contact.email}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Office Locations */}
        <section className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Offices</h2>
            <p className="text-xl text-yellow-400">
              Visit us at any of our regional offices or connect with us online from anywhere
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {office.city}, {office.country}
                  </h3>
                  <p className="text-yellow-400 text-sm mb-3">{office.description}</p>
                  <p className="text-yellow-400 text-xs">{office.address}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-yellow-400 mb-6">
                Find answers to common questions in our FAQ section
              </p>
              <Button 
                onClick={handleFAQ}
                className="bg-white text-purple-900 hover:bg-gray-100"
              >
                View FAQ
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;
