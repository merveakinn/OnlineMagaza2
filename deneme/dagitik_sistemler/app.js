const COLLECTIONS_DUMP = COLLECTIONS;
const createCategories = ()=>{
    const filterCategorieEl = document.querySelector(".filter__categories");
    let categories =["all"];
    COLLECTIONS.forEach((item)=>{
        if (categories.findIndex((c) => c == item.category) == -1)
            categories.push(item.category);
        });
    
    const categorySwitcher = {
        all : "All",
        sport:"Sport",
        collectibles:"Collectibles",
        art:"Art",
        photography:"Photography",
        music:"Music",
    };
    categories.forEach((category) => {
        let categoryHTML =`<li class="${
            category == "all" ? "active" : ""
        }" onclick ="filterCategories(this)" data-category="${category}">${
             categorySwitcher[category] 
            }</li>`; 
        
        filterCategorieEl.insertAdjacentHTML("beforeend", categoryHTML);
   
    });
};
const filterCategories = (categoryEl) =>{
    const lastActiveEl = document.querySelector("li.active");
    lastActiveEl.classList.remove("active");
    categoryEl.classList.add("active");
    if(categoryEl.dataset.category== "all") {
        COLLECTIONS = COLLECTIONS_DUMP;
    }else{
        COLLECTIONS = COLLECTIONS_DUMP.filter(
            (collection) => collection.category == categoryEl.dataset.category
            );
    }
    listCollections();
};

const listCollections = () => {
    const collectionEl = document.querySelector(".collections");
    collectionEl.innerHTML = "";
    COLLECTIONS.forEach(collection => {
        let collectionsItemHtml = `<div class="collections_item">
        <a class="collection_container" href="${collection.link}">
        <img class="collection_img" src="${collection.img}" height="350">
        <div class="collection__info">
            <strong class="collection_title">${collection.name}</strong><br>
            <span>${collection.author}</span>
        </div>
        <div class="collection_price">
            <strong>${collection.price}</strong>
            <img src="./images/ethereum-logo.png" width="24" height="24" alt="">
        </div>
    </a>
    </div>`;
        collectionEl.insertAdjacentHTML("beforeend", collectionsItemHtml)
    });
};




 const searchCollections = (searchKey) => {
    if(searchKey.length >1){
    COLLECTIONS = COLLECTIONS_DUMP.filter((c) => 
    c.name.toLowerCase().includes(searchKey.toLowerCase())
     );
    }else{
    COLLECTIONS = COLLECTIONS_DUMP;
    }
    listCollections();
}; 







createCategories();
listCollections();
