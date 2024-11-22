export const functions = {
  notify: (condition, message, icon) => {
    const notification = document.querySelector(".notification");
    notification.style = "top:10px;";
    if (window.innerWidth < 685) {
      notification.style = "top:80px;";
      console.log("greater");
    }
    if (condition === "error") {
      notification.classList.remove("success");
      notification.classList.add("error");
    } else {
      notification.classList.add("success");
      notification.classList.remove("error");
    }
    notification.innerHTML = `
       <div class="N-message">${message}</div><i class='bx ${icon}'></i>
          `;
    setTimeout(() => {
      notification.style = "top:-50px;";
      if (window.innerWidth < 685) {
        notification.style = "top:-70px;";
      }
    }, 3000);
  },
  hideQuickView: () => {
    let quickView = document.querySelector(".quick-view");
    quickView.classList.remove("view-item-flex");
    quickView.classList.add("hide-item");
  },
  showcartQuantity: (cart) => {
    document.querySelector(".cart-quantity").innerHTML = cart.length;
  },
  displaySearch: () => {
    const closesearchcontainer = document.querySelector(".close-search-now");
    const searchContainer = document.querySelector(".search-now-container");
    const searchButton1 = document.querySelector("#search-input");
    const searchButton2 = document.querySelector("#searchbutton1");
    let buttons = [searchButton1, searchButton2];
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        console.log("cliked", searchContainer);
        searchContainer.classList.add("view-item-flex");
      });
    });
    closesearchcontainer.addEventListener("click", () => {
      searchContainer.classList.remove("view-item-flex");
      searchContainer.classList.add("hide-item");
    });
  },
};
