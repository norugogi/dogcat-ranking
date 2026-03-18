let allData = [];

async function loadData(){
  const res = await fetch("all_servers_ranking.json");
  const data = await res.json();

  allData = data;

  renderCards(data);
}

function renderCards(data){
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  data.forEach(player => {

    const className = player.class;

    const grayImg = `assets_classes/${className}_gray.png`;
    const goldImg = `assets_classes/${className}_gold.png`;

    const card = document.createElement("div");
    card.className = "card";

    // 🔥 검색용 데이터 저장
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
          <div class="back-guild">${player.guild_name}</div>
          <div class="back-power">전투력: -</div>
          <div class="back-desc">특징: -</div>
        </div>

      </div>
    `;

    card.onclick = () => flipCard(card);

    container.appendChild(card);
  });
}

/* 카드 뒤집기 */
function flipCard(card){
  card.classList.toggle("flipped");
}

/* 🔍 검색 기능 */
function searchCard(){
  const input = document.getElementById("searchInput").value.trim();

  if(!input) return;

  const cards = document.querySelectorAll(".card");

  let found = false;

  cards.forEach(card => {
    card.classList.remove("highlight");

    const name = card.getAttribute("data-name");

    if(name.includes(input)){
      found = true;

      card.classList.add("highlight");

      card.scrollIntoView({
        behavior:"smooth",
        block:"center"
      });
    }
  });

  if(!found){
    alert("해당 닉네임을 찾을 수 없습니다.");
  }
}

loadData();