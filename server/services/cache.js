const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const keys = require('../config/keys');

// const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options = {}){
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || 'defaultKey');

  return this;
};

mongoose.Query.prototype.exec = async function (){
  if(!this.useCache){
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name
  }));

  // see if we have a value for key in redis
  const cacheValue = await client.hget(this.hashKey, key);
  //if we do, return that
  if(cacheValue) {
    const doc = JSON.parse(cacheValue);

    return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc);
  }

  //otherwise, issue the query and store the resultt in redis
  const result = await exec.apply(this, arguments);

  client.hset(this.hashKey, key, JSON.stringify(result));//, 'EX', 10

  return result;
};

module.exports = {
  clearHash(hashKey){
    client.del(JSON.stringify(hashKey));
  }
};


//
// //Do we have any cached data in redis related to this query
// const cachedBlogs = await client.get(req.user.id);
// //if yes, then respond to the request right away and return
// if (cachedBlogs) {
//   console.log('serving from cache');
//   return res.send(JSON.parse(cachedBlogs));
// }
//
// //if no, we need to respond to request and update our cache to store the data
// const blogs = await Blog.find({ _user: req.user.id });
// console.log('serving from db');
// res.send(blogs);
// client.set(req.user.id, JSON.stringify(blogs));


// to revert session string to it's previous look
// const session = 'eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWM1MWFlMWUzNDdmMDkzYTQwZGY0YmVhIn19'
// const Buffer = require('safe-buffer').Buffer;
//
//decode session into JS object
// Buffer.from(session, 'base64').toString('utf8')
//
// result of decoding is this
// '{"passport":{"user":"5c51ae1e347f093a40df4bea"}}'
