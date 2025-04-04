import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    positive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  className,
}) => {
  return (
    <Card className={cn(className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h2 className="text-2xl font-bold">{value}</h2>
            
            {change && (
              <div className="flex items-center mt-2">
                <span 
                  className={cn(
                    "text-xs font-medium",
                    change.positive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {change.positive ? '↑' : '↓'} {change.value}
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs. last week</span>
              </div>
            )}
          </div>
          
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;