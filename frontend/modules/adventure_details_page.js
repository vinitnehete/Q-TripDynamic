import config from "../conf/index.js";
import { addAdventureToDOM } from "./adventures_page.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  let params = new URLSearchParams(search);
  let idFormURl = params.get("adventure");
  
  return  idFormURl;

  
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try {
    const adven = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    const res = await adven.json();
    // console.log(res);
    return await res;
    
  } catch (error) {
    console.log(Error);
    
  }


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  
  const {name , subtitle, images} = adventure
  // console.log(adventure)
  const adventureName = document.getElementById("adventure-name");
  adventureName.innerHTML = name
  const adventureSub = document.getElementById("adventure-subtitle");
  adventureSub.innerHTML = subtitle;
 
  const photoGallery = document.getElementById("photo-gallery")

  
  images.map((image) => {
    const newEle = document.createElement("div");
    newEle.className = "col-lg-12";

    newEle.innerHTML = `
    <img src = "${image}" class= "activity-card-image  "
    /> 
    `


    photoGallery.appendChild(newEle)
  })













  const content = document.getElementById("adventure-content").innerHTML = `${adventure.content}`;

  
  
  
 

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
 
  document.getElementById("photo-gallery").innerHTML =`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" arial label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"  arial label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"  arial label="Slide 3"></button>
</div>
<div class="carousel-inner" id="carousel-inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target= "#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target= "#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

images.map((image, idx)=>{
  let ele =document.createElement('div');
  ele.className = `carousel-item ${idx === 0 ? "active" : ""}`;
  ele.innerHTML = `<img src =${image}alt="gallery-img"srcset=""class="activity-card-image pb-3 pb-md-0"/>`;
document.getElementById("carousel-inner").appendChild(ele);
});


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = `${adventure.costPerHead}`;

  } else {
     document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
  

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  const a = document.getElementById("reservation-cost").innerHTML = adventure.costPerHead * persons;

  

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".


  // const form = document.getElementById("myform");
  // form.addEventListener("submit", async (event) => {
  //   //await api call and get the response
  //   event.preventDefault();
  //   let url = config.backendEndpoint + "/reservations/new";
    
  //   let formElem = form.elements;

  //   let payload = {
  //     name: formElem["name"].value.trim(),
  //     date: formElem["date"].value,
  //     person: formElem["person"].value,
  //     adventure: adventure.id,
  //   }
    
  //   try {
  //     const res = await fetch(url, {
  //       method: "POST",
  //       body: JSON.stringify(payload),
  //       headers: {
  //         "Content-type": "application/json"
  //       }
  //     })
      
  //   } catch (error) {
  //     alert("Failed");
      
  //   }
  //   if (res.ok) {
  //     alert("Sucess")
  //   } else {
  //     alert("Failed")
  //   }



  // });
  
    const form = document.getElementById("myForm");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      let url =config.backendEndpoint + "/reservations/new";
      let formElements = form.elements;

      let bodyString = JSON.stringify({
        name:formElements["name"].value,
        date:formElements["date"].value,
        person:formElements["person"].value,
        adventure:adventure.id,
      });
      try{
        let res = await fetch(url, {
         method: "POST",
         body: bodyString,
         headers: {
           "content-Type": "application/json",
         },
        });
  
        if(res.ok){
          alert("sucess!");
          window.location.reload();
        }else{
          let data = await res.json();
          alert(`Failed - ${data.message}`);
        }
      } catch(err){
        console.log(err);
        alert("Failed - fetch call resulted in error");
      }
    });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";

    
  }
  else {
        document.getElementById("reserved-banner").style.display = "none";

    
  }
}


export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
  
};
