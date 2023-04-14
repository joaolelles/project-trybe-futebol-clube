import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
chai.use(chaiHttp);
const { expect } = chai;
import { app } from '../app';
import { matches, matchesInProgress, newMatches, token } from './mocks/matchesMocks';
import Matches from '../database/models/matchesModel';
chai.use(chaiHttp);

describe('Testando a resposta da requisição a /matches', () => {
    afterEach(Sinon.restore);
    it('Testando a getAll caso tenha sucesso', async () => {
        chai.request(app).get('/matches').then((chaiHttpResponse) => {
            expect(chaiHttpResponse.status).to.be.equal(200);
            expect(chaiHttpResponse.body).to.be.deep.equal(matches)})
    });
    it('Testando a getAll caso retorne apenas partidas em andamento', async () => {
        chai.request(app).get('/matches?inProgress=true').then((chaiHttpResponse) => {
            expect(chaiHttpResponse.status).to.be.equal(200);
            expect(chaiHttpResponse.body).to.be.deep.equal(matchesInProgress)})
    });
    it('Testando a postNewMatch caso tenha sucesso', async () => {
        Sinon.stub(Matches, 'create').resolves(newMatches as Matches)
        Sinon.stub(bcrypt, 'compareSync').returns(true)
        Sinon.mock(jwt).expects('sign').returns(token)
        chai.request(app).post('/matches').then((chaiHttpResponse) => {
            expect(chaiHttpResponse.status).to.be.equal(200);
            expect(chaiHttpResponse.body).to.be.deep.equal(matchesInProgress)})
    });
});
