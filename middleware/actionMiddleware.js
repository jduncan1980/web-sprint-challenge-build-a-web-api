const actions = require('../data/helpers/actionModel');

const validateActionId = () => {
	return async (req, res, next) => {
		try {
			const action = await actions.get(req.params.id);
			if (action) {
				req.action = action;
				next();
			} else {
				res.status(404).json({ message: 'Action not found.' });
			}
		} catch (error) {
			next(error);
		}
	};
};

const validateActionBody = () => {
	return (req, res, next) => {
		if (req.body.project_id && req.body.notes && req.body.description) {
			if (req.body.description.length > 128) {
				res
					.status(400)
					.json({ message: 'Description max length is 128 characters' });
			} else {
				next();
			}
		} else {
			res.status(400).json({ message: 'Missing Action Data.' });
		}
	};
};

module.exports = {
	validateActionId,
	validateActionBody,
};
