import { useState } from 'react';
import { Plus, Search, Filter, Users, GraduationCap, UserCheck, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const mockTeachers = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    department: 'Computer Science',
    specialization: ['Algorithms', 'Machine Learning'],
    employeeId: 'EMP001',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    isActive: true,
    maxHoursPerWeek: 20,
    currentHours: 16,
    coursesAssigned: 3,
    availability: 'Available'
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    department: 'Mathematics',
    specialization: ['Linear Algebra', 'Calculus'],
    employeeId: 'EMP002',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    isActive: true,
    maxHoursPerWeek: 18,
    currentHours: 18,
    coursesAssigned: 2,
    availability: 'Fully Booked'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@university.edu',
    department: 'Physics',
    specialization: ['Quantum Physics', 'Thermodynamics'],
    employeeId: 'EMP003',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    isActive: false,
    maxHoursPerWeek: 22,
    currentHours: 0,
    coursesAssigned: 0,
    availability: 'On Leave'
  }
];

const mockStudents = [
  {
    id: '1',
    name: 'Alex Rivera',
    email: 'alex.rivera@student.university.edu',
    studentId: 'STU001',
    year: 2,
    semester: 3,
    program: 'Computer Science',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    enrolledCourses: 6,
    totalCredits: 18,
    gpa: 3.75,
    status: 'Active'
  },
  {
    id: '2',
    name: 'Jordan Kim',
    email: 'jordan.kim@student.university.edu',
    studentId: 'STU002',
    year: 3,
    semester: 5,
    program: 'Mathematics',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    enrolledCourses: 5,
    totalCredits: 15,
    gpa: 3.92,
    status: 'Active'
  }
];

export default function People() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('teachers');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">People Management</h1>
          <p className="text-muted-foreground">
            Manage teachers, students, and their information
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Person
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search people..."
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
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="support">Support Staff</TabsTrigger>
        </TabsList>

        <TabsContent value="teachers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">No support staff members found.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface TeacherCardProps {
  teacher: typeof mockTeachers[0];
}

function TeacherCard({ teacher }: TeacherCardProps) {
  const workloadPercentage = Math.round((teacher.currentHours / teacher.maxHoursPerWeek) * 100);

  return (
    <Card className="hover:shadow-medium transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={teacher.avatar} alt={teacher.name} />
            <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{teacher.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{teacher.department}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={teacher.isActive ? 'default' : 'secondary'}>
                {teacher.availability}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Specialization:</p>
          <div className="flex flex-wrap gap-1">
            {teacher.specialization.map((spec) => (
              <Badge key={spec} variant="outline" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Workload</span>
            <span>{teacher.currentHours}/{teacher.maxHoursPerWeek}h</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                workloadPercentage >= 100 ? 'bg-destructive' : 
                workloadPercentage >= 80 ? 'bg-warning' : 'bg-primary'
              }`}
              style={{ width: `${Math.min(workloadPercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{teacher.coursesAssigned} courses</span>
          </div>
          <div className="flex items-center gap-1">
            <UserCheck className="h-4 w-4 text-muted-foreground" />
            <span>{teacher.employeeId}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-border">
          <Button variant="outline" size="sm" className="flex-1">
            <Calendar className="h-3 w-3 mr-1" />
            Availability
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface StudentCardProps {
  student: typeof mockStudents[0];
}

function StudentCard({ student }: StudentCardProps) {
  return (
    <Card className="hover:shadow-medium transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={student.avatar} alt={student.name} />
            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-lg">{student.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{student.program}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="default">{student.status}</Badge>
              <Badge variant="outline">Year {student.year}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Student ID</p>
            <p className="font-medium">{student.studentId}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Semester</p>
            <p className="font-medium">{student.semester}</p>
          </div>
          <div>
            <p className="text-muted-foreground">GPA</p>
            <p className="font-medium">{student.gpa}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Credits</p>
            <p className="font-medium">{student.totalCredits}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <span>{student.enrolledCourses} courses</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-border">
          <Button variant="outline" size="sm" className="flex-1">
            Schedule
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}