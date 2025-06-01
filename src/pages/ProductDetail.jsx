import React from 'react';
import { useParams } from 'react-router-dom';

const products = {
  1: {
    name: "Tales House T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Classic cotton t-shirt with Tales House logo. Made from 100% premium cotton for ultimate comfort and durability."
  },
  2: {
    name: "Creator Hoodie",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Comfortable hoodie for content creators. Perfect for those long editing sessions or casual wear."
  },
  3: {
    name: "TikTok Creator Kit",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1607435097405-db48f377bff6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Essential kit for TikTok content creation including ring light, phone holder, and microphone."
  },
  4: {
    name: "Tales House Cap",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    description: "Stylish cap with embroidered logo. Adjustable fit for all head sizes."
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = products[id];

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image */}
            <div className="md:flex-shrink-0">
              <img 
                src={product.image} 
                alt={product.name}
                className="h-64 w-full md:w-96 object-cover"
              />
            </div>
            
            {/* Product Details */}
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-6">
                {product.description}
              </p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              </div>
              <button
                className="bg-yellow-400 text-black py-3 px-8 rounded-md hover:bg-yellow-500 transition-colors duration-200 font-semibold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
