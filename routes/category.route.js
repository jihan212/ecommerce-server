const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/categories', async (req, res, next) => {
	try {
		const categories = await prisma.category.findMany({
			include: { products: true },
		});

		res.json({ categories });
	} catch (error) {
		next(error);
	}
});

router.get('/categories/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const category = await prisma.category.findUnique({
			where: {
				id: Number(id),
			},
			include: { products: true },
		});
		res.json(category);
	} catch (error) {
		next(error);
	}
});

router.post('/categories', async (req, res, next) => {
	try {
		const category = await prisma.category.create({
			data: req.body,
		});
		res.json(category);
	} catch (error) {
		next(error);
	}
});

router.delete('/categories/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedCategory = await prisma.category.delete({
			where: {
				id: Number(id),
			},
		});
		res.json(deletedCategory);
	} catch (error) {
		next(error);
	}
});

router.patch('/categories/:id', async (req, res, next) => {
	try {
		const { id } = req.params;
		const category = await prisma.category.update({
			where: {
				id: Number(id),
			},
			data: req.body,
			include: {
				products: true,
			},
		});
		res.json(category);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
