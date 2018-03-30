import express from 'express';
import path from 'path';
import morgan from 'morgan';

const PORT = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../client/')));


app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});



app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
