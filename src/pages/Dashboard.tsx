import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import RecentProjects from '@/components/Dashboard/RecentProjects';
import StatCard from '@/components/Dashboard/StartCard';
import ActivityFeed from '@/components/Dashboard/ActivityFeed';
import EnvCard from '@/components/Environments/EnvCard';
import { Button } from '@/components/ui/button';
import { Clock, Code2, FileCode2, Globe, PlusCircle, Users } from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className={`flex-1 ${!isMobile || !sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="container py-6 px-4 mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-3xl font-bold mb-4 md:mb-0">Dashboard</h1>
              
              <Button className="w-full md:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                title="Total Projects"
                value="12"
                icon={<FileCode2 className="h-5 w-5" />}
                change={{ value: "3", positive: true }}
              />
              
              <StatCard
                title="Active Environments"
                value="5"
                icon={<Globe className="h-5 w-5" />}
                change={{ value: "1", positive: true }}
              />
              
              <StatCard
                title="Code Commits"
                value="247"
                icon={<Code2 className="h-5 w-5" />}
                change={{ value: "12%", positive: true }}
              />
              
              <StatCard
                title="Team Members"
                value="7"
                icon={<Users className="h-5 w-5" />}
                change={{ value: "2", positive: true }}
              />
            </div>
            
            {/* Recent Projects */}
            <div className="mb-8">
              <RecentProjects />
            </div>
            
            {/* Activity and Environments */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ActivityFeed />
              
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Active Environments</h2>
                  
                  <Button variant="outline" size="sm">
                    <Clock className="mr-2 h-4 w-4" />
                    History
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EnvCard
                    name="Production"
                    status="running"
                    framework="NextJS"
                    url="https://app-production.LocalSync.dev"
                    resourceUsage={{ cpu: 12, memory: 35 }}
                  />
                  
                  <EnvCard
                    name="Staging"
                    status="running"
                    framework="NextJS"
                    url="https://app-staging.LocalSync.dev"
                    resourceUsage={{ cpu: 8, memory: 24 }}
                  />
                  
                  <EnvCard
                    name="Development"
                    status="stopped"
                    framework="NextJS"
                    url="https://app-dev.LocalSync.dev"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;