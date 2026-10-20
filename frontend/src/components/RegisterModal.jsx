import React, { useState } from 'react';

export default function RegisterModal({ activity, onClose, onSuccess }) {
  const [form, setForm] = useState({
    student_id: '',
    full_name: '',
    email: '',
    department: 'วิทยาการคอมพิวเตอร์',
    year_level: 'ชั้นปีที่ 1',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{10,11}$/.test(form.student_id)) {
      setError('กรุณากรอกรหัสนักศึกษาเป็นตัวเลข 10-11 หลัก');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await onSuccess({ ...form, activity_id: activity.id });
      onClose();
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '480px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        <h2 style={{ marginTop: 0, fontSize: '20px' }}>📝 ลงทะเบียน: {activity.title}</h2>
        {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '10px', borderRadius: '6px', marginBottom: '12px', fontSize: '14px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>รหัสนักศึกษา *</label>
            <input
              required
              type="text"
              placeholder="เช่น 6601234567"
              value={form.student_id}
              onChange={e => setForm({ ...form, student_id: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold' }}>ชื่อ-นามสกุล *</label>
            <input
              required
              type="text"
              placeholder="นายสมชาย ใจดี"
              value={form.full_name}
              onChange={e => setForm({ ...form, full_name: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>อีเมล *</label>
              <input
                required
                type="email"
                placeholder="student@univ.ac.th"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>เบอร์โทรศัพท์ *</label>
              <input
                required
                type="tel"
                placeholder="0812345678"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>สาขาวิชา</label>
              <select
                value={form.department}
                onChange={e => setForm({ ...form, department: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
              >
                <option>วิทยาการคอมพิวเตอร์</option>
                <option>เทคโนโลยีสารสนเทศ</option>
                <option>วิศวกรรมซอฟต์แวร์</option>
                <option>สาขาวิชาอื่น ๆ</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 'bold' }}>ชั้นปี</label>
              <select
                value={form.year_level}
                onChange={e => setForm({ ...form, year_level: e.target.value })}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc', marginTop: '4px' }}
              >
                <option>ชั้นปีที่ 1</option>
                <option>ชั้นปีที่ 2</option>
                <option>ชั้นปีที่ 3</option>
                <option>ชั้นปีที่ 4</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', background: '#f1f5f9', border: 'none', borderRadius: '6px' }}>ยกเลิก</button>
            <button type="submit" disabled={loading} style={{ flex: 1, padding: '10px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>
              {loading ? 'กำลังบันทึก...' : 'ยืนยันลงทะเบียน'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
