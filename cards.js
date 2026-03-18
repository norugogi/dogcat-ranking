let allData = [];
let visibleCount = 0;
const loadStep = 30;

// JSON 로드 (실전)
fetch("./all_servers_ranking.json")
  .then(res => res.json())
  .then(json => {
    // 🔥 필수 데이터만 정리 (성능 + 안정)
    allData = json.map(c => ({
      name: c.gc_name || "이름없음",
      level: c.gc_level || 0,
      class: c.class || "Unknown",
      grade: Number(c.string_map?.grade || 0)
    }));

    renderMore();
  })
  .catch(err => {
    console.error("JSON 로드 실패:", err);
  });


// 카드 생성
function createCard(c) {
  const isGold = c.grade >= 24;

  const imgPath = `assets_classes/${c.class}_${isGold ? "gold" : "gray"}.png`;

  const el = document.createElement("div");
  el.className = "card";

  el.innerHTML = `
    <img src="${imgPath}" class="card-bg" onerror="this.src='assets_classes/Enforcer_gray.png'">

    <div class="card-inner">
      <div class="card-front">
        <div class="name">Lv.${c.level} ${c.name}</div>
      </div>

      <div class="card-back">
        <div class="desc">토벌 ${c.grade}</div>
      </div>
    </div>
  `;

  return el;
}


// 더보기 (실전)
function renderMore() {
  const container = document.getElementById("cardContainer");

  const end = Math.min(visibleCount + loadStep, allData.length);

  for (let i = visibleCount; i < end; i++) {
    container.appendChild(createCard(allData[i]));
  }

  visibleCount = end;
}


// 검색 (실전)
function searchCard() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const container = document.getElementById("cardContainer");

  container.innerHTML = "";
  visibleCount = 0;

  const filtered = allData.filter(c =>
    c.name.toLowerCase().includes(keyword)
  );

  filtered.forEach(c => container.appendChild(createCard(c)));
}
