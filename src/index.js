document.addEventListener('DOMContentLoaded', function() {
  let counterValue = 0;
  

  function myCards(objdata, typeOfProduct, typeSelector) {
    class Product {
      constructor(name, description, fotoLink, firstPrice, secondPrice, parentSelector) {
        this.name = name;
        this.description = description;
        this.fotoLink = fotoLink;
        this.firstPrice = firstPrice;
        this.secondPrice = secondPrice;
        this.parent = document.querySelector(parentSelector);
      }

      render() {
        const element = document.createElement('div');
        const hardOff = "./src/img/Favorite.svg";
        const hardON = "./src/img/Favorite_duotone.svg";
        element.innerHTML = `
        <div class="card">
          <div class="ficha">
              <button class="add-to-bag">
                  <img src="${hardOff}" alt="">
              </button>
          </div>
          <div class="grup-card">
              <div class="product-img">
                  <img src="${this.fotoLink}" alt="">
              </div>
              <a href="#" class="product-info">
                  <p class="product-desck"><span class="product">${this.name}</span>${this.description}</p>
                  <p class="unreal-price">${this.firstPrice}</p>
                  <p class="real-price">${this.secondPrice}</p>
              </a>
          </div>
        </div>`;
        this.parent.append(element);

        const addToBagButton = element.querySelector('.add-to-bag');
        const counterElement = document.querySelector('.counter');
        
        const favorits = document.querySelector('.favorit-cards');

        addToBagButton.addEventListener('click', () => {
          const img = addToBagButton.querySelector('img');
          if (addToBagButton.classList.contains('active')) {
            img.src = hardOff;
            counterValue--;
          } else {
            img.src = hardON;
            counterValue++;
          }
          addToBagButton.classList.toggle('active');
          counterElement.textContent = counterValue;
        });
      }
    }

    fetch(objdata)
    .then(response => response.json())
    .then(data => {
      const cardsData = data[typeOfProduct];
      cardsData.forEach(({ name, description, fotoLink, firstPrice, secondPrice }) => {
        new Product(name, description, fotoLink, firstPrice, secondPrice, typeSelector).render();
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  myCards('data.json', 'smartphones', '#smartfons');
  myCards('data.json', 'cars', '#cars');
  myCards('data.json', 'pc', '#pc');
  myCards('data.json', 'tables', '#tables');
  myCards('data.json', 'soffa', '#soffa');
  myCards('data.json', 'house', '#house');

  function sortProduct(buttons, product, containerButtons, containerCards) {
    const buttonsContainer = document.querySelector(containerButtons);
    const cardsContainer = document.querySelector(containerCards);
  
    const buttonsFilter = buttonsContainer.querySelectorAll(buttons);
    const productCards = cardsContainer.querySelectorAll(product);
  
    buttonsFilter.forEach(button => {
      button.addEventListener('click', function() {
        const category = button.textContent.trim();
        
        if (category === 'show-All') {
          productCards.forEach(card => {
            card.style.display = 'flex'; // Показать все блоки товаров
          });
        } else {
          productCards.forEach(card => {
            if (card.id === category) {
              card.style.display = 'flex'; // Показать блоки товаров, соответствующие категории
            } else {
              card.style.display = 'none'; // Скрыть блоки товаров, несоответствующие категории
            }
          });
        }
      });
    });
  }
  
  sortProduct('.filter', '.cards-style', '.filtres', '.shoping-cards');

  function setCookie(name, value, days) {
    var expires = '';
  
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
  
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
  }
  setCookie('counterValue', counterValue, 7);

  function showBag(buttonShow, buttonClose, popUp ){
    const bagButtonShow = document.querySelector(buttonShow);
    const exitButton = document.querySelector(buttonClose);
    const popUpWindow = document.querySelector(popUp);

    bagButtonShow.addEventListener('click', function(){
      popUpWindow.style.display = 'flex';
    });
    exitButton.addEventListener('click', function(){
      popUpWindow.style.display = 'none';
    });
  }
  showBag('.show-bag', '.exit', '.pop-up');
});



