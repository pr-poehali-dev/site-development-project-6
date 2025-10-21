import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Course {
  id: number;
  title: string;
  category: string;
  progress: number;
  students: number;
  duration: string;
  level: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const courses: Course[] = [
    {
      id: 1,
      title: 'Основы математического анализа',
      category: 'Математика',
      progress: 65,
      students: 1247,
      duration: '12 недель',
      level: 'Средний'
    },
    {
      id: 2,
      title: 'Квантовая физика: введение',
      category: 'Физика',
      progress: 45,
      students: 892,
      duration: '10 недель',
      level: 'Продвинутый'
    },
    {
      id: 3,
      title: 'История древних цивилизаций',
      category: 'История',
      progress: 80,
      students: 1534,
      duration: '8 недель',
      level: 'Базовый'
    },
    {
      id: 4,
      title: 'Алгоритмы и структуры данных',
      category: 'Информатика',
      progress: 30,
      students: 2103,
      duration: '14 недель',
      level: 'Средний'
    }
  ];

  const testQuestions: Question[] = [
    {
      id: 1,
      question: 'Какой принцип лежит в основе дифференциального исчисления?',
      options: [
        'Принцип суперпозиции',
        'Принцип предельного перехода',
        'Принцип наименьшего действия',
        'Принцип неопределенности'
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'Кто является основоположником современной теории множеств?',
      options: [
        'Исаак Ньютон',
        'Георг Кантор',
        'Карл Гаусс',
        'Леонард Эйлер'
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'Что такое производная функции?',
      options: [
        'Площадь под графиком функции',
        'Скорость изменения функции в точке',
        'Максимальное значение функции',
        'Среднее значение функции'
      ],
      correctAnswer: 1
    }
  ];

  const handleAnswerSubmit = () => {
    const currentQ = testQuestions[currentQuestion];
    if (parseInt(selectedAnswer) === currentQ.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setShowResults(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResults(false);
    setTestStarted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="GraduationCap" className="text-primary-foreground" size={24} />
              </div>
              <h1 className="text-2xl font-bold">Академия Знаний</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <Button variant="ghost" onClick={() => setActiveTab('courses')}>Курсы</Button>
              <Button variant="ghost" onClick={() => setActiveTab('library')}>Библиотека</Button>
              <Button variant="ghost" onClick={() => setActiveTab('profile')}>Профиль</Button>
              <Button variant="ghost">Контакты</Button>
            </nav>
            <Button className="bg-accent hover:bg-accent/90">
              <Icon name="User" size={18} className="mr-2" />
              Войти
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger value="courses">Курсы</TabsTrigger>
            <TabsTrigger value="library">Библиотека</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">Каталог курсов</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Выберите курс и начните обучение в удобном для вас темпе
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription>{course.category}</CardDescription>
                      </div>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Прогресс</span>
                        <span className="font-semibold">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="Users" size={16} />
                        <span>{course.students} студентов</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => setSelectedCourse(course.id)}>
                      Продолжить обучение
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="library" className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">Образовательная библиотека</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Доступ к научным статьям, учебникам и исследованиям
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Научные статьи', count: 1247, icon: 'FileText' },
                { title: 'Учебники', count: 389, icon: 'Book' },
                { title: 'Видеолекции', count: 562, icon: 'Video' }
              ].map((item, idx) => (
                <Card key={idx} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto h-16 w-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                      <Icon name={item.icon as any} size={32} className="text-secondary" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-secondary">{item.count}</p>
                    <p className="text-sm text-muted-foreground mt-2">материалов доступно</p>
                    <Button variant="outline" className="mt-4">
                      Перейти в раздел
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">Личный кабинет</h2>
              <p className="text-muted-foreground text-lg">
                Ваша успеваемость и система тестирования
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="BarChart3" size={24} />
                    Общая статистика обучения
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-4xl font-bold text-primary">4</p>
                      <p className="text-sm text-muted-foreground mt-2">Активных курса</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-4xl font-bold text-accent">87%</p>
                      <p className="text-sm text-muted-foreground mt-2">Средний балл</p>
                    </div>
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <p className="text-4xl font-bold text-secondary">24</p>
                      <p className="text-sm text-muted-foreground mt-2">Пройдено тестов</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ClipboardCheck" size={24} />
                    Система тестирования знаний
                  </CardTitle>
                  <CardDescription>
                    Проверьте свои знания по математическому анализу
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!testStarted ? (
                    <div className="text-center space-y-4 py-8">
                      <div className="mx-auto h-20 w-20 rounded-full bg-accent/10 flex items-center justify-center">
                        <Icon name="Brain" size={40} className="text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold">Готовы начать тестирование?</h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Тест включает {testQuestions.length} вопроса. Выберите правильный ответ на каждый вопрос.
                      </p>
                      <Button size="lg" onClick={() => setTestStarted(true)} className="bg-accent hover:bg-accent/90">
                        <Icon name="PlayCircle" size={20} className="mr-2" />
                        Начать тест
                      </Button>
                    </div>
                  ) : !showResults ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">
                          Вопрос {currentQuestion + 1} из {testQuestions.length}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          Баллов: {score}/{testQuestions.length}
                        </span>
                      </div>
                      
                      <Progress 
                        value={((currentQuestion + 1) / testQuestions.length) * 100} 
                        className="h-2"
                      />

                      <div className="space-y-4 py-4">
                        <h3 className="text-lg font-semibold">
                          {testQuestions[currentQuestion].question}
                        </h3>

                        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                          <div className="space-y-3">
                            {testQuestions[currentQuestion].options.map((option, idx) => (
                              <div key={idx} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                                <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          onClick={handleAnswerSubmit} 
                          disabled={!selectedAnswer}
                          className="flex-1"
                        >
                          {currentQuestion < testQuestions.length - 1 ? 'Следующий вопрос' : 'Завершить тест'}
                          <Icon name="ArrowRight" size={16} className="ml-2" />
                        </Button>
                        <Button variant="outline" onClick={resetTest}>
                          Отменить
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-6 py-8">
                      <div className="mx-auto h-24 w-24 rounded-full bg-accent/10 flex items-center justify-center">
                        <Icon name="Trophy" size={48} className="text-accent" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Тест завершен!</h3>
                        <p className="text-muted-foreground">
                          Ваш результат: <span className="font-bold text-lg text-accent">
                            {score} из {testQuestions.length}
                          </span> ({Math.round((score / testQuestions.length) * 100)}%)
                        </p>
                      </div>
                      
                      <div className="max-w-md mx-auto">
                        <Progress value={(score / testQuestions.length) * 100} className="h-3" />
                      </div>

                      <div className="space-y-2">
                        {score === testQuestions.length && (
                          <p className="text-green-600 font-semibold">Отличная работа! Все ответы правильные! 🎉</p>
                        )}
                        {score >= testQuestions.length * 0.7 && score < testQuestions.length && (
                          <p className="text-accent font-semibold">Хороший результат! Продолжайте обучение!</p>
                        )}
                        {score < testQuestions.length * 0.7 && (
                          <p className="text-muted-foreground">Рекомендуем повторить материал и попробовать еще раз</p>
                        )}
                      </div>

                      <Button onClick={resetTest} size="lg">
                        <Icon name="RotateCcw" size={20} className="mr-2" />
                        Пройти тест заново
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-20 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Icon name="GraduationCap" size={20} />
                Академия Знаний
              </h3>
              <p className="text-sm text-muted-foreground">
                Платформа для качественного онлайн-образования
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Обучение</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Каталог курсов</li>
                <li>Библиотека</li>
                <li>Сертификация</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Помощь</li>
                <li>Документация</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Связь</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>info@academy.edu</li>
                <li>+7 (495) 123-45-67</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 Академия Знаний. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
