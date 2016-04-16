// importing jquery to my project
import $ from 'jquery';
// importing etsydata from .js doc in js/folder
import etsydata from './etsydata';
// let products equal etsy results array
var products = etsydata.results;

// logs products array to the screen
console.log(products);


products.forEach ( function ( product ) {
  // creating variables for each piece of data we are pulling from api
  // image variable imgsrc
  var imgsrc = product.Images[0].url_570xN;
  console.log(imgsrc);
  // product name variables
  var product_name = product.title.substring(0, 25);
  console.log(product_name);
  // product seller name
  var product_seller = product.Shop.shop_name;
  console.log(product_seller);
  // product price
  var product_price =
  console.log(product_price);

  var card = `
  <div class="card">
    <div class="product_image" style="background-image: url('${imgsrc}'); background-size: auto 100%; background-position: center; background-repeat: no-repeat;">
    <button class="ad_button">Ad</button>
    </div>
    <div class="product_text_area">
      <span class="product_title">${product_name}...</span>
      <br>
      <span class="product_seller">Slangin Bags</span>
      <span class="product_price">$200</span>
    </div>
  </div>
  `;

  $('.product_column').append(card);

});

// productListings.length



    // <img src="${imgsrc}" alt="" class="product_image"/>
