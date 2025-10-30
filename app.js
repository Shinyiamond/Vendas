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

// 🔊 Sons
const addSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_6c2bcd9e67.mp3?filename=interface-click-124467.mp3");
const checkoutSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_5026a3ec0f.mp3?filename=cash-register-purchase-87313.mp3");
const openCartSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_37bcd05e7f.mp3?filename=whoosh-6316.mp3");

// Renderizar produtos
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

// Adicionar produto ao carrinho (com som e animações)
function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  updateCartCount();

  // 🔊 Som de clique
  addSound.currentTime = 0;
  addSound.play().catch(() => {});

  // 🎯 Animação no botão
  const button = document.querySelector(`button[onclick="addToCart(${id})"]`);
  if (button) {
    button.classList.add('added');
    setTimeout(() => button.classList.remove('added'), 600);
  }

  // 🎯 Animação no ícone do carrinho
  const cartButton = document.querySelector('header button');
  cartButton.classList.add('shake');
  setTimeout(() => cartButton.classList.remove('shake'), 600);
}

// Atualizar contador
function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.reduce((sum, i) => sum + i.qty, 0);
}

// Mostrar o modal do carrinho (com som e animação)
function showCart() {
  const modal = document.getElementById('cart-modal');
  modal.style.display = 'flex';

  // 🔊 Som de abertura
  openCartSound.currentTime = 0;
  openCartSound.play().catch(() => {});

  // ✨ Animação de entrada
  const modalContent = document.querySelector('.modal-content');
  modalContent.classList.add('slideIn');
  setTimeout(() => modalContent.classList.remove('slideIn'), 500);

  renderCart();
}

// Fechar o modal
function closeCart() {
  document.getElementById('cart-modal').style.display = 'none';
}

// Renderizar itens do carrinho
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

// Finalizar compra
function checkout() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  // 🔊 Som de caixa registradora
  checkoutSound.currentTime = 0;
  checkoutSound.play().catch(() => {});

  setTimeout(() => {
    alert("🎉 Compra finalizada! Obrigado por comprar conosco.");
    cart = [];
    updateCartCount();
    closeCart();
  }, 400);
}

// Filtro de busca
document.getElementById('search').addEventListener('input', function() {
  renderProducts(this.value);
});

renderProducts();
