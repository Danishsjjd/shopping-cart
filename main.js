const products = document.getElementById("products");

function renderHTMLProducts() {
	return (products.innerHTML = shopItemsData
		.map((product) => {
			return `
        <div class="border-2 p-0 rounded-md overflow-hidden border-black border-solid">
            <img src="${product.img}" alt="${product.name}" class="w-full"/>
            <div class="p-2 space-y-1">
                <h3 class="text-2xl font-semibold">${product.name}</h3>
                <p>${product.desc}</p>
                <div class="flex justify-between px-4 items-center">
                    <h3 class="text-3xl font-semibold">$ ${product.price}</h3>
                    <div class="text-xl">
                    <span>-</span>
                    <span>0</span>
                    <span class="text-amber-500">+</span>
                    </div>
                </div>
            </div>
        </div>
        `;
		})
		.join(""));
}

renderHTMLProducts();
