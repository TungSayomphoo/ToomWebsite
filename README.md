# ToomWebsite
Develop by  Sayomphoo Yongpadcha
            583040794-7
            Computer Engineer
            Khon Kaen University

server id & password for configuration [ติดต่อ/contact](https://www.facebook.com/tung.sayomphoo)\n
domain name : [namecheap](https://www.namecheap.com/)\n
server : [vultr](https://my.vultr.com/) and [cloudflare](https://dash.cloudflare.com/login)
            
API and website page code for senier's final project 2019
- API code at ToomNode/index.js
- Website code at ToomNode/ToomWeb
use node for run both API and website
website https://www.toombike.com/

โค้ดสำหรับ API และหน้าเว็บไซต์ของโปรเจคจบการศึกษาชั้นปีที่ 4 ปีการศึกษา 2562
- โค้ดของ api ที่ไฟล์ ToomNode/index.js
- โค้ดของหน้าเว็บไซต์ที่ไฟล์ ToomNode/ToomWeb
ใช้ node ในการรัน API และเว็บไซต์
หน้าเว็บที่ใช้งานจริง https://www.toombike.com/

==================================================================

การพัฒนาแอปสำหรับบริหารจัดการร้านซ่อมมอไซต์

แบ่งเป็น 2 ส่วน
1. แอพพลิเคชันสำหรับเก็บข้อมูลลูกค้า ข้อมูลรถจักรยายนต์ของลูกค้า ให้ลูกค้าทำการแจ้งซ่อมรถจักรยานยนต์ และลูกค้าสามารถตรวจเช็คการแจ้งซ่อมของตนเองได้
   - ลูกค้าสามารถทำการแจ้งซ่อมผ่านทางแอพพลิเคชันโดยระบุรถจักรยานยนต์ที่ต้องการซ่อม สถานที่ที่ต้องการให้ไปรับรถ และรายละเอียดอาการ
   - ข้อมูลการแจ้งซ่อมของลูกค้าจะถูกเก็บไว้ใน database บน server
   - ลูกค้าสามารถตรวจสอบสถานะการแจ้งซ่อมได้ทันทีบนแอพพลิเคชัน
   - ลูกค้าสามารถเพิ่ม ลด และแก้ไขข้อมูลรถจักรยานยนต์ได้
   - ลูกค้าสามารถแก้ไขข้อลูกประจำตัวได้
   
2. เว็บไซต์สำหรับให้ร้านค้าตรวจเช็ค จัดการการแจ้งซ่อม และข้อมูลลูกค้า
   - ร้านค้าสามารถเพิ่มรายละเอียดของการซ่อม เปลี่ยนสถานะการแจ้งซ่อม(แจ้งซ่อม, กำลังดำเนินการ, เสร็จสื้น) แก้ไขราคา
   - ร้านค้าสามารถส่งการแจ้งเตือนไปยังลูกค้าได้
   - ร้านค้าสามารถแก้ไขข้อมูลลูกค้าได้
   - ร้านค้าสามารถดูตำแหน่งที่ลูกค้าให้ไปรับรถได้

==================================================================

flow chart

![alt text](https://github.com/TungSayomphoo/ToomWebsite/blob/master/ToomNode/toomflow.jpg)

==================================================================

ER-diagram

![alt text](https://github.com/TungSayomphoo/ToomWebsite/blob/master/ToomNode/toomdb_relation.jpg)