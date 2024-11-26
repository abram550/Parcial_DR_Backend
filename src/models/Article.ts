import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { User } from "./User";

export class Article extends Model {
  public id!: number;
  public name!: string;
  public quantity!: number;
  public stock_min!: number;
  public stock_max!: number;
  public user_id!: number; // FK hacia User
}

export interface ArticleI {
  id: number;
  name: string;
  quantity: number;
  stock_min: number;
  stock_max: number;
  user_id: number;
}

Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock_min: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock_max: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: "CASCADE", // Acción al eliminar un usuario
    },
  },
  {
    tableName: "articles",
    sequelize: database,
    timestamps: false,
  }
);

// Relación entre Article y User
Article.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Article, { foreignKey: "user_id", as: "articles" });
