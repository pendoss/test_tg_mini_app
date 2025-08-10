import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ChefHat, Dumbbell, Target, Sparkles, Clock, Heart } from "lucide-react";

interface HomeScreenProps {
  onCreatePlan: () => void;
  onViewSavedPlan?: () => void;
  hasSavedPlan?: boolean;
}

export function HomeScreen({ onCreatePlan, onViewSavedPlan, hasSavedPlan = false }: HomeScreenProps) {
  const features = [
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Персональные цели",
      description: "План адаптируется под ваши цели и уровень подготовки"
    },
    {
      icon: <ChefHat className="w-6 h-6 text-primary" />,
      title: "Рецепты и меню",
      description: "Сбалансированное питание с учетом ваших предпочтений"
    },
    {
      icon: <Dumbbell className="w-6 h-6 text-primary" />,
      title: "Тренировки",
      description: "Эффективные упражнения для достижения результата"
    }
  ];

  const stats = [
    { number: "2000+", label: "��ецептов", icon: "🍽️" },
    { number: "500+", label: "Упражнений", icon: "💪" },
    { number: "7", label: "Дней планирования", icon: "📅" }
  ];

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Заголовок */}
      <div className="text-center space-y-4 pt-8">
        <div className="w-20 h-20 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
          <Heart className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">MyWellnessPlan</h1>
          <p className="text-muted-foreground">
            ИИ-помощник для здорового образа жизни
          </p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-1 w-fit mx-auto">
          <Sparkles className="w-3 h-3" />
          Powered by AI
        </Badge>
      </div>

      {/* Основная карточка */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/50">
        <CardHeader className="text-center">
          <CardTitle>Получите персональный план</CardTitle>
          <CardDescription>
            Индивидуальная программа тренировок и питания на неделю
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-card/50 rounded-lg">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h4 className="font-medium">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Статистика */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-1">
                <div className="text-2xl">{stat.icon}</div>
                <p className="text-xl font-bold text-primary">{stat.number}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Предыдущий план */}
      {hasSavedPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5" />
              Последний план
            </CardTitle>
            <CardDescription>
              У вас есть сохраненный план от 8 августа
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={onViewSavedPlan} 
              variant="outline" 
              className="w-full"
            >
              Посмотреть план
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Главная кнопка */}
      <div className="pt-4 space-y-3">
        <Button 
          onClick={onCreatePlan} 
          className="w-full" 
          size="lg"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Создать мой план на неделю
        </Button>
        
        <p className="text-center text-xs text-muted-foreground">
          Заполните анкету и получите план за 2 минуты
        </p>
      </div>

      {/* Дисклеймер */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <p className="text-xs text-muted-foreground text-center">
            💡 Планы носят рекомендательный характер и не заменяют консультацию врача или специалиста по питанию
          </p>
        </CardContent>
      </Card>
    </div>
  );
}