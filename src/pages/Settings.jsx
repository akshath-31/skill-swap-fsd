import { useState } from "react";
import { User, Lock, Bell, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
const Settings = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("account");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [accountData, setAccountData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        newSkillAlerts: true,
        sessionReminders: true,
        marketingEmails: false,
    });
    const handleAccountSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        toast({
            title: "Account updated",
            description: "Your account settings have been saved.",
        });
    };
    const handlePasswordSave = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast({
                title: "Passwords don't match",
                description: "Please make sure your passwords match.",
                variant: "destructive",
            });
            return;
        }
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        toast({
            title: "Password updated",
            description: "Your password has been changed successfully.",
        });
    };
    const tabs = [
        { id: "account", label: "Account", icon: User },
        { id: "password", label: "Password", icon: Lock },
        { id: "preferences", label: "Preferences", icon: Bell },
    ];
    return (<div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border pb-4">
        {tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"}`}>
            <tab.icon className="w-4 h-4"/>
            <span className="font-medium">{tab.label}</span>
          </button>))}
      </div>

      {/* Tab Content */}
      <div className="bg-card border border-border rounded-xl p-6">
        {activeTab === "account" && (<form onSubmit={handleAccountSave} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input type="text" value={accountData.name} onChange={(e) => setAccountData({ ...accountData, name: e.target.value })} className="h-11 rounded-xl"/>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <Input type="email" value={accountData.email} onChange={(e) => setAccountData({ ...accountData, email: e.target.value })} className="h-11 rounded-xl"/>
            </div>

            <Button type="submit" className="rounded-xl" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Save Changes"}
            </Button>
          </form>)}

        {activeTab === "password" && (<form onSubmit={handlePasswordSave} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Current Password</label>
              <Input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} className="h-11 rounded-xl" required/>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">New Password</label>
              <Input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} className="h-11 rounded-xl" required/>
              <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirm New Password</label>
              <Input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} className="h-11 rounded-xl" required/>
            </div>

            <Button type="submit" className="rounded-xl" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : "Update Password"}
            </Button>
          </form>)}

        {activeTab === "preferences" && (<div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive email updates about your activity</p>
              </div>
              <Switch checked={preferences.emailNotifications} onCheckedChange={(checked) => setPreferences({ ...preferences, emailNotifications: checked })}/>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">New Skill Alerts</h4>
                <p className="text-sm text-muted-foreground">Get notified when new skills match your interests</p>
              </div>
              <Switch checked={preferences.newSkillAlerts} onCheckedChange={(checked) => setPreferences({ ...preferences, newSkillAlerts: checked })}/>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Session Reminders</h4>
                <p className="text-sm text-muted-foreground">Receive reminders before your scheduled sessions</p>
              </div>
              <Switch checked={preferences.sessionReminders} onCheckedChange={(checked) => setPreferences({ ...preferences, sessionReminders: checked })}/>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">Marketing Emails</h4>
                <p className="text-sm text-muted-foreground">Receive tips, updates, and promotional content</p>
              </div>
              <Switch checked={preferences.marketingEmails} onCheckedChange={(checked) => setPreferences({ ...preferences, marketingEmails: checked })}/>
            </div>
          </div>)}
      </div>
    </div>);
};
export default Settings;
