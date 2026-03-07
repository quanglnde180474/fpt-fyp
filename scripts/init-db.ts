import { neon } from "@neondatabase/serverless";

process.loadEnvFile(new URL('../.env', import.meta.url));

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const sql = neon(DATABASE_URL);

async function initializeDatabase() {
  try {
    console.log("Creating tables...");

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        "passwordHash" VARCHAR(255) NOT NULL,
        "fullName" VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        active BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log("✓ Created users table");

    // Create pages table
    await sql`
      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(100) DEFAULT 'docs',
        published BOOLEAN DEFAULT false,
        "authorId" INTEGER NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY ("authorId") REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS "idx_pages_slug" ON pages(slug)`;
    await sql`CREATE INDEX IF NOT EXISTS "idx_pages_category" ON pages(category)`;
    console.log("✓ Created pages table");

    // Create courses table
    await sql`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        code VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        credits INTEGER,
        prerequisites TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS "idx_courses_code" ON courses(code)`;
    console.log("✓ Created courses table");

    // Create schedules table
    await sql`
      CREATE TABLE IF NOT EXISTS schedules (
        id SERIAL PRIMARY KEY,
        "courseId" INTEGER NOT NULL,
        day VARCHAR(50) NOT NULL,
        "startTime" VARCHAR(10) NOT NULL,
        "endTime" VARCHAR(10) NOT NULL,
        room VARCHAR(100) NOT NULL,
        capacity INTEGER DEFAULT 30,
        FOREIGN KEY ("courseId") REFERENCES courses(id) ON DELETE CASCADE
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS "idx_schedules_courseId" ON schedules("courseId")`;
    console.log("✓ Created schedules table");

    // Create services table
    await sql`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        "iconUrl" TEXT,
        link TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS "idx_services_category" ON services(category)`;
    console.log("✓ Created services table");

    // Create announcements table
    await sql`
      CREATE TABLE IF NOT EXISTS announcements (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        "imageUrl" TEXT,
        category VARCHAR(100) DEFAULT 'general',
        "authorId" INTEGER NOT NULL,
        "publishedAt" TIMESTAMP,
        "createdAt" TIMESTAMP DEFAULT NOW(),
        "updatedAt" TIMESTAMP DEFAULT NOW(),
        FOREIGN KEY ("authorId") REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS "idx_announcements_category" ON announcements(category)`;
    await sql`CREATE INDEX IF NOT EXISTS "idx_announcements_publishedAt" ON announcements("publishedAt")`;
    console.log("✓ Created announcements table");

    // Create faqs table
    await sql`
      CREATE TABLE IF NOT EXISTS faqs (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        "order" INTEGER DEFAULT 0,
        "createdAt" TIMESTAMP DEFAULT NOW()
      )
    `;
    await sql`CREATE INDEX IF NOT EXISTS "idx_faqs_category" ON faqs(category)`;
    await sql`CREATE INDEX IF NOT EXISTS "idx_faqs_order" ON faqs("order")`;
    console.log("✓ Created faqs table");

    console.log("\n✓ Database initialized successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
}

initializeDatabase();
