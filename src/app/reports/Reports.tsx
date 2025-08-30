import { useState } from 'react';
import { Download, FileText, BarChart3, Calendar, Filter, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { DateRangePicker } from '@/components/ui/date-range-picker';

const reportTypes = [
  {
    id: 'utilization',
    name: 'Room Utilization Report',
    description: 'Analyze room usage patterns and efficiency',
    icon: BarChart3,
    category: 'Analytics',
    formats: ['PDF', 'Excel']
  },
  {
    id: 'teacher-load',
    name: 'Teacher Workload Report',
    description: 'Review teaching hours and distribution',
    icon: TrendingUp,
    category: 'Analytics',
    formats: ['PDF', 'Excel']
  },
  {
    id: 'student-schedule',
    name: 'Student Schedule Report',
    description: 'Individual and batch student timetables',
    icon: Calendar,
    category: 'Schedule',
    formats: ['PDF']
  },
  {
    id: 'conflicts',
    name: 'Conflict Analysis Report',
    description: 'Detailed analysis of scheduling conflicts',
    icon: FileText,
    category: 'Analysis',
    formats: ['PDF', 'Excel']
  }
];

const recentReports = [
  {
    id: '1',
    name: 'Monthly Utilization - October 2024',
    type: 'Room Utilization',
    generatedAt: '2024-10-15T10:30:00Z',
    generatedBy: 'Dr. Sarah Johnson',
    size: '2.4 MB',
    format: 'PDF'
  },
  {
    id: '2',
    name: 'Teacher Workload - Q3 2024',
    type: 'Teacher Workload',
    generatedAt: '2024-10-10T14:15:00Z',
    generatedBy: 'Admin User',
    size: '1.8 MB',
    format: 'Excel'
  },
  {
    id: '3',
    name: 'Conflict Analysis - Week 42',
    type: 'Conflict Analysis',
    generatedAt: '2024-10-08T09:00:00Z',
    generatedBy: 'Prof. Michael Chen',
    size: '945 KB',
    format: 'PDF'
  }
];

export default function Reports() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);

  const categories = ['all', ...Array.from(new Set(reportTypes.map(r => r.category)))];
  
  const filteredReports = selectedCategory === 'all' 
    ? reportTypes 
    : reportTypes.filter(report => report.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatSize = (sizeString: string) => {
    return sizeString;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate and download comprehensive reports
          </p>
        </div>
      </div>

      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList>
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="history">Report History</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="flex items-center gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              Date Range
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Reports</h2>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {recentReports.map((report) => (
              <Card key={report.id}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{report.type}</Badge>
                        <Badge variant="secondary">{report.format}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatSize(report.size)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Generated {formatDate(report.generatedAt)} by {report.generatedBy}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ReportCardProps {
  report: typeof reportTypes[0];
}

function ReportCard({ report }: ReportCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(report.formats[0]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
  };

  return (
    <Card className="hover:shadow-medium transition-shadow">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <report.icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{report.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {report.description}
            </p>
            <Badge variant="outline" className="mt-2">
              {report.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Export Format</label>
          <Select value={selectedFormat} onValueChange={setSelectedFormat}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {report.formats.map((format) => (
                <SelectItem key={format} value={format}>
                  {format}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full gap-2"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              Generating...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Generate Report
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}