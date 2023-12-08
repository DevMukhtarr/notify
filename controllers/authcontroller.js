import "dotenv/config"
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const signIn = async (req, res) => {
    const { username, password} = req.body
    try {
        if (!(username && password)) {
            return res.status(400).send("All inputs are required");
          }

        const existingUser = await User.findOne({username: username});
        if(!existingUser){
            return res.status(401).json({
                status: false,
                message: "Invalid email or password",
              });
        }

        if(existingUser.email && (await bcryptjs.compare(password, existingUser.password))){

            const token = jwt.sign({ id: existingUser._id, email: existingUser.email},
                process.env.JWT_SECRET_KEY,
                 {
                    expiresIn: "2d",
                  });

                  return res.status(200).json({ 
                    message: 'Login successful',
                    data: {
                        first_name: existingUser.first_name,
                        last_name: existingUser.last_name,
                        email: existingUser.email,
                    }, 
                    token 
                });

        }else{
            return res.status(401).json({
                status: false,
                message: "Invalid email or password",
              });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const signUp = async (req, res) => {
    const { first_name, last_name, email, username, phone_number, password, confirm_password } = req.body;
    try {
        if (!first_name || !last_name || !email || !username || !phone_number || !password || !confirm_password) {
            return res.status(400).send('All fields must be filled');
          }
    
        if (password !== confirm_password) {
        return res.status(400).send('Passwords do not match');
        }

        const existingUser = await User.findOne({email: email});

        if(existingUser){
            return res.status(409).json({
                status: "false",
                message: "User already exists"
            })
        }

        const encryptedPassword = await bcryptjs.hash(password, 12);

        const new_user = new User({
            first_name, 
            last_name, 
            username,
            phone_number,
            email, 
            password : encryptedPassword,
        })

        await new_user.save();

        const token = jwt.sign({ 
            id: new_user._id, email: new_user.email
        }, process.env.JWT_SECRET_KEY);
        
        return res.status(200).json({ 
            message: 'Registration successful',
            data: {
                first_name: new_user.first_name,
                last_name: new_user.last_name,
                email: new_user.email,
            }, 
            token 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}