const router = require('express').Router();
const productsController = require('../controllers/products');
const authController = require('../controllers/auth');
const userController = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');


router.route('/products')
  .get(productsController.index)
  .post(secureRoute, productsController.create);

router.route('/products/:id')
  .get(productsController.show)
  .put(secureRoute, productsController.update)
  .delete(secureRoute, productsController.delete);

router.get('/users/:id', secureRoute, userController.show);

router.post('/register', authController.register);
router.post('/login', authController.login);

router.route('/*')
  .all((req, res) => res.sendStatus(404));

module.exports = router;
