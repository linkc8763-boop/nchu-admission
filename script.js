// Simple mock login + menu + countdown
const mockUser = {
  name: "許詠鈞",
  username: "B123424288",
  password: "1124" // 月日
};

function byId(id){ return document.getElementById(id) }

function setCountdown(rootId, targetDate, units){
  const root = byId(rootId);
  if(!root) return;
  const nums = root.querySelectorAll(".count-num");
  function tick(){
    const now = new Date().getTime();
    const diff = Math.max(0, targetDate - now);
    const s = Math.floor(diff/1000);
    const days = Math.floor(s/86400);
    const hours = Math.floor((s%86400)/3600);
    const minutes = Math.floor((s%3600)/60);
    const seconds = s%60;
    const map = {days, hours, minutes, seconds};
    nums.forEach(n=>{
      const u = n.dataset.unit;
      if(map[u] !== undefined){
        n.textContent = String(map[u]).padStart(2,"0");
      }
    });
  }
  tick();
  setInterval(tick, 1000);
}

document.addEventListener("DOMContentLoaded", ()=>{
  // login
  const loginBtn = byId("loginBtn");
  if(loginBtn){
    loginBtn.addEventListener("click", ()=>{
      const u = (byId("account").value || "").trim();
      const p = (byId("password").value || "").trim();
      if(u === mockUser.username && p === mockUser.password){
        localStorage.setItem("nchu_logged_in","1");
        location.href = "portal.html";
      }else{
        alert("帳號或密碼錯誤（示範系統）");
      }
    });
  }

  // guard portal/result
  if(location.pathname.endsWith("portal.html") || location.pathname.endsWith("result.html")){
    if(localStorage.getItem("nchu_logged_in") !== "1"){
      // still allow viewing, but keep minimal
      console.warn("Not logged in (demo).");
    }
  }

  // menu
  const menuBtn = byId("menuBtn");
  const menuPanel = byId("menuPanel");
  const menuBackdrop = byId("menuBackdrop");
  const menuClose = byId("menuClose");
  function openMenu(){
    menuPanel?.classList.add("open");
    if(menuBackdrop){ menuBackdrop.hidden=false; }
  }
  function closeMenu(){
    menuPanel?.classList.remove("open");
    if(menuBackdrop){ menuBackdrop.hidden=true; }
  }
  menuBtn?.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);
  menuBackdrop?.addEventListener("click", closeMenu);

  // logout
  const logoutBtn = byId("logoutBtn");
  logoutBtn?.addEventListener("click", ()=>{
    localStorage.removeItem("nchu_logged_in");
    location.href = "index.html";
  });

  // countdowns (Taiwan local dates assumed)
  setCountdown("regCountdown", new Date("2025-10-13T17:00:00+08:00").getTime());
  setCountdown("payCountdown", new Date("2025-10-13T23:59:00+08:00").getTime());
});
