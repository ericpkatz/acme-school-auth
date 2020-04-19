const app = require('express').Router();
const { conn } = require('./db');
const inflection = require('inflection');

app.use('/auth', require('./auth.routes'));


Object.keys(conn.models).forEach( key => {
  const plural = `/${inflection.pluralize(key)}`;
  const pluralWithId = `${plural}/:id`;
  const model = conn.models[key];
  app.get(plural, async(req, res, next)=> {
    try{
      res.send(await model.findAll());
    }
    catch(ex){
      next(ex);
    }
  });

  app.post(plural, async(req, res, next)=> {
    try{
      res.status(201).send(await model.create(req.body));
    }
    catch(ex){
      next(ex);
    }
  });

  app.put(pluralWithId, async(req, res, next)=> {
    try{
      const item = await model.findByPk(req.params.id);
      if(!item){
        const error = { status: 404 };
        throw error;
      }
      await item.update(req.body);
      res.send(item);
    }
    catch(ex){
      next(ex);
    }
  });

  app.delete(pluralWithId, async(req, res, next)=> {
    try{
      const item = await model.findByPk(req.params.id);
      if(!item){
        const error = { status: 404 };
        throw error;
      }
      await item.destroy();
      res.sendStatus(204);
    }
    catch(ex){
      next(ex);
    }
  });
});
/*
app.get('/schools', async(req, res, next)=> {
  try {
    res.send( await School.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/students', async(req, res, next)=> {
  try {
    res.send( await Student.findAll());
  }
  catch(ex){
    next(ex);
  }
});
*/

module.exports = app;
