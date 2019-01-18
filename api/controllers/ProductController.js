shortid = require('shortid');

Product = require('../models/Product');

module.exports = {
  show: (req, res) => {
    Product
      .findOne({ where: {ref: req.param('ref')}})
      .exec((err, product) => {
        if(err) console.log(err);
        return res.view('product', {product});
      });
  },
  addForm: (req, res) => {
    // get errors if any from session
    var errorsExist = !_.isEmpty(req.session.flash) && !_.isEmpty(req.session.flash.formErrors);
    var errors = errorsExist ? _.clone(req.session.flash.formErrors) : false;
    // get old form data if any from session
    var oldExist = !_.isEmpty(req.session.flash) && !_.isEmpty(req.session.flash.old);
    var old = oldExist ? _.clone(req.session.flash.old) : false;
    // clear flash messages session
    req.session.flash = {};
    return res.view('add-product-form', {errors, old});
  },
  add: (req, res) => {
    Product
      .create({
        ref: shortid.generate(),
        name: req.body.name,
        price: parseFloat(req.body.price),
        label: req.body.label,
      })
      .exec((err, product) => {
        if(err && err.invalidAttributes) {
          // store errors and old data in session
          req.session.flash = {
            formErrors: err.Errors,
            old: req.body,
          }
          return res.redirect('products/add');
        } else {
          return res.redirect('product/'+product.ref);
        }
      });
  },
};