const { expect } = require('chai');
const { syncAndSeed, models } = require('../../db');
const app = require('supertest')(require('../../app'));

describe('Routes', ()=> {
  let seeded;
  beforeEach(async()=> seeded  = await syncAndSeed());
  describe('GET routes', ()=> {
    describe('GET /api/schools', ()=> {
      it('returns all schools', ()=> {
        return app.get('/api/schools')
          .expect(200)
          .then( response => {
            expect(response.body.length).to.equal(4);
          });
      });
    });
    describe('GET /api/schools', ()=> {
      it('returns all students', ()=> {
        return app.get('/api/students')
          .expect(200)
          .then( response => {
            expect(response.body.length).to.equal(6);
          });
      });
    });
  });
  describe('DELETE routes', ()=> {
    describe('DELETE /api/schools', ()=> {
      it('deletes a school', ()=> {
        return app.delete(`/api/schools/${seeded.schools.Harvard.id}`)
          .expect(204);
      });
    });
    describe('DELETE /api/students', ()=> {
      it('deletes a student', ()=> {
        return app.delete(`/api/students/${seeded.students['moe@gmail.com'].id}`)
          .expect(204);
      });
    });
  });
  describe('POST routes', ()=> {
    describe('POST /api/schools', ()=> {
      it('creates a school', ()=> {
        return app.post('/api/schools')
          .send({ name: 'Cal Tech'})
          .expect(201)
          .then( response => expect(response.body.name).to.equal('Cal Tech'));
      });
    });
    describe('POST /api/students', ()=> {
      it('creates a student', ()=> {
        return app.post('/api/students')
          .send({ firstName: 'first', lastName: 'last', email: 'first@last.com'})
          .expect(201)
          .then( response => expect(response.body.fullName).to.equal('first last'));
      });
    });
  });
  describe('PUT routes', ()=> {
    describe('PUT /api/schools', ()=> {
      it('updates a school', ()=> {
        return app.put(`/api/schools/${ seeded.schools.MIT.id}`)
          .send({ name: 'Mit'})
          .expect(200)
          .then( response => expect(response.body.name).to.equal('Mit'));
      });
    });
    describe('PUT /api/students', ()=> {
      it('updates a student', ()=> {
        return app.put(`/api/students/${ seeded.students['moe@gmail.com'].id}`)
          .send({ firstName: 'moo', schoolId: ''})
          .expect(200)
          .then( response => expect(response.body.fullName).to.equal('moo Jones'));
      });
    });
  });
});
