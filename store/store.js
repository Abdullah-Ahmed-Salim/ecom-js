let cards = document.getElementById('cards')

let cartTottal = 0

let cartArray = JSON.parse(localStorage.getItem("data")) ||  []
JSON.parse(localStorage.getItem("data")) ||
console.log(cartArray)


let adding = () => {
    return  (cards.innerHTML = mainArray.map(value => {
        let {id, name, desc, price, img} = value
        let check = cartArray.find(value => value.id === id) || []
        return (
        `
        <div id ="product-${id}" class="card">
        <img src="/store/images/${img}" width="220">
        <div class="card-info">
            <p class="card-name">${name}</p>
            <p class="card-paragraph">${desc}</p>
            <div class="card-numbers">
                <p class="card-price">${price} $</p>
                <div class="card-count">
                    <img src="/store/images/plus.png" width="16" class="minus" onclick = "increasing(${id})">
                    <p class="count" id = "${id}")"> ${check.count === undefined? 0: check.count}</p>
                    <img src="/store/images/minus.png" width="16" class="plus" onclick = "decreasing(${id})">
                </div>
            </div>
        </div>
    </div>
    `)
    }).join(""))    
}

adding();

function increasing (id) {
    let check = cartArray.find(value  => value.id === id.id)
    if (check === undefined) {cartArray.push({
        id: id.id,
        count: 1
    })}
    else {check.count ++}   
    localStorage.setItem("data", JSON.stringify(cartArray))   
    updating(id.id);
    
}

function decreasing (id) {
    let check = cartArray.find(value  => value.id === id.id)
    if (check === undefined) return
    else if (check.count === 0) return
    else {
        if (check.count >= 1) {check.count --}}
        cartArray = cartArray.filter(value => value.count !== 0)
        localStorage.setItem("data", JSON.stringify(cartArray))   
    updating(id.id);
    
}


function updating (id) {
    let check = cartArray.find(value => value.id === id)
    let paragraph = document.getElementById(id)
    paragraph.innerHTML = check.count  
    calculation()
}
/* let cartt = cartArray.map(value=> value.id)
carrt.forEach(value => updating(value))  */


function calculation () {
    let cart = document.querySelector('.cart-number')
    cart.innerHTML = cartArray.map(value => value.count).reduce((acc, current) => acc + current, 0)
}

calculation();


