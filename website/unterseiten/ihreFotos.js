import {sidebar} from "../module/utils.js"
import {photoview} from "../module/utils.js"
import {openPhotoPreview} from "../module/utils.js"
import {photoPreviewInteractions} from "../module/utils.js"

const content = document.getElementById("content")

const refreshGallery = ({src, isPhotoLiked, allLiked}) =>{
    if(!isPhotoLiked && src){
        const imgToRemove = document.querySelector(`img[data-path="${src}"]`)
        if(imgToRemove) imgToRemove.remove();
    }
    if(allLiked.length === 0){
        content.innerHTML = "<h2>it's still empty there...</h2>"
    }
}

sidebar()
openPhotoPreview()
photoPreviewInteractions(refreshGallery)


const likedPhotos = JSON.parse(localStorage.getItem("likedPhotos") || "[]")
if(likedPhotos.length === 0){
    content.innerHTML = "<h2>it's still empty there...</h2>"
}
photoview(likedPhotos)
