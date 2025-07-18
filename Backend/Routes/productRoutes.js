import express from "express";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "../Controller/productController.js";


const router = express.Router();

router.get("/", getAllProducts);
router.post("/create", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);
router.get("/:id",getSingleProduct)

export default router;
