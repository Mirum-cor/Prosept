const formOrderSection = document.querySelector('.customer-contacts');
const formOrderSpanArray = [...formOrderSection.getElementsByTagName('span')];
const formOrderInputArray = [
  ...formOrderSection.getElementsByTagName('input'),
].slice(0, 4);

const pushcartCounter = document.querySelector('.pushcart').lastElementChild;
const formSendDiv = document.querySelector('.form-send');
const goodsTableBody = document.querySelector('#table-body');
const totalBill = document.querySelector('.total-bill');

const closeNotificationBtn = document.querySelector('.close-notification');
const moveUpArrow = document.querySelector('.up-arrow');
const supermarket = document.querySelector('.supermarket');
const pushcart = document.querySelector('.pushcart');
const nextOrderStepBtn = document.querySelector('.next-order-step');
const goBackBtn = document.querySelector('.go-back');
const applyBtn = document.querySelector('.apply');
const closePushcartBtn = document.querySelector('.close-pushcart');
const customerBasket = document.querySelector('.customer-basket');
const orderArea = document.querySelector('.order-area');
const customerContacts = document.querySelector('.customer-contacts');

const nameOrderInput = document.querySelector('#name-order');
const phoneOrderInput = document.querySelector('#phone-order');
const emailOrderInput = document.querySelector('#email-order');
const messageOrderInput = document.querySelector('#message-order');
const needToFillDivs = [...document.querySelectorAll('.need-to-fill')];

const mobileMenuSection = document.querySelector('.mobile-menu');
const menuLinks = [...document.querySelectorAll('.menu-item')];
const menuBtn = document.querySelector('.menu-btn');
let isMenuOpened = false;

let goodsInCart = JSON.parse(localStorage.getItem('order')) || {};
let goodsNumberInCart = 0;

let overwrittenScrollbar = '';
let tableScrollbar = '';
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
      x : "scroll",
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

if (screen.width <= 530) {
  goBackBtn.textContent = 'Вернуться назад';
}

$(function () {
  $('#phone-order').mask('+375 (99) 999 99 99', { placeholder: '*' });
});

document.addEventListener("DOMContentLoaded", () => {
  overwrittenScrollbar = OverlayScrollbars(document.body, scrollbarOptions);
  overwrittenScrollbar.options({ callbacks: {onScrollStart: showMoveUpArrow, onScroll: animating, onScrollStop: showMoveUpArrow} });
  if (Object.keys(goodsInCart).length > 3) {
    tableScrollbar = OverlayScrollbars(document.querySelector('.table-wrapper'), scrollbarOptions);
    tableScrollbar.options({scrollbars : {autoHide: "never"}});
    $(".table").floatThead();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (formSendDiv.style.opacity === '1') {
      closeSendFormNotification();
      closeCustomerBasket();
    } else if (customerBasket.style.opacity === '1') {
      closeCustomerBasket();
    }
  }
});

menuBtn.addEventListener('click', () => {
  if (!isMenuOpened) {
    menuBtn.style.background = 'url(../img/icon/close-btn.svg) no-repeat';
    menuBtn.style.backgroundSize = '100%';
    mobileMenuSection.style.opacity = '1';
    mobileMenuSection.style.zIndex = '10';
  } else {
    menuBtn.style.background = 'url(../img/icon/menu-btn.svg) no-repeat';
    menuBtn.style.backgroundSize = '100%';
    mobileMenuSection.style.opacity = '0';
    mobileMenuSection.style.zIndex = '-5';
  }
  isMenuOpened = !isMenuOpened;
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

customerBasket.addEventListener('click', (event) => {
  if (event.target.classList.contains('customer-basket')) {
    closeCustomerBasket();
  }
});

formSendDiv.addEventListener('click', (event) => {
  if (event.target.classList.contains('form-send') || event.target.classList.contains('notification')) {
    closeSendFormNotification();
  }
});

moveUpArrow.addEventListener('click', () => {
  overwrittenScrollbar.scroll(0, 500);
});

closePushcartBtn.addEventListener('click', () => {
  closeCustomerBasket();
});

closePushcartBtn.addEventListener('mouseover', () => {
  closePushcartBtn.style.background = 'url(../img/icon/close-btn-hover.svg) no-repeat';
  if (screen.width > 530) {
    closePushcartBtn.style.backgroundSize = '26.25px';
  } else {
    closePushcartBtn.style.backgroundSize = '20.62px';
  }
});

closePushcartBtn.addEventListener('mouseout', () => {
  closePushcartBtn.style.background = 'url(../img/icon/close-btn.svg) no-repeat';
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
      [...document.forms][0].reset();
    });
  }
});

pushcart.addEventListener('click', () => {
  if (isMenuOpened) {
    closeMobileMenu();
  }
  customerBasket.style.zIndex = '7';
  customerBasket.style.opacity = '1';
  orderArea.style.zIndex = '7';
  renderGoods();
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('order', JSON.stringify(goodsInCart));
});

formOrderInputArray.forEach((input) => {
  input.addEventListener('focus', (event) => {
    showOrderInputLabel(event);
  });
});

formOrderSection.addEventListener('click', (event) => {
  showOrderInputLabel(event);
});

closeNotificationBtn.addEventListener('click', () => {
  closeSendFormNotification();
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

nameOrderInput.addEventListener('blur', (event) => {
  if (event.target.value) {
    const condition = event.target.value.length < 2;
    validationBorderOrderForm(event, condition, 0);
    isOrderFormValid();
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

phoneOrderInput.addEventListener('click', () => {
  phoneOrderInput.selectionStart = phoneOrderInput.selectionEnd = 6;
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
    tr.classList.add('tr');
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
    productImg.src = '../' + goodsInCart[goods].img;
    productImg.alt = goodsInCart[goods].name;
    name.textContent = goodsInCart[goods].name;
    description.textContent = goodsInCart[goods].shortDescription;
    volume.textContent = goodsInCart[goods].volume;
    td3.textContent = goodsInCart[goods].price;
    if (Number(goodsInCart[goods].number) === 1) {
      lessBtn.src = '../img/icon/minus-small-disabled.png';
    } else {
      lessBtn.src = '../img/icon/minus-small.png';
      lessBtn.style.cursor = 'pointer';
    }
    lessBtn.alt = 'Уменьшить количество товара';
    spanLessMore.textContent = goodsInCart[goods].number;
    moreBtn.src = '../img/icon/plus-small.png';
    moreBtn.alt = 'Увеличить количество товара';
    countProductBill(goods, td5);
    trashImg.src = '../img/icon/trash.svg';
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
  if (Object.keys(goodsInCart).length > 3) {
    tableScrollbar = OverlayScrollbars(document.querySelector('.table-wrapper'), scrollbarOptions);
    tableScrollbar.options({scrollbars : {autoHide: "never"}});
    $(".table").floatThead();
  }
  countTotalBill();
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
        lessBtn.setAttribute('src', '../img/icon/minus-small-disabled.png');
        lessBtn.style.cursor = 'default';
      }
    } else {
      lessBtn.setAttribute('src', '../img/icon/minus-small-disabled.png');
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
      lessBtn.setAttribute('src', '../img/icon/minus-small.png');
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
    trashImg.style.background = 'url(../img/icon/trash-active.svg) no-repeat';
  });
  trashImg.addEventListener('mouseout', () => {
    trashImg.style.background = 'url(../img/icon/trash.svg) no-repeat';
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

function validationBeforeSending(element, index) {
  element.style.color = '#BB5A5A';
  element.style.borderColor = '#BB5A5A';
  needToFillDivs[index].style.opacity = '1';
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

function showOrderInputLabel(event) {
  formOrderSpanArray.forEach((span) => {
    span.style.opacity = 0;
  });
  if (event.target.tagName === 'INPUT' && event.target.type !== 'checkbox') {
    const spanLabel = event.target.previousElementSibling;
    spanLabel.style.opacity = 1;
  }
}

function closeCustomerBasket() {
  customerBasket.style.zIndex = '-5';
  customerBasket.style.opacity = '0';
  orderArea.style.opacity = '1';
  orderArea.style.zIndex = '-5';
  customerContacts.style.opacity = '0';
  customerContacts.style.zIndex = '-5';
}

function closeSendFormNotification() {
  formSendDiv.style.zIndex = '-5';
  formSendDiv.style.opacity = '0';
  closeCustomerBasket();
  setPushcartCounter();
  [...document.forms][0].reset();
}

function closeMobileMenu() {
  isMenuOpened = false;
  menuBtn.style.background = 'url(../img/icon/menu-btn.svg) no-repeat';
  menuBtn.style.backgroundSize = '100%';
  mobileMenuSection.style.opacity = '0';
  mobileMenuSection.style.zIndex = '-5';
}

function setPushcartCounter() {
  const allGoodsNumber = getGoodsNumberInCart();
  if (allGoodsNumber !== 0) {
    pushcartCounter.style.background = '#ffc241 center';
    pushcartCounter.textContent = allGoodsNumber;
  } else {
    pushcartCounter.style.background = 'none';
    pushcartCounter.textContent = '';
  }
}

function getGoodsNumberInCart() {
  goodsNumberInCart = 0;
  for (const goods in goodsInCart) {
    goodsNumberInCart += Number(goodsInCart[goods].number);
  }
  return goodsNumberInCart;
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
  $('.our-data').children().each(showAnimation);
  $('.map-link').each(showAnimation);
};

getGoodsNumberInCart();
setPushcartCounter();

setInterval(() => {
  goodsInCart = JSON.parse(localStorage.getItem('order')) || {};
  setPushcartCounter();
  renderGoods();
}, 1000);
