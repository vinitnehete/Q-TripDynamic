
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  // let url = window.location.href;
  
  let params = new URLSearchParams(search);
  let cityname = params.get("city");
  // console.log(cityname
  return cityname;



}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const result = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
   
    const re1 = await result.json();
  
    return re1;
   
  

  }catch(err){
    return null;
  }
 
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  
  adventures.forEach((key) => {
    let divElem = document.createElement("div");
    divElem.className = "col-6 col-lg-3 mb-4 position-relative";
    divElem.innerHTML = `
    <a href="detail/?adventure=${key.id}" id=${key.id}>
    <div class="category-banner">${key.category}</div>
    <div class="activity-card">
    <img src="${key.image}" class="img-responsive"/>
    <div class="activity-card-text text-md-center w-100 mt-3">
       <div class="d-block d-md-flex justify-content-between flex-wrap ps-3 pe-3">
       <h5 class="text-left">${key.name}</h5>
        <p>${key.costPerHead}</p>
    </div>
      <div class="d-block d-md-flex justify-content-between flex-wrap ps-3 pe-3">
      <h5 class="text-left">Duration</h5>
      <p>${key.duration} Hours</p>
      </div>
      </div>
      </div>
      </a>
          
    `;
    document.getElementById("data").appendChild(divElem); 
  });
  

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list 
  let ans = [];
  for(let i = 0 ; i < list.length ; i++){
    if(list[i].duration >= low && list[i].duration <=high ){
      ans.push(list[i]);
    }
  }

  
 return ans;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let ans1 = [];
  categoryList.forEach(key => {
    list.forEach(ele => {
      if(ele.category === key){
        ans1.push(ele)
      }
    })
  })

  return ans1
  

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods  
  const durationhere = filters["duration"] && filters["duration"].length > 0;
  const categoryhere = filters["category"] && filters["category"].length > 0; 
  let filteredlist = [];

  if (durationhere && categoryhere) {
    let [low, high] = filters["duration"].split("-");
     filteredlist = filterByDuration(list, low, high);
    filteredlist = filterByCategory(filteredlist, filters["category"]);
    
    
  } else if (durationhere) {
    let [low, high] = filters["duration"].split("-");
     filteredlist = filterByDuration(list, low, high);
  }
  else if (categoryhere) {
     filteredlist = filterByCategory(filteredlist, filters["category"]);
    
  } else {
     filteredlist = list;
  }
   return filteredlist;
  // Place holder for functionality to work in the Stubs
  // return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let filter = JSON.stringify(filters);
  localStorage.setItem("filters", filter);

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  JSON.parse(localStorage.getItem("filters"))


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let clELM =document.getElementById("category-list");
let category = filters["category"];
category.forEach((e)=>{
  let hElm = document.createElement("h6");
  hElm.setAttribute("class", "category-filter");
  hElm.innerHTML= e;
  clELM.appendChild(hElm);
  console.log("hello");
})

document.getElementById("duration-select").value=filters["duration"]


}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
