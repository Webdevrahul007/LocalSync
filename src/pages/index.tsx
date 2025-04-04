import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Github, Globe, Layout, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const features = [
  {
    title: 'Code Anywhere',
    description: 'Work from your local environment and instantly sync to the cloud',
    icon: <Code className="h-6 w-6" />,
  },
  {
    title: 'Collaborate in Real-time',
    description: 'Multiple users can edit the same file simultaneously with live cursors',
    icon: <Layout className="h-6 w-6" />,
  },
  {
    title: 'One-click Deployment',
    description: 'Deploy to popular platforms like Vercel, Netlify or AWS with a single click',
    icon: <Globe className="h-6 w-6" />,
  },
  {
    title: 'Git Integration',
    description: 'Seamless integration with GitHub, GitLab, and Bitbucket',
    icon: <Github className="h-6 w-6" />,
  },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-cloud-background z-0">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.8),rgba(0,0,0,0))]"></div>
        </div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block px-3 py-1 bg-primary/10 rounded-full mb-6 animate-fade-in">
              <span className="text-sm font-medium text-primary">
                Now in public beta
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Code Locally, Collaborate Globally
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              LocalSync Studio bridges the gap between local and cloud-based development, 
              enabling real-time collaboration with your team from anywhere in the world.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="px-8">
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/editor">Try Live Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Elevate Your Development Workflow
            </h2>
            <p className="text-lg text-muted-foreground">
              LocalSync Studio offers all the tools you need for efficient collaborative development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={cn(
                  "p-6 bg-card rounded-lg border border-border",
                  "transform transition-all hover:shadow-lg hover:-translate-y-1"
                )}
              >
                <div className="p-3 bg-primary/10 rounded-lg inline-block mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-card">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full mb-6">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Get 50% off during beta
              </span>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">
              Ready to transform your development workflow?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers who have already upgraded to the future of collaborative coding.
            </p>
            
            <Button asChild size="lg" className="px-8">
              <Link to="/dashboard">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-cloud text-white rounded flex items-center justify-center">
                <span className="font-semibold">C</span>
              </div>
              <span className="font-semibold text-lg">LocalSync Studio</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
          
          <div className="mt-6 text-center md:text-left text-sm text-muted-foreground">
            &copy; 2025 LocalSync Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;