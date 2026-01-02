import { Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-secondary text-secondary-foreground">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="font-heading text-2xl mb-4">Dhanuja</h3>
            <p className="font-paragraph text-sm text-secondary-foreground/80">
              Data Analyst specializing in transforming complex datasets into actionable insights.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading text-lg mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <a href="/" className="font-paragraph text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                Home
              </a>
              <a href="/projects" className="font-paragraph text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                Projects
              </a>
              <a href="/contact" className="font-paragraph text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                Contact
              </a>
            </nav>
          </div>
          
          <div>
            <h4 className="font-heading text-lg mb-4">Connect</h4>
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={24} />
              </a>
              <a 
                href="mailto:dhanuja@example.com"
                className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                aria-label="Email Contact"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-secondary-foreground/20">
          <p className="font-paragraph text-sm text-secondary-foreground/60 text-center">
            © {currentYear} Dhanuja. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
