import { useState } from "react";
import { ShieldCheck, Plus, Check, Settings2, Trash2 } from "lucide-react";

type Policy = {
  id: string;
  name: string;
  description: string;
  targets: string;
  enabled: boolean;
};

const initialPolicies: Policy[] = [
  { id: "1", name: "Chặn USB/Ổ cứng ngoài", description: "Ngăn chặn kết nối thiết bị lưu trữ ngoài trên tất cả máy khách.", targets: "Tất cả nhóm", enabled: true },
  { id: "2", name: "Quét file tải xuống (Real-time)", description: "Bật chế độ quét sâu cho mọi file .exe, .zip tải từ trình duyệt.", targets: "Kế toán, Kinh doanh", enabled: true },
  { id: "3", name: "Chính sách Mật khẩu BIOS", description: "Yêu cầu mật khẩu BIOS/UEFI khi khởi động.", targets: "Phòng IT", enabled: false },
  { id: "4", name: "Tường lửa mức Ứng dụng", description: "Chặn truy cập các website chia sẻ file (Google Drive, Dropbox).", targets: "Nhân sự", enabled: true },
];

export default function Policies() {
  const [policies, setPolicies] = useState<Policy[]>(initialPolicies);

  const togglePolicy = (id: string) => {
    setPolicies(policies.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const deletePolicy = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa chính sách này?")) {
      setPolicies(policies.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Quản lý Chính sách Bảo mật (Policy)</h2>
          <p className="text-slate-500 mt-1">Cấu hình các quy tắc áp dụng cho các nhóm thiết bị trong tổ chức.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Thêm chính sách mới
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {policies.map((policy) => (
          <div key={policy.id} className={`bg-white p-5 rounded-xl shadow-sm border transition-all ${policy.enabled ? 'border-indigo-200 ring-1 ring-indigo-50' : 'border-slate-200'}`}>
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${policy.enabled ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    {policy.name}
                    {policy.enabled && <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-green-100 text-green-700 rounded-full">Đang áp dụng</span>}
                    {!policy.enabled && <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-slate-100 text-slate-600 rounded-full">Đã tắt</span>}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{policy.description}</p>
                  <p className="text-xs text-slate-500 mt-3 font-medium bg-slate-50 inline-block px-2 py-1 rounded-md border border-slate-100">
                    Áp dụng cho: {policy.targets}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 shrink-0">
                <button className="p-2 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200" title="Chỉnh sửa">
                  <Settings2 className="w-4 h-4" />
                </button>
                <button onClick={() => deletePolicy(policy.id)} className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-lg transition-colors border border-slate-200" title="Xóa">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="h-8 w-px bg-slate-200 mx-1"></div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={policy.enabled} onChange={() => togglePolicy(policy.id)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
