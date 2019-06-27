let items = [
        {
            item_name: "Adidas Easy Boost",
            item_number: "12047/01",
            item_price: 150.50,
            item_size: "42",
            quantity: 1,
            img: "./img/category/shoes-4.jpg"
        },
        {
            item_name: "Nike Classic",
            item_number: "12047/02",
            item_price: 55.50,
            item_size: "40",
            quantity: 1,
            img: "./img/category/shoes-3.png"
        },
        {
            item_name: "Adidas",
            item_number: "12047/03",
            item_price: 99.00,
            item_size: "39",
            quantity: 1,
            img: "./img/category/shoes-2.jpg"
        }
    ],
    bagQty = document.querySelector("#basket-value"),
    bagTotal = document.querySelector(".total_value"),
    section = document.querySelector(".section_shoppingBag_people_card_block");


function createElement(name, className, parent){
    let element = document.createElement(name);
    element.className = className;

    if(arguments[3] != null){
        if(name == "img"){
            element.src = arguments[3];
        }else{
            element.innerHTML = arguments[3];
        }
    }


    parent.appendChild(element);

    return element;
}

function drawCard(mas){

    if(mas != null){

        for(let i = 0; i < mas.length; i++){
            let card = createElement("div", "person_card", section);
            let imageWrapper = createElement("div", "person_card_image_wrapper", card);
            let a = createElement("a", null, imageWrapper);
            createElement("img", null, a, mas[i].img);

            let card_desc = createElement("div", "person_card_desc", card);
            let name = createElement("div", "person_card_desc_name_block td2", card_desc, mas[i].item_name);
            let number = createElement("div", "person_card_desc_number_block td1", name, mas[i].item_number);
            let color = createElement("div", "person_card_desc_color_block td1", card_desc, "One color");
            let size = createElement("div", "person_card_desc_size_block td1", card_desc, mas[i].item_size);
            let qty = createElement("div", "person_card_desc_quantity_block td1", card_desc);
            let qty_value = createElement("span", "person_card_desc_quantity_block_value", qty, mas[i].quantity)
            let controlQty_block = createElement("div", "person_card_desc_quantity_block_control_block", qty);
            let controlQty_block_up = createElement("div", "person_card_desc_quantity_block_control_button up", controlQty_block, "<i class='fas fa-angle-up'></i>");
            let controlQty_block_down = createElement("div", "person_card_desc_quantity_block_control_button down", controlQty_block, '<i class="fas fa-angle-down"></i>');
            let prize = createElement("div", "person_card_desc_price_block td1", card_desc, mas[i].item_price);
            let button_block = createElement("div", "person_card_desc_button_block td1", card_desc);
            let button = createElement("button", "person_card_desc_remove_item", button_block, "&#10006;");

        }
    }

}

function actionCard(section, shoppingBag){
    
    console.log(shoppingBag);

    section.addEventListener("click", function(e){

        let target = e.target;
        console.log(target);

        

        let qty = localStorage.getItem("qty");
        let sum = localStorage.getItem("sum");
        console.log(qty + "  " + sum);

        if(sum == null){
            sum = 0;
        }

        if(target.classList.contains("person_card_desc_remove_item")){
            
            let number = target.parentNode.parentNode.parentNode.querySelector(".person_card_desc_number_block").innerHTML.trim();
            let size = target.parentNode.parentNode.parentNode.querySelector(".person_card_desc_size_block").innerHTML.trim();
            let price = target.parentNode.parentNode.parentNode.querySelector(".person_card_desc_price_block").innerHTML.trim();
            let quantity = target.parentNode.parentNode.parentNode.querySelector(".person_card_desc_quantity_block_value").innerText.trim();

            console.log(quantity + "  " + price);

            qty -= +quantity;
            sum -= +price * quantity;

            localStorage.setItem("qty", qty);
            localStorage.setItem("sum", sum.toFixed(2));

            console.log(quantity + "  " +    price);

            shoppingBag.splice(filterItems(shoppingBag, number, size), 1);

            console.log(shoppingBag);

            localStorage.setItem("bag", JSON.stringify(shoppingBag));

            target.parentNode.parentNode.parentNode.remove();

            getSumm();
            getBagQty();
        }
        if(target.classList.contains("fas")){

            console.log(this);

            let number = target.parentNode.parentNode.parentNode.parentNode.querySelector(".person_card_desc_number_block").innerHTML.trim();
            let size = target.parentNode.parentNode.parentNode.parentNode.querySelector(".person_card_desc_size_block").innerHTML.trim();
            let price = target.parentNode.parentNode.parentNode.parentNode.querySelector(".person_card_desc_price_block").innerHTML.trim();
            let quantity = target.parentNode.parentNode.parentNode.querySelector(".person_card_desc_quantity_block_value").innerHTML.trim();

            console.log(this);

            if(target.classList.contains("fa-angle-up")){
                console.log(true);
                
                ++qty;
                sum = parseInt(sum) + parseInt(price);

                target.parentNode.parentNode.parentNode.querySelector(".person_card_desc_quantity_block_value").innerText =  ++quantity;
                
                changeQty(shoppingBag, true, number, size);

            }
            if(target.classList.contains("fa-angle-down")){
                console.log(false)
                if(quantity > 0){
                    console.log('------------------------------------');
                    console.log(quantity + " " + sum + " " + " " + " " + price);
                    console.log('------------------------------------');
                    
                    --qty;
                    sum = parseInt(sum) - parseInt(price);


                    target.parentNode.parentNode.parentNode.querySelector(".person_card_desc_quantity_block_value").innerText = --quantity;
                    
                    changeQty(shoppingBag, false, number, size);
                }
            }

            console.log(parseInt(sum));

            localStorage.setItem("qty", qty);
            localStorage.setItem("sum", sum);
            getSumm();
            getBagQty();
        }

    });

}

function changeQty(mas, flag, number, size){
    console.log(mas);
    if(mas != null && mas.length != 0){
        if(flag){
            ++mas[filterItems((mas, number, size))].quantity;
        }else{
            --mas[filterItems((mas, number, size))].quantity;
        }
    }
}

function getSumm(){
    if(localStorage.getItem("sum")){
        bagTotal.innerHTML = 305 + parseInt(localStorage.getItem("sum"));
    }
}

document.querySelector(".section_shoppingBag_button_order").addEventListener("click", function(){

    if(bagQty.innerHTML > 0){
        bagQty.innerHTML = 0;
        
        localStorage.clear();

        let main = document.getElementById("main");

        main.innerHTML = '';

        let block = createElement('div', "thank_block", main);
        createElement("h1", "",block,  "ORDER SENT!");
        createElement("div", "subheader1", block, "Thank you, and happy shopping :)");

        
    }else{
        alert("Bag is empty!!!");
    }

});

window.addEventListener("load", function(){
    let shoppingBag = JSON.parse(this.localStorage.getItem("bag"));

    if(shoppingBag){
        console.log(items);
        drawCard(shoppingBag);
    }

    actionCard(section, shoppingBag); 
   
    getSumm();
});