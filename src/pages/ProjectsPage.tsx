import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectCard, { Project } from '@/components/Dashboard/ProjectCard';
import { useToast } from '@/hooks/use-toast';

// Mock project data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Online shopping platform with user accounts and payment integration',
    status: 'online',
    framework: 'Next.js',
    lastUpdated: '2 hours ago',
    collaborators: [
      { id: '1', name: 'Alex Kim' },
      { id: '2', name: 'Taylor Smith' },
      { id: '3', name: 'Morgan Chen' },
      { id: '4', name: 'Jordan Wei' }
    ]
  },
  {
    id: '2',
    name: 'Task Management App',
    description: 'Kanban-style task management with team collaboration features',
    status: 'syncing',
    framework: 'React',
    lastUpdated: '1 day ago',
    collaborators: [
      { id: '1', name: 'Alex Kim' },
      { id: '2', name: 'Taylor Smith' }
    ]
  },
  {
    id: '3',
    name: 'Company Website',
    description: 'Corporate website with blog and contact forms',
    status: 'online',
    framework: 'Next.js',
    lastUpdated: '3 days ago',
    collaborators: [
      { id: '3', name: 'Morgan Chen' },
      { id: '4', name: 'Jordan Wei' },
      { id: '5', name: 'Sam Lee' }
    ]
  },
  {
    id: '4',
    name: 'Analytics Dashboard',
    description: 'Data visualization and reporting dashboard',
    status: 'online',
    framework: 'React',
    lastUpdated: '1 week ago',
    collaborators: [
      { id: '1', name: 'Alex Kim' },
      { id: '5', name: 'Sam Lee' }
    ]
  },
  {
    id: '5',
    name: 'Mobile App Backend',
    description: 'API server for iOS and Android applications',
    status: 'offline',
    framework: 'Node.js',
    lastUpdated: '2 weeks ago',
    collaborators: [
      { id: '2', name: 'Taylor Smith' },
      { id: '3', name: 'Morgan Chen' },
      { id: '4', name: 'Jordan Wei' },
      { id: '5', name: 'Sam Lee' },
      { id: '6', name: 'Casey Zhang' }
    ]
  },
  {
    id: '6',
    name: 'Internal Tools',
    description: 'Suite of internal tools for team productivity',
    status: 'online',
    framework: 'React',
    lastUpdated: '1 month ago',
    collaborators: [
      { id: '1', name: 'Alex Kim' },
      { id: '2', name: 'Taylor Smith' },
      { id: '3', name: 'Morgan Chen' },
      { id: '4', name: 'Jordan Wei' },
      { id: '5', name: 'Sam Lee' },
      { id: '6', name: 'Casey Zhang' },
      { id: '7', name: 'Riley Johnson' }
    ]
  },
];

const ProjectsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredProjects = mockProjects.filter(project => 
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleNewProject = () => {
    toast({
      title: "Create Project",
      description: "New project creation will be available soon.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className={`flex-1 p-6 ${!isMobile || !sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <h1 className="text-3xl font-bold">Projects</h1>
              
              <div className="flex w-full md:w-auto gap-2">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search projects..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button onClick={handleNewProject}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Project
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="recent">Recently Updated</TabsTrigger>
                <TabsTrigger value="my">My Projects</TabsTrigger>
                <TabsTrigger value="shared">Shared With Me</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No projects found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or create a new project</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="recent" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.slice(0, 3).map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="my" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.slice(0, 4).map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="shared" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.slice(3, 6).map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectsPage;