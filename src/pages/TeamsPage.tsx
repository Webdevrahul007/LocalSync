import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  online: boolean;
}

interface Team {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  projects: number;
}

const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Frontend Team',
    description: 'Responsible for UI/UX development and implementation',
    members: [
      { id: '1', name: 'Alex Johnson', role: 'Team Lead', online: true },
      { id: '2', name: 'Sam Taylor', role: 'Senior Developer', online: true },
      { id: '3', name: 'Jamie Smith', role: 'UX Designer', online: false },
    ],
    projects: 4,
  },
  {
    id: '2',
    name: 'Backend Team',
    description: 'Developing server-side logic and database architecture',
    members: [
      { id: '4', name: 'Taylor Morgan', role: 'Team Lead', online: true },
      { id: '5', name: 'Casey Wilson', role: 'Database Engineer', online: false },
      { id: '6', name: 'Jordan Bell', role: 'API Developer', online: false },
      { id: '7', name: 'Riley Cooper', role: 'Junior Developer', online: true },
    ],
    projects: 3,
  },
  {
    id: '3',
    name: 'DevOps Team',
    description: 'Infrastructure and deployment pipeline management',
    members: [
      { id: '8', name: 'Quinn Martinez', role: 'DevOps Lead', online: true },
      { id: '9', name: 'Drew Parker', role: 'Cloud Architect', online: false },
    ],
    projects: 7,
  }
];

const TeamsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCreateTeam = () => {
    toast({
      title: "Create Team",
      description: "Team creation feature will be implemented soon.",
    });
  };

  const handleInviteMember = (teamId: string) => {
    toast({
      title: "Invite sent",
      description: "Team invitation has been sent successfully.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className={`flex-1 p-6 ${!isMobile || !sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">Teams</h1>
              
              <Button onClick={handleCreateTeam}>
                <Plus className="mr-2 h-4 w-4" />
                Create Team
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTeams.map((team) => (
                <Card key={team.id} className="overflow-hidden">
                  <CardHeader>
                    <CardTitle>{team.name}</CardTitle>
                    <CardDescription>{team.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Members</span>
                        <Badge variant="outline">{team.members.length}</Badge>
                      </div>
                      <div className="flex -space-x-2">
                        {team.members.slice(0, 5).map((member) => (
                          <Avatar key={member.id} className="border-2 border-background">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        
                        {team.members.length > 5 && (
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-xs">
                            +{team.members.length - 5}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Projects</span>
                        <Badge variant="outline">{team.projects}</Badge>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">View Team</Button>
                    <Button variant="ghost" onClick={() => handleInviteMember(team.id)}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeamsPage;