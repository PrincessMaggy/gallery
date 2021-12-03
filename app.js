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

more.addEventListener('click', loadMore);


// updates input value
function updateInput(e){
    searchValue = e.target.value;
}

// fetches images from the api url
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

// generates container for the image fetched
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

// assigns url to fetch image from
async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15";
    const data= await fetchApi(fetchLink);
    generatePhotos(data);
    
}


// assigns url for search value
async function searchPhotos(query){
    clear();
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&p`;
    const data= await fetchApi(fetchLink);
    generatePhotos(data);
}


// clears input value 
function clear(){
    gallery.innerHTML ="";
    searchInput.value = "";
}

// adds functionality to the load more button
async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink =`https://api.pexels.com/v1/search?query=${query}+query&per_page=15&p`;
    }
    else{
        fetchLink =`https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePhotos(data);
}


curatedPhotos();