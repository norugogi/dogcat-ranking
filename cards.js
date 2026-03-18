let allData = [];
let visibleCount = 20;

/* 메뉴 활성화 */
function setActive(el){
  document.querySelectorAll(".menu-item").forEach(m=>m.classList.remove("active"));
  el.classList.add("active");
}

/* 테이블 보기 */
function showTable(el){
  setActive(el);
  document.getElementById("tableSection").style.display = "block";
  document.getElementById("cardSection").style.display = "none";
}

/* 카드 보기 */
function showCards(el){
  setActive(el);
  document.getElementById("tableSection").style.display = "none";
  document.getElementById("cardSection").style.display = "block";

  if(allData.length === 0){
    loadData();
  }
}

/* 데이터 로드 */
async function loadData(){
  const res = await fetch("all_servers_ranking.json");
  const data = await res.json();

  allData = data.sort((a,b)=>b.gc_level-a.gc_level);

  renderCards();
}

/* 카드 렌더 */
function renderCards(){
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  const slice = allData.slice(0, visibleCount);

  slice.forEach(player=>{
    const className = player.class;

    const grayImg = `assets_classes/${className}_gray.png`;
    const goldImg = `assets_classes/${className}_gold.png`;

    const card = document.createElement("div");
    card.className = "card";

    card.setAttribute("data-name", player.gc_name);

    card.style.setProperty("--gray-img", `url('${grayImg}')`);
    card.style.setProperty("--gold-img", `url('${goldImg}')`);

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <div class="level">Lv.${player.gc_level}</div>
          <div class="grade">${player.grade}</div>
          <div class="name">${player.gc_name}</div>
        </div>

        <div class="card-back">
          <div>${player.guild_name}</div>
          <div>전투력: -</div>
          <div>특징: -</div>
        </div>
      </div>
    `;

    card.onclick = ()=>card.classList.toggle("flipped");

    container.appendChild(card);
  });
}

/* 더보기 */
function loadMore(){
  visibleCount += 20;
  renderCards();
}

/* 검색 */
function searchCard(){
  const input = document.getElementById("searchInput").value.trim();
  if(!input) return;

  const cards = document.querySelectorAll(".card");

  let found = false;

  cards.forEach(card=>{
    card.classList.remove("highlight");

    if(card.dataset.name.includes(input)){
      found = true;
      card.classList.add("highlight");

      card.scrollIntoView({
        behavior:"smooth",
        block:"center"
      });
    }
  });

  if(!found){
    alert("닉네임 없음");
  }
}
