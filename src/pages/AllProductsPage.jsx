
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const AllProductsPage = () => {
  return (
    <div>
     
      <div className="product-page-container">
        <h1>All Products</h1>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

    
    </div>
  );
};

export default AllProductsPage;
