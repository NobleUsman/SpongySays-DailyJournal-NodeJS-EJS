
import express from "express"

import bodyparser from "body-parser"

import _ from "lodash"

const app = express()

//------
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
//------

const posts = []


app.use(bodyparser.urlencoded({ extended : true }))
app.use(express.static("public"))
app.set("view engine", "ejs")


// "/" route
app.get("/", function(req, res) {
    res.render("home", { homeMarker : homeStartingContent , homePosts : posts})
})

app.post("/", function(req, res) {
    console.log("POST REQUEST RECEIVED!")
})

// "/about" route
app.get("/about", function(req, res) {
    res.render("about", { aboutMarker : aboutContent })
})

app.post("/about", function(req, res) {
    console.log("Post request recieved from ABOUT PAGE")
})

// "/contact" route
app.get("/contact", function(req, res) {
    res.render("contact", { contactMarker : contactContent })
})

app.post("/contact", function(req, res) {
    console.log("Post request recieved from CONTACT PAGE")
})

// "/compose" route
app.get("/compose", function(req, res) {
    res.render("compose")
})

app.post("/compose", function(req, res) {
    console.log("Post request recieved from COMPOSE PAGE")
    
    const post = {
        "title": req.body.composeTitle,
        "content": req.body.composeMessage
    }
    console.log(post)

    posts.push(post)
    console.log(posts)

    res.redirect("/")
})


// "/custom" routes tapping
app.get("/posts/:check", function(req, res) {
    // console.log(req.params.check)
    //now head over to the webpage and type: localhost:3000/posts/anything
    //and you'll log what you've typed in as the parameter. Here its "anything"
    // this was possible by a feature of EXPRESS known as "Route Parameters" 
    // by specifying a parameter with colon(:)

    let requestedTitle = _.lowerCase(req.params.check)

    posts.forEach(function(post) { 
        let storedTitle = _.lowerCase(post.title)

        if (requestedTitle === storedTitle) {
            console.log("Match Found!")
            
            res.render("post", { titleMarker : post.title, contentMarker : post.content })
        }
    })


})



const port = process.env.PORT || 3000
app.listen(port, function() {
    console.log(`Server started at port: ${port}`)
})