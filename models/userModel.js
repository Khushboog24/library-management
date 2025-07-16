const users = [
    {
        Role: "user",
        UserName: 'kk',
        Email: 'kk@gmail.com',
        PasswordHash: 'hashedpassword123', // Use a proper hashing function in production, 
        CreatedAt: new Date(), 
        UpdatedAt : new Date()   
    },
    {
        Role: "admin",
        UserName: 'admin',
        Email: 'admin@gmail.com',
        PasswordHash: 'adminhashedpassword123', // Use a proper hashing function in production
        CreatedAt: new Date(),
        UpdatedAt : new Date()   
    }
]
module.exports = users;