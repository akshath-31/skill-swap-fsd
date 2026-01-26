import { Star, Coins, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  teacher: {
    name: string;
    avatar: string;
  };
  credits: number;
  rating: number;
  reviewCount: number;
}

interface SkillCardProps {
  skill: Skill;
  onViewDetails: (skill: Skill) => void;
}

export const SkillCard = ({ skill, onViewDetails }: SkillCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="card-skill animate-fade-in group">
      <div className="flex items-start justify-between mb-3">
        <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
          {skill.category}
        </span>
        <div className="flex items-center gap-1 text-warning">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-medium text-foreground">{skill.rating}</span>
          <span className="text-xs text-muted-foreground">({skill.reviewCount})</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
        {skill.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {skill.description}
      </p>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          {skill.teacher.avatar ? (
            <img src={skill.teacher.avatar} alt={skill.teacher.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <User className="w-4 h-4 text-secondary-foreground" />
          )}
        </div>
        <span className="text-sm text-foreground">{skill.teacher.name}</span>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-1.5 text-primary">
          <Coins className="w-4 h-4" />
          <span className="font-semibold">{skill.credits}</span>
          <span className="text-sm text-muted-foreground">credits</span>
        </div>
        <Button
          onClick={() => onViewDetails(skill)}
          variant="outline"
          size="sm"
          className="rounded-lg hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export const SkillCardSkeleton = () => (
  <div className="card-skill">
    <div className="flex items-start justify-between mb-3">
      <div className="skeleton-shimmer w-20 h-6 rounded-full" />
      <div className="skeleton-shimmer w-16 h-5" />
    </div>
    <div className="skeleton-shimmer w-3/4 h-6 mb-2" />
    <div className="skeleton-shimmer w-full h-10 mb-4" />
    <div className="flex items-center gap-3 mb-4">
      <div className="skeleton-shimmer w-8 h-8 rounded-full" />
      <div className="skeleton-shimmer w-24 h-4" />
    </div>
    <div className="flex items-center justify-between pt-4 border-t border-border">
      <div className="skeleton-shimmer w-20 h-5" />
      <div className="skeleton-shimmer w-24 h-8 rounded-lg" />
    </div>
  </div>
);
