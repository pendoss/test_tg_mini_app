import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Анализируем ваши данные...",
    "Подбираем упражнения...", 
    "Составляем меню...",
    "Рассчитываем БЖУ...",
    "Финализируем план..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        // Обновляем текущий шаг
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        if (stepIndex < steps.length) {
          setCurrentStep(stepIndex);
        }
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 50); // Заполняется за ~5 секунд

    return () => clearInterval(timer);
  }, [onComplete, steps.length]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 space-y-6 text-center">
          {/* Иконка загрузки */}
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <div className="space-y-2">
            <h2>Создаем ваш план</h2>
            <p className="text-muted-foreground">
              {steps[currentStep]}
            </p>
          </div>
          
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">
              {progress}% завершено
            </p>
          </div>
          
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>🔍 Анализируем базу знаний</p>
            <p>🤖 Используем ИИ для персонализации</p>
            <p>📋 Формируем итоговый план</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}