const Field = require('../models/FieldModel');
var statusCode = require('http-status-codes');

exports.CreateField = function (req, res, next) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }

    let newField = new Field({
        descricao: req.body.descricao,
        numero: req.body.numero
    });
    Field.findOne({ numero: req.body.numero }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (doc) {
            res.status(statusCode.NO_CONTENT).send('Número já em uso!');
            return
        } else {
            newField.save(function (err) {
                if (err) {
                    return err;
                }
                res.status(statusCode.CREATED).send('Quadra criada com sucesso!')
                return;
            })
        }
    });
}

exports.ReadField = function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }
    Field.findOne({ numero: req.body.numero }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Quadra não encontrado!');
        }
        else {
            res.send(doc);
            return;
        }
    });
};
exports.ListField = function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }
    Field.find({}).exec(function (err, doc) {
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

exports.UpdateField = function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }
    var fieldToUpdate = req.body.numero
    Field.findOne({ numero: fieldToUpdate }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Quadra não encontrado!');
        } else {
            Field.findOneAndUpdate({ numero: fieldToUpdate },
                {
                    descricao: req.body.descricao
                },
                { new: true }, function (err, doc) {
                    if (err) {
                        res.send(doc);
                        return;
                    } else {
                        res.send('Quadra atualizada!');
                    }
                });
        }
    });
};

exports.DeleteField = function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }
    var fieldToDelete = req.body.numero;
    Field.findOne({ numero: fieldToDelete }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Quadra não encontrada!');
        } else {
            Field.deleteOne({ numero: fieldToDelete }, function (err, doc) {
                if (err) {
                    res.send(doc);
                    return;
                } else {
                    res.send('Quadra excluida!');
                }
            });
        }
    });
};