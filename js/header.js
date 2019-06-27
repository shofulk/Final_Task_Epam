let searchBlockIcon = document.querySelector(".header_block_search_icon");
let searchBlockInput = document.querySelector(".header_block_search_input");
let searchBlock = document.querySelector(".header_block_search");

searchBlockIcon.addEventListener('click', function(){
    if (window.matchMedia("(max-width: 768px)").matches){     
        if(!searchBlock.classList.contains("active_search_block")){
            searchBlock.classList.add("active_search_block");
            searchBlockInput.classList.add("active_search_block_input");
            searchBlockIcon.classList.add("active_search_block_icon");

            searchBlock.style.border = "1px solid #606060";
        }else{
            if(searchBlockInput.value == ""){
                searchBlock.classList.remove("active_search_block");
                searchBlockInput.classList.remove("active_search_block_input");
                searchBlockIcon.classList.remove("active_search_block_icon");

                searchBlock.style.border = "none";
            }else{
                document.location.href = "2_category_all.html";
            }
            
        }
    }else{
        if(!searchBlockIcon.classList.contains("active_search_block_icon")){
            searchBlockInput.classList.add("active_search_block_input");
            searchBlockIcon.classList.add("active_search_block_icon");

            searchBlock.style.border = "1px solid #606060";
        }else{
            if(searchBlockInput.value == ""){
                console.log('------------------------------------');
                console.log(searchBlockInput.value);
                console.log('------------------------------------');
                searchBlockInput.classList.remove("active_search_block_input");
                searchBlockIcon.classList.remove("active_search_block_icon");

                searchBlock.style.border = "none";
            }else{
                document.location.href = "2_category_all.html";
            }
        }
    }
});

window.addEventListener("load", getBagQty);