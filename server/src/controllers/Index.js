const fs = require('fs');
const path = require('path');
const dataBase = require('../models/DataBase');
const auto = require('../models/Auto');
const crypto = require('../models/Crypto');

module.exports = new (class{
  init(req, res) {
    res.sendFile(path.join(__dirname, '../../..', 'client', 'build', 'index.html'));
  }

  async getimage(req, res) {
    const {link, name} = req.body;
    const newNameFile = (name+link).replace(/[^\w\-]+/g, new String('')).slice(1, 25)+".png";

    const dirImage = path.join(__dirname, "/..", "..", "public", "prints", newNameFile);
    fs.access(dirImage, fs.constants.F_OK, async err => {
      if(err) await auto.screenshot(dirImage, link);
      console.log(err ? "image não existe!" : "image existe!!");
    });
    res.sendFile(dirImage);
  }

  async getpages(req, res) {
    let pages = await dataBase.getpages();
    // for(let i=0;i<=pages.lenght;i++) { 
    //   pages[i]._id = crypto.cryp(pages[i]._id);
    // }
    const _pages = JSON.stringify(pages);
    res.end(_pages);

  }

  async removeconjuntos(req, res) {
    const conjuntos = req.body.items_selecionados;
    console.log(conjuntos);
    const response = await dataBase.removeconjuntos(conjuntos);
    res.end(response);
  }

  async removepages(req, res) {
    const links = req.body.items_selecionados;
    const response = await dataBase.removepages(links);
    res.end(response);
  }

  get(req, res) {
    console.log("Working");
  }
  
})();


