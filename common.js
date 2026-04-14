// Common basic JS for both pages

// =====================
// REGISTRATION VALIDATION
// =====================
if (document.getElementById('regForm')) {
  // Reference-style function name
  function calculate() {
    var nm = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var college = document.getElementById('college').value;
    var teamName = document.getElementById('teamName').value;
    var teamSize = document.getElementById('teamSize').value;

    if (nm === '') {
      alert('Name cannot be empty!');
      return false;
    }

    if (college === '') {
      alert('College/Company cannot be empty!');
      return false;
    }

    if (teamName === '') {
      alert('Team Name cannot be empty!');
      return false;
    }

    if (teamSize === '') {
      alert('Please select team size!');
      return false;
    }

    if (phone === '') {
      alert('Phone cannot be empty!');
      return false;
    }

    if (isNaN(phone) || phone.length != 10) {
      alert('Phone should be a number and 10 digits long!');
      return false;
    }

    if (email === '') {
      alert('Email cannot be empty!');
      return false;
    }

    if (email.indexOf(' ') != -1) {
      alert('Email cannot contain spaces!');
      return false;
    }

    if (email.indexOf('@') == -1 || email.indexOf('@') > email.indexOf('.')) {
      alert('Email should contain @ and . !');
      return false;
    }

    var eventNameEl = document.getElementById('eventName');
    var eventName = eventNameEl ? eventNameEl.textContent : 'the event';

    document.getElementById('result').textContent = 'Registration successful for ' + eventName + '. Welcome, ' + nm + '!';
    document.getElementById('regForm').reset();
    return true;
  }

  window.calculate = calculate;
}
