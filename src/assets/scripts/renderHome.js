import shopItemsData from "./Data";

const products = document.getElementById("products");

const renderHTMLProducts = (bucket) => {
  if (products)
    return (products.innerHTML = shopItemsData
      .map((product) => {
        const { img, name, desc, price, id } = product;
        const search = bucket.find((x) => x.id == id);
        return `
        <div class="border-2 p-0 rounded-md overflow-hidden border-black border-solid">
            <img src="${img}" alt="${name}" class="w-full"/>
            <div class="p-2 space-y-1">
                <h3 class="text-2xl font-semibold">${name}</h3>
                <p>${desc}</p>
                <div class="flex justify-between px-4 items-center">
                    <h3 class="text-3xl font-semibold">$ ${price}</h3>
                    <div class="text-xl select-none">
                    <span class="cursor-pointer hover:bg-slate-400/40 p-1" onclick="decrementCartItem('${id}')">-</span>
                    <span class="pointer-events-none">${
                      search?.amount || 0
                    }</span>
                    <span class="cursor-pointer text-amber-500 hover:bg-slate-400/40 p-1" onclick="incrementCartItem('${id}')">+</span>
                    </div>
                </div>
            </div>
        </div>
        `;
      })
      .join(""));
};
export default renderHTMLProducts;
