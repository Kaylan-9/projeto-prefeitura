require('dotenv').config();
const mongoose = require('mongoose');
const modelPages = require('./model.Pages');
const crypto = require('./Crypto');

module.exports = new (class{
  constructor() {
    mongoose.connect(process.env.CONNSTR);
  }

  async getpages() {
    const strjson = await modelPages.find({});
    return strjson;
  }

  async removeconjuntos(_ids) {
    let strjson = "";
    for(let _id of _ids) { 
      // _id = crypto.decryp(_id);
      strjson = JSON.stringify(await modelPages.remove({_id}));
    }
    return strjson;
  }
})();

