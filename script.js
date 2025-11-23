// Basic navigation / demo data
function toggleMenu(){
  document.getElementById("menu")?.classList.toggle("hidden");
}
function logout(){
  location.href = "index.html";
}

// Fake login: just go to portal
document.getElementById("loginForm")?.addEventListener("submit", (e)=>{
  e.preventDefault();
  location.href = "portal.html";
});

// Countdown (demo)
function pad(n){ return String(n).padStart(2,"0"); }
function updateCountdown(target, ids){
  const now = new Date();
  let diff = target - now;
  if(diff < 0) diff = 0;
  const s = Math.floor(diff/1000);
  const days = Math.floor(s/86400);
  const hours = Math.floor((s%86400)/3600);
  const mins = Math.floor((s%3600)/60);
  const secs = s%60;
  document.getElementById(ids.days)?.textContent = pad(days);
  document.getElementById(ids.hours)?.textContent = pad(hours);
  document.getElementById(ids.mins)?.textContent = pad(mins);
  document.getElementById(ids.secs)?.textContent = pad(secs);
}

const regTarget = new Date("2025-10-13T17:00:00+08:00");
const payTarget = new Date("2025-10-13T23:59:00+08:00");
setInterval(()=>{
  updateCountdown(regTarget,{days:"regDays",hours:"regHours",mins:"regMins",secs:"regSecs"});
  updateCountdown(payTarget,{days:"payDays",hours:"payHours",mins:"payMins",secs:"paySecs"});
}, 1000);

// Placeholder PDF download
function downloadPlaceholder(){
  const content = `國立中興大學 115學年度 碩士班甄試\n成績單（示意）\n\n考生：許詠鈞\n系所：電機工程學系乙組\n\n※ 此為示意檔，之後會換成正式 PDF。`;
  const blob = new Blob([content], {type:"application/pdf"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "score_placeholder.pdf";
  a.click();
  URL.revokeObjectURL(url);
}
