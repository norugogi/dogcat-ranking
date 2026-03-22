let players = [];

const classMap = {
  AbyssRevenant:"심연추방자",
  Enforcer:"집행관",
  SolarSentinel:"태양감시자",
  RuneScribe:"주문각인사",
  MirageBlade:"환영검사",
  IncenseArcher:"향사수"
};

/***************************************
 * 🔥 초기 로딩
 ***************************************/
window.onload = function(){

  fetch("all_servers_ranking.json")
  .then(res => res.json())
  .then(data => {
    players = data;
    render(players); // 최초 렌더
  });

};


/***************************************
 * 🔥 렌더
 ***************************************/
function render(list){

  const tbody = document.getElementById("playerList");

  tbody.innerHTML = ""; // 항상 초기화

  let html = "";

  list.forEach(p => {

    let guild = p.guild_name || "";
    let name = p.gc_name || "";
    let level = p.gc_level || "";
    let grade = p.grade || "";
    let job = classMap[p.class] || p.class;

    html += `
    <tr>
      <td>${guild}</td>
      <td>${name}</td>
      <td>${level}</td>
      <td>${job}</td>
      <td>${grade}</td>
    </tr>
    `;
  });

  tbody.innerHTML = html;
}


/***************************************
 * 🔥 메뉴 (핵심 수정됨)
 ***************************************/
function menuClick(el){

  // active 처리
  document.querySelectorAll('.menu-item').forEach(btn=>{
    btn.classList.remove('active');
  });

  el.classList.add('active');

  const type = el.dataset.type;

  if(type === "all"){
    showAll();
  }
  else if(type === "dog"){
    showDOG();
  }
  else if(type === "cat"){
    showCAT();
  }
}


/***************************************
 * 🔥 화면 전환 + 데이터 처리
 ***************************************/
function showAll(){

  document.getElementById("rubyPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";

  render(players);
}

function showDOG(){

  document.getElementById("rubyPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";

  let list = players.filter(p => p.guild_name === "DOG");
  render(list);
}

function showCAT(){

  document.getElementById("rubyPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";

  let list = players.filter(p => p.guild_name === "CATT");
  render(list);
}


/***************************************
 * 🔥 통계
 ***************************************/
function openStats(){
  window.open(
    "stats.html",
    "statsPopup",
    "width=1000,height=750,top=120,left=250,resizable=yes,scrollbars=yes"
  );
}
