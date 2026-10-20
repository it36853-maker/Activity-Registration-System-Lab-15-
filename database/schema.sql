-- ============================================================
-- ฐานข้อมูลสำหรับระบบลงทะเบียนเข้าร่วมกิจกรรม (Lab 15)
-- รายวิชา Web Application Development
-- ============================================================

CREATE DATABASE IF NOT EXISTS activity_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE activity_db;

-- 1. ตารางกิจกรรม (activities)
CREATE TABLE IF NOT EXISTS activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL COMMENT 'ชื่อกิจกรรม',
  category VARCHAR(100) NOT NULL COMMENT 'หมวดหมู่ เช่น วิชาการ, กีฬา, จิตอาสา',
  date_time DATETIME NOT NULL COMMENT 'วันและเวลาจัดกิจกรรม',
  location VARCHAR(255) NOT NULL COMMENT 'สถานที่จัดกิจกรรม',
  hours INT NOT NULL DEFAULT 3 COMMENT 'จำนวนชั่วโมงกิจกรรมที่ได้รับ',
  capacity INT NOT NULL COMMENT 'จำนวนที่รับสมัครสูงสุด',
  registered_count INT NOT NULL DEFAULT 0 COMMENT 'จำนวนผู้ลงทะเบียนปัจจุบัน',
  organizer VARCHAR(150) NOT NULL COMMENT 'หน่วยงานผู้จัดกิจกรรม',
  description TEXT COMMENT 'รายละเอียดกิจกรรม',
  status ENUM('OPEN', 'CLOSED', 'COMPLETED') DEFAULT 'OPEN' COMMENT 'สถานะกิจกรรม',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. ตารางผู้ลงทะเบียน (registrations)
CREATE TABLE IF NOT EXISTS registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  activity_id INT NOT NULL,
  student_id VARCHAR(15) NOT NULL COMMENT 'รหัสนักศึกษา 10-11 หลัก',
  full_name VARCHAR(150) NOT NULL COMMENT 'ชื่อ-นามสกุล',
  email VARCHAR(150) NOT NULL COMMENT 'อีเมลนักศึกษา',
  department VARCHAR(150) NOT NULL COMMENT 'สาขาวิชา/คณะ',
  year_level VARCHAR(20) NOT NULL COMMENT 'ชั้นปี เช่น ชั้นปีที่ 1',
  phone VARCHAR(20) NOT NULL COMMENT 'เบอร์โทรศัพท์',
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_activity FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
  UNIQUE KEY unique_student_activity (activity_id, student_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ข้อมูลตัวอย่างสำหรับทดสอบระบบ
INSERT INTO activities (title, category, date_time, location, hours, capacity, registered_count, organizer, description, status) VALUES
('เวิร์กชอป React & Node.js Full Stack', 'วิชาการ', '2026-10-15 09:00:00', 'ห้องปฏิบัติการคอมพิวเตอร์ Lab 4', 6, 40, 28, 'สาขาวิทยาการคอมพิวเตอร์', 'การอบรมเชิงปฏิบัติการพัฒนาเว็บด้วย React และ Express REST API', 'OPEN'),
('การแข่งขันกีฬาฟุตซอลกระชับมิตร คณะวิทยาศาสตร์', 'กีฬา', '2026-10-20 13:00:00', 'อาคารศูนย์กีฬา ชั้น 2', 3, 60, 60, 'สโมสรนักศึกษา', 'กิจกรรมส่งเสริมสุขภาพและความสามัคคีระหว่างชั้นปี', 'CLOSED'),
('จิตอาสาปลูกป่าชายเลนและเก็บขยะชายหาด', 'จิตอาสา', '2026-10-28 07:30:00', 'ศูนย์อนุรักษ์ธรรมชาติ จ.ระยอง', 8, 50, 15, 'ชมรมบำเพ็ญประโยชน์', 'ปลูกต้นแสมและเก็บขยะเพื่อฟื้นฟูระบบนิเวศ', 'OPEN'),
('สัมมนาเทคโนโลยี AI และการประยุกต์ใช้ในอุตสาหกรรม', 'วิชาการ', '2026-11-05 10:00:00', 'หอประชุมใหญ่ อาคารเรียนรวม', 4, 100, 42, 'สำนักบริการคอมพิวเตอร์', 'ฟังบรรยายจากวิทยากรผู้เชี่ยวชาญด้าน Generative AI', 'OPEN');
