class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("cart")) || []
  }

  addItem(item) {
    const existingItem = this.items.find((i) => i.id === item.id)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.items.push({ ...item, quantity: 1 })
    }
    this.saveCart()
  }

  removeItem(id) {
    this.items = this.items.filter((item) => item.id !== id)
    this.saveCart()
  }

  clearCart() {
    this.items = []
    this.saveCart()
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.items))
  }
}

const cart = new Cart()

