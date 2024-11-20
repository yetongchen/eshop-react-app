import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/productService';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const productData = await fetchProductById(id);
      setProduct(productData);
    };

    fetchDetail();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Product Images - Carousel */}
        <div className="col-md-6">
          <div id="productImagesCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-theme="dark">
            <div className="carousel-inner">
              {product.images.map((image, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img src={image} className="d-block w-100" alt={product.title} />
                </div>
              ))}
            </div>
            {/* Carousel Controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#productImagesCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#productImagesCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h4 className="text-success">${product.price}</h4>
          <p><strong>Discount: </strong>{product.discountPercentage}% off</p>
          <p><strong>Rating: </strong>{product.rating} ⭐</p>
          <p><strong>Availability: </strong>{product.availabilityStatus}</p>
          <p><strong>Stock: </strong>{product.stock}</p>
          <button className="btn btn-primary mt-3">Add to Cart</button>

          {/* Product Additional Info */}
          <div className="mt-4">
            <h5>Additional Information:</h5>
            <p><strong>SKU: </strong>{product.sku}</p>
            <p><strong>Weight: </strong>{product.weight}g</p>
            <p><strong>Dimensions: </strong>{product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm</p>
            <p><strong>Warranty: </strong>{product.warrantyInformation}</p>
            <p><strong>Return Policy: </strong>{product.returnPolicy}</p>
            <p><strong>Shipping: </strong>{product.shippingInformation}</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-5">
        <h4>Customer Reviews</h4>
        {product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div key={index} className="mb-4">
              <div className="d-flex justify-content-between">
                <h6>{review.reviewerName}</h6>
                <span>{review.rating} ⭐</span>
              </div>
              <p>{review.comment}</p>
              <small className="text-muted">Reviewed on {new Date(review.date).toLocaleDateString()}</small>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>

      {/* QR Code for Product */}
      <div className="mt-4 text-center">
        <img src={product.meta.qrCode} alt="QR Code" style={{ width: '150px', height: '150px' }} />
        <p>Scan for more details</p>
      </div>
    </div>
  );
};

export default ProductDetail;
