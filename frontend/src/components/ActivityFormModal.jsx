import React, { useState, useEffect } from 'react';

export default function ActivityFormModal({ initialData, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: '',
    category: 'วิชาการ',
    date_time: '',
    location: '',
    hours: 3,
    capacity: 30,
    organizer: '',
    description: '',
    status: 'OPEN'
  });

  useEffect(() => {
    if (initialData) {
      const formattedDate = initialData.date_time ? new Date(initialData.date_time).toISOString().slice(0, 16) : '';
      setForm({ ...initialData, date_time: formattedDate });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
        <h2 style={{ marginTop: 0 }}>{initialData ? '✏️ แก้ไขกิจกรรม' : '➕ เพิ่มกิจกรรมใหม่'}</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>ชื่อกิจกรรม *</label>
            <input
              required
              type="text"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>หมวดหมู่ *</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
              >
                <option>วิชาการ</option>
                <option>กีฬา</option>
                <option>จิตอาสา</option>
                <option>ศิลปวัฒนธรรม</option>
                <option>นันทนาการ</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>หน่วยงานผู้จัด *</label>
              <input
                required
                type="text"
                value={form.organizer}
                onChange={e => setForm({ ...form, organizer: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>วันและเวลาจัด *</label>
              <input
                required
                type="datetime-local"
                value={form.date_time}
                onChange={e => setForm({ ...form, date_time: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>สถานที่ *</label>
              <input
                required
                type="text"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>ชั่วโมงกิจกรรมที่ได้รับ</label>
              <input
                required
                type="number"
                min="1"
                value={form.hours}
                onChange={e => setForm({ ...form, hours: Number(e.target.value) })}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>จำนวนที่รับสมัคร (คน)</label>
              <input
                required
                type="number"
                min="1"
                value={form.capacity}
                onChange={e => setForm({ ...form, capacity: Number(e.target.value) })}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
              />
            </div>
          </div>

          {initialData && (
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>สถานะกิจกรรม</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
              >
                <option value="OPEN">เปิดรับสมัคร (OPEN)</option>
                <option value="CLOSED">ปิดรับสมัคร (CLOSED)</option>
                <option value="COMPLETED">จัดกิจกรรมเสร็จสิ้น (COMPLETED)</option>
              </select>
            </div>
          )}

          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>รายละเอียดเพิ่มเติม</label>
            <textarea
              rows="3"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', background: '#f1f5f9', border: 'none', borderRadius: '6px' }}>ยกเลิก</button>
            <button type="submit" style={{ flex: 1, padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>บันทึกข้อมูล</button>
          </div>
        </form>
      </div>
    </div>
  );
}
