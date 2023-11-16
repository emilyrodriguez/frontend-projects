import products from "./products";

//store the name of the product the user is trying to find
const productName: string = "fanny pack";

//find matching product in product list
const product = products.filter((product) => product.name === productName)[0];

console.log(product);

//Check if product is on pre-order, if so tell user a message will be sent when order is ready
if (product.preOrder === "true") {
	console.log("We'll message you when your product is on the way!");
}

//Declare variables to create receipt
let shipping: number;
let taxPercent: number;
let taxTotal: number;
let total: number;
const shippingAddress: string = "456 Park Avenue, New York, NY 10022";

//Give user free shipping if order is over $25
if (Number(product.price) >= 25) {
	shipping = 0;
	console.log("You've earned free shipping!");
} else {
	shipping = 5;
	console.log("Only orders over $25 ship for free.");
}

//Check if shipping address is in New York or not then set the appropriate taxPercent
if (shippingAddress.match("New York")) {
	taxPercent = 0.1;
  } else {
	taxPercent = 0.05;
  }

// Calculate total
taxTotal = Number(product.price) * taxPercent;
total = Number(product.price) + taxTotal + shipping;


//Generate receipt
console.log(`
Product:  ${product.name}
Address:  ${shippingAddress}
Price:    $${product.price}
Tax:      $${taxTotal.toFixed(2)}
Shipping: $${shipping.toFixed(2)}
Total:    $${total.toFixed(2)}
`);
