'use strict';
// tests for posts
// Generated by serverless-mocha-plugin

const mod         = require('../blog/posts/handler.js');
const mochaPlugin = require('serverless-mocha-plugin');
const lambdaWrapper     = mochaPlugin.lambdaWrapper;
const expect      = mochaPlugin.chai.expect;

const liveFunction = {
  region: process.env.SERVERLESS_REGION,
  lambdaFunction: `${process.env.SERVERLESS_PROJECT}-handler`,
};

//  wrapper.init(liveFunction); // Run the deployed lambda
const createPostWrapped = lambdaWrapper.wrap(mod, { handler: 'createPost' });

describe('API create', () => {
  it('creates a post', (done) => {
    createPostWrapped.run({
        'method': 'POST',
        'stage': 'dev',
        'body': {
          'title': 'Test post',
          'content' : 'Test content'
        }
    }, (err, response) => {
      expect(err).to.be.null;
      expect(response.post.id).to.not.to.be.null;
      expect(response.post.title).to.equal('Test post');
      expect(response.post.content).to.equal('Test content');
      done();
    });
  });
});