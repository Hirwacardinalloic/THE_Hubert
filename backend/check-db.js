import db from './db.js';

async function check() {
  try {
    // Check if table exists
    const tables = await db.allAsync(
      "SELECT name FROM sqlite_master WHERE type='table'"
    );
    console.log('📊 Tables in database:');
    tables.forEach(t => console.log(`   - ${t.name}`));

    // Check admin users
    const users = await db.allAsync('SELECT id, username, email, role FROM admin_users');
    console.log('\n👤 Admin users:');
    if (users.length === 0) {
      console.log('   ❌ No admin users found!');
    } else {
      users.forEach(u => console.log(`   ✅ ${u.id}: ${u.username} - ${u.email} (${u.role})`));
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  process.exit();
}

check();