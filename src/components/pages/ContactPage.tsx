import { useState } from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ContactSubmissions } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const submission: ContactSubmissions = {
      _id: crypto.randomUUID(),
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      submissionDate: new Date().toISOString(),
      status: 'new'
    };

    await BaseCrudService.create('contactsubmissions', submission);
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl">
          <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary mb-6">
            Let's Connect
          </h1>
          <p className="font-paragraph text-lg md:text-xl text-primary/80">
            Have a project in mind or want to discuss data analysis opportunities? I'd love to hear from you.
          </p>
        </div>
      </section>
      
      {/* Contact Form and Info */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="bg-background border border-primary/10 rounded-sm p-8 md:p-12">
            <h2 className="font-heading text-3xl md:text-4xl text-primary mb-8">
              Send a Message
            </h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-buttonbackground border border-primary/20 rounded-sm">
                <p className="font-paragraph text-base text-primary">
                  Thank you for your message! I'll get back to you soon.
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-paragraph text-base text-primary">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border-primary/20 text-primary font-paragraph"
                  placeholder="Your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="font-paragraph text-base text-primary">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border-primary/20 text-primary font-paragraph"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject" className="font-paragraph text-base text-primary">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border-primary/20 text-primary font-paragraph"
                  placeholder="What's this about?"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message" className="font-paragraph text-base text-primary">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-background border-primary/20 text-primary font-paragraph resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-buttonbackground border border-buttonborder text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all rounded-sm py-6"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl text-primary">
                Get in Touch
              </h2>
              <p className="font-paragraph text-lg text-primary/80 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether you need data analysis expertise or want to collaborate on innovative solutions, feel free to reach out.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="font-heading text-2xl text-primary">Connect Online</h3>
              
              <div className="space-y-4">
                <a 
                  href="mailto:dhanuja@example.com"
                  className="flex items-center gap-4 p-4 bg-background border border-primary/10 rounded-sm hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-buttonbackground rounded-sm group-hover:bg-primary transition-colors">
                    <Mail className="text-primary group-hover:text-primary-foreground" size={24} />
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-primary/60">Email</p>
                    <p className="font-paragraph text-base text-primary">dhanuja@example.com</p>
                  </div>
                </a>
                
                <a 
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-background border border-primary/10 rounded-sm hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-buttonbackground rounded-sm group-hover:bg-primary transition-colors">
                    <Linkedin className="text-primary group-hover:text-primary-foreground" size={24} />
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-primary/60">LinkedIn</p>
                    <p className="font-paragraph text-base text-primary">Connect with me</p>
                  </div>
                </a>
                
                <a 
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-background border border-primary/10 rounded-sm hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-buttonbackground rounded-sm group-hover:bg-primary transition-colors">
                    <Github className="text-primary group-hover:text-primary-foreground" size={24} />
                  </div>
                  <div>
                    <p className="font-paragraph text-sm text-primary/60">GitHub</p>
                    <p className="font-paragraph text-base text-primary">View my code</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="bg-secondary text-secondary-foreground p-8 rounded-sm">
              <h3 className="font-heading text-2xl mb-4">Response Time</h3>
              <p className="font-paragraph text-base text-secondary-foreground/90">
                I typically respond to inquiries within 24-48 hours. For urgent matters, please mention it in your subject line.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
