// Basic events page script (no advanced JS)

var EVENTS = [
  { id: "neo-verse", name: "NeoVerse Hack", mode: "hybrid", location: "Bengaluru", date: "May 25–26, 2026", theme: "AI x Web", prize: "₹5,00,000", logo: "NV" },
  { id: "cloud-sprint", name: "CloudSprint", mode: "online", location: "Online", date: "Jun 1–2, 2026", theme: "Cloud + DevOps", prize: "$12,000", logo: "CS" },
  { id: "fintech-forge", name: "FinTech Forge", mode: "inperson", location: "Mumbai", date: "Jun 8–9, 2026", theme: "Payments & Security", prize: "₹3,50,000", logo: "FF" },
  { id: "health-hack", name: "HealthHack Arena", mode: "hybrid", location: "Pune", date: "Jun 15–16, 2026", theme: "HealthTech", prize: "₹4,00,000", logo: "HH" },
  { id: "greenbyte", name: "GreenByte", mode: "online", location: "Online", date: "Jun 22–23, 2026", theme: "Climate", prize: "$8,000", logo: "GB" },
  { id: "cyber-clash", name: "CyberClash", mode: "inperson", location: "Hyderabad", date: "Jun 29–30, 2026", theme: "Cybersecurity", prize: "₹2,50,000", logo: "CC" },
  { id: "ui-odyssey", name: "UI Odyssey", mode: "online", location: "Online", date: "Jul 6–7, 2026", theme: "Design Systems", prize: "$5,000", logo: "UO" },
  { id: "iot-ignite", name: "IoT Ignite", mode: "hybrid", location: "Chennai", date: "Jul 13–14, 2026", theme: "IoT", prize: "₹3,00,000", logo: "II" },
  { id: "data-drift", name: "DataDrift", mode: "online", location: "Online", date: "Jul 20–21, 2026", theme: "Data Science", prize: "$10,000", logo: "DD" },
  { id: "game-jam", name: "Pixel Game Jam", mode: "inperson", location: "Delhi", date: "Jul 27–28, 2026", theme: "GameDev", prize: "₹2,00,000", logo: "PG" },
  { id: "edu-spark", name: "EduSpark", mode: "hybrid", location: "Kolkata", date: "Aug 3–4, 2026", theme: "EdTech", prize: "₹3,75,000", logo: "ES" },
  { id: "robot-rumble", name: "RoboRumble", mode: "inperson", location: "Ahmedabad", date: "Aug 10–11, 2026", theme: "Robotics", prize: "₹6,00,000", logo: "RR" }
];

function makeCardHtml(e) {
  return (
    '<a class="card" href="regi.html?event=' + encodeURIComponent(e.id) + '">' +
      '<div class="cardTop">' +
        '<div class="logo"><span>' + e.logo + '</span></div>' +
        '<div class="meta">' +
          '<h3 class="title">' + e.name + '</h3>' +
          '<p class="sub">' + e.theme + ' • ' + e.mode.toUpperCase() + ' • ' + e.location + '</p>' +
        '</div>' +
      '</div>' +
      '<div class="chips">' +
        '<span class="chip">' + e.date + '</span>' +
        '<span class="chip chipPrize">Prize: ' + e.prize + '</span>' +
      '</div>' +
      '<div class="ctaRow"><span class="cta">Register →</span></div>' +
    '</a>'
  );
}

function renderEvents(list) {
  var grid = document.getElementById('grid');
  var html = '';
  for (var i = 0; i < list.length; i++) {
    html += makeCardHtml(list[i]);
  }
  grid.innerHTML = html;
}

function applyFilters() {
  var q = document.getElementById('search').value.toLowerCase();
  var m = document.getElementById('mode').value;

  var filtered = [];
  for (var i = 0; i < EVENTS.length; i++) {
    var e = EVENTS[i];
    var text = (e.name + ' ' + e.theme + ' ' + e.location + ' ' + e.mode).toLowerCase();
    var okQ = (q === '') || (text.indexOf(q) !== -1);
    var okM = (m === 'all') || (e.mode === m);
    if (okQ && okM) filtered.push(e);
  }

  renderEvents(filtered);
}

document.getElementById('search').addEventListener('keyup', applyFilters);
document.getElementById('mode').addEventListener('change', applyFilters);

renderEvents(EVENTS);
