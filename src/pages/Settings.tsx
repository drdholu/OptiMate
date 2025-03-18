
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

type SettingItem = {
  id: string;
  label: string;
  description: string;
  value: boolean;
};

const defaultSettings: SettingItem[] = [
  {
    id: 'autoSave',
    label: 'Auto-save conversations',
    description: 'Automatically save all conversations',
    value: true,
  },
  {
    id: 'codeHighlight',
    label: 'Syntax highlighting',
    description: 'Highlight code syntax in messages',
    value: true,
  },
  {
    id: 'codeCompletion',
    label: 'Code completion',
    description: 'Suggest code completions as you type',
    value: true,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'Receive notifications for new messages',
    value: false,
  },
];

const Settings = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [settings, setSettings] = useState<SettingItem[]>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }
  
  const handleToggleSetting = (id: string) => {
    setSettings(prevSettings =>
      prevSettings.map(setting =>
        setting.id === id ? { ...setting, value: !setting.value } : setting
      )
    );
  };
  
  const handleSaveSettings = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    });
    
    setIsSaving(false);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16 pb-12">
        <div className="container max-w-4xl mx-auto px-4 animate-fade-in">
          <div className="flex items-center gap-4 py-5">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="h-9 w-9"
            >
              <ArrowLeft size={18} />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          
          <div className="glass-card p-6 space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-medium">Preferences</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Customize your experience with OptiMate
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-5">
              {settings.map(setting => (
                <div key={setting.id} className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <Label htmlFor={setting.id} className="text-base">
                      {setting.label}
                    </Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {setting.description}
                    </p>
                  </div>
                  <Switch
                    id={setting.id}
                    checked={setting.value}
                    onCheckedChange={() => handleToggleSetting(setting.id)}
                  />
                </div>
              ))}
            </div>
            
            <Separator />
            
            <div className="flex justify-end">
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? (
                  <span className="flex items-center gap-1">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Save size={16} />
                    Save Changes
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
