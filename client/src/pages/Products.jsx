import React from 'react'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Spinner } from 'flowbite-react';
import ProductItem from '../components/ProductItem.jsx';

const Products = () => {

  const [products , setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async() => {
    setLoading(true);
    const res = await fetch('/api/products/get' , {
      method : 'GET',
    });

    const data = await res.json();

    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProducts();
  } , [])



  return (
    <div className="flex  ">
    <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
      <h1 className="text-3xl font-semibold border-b p-3 text-slate-700">Filters:</h1>
      <form  className="flex flex-col gap-8">
        <div className="flex  flex-col  gap-2">
          <label className="font-semibold">Categories : </label>
          
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="sale"
              placeholder="Search ..."
              className="w-5"
             
            />
            <span> Sale</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="offer"
              placeholder="Search ..."
              className="w-5"
             
            />
            <span>Offer</span>
          </div>
        </div>
        <div className="flex gap-2 flex-col ">
          <label className="font-semibold">Gender:</label>
          
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="Men"
              className="w-5"
              
            />
            <span>Men</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="Women"
              className="w-5"
              
            />
            <span>Women</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="Unisex"
              className="w-5"
            />
            <span>Unisex</span>
          </div>
        </div>
        <div className="flex gap-2 flex-col ">
          <label className="font-semibold">Size:</label>
          
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="S"
              className="w-5"
              
            />
            <span>S</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="M"
              className="w-5"
              
            />
            <span>M</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="L"
              className="w-5"
            />
            <span>L</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="XL"
              className="w-5"
            />
            <span>XL</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Sort:</label>
          <select
            defaultValue={"created_at_desc"}
            id="sort_order"
            className="border rounded-lg p-3"
          >
            <option value="regularPrice_desc">high</option>
            <option value="regularPrice_asc">low</option>
            <option value="createdAt_desc">Latest</option>
            <option value="createdAt_asc">Oldest</option>
          </select>
        </div>
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          Filter
        </button>
      </form>
    </div>
    <div className="flex-1">
      <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
        Products:
      </h1>
      <div className="p-7 flex flex-wrap gap-4">
        {!loading && products.length === 0 && (
          <p className="text-xl text-slate-700">No Products found!</p>
        )}
        {loading && (
          <p className="text-xl text-slate-700 text-center w-full">
            Loading...
          </p>
        )}
        {!loading &&
          products &&
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        
      </div>
    </div>
  </div>
  )
}

export default Products