import { Request, Response } from 'express';
import { Article } from '../models/Article';

export class ArticleController {
  public async test(req: Request, res: Response): Promise<void> {
    try {
      res.send('Hola, método test para Article');
    } catch (error) {
      res.status(500).send({ error: 'Error en el método test de Article' });
    }
  }

  public async getAllArticles(req: Request, res: Response): Promise<void> {
    try {
      const articles = await Article.findAll();
      res.status(200).json({ articles });
    } catch (error) {
      res.status(500).send({ error: 'Error al obtener los artículos' });
    }
  }

  public async getOneArticle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const article = await Article.findOne({ where: { id } });
      if (article) {
        res.status(200).json({ article });
      } else {
        res.status(404).json({ msg: 'El artículo no existe' });
      }
    } catch (error) {
      res.status(500).send({ error: 'Error interno del servidor' });
    }
  }

  public async createArticle(req: Request, res: Response): Promise<void> {
    const { name, quantity, stock_min, stock_max } = req.body;
    try {
      const article = await Article.create({
        name,
        quantity,
        stock_min,
        stock_max,
      });
      res.status(201).json({ article });
    } catch (error) {
      res.status(500).send({ error: 'Error al crear el artículo' });
    }
  }

  public async updateArticle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, quantity, stock_min, stock_max } = req.body;
    try {
      const article = await Article.findByPk(id);
      if (!article) {
        res.status(404).json({ msg: 'El artículo no existe' });
        return;
      }
      await Article.update({ name, quantity, stock_min, stock_max }, { where: { id } });
      const updatedArticle = await Article.findByPk(id);
      res.status(200).json({ article: updatedArticle });
    } catch (error) {
      res.status(500).send({ error: 'Error interno del servidor' });
    }
  }

  public async deleteArticle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const article = await Article.findByPk(id);
      if (!article) {
        res.status(404).json({ msg: 'El artículo no existe' });
        return;
      }
      await Article.destroy({ where: { id } });
      res.status(200).json({ msg: 'Artículo eliminado' });
    } catch (error) {
      res.status(500).send({ error: 'Error interno del servidor' });
    }
  }
}
