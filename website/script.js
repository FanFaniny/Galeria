import {sidebar} from "./module/utils.js"
import {photoview} from "./module/utils.js"
import {openPhotoPreview} from "./module/utils.js"
import {photoPreviewInteractions} from "./module/utils.js"

sidebar()
openPhotoPreview()
photoPreviewInteractions()



const searchFieldInput = document.getElementById("search-field");
const content = document.querySelector(".content");



// photofilter func 

function photoDelete(){
  const content = document.getElementById("content")
    while(content.firstChild){
      content.removeChild(content.firstChild)  
    
    }
}

function photoFilter(objArr, filter){
  photoDelete()
  let beFilter = filter.split(" ").join("").toLowerCase()
	if(objArr[beFilter]){
		photoview(objArr[beFilter])
	}

  else{
    photoview(photos.newyork)
    photoview(photos.nature)
    photoview(photos.animal)
  }
}

//phofilter funk end

// Photos Array
const photos = {
  newyork: [
    "../Bilder/New York/New York1.jpg", //https://pixabay.com/de/photos/geb%c3%a4ude-fluss-stadt-stadtbild-668616/
    "../Bilder/New York/New York2.jpg", //https://pixabay.com/de/photos/usa-manhattan-kontraste-new-york-1777986/
    "../Bilder/New York/New York3.jpg", //https://pixabay.com/de/photos/br%c3%bccke-manhattan-die-architektur-7930004/
    "../Bilder/New York/New York4.jpg", //https://pixabay.com/de/photos/empire-state-building-new-york-city-6675010/
    "../Bilder/New York/New York5.jpg"  //https://pixabay.com/de/photos/wolkenkratzer-new-york-stadtzentrum-246224/
  ],
  nature: [
    "../Bilder/Nature/NatureBild1.jpg", //https://pixabay.com/de/photos/aufstellen-natur-sonnenlicht-9295186/
    "../Bilder/Nature/NatureBild2.jpg", //https://pixabay.com/de/photos/chili-natur-terrasse-9202873/
    "../Bilder/Nature/NatureBild3.jpg", //https://pixabay.com/de/photos/wald-weg-%c3%bcppig-gr%c3%bcn-still-8684668/
    "../Bilder/Nature/NatureBild4.jpg", //https://pixabay.com/de/photos/sonnenuntergang-sand-strand-inseln-7133867/
    "../Bilder/Nature/NatureBild5.jpg"  //https://pixabay.com/de/photos/b%c3%a4ume-see-sonnenaufgang-nebel-8686902/
  ],

  animal: [
    "../Bilder/Animals/animal1.jpg", //https://pixabay.com/de/photos/qualle-kreatur-sea-animal-4760924/
    "../Bilder/Animals/animal2.jpg", //https://pixabay.com/de/photos/zoo-paugres-ardech-tiere-besuchen-2490463/
    "../Bilder/Animals/animal3.jpg", //https://pixabay.com/de/photos/graug%c3%a4nse-gans-natur-federvieh-3608067/
    "../Bilder/Animals/animal4.jpg", //https://pixabay.com/de/photos/tier-s%c3%a4ugetier-ausgestopften-wild-3905684/
    "../Bilder/Animals/animal5.jpg"  //https://pixabay.com/de/photos/schmetterling-insekten-falter-natur-2388942/
  ]
};





Object.keys(photos).forEach((photoArr) => {
  photoview(photos[photoArr])
})



// Event listenres
searchFieldInput.addEventListener("input", () => photoFilter(photos, searchFieldInput.value));
