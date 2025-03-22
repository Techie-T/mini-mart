document.addEventListener("DOMContentLoaded", function () {
  // Retrieve cart from local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItemsList = document.getElementById("cart-items");
  let totalPriceEl = document.getElementById("total-price");
  let totalAmount = 0;

  cart.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartItemsList.appendChild(li);
    totalAmount += item.price;
  });

  totalPriceEl.textContent = totalAmount;

  // Payment method change event
  let paymentMethod = document.getElementById("payment-method");
  let bankDetails = document.getElementById("bank-details");
  paymentMethod.addEventListener("change", function () {
    if (this.value === "bank") {
      bankDetails.classList.remove("hidden");
    } else {
      bankDetails.classList.add("hidden");
    }
  });

  // Payment button click event
  document.getElementById("payNow").addEventListener("click", function () {
    let name = document.getElementById("fullName").value;
    let phone = document.getElementById("phoneNumber").value;
    let address = document.getElementById("address").value;
    let method = document.getElementById("payment-method").value;

    if (!name || !phone || !address) {
      alert("Please fill all shipping details.");
      return;
    } else {
      alert("thanks for shopping");
    }

    if (method === "card") {
      payWithPaystack(name, phone, address, totalAmount);
    } else if (method === "bank") {
      alert("Please make a bank transfer and send proof to our support.");
    } else if (method === "cod") {
      alert("Your order has been placed. Pay on delivery!");
    }
  });

  // Paystack Payment Function
  function payWithPaystack(name, phone, address, amount) {
    let handler = PaystackPop.setup({
      key: "your-paystack-public-key",
      email: "customer@example.com",
      amount: amount * 100,
      currency: "NGN",
      ref: "MTM-" + Math.floor(Math.random() * 1000000),
      callback: function (response) {
        alert("Payment successful! Transaction ID: " + response.reference);
      },
      onClose: function () {
        alert("Transaction cancelled");
      },
    });

    handler.openIframe();
  }
});
