module.exports = {
  tableName: 'products',
  attributes: {
    // primitive
    ref: {
      type: 'string',
      unique: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    price:{
      type: 'float',
      required: true,
    },
    label: {
      type: 'string',
      in: ["black", "yellow"],
    }
    // associations
    // ...
  },
  validationMessages: {
    name: {
      required: "Who adds a product without a name? SMH.",
    },
    price: {
      required: "Seriously? Wanna donate this product or what?",
    },
    label: {
      in: "Only black and yellow labels are allowed bro!",
    }
  },
};