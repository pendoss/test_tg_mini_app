import { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { PlanForm } from "./components/PlanForm";
import { LoadingScreen } from "./components/LoadingScreen";
import { WeeklyPlan } from "./components/WeeklyPlan";
import { ProfileScreen } from "./components/ProfileScreen";
import { BottomNavigation } from "./components/BottomNavigation";
import { SystemMockup } from "./components/SystemMockup";
import { toast } from "sonner";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import { Layout } from "lucide-react";

type AppState = "home" | "form" | "loading" | "plan" | "profile";

interface FormData {
  goal: string;
  fitnessLevel: string;
  workoutsPerWeek: string;
  dietaryRestrictions: string[];
  allergies: string;
  additionalNotes: string;
}

interface SavedPlan {
  id: string;
  name: string;
  goal: string;
  createdAt: string;
  workoutsCount: number;
  totalCalories: number;
  isCompleted: boolean;
}

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>("home");
  const [currentTab, setCurrentTab] = useState<"home" | "profile">("home");
  const [planData, setPlanData] = useState<FormData | null>(null);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [planOpenedFrom, setPlanOpenedFrom] = useState<"new" | "profile">("new");
  const [showMockup, setShowMockup] = useState(false);

  const handleTabChange = (tab: "home" | "profile") => {
    setCurrentTab(tab);
    if (tab === "home") {
      setCurrentState("home");
    } else {
      setCurrentState("profile");
    }
  };

  const handleCreatePlan = () => {
    setCurrentState("form");
    setCurrentTab("home");
  };

  const handleFormSubmit = (data: FormData) => {
    setPlanData(data);
    setCurrentState("loading");
  };

  const handleLoadingComplete = () => {
    setCurrentState("plan");
    setPlanOpenedFrom("new"); // План создан заново
  };

  const handleSavePlan = () => {
    if (planData) {
      const newPlan: SavedPlan = {
        id: Date.now().toString(),
        name: `План ${getGoalName(planData.goal)} #${savedPlans.length + 1}`,
        goal: getGoalName(planData.goal),
        createdAt: new Date().toLocaleDateString('ru-RU', { 
          day: 'numeric', 
          month: 'long' 
        }),
        workoutsCount: parseInt(planData.workoutsPerWeek),
        totalCalories: 1800, // Mock данные
        isCompleted: false
      };
      
      setSavedPlans(prev => [newPlan, ...prev]);
      toast.success("План сохранен в вашем профиле");
    }
  };

  const handleDownloadPlan = () => {
    toast.success("PDF файл будет загружен");
  };

  const handleCreateNewPlan = () => {
    setPlanData(null);
    setCurrentState("home");
    setCurrentTab("home");
    setPlanOpenedFrom("new");
  };

  const handleBackToHome = () => {
    setCurrentState("home");
    setCurrentTab("home");
  };

  const handleViewSavedPlan = () => {
    setCurrentState("plan");
    setPlanOpenedFrom("new"); // Это для быстрого просмотра с главной
  };

  const handleViewPlan = (_planId: string) => {
    // Здесь можно загрузить конкретный план по ID
    setCurrentState("plan");
    setPlanOpenedFrom("profile"); // План открыт из профиля
  };

  const handleDeletePlan = (planId: string) => {
    setSavedPlans(prev => prev.filter(plan => plan.id !== planId));
    toast.success("План удален");
  };

  const handleBackFromProfile = () => {
    setCurrentState("home");
    setCurrentTab("home");
  };

  const handleBackToProfile = () => {
    setCurrentState("profile");
    setCurrentTab("profile");
  };

  const getGoalName = (goalValue: string): string => {
    const goalMap: Record<string, string> = {
      "weight-loss": "Похудение",
      "muscle-gain": "Набор мышечной массы", 
      "maintenance": "Поддержание формы",
      "endurance": "Улучшение выносливости"
    };
    return goalMap[goalValue] || goalValue;
  };

  const showBottomNav = currentState === "home" || currentState === "profile";

  return (
    <div className="max-w-md mx-auto bg-background min-h-screen relative">
      {/* Кнопка макета в правом верхнем углу */}
      <Button
        onClick={() => setShowMockup(true)}
        variant="ghost"
        size="sm"
        className="fixed top-4 right-4 z-40 bg-white/80 backdrop-blur-sm border shadow-sm"
      >
        <Layout className="w-4 h-4" />
      </Button>

      {currentState === "home" && (
        <HomeScreen 
          onCreatePlan={handleCreatePlan}
          onViewSavedPlan={handleViewSavedPlan}
          hasSavedPlan={savedPlans.length > 0}
        />
      )}
      
      {currentState === "profile" && (
        <ProfileScreen 
          onBack={handleBackFromProfile}
          onViewPlan={handleViewPlan}
          onDeletePlan={handleDeletePlan}
          savedPlans={savedPlans}
        />
      )}
      
      {currentState === "form" && (
        <PlanForm 
          onSubmit={handleFormSubmit}
          onBack={handleBackToHome}
        />
      )}
      
      {currentState === "loading" && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      
      {currentState === "plan" && (
        <WeeklyPlan 
          planData={planData}
          onSave={handleSavePlan}
          onDownload={handleDownloadPlan}
          onCreateNew={handleCreateNewPlan}
          onViewProfile={() => {
            setCurrentState("profile");
            setCurrentTab("profile");
          }}
          onBackToProfile={planOpenedFrom === "profile" ? handleBackToProfile : undefined}
        />
      )}

      {showBottomNav && (
        <BottomNavigation
          currentTab={currentTab}
          onTabChange={handleTabChange}
          onCreatePlan={handleCreatePlan}
        />
      )}
      
      <Toaster />
      
      {/* Добавляем отступ снизу, когда показана навигация */}
      {showBottomNav && <div className="h-16" />}

      {/* Макет системы */}
      <SystemMockup 
        isOpen={showMockup} 
        onClose={() => setShowMockup(false)} 
      />
    </div>
  );
}