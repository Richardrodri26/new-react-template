import { Button, ButtonProps } from "@/components/ui/button";
import { Plus, Settings, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface FloatingButtonProps extends ButtonProps {
  icon?: LucideIcon;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  initialOpen?: boolean;
  showText?: boolean;
  text?: string;
  subButtons?: Array<{
    icon: LucideIcon;
    text: string;
    onClick: () => void;
  }>;
}

export const FloatingButton = ({
  icon: Icon = Plus,
  position = "bottom-right",
  initialOpen = false,
  showText = false,
  text = "Acción",
  subButtons = [],
  className,
  ...props
}: FloatingButtonProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const positionClasses = {
    "bottom-right": "right-6 bottom-6",
    "bottom-left": "left-6 bottom-6",
    "top-right": "right-6 top-6",
    "top-left": "left-6 top-6",
  };

  const buttonClasses = cn(
    "fixed z-50 rounded-full shadow-lg transition-all duration-300",
    "hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "group flex items-center justify-center",
    positionClasses[position],
    isOpen && subButtons.length > 0 ? "h-14 w-14" : "h-12 w-12",
    className
  );

  return (
    <div className="fixed z-50">
      {/* Botón principal */}
      <Button
        className={buttonClasses}
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        <Icon className={cn(
          "h-5 w-5 transition-transform",
          isOpen && subButtons.length > 0 ? "rotate-45" : "rotate-0"
        )} />
        <span className="sr-only">{text}</span>
      </Button>

      {/* Sub-botones */}
      {subButtons.length > 0 && (
        <div className={cn(
          "fixed flex flex-col gap-2 transition-all duration-300",
          positionClasses[position],
          position.includes("bottom") ? "bottom-20" : "top-20",
          position.includes("right") ? "right-6" : "left-6",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}>
          {subButtons.map((button, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn(
                "h-12 w-12 rounded-full shadow-md transition-all duration-200",
                "hover:bg-primary hover:text-primary-foreground",
                showText && "w-auto px-4 gap-2"
              )}
              onClick={button.onClick}
            >
              <button.icon className="h-4 w-4" />
              {showText && <span>{button.text}</span>}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};