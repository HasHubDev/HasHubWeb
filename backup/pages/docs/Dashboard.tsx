"use client";

import { useState } from "react";
import { 
  Copy, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  ExternalLink,
  Key,
  Activity
} from "lucide-react";
import { Button } from "../../components/ui/button";

export function Dashboard() {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const apiKey = "sk-hashub_live_1234567890abcdef1234567890abcdef";
  const maskedKey = "sk-••••••••••••••••••••••••••••••••••••1234";

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const usageData = [
    { day: "Mon", doc: 45, vector: 120 },
    { day: "Tue", doc: 52, vector: 98 },
    { day: "Wed", doc: 38, vector: 150 },
    { day: "Thu", doc: 67, vector: 89 },
    { day: "Fri", doc: 54, vector: 134 },
    { day: "Sat", doc: 23, vector: 67 },
    { day: "Sun", doc: 31, vector: 78 }
  ];

  const recentActivity = [
    { timestamp: "2 minutes ago", method: "POST", endpoint: "/v1/doc/process", status: "200 OK", duration: "1.2s" },
    { timestamp: "5 minutes ago", method: "POST", endpoint: "/v1/vector/embed", status: "200 OK", duration: "0.8s" },
    { timestamp: "12 minutes ago", method: "POST", endpoint: "/v1/doc/process", status: "200 OK", duration: "2.1s" },
    { timestamp: "18 minutes ago", method: "POST", endpoint: "/v1/vector/embed", status: "200 OK", duration: "0.6s" },
    { timestamp: "25 minutes ago", method: "POST", endpoint: "/v1/doc/process", status: "422 Error", duration: "0.3s" }
  ];

  const maxUsage = Math.max(...usageData.map(d => Math.max(d.doc, d.vector)));

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-lg text-muted-foreground">Welcome back, Hasan</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* API Usage Today */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Today's Usage</h3>
              <p className="text-sm text-muted-foreground">API calls made today</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">hashub-doc</span>
              <span className="font-bold text-foreground">67 calls</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">hashub-vector</span>
              <span className="font-bold text-foreground">134 calls</span>
            </div>
          </div>
        </div>

        {/* This Month */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">This Month</h3>
              <p className="text-sm text-muted-foreground">Total API calls</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total calls</span>
              <span className="font-bold text-foreground">2,847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Success rate</span>
              <span className="font-bold text-green-500">99.2%</span>
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Performance</h3>
              <p className="text-sm text-muted-foreground">Average response time</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">hashub-doc</span>
              <span className="font-bold text-foreground">1.2s</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">hashub-vector</span>
              <span className="font-bold text-foreground">0.8s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - 2/3 width */}
        <div className="xl:col-span-2 space-y-8">
          {/* API Usage Chart */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">API Usage (Last 7 Days)</h3>
                <p className="text-sm text-muted-foreground">Daily API calls breakdown</p>
              </div>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Detailed Usage
              </Button>
            </div>
            
            {/* Simple Bar Chart */}
            <div className="space-y-4">
              {usageData.map((data, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{data.day}</span>
                    <span className="text-foreground">{data.doc + data.vector} calls</span>
                  </div>
                  <div className="flex gap-1 h-2 bg-muted rounded-full overflow-hidden">
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
              <div className="flex items-center gap-4 pt-2 text-xs">
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

          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status.includes('200') ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <div className="text-sm font-mono text-foreground">
                        {activity.method} {activity.endpoint}
                      </div>
                      <div className="text-xs text-muted-foreground">{activity.timestamp}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      activity.status.includes('200') ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {activity.status}
                    </div>
                    <div className="text-xs text-muted-foreground">{activity.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-8">
          {/* API Keys */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Your API Key</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Live Key</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={copyApiKey}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {copiedKey ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <code className="text-sm font-mono text-foreground">
                  {showApiKey ? apiKey : maskedKey}
                </code>
              </div>
              
              <Button className="w-full" variant="outline">
                <Key className="w-4 h-4 mr-2" />
                Manage Keys
              </Button>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Start</h3>
            <div className="space-y-3">
              {[
                "How to make your first API call",
                "Understanding the hashub-doc response",
                "Visit the Playground to test without code"
              ].map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{index + 1}. {item}</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
