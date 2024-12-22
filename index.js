import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

app.get('/', (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get('/new', (req, res) => {
    res.render('new-post.ejs');
});

app.post('/new', (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.redirect('/');
});

app.get('/posts/:id', (req, res) => {
    const post = posts[req.params.id];
    if (post) {
        res.render('post', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});