import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [applicationForm, setApplicationForm] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    snils: '',
    diploma: null as File | null,
    contract: null as File | null,
    receipt: null as File | null,
    program: '',
    educationForm: ''
  });
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
    },
    {
      id: 7,
      title: 'Бухгалтерский учет и налогообложение',
      category: 'Профессиональная переподготовка',
      progress: 50,
      students: 387,
      duration: '520 часов',
      level: 'Переподготовка'
    },
    {
      id: 8,
      title: 'Оператор котельной',
      category: 'Рабочие профессии',
      progress: 60,
      students: 134,
      duration: '144 часа',
      level: 'Профессия'
    },
    {
      id: 9,
      title: 'Промышленная безопасность',
      category: 'Повышение квалификации',
      progress: 75,
      students: 456,
      duration: '72 часа',
      level: 'Повышение'
    },
    {
      id: 10,
      title: 'Управление персоналом',
      category: 'Профессиональная переподготовка',
      progress: 40,
      students: 298,
      duration: '256 часов',
      level: 'Переподготовка'
    },
    {
      id: 11,
      title: 'Сварщик ручной дуговой сварки',
      category: 'Рабочие профессии',
      progress: 35,
      students: 223,
      duration: '256 часов',
      level: 'Профессия'
    },
    {
      id: 12,
      title: 'Кадровое делопроизводство',
      category: 'Повышение квалификации',
      progress: 85,
      students: 612,
      duration: '120 часов',
      level: 'Повышение'
    },
    {
      id: 13,
      title: 'Матрос',
      category: 'Рабочие профессии',
      progress: 42,
      students: 178,
      duration: '160 часов',
      level: 'Профессия'
    },
    {
      id: 14,
      title: 'Рулевой',
      category: 'Рабочие профессии',
      progress: 58,
      students: 145,
      duration: '240 часов',
      level: 'Профессия'
    },
    {
      id: 15,
      title: 'Моторист-рулевой',
      category: 'Рабочие профессии',
      progress: 48,
      students: 132,
      duration: '280 часов',
      level: 'Профессия'
    },
    {
      id: 16,
      title: 'Докер (портовый рабочий)',
      category: 'Рабочие профессии',
      progress: 65,
      students: 201,
      duration: '144 часа',
      level: 'Профессия'
    },
    {
      id: 17,
      title: 'Судоводитель маломерного судна',
      category: 'Профессиональная переподготовка',
      progress: 55,
      students: 267,
      duration: '192 часа',
      level: 'Переподготовка'
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

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время для уточнения деталей.",
    });
    setApplicationForm({
      lastName: '',
      firstName: '',
      middleName: '',
      snils: '',
      diploma: null,
      contract: null,
      receipt: null,
      program: '',
      educationForm: ''
    });
  };

  const handleFileChange = (field: 'diploma' | 'contract' | 'receipt', file: File | null) => {
    setApplicationForm({...applicationForm, [field]: file});
  };

  const formatSnils = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 9)} ${numbers.slice(9, 11)}`;
  };

  const handleSnilsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSnils(e.target.value);
    setApplicationForm({...applicationForm, snils: formatted});
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
              <Button variant="ghost" onClick={() => setActiveTab('courses')}>Программы</Button>
              <Button variant="ghost" onClick={() => setActiveTab('application')}>Подать заявку</Button>
              <Button variant="ghost" onClick={() => setActiveTab('library')}>Библиотека</Button>
              <Button variant="ghost" onClick={() => setActiveTab('profile')}>Профиль</Button>
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
          <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5">
            <TabsTrigger value="home">Главная</TabsTrigger>
            <TabsTrigger value="courses">Программы</TabsTrigger>
            <TabsTrigger value="application">Заявка</TabsTrigger>
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
                  Смотреть все программы
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

          <TabsContent value="application" className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">Подать заявку на обучение</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Заполните форму и мы свяжемся с вами для уточнения деталей
              </p>
            </div>

            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="FileText" size={24} />
                  Форма подачи заявления
                </CardTitle>
                <CardDescription>
                  Все поля обязательны для заполнения. После отправки с вами свяжется наш специалист.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleApplicationSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input
                        id="lastName"
                        placeholder="Иванов"
                        value={applicationForm.lastName}
                        onChange={(e) => setApplicationForm({...applicationForm, lastName: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input
                        id="firstName"
                        placeholder="Иван"
                        value={applicationForm.firstName}
                        onChange={(e) => setApplicationForm({...applicationForm, firstName: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="middleName">Отчество *</Label>
                      <Input
                        id="middleName"
                        placeholder="Иванович"
                        value={applicationForm.middleName}
                        onChange={(e) => setApplicationForm({...applicationForm, middleName: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="snils">СНИЛС *</Label>
                    <Input
                      id="snils"
                      placeholder="123-456-789 00"
                      value={applicationForm.snils}
                      onChange={handleSnilsChange}
                      maxLength={14}
                      required
                    />
                    <p className="text-xs text-muted-foreground">Формат: XXX-XXX-XXX XX</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="program">Программа обучения *</Label>
                    <Select 
                      value={applicationForm.program} 
                      onValueChange={(value) => setApplicationForm({...applicationForm, program: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите программу обучения" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="охрана-труда">Специалист по охране труда</SelectItem>
                        <SelectItem value="электромонтер">Электромонтер по ремонту и обслуживанию</SelectItem>
                        <SelectItem value="закупки">Контрактная система закупок (44-ФЗ)</SelectItem>
                        <SelectItem value="сметное-дело">Сметное дело в строительстве</SelectItem>
                        <SelectItem value="стропальщик">Стропальщик</SelectItem>
                        <SelectItem value="пожарная">Пожарная безопасность</SelectItem>
                        <SelectItem value="бухучет">Бухгалтерский учет и налогообложение</SelectItem>
                        <SelectItem value="котельная">Оператор котельной</SelectItem>
                        <SelectItem value="промбезопасность">Промышленная безопасность</SelectItem>
                        <SelectItem value="управление">Управление персоналом</SelectItem>
                        <SelectItem value="сварщик">Сварщик ручной дуговой сварки</SelectItem>
                        <SelectItem value="кадры">Кадровое делопроизводство</SelectItem>
                        <SelectItem value="матрос">Матрос</SelectItem>
                        <SelectItem value="рулевой">Рулевой</SelectItem>
                        <SelectItem value="моторист">Моторист-рулевой</SelectItem>
                        <SelectItem value="докер">Докер (портовый рабочий)</SelectItem>
                        <SelectItem value="судоводитель">Судоводитель маломерного судна</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="educationForm">Форма обучения *</Label>
                    <Select 
                      value={applicationForm.educationForm} 
                      onValueChange={(value) => setApplicationForm({...applicationForm, educationForm: value})}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите форму обучения" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="очно">Очно</SelectItem>
                        <SelectItem value="очно-заочно">Очно-заочно</SelectItem>
                        <SelectItem value="удаленно">Удалённо (дистанционно)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Icon name="Upload" size={20} />
                      Загрузка документов
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="diploma">Диплом об образовании *</Label>
                      <Input
                        id="diploma"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange('diploma', e.target.files?.[0] || null)}
                        required
                      />
                      {applicationForm.diploma && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <Icon name="CheckCircle" size={14} />
                          {applicationForm.diploma.name}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">Требуется для программ переподготовки. Форматы: PDF, JPG, PNG</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contract">Договор *</Label>
                      <Input
                        id="contract"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange('contract', e.target.files?.[0] || null)}
                        required
                      />
                      {applicationForm.contract && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <Icon name="CheckCircle" size={14} />
                          {applicationForm.contract.name}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">Подписанный договор на обучение</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="receipt">Квитанция об оплате *</Label>
                      <Input
                        id="receipt"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange('receipt', e.target.files?.[0] || null)}
                        required
                      />
                      {applicationForm.receipt && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <Icon name="CheckCircle" size={14} />
                          {applicationForm.receipt.name}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">Подтверждение оплаты образовательной услуги</p>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Icon name="Info" size={18} />
                      Важная информация
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                      <li>После отправки заявки с вами свяжется специалист в течение 1 рабочего дня</li>
                      <li>Все программы обучения лицензированы</li>
                      <li>По окончании выдаются документы государственного образца</li>
                      <li>Возможна оплата юридическим лицом</li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" size="lg" className="flex-1">
                      <Icon name="Send" size={18} className="mr-2" />
                      Отправить заявку
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg"
                      onClick={() => setApplicationForm({
                        lastName: '',
                        firstName: '',
                        middleName: '',
                        snils: '',
                        diploma: null,
                        contract: null,
                        receipt: null,
                        program: '',
                        educationForm: ''
                      })}
                    >
                      Очистить
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                    <Icon name="Phone" size={24} className="text-accent" />
                  </div>
                  <CardTitle className="text-lg">Телефон</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">+7 (800) 555-35-35</p>
                  <p className="text-xs text-muted-foreground mt-1">Бесплатный звонок</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                    <Icon name="Mail" size={24} className="text-secondary" />
                  </div>
                  <CardTitle className="text-lg">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">info@it-centr.ru</p>
                  <p className="text-xs text-muted-foreground mt-1">Ответим в течение дня</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Icon name="Clock" size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg">Режим работы</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                  <p className="text-xs text-muted-foreground mt-1">Сб-Вс: выходной</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-4xl font-bold">Программы обучения</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Выберите программу и получите документ государственного образца
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Button 
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
              >
                Все программы
              </Button>
              <Button 
                variant={selectedCategory === 'Профессиональная переподготовка' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Профессиональная переподготовка')}
              >
                Переподготовка
              </Button>
              <Button 
                variant={selectedCategory === 'Повышение квалификации' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Повышение квалификации')}
              >
                Повышение квалификации
              </Button>
              <Button 
                variant={selectedCategory === 'Рабочие профессии' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('Рабочие профессии')}
              >
                Рабочие профессии
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {courses.filter(course => selectedCategory === 'all' || course.category === selectedCategory).map((course) => (
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
                      Записаться на обучение
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