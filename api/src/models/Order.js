const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  
  sequelize.define("order", {
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    state: {
      type: DataTypes.ENUM,
      values: ["carrito", "creada", "procesando", "cancelada", "completa"],
      defaultValue: "carrito",
    },
    address: {
      type: DataTypes.STRING,
    },
    paymentMethod: {
			type: DataTypes.STRING,
		},
  });
};
