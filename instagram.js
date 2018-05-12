
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
  const target = document.querySelector('.instagram-widget');
  const list = document.createElement('ul');
  images.forEach((image) => {
    const item = document.createElement('li');
    item.appendChild(image);
    list.appendChild(item);
  });
  target.appendChild(list);
}

function fadeImages() {
  const images = [...document.querySelectorAll('.instagram-widget li')];
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
    }, 3000);
  };
  fade();
}

async function getInsta() {
  const token = 'TOKEN_GOES_HERE';
  const url = `https://api.instagram.com/v1/users/self/media/recent?count=10&access_token=${token}`;
  const imagesUrls = await fetch(url)
    .then(data => data.json())
    .then(data => data.data.reverse().map(item => item.images.standard_resolution.url));
  preloadImages(imagesUrls).then((images) => {
    listImages(images);
    fadeImages();
  });
}

getInsta();
