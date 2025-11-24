
const USERS = {
  "B123424288": {
    id: "B123424288",
    examNo: "A1863124",
    name: "許詠鈞",
    dept: "電機工程學系乙組",
    docScore: 72.8,
    interviewScore: 80,
    finalScore: 76.4,
    result: "備取 9"
  }
};

function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return [...document.querySelectorAll(sel)] }

function openMenu(){
  qs(".menu-overlay").style.display="block";
  qs(".menu").style.display="block";
}
function closeMenu(){
  qs(".menu-overlay").style.display="none";
  qs(".menu").style.display="none";
}

window.addEventListener("DOMContentLoaded", ()=>{
  const hb = qs(".hamburger");
  if(hb) hb.addEventListener("click", openMenu);
  const closeBtn = qs(".menu .close");
  if(closeBtn) closeBtn.addEventListener("click", closeMenu);
  const overlay = qs(".menu-overlay");
  if(overlay) overlay.addEventListener("click", closeMenu);

  const loginForm = qs("#loginForm");
  if(loginForm){
    loginForm.addEventListener("submit", (e)=>{
      e.preventDefault();
      const id = qs("#idInput").value.trim().toUpperCase();
      const user = USERS[id];
      if(!user){ alert("查無此帳號"); return; }
      localStorage.setItem("nchu_user", JSON.stringify(user));
      location.href = "portal.html";
    });
  }

  const portalName = qs("#portalName");
  if(portalName){
    const user = getUser();
    if(!user){ location.href="index.html"; return;}
    portalName.textContent = user.name;
  }

  const resultPage = qs("#resultPage");
  if(resultPage){
    const user = getUser();
    if(!user){ location.href="index.html"; return;}
    qsa("[data-field]").forEach(el=>{
      const f = el.getAttribute("data-field");
      el.textContent = user[f];
    });
  }

  qsa(".logout-btn, [data-logout]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      localStorage.removeItem("nchu_user");
      location.href="index.html";
    });
  });
});

function getUser(){
  try{ return JSON.parse(localStorage.getItem("nchu_user")||"null"); }
  catch(e){ return null; }
}
