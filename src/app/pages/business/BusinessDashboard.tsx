import { Building2, MonitorSmartphone, ShieldAlert, Users, TrendingUp, FileWarning, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import AIMonitorWidget from "../../components/AIMonitorWidget.js";

const data = [
  { name: "Phòng IT", healthy: 45, infected: 0, offline: 2 },
  { name: "Kế toán", healthy: 12, infected: 2, offline: 1 },
  { name: "Nhân sự", healthy: 18, infected: 0, offline: 0 },
  { name: "Kinh doanh", healthy: 35, infected: 5, offline: 4 },
  { name: "Marketing", healthy: 22, infected: 1, offline: 1 },
];

const employeeErrors = [
  { id: 1, error: "Cắm USB lạ chưa qua quét", count: 24, level: "Nguy hiểm", solution: "Tắt tính năng AutoRun, quét tự động USB khi cắm.", policy: "Chính sách Chặn/Kiểm soát USB ngoài" },
  { id: 2, error: "Tải file đính kèm email giả mạo (Phishing)", count: 15, level: "Nguy hiểm", solution: "Triển khai hệ thống lọc email, đào tạo nhận thức nhân viên.", policy: "Tường lửa mức ứng dụng (Chặn tên miền lạ)" },
  { id: 3, error: "Tắt tạm thời Antivirus để cài phần mềm", count: 8, level: "Trung bình", solution: "Khóa quyền tắt Antivirus đối với tài khoản Non-Admin.", policy: "Chính sách Tamper Protection (Bảo vệ phần mềm)" },
  { id: 4, error: "Dùng chung mật khẩu yếu", count: 32, level: "Trung bình", solution: "Yêu cầu đổi mật khẩu 90 ngày/lần, độ phức tạp cao.", policy: "Chính sách Mật khẩu doanh nghiệp" },
];

export default function BusinessDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Tổng quan Doanh nghiệp & AI Giám sát</h2>
          <p className="text-slate-500 mt-1">Giám sát trạng thái bảo mật của toàn bộ thiết bị trong tổ chức và phân tích hành vi nhân viên.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm">
          Tạo báo cáo bảo mật
        </button>
      </div>

      <AIMonitorWidget 
        level="medium"
        title="AI Phân tích mức độ rủi ro Doanh nghiệp"
        warnings={[
          "Phát hiện 2 máy kế toán đang kết nối tới IP lạ bên ngoài.",
          "Có hiện tượng lây nhiễm phần mềm Adware tại phòng Kinh doanh."
        ]}
        recommendations={[
          "Nên bật 'Chính sách Chặn USB ngoài' cho toàn bộ phòng Kế toán và Kinh doanh.",
          "Yêu cầu quét toàn diện toàn bộ 147 thiết bị cuối tuần này.",
          "AI đề xuất: Tổ chức buổi đào tạo (Security Awareness) vì tỷ lệ dính Phishing tăng 15% trong tháng."
        ]}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <MonitorSmartphone className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Tổng số thiết bị</p>
            <p className="text-2xl font-bold text-slate-900">147</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +3 thiết bị mới
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start gap-4 relative overflow-hidden">
          <div className="absolute top-0 w-full h-1 left-0 bg-yellow-500"></div>
          <div className="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Thiết bị rủi ro</p>
            <p className="text-2xl font-bold text-slate-900">8</p>
            <p className="text-xs text-yellow-600 mt-1">Đang được AI theo dõi</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Nhóm người dùng</p>
            <p className="text-2xl font-bold text-slate-900">5</p>
            <p className="text-xs text-slate-400 mt-1">Đã áp dụng chính sách</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Điểm bảo mật</p>
            <p className="text-2xl font-bold text-slate-900">75/100</p>
            <p className="text-xs text-slate-400 mt-1">Hạng C (Cần cải thiện)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Trạng thái thiết bị theo phòng ban</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Legend iconType="circle" />
                <Bar dataKey="healthy" name="An toàn" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="offline" name="Ngoại tuyến" stackId="a" fill="#cbd5e1" />
                <Bar dataKey="infected" name="Nhiễm mã độc" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Cảnh báo gần đây</h3>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {[
              { id: 1, host: "SALES-PC-04", user: "nguyen.van.a", threat: "Ransomware.WannaCry", time: "10 phút trước", level: "critical" },
              { id: 2, host: "ACC-LAP-12", user: "tran.thi.b", threat: "Phishing Attempt", time: "1 giờ trước", level: "high" },
              { id: 3, host: "HR-PC-02", user: "le.van.c", threat: "Adware.Generic", time: "2 giờ trước", level: "medium" },
              { id: 4, host: "MKT-MAC-01", user: "pham.d", threat: "Suspicious Download", time: "Hôm qua", level: "low" },
            ].map(alert => (
              <div key={alert.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm text-slate-800">{alert.host}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    alert.level === 'critical' ? 'bg-red-100 text-red-700' :
                    alert.level === 'high' ? 'bg-orange-100 text-orange-700' :
                    alert.level === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {alert.level.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2 truncate">Mối đe dọa: <span className="font-medium text-slate-800">{alert.threat}</span></p>
                <div className="flex justify-between items-center text-[11px] text-slate-500">
                  <span>User: {alert.user}</span>
                  <span>{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors">
            Xem tất cả cảnh báo
          </button>
        </div>
      </div>

      {/* Employee Errors Analysis Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <FileWarning className="w-5 h-5 text-indigo-500" />
          <h3 className="text-lg font-semibold text-slate-800">AI Phân tích: Các lỗi phổ biến của nhân viên & Giải pháp</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Lỗi bảo mật (Hành vi)</th>
                <th className="px-6 py-4 text-center">Số lần vi phạm (Tháng)</th>
                <th className="px-6 py-4">Mức độ nguy hiểm</th>
                <th className="px-6 py-4">Giải pháp xử lý (AI Đề xuất)</th>
                <th className="px-6 py-4">Chính sách hạn chế cần áp dụng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employeeErrors.map((err) => (
                <tr key={err.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{err.error}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center bg-slate-100 px-2.5 py-1 rounded-full text-xs font-bold text-slate-700">
                      {err.count} lần
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold border ${
                      err.level === 'Nguy hiểm' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }`}>
                      {err.level === 'Nguy hiểm' && <AlertTriangle className="w-3 h-3" />}
                      {err.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {err.solution}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-indigo-50 text-indigo-700 font-medium px-2 py-1 rounded border border-indigo-100 inline-block">
                      {err.policy}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
