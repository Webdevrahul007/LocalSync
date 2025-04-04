import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Save, Play, Share2, Users, FileText, File, Terminal } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface Collaborator {
  id: string;
  name: string;
  color: string;
  position: { line: number; ch: number };
}

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  expanded?: boolean;
  content?: string;
}

interface CodeEditorProps {
  projectId?: string;
  initialFile?: FileItem | null;
  initialCode?: string;
}

const mockCollaborators: Collaborator[] = [
  { id: '1', name: 'Alex Kim', color: '#FF5733', position: { line: 5, ch: 10 } },
  { id: '2', name: 'Taylor Smith', color: '#33FF57', position: { line: 12, ch: 15 } },
];

// Sample code for React component
const reactSample = `import React from 'react';

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

// Sample code for Node.js backend
const nodeSample = `const express = require('express');
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

const cssSample = `/* Main styles */
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

const getLanguageFromFileName = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  
  if (['js', 'jsx', 'ts', 'tsx'].includes(ext || '')) return 'javascript';
  if (['css'].includes(ext || '')) return 'css';
  if (['html'].includes(ext || '')) return 'html';
  if (['json'].includes(ext || '')) return 'json';
  if (['md'].includes(ext || '')) return 'markdown';
  
  return 'plaintext';
};

const getDefaultContent = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  
  if (['js', 'jsx', 'ts', 'tsx'].includes(ext || '')) return reactSample;
  if (['css'].includes(ext || '')) return cssSample;
  if (['server.js'].includes(fileName)) return nodeSample;
  
  return '';
};

const CodeEditor: React.FC<CodeEditorProps> = ({ projectId, initialFile, initialCode = '' }) => {
  const [activeFileName, setActiveFileName] = useState<string>('App.tsx');
  const [openFiles, setOpenFiles] = useState<Map<string, string>>(new Map([
    ['App.tsx', reactSample]
  ]));
  const [code, setCode] = useState<string>(reactSample);
  const [cursorPosition, setCursorPosition] = useState({ line: 0, ch: 0 });
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>(["Welcome to LocalSync Terminal v1.0.0", "Type 'help' to see available commands", "> "]);
  const [terminalInput, setTerminalInput] = useState('');
  const { toast } = useToast();
  
  useEffect(() => {
    if (initialFile && initialFile.type === 'file') {
      const fileName = initialFile.name;
      
      if (!openFiles.has(fileName)) {
        const newContent = initialFile.content || getDefaultContent(fileName);
        setOpenFiles(prevFiles => {
          const newFiles = new Map(prevFiles);
          newFiles.set(fileName, newContent);
          return newFiles;
        });
      }
      
      setActiveFileName(fileName);
      setCode(openFiles.get(fileName) || initialFile.content || getDefaultContent(fileName));
    }
  }, [initialFile]);
  
  // Simulate cursor position changes
  useEffect(() => {
    const interval = setInterval(() => {
      mockCollaborators.forEach(collab => {
        collab.position.line = Math.floor(Math.random() * 20);
        collab.position.ch = Math.floor(Math.random() * 30);
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    
    // Update the code in the open files map
    setOpenFiles(prevFiles => {
      const newFiles = new Map(prevFiles);
      newFiles.set(activeFileName, newCode);
      return newFiles;
    });
  };
  
  const handleSave = () => {
    toast({
      title: "Changes saved",
      description: `${activeFileName} has been saved successfully.`,
    });
  };
  
  const handleRun = () => {
    toast({
      title: "Project running",
      description: "Your project is now running at https://LocalSync.dev/preview/your-project",
    });
  };
  
  const closeFile = (fileName: string) => {
    if (openFiles.size === 1) {
      toast({
        title: "Cannot close file",
        description: "You need to keep at least one file open.",
        variant: "destructive"
      });
      return;
    }
    
    setOpenFiles(prevFiles => {
      const newFiles = new Map(prevFiles);
      newFiles.delete(fileName);
      
      // Set a new active file if we're closing the current one
      if (fileName === activeFileName) {
        const newActiveFile = Array.from(newFiles.keys())[0];
        setActiveFileName(newActiveFile);
        setCode(newFiles.get(newActiveFile) || '');
      }
      
      return newFiles;
    });
  };
  
  const switchToFile = (fileName: string) => {
    setActiveFileName(fileName);
    setCode(openFiles.get(fileName) || '');
  };
  
  // Calculate position for collaborator cursors
  const getCollaboratorStyles = (position: { line: number; ch: number }) => {
    const lineHeight = 24; // approximate line height
    const charWidth = 9; // approximate character width
    
    return {
      top: `${position.line * lineHeight}px`,
      left: `${position.ch * charWidth}px`
    };
  };

  const toggleTerminal = () => {
    setShowTerminal(!showTerminal);
  };

  const handleTerminalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerminalInput(e.target.value);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!terminalInput.trim()) return;
    
    // Add user input to terminal output
    const newOutput = [...terminalOutput.slice(0, -1), `> ${terminalInput}`, ''];
    
    // Process command
    if (terminalInput === 'clear') {
      setTerminalOutput(["Terminal cleared", "> "]);
    } else if (terminalInput === 'help') {
      setTerminalOutput([
        ...newOutput.slice(0, -1),
        "Available commands:",
        " - help: Show this help message",
        " - clear: Clear the terminal",
        " - npm install <package>: Install a package",
        " - ls: List files in current directory",
        " - exit: Close the terminal",
        "> "
      ]);
    } else if (terminalInput.startsWith('npm install')) {
      const packageName = terminalInput.split(' ')[2];
      setTerminalOutput([
        ...newOutput.slice(0, -1),
        `Installing ${packageName}...`,
        `+ ${packageName}@latest`,
        "added 1 package, and audited 152 packages in 2.5s",
        "> "
      ]);
    } else if (terminalInput === 'ls') {
      setTerminalOutput([
        ...newOutput.slice(0, -1),
        "node_modules/",
        "public/",
        "src/",
        "package.json",
        "README.md",
        "tsconfig.json",
        "> "
      ]);
    } else if (terminalInput === 'exit') {
      setShowTerminal(false);
      setTerminalOutput([...terminalOutput.slice(0, -1), `> ${terminalInput}`, "> "]);
    } else {
      setTerminalOutput([
        ...newOutput.slice(0, -1),
        `Command not found: ${terminalInput}`,
        "> "
      ]);
    }
    
    setTerminalInput('');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-border p-2 flex justify-between items-center">
        <div className="flex overflow-x-auto hide-scrollbar" style={{ maxWidth: 'calc(100% - 160px)' }}>
          {Array.from(openFiles.keys()).map((fileName) => (
            <div 
              key={fileName}
              className={`flex items-center px-3 py-1 mr-1 rounded-sm cursor-pointer text-xs ${
                activeFileName === fileName ? 'bg-secondary' : 'hover:bg-secondary/50'
              }`}
              onClick={() => switchToFile(fileName)}
            >
              <FileText className="h-3.5 w-3.5 mr-1" />
              <span className="truncate" style={{ maxWidth: '100px' }}>{fileName}</span>
              <button 
                className="ml-1 p-0.5 hover:bg-muted rounded-sm" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  closeFile(fileName); 
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex items-center ml-4 gap-2">
          <Button variant="ghost" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={handleRun}>
            <Play className="h-4 w-4 mr-1" />
            Run
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleTerminal}>
            <Terminal className="h-4 w-4" />
          </Button>
          <div className="flex -space-x-2">
            {mockCollaborators.map(collab => (
              <div key={collab.id} className="relative" title={collab.name}>
                <div 
                  className="w-7 h-7 rounded-full border-2 border-background flex items-center justify-center"
                  style={{ backgroundColor: collab.color }}
                >
                  {collab.name.charAt(0)}
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" className="rounded-full w-7 h-7 p-0">
              <Users className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex-grow relative flex flex-col">
        <div className={`h-${showTerminal ? '2/3' : 'full'} relative overflow-auto`}>
          <div className="absolute inset-0 overflow-auto font-mono text-sm bg-code">
            <Textarea
              value={code}
              onChange={handleCodeChange}
              className="w-full h-full bg-transparent border-0 outline-none resize-none text-code-foreground p-4 font-mono"
              spellCheck="false"
              style={{ 
                minHeight: '100%', 
                fontFamily: 'monospace',
                lineHeight: '1.5',
                whiteSpace: 'pre',
                overflowWrap: 'normal',
                overflowX: 'auto',
                tabSize: 2
              }}
            />
            
            {/* Collaborator cursors */}
            {mockCollaborators.map(collab => (
              <div key={collab.id} className="absolute pointer-events-none" style={getCollaboratorStyles(collab.position)}>
                <div 
                  className="absolute w-0.5 h-5 cursor-blink"
                  style={{ backgroundColor: collab.color }}
                ></div>
                <div 
                  className="absolute px-1 py-0.5 text-xs text-white rounded-sm -mt-5 whitespace-nowrap"
                  style={{ backgroundColor: collab.color }}
                >
                  {collab.name}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Terminal */}
        {showTerminal && (
          <div className="h-1/3 border-t border-border bg-black text-green-500 font-mono overflow-hidden flex flex-col">
            <div className="flex justify-between items-center px-3 py-1 bg-gray-900 text-gray-300 text-xs">
              <div>Terminal</div>
              <button 
                className="hover:text-white" 
                onClick={() => setShowTerminal(false)}
              >
                ×
              </button>
            </div>
            <div className="flex-grow overflow-auto p-2">
              {terminalOutput.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap text-xs">
                  {line}
                </div>
              ))}
            </div>
            <form onSubmit={handleTerminalSubmit} className="flex px-2 py-1 border-t border-gray-800">
              <input
                type="text"
                value={terminalInput}
                onChange={handleTerminalInputChange}
                className="flex-grow bg-transparent text-green-500 text-xs outline-none"
                placeholder="Type a command..."
                autoFocus
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;