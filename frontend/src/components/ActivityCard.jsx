import React from 'react';

export default function ActivityCard({ activity, onSelect, onRegister }) {
  const isFull = activity.registered_count >= activity.capacity;
  const isClosed = activity.status === 'CLOSED' || isFull;

  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '12px', background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
          {activity.category}
        </span>
        <span style={{ fontSize: '12px', color: isClosed ? '#dc2626' : '#16a34a', fontWeight: 'bold' }}>
          ● {isClosed ? 'ปิดรับสมัคร' : 'เปิดรับสมัคร'}
        </span>
      </div>

      <h3 style={{ margin: '8px 0', fontSize: '18px', color: '#0f172a' }}>{activity.title}</h3>
      <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0' }}>📍 {activity.location}</p>
      <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0' }}>⏰ {new Date(activity.date_time).toLocaleString('th-TH')}</p>
      <p style={{ fontSize: '13px', color: '#2563eb', fontWeight: 'bold', margin: '4px 0' }}>⭐ ได้รับ {activity.hours} ชั่วโมงกิจกรรม</p>

      {/* Progress Bar แสดงที่นั่ง */}
      <div style={{ marginTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#475569', marginBottom: '4px' }}>
          <span>ผู้สมัครแล้ว</span>
          <span>{activity.registered_count} / {activity.capacity} คน</span>
        </div>
        <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${Math.min((activity.registered_count / activity.capacity) * 100, 100)}%`,
            background: isFull ? '#ef4444' : '#2563eb'
          }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
        <button
          onClick={() => onSelect(activity)}
          style={{ flex: 1, padding: '8px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer' }}
        >
          ดูรายละเอียด
        </button>
        <button
          disabled={isClosed}
          onClick={() => onRegister(activity)}
          style={{
            flex: 1,
            padding: '8px',
            background: isClosed ? '#cbd5e1' : '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: isClosed ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isClosed ? 'เต็มแล้ว' : 'ลงทะเบียน'}
        </button>
      </div>
    </div>
  );
}
