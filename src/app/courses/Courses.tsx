import { useState } from 'react';
import { Plus, Search, Filter, BookOpen, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockCourses = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Computer Science',
    description: 'Basic programming concepts and problem-solving techniques',
    credits: 3,
    type: 'core',
    year: 1,
    semester: 1,
    maxStudents: 60,
    enrolledStudents: 45,
    subjects: [
      { id: '1', name: 'Lectures', type: 'lecture', hoursPerWeek: 3 },
      { id: '2', name: 'Lab Sessions', type: 'lab', hoursPerWeek: 2 }
    ],
    teacher: 'Prof. Michael Chen',
    isActive: true
  },
  {
    id: '2',
    code: 'MATH201',
    name: 'Advanced Mathematics',
    description: 'Calculus, linear algebra, and differential equations',
    credits: 4,
    type: 'core',
    year: 2,
    semester: 1,
    maxStudents: 40,
    enrolledStudents: 38,
    subjects: [
      { id: '3', name: 'Lectures', type: 'lecture', hoursPerWeek: 4 },
      { id: '4', name: 'Tutorial', type: 'tutorial', hoursPerWeek: 1 }
    ],
    teacher: 'Dr. Sarah Johnson',
    isActive: true
  },
  {
    id: '3',
    code: 'PHY301',
    name: 'Quantum Physics',
    description: 'Introduction to quantum mechanics and applications',
    credits: 3,
    type: 'elective',
    year: 3,
    semester: 1,
    maxStudents: 25,
    enrolledStudents: 18,
    subjects: [
      { id: '5', name: 'Lectures', type: 'lecture', hoursPerWeek: 2 },
      { id: '6', name: 'Lab', type: 'lab', hoursPerWeek: 3 }
    ],
    teacher: 'Dr. Emily Rodriguez',
    isActive: true
  }
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredCourses = mockCourses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Course Management</h1>
          <p className="text-muted-foreground">
            Manage courses, subjects, and their assignments
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="core">Core</TabsTrigger>
          <TabsTrigger value="elective">Elective</TabsTrigger>
          <TabsTrigger value="lab">Lab</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface CourseCardProps {
  course: typeof mockCourses[0];
}

function CourseCard({ course }: CourseCardProps) {
  const utilizationPercentage = Math.round((course.enrolledStudents / course.maxStudents) * 100);
  
  return (
    <Card className="hover:shadow-medium transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{course.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">{course.code}</Badge>
              <Badge 
                variant={course.type === 'core' ? 'default' : 'outline'}
                className="capitalize"
              >
                {course.type}
              </Badge>
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <p>Year {course.year}</p>
            <p>Sem {course.semester}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>{course.credits} credits</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{course.enrolledStudents}/{course.maxStudents}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Enrollment</span>
            <span>{utilizationPercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all" 
              style={{ width: `${utilizationPercentage}%` }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Subjects:</p>
          {course.subjects.map((subject) => (
            <div key={subject.id} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                {subject.name}
              </span>
              <span className="text-muted-foreground">
                {subject.hoursPerWeek}h/week
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Teacher: {course.teacher}
          </p>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}