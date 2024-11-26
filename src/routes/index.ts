
import { UserRoutes } from './user';
import { RoleRoutes } from './role';
import { RoleUserRoutes } from './role_user';
import { AuthRoutes } from './auth';
import { RefreshTokenRoutes } from './refresh_token';
import { Article } from '../models/Article';

export class Routes {
    public article: Article = new Article();
    public userRoutes: UserRoutes = new UserRoutes();
    public roleRoutes: RoleRoutes = new RoleRoutes();
    public roleUserRoutes: RoleUserRoutes = new RoleUserRoutes();
    public authRoutes: AuthRoutes = new AuthRoutes();
    public refreshTokenRoutes: RefreshTokenRoutes = new RefreshTokenRoutes();
}
