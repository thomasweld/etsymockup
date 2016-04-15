// importing jquery to my project
import $ from 'jquery';
// importing etsydata from .js doc in js/folder
import etsydata from './etsydata';
// let products equal etsy results array
var products = etsydata.results;

// console.log(etsydata);

console.log(products);

// console.log(products[0].Images[0]);
//
// console.log(products[0].Images[0].url_570xN);

var imgsrc = '';

products.forEach ( function ( product ) {
  var imgsrc = product.Images[0].url_570xN;
  console.log(imgsrc);

  var card = `
  <div class="card">
    <img src="${imgsrc}" alt="" class="product_image"/>
    <span class="product_name">Product Name</span>
    <br>
    <span class="product_seller">Slangin Bags</span>
    <span class="product_price">$200</span>
  </div>
  `;

  $('.product_column').append(card);

});

// productListings.length
