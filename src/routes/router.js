import { Router } from "express";
import UsersRouter from "./UsersRouter.js";
import ProductsRouter from "./ProductRouter.js";

const router = Router();

router.use(UsersRouter);
router.use(ProductsRouter);

export default router;

