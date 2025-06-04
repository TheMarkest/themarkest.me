// src/components/sections/ProjectsSection.tsx
"use client";

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import { projectsData, type Project } from '@/data/projects';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ScrollAppear from '@/components/ui/ScrollAppear';
import GlitchText from '@/components/ui/GlitchText';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const { t } = useLanguage();
  const projectTitle = project.titleKey.startsWith('placeholder.') ? t(project.titleKey) : t(project.titleKey, project.id);
  const projectDescription = project.descriptionKey.startsWith('placeholder.') ? t(project.descriptionKey) : t(project.descriptionKey, 'No description available.');

  return (
    <ScrollAppear delay={`delay-${index * 150}`}>
      <Card className="h-full flex flex-col bg-card/80 backdrop-blur-sm flicker-border-primary overflow-hidden group">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={projectTitle}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={project.dataAiHint || "technology project"}
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary group-hover:text-primary/80 transition-colors">
            {projectTitle}
          </CardTitle>
          <CardDescription className="font-code text-xs text-muted-foreground">
            {`FILE: ${project.id}.dat | CLIENT: ${project.client || 'CLASSIFIED'} | YEAR: ${project.year}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground mb-4 text-sm font-body">{projectDescription}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="font-code bg-accent/10 text-accent border-accent/30">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          {project.liveLink && (
            <Button variant="outline" size="sm" asChild className="mr-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> {t('projects.viewProject')}
              </a>
            </Button>
          )}
          {project.sourceLink && (
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-accent">
              <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> Source
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </ScrollAppear>
  );
};

const ProjectsSection = () => {
  const { t } = useLanguage();
  
  // Populate with placeholder projects if actual data is short
  const displayProjects = [...projectsData];
  while (displayProjects.length < 3) {
    displayProjects.push({
      id: `placeholder-${displayProjects.length + 1}`,
      titleKey: 'placeholder.project.title',
      descriptionKey: 'placeholder.project.description',
      image: 'https://placehold.co/600x400.png',
      dataAiHint: 'classified document',
      tags: ['Encrypted', 'Top Secret'],
      year: new Date().getFullYear(),
    });
  }


  return (
    <section id="projects" className="container">
      <ScrollAppear>
        <h2 className="text-4xl md:text-5xl font-headline mb-12 text-center">
          <GlitchText text={t('projects.title')} className="text-primary" />
        </h2>
      </ScrollAppear>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
