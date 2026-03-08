# BÁO GIÁ DỰ ÁN WEBSITE FPT PLAYBOOK

---

## THÔNG TIN KHÁI QUÁT

**Tên dự án:** FPT Playbook - Student Portal & Resources  
**Công nghệ:** Next.js 15, TypeScript, Tailwind CSS, PostgreSQL  
**Ngày báo giá:** 08/03/2026

---

## MÔ TẢ DỰ ÁN

Website cung cấp nền tảng thông tin và hỗ trợ toàn diện cho sinh viên FPT, bao gồm hệ thống quản lý nội dung, tin tức, Q&A cộng đồng và tài liệu học tập.

---

## CHI TIẾT TÍNH NĂNG

### 1. PHẦN CÔNG KHAI (Public Pages)

#### 1.1 Trang chủ (Landing Page)

- Giao diện hiện đại, responsive trên mọi thiết bị
- Giới thiệu các dịch vụ và hệ thống
- Thiết kế UI/UX tối ưu với Tailwind CSS + shadcn/ui

#### 1.2 Hệ thống Tin tức & Thông báo (Announcements)

- Hiển thị danh sách tin tức theo thời gian
- Phân loại theo category (Chung, Học tập, Sự kiện, Khẩn cấp)
- Chi tiết tin tức với rich text content
- Tìm kiếm và lọc tin tức

#### 1.3 Q&A Cộng đồng (Community Q&A)

- **Đặt câu hỏi công khai không cần đăng nhập**
- **Trả lời câu hỏi ẩn danh (tên ngẫu nhiên)**
- Đếm lượt xem và số câu trả lời
- Hiển thị danh sách câu hỏi với thống kê
- Chi tiết câu hỏi với tất cả câu trả lời
- Real-time updates

#### 1.4 FAQ (Câu hỏi thường gặp)

- Danh sách FAQ theo categories
- Accordion UI để mở/đóng câu trả lời
- Tìm kiếm FAQ
- Dễ dàng quản lý từ admin panel

#### 1.5 Student Portal

- Giới thiệu các hệ thống dành cho sinh viên
- Links đến các service (FAP, FLM, v.v.)
- Thông tin về khóa học và lịch học

### 2. ADMIN PANEL (Hệ thống quản trị)

#### 2.1 Authentication & Authorization

- Đăng nhập bảo mật cho admin
- Session management
- Protected routes

#### 2.2 Dashboard

- Thống kê tổng quan (Pages, Courses, Announcements, FAQs)
- Biểu đồ và metrics
- Quick actions

#### 2.3 Quản lý Tin tức (Announcements Management)

- Tạo/Sửa/Xóa tin tức
- Rich text editor (Quill)
- Upload hình ảnh
- Publish/Unpublish
- Chọn category

#### 2.4 Quản lý Trang nội dung (Pages Management)

- Tạo/Sửa/Xóa trang documentation
- Slug management tự động
- Rich text editor
- Publish/Draft status

#### 2.5 Quản lý FAQ

- Tạo/Sửa/Xóa FAQ
- Sắp xếp thứ tự hiển thị
- Phân loại theo category
- **Tự động loại trừ Q&A cộng đồng**

### 3. TECHNICAL FEATURES (Tính năng kỹ thuật)

#### 3.1 Database & Backend

- PostgreSQL database (Neon Serverless)
- Prisma ORM cho type-safety
- API Routes với Next.js App Router
- Server Actions cho form handling
- Optimized queries

#### 3.2 Frontend Architecture

- Next.js 15 với App Router
- React Server Components
- Client Components khi cần thiết
- TypeScript cho type safety
- Revalidation & caching strategies

#### 3.3 UI/UX Components

- shadcn/ui component library
- Responsive design (mobile-first)
- Dark/Light mode support
- Toast notifications (Sonner)
- Form validation
- Loading states & error handling

#### 3.4 Performance & SEO

- Server-side rendering (SSR)
- Image optimization
- SEO-friendly URLs
- Meta tags & Open Graph
- Fast page loads
- Analytics integration (Vercel Analytics)

---

## BẢNG GIÁ CHI TIẾT

### A. Chi phí Phát triển Website

| STT | Hạng mục             | Mô tả                                | Đơn giá (VNĐ) |
| --- | -------------------- | ------------------------------------ | ------------- |
| 1   | Frontend Development | Phát triển giao diện + 15 components | 25,000,000    |
| 2   | Backend & API        | Database setup + API routes          | 15,000,000    |
| 3   | Admin Panel          | Dashboard + CRUD operations          | 12,000,000    |
| 4   | Authentication       | Hệ thống đăng nhập bảo mật           | 5,000,000     |
| 5   | Q&A Community System | Tính năng Q&A công khai              | 8,000,000     |
| 6   | Rich Text Editor     | Integration Quill editor             | 3,000,000     |
| 7   | UI/UX Design         | Responsive design, components        | 10,000,000    |
| 8   | Testing & Bug fixes  | QA testing, optimization             | 7,000,000     |
| 9   | Documentation        | Tài liệu kỹ thuật + user guide       | 3,000,000     |

**TỔNG CHI PHÍ PHÁT TRIỂN: 88,000,000 VNĐ**

---

### B. Chi phí Hosting & Duy trì

#### 1. Hosting trên Vercel

| Hạng mục              | Mô tả                  | Chi phí/tháng      |
| --------------------- | ---------------------- | ------------------ |
| **Vercel Pro Plan**   | Hosting Next.js app    | $20 (~500,000 VNĐ) |
| - Unlimited bandwidth | Không giới hạn traffic | Included           |
| - 100GB bandwidth     | Edge network worldwide | Included           |
| - Preview deployments | Test trước khi deploy  | Included           |
| - Analytics           | Real-time analytics    | Included           |
| - Team collaboration  | Nhiều members          | Included           |
| - Priority support    | Hỗ trợ ưu tiên         | Included           |

#### 2. Database - Neon PostgreSQL

| Hạng mục                 | Chi phí/tháng      |
| ------------------------ | ------------------ |
| **Neon Scale Plan**      | $19 (~475,000 VNĐ) |
| - 10GB storage           | Included           |
| - Unlimited databases    | Included           |
| - Autoscaling            | Included           |
| - Point-in-time recovery | Included           |

#### 3. Dịch vụ bảo trì & hỗ trợ (Tùy chọn)

| Gói              | Mô tả                                        | Chi phí/tháng  |
| ---------------- | -------------------------------------------- | -------------- |
| **Gói Basic**    | Bug fixes, backup hàng tuần                  | 3,000,000 VNĐ  |
| **Gói Standard** | Basic + Updates, 20h support/tháng           | 6,000,000 VNĐ  |
| **Gói Premium**  | Standard + Feature updates, priority support | 12,000,000 VNĐ |

---

### C. Tóm tắt Chi phí

| Loại chi phí       | Một lần (VNĐ)  | Hàng tháng (VNĐ) |
| ------------------ | -------------- | ---------------- |
| Phát triển Website | **88,000,000** | -                |
| Vercel Hosting     | -              | 500,000          |
| Database (Neon)    | -              | 475,000          |
| Bảo trì (Optional) | -              | 3-12 triệu       |
| **TỔNG**           | **88,000,000** | **~1,000,000**   |

_Lưu ý: Chi phí hosting có thể thanh toán theo năm để được giảm giá (~20%)_

---

## THỜI GIAN THỰC HIỆN

```
Tuần 1-2:   Setup project + Database design
Tuần 3-5:   Frontend development (Public pages)
Tuần 6-7:   Admin panel development
Tuần 8:     Q&A Community system
Tuần 9:     Testing & bug fixes
Tuần 10:    Deployment + Documentation

TỔNG THỜI GIAN: 10 tuần (2.5 tháng)
```

---

## QUY TRÌNH LÀM VIỆC

1. **Ký hợp đồng & Đặt cọc** (30% = 26,400,000 VNĐ)
2. **Milestone 1** - Setup + Public pages (40% = 35,200,000 VNĐ)
3. **Milestone 2** - Admin panel complete (20% = 17,600,000 VNĐ)
4. **Milestone 3** - Testing + Deploy (10% = 8,800,000 VNĐ)

---

## CAM KẾT & BẢO HÀNH

✅ **Source code** được bàn giao đầy đủ  
✅ **Bảo hành miễn phí** 3 tháng kể từ ngày nghiệm thu  
✅ **Training** hướng dẫn sử dụng admin panel  
✅ **Documentation** đầy đủ về technical và user guide  
✅ **Support** qua email/chat trong giờ hành chính

---

## ĐIỀU KHOẢN THANH TOÁN

- Phương thức: Chuyển khoản hoặc tiền mặt
- Đặt cọc 30% để bắt đầu dự án
- Các milestone thanh toán theo tiến độ
- Chi phí hosting thanh toán theo tháng/năm
- Hóa đơn VAT 10% (nếu yêu cầu)

---

## LIÊN HỆ

**Email:** [your-email@example.com]  
**Hotline:** [+84 xxx xxx xxx]  
**Website:** [your-portfolio.com]

---

_Báo giá có hiệu lực trong 30 ngày kể từ ngày phát hành_  
_Mọi thay đổi về tính năng sẽ được điều chỉnh giá tương ứng_

---

**NGÀY TẠO:** 08/03/2026  
**PHIÊN BẢN:** 1.0
