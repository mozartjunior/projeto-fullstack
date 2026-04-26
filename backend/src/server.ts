import 'reflect-metadata';
import 'dotenv/config';
import { appDataSource } from './database/appDataSource.js';
import app from './app.js';

import { Usuario } from './entities/Usuario.js';
import { Setor } from './entities/Setor.js';
import { Perfil } from './types/Perfil.js';
import { NomeSetor } from './types/NomeSetor.js';
import bcrypt from 'bcryptjs';

const PORT = process.env.PORT ?? 6060;

// --- FUNÇÃO DE SEED (A SEMENTE) ---
async function executarSeed() {
  const usuarioRepo = appDataSource.getRepository(Usuario);
  const setorRepo = appDataSource.getRepository(Setor);

  try {
    // 1. Verifica se já existe o admin para não duplicar
    const adminEmail = 'admin@admin.com';
    const adminExiste = await usuarioRepo.findOne({ where: { email: adminEmail } });

    if (!adminExiste) {
      console.log('🌱 [SEED] Banco de dados vazio. Gerando acesso inicial...');

      // 2. Garante que exista pelo menos um setor da sua lista
      let setorAdmin = await setorRepo.findOne({ where: { nome: NomeSetor.ADMINISTRATIVO } });
      
      if (!setorAdmin) {
        setorAdmin = setorRepo.create({ nome: NomeSetor.ADMINISTRATIVO });
        await setorRepo.save(setorAdmin);
        console.log('🏢 [SEED] Setor ADMINISTRATIVO criado.');
      }

      // 3. Gera o Hash para a senha 'admin123'
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash('admin123', salt);

      // 4. Cria o Usuário GESTOR vinculado ao setor
      const superAdmin = usuarioRepo.create({
        nome: 'Administrador Gestor',
        email: adminEmail,
        senha_hash: senhaHash,
        perfil: Perfil.GESTOR, // <--- Aqui está o seu poder de acesso
        ativo: true,
        setor: setorAdmin
      });

      await usuarioRepo.save(superAdmin);
      console.log('✅ [SEED] Super Usuário criado com sucesso!');
      console.log('👉 Credenciais: admin@admin.com | Senha: admin123');
    } else {
      console.log('✅ [SEED] Ambiente já configurado.');
    }
  } catch (error) {
    console.error('❌ [SEED] Falha ao popular banco:', error);
  }
}

appDataSource.initialize()
  .then(async () => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');

    await executarSeed(); // Executa a função de seed antes de iniciar o servidor

    app.listen(PORT, () => {
      console.log(`Server is running in PORT: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Erro ao iniciar aplicação: ", error);
  });