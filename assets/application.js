if (document.getElementById("sortBy") != null) {
  document.querySelector("#sortBy").addEventListener("change", function (e) {
    var url = new URL(window.location.href);
    url.searchParams.set("sort_by", e.currentTarget.value);

    window.location = url.href;
  });
}

// For Province Loaded

if (document.getElementById("AddressCountryNew") != null) {
  document
    .getElementById("AddressCountryNew")
    .addEventListener("change", function (e) {
      province =
        this.options[this.selectedIndex].getAttribute("data-provinces");
      provinceSelector = document.getElementById("AddressProvinceNew");
      provinceArray = JSON.parse(province);

      // console.log(provinceArray);

      if (provinceArray.length < 1) {
        provinceSelector.setAttribute("disabled", "disabled");
      } else {
        provinceSelector.removeAttribute("disabled");
        provinceSelector.removeAttribute("disabled");
      }

      provinceSelector.innerHTML = "";
      options = "";
      for (let index = 0; index < provinceArray.length; index++) {
        options +=
          '<option value="' +
          provinceArray[index][0] +
          '">' +
          provinceArray[index][0] +
          "</option>";
      }

      provinceSelector.innerHTML = options;
    });
}

// For Reset Password

if (document.getElementById("forgotPassword") != null) {
  document
    .getElementById("forgotPassword")
    .addEventListener("click", function (e) {
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
  productModal = new bootstrap.Modal(
    document.getElementById("productInfoModal"),
    {}
  );
}


var productInfoAnchors = document.querySelectorAll("#productInfoAnchor");

var productModal;

if( document.getElementById('productInfoModal') != null ) {
    productModal = new bootstrap.Modal(document.getElementById('productInfoModal'), {});
}

if(productInfoAnchors.length > 0) {
    productInfoAnchors.forEach(item => {
        item.addEventListener("click", event => {
            
            var url = '/products/' + item.getAttribute('product-handle') + '.js';

            fetch(url)
            .then((resp) => resp.json())
            .then(function(data) {
                console.log(data);

                document.getElementById("productInfoImg").src = data.images[0];
                document.getElementById("productInfoTitle").innerHTML = data.title;
                document.getElementById("productInfoPrice").innerHTML = item.getAttribute('product-price');
                var length = 700;
                var myString = data.description;
                var myTruncatedString = myString.substring(0,length) + "...";
                document.getElementById("productInfoDescription").innerHTML = myTruncatedString;//data.description;

                var variants = data.variants;
                var variantSelect = document.getElementById("modalItemID");

                variantSelect.innerHTML = '';

                variants.forEach(function( variant, index) {
                    console.log(variant);

                    variantSelect.options[variantSelect.options.length] = new Option(variant.option1, variant.id);
                });

                productModal.show();
            });

            
        });
    });
}