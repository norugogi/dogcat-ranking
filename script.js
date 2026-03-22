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
 * 🔥 초기 로딩 (핵심)
 ***************************************/
window.onload = function(){

  fetch("all_servers_ranking.json")
  .then(res => res.json())
  .then(data => {
    players = data;

    // 🔥 무조건 여기서 한번 렌더
    render(players);
  });

};


/***************************************
 * 🔥 렌더
 ***************************************/
function render(list){

  const tbody = document.getElementById("playerList");

  // 🔥 무조건 비우기 (핵심)
  tbody.innerHTML = "";

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
 * 🔥 메뉴
 ***************************************/
function showAll(){

  document.getElementById("rubyPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";

  if(players.length){
    render(players);
  }
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
