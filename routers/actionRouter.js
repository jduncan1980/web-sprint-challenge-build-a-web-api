const express = require('express');
const actions = require('../data/helpers/actionModel');
const {
	validateActionId,
	validateActionBody,
} = require('../middleware/actionMiddleware');
const router = express.Router();

router.get('/:id', validateActionId(), (req, res, next) => {
	try {
		res.status(200).json(req.action);
	} catch (error) {
		next(error);
	}
});

router.post('/', validateActionBody(), async (req, res, next) => {
	try {
		const newAction = await actions.insert(req.body);
		res.status(201).json(newAction);
	} catch (error) {
		next(error);
	}
});

router.put(
	'/:id',
	validateActionBody(),
	validateActionId(),
	async (req, res, next) => {
		try {
			const updates = await actions.update(req.params.id, req.body);
			res.status(200).json(updates);
		} catch (error) {
			next(error);
		}
	}
);

router.delete('/:id', validateActionId(), async (req, res, next) => {
	try {
		await actions.remove(req.params.id);
		res.status(200).json(req.action);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
