//entry point
const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/authRoutes');

app.use(express.json());           // Body parser for JSON
app.use('/user', userRoutes);
app.use('/books', bookRoutes);     // Prefix all book routes with /books

const PORT = 3000;
app.get('/', (req, res) => {
  res.redirect('/list');
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

