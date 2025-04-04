import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, GitFork, PlusCircle, Search, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Repository {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  branches: number;
  lastUpdated: string;
  language: string;
}

const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'frontend-app',
    description: 'Main frontend application repository with React components',
    stars: 45,
    forks: 12,
    branches: 3,
    lastUpdated: '2 days ago',
    language: 'TypeScript',
  },
  {
    id: '2',
    name: 'api-server',
    description: 'Backend API server with authentication and data endpoints',
    stars: 32,
    forks: 8,
    branches: 2,
    lastUpdated: '4 days ago',
    language: 'JavaScript',
  },
  {
    id: '3',
    name: 'shared-components',
    description: 'Shared UI component library used across projects',
    stars: 78,
    forks: 24,
    branches: 4,
    lastUpdated: '1 week ago',
    language: 'TypeScript',
  },
  {
    id: '4',
    name: 'documentation',
    description: 'Project documentation and developer guides',
    stars: 12,
    forks: 5,
    branches: 1,
    lastUpdated: '2 weeks ago',
    language: 'Markdown',
  },
  {
    id: '5',
    name: 'deployment-scripts',
    description: 'CI/CD and deployment automation scripts',
    stars: 28,
    forks: 10,
    branches: 2,
    lastUpdated: '3 weeks ago',
    language: 'Shell',
  },
  {
    id: '6',
    name: 'mobile-app',
    description: 'React Native mobile application',
    stars: 56,
    forks: 18,
    branches: 3,
    lastUpdated: '1 month ago',
    language: 'JavaScript',
  },
];

// Language color map for visual indicators
const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-green-500',
  Ruby: 'bg-red-600',
  Go: 'bg-blue-300',
  Rust: 'bg-orange-600',
  Java: 'bg-red-400',
  'C#': 'bg-purple-600',
  PHP: 'bg-indigo-400',
  Shell: 'bg-gray-500',
  Markdown: 'bg-green-300',
};

const RepositoriesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredRepos = mockRepositories.filter(repo => 
    repo.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    repo.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnectRepo = () => {
    toast({
      title: "Connect Repository",
      description: "GitHub integration will be available soon.",
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
              <h1 className="text-3xl font-bold">Git Repositories</h1>
              
              <div className="flex w-full md:w-auto gap-2">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search repositories..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Button onClick={handleConnectRepo}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Connect Repo
                </Button>
              </div>
            </div>
            
            {filteredRepos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRepos.map((repo) => (
                  <Card key={repo.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{repo.name}</CardTitle>
                        <div className="flex items-center gap-1">
                          <div className={`h-3 w-3 rounded-full ${languageColors[repo.language] || 'bg-gray-400'}`}></div>
                          <span className="text-xs text-muted-foreground">{repo.language}</span>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-2">{repo.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between text-sm mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            <span>{repo.stars}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <GitFork className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{repo.forks}</span>
                          </div>
                          
                          <div className="flex items-center">
                            <GitBranch className="h-4 w-4 mr-1 text-muted-foreground" />
                            <span>{repo.branches}</span>
                          </div>
                        </div>
                        
                        <Badge variant="outline" className="ml-2">
                          {repo.lastUpdated}
                        </Badge>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="bg-muted/30 pt-2">
                      <div className="flex w-full justify-between">
                        <Button variant="ghost" size="sm">Clone</Button>
                        <Button variant="secondary" size="sm">Open in Editor</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No repositories found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or connect a new repository</p>
                <Button onClick={handleConnectRepo}>Connect a Repository</Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default RepositoriesPage;