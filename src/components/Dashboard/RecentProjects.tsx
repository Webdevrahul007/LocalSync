import React from 'react';
import ProjectCard, { Project } from './ProjectCard';

// Mock data for projects
const projects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce Frontend',
    description: 'React-based frontend for the new e-commerce platform',
    status: 'online',
    framework: 'React',
    lastUpdated: '2 hours ago',
    collaborators: [
      { id: '1', name: 'Alex Kim' },
      { id: '2', name: 'Taylor Smith' },
      { id: '3', name: 'Jordan Lee' }
    ]
  },
  {
    id: '2',
    name: 'Admin Dashboard',
    description: 'Admin panel with analytics and user management',
    status: 'syncing',
    framework: 'NextJS',
    lastUpdated: '5 hours ago',
    collaborators: [
      { id: '1', name: 'Alex Kim' },
      { id: '4', name: 'Morgan Chen' },
    ]
  },
  {
    id: '3',
    name: 'API Gateway',
    status: 'online',
    framework: 'Node',
    lastUpdated: 'yesterday',
    collaborators: [
      { id: '2', name: 'Taylor Smith' },
      { id: '5', name: 'Sam Wong' },
      { id: '6', name: 'Riley Johnson' },
      { id: '7', name: 'Casey Zhang' }
    ]
  },
  {
    id: '4',
    name: 'Mobile App Backend',
    status: 'offline',
    framework: 'Django',
    lastUpdated: '3 days ago',
    collaborators: [
      { id: '3', name: 'Jordan Lee' },
      { id: '6', name: 'Riley Johnson' }
    ]
  }
];

const RecentProjects: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Recent Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;