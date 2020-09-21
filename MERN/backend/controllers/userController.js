function userController(User) {
    function getUserData(req, res) {
        const query = {
            _id: req.userId
        }
        User.find(query, (err, user) => {
            if (err) {
                return res.send(err);
            }
            let userForReturn = user[0].toObject();
            delete userForReturn.password;
            return res.json(userForReturn);
        })
    };


    function put(req, res) {
        const query = {
            _id: req.params._id
        }
        User.find(query, (err, users) => {
            if (err) {
                return res.send(err);
            }
            let userForUpdate = users[0].toObject();
            let keys = ["name", "email", "deptName", "title"];
            keys.forEach(key =>{
                userForUpdate[key] = req.body[key];
            })
            User.updateOne(query, userForUpdate)
                .then(result => {
                    if (result.nModified > 0) {
                        return res.status(200).json({ message: "Update Successful" });
                    } else {
                        return res.status(500).json({ message: "No Changes" });
                    }
                });
        });
    }

    return { getUserData, put }
}

module.exports = userController;