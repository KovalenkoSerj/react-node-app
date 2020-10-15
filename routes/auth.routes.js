const { Router, response } = require('express');
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const router = Router();
const config = require('config')

router.post('/register',
    [
        check('email', 'wrong email').isEmail(),
        check('password', 'wrong password, minimum length 8 symbols').isLength({ min: 8 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong registration data'
                })
            }
            const { email, password } = req.body;
            const candidate = await User.findOne({ email });
            if (candidate) {
                return res.status(400).json({ message: 'User is lready exist' })
            } else {
                const hashpass = await bcrypt.hash(password, 8)
                const user = new User({ email, password: hashpass })
                await user.save()
                res.status(200).json({ message: 'User created' })
            }
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' })
        }
    })

router.post('/login', [
    check('email', 'Enter correct email').normalizeEmail().isEmail(),
    check('password', 'Enter correct password').exists()
],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong login data'
                })
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'User not found ' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password, try again' });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
            res.json({ token, userId: user.id });


        } catch (e) {
            res.status(500).json({ message: 'Something went wrong' })
        }
    })

module.exports = router;