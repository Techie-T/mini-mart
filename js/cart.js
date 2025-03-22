// cart.js
const products = [
  {
    name: "Tripod Camera",
    url: "images/camera 1.avif",
    category: "camera",
    price: "$410",
  },
  {
    name: "Sony A7 Camera",
    url: "images/camera 2.avif",
    category: "camera",
    price: "$399",
  },
  {
    name: "Canon Camera",
    url: "images/camera 3.avif",
    category: "camera",
    price: "$399",
  },
  {
    name: "Charger",
    url: "images/charger.jpg",
    category: "appliance",
    price: "$50",
  },
  {
    name: "Oriamo Earpod",
    url: "images/earpod1.avif",
    category: "appliance",
    price: "$70",
  },
  {
    name: "Itel Earpod",
    url: "images/earpod2.avif",
    category: "appliance",
    price: "$50",
  },
  {
    name: "White Headphone",
    url: "images/headphone2.avif",
    category: "appliance",
    price: "$70",
  },
  {
    name: "Black Headphone",
    url: "images/headphone3.avif",
    category: "appliance",
    price: "$70",
  },
  {
    name: "Shiny Headphone",
    url: "images/headphone5.jpg",
    category: "appliance",
    price: "$75",
  },
  {
    name: "Gaming Headset",
    url: "images/headphone6.avif",
    category: "appliance",
    price: "$100",
  },
  {
    name: "Laptop",
    url: "images/laptop-image.avif",
    category: "phone",
    price: "$500",
  },
  {
    name: "Iphone 11promax",
    url: "images/phone 3.avif",
    category: "phone",
    price: "$900",
  },
  {
    name: "Iphone 12 and xmas",
    url: "images/phone 4.avif",
    category: "phone",
    price: "$1500",
  },
  {
    name: "Long Phoneholder",
    url: "images/phone holder2.jpg",
    category: "appliance",
    price: "$50",
  },
  {
    name: "Iphone12 case",
    url: "images/phone-case.jpg",
    category: "appliance",
    price: "$40",
  },
  {
    name: "Round Phoneholder",
    url: "images/phone-holder.jpg",
    category: "appliance",
    price: "$50",
  },
  {
    name: "Iphone 13",
    url: "images/phone-image.avif",
    category: "phone",
    price: "$1000",
  },
  {
    name: "Infinix smart5",
    url: "images/phone2.avif",
    category: "phone",
    price: "$500",
  },
  {
    name: "PlayStation 4",
    url: "images/playstation 3.avif",
    category: "games",
    price: "$150",
  },
  {
    name: "PlayStation 4pro",
    url: "images/playstation 4.avif",
    category: "games",
    price: "$139",
  },
  {
    name: "PlayStation 5",
    url: "images/playstation 5.jpg",
    category: "games",
    price: "$150",
  },
  {
    name: "PlayStation 2",
    url: "images/playstation.avif",
    category: "games",
    price: "$119",
  },
  {
    name: "PlayStation 5pro",
    url: "images/playstation2.jpg",
    category: "games",
    price: "$150",
  },
  {
    name: "PowerBank",
    url: "images/power-bank.avif",
    category: "appliance",
    price: "$210",
  },
  {
    name: "HD Televsion",
    url: "images/tv 1.avif",
    category: "television",
    price: "$1200",
  },
  {
    name: "Dell Televsion",
    url: "images/tv 2.avif",
    category: "television",
    price: "$1300",
  },
  {
    name: "HD Televsion",
    url: "images/tv 3.avif",
    category: "television",
    price: "$1500",
  },
  {
    name: "Virtual Reality 3",
    url: "images/vr-image.avif",
    category: "vreality",
    price: "$400",
  },
  {
    name: "Virtual Reality 1",
    url: "images/vr2.avif",
    category: "vreality",
    price: "$300",
  },
  {
    name: "Virtual Reality 2",
    url: "images/vr3.avif",
    category: "games",
    price: "$320",
  },
];

// Function to load cart items from local storage
function loadCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const emptyMessage = document.getElementById("empty-message");

  cartItemsContainer.innerHTML = "";

  if (cartItems.length === 0) {
    emptyMessage.classList.remove("hidden");
    document.getElementById("total-price").textContent = "$0.00";
  } else {
    emptyMessage.classList.add("hidden");

    cartItems.forEach((item) => {
      const product = products.find((p) => p.name === item);
      if (product) {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item flex items-center space-x-4";
        itemElement.innerHTML = `
                    <img src="${product.url}" alt="${product.name}" class="w-20 h-20 object-cover" />
                    <div>
                        <h3 class="text-lg">${product.name}</h3>
                        <p class="text-sm">${product.price}</p>
                    </div>
                    <button class="remove-btn bg-red-600 text-white px-2 py-1 rounded">Remove</button>
                `;
        cartItemsContainer.appendChild(itemElement);

        // Add event listener to remove button
        itemElement
          .querySelector(".remove-btn")
          .addEventListener("click", () => {
            removeFromCart(product.name);
            itemElement.remove();
            updateTotal();
          });
      }
    });

    updateTotal();
  }
}

// Function to remove item from cart in local storage
function removeFromCart(productName) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems = cartItems.filter((item) => item !== productName);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Update total price
function updateTotal() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let totalAmount = 0;

  cartItems.forEach((item) => {
    const product = products.find((p) => p.name === item);
    if (product) {
      totalAmount += parseFloat(product.price.replace("$", ""));
    }
  });

  document.getElementById("total-price").textContent = `$${totalAmount.toFixed(
    2
  )}`;
}

document.getElementById("checkout").addEventListener("click", () => {
  window.location.href = "checkout.html";
});

loadCartItems();
