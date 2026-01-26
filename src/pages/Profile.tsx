import { User, BookOpen, Users, Star, Mail, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface SkillItem {
  id: string;
  title: string;
  date: string;
}

const skillsLearned: SkillItem[] = [
  { id: "1", title: "UI/UX Design Fundamentals", date: "2024-01-14" },
  { id: "2", title: "Spanish Conversation", date: "2024-01-10" },
];

const skillsTaught: SkillItem[] = [
  { id: "1", title: "JavaScript Fundamentals", date: "2024-01-05" },
];

const Profile = () => {
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your profile and view your learning journey</p>
      </div>

      {/* Profile Card */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-2xl bg-primary flex items-center justify-center">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-2xl object-cover" />
            ) : (
              <span className="text-3xl font-bold text-primary-foreground">
                {user ? getInitials(user.name) : "?"}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-1">{user?.name}</h2>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Mail className="w-4 h-4" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Skills Learned</p>
                  <p className="font-semibold text-foreground">{skillsLearned.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <Users className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Skills Taught</p>
                  <p className="font-semibold text-foreground">{skillsTaught.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Star className="w-4 h-4 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="font-semibold text-foreground">4.8</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills Learned */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Skills Learned</h3>
          </div>
          {skillsLearned.length === 0 ? (
            <p className="text-sm text-muted-foreground">No skills learned yet</p>
          ) : (
            <div className="space-y-3">
              {skillsLearned.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <span className="text-sm font-medium text-foreground">{skill.title}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(skill.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills Taught */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Skills Taught</h3>
          </div>
          {skillsTaught.length === 0 ? (
            <p className="text-sm text-muted-foreground">No skills taught yet</p>
          ) : (
            <div className="space-y-3">
              {skillsTaught.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                >
                  <span className="text-sm font-medium text-foreground">{skill.title}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(skill.date)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Ratings Placeholder */}
        <div className="bg-card border border-border rounded-xl p-5 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-warning" />
            <h3 className="font-semibold text-foreground">Reviews & Ratings</h3>
          </div>
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No reviews yet</p>
            <p className="text-sm text-muted-foreground mt-1">Reviews will appear here after your sessions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
