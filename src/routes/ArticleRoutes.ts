import { Application } from "express";
import { ArticleController } from "../controllers/article.controller";

export class ArticleRoutes {
  public articleController: ArticleController = new ArticleController();

  public routes(app: Application): void {
    // Ruta de prueba
    app.route("/article/test").get(this.articleController.test);

    // Rutas CRUD para artículos
    app.route("/article").get(this.articleController.getAllArticles);          // Obtener todos los artículos
    app.route("/article/:id").get(this.articleController.getOneArticle);       // Obtener un artículo por ID
    app.route("/article").post(this.articleController.createArticle);          // Crear un nuevo artículo
    app.route("/article/:id").put(this.articleController.updateArticle);       // Actualizar un artículo existente
    app.route("/article/:id").delete(this.articleController.deleteArticle);    // Eliminar un artículo
  }
}
