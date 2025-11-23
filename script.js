// Simple static mock for NCHU admission site

const USER = {
  id: "B123424288",
  ticket: "A1863124",
  name: "許詠鈞",
  dept: "電機工程學系乙組",
  review: "72.8",
  interview: "80.0",
  finalScore: "76.4",
  admit: "備取8"
};

function $(sel){ return document.querySelector(sel); }

function saveLogin(){
  localStorage.setItem("nchu_logged_in","1");
}

function isLoggedIn(){
  return localStorage.getItem("nchu_logged_in") === "1";
}

function logout(){
  localStorage.removeItem("nchu_logged_in");
  location.href="index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  // INDEX (login)
  if ($("#loginBtn")){
    $("#loginBtn").addEventListener("click", () => {
      const id = ($("#idInput").value || "").trim();
      const pw = ($("#pwInput").value || "").trim();
      const msg = $("#loginMsg");

      if (!id || !pw){
        msg.textContent = "請輸入帳號與密碼";
        return;
      }
      if (id === USER.id){
        saveLogin();
        location.href="portal.html";
      } else {
        msg.textContent = "帳號或密碼錯誤";
      }
    });
    $("#forgotBtn")?.addEventListener("click", () => {
      alert("此為示範網站，忘記密碼功能未啟用。");
    });
  }

  // PORTAL
  if (document.body.classList.contains("portal-body")){
    if (!isLoggedIn()) { location.href="index.html"; return; }
    $("#candName").textContent = USER.name;

    // basic menu (tap logo to logout)
    document.querySelector(".topbar-logo")?.addEventListener("click", logout);

    // jump to result when clicking 成績查詢 column in table (for demo)
    document.querySelectorAll(".info-table th, .info-table td").forEach(el=>{
      if (el.textContent.includes("成績查詢")){
        el.style.cursor="pointer";
        el.addEventListener("click", ()=> location.href="result.html");
      }
    });
  }

  // RESULT
  if (document.body.classList.contains("result-body")){
    if (!isLoggedIn()) { location.href="index.html"; return; }
    $("#rId").textContent = USER.id;
    $("#rTicket").textContent = USER.ticket;
    $("#rName").textContent = USER.name;
    $("#rDept").textContent = USER.dept;
    $("#rReview").textContent = USER.review;
    $("#rInterview").textContent = USER.interview;
    $("#rFinal").textContent = USER.finalScore;
    $("#rAdmit").textContent = USER.admit;
  }
});
