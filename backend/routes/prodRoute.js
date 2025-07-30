import express from "express";
import { protect } from "../middleware/middlewareAuth.js";
import {
  addProduct,
  updateQuantity,
  getProducts,
  getProductById,
  updatePrice,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", protect, addProduct);
router.put("/:id/quantity", protect, updateQuantity);
router.put("/:id/price", protect, updatePrice);
router.put("/:id", protect, updateProduct);
router.get("/", protect, getProducts);
router.get("/:id", protect, getProductById);
router.delete("/:id", protect, deleteProduct);

export default router;
