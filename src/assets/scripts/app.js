import renderHome from "./renderHome";
import renderCart from "./renderCart";
import shopItemsData from "./Data";

let bucket = localStorage.getItem("bucket")
  ? JSON.parse(localStorage.getItem("bucket"))
  : [];

const totalPrice = document.getElementById("totalPrice"),
  cartBadge = document.getElementById("cartBadge");

renderCart(bucket);
renderHome(bucket);

const incrementCartItem = (id) => {
  let isInBucket = bucket.find((x) => x.id == id);
  if (!isInBucket) {
    bucket.push({
      id,
      amount: 1,
    });
  } else isInBucket.amount += 1;

  localStorage.setItem("bucket", JSON.stringify(bucket));
  renderHome(bucket);
  renderCart(bucket);
  updateCartButton();
  updateTotalPrice();
};

const decrementCartItem = (id) => {
  let isInBucket = bucket.find((x) => x.id == id);
  if (isInBucket) {
    isInBucket.amount -= 1;
  } else return;
  if (isInBucket?.amount < 1) {
    bucket = bucket.filter((item) => item.id != id);
  }
  localStorage.setItem("bucket", JSON.stringify(bucket));
  renderHome(bucket);
  renderCart(bucket);
  updateCartButton();
  updateTotalPrice();
};

const updateTotalPrice = () => {
  if (totalPrice)
    totalPrice.textContent = bucket
      .map((bucketItem) => {
        const { id, amount } = bucketItem;
        const items = shopItemsData.find((x) => x.id == id);
        return items.price * amount;
      })
      .reduce((acc, cur) => acc + cur, 0);
};
updateTotalPrice();

const removeProductFromCart = (id) => {
  bucket = bucket.filter((x) => x.id != id);
  localStorage.setItem("bucket", JSON.stringify(bucket));
  updateCartButton();
  updateTotalPrice();
  renderCart(bucket);
};

const clearCart = () => {
  localStorage.setItem("bucket", []);
  bucket = [];
  updateCartButton();
  updateTotalPrice();
  renderCart(bucket);
};

window.removeProductFromCart = removeProductFromCart;
window.decrementCartItem = decrementCartItem;
window.incrementCartItem = incrementCartItem;
window.clearCart = clearCart;

const updateCartButton = () => {
  let cartBadgeNumber = bucket.length;
  if (cartBadgeNumber == 0) return (cartBadge.style.display = "none");
  cartBadge.style.display = "flex";
  cartBadge.textContent = cartBadgeNumber;
};
updateCartButton();
