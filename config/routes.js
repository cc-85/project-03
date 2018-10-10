const router = require('express').Router();
const productsController = require('../controllers/products');
const authController = require('../controllers/auth');
const userController = require('../controllers/users');
const messagesController = require('../controllers/messages');
const secureRoute = require('../lib/secureRoute');

//route to all the products
router.route('/products')
  .get(productsController.index)
  .post(secureRoute, productsController.create);

// show 1 specific product
router.route('/products/:id')
  .get(productsController.show)
  .put(secureRoute, productsController.update) // modify 1 product
  .delete(secureRoute, productsController.delete); // delete 1 product

// register page
router.post('/register', authController.register);

//login page
router.post('/login', authController.login);

// user profile page
router.route('/users/:id')
  .get(secureRoute, userController.show)
  .put(secureRoute, userController.update); //edit user's profile

// user sends a message about 1 product
router.post('/messages', secureRoute, messagesController.create);
router.delete('/messages/:id', secureRoute, messagesController.deleteMessage);

// user deletes a message
router.delete('/messages/:messageId', secureRoute, messagesController.deleteMessage);

router.route('/*')
  .all((req, res) => res.sendStatus(404));


// ---------- export the routes -----------
module.exports = router;
