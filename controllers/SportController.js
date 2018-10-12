const Sport = require('../models/SportModel');
var statusCode = require('http-status-codes');

exports.CreateSport = function (req, res, next) {

    let newSport = new Sport({
        modalidade: req.body.modalidade,
        valor: req.body.valor
    });
    Sport.findOne({ modalidade: req.body.modalidade }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (doc) {
            res.status(statusCode.NO_CONTENT).send('Nome do esporte já em uso!');
            return
        } else {
            newSport.save(function (err) {
                if (err) {
                    return err;
                }               
                res.status(statusCode.CREATED).send('Esporte criado com sucesso!')
                return;
            })
        }
    });
}

exports.ReadSport = function (req, res) {
    Sport.findById({ _id: req.body._id }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Esporte não encontrado!');
        }
        else {
            res.send(doc);
            return;
        }
    });
};
exports.ListSport = function (req, res) {
    Sport.find({}).exec(function (err, doc) {
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

exports.UpdateSport = function (req, res) {
    var sportToUpdate = req.body._id
    Sport.findById({ _id: sportToUpdate }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Esporte não encontrado!');
        } else {
            Sport.findByIdAndUpdate({ _id: sportToUpdate },
                {
                    valor: req.body.valor,
                    modalidade: req.body.modalidade
                },
                { new: true }, function (err, doc) {
                    if (err) {
                        res.send(doc);
                        return;
                    } else {
                        res.send('Esporte atualizado!');
                    }
                });
        }
    });
};

exports.DeleteSport = function (req, res) {
    var sportToDelete = req.body.modalidade;
    Sport.findOne({ modalidade: sportToDelete }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Esporte não encontrado!');
        } else {
            Sport.deleteOne({ modalidade: sportToDelete }, function (err, doc) {
                if (err) {
                    res.send(doc);
                    return;
                } else {
                    res.send('Esporte excluido!');
                }
            });
        }
    });
};