const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function fetchActivities(filters = {}) {
  const queryParams = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_BASE_URL}/activities?${queryParams}`);
  if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูลกิจกรรมได้');
  return await res.json();
}

export async function createActivityApi(data) {
  const res = await fetch(`${API_BASE_URL}/activities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('ไม่สามารถสร้างกิจกรรมได้');
  return await res.json();
}

export async function updateActivityApi(id, data) {
  const res = await fetch(`${API_BASE_URL}/activities/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('ไม่สามารถแก้ไขกิจกรรมได้');
  return await res.json();
}

export async function deleteActivityApi(id) {
  const res = await fetch(`${API_BASE_URL}/activities/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('ไม่สามารถลบกิจกรรมได้');
  return await res.json();
}

export async function registerActivityApi(data) {
  const res = await fetch(`${API_BASE_URL}/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'การลงทะเบียนล้มเหลว');
  return json;
}

export async function fetchParticipantsApi(activityId) {
  const res = await fetch(`${API_BASE_URL}/registrations/activity/${activityId}`);
  if (!res.ok) throw new Error('ไม่สามารถโหลดรายชื่อผู้ลงทะเบียนได้');
  return await res.json();
}
