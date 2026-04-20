import { useState } from "react";
import {
  FileDown,
  Filter,
  Calendar,
  ShieldCheck,
  ShieldAlert,
  Search,
  Activity,
  TrendingUp,
  Clock,
  FileText,
  Download,
  Printer,
  FileJson,
  FileSpreadsheet
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

// Mock data
const activityTrend = [
  { date: "01/04", scans: 12, threats: 2, quarantine: 1 },
  { date: "02/04", scans: 8, threats: 0, quarantine: 0 },
  { date: "03/04", scans: 15, threats: 4, quarantine: 3 },
  { date: "04/04", scans: 10, threats: 1, quarantine: 1 },
  { date: "05/04", scans: 20, threats: 5, quarantine: 4 },
  { date: "06/04", scans: 14, threats: 3, quarantine: 2 },
  { date: "07/04", scans: 11, threats: 1, quarantine: 1 },
  { date: "08/04", scans: 9, threats: 0, quarantine: 0 },
  { date: "09/04", scans: 16, threats: 2, quarantine: 2 },
  { date: "10/04", scans: 13, threats: 1, quarantine: 0 },
  { date: "11/04", scans: 18, threats: 3, quarantine: 2 },
  { date: "12/04", scans: 10, threats: 0, quarantine: 0 },
  { date: "13/04", scans: 14, threats: 2, quarantine: 1 },
  { date: "14/04", scans: 7, threats: 0, quarantine: 0 },
];

const threatTypes = [
  { name: "Trojan", value: 12, color: "#ef4444" },
  { name: "Virus", value: 8, color: "#f59e0b" },
  { name: "Spyware", value: 5, color: "#8b5cf6" },
  { name: "Phishing", value: 3, color: "#ec4899" },
  { name: "Adware", value: 2, color: "#06b6d4" },
];

const detailedActivities = [
  { id: "1", timestamp: "2026-04-14 10:30:25", type: "scan", action: "Quét toàn bộ hệ thống", result: "Clean", files: "250,142", duration: "18m 42s" },
  { id: "2", timestamp: "2026-04-14 08:00:12", type: "update", action: "Cập nhật database", result: "Success", files: "N/A", duration: "2m 15s" },
  { id: "3", timestamp: "2026-04-13 15:45:33", type: "threat", action: "Phát hiện Trojan", result: "Quarantined", files: "1", duration: "0m 03s" },
  { id: "4", timestamp: "2026-04-13 09:15:18", type: "scan", action: "Quét nhanh", result: "1 Threat", files: "52,341", duration: "4m 28s" },
  { id: "5", timestamp: "2026-04-12 11:20:45", type: "system", action: "Cấu hình tự động quét", result: "Updated", files: "N/A", duration: "0m 01s" },
  { id: "6", timestamp: "2026-04-11 20:10:09", type: "threat", action: "Block phishing URL", result: "Blocked", files: "N/A", duration: "0m 01s" },
  { id: "7", timestamp: "2026-04-10 16:30:55", type: "scan", action: "Quét thư mục Downloads", result: "Clean", files: "1,523", duration: "1m 12s" },
  { id: "8", timestamp: "2026-04-09 14:22:11", type: "threat", action: "Phát hiện Adware", result: "Removed", files: "2", duration: "0m 05s" },
];

export default function Reports() {
  const [dateRange, setDateRange] = useState("14days");
  const [filterType, setFilterType] = useState("all");

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    // Mock export functionality
    const timestamp = new Date().toISOString().split('T')[0];
    console.log(`Xuất báo cáo dưới dạng ${format.toUpperCase()} - malware_report_${timestamp}.${format}`);
    alert(`Đang xuất báo cáo dưới dạng ${format.toUpperCase()}...\nFile: malware_report_${timestamp}.${format}`);
  };

  const handlePrint = () => {
    window.print();
  };

  const totalScans = activityTrend.reduce((sum, item) => sum + item.scans, 0);
  const totalThreats = activityTrend.reduce((sum, item) => sum + item.threats, 0);
  const totalQuarantine = activityTrend.reduce((sum, item) => sum + item.quarantine, 0);
  const avgScansPerDay = (totalScans / activityTrend.length).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-mono">
            <span className="text-indigo-600">&gt;_</span> Báo cáo hoạt động
          </h2>
          <p className="text-slate-500 mt-2 font-mono text-sm">
            Phân tích chi tiết lịch sử quét, phát hiện và xử lý mã độc
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Date Range Filter */}
          <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg px-3 py-2 shadow-sm">
            <Calendar className="w-4 h-4 text-slate-500" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="7days">7 ngày qua</option>
              <option value="14days">14 ngày qua</option>
              <option value="30days">30 ngày qua</option>
              <option value="90days">90 ngày qua</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg px-3 py-2 shadow-sm">
            <Filter className="w-4 h-4 text-slate-500" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả hoạt động</option>
              <option value="scan">Chỉ quét</option>
              <option value="threat">Chỉ mối đe dọa</option>
              <option value="system">Chỉ hệ thống</option>
            </select>
          </div>

          <div className="h-8 w-px bg-slate-300"></div>

          {/* Export Buttons */}
          <button
            onClick={() => handleExport('pdf')}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2 group"
          >
            <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
            PDF
          </button>

          <button
            onClick={() => handleExport('csv')}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2 group"
          >
            <FileSpreadsheet className="w-4 h-4 group-hover:scale-110 transition-transform" />
            CSV
          </button>

          <button
            onClick={() => handleExport('json')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2 group"
          >
            <FileJson className="w-4 h-4 group-hover:scale-110 transition-transform" />
            JSON
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-2 group"
          >
            <Printer className="w-4 h-4 group-hover:scale-110 transition-transform" />
            In
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-1">Tổng lượt quét</p>
              <p className="text-4xl font-black text-blue-900 font-mono">{totalScans}</p>
              <p className="text-xs text-blue-600 mt-2 font-mono">~{avgScansPerDay} lượt/ngày</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Search className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-red-700 uppercase tracking-wider mb-1">Mối đe dọa</p>
              <p className="text-4xl font-black text-red-900 font-mono">{totalThreats}</p>
              <p className="text-xs text-red-600 mt-2 font-mono">Đã phát hiện</p>
            </div>
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-orange-700 uppercase tracking-wider mb-1">Đã cách ly</p>
              <p className="text-4xl font-black text-orange-900 font-mono">{totalQuarantine}</p>
              <p className="text-xs text-orange-600 mt-2 font-mono">Tệp nguy hiểm</p>
            </div>
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-green-700 uppercase tracking-wider mb-1">Tỷ lệ an toàn</p>
              <p className="text-4xl font-black text-green-900 font-mono">
                {((1 - totalThreats / totalScans) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-green-600 mt-2 font-mono">Hệ thống sạch</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Trend Chart */}
        <div className="lg:col-span-2 bg-white border-2 border-slate-200 rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              Xu hướng hoạt động
            </h3>
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                <span className="text-slate-600">Quét</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                <span className="text-slate-600">Mối đe dọa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
                <span className="text-slate-600">Cách ly</span>
              </div>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <AreaChart data={activityTrend}>
                <defs>
                  <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'monospace' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'monospace' }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="scans"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorScans)"
                  name="Lượt quét"
                />
                <Area
                  type="monotone"
                  dataKey="threats"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorThreats)"
                  name="Mối đe dọa"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Threat Types Pie Chart */}
        <div className="bg-white border-2 border-slate-200 rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            Phân loại mối đe dọa
          </h3>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <PieChart>
                <Pie
                  data={threatTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {threatTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '2px solid #e2e8f0',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {threatTypes.map((type) => (
              <div key={type.name} className="flex items-center justify-between text-sm font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: type.color }}></div>
                  <span className="text-slate-700">{type.name}</span>
                </div>
                <span className="font-bold text-slate-900">{type.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Activity Table */}
      <div className="bg-white border-2 border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
        <div className="bg-slate-800 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-mono">
            <FileText className="w-5 h-5" />
            Chi tiết hoạt động gần đây
          </h3>
          <span className="text-xs text-slate-300 font-mono bg-slate-700 px-3 py-1 rounded-full">
            {detailedActivities.length} bản ghi
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 border-b-2 border-slate-300">
              <tr className="font-mono">
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Timestamp</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Hành động</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Kết quả</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Files</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {detailedActivities.map((activity) => (
                <tr key={activity.id} className="hover:bg-slate-50 transition-colors font-mono text-xs">
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {activity.timestamp}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      activity.type === 'threat' ? 'bg-red-100 text-red-800 border border-red-300' :
                      activity.type === 'scan' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                      activity.type === 'update' ? 'bg-green-100 text-green-800 border border-green-300' :
                      'bg-slate-100 text-slate-800 border border-slate-300'
                    }`}>
                      {activity.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-900 font-medium">{activity.action}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                      activity.result === 'Clean' || activity.result === 'Success' || activity.result === 'Updated' ? 'bg-green-100 text-green-800 border border-green-300' :
                      activity.result === 'Quarantined' || activity.result === 'Blocked' ? 'bg-orange-100 text-orange-800 border border-orange-300' :
                      activity.result === 'Removed' ? 'bg-red-100 text-red-800 border border-red-300' :
                      'bg-yellow-100 text-yellow-800 border border-yellow-300'
                    }`}>
                      {activity.result}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{activity.files}</td>
                  <td className="px-4 py-3 text-slate-700">{activity.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors font-mono flex items-center gap-2">
            <Download className="w-4 h-4" />
            Tải xuống bảng chi tiết (CSV)
          </button>
          <span className="text-xs text-slate-500 font-mono">Hiển thị 1-{detailedActivities.length} / {detailedActivities.length}</span>
        </div>
      </div>

      {/* Print-only header */}
      <div className="hidden print:block">
        <div className="text-center mb-8 pb-6 border-b-2 border-slate-300">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">BÁO CÁO LỊCH SỬ HOẠT ĐỘNG</h1>
          <p className="text-sm text-slate-600">Hệ thống phát hiện và ngăn chặn mã độc - MDPS Shield</p>
          <p className="text-sm text-slate-600 mt-1">Ngày xuất: {new Date().toLocaleDateString('vi-VN')}</p>
        </div>
      </div>
    </div>
  );
}
