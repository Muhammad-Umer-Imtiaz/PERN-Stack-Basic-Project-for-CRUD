import { sql } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await sql`
      SELECT * FROM products
      ORDER BY created_at DESC`;
    res.status(200).json({ success: true, products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
export const createProduct = async (req, res) => {
  console.log(req.body);
  const { name, image, price } = req.body;
  if ((!name, !image, !price)) {
    return res
      .status(400)
      .json({ success: false, message: "Please Fill required fields" });
  }

  try {
    const newProduct = await sql`
      INSERT INTO products (name, image, price)
      VALUES (${name}, ${image}, ${price})
      RETURNING *`;
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      newProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide product id" });
  }
  try {
    const deleteProduct = await sql`
        DELETE FROM products WHERE id = ${id} RETURNING *`;
    res.status(201).json({
      success: true,
      message: "Product deleted successfully",
      deleteProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide product id" });
  }
    const { name, image, price } = req.body;

   if ((!name||!image|| !price)) {
    return res
      .status(400)
      .json({ success: false, message: "Please Fill required fields" });
  }
  try {
    const updateProduct = await sql`
        UPDATE products SET name = ${req.body.name}, image = ${req.body.image}, price = ${req.body.price}
        WHERE id = ${id} RETURNING *`;
    res.status(201).json({
      success: true,
      message: "Product updated successfully",
      updateProduct,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide product id" });
    }
    const product = await sql`SELECT * FROM products WHERE id =${id}`;
    res.status(201).json({
      success: true,
      message: "Product get successfully",
      product,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
