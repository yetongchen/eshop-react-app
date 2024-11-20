import axios from 'axios';

const productAPI = "https://dummyjson.com";

export const fetchProducts = async (page = 1, pageLimit = 10) => {
    try {
        const response = await axios.get(`${productAPI}/products?limit=${pageLimit}&skip=${(page - 1) * pageLimit}`);
        const data = response.data;
        const products = data.products;
        const totalPages = Math.ceil(data.total / pageLimit);
        return { products, totalPages };
    } catch (error) {
        console.error("Error fetching products:", error);
        return { data: [], totalPages: 1 };
    }
};

export const fetchProductById = async (id) => {
    try {
      const response = await axios.get(`${productAPI}/products/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
};