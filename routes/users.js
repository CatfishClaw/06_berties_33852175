// Create a new router
const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10


router.get('/register', function (req, res, next) {
    res.render('register.ejs')
    
})




router.post('/registered', function (req, res, next) {
    
    const plainPassword = req.body.password
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
  // Store hashed password in your database.
        // saving data in database
        let sqlquery = "INSERT INTO password (username, first_name, last_name, email, hashedPassword) VALUES (?,?,?,?,?)"
    // execute sql query
        let newrecord = [req.body.username, req.body.first_name, req.body.last_name, req.body.email, hashedPassword,]
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
            next(err)
        }
         else
            result = 'Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email
            result += 'Your password is: '+ req.body.password +' and your hashed password is: '+ hashedPassword
            res.send(result)

                                                                           
});
})
    
});

router.get('/register', function (req, res, next) {
    res.render('register.ejs')
    
})


router.post('/loggedin', function(req, res, next){
    let enteredUsername = req.body.usernamelogin
    let enteredPassword = req.body.passwordlogin
    
    let sqlquery = 'SELECT hashedPassword FROM password WHERE username=?'
    db.query(sqlquery, [enteredUsername], (err, result) =>{
        if (err){
            next(err)
        }
        else{
            const hash = result[0].hashedPassword
            bcrypt.compare(enteredPassword, hash, function(err, match){
                if (err) {
        // TODO: Handle error
                    next(err)
      }
                else if (match == true) {
        // TODO: Send message
                   
                    res.send('you are in')
                    return
      }
                else {
        // TODO: Send message
                
                    res.send('denied')
                    return
      }
    })
        
        }})
        
    
})



    
    




router.get('/user-list', function(req, res, next) {
    let sqlquery = "SELECT username,email,hashedPassword FROM password"; // query database to get all the books
    // execute sql query
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err)
        }
        res.render("user-list.ejs", {registeredUsers:result})
        });
});



// Export the router object so index.js can access it
module.exports = router

