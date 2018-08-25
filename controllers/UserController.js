const User = require('../models/UserModel');
var HttpStatus = require('http-status-codes');

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

    if(user.email == User.find({"email":req.body.email})){
        res.send('E-mail já em uso!')
        return
    }

    if(user.cpf == User.find({cpf:req.body.cpf})){
        res.send('Cpf já em uso!')
        res.status(HttpStatus.OK)
        return
    }

    user.save(function (err) {
        if (err) {
            return err;
        }
        res.send('Usuário criado com sucesso!')
        res.send(HttpStatus.CREATED)
        return
    })
};

exports.ReadUser = function (req, res){
    User.findById(req.params.id, function (user,err){
        if (err) {
            return err;
        }
        if(user == undefined){
            res.send("Usuário não encontrado!")
            return
        }
    res.send(user);
    })
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