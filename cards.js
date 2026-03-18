let allData = [];
let currentIndex = 0;
const pageSize = 20;

async function loadData() {
  const res = await fetch("all_servers_ranking.json");
  allData = await res.json();
  renderCards();
}

function renderCards() {
  const container = document.getElementById("cardContainer");

  for (let i = currentIndex; i < currentIndex + pageSize && i < allData.length; i++) {
    const p = allData[i];

    const card = document.createElement("div");
    card.className = "card";

    const imgPath = `assets_classes/${p.class}_gold.png`;

    card.innerHTML = `
      <div class="card-inner">

        <div class="card-front">
          <img src="${imgPath}" style="width:100%; height:100%; object-fit:cover;">
          <div style="position:absolute; top:10px; left:10px; color:white; font-weight:bold;">
            Lv.${p.gc_level} (${p.grade})
          </div>
          <div style="position:absolute; bottom:20px; width:100%; text-align:center; color:white; font-size:18px;">
            ${p.gc_name}
          </div>
        </div>

        <div class="card-back">
          ${p.guild_name}
        </div>

      </div>
    `;

    card.onclick = () => card.classList.toggle("flipped");

    container.appendChild(card);
  }

  currentIndex += pageSize;
}

function loadMore() {
  renderCards();
}

function searchCard() {
  const keyword = document.getElementById("searchInput").value;

  const container = document.getElementById("cardContainer");
  container.innerHTML = "";
  currentIndex = 0;

  allData = allData.filter(p => p.gc_name.includes(keyword));

  renderCards();
}

loadData();
