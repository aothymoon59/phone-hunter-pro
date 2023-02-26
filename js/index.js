const loadPhone = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
  } catch (error) {
    console.log(error);
  }
};

const displayPhone = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.textContent = "";
  //   display 10 phones
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 9) {
    phones = phones.slice(0, 9);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  //   no phone found message
  const noPhone = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
        <div class="card">
            <div class="d-flex justify-content-center">
              <img src="${phone.image}" class="card-img-top w-75 p-4" alt="${phone.phone_name}">
            </div>
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                    to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showDetailsModal">Show Details</button>
            </div>
        </div>         
    `;
    phonesContainer.appendChild(phoneDiv);
  });
  //   stop spinner or loader
  toggleLoader(false);
};

const searchSystem = (dataLimit) => {
  // start spinner or loader
  toggleLoader(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, dataLimit);
};

document.getElementById("search-btn").addEventListener("click", function () {
  searchSystem(9);
});

document
  .getElementById("search-field")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchSystem(9);
    }
  });

const toggleLoader = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};
// not the best way to load show all
document.getElementById("btn-show-all").addEventListener("click", function () {
  searchSystem();
});

const loadPhoneDetails = async (id) => {
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showPhoneDetails(data.data);
};

const showPhoneDetails = (phone) => {
  const modalTitle = document.getElementById("showDetailsModalLabel");
  modalTitle.innerText = phone.name;

  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.innerHTML = `
    <div class="d-flex justify-content-center mb-3"><img style="width:130px;" src="${
      phone.image
    }"></div>
    <p><b>Release Date:</b> ${
      phone.releaseDate ? phone.releaseDate : "No Release Date Found!"
    }</p>
  
    <h4 class="text-center">Main Features</h4>
  
    <p><b>ChipSet:</b> ${phone.mainFeatures.chipSet}</p>
    <p><b>displaySize:</b> ${phone.mainFeatures.displaySize}</p>
    <p><b>memory:</b> ${phone.mainFeatures.memory}</p>
    <b>sensors:</b>
    <p>${phone.mainFeatures.sensors}</p>
  
    <h4 class="text-center">Others</h4>
  
    <p><b>Bluetooth:</b> ${
      phone.others ? phone.others.Bluetooth : "No bluetooth info..."
    }</p>
    <p><b>GPS:</b> ${phone.others ? phone.others.GPS : "No GPS info..."}</p>
    <p><b>NFC:</b> ${phone.others ? phone.others.NFC : "No NFC info..."}</p>
    <p><b>Radio:</b> ${
      phone.others ? phone.others.Radio : "No Radio info..."
    }</p>
    <p><b>USB:</b> ${phone.others ? phone.others.USB : "No USB info..."}</p>
    <p><b>WLAN:</b> ${phone.others ? phone.others.WLAN : "No WLAN info..."}</p>
  
    `;
};

loadPhone("apple");
