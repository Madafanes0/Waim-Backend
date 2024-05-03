const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getAI);
router.post('/', controller.postAI);
router.get('/by-content-type/:contentTypeName', controller.getAIByContentType);
router.delete('/:tool_id', controller.deleteAI);
router.post('/login/', controller.postUser)

module.exports= router;