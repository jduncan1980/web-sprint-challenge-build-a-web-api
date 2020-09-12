const projects = require('../data/helpers/projectModel');

const validateProjectId = () => {
	return async (req, res, next) => {
		try {
			const project = await projects.get(req.params.id);
			if (project) {
				req.project = project;
				next();
			} else {
				res.status(404).json({ message: 'Project Not Found' });
			}
		} catch (error) {
			next(error);
		}
	};
};

const validateProjectBody = () => {
	return async (req, res, next) => {
		if (!req.body.name || !req.body.description) {
			res.status(400).json({ message: 'Missing Project Data.' });
		} else {
			next();
		}
	};
};

module.exports = {
	validateProjectId,
	validateProjectBody,
};
