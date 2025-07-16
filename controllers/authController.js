const users = './models/userModel.js';

exports.loginUser = (req, res) => {
    const { UserName, PasswordHash } = req.body;
    const user = users.find(u => u.UserName === UserName && u.PasswordHash === PasswordHash);
    if(!user) {
        return res.json({userType: ''});
    }
    res.json({ usertype: user.UserType }); 
};