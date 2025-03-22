//JAVASCRIPT
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
    category: "vreality",
    price: "$320",
  },
];

//SELECT DOM
const productsWrapper = document.getElementById("products-wrapper");
const checkboxes = document.querySelectorAll(".check");
const filtersContainer = document.getElementById("filters-container");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cart-count");

//Eventlistener for filtering
filtersContainer.addEventListener("change", filterProducts);
searchInput.addEventListener("input", filterProducts);

//Init Cart item count
let cartItemCount = 0;

//init product array
const productElements = [];

//loop over products
products.forEach((product) => {
  const productElement = createProductElement(product);

  productElements.push(productElement);
  productsWrapper.appendChild(productElement);
});

//Create prod element
function createProductElement(product) {
  const productElement = document.createElement("div");

  productElement.className = "item space-y-2";

  productElement.innerHTML = `<div
              class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl"
            >
              <img
                src="${product.url}"
                alt="${product.name}"
                class="w-50 h-50 object-cover"
              />
              <button
                class="status bg-gray-800 text-white absolute bottom-0 right-0 left-0 text-center py-2 translate-y-0 sm:translate-y-full transition  sm:group-hover:translate-y-0"
              >
                Add To Cart
              </button>
            </div>
  
            <p class="text-xl">${product.name}</p>
            <strong>${product.price.toLocaleString()}</strong>`;

  productElement.querySelector(".status").addEventListener("click", updateCart);
  return productElement;
}

//Update Cart
function updateCart(e) {
  const statusEl = e.target;
  const productElement = statusEl.closest(".item");
  const productName = productElement.querySelector("p").textContent;

  if (statusEl.classList.contains("added")) {
    statusEl.classList.remove("added");
    statusEl.innerText = "Add To Cart";
    statusEl.classList.remove("bg-red-600");
    statusEl.classList.add("bg-gray-800");
    alert("Removed from cart! ");
    cartItemCount--;
    removeFromCart(productName);
  } else {
    statusEl.classList.add("added");
    statusEl.innerText = "Remove From Cart";
    statusEl.classList.remove("bg-gray-800");
    statusEl.classList.add("bg-red-600");
    alert("Added to cart! Check on cart.");
    cartItemCount++;
    addToCart(productName);
  }

  // Update count
  cartCount.innerText = cartItemCount.toString();
}

function addToCart(productName) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push(productName);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function removeFromCart(productName) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems = cartItems.filter((item) => item !== productName);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

document.querySelector(".cart-icon").addEventListener("click", () => {
  window.location.href = "cart.html";
});

//Filter
function filterProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const checkedCategories = Array.from(checkboxes)
    .filter((check) => check.checked)
    .map((check) => check.id);

  //check for match
  productElements.forEach((productElement, index) => {
    const product = products[index];
    const matchSearch = product.name.toLowerCase().includes(searchTerm);
    const isChecked =
      checkedCategories.length === 0 ||
      checkedCategories.includes(product.category);

    if (matchSearch && isChecked) {
      productElement.classList.remove("hidden");
    } else {
      productElement.classList.add("hidden");
    }
  });
}

/*=====SHOW MENU=====*/
const menuBar = document.getElementById("nav-menu"),
  toggleBar = document.getElementById("nav-toogle"),
  closeBar = document.getElementById("nav-close");

if (toggleBar) {
  toggleBar.addEventListener("click", () => {
    menuBar.classList.add("show-menu");
  });
}

if (closeBar) {
  closeBar.addEventListener("click", () => {
    menuBar.classList.remove("show-menu");
  });
}

/*=====REMOVE MENU MOBILE=====*/
const navLink = document.querySelectorAll(".nav-link");
const linkAction = () => {
  const menuBar = document.getElementById("nav-menu");
  menuBar.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

//TOGGLE
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const darkIcon = document.getElementById("dark-icon");
const lightIcon = document.getElementById("light-icon");

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "dark";
body.classList.add(currentTheme);
darkIcon.style.display = currentTheme === "dark" ? "inline" : "none";
lightIcon.style.display = currentTheme === "light" ? "inline" : "none";

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");

  darkIcon.style.display = body.classList.contains("dark") ? "inline" : "none";
  lightIcon.style.display = body.classList.contains("light")
    ? "inline"
    : "none";

  if (body.classList.contains("dark")) {
    body.classList.remove("bg-white", "text-black");
    body.classList.add("bg-gray-800", "text-white");
  } else {
    body.classList.remove("bg-gray-800", "text-white");
    body.classList.add("bg-white", "text-black");
  }

  const theme = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
});
