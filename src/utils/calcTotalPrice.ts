import { TCartItem } from "../redux/slices/cartSlices";

export const calcTotalPrice = (items: TCartItem[]) => {
   return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
}