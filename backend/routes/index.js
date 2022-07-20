const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login, logout } = require('../controllers/users');
const { loginValidation, userCreatValidation } = require('../middlewares/validation');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signin', loginValidation, login);
router.post('/signup', userCreatValidation, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.get('/logout', logout);
router.use((req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

module.exports = router;
