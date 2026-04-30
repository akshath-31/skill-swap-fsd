import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Users, Star, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorBanner } from "@/components/shared/ErrorBanner";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchSkills, createSkill, deleteSkill } from "@/lib/mongodb-api";
const categories = ["Design", "Development", "Marketing", "Music", "Language", "Business"];
const Teach = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const { toast } = useToast();
    const { data: skills = [], isLoading: isFetching, error } = useQuery({
        queryKey: ['skills', { uid: user?.uid }],
        queryFn: () => {
            console.log('Fetching skills for UID:', user?.uid);
            return user ? fetchSkills({ uid: user.uid, type: 'offer' }) : Promise.resolve([]);
        },
        enabled: !!user,
    });
    useEffect(() => {
        console.log('Current Teach list:', skills);
    }, [skills]);
    const createMutation = useMutation({
        mutationFn: createSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skills'] });
            toast({
                title: "Skill posted!",
                description: "Your skill is now visible to learners.",
            });
            setIsModalOpen(false);
            setFormData({ title: "", description: "", category: "", credits: "" });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to post skill to MongoDB.",
                variant: "destructive",
            });
        }
    });
    const deleteMutation = useMutation({
        mutationFn: deleteSkill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['skills'] });
            toast({
                title: "Skill removed",
                description: "Your skill has been deleted from MongoDB.",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to delete skill from MongoDB.",
                variant: "destructive",
            });
        }
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        credits: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user)
            return;
        createMutation.mutate({
            uid: user.uid,
            teacherName: user.name,
            teacherAvatar: user.avatar,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            credits: parseInt(formData.credits),
            type: 'offer',
        });
    };
    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };
    return (<div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Skills</h1>
          <p className="text-muted-foreground">Manage the skills you're offering to the community</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="rounded-xl px-6">
          <Plus className="w-4 h-4 mr-2"/>
          Post a Skill
        </Button>
      </div>

      {error && (<div className="mb-6">
          <ErrorBanner message={error instanceof Error ? error.message : "Failed to load skills"}/>
        </div>)}

      {isFetching && (<div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary"/>
        </div>)}

      {skills.length === 0 ? (<EmptyState title="No skills posted yet" description="Share your first skill with the community and start earning credits." action={<Button onClick={() => setIsModalOpen(true)} className="rounded-xl">
              <Plus className="w-4 h-4 mr-2"/>
              Post Your First Skill
            </Button>}/>) : (<div className="space-y-4">
          {skills.map((skill) => (<div key={skill._id} className="bg-card border border-border rounded-xl p-5 hover:shadow-soft transition-shadow animate-fade-in">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{skill.title}</h3>
                    <span className="px-2.5 py-0.5 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                      {skill.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {skill.description}
                  </p>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="w-4 h-4"/>
                      <span>{skill.students} students</span>
                    </div>
                    {skill.rating > 0 && (<div className="flex items-center gap-1 text-warning">
                        <Star className="w-4 h-4 fill-current"/>
                        <span className="text-foreground">{skill.rating}</span>
                      </div>)}
                    <div className="text-primary font-medium">
                      {skill.credits} credits
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4 text-muted-foreground"/>
                  </button>
                  <button onClick={() => handleDelete(skill._id)} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-destructive"/>
                  </button>
                </div>
              </div>
            </div>))}
        </div>)}

      {/* Post Skill Modal */}
      {isModalOpen && (<>
          <div className="modal-overlay" onClick={() => setIsModalOpen(false)}/>
          <div className="modal-content p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Post a New Skill</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X className="w-5 h-5 text-muted-foreground"/>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Skill Title</label>
                <Input type="text" placeholder="e.g., Python Programming Basics" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="h-11 rounded-xl" required/>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea placeholder="Describe what you'll teach and what learners will gain..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="min-h-[100px] rounded-xl resize-none" required/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full h-11 px-3 bg-background border border-input rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-ring" required>
                    <option value="">Select category</option>
                    {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Credits Required</label>
                  <Input type="number" placeholder="e.g., 25" min="1" value={formData.credits} onChange={(e) => setFormData({ ...formData, credits: e.target.value })} className="h-11 rounded-xl" required/>
                </div>
              </div>

              <Button type="submit" className="w-full h-11 rounded-xl" disabled={createMutation.isPending}>
                {createMutation.isPending ? (<Loader2 className="w-5 h-5 animate-spin"/>) : ("Post Skill")}
              </Button>
            </form>
          </div>
        </>)}
    </div>);
};
export default Teach;
