import { X, Star, Coins, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
export const SkillDetailModal = ({ skill, onClose, onLearn }) => {
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };
    return (<>
      <div className="modal-overlay" onClick={onClose}/>
      <div className="modal-content p-6 animate-scale-in">
        <div className="flex items-start justify-between mb-6">
          <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
            {skill.category}
          </span>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5 text-muted-foreground"/>
          </button>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-3">{skill.title}</h2>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1 text-warning">
            <Star className="w-5 h-5 fill-current"/>
            <span className="font-semibold text-foreground">{skill.rating}</span>
            <span className="text-sm text-muted-foreground">({skill.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center gap-1.5 text-primary">
            <Coins className="w-5 h-5"/>
            <span className="font-semibold">{skill.credits} credits</span>
          </div>
        </div>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          {skill.description}
        </p>

        <div className="bg-muted/50 rounded-xl p-4 mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3">What you'll learn</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5"/>
              <span className="text-sm text-muted-foreground">Fundamentals and core concepts</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5"/>
              <span className="text-sm text-muted-foreground">Hands-on practical exercises</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-success mt-0.5"/>
              <span className="text-sm text-muted-foreground">Real-world application skills</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-4 p-4 border border-border rounded-xl mb-6">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            {skill.teacher.avatar ? (<img src={skill.teacher.avatar} alt={skill.teacher.name} className="w-full h-full rounded-full object-cover"/>) : (<span className="text-sm font-medium text-secondary-foreground">
                {getInitials(skill.teacher.name)}
              </span>)}
          </div>
          <div>
            <h4 className="font-medium text-foreground">{skill.teacher.name}</h4>
            <p className="text-sm text-muted-foreground">Expert Instructor</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Clock className="w-4 h-4"/>
          <span>Usually responds within 24 hours</span>
        </div>

        <Button onClick={() => onLearn(skill)} className="w-full h-12 rounded-xl font-medium">
          Learn this skill for {skill.credits} credits
        </Button>
      </div>
    </>);
};
