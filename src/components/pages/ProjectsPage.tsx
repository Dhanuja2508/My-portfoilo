import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ExternalLink } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setIsLoading(true);
    const { items } = await BaseCrudService.getAll<Projects>('projects');
    setProjects(items);
    setIsLoading(false);
  };

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl">
          <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary mb-6">
            Portfolio Projects
          </h1>
          <p className="font-paragraph text-lg md:text-xl text-primary/80">
            Explore a curated collection of data analysis projects showcasing methodologies, insights, and measurable outcomes.
          </p>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 pb-16 md:pb-24">
        {projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-paragraph text-lg text-primary/60">
              No projects available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {projects.map((project) => (
              <article 
                key={project._id}
                className="group bg-background border border-primary/10 rounded-sm overflow-hidden hover:border-primary/30 transition-all"
              >
                <div className="aspect-[4/3] bg-secondary/10 overflow-hidden">
                  {project.projectImage ? (
                    <Image 
                      src={project.projectImage}
                      alt={project.projectName || 'Project image'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      width={600}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-buttonbackground">
                      <span className="font-paragraph text-primary/40">No image</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-primary/60">
                    <Calendar size={16} />
                    <span className="font-paragraph text-sm">
                      {formatDate(project.projectDate)}
                    </span>
                  </div>
                  
                  <h2 className="font-heading text-2xl md:text-3xl text-primary">
                    {project.projectName}
                  </h2>
                  
                  <p className="font-paragraph text-base text-primary/70 line-clamp-3">
                    {project.shortDescription}
                  </p>
                  
                  {project.technologiesUsed && (
                    <div className="pt-2">
                      <p className="font-paragraph text-sm text-primary/60">
                        <span className="font-semibold">Technologies:</span> {project.technologiesUsed}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 pt-4">
                    <Link
                      to={`/projects/${project._id}`}
                      className="font-paragraph text-sm text-primary hover:underline"
                    >
                      View Details →
                    </Link>
                    
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 font-paragraph text-sm text-primary/70 hover:text-primary transition-colors"
                      >
                        <ExternalLink size={14} />
                        Live Project
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
      
      <Footer />
    </div>
  );
}
