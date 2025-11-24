
// Simple demo-only auth + navigation
(function(){
  const $ = (s)=>document.querySelector(s);

  const loginForm = $("#loginForm");
  if(loginForm){
    loginForm.addEventListener("submit",(e)=>{
      e.preventDefault();
      localStorage.setItem("nchu_logged_in","1");
      location.href = "./portal.html";
    });
  }

  const mustLoginPages = ["portal.html","score.html","department.html","result.html"];
  const path = location.pathname.split("/").pop();
  if(mustLoginPages.includes(path) && localStorage.getItem("nchu_logged_in")!=="1"){
    location.href = "./index.html";
  }

  const menuBtn = $("#menuBtn");
  const drawer = $("#drawer");
  const drawerClose = $("#drawerClose");
  if(menuBtn && drawer){
    menuBtn.addEventListener("click",()=>drawer.classList.add("open"));
  }
  if(drawerClose && drawer){
    drawerClose.addEventListener("click",()=>drawer.classList.remove("open"));
  }
  if(drawer){
    drawer.addEventListener("click",(e)=>{
      if(e.target===drawer) drawer.classList.remove("open");
    });
  }

  const logoutBtn = $("#logoutBtn");
  if(logoutBtn){
    logoutBtn.addEventListener("click",()=>{
      localStorage.removeItem("nchu_logged_in");
      location.href="./index.html";
    });
  }

  const goScore = $("#goScore");
  if(goScore){
    goScore.addEventListener("click",()=>location.href="./score.html");
  }
})();
