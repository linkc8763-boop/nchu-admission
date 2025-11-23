// ===== Simple SPA-ish logic =====
const STORAGE_KEY = "nchu_admission_user";

function saveUser(u){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
}
function loadUser(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); }
  catch { return null; }
}

// Login handling
const loginForm = document.getElementById("loginForm");
if (loginForm){
  loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const account = document.getElementById("account").value.trim();
    const password = document.getElementById("password").value.trim();
    if(!account || !password){ return; }

    // For demo: accept anything, but keep your actual data if entered
    const user = loadUser() || {};
    user.id = account;
    saveUser(user);

    window.location.href = "./portal.html";
  });
}

// Menu toggle
window.toggleMenu = function(){
  const m = document.getElementById("menu");
  if(!m) return;
  m.classList.toggle("hidden");
}

// Mock navigation
window.goUpload = ()=>alert("此功能為示意，之後可接真實上傳頁面");
window.goResume = ()=>alert("此功能為示意，之後可接真實填寫頁面");

// Fill portal / result data if present
document.addEventListener("DOMContentLoaded", ()=>{
  const u = loadUser();
  if(!u) return;

  const nameEl = document.getElementById("studentName");
  if(nameEl && u.name) nameEl.textContent = u.name;

  const rMap = {
    rName: u.name,
    rId: u.id,
    rExamNo: u.examNo,
    rDept: u.dept,
    rReview: u.reviewScore,
    rInterview: u.interviewScore,
    rFinal: u.finalScore,
    rStatus: u.status
  };
  Object.entries(rMap).forEach(([id,val])=>{
    const el = document.getElementById(id);
    if(el && val != null) el.textContent = val;
  });

  // simple fake timers (static zeros to mimic screenshot)
});
