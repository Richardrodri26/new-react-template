import { Button, ButtonProps } from "@/components/ui/button";
import { Plus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface FloatingButtonProps extends ButtonProps {
  icon?: LucideIcon;
  initialOpen?: boolean;
  showText?: boolean;
  text?: string;
  subButtons?: Array<{
    icon: LucideIcon;
    text: string;
    onClick: () => void;
  }>;
  hideButton?: boolean;
}

const LOCAL_STORAGE_KEY = "floating-button-position";

export const FloatingButton = ({
  icon: Icon = Plus,
  initialOpen = false,
  showText = false,
  text = "Acción",
  subButtons = [],
  className,
  hideButton = false,
  ...props
}: FloatingButtonProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [draggingNow, setDraggingNow] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Leer desde localStorage al montar
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === "number" && typeof parsed.y === "number") {
          setPosition({ x: parsed.x, y: parsed.y });
        }
      }
    } catch (err) {
      console.error("Error reading position from localStorage:", err);
    }
  }, []);

  // Guardar en localStorage
  const savePosition = (pos: { x: number; y: number }) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pos));
    } catch (err) {
      console.error("Error saving position to localStorage:", err);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;

      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        setDraggingNow(true);
      }

      const newPosition = {
        x: position.x + dx,
        y: position.y + dy,
      };

      setPosition(newPosition);
      savePosition(newPosition);

      dragStart.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setTimeout(() => setDraggingNow(false), 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, position]);

  if (hideButton) return null;

  return (
    <>
      {/* Botón principal */}
      <div
        className="fixed z-50"
        style={{ left: position.x, top: position.y }}
      >
        <Button
          className={cn(
            "rounded-full shadow-lg transition-all duration-300",
            "hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "flex items-center justify-center h-14 w-14 cursor-move select-none",
            className
          )}
          size="icon"
          onMouseDown={(e) => {
            setIsDragging(true);
            dragStart.current = { x: e.clientX, y: e.clientY };
          }}
          onClick={(e) => {
            if (draggingNow) {
              e.preventDefault();
              e.stopPropagation();
              return;
            }
            setIsOpen(!isOpen);
          }}
          {...props}
        >
          <Icon
            className={cn(
              "h-5 w-5 transition-transform",
              isOpen && subButtons.length > 0 ? "rotate-45" : "rotate-0"
            )}
          />
          <span className="sr-only">{text}</span>
        </Button>
      </div>

      {/* Sub-botones */}
      {subButtons.length > 0 && (
        <div
          className={cn(
            "fixed flex flex-col gap-2 transition-all duration-300",
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
          style={{ left: position.x, top: position.y - 80 }}
        >
          {subButtons.map((button, index) => (
            <Button
              key={index}
              variant="outline"
              className={cn(
                "h-12 w-12 rounded-full shadow-md transition-all duration-300 ease-out",
                "hover:bg-primary hover:text-primary-foreground",
                showText && "w-auto px-4 gap-2"
              )}
              onClick={button.onClick}
              style={{
                transitionDelay: `${index * 75}ms`,
              }}
            >
              <button.icon className="h-4 w-4" />
              {showText && <span>{button.text}</span>}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};
