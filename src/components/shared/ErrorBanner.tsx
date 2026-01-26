import { AlertCircle, X } from "lucide-react";

interface ErrorBannerProps {
  message: string;
  onDismiss?: () => void;
}

export const ErrorBanner = ({ message, onDismiss }: ErrorBannerProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-destructive/10 border border-destructive/20 rounded-xl animate-fade-in">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-destructive" />
        <span className="text-sm text-destructive">{message}</span>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 hover:bg-destructive/20 rounded transition-colors"
        >
          <X className="w-4 h-4 text-destructive" />
        </button>
      )}
    </div>
  );
};
