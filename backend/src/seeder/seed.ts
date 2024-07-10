import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const especializacao = await prisma.especializacao.create({
    data: {
      nome: 'Engenheiro Mecânico',
    },
  });

  const casa = await prisma.casa.create({
    data: {
      nome: 'FIEMS',
    },
  });

  console.log({ especializacao, casa });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
