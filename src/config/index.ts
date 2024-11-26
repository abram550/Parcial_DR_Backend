import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Routes } from '../routes/index';   
import { ArticleRoutes } from '../routes/ArticleRoutes';
export class App {
    public routePrv: Routes = new Routes();


    public app: Application;  // Cambiado a public para acceder fuera de la clase

    constructor(private port?: number | string) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    // Configuración del puerto
    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    // Configuración de middlewares
    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json()); 
        this.app.use(express.urlencoded({ extended: false }));
        
        // Habilitar CORS para permitir solicitudes desde otros orígenes
        this.app.use(cors());
    }

    // Configuración de rutas
    private routes() {
        this.routePrv.authRoutes.routes(this.app);
        this.routePrv.authRoutes.routes(this.app);
        this.routePrv.roleRoutes.routes(this.app);
        this.routePrv.userRoutes.routes(this.app);
        this.routePrv.roleUserRoutes.routes(this.app);
        this.routePrv.refreshTokenRoutes.routes(this.app);

    }

    // Escuchar en el puerto configurado
    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}
