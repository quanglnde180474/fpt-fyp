import postgres from 'postgres';
import crypto from "crypto";

process.loadEnvFile(new URL('../.env', import.meta.url));

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

function parseConnectionString(connStr: string) {
  const withoutScheme = connStr.replace(/^postgres(?:ql)?:\/\//, '')
  const atIdx = withoutScheme.lastIndexOf('@')
  if (atIdx === -1) throw new Error('Invalid DATABASE_URL: missing @')
  const credentialsPart = withoutScheme.slice(0, atIdx)
  const hostPart = withoutScheme.slice(atIdx + 1)
  const colonIdx = credentialsPart.indexOf(':')
  const user = colonIdx >= 0 ? credentialsPart.slice(0, colonIdx) : credentialsPart
  const password = colonIdx >= 0 ? credentialsPart.slice(colonIdx + 1) : ''
  const queryStart = hostPart.indexOf('?')
  const hostAndDb = queryStart >= 0 ? hostPart.slice(0, queryStart) : hostPart
  const slashIdx = hostAndDb.indexOf('/')
  const hostPort = slashIdx >= 0 ? hostAndDb.slice(0, slashIdx) : hostAndDb
  const database = slashIdx >= 0 ? hostAndDb.slice(slashIdx + 1) : 'postgres'
  const lastColon = hostPort.lastIndexOf(':')
  const host = lastColon >= 0 ? hostPort.slice(0, lastColon) : hostPort
  const port = lastColon >= 0 ? parseInt(hostPort.slice(lastColon + 1), 10) : 5432
  return { host, port, user, password, database }
}

const { host, port, user, password, database } = parseConnectionString(DATABASE_URL)
const sql = postgres({ host, port, user, password, database, ssl: 'require', max: 1 });

// Simple hash function for demo (use bcrypt in production)
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function seedDatabase() {
  try {
    console.log("Seeding database...");

    // Create default admin user
    const adminPassword = hashPassword("admin123");
    await sql`
      INSERT INTO users (email, "passwordHash", "fullName", role)
      VALUES ('admin@ffyb.edu.vn', ${adminPassword}, 'Administrator', 'admin')
      ON CONFLICT (email) DO NOTHING
    `;
    console.log("✓ Created admin user");

    // Create secondary admin with a strong password
    const strongPassword = "Fpt@Admin#2026!";
    const strongPasswordHash = hashPassword(strongPassword);
    await sql`
      INSERT INTO users (email, "passwordHash", "fullName", role)
      VALUES ('superadmin@ffyb.edu.vn', ${strongPasswordHash}, 'Super Administrator', 'admin')
      ON CONFLICT (email) DO NOTHING
    `;
    console.log("✓ Created superadmin user");

    // Get admin user ID
    const [adminUser] = await sql`SELECT id FROM users WHERE email = 'admin@ffyb.edu.vn'`;
    const adminId = adminUser.id;

    // Seed services
    const services = [
      {
        name: "FAP - Công thông tin đạo tạo",
        description: "Hệ thống quản lý học vụ chính thức. Tại đây sinh viên có thể xem thời khoá biểu (Weekly timetable), điểm danh (Attendance), xem điểm thi (Grade report), đăng ký môn học và các dịch vụ sinh viên khác.",
        category: "academic",
        link: "https://fap.fpt.edu.vn",
      },
      {
        name: "FLM - Hệ thống quản lý tài liệu",
        description: "FPT Learning Materials. Nơi cung cấp giáo trình, slide bài giảng (Syllabus) và các tài liệu tham khảo cho từng môn học.",
        category: "academic",
        link: "https://flm.fpt.edu.vn",
      },
      {
        name: "Edunext - Nền tảng học tập kiến tạo xã hội",
        description: "Nền tảng học tập theo phương pháp kiến tạo xã hội. Sinh viên thảo luận, đặt câu hỏi, vote câu trả lời hay và bình luận cùng lớp trong các lớp học tập.",
        category: "academic",
        link: "https://edunext.fpt.edu.vn",
      },
      {
        name: "Exam Software (EOS/PEA)",
        description: "Phần mềm thi trực tuyến. EOS (Exam Online System) dùng cho các bài thi trắc nghiệm và PEA (Practical Exam Application) dùng cho các bài thi thực hành code.",
        category: "academic",
      },
      {
        name: "Email Hỗ trợ",
        description: "Liên hệ với bộ phận hỗ trợ sinh viên qua email cho các vấn đề liên quan học tập.",
        category: "support",
      },
    ];

    for (const service of services) {
      await sql`
        INSERT INTO services (name, description, category, link)
        VALUES (${service.name}, ${service.description}, ${service.category}, ${service.link ?? null})
        ON CONFLICT DO NOTHING
      `;
    }
    console.log("✓ Seeded services");

    // Seed FAQs
    const faqs = [
      {
        question: "Làm thế nào để đăng ký môn học?",
        answer: "Để đăng ký môn học, bạn cần truy cập vào FAP, chọn mục Đăng ký môn học, chọn những môn học bạn muốn đăng ký và nhấn lưu. Lưu ý rằng chỉ được đăng ký trong khoảng thời gian do nhà trường quy định.",
        category: "academics",
        order: 1,
      },
      {
        question: "GPA của tôi được tính như thế nào?",
        answer: "GPA được tính bằng cách cộng điểm số của tất cả các môn học, nhân với số tín chỉ của từng môn, rồi chia cho tổng số tín chỉ. Điểm được tính trên thang điểm 4.0.",
        category: "academics",
        order: 2,
      },
      {
        question: "Tôi có thể học lại một môn học không?",
        answer: "Có, bạn có thể học lại bất kỳ môn học nào. Điểm số mới sẽ thay thế điểm số cũ trong cách tính GPA.",
        category: "academics",
        order: 3,
      },
      {
        question: "Phí học bao gồng những gì?",
        answer: "Phí học bao gồm học phí, phí tài liệu học tập, phí trang thiết bị, và các khoản phí khác do nhà trường quy định. Chi tiết xem trong hợp đồng nhập học.",
        category: "finance",
        order: 1,
      },
    ];

    for (const faq of faqs) {
      await sql`
        INSERT INTO faqs (question, answer, category, "order")
        VALUES (${faq.question}, ${faq.answer}, ${faq.category}, ${faq.order})
        ON CONFLICT DO NOTHING
      `;
    }
    console.log("✓ Seeded FAQs");

    // Seed sample courses
    const courses = [
      {
        code: "PRF192",
        name: "Professional Practice",
        description: "Kỹ năng chuyên nghiệp và thực hành công việc",
        credits: 2,
      },
      {
        code: "PRJ291",
        name: "System Design Project",
        description: "Dự án thiết kế hệ thống",
        credits: 4,
      },
      {
        code: "WEB502",
        name: "Advanced Web Development",
        description: "Phát triển web nâng cao",
        credits: 3,
      },
    ];

    for (const course of courses) {
      await sql`
        INSERT INTO courses (code, name, description, credits)
        VALUES (${course.code}, ${course.name}, ${course.description}, ${course.credits})
        ON CONFLICT (code) DO NOTHING
      `;
    }
    console.log("✓ Seeded courses");

    // Seed sample pages
    const pages = [
      {
        slug: "huong-dan-dang-nhap",
        title: "Hướng dẫn Đăng nhập",
        content: "# Hướng dẫn Đăng nhập\n\nĐây là hướng dẫn chi tiết về cách đăng nhập vào hệ thống.",
        category: "docs",
      },
      {
        slug: "quy-che-sinh-vien",
        title: "Quy chế Sinh viên",
        content: "# Quy chế Sinh viên\n\nQuy chế này áp dụng cho tất cả sinh viên của trường.",
        category: "handbook",
      },
      {
        slug: "cam-nang-thi-cu",
        title: "Cẩm nang Thi cử",
        content: "# Cẩm nang Thi cử\n\nHướng dẫn chi tiết về các quy định thi cử.",
        category: "handbook",
      },
    ];

    for (const page of pages) {
      await sql`
        INSERT INTO pages (slug, title, content, category, published, "authorId")
        VALUES (${page.slug}, ${page.title}, ${page.content}, ${page.category}, true, ${adminId})
        ON CONFLICT (slug) DO NOTHING
      `;
    }
    console.log("✓ Seeded pages");

    console.log("\n✓ Database seeded successfully!");
    console.log("\nAdmin credentials:");
    console.log("  [1] Email: admin@ffyb.edu.vn");
    console.log("      Password: admin123");
    console.log("  [2] Email: superadmin@ffyb.edu.vn");
    console.log("      Password: Fpt@Admin#2026!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
