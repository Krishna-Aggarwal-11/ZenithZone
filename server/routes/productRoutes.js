import epxress from "express";
import { createProduct, deleteProduct,updateProduct , getProduct , getAllProduct} from "../controller/productController.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = epxress.Router();

router.post("/create",verifyUser, createProduct);
router.delete("/delete/:id" ,verifyUser, deleteProduct)
router.post("/update/:id" ,verifyUser, updateProduct)
router.get("/get/:id" , getProduct)
router.get("/get" , getAllProduct)

