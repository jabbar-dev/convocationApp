
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
  
    // check username and password
    if (username === "admin" && password === "iba786") {
      localStorage.setItem('username', 'jabbar');
      window.location.replace('./qrcode.html');
    } else {
      alert('Invalid username or password');
    }
  });
  