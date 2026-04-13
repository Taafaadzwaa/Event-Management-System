const bcrypt = require('bcryptjs');
const supabase = require('./config/supabaseClient');

async function seedAdmin() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const { data, error } = await supabase
    .from('users')
    .insert([
      {
        name: 'Admin User',
        email: 'admin@events.com',
        password: hashedPassword,
        role: 'admin'
      }
    ]);

  if (error) {
    console.error('Error seeding admin:', error.message);
  } else {
    console.log('Admin user created successfully ✅');
  }
}

seedAdmin();