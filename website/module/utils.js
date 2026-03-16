//sidebar

export function sidebar(){
const sidebarBtn = document.getElementById("sidebar-btn")
const sidebar = document.querySelector(".sidebar")



sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active")
})

}

// sidebar end



// photoview 
export function photoview(arr) {
  const content = document.getElementById("content");

  arr.forEach(path => {
    const img = document.createElement("img");
    img.classList.add("img")
    img.src = path;
    img.dataset.path = path;
    console.log(path)
    content.appendChild(img);
  });
}

// end

//PhtotoPreview
export function openPhotoPreview(){
  

  function photoPreview(src){
  const previewImg = document.createElement("img");
  previewImg.src = src;
  previewImg.id = "preview-img";

  const photoPreviewDiv = document.getElementById("photo-preview"); 
  photoPreviewDiv.appendChild(previewImg);
  photoPreviewDiv.style.display = "flex"
}
  // is Button Liked func

  function isBtnLiked(src){
  const likedPhotos = JSON.parse(localStorage.getItem("likedPhotos") || "[]")
  const likeBtn = document.getElementById("like-btn")
  const photoSrc = src
  if(likedPhotos.includes(photoSrc)){
    likeBtn.classList.add("active")

  }
  else{
    likeBtn.classList.remove("active")
  }
}

  // eventListeners 
  const content = document.getElementById("content")
  content.addEventListener("click", (event) => {
  const photo = event.target;
  if(photo.tagName === "IMG"){
    photoPreview(photo.src)
    isBtnLiked(photo.src)
  }
})
}
//end



// PhotoPreviewIntaractions 
export function photoPreviewInteractions(onLikeToggle){
  const photoPreviewDiv = document.getElementById("photo-preview")
  function photoPreviewClose(){
  photoPreviewDiv.innerHTML =`<button id="close-btn">&times; </button>
                              <button id="like-btn">&hearts;</button>`;
  photoPreviewDiv.style.display = "none";
}

function likeBtnChange(src){
  
  let likedPhotos = JSON.parse(localStorage.getItem("likedPhotos") || "[]")
  let isPhotoLiked = false;

  if(!likedPhotos.includes(src)){
    likedPhotos.push(src)
    isPhotoLiked = true
  }
  else{
    likedPhotos = likedPhotos.filter(photo => photo !== src)
    isPhotoLiked = false
  }
  document.getElementById("like-btn").classList.toggle("active");
  localStorage.setItem("likedPhotos", JSON.stringify(likedPhotos))
  
  
  if(typeof onLikeToggle === "function"){
    onLikeToggle({
      src: src, 
      isLikedNow: isPhotoLiked, 
      allLiked: likedPhotos});
  }
}



//eventlistners
  photoPreviewDiv.addEventListener("click", (event) => {
  if(event.tagName != "IMG" && event.target.id != "like-btn"){
    photoPreviewClose()
  }

  if(event.target.id === "like-btn"){
    const photoSrc = document.getElementById("preview-img").src
    likeBtnChange(photoSrc)
  }
})
}

//end
