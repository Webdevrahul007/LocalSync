import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  CloudCog,
  Code2,
  FileCode2,
  Github,
  Globe,
  Home,
  Layers,
  PlusCircle,
  Settings,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, href, active }) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-x-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
        active 
          ? "bg-primary/10 text-primary hover:bg-primary/15" 
          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Link>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="px-3 py-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cloud text-white rounded flex items-center justify-center">
              <span className="text-lg font-semibold">C</span>
            </div>
            <span className="font-semibold text-lg">LocalSync</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <Button variant="secondary" className="w-full justify-start mb-4">
            <PlusCircle className="mr-2 h-5 w-5" />
            New Project
          </Button>
          
          <NavItem 
            icon={Home} 
            label="Dashboard" 
            href="/" 
            active={isActivePath('/')} 
          />
          <NavItem 
            icon={FileCode2} 
            label="Projects" 
            href="/projects" 
            active={isActivePath('/projects')} 
          />
          <NavItem 
            icon={Code2} 
            label="Editor" 
            href="/editor" 
            active={isActivePath('/editor')} 
          />
          <NavItem 
            icon={Users} 
            label="Teams" 
            href="/teams" 
            active={isActivePath('/teams')} 
          />
          <NavItem 
            icon={Github} 
            label="Git Repos" 
            href="/repositories" 
            active={isActivePath('/repositories')} 
          />
          <NavItem 
            icon={Globe} 
            label="Deployments" 
            href="/deployments" 
            active={isActivePath('/deployments')} 
          />
        </div>
      </div>
      
      <div className="mt-auto px-3 py-4">
        <Separator className="mb-4" />
        <NavItem 
          icon={Settings} 
          label="Settings" 
          href="/settings" 
          active={isActivePath('/settings')} 
        />
      </div>
    </div>
  );
  
  if (isMobile) {
    return (
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-border transform transition-transform duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {sidebarContent}
      </div>
    );
  }
  
  return (
    <div className="w-64 bg-sidebar border-r border-border h-screen sticky top-0">
      {sidebarContent}
    </div>
  );
};

export default Sidebar;