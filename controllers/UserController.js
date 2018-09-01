const User = require('../models/UserModel');
var statusCode = require('http-status-codes');

exports.CreateUser = function (req, res) {

    let user = new User({
        email: req.body.email,
        password:req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        cpf: req.body.cpf,
        phone: req.body.phone,
        adm: req.body.adm
    });

    User.findOne({email: req.body.email}).exec(function(err, result) {
        if (err){
            res.send(err)
            return
        }
        if (result.email) {
            return res.status(statusCode.UNAUTHORIZED).send('E-mail já em uso!')          
        }
    });
    
    User.findOne({cpf: req.body.cpf}).exec(function(err, result) {
        if (err){
            res.send(err)
            return
        }
        if (result.cpf) {
            res.status(statusCode.CONFLICT).send('CPF já em uso!')
            return
        }
    });

    user.save(function (err) {
        if (err) {
            return err;
        }
        res.status(statusCode.CREATED).send('Usuário criado com sucesso!')
        return
    })
};

exports.ReadUser = function (req, res){
    User.findOne({email: req.params.email}).exec(function(err, result) {
        if (err) {
            res.send(err)
            return
        } 
        if(!result){
            res.status(statusCode.NOT_FOUND).send('Usuário não encontrado!')
        }
        else {
            res.send(result)
            return
        }
    });
};
//experimental
exports.ListUser = function (req, res){
    try {
        const results = User.find({});
        console.log(results);
        res.send(results);
      } catch (err) {
        throw err;
      }
};

exports.UpdateUser = function (req, res){
    User.findByIdAndUpdate(req.params.id, {$set: req.body},
    function(err, user){
        if(err) return err;
        res.send('User Updated!')
    })
};

exports.DeleteUser = function(req, res) {
    User.findByIdAndRemove(req.params.id,
    function(err, user){
        if(err) return err;
        res.send('User DELETED!')
    })
};