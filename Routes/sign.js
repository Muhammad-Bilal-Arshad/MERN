import express from 'express';
import passport from 'passport';
import User from '../Models/user.model.js';
import jwt from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';
import secretKey  from '../config.js';


const router = express.Router();


passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


router.post('/signup', (req, res, next) => {
  const newUser = new User({ username: req.body.username });

  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    passport.authenticate('local')(req, res, () => {
        const token = jwt.sign(
            { userId: req.user._id },
            secretKey,
            { expiresIn: '1h' }
          );
      res.cookie('token', token, { httpOnly: true });
      res.status(200).json({ success: 'Signup successful!' });
    });
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    const token = jwt.sign(
        { userId: req.user._id },
        secretKey,
        { expiresIn: '1h' }
      );
  res.cookie('token', token, { httpOnly: true });
  res.status(200).json({ success: 'Login successful!' });
});


router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: 'Logout successful!' });
});

export default router;
