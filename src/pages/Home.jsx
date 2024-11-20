import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/productService';
import Pagination from '../components/Pagination';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageLimit, setPageLimit] = useState(20);
  
    useEffect(() => {
      const fetchProductData = async () => {
        const { products, totalPages } = await fetchProducts(currentPage, pageLimit);
        setProducts(products);
        setTotalPages(totalPages);
      };
  
      fetchProductData();
    }, [currentPage]);
  
    return (
        <div className="container">
          <h1 className="text-center my-4">Product Catalog</h1>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((product) => (
              <div key={product.id} className="col">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
    );
};
  
export default Home;