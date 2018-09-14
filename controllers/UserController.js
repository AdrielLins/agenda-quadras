const User = require('../models/UserModel');
var statusCode = require('http-status-codes');
const bcrypt = require('bcrypt');

exports.CreateUser = function (req, res, next) {
    //encrypt password
    let hash = bcrypt.hashSync(req.body.password, 10);

    let user = new User({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cpf: req.body.cpf,
        phone: req.body.phone,
        adm: req.body.adm
    });
    User.findOne({ email: req.body.email }).exec(function (err, emailDoc) {
        if (err) {
            res.send(err);
            return;
        }
        if (emailDoc) {
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
                    user.save(function (err) {
                        if (err) {
                            return err;
                        }
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

exports.UpdateUser = function (req, res) {
    var userToUpdate = req.body.email
    User.findOne({ email: userToUpdate }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('E-mail não encontrado!');
        } else {
            User.prototype.findOneAndUpdate({ email: userToUpdate },
                {
                    password: req.body.password,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
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
            res.send(doc).send('Usuário logado!');
            return;
        }
    });
};