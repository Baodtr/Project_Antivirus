import { useState } from "react";
import { UploadCloud, FileSearch, Bug, Fingerprint, Network, Binary, ShieldAlert, FileWarning, Search, Building } from "lucide-react";
import AIMonitorWidget from "../../components/AIMonitorWidget.js";

const clientErrors = [
  { id: 1, name: "Cấu hình Firewall lỏng lẻo (Mở port RDP/3389 ra internet)", count: 18, risk: "Nguy hiểm", impact: "Dễ bị Brute-force & Ransomware", policy: "Chặn RDP public, bắt buộc kết nối VPN/Zero Trust." },
  { id: 2, name: "Bỏ qua cập nhật bản vá bảo mật (Patch Management)", count: 42, risk: "Cao", impact: "Lỗ hổng hệ điều hành chưa đóng", policy: "Bật chế độ Forced Centralized Update cho Windows/macOS." },
  { id: 3, name: "Sử dụng Server nội bộ thay vì Cloud không bảo vệ", count: 15, risk: "Trung bình", impact: "Dữ liệu backup bị tấn công chung", policy: "Chính sách Backup 3-2-1 (Bản sao off-site)." },
  { id: 4, name: "Cấp quá nhiều quyền Admin cho tài khoản cục bộ", count: 85, risk: "Cao", impact: "Mã độc dễ leo thang đặc quyền", policy: "Hủy quyền Local Admin hàng loạt, cấp quyền Privilege Access Management (PAM)." }
];

export default function ThreatAnalysis() {
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Phân tích Hệ thống & Rủi ro các Doanh nghiệp (MSP AI)</h2>
          <p className="text-slate-500 mt-1">Sử dụng AI phân tích rủi ro, lỗi cấu hình chung của các tổ chức và tạo mẫu phân tích sandbox.</p>
        </div>
      </div>

      <AIMonitorWidget 
        level="danger"
        title="AI Phân tích Rủi ro mạng lưới (Toàn bộ Tenants)"
        warnings={[
          "Mạng lưới phát hiện làn sóng rà quét cổng 3389 (RDP) từ nhiều dải IP quốc tế.",
          "Cảnh báo mã độc họ Emotet đang nhắm mục tiêu vào 3 doanh nghiệp Kế toán."
        ]}
        recommendations={[
          "Nên bắt buộc triển khai chính sách 'Chặn RDP ra internet' cho 18 khách hàng chưa tuân thủ.",
          "Phát hành bản vá khẩn cấp v24.4 tới tất cả các tenants trong hệ thống.",
          "Chuyển luật 'Chặn Macro Excel độc hại' từ chế độ Cảnh báo (Audit) sang Chặn (Block)."
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Malware Sample Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
            <Bug className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-semibold text-slate-800">Phân tích mẫu mã độc (Sandbox)</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
              <UploadCloud className="w-10 h-10 mx-auto text-slate-400 group-hover:text-indigo-500 transition-colors mb-3" />
              <p className="text-sm font-medium text-slate-700">Kéo thả file nghi ngờ hoặc click để tải lên</p>
              <p className="text-xs text-slate-500 mt-1">Hỗ trợ: .exe, .dll, .pdf, .docx, .zip (Max 50MB)</p>
            </div>

            <div className="flex items-center gap-4">
              <input type="text" placeholder="Hoặc nhập SHA256 / MD5 Hash..." className="flex-1 bg-white border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <button 
                onClick={handleAnalyze} 
                disabled={analyzing}
                className="px-6 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {analyzing ? <span className="animate-pulse">Đang phân tích...</span> : <><FileSearch className="w-4 h-4" /> Bắt đầu</>}
              </button>
            </div>

            {/* Analysis Results Mock */}
            <div className={`mt-6 space-y-4 border-t border-slate-100 pt-6 ${analyzing ? 'opacity-50 blur-sm pointer-events-none' : ''}`}>
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Kết quả phân tích mẫu (Giả lập)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                  <p className="text-xs text-red-600 font-bold uppercase mb-1 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> Mức độ đe dọa</p>
                  <p className="text-lg font-bold text-red-800">Cao (Ransomware)</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Loại file</p>
                  <p className="text-lg font-bold text-slate-800">PE32 Executable</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-600 border border-slate-200 rounded-lg divide-y divide-slate-100">
                <li className="px-4 py-2 flex items-center gap-2"><Network className="w-4 h-4 text-indigo-500" /> Kết nối C2 server (192.168.x.x)</li>
                <li className="px-4 py-2 flex items-center gap-2"><Binary className="w-4 h-4 text-orange-500" /> Chỉnh sửa Registry Key ẩn</li>
                <li className="px-4 py-2 flex items-center gap-2"><Fingerprint className="w-4 h-4 text-slate-500" /> Tạo bản sao tại C:\Windows\Temp</li>
              </ul>
              <button className="w-full mt-2 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">
                Tạo luật nhận diện (Signature)
              </button>
            </div>
          </div>
        </div>

        {/* Deep System Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
            <Search className="w-5 h-5 text-indigo-500" />
            <h3 className="text-lg font-semibold text-slate-800">Phân tích Hệ thống Sâu (Deep System Analysis)</h3>
          </div>
          <div className="p-6 space-y-6">
            <p className="text-sm text-slate-600 mb-4">
              Thực hiện quét bộ nhớ, process ẩn, và các dấu hiệu xâm phạm (Indicators of Compromise - IoC) trên toàn mạng lưới khách hàng.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Chọn Khách hàng (Tenant)</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Tất cả khách hàng (Global Scan)</option>
                  <option>Công ty TNHH Bình Minh</option>
                  <option>Tập đoàn ABC</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Chỉ số rủi ro (IoC)</label>
                <textarea rows={3} placeholder="Nhập IP, Domain, Hash hoặc chuỗi Yara..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
              </div>
              
              <button className="w-full px-4 py-2 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2">
                <Search className="w-4 h-4" /> Bắt đầu truy vết (Threat Hunting)
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Các phát hiện gần đây</h4>
              <div className="space-y-3">
                {[
                  { time: "10:30 AM", client: "Bình Minh", detail: "Phát hiện tiến trình PowerShell lạ trên máy KETOAN-01" },
                  { time: "09:15 AM", client: "ABC Group", detail: "Khớp 100% với IoC WannaCry trên 3 thiết bị" },
                  { time: "Hôm qua", client: "Tech Solutions", detail: "Kết nối C2 Server bị chặn bởi tường lửa" },
                ].map((item, i) => (
                  <div key={i} className="text-sm bg-slate-50 p-3 rounded-lg border border-slate-100 flex items-start gap-3">
                    <span className="text-xs text-slate-400 whitespace-nowrap mt-0.5">{item.time}</span>
                    <div>
                      <span className="font-semibold text-indigo-700">{item.client}</span>
                      <p className="text-slate-600 mt-0.5">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Analysis of Common Tenant Vulnerabilities */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
          <Building className="w-5 h-5 text-indigo-500" />
          <h3 className="text-lg font-semibold text-slate-800">AI Tổng hợp: Lỗ hổng / Lỗi quản trị phổ biến tại các Doanh nghiệp (Tenants)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Lỗi bảo mật doanh nghiệp</th>
                <th className="px-6 py-4 text-center">Số lượng Tenant mắc lỗi</th>
                <th className="px-6 py-4">Mức độ rủi ro</th>
                <th className="px-6 py-4">Hệ quả (Tác động)</th>
                <th className="px-6 py-4">Giải pháp / Chính sách cần triển khai tập trung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clientErrors.map((err) => (
                <tr key={err.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{err.name}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center bg-slate-100 px-2.5 py-1 rounded-full text-xs font-bold text-slate-700">
                      {err.count} KH
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider border ${
                      err.risk === 'Nguy hiểm' ? 'bg-red-50 text-red-700 border-red-200' :
                      err.risk === 'Cao' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }`}>
                      {err.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {err.impact}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-indigo-50 text-indigo-700 font-medium px-3 py-1.5 rounded-lg border border-indigo-100 inline-block leading-tight">
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
