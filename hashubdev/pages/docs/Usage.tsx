import { BarChart3, TrendingUp, Calendar, Download } from "lucide-react";
import { Button } from "../../components/ui/button";

export function Usage() {
  const usageData = [
    { date: "Jan 1", doc: 45, vector: 120 },
    { date: "Jan 2", doc: 52, vector: 98 },
    { date: "Jan 3", doc: 38, vector: 150 },
    { date: "Jan 4", doc: 67, vector: 89 },
    { date: "Jan 5", doc: 54, vector: 134 },
    { date: "Jan 6", doc: 23, vector: 67 },
    { date: "Jan 7", doc: 31, vector: 78 },
    { date: "Jan 8", doc: 45, vector: 112 },
    { date: "Jan 9", doc: 59, vector: 95 },
    { date: "Jan 10", doc: 42, vector: 128 }
  ];

  const maxUsage = Math.max(...usageData.map(d => Math.max(d.doc, d.vector)));

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Usage Analytics</h1>
        <p className="text-lg text-muted-foreground">Monitor your API usage and billing</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-blue-500" />
            <div>
              <h3 className="font-semibold text-foreground">Total Calls</h3>
              <p className="text-sm text-muted-foreground">This month</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">2,847</div>
          <div className="text-sm text-green-500">+12% from last month</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-green-500" />
            <div>
              <h3 className="font-semibold text-foreground">Success Rate</h3>
              <p className="text-sm text-muted-foreground">Last 30 days</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">99.2%</div>
          <div className="text-sm text-green-500">+0.3% from last month</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-purple-500" />
            <div>
              <h3 className="font-semibold text-foreground">Daily Average</h3>
              <p className="text-sm text-muted-foreground">Last 7 days</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground mb-2">91</div>
          <div className="text-sm text-green-500">+8% from last week</div>
        </div>
      </div>

      {/* Usage Chart */}
      <div className="bg-card border border-border rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground">API Usage Over Time</h3>
            <p className="text-sm text-muted-foreground">Daily breakdown of API calls</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>

        <div className="space-y-4">
          {usageData.map((data, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{data.date}</span>
                <span className="text-foreground">{data.doc + data.vector} calls</span>
              </div>
              <div className="flex gap-1 h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 transition-all duration-500"
                  style={{ width: `${(data.doc / maxUsage) * 100}%` }}
                />
                <div 
                  className="bg-purple-500 transition-all duration-500"
                  style={{ width: `${(data.vector / maxUsage) * 100}%` }}
                />
              </div>
            </div>
          ))}
          <div className="flex items-center gap-4 pt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-muted-foreground">hashub-doc</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span className="text-muted-foreground">hashub-vector</span>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">hashub-doc Usage</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total pages processed</span>
              <span className="font-semibold text-foreground">1,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Average per day</span>
              <span className="font-semibold text-foreground">40.2</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Success rate</span>
              <span className="font-semibold text-green-500">99.1%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Avg processing time</span>
              <span className="font-semibold text-foreground">1.2s</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">hashub-vector Usage</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total embeddings</span>
              <span className="font-semibold text-foreground">3,156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Average per day</span>
              <span className="font-semibold text-foreground">101.8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Success rate</span>
              <span className="font-semibold text-green-500">99.8%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Avg processing time</span>
              <span className="font-semibold text-foreground">0.8s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
