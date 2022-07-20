const cartProducts = document.getElementById("cartProducts"),
	totalPrice = document.getElementById("totalPrice"),
	cartBadge = document.getElementById("cartBadge");

let bucket = localStorage.getItem("bucket")
	? JSON.parse(localStorage.getItem("bucket"))
	: [];

totalPrice.textContent = 20;
const renderHTMLProducts = () => {
	return (cartProducts.innerHTML =
		bucket.length != 0
			? bucket
					.map((cartProduct) => {
						const { id, amount } = cartProduct;
						const { img, desc, price, name } = shopItemsData.find(
							(x) => x.id == id
						);
						return `
        <div
                        class="w-full flex max-h-[130px] mb-4 border-2 border-solid border-black rounded overflow-hidden"
                        id="card"
                    >
                        <img
                            src="${img}"
                            alt="first image"
                            class="w-[35%] max-h-full h-full object-cover"
                        />
                        <div class="w-[65%] flex flex-col justify-evenly px-3">
                            <div class="flex justify-between">
                                <div class="flex gap-2">
                                    <h4 class="text-xl font-medium">${name}</h4>
                                    <div class="bg-black text-white rounded p-1">$ ${price}</div>
                                </div>
                                <div class="text-xl font-bold cursor-pointer" onclick="removeProductFromCart('${id}')">X</div>
                            </div>
                            <div class="text-xl select-none">
                                <span class="cursor-pointer" onclick="decrementCartItem('${id}')">-</span>
                                <span>${amount}</span>
                                <span class="text-amber-500 cursor-pointer" onclick="incrementCartItem('${id}')">+</span>
                            </div>
                            <div class="font-medium text-2xl">$ ${
											price * amount
										}</div>
                        </div>
                    </div>
        `;
					})
					.join("")
			: "<h1 class='text-center font-semibold text-2xl uppercase'>nothing to show</h1>");
};
renderHTMLProducts();

const incrementCartItem = (id) => {
	let isInBucket = bucket.find((x) => x.id == id);
	if (!isInBucket) {
		bucket.push({
			id,
			amount: 1,
		});
	} else isInBucket.amount += 1;

	localStorage.setItem("bucket", JSON.stringify(bucket));
	renderHTMLProducts();
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
	renderHTMLProducts();
	updateCartButton();
	updateTotalPrice();
};

const updateCartButton = () => {
	let cartBadgeNumber = bucket.length;
	if (cartBadgeNumber == 0) return (cartBadge.style.display = "none");
	cartBadge.style.display = "flex";
	cartBadge.textContent = cartBadgeNumber;
};
updateCartButton();

const updateTotalPrice = () => {
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
	renderHTMLProducts();
};

const clearCart = () => {
	localStorage.setItem("bucket", []);
	bucket = [];
	updateCartButton();
	updateTotalPrice();
	renderHTMLProducts();
};
