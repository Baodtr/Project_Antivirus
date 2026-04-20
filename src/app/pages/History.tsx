import { Clock, ShieldCheck, ShieldAlert, FileText, Search, Activity } from "lucide-react";

type LogEntry = {
  id: string;
  type: 'scan' | 'threat' | 'system';
  action: string;
  details: string;
  date: string;
  status: 'success' | 'warning' | 'error';
};

const logs: LogEntry[] = [
  { id: "1", type: "scan", action: "Quét hệ thống toàn diện", details: "Không phát hiện mối đe dọa. Đã quét 250,142 tệp.", date: "Hôm nay, 10:30", status: "success" },
  { id: "2", type: "system", action: "Cập nhật cơ sở dữ liệu", details: "Cơ sở dữ liệu virus được cập nhật lên phiên bản 2024.03.25.", date: "Hôm nay, 08:00", status: "success" },
  { id: "3", type: "threat", action: "Phát hiện mã độc", details: "Đã chặn trojan_downloader.exe từ trình duyệt.", date: "Hôm qua, 15:45", status: "error" },
  { id: "4", type: "scan", action: "Quét nhanh", details: "Phát hiện 1 tệp đáng ngờ. Đã chuyển vào vùng cách ly.", date: "24/03/2024, 09:15", status: "warning" },
  { id: "5", type: "system", action: "Thay đổi cài đặt", details: "Bật tính năng quét tự động hàng tuần.", date: "22/03/2024, 11:20", status: "success" },
  { id: "6", type: "threat", action: "Kiểm tra URL", details: "Phát hiện trang web lừa đảo (phishing). Đã chặn truy cập.", date: "21/03/2024, 20:10", status: "error" },
];

export default function History() {
  const getIcon = (type: string, status: string) => {
    if (type === 'threat' || status === 'error') return <ShieldAlert className="w-5 h-5 text-red-500" />;
    if (status === 'warning') return <Activity className="w-5 h-5 text-orange-500" />;
    if (type === 'scan') return <Search className="w-5 h-5 text-indigo-500" />;
    return <ShieldCheck className="w-5 h-5 text-green-500" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Lịch sử hoạt động</h2>
          <p className="text-slate-500 mt-1">Ghi log các lần quét, phát hiện mối đe dọa và sự kiện hệ thống.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
          <FileText className="w-4 h-4" />
          Xuất báo cáo
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="divide-y divide-slate-100">
          {logs.map((log) => (
            <div key={log.id} className="p-5 hover:bg-slate-50/50 transition-colors flex items-start gap-4">
              <div className="mt-1 shrink-0 p-2 bg-slate-50 rounded-lg border border-slate-100 shadow-sm">
                {getIcon(log.type, log.status)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <h3 className="text-base font-semibold text-slate-900 truncate">
                    {log.action}
                  </h3>
                  <span className="text-sm text-slate-500 shrink-0 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {log.date}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{log.details}</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${getStatusColor(log.status)}`}>
                  {log.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 text-center">
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            Tải thêm nhật ký...
          </button>
        </div>
      </div>
    </div>
  );
}
