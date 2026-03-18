let originalData = [];
let filteredData = [];
let currentIndex = 0;
const pageSize = 20;

async function loadData() {
  const res = await fetch("all_servers_ranking.json");
  originalData = await res.json();
  filteredData = [...originalData];

  renderCards(true);
}

function renderCards(reset = false) {
  const container = document.getElementById("cardContainer");

  if (reset) {
    container.innerHTML = "";
    currentIndex = 0;
  }

  const end = Math.min(currentIndex + pageSize, filteredData.length);

  for (let i = currentIndex; i < end; i++) {
    const p = filteredData[i];

    const card = document.createElement("div");
    card.className = "card";

    const img = `assets_classes/${p.class}_gold.png`;

    card.innerHTML = `
      <div class="card-inner">

        <div class="card-front">
          card.innerHTML = `
<div class="card"
     style="
     --gray-img: url('assets_classes/${p.class}_gray.png');
     --gold-img: url('assets_classes/${p.class}_gold.png');
     ">

  <div class="card-inner">

    <div class="card-front">
      <div class="level">Lv.${p.gc_level}</div>
      <div class="grade">${p.grade}</div>
      <div class="name">${p.gc_name}</div>
    </div>

    <div class="card-back">
      <div class="back-guild">${p.guild_name}</div>
      <div class="back-power">전투력: -</div>
      <div class="back-desc">특징: -</div>
    </div>

  </div>
</div>
`;
          <div class="level">Lv.${p.gc_level} (${p.grade})</div>
          <div class="name">${p.gc_name}</div>
        </div>

        <div class="card-back">
          <div>${p.guild_name}</div>
          <div>전투력: -</div>
          <div>특징: -</div>
        </div>

      </div>
    `;

    card.onclick = () => card.classList.toggle("flipped");

    container.appendChild(card);
  }

  currentIndex = end;

  document.getElementById("loadMoreBtn").style.display =
    currentIndex >= filteredData.length ? "none" : "block";
}

function loadMore() {
  renderCards();
}

function searchCard() {
  const keyword = document.getElementById("searchInput").value;

  filteredData = originalData.filter(p =>
    p.gc_name.includes(keyword)
  );

  renderCards(true);
}

loadData();
