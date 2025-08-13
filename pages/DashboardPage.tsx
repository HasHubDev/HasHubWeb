import { MainLayout } from '../components/layout/MainLayout';
import { 
  BarChart3, 
  Users, 
  MessageCircle, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react';

export function DashboardPage() {
  return (
    <MainLayout currentSection="dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's an overview of your HashHub activity.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                New Project
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total API Calls</p>
                <p className="text-2xl font-bold text-gray-900">12,543</p>
                <p className="text-xs text-green-600 mt-1">+12% from last month</p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-xs text-green-600 mt-1">+2 new this week</p>
              </div>
              <FileText className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Documents Processed</p>
                <p className="text-2xl font-bold text-gray-900">1,892</p>
                <p className="text-xs text-green-600 mt-1">+24% efficiency</p>
              </div>
              <MessageCircle className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">98.5%</p>
                <p className="text-xs text-green-600 mt-1">+0.3% improvement</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Document analysis completed</p>
                  <p className="text-xs text-gray-500">Project: Invoice Processing - 2 minutes ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">API key renewed</p>
                  <p className="text-xs text-gray-500">Valid until: Dec 2024 - 1 hour ago</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Rate limit warning</p>
                  <p className="text-xs text-gray-500">90% of monthly quota used - 3 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <MessageCircle className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">Chat OCR</p>
                <p className="text-xs text-gray-500">Process documents</p>
              </button>

              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <BarChart3 className="w-6 h-6 text-green-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">Vector Search</p>
                <p className="text-xs text-gray-500">Search embeddings</p>
              </button>

              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Users className="w-6 h-6 text-purple-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">Team Settings</p>
                <p className="text-xs text-gray-500">Manage access</p>
              </button>

              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <FileText className="w-6 h-6 text-orange-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">View Docs</p>
                <p className="text-xs text-gray-500">Get started guide</p>
              </button>
            </div>
          </div>
        </div>

        {/* API Usage Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">API Usage (Last 7 Days)</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Chart component will be integrated here</p>
              <p className="text-sm">Showing API calls, success rates, and response times</p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
