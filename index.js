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

app.get('/posts/:id', (req, res) => {
    const post = posts[req.params.id];
    if (post) {
        res.render('post', { post, id: req.params.id }); // Pass the id to the view
    } else {
        res.status(404).send('Post not found');
    }
});

app.get('/posts/:id/edit', (req, res) => {
    const post = posts[req.params.id];
    if (post) {
        res.render('edit-post', { post, id: req.params.id });
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/new', (req, res) => {
    const { title, content } = req.body;
    posts.push({ title, content });
    res.redirect('/');
});

app.post('/posts/:id/edit', (req, res) => {
    const post = posts[req.params.id];
    if (post) {
        const { title, content } = req.body;
        post.title = title;
        post.content = content;
        res.redirect(`/posts/${req.params.id}`);
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/posts/:id/delete', (req, res) => {
    const postIndex = req.params.id;
    if (posts[postIndex]) {
        posts.splice(postIndex, 1);
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});