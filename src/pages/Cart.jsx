import React from 'react';

export default function Cart() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col space-y-4">
          {/* Cart will be implemented later */}
          <p className="text-gray-600">Your cart is empty</p>
        </div>
      </div>
    </div>
  );
}
