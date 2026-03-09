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

let html = "";

data.forEach(p => {

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

});


// 갱신시간 표시
const now = new Date();

const formatted =
now.getFullYear() + "." +
String(now.getMonth()+1).padStart(2,"0") + "." +
String(now.getDate()).padStart(2,"0") + " " +
String(now.getHours()).padStart(2,"0") + ":" +
String(now.getMinutes()).padStart(2,"0");

document.getElementById("updateTime").innerText = formatted;