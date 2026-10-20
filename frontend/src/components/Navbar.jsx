import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header style={{ backgroundColor: '#1e293b', color: '#fff', padding: '12px 24px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>🎓</span> ระบบลงทะเบียนเข้าร่วมกิจกรรม (Lab 15)
        </div>
        <nav style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'dashboard', label: '📊 ภาพรวมระบบ' },
            { id: 'activities', label: '📅 รายการกิจกรรม' },
            { id: 'admin', label: '⚙️ จัดการกิจกรรม (ผู้ดูแล)' },
            { id: 'docs', label: '📄 เอกสารและโครงสร้าง' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                backgroundColor: activeTab === tab.id ? '#2563eb' : 'transparent',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? 'bold' : 'normal'
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
