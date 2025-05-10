let phones;
import { phonenumber, accessnumber, getData, tvnumber } from "./data.js";
phones = getData().phones;
let array =
  localStorage.getItem("phones") !== null
    ? localStorage.getItem("phones").split(",")
    : [];
let idmaping = array.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});

let cont = document.querySelector(".thebasket .container");
//console.log(cont);

let navbar = document.querySelector("ul.nav");
//console.log(navbar);
let menubar = document.querySelector("div.menubar");
menubar.addEventListener("click", function () {
  navbar.classList.toggle("smallactive");
});

let total = 0;
let totaldiv = `<h2 id="totalPrice">${
  localStorage.getItem("phones") ? localStorage.getItem("totalprice") : "0$"
}</h2>`;

cont.parentElement.insertAdjacentHTML("beforeend", totaldiv);
function fillcontainer() {
  cont.innerHTML = "";
  total = 0; // Reset total
  array = localStorage.getItem("phones")
    ? localStorage.getItem("phones").split(",")
    : [];
  idmaping = array.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});

  let keys = Object.keys(idmaping);
  keys.forEach((el) => {
    
    el--;

    let box = `
    
      <div class="box">
          <h1 style="display:none;">${phones[el].id}</h1>
            <div class="image">
              <img src="./images/${phones[el].cato}/${phones[el].name}.jpg" alt="" />
            </div>
            <div class="text">
              <h4>${phones[el].name}</h4>
              <h6>${idmaping[el + 1]}</h6>
            </div>
            <h2 >${phones[el].price}</h2>
            <button class="remove" type="button">Remove</button>
          </div>
      `;
    total += phones[el].price * idmaping[el + 1]; // Multiply price by the count
    total = Math.ceil(total); // Round off to avoid decimal precision errors
    cont.insertAdjacentHTML("beforeend", box);
  });

  localStorage.setItem("totalprice", total);
  let pricecont = document.getElementById("totalPrice");
  pricecont.innerHTML = `${localStorage.getItem("totalprice")}$`;
  //console.log(pricecont);
  // Add event listeners to "Remove" buttons after rendering items
  handleremovebutton();
}

function handleremovebutton() {
  let removebuttons = document.querySelectorAll(".box button");
  Array.from(removebuttons).forEach((button) => {
    button.addEventListener("click", (e) => {
      let itemId = parseInt(
        e.target.parentElement.querySelector("h1").innerText
      );
      //console.log(itemId);

      if (idmaping[itemId] > 1) {
        idmaping[itemId] -= 1; // Reduce the count of the item in idmaping
      } else {
        delete idmaping[itemId]; // Remove the item if count reaches zero
      }

      // Update the localStorage after removing the item
      let updatedArray = [];
      for (let key in idmaping) {
        for (let i = 0; i < idmaping[key]; i++) {
          updatedArray.push(key);
        }
      }

      localStorage.setItem("phones", updatedArray.join(","));
      fillcontainer(); // Rebuild the container after updating
    });
  });
}

// Initial call to populate the container
setTimeout(() => {
  fillcontainer();
}, 100);
let clearbtn = document.getElementById("clear");
clearbtn.addEventListener("click", () => {
  localStorage.clear();
  // document.getElementById("emtpy")?document.getElementById("emtpy").classList.toggle("active"):"";
  location.reload();
});

