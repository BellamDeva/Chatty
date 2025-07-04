import jwt from 'jsonwebtoken';
export const generateToken = (userId,res)=>{
    const token  = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '30d'
    });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: "strict"
    });
    return token;
}