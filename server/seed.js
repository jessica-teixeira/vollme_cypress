import { AppDataSource } from './build/data-source.js';
import { Clinica } from './build/clinicas/clinicaEntity.js';
import { encryptPassword } from './build/utils/senhaUtils.js';
import 'dotenv/config';

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Database initialized');

    const clinicaRepository = AppDataSource.getRepository(Clinica);
    
    // Check if clinica already exists
    const existingClinica = await clinicaRepository.findOne({ 
      where: { email: 'clinica@gmail.com' } 
    });

    if (!existingClinica) {
      const encryptedPassword = encryptPassword('4321');
      
      const newClinica = new Clinica();
      newClinica.email = 'clinica@gmail.com';
      newClinica.senha = encryptedPassword;
      newClinica.role = 'clinica';
      newClinica.nome = 'Clínica Teste';
      
      await clinicaRepository.save(newClinica);
      console.log('Clinica user created successfully');
    } else {
      console.log('Clinica user already exists');
    }

    await AppDataSource.destroy();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
