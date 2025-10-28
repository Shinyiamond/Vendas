const products = [
  { id: 1, name: "Smartphone", price: 1200, img: "lg-k50s-smartphones-1200-reais.jpg" },
  { id: 2, name: "Notebook", price: 3500, img: "Notebook.jpg" },
  { id: 3, name: "Fone de Ouvido", price: 150, img: "fone.jpg" },
  { id: 4, name: "TV 50''", price: 2500, img: "https://via.placeholder.com/100?text=TV" },
  { id: 5, name: "Cafeteira", price: 200, img: "https://via.placeholder.com/100?text=Cafeteira" },
  { id: 6, name: "Tablet", price: 950, img: "https://via.placeholder.com/100?text=Tablet" },
  { id: 7, name: "Impressora", price: 600, img: "https://via.placeholder.com/100?text=Impressora" },
  { id: 8, name: "Mouse Gamer", price: 120, img: "https://via.placeholder.com/100?text=Mouse+Gamer" },
  { id: 9, name: "Teclado Mecânico", price: 280, img: "https://via.placeholder.com/100?text=Teclado" },
  { id: 10, name: "Monitor 24''", price: 1125, img: "https://via.placeholder.com/100?text=Monitor" }
];

let cart = [];

function renderProducts(filter = "") {
  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = "";
  products
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(product => {
      const div = document.createElement('div');
      div.className = "product";
      div.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>R$ ${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Adicionar ao carrinho</button>
      `;
      productsDiv.appendChild(div);
    });
}

function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  updateCartCount();
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

function showCart() {
  document.getElementById('cart-modal').style.display = 'flex';
  renderCart();
}

function closeCart() {
  document.getElementById('cart-modal').style.display = 'none';
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.qty} - R$ ${(item.price * item.qty).toFixed(2)}`;
    cartItems.appendChild(li);
  });
  document.getElementById('cart-total').textContent = total.toFixed(2);
}

function checkout() {
  alert("Compra finalizada! Obrigado por comprar conosco.");
  cart = [];
  updateCartCount();
  closeCart();
}

document.getElementById('search').addEventListener('input', function() {
  renderProducts(this.value);
});

renderProducts();
