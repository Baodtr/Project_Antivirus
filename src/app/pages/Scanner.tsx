import { useState, useEffect } from "react";
import { Search, ShieldAlert, CheckCircle2, Play, Pause, Loader2, Trash2, Archive, XCircle, ShieldBan } from "lucide-react";
import AIMonitorWidget from "../components/AIMonitorWidget.js";

export default function Scanner() {
  const [scanState, setScanState] = useState<"idle" | "scanning" | "paused" | "completed">("idle");
  const [progress, setProgress] = useState(0);
  const [filesScanned, setFilesScanned] = useState(0);
  const [threatsFound, setThreatsFound] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const mockThreats = [
    { id: 1, name: "Trojan.Win32.Generic", file: "C:\\Users\\Downloads\\crack.exe", risk: "Cao" },
    { id: 2, name: "Adware.BrowserExtension", file: "C:\\Program Files\\UnknownApp\\ext.dll", risk: "Trung bình" },
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (scanState === "scanning" && progress < 100) {
      timer = setTimeout(() => {
        setProgress(p => Math.min(p + (Math.random() * 5 + 2), 100));
        setFilesScanned(f => f + Math.floor(Math.random() * 150 + 50));
        if (Math.random() > 0.8) {
          setThreatsFound(t => Math.min(t + 1, 2)); // Limit to 2 for demo
        }
      }, 300);
    } else if (progress >= 100) {
      setScanState("completed");
    }
    return () => clearTimeout(timer);
  }, [scanState, progress]);

  const handleStartScan = (type: "quick" | "full" | "custom") => {
    setProgress(0);
    setFilesScanned(0);
    setThreatsFound(0);
    setShowResults(false);
    setScanState("scanning");
  };

  const handleAction = (action: string) => {
    alert(`Đã thực hiện hành động: ${action} cho tất cả mối đe dọa.`);
    setScanState("idle");
    setShowResults(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Quét hệ thống & AI Giám sát</h2>
          <p className="text-slate-500 mt-1">Phát hiện, phân tích và loại bỏ phần mềm độc hại khỏi thiết bị của bạn.</p>
        </div>
      </div>

      {/* AI Monitor for Individual */}
      <AIMonitorWidget 
        level={scanState === 'completed' && threatsFound > 0 ? 'danger' : 'safe'}
        title="AI Giám sát theo thời gian thực"
        recommendations={
          scanState === 'completed' && threatsFound > 0 
            ? ["Lập tức cách ly hoặc xóa các tệp tin nguy hiểm.", "Cập nhật lại cơ sở dữ liệu virus ngay lập tức.", "Đổi mật khẩu các tài khoản vừa đăng nhập gần đây."]
            : ["Kích hoạt tính năng quét định kỳ mỗi tuần.", "Bật tường lửa mức ứng dụng để chặn kết nối lạ.", "Cẩn thận khi tải các tệp tin đính kèm từ email lạ."]
        }
        warnings={
          scanState === 'completed' && threatsFound > 0 
            ? ["Hệ thống phát hiện tệp thực thi trái phép (Trojan).", "Có dấu hiệu thay đổi Registry ẩn."]
            : []
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Scan Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <button
              onClick={() => handleStartScan("quick")}
              disabled={scanState === "scanning"}
              className="w-full text-left p-6 hover:bg-slate-50 transition-colors flex items-start gap-4 border-b border-slate-100 disabled:opacity-50"
            >
              <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Quét nhanh</h3>
                <p className="text-sm text-slate-500 mt-1">Quét các khu vực quan trọng và thường bị nhiễm virus nhất. Quá trình này chỉ mất vài phút.</p>
              </div>
            </button>
            <button
              onClick={() => handleStartScan("full")}
              disabled={scanState === "scanning"}
              className="w-full text-left p-6 hover:bg-slate-50 transition-colors flex items-start gap-4 border-b border-slate-100 disabled:opacity-50"
            >
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Quét toàn diện</h3>
                <p className="text-sm text-slate-500 mt-1">Quét sâu toàn bộ hệ thống, bao gồm cả các ổ cứng gắn ngoài và phân vùng ẩn. Có thể mất hơn một giờ.</p>
              </div>
            </button>
            <button
              onClick={() => handleStartScan("custom")}
              disabled={scanState === "scanning"}
              className="w-full text-left p-6 hover:bg-slate-50 transition-colors flex items-start gap-4 disabled:opacity-50"
            >
               <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Kiểm tra URL / Tập tin cụ thể</h3>
                <p className="text-sm text-slate-500 mt-1">Chọn thư mục, tệp hoặc nhập URL để kiểm tra độ an toàn.</p>
              </div>
            </button>
          </div>
        </div>

        {/* Scan Progress Panel */}
        <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-8 text-white flex flex-col justify-center min-h-[400px]">
          {scanState === "idle" && !showResults && (
            <div className="text-center opacity-60">
              <ShieldAlert className="w-16 h-16 mx-auto mb-4 text-slate-500" />
              <p>Chọn một tùy chọn quét để bắt đầu kiểm tra máy tính của bạn.</p>
            </div>
          )}

          {(scanState === "scanning" || (scanState === "completed" && !showResults)) && (
            <div className="space-y-8 w-full animate-in zoom-in duration-300">
              <div className="text-center">
                <h3 className="text-xl font-medium mb-2">
                  {scanState === "scanning" ? "Đang quét hệ thống..." : "Hoàn tất quét!"}
                </h3>
                {scanState === "scanning" ? (
                  <p className="text-slate-400 text-sm flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Kiểm tra C:\Windows\System32\...
                  </p>
                ) : (
                  <p className="text-green-400 text-sm">Quá trình quét đã hoàn tất 100%.</p>
                )}
              </div>

              {/* Circular Progress */}
              <div className="relative flex justify-center py-4">
                 <svg className="w-32 h-32 transform -rotate-90">
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent"
                      strokeDasharray={60 * 2 * Math.PI}
                      strokeDashoffset={60 * 2 * Math.PI - (progress / 100) * (60 * 2 * Math.PI)}
                      className={`transition-all duration-300 ease-out ${scanState === 'completed' && threatsFound === 0 ? 'text-green-500' : (threatsFound > 0 ? 'text-red-500' : 'text-indigo-500')}`} />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{Math.round(progress)}%</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center border-t border-slate-700 pt-6">
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Đã quét</p>
                  <p className="text-2xl font-semibold">{filesScanned.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Phát hiện</p>
                  <p className={`text-2xl font-semibold ${threatsFound > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {threatsFound}
                  </p>
                </div>
              </div>

              {scanState === "scanning" && (
                <div className="flex justify-center gap-4">
                   <button className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium transition-colors">
                     Tạm dừng
                   </button>
                   <button onClick={() => setScanState("idle")} className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-medium transition-colors">
                     Hủy quét
                   </button>
                </div>
              )}
               {scanState === "completed" && (
                <div className="flex justify-center gap-4">
                   <button onClick={() => setScanState("idle")} className="px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors">
                     Đóng
                   </button>
                   {threatsFound > 0 && (
                      <button onClick={() => setShowResults(true)} className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors shadow-lg shadow-red-500/20 animate-pulse">
                        Xem chi tiết & Xử lý
                      </button>
                   )}
                </div>
              )}
            </div>
          )}

          {/* Results Details & Actions */}
          {showResults && (
             <div className="space-y-6 w-full animate-in slide-in-from-right-8 duration-300">
               <div>
                 <h3 className="text-lg font-bold text-red-400 mb-1 flex items-center gap-2">
                   <ShieldAlert className="w-5 h-5" /> Phát hiện {threatsFound} rủi ro!
                 </h3>
                 <p className="text-sm text-slate-400">Các phần mềm độc hại đã được xác định, hãy chọn phương án xử lý (AI đề xuất: Cách ly hoặc Xóa).</p>
               </div>
               
               <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                 {mockThreats.slice(0, threatsFound).map(threat => (
                   <div key={threat.id} className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                     <div className="flex justify-between items-start mb-2">
                       <span className="font-semibold text-sm text-red-400">{threat.name}</span>
                       <span className="text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded uppercase tracking-wider">{threat.risk}</span>
                     </div>
                     <p className="text-xs text-slate-400 font-mono break-all">{threat.file}</p>
                   </div>
                 ))}
               </div>

               <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                 <button onClick={() => handleAction('Xóa hoàn toàn')} className="flex items-center justify-center gap-2 p-3 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors">
                   <Trash2 className="w-4 h-4" /> Xóa hoàn toàn
                 </button>
                 <button onClick={() => handleAction('Cách ly (Quarantine)')} className="flex items-center justify-center gap-2 p-3 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm font-medium transition-colors">
                   <Archive className="w-4 h-4" /> Cách ly file
                 </button>
                 <button onClick={() => handleAction('Chặn kết nối')} className="flex items-center justify-center gap-2 p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors">
                   <ShieldBan className="w-4 h-4" /> Chặn IP/Tiến trình
                 </button>
                 <button onClick={() => handleAction('Bỏ qua')} className="flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                   <XCircle className="w-4 h-4" /> Bỏ qua (Rủi ro)
                 </button>
               </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
