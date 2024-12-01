import { functions } from "./functions.js";
import { products } from "./products.js";
import { cart } from "./products.js";
const { notify, hideQuickView, showcartQuantity, displaySearch } = functions;

const landingShop = document.querySelector(".landing-shop");
const quickView = document.querySelector(".quick-view");
let viewButtons;
showcartQuantity(cart);
displaySearch();
products.forEach((product) => {
  landingShop.innerHTML += `
     <div class="product">
            <div class="product-overlay" data-product-id="${product.id}">
                <p>View </p> <i class='bx bxs-show'></i>
            </div>

            <div class="product-image">
                <img src="${product.productImage}">
            </div>
            <div class="product-details">
                <div>
                    <p class="product-name">
                       ${product.productName}
                    </p>
                  
                </div>
                <div class="product-price">
                    <span>NGN</span><span id="price"> ${product.price}</span>
                </div>
            </div>
        </div>
    `;
  const viewButton = document.querySelectorAll(".product-overlay");
  viewButtons = viewButton;
});

viewButtons.forEach((button) => {
  const container = document.querySelector(".quick-view-container");
  button.addEventListener("click", () => {
    console.log("clicked");
    const quickView = document.querySelector(".quick-view");
    quickView.classList.remove("hide-item");
    quickView.classList.add("view-item-flex");
    const data = button.dataset.productId;
    products.forEach((product) => {
      if (product.id == data) {
        container.innerHTML = `
      <div class="quick-view-first-section">
          <span class="hide-quick-view bx bx-x"></span>
                <div class="images">
                    <img src="${product.productImage}">
                </div>
               
            </div>
            <div class="quick-view-second-section">
             <div class="product-name">
                ${product.productName}
                </div>
                <select class="size">
                    <option value="default">--select-size--</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
  
                <div class="quick-view-buttons">
                  <select id="quantity">
                   <option value = 1>
                  1
                  </option>
                  <option value = 2>
                  2
                  </option>
                 <option value = 3>
                  3
                 </option>
                   <option value = 4>
                  4
                  </option>
                   <option value = 5>
                  5
                  </option>
             
                  </select>
                </div>
                <div class="quick-view-price">
               <span class= "currency"> NGN </span> ${product.price}
                </div>
  
                <button class="add-button" data-product-id = "${product.id}">
                    Add to cart
                </button>
            </div>
        `;
        document
          .querySelector(".hide-quick-view")
          .addEventListener("click", () => {
            hideQuickView();
          });
      }
    });
    const addbuttons = document.querySelectorAll(".add-button");
    addbuttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.productId;
        let existingItem;
        let itemsize = document.querySelector(".size");
        let buyingquantity = document.querySelector("#quantity");
        buyingquantity = Number(buyingquantity.value);
        cart.map((el) => {
          if (el.id === id) {
            existingItem = el;
          }
        });

        if (existingItem) {
          existingItem.quantity += buyingquantity;
          existingItem.size.push(itemsize.value);
          notify("success", "cart updated", "bx bx-check-circle ");
          console.log(cart);
          showcartQuantity(cart);
          rendercartitems();
          return;
        }
        if (itemsize.value === "default") {
          notify("error", "Please select a size");
          return;
        }

        cart.push({ id, quantity: buyingquantity, size: [itemsize.value] });
        notify("success", "Added to cart", "bx bx-check-circle ");
        console.log(cart);
        showcartQuantity(cart);
        rendercartitems();
      });
    });
  });
});
const cartCont = document.querySelector(".cart-container");
const cartItem_cont = document.querySelector(".cart-item-container");
document.querySelector(".cart-button").addEventListener("click", () => {
  console.log("clicked");
  cartCont.classList.remove("hide-item");
  cartCont.classList.add("view-item");
  setTimeout(() => {
    cartItem_cont.style = "right:0;";
  }, 100);
});
document.getElementById("close-cart").addEventListener("click", () => {
  console.log("clicked");
  cartItem_cont.style = "right:-600px;";

  setTimeout(() => {
    cartCont.classList.remove("view-item");
    cartCont.classList.add("hide-item");
  }, 300);
});
function rendercartitems() {
  const itemcontainer = document.querySelector(".items-container");
  itemcontainer.innerHTML = " ";

  cart.forEach((item) => {
    let sizes = " ";

    item.size.forEach((size) => {
      sizes += `- ${size} `;
    });
    console.log(sizes);
    products.forEach((p) => {
      if (item.id == p.id) {
        itemcontainer.innerHTML += `<div class="cart-item">
                    <div class="cart-item-image"><img src=${p.productImage} alt=""></div>
                    <div class="cart-item-details">
                        <p class="cart-item-name">${p.productName}</p>
                        <p class="cart-item-price"><span class="currency">NGN</span> ${p.price}</p>
                        <div class="quantityandsize">
                         <p>Q - ${item.quantity}</p> <p>Size(s) ${sizes}</p>
                        
                        </div>
                    
                       
                    </div>
                    <div class="remove-cart-item-btn" data-cart-id="${item.id}">remove</div>
                </div>`;
      }
    });
  });
}

const mobilenav = document.querySelector(".ul-container");

const opennav = document.querySelector("#open-mobile-nav");
const closenav = document.querySelector(".close-mobile-nav");
opennav.addEventListener("click", () => {
  mobilenav.style = "right:0";
});
closenav.addEventListener("click", () => {
  mobilenav.style = "right:-500px";
});
