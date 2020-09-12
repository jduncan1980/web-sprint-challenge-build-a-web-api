const express = require('express');
const router = express.Router();
const projects = require('../data/helpers/projectModel');
const {
	validateProjectId,
	validateProjectBody,
} = require('../middleware/projectMiddleware');

router.get('/:id', validateProjectId(), (req, res, next) => {
	try {
		res.status(200).json(req.project);
	} catch (error) {
		next(error);
	}
});

router.get('/:id/actions', validateProjectId(), async (req, res, next) => {
	try {
		const actions = await projects.getProjectActions(req.params.id);
		res.status(200).json(actions);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	const project = req.body;
	try {
		const newProject = await projects.insert(project);
		if (newProject) {
			res.status(201).json(newProject);
		}
	} catch (error) {
		next(error);
	}
});

router.put(
	'/:id',
	validateProjectBody(),
	validateProjectId(),
	async (req, res, next) => {
		try {
			const updatedProject = await projects.update(req.params.id, req.body);
			res.status(200).json(updatedProject);
		} catch (error) {
			next(error);
		}
	}
);

router.delete('/:id', validateProjectId(), async (req, res, next) => {
	try {
		await projects.remove(req.params.id);
		res.status(200).json(req.project);
	} catch (error) {
		next(error);
	}
});
module.exports = router;
