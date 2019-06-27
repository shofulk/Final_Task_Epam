/* конфигурация */
var width = 200; // ширина изображения
var count = 1; // количество изображений

var slider = document.getElementById('slider');
var list = slider.querySelector('.slider_gallery_list');
var listElems = slider.querySelectorAll('.slider_gallery_list_li');

var position = 0; // текущий сдвиг влево

slider.querySelector('.prev').onclick = function() {

    position = Math.min(position + width * count, 0);
    list.style.marginLeft = position + 'px';
};

slider.querySelector('.next').onclick = function() {

    position = Math.max(position - width * count, -width * (listElems.length - count));
    if(position <= -1200) position = 0;
    list.style.marginLeft = position + 'px';
};