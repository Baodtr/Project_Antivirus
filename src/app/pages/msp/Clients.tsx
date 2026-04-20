import { useState } from "react";
import { Search, Building, MoreVertical, ExternalLink, ShieldAlert, CheckCircle2, DollarSign } from "lucide-react";

type Client = {
  id: string;
  name: string;
  plan: string;
  licensesUsed: number;
  licensesTotal: number;
  status: 'active' | 'warning' | 'expired';
  threatsLast7Days: number;
  contactName: string;
  contactEmail: string;
};

const initialClients: Client[] = [
  { id: "1", name: "Công ty TNHH Bình Minh", plan: "Enterprise", licensesUsed: 147, licensesTotal: 150, status: "warning", threatsLast7Days: 124, contactName: "Trần Văn A", contactEmail: "admin@binhminh.vn" },
  { id: "2", name: "Tập đoàn ABC", plan: "Business Pro", licensesUsed: 450, licensesTotal: 500, status: "active", threatsLast7Days: 45, contactName: "Nguyễn Thị B", contactEmail: "it@abcgroup.com" },
  { id: "3", name: "Tech Solutions", plan: "Startup", licensesUsed: 48, licensesTotal: 50, status: "warning", threatsLast7Days: 8, contactName: "Lê Văn C", contactEmail: "ceo@techsol.vn" },
  { id: "4", name: "Global Logistics", plan: "Enterprise", licensesUsed: 310, licensesTotal: 300, status: "expired", threatsLast7Days: 210, contactName: "Phạm D", contactEmail: "security@globallogistics.net" },
  { id: "5", name: "Phòng khám Đa khoa Tâm An", plan: "Business", licensesUsed: 25, licensesTotal: 30, status: "active", threatsLast7Days: 0, contactName: "BS. Hùng", contactEmail: "admin@tamanclinic.vn" },
];

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string, used: number, total: number) => {
    if (status === 'expired' || used > total) return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">Quá hạn/Vượt mức</span>;
    if (status === 'warning' || (total - used <= 5)) return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">Sắp hết/Cảnh báo</span>;
    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">Hoạt động tốt</span>;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Quản lý Khách hàng (Tenants)</h2>
          <p className="text-slate-500 mt-1">Danh sách các doanh nghiệp đang sử dụng dịch vụ bảo mật.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <DollarSign className="w-4 h-4" /> Báo cáo thanh toán
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Building className="w-4 h-4" /> Thêm doanh nghiệp
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm tên công ty, email liên hệ..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm cursor-pointer">
              <option value="all">Tất cả gói cước</option>
              <option value="enterprise">Enterprise</option>
              <option value="business">Business Pro</option>
              <option value="startup">Startup</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Tên khách hàng</th>
                <th className="px-6 py-4">Tình trạng giấy phép</th>
                <th className="px-6 py-4">Số License</th>
                <th className="px-6 py-4">Mối đe dọa (7 ngày)</th>
                <th className="px-6 py-4">Gói cước</th>
                <th className="px-6 py-4">Người liên hệ</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <Building className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                    <p>Không tìm thấy khách hàng nào.</p>
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                          {client.name.substring(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 truncate max-w-[200px]" title={client.name}>{client.name}</p>
                          <a href="#" className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-0.5">
                            Quản trị viên <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(client.status, client.licensesUsed, client.licensesTotal)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 w-24">
                        <div className="flex justify-between text-xs font-medium text-slate-700">
                          <span>{client.licensesUsed}</span>
                          <span className="text-slate-400">/ {client.licensesTotal}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full ${client.licensesUsed > client.licensesTotal ? 'bg-red-500' : client.licensesUsed / client.licensesTotal > 0.9 ? 'bg-yellow-500' : 'bg-indigo-500'}`} 
                            style={{ width: `${Math.min((client.licensesUsed / client.licensesTotal) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <div className={`flex items-center gap-1.5 ${client.threatsLast7Days > 50 ? 'text-red-600' : client.threatsLast7Days > 0 ? 'text-orange-500' : 'text-green-600'}`}>
                        {client.threatsLast7Days > 50 ? <ShieldAlert className="w-4 h-4" /> : client.threatsLast7Days > 0 ? <ShieldAlert className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        {client.threatsLast7Days}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {client.plan}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-800">{client.contactName}</p>
                      <p className="text-xs text-slate-500">{client.contactEmail}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
