// Basic Node.js + MySQL2 backend for Login/Signup (no express, no cors)

var http = require('http');
var mysql = require('mysql2');
var path = require('path');
var fs = require('fs');

// MySQL connection (update as needed)
var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'BTECHCYBERSEMII'
});

con.connect(function (err) {
  if (err) {
    console.log('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL!');

  var sql =
    'CREATE TABLE IF NOT EXISTS users (' +
    'id INT AUTO_INCREMENT PRIMARY KEY,' +
    'name VARCHAR(100) NOT NULL,' +
    'email VARCHAR(255) NOT NULL UNIQUE,' +
    'password VARCHAR(255) NOT NULL' +
    ')';

  con.query(sql, function (err2) {
    if (err2) {
      console.log('Table create error:', err2);
      return;
    }
    console.log('Table ready: users');
  });
});

// Directory to serve static files from
var STATIC_DIR = __dirname;

function sendJson(res, statusCode, obj) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json'
  });
  res.end(JSON.stringify(obj));
}

function readBody(req, cb) {
  var data = '';
  req.on('data', function (chunk) {
    data += chunk;
  });
  req.on('end', function () {
    try {
      var body = data ? JSON.parse(data) : {};
      cb(null, body);
    } catch (e) {
      cb(e);
    }
  });
}

function validEmail(email) {
  if (email === '') return false;
  if (email.indexOf(' ') != -1) return false;
  if (email.indexOf('@') == -1) return false;
  if (email.indexOf('@') > email.indexOf('.')) return false;
  return true;
}

function handleSignup(req, res) {
  readBody(req, function (err, body) {
    if (err) return sendJson(res, 400, { ok: false, message: 'Invalid JSON' });

    var name = (body.name || '').trim();
    var email = (body.email || '').trim();
    var password = (body.password || '').trim();

    if (name === '' || email === '' || password === '') {
      return sendJson(res, 400, { ok: false, message: 'All fields required' });
    }

    if (!validEmail(email)) {
      return sendJson(res, 400, { ok: false, message: 'Invalid email' });
    }

    if (password.length < 6) {
      return sendJson(res, 400, { ok: false, message: 'Password must be at least 6 characters' });
    }

    var sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    con.query(sql, [name, email, password], function (err2) {
      if (err2) {
        if (err2.code === 'ER_DUP_ENTRY') {
          return sendJson(res, 409, { ok: false, message: 'Email already registered' });
        }
        return sendJson(res, 500, { ok: false, message: 'DB error', error: err2.code });
      }

      sendJson(res, 200, { ok: true, message: 'Signup successful' });
    });
  });
}

function handleLogin(req, res) {
  readBody(req, function (err, body) {
    if (err) return sendJson(res, 400, { ok: false, message: 'Invalid JSON' });

    var email = (body.email || '').trim();
    var password = (body.password || '').trim();

    if (email === '' || password === '') {
      return sendJson(res, 400, { ok: false, message: 'Email and password required' });
    }

    var sql = 'SELECT id, name, email FROM users WHERE email=? AND password=? LIMIT 1';
    con.query(sql, [email, password], function (err2, rows) {
      if (err2) {
        return sendJson(res, 500, { ok: false, message: 'DB error', error: err2.code });
      }

      if (!rows || rows.length === 0) {
        return sendJson(res, 401, { ok: false, message: 'Invalid credentials' });
      }

      sendJson(res, 200, { ok: true, message: 'Login successful', user: rows[0] });
    });
  });
}

function serveStaticFile(req, res) {
  var safePath = path.normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^\/+/, '');
  if (safePath === '' || safePath === 'index.html') safePath = 'landing.html';
  if (safePath === 'regi.html') safePath = 'regi.html'; // always serve regi.html for any query
  var filePath = path.join(STATIC_DIR, safePath);

  // Prevent directory traversal
  if (!filePath.startsWith(STATIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, function (err, stats) {
    if (err || !stats.isFile()) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    var ext = path.extname(filePath).toLowerCase();
    var type = 'text/plain';
    if (ext === '.html') type = 'text/html';
    else if (ext === '.css') type = 'text/css';
    else if (ext === '.js') type = 'application/javascript';
    else if (ext === '.json') type = 'application/json';
    res.writeHead(200, { 'Content-Type': type });
    fs.createReadStream(filePath).pipe(res);
  });
}

function router(req, res) {
  // Serve API endpoints
  if (req.method === 'GET' && req.url === '/') {
    return serveStaticFile({ ...req, url: '/landing.html' }, res);
  }
  if (req.method === 'POST' && req.url === '/signup') {
    return handleSignup(req, res);
  }
  if (req.method === 'POST' && req.url === '/login') {
    return handleLogin(req, res);
  }
  // Serve static files for GET requests
  if (req.method === 'GET') {
    return serveStaticFile(req, res);
  }
  sendJson(res, 404, { ok: false, message: 'Not found' });
}

var PORT = 3000;
http.createServer(router).listen(PORT, function () {
  console.log('Server running on http://localhost:' + PORT);
});
