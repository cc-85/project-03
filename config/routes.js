const router = require('express').Router();
const productsController = require('../controllers/products');

router.route('/products')
  .get(productsController.index)
  .post(productsController.create);

router.route('/products/:id')
  .get(productsController.show)
  .put(productsController.update)
  .delete(productsController.delete);




router.route('/*')
  .all((req, res) => res.sendStatus(404));

module.exports = router;
