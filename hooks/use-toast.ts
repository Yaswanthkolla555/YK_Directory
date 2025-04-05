import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
};

export function useToast() {
  return {
    toast: ({ title, description, variant }: ToastProps) => {
      if (variant === "destructive") {
        sonnerToast.error(title, {
          description,
          duration: 5000,
          style: {
            background: 'rgb(239 68 68)',
            color: 'white',
            border: 'none',
          },
        });
      } else if (variant === "success") {
        sonnerToast.success(title, {
          description,
          duration: 5000,
          style: {
            background: 'rgb(34 197 94)',
            color: 'white',
            border: 'none',
          },
        });
      } else {
        sonnerToast(title, {
          description,
          duration: 5000,
        });
      }
    },
  };
} 