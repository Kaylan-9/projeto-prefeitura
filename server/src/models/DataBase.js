require('dotenv').config();
const mongoose = require('mongoose');
const modelPages = require('./model.Pages');
const crypto = require('./Crypto');

module.exports = new (class{
  constructor() {
    mongoose.connect(process.env.CONNSTR);
  }

  async getpages(id={}) {
    const strjson = await modelPages.find({...id});
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

  async removepages(links) {
    let strjson = "";
    let conjuntos = await this.getpages();
    let pages = {};

    for(let conjunto of conjuntos) {
      let {nomes, links_pages} = Object.entries(conjunto.pages);
      console.log(links)
      for(let link of links) { 
        const ref_remove = links_pages.indexOf(link);
        if(ref_remove==-1) {
          nomes.splice(ref_remove, 1);
          links_pages.splice(ref_remove, 1);
        }
      }
      for(let i=0;i<=nomes.lenght;i++) pages[nomes[i]] = links[i];
      strjson = JSON.stringify(await modelPages.updateOne({pages: conjunto.pages}, {pages}));
    }

    return strjson;
  }
})();

