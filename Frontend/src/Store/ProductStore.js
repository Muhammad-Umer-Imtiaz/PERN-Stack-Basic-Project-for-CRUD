import axios from "axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

const Base_URL = "https://my-backend-api-21ey.onrender.com";
export const ProductStore = create((set) => ({
  product: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${Base_URL}/api/products`);
      console.log(res.data);
      set({ product: res.data.products, error: null });
    } catch (error) {
      if (error.status === 429) {
        set({ error: "Too Many Requests" });
      } else if (error.status === 403) {
        set({ error: "Forbidden or bots not allowed" });
      } else {
        set({ error: "Something went wrong" });
      }
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`${Base_URL}/api/products/${id}`);
      set((prev) => ({
        product: prev.product.filter((item) => item.id !== id),
        error: null,
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product", error);
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (id, updatedData) => {
    set({ loading: true });
    try {
      const res = await axios.put(
        `${Base_URL}/api/products/${id}`,
        updatedData
      );
      set((prev) => ({
        product: prev.product.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        ),
        error: null,
      }));
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Failed to update product", error);
    } finally {
      set({ loading: false });
    }
  },
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post(
        `${Base_URL}/api/products/create`,
        productData
      );
      set((prev) => ({
        product: [...prev.product, res.data.product],
        error: null,
      }));
      toast.success("Product created successfully");
    } catch (error) {
      toast.error("Failed to create product", error);
    } finally {
      set({ loading: false });
    }
  },
}));
