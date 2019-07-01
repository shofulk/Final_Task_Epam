let mainPhoto = document.querySelector(".block_main_photo");
let otherPhoto = document.querySelector(".block_other_photo");
let btn = document.querySelector(".options_size");
let buttonAdd = document.querySelector(".section_item_button");
let flag = false;
let bag_qty = localStorage.getItem("qty");
var shoppingBag = new Array();


if(localStorage.getItem("bag")){
    shoppingBag = JSON.parse(localStorage.getItem("bag"));
}

function getSrc(img){
    return img.src.split("/")[img.src.split("/").length - 1];
}

otherPhoto.addEventListener("click", function(e){

    let target = e.target;
    let selected = this.querySelector(".active_block");

    console.log(mainPhoto.children[0].src)

    if(target.classList.contains("photo_wrapper_background")){
        selected.classList.remove("active_block");
        mainPhoto.children[0].src = "./img/detail_product/" + getSrc(target.parentNode.children[0]);
        target.classList.add("active_block");
    }
});

btn.addEventListener("click", function(e){

    let target = e.target;

    console.log(target);

    let selected = this.querySelector(".selected");

    if(target.classList == "option_size_button"){
        if(!target.classList.contains(".selected")){
            target.classList.add("selected");
        }else{
            selected.classList.remove("selected");
            target.classList.add("selected");
        }
    }   

    flag = true;
});

buttonAdd.addEventListener("click", function(){
    if(flag){
        let name = document.querySelector("#name_value").innerText.trim(),
            number = document.querySelector("#number_value").innerText.trim(),
            price = document.querySelector("#price_value").innerText.trim(),
            selectedImage = document.querySelector(".active_block"),
            image = selectedImage.parentNode.children[0].src;
            size = document.querySelector(".options_size_button.selected").innerText.trim(),
            item = {
                    item_name: name,
                    item_number: number,
                    item_price: price,
                    item_size: size,
                    quantity: 1,
                    img: "./img/detail_product/" + image.split("/")[image.split("/").length-1]
            }

        if(filterItems(shoppingBag, number, size) != null){
            shoppingBag[filterItems(shoppingBag, number, size)].quantity++;
        }else{
            shoppingBag.push(item);
        }

        localStorage.setItem("bag", JSON.stringify(shoppingBag));
        localStorage.setItem("qty", ++bag_qty);
        alert("Added");

        if(localStorage.getItem("sum")){
            let sum = +localStorage.getItem("sum");
            sum += +price;
            localStorage.setItem("sum", sum);
        }else{
            localStorage.setItem("sum", +price);
        }
        document.querySelector("#basket-value").innerText = parseInt(document.querySelector("#basket-value").innerText) + 1;
    }else{
        alert("Enter size");
    }
});



