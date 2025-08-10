import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  ArrowLeft,
  Calendar,
  Target,
  Dumbbell,
  ChefHat,
  Download,
  Eye,
  Trash2,
  TrendingUp,
} from "lucide-react";

interface ProfileScreenProps {
  onBack: () => void;
  onViewPlan: (planId: string) => void;
  onDeletePlan: (planId: string) => void;
  savedPlans: SavedPlan[];
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

export function ProfileScreen({
  onBack,
  onViewPlan,
  onDeletePlan,
  savedPlans,
}: ProfileScreenProps) {
  // Mock данные пользователя
  const user = {
    name: "Варя",
    initials: "ВП",
    joinDate: "Август 2024",
    totalPlans: savedPlans.length,
    completedPlans: savedPlans.filter(
      (plan) => plan.isCompleted,
    ).length,
    streak: 5, // дни подряд
  };

  // Mock данные планов
  const mockPlans: SavedPlan[] = [
    {
      id: "1",
      name: "План похудения #1",
      goal: "Похудение",
      createdAt: "10 августа",
      workoutsCount: 3,
      totalCalories: 1800,
      isCompleted: false,
    },
    {
      id: "2",
      name: "План набора массы",
      goal: "Набор мышечной массы",
      createdAt: "5 августа",
      workoutsCount: 4,
      totalCalories: 2200,
      isCompleted: true,
    },
    {
      id: "3",
      name: "План поддержания формы",
      goal: "Поддержание формы",
      createdAt: "1 августа",
      workoutsCount: 3,
      totalCalories: 2000,
      isCompleted: true,
    },
  ];

  const plans = savedPlans.length > 0 ? savedPlans : mockPlans;

  const getGoalColor = (goal: string) => {
    switch (goal) {
      case "Похудение":
        return "bg-red-100 text-red-700";
      case "Набор мышечной массы":
        return "bg-blue-100 text-blue-700";
      case "Поддержание формы":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-0 h-auto hover:bg-transparent"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Назад
        </Button>
      </div>

      {/* Профиль пользователя */}
      <Card>
        <CardHeader className="text-center pb-4">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-20 h-20">
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">
                Привет, {user.name}! 👋
              </CardTitle>
              <CardDescription>
                С нами с {user.joinDate}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">
                {user.totalPlans}
              </p>
              <p className="text-xs text-muted-foreground">
                планов
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">
                {user.completedPlans}
              </p>
              <p className="text-xs text-muted-foreground">
                завершено
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">
                {user.streak}
              </p>
              <p className="text-xs text-muted-foreground">
                дней подряд
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Статистика */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Ваш прогресс
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">
              Активность на неделе
            </span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div
                  key={day}
                  className={`w-3 h-3 rounded-sm ${
                    day <= 5 ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Выполнение планов</span>
              <span>
                {Math.round(
                  (user.completedPlans / user.totalPlans) * 100,
                )}
                %
              </span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{
                  width: `${(user.completedPlans / user.totalPlans) * 100}%`,
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Заголовок планов */}
      <div className="flex items-center justify-between">
        <h2>Мои планы</h2>
        <Badge variant="secondary">{plans.length} планов</Badge>
      </div>

      {/* Список планов */}
      <div className="space-y-4">
        {plans.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-2">
                У вас пока нет сохраненных планов
              </p>
              <p className="text-sm text-muted-foreground">
                Создайте свой первый план питания и тренировок
              </p>
            </CardContent>
          </Card>
        ) : (
          plans.map((plan) => (
            <Card key={plan.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      {plan.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={getGoalColor(plan.goal)}
                      >
                        <Target className="w-3 h-3 mr-1" />
                        {plan.goal}
                      </Badge>
                      {plan.isCompleted && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700"
                        >
                          Завершен
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {plan.createdAt}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Dumbbell className="w-3 h-3" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {plan.workoutsCount} тренировки
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <ChefHat className="w-3 h-3" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {plan.totalCalories} ккал
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => onViewPlan(plan.id)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Открыть
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {}}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeletePlan(plan.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Дополнительная информация */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              💾 Все ваши планы автоматически сохраняются
            </p>
            <p className="text-xs text-muted-foreground">
              Экспортируйте планы в PDF или поделитесь с
              тренером
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}