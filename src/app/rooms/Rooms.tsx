import { useState } from 'react';
import { Plus, Search, Filter, Building, Users, Wrench, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockRooms = [
  {
    id: '1',
    code: 'R101',
    name: 'Lecture Hall A',
    type: 'lecture_hall',
    capacity: 120,
    location: 'First Floor, Main Building',
    floor: 1,
    building: 'Main Building',
    isActive: true,
    equipment: [
      { name: 'Projector', quantity: 1, isWorking: true },
      { name: 'Microphone System', quantity: 1, isWorking: true },
      { name: 'Whiteboard', quantity: 2, isWorking: true }
    ],
    features: ['Air Conditioning', 'Audio System', 'Recording Equipment'],
    utilization: 75,
    currentBooking: 'Advanced Mathematics - Dr. Sarah Johnson',
    nextAvailable: '14:00'
  },
  {
    id: '2',
    code: 'L205',
    name: 'Computer Science Lab',
    type: 'computer_lab',
    capacity: 30,
    location: 'Second Floor, Technology Block',
    floor: 2,
    building: 'Technology Block',
    isActive: true,
    equipment: [
      { name: 'Computer', quantity: 30, isWorking: 28 },
      { name: 'Projector', quantity: 1, isWorking: true },
      { name: 'Server Rack', quantity: 1, isWorking: true }
    ],
    features: ['High-Speed Internet', 'Individual Power Outlets', 'Climate Control'],
    utilization: 85,
    currentBooking: null,
    nextAvailable: 'Available Now'
  },
  {
    id: '3',
    code: 'R303',
    name: 'Physics Laboratory',
    type: 'lab',
    capacity: 25,
    location: 'Third Floor, Science Block',
    floor: 3,
    building: 'Science Block',
    isActive: false,
    equipment: [
      { name: 'Lab Bench', quantity: 12, isWorking: true },
      { name: 'Oscilloscope', quantity: 6, isWorking: 5 },
      { name: 'Power Supply', quantity: 12, isWorking: 11 }
    ],
    features: ['Emergency Shower', 'Fume Hood', 'Gas Supply'],
    utilization: 0,
    currentBooking: null,
    nextAvailable: 'Under Maintenance'
  }
];

export default function Rooms() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredRooms = mockRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.building.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Room & Resource Management</h1>
          <p className="text-muted-foreground">
            Manage rooms, equipment, and track utilization
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Room
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
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
          <TabsTrigger value="all">All Rooms</TabsTrigger>
          <TabsTrigger value="lecture_hall">Lecture Halls</TabsTrigger>
          <TabsTrigger value="lab">Laboratories</TabsTrigger>
          <TabsTrigger value="classroom">Classrooms</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface RoomCardProps {
  room: typeof mockRooms[0];
}

function RoomCard({ room }: RoomCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture_hall':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'computer_lab':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'lab':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'classroom':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Calculate equipment health
  const equipmentHealth = 85; // Mock calculation for now
  

  return (
    <Card className={`hover:shadow-medium transition-shadow ${!room.isActive ? 'opacity-75' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{room.name}</CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary">{room.code}</Badge>
              <Badge className={getTypeColor(room.type)}>
                {room.type.replace('_', ' ')}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <Badge variant={room.isActive ? 'default' : 'destructive'}>
              {room.isActive ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{room.location}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{room.capacity} capacity</span>
          </div>
          <div className="flex items-center gap-1">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span>Floor {room.floor}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Utilization</span>
            <span>{room.utilization}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                room.utilization >= 90 ? 'bg-destructive' : 
                room.utilization >= 70 ? 'bg-warning' : 'bg-primary'
              }`}
              style={{ width: `${room.utilization}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Equipment Health</span>
            <span>{equipmentHealth}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                equipmentHealth >= 90 ? 'bg-success' : 
                equipmentHealth >= 70 ? 'bg-warning' : 'bg-destructive'
              }`}
              style={{ width: `${equipmentHealth}%` }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Features:</p>
          <div className="flex flex-wrap gap-1">
            {room.features.slice(0, 3).map((feature) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {room.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{room.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Status:</span>
            <span className={room.currentBooking ? "text-destructive" : "text-success"}>
              {room.currentBooking || room.nextAvailable}
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 gap-1">
            <Wrench className="h-3 w-3" />
            Manage
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}