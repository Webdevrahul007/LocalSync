import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import CodeEditor from '@/components/CodeEditor';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { ChevronRight, File, Folder, FolderOpen, GitBranch, Search, Terminal, Plus, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  expanded?: boolean;
  content?: string;
}

const defaultReactCode = `import React from 'react';

function HelloWorld() {
  const [count, setCount] = React.useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="container">
      <h1>Hello, LocalSync!</h1>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}

export default HelloWorld;`;

const defaultNodeCode = `const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from LocalSync API!' });
});

app.post('/api/data', (req, res) => {
  const { name } = req.body;
  res.json({ message: \`Data received for \${name}\` });
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`);
});`;

const defaultCssCode = `/* Main styles */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

h1 {
  color: #3b82f6;
  margin-bottom: 20px;
}

p {
  margin-bottom: 15px;
}

button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #2563eb;
}`;

const initialFileStructure: FileItem[] = [
  {
    id: '1',
    name: 'node_modules',
    type: 'folder',
    expanded: false,
  },
  {
    id: '2',
    name: 'public',
    type: 'folder',
    expanded: true,
    children: [
      { id: '2-1', name: 'favicon.ico', type: 'file' },
      { id: '2-2', name: 'robots.txt', type: 'file' },
    ],
  },
  {
    id: '3',
    name: 'src',
    type: 'folder',
    expanded: true,
    children: [
      { 
        id: '3-1', 
        name: 'components', 
        type: 'folder', 
        expanded: true,
        children: [
          { id: '3-1-1', name: 'Button.tsx', type: 'file', content: defaultReactCode },
          { id: '3-1-2', name: 'Input.tsx', type: 'file' },
          { id: '3-1-3', name: 'Card.tsx', type: 'file' },
        ],
      },
      { id: '3-2', name: 'utils', type: 'folder' },
      { id: '3-3', name: 'App.tsx', type: 'file', content: defaultReactCode },
      { id: '3-4', name: 'index.tsx', type: 'file' },
      { id: '3-5', name: 'styles.css', type: 'file', content: defaultCssCode },
    ],
  },
  {
    id: '4',
    name: 'server.js', 
    type: 'file',
    content: defaultNodeCode,
  },
  {
    id: '5',
    name: 'package.json', 
    type: 'file',
  },
  {
    id: '6',
    name: 'README.md', 
    type: 'file',
  },
];

const FileTree: React.FC<{ 
  files: FileItem[], 
  onFileSelect: (file: FileItem) => void, 
  onToggleFolder: (id: string) => void,
  expandedFolders: Record<string, boolean>,
  onAddNewItem: (parentId: string | null, type: 'file' | 'folder') => void
}> = ({ files, onFileSelect, onToggleFolder, expandedFolders, onAddNewItem }) => {
  
  const renderFileItem = (file: FileItem, depth = 0, parentId: string | null = null) => {
    const isExpanded = file.type === 'folder' && expandedFolders[file.id];
    
    return (
      <React.Fragment key={file.id}>
        <div 
          className={`flex items-center px-3 py-1 text-sm cursor-pointer hover:bg-secondary/50 rounded-sm group ${
            file.type === 'folder' ? 'text-foreground' : 'text-muted-foreground'
          }`}
          style={{ paddingLeft: `${12 + depth * 12}px` }}
        >
          <div 
            className="flex items-center flex-1"
            onClick={() => {
              if (file.type === 'folder') {
                onToggleFolder(file.id);
              } else {
                onFileSelect(file);
              }
            }}
          >
            {file.type === 'folder' && (
              <ChevronRight className={`h-4 w-4 mr-1 ${isExpanded ? 'transform rotate-90' : ''}`} />
            )}
            
            {file.type === 'folder' ? (
              isExpanded ? <FolderOpen className="h-4 w-4 mr-1" /> : <Folder className="h-4 w-4 mr-1" />
            ) : (
              <File className="h-4 w-4 mr-1" />
            )}
            
            <span className="truncate">{file.name}</span>
          </div>
          
          {file.type === 'folder' && (
            <div className="hidden group-hover:flex">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 ml-1" 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddNewItem(file.id, 'file');
                }}
              >
                <File className="h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5" 
                onClick={(e) => {
                  e.stopPropagation();
                  onAddNewItem(file.id, 'folder');
                }}
              >
                <Folder className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        
        {isExpanded && file.children && (
          <div>
            {file.children.map(child => renderFileItem(child, depth + 1, file.id))}
          </div>
        )}
      </React.Fragment>
    );
  };
  
  return (
    <div className="text-sm">
      {files.map(file => renderFileItem(file))}
      <div className="px-3 py-2 mt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-xs flex items-center justify-center"
          onClick={() => onAddNewItem(null, 'file')}
        >
          <Plus className="h-3 w-3 mr-1" /> New File
        </Button>
      </div>
    </div>
  );
};

// Create unique IDs for new files and folders
const createId = () => Math.random().toString(36).substring(2, 9);

const EditorPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [fileStructure, setFileStructure] = useState<FileItem[]>(initialFileStructure);
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>(
    initialFileStructure.reduce((acc, file) => {
      if (file.type === 'folder') {
        acc[file.id] = !!file.expanded;
        
        if (file.children) {
          file.children.forEach(child => {
            if (child.type === 'folder') {
              acc[child.id] = !!child.expanded;
            }
          });
        }
      }
      return acc;
    }, {} as Record<string, boolean>)
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState<'file' | 'folder'>('file');
  const [newItemParentId, setNewItemParentId] = useState<string | null>(null);

  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
  };

  const toggleFolder = (id: string) => {
    setExpandedFolders({
      ...expandedFolders,
      [id]: !expandedFolders[id],
    });
  };

  // Function to find a file by ID in the file structure
  const findFileById = (files: FileItem[], id: string): FileItem | null => {
    for (const file of files) {
      if (file.id === id) {
        return file;
      }
      
      if (file.type === 'folder' && file.children) {
        const result = findFileById(file.children, id);
        if (result) {
          return result;
        }
      }
    }
    
    return null;
  };

  // Function to add a new item (file or folder)
  const handleAddNewItem = (parentId: string | null, type: 'file' | 'folder') => {
    setNewItemType(type);
    setNewItemParentId(parentId);
    setNewItemName('');
    setIsCreateDialogOpen(true);
  };

  // Function to create the new item with the provided name
  const createNewItem = () => {
    if (!newItemName.trim()) {
      toast({
        title: "Error",
        description: "Name cannot be empty",
        variant: "destructive"
      });
      return;
    }

    const newItem: FileItem = {
      id: createId(),
      name: newItemName.trim(),
      type: newItemType,
      ...(newItemType === 'folder' ? { children: [], expanded: true } : {})
    };

    // If there's a parent ID, add the item as a child
    if (newItemParentId) {
      // Find the parent folder
      const updatedFileStructure = [...fileStructure];
      
      const addToFolder = (files: FileItem[], parentId: string): boolean => {
        for (const file of files) {
          if (file.id === parentId) {
            if (file.type === 'folder') {
              if (!file.children) {
                file.children = [];
              }
              file.children.push(newItem);
              
              // Expand the parent folder
              setExpandedFolders({
                ...expandedFolders,
                [parentId]: true
              });
              
              return true;
            }
          }
          
          if (file.type === 'folder' && file.children) {
            if (addToFolder(file.children, parentId)) {
              return true;
            }
          }
        }
        
        return false;
      };
      
      addToFolder(updatedFileStructure, newItemParentId);
      setFileStructure(updatedFileStructure);
    } else {
      // Add the item at the root level
      setFileStructure([...fileStructure, newItem]);
    }

    if (newItemType === 'folder') {
      setExpandedFolders({
        ...expandedFolders,
        [newItem.id]: true
      });
    } else {
      setSelectedFile(newItem);
    }

    setIsCreateDialogOpen(false);
    
    toast({
      title: `${newItemType === 'folder' ? 'Folder' : 'File'} created`,
      description: `${newItem.name} has been created successfully.`
    });
  };
  
  const filteredFiles = searchTerm.length > 0
    ? fileStructure.flatMap(file => {
        if (file.name.toLowerCase().includes(searchTerm.toLowerCase())) return [file];
        if (file.type === 'folder' && file.children) {
          const matchingChildren = file.children.filter(
            child => child.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (matchingChildren.length > 0) {
            // Create a copy of the file with only matching children
            return [{
              ...file,
              children: matchingChildren,
              expanded: true
            }];
          }
        }
        return [];
      })
    : fileStructure;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className={`flex-1 flex flex-col ${!isMobile || !sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="flex h-full">
            {/* File Explorer Sidebar */}
            <div className="w-64 border-r border-border bg-card h-full flex flex-col">
              <div className="p-3 flex justify-between items-center">
                <h3 className="font-semibold">Explorer</h3>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="w-6 h-6"
                    onClick={() => handleAddNewItem(null, 'file')}
                  >
                    <File className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-6 h-6">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="w-6 h-6">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-2">
                <Input 
                  className="h-8 text-xs"
                  placeholder="Search files"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex-1 overflow-y-auto py-2">
                <FileTree 
                  files={filteredFiles} 
                  onFileSelect={handleFileSelect}
                  onToggleFolder={toggleFolder}
                  expandedFolders={expandedFolders}
                  onAddNewItem={handleAddNewItem}
                />
              </div>
              
              <div className="border-t border-border p-2">
                <div className="flex items-center justify-between p-1.5">
                  <div className="flex items-center space-x-2">
                    <GitBranch className="h-4 w-4" />
                    <span className="text-xs">main</span>
                  </div>
                  
                  <Button variant="ghost" size="icon" className="w-6 h-6">
                    <Terminal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main Editor */}
            <div className="flex-1 flex flex-col">
              <CodeEditor initialFile={selectedFile} />
            </div>
          </div>
        </main>
      </div>

      {/* Dialog for creating new files and folders */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new {newItemType}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <Input
                id="name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="col-span-3"
                placeholder={`Enter ${newItemType} name...`}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    createNewItem();
                  }
                }}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createNewItem}>
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditorPage;