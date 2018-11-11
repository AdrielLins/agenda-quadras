const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
var statusCode = require('http-status-codes');

exports.CreateUser = function (req, res, next) {
    //encrypt password
    let hash = bcrypt.hashSync(req.body.password, 10);

    let newUser = new User({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cpf: req.body.cpf,
        phone: req.body.phone,
        active: req.body.active,
        adm: req.body.adm
    });
    User.findOne({ email: req.body.email }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (doc) {
            var emailUsed = true;
            res.status(statusCode.NO_CONTENT).send('E-mail já em uso!');
            return
        }
        if (!emailUsed) {
            User.findOne({ cpf: req.body.cpf }).exec(function (err, cpfDoc) {
                if (err) {
                    res.send(err);
                    return;
                }
                if (cpfDoc) {
                    res.status(statusCode.NO_CONTENT).send('CPF já em uso!');
                    return;
                } else {
                    newUser.save(function (err) {
                        if (err) {
                            return err;
                        }
                        req.session.user = newUser.email;
                        res.status(statusCode.CREATED).send('Usuário criado com sucesso!')
                        return;
                    })
                }
            });
        }
    });
}

exports.ReadUser = function (req, res) {
    User.findOne({ email: req.body.email }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Usuário não encontrado!');
        }
        else {
            req.session.userToRecover = doc.email;
            res.send(doc);
            return;
        }
    });
};

exports.ReadCurrentUser = function (req, res) {
    var currentUser = req.session.user;
    User.findOne({ email: currentUser }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Usuário não encontrado!');
        }
        else {
            res.send(doc);
            return;
        }
    });
};

exports.ListUser = function (req, res) {
    User.find({}).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Nenhum registro encontrado!');
        }
        else {
            res.send(doc);
            return;
        }
    });
};

exports.UpdateUser = async function (req, res) {
    let updatePassword = bcrypt.hashSync(req.body.password, 10);
    var userToUpdate = req.body.email
    User.findOne({ email: userToUpdate }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('E-mail não encontrado!');
        } else {
            if (req.body.password == '') {
                //only changes password if it comes in the request
                updatePassword = doc.password;
            }
            User.findOneAndUpdate({ email: userToUpdate },
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    password: updatePassword,
                    active: req.body.active,
                    adm: req.body.adm
                },
                { new: true }, function (err, doc) {
                    if (err) {
                        res.send(doc);
                        return;
                    } else {
                        res.send('Usuário atualizado!');
                    }
                });
        }
    });
};

exports.UpdateCurrentUser = async function (req, res) {
    let updatePassword = bcrypt.hashSync(req.body.password, 10);
    var userToUpdate = req.session.user;
    User.findOne({ email: userToUpdate }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('E-mail não encontrado!');
        } else {
            if (req.body.password == '') {
                //only changes password if it comes in the request
                updatePassword = doc.password;
            }
            User.findOneAndUpdate({ email: userToUpdate },
                {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    password: updatePassword
                },
                { new: true }, function (err, doc) {
                    if (err) {
                        res.send(doc);
                        return;
                    } else {
                        res.send('Usuário atualizado!');
                    }
                });
        }
    });
};

exports.DeleteUser = function (req, res) {
    var userToDelete = req.body.email;
    User.findOne({ email: userToDelete }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('E-mail não encontrado!');
        } else {
            User.deleteOne({ email: userToDelete }, function (err, doc) {
                if (err) {
                    res.send(doc);
                    return;
                } else {
                    res.send('Usuário excluido!');
                }
            });
        }
    });
};

exports.loginUser = function (req, res) {
    User.findOne({ email: req.body.email }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc || !bcrypt.compareSync(req.body.password, doc.password)) {
            res.status(statusCode.NO_CONTENT).send('Usuário não encontrado!');
        } else {
            req.session.user = doc.email;
            req.session.adm = doc.adm;
            res.send(doc);
            return;
        }
    });
};

exports.ReadToRecoverUser = function (req, res) {
    var currentUser = req.session.userToRecover;
    User.findOne({$and: [{ email: currentUser }, { token: req.body.token }] }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Usuário não encontrado!');
        }
        else {
            res.send(doc);
            return;
        }
    });
};
exports.UpdatePassRecovered = function (req, res) {
    var currentUser = req.session.userToRecover;
    let updatePassword = bcrypt.hashSync(req.body.password, 10);
    User.findOne({ email: currentUser }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('E-mail não encontrado!');
        } else {
            User.findOneAndUpdate({ email: currentUser },
                {
                    password: updatePassword
                },
                { new: true }, function (err, doc) {
                    if (err) {
                        res.send(doc);
                        return;
                    } else {
                        res.send('Usuário atualizado!');
                    }
                });
        }
    });
};