import{a as w,S,i as m}from"./assets/vendor-B5nsgUv9.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(e){if(e.ep)return;e.ep=!0;const a=t(e);fetch(e.href,a)}})();const q="54688812-abefd5b120166b01d1b3bea24",P="https://pixabay.com/api/";async function y(r,o){const t={key:q,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15};return(await w.get(P,{params:t})).data}const l=document.querySelector(".gallery"),p=document.querySelector(".loader"),h=document.querySelector(".btn-load-more");let $=new S(".gallery a",{captionsData:"alt",captionDelay:250});function g(r,o=!1){const t=r.map(s=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${s.largeImageURL}">
            <img 
              class="gallery-image" 
              src="${s.webformatURL}" 
              alt="${s.tags}" 
            />
          </a>
          <div class="info">
            <div class="info-item"><b>Likes</b><span>${s.likes}</span></div>
            <div class="info-item"><b>Views</b><span>${s.views}</span></div>
            <div class="info-item"><b>Comments</b><span>${s.comments}</span></div>
            <div class="info-item"><b>Downloads</b><span>${s.downloads}</span></div>
          </div>
        </li>`).join("");o?l.insertAdjacentHTML("beforeend",t):l.innerHTML=t,$.refresh()}function M(){l.innerHTML=""}function b(){p.classList.add("is-active")}function v(){p.classList.remove("is-active")}function L(){h.classList.remove("visually-hidden")}function d(){h.classList.add("visually-hidden")}const f=document.querySelector(".form"),B=document.querySelector(".btn-load-more");function i(r){m.error({message:r,position:"topRight"})}let u="",n=1;f.addEventListener("submit",async r=>{r.preventDefault();const o=r.currentTarget.elements["search-text"].value.trim();if(o===""){i("Please enter a search query!");return}u=o,n=1,M(),d(),b();try{const t=await y(u,n);if(t.hits.length===0){i("Sorry, no images found!");return}g(t.hits),t.totalHits>15&&L(),f.reset()}catch(t){i("Something went wrong!"),console.log(t)}finally{v()}});B.addEventListener("click",async()=>{n+=1,d(),b();try{const r=await y(u,n);g(r.hits,!0);const o=document.querySelector(".gallery-item");if(o){const s=o.getBoundingClientRect().height;window.scrollBy({top:s*2,behavior:"smooth"})}const t=Math.ceil(r.totalHits/15);n>=t?(d(),m.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):L()}catch{i("Error loading more images!")}finally{v()}});
//# sourceMappingURL=index.js.map
