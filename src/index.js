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
});



