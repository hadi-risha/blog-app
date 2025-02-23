import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
    logger.error(err.message || 'Internal Server Error');
    res.status(500).json({ message: 'An error occurred. Please try again later.' });
};

export default errorHandler;
