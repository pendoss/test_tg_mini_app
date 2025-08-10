import { Button } from "./ui/button";
import { Home, User, Plus } from "lucide-react";

interface BottomNavigationProps {
  currentTab: "home" | "profile";
  onTabChange: (tab: "home" | "profile") => void;
  onCreatePlan: () => void;
}

export function BottomNavigation({ currentTab, onTabChange, onCreatePlan }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border">
      <div className="grid grid-cols-3 gap-0">
        {/* Главная */}
        <Button
          variant="ghost"
          className={`h-16 rounded-none flex flex-col gap-1 ${
            currentTab === "home" 
              ? "text-primary bg-primary/10" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => onTabChange("home")}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs">Главная</span>
        </Button>

        {/* Создать план - центральная кнопка */}
        <Button
          className="h-16 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground flex flex-col gap-1"
          onClick={onCreatePlan}
        >
          <Plus className="w-5 h-5" />
          <span className="text-xs">Создать</span>
        </Button>

        {/* Профиль */}
        <Button
          variant="ghost"
          className={`h-16 rounded-none flex flex-col gap-1 ${
            currentTab === "profile" 
              ? "text-primary bg-primary/10" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          onClick={() => onTabChange("profile")}
        >
          <User className="w-5 h-5" />
          <span className="text-xs">Профиль</span>
        </Button>
      </div>
    </div>
  );
}