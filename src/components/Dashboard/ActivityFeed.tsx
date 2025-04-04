import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FileCode, GitCommit, GitPullRequest, MessageSquare, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  target: string;
  time: string;
  type: 'commit' | 'comment' | 'upload' | 'file' | 'pr';
}

const activities: ActivityItem[] = [
  {
    id: '1',
    user: { name: 'Alex Kim' },
    action: 'committed to',
    target: 'E-Commerce Frontend',
    time: '10 minutes ago',
    type: 'commit'
  },
  {
    id: '2',
    user: { name: 'Taylor Smith' },
    action: 'commented on',
    target: 'API Gateway',
    time: '30 minutes ago',
    type: 'comment'
  },
  {
    id: '3',
    user: { name: 'Morgan Chen' },
    action: 'uploaded',
    target: 'new assets',
    time: '1 hour ago',
    type: 'upload'
  },
  {
    id: '4',
    user: { name: 'Jordan Lee' },
    action: 'modified',
    target: 'UserController.js',
    time: '2 hours ago',
    type: 'file'
  },
  {
    id: '5',
    user: { name: 'Riley Johnson' },
    action: 'opened PR in',
    target: 'Mobile App Backend',
    time: '3 hours ago',
    type: 'pr'
  }
];

const activityIcons = {
  commit: <GitCommit className="h-4 w-4" />,
  comment: <MessageSquare className="h-4 w-4" />,
  upload: <Upload className="h-4 w-4" />,
  file: <FileCode className="h-4 w-4" />,
  pr: <GitPullRequest className="h-4 w-4" />
};

const activityColors = {
  commit: 'bg-blue-100 text-blue-600',
  comment: 'bg-yellow-100 text-yellow-600',
  upload: 'bg-purple-100 text-purple-600',
  file: 'bg-green-100 text-green-600',
  pr: 'bg-orange-100 text-orange-600'
};

const ActivityFeed: React.FC = () => {
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center">
                  <p className="text-sm font-medium">{activity.user.name}</p>
                  <span className="text-xs text-muted-foreground ml-2">{activity.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.action}{' '}
                  <span className="font-medium text-foreground">{activity.target}</span>
                </p>
              </div>
              
              <div className={cn('p-1.5 rounded-full', activityColors[activity.type])}>
                {activityIcons[activity.type]}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;