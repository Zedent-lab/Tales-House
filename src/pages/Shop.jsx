import React, { useState } from 'react';
import { ShoppingCart, Search, Star, Eye, Heart, Sparkles, Crown, Shirt } from 'lucide-react';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Collections', icon: Sparkles },
    { id: 'essential', name: 'Essentials', icon: Shirt },
    { id: 'luxe', name: 'Luxe', icon: Crown }
  ];

  const products = [
    {
      id: 1,
      name: 'Midnight Velvet Blazer',
      price: 485,
      originalPrice: 650,
      category: 'luxe',
      rating: 4.9,
      reviews: 127,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50MSkiLz4KPGV2ZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWRpZW50MSIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzJkMWI2OSIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwZjBmMjMiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K',
      tag: 'BESTSELLER',
      description: 'Crafted from Italian silk velvet with hand-finished lapels and mother-of-pearl buttons. This sophisticated blazer features a tailored silhouette that drapes beautifully, making it perfect for evening soirées or elevated business occasions.',
      details: ['Italian Silk Velvet', 'Hand-Finished Details', 'Tailored Fit'],
      story: 'Inspired by the elegance of Milanese fashion houses, each blazer is meticulously constructed by master tailors who have perfected their craft over generations.'
    },
    {
      id: 2,
      name: 'Cashmere Cloud Sweater',
      price: 295,
      originalPrice: null,
      category: 'essential',
      rating: 4.8,
      reviews: 89,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50MikiLz4KPGV2ZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50MiIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmN2Y3ZjciLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZTVlNWU1Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+',
      tag: 'NEW',
      description: 'Luxuriously soft 100% Mongolian cashmere sweater with a relaxed, oversized fit. The subtle ribbed texture and dropped shoulders create an effortlessly chic silhouette that feels like being wrapped in a cloud.',
      details: ['100% Mongolian Cashmere', 'Oversized Fit', 'Ribbed Texture'],
      story: 'Sourced from the remote highlands of Mongolia, this cashmere represents the finest quality fibers, carefully knitted using traditional techniques passed down through generations.'
    },
    {
      id: 3,
      name: 'Ethereal Silk Dress',
      price: 720,
      originalPrice: 890,
      category: 'luxe',
      rating: 4.9,
      reviews: 156,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50MykiLz4KPGV2ZWZzPgo8Y29uaWNhbEdyYWRpZW50IGlkPSJncmFkaWVudDMiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjcwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmZmY0ZTYiLz4KPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNmZGU2OGEiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZjU5ZTBiIi8+CjwvY29uaWNhbEdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg==',
      tag: 'COUTURE',
      description: 'A flowing midi dress in lustrous charmeuse silk that catches light with every movement. The bias-cut construction creates a naturally flattering drape, while delicate French seaming adds couture-level finishing.',
      details: ['Charmeuse Silk', 'Bias-Cut Construction', 'French Seaming'],
      story: 'Designed in our Parisian atelier, this dress embodies the romance of French fashion, with each piece individually cut and sewn to ensure perfect drape and movement.'
    },
    {
      id: 4,
      name: 'Heritage Wool Coat',
      price: 850,
      originalPrice: null,
      category: 'essential',
      rating: 4.7,
      reviews: 203,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50NCkiLz4KPGV2ZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWRpZW50NCIgY3g9IjMwJSIgY3k9IjMwJSIgcj0iODAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzM3NDE0OSIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxZjI5MzciLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K',
      tag: 'TIMELESS',
      description: 'A timeless double-breasted coat in premium Scottish wool with horn buttons and a luxurious cashmere lining. The classic silhouette is updated with contemporary proportions for a modern yet enduring appeal.',
      details: ['Scottish Wool', 'Cashmere Lining', 'Horn Buttons'],
      story: 'Crafted in partnership with century-old Scottish mills, this coat represents the pinnacle of British tailoring tradition, designed to be treasured for decades.'
    },
    {
      id: 5,
      name: 'Artisan Leather Jacket',
      price: 1200,
      originalPrice: 1450,
      category: 'luxe',
      rating: 4.8,
      reviews: 94,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50NSkiLz4KPGV2ZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50NSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM0YzFkOTUiLz4KPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiMyZDE0NDgiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGYwZjIzIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+',
      tag: 'LIMITED',
      description: 'Hand-crafted from butter-soft Italian lambskin with meticulous attention to detail. Each jacket features hand-stitched seams, antique brass hardware, and a custom-designed quilted lining that speaks to true luxury.',
      details: ['Italian Lambskin', 'Hand-Stitched', 'Antique Brass Hardware'],
      story: 'Created by master leather artisans in Florence, each jacket takes over 40 hours to complete, resulting in a piece that improves with age and becomes uniquely yours.'
    },
    {
      id: 6,
      name: 'Silk Camisole Set',
      price: 180,
      originalPrice: 220,
      category: 'essential',
      rating: 4.6,
      reviews: 312,
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50NikiLz4KPGV2ZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWRpZW50NiIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNjAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZkZjJmOCIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmY2U3ZjMiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K',
      tag: 'WARDROBE ESSENTIAL',
      description: 'Two exquisite silk camisoles in complementary tones, featuring adjustable straps and French lace trim. The weightless silk drapes beautifully against the skin, creating elegant layering pieces that transition seamlessly from day to night.',
      details: ['Mulberry Silk', 'French Lace Trim', 'Adjustable Straps'],
      story: 'These camisoles represent the foundation of a refined wardrobe, crafted from the finest mulberry silk and finished with delicate French lace for an touch of femininity.'
    }
  ];

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-light mb-6 bg-gradient-to-r from-white via-purple-300 to-pink-300 bg-clip-text text-transparent tracking-tight">
            TALES HOUSE
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Where fashion stories come to life. Each piece is a testament to timeless sophistication, 
            meticulously created by master artisans who understand that true luxury lies in the details.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12 relative">
          <input
            type="text"
            placeholder="Discover your perfect piece..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 bg-gray-800/80 border border-gray-600 rounded-full backdrop-blur-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 shadow-sm text-white placeholder-gray-400"
          />
          <Search className="absolute right-6 top-4.5 w-5 h-5 text-gray-400" />
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-6 mb-16">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-3 font-medium ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gray-800/70 border border-gray-600 text-gray-300 hover:bg-gray-700/70 hover:shadow-md hover:border-gray-500'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/20"
            >
              {/* Product Tag */}
              {product.tag && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-medium text-white shadow-lg">
                  {product.tag}
                </div>
              )}

              {/* Image Container */}
              <div className="relative h-80 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Hover Actions */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-gray-700 transition-colors duration-200 shadow-sm">
                    <Eye className="w-4 h-4 text-gray-300" />
                  </button>
                  <button className="p-2 bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-gray-700 transition-colors duration-200 shadow-sm">
                    <Heart className="w-4 h-4 text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-medium mb-3 text-white group-hover:text-purple-300 transition-colors duration-300">
                  {product.name}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">{product.description}</p>

                {/* Craft Details */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.details.map((detail, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700/60 rounded-full text-xs text-gray-300 font-light"
                    >
                      {detail}
                    </span>
                  ))}
                </div>

                {/* Story Snippet */}
                <p className="text-xs text-gray-400 italic mb-4 leading-relaxed">{product.story}</p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-5">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-light text-white">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through font-light">${product.originalPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-light text-gray-300 mb-2">No pieces found</h3>
            <p className="text-gray-500">Try adjusting your search or explore our collections</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Shop;