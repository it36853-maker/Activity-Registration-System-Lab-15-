import db from '../config/db.js';

// 1. นักศึกษาลงทะเบียนเข้าร่วมกิจกรรม
export const registerForActivity = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const { activity_id, student_id, full_name, email, department, year_level, phone } = req.body;

    // ตรวจสอบความถูกต้องของข้อมูล
    if (!activity_id || !student_id || !full_name || !email || !department || !year_level || !phone) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: 'กรอกข้อมูลการลงทะเบียนไม่ครบถ้วน' });
    }

    // เช็คกิจกรรมและที่นั่งคงเหลือ
    const [actRows] = await connection.query('SELECT capacity, registered_count, status FROM activities WHERE id = ? FOR UPDATE', [activity_id]);
    if (actRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ success: false, message: 'ไม่พบกิจกรรมนี้' });
    }

    const activity = actRows[0];
    if (activity.status !== 'OPEN' || activity.registered_count >= activity.capacity) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: 'กิจกรรมนี้ปิดรับสมัครแล้ว หรือที่นั่งเต็มแล้ว' });
    }

    // เช็คว่าเคยลงทะเบียนไปแล้วหรือยัง
    const [dupCheck] = await connection.query('SELECT id FROM registrations WHERE activity_id = ? AND student_id = ?', [activity_id, student_id]);
    if (dupCheck.length > 0) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: 'รหัสนักศึกษานี้ได้ลงทะเบียนกิจกรรมนี้ไปแล้ว' });
    }

    // บันทึกการลงทะเบียน
    await connection.query(
      'INSERT INTO registrations (activity_id, student_id, full_name, email, department, year_level, phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [activity_id, student_id, full_name, email, department, year_level, phone]
    );

    // เพิ่มจำนวนผู้ลงทะเบียนในกิจกรรม
    const newCount = activity.registered_count + 1;
    const newStatus = newCount >= activity.capacity ? 'CLOSED' : 'OPEN';
    await connection.query('UPDATE activities SET registered_count = ?, status = ? WHERE id = ?', [newCount, newStatus, activity_id]);

    await connection.commit();
    res.status(201).json({ success: true, message: 'ลงทะเบียนเข้าร่วมกิจกรรมสำเร็จ!' });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};

// 2. ดึงรายชื่อผู้ลงทะเบียนในกิจกรรม
export const getParticipantsByActivity = async (req, res) => {
  try {
    const { activityId } = req.params;
    const [rows] = await db.query(
      'SELECT id, student_id, full_name, email, department, year_level, phone, registered_at FROM registrations WHERE activity_id = ? ORDER BY registered_at ASC',
      [activityId]
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
