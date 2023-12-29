const API_KEY = "655cf7990de34ac8b0ae649d0f59895b";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload(){
    window.location.reload();
}
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const Cardcontainer=document.getElementById('card-container');
    const newstemp=document.getElementById('temp-news-card');

    Cardcontainer.innerHTML="";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone=newstemp.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        Cardcontainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#about-news');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date= new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});

    newsSource.innerHTML=`${article.source.name}.${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}

let currentSel=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    currentSel?.classList.remove('active');
    currentSel=navItem;
    currentSel.classList.add('active');
}

const searchbtn=document.getElementById('search-btn');
const searchText=document.getElementById('search-Text');

searchbtn.addEventListener('click', ()=>{
    const query=searchText.value;
    if(!query)return;
    fetchNews(query);
    currentSel?.classList.remove("active");
    currentSel=null;
})