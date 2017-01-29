
'use strict';

const expect = require('expect');
const sinon = require('sinon');
const NotificationService = require('./NotificationService');

/**
* helper: infrastructure/NotificationService.test.js
* mocha --require clarify ./src/infrastructure/NotificationService.test.js --watch
* istanbul cover --print both node_modules/.bin/_mocha -- ./src/infrastructure/NotificationService.test.js
* eslint 
*/

describe('NotificationService', function() {
  this.timeout(100000);
  let sandbox;
  let service;

  before(done => {
    service = new NotificationService();
    setTimeout(() => {
      done();
    }, 100);
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('general', () => {
    it('should have an injection static', () => {
      expect(Array.isArray(NotificationService.inject)).toBe(true);
    });
  });

  describe('Notification Service Methods', () => {
    describe('request-response', () => {
      it('should also pass', done => {
        service.request('car_requests', { color: 'blue'}, (err, res) => {
          expect(res).toExist();
          done();
        });
      });
    });
  });
});
