let cart = document.getElementById("cart")
let cartNumber = document.querySelector('.cart-number')
let label = document.querySelector('.label')


let cartArray = JSON.parse(localStorage.getItem("data")) || []

function adding () {
    if (cartArray.length !== 0)
    {return(
        
        cart.innerHTML = cartArray.map(value => {
            let {id, count} = value
            let check = mainArray.find(value => value.id === id) || []
            let {img, name, price} = check
        return(`
            <div class= "cart-card">
            <img src = "/store/images/${img}" width = 120>
            <div class = "cart-card-info">
            <div class = "cart-card-tittle">
            <p class = cart-card-name>${name} </p>
            <p class = cart-card-price> $ ${price} </p>
            <img src ="/store/images/cancel.png" width = "15" onclick = "deleting(${id})">
             </div>
            <div class="card-count">
                    <img src="/store/images/plus.png" width="16" class="minus" onclick = "increasing(${id})">
                    <p class="count" id = "${id}")"> ${count}</p>
                    <img src="/store/images/minus.png" width="16" class="plus" onclick = "decreasing(${id})">
                </div>
            <p class = "tottal">$ ${price * count}</p>
            </div>
            </div>
            `
        )
        }).join("")
    )} else { 
        cart.innerHTML = ""
        label.innerHTML =
         `<p class = "cart-header">Cart is empty</p>
        <a href = "/store/store.html"><button class ="cart-header-btn"> Return Home </button></a>`
    }
}

adding();

function increasing(id) {
    let check = cartArray.find(value => value.id === id.id)
    check.count ++
  localStorage.setItem("data", JSON.stringify(cartArray))   
    updating(id.id);
    tottal();
}

function decreasing (id) {
    let check = cartArray.find(value => value.id === id.id)
    
    if (check.count !== 0) {check.count --} 
    else if (check.count === 0) return
    
    updating(id.id);
    tottal();
    cartArray = cartArray.filter(value => value.count !== 0)
    adding();
    localStorage.setItem("data", JSON.stringify(cartArray))  

    
}

function updating (id) {
    let check = cartArray.find(value => value.id === id)
    let number = document.getElementById(id)
    number.innerHTML = check.count
    calculating();
} 

function calculating () {
    
   cartNumber.innerHTML =   cartArray.map(value => value.count).reduce((x,y)=> x+y ,0)
}

calculating();

function deleting (id){
    cartArray = cartArray.filter(value => value.id !== id.id)
    calculating();
    localStorage.setItem("data", JSON.stringify(cartArray)) 
    adding();
    tottal();
    
    
}

function emptying () {
    cartArray = []
    adding();
    calculating();
    localStorage.setItem("data", JSON.stringify(cartArray)) 
}

function tottal () {
    let tottalScore = document.getElementById('final')


    let tottal = cartArray.map(value => {
        let {id, count} = value 
        check = mainArray.find(index => index.id === id)
        return count * check.price
}).reduce((x,y)=>x+y,0)
     tottalScore.innerHTML = `$ ${tottal}`
}

tottal();