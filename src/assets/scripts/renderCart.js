import shopItemsData from "./Data";

const cartProducts = document.getElementById("cartProducts");

const renderHTMLProducts = (bucket) => {
  if (cartProducts)
    return (cartProducts.innerHTML =
      bucket.length != 0
        ? bucket
            .map((cartProduct) => {
              const { id, amount } = cartProduct;
              const { img, price, name } = shopItemsData.find(
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
export default renderHTMLProducts;
