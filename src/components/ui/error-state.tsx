import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { XCircle } from "lucide-react";

interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  message: string;
  canRetry?: boolean;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Error",
  message,
  canRetry = true,
  onRetry = () => window.location.reload(),
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div className={cn("w-full mx-auto space-y-4", className)} {...props}>
      <Alert variant="destructive">
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4" />
          <AlertTitle>{title}</AlertTitle>
        </div>
        <AlertDescription className="flex flex-col space-y-2 mt-2">
          <p>{message}</p>
          {canRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="w-fit"
            >
              Try again
            </Button>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}
