import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const SettingsPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: "Appearance Settings Saved",
      description: "Your appearance settings have been updated.",
    });
  };

  const handleSaveIntegrations = () => {
    toast({
      title: "Integration Saved",
      description: "Your integration settings have been updated.",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account Deletion Requested",
      description: "Please check your email for confirmation.",
      variant: "destructive",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className={`flex-1 p-6 ${!isMobile || !sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>
            
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="w-full border-b pb-0">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your profile information and avatar
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>US</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline" size="sm" className="mb-2">
                          Upload new image
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          JPG, GIF or PNG. Max size of 800K
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="User" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="user@example.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company">Company (Optional)</Label>
                        <Input id="company" defaultValue="" placeholder="Your company name" />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input id="bio" defaultValue="" placeholder="Tell us about yourself" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Choose how you want to be notified
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      
                      <div className="space-y-4">
                        <h4 className="font-medium">Email Notification Types</h4>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h5>Project updates</h5>
                            <p className="text-sm text-muted-foreground">Get notified when a project is updated</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h5>Comments</h5>
                            <p className="text-sm text-muted-foreground">Get notified when someone comments on your projects</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h5>Deployment status</h5>
                            <p className="text-sm text-muted-foreground">Get notified when a deployment succeeds or fails</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h5>Team invitations</h5>
                            <p className="text-sm text-muted-foreground">Get notified when you're invited to a team</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Browser Notifications</h4>
                          <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Marketing Emails</h4>
                          <p className="text-sm text-muted-foreground">Receive emails about new features and updates</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Appearance Tab */}
              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>
                      Customize the look and feel of the application
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-4">Theme</h4>
                        <ThemeSwitcher />
                      </div>
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Reduce animations</h4>
                            <p className="text-sm text-muted-foreground">
                              Minimize animations for a simpler experience
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Compact mode</h4>
                            <p className="text-sm text-muted-foreground">
                              Use denser spacing for UI elements
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveAppearance}>Save Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Integrations Tab */}
              <TabsContent value="integrations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Integrations</CardTitle>
                    <CardDescription>
                      Connect with other services and tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-black rounded-md flex items-center justify-center text-white font-bold">
                            G
                          </div>
                          <div>
                            <h4 className="font-medium">GitHub</h4>
                            <p className="text-sm text-muted-foreground">
                              Connect your GitHub repositories
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Connect</Button>
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold">
                            V
                          </div>
                          <div>
                            <h4 className="font-medium">Vercel</h4>
                            <p className="text-sm text-muted-foreground">
                              Deploy your projects to Vercel
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Connect</Button>
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-500 rounded-md flex items-center justify-center text-white font-bold">
                            N
                          </div>
                          <div>
                            <h4 className="font-medium">Netlify</h4>
                            <p className="text-sm text-muted-foreground">
                              Deploy your projects to Netlify
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Connect</Button>
                      </div>
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold">
                            A
                          </div>
                          <div>
                            <h4 className="font-medium">AWS</h4>
                            <p className="text-sm text-muted-foreground">
                              Deploy your projects to AWS
                            </p>
                          </div>
                        </div>
                        <Button variant="outline">Connect</Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveIntegrations}>Save Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Account Tab */}
              <TabsContent value="account" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Change Password</h4>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                          
                          <Button variant="outline">Update Password</Button>
                        </div>
                      </div>
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Add an extra layer of security to your account
                        </p>
                        <Button variant="outline">Enable 2FA</Button>
                      </div>
                      <Separator />
                      
                      <div>
                        <h4 className="font-medium text-red-500 mb-2">Danger Zone</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          Permanently delete your account and all of your data
                        </p>
                        <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsPage;