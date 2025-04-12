import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Konfigurasi WebSocket untuk Neon Database
neonConfig.webSocketConstructor = ws;

// Pastikan DATABASE_URL ada
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL tidak ditemukan. Pastikan variabel lingkungan telah diatur dengan benar.');
  process.exit(1);
}

// Buat koneksi database
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function setupDatabase() {
  try {
    console.log('Memulai setup database...');
    
    // Dapatkan jalur migrasi
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const migrationPath = path.join(__dirname, 'migrations', '0001_initial_schema.sql');
    
    // Baca file SQL
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    // Jalankan query
    await pool.query(sql);
    
    console.log('Setup database berhasil!');
  } catch (error) {
    console.error('Error selama setup database:', error);
  } finally {
    // Tutup koneksi
    await pool.end();
  }
}

setupDatabase();