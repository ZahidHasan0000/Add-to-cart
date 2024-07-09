document.addEventListener('DOMContentLoaded', () => {
  const addToCartBtn = document.getElementById('addToCartBtn');
  // const itemQtyElem = document.getElementById('itemQty');
  const progressElem = document.querySelector('.animation-range');
  const progressMessageElem = document.querySelector('.progress-message .highlight');
  const sidebar = document.getElementById("sidebar");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");
  const progressIcon = document.querySelector('.animation-range-box span i');

  addToCartBtn.addEventListener("click", function () {
    sidebar.classList.add("open");
    itemQty += 1;
    updateCart();
  });

  closeSidebarBtn.addEventListener("click", function () {
    sidebar.classList.remove("open");

    if (itemQty * itemPrice >= freeTshirt) {
      resetCart();
    }
  });

  document.addEventListener('click', function(event) {
    if (!sidebar.contains(event.target) && !addToCartBtn.contains(event.target)) {
      sidebar.classList.remove("open");

      if (itemQty * itemPrice >= freeTshirt) {
        resetCart();
      }
    }
  });

  let itemQty = 0;
  const itemPrice = 20.00;
  const freeShipping = 35.00;
  const tenPercent = 65.00;
  const freeTshirt = 95.00;

  function updateCart() {
    const totalPrice = itemQty * itemPrice;
    // itemQtyElem.textContent = itemQty;
    
    let message = '';
    let progressPercent = 0;
    let progressIconClass = '';

    if (totalPrice < freeShipping) {
      const remaining = freeShipping - totalPrice;
      message = `Add $${remaining.toFixed(2)} to get Free Shipping`;
      progressPercent = (totalPrice / freeShipping) * 35;
      progressIconClass = 'fas fa-shipping-fast';

    } else if (totalPrice < tenPercent) {
      const remaining = tenPercent - totalPrice;
      message = `Add $${remaining.toFixed(2)} to get 10% Off`;
      progressPercent = (totalPrice / tenPercent) * 65;
      progressIconClass = 'fas fa-car';

    } else if (totalPrice < freeTshirt) {
      const remaining = freeTshirt - totalPrice;
      message = `Add $${remaining.toFixed(2)} to get a FREE T-Shirt`;
      progressPercent = (totalPrice / freeTshirt) * 85;
      progressIconClass = 'fas fa-plane';

    } else {
      message = 'Congratulations! You got T-shirt for FREE & Free Shipping!';
      progressPercent = 100;
      progressIconClass = 'fas fa-plane';
    }

    progressMessageElem.textContent = message;
    progressElem.style.width = `${progressPercent}%`;
    progressElem.style.setProperty('--progress-width', `${progressPercent}%`);
    progressIcon.className = progressIconClass;
  }

  function resetCart() {
    itemQty = 0;
    updateCart();
  }
});

