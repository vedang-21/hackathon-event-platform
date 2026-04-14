// Basic registration page script (simple validation)

var EVENT_MAP = {
  "neo-verse": "NeoVerse Hack",
  "cloud-sprint": "CloudSprint",
  "fintech-forge": "FinTech Forge",
  "health-hack": "HealthHack Arena",
  "greenbyte": "GreenByte",
  "cyber-clash": "CyberClash",
  "ui-odyssey": "UI Odyssey",
  "iot-ignite": "IoT Ignite",
  "data-drift": "DataDrift",
  "game-jam": "Pixel Game Jam",
  "edu-spark": "EduSpark",
  "robot-rumble": "RoboRumble"
};

function getQueryParam(name) {
  var params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function setEventTitle() {
  var id = getQueryParam('event');
  var name = EVENT_MAP[id];
  if (!name) name = 'an event';
  document.getElementById('eventName').textContent = name;
}

function isEmail(email) {
  // very basic
  return email.indexOf('@') !== -1 && email.indexOf('.') !== -1;
}

function isPhone10(phone) {
  if (phone.length !== 10) return false;
  for (var i = 0; i < phone.length; i++) {
    var c = phone.charCodeAt(i);
    if (c < 48 || c > 57) return false;
  }
  return true;
}

function clearErrors() {
  document.getElementById('errName').textContent = '';
  document.getElementById('errEmail').textContent = '';
  document.getElementById('errPhone').textContent = '';
  document.getElementById('errCollege').textContent = '';
  document.getElementById('errTeam').textContent = '';
  document.getElementById('errSize').textContent = '';
}

function validateForm() {
  clearErrors();
  var ok = true;

  var fullName = document.getElementById('fullName').value.trim();
  var email = document.getElementById('email').value.trim();
  var phone = document.getElementById('phone').value.trim();
  var college = document.getElementById('college').value.trim();
  var teamName = document.getElementById('teamName').value.trim();
  var teamSize = document.getElementById('teamSize').value;

  if (fullName.length < 3) {
    document.getElementById('errName').textContent = 'Enter your name.';
    ok = false;
  }

  if (!isEmail(email)) {
    document.getElementById('errEmail').textContent = 'Enter valid email.';
    ok = false;
  }

  if (!isPhone10(phone)) {
    document.getElementById('errPhone').textContent = 'Enter 10 digit phone.';
    ok = false;
  }

  if (college.length < 2) {
    document.getElementById('errCollege').textContent = 'Enter college/company.';
    ok = false;
  }

  if (teamName.length < 2) {
    document.getElementById('errTeam').textContent = 'Enter team name.';
    ok = false;
  }

  if (teamSize === '') {
    document.getElementById('errSize').textContent = 'Select team size.';
    ok = false;
  }

  return ok;
}

document.getElementById('regForm').addEventListener('submit', function (e) {
  e.preventDefault();

  var result = document.getElementById('result');
  result.textContent = '';

  if (!validateForm()) return;

  var eventName = document.getElementById('eventName').textContent;
  var name = document.getElementById('fullName').value.trim();

  result.textContent = 'Registration successful for ' + eventName + '. Welcome, ' + name + '!';
  document.getElementById('regForm').reset();
});

setEventTitle();
