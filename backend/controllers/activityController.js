import db from '../config/db.js';

// 1. ดึงรายการกิจกรรมทั้งหมด (พร้อม Search & Filter)
export const getActivities = async (req, res) => {
  try {
    const { search, category, status } = req.query;
    let query = 'SELECT * FROM activities WHERE 1=1';
    const params = [];

    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ? OR location LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (category && category !== 'ทั้งหมด') {
      query += ' AND category = ?';
      params.push(category);
    }
    if (status && status !== 'ALL') {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY id DESC';
    const [rows] = await db.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. ดึงข้อมูลกิจกรรมตาม ID
export const getActivityById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM activities WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'ไม่พบกิจกรรมที่ระบุ' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. สร้างกิจกรรมใหม่
export const createActivity = async (req, res) => {
  try {
    const { title, category, date_time, location, hours, capacity, organizer, description } = req.body;
    
    if (!title || !category || !date_time || !location || !capacity || !organizer) {
      return res.status(400).json({ success: false, message: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' });
    }

    const query = `
      INSERT INTO activities (title, category, date_time, location, hours, capacity, organizer, description, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'OPEN')
    `;
    const [result] = await db.query(query, [title, category, date_time, location, hours || 3, capacity, organizer, description || '']);
    
    res.status(201).json({ success: true, message: 'สร้างกิจกรรมสำเร็จ', id: result.insertId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. แก้ไขกิจกรรม
export const updateActivity = async (req, res) => {
  try {
    const { title, category, date_time, location, hours, capacity, organizer, description, status } = req.body;
    const query = `
      UPDATE activities 
      SET title=?, category=?, date_time=?, location=?, hours=?, capacity=?, organizer=?, description=?, status=?
      WHERE id=?
    `;
    const [result] = await db.query(query, [title, category, date_time, location, hours, capacity, organizer, description, status, req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'ไม่พบกิจกรรมที่ต้องการแก้ไข' });
    }
    res.json({ success: true, message: 'อัปเดตข้อมูลกิจกรรมเรียบร้อยแล้ว' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5. ลบกิจกรรม
export const deleteActivity = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM activities WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'ไม่พบกิจกรรมที่ต้องการลบ' });
    }
    res.json({ success: true, message: 'ลบกิจกรรมสำเร็จ' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
