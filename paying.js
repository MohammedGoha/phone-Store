import { getData, phonenumber, tvnumber, accessnumber } from "./data.js";
let phones = getData().phones;

let array = localStorage.getItem("phones")
  ? localStorage.getItem("phones").split(",")
  : [];
let idmaping = array.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});
//console.log(idmaping);
//console.log(Object.keys(idmaping));

const cardDatabase = [
  {
    cardNumber: "1234-5678-9012-3456",
    cardName: "Mohamed Goha",
    balance: 40000,
  },
  { cardNumber: "9876-5432-1098-7654", cardName: "John Wick", balance: 1500 },
];

const phoneList = document.querySelector(".phone-list");
let listhepaying = [];
Object.keys(idmaping).forEach((id) => {
  listhepaying.push(phones[id - 1]);
 let phoneDiv = document.createElement("div");
  phoneDiv.className = "phone";
  //console.log(index);
  //console.log(dir);
  phoneDiv.innerHTML = `
            <img src="/images/${phones[id - 1].cato}/${
    phones[id - 1].name
  }.jpg" alt="${phones[id - 1].name}">
            <h4>${phones[id - 1].name}</h4>
            <h6>$${Math.ceil(
              phones[id - 1].price.toFixed(2) * idmaping[phones[id - 1].id]
            )}</h6>
            <h5>${idmaping[phones[id - 1].id]}</h5>
        `;
  phoneList.appendChild(phoneDiv);
});
function displayPhones() {
  listhepaying.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.className = "phone";
    // //console.log(index);
    //console.log(dir);
    phoneDiv.innerHTML = `
            <img src="/images/${phone.cato}/${phone.name}.jpg" alt="${phone.name}">
            <h4>${phone.name}</h4>
            <h6>$${Math.ceil(phone.price.toFixed(2) * idmaping[phone.id])}</h6>
            <h5>${idmaping[phone.id]}</h5>
        `;
    phoneList.appendChild(phoneDiv);
  });
}
document.getElementById("totalPrice").innerHTML = `total : ${
  localStorage.getItem("totalprice") != null
    ? localStorage.getItem("totalprice")
    : "0"
} $`;

function handleCheckout(event) {
  event.preventDefault();

  const cardNumber = document.getElementById("card-number").value;
  const cardName = document.getElementById("card-name").value;

  const card = cardDatabase.find(
    (c) => c.cardNumber === cardNumber && c.cardName === cardName
  );
  if (card) {
    let total = localStorage.getItem("totalprice");
    if (total > 0) {
      if (card.balance >= total) {
        alert(`balance before checkout: ${card.balance}`);
        card.balance -= total;
        alert(`balance before checkout: ${card.balance}`);
        alert("payment successful!");
        window.location.href = "main.html";
      } else {
        alert("payment failed! \n the card under price ");
      }
    } else {
      alert("add something to the basket first");
      location.href = "main.html#theshop";
    }
  } else {
    alert("Invalid card details. Please try again.");
  }
}

document
  .getElementById("checkout-form")
  .addEventListener("submit", handleCheckout);
