import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ExternalLink, ArrowLeft } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Projects } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Projects | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProject(id);
    }
  }, [id]);

  const loadProject = async (projectId: string) => {
    setIsLoading(true);
    const item = await BaseCrudService.getById<Projects>('projects', projectId);
    setProject(item);
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

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 py-16 text-center">
          <p className="font-paragraph text-lg text-primary/60">Project not found.</p>
          <Link to="/projects" className="inline-block mt-6 font-paragraph text-primary hover:underline">
            ← Back to Projects
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Back Navigation */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 pt-8">
        <Link 
          to="/projects"
          className="inline-flex items-center gap-2 font-paragraph text-base text-primary/70 hover:text-primary transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>
      </section>
      
      {/* Project Header */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary/60">
              <Calendar size={18} />
              <span className="font-paragraph text-base">
                {formatDate(project.projectDate)}
              </span>
            </div>
            
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary">
              {project.projectName}
            </h1>
            
            <p className="font-paragraph text-lg md:text-xl text-primary/80">
              {project.shortDescription}
            </p>
            
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-buttonbackground border border-buttonborder text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all rounded-sm"
              >
                <ExternalLink size={18} />
                View Live Project
              </a>
            )}
          </div>
          
          <div className="aspect-[4/3] bg-secondary/10 rounded-sm overflow-hidden">
            {project.projectImage ? (
              <Image 
                src={project.projectImage}
                alt={project.projectName || 'Project image'}
                className="w-full h-full object-cover"
                width={800}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-buttonbackground">
                <span className="font-paragraph text-primary/40">No image available</span>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Project Details */}
      <section className="w-full bg-secondary text-secondary-foreground py-16 md:py-24">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {project.technologiesUsed && (
              <div className="space-y-4">
                <h2 className="font-heading text-3xl">Technologies Used</h2>
                <p className="font-paragraph text-lg text-secondary-foreground/90 leading-relaxed">
                  {project.technologiesUsed}
                </p>
              </div>
            )}
            
            {project.methodology && (
              <div className="space-y-4">
                <h2 className="font-heading text-3xl">Methodology</h2>
                <p className="font-paragraph text-lg text-secondary-foreground/90 leading-relaxed">
                  {project.methodology}
                </p>
              </div>
            )}
            
            {project.results && (
              <div className="space-y-4">
                <h2 className="font-heading text-3xl">Results</h2>
                <p className="font-paragraph text-lg text-secondary-foreground/90 leading-relaxed">
                  {project.results}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 md:px-12 py-16 md:py-24 text-center">
        <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
          Interested in Similar Work?
        </h2>
        <p className="font-paragraph text-lg text-primary/80 mb-8 max-w-2xl mx-auto">
          Let's discuss how I can help with your data analysis needs.
        </p>
        <Link 
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-buttonbackground border border-buttonborder text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all rounded-sm"
        >
          Contact Me
        </Link>
      </section>
      
      <Footer />
    </div>
  );
}
