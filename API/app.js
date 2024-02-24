const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/users'); 
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    try {
      const user = await User.findOne({ where: { username: username } });

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
          return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      console.error(error);
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.userId); 
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const app = express();

const sequelize = require('./sequelize-config');
sequelize.sync(); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'zinogre', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

const userBooksRouter = require('./routes/userbooks');
app.use('/favourites', userBooksRouter);

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
