// Dummy database for users
let users = [];
let loggedInUser = null;
let userStocks = {};

document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    loggedInUser = username; // No need to check if the user exists
    alert(`${username} logged in`);
    window.location.assign('market.html');  // Redirect to market page
});

document.getElementById('signupForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('newUsername').value;
    users.push({ username: username });
    loggedInUser = username;
    alert(`${username} signed up`);
    window.location.href = 'market.html';
});

function buyStock(stock) {
    if (!loggedInUser) return alert("Please log in first!");
    
    const stockPrice = parseInt(document.getElementById(`${stock.toLowerCase()}Price`).innerText.slice(1));
    if (!userStocks[loggedInUser]) userStocks[loggedInUser] = {};
    
    userStocks[loggedInUser][stock] = (userStocks[loggedInUser][stock] || 0) + 1;
    
    updatePortfolio();
    alert(`You bought 1 share of ${stock} for $${stockPrice}`);
}

function updatePortfolio() {
    const stockList = document.getElementById('stockList');
    stockList.innerHTML = '';
    
    if (userStocks[loggedInUser]) {
        for (const [stock, quantity] of Object.entries(userStocks[loggedInUser])) {
            const li = document.createElement('li');
            li.textContent = `${stock}: ${quantity} shares`;
            stockList.appendChild(li);
        }
    }
}

function logout() {
    loggedInUser = null;
    userStocks = {};
    alert("You have logged out");
}
