const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://afrin:961215106001@cluster0.hbkqtqv.mongodb.net/bookList', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: Number,
  synopsis:String,
  plot:String,
  genre:String,
  language:String,
  price:String

});

const Book = mongoose.model('Book', bookSchema);

app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post('/books', async (req, res) => {
  const { title, author,published_year } = req.body;
  const book = new Book({ title, author,published_year });
  await book.save();
  res.json(book)
});

app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author,published_year } = req.body;
  const book = await Book.findByIdAndUpdate(id, { title, author,published_year }, { new: true });
  res.json(book);
});

app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndRemove(id);
  res.json({ message: 'Book deleted successfully' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
