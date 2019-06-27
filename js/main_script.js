function filterItems(mas, number, size){
    for(let i = 0; i < mas.length; i++){
        if(mas[i].item_number == number && mas[i].item_size == size) return i;
    }
    return null;
}

var bag_value = document.querySelector("#basket-value");

function getBagQty(){

    if(localStorage.getItem("qty")) bag_value.innerHTML = 3 + parseInt(localStorage.getItem("qty"));

}
