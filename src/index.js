document.addEventListener('DOMContentLoaded', function() {
  function myCards(objdata, typeOfProduct, typeSelector ){
    class Product {
      constructor(name, description, fotoLink, firstPrice, secondPrice, parentSelector){
        this.name = name;
        this.description = description;
        this.fotoLink = fotoLink;
        this.firstPrice = firstPrice;
        this.secondPrice = secondPrice;
        this.parent = document.querySelector(parentSelector);
      }
        
      render(){
        const element = document.createElement('div');
        element.innerHTML = `
        <div class="card">
          <div class="ficha">
              <button class="add-to-bag">
                  <img src="./src/img/Favorite.svg" alt="">
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
        </div>`
        this.parent.append(element);
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

  myCards('data.json','smartphones', '#smartfons' );
  myCards('data.json','smartphones', '#cars' );
  myCards('data.json','smartphones', '#pc' );
  myCards('data.json','smartphones', '#tables' );
  myCards('data.json','smartphones', '#soffa' );
  myCards('data.json','smartphones', '#house' );
});

