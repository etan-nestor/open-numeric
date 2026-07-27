import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Créer un admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@opennumeric.com' },
        update: {},
        create: {
            email: 'admin@opennumeric.com',
            name: 'Admin',
            password: 'dev45@.dev',
            role: 'ADMIN',
        },
    })

    console.log({ admin })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })