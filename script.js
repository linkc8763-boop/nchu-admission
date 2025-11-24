(function(){
  const $ = (s)=>document.querySelector(s);

  const loginBtn = $("#loginBtn");
  if(loginBtn){
    loginBtn.addEventListener("click", ()=> location.href = "portal.html");
  }

  const ham = $("#hamburgerBtn");
  const panel = $("#menuPanel");
  const dim = $("#menuDim");
  const closeBtn = $("#menuClose");
  const openMenu = ()=>{ panel?.classList.add("open"); dim?.classList.add("open"); panel?.setAttribute("aria-hidden","false"); };
  const closeMenu = ()=>{ panel?.classList.remove("open"); dim?.classList.remove("open"); panel?.setAttribute("aria-hidden","true"); };
  ham?.addEventListener("click", openMenu);
  closeBtn?.addEventListener("click", closeMenu);
  dim?.addEventListener("click", closeMenu);

  $("#logoutBtn")?.addEventListener("click", ()=> location.href="index.html");
  $("#scoreBtn")?.addEventListener("click", ()=> location.href="score.html");

  function tickCountdown(target, ids){
    const now = new Date();
    let diff = target - now;
    if(diff < 0) diff = 0;
    const s = Math.floor(diff/1000);
    const days = Math.floor(s/86400);
    const hours = Math.floor((s%86400)/3600);
    const minutes = Math.floor((s%3600)/60);
    const seconds = s%60;
    const pad = (n)=>String(n).padStart(2,"0");
    if(ids.length===4){
      $(ids[0]).textContent = pad(days);
      $(ids[1]).textContent = pad(hours);
      $(ids[2]).textContent = pad(minutes);
      $(ids[3]).textContent = pad(seconds);
    }else{
      $(ids[0]).textContent = pad(days);
      $(ids[1]).textContent = pad(hours);
    }
  }
  const regEnd = new Date("2025-10-13T17:00:00+08:00");
  const payEnd = new Date("2025-10-13T23:59:00+08:00");
  if($("#cdDays")){
    setInterval(()=>{
      tickCountdown(regEnd, ["#cdDays","#cdHours","#cdMinutes","#cdSeconds"]);
      tickCountdown(payEnd, ["#payDays","#payHours"]);
    }, 1000);
  }
})();