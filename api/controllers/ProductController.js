shortid = require('shortid');

module.exports = {
  async show(req, res) {
    try {
      const product = await Product.findOne({ ref: req.param('ref') });
      if (!product) return res.notFound();
      return res.view('product', {product});
    } catch (err) {
      return res.serverError();
    }
  },
  async add(req, res) {
    let old = {};
    if (req.method === 'POST') {
      try {
        const product = await Product.create({ ...req.body, ref: shortid.generate() }).fetch();
        return res.redirect(`/product/${product.ref}`);
      } catch (err) {
        // custom validation messages not attached to error object :(
        old = req.body;
        return res.view('add-product-form', { old, err });
      }
    } else {
      return res.view('add-product-form', { old });
    }
  },
};