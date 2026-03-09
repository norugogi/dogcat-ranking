const classMap = {

AbyssRevenant:"심연추방자",
Enforcer:"집행관",
SolarSentinel:"태양감시자",
RuneScribe:"주문각인사",
MirageBlade:"환영검사",
IncenseArcher:"향사수"

};

fetch("all_servers_ranking.json")
.then(res => res.json())
.then(data => {

let levelStats = {};
let gradeStats = {};
let classStats = {};

data.forEach(p => {

let level = p.gc_level;
let grade = p.grade;
let cls = classMap[p.class] || p.class;

levelStats[level] = (levelStats[level] || 0) + 1;
gradeStats[grade] = (gradeStats[grade] || 0) + 1;
classStats[cls] = (classStats[cls] || 0) + 1;

});

renderStats("levelStats",levelStats);
renderStats("gradeStats",gradeStats);
renderStats("classStats",classStats);

});

function renderStats(id,data){

let html = "<table style='margin:auto;'>";

for(let key in data){

html += `<tr><td>${key}</td><td>${data[key]}명</td></tr>`;

}

html += "</table>";

document.getElementById(id).innerHTML = html;

}