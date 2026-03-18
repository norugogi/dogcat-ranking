const data = [
  {
    gc_name: "맛나는꼬꼬",
    gc_level: 93,
    class: "AbyssRevenant",
    grade: 24
  },
  {
    gc_name: "아톰",
    gc_level: 92,
    class: "Enforcer",
    grade: 22
  }
];

let visibleCount = 0;
const loadCount = 10;

function createCard(character) {
  const isGold = character.grade >= 24;
  const imgPath = `assets_classes/${character.class}_${isGold ? "gold" : "gray"}.png`;

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${imgPath}" class="card-bg">

    <div class="card-inner">
      <div class="card-front">
        <span class="name">Lv.${character.gc_level} ${character.gc_name}</span>
      </div>

      <div class="card-back">
        <span class="desc">특징 없음</span>
      </div>
    </div>
  `;

  return card;
}

function loadMore() {
  const container = document.getElementById("cardContainer");

  for (let i = visibleCount; i < visibleCount + loadCount && i < data.length; i++) {
    container.appendChild(createCard(data[i]));
  }

  visibleCount += loadCount;
}

function searchCard() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const container = document.getElementById("cardContainer");

  container.innerHTML = "";

  data
    .filter(c => c.gc_name.toLowerCase().includes(keyword))
    .forEach(c => container.appendChild(createCard(c)));
}

// 초기 로딩
loadMore();
