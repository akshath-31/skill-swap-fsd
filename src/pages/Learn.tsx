import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SkillCard, SkillCardSkeleton, Skill } from "@/components/skills/SkillCard";
import { SkillDetailModal } from "@/components/skills/SkillDetailModal";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorBanner } from "@/components/shared/ErrorBanner";
import { useToast } from "@/hooks/use-toast";

const categories = ["All", "Design", "Development", "Marketing", "Music", "Language", "Business"];

const dummySkills: Skill[] = [
  {
    id: "1",
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of user interface and user experience design. We'll cover wireframing, prototyping, and design systems.",
    category: "Design",
    teacher: { name: "Sarah Chen", avatar: "" },
    credits: 25,
    rating: 4.9,
    reviewCount: 127,
  },
  {
    id: "2",
    title: "React Development Basics",
    description: "Master React from scratch. Learn components, hooks, state management, and build real-world applications.",
    category: "Development",
    teacher: { name: "Mike Johnson", avatar: "" },
    credits: 30,
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: "3",
    title: "Digital Marketing Strategy",
    description: "Comprehensive guide to digital marketing including SEO, social media, content marketing, and analytics.",
    category: "Marketing",
    teacher: { name: "Emily Davis", avatar: "" },
    credits: 20,
    rating: 4.7,
    reviewCount: 64,
  },
  {
    id: "4",
    title: "Piano for Beginners",
    description: "Start your musical journey with piano. Learn to read sheet music, basic chords, and play simple songs.",
    category: "Music",
    teacher: { name: "David Lee", avatar: "" },
    credits: 35,
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: "5",
    title: "Spanish Conversation",
    description: "Practice conversational Spanish with a native speaker. Improve pronunciation, vocabulary, and fluency.",
    category: "Language",
    teacher: { name: "Maria Garcia", avatar: "" },
    credits: 15,
    rating: 4.6,
    reviewCount: 42,
  },
  {
    id: "6",
    title: "Startup Business Planning",
    description: "Learn how to create a solid business plan, understand market research, and prepare for investor pitches.",
    category: "Business",
    teacher: { name: "James Wilson", avatar: "" },
    credits: 40,
    rating: 4.8,
    reviewCount: 78,
  },
];

const Learn = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setSkills(dummySkills);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLearnSkill = (skill: Skill) => {
    toast({
      title: "Skill request sent!",
      description: `You've requested to learn "${skill.title}" from ${skill.teacher.name}.`,
    });
    setSelectedSkill(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Discover Skills</h1>
        <p className="text-muted-foreground">Find and learn new skills from our community of experts</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search skills, topics, or instructors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-search pl-12 h-14 text-base"
        />
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`chip-filter ${selectedCategory === category ? "chip-filter-active" : ""}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6">
          <ErrorBanner message={error} onDismiss={() => setError(null)} />
        </div>
      )}

      {/* Skills Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkillCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredSkills.length === 0 ? (
        <EmptyState
          title="No skills found"
          description="We couldn't find any skills matching your search. Try adjusting your filters or search terms."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onViewDetails={setSelectedSkill}
            />
          ))}
        </div>
      )}

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <SkillDetailModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onLearn={handleLearnSkill}
        />
      )}
    </div>
  );
};

export default Learn;
