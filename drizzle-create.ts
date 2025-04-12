import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import * as schema from './shared/schema';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }

  console.log('Connecting to database...');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });
  
  try {
    // Create tables
    console.log('Creating database schema...');
    
    // Create users table manually
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        fullname TEXT NOT NULL,
        nik TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        phone_number TEXT,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    console.log('Users table created');
    
    // Create documents table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        file_url TEXT NOT NULL, 
        file_type TEXT NOT NULL,
        file_size INTEGER NOT NULL,
        category TEXT NOT NULL,
        uploaded_by INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    console.log('Documents table created');
    
    // Create applications table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        document_type TEXT NOT NULL,
        data JSONB NOT NULL,
        supporting_documents JSONB NOT NULL,
        status TEXT NOT NULL DEFAULT 'pending',
        notes TEXT,
        admin_notes TEXT,
        result_file_url TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    console.log('Applications table created');
    
    // Create notifications table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN NOT NULL DEFAULT false,
        related_id INTEGER,
        related_type TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    
    console.log('Notifications table created');
    
    // Create indexes
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
      CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
      CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
      CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
    `);
    
    console.log('Indexes created');
    
    // Create default admin
    await pool.query(`
      INSERT INTO users (username, password, fullname, nik, email, role)
      VALUES ('admin', '$2b$10$KZCcE1YQaOHCsLvwxUZyR.1ln9nvw/IC6G8o1fJJP4Cj/xbwRDFzW', 'Administrator', '0000000000000000', 'admin@example.com', 'admin')
      ON CONFLICT (username) DO NOTHING;
    `);
    
    console.log('Default admin created');
    
    console.log('Database setup completed!');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await pool.end();
  }
}

main();