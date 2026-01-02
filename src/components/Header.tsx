import { Link, useLocation } from 'react-router-dom';
import { Linkedin, Github, Mail } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-background border-b border-primary/10">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="font-heading text-xl md:text-2xl text-primary font-semibold">
            Dhanuja
          </Link>
          
          <nav className="flex items-center gap-6 md:gap-8">
            <Link 
              to="/" 
              className={`font-paragraph text-sm md:text-base transition-colors ${
                isActive('/') ? 'text-primary font-semibold' : 'text-primary/70 hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/projects" 
              className={`font-paragraph text-sm md:text-base transition-colors ${
                isActive('/projects') ? 'text-primary font-semibold' : 'text-primary/70 hover:text-primary'
              }`}
            >
              Projects
            </Link>
            <Link 
              to="/contact" 
              className={`font-paragraph text-sm md:text-base transition-colors ${
                isActive('/contact') ? 'text-primary font-semibold' : 'text-primary/70 hover:text-primary'
              }`}
            >
              Contact
            </Link>
            
            <div className="flex items-center gap-3 ml-2 md:ml-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary/70 hover:text-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary/70 hover:text-primary transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
