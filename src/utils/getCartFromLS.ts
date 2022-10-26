import { TCartItem } from "../redux/slices/cartSlices";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);

    return {
        totalPrice,
        items: items as TCartItem[],
    }
}