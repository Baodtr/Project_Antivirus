import { useState } from "react";
import { FileBarChart, Send, Settings, CheckSquare, CalendarDays, FileText } from "lucide-react";

export default function AutomatedReports() {
  const [reports] = useState([
    { id: 1, name: "Báo cáo bảo mật hàng tháng", frequency: "Ngày 1 hàng tháng", format: "PDF, Email", active: true, lastSent: "01/03/2024", targets: "Tất cả khách hàng (Active)" },
    { id: 2, name: "Tổng kết sự cố (Incident Summary)", frequency: "Hàng tuần (Thứ 2)", format: "PDF, Cổng portal", active: true, lastSent: "18/03/2024", targets: "Khách hàng Enterprise" },
    { id: 3, name: "Biến động License & Sử dụng", frequency: "Ngày 15 hàng tháng", format: "CSV", active: false, lastSent: "15/02/2024", targets: "Admin MSP" },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Báo cáo tự động cho Khách hàng (Automated Client Reporting)</h2>
          <p className="text-slate-500 mt-1">Cấu hình lịch trình tự động tạo và gửi báo cáo bảo mật định kỳ cho từng tenant.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
          <FileBarChart className="w-4 h-4" /> Tạo lịch trình mới
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          {reports.map((report) => (
            <div key={report.id} className={`bg-white rounded-xl shadow-sm border p-6 transition-all ${report.active ? 'border-indigo-200' : 'border-slate-200 opacity-70'}`}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-lg shrink-0 mt-0.5 ${report.active ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                    <CalendarDays className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                      {report.name}
                      {report.active && <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-green-100 text-green-700 rounded-full border border-green-200">Đang chạy</span>}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-600">
                      <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {report.format}</span>
                      <span className="flex items-center gap-1"><Send className="w-3.5 h-3.5" /> Lần cuối: {report.lastSent}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-3 font-medium bg-slate-50 inline-block px-2 py-1 rounded-md border border-slate-100">
                      Gửi tới: {report.targets}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200" title="Chỉnh sửa lịch">
                    <Settings className="w-4 h-4" />
                  </button>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={report.active} readOnly />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Configuration Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-fit">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-lg font-semibold text-slate-800">Cấu hình mẫu báo cáo</h3>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-slate-600 mb-2">Tùy chỉnh nội dung sẽ được bao gồm trong báo cáo tự động.</p>
            {[
              "Tổng quan số lượng thiết bị",
              "Biểu đồ mối đe dọa (7/30 ngày)",
              "Chi tiết file bị cách ly",
              "Trạng thái cập nhật Database",
              "Khuyến nghị bảo mật (AI Generated)",
            ].map((item, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 rounded border border-slate-300 group-hover:border-indigo-500 transition-colors">
                  <input type="checkbox" className="peer sr-only" defaultChecked={i < 4} />
                  <CheckSquare className="w-4 h-4 text-indigo-600 opacity-0 peer-checked:opacity-100 absolute transition-opacity" />
                </div>
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{item}</span>
              </label>
            ))}
            <button className="w-full mt-4 py-2 text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors flex justify-center items-center gap-2">
              <FileText className="w-4 h-4" /> Xem trước mẫu (Preview)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
