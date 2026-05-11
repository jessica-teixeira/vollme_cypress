import { AppDataSource } from './build/data-source.js';
import { Clinica } from './build/clinicas/clinicaEntity.js';
import { encryptPassword } from './build/utils/senhaUtils.js';
import 'dotenv/config';

async function updatePassword() {
  try {
    await AppDataSource.initialize();
    console.log('Database initialized');

    const clinicaRepository = AppDataSource.getRepository(Clinica);
    
    // Find existing clinica
    const existingClinica = await clinicaRepository.findOne({ 
      where: { email: 'clinica@gmail.com' } 
    });

    if (existingClinica) {
      const encryptedPassword = encryptPassword('4321');
      
      existingClinica.senha = encryptedPassword;
      await clinicaRepository.save(existingClinica);
      console.log('Clinica password updated successfully');
    } else {
      console.log('Clinica user not found');
    }

    await AppDataSource.destroy();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error updating password:', error);
    process.exit(1);
  }
}

updatePassword();
