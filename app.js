const auth = '563492ad6f91700001000001dbc68496b7274def834bd9c79e9c2d3e';
const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const submitBtn = document.querySelector('.submit-btn');
const form = document.querySelector('.search-form');
let searchValue;
let more = document.querySelector('.more');
let page =1;
let fetchLink;
let currentSearch;

// event listener
searchInput.addEventListener('input', updateInput);
form.addEventListener('submit', e =>{
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue)
})




function updateInput(e){
    searchValue = e.target.value;
}


async function fetchApi(url){
    const dataFetch = await fetch (url,{
        method: 'GET',
    headers:{
        Accept: 'application/json',
        Authorization:auth
    } 
    });
    const data = await dataFetch.json();
    return data;
}

function generatePhotos(data){
    data.photos.forEach(photo =>{
        const galleryImg = document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML=
         `<div class ="gallery-info">
        <p> ${photo.photographer}</p>
        <a href =${photo.src.original}>Download</a>
        </div>
        <img src =${photo.src.large}/>`;
        gallery.appendChild(galleryImg);
    })

}

async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15";
    const data= await fetchApi(fetchLink);
    generatePhotos(data);
    
}



async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&p`;
    const data= await fetchApi(fetchLink);
    generatePhotos(data);
}


function clear(){
    gallery.innerHTML ="";
    searchInput.value = "";
}




curatedPhotos();