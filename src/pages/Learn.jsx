import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SkillCard, SkillCardSkeleton } from "@/components/skills/SkillCard";
import { SkillDetailModal } from "@/components/skills/SkillDetailModal";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorBanner } from "@/components/shared/ErrorBanner";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchSkills } from "@/lib/mongodb-api";
const categories = ["All", "Design", "Development", "Marketing", "Music", "Language", "Business"];
const Learn = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSkill, setSelectedSkill] = useState(null);
    const { toast } = useToast();
    const { user } = useAuth();
    const { data: skills = [], isLoading, error } = useQuery({
        queryKey: ['skills', { type: 'offer', excludeUid: user?.uid }],
        queryFn: () => fetchSkills({ type: 'offer', excludeUid: user?.uid }),
    });
    const filteredSkills = skills.filter((skill) => {
        const matchesSearch = skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            skill.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    const handleLearnSkill = (skill) => {
        toast({
            title: "Skill request sent!",
            description: `You've requested to learn "${skill.title}" from ${skill.teacherName}.`,
        });
        setSelectedSkill(null);
    };
    return (<div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Discover Skills</h1>
        <p className="text-muted-foreground">Find and learn new skills from our community of experts</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
        <Input type="text" placeholder="Search skills, topics, or instructors..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-search pl-12 h-14 text-base"/>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground"/>
        {categories.map((category) => (<button key={category} onClick={() => setSelectedCategory(category)} className={`chip-filter ${selectedCategory === category ? "chip-filter-active" : ""}`}>
            {category}
          </button>))}
      </div>

      {/* Error Banner */}
      {error && (<div className="mb-6">
          <ErrorBanner message={error instanceof Error ? error.message : "An error occurred"}/>
        </div>)}

      {/* Skills Grid */}
      {isLoading ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (<SkillCardSkeleton key={i}/>))}
        </div>) : filteredSkills.length === 0 ? (<EmptyState title="No skills found" description="We couldn't find any skills matching your search. Try adjusting your filters or search terms."/>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (<SkillCard key={skill._id} skill={{
                    ...skill,
                    id: skill._id, // Map _id to id for component compatibility
                    teacher: { name: skill.teacherName, avatar: skill.teacherAvatar }
                }} onViewDetails={setSelectedSkill}/>))}
        </div>)}

      {/* Skill Detail Modal */}
      {selectedSkill && (<SkillDetailModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} onLearn={handleLearnSkill}/>)}
    </div>);
};
export default Learn;
