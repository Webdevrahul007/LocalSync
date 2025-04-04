import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle2, 
  Clock, 
  Filter, 
  Globe, 
  History, 
  PlusCircle, 
  RefreshCw, 
  Search, 
  Server, 
  XCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface Deployment {
  id: string;
  project: string;
  environment: string;
  status: 'running' | 'idle' | 'failed' | 'deploying';
  url: string;
  lastDeployed: string;
  commit: string;
  branch: string;
  deploymentTime?: string;
}

const mockDeployments: Deployment[] = [
  {
    id: '1',
    project: 'E-commerce Platform',
    environment: 'Production',
    status: 'running',
    url: 'https://ecommerce.LocalSync.dev',
    lastDeployed: '2 hours ago',
    commit: 'f8a92e3',
    branch: 'main',
  },
  {
    id: '2',
    project: 'E-commerce Platform',
    environment: 'Staging',
    status: 'running',
    url: 'https://staging-ecommerce.LocalSync.dev',
    lastDeployed: '4 hours ago',
    commit: '7b31d2c',
    branch: 'dev',
  },
  {
    id: '3',
    project: 'Task Management App',
    environment: 'Production',
    status: 'running',
    url: 'https://tasks.LocalSync.dev',
    lastDeployed: '1 day ago',
    commit: '2e49a1b',
    branch: 'main',
  },
  {
    id: '4',
    project: 'Company Website',
    environment: 'Production',
    status: 'idle',
    url: 'https://company.LocalSync.dev',
    lastDeployed: '3 days ago',
    commit: 'c5f7e2d',
    branch: 'main',
  },
  {
    id: '5',
    project: 'Analytics Dashboard',
    environment: 'Development',
    status: 'deploying',
    url: 'https://dev-analytics.LocalSync.dev',
    lastDeployed: 'In progress',
    commit: 'a3b8f1c',
    branch: 'feature/new-charts',
    deploymentTime: '45%',
  },
  {
    id: '6',
    project: 'Mobile App Backend',
    environment: 'Development',
    status: 'failed',
    url: 'https://dev-api.LocalSync.dev',
    lastDeployed: '2 hours ago',
    commit: 'd1e9b4a',
    branch: 'feature/auth-updates',
  },
];

const DeploymentsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredDeployments = mockDeployments.filter(deployment => 
    deployment.project.toLowerCase().includes(searchQuery.toLowerCase()) || 
    deployment.environment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deployment.branch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewDeployment = () => {
    toast({
      title: "New Deployment",
      description: "Deployment creation will be available soon.",
    });
  };

  const handleOpenDeployment = (deploymentId: string) => {
    toast({
      title: "Opening Deployment",
      description: "This functionality will be available soon.",
    });
  };

  const handleRestartDeployment = (deploymentId: string) => {
    toast({
      title: "Restarting Deployment",
      description: "Your deployment is being restarted.",
    });
  };

  const getStatusIcon = (status: Deployment['status']) => {
    switch (status) {
      case 'running':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'deploying':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'idle':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusText = (status: Deployment['status']) => {
    switch (status) {
      case 'running':
        return 'Running';
      case 'deploying':
        return 'Deploying';
      case 'idle':
        return 'Idle';
      case 'failed':
        return 'Failed';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className={`flex-1 p-6 ${!isMobile || !sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <h1 className="text-3xl font-bold">Deployments</h1>
              
              <div className="flex w-full md:w-auto gap-2">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search deployments..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All Environments</DropdownMenuItem>
                    <DropdownMenuItem>Production</DropdownMenuItem>
                    <DropdownMenuItem>Staging</DropdownMenuItem>
                    <DropdownMenuItem>Development</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>All Statuses</DropdownMenuItem>
                    <DropdownMenuItem>Running</DropdownMenuItem>
                    <DropdownMenuItem>Deploying</DropdownMenuItem>
                    <DropdownMenuItem>Failed</DropdownMenuItem>
                    <DropdownMenuItem>Idle</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button onClick={handleNewDeployment}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Deployment
                </Button>
              </div>
            </div>
            
            {filteredDeployments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDeployments.map((deployment) => (
                  <Card key={deployment.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{deployment.project}</CardTitle>
                          <Badge variant="outline" className="mt-1">{deployment.environment}</Badge>
                        </div>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {getStatusIcon(deployment.status)}
                          <span>{getStatusText(deployment.status)}</span>
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-4">
                      {deployment.status === 'deploying' && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Deployment in progress</span>
                            <span>{deployment.deploymentTime}</span>
                          </div>
                          <Progress value={Number(deployment.deploymentTime?.replace('%', ''))} />
                        </div>
                      )}
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">URL</span>
                          <a 
                            href={deployment.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-primary hover:underline"
                          >
                            <Globe className="h-3.5 w-3.5 mr-1" />
                            {deployment.url.replace('https://', '')}
                          </a>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Branch</span>
                          <span>{deployment.branch}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Commit</span>
                          <span className="font-mono">{deployment.commit}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last deployed</span>
                          <span>{deployment.lastDeployed}</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="bg-muted/30 pt-2">
                      <div className="flex w-full justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleOpenDeployment(deployment.id)}
                        >
                          <Server className="h-4 w-4 mr-2" />
                          Logs
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRestartDeployment(deployment.id)}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Restart
                        </Button>
                        
                        <Button variant="secondary" size="sm">
                          <History className="h-4 w-4 mr-2" />
                          History
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No deployments found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or create a new deployment</p>
                <Button onClick={handleNewDeployment}>Create Deployment</Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DeploymentsPage;