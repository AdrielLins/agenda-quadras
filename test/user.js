//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/UserModel');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
    /*
      * Teste da função da api de listagem de usuários
      */
    describe('/Criação de usuário', () => {
        it('Deve criar um usuário no banco', (done) => {
            let newUser = {
                email: "testeunitario@testeunitario.com",
                password: "123456",
                firstName: "Pedro",
                lastName: "Testador",
                cpf: "999.999.999-99",
                phone: "(54)999999999",
                adm: 1
            };
            chai.request(server)
                .post('/api/users/create/')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
    /*
      * Teste da função da api para encontrar usuário por e-mail
      */
    describe('/Retornar dados de um usuário específico', () => {
        it('Deve retornar os dados do usuário pesquisado por e-mail', (done) => {
            let findUser = {
                email: "testeunitario@testeunitario.com"
            };
            chai.request(server)
                .post('/api/users/find/')
                .send(findUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
    /*
    * Teste da função da api de listagem de usuários
    */
    describe('/Listagem de usuários', () => {
        it('Deve listar todos os usuários do banco', (done) => {
            chai.request(server)
                .post('/api/users/list/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    /*
    * Teste da função da api de update de usuários
    */
    describe('/Update de usuário', () => {
        it('Deve ser realizado a atualização de um usuário no banco', (done) => {
            let newUser = {
                email: "testeunitario@testeunitario.com",
                password: "123456789",
                firstName: "Pedroca",
                lastName: "Testador",
                cpf: "999.999.999-99",
                phone: "(54)999999999",
                adm: 1
            };
            chai.request(server)
                .post('/api/users/update/')
                .send(newUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });
    /*
    * Teste da função da api de delete de usuários
    */
    describe('/Deve deletar usuário específicado', () => {
        it('Deve deletar o o usuário do banco', (done) => {
            let deleteUser = {
                email: "testeunitario@testeunitario.com"
            };
            chai.request(server)
                .post('/api/users/delete/')
                .send(deleteUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    });

});