const router = require('express').Router();
const productsController = require('../controllers/products');
const authController = require('../controllers/auth');
const userController = require('../controllers/users');
const messagesController = require('../controllers/messages');
const secureRoute = require('../lib/secureRoute');


router.route('/products')
  .get(productsController.index)
  .post(secureRoute, productsController.create);

router.route('/products/:id')
  .get(productsController.show)
  .put(secureRoute, productsController.update)
  .delete(secureRoute, productsController.delete);

router.post('/register', authController.register);
router.post('/login', authController.login);

router.route('/users/:id')
  .get(secureRoute, userController.show)
  .put(secureRoute, userController.update);

router.post('/messages', secureRoute, messagesController.create);

//router.get('/users/edit', secureRoute, userController.edit);

router.route('/*')
  .all((req, res) => res.sendStatus(404));



module.exports = router;
