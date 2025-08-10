import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Download, Save, ChefHat, Dumbbell, Target, Clock, User, ArrowLeft } from "lucide-react";

interface WeeklyPlanProps {
  planData: any;
  onSave: () => void;
  onDownload: () => void;
  onCreateNew: () => void;
  onViewProfile?: () => void;
  onBackToProfile?: () => void;
}

export function WeeklyPlan({ planData: _planData, onSave, onDownload, onCreateNew, onViewProfile, onBackToProfile }: WeeklyPlanProps) {
  const daysOfWeek = [
    "Понедельник", "Вторник", "Среда", "Четверг", 
    "Пятница", "Суббота", "Воскресенье"
  ];

  const mockPlan = {
    goal: "Похудение",
    totalCalories: 1800,
    macros: { proteins: 135, carbs: 180, fats: 60 },
    workouts: {
      "Понедельник": {
        type: "Кардио + силовая",
        duration: "45 мин",
        exercises: [
          "Разминка - 5 мин",
          "Приседания - 3x15",
          "Отжимания - 3x10", 
          "Планка - 3x30 сек",
          "Кардио - 20 мин"
        ]
      },
      "Среда": {
        type: "Силовая тренировка",
        duration: "50 мин",
        exercises: [
          "Разминка - 5 мин",
          "Жим лежа - 4x8",
          "Тяга блока - 4x10",
          "Подъемы на бицепс - 3x12",
          "Заминка - 5 мин"
        ]
      },
      "Пятница": {
        type: "Функциональная",
        duration: "40 мин",
        exercises: [
          "Разминка - 5 мин",
          "Берпи - 3x8",
          "Выпады - 3x12",
          "Скручивания - 3x15",
          "Растяжка - 10 мин"
        ]
      }
    },
    meals: {
      "Понедельник": {
        breakfast: {
          name: "Овсянка с ягодами",
          calories: 320,
          description: "Овсяные хлопья, черника, миндаль, мед"
        },
        lunch: {
          name: "Куриная грудка с овощами",
          calories: 450,
          description: "Запеченная грудка, брокколи, киноа"
        },
        dinner: {
          name: "Рыба с салатом",
          calories: 380,
          description: "Лосось на пару, листовой салат, авокадо"
        },
        snacks: [
          { name: "Греческий йогурт", calories: 120 },
          { name: "Яблоко с орехами", calories: 150 }
        ]
      }
      // Остальные дни будут аналогично
    }
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Заголовок */}
      <div className="space-y-4">
        {onBackToProfile && (
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={onBackToProfile}
              className="p-0 h-auto hover:bg-transparent"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Назад к профилю
            </Button>
          </div>
        )}
        
        <div className="text-center space-y-2">
          <h1>Ваш персональный план</h1>
          <p className="text-muted-foreground">
            Готов план на неделю специально для вас
          </p>
        </div>
      </div>

      {/* Краткая сводка */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Цель: {mockPlan.goal}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">{mockPlan.totalCalories}</p>
              <p className="text-sm text-muted-foreground">ккал/день</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-sm text-muted-foreground">тренировки</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-center gap-4">
            <Badge variant="secondary">Б: {mockPlan.macros.proteins}г</Badge>
            <Badge variant="secondary">Ж: {mockPlan.macros.fats}г</Badge>
            <Badge variant="secondary">У: {mockPlan.macros.carbs}г</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Основной план */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="workouts">Тренировки</TabsTrigger>
          <TabsTrigger value="nutrition">Питание</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {daysOfWeek.map((day, index) => (
              <Card key={day}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{day}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-primary" />
                    <span className="text-sm">
                      {(mockPlan.workouts as any)[day] ? 
                        `${(mockPlan.workouts as any)[day].type} (${(mockPlan.workouts as any)[day].duration})` : 
                        "День отдыха"
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-4 h-4 text-primary" />
                    <span className="text-sm">
                      {index === 0 ? "Овсянка, курица с овощами, рыба с салатом" : "Сбалансированное питание"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workouts" className="space-y-4">
          {Object.entries(mockPlan.workouts).map(([day, workout]: [string, any]) => (
            <Card key={day}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{day}</span>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {workout.duration}
                  </Badge>
                </CardTitle>
                <CardDescription>{workout.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {workout.exercises.map((exercise: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{exercise}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Понедельник - пример</CardTitle>
              <CardDescription>Общая калорийность: 1420 ккал</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(mockPlan.meals["Понедельник"]).map(([mealType, meal]: [string, any]) => {
                if (mealType === 'snacks') {
                  return (
                    <div key={mealType}>
                      <h4 className="font-medium mb-2">Перекусы</h4>
                      {meal.map((snack: any, index: number) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-accent/50 rounded">
                          <span className="text-sm">{snack.name}</span>
                          <Badge variant="secondary">{snack.calories} ккал</Badge>
                        </div>
                      ))}
                    </div>
                  );
                }
                
                const mealNames: Record<string, string> = {
                  breakfast: "Завтрак",
                  lunch: "Обед", 
                  dinner: "Ужин"
                };
                
                return (
                  <div key={mealType} className="space-y-2">
                    <h4 className="font-medium">{mealNames[mealType]}</h4>
                    <div className="flex justify-between items-center p-3 bg-accent/50 rounded">
                      <div>
                        <p className="font-medium">{meal.name}</p>
                        <p className="text-sm text-muted-foreground">{meal.description}</p>
                      </div>
                      <Badge variant="secondary">{meal.calories} ккал</Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Действия */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Button onClick={onSave} variant="outline" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Сохранить
          </Button>
          <Button onClick={onDownload} variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            PDF
          </Button>
        </div>
        
        {/* Показываем кнопку просмотра профиля только для новых планов */}
        {onViewProfile && !onBackToProfile && (
          <Button 
            onClick={onViewProfile} 
            variant="secondary" 
            className="w-full flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Посмотреть все планы в профиле
          </Button>
        )}
        
        <Button onClick={onCreateNew} className="w-full" size="lg">
          Создать новый план
        </Button>
      </div>
    </div>
  );
}