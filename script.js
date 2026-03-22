let players = [];
let rubyData = [];

const classMap = {
  AbyssRevenant:"심연추방자",
  Enforcer:"집행관",
  SolarSentinel:"태양감시자",
  RuneScribe:"주문각인사",
  MirageBlade:"환영검사",
  IncenseArcher:"향사수"
};

/***************************************
 * 기존 결사원 데이터
 ***************************************/
fetch("all_servers_ranking.json")
.then(res => res.json())
.then(data => {
  players = data;
  showAll();
});

/***************************************
 * 🔥 루비 데이터 fetch (추가)
 ***************************************/
fetch("https://raw.githubusercontent.com/norugogi/dogcat-ranking/main/ruby_ranking.json")
.then(res => res.json())
.then(data => {
  rubyData = data.data;
  console.log("루비 데이터 로드 완료", rubyData);

  renderRuby(); // 🔥 이거 추가
});


/***************************************
 * 기존 렌더
 ***************************************/
function render(list){

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

  document.getElementById("playerList").innerHTML = html;
}

/***************************************
 * 기존 메뉴
 ***************************************/
function showAll(){
  document.getElementById("rubyPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";
  render(players);
}

function showDOG(){
  let list = players.filter(p => p.guild_name === "DOG");
  render(list);
}

function showCAT(){
  let list = players.filter(p => p.guild_name === "CATT");
  render(list);
}

function openStats(){
  window.open(
    "stats.html",
    "statsPopup",
    "width=1000,height=750,top=120,left=250,resizable=yes,scrollbars=yes"
  );
}


/***************************************
 * 🔥 루비 페이지
 ***************************************/
function showRuby(){
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("rubyPage").style.display = "block";

  if(rubyData.length){
    renderRuby();
  }
}


/***************************************
 * 🔥 루비 렌더 핵심
 ***************************************/
function renderRuby(){

  if(!rubyData.length) return;

  // UID 기준 합산
  let map = {};

  rubyData.forEach(r => {

    const key = r.uid;

    if(!map[key]){
      map[key] = {
        uid: r.uid,
        name: r.name,
        group: r.group,
        total: 0,
        week: r.week,
        season: r.season
      };
    }

    map[key].total += Number(r.value || 0);
  });

  let list = Object.values(map);

  // 정렬 (내림차순)
  list.sort((a,b)=> b.total - a.total);

  // 게이지 계산
  const totalSum = list.reduce((sum,v)=> sum + v.total, 0);
  const goal = 50000000;
  const percent = Math.min((totalSum / goal) * 100, 100);

  document.getElementById("rubyBar").style.width = percent + "%";
  document.getElementById("rubyText").innerText = `${totalSum.toLocaleString()} / ${goal.toLocaleString()}`;
  document.getElementById("rubyPercent").innerText = percent.toFixed(1) + "%";


  // 테이블 출력
  let html = "";

  list.forEach((p, i) => {

    html += `
    <tr>
      <td>${i+1}</td>
      <td>${p.season}</td>
      <td>${p.week}</td>
      <td>${p.group}</td>
      <td>${p.name}</td>
      <td>${p.total.toLocaleString()}</td>
      <td>${p.total.toLocaleString()}</td>
    </tr>
    `;
  });

  document.getElementById("rubyTable").innerHTML = html;
}
