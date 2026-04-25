let cart = JSON.parse(localStorage.getItem("cart")) || [];

function loadCart() {
    let div = document.getElementById("cartItems");
    let total = 0;
    div.innerHTML = "";

    if (cart.length === 0) {
        div.innerHTML = '<p class="empty-msg">Your cart is empty. <a href="index.html">Go to menu</a></p>';
    }

    cart.forEach(item => {
        total += item.price * item.quantity;
        div.innerHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <strong>${item.name}</strong> x${item.quantity}
                    <span class="cart-item-price"> — Rs. ${item.price * item.quantity}</span>
                </div>
                <button onclick="removeItem('${item.name}')">Remove</button>
            </div>
        `;
    });

    document.getElementById("total").innerText = total;
}

function removeItem(name) {
    cart = cart.filter(i => i.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function placeOrder() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let table = document.getElementById("table").value;

    if (!name) { alert("Please enter your name"); return; }
    if (!/^03\d{9}$/.test(phone)) { alert("Invalid phone. Use: 03XXXXXXXXX"); return; }
    if (!table) { alert("Please enter table number"); return; }
    if (cart.length === 0) { alert("Your cart is empty!"); return; }

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({ name, phone, table, cart, status: "Pending" });
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    alert("Order placed! Thank you.");
    window.location.href = "index.html";
}