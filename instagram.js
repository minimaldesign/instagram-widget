(function init() {
  // see README.md for how to setup your token
  const AUTH_TOKEN = '1518392443.7db5355.e9cbaf65eeb3499eb3544e834aecf8dd';
  // element the slideshow will be added to. Styles in instagram.css
  const TARGET_SELECTOR = '.instagram-widget';
  // how long the fade out between slides takes to kick in (fade out speed itself in CSS)
  const SPEED = 3000;
  // by default, images are added as <img /> but if you don't always post square images on Instagram
  // you might want change this to `true` to set them up as <li /> background images instead
  const BG_IMG = false;


  function preloadImages(urls) {
    function loadImage(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          resolve(img);
        };
        img.onerror = () => {
          reject(img); // TODO: log image that doesn't load
        };
        img.src = url;
      });
    }
    const promises = [];
    urls.forEach((url) => {
      promises.push(loadImage(url));
    });
    return Promise.all(promises);
  }

  function listImages(images) {
    const target = document.querySelector(TARGET_SELECTOR);
    const list = document.createElement('ul');
    images.forEach((image) => {
      const item = document.createElement('li');
      item.appendChild(image);
      list.appendChild(item);
    });
    target.appendChild(list);
  }

  function listImagesAsBackground(urls) {
    const target = document.querySelector(TARGET_SELECTOR);
    const list = document.createElement('ul');
    list.innerHTML = urls.map(url => `<li style="background-image: url(${url})"></li>`).join('');
    target.appendChild(list);
  }

  function fadeImages() {
    const images = [...document.querySelectorAll(`${TARGET_SELECTOR} li`)];
    const totalImages = images.length;
    let currentImage = totalImages - 1;
    const fade = () => {
      setTimeout(() => {
        images[currentImage].classList.add('fade');
        if (currentImage === 0) {
          images.forEach(img => img.classList.remove('fade'));
          currentImage = totalImages - 1;
        } else {
          currentImage -= 1;
        }
        fade();
      }, SPEED);
    };
    fade();
  }

  async function getInsta() {
    const url = `https://api.instagram.com/v1/users/self/media/recent?count=10&access_token=${AUTH_TOKEN}`;
    const imagesUrls = await fetch(url)
      .then(data => data.json())
      .then(data => data.data.reverse().map(item => item.images.standard_resolution.url));

    preloadImages(imagesUrls).then((images) => {
      if (BG_IMG) {
        listImagesAsBackground(imagesUrls);
      } else {
        listImages(images);
      }
      fadeImages();
    });
  }

  getInsta();
}());
