import { DashboardLayout } from '../components/layout/DashboardLayout';
import { 
  MessageSquare, 
  MapPin, 
  ScanLine, 
  BarChart, 
  Database, 
  Search,
  Key,
  CreditCard,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react';

interface StatsCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: any;
}

interface QuickAction {
  title: string;
  description: string;
  icon: any;
  href: string;
  badge?: string;
}

const statsCards: StatsCard[] = [
  {
    title: 'API Calls Today',
    value: '1,247',
    change: '+12%',
    trend: 'up',
    icon: BarChart
  },
  {
    title: 'Documents Processed',
    value: '834',
    change: '+8%',
    trend: 'up',
    icon: ScanLine
  },
  {
    title: 'Embeddings Generated',
    value: '15.2K',
    change: '+23%',
    trend: 'up',
    icon: Database
  },
  {
    title: 'Success Rate',
    value: '99.7%',
    change: '0%',
    trend: 'neutral',
    icon: CheckCircle
  }
];

const quickActions: QuickAction[] = [
  {
    title: 'Chat OCR',
    description: 'AI-powered document analysis with Q&A',
    icon: MessageSquare,
    href: '/dashboard/playground/chat-ocr'
  },
  {
    title: 'GeoText OCR',
    description: 'OCR with bounding box coordinates',
    icon: MapPin,
    href: '/dashboard/playground/geotext-ocr'
  },
  {
    title: 'Fast OCR',
    description: 'Quick multilingual text extraction',
    icon: ScanLine,
    href: '/dashboard/playground/fast-ocr'
  },
  {
    title: 'Search Lab',
    description: 'Test vector search with demo data',
    icon: Search,
    href: '/dashboard/playground/search-lab',
    badge: '50 rows max'
  },
  {
    title: 'API Keys',
    description: 'Manage your authentication keys',
    icon: Key,
    href: '/dashboard/manage/api-keys'
  },
  {
    title: 'Batch API',
    description: 'Process multiple documents efficiently',
    icon: Layers,
    href: '/dashboard/optimize/batch-api'
  }
];

const recentActivity = [
  {
    id: 1,
    action: 'Chat OCR processed invoice.pdf',
    time: '2 minutes ago',
    status: 'success'
  },
  {
    id: 2,
    action: 'Vector embedding generated for 50 documents',
    time: '5 minutes ago',
    status: 'success'
  },
  {
    id: 3,
    action: 'API key "prod-key-01" created',
    time: '1 hour ago',
    status: 'info'
  },
  {
    id: 4,
    action: 'Batch job completed with 99.2% success rate',
    time: '2 hours ago',
    status: 'success'
  }
];

export function Dashboard() {
  const currentUser = {
    name: 'John Doe',
    avatar: undefined
  };

  return (
    <DashboardLayout currentPage="/dashboard" currentUser={currentUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Monitor your API usage and access powerful AI tools
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {stat.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              <a 
                href="/dashboard/playground" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <a
                    key={index}
                    href={action.href}
                    className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
                        <IconComponent className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 group-hover:text-blue-900">
                            {action.title}
                          </h3>
                          {action.badge && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                              {action.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 group-hover:text-blue-700">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <a 
                href="/dashboard/manage/usage-billing" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </a>
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`p-1 rounded-full mt-1 ${
                    activity.status === 'success' ? 'bg-green-100' :
                    activity.status === 'error' ? 'bg-red-100' :
                    'bg-blue-100'
                  }`}>
                    {activity.status === 'success' && <CheckCircle className="w-3 h-3 text-green-600" />}
                    {activity.status === 'error' && <AlertCircle className="w-3 h-3 text-red-600" />}
                    {activity.status === 'info' && <Zap className="w-3 h-3 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 font-medium">{activity.action}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                New to HashHub?
              </h3>
              <p className="text-gray-600 mb-4">
                Get started with our powerful APIs in just a few minutes. Follow our quickstart guide.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/docs/quickstart"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Quickstart Guide
                </a>
                <a
                  href="/docs/api-reference"
                  className="bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  API Reference
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
