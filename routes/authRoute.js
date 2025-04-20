// const express = require('express');
// const { registerUser, loginUser, logout } = require('../controllers/authController');
// const passport = require('passport');
// const { generateToken } = require('../utils/generateToken');
// const router = express.Router();



// router.post('/register',registerUser)
// router.post('/login',loginUser)
// router.get('/logout', logout)



// //google oauth routes
// router.get('/google',passport.authenticate('google',{
//     scope: ['profile', 'email ']
// }))

// //google callback routes
// router.get('/google/callback', passport.authenticate('google', {failureRedirect: `${process.env.FRONTEND_URL}/user-login`, session:false}),
//  (req,res) =>{ 
//     const accessToken = generateToken(req?.user);
//     res.cookie("auth_token",accessToken,{
//         httpOnly: true,
//         sameSite:"none",
//         secure:true
//     })
//    res.redirect(`${process.env.FRONTEND_URL}`)
//  }
// )

// module.exports = router;



// const express = require('express');
// const { registerUser, loginUser, logout } = require('../controllers/authController');
// const passport = require('passport');
// const { generateToken } = require('../utils/generateToken');
// const router = express.Router();

// // Auth routes
// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get('/logout', logout);

// // Google OAuth routes
// router.get('/google', passport.authenticate('google', {
//   scope: ['profile', 'email']
// }));

// // Google OAuth callback
// router.get(
//   '/google/callback',
//   passport.authenticate('google', {
//     failureRedirect: `${process.env.FRONTEND_URL}/user-login`,
//     session: false
//   }),
//   (req, res) => {
//     const accessToken = generateToken(req.user);
//     res.cookie('auth_token', accessToken, {
//       httpOnly: true,
//       sameSite: 'none',
//       secure: true
//     });
//     res.redirect(`${process.env.FRONTEND_URL}`);
//   }
// );

// module.exports = router;






const express = require('express');
const { registerUser, loginUser, logout } = require('../controllers/authController');
const passport = require('passport');
const { generateToken } = require('../utils/generateToken');
const router = express.Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);

// Google OAuth routes
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL}/user-login`,
    session: false
  }),
  (req, res) => {
    // Check if the user is authenticated and available
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication failed. Please try again.' });
    }

    const accessToken = generateToken(req.user);
    
    // Set the authentication token in cookies
    res.cookie('auth_token', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true, // This should be true if your site is running on HTTPS
    });

    // Debugging log for redirection
    console.log('Redirecting to frontend after successful Google authentication.');

    // Redirect the user to the frontend
    const frontendUrl = `${process.env.FRONTEND_URL}`;
    
    if (!frontendUrl) {
      return res.status(500).json({ message: 'Frontend URL not configured correctly in .env file.' });
    }
    
    res.redirect(frontendUrl);
  }
);

module.exports = router;
