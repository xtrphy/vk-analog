const prisma = require('./client');
const { faker } = require('@faker-js/faker');

async function main() {
    await prisma.comment.deleteMany();
    await prisma.follow.deleteMany();
    await prisma.like.deleteMany();
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    const users = [];
    for (let i = 0; i < 8; i++) {
        const user = await prisma.user.create({
            data: {
                email: faker.internet.email(),
                username: faker.internet.username(),
                bio: faker.lorem.sentence(),
                profilePicture: faker.image.avatar(),
            },
        });
        users.push(user);
    }

    for (const user of users) {
        const postCount = faker.number.int({ min: 1, max: 5 });
        for (let i = 0; i < postCount; i++) {
            await prisma.post.create({
                data: {
                    content: faker.lorem.paragraph(),
                    imageUrl: faker.image.urlPicsumPhotos({ width: 600, height: 500 }),
                    authorId: user.id,
                },
            });
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());