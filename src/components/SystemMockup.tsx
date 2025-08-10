import React from 'react';
import { X, Home, User, Plus, ArrowLeft, Download, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface SystemMockupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemMockup: React.FC<SystemMockupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Макет системы MyWellnessPlan</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Описание */}
          <Card>
            <CardHeader>
              <CardTitle>Описание системы</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Макеты или прототипы системы нужны для того, чтобы дизайнер мог понять, что именно ему 
                необходимо изобразить, а также для того, чтобы понять пользовательский путь. В макете должно 
                быть схематично отображен будущий интерфейс со всеми основными элементами.
              </p>
            </CardContent>
          </Card>

          {/* Схема навигации */}
          <Card>
            <CardHeader>
              <CardTitle>Навигационная структура</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                
                {/* Главный экран */}
                <div className="border rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Home className="w-4 h-4 text-blue-600" />
                    <h3 className="font-semibold">Главный экран</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-2 rounded border">📱 Заголовок приложения</div>
                    <div className="bg-white p-2 rounded border">➕ Кнопка "Создать план"</div>
                    <div className="bg-white p-2 rounded border">📋 Блок сохраненных планов</div>
                    <div className="bg-white p-2 rounded border">🎯 Быстрые действия</div>
                  </div>
                  <Badge variant="outline" className="mt-2">Стартовая точка</Badge>
                </div>

                {/* Форма создания плана */}
                <div className="border rounded-lg p-4 bg-green-50">
                  <div className="flex items-center gap-2 mb-3">
                    <Plus className="w-4 h-4 text-green-600" />
                    <h3 className="font-semibold">Форма создания</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-2 rounded border">🎯 Выбор цели</div>
                    <div className="bg-white p-2 rounded border">💪 Уровень подготовки</div>
                    <div className="bg-white p-2 rounded border">📅 Количество тренировок</div>
                    <div className="bg-white p-2 rounded border">🥗 Диетические ограничения</div>
                    <div className="bg-white p-2 rounded border">⚠️ Аллергии</div>
                    <div className="bg-white p-2 rounded border">📝 Дополнительные заметки</div>
                  </div>
                  <Badge variant="outline" className="mt-2">Сбор данных</Badge>
                </div>

                {/* Экран загрузки */}
                <div className="border rounded-lg p-4 bg-yellow-50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                    <h3 className="font-semibold">Экран загрузки</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-2 rounded border">⏳ Индикатор прогресса</div>
                    <div className="bg-white p-2 rounded border">📝 Текст статуса</div>
                    <div className="bg-white p-2 rounded border">🤖 Анимация генерации</div>
                  </div>
                  <Badge variant="outline" className="mt-2">Обработка</Badge>
                </div>

                {/* Недельный план */}
                <div className="border rounded-lg p-4 bg-purple-50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 bg-purple-600 rounded"></div>
                    <h3 className="font-semibold">Недельный план</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-2 rounded border">📅 Календарь тренировок</div>
                    <div className="bg-white p-2 rounded border">🍽️ План питания</div>
                    <div className="bg-white p-2 rounded border">💧 Водный баланс</div>
                    <div className="bg-white p-2 rounded border">😴 Режим сна</div>
                    <div className="bg-white p-2 rounded border">📊 Прогресс</div>
                  </div>
                  <Badge variant="outline" className="mt-2">Результат</Badge>
                </div>

                {/* Профиль */}
                <div className="border rounded-lg p-4 bg-indigo-50">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-semibold">Профиль</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-2 rounded border">👤 Информация пользователя</div>
                    <div className="bg-white p-2 rounded border">📋 Сохраненные планы</div>
                    <div className="bg-white p-2 rounded border">📈 Статистика</div>
                    <div className="bg-white p-2 rounded border">⚙️ Настройки</div>
                  </div>
                  <Badge variant="outline" className="mt-2">Управление</Badge>
                </div>

                {/* Навигация */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    <h3 className="font-semibold">Нижняя навигация</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="bg-white p-2 rounded border flex items-center gap-2">
                      <Home className="w-3 h-3" />
                      Главная
                    </div>
                    <div className="bg-white p-2 rounded border flex items-center gap-2">
                      <Plus className="w-3 h-3" />
                      Создать
                    </div>
                    <div className="bg-white p-2 rounded border flex items-center gap-2">
                      <User className="w-3 h-3" />
                      Профиль
                    </div>
                  </div>
                  <Badge variant="outline" className="mt-2">Постоянная</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Пользовательский путь */}
          <Card>
            <CardHeader>
              <CardTitle>Пользовательский путь</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-2">
                <div className="bg-blue-100 px-3 py-1 rounded-lg text-sm">1. Главная</div>
                <span>→</span>
                <div className="bg-green-100 px-3 py-1 rounded-lg text-sm">2. Форма</div>
                <span>→</span>
                <div className="bg-yellow-100 px-3 py-1 rounded-lg text-sm">3. Загрузка</div>
                <span>→</span>
                <div className="bg-purple-100 px-3 py-1 rounded-lg text-sm">4. План</div>
                <span>→</span>
                <div className="bg-indigo-100 px-3 py-1 rounded-lg text-sm">5. Сохранение</div>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Основной сценарий: создание персонализированного плана здоровья и фитнеса
              </p>
            </CardContent>
          </Card>

          {/* Связи между компонентами */}
          <Card>
            <CardHeader>
              <CardTitle>Связи между элементами</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Действия с планами:</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <Save className="w-3 h-3" />
                      Сохранить план
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Download className="w-3 h-3" />
                      Скачать план
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ArrowLeft className="w-3 h-3" />
                      Вернуться к профилю
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Навигационные связи:</h4>
                    <div className="text-sm">• Главная ↔ Профиль</div>
                    <div className="text-sm">• Главная → Форма → План</div>
                    <div className="text-sm">• Профиль → Просмотр планов</div>
                    <div className="text-sm">• План → Создание нового</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Состояния приложения */}
          <Card>
            <CardHeader>
              <CardTitle>Состояния приложения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="text-center p-3 border rounded">
                  <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium">home</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="w-8 h-8 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium">form</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium">loading</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium">plan</div>
                </div>
                <div className="text-center p-3 border rounded">
                  <div className="w-8 h-8 bg-indigo-500 rounded-full mx-auto mb-2"></div>
                  <div className="text-sm font-medium">profile</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
