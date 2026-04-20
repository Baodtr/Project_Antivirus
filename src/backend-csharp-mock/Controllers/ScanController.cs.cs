using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MalwareDetectionAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ScanController : ControllerBase
    {
        // Giả lập service quét virus
        private readonly IScanService _scanService;

        public ScanController(IScanService scanService)
        {
            _scanService = scanService;
        }

        // POST: api/scan/start
        [HttpPost("start")]
        public IActionResult StartScan([FromBody] ScanRequest request)
        {
            if (string.IsNullOrEmpty(request.ScanType))
            {
                return BadRequest("Loại quét không hợp lệ (quick, full, custom).");
            }

            var result = _scanService.StartSystemScan(request.ScanType);
            return Ok(new { Message = "Đã bắt đầu quét hệ thống", JobId = result.JobId });
        }

        // GET: api/scan/status/{jobId}
        [HttpGet("status/{jobId}")]
        public IActionResult GetScanStatus(string jobId)
        {
            var status = _scanService.GetStatus(jobId);
            if (status == null) return NotFound("Không tìm thấy tiến trình quét.");

            return Ok(status);
        }
    }

    public class ScanRequest
    {
        public string ScanType { get; set; } // "quick", "full", "custom"
        public string TargetPath { get; set; } // Dùng cho custom scan
    }

    // Mock interface cho service (để sinh viên dễ hiểu Dependency Injection)
    public interface IScanService
    {
        ScanJob StartSystemScan(string type);
        ScanStatus GetStatus(string jobId);
    }
    
    public class ScanJob { public string JobId { get; set; } }
    public class ScanStatus { public int Progress { get; set; } public int ThreatsFound { get; set; } }
}
