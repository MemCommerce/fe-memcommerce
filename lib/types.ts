export interface Product {
    id: string
    name: string
    description: string
    price: number
    image: string
    category: string
    sizes: string[]
    colors: string[]
  }
  
  export interface CartItem extends Product {
    selectedSize: string
    selectedColor: string
    quantity: number
  }
  