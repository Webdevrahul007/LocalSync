import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Copy, Play, Pause, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnvCardProps {
  name: string;
  status: 'running' | 'stopped';
  framework: string;
  url?: string;
  resourceUsage?: {
    cpu: number;
    memory: number;
  };
}

const EnvCard: React.FC<EnvCardProps> = ({
  name,
  status,
  framework,
  url,
  resourceUsage,
}) => {
  const [copied, setCopied] = React.useState(false);
  
  const copyUrl = () => {
    if (url) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">{name}</CardTitle>
            <p className="text-sm text-muted-foreground">{framework}</p>
          </div>
          
          <Badge 
            variant={status === 'running' ? 'default' : 'outline'}
            className={status === 'running' ? 'bg-green-500 hover:bg-green-500' : ''}
          >
            {status === 'running' ? 'Running' : 'Stopped'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        {url && (
          <div className="flex items-center space-x-2 mb-4">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm truncate">{url}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={copyUrl}>
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
        
        {resourceUsage && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>CPU</span>
                <span>{resourceUsage.cpu}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${resourceUsage.cpu}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Memory</span>
                <span>{resourceUsage.memory}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${resourceUsage.memory}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="w-full flex space-x-2">
          <Button 
            variant={status === 'running' ? 'outline' : 'default'}
            className="w-full" 
            size="sm"
          >
            {status === 'running' ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start
              </>
            )}
          </Button>
          <Button variant="outline" size="sm">
            Configure
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EnvCard;