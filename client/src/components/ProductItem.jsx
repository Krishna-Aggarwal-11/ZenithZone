import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <div>
      <div className="max-w-sm w-48 h-96  rounded overflow-hidden shadow-lg m-4 hover:shadow-2xl cursor-pointer">
        <img
          className="w-full h-48"
          src={product.images[0]}
          alt={product.name}
        />
        <div className="px-3 py-3">
          <Link to={`/product/${product._id}`}>
            <p className="text-gray-500 text-sm truncate">{product.brand}</p>
            <div className="font-bold text-lg mb-1">{product.name}</div>
            <div className=" text  mb-1">
              {product.description.substr(0, 25)}...
            </div>
          </Link>
        </div>
        <div className="px-3 pt-1 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
            Rs {product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
