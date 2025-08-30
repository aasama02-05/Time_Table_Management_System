import { useAuthStore } from '@/state/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Users, 
  BookOpen, 
  Building, 
  AlertTriangle,
  Clock,
  TrendingUp,
  Bell
} from 'lucide-react';
import { useTimetableStore } from '@/state/timetable';

const mockStats = {
  totalCourses: 42,
  totalTeachers: 18,
  totalStudents: 287,
  totalRooms: 15,
  utilizationRate: 78,
  upcomingClasses: 12,
  recentChanges: 5
};

const mockUpcomingClasses = [
  {
    id: '1',
    subject: 'Advanced Mathematics',
    teacher: 'Dr. Sarah Johnson',
    room: 'Room 101',
    time: '09:00 - 10:00',
    students: 35
  },
  {
    id: '2',
    subject: 'Computer Science Lab',
    teacher: 'Prof. Michael Chen',
    room: 'Lab 205',
    time: '10:00 - 12:00',
    students: 28
  },
  {
    id: '3',
    subject: 'Physics Tutorial',
    teacher: 'Dr. Emily Rodriguez',
    room: 'Room 303',
    time: '14:00 - 15:00',
    students: 22
  }
];

const mockRecentActivity = [
  {
    id: '1',
    action: 'Timetable updated for Computer Science Year 2',
    time: '2 hours ago',
    type: 'update'
  },
  {
    id: '2',
    action: 'New room added: Conference Room A',
    time: '5 hours ago',
    type: 'create'
  },
  {
    id: '3',
    action: 'Teacher availability updated: Dr. Sarah Johnson',
    time: '1 day ago',
    type: 'update'
  }
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const { conflicts } = useTimetableStore();
  
  const activeConflicts = conflicts.filter(c => !c.isResolved);

  const getRoleDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'support_staff':
        return <SupportStaffDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.name}
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your timetable system today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {activeConflicts.length > 0 && (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              {activeConflicts.length} conflicts
            </Badge>
          )}
        </div>
      </div>

      {getRoleDashboard()}
    </div>
  );
}

function AdminDashboard() {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">
              3 on leave this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              +15 new enrollments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Room Utilization</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.utilizationRate}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockUpcomingClasses.map((class_) => (
              <div key={class_.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                <div>
                  <p className="font-medium">{class_.subject}</p>
                  <p className="text-sm text-muted-foreground">{class_.teacher}</p>
                  <p className="text-sm text-muted-foreground">{class_.room}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{class_.time}</p>
                  <p className="text-sm text-muted-foreground">{class_.students} students</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View Full Schedule
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockRecentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function TeacherDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>My Classes Today</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">You have 4 classes scheduled for today.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Update your weekly availability.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function StudentDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>My Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">View your class schedule and assignments.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Elective Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Choose your elective courses for next semester.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function SupportStaffDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Room Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Monitor and manage room bookings.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">View and update room maintenance schedules.</p>
        </CardContent>
      </Card>
    </div>
  );
}