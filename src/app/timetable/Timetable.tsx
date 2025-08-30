import { useState } from 'react';
import { Calendar, Plus, Settings, Download, Undo, Redo, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTimetableStore } from '@/state/timetable';
import { WeekGrid } from '@/components/timetable/WeekGrid';
import { ConflictPanel } from '@/components/timetable/ConflictPanel';
import { TimetableControls } from '@/components/timetable/TimetableControls';

export default function Timetable() {
  const { 
    currentTimetable, 
    conflicts, 
    isGenerating, 
    isDirty,
    history,
    historyIndex,
    undo,
    redo
  } = useTimetableStore();
  
  const [selectedTab, setSelectedTab] = useState('editor');
  
  const activeConflicts = conflicts.filter(c => !c.isResolved);
  const errorConflicts = activeConflicts.filter(c => c.severity === 'error');
  const warningConflicts = activeConflicts.filter(c => c.severity === 'warning');

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Timetable Management</h1>
          <p className="text-muted-foreground">
            Create and manage class schedules with conflict detection
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isDirty && (
            <Badge variant="outline" className="gap-1">
              Unsaved changes
            </Badge>
          )}
          {activeConflicts.length > 0 && (
            <Badge variant={errorConflicts.length > 0 ? "destructive" : "secondary"} className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              {activeConflicts.length} conflicts
            </Badge>
          )}
        </div>
      </div>

      {/* Conflict Alert */}
      {errorConflicts.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            There are {errorConflicts.length} critical conflicts that need to be resolved.
            {warningConflicts.length > 0 && ` Additionally, ${warningConflicts.length} warnings were detected.`}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-4">
          <TimetableControls />
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={undo}
            disabled={!canUndo}
            className="gap-1"
          >
            <Undo className="h-3 w-3" />
            Undo
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={redo}
            disabled={!canRedo}
            className="gap-1"
          >
            <Redo className="h-3 w-3" />
            Redo
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-3 w-3" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Settings className="h-3 w-3" />
            Settings
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="editor">Timetable Editor</TabsTrigger>
          <TabsTrigger value="conflicts">
            Conflicts
            {activeConflicts.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeConflicts.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="generator">Auto Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-6">
          {currentTimetable ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{currentTimetable.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    Year {currentTimetable.year}, Semester {currentTimetable.semester}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={currentTimetable.isActive ? "default" : "secondary"}>
                    {currentTimetable.isActive ? "Active" : "Draft"}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    v{currentTimetable.version}
                  </span>
                </div>
              </div>
              
              <WeekGrid />
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-64 space-y-4">
                <Calendar className="h-12 w-12 text-muted-foreground" />
                <div className="text-center">
                  <h3 className="font-medium">No Timetable Selected</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a new timetable or select an existing one to start editing
                  </p>
                </div>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Timetable
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="conflicts" className="space-y-4">
          <ConflictPanel conflicts={activeConflicts} />
        </TabsContent>

        <TabsContent value="generator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automatic Timetable Generation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Generate a timetable automatically based on courses, teacher availability, and room constraints.
                </p>
                <Button disabled={isGenerating} className="gap-2">
                  {isGenerating && <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />}
                  {isGenerating ? 'Generating...' : 'Generate Timetable'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}