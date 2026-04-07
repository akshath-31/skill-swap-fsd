import { BookOpen } from "lucide-react";
export const EmptyState = ({ title, description, action }) => {
    return (<div className="empty-state">
      <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
        <BookOpen className="w-10 h-10 text-muted-foreground"/>
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>
      {action}
    </div>);
};
