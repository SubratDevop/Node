const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Secret key for signing the token (in production, store this in an environment variable)
const SECRET_KEY = process.env.JWT_SECRET;
// Route to generate a token
app.get('/generate-token', (req, res) => {
  // Create a payload with the user data (you can include any data you want)
  const payload = {
    username: 'exampleUser',
    role: 'user',
  };

  // Generate a token that expires in 5 minutes
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2m' });

  // Send the token in the response
  res.json({
    token: token,
    message: 'Token generated successfully, valid for 5 minutes.',
  });
});

// Middleware to verify the token
app.get('/verify-token', (req, res) => {
  // Get the token from the request headers
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token is invalid or expired' });
    }

    // Token is valid
    res.json({
      message: 'Token is valid',
      decoded,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
