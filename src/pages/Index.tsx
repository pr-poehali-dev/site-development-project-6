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
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const courses: Course[] = [
    {
      id: 1,
      title: 'Специалист по охране труда',
      category: 'Профессиональная переподготовка',
      progress: 65,
      students: 247,
      duration: '256 часов',
      level: 'Переподготовка'
    },
    {
      id: 2,
      title: 'Электромонтер по ремонту и обслуживанию',
      category: 'Рабочие профессии',
      progress: 45,
      students: 189,
      duration: '160 часов',
      level: 'Профессия'
    },
    {
      id: 3,
      title: 'Контрактная система закупок (44-ФЗ)',
      category: 'Повышение квалификации',
      progress: 80,
      students: 534,
      duration: '120 часов',
      level: 'Повышение'
    },
    {
      id: 4,
      title: 'Сметное дело в строительстве',
      category: 'Профессиональная переподготовка',
      progress: 30,
      students: 412,
      duration: '512 часов',
      level: 'Переподготовка'
    },
    {
      id: 5,
      title: 'Стропальщик',
      category: 'Рабочие профессии',
      progress: 55,
      students: 156,
      duration: '72 часа',
      level: 'Профессия'
    },
    {
      id: 6,
      title: 'Пожарная безопасность',
      category: 'Повышение квалификации',
      progress: 70,
      students: 623,
      duration: '72 часа',
      level: 'Повышение'
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
              <h1 className="text-2xl font-bold">ООО «ИТ-Центр»</h1>
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
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
            <TabsTrigger value="home">Главная</TabsTrigger>
            <TabsTrigger value="courses">Курсы</TabsTrigger>
            <TabsTrigger value="library">Библиотека</TabsTrigger>
            <TabsTrigger value="profile">Профиль</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-16 animate-fade-in">
            <section className="text-center space-y-6 py-20 px-4">
              <div className="inline-block">
<Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
                  Лицензированный образовательный центр
                </Badge>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold max-w-4xl mx-auto leading-tight">
                Информационно-технологический центр
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Профессиональная переподготовка, повышение квалификации и обучение по профессиям рабочих и служащих. 
                Лицензированные программы с выдачей документов государственного образца.
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button size="lg" className="bg-accent hover:bg-accent/90" onClick={() => setActiveTab('courses')}>
                  <Icon name="BookOpen" size={20} className="mr-2" />
                  Начать обучение
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveTab('library')}>
                  <Icon name="Library" size={20} className="mr-2" />
                  Библиотека
                </Button>
              </div>
            </section>

            <section className="space-y-12 px-4">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Формы обучения</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Выберите удобный для вас формат с применением электронных и дистанционных технологий
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <Card className="text-center border-2 hover:border-accent transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mx-auto h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                      <Icon name="Users" size={32} className="text-accent" />
                    </div>
                    <CardTitle className="text-xl">Очно</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Традиционный формат обучения в аудитории с преподавателем и групповыми занятиями
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center border-2 hover:border-secondary transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mx-auto h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                      <Icon name="UserCheck" size={32} className="text-secondary" />
                    </div>
                    <CardTitle className="text-xl">Очно-заочно</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Комбинированный формат: часть занятий очно, часть — дистанционно для вашего удобства
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center border-2 hover:border-primary transition-all hover:shadow-lg">
                  <CardHeader>
                    <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon name="Monitor" size={32} className="text-primary" />
                    </div>
                    <CardTitle className="text-xl">Удалённо</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Полностью дистанционное обучение из любой точки мира с электронными материалами
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-8 px-4">
              <Card className="text-center border-2 hover:border-accent transition-colors">
                <CardHeader>
                  <div className="mx-auto h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Icon name="GraduationCap" size={32} className="text-accent" />
                  </div>
                  <CardTitle className="text-xl">40+ программ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Профессиональная переподготовка, повышение квалификации, обучение рабочим специальностям
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-secondary transition-colors">
                <CardHeader>
                  <div className="mx-auto h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                    <Icon name="ClipboardCheck" size={32} className="text-secondary" />
                  </div>
                  <CardTitle className="text-xl">Система тестирования</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Автоматическая проверка знаний, мгновенная обратная связь и детальная статистика успеваемости
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon name="Award" size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">Документы гос. образца</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Дипломы о переподготовке, удостоверения о повышении квалификации, свидетельства по профессиям
                  </p>
                </CardContent>
              </Card>
            </section>

            <section className="bg-muted/30 rounded-2xl p-12 mx-4">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <h2 className="text-3xl md:text-4xl font-bold">Популярные программы обучения</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {courses.slice(0, 4).map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 text-left">
                            <CardTitle className="text-lg">{course.title}</CardTitle>
                            <CardDescription>{course.category}</CardDescription>
                          </div>
                          <Badge variant="secondary" className="text-xs">{course.level}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="Users" size={14} />
                            <span>{course.students}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                        <Button className="w-full" size="sm" variant="outline" onClick={() => setActiveTab('courses')}>
                          Подробнее
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button size="lg" onClick={() => setActiveTab('courses')}>
                  Смотреть все курсы
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                </Button>
              </div>
            </section>

            <section className="text-center space-y-8 px-4 py-12">
              <h2 className="text-3xl md:text-4xl font-bold">Статистика платформы</h2>
              <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <p className="text-5xl font-bold text-accent mb-2">2,161</p>
                  <p className="text-muted-foreground">Слушателей обучено</p>
                </div>
                <div className="p-6 bg-muted/50 rounded-lg">
                  <p className="text-5xl font-bold text-secondary mb-2">42</p>
                  <p className="text-muted-foreground">Программы обучения</p>
                </div>
                <div className="p-6 bg-muted/50 rounded-lg">
                  <p className="text-5xl font-bold text-primary mb-2">12</p>
                  <p className="text-muted-foreground">Лет на рынке</p>
                </div>
                <div className="p-6 bg-muted/50 rounded-lg">
                  <p className="text-5xl font-bold text-accent mb-2">94%</p>
                  <p className="text-muted-foreground">Удовлетворенность</p>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="courses" className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">Программы обучения</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Выберите программу и получите документ государственного образца
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
                ООО «ИТ-Центр»
              </h3>
              <p className="text-sm text-muted-foreground">
                Лицензированный образовательный центр
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Обучение</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Переподготовка</li>
                <li>Повышение квалификации</li>
                <li>Рабочие профессии</li>
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
                <li>info@it-centr.ru</li>
                <li>+7 (800) 555-35-35</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 ООО «Информационно-технологический центр». Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;