shortid = require('shortid');

module.exports = {
  async show(req, res) {
    try {
      const product = await Product.findOne({ ref: req.param('ref') });
      if (!product) return res.notFound();
      return res.view('product', { product });
    } catch(err) {
      console.log(err);
    }
  },
  async add(req, res) {
    const data = {
      errors: {},
      old: {},
    };
    if (req.method === 'POST') {
      try {
        const product = await Product.create({
          ref: shortid.generate(),
          name: req.body.name,
          price: parseFloat(req.body.price),
          label: req.body.label,
        });
        return res.redirect(`product/${product.ref}`);
      } catch(err) {
        if(err.invalidAttributes) {
          data.errors = err.Errors;
          data.old = req.body;
        }
      }
    }

    return res.view('add-product-form', data);
  },
};