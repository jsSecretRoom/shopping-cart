document.addEventListener('DOMContentLoaded', function() {

  function sliderSwiper(buttonLeft, buttonRight, carousel, slides, wraper) {
    const leftButtons = document.querySelectorAll(buttonLeft);
    const rightButtons = document.querySelectorAll(buttonRight);
    

    function slideToNext(container) {
      const slideItems = container.querySelectorAll(slides);
      const slideWidth = slideItems[0].offsetWidth;

      container.style.transition = 'transform 0.5s ease';
      container.style.transform = `translateX(-${slideWidth}px)`;

      setTimeout(function() {
        container.appendChild(slideItems[0]);
        container.style.transition = 'none';
        container.style.transform = 'translateX(0)';
      }, 500);
    }

    function slideToPrev(container) {
      const slideItems = container.querySelectorAll(slides);
      const slideWidth = slideItems[0].offsetWidth;

      const lastSlide = slideItems[slideItems.length - 1];
      container.insertBefore(lastSlide, slideItems[0]);

      container.style.transition = 'none';
      container.style.transform = `translateX(-${slideWidth}px`;

      setTimeout(function() {
        container.style.transition = 'transform 0.5s ease';
        container.style.transform = 'translateX(0)';
      }, 50);
    }

    const addClickListener = (buttons, callback) => {
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          const container = button.closest(wraper).querySelector(carousel);
          callback(container);
        });
      });
    };

    addClickListener(leftButtons, slideToPrev);
    addClickListener(rightButtons, slideToNext);
  }

  sliderSwiper('.left', '.right', '.carousel', '.foto-slid', '.wraper');

  function randomFoto(masivfoto, apy) {
    const img = document.querySelectorAll(masivfoto);
  
    async function randomFetch(apy) {
      try {
        const response = await fetch(apy);
        if (response.ok) {
          const data = await response.json();
          return data; // Возвращает полученные данные
        } else {
          console.log('Error: ' + response.status);
        }
      } catch (error) {
        console.log('Error: ' + error);
      }
    }
  
    img.forEach(async (item) => {
      const fetchedData = await randomFetch(apy);
      if (fetchedData) {
        if (apy === 'https://dog.ceo/api/breeds/image/random') {
          const imageSrc = fetchedData.message;
          item.src = imageSrc;
        } else if (apy === 'https://api.chucknorris.io/jokes/random') {
          const joke = fetchedData.value;
          const roflElement = document.querySelector('.rofl');
          roflElement.textContent = joke;
        }
      }
    });

    const newRoflButton = document.querySelector('.new-rofl');

    newRoflButton.addEventListener('click', async () => {
      const roflElement = document.querySelector('.rofl');
      roflElement.textContent = 'Loading...';

      const fetchedData = await randomFetch('https://api.chucknorris.io/jokes/random');
      if (fetchedData) {
        const joke = fetchedData.value;
        roflElement.textContent = joke;
      }
    });
  }
  randomFoto('.fetchimg', "https://dog.ceo/api/breeds/image/random");
  randomFoto('.rofl', 'https://api.chucknorris.io/jokes/random');
});