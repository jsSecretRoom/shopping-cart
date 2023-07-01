import { data } from './js/data';

document.addEventListener('DOMContentLoaded', function() {
  function mimiShopModul(data, smartfonsSelector){

    const createCaart = document.querySelector(smartfonsSelector);

    class Product {
      constructor(name, description, fotoLink, firstPrice, secondPrice){
        this.name = name;
        this.description = description;
        this.fotoLink = fotoLink;
        this.firstPrice = firstPrice;
        this.secondPrice = secondPrice;
      }
       
      render(){
        
        this.parent.append(element);
      }
      
    }
  }
  mimiShopModul(data, '.smartfons');
});