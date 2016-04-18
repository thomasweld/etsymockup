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
  var product_name = product.title.substring(0, 22);
  console.log(product_name);
  // product seller name
  var product_seller = product.Shop.shop_name;
  console.log(product_seller);
  // product price
  var product_price = product.price;
  console.log(product_price);
  // product url
  var product_url = product.url;
  console.log(product_url);

  var card = `
  <a href="${product_url}">
    <div class="card">
      <div class="product_image" style="background-image: url('${imgsrc}'); background-size: cover; background-position: center; background-repeat: no-repeat;">
      <button class="ad_button">Ad</button>
      </div>
      <div class="product_text_area">
        <span class="product_title">${product_name}...</span>
        <br>
        <span class="product_seller">${product_seller}</span>
        <span class="product_price">$${product_price}</span>
      </div>
    </div>
  </a>
  `;

  $('.product_column').append(card);

});


function add_results() {

  var righ_side_title = `
    <a href="#">All categories</a> > "whiskey" (${products.length})
  `;
  $('.right_sidebar_title').append(righ_side_title);
};

add_results();
