const formSection = document.querySelector('#get-call-form');
const formSpanArray = [...formSection.getElementsByTagName('span')];
const formInputArray = [...formSection.getElementsByTagName('input')].slice(0, 4);
const formOrderSection = document.querySelector('.customer-contacts');
const formOrderSpanArray = [...formOrderSection.getElementsByTagName('span')];
const formOrderInputArray = [
  ...formOrderSection.getElementsByTagName('input'),
].slice(0, 4);

const menuBar = document.querySelector('.menu-bar');
const goodsMoreInfo = document.querySelector('.more-product-info');
const customerBasket = document.querySelector('.customer-basket');
const orderArea = document.querySelector('.order-area');
const customerContacts = document.querySelector('.customer-contacts');
const processingPersonal = document.querySelector('.processing-personal-data');
const formSendDiv = document.querySelector('.form-send');
const moveUpArrow = document.querySelector('.up-arrow');
const goodsTableBody = document.querySelector('#table-body');
const totalBill = document.querySelector('.total-bill');

const closeNotificationBtn = document.querySelector('.close-notification');
const getCallBtn = document.querySelector('.get-call');
const closePushcartBtn = document.querySelector('.close-pushcart');
const showPreviousGoodsBtn = document.querySelector('#show-previous-goods');
const showNextGoodsBtn = document.querySelector('#show-next-goods');
const nextOrderStepBtn = document.querySelector('.next-order-step');
const goBackBtn = document.querySelector('.go-back');
const applyBtn = document.querySelector('.apply');

const nameInput = document.querySelector('#name');
const phoneInput = document.querySelector('#phone');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const nameOrderInput = document.querySelector('#name-order');
const phoneOrderInput = document.querySelector('#phone-order');
const emailOrderInput = document.querySelector('#email-order');
const messageOrderInput = document.querySelector('#message-order');
const needToFillDivs = [...document.querySelectorAll('.need-to-fill')];

const chooseVolumeAreas = [...document.querySelectorAll('.choose-volume')];
const supermarket = [...document.querySelectorAll('.supermarket')];
const pushcarts = [...document.querySelectorAll('.pushcart')];
const closeGoodsInfoBtn = [...document.querySelectorAll('.close-btn')];
const getMoreInfoBtn = [...document.querySelectorAll('.get-more-info')];
const lessGoodsBtn = [...document.querySelectorAll('.less-of-goods')];
const moreGoodsBtn = [...document.querySelectorAll('.more-of-goods')];
const goodsCounter = [...document.querySelectorAll('.counter')];
const addGoodsBtn = [...document.querySelectorAll('.add-goods')];
const fullGoodsInfo = [...document.querySelectorAll('.full-product')];
const goodsInfo = [...document.querySelectorAll('.useful-info')];
const productInfoDetails = [...document.querySelectorAll('.info-details')];
const mobileProductInfo = [...document.querySelectorAll('.mobile-product-info')];

const forms = [...document.forms];

const mobileMenuSection = document.querySelector('.mobile-menu');
const menuLinks = [...document.querySelectorAll('.menu-item')];
const menuBtn = document.querySelector('.menu-btn');
let isMenuOpened = false;

let goodsInCart = JSON.parse(localStorage.getItem('order')) || {};

let moreInfoTouchStartX = 0;
let currentProduct = 0;
let goodsNumberInCart = 0;
let pushcartCounter = [];

let overwrittenScrollbar = '';
let tableScrollbar = '';
let productScrollbar = '';
const scrollbarOptions = {
  className            : "os-theme-dark",
  resize               : "none",
  sizeAutoCapable      : true,
  clipAlways           : true,
  normalizeRTL         : true,
  paddingAbsolute      : false,
  autoUpdate           : null,
  autoUpdateInterval   : 33,
  updateOnLoad         : ["img"],
  nativeScrollbarsOverlaid : {
      showNativeScrollbars   : false,
      initialize             : true
  },
  overflowBehavior : {
      x : "hidden",
      y : "scroll"
  },
  scrollbars : {
      visibility       : "auto",
      autoHide         : "move",
      autoHideDelay    : 1000,
      dragScrolling    : true,
      clickScrolling   : false,
      touchSupport     : true,
      snapHandle       : false
  },
  textarea : {
      dynWidth       : false,
      dynHeight      : false,
      inheritedAttrs : ["style", "class"]
  },
  callbacks : {
      onInitialized               : null,
      onInitializationWithdrawn   : null,
      onDestroyed                 : null,
      onScrollStart               : null,
      onScroll                    : null,
      onScrollStop                : null,
      onOverflowChanged           : null,
      onOverflowAmountChanged     : null,
      onDirectionChanged          : null,
      onContentSizeChanged        : null,
      onHostSizeChanged           : null,
      onUpdated                   : null
  }
}

let fullInfoWidth = 1322;

if (screen.width >= 1501) {
  fullInfoWidth = 1322;
} else if (screen.width >= 1181) {
  fullInfoWidth = 1024;
} else if (screen.width >= 961) {
  fullInfoWidth = 768;
} else if (screen.width >= 531) {
  fullInfoWidth = 510;
} else if (screen.width >= 360) {
  fullInfoWidth = 360;
} else {
  fullInfoWidth = 320;
}

if (screen.width <= 530) {
  goBackBtn.textContent = 'Вернуться назад';
}

$(function () {
  $('#phone').mask('+375 (99) 999 99 99', { placeholder: '*' });
});

$(function () {
  $('#phone-order').mask('+375 (99) 999 99 99', { placeholder: '*' });
});

window.addEventListener('load', () => {
  $('.introduce .container').children('h1').addClass('animate__slideInUp');
  $('.introduce .container').children('h1').removeClass('invisible');
  setTimeout(() => {
    $('.introduce .container').children('h2').addClass('animate__slideInUp');
    $('.introduce .container').children('h2').removeClass('invisible');
  }, 250);
  setTimeout(() => {
    $('.introduce .container').children('a').addClass('animate__slideInUp');
    $('.introduce .container').children('a').removeClass('invisible');
  }, 750);
});

document.addEventListener("DOMContentLoaded", function() {
  overwrittenScrollbar = OverlayScrollbars(document.body, scrollbarOptions);
  overwrittenScrollbar.options({ callbacks: {onScrollStart: showMoveUpArrow, onScroll: animating, onScrollStop: showMoveUpArrow} });
  productScrollbar = OverlayScrollbars(document.querySelector('.full-product-area'), scrollbarOptions);
  productScrollbar.options({scrollbars : {visibility: "hidden"}});
  if (Object.keys(goodsInCart).length > 3) {
    tableScrollbar = OverlayScrollbars(document.querySelector('.table-wrapper'), scrollbarOptions);
    tableScrollbar.options({scrollbars : {autoHide: "never"}});
    $(".table").floatThead();
  }
});

formInputArray.forEach((input) => {
  input.addEventListener('focus', (event) => {
    showInputLabel(event);
  });
});

formOrderInputArray.forEach((input) => {
  input.addEventListener('focus', (event) => {
    showOrderInputLabel(event);
  });
});

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'Escape':
      if (formSendDiv.style.opacity === '1') {
        closeSendNotification();
      } else if (customerBasket.style.opacity === '1') {
        closeCustomerBasket();
      } else if (goodsMoreInfo.style.opacity === '1') {
        closeGoodsMoreInfo();
      }
      break;
    case 'ArrowRight':
      showNextProduct();
      break;
    case 'ArrowLeft':
      showPreviousProduct();
      break;
  }
});

menuBtn.addEventListener('click', () => {
  if (!isMenuOpened) {
    menuBtn.style.background = 'url(img/icon/close-btn.svg) no-repeat';
    mobileMenuSection.style.opacity = '1';
    mobileMenuSection.style.zIndex = '10';
  } else {
    menuBtn.style.background = 'url(img/icon/menu-btn.svg) no-repeat';
    mobileMenuSection.style.opacity = '0';
    mobileMenuSection.style.zIndex = '-5';
  }
  if (screen.width <= 450) {
    menuBtn.style.backgroundSize = '21px';
  } else {
    menuBtn.style.backgroundSize = '25px';
  }
  isMenuOpened = !isMenuOpened;
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

goodsMoreInfo.addEventListener('click', (event) => {
  if (event.target.classList.contains('more-product-info')) {
    closeGoodsMoreInfo();
  }
});

goodsMoreInfo.addEventListener('touchstart', (event) => {
  if (screen.width <= 560) {
    moreInfoTouchStartX = event.touches[0].pageX;
  }
});

goodsMoreInfo.addEventListener('touchend', (event) => {
  if (screen.width <= 560) {
    const moreInfoTouchEndX = event.changedTouches[0].pageX;
    const moreInfoTouchDeltaX = moreInfoTouchStartX - moreInfoTouchEndX;
    if (moreInfoTouchDeltaX >= 100) {
      showNextProduct();
    }
    if (moreInfoTouchDeltaX <= -100) {
      showPreviousProduct();
    }
  }
});

moveUpArrow.addEventListener('click', () => {
  overwrittenScrollbar.scroll(0, 500);
});

formSection.addEventListener('click', (event) => {
  showInputLabel(event);
});

formOrderSection.addEventListener('click', (event) => {
  showOrderInputLabel(event);
});

formSendDiv.addEventListener('click', (event) => {
  if (event.target.classList.contains('form-send')) {
    closeSendNotification();
  }
});

getCallBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (nameInput.value === '') {
    validationBeforeSending(nameInput, 3);
  }
  if (emailInput.value === '') {
    validationBeforeSending(emailInput, 4);
  }
  if (phoneInput.value === '') {
    validationBeforeSending(phoneInput, 5);
  }
  if (isFormValid()) {
    Email.send({
      SecureToken: 'd5c70b6c-4273-4724-9d0c-14bc43f43538',
      To: 'laetitia-caritas@mail.ru',
      From: emailInput.value,
      Subject: 'Перезвоните мне',
      Body:
        '<strong>Имя:</strong> ' +
        nameInput.value +
        '<br /> <strong>Номер телефона:</strong> ' +
        phoneInput.value +
        '<br /> <strong>E-mail:</strong> ' +
        emailInput.value +
        '<br /> <strong>Сообщение:</strong> ' +
        messageInput.value,
    }).then((message) => {
      formSendDiv.style.opacity = 1;
      formSendDiv.style.zIndex = 5;
      forms[1].reset();
    });
  }
});

closeNotificationBtn.addEventListener('click', () => {
  closeSendNotification();
});

closeNotificationBtn.addEventListener('mouseover', () => {
  closeNotificationBtn.style.background = 'url(img/icon/close-form-send-hover.svg) no-repeat';
  if (screen.width > 530) {
    closeNotificationBtn.style.backgroundSize = '26.25px';
  } else {
    closeNotificationBtn.style.backgroundSize = '20.62px';
  }
});

closeNotificationBtn.addEventListener('mouseout', () => {
  closeNotificationBtn.style.background = 'url(img/icon/close-form-send.svg) no-repeat';
  if (screen.width > 530) {
    closeNotificationBtn.style.backgroundSize = '26.25px';
  } else {
    closeNotificationBtn.style.backgroundSize = '20.62px';
  }
});

nameInput.addEventListener('blur', (event) => {
  if (event.target.value) {
    const condition = event.target.value.length < 2;
    validationBorder(event, condition, 3);
    isFormValid();
  }

});

nameOrderInput.addEventListener('blur', (event) => {
  if (event.target.value) {
    const condition = event.target.value.length < 2;
    validationBorderOrderForm(event, condition, 0);
    isOrderFormValid();
  }
});

emailInput.addEventListener('blur', (event) => {
  const email = event.target.value;
  if (email) {
    const regexp = /(\w+\.)+\w+/g;
    const condition = !email.match(regexp);
    validationBorder(event, condition, 4);
    isFormValid();
  }
});

emailOrderInput.addEventListener('blur', (event) => {
  const email = event.target.value;
  if (email) {
    const regexp = /(\w+\.)+\w+/g;
    const condition = !email.match(regexp);
    validationBorderOrderForm(event, condition, 1);
    isOrderFormValid();
  }
});

phoneInput.addEventListener('blur', (event) => {
  if (event.target.value !== '+375 (**) *** ** **') {
    const regexp = /\d/g;
    const phoneMatch = event.target.value.match(regexp);
    if (phoneMatch) {
      const phoneNumber = phoneMatch.join('');
      const condition = phoneNumber.length !== 12;
      validationBorder(event, condition, 5);
    }
    isFormValid();
  }
});

phoneOrderInput.addEventListener('blur', (event) => {
  if (event.target.value !== '+375 (**) *** ** **') {
    const regexp = /\d/g;
    const phoneMatch = event.target.value.match(regexp);
    if (phoneMatch) {
      const phoneNumber = phoneMatch.join('');
      const condition = phoneNumber.length !== 12;
      validationBorderOrderForm(event, condition, 2);
    }
    isOrderFormValid();
  }
});

phoneInput.addEventListener('click', () => {
  phoneInput.selectionStart = phoneInput.selectionEnd = 6;
});

phoneOrderInput.addEventListener('click', () => {
  phoneOrderInput.selectionStart = phoneOrderInput.selectionEnd = 6;
});

getMoreInfoBtn.forEach((moreInfo) => {
  moreInfo.addEventListener('click', (event) => {
    const productName =
      event.target.previousElementSibling.previousElementSibling.textContent;
    let chosenVolume = 0;
    [...event.target.previousElementSibling.previousElementSibling.previousElementSibling.children].forEach(vol => {
      if(vol.classList.contains('volume-chosen')) {
        chosenVolume = parseInt(vol.textContent);
      }
    });
    goodsMoreInfo.style.transition = 'all 0.025s ease-in';
    goodsMoreInfo.style.zIndex = 5;
    goodsMoreInfo.style.opacity = 1;
    switch (productName) {
      case 'PROF-DZ':
        currentProduct = 0;
        break;
      case 'UN-DZ':
        currentProduct = 1;
        break;
      case 'Diona Antibac':
        currentProduct = 2;
        break;
      case 'Гель для рук спиртовой':
        currentProduct = 3;
        fullGoodsInfo[currentProduct].style.zIndex = '5'; */
        break;
      case 'Гель для рук':
        currentProduct = 4;
        break;
      case 'Средство для рук':
        currentProduct = 5;
        break;
      case 'Средство для рук спиртовое':
        currentProduct = 6;
        break;
      case 'Спрей для рук спиртовой':
        currentProduct = 7;
        break;
    }
    showFullGoodsInfo(currentProduct);
    const volumes = [...fullGoodsInfo[currentProduct].firstElementChild.nextElementSibling.lastElementChild.lastElementChild.previousElementSibling.firstElementChild.children];
    const imgs = [...fullGoodsInfo[currentProduct].firstElementChild.nextElementSibling.firstElementChild.children];
    const prices = [...fullGoodsInfo[currentProduct].firstElementChild.nextElementSibling.lastElementChild.lastElementChild.previousElementSibling.lastElementChild.children];
    volumes.forEach(vol => {
      vol.classList.remove('volume-chosen');
    });
    imgs.forEach(img => {
      img.style.opacity = '0';
    });
    prices.forEach(price => {
      price.style.opacity = '0';
    });
    switch (chosenVolume) {
      case 0:
        fullGoodsInfo[currentProduct].firstElementChild.nextElementSibling.firstElementChild.firstElementChild.style.opacity = '1';
        volumes[0].classList.add('volume-chosen');
        imgs[0].style.opacity = '1';
        prices[0].style.opacity = '1';
        break;
      case 5:
        fullGoodsInfo[currentProduct].firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling.style.opacity = '1';
        volumes[1].classList.add('volume-chosen');
        imgs[1].style.opacity = '1';
        prices[1].style.opacity = '1';
        break;
    }
  });
});

closeGoodsInfoBtn.forEach((closeGoodsInfo) => {
  closeGoodsInfo.addEventListener('click', () => {
    closeGoodsMoreInfo();
  });
  closeGoodsInfo.addEventListener('mouseover', () => {
    closeGoodsInfo.style.background = 'url(img/icon/close-btn-hover.svg) no-repeat';
    if (screen.width > 530) {
      closeGoodsInfo.style.backgroundSize = '26.25px';
    } else {
      closeGoodsInfo.style.backgroundSize = '20.62px';
    }
  });
  closeGoodsInfo.addEventListener('mouseout', () => {
    closeGoodsInfo.style.background = 'url(img/icon/close-btn.svg) no-repeat';
    if (screen.width > 530) {
      closeGoodsInfo.style.backgroundSize = '26.25px';
    } else {
      closeGoodsInfo.style.backgroundSize = '20.62px';
    }
  });
});

chooseVolumeAreas.forEach(chooseVolume => {
  const volumeBtns = [...chooseVolume.children];
  volumeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      let volumeImgs = [];
      let volumePrices = [];
      if (btn.parentNode.parentNode.parentNode.classList.contains('add-to-cart')) {
        volumeImgs = [...btn.parentNode.parentNode.parentNode.previousElementSibling.children];
        volumePrices = [...btn.parentNode.nextElementSibling.children];
      }
      if (btn.parentNode.parentNode.classList.contains('product')) {
        volumeImgs = [...btn.parentNode.previousElementSibling.children];
      }
      volumeBtns.forEach(volBtn => {
        volBtn.classList.remove('volume-chosen');
      });
      volumeImgs.forEach(volImg => {
        volImg.style.opacity = '0';
      });
      volumePrices.forEach(volPrice => {
        volPrice.style.opacity = '0';
        volPrice.classList.remove('chosen-product-price');
      });
      btn.classList.add('volume-chosen');
      switch (btn.textContent) {
        case '0,4 л':
        case '0,5 л':
        case '0,8 л':
          volumeImgs[0].style.opacity = '1';
          if (volumePrices.length) {
            volumePrices[0].style.opacity = '1';
            volumePrices[0].classList.add('chosen-product-price');
          }
          break;
        case '5 л':
          volumeImgs[1].style.opacity = '1';
          if (volumePrices.length) {
            volumePrices[1].style.opacity = '1';
            volumePrices[1].classList.add('chosen-product-price');
          }
          break;
        case '5 л ПЭТ':
          volumeImgs[2].style.opacity = '1';
          volumePrices[2].style.opacity = '1';
          volumePrices[2].classList.add('chosen-product-price');
          break;
      }
    });
  });
});

moreGoodsBtn.forEach((moreGoods) => {
  moreGoods.addEventListener('click', () => {
    goodsCounter[currentProduct].textContent =
      Number(goodsCounter[currentProduct].textContent) + 1;
    if (Number(goodsCounter[currentProduct].textContent) === 2) {
      lessGoodsBtn[currentProduct].setAttribute('src', 'img/icon/minus-small.png');
      lessGoodsBtn[currentProduct].style.cursor = 'pointer';
    }
  });
});

lessGoodsBtn.forEach((lessGoods) => {
  lessGoods.addEventListener('click', () => {
    if (Number(goodsCounter[currentProduct].textContent) > 1) {
      goodsCounter[currentProduct].textContent =
        Number(goodsCounter[currentProduct].textContent) - 1;
      if (Number(goodsCounter[currentProduct].textContent) === 1) {
        lessGoods.setAttribute('src', 'img/icon/minus-small-disabled.png');
        lessGoods.style.cursor = 'default';
      }
    } else {
      lessGoods.setAttribute('src', 'img/icon/minus-small-disabled.png');
      lessGoods.style.cursor = 'default';
    }
  });
  lessGoods.addEventListener('mouseover', () => {
    if (Number(goodsCounter[currentProduct].textContent) > 1) {
      lessGoodsBtn[currentProduct].style.background = '#e7e7ff';
    }
  });
  lessGoods.addEventListener('mouseout', () => {
    lessGoodsBtn[currentProduct].style.background = '#F3F3FF';
  });
});

addGoodsBtn.forEach((addGoods) => {
  addGoods.addEventListener('click', () => {
    const currentProductName = fullGoodsInfo[currentProduct].querySelector(
      '.add-to-cart',
    ).firstElementChild.textContent;
    const currentProductDescription = fullGoodsInfo[
      currentProduct
    ].querySelector('.add-to-cart').firstElementChild.nextElementSibling
      .textContent;
    const currentProductPrice = [...fullGoodsInfo[currentProduct].querySelector(
      '.volume-and-price',
    ).lastElementChild.children].find((price) => price.classList.contains('chosen-product-price')).textContent;
    const currentProductVolume = [
      ...fullGoodsInfo[currentProduct].querySelector('.choose-volume').children,
    ].find((vol) => vol.classList.contains('volume-chosen')).textContent;
    const currentProductNumber = goodsCounter[currentProduct].textContent;
    let currentProductImg = '';
    switch (currentProductName + ' ' + currentProductVolume) {
      case 'PROF-DZ 0,5 л':
        currentProductImg = 'img/goods/backet-img/prof-dz.png';
        break;
      case 'PROF-DZ 5 л':
        currentProductImg = 'img/goods/backet-img/prof-dz-big.png';
        break;
      case 'UN-DZ 0,5 л':
        currentProductImg = 'img/goods/backet-img/un-dz.png';
        break;
      case 'UN-DZ 5 л':
        currentProductImg = 'img/goods/backet-img/un-dz-big.png';
        break;
      case 'Diona Antibac 0,8 л':
        currentProductImg = 'img/goods/backet-img/diona-antibac.png';
        break;
      case 'Diona Antibac 5 л':
        currentProductImg = 'img/goods/backet-img/diona-antibac-big.png';
        break;
      case 'Diona Antibac 5 л ПЭТ':
        currentProductImg = 'img/goods/backet-img/diona-antibac-big-plastic.png';
        break;
      case 'Гель для рук спиртовой 0,8 л':
        currentProductImg = 'img/goods/backet-img/gel-blue.png';
        break;
      case 'Гель для рук спиртовой 5 л':
        currentProductImg = 'img/goods/backet-img/gel-blue-big.png';
        break;
      case 'Гель для рук 0,8 л':
        currentProductImg = 'img/goods/backet-img/gel-green.png';
        break;
      case 'Гель для рук 5 л':
        currentProductImg = 'img/goods/backet-img/gel-green-big.png';
        break;
      case 'Средство для рук 0,8 л':
        currentProductImg = 'img/goods/backet-img/agent-yellow.png';
        break;
      case 'Средство для рук 5 л':
        currentProductImg = 'img/goods/backet-img/agent-yellow-big.png';
        break;
      case 'Средство для рук спиртовое 0,8 л':
        currentProductImg = 'img/goods/backet-img/agent-pink.png';
        break;
      case 'Средство для рук спиртовое 5 л':
        currentProductImg = 'img/goods/backet-img/agent-pink-big.png';
        break;
      case 'Спрей для рук спиртовой 0,4 л':
        currentProductImg = 'img/goods/backet-img/spray.png';
        break;
    }
    if (goodsInCart[currentProductName + currentProductVolume]) {
      goodsInCart[currentProductName + currentProductVolume].number =
        Number(goodsInCart[currentProductName + currentProductVolume].number) +
        Number(currentProductNumber);
    } else {
      goodsInCart[currentProductName + currentProductVolume] = {
        img: currentProductImg,
        name: currentProductName,
        shortDescription: currentProductDescription,
        volume: currentProductVolume,
        price: currentProductPrice,
        number: currentProductNumber,
      };
    }
    setPushcartCounter();
    localStorage.setItem('order', JSON.stringify(goodsInCart));
    if (Object.keys(goodsInCart).length > 3) {
      tableScrollbar = OverlayScrollbars(document.querySelector('.table-wrapper'), scrollbarOptions);
      tableScrollbar.options({scrollbars : {autoHide: "never"}});
      $(".table").floatThead();
    }
  });
});

goodsInfo.forEach((info) => {
  const infoBar = info.querySelector('.info-bar');
  const goodsInfoP = [...info.querySelector('.info-bar').children];
  const infoDetailsP = [...info.querySelector('.info-details').children];
  infoBar.addEventListener('click', (event) => {
    if(event.target.nodeName === 'P') {
      goodsInfoP.forEach((p) => {
        p.classList.remove('active-info');
      });
      infoDetailsP.forEach((h) => {
        h.style.opacity = '0';
      });
      event.target.classList.add('active-info');
      switch (event.target.textContent) {
        case 'Описание':
          infoDetailsP[0].style.opacity = '1';
          break;
        case 'Технические характеристики':
          infoDetailsP[1].style.opacity = '1';
          break;
        case 'Способ применения':
          infoDetailsP[2].style.opacity = '1';
          break;
      }
    }
  });
});

mobileProductInfo.forEach((mobileInfo) => {
  const mobileInfoBtns = [...mobileInfo.children].filter(child => child.nodeName === 'P');
  const mobileInfoTexts = [...mobileInfo.children].filter(child => child.nodeName === 'DIV');
  mobileInfoBtns.forEach(infoBtn => {
    infoBtn.addEventListener('click', (event) => {
      switch (event.target.textContent) {
        case 'Описание':
          toggleMobileProductInfo(mobileInfoBtns, mobileInfoTexts, 0, event);
          break;
        case 'Технические характеристики':
          toggleMobileProductInfo(mobileInfoBtns, mobileInfoTexts, 1, event);
          break;
        case 'Способ применения':
          toggleMobileProductInfo(mobileInfoBtns, mobileInfoTexts, 2, event);
          break;
      }
    });
  });
});

showPreviousGoodsBtn.addEventListener('click', () => {
  showPreviousProduct();
});

showNextGoodsBtn.addEventListener('click', () => {
  showNextProduct();
});

customerBasket.addEventListener('click', (event) => {
  if (event.target.classList.contains('customer-basket')) {
    closeCustomerBasket();
  }
});

closePushcartBtn.addEventListener('click', () => {
  closeCustomerBasket();
});

closePushcartBtn.addEventListener('mouseover', () => {
  closePushcartBtn.style.background = 'url(img/icon/close-btn-hover.svg) no-repeat';
  if (screen.width > 530) {
    closePushcartBtn.style.backgroundSize = '26.25px';
  } else {
    closePushcartBtn.style.backgroundSize = '20.62px';
  }
});

closePushcartBtn.addEventListener('mouseout', () => {
  closePushcartBtn.style.background = 'url(img/icon/close-btn.svg) no-repeat';
  if (screen.width > 530) {
    closePushcartBtn.style.backgroundSize = '26.25px';
  } else {
    closePushcartBtn.style.backgroundSize = '20.62px';
  }
});

nextOrderStepBtn.addEventListener('click', () => {
  orderArea.style.opacity = '0';
  orderArea.style.zIndex = '5';
  customerContacts.style.opacity = '1';
  customerContacts.style.zIndex = '7';
});

goBackBtn.addEventListener('click', () => {
  orderArea.style.opacity = '1';
  orderArea.style.zIndex = '7';
  customerContacts.style.opacity = '0';
  customerContacts.style.zIndex = '5';
});

applyBtn.addEventListener('click', (event) => {
  event.preventDefault();
  if (nameOrderInput.value === '') {
    validationBeforeSending(nameOrderInput, 0);
  }
  if (emailOrderInput.value === '') {
    validationBeforeSending(emailOrderInput, 1);
  }
  if (phoneOrderInput.value === '') {
    validationBeforeSending(phoneOrderInput, 2);
  }
  if (isOrderFormValid()) {
    let order = '';
    for (const product in goodsInCart) {
      order +=
        goodsInCart[product].name +
        ', ' +
        goodsInCart[product].volume +
        ', <strong> ' +
        goodsInCart[product].number +
        ' шт.</strong><br />';
    };
    Email.send({
      SecureToken: 'd5c70b6c-4273-4724-9d0c-14bc43f43538',
      To: 'laetitia-caritas@mail.ru',
      From: emailOrderInput.value,
      Subject: 'Заказ',
      Body:
        '<strong>Имя:</strong> ' +
        nameOrderInput.value +
        '<br /> <strong>Номер телефона:</strong> ' +
        phoneOrderInput.value +
        '<br /> <strong>E-mail:</strong> ' +
        emailOrderInput.value +
        '<br /> <strong>Сообщение:</strong> ' +
        messageOrderInput.value +
        '<br /> <strong>Мой заказ:</strong> ' +
        order +
        '<br /> <strong>Сумма заказа:</strong> ' +
        totalBill.textContent,
    }).then(function() {
      formSendDiv.style.zIndex = 10;
      formSendDiv.style.opacity = 1;
      goodsInCart = {};
      localStorage.removeItem('order');
      setPushcartCounter();
      forms[0].reset();
    });
  }
});

pushcarts.forEach((market) => {
  market.addEventListener('click', () => {
    if (isMenuOpened) {
      closeMobileMenu();
    }
    customerBasket.style.zIndex = '7';
    customerBasket.style.opacity = '1';
    orderArea.style.zIndex = '7';
    renderGoods();
  });
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('order', JSON.stringify(goodsInCart));
});

function showMoveUpArrow() {
  const positionOnPage = overwrittenScrollbar.scroll().position.y;
  if (positionOnPage >= 500) {
    moveUpArrow.style.opacity = '1';
  } else {
    moveUpArrow.style.opacity = '0';
  }
}

function renderGoods() {
  goodsTableBody.innerHTML = '';
  for (const goods in goodsInCart) {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');
    const td5 = document.createElement('td');
    const td6 = document.createElement('td');
    const productImg = document.createElement('img');
    const name = document.createElement('p');
    const description = document.createElement('p');
    const volume = document.createElement('p');
    const numOfGoodsDiv = document.createElement('div');
    const moreLessGoodsDiv = document.createElement('div');
    const lessBtn = document.createElement('img');
    const spanLessMore = document.createElement('span');
    const moreBtn = document.createElement('img');
    const trashImg = document.createElement('div');
    td1.classList.add('col1');
    td2.classList.add('col2');
    td3.classList.add('col3');
    td4.classList.add('col4');
    td5.classList.add('col5');
    td5.classList.add('bill');
    td6.classList.add('col6');
    numOfGoodsDiv.classList.add('number-of-goods');
    moreLessGoodsDiv.classList.add('more-less');
    lessBtn.classList.add('less-of-goods');
    spanLessMore.classList.add('counter');
    moreBtn.classList.add('more-of-goods');
    trashImg.classList.add('delete-goods');
    productImg.src = goodsInCart[goods].img;
    productImg.alt = goodsInCart[goods].name;
    name.textContent = goodsInCart[goods].name;
    description.textContent = goodsInCart[goods].shortDescription;
    volume.textContent = goodsInCart[goods].volume;
    td3.textContent = goodsInCart[goods].price;
    if (Number(goodsInCart[goods].number) === 1) {
      lessBtn.src = 'img/icon/minus-small-disabled.png';
    } else {
      lessBtn.src = 'img/icon/minus-small.png';
      lessBtn.style.cursor = 'pointer';
    }
    lessBtn.alt = 'Уменьшить количество товара';
    spanLessMore.textContent = goodsInCart[goods].number;
    moreBtn.src = 'img/icon/plus-small.png';
    moreBtn.alt = 'Увеличить количество товара';
    countProductBill(goods, td5);
    trashImg.src = 'img/icon/trash.svg';
    trashImg.alt = 'Удалить товар';
    trashImg.style.cursor = 'pointer';
    lessBtnOrderActions(lessBtn, spanLessMore, td5);
    moreBtnOrderActions(lessBtn, spanLessMore, moreBtn, td5);
    deleteGoodsActions(trashImg);
    td1.append(productImg);
    td2.append(name, description, volume);
    moreLessGoodsDiv.append(lessBtn, spanLessMore, moreBtn);
    numOfGoodsDiv.append(moreLessGoodsDiv);
    td4.append(moreLessGoodsDiv);
    td6.append(trashImg);
    tr.append(td1, td2, td3, td4, td5, td6);
    goodsTableBody.append(tr);
  }
  if (!Object.keys(goodsInCart).length) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const emptyBasketImg = document.createElement('img');
    const emptyBasketText = document.createElement('p');
    tr.style.borderBottom = 'none';
    td.classList.add('empty-basket-td');
    emptyBasketImg.src = 'img/icon/empty-basket.svg';
    emptyBasketImg.alt = 'В корзине нет товаров';
    emptyBasketText.textContent = 'Ваша корзина пуста';
    td.append(emptyBasketImg, emptyBasketText);
    tr.append(td);
    goodsTableBody.append(tr);
    document.querySelector('.tfoot').style.display = 'none';
    nextOrderStepBtn.style.display = 'none';
  } else {
    countTotalBill();
    document.querySelector('.tfoot').style.display = 'block';
    nextOrderStepBtn.style.display = 'flex';
  }
}

function countTotalBill() {
  if (Object.keys(goodsInCart).length) {
    const col5 = [...document.querySelectorAll('.col5')];
    const billsTDs = col5.slice(1, col5.length - 1);
    const bills = [];
    let dotPosition = '';
    billsTDs.forEach((billTD) => {
      dotPosition = billTD.textContent.indexOf(',', 0);
      const countingPrice =
        billTD.textContent.slice(0, dotPosition) +
        '.' +
        billTD.textContent.slice(dotPosition + 1, -4);
      bills.push(Number(countingPrice));
    });
    const amount = String(
      Math.round(bills.reduce((sum, current) => {return sum + current}, 0) * 100) / 100);
    dotPosition = amount.indexOf('.', 0);
    if (dotPosition === -1) {
      dotPosition = amount.length;
    }
    let amountPrice = '';
    if (amount.slice(dotPosition + 1).length === 2) {
      amountPrice =
        amount.slice(0, dotPosition) +
        ',' +
        amount.slice(dotPosition + 1) +
        ' BYN';
    } else if (amount.slice(dotPosition + 1).length === 1) {
      amountPrice =
        amount.slice(0, dotPosition) +
        ',' +
        amount.slice(dotPosition + 1) +
        '0 BYN';
    } else {
      amountPrice =
        amount.slice(0, dotPosition) +
        ',' +
        amount.slice(dotPosition + 1) +
        '00 BYN';
    }
    totalBill.textContent = amountPrice;
  } else {
    totalBill.textContent = '0 BYN';
  }
}

function lessBtnOrderActions(lessBtn, spanLessMore, td5) {
  lessBtn.addEventListener('click', (event) => {
    goodsInCart = JSON.parse(localStorage.getItem('order'));
    if (Number(spanLessMore.textContent) > 1) {
      spanLessMore.textContent = Number(spanLessMore.textContent) - 1;
      if (Number(spanLessMore.textContent) === 1) {
        lessBtn.setAttribute('src', 'img/icon/minus-small-disabled.png');
        lessBtn.style.cursor = 'default';
      }
    } else {
      lessBtn.setAttribute('src', 'img/icon/minus-small-disabled.png');
      lessBtn.style.cursor = 'default';
    }
    goodsInCart[getNameCurrentOrderProduct(event)].number = Number(
      spanLessMore.textContent,
    );
    countProductBill(getNameCurrentOrderProduct(event), td5);
    countTotalBill();
    setPushcartCounter();
    localStorage.setItem('order', JSON.stringify(goodsInCart));
  });
  lessBtn.addEventListener('mouseover', () => {
    if (Number(spanLessMore.textContent) > 1) {
      lessBtn.style.background = '#e7e7ff';
    }
  });
  lessBtn.addEventListener('mouseout', () => {
    lessBtn.style.background = '#F3F3FF';
  });
}

function moreBtnOrderActions(lessBtn, spanLessMore, moreBtn, td5) {
  moreBtn.addEventListener('click', (event) => {
    goodsInCart = JSON.parse(localStorage.getItem('order'));
    spanLessMore.textContent = Number(spanLessMore.textContent) + 1;
    if (Number(spanLessMore.textContent) === 2) {
      lessBtn.setAttribute('src', 'img/icon/minus-small.png');
      lessBtn.style.cursor = 'pointer';
    }
    goodsInCart[getNameCurrentOrderProduct(event)].number = Number(
      spanLessMore.textContent,
    );
    countProductBill(getNameCurrentOrderProduct(event), td5);
    countTotalBill();
    setPushcartCounter();
    localStorage.setItem('order', JSON.stringify(goodsInCart));
  });
}

function countProductBill(currentProductName, td5) {
  let dotPosition = goodsInCart[currentProductName].price.indexOf(',', 0);
  const countingPrice =
    goodsInCart[currentProductName].price.slice(0, dotPosition) +
    '.' +
    goodsInCart[currentProductName].price.slice(dotPosition + 1, -4);
  let price = String(
    Math.round(
      Number(countingPrice) * goodsInCart[currentProductName].number * 100) / 100);
  dotPosition = price.indexOf('.', 0);
  if (dotPosition === -1) {
    dotPosition = price.length;
  }
  let amountPrice = '';
  if (price.slice(dotPosition + 1).length === 2) {
    amountPrice =
      price.slice(0, dotPosition) + ',' + price.slice(dotPosition + 1) + ' BYN';
  } else if (price.slice(dotPosition + 1).length === 1) {
    amountPrice =
      price.slice(0, dotPosition) +
      ',' +
      price.slice(dotPosition + 1) +
      '0 BYN';
  } else {
    amountPrice =
      price.slice(0, dotPosition) +
      ',' +
      price.slice(dotPosition + 1) +
      '00 BYN';
  }
  td5.textContent = amountPrice;
}

function deleteGoodsActions(trashImg) {
  trashImg.addEventListener('mouseover', () => {
    trashImg.style.background = 'url(img/icon/trash-active.svg) no-repeat';
  });
  trashImg.addEventListener('mouseout', () => {
    trashImg.style.background = 'url(img/icon/trash.svg) no-repeat';
  });
  trashImg.addEventListener('click', (event) => {
    goodsInCart = JSON.parse(localStorage.getItem('order'));
    event.target.closest('tr').remove();
    delete goodsInCart[getNameCurrentOrderProduct(event)];
    setPushcartCounter();
    localStorage.setItem('order', JSON.stringify(goodsInCart));
    renderGoods();
    if (Object.keys(goodsInCart).length <= 3) {
      tableScrollbar.destroy();
    }
  });
}

function showFullGoodsInfo(current) {
  let currentCounter = current;
  for (let i = 0; i <  8; i++) {
    switch (currentCounter - 3) {
      case -3:
        fullGoodsInfo[fullGoodsInfo.length - 3].style.left = (-3 + i) * fullInfoWidth + 'px';
        break;
      case -2:
        fullGoodsInfo[fullGoodsInfo.length - 2].style.left = (-3 + i) * fullInfoWidth + 'px';
        break;
      case -1:
        fullGoodsInfo[fullGoodsInfo.length - 1].style.left = (-3 + i) * fullInfoWidth + 'px';
        break;
      default:
        if (currentCounter - 3 === 8) {
          currentCounter = 3;
        }
        fullGoodsInfo[currentCounter - 3].style.left = (-3 + i) * fullInfoWidth + 'px';
        break;
    }
    currentCounter++;
  }
}

function toggleMobileProductInfo(btnsArray, textsArray, textNumber, event) {
  if (btnsArray[textNumber].classList.contains('active-info')) {
    hideMobileProductInfo(btnsArray, textsArray);
  } else {
    hideMobileProductInfo(btnsArray, textsArray);
    showMobileProductInfo(textsArray[textNumber], event);
  }
}

function hideMobileProductInfo(btnsArray, textsArray) {
  btnsArray.forEach(btn => {
    btn.classList.remove('active-info');
  });
  textsArray.forEach(text => {
    text.style.opacity = '0';
    text.style.height = '0';
    text.style.visibility = 'hidden';
    text.style.marginBottom = '0';
    if (text.children.length) {
      [...text.children].forEach(child => {
        child.style.height = '0';
        child.style.opacity = '0';
        child.style.visibility = 'hidden';
      });
    }
  });
}

function showMobileProductInfo(element, event) {
  element.style.opacity = '1';
  element.style.height = 'auto';
  element.style.visibility = 'visible';
  if (screen.width <= 530) {
    element.style.marginBottom = '10px';
  } else if (screen.width <= 960) {
    element.style.marginBottom = '18px';
  }
  if (element.children.length) {
    [...element.children].forEach(child => {
      child.style.height = 'auto';
      child.style.opacity = '1';
      child.style.visibility = 'visible';
    });
  }
  event.target.classList.add('active-info');
}

function closeGoodsMoreInfo() {
  goodsMoreInfo.style.transition = 'all 0.1s ease-in';
  goodsMoreInfo.style.zIndex = '-5';
  goodsMoreInfo.style.opacity = '0';
}

function closeCustomerBasket() {
  customerBasket.style.zIndex = '-5';
  customerBasket.style.opacity = '0';
  orderArea.style.opacity = '1';
  orderArea.style.zIndex = '-5';
  customerContacts.style.opacity = '0';
  customerContacts.style.zIndex = '-5';
}

function closeSendNotification() {
  formSendDiv.style.zIndex = '-5';
  formSendDiv.style.opacity = '0';
  closeCustomerBasket();
  closeGoodsMoreInfo();
  setPushcartCounter();
  forms.forEach(form => {
    form.reset();
  });
}

function closeMobileMenu() {
  isMenuOpened = false;
  menuBtn.style.background = 'url(img/icon/menu-btn.svg) no-repeat';
  menuBtn.style.backgroundSize = '100%';
  mobileMenuSection.style.opacity = '0';
  mobileMenuSection.style.zIndex = '-5';
}

function getNameCurrentOrderProduct(event) {
  const removingProductTR = event.target.closest('tr');
  const removingName =
    removingProductTR.firstElementChild.nextElementSibling.firstElementChild
      .textContent;
  let removingVolume = 0;
  if (
    parseFloat(
      removingProductTR.firstElementChild.nextElementSibling.lastElementChild
        .textContent,
    ) === 0
  ) {
    switch (removingName) {
      case 'Спрей для рук спиртовой':
        removingVolume = '0,4 л';
        break;
      case 'PROF-DZ':
      case 'UN-DZ':
        removingVolume = '0,5 л';
        break;
      default:
        removingVolume = '0,8 л';
        break;
    }
  } else {
    removingVolume = removingProductTR.firstElementChild.nextElementSibling.lastElementChild.textContent;
  }
  const removingFieldName = removingName + removingVolume;
  return removingFieldName;
}

function showPreviousProduct() {
  fullGoodsInfo.forEach(info => {
    info.style.left = parseInt(info.style.left) + fullInfoWidth + 'px';
    if (parseInt(info.style.left) > fullInfoWidth * 4) {
      info.style.left = fullInfoWidth * (-3) + 'px';
    }
  });
  if (currentProduct !== 0) {
    currentProduct = currentProduct - 1;
  } else {
    currentProduct = 7;
  }
}

function showNextProduct() {
  fullGoodsInfo.forEach(info => {
    info.style.left = parseInt(info.style.left) - fullInfoWidth + 'px';
    if (parseInt(info.style.left) < fullInfoWidth * (-3)) {
      info.style.left = fullInfoWidth * 4 + 'px';
    }
  });
  if (currentProduct !== 7) {
    currentProduct = currentProduct + 1;
  } else {
    currentProduct = 0;
  }
}

function validationBeforeSending(element, index) {
  element.style.color = '#BB5A5A';
  element.style.borderColor = '#BB5A5A';
  needToFillDivs[index].style.opacity = '1';
}

function validationBorder(event, condition, index) {
  if (condition) {
    event.target.style.color = '#BB5A5A';
    event.target.style.borderColor = '#BB5A5A';
    needToFillDivs[index].style.opacity = '1';
  } else {
    event.target.style.color = '#000000';
    event.target.style.borderColor = '#000000';
    needToFillDivs[index].style.opacity = '0';
  }
}

function validationBorderOrderForm(event, condition, index) {
  if (condition) {
    event.target.style.color = '#BB5A5A';
    event.target.style.borderColor = '#BB5A5A';
    needToFillDivs[index].style.opacity = '1';
  } else {
    event.target.style.color = '#000000';
    event.target.style.borderColor = '#000000';
    needToFillDivs[index].style.opacity = '0';
  }
}

function isFormValid() {
  const borderCondition = nameInput.style.borderColor === 'rgb(0, 0, 0)' &&
    phoneInput.style.borderColor === 'rgb(0, 0, 0)' &&
    emailInput.style.borderColor === 'rgb(0, 0, 0)';
    const valueCondition = nameInput.value !== '' && phoneInput.value !== '' && emailInput.value !== '';
  if (borderCondition && valueCondition) {
    return true;
  } else {
    return false;
  }
}

function isOrderFormValid() {
  const borderCondition = nameOrderInput.style.borderColor === 'rgb(0, 0, 0)' &&
    phoneOrderInput.style.borderColor === 'rgb(0, 0, 0)' &&
    emailOrderInput.style.borderColor === 'rgb(0, 0, 0)';
  const valueCondition = nameOrderInput.value !== '' && phoneOrderInput.value !== '' &&
    emailOrderInput.value !== '';
  if (borderCondition && valueCondition) {
    return true;
  } else {
    return false;
  }
}

function showInputLabel(event) {
  formSpanArray.forEach((span) => {
    span.style.opacity = '0';
  });
  if (event.target.tagName === 'INPUT' && event.target.type !== 'checkbox') {
    const spanLabel = event.target.previousElementSibling;
    spanLabel.style.opacity = '1';
  }
}

function showOrderInputLabel(event) {
  formOrderSpanArray.forEach((span) => {
    span.style.opacity = '0';
  });
  if (event.target.tagName === 'INPUT' && event.target.type !== 'checkbox') {
    const spanLabel = event.target.previousElementSibling;
    spanLabel.style.opacity = '1';
  }
}

function getPushcartCounterPlaces() {
  pushcarts.forEach((pushcart) => {
    pushcartCounter.push(pushcart.lastElementChild);
  });
}

function getGoodsNumberInCart() {
  goodsNumberInCart = 0;
  for (const goods in goodsInCart) {
    goodsNumberInCart += Number(goodsInCart[goods].number);
  }
  return goodsNumberInCart;
}

function setPushcartCounter() {
  const allGoodsNumber = getGoodsNumberInCart();
  if (allGoodsNumber !== 0) {
    pushcartCounter.forEach((counter) => {
      counter.textContent = allGoodsNumber;
      counter.style.background = '#ffc241 center';
    });
  } else {
    pushcartCounter.forEach((counter) => {
      counter.textContent = '';
      counter.style.background = 'none';
    });
  }
}

function showAnimation() {
  const imagePos = $(this).offset().top;
  const topOfWindow = $(window).scrollTop();
  const heightOfWindow = $(window).height();
  if (imagePos < topOfWindow + heightOfWindow - 200) {
    $(this).addClass('animate__slideInUp');
    $(this).removeClass('invisible');
  }
}

function animating() {
  $('.choose-us').children('h1, h2').each(showAnimation);
  $('.advantages').children().each(showAnimation);
  $('#production').children('h1').each(showAnimation);
  $('.product').each(showAnimation);
  $('#about-us .container').children('h1, h2').each(showAnimation);
  $('.mission').each(showAnimation);
  $('.desinfection .container').children('h1').each(showAnimation);
  $('.instructions').each(showAnimation);
  $('.our-data').children().each(showAnimation);
  $('.map-link').each(showAnimation);
};

getPushcartCounterPlaces();
setPushcartCounter();

setInterval(() => {
  goodsInCart = JSON.parse(localStorage.getItem('order')) || {};
  setPushcartCounter();
  renderGoods();
}, 1000);
