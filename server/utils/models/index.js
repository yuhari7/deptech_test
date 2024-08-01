import { User } from "./User.js";
import { Category } from "./Category.js";
import { Product } from "./Product.js";
import { Role } from "./Role.js";
import { Transaction } from "./Transaction.js";
import { TransactionDetail } from "./TransactionDetail.js";

// Define associations
User.belongsTo(Role, { foreignKey: "roleId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });
TransactionDetail.belongsTo(Transaction, { foreignKey: "transactionId" });
TransactionDetail.belongsTo(Product, { foreignKey: "productId" });
Transaction.hasMany(TransactionDetail, { foreignKey: "transactionId" });

export { User, Role, Category, Product, Transaction, TransactionDetail };
