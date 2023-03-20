// server.js
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

// Mock data
const users = {
  alice: { password: 'password123', friends: ['bob'] },
  bob: { password: 'password456', friends: ['alice'] }
};

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!users[username] || users[username].password !== password) {
    res.status(401).send('Invalid username or password');
  } else {
    res.json({ username });
  }
});

app.get('/api/friends', (req, res) => {
  const { user } = req.query;
  if (!users[user]) {
    res.status(404).send(`User ${user} not found`);
  } else {
    const friends = users[user].friends;
    res.json(friends);
  }
});

app.post('/api/friends', (req, res) => {
  const { user, friend } = req.body;
  if (!users[user] || !users[friend]) {
    res.status(404).send('User or friend not found');
  } else if (users[user].friends.includes(friend)) {
    res.status(400).send('User is already friends with this person');
  } else {
    users[user].friends.push(friend);
    users[friend].friends.push(user);
    const friends = users[user].friends;
    res.json(friends);
  }
});

app.delete('/api/friends', (req, res) => {
  const { user, friend } = req.query;
  if (!users[user] || !users[friend]) {
    res.status(404).send('User or friend not found');
  } else {
    users[user].friends = users[user].friends.filter(f => f !== friend);
    users[friend].friends = users[friend].friends.filter(f => f !== user);
    const friends = users[user].friends;
    res.json(friends);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
