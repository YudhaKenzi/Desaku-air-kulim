// Script untuk menyiapkan dan melakukan migrasi database untuk deployment
import { promises as fs } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function runCommand(command) {
  try {
    console.log(`Running: ${command}`);
    const { stdout, stderr } = await execAsync(command);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    return true;
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    console.error(error);
    return false;
  }
}

async function deployDatabase() {
  console.log('=== Starting database setup for deployment ===');
  
  // 1. Run Drizzle push to create schema
  console.log('\n1. Running database migration...');
  const migrationSuccess = await runCommand('npm run db:push');
  
  if (!migrationSuccess) {
    console.error('Database migration failed. Exiting deployment process.');
    process.exit(1);
  }
  
  console.log('\n=== Database setup completed successfully ===');
}

// Run the deployment
deployDatabase().catch(err => {
  console.error('Deployment error:', err);
  process.exit(1);
});