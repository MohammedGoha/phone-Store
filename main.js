import { getData, phonenumber, tvnumber, accessnumber } from "./data.js";
let data = getData();
let shoplistitem = document.getElementById("shop");
let shoplist = document.querySelector("ul.shopping");
shoplistitem.addEventListener("click", function () {
  shoplist.classList.toggle("active");
});
function basketButton() {
  let basketButtons = document.getElementsByClassName("basket");
  Array.from(basketButtons).forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      //console.log(event.target.parentElement.children[0].innerHTML);
      if (!localStorage.getItem("phones")) {
        localStorage.setItem(
          "phones",
          event.target.parentElement.children[0].innerHTML
        );
      } else {
        localStorage.setItem(
          "phones",
          localStorage.getItem("phones") +
            "," +
            event.target.parentElement.children[0].innerHTML
        );
      }

      // Show confirmation dialog
      const goToBasket = confirm(
        "Do you want to go to the basket or continue shopping?"
      );

      // If user clicks 'OK', redirect to the URL specified in data-url attribute
      if (goToBasket) {
        window.location = "basket.html";
      }
      // If user clicks 'Cancel', do nothing
    });
  });
}

let navbar = document.querySelector("ul.nav");
let menubar = document.querySelector("div.menubar");
menubar.addEventListener("click", function () {
  navbar.classList.toggle("smallactive");
});

// show phones
function putPhoneOnScreen(min, max) {
  theshop.innerHTML = "";
  for (let i = min; i < max; i++) {
    let box = document.createElement("div");
    // box.append();
    // window.theshop.append(data.phones[1].name)
    box.setAttribute("class", "box");
    box.innerHTML += `
    <h1 style="display:none;">${data.phones[i].id}</h1>
        <div class="image">
              <img src="./images/${data.phones[i].cato}/${data.phones[i].name}.jpg" alt="" />
            </div>
            <div class="text">
              <h3>${data.phones[i].name}</h3>
              <p>
              ${data.phones[i].description.line}
              </p>
              <h4 class="price"> ${data.phones[i].price} </h4>
              </div>
            <button type="button" class="basket">Add To Basket</button>
            <button type="button" class="more">Read More</button>
`;
    theshop.append(box);
  }
}

let theshop = document.querySelector(".phones");
//console.log(theshop);
let leftarrow = document.querySelector(".buttons .left");
let rightarrow = document.querySelector(".buttons .right");
let arrowCount = 0;
let min = 0;
let max = 6;
let totalItems = phonenumber; // Assuming there are phonenumber total items
let itemsPerPage = 6; // Number of items per page

const adjustItemsPerPage = () => {
  if (window.innerWidth < 700) {
    // //console.log(window.innerWidth);
    itemsPerPage = 1;
  } else if (window.innerWidth < 992) {
    itemsPerPage = 2;
  } else {
    itemsPerPage = 6;
  }
  // itemsPerPage = window.innerWidth < 992 ? 2 : 6;
};

// Call adjustItemsPerPage when the window is resized
let cat = 0;
let catarr = [0, phonenumber, phonenumber + accessnumber];
window.addEventListener("resize", () => {
  adjustItemsPerPage();
  max = min + itemsPerPage;
  putPhoneOnScreen(min, max); // Update the screen after resizing
  ReadMore();
  basketButton();
});
let rarrow = function (total, itemperPage) {
  // When right arrow is clicked, move forward by 6 items
  if (max < total) {
    min = Math.min(min + itemperPage, total - itemperPage);
    max = Math.min(max + itemperPage, total);
  } else {
    //console.log("You are at the last page.");
  }

  putPhoneOnScreen(min, max);
  arrowCount++;
  ReadMore();
  basketButton();
};
rightarrow.addEventListener("click", () => {
  rarrow(totalItems, itemsPerPage);
});
let larrow = (itemperpage) => {
  // When left arrow is clicked, move backwards by 6 items
  if (min > catarr[cat]) {
    min = Math.max(min - itemperpage, catarr[cat]);
    max = min + itemperpage;
  } else {
    //console.log("You are at the first page.");
  }
  //console.log(min, max);
  //console.log(data.phones[min]);

  putPhoneOnScreen(min, max);
  ReadMore();
  basketButton();
};
leftarrow.addEventListener("click", () => {
  larrow(itemsPerPage);
});
// data.tv.forEach(function (item) {
//   //console.log(item.name + " " + item.id);
// });
let username = document.getElementById("username");
let contact = document.getElementById("contactus");
contact.addEventListener("click", function () {
  setTimeout(() => {
    username.focus();
  }, 500);
});

//start boxing the phones
let c = 0;
if (window.innerWidth < 700) {
  c = 1; // Number of items per page
} else if (window.innerWidth < 992) {
  c = 2; // Number of items per page
} else {
  c = 6; // Number of items per page
}
window.onload = putPhoneOnScreen(0, c);
function basketbuttoninopend() {
  let x = document.querySelector(".basket");
  x.addEventListener("click", (event) => {
    event.preventDefault();
    let value =
      x.parentElement.parentElement.parentElement.parentElement.children[0]
        .innerHTML;
    if (!localStorage.getItem("phones")) {
      localStorage.setItem("phones", value.trim());
    } else {
      localStorage.setItem(
        "phones",
        localStorage.getItem("phones") + "," + value.trim()
      );
    }
  });
  window.location.href = "basket.html";
}
function ReadMore() {
  let ReadMore = document.getElementsByClassName("more");
  
  Array.from(ReadMore).forEach((el) => {
    el.addEventListener("click", () => {
      let phone = data.phones[el.parentElement.children[0].innerHTML - 1];
      let bulletPointing = "";
      for (let point of phone.description.bulletPoints) {
        bulletPointing += `<li>${point}</li>`;
      }
      // //console.log(phone);
      let showinginfo = `
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
      body {
        background-color: hsl(345, 4%, 19%);
        color: hsl(196, 85%, 50%);
      }
      .parent {
        height: 100vh;
        overflow: hidden;
      }
      .parent .container {
        display: flex;
      }
      .parent img {
        height: 100vh;
        padding: 30px;
      }
      .parent .text {
        display: flex;
        gap: 60px;
        justify-content: center;
        flex-direction: column;
        padding:10px 30px;
      }
      .parent .text .line {
        flex-basis: 10%;
      }
      .parent .text ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        list-style: none;
        gap: 40px;
      }
      .price {
        color: gold;
        display: flex;
        flex-direction: column;
        gap: 30px;
      }
      .parent .price h3::after{
        content: "$";
      }
      .parent .price .buttons {
        display: flex;
        gap: 30px;
      }
      button {
        background-color: gold;
        padding: 10px 20px;
        font-weight: bold;
        text-transform: capitalize;
        transition: 0.3s;
        border: none;
        cursor: pointer;
      }
      .parent button a {
        text-decoration: none;
        color: hsl(345, 4%, 19%);
      }

      button:hover {
        background-color: hsl(196, 85%, 50%);
      }
@media (max-width: 1024px) {
  .parent {
    height:auto;
  }
  .container {
    flex-direction: column;
  }

  .parent img {
    max-width: 100%;
    height: auto;
  }

  .text {
    padding: 20px;
    text-align: center;
  }

  .buttons {
    flex-direction: column;
  }

  ul {
    gap: 15px;
  }

  .price {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .parent {
    padding: 10px;
  }

  .container {
    gap: 15px;
  }

  ul {
    gap: 10px;
  }

  .buttons {
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .parent {
    padding: 5px;
  }

  .container {
    gap: 10px;
  }

  .text {
    padding: 10px;
  }

  button {
    padding: 8px 15px;
  }

  ul {
    gap: 8px;
  }

  .buttons {
    gap: 10px;
  }
}
    </style>
  </head>
  <body>
    <div class="parent">
      <div class="container">
        <div class="image">
          <img src="./images/${phone.cato}/${phone.name}.jpg" alt="" />
        </div>
        <div class="text">
      <h1 id="elementid" style="display:none;"> ${phone.id}</h1>
          <div class="line">
            <h2>
              ${phone.description.line}
            </h2>
          </div>
          <ul>
          ${bulletPointing}
          </ul>
          <div class="price">
            <h3>${phone.price}</h3>
            <div class="buttons">
              <button type="button" class="back">
                <a href="index.html">back</a>
              </button>
              <button type="button" onclick="basketbuttoninopend()" class="basket">
                <a >go to basket </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script >
    function basketbuttoninopend() {
  let x = document.querySelector(".basket");
  x.addEventListener("click", (event) => {
    event.preventDefault();
    let value = x.parentElement.parentElement.parentElement.children[0]
        .innerHTML
    if (!localStorage.getItem("phones")) {
      localStorage.setItem("phones", value.trim());
    } else {
      localStorage.setItem(
        "phones",
        localStorage.getItem("phones") + "," + value.trim()
      );
    }
  location = "basket.html";

  });
}
basketbuttoninopend()
    </script>
  </body>
</html>
      
      `;
      //console.log(el.parentElement.children[1].children[0].getAttribute("src"));
      //console.log(data.phones[el.parentElement.children[0].innerHTML - 1]);
      let infowindow = window.open("", "", "", "");
      infowindow.document.write(showinginfo);
    });
  });
}
setTimeout(ReadMore, 1000);
basketButton();

let accbtn = document.querySelector("#acc");
//console.log(accbtn);
accbtn.addEventListener("click", function () {
  min = phonenumber;
  max = 34;
  cat = 1;
  totalItems = phonenumber + accessnumber;
  if (window.innerWidth < 700) {
    itemsPerPage = 1; // Number of items per page
  } else if (window.innerWidth < 992) {
    itemsPerPage = 2; // Number of items per page
  } else {
    itemsPerPage = 6; // Number of items per page
  }
  max = min + itemsPerPage;
  putPhoneOnScreen(min, max);
  ReadMore();
  basketButton();
});
let tvbtn = document.querySelector("#tv");
//console.log(tvbtn);
tvbtn.addEventListener("click", function () {
  min = phonenumber + accessnumber;
  max = 34 + accessnumber;
  cat = 2;
  totalItems = phonenumber + accessnumber + tvnumber;
  if (window.innerWidth < 700) {
    itemsPerPage = 1; // Number of items per page
  } else if (window.innerWidth < 992) {
    itemsPerPage = 2; // Number of items per page
  } else {
    itemsPerPage = 6; // Number of items per page
  }
  max = min + itemsPerPage;
  putPhoneOnScreen(min, max);
  ReadMore();
  basketButton();
});
let phonebtn = document.querySelector("#pho");
//console.log(phonebtn);
phonebtn.addEventListener("click", function () {
  min = 0;
  max = 6;
  cat = 0;
  totalItems = phonenumber;
  if (window.innerWidth < 700) {
    itemsPerPage = 1; // Number of items per page
  } else if (window.innerWidth < 992) {
    itemsPerPage = 2; // Number of items per page
  } else {
    itemsPerPage = 6; // Number of items per page
  }
  max = min + itemsPerPage;
  putPhoneOnScreen(min, max);
  ReadMore();
  basketButton();
});
let accli = document.querySelector("#internal .acc");
//console.log(accli);
accli.addEventListener("click", function () {
  min = phonenumber;
  max = 34;
  cat = 1;
  totalItems = phonenumber + accessnumber;
  if (window.innerWidth < 700) {
    itemsPerPage = 1; // Number of items per page
  } else if (window.innerWidth < 992) {
    itemsPerPage = 2; // Number of items per page
  } else {
    itemsPerPage = 6; // Number of items per page
  }
  max = min + itemsPerPage;
  putPhoneOnScreen(min, max);
  ReadMore();
  basketButton();
});
let tvli = document.querySelector("#internal .tv");
//console.log(tvli);
tvli.addEventListener("click", function () {
  min = phonenumber + accessnumber;
  max = 34 + accessnumber;
  cat = 2;
  totalItems = phonenumber + accessnumber + tvnumber;
  if (window.innerWidth < 700) {
    itemsPerPage = 1; // Number of items per page
  } else if (window.innerWidth < 992) {
    itemsPerPage = 2; // Number of items per page
  } else {
    itemsPerPage = 6; // Number of items per page
  }
  max = min + itemsPerPage;
  putPhoneOnScreen(min, max);
  ReadMore();
  basketButton();
});
let phoneli = document.querySelector("#internal .pho");
//console.log(phoneli);
phoneli.addEventListener("click", function () {
  min = 0;
  max = 6;
  cat = 0;
  totalItems = phonenumber;
  if (window.innerWidth < 700) {
    itemsPerPage = 1; // Number of items per page
  } else if (window.innerWidth < 992) {
    itemsPerPage = 2; // Number of items per page
  } else {
    itemsPerPage = 6; // Number of items per page
  }
  max = min + itemsPerPage;
  putPhoneOnScreen(min, max);
  ReadMore();
  basketButton();
});