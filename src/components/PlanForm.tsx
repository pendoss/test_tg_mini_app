import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface PlanFormProps {
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

interface FormData {
  goal: string;
  fitnessLevel: string;
  workoutsPerWeek: string;
  dietaryRestrictions: string[];
  allergies: string;
  additionalNotes: string;
}

export function PlanForm({ onSubmit, onBack }: PlanFormProps) {
  const [formData, setFormData] = useState<FormData>({
    goal: "",
    fitnessLevel: "",
    workoutsPerWeek: "",
    dietaryRestrictions: [],
    allergies: "",
    additionalNotes: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const goals = [
    { value: "weight-loss", label: "Похудение" },
    { value: "muscle-gain", label: "Набор мышечной массы" },
    { value: "maintenance", label: "Поддержание формы" },
    { value: "endurance", label: "Улучшение выносливости" }
  ];

  const fitnessLevels = [
    { value: "beginner", label: "Начальный" },
    { value: "intermediate", label: "Средний" },
    { value: "advanced", label: "Продвинутый" }
  ];

  const dietaryOptions = [
    { value: "vegetarian", label: "Вегетарианство" },
    { value: "vegan", label: "Веганство" },
    { value: "lactose-free", label: "Без лактозы" },
    { value: "gluten-free", label: "Без глютена" },
    { value: "keto", label: "Кето-диета" },
    { value: "low-carb", label: "Низкоуглеводная" }
  ];

  const handleDietaryChange = (value: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        dietaryRestrictions: [...prev.dietaryRestrictions, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        dietaryRestrictions: prev.dietaryRestrictions.filter(item => item !== value)
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.goal) newErrors.goal = "Выберите цель";
    if (!formData.fitnessLevel) newErrors.fitnessLevel = "Выберите уровень подготовки";
    if (!formData.workoutsPerWeek) newErrors.workoutsPerWeek = "Выберите количество тренировок";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="p-0 h-auto hover:bg-transparent"
        >
          ← Назад
        </Button>
      </div>

      <Card>
        <CardHeader className="text-center">
          <CardTitle>Создание плана</CardTitle>
          <CardDescription>
            Расскажите о себе, чтобы мы составили персональный план
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Цель */}
            <div className="space-y-3">
              <Label>Ваша цель *</Label>
              <RadioGroup 
                value={formData.goal} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, goal: value }))}
              >
                {goals.map(goal => (
                  <div key={goal.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={goal.value} id={goal.value} />
                    <Label htmlFor={goal.value}>{goal.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.goal && <p className="text-destructive text-sm">{errors.goal}</p>}
            </div>

            {/* Уровень подготовки */}
            <div className="space-y-3">
              <Label>Уровень физической подготовки *</Label>
              <RadioGroup 
                value={formData.fitnessLevel} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, fitnessLevel: value }))}
              >
                {fitnessLevels.map(level => (
                  <div key={level.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={level.value} id={level.value} />
                    <Label htmlFor={level.value}>{level.label}</Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.fitnessLevel && <p className="text-destructive text-sm">{errors.fitnessLevel}</p>}
            </div>

            {/* Количество тренировок */}
            <div className="space-y-3">
              <Label htmlFor="workouts">Тренировок в неделю *</Label>
              <Select onValueChange={(value) => setFormData(prev => ({ ...prev, workoutsPerWeek: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите количество" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 тренировки</SelectItem>
                  <SelectItem value="3">3 тренировки</SelectItem>
                  <SelectItem value="4">4 тренировки</SelectItem>
                  <SelectItem value="5">5 тренировок</SelectItem>
                  <SelectItem value="6">6 тренировок</SelectItem>
                </SelectContent>
              </Select>
              {errors.workoutsPerWeek && <p className="text-destructive text-sm">{errors.workoutsPerWeek}</p>}
            </div>

            {/* Ограничения по питанию */}
            <div className="space-y-3">
              <Label>Ограничения по питанию</Label>
              <div className="grid grid-cols-2 gap-3">
                {dietaryOptions.map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox 
                      id={option.value}
                      checked={formData.dietaryRestrictions.includes(option.value)}
                      onCheckedChange={(checked) => handleDietaryChange(option.value, checked as boolean)}
                    />
                    <Label htmlFor={option.value} className="text-sm">{option.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Аллергии */}
            <div className="space-y-3">
              <Label htmlFor="allergies">Аллергии и противопоказания</Label>
              <Input
                id="allergies"
                placeholder="Например: орехи, морепродукты"
                value={formData.allergies}
                onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
              />
            </div>

            {/* Дополнительные пожелания */}
            <div className="space-y-3">
              <Label htmlFor="notes">Дополнительные пожелания</Label>
              <Textarea
                id="notes"
                placeholder="Расскажите о ваших предпочтениях или особенностях..."
                value={formData.additionalNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Сгенерировать план
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}