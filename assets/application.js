if (document.getElementById("sortBy") != null) {
  document.querySelector("#sortBy").addEventListener("change", function (e) {
    var url = new URL(window.location.href);
    url.searchParams.set("sort_by", e.currentTarget.value);

    window.location = url.href;
  });
}

// For Province Loaded

if (document.getElementById("AddressCountryNew") != null) {
  document.getElementById("AddressCountryNew").addEventListener("change", function (e) {
    province = this.options[this.selectedIndex].getAttribute("data-provinces");
    provinceSelector = document.getElementById("AddressProvinceNew");
    provinceArray = JSON.parse(province);

    // console.log(provinceArray)

    if (provinceArray.length < 1) {
      provinceSelector.setAttribute("disabled", "disabled");
    } else {
      provinceSelector.removeAttribute("disabled");
      provinceSelector.removeAttribute("disabled");
    }

    provinceSelector.innerHTML = "";
    options = "";
    for (let index = 0; index < provinceArray.length; index++) {
      options += '<option value="' + provinceArray[index][0] + '">' + provinceArray[index][0] + "</option>";
    }

    provinceSelector.innerHTML = options;
  });
}

// For Reset Password

if (document.getElementById("forgotPassword") != null) {
  document.getElementById("forgotPassword").addEventListener("click", function (e) {
    // console.log('I am clicked')

    const element = document.querySelector("#forgotPasswordForm");

    if (element.classList.contains("d-none")) {
      element.classList.remove("d-none");
      element.classList.add("d-block");
    }
  });
}

// For Translation

var localeItems = document.querySelectorAll("#localeItem");

if (localeItems.length > 0) {
  localeItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      document.getElementById("localeCode").value = item.getAttribute("lang");
      document.getElementById("localization_form_tag").submit();
    });
  });
}

// For Product API Modal

var productInfoAnchors = document.querySelectorAll("#productInfoAnchor");

var productModal;

if (document.getElementById("productInfoModal") != null) {
  productModal = new bootstrap.Modal(document.getElementById("productInfoModal"), {});
}

var productInfoAnchors = document.querySelectorAll("#productInfoAnchor");

var productModal;

if (document.getElementById("productInfoModal") != null) {
  productModal = new bootstrap.Modal(document.getElementById("productInfoModal"), {});
}

if (productInfoAnchors.length > 0) {
  productInfoAnchors.forEach((item) => {
    item.addEventListener("click", (event) => {
      var url = "/products/" + item.getAttribute("product-handle") + ".js";

      fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
          console.log(data);

          document.getElementById("productInfoImg").src = data.images[0];
          document.getElementById("productInfoTitle").innerHTML = data.title;
          document.getElementById("productInfoPrice").innerHTML = item.getAttribute("product-price");

          var length = 700;
          var myString = data.description;
          var myTruncatedString = myString.substring(0, length) + "...";
          document.getElementById("productInfoDescription").innerHTML = myTruncatedString; // data.description

          var variants = data.variants;
          var variantSelect = document.getElementById("modalItemID");

          variantSelect.innerHTML = "";

          variants.forEach(function (variant, index) {
            console.log(variant);

            variantSelect.options[variantSelect.options.length] = new Option(variant.option1, variant.id);
          });

          productModal.show();
        });
    });
  });
}

modalAddToCartForm = document.querySelector("#addToCartForm");

if (modalAddToCartForm != null) {
  modalAddToCartForm.addEventListener("submit", function (e) {
    let formData = {
      items: [
        {
          id: document.getElementById("modalItemID").value,
          quantity: document.getElementById("modalItemQuantity").value,
        },
      ],
    };
    fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        update_cart();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  update_cart();
});

function update_cart() {
  fetch("/cart.js")
    .then((resp) => resp.json())
    .then((data) => (document.getElementById("numberOfCartItems").innerHTML = data.items.length))
    .catch((err) => console.error(err));
}

// Predictive Search

predictiveSearchInput = document.getElementById("searchInputField");

var timer;

offCanvasSearch = document.getElementById("offcanvasSearchResult");
bsOffCanvas = new bootstrap.Offcanvas(offCanvasSearch);

if (predictiveSearchInput != null) {
  predictiveSearchInput.addEventListener("input", function (e) {
    console.log(predictiveSearchInput.value);

    clearTimeout(timer);

    if (predictiveSearchInput.value) {
      timer = setTimeout(fetchPredictiveSearch, 3000);
    }
  });
}


function fetchPredictiveSearch() {
  fetch(window.Shopify.routes.root + `search/suggest.json?q=${predictiveSearchInput.value}&resources[type]=product`)
    .then((response) => response.json())
    .then((suggestions) => {
      console.log(suggestions);
      products = suggestions.resources.results.products;

      document.getElementById("search-result-body").innerHTML = "";

      productInformation = ''

      products.forEach(function (product, index) {
        productInformation += `
        <div class="card">
            <img src="${product.image}" class="card-img-top card-image" alt="">
            <div class="card-body">
                <h5 class="card-title"> <a href="${product.url}" >${product.title}</a></h5>
                <p>$ ${ product.price }</p>
            </div>
        </div>
        
        `;

        // document.getElementById('search-result-body').innerHTML += productInformation
      });

      if(productInformation != '')
      {
        document.getElementById('search-result-body').innerHTML = productInformation
      }else{
        document.getElementById('search-result-body').innerHTML = `
            <h5 class="card-title"> Product Not Found</h5>
        `
      }

      bsOffCanvas.show();
    });
}
