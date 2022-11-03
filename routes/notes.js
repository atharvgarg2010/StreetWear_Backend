const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const Comment = require('../models/Image');
const { body, validationResult, header } = require('express-validator');
const Image = require("../models/Image");
// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required

router.get('/fetchallyourblogs', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
var notesMen = []
const gender = (note)=>{
    const gender2 = note.gender
       if (gender2 === "Men") {
        // notesMen.push(note)
        return note
        console.log(notesMen);
       }else{
        console.log(gender2);
       }
}
var notesWomen = []
const Women = (note)=>{
    const gender2 = note.gender
       if (gender2 === "Women") {
        notesWomen.push(note)
        return note

        console.log(notesMen);
       }else{
        console.log(gender2);
       }
}
var notesUnisex = []
const Unisex = (note)=>{
    const gender2 = note.gender
       if (gender2 === "Unisex") {
        notesUnisex.push(note)
        return note
        console.log(notesUnisex);
       }else{
        console.log(gender2);
       }
}
router.get('/fetchMenClothing', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        

        res.send(notes.filter(gender))

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/fetchWomenClothing', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        
        res.json(notes.filter(Women))

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/fetchUnisexClothing', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        notes.filter(Unisex)
        res.json(notes.filter(Unisex))

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post("/store-image", async (req, res) => {
    try {
        const { image } = req.body;
        if (!image) {
            return res.status(400).json({ msg: "DD" });
        }
        let newImage = new Image({
            image,
        });
        newImage = await newImage.save();
        res.json(newImage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/fetchallblogs', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/fetchoneblog/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            res.status(401).send("Blog Not Found");

        } else {

            res.json(note)
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, gender, image,S,M,L,XL,XXL,XXXL,price,size,key } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, gender, user: req.user.id, image,S,M,L,XL,XXL,XXXL,price,size,key
            })
            const savedNote = await note.save()

            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (title) { newNote.title = title, newNote.iddd = req.params.id };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required

router.post('/addComment/:id', fetchuser, async (req, res) => {
    const { desc} = req.body;
    try {
        // Create a newNote object
        const newNote = {};
        if (desc) { newNote.desc = desc};

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note) {
            newNote.idd = note._id.toString()
            newNote.userId = req.header("auth-token")

        }

        const Comment1 =  new Comment(newNote)
        const saved = await Comment1.save()
        res.json({ saved });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.get('/BlogCommentById/:id', fetchuser, async (req, res) => {
    try {
        const Commentss = await Comment.find({idd:req.params.id})
        if (Commentss) {
            res.json(Commentss)
            // console.log(Commentss
        } else {
            res.json("Commentsss")
            
        }
    } catch (error) {
        res.json("Commentssss")
        
    }
})
// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be delete and delete it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router