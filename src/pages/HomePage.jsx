

import ProductCard from "../components/RecordCard";


const HomePage = () => {
  return (
    <div>
    

      <div className="big-cover">
        <h1>Big Cover</h1>
      </div>
    
      <div className="product-cards-container">
      
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

    </div>
  );
};

export default HomePage;
