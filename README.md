# 🎓 ระบบลงทะเบียนเข้าร่วมกิจกรรม (Activity Registration System)
**โครงงานปลายรายวิชา Lab 15: การพัฒนาเว็บแอปพลิเคชันด้วย React (Full Stack)**

---

## 📁 โครงสร้างโปรเจกต์ (Project Directory Structure)

```text
Lab15_ActivityRegistration/
├── database/
│   └── schema.sql                  # สคริปต์สร้างฐานข้อมูล MySQL
├── backend/
│   ├── config/
│   │   └── db.js                   # ไฟล์เชื่อมต่อฐานข้อมูล
│   ├── controllers/
│   │   ├── activityController.js   # Logic จัดการกิจกรรม
│   │   └── registrationController.js # Logic การลงทะเบียน
│   ├── routes/
│   │   ├── activityRoutes.js
│   │   └── registrationRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js                   # Express Server หลัก
├── frontend/
│   ├── src/
│   │   ├── components/             # React Components (Navbar, ActivityCard, Modals)
│   │   ├── services/
│   │   │   └── api.js              # โมดูลเรียก API
│   │   ├── App.jsx                 # หน้าจอหลัก
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── docs/
│   └── Lab15_Answers.md            # เฉลยคำถามวิเคราะห์ ตอนที่ 19 และ 20
└── README.md
```

---

## 🚀 วิธีการรันโปรเจกต์ใน Visual Studio Code (VS Code)

### Step 1: นำเข้าฐานข้อมูล MySQL
1. เปิดโปรแกรม **XAMPP / MySQL / MariaDB**
2. เข้าใช้งาน **phpMyAdmin** หรือ MySQL Workbench
3. สร้างฐานข้อมูลหรือรันไฟล์ `database/schema.sql` ใน Query Window เพื่อสร้างตารางและใส่ข้อมูลตัวอย่าง

### Step 2: รัน Backend Server (Node.js + Express)
1. เปิด VS Code Terminal ในโฟลเดอร์ `backend`:
   ```bash
   cd backend
   ```
2. สร้างไฟล์ `.env` จาก `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *(แก้ไขรหัสผ่าน DB_PASSWORD ในไฟล์ .env ให้ตรงกับ MySQL ของคุณ)*
3. ติดตั้ง Dependencies และรัน Server:
   ```bash
   npm install
   npm run dev
   ```
   *เซิร์ฟเวอร์จะรันที่: http://localhost:5000*

### Step 3: รัน Frontend Application (React + Vite)
1. เปิด Terminal ใหม่ใน VS Code ไปที่โฟลเดอร์ `frontend`:
   ```bash
   cd frontend
   ```
2. สร้างไฟล์ `.env` จาก `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. ติดตั้ง Dependencies และเริ่มทำงาน:
   ```bash
   npm install
   npm run dev
   ```
   *เว็บแอปพลิเคชันจะเปิดที่: http://localhost:3000*

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)
- **Frontend:** React 18 + Vite, CSS / Tailwind CSS
- **Backend:** Node.js, Express.js (REST API)
- **Database:** MySQL / MariaDB (mysql2 with Connection Pool)
- **Tooling:** Visual Studio Code, Postman, Git
