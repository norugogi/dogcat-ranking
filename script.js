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
  render(players);
});

/***************************************
 * 🔥 루비 데이터 fetch
 ***************************************/
fetch("https://raw.githubusercontent.com/norugogi/dogcat-ranking/main/ruby_ranking.json")
.then(res => res.json())
.then(data => {
  rubyData = data.data;
  console.log("루비 데이터 로드 완료", rubyData);

  initFilters();   // 🔥 필터 초기화 추가
  renderRuby();    // 🔥 최초 렌더
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
 * 🔥 필터 값 가져오기
 ***************************************/
function getFilters(){
  return {
    group: document.getElementById("groupFilter").value,
    season: document.getElementById("seasonFilter").value,
    week: document.getElementById("weekFilter").value
  };
}


/***************************************
 * 🔥 필터 옵션 생성
 ***************************************/
function initFilters(){

  const seasons = [...new Set(rubyData.map(r => r.season))];
  const weeks = [...new Set(rubyData.map(r => r.week))];

  const seasonSelect = document.getElementById("seasonFilter");
  const weekSelect = document.getElementById("weekFilter");

  // 기존 옵션 초기화 (중복 방지)
  seasonSelect.innerHTML = `<option value="all">전체 시즌</option>`;
  weekSelect.innerHTML = `<option value="all">전체 주차</option>`;

  seasons.forEach(s => {
    seasonSelect.innerHTML += `<option value="${s}">${s}</option>`;
  });

  weeks.forEach(w => {
    weekSelect.innerHTML += `<option value="${w}">${w}주차</option>`;
  });
}


/***************************************
 * 🔥 루비 렌더 핵심 (필터 포함)
 ***************************************/
function renderRuby(){

  if(!rubyData.length) return;

  const filters = getFilters();

  // 🔥 필터 적용
  let filtered = rubyData.filter(r => {

    if(filters.group !== "all" && r.group !== filters.group) return false;
    if(filters.season !== "all" && r.season !== filters.season) return false;
    if(filters.week !== "all" && String(r.week) !== filters.week) return false;

    return true;
  });

  // 🔥 UID 기준 합산
  let map = {};

  filtered.forEach(r => {

    const key = r.uid;

    if(!map[key]){
      map[key] = {
        uid: r.uid,
        name: r.name,
        group: r.group,
        total: 0,
        weekValue: 0,
        season: r.season,
        week: r.week
      };
    }

    map[key].total += Number(r.value || 0);
    map[key].weekValue += Number(r.value || 0);
  });

  let list = Object.values(map);

  // 🔥 정렬
  list.sort((a,b)=> b.total - a.total);

  // 🔥 게이지 계산
  const totalSum = list.reduce((sum,v)=> sum + v.total, 0);
  const goal = 50000000;
  const percent = Math.min((totalSum / goal) * 100, 100);

  document.getElementById("rubyBar").style.width = percent + "%";
  document.getElementById("rubyText").innerText = `${totalSum.toLocaleString()} / ${goal.toLocaleString()}`;
  document.getElementById("rubyPercent").innerText = percent.toFixed(1) + "%";

  // 🔥 테이블 출력
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
      <td>${p.weekValue.toLocaleString()}</td>
    </tr>
    `;
  });

  document.getElementById("rubyTable").innerHTML = html;
}


/***************************************
 * 🔥 필터 이벤트 연결
 ***************************************/
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("groupFilter").addEventListener("change", renderRuby);
  document.getElementById("seasonFilter").addEventListener("change", renderRuby);
  document.getElementById("weekFilter").addEventListener("change", renderRuby);
});
