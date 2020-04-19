const { expect } = require('chai');
const { syncAndSeed, models } = require('../../db');

describe('Models', ()=> {
  let seeded;
  beforeEach(async()=> seeded  = await syncAndSeed());
  describe('seeded data', ()=> {
    it('there are 4 schools', ()=> {
      expect(Object.keys(seeded.schools).length).to.equal(4);
    });
    it('there are 6 students', ()=> {
      expect(Object.keys(seeded.students).length).to.equal(6);
    });
    it('ethel is at MIT', ()=> {
      expect(seeded.students['ethel@aol.com'].schoolId).to.equal(seeded.schools.MIT.id);
    });
    it('moe is at Harvard', ()=> {
      expect(seeded.students['moe@gmail.com'].schoolId).to.equal(seeded.schools.Harvard.id);
    });
    it('lucy is at Harvard', ()=> {
      expect(seeded.students['lucy@gmail.com'].schoolId).to.equal(seeded.schools.Harvard.id);
    });
  });
});
