import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ActivityCard from './components/ActivityCard';
import RegisterModal from './components/RegisterModal';
import ActivityFormModal from './components/ActivityFormModal';
import {
  fetchActivities,
  createActivityApi,
  updateActivityApi,
  deleteActivityApi,
  registerActivityApi,
  fetchParticipantsApi
} from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');

  // Modals
  const [registeringActivity, setRegisteringActivity] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [detailActivity, setDetailActivity] = useState(null);
  const [participants, setParticipants] = useState([]);

  // Toast
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchActivities({ search, category: selectedCategory });
      setActivities(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search, selectedCategory]);

  const handleRegisterSubmit = async (formData) => {
    await registerActivityApi(formData);
    showToast('🎉 ลงทะเบียนเข้าร่วมกิจกรรมเรียบร้อยแล้ว!');
    loadData();
  };

  const handleCreateSubmit = async (formData) => {
    await createActivityApi(formData);
    setIsCreating(false);
    showToast('✅ เพิ่มกิจกรรมใหม่สำเร็จ!');
    loadData();
  };

  const handleUpdateSubmit = async (formData) => {
    await updateActivityApi(formData.id, formData);
    setEditingActivity(null);
    showToast('✏️ อัปเดตข้อมูลกิจกรรมสำเร็จ!');
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm('คุณต้องการลบกิจกรรมนี้ใช่หรือไม่?')) {
      await deleteActivityApi(id);
      showToast('🗑️ ลบกิจกรรมเรียบร้อยแล้ว');
      loadData();
    }
  };

  const handleViewDetail = async (act) => {
    setDetailActivity(act);
    try {
      const res = await fetchParticipantsApi(act.id);
      setParticipants(res.data || []);
    } catch {
      setParticipants([]);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {toast && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#10b981', color: '#fff', padding: '12px 20px', borderRadius: '8px', zIndex: 2000, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          {toast}
        </div>
      )}

      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '24px 16px' }}>
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>📊 ภาพรวมระบบกิจกรรมนักศึกษา</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b', fontSize: '14px' }}>กิจกรรมทั้งหมด</span>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0 0', color: '#2563eb' }}>{activities.length} รายการ</p>
              </div>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b', fontSize: '14px' }}>เปิดรับสมัครอยู่</span>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0 0', color: '#16a34a' }}>
                  {activities.filter(a => a.status === 'OPEN' && a.registered_count < a.capacity).length} รายการ
                </p>
              </div>
              <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b', fontSize: '14px' }}>จำนวนผู้ลงทะเบียนสะสม</span>
                <p style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0 0 0', color: '#9333ea' }}>
                  {activities.reduce((acc, a) => acc + (a.registered_count || 0), 0)} คน
                </p>
              </div>
            </div>

            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>🔥 กิจกรรมแนะนำล่าสุด</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {activities.slice(0, 3).map(act => (
                <ActivityCard key={act.id} activity={act} onSelect={handleViewDetail} onRegister={setRegisteringActivity} />
              ))}
            </div>
          </div>
        )}

        {/* ACTIVITIES TAB */}
        {activeTab === 'activities' && (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="🔍 ค้นหากิจกรรม..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, minWidth: '240px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              />
              <select
                value={selectedCategory}
                onChange={e => setSelectedCategory(e.target.value)}
                style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
              >
                {['ทั้งหมด', 'วิชาการ', 'กีฬา', 'จิตอาสา', 'ศิลปวัฒนธรรม', 'นันทนาการ'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {loading ? (
              <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>⏳ กำลังโหลดข้อมูล...</p>
            ) : activities.length === 0 ? (
              <p style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>❌ ไม่พบกิจกรรมตามเงื่อนไข</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {activities.map(act => (
                  <ActivityCard key={act.id} activity={act} onSelect={handleViewDetail} onRegister={setRegisteringActivity} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ADMIN TAB */}
        {activeTab === 'admin' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>⚙️ จัดการกิจกรรม (ผู้ดูแลระบบ)</h1>
              <button
                onClick={() => setIsCreating(true)}
                style={{ background: '#2563eb', color: '#fff', padding: '10px 18px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                ➕ เพิ่มกิจกรรมใหม่
              </button>
            </div>

            <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '12px' }}>ชื่อกิจกรรม</th>
                    <th style={{ padding: '12px' }}>หมวดหมู่</th>
                    <th style={{ padding: '12px' }}>จำนวนรับ</th>
                    <th style={{ padding: '12px' }}>สถานะ</th>
                    <th style={{ padding: '12px', textAlign: 'center' }}>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map(act => (
                    <tr key={act.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{act.title}</td>
                      <td style={{ padding: '12px' }}>{act.category}</td>
                      <td style={{ padding: '12px' }}>{act.registered_count} / {act.capacity}</td>
                      <td style={{ padding: '12px' }}>{act.status}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <button onClick={() => setEditingActivity(act)} style={{ marginRight: '8px', padding: '6px 12px', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}>แก้ไข</button>
                        <button onClick={() => handleDelete(act.id)} style={{ padding: '6px 12px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '4px', cursor: 'pointer' }}>ลบ</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DOCS TAB */}
        {activeTab === 'docs' && (
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h2>📄 เอกสารสำหรับส่งงาน Lab 15</h2>
            <p>โครงสร้างระบบและไฟล์ทั้งหมดพร้อมสำหรับนำไปเปิดใช้งานใน Visual Studio Code</p>
            <ul>
              <li><strong>Database:</strong> <code>database/schema.sql</code></li>
              <li><strong>Backend Server:</strong> Node.js + Express (<code>backend/server.js</code>)</li>
              <li><strong>Frontend:</strong> React + Vite (<code>frontend/src/App.jsx</code>)</li>
            </ul>
          </div>
        )}
      </main>

      {/* MODALS */}
      {registeringActivity && (
        <RegisterModal
          activity={registeringActivity}
          onClose={() => setRegisteringActivity(null)}
          onSuccess={handleRegisterSubmit}
        />
      )}

      {(isCreating || editingActivity) && (
        <ActivityFormModal
          initialData={editingActivity}
          onClose={() => { setIsCreating(false); setEditingActivity(null); }}
          onSubmit={editingActivity ? handleUpdateSubmit : handleCreateSubmit}
        />
      )}

      {/* DETAIL MODAL */}
      {detailActivity && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
            <h2 style={{ marginTop: 0 }}>📌 {detailActivity.title}</h2>
            <p><strong>หมวดหมู่:</strong> {detailActivity.category}</p>
            <p><strong>สถานที่:</strong> {detailActivity.location}</p>
            <p><strong>ผู้จัด:</strong> {detailActivity.organizer}</p>
            <p><strong>รายละเอียด:</strong> {detailActivity.description || '-'}</p>
            <hr style={{ margin: '16px 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
            <h3>👥 รายชื่อผู้ลงทะเบียน ({participants.length} คน)</h3>
            {participants.length === 0 ? (
              <p style={{ color: '#64748b' }}>ยังไม่มีผู้ลงทะเบียน</p>
            ) : (
              <ul style={{ paddingLeft: '20px' }}>
                {participants.map(p => (
                  <li key={p.id} style={{ marginBottom: '6px' }}>
                    <strong>{p.student_id}</strong> - {p.full_name} ({p.department}, {p.year_level})
                  </li>
                ))}
              </ul>
            )}
            <button onClick={() => setDetailActivity(null)} style={{ marginTop: '16px', width: '100%', padding: '10px', background: '#f1f5f9', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>ปิดหน้าต่าง</button>
          </div>
        </div>
      )}
    </div>
  );
}
