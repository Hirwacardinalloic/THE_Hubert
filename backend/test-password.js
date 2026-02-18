import db from './db.js';
import bcrypt from 'bcryptjs';

async function testPassword() {
  try {
    // Get the admin user
    const admin = await db.getAsync(
      'SELECT * FROM admin_users WHERE email = ?',
      ['admin@thehurbert.com']
    );

    if (!admin) {
      console.log('❌ Admin user not found!');
      return;
    }

    console.log('✅ Admin user found:');
    console.log('   ID:', admin.id);
    console.log('   Username:', admin.username);
    console.log('   Email:', admin.email);
    console.log('   Password Hash:', admin.password_hash);
    console.log('   Role:', admin.role);

    // Test the password
    const testPassword = 'Hurb3rt@2026!';
    const isValid = bcrypt.compareSync(testPassword, admin.password_hash);
    
    console.log('\n🔑 Testing password:', testPassword);
    console.log('   Password valid:', isValid);

    // If not valid, let's create a new one
    if (!isValid) {
      console.log('\n🔄 Creating new password hash...');
      const newHash = bcrypt.hashSync(testPassword, 10);
      console.log('   New hash:', newHash);
      
      // Update the database
      await db.runAsync(
        'UPDATE admin_users SET password_hash = ? WHERE id = ?',
        [newHash, admin.id]
      );
      console.log('✅ Password updated in database!');
      
      // Verify again
      const updated = await db.getAsync(
        'SELECT password_hash FROM admin_users WHERE id = ?',
        [admin.id]
      );
      const verify = bcrypt.compareSync(testPassword, updated.password_hash);
      console.log('   Verification:', verify ? '✅ Works!' : '❌ Still broken');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
  process.exit();
}

testPassword();