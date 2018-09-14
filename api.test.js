import request  from 'supertest';
import app  from './src/api';

describe('POST /todo', function() {
  it('Should create new TODO', function(done) {
    request(app)
      .post('/api/todos')
      .send({"title": "New task"})
      .set('Accept', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});

describe('POST /todo', function() {
  it('Should update title', function(done) {
    request(app)
      .put('/api/todos/1')
      .send({"title": "Must todo"}) 
      .set('Accept', 'application/json')
      .expect(200, {
        "id": 1,
        "title": 'Must todo',
        "completed": false
      }, done);
  });
});

describe('UPDATE /todo', function() {
  it('Should complete todo', function(done) {
    request(app)
      .post('/api/todos/1')
      .set('Accept', 'application/json')
      .expect(200, {
        "id": 1,
        "title": 'Must todo',
        "completed": true
      }, done);
  });
});

describe('UPDATE /todo', function() {
  it('Update non exist todo', function(done) {
    request(app)
      .post('/api/todos/10')
      .send({"title": "Write other task"}) 
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});

describe('DELETE todo', function() {
  it('Should delete todo', function(done) {
    request(app)
      .delete('/api/todos/1')
      .send({"id": 1})
      .set('Accept', 'application/json')
      .expect(204)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});



