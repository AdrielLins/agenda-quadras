const Field = require('../models/FieldModel');
var statusCode = require('http-status-codes');

exports.CreateField = function (req, res, next) {

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
    var fieldToUpdate = req.body.numero
    console.log("aaaaaaaaaaaaaaa"+fieldToUpdate)
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
    var fieldToDelete = req.body.email;
    Field.findOne({ email: fieldToDelete }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Quadra não encontrada!');
        } else {
            Field.deleteOne({ email: fieldToDelete }, function (err, doc) {
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