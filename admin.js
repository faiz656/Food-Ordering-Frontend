function checkLogin() {
    let user = document.getElementById("adminUser").value;
    let pass = document.getElementById("adminPass").value;

    if (user === "admin" && pass === "1234") {
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("ordersSection").style.display = "block";
        loadOrders();
    } else {
        document.getElementById("loginError").style.display = "block";
    }
}

function logout() {
    document.getElementById("loginSection").style.display = "block";
    document.getElementById("ordersSection").style.display = "none";
    document.getElementById("adminUser").value = "";
    document.getElementById("adminPass").value = "";
}

function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let div = document.getElementById("orders");
    div.innerHTML = "";

    if (orders.length === 0) {
        div.innerHTML = '<p class="empty-msg">No orders yet.</p>';
        return;
    }

    orders.forEach((o, i) => {
        let badgeClass = o.status === "Ready" ? "status-badge ready" : "status-badge";
        div.innerHTML += `
            <div class="order-card">
                <div class="order-info">
                    <strong>${o.name}</strong> — Table ${o.table}
                    <span class="${badgeClass}">${o.status}</span>
                    <br>
                    <small style="color:#9e948a;">${o.phone}</small>
                </div>
                <button onclick="markReady(${i})">✅ Mark Ready</button>
            </div>
        `;
    });
}

function markReady(i) {
    let orders = JSON.parse(localStorage.getItem("orders"));
    orders[i].status = "Ready";
    localStorage.setItem("orders", JSON.stringify(orders));
    loadOrders();
}