import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { Response } from 'superagent';
chai.use(chaiHttp);
const { expect } = chai;
import { app } from '../app';
import { allTeams, team } from './mocks/teamsMocks';
import Teams from '../database/models/teamModel';
chai.use(chaiHttp);

describe('Testando a resposta da requisição a /teams', () => {        
    it('Testando a getAll', async () => {
        Sinon.stub(Teams, "findAll").resolves(allTeams as Teams[]);
        let chaiHttpResponse: Response;
         chaiHttpResponse = await chai.request(app).get('/teams');
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(allTeams);
    });

    it('Testando a getTeam', async () => {
        Sinon.stub(Teams, "findByPk").resolves(team as Teams);
        let chaiHttpResponse: Response;
        chaiHttpResponse = await chai.request(app).get('/teams/1');
        expect(chaiHttpResponse.status).to.be.equal(200);
        expect(chaiHttpResponse.body).to.be.deep.equal(team);
    });

});

