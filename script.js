import { getData, phonenumber, tvnumber, accessnumber } from "./data.js";
let searchBox = document.getElementById('search');
let main = document.querySelector('section .container .phones');
let obj = getData();
function ReadMore(){
    let ReadMore = document.getElementsByClassName("more");
  
  Array.from(ReadMore).forEach((el) => {
    el.addEventListener("click", () => {
      let phone = obj.phones[el.parentElement.children[0].innerHTML - 1];
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
      //console.log(obj.phones[el.parentElement.children[0].innerHTML - 1]);
      let infowindow = window.open("", "", "", "");
      infowindow.document.write(showinginfo);
    });
  });
}
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
searchBox.addEventListener("input", function(e){ 
    main.innerHTML= " " ;
    let value = e.target.value;
   let searchingAbout= obj.phones.filter((phone)=> phone.name.toLowerCase().includes(value));
    searchingAbout.forEach((phone)=>{
let box = document.createElement("div");
    // box.append();
    // window.theshop.append(obj.phones[1].name)
    box.setAttribute("class", "box");
    box.innerHTML += `
    <h1 style="display:none;">${phone.id}</h1>
        <div class="image">
              <img src="./images/${phone.cato}/${phone.name}.jpg" alt="" />
            </div>
            <div class="text">
              <h3>${phone.name}</h3>
              <p>
              ${phone.description.line}
              </p>
              <h4 class="price"> ${phone.price} </h4>
              </div>
            <button type="button" class="basket">Add To Basket</button>
            <button type="button" class="more">Read More</button>
`;
main.append(box);
    })
    setTimeout(ReadMore, 1000);
    basketButton();
})