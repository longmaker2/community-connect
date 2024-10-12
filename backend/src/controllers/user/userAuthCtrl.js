import User from '../../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userRegistrationCtrl = async (req, res) => {
  try {
    const { name, email, password, userType, address } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      userType,
      address,
    });
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    res.status(201).json({user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const userLoginCtrl = async(req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await User.findOne({email});
    if(!isUserExist) {
      res.status(400).json({message: 'User does not exist'});
    }
    const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password);
    if(!isPasswordCorrect) {
      res.status(400).json({message: 'Invalid credentials'});
    }
    const token = jwt.sign(
      { email: isUserExist.email, id: isUserExist._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.status(200).json({user: isUserExist, token});

  } catch (error) {
    res.status(500).json({message: 'Something went wrong'})
  }
}