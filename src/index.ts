import { PrismaClient } from "@prisma/client";
import express from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.listen(3332, () =>
    console.log('Rest Api server ready at: http://localhost:3332')
)

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
})

app.get('/feed', async (req, res) => {
    const posts = await prisma.post.findMany({
        where: {published: true},
        include: {author: true},
    });
    res.json(posts);
})

app.get('posts/:id', async (req, res) => {
    const { id } = req.params
    const post = await prisma.post.findFirst({
        where: { id: Number(id)},
    });
    res.json(post);
})

app.put('post/publish/:id', async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.update({
        where: { id: Number(id) },
        data: { published: true },
    });
    res.json(post);
})

app.delete('post/:id', async (req, res) => {
    const { id } = req.params;
    const post = await prisma.post.delete({
        where: { id: Number(id) },
    });
    res.json(post);
})
