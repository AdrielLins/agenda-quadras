const Agenda = require('../models/AgendaModel');
var isodate = require("isodate");
var statusCode = require('http-status-codes');

exports.CreateAgenda = function (req, res, next) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }

    let newAgenda = new Agenda({
        dateAgenda: req.body.dateAgenda,
        quadraNumero: req.body.quadraNumero,
        esporteValor: req.body.esporteValor,
        esporteModalidade: req.body.esporteModalidade,
        status: req.body.status,
        resultado: req.body.resultado,
        userEmail: req.body.userEmail
    });

    Agenda.findOne({ $and: [{ dateAgenda: req.body.dateAgenda }, { quadraNumero: req.body.quadraNumero }] }
    ).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (doc) {
            res.status(statusCode.NO_CONTENT).send('Horário nesta quadra já existe!');
            return
        } else {
            newAgenda.save(function (err) {
                if (err) {
                    return err;
                }

                res.status(statusCode.CREATED).send('Agenda criada com sucesso!')
                return;
            })
        }
    });
}

exports.ReadAgenda = function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }
    Agenda.findById({ _id: req.body._id }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Agenda não encontrada!');
        }
        else {
            res.send(doc);
            return;
        }
    });
};

exports.ListAgenda = function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }
    Agenda.find({}).exec(function (err, doc) {
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

exports.UpdateAgenda = function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }
    var agendaToUpdate = req.body._id
    Agenda.findById({ _id: agendaToUpdate }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Agenda não encontrado!');
        } else {
            Agenda.findByIdAndUpdate({ _id: agendaToUpdate },
                {
                    dateAgenda: req.body.dateAgenda,
                    quadraNumero: req.body.quadraNumero,
                    esporteValor: req.body.esporteValor,
                    esporteModalidade: req.body.esporteModalidade,
                    status: req.body.status,
                    resultado: req.body.resultado,
                    userEmail: req.body.userEmail
                },
                { new: true }, function (err, doc) {
                    if (err) {
                        res.send(doc);
                        return;
                    } else {
                        res.send('Agenda atualizada!');
                    }
                });
        }
    });
};

exports.InsertEmailAgenda = function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }
    var agendaToUpdate = req.body._id
    Agenda.findById({ _id: agendaToUpdate }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Agenda não encontrado!');
        } else {
            Agenda.findByIdAndUpdate({ _id: agendaToUpdate },
                {
                    userEmail: req.body.userEmail,
                    status: req.body.status
                },
                { new: true }, function (err, doc) {
                    if (err) {
                        res.send(doc);
                        return;
                    } else {
                        res.send('E-mail setado na agenda!');
                    }
                });
        }
    });
};

exports.DeleteAgenda = function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }
    var agendaToDelete = req.body._id;
    Agenda.findById({ _id: agendaToDelete }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Agenda não encontrado!');
        } else {
            Agenda.deleteOne({ _id: agendaToDelete }, function (err, doc) {
                if (err) {
                    res.send(doc);
                    return;
                } else {
                    res.send('Agenda excluida!');
                }
            });
        }
    });
};

exports.StatusAgenda = function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }
    var agendaToUpdate = req.body._id
    Agenda.findById({ _id: agendaToUpdate }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Agenda não encontrada!');
        } else {
            Agenda.findByIdAndUpdate({ _id: agendaToUpdate },
                {
                    status: req.body.status
                },
                { new: true }, function (err, doc) {
                    if (err) {
                        res.send(doc);
                        return;
                    } else {
                        res.send('Status alterado!');
                    }
                });
        }
    });
};

exports.ResultadoAgenda = function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }
    var agendaToUpdate = req.body._id
    Agenda.findById({ _id: agendaToUpdate }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Agenda não encontrada!');
        } else {
            Agenda.findByIdAndUpdate({ _id: agendaToUpdate },
                {
                    resultado: req.body.resultado
                },
                { new: true }, function (err, doc) {
                    if (err) {
                        res.send(doc);
                        return;
                    } else {
                        res.send('Resultado Setado!');
                    }
                });
        }
    });
};

exports.ListUserFinishedAgenda = function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }
    var agendaToFind = req.session.user
    Agenda.find({ userEmail: agendaToFind }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Agenda não encontrada!');
        }
        else {
            res.send(doc);
            return;
        }
    });
};

exports.UserSetAgenda = function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }
    var agendaToUpdate = req.body._id
    Agenda.findById({ _id: agendaToUpdate }).exec(function (err, doc) {
        if (err) {
            res.send(err);
            return;
        }
        if (!doc) {
            res.status(statusCode.NO_CONTENT).send('Agenda não encontrado!');
        } else {
            Agenda.findByIdAndUpdate({ _id: agendaToUpdate },
                {
                    status: "Agendado",
                    userEmail: req.session.user
                },
                { new: true }, function (err, doc) {
                    if (err) {
                        res.send(doc);
                        return;
                    } else {
                        res.send('Agenda atualizada!');
                    }
                });
        }
    });
};

exports.ListBetweenAgenda = function (req, res) {
    if (!req.session.user && !req.cookies.user_sid) {
        res.send(statusCode.UNAUTHORIZED);
        return;
    }

    var startDate = req.body.startDate
    var endDate = req.body.endDate
    Agenda.find({
        dateAgenda: {
            $gte: startDate,
            $lt: endDate
        }
    }).exec(function (err, doc) {
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