import { createContext, ReactNode, useContext, useState } from "react"
import ShoppingCart from "../components/ShoppingCart"
import useLocalStorage from "../hooks/useLocalStorage"

type ShoppingCartProviderProps = {
    children: ReactNode
}

type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export const useShoppingCart = () => useContext(ShoppingCartContext)

export const ShoppingCartProvider = ({
    children,
}: ShoppingCartProviderProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
    )

    const cartQuantity = cartItems.reduce(
        (quantity, item) => quantity + item.quantity,
        0
    )

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const getItemQuantity = (id: number) =>
        cartItems.find((item) => item.id === id)?.quantity || 0

    const increaseCartQuantity = (id: number) => {
        setCartItems((currItems) => {
            const currItem = currItems.find((item) => item.id === id)
            const newState = currItems.filter((item) => item.id !== id)
            const quantity = currItem == null ? 1 : currItem.quantity + 1
            newState.push({ id, quantity })
            return newState
        })
    }

    const decreaseCartQuantity = (id: number) => {
        setCartItems((currItems) => {
            const currQty = currItems.find((item) => item.id === id)
                ?.quantity as number
            const newState = currItems.filter((item) => item.id !== id)
            if (currQty > 1) {
                newState.push({ id, quantity: currQty - 1 })
            }
            return newState
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems((currItems) => currItems.filter((item) => item.id !== id))
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity,
            }}
        >
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider>
    )
}
