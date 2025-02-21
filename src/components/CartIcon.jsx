import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; 

const CartIcon = ({ cartItemCount }) => {
  return (
    <Link
      to="/cart"
      className="flex items-center gap-1 text-gray-300 hover:text-[#0e9387] transition-colors"
    >
      <ShoppingCart size={20} />
      <span>({cartItemCount})</span>
    </Link>
  );
};

export default CartIcon;
