import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

export const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    
    try {
        const hash = await bcrypt.hash(password, 12);
        const user = new User({
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: hash
        });
        const result = await user.save();
        res.status(200).json({ msg: 'User created', userId: result._id });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
          next(err);
    }
}

export const signin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let newUser;
    try {
    let user = await User.findOne({ email: email });
    if (!user) {
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
    newUser = user;

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            email: newUser.email,
            userId: newUser._id.toString()
        },
        'supersecretjsonwebtokenkey',
        {
            expiresIn: '3h'
        }
    )

    res.status(200).json({ msg: 'Logged', token: token, userId: newUser._id.toString() })
    } catch (err){
        if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err);
  }
}