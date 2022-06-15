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

    // console.log(provinceArray);

    if (provinceArray.length < 1) {
      provinceSelector.setAttribute('disabled', 'disabled')
    } else {
      provinceSelector.removeAttribute('disabled')
      provinceSelector.removeAttribute('disabled');
    }

    provinceSelector.innerHTML = ''
    options = ''
    for (let index = 0; index < provinceArray.length; index++) {

      options += '<option value="' + provinceArray[index][0] + '">' + provinceArray[index][0] + '</option>'

    }

    provinceSelector.innerHTML = options


  });
}


// For Reset Password

if (document.getElementById('forgotPassword') != null) {
  document.getElementById('forgotPassword').addEventListener('click', function (e) {
    console.log('I am clicked')
  })
}
