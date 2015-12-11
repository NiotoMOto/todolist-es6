'use strict';

global.fetch = require('node-fetch');

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const engine = require('./middlewares/engine');

const passport = require('passport');
const methodOverride = require('method-override');

const data = require('./data');

const elements = [
  {id: 1, message: 'Trouver une solution pour flux/ajax', active: true},
  {id: 2, message: 'Créer des components', active: false},
  {id: 3, message: 'Songer à utiliser redux', active: false},
  {id: 4, message: 'Bosser le design', active: true}
];

const app = express();

app.engine('js', engine.react({
  layout: path.resolve(__dirname, 'layouts', 'home.jade')
}));

app.set('view engine', 'js');
app.set('views', path.resolve(__dirname, 'containers'));

if(process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.resolve(__dirname, '..', 'build')));
  app.use('/vendors', express.static(path.resolve(__dirname, '..', 'node_modules')));
} else {
  app.use('/', express.static(path.resolve(__dirname, '..', 'public')));
  app.use('/app', express.static(path.resolve(__dirname, '..', 'app')));
  app.use('/vendors', express.static(path.resolve(__dirname, '..', 'node_modules')));
}


app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride());
app.use(engine.setUserAgent());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('home', {
    data: {
      props: {
        elements: elements
      }
    }
  });
});


app.use(require('./routes/api'));

app.get('/about/test/t', (req, res) => {
  res.render('about');
});

app.post('/api/todo', (req, res) => {
  const error = ~~(Math.random() * 10) === 1;
  if(error) {
    setTimeout(() => res.sendStatus(500), 1000);
  } else {
    elements.push(Object.assign(req.body, {
      id: elements.length + 1
    }));
    res.status(201).json(elements[elements.length - 1]);
  }
});

module.exports = app;
