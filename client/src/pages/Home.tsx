import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Users, Briefcase, Code2, Wrench, BarChart2, Lightbulb, Rocket, Globe, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Using mailto: protocol as in original HTML
    const subject = `Contact from ${formData.name}${formData.company ? ` (${formData.company})` : ''}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ACompany: ${formData.company}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = `mailto:alphaGroupOfDevelopers@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-blue-900">Alpha<span className="text-blue-600">Group</span></h1>
              <p className="text-sm text-gray-600">Developers</p>
            </div>
            <ul className="hidden md:flex space-x-8">
              <li><a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">Services</a></li>
              <li><a href="#projects" className="text-gray-700 hover:text-blue-600 transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="max-w-xl">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Building Digital Solutions for Ghana's Future
              </h1>
              <p className="text-xl text-gray-600 mb-10">
                We transform complex business challenges into elegant software solutions that drive growth and innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <a href="#contact">Get Started</a>
                </Button>
                <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <a href="#about">Learn More</a>
                </Button>
              </div>
            </div>
            {/* Hero Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-blue-100">
                <img
                  src="/team.jpeg"
                  alt="AlphaGroupOfDevelopers team working on software solutions"
                  className="w-full h-80 md:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">About Us</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">AlphaGroupOfDevelopers</h3>
              <p className="text-gray-600 mb-4">
                We are a talented team of software engineers and web developers from <strong>Ghana Communication Technology University (GCTU)</strong>, Ghana's leading technology institution. Founded with a shared vision to drive digital transformation across Ghana, we combine academic excellence with practical expertise.
              </p>
              <p className="text-gray-600 mb-6">
                Our mission is to help businesses and organizations solve complex problems through innovative software and applications. We partner with leading companies like <strong>Ghana Revenue Authority (GRA)</strong> and <strong>Yao Consult and Business Ventures</strong> to build scalable, reliable solutions that create lasting impact.
              </p>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Our Core Values</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Rocket className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <span><strong>Innovation:</strong> We stay ahead of technology trends</span>
                </li>
                <li className="flex items-start">
                  <Code2 className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <span><strong>Excellence:</strong> We deliver high-quality solutions</span>
                </li>
                <li className="flex items-start">
                  <Users className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <span><strong>Community:</strong> We contribute to Ghana's development</span>
                </li>
                <li className="flex items-start">
                  <MessageSquare className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <span><strong>Collaboration:</strong> We work closely with our partners</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl text-blue-900">2024</CardTitle>
                  <CardDescription>Founded</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl text-blue-900">2+</CardTitle>
                  <CardDescription>Major Clients</CardDescription>
                </CardHeader>
              </Card>
              <Card className="col-span-2 text-center">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-900">GCTU</CardTitle>
                  <CardDescription>Top Tech University</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe,    title: "Web Development",     desc: "Modern, responsive websites and web applications built with the latest technologies." },
              { icon: Code2,    title: "Software Engineering", desc: "Robust software solutions designed to solve complex business problems." },
              { icon: Wrench,   title: "System Integration",   desc: "Seamless integration of business systems and applications for optimal efficiency." },
              { icon: BarChart2, title: "Business Solutions",  desc: "Custom applications tailored to your business needs and goals." },
              { icon: Lightbulb, title: "Consulting",          desc: "Expert advice on technology strategy and digital transformation." },
              { icon: Rocket,   title: "Deployment & Support", desc: "Full deployment and ongoing technical support for your solutions." }
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4 w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { header: "GRA Partnership", title: "Ghana Revenue Authority Solutions", desc: "Developing innovative software solutions for Ghana's leading revenue authority to streamline operations and improve service delivery.", tag: "Enterprise" },
              { header: "Yao Consult", title: "Business Management Platform", desc: "Building comprehensive business management and consulting platform for Yao Consult and Business Ventures.", tag: "Business" },
              { header: "Custom Solutions", title: "Client-Specific Applications", desc: "Developing tailored software applications for various clients to address their unique business challenges.", tag: "Custom" }
            ].map((project, index) => (
              <Card key={index} className="border-blue-100 hover:border-blue-300 transition-colors">
                <CardHeader>
                  <div className="text-sm font-semibold text-blue-600 mb-2">{project.header}</div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{project.desc}</p>
                  <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                    {project.tag}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Email:</p>
                    <a href="mailto:alphaGroupOfDevelopers@gmail.com" className="text-blue-600 hover:underline">
                      alphaGroupOfDevelopers@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Institution:</p>
                    <p className="text-gray-600">Ghana Communication Technology University (GCTU)</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Briefcase className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-700">Focus:</p>
                    <p className="text-gray-600">Software Solutions & Digital Transformation</p>
                  </div>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Your Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">&copy; 2024 AlphaGroupOfDevelopers. All rights reserved.</p>
          <p className="text-gray-400">Ghana Communication Technology University | Building Ghana's Digital Future</p>
        </div>
      </footer>
    </div>
  );
}