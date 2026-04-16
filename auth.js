// Basic frontend JS for calling Node MySQL backend
// NOTE: Since server.js has NO CORS headers, open the site via a server.
// (Example: host these HTML files from the same Node server/origin.)

var API_URL = 'http://localhost:3000';

function showMsg(msg, ok) {
  var el = document.getElementById('loginResult');
  el.style.color = ok ? '#34D399' : '#FB7185';
  el.textContent = msg;
}

function validEmail(email) {
  if (email === '') return false;
  if (email.indexOf(' ') != -1) return false;
  if (email.indexOf('@') == -1) return false;
  if (email.indexOf('@') > email.indexOf('.')) return false;
  return true;
}

function doLogin() {
  var email = document.getElementById('loginEmail').value.trim();
  var pass = document.getElementById('loginPass').value.trim();

  if (!validEmail(email)) {
    alert('Email should contain @ and . !');
    return;
  }
  if (pass === '') {
    alert('Password cannot be empty!');
    return;
  }

  fetch(API_URL + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email, password: pass })
  })
    .then(function (r) { return r.json().then(function (data) { return { status: r.status, data: data }; }); })
    .then(function (res) {
      if (res.status === 200 && res.data.ok) {
        showMsg('Login successful! Welcome ' + res.data.user.name + '.', true);
        document.getElementById('loginForm').reset();
      } else {
        showMsg(res.data.message || 'Login failed', false);
      }
    })
    .catch(function () {
      showMsg('Server not running / connection error', false);
    });
}

function doSignup() {
  var name = document.getElementById('signupName').value.trim();
  var email = document.getElementById('signupEmail').value.trim();
  var pass = document.getElementById('signupPass').value.trim();

  if (name === '') {
    alert('Name cannot be empty!');
    return;
  }
  if (!validEmail(email)) {
    alert('Email should contain @ and . !');
    return;
  }
  if (pass === '') {
    alert('Password cannot be empty!');
    return;
  }
  if (pass.length < 6) {
    alert('Password should be at least 6 characters!');
    return;
  }

  fetch(API_URL + '/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name, email: email, password: pass })
  })
    .then(function (r) { return r.json().then(function (data) { return { status: r.status, data: data }; }); })
    .then(function (res) {
      if ((res.status === 200 || res.status === 201) && res.data.ok) {
        showMsg('Signup successful! Now login with your email.', true);
        document.getElementById('signupForm').reset();
      } else {
        showMsg(res.data.message || 'Signup failed', false);
      }
    })
    .catch(function () {
      showMsg('Server not running / connection error', false);
    });
}

document.getElementById('loginBtn').addEventListener('click', doLogin);
document.getElementById('signupBtn').addEventListener('click', doSignup);
