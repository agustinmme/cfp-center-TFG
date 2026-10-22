function SidebarBrand() {
  return (
    <div className="d-flex align-items-center gap-2 mb-4 px-1">
      <div
        className="d-grid align-items-center justify-content-center rounded-2 fw-bold"
        style={{ width: '40px', height: '40px', border: '1px solid #cfe0e8', color: '#e8b765', fontSize: '16px' }}
      >
        CFP
      </div>
      <div>
        <strong className="d-block text-white" style={{ fontSize: '20px', lineHeight: 1.1 }}>402</strong>
      </div>
    </div>
  )
}

export default SidebarBrand
