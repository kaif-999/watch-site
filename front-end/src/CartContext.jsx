import React, {createContext, useContext} from "react";


const CartContext = createContext()


import function CartProvider({children}){
const [cart,setCart] = useState(()=>{
const stored = localStorage.getItem("cart");
return stored ? JSON.parse(stored):[]
});
// to persist data to localstorage
useEffect(() => {
    localStorage.setItem("cart",JSON.stringify(cart));
},[cart]);
    return (


        <CartContext.Provider>
        {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);