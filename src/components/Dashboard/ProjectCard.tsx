import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileCode2, MoreHorizontal, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from 'react-router-dom';

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'online' | 'offline' | 'syncing';
  framework: string;
  lastUpdated: string;
  collaborators: { id: string; name: string; avatar?: string }[];
}

interface ProjectCardProps {
  project: Project;
}

const frameworkIcons: Record<string, string> = {
  'react': 'bg-blue-500',
  'vue': 'bg-green-500',
  'node': 'bg-green-600',
  'django': 'bg-emerald-700',
  'nextjs': 'bg-black',
  'angular': 'bg-red-600',
};

const statusColors: Record<string, string> = {
  'online': 'bg-green-500',
  'offline': 'bg-gray-400',
  'syncing': 'bg-yellow-500 animate-pulse-slow',
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const frameworkColor = frameworkIcons[project.framework.toLowerCase()] || 'bg-gray-500';
  const statusColor = statusColors[project.status];
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className={cn("w-10 h-10 rounded flex items-center justify-center mr-3", frameworkColor)}>
              <FileCode2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg font-medium">
                <Link to="/editor" className="hover:text-primary transition-colors">
                  {project.name}
                </Link>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{project.framework}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Badge variant="outline" className="mr-2">
              <span className={cn("w-2 h-2 rounded-full mr-1.5", statusColor)}></span>
              {project.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Open Project</DropdownMenuItem>
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        {project.description && (
          <p className="text-sm text-muted-foreground">{project.description}</p>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2">
        <div className="text-xs text-muted-foreground">
          Updated {project.lastUpdated}
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="flex -space-x-2">
            {project.collaborators.slice(0, 3).map((collaborator) => (
              <Avatar key={collaborator.id} className="h-6 w-6 border border-background">
                <AvatarImage src={collaborator.avatar} />
                <AvatarFallback className="text-xs">
                  {collaborator.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          
          {project.collaborators.length > 3 && (
            <span className="text-xs text-muted-foreground ml-1">
              +{project.collaborators.length - 3} more
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;