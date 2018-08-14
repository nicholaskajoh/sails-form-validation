module.exports = {
  tableName: 'products',
  attributes: {
    // primitive
    id: {
      type: 'string',
      columnName: '_id',
    },
    ref: {
      type: 'string',
      required: true,
      unique: true,
    },
    name: {
      type: 'string',
      required: true,
    },
    price:{
      type: 'number',
      required: true,
    },
    label: {
      type: 'string',
      isIn: ["black", "yellow"],
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
      isIn: "Only black and yellow labels are allowed bro!",
    }
  },
};