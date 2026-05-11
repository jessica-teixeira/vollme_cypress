import { AppDataSource } from './build/data-source.js';
import { encryptPassword } from './build/utils/senhaUtils.js';
import 'dotenv/config';

async function updatePassword() {
  try {
    await AppDataSource.initialize();
    console.log('Database initialized');

    const encryptedPassword = encryptPassword('4321');
    console.log('Encrypted password:', encryptedPassword);
    
    // Use raw SQL query to update the password
    await AppDataSource.query(
      'UPDATE clinica SET senha = ? WHERE email = ?',
      [encryptedPassword, 'clinica@gmail.com']
    );
    
    console.log('Clinica password updated successfully');

    await AppDataSource.destroy();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error updating password:', error);
    process.exit(1);
  }
}

updatePassword();
