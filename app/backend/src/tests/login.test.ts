import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
chai.use(chaiHttp);
const { expect } = chai;
import { app } from '../app';
import { login, user, token, invalidToken, role } from './mocks/loginMocks';
import Users from '../database/models/userModel';
chai.use(chaiHttp);

describe('Testando a resposta da requisição a /login', () => {
    afterEach(Sinon.restore);
    it('Testando a postLogin caso tenha sucesso', async () => {
        Sinon.stub(Users, "findOne").resolves(user as Users);
        chai.request(app).post('/login').send(login).then((chaiHttpResponse) => {
            expect(chaiHttpResponse.status).to.be.equal(200);
            expect(chaiHttpResponse.body).to.be.deep.equal({token: token})})
    });
    it('Testando a postLogin caso tenha "All fields must be filled"', async () => {
        const chaiHttpResponse =  await chai.request(app).post('/login').send({
            email: "",
            password: ""
        })
        expect(chaiHttpResponse.status).to.equal(400)
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
    })
    it('Testando a postLogin caso tenha "Invalid email or password"', async () => {
        const chaiHttpResponse =  await chai.request(app).post('/login').send({
            email: "admin@admiiiin.com",
            password: "12678"
        })
        expect(chaiHttpResponse.status).to.equal(401)
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' })
    })
    it('Testando a postLogin caso tenha "Token not found"', async () => {
        Sinon.stub(Users, "findOne").resolves(user as Users);
        Sinon.stub(bcrypt, 'compareSync').returns(true)
        Sinon.mock(jwt).expects('sign').returns({token: ""})
        chai.request(app).post('/login').send(login).then((chaiHttpResponse) => {
            expect(chaiHttpResponse.status).to.be.equal(401);
            expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' })
        })
    });
    it('Testando a postLogin caso tenha "Token must be a valid token"', async () => {
        Sinon.stub(Users, "findOne").resolves(user as Users);
        Sinon.stub(bcrypt, 'compareSync').returns(true)
        Sinon.mock(jwt).expects('verify').withArgs('token').returns(invalidToken)
        chai.request(app).post('/login').send(login).then((chaiHttpResponse) => {
            expect(chaiHttpResponse.status).to.be.equal(401);
            expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' })
        })
    });
    // it('Testando a getRole caso tenha sucesso', async () => {
    //     Sinon.stub(Users, "findOne").resolves(role as Users);
    //     Sinon.stub(bcrypt, 'compareSync').returns(true)
    //     Sinon.mock(jwt).expects('sign').returns(token)
    //     chai.request(app).get('/login/role').send(role).then((chaiHttpResponse) => {
    //         expect(chaiHttpResponse.status).to.be.equal(200);
    //         expect(chaiHttpResponse.body).to.be.deep.equal(role)
    //     })
    // });
    it('Testando a getRole caso tenha "Token not found"', async () => {
        Sinon.stub(Users, "findOne").resolves(role as Users);
        Sinon.stub(bcrypt, 'compareSync').returns(true)
        Sinon.mock(jwt).expects('sign').returns({token: ""})
        chai.request(app).get('/login/role').send(role).then((chaiHttpResponse) => {
            expect(chaiHttpResponse.status).to.be.equal(401);
            expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' })
        })
    });
    // it('Testando a getRole caso tenha "Token must be a valid token"', async () => {
    //     Sinon.stub(Users, "findOne").resolves(role as Users);
    //     Sinon.stub(bcrypt, 'compareSync').returns(true)
    //     Sinon.mock(jwt).expects('verify').withArgs('token').returns(invalidToken)
    //     chai.request(app).get('/login/role').send(role).then((chaiHttpResponse) => {
    //         expect(chaiHttpResponse.status).to.be.equal(401);
    //         expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token must be a valid token' })
    //     })
    // });
});
