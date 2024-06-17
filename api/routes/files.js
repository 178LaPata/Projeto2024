var express = require('express');
const path = require('path');
const archiver = require('archiver');
const crypto = require('crypto');
var jsonfile = require('jsonfile');
var fs = require('fs');
var multer = require('multer');
const { error } = require('console');
var upload = multer({ dest: 'uploads' });


var File = require("../controllers/file");

var router = express.Router();

// um coto inutil
function md5(data) {
  return crypto.createHash('md5').update(data).digest('hex');
}

function md5File(filename) {
  const fileContent = fs.readFileSync(filename);
  const hash = crypto.createHash('md5').update(fileContent).digest('hex');
  return hash;
}


// GET all files
router.get('/:uc?/:aula?', function (req, res, next) {
  if (req.params.uc != null && req.params.aula != null) {
    File.listByAula(req.params.uc, req.params.aula)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  }
  else if (req.params.uc != null) {
    File.listByUC(req.params.uc)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
  }
  else {
      File.list()
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
  }
});


router.put('/:uc/:aula?/:name?', upload.single('myFile'), function (req, res, next) {
  const { uc, aula, name } = req.body;
  const { uc: paramUc, aula: paramAula, name: paramName } = req.params;

  if (!req.file) {
    const finalUc = uc || paramUc;
    const finalAula = aula || paramAula;

    if (name && aula && paramAula && paramName) {
      // Case 1: Update file name and aula when all relevant parameters are present
      const fileName = name;
      console.log("ESTOU AQUI", finalUc, finalAula, fileName);
      File.updateAulaName(paramUc, paramAula, paramName, { name: fileName, aula: finalAula, uc: finalUc })
        .then(data => res.jsonp(data))
        .catch(error => res.jsonp(error));
    } else if (paramAula && aula && !name) {
      // Case 2: Update only aula and uc
      console.log("ESTOU AQUI", finalUc, finalAula);
      File.updateAulaName2(paramUc, paramAula, { aula: finalAula, uc: finalUc })
        .then(data => res.jsonp(data))
        .catch(error => res.jsonp(error));
    } else if (!aula && !name) {
      // Case 3: Update only uc
      console.log("ESTOU AQUI", finalUc);
      File.updateUcName(paramUc, { uc: finalUc })
        .then(data => res.jsonp(data))
        .catch(error => res.jsonp(error));
    } else {
      res.status(400).send('Invalid request');
    }
  }


  else {
  File.removeByAulaName(req.params.uc, req.params.aula, req.params.name)
    .then(data => { 
      let oldP = __dirname + "/../" + req.file.path;
      console.log("oldP = " + oldP);

      originalExtension = path.extname(req.file.originalname);
      novoNome = md5File(oldP) + originalExtension

      // path final dentro do publicfileStore
      let newP = __dirname + "/../public/fileStore/" + novoNome
      console.log("newP = " + newP);

      fs.rename(oldP, newP, err => {
        if (err) throw err;
      })
      var date = new Date().toISOString().substring(0, 19);
      if (req.body.aula != null) { final = req.body.aula } else { final = req.params.aula }
      if (req.body.name != null) { fileN = req.body.name } else { fileN = req.file.originalname}
      if (req.body.uc   != null) { finalU = req.body.aula } else { finalU = req.params.uc }
    
      File.inserir({
        uc: finalU,
        date: date,
        aula: final,
        original: fileN,
        name: novoNome,
        size: req.file.size,
        mimetype: req.file.mimetype
      })
        .then(data => res.jsonp(data))
        .catch(erro => res.jsonp(erro))
      
    })
    .catch(erro => res.jsonp(erro))
  }
  
});


// naive aproach, só coloca dentro do ficheiro de meta dados obriga a ter uma refenrencia nas aulas?
// POST file 
router.post('/', upload.single('myFile'), (req, res) => {

  aula = req.body.aula
  uc   = req.body.uc

  //console.log("old path" + __dirname + "/../" + req.file.path, );
  let oldP = __dirname + "/../" + req.file.path;
  // path qeu vai parar a pasta /uploads
  console.log("oldP = " + oldP);

  originalExtension = path.extname(req.file.originalname);
  novoNome = md5File(oldP) + originalExtension
  //console.log("novoNome = " + novoNome)
  // path final dentro do publicfileStore
  let newP = __dirname + "/../public/fileStore/" + novoNome
  //console.log("newP = " + newP);

  fs.rename(oldP, newP, err => {
    if (err) throw err;
  })

  var date = new Date().toISOString().substring(0, 19);
  if (aula != null) { final = aula }  else { final  = null }
  if (uc   != null) { finalU = uc  }  else { finalU = null }

  File.inserir({
    uc: finalU,
    date: date,
    aula: final,
    original: req.file.originalname,
    name: novoNome,
    size: req.file.size,
    mimetype: req.file.mimetype
  })
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});



// elimina com o id mongo
router.delete('/:uc/:aula?/:id?', (req, res) => {
  if (req.params.id != null && req.params.aula != null) {
    //console.log("id = " + req.params.id + " aula = " + req.params.aula + " uc = " + req.params.uc)
    File.removeByAulaName(req.params.aula, req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
  }
  else if (req.params.id != null) {
    //console.log("id = " + req.params.id + " aula = " + req.params.aula + " uc = " + req.params.uc)
    File.removeByAula(req.params.aula)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))    
  }
  else {
    //console.log("uc = " + req.params.uc)
    File.removeByUC(req.params.uc)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
  }

});


// devolve o conteudo do ficheiro
router.get('/contents/:uc/:aula/:name', (req, res) => {
  File.content(req.params.uc ,req.params.aula, req.params.name)
    .then(data => {
      let content;
      try {
        content = fs.readFileSync(__dirname + "/../public/fileStore/" + data[0].name);
        res.send(content)
      } catch (err) {
        res.jsonp(err)
      }
    })
    .catch(erro => res.jsonp(erro))
});



router.get('/zip/:aula', function (req, res) {
  let fileList = [];

  fs.readFile(__dirname + "/../data/dbFiles.json", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let cont = JSON.parse(data);

    for (let dic of cont) {
      if (req.params.aula != null) {
        if (dic.aula == req.params.aula) {
          console.log(req.params.aula, dic.aula, req.params.aula == dic.aula)
          fileList.push(__dirname + "/../public/fileStore/" + dic.original)
          // FIXME verificar se o nome já está na lista, mudar qualquer coisa
        }
      }
      else {
        fileList.push(__dirname + "/../public/fileStore/" + dic.original)
      }
    }
    console.log(fileList)
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the level of compression
    });

    res.writeHead(200, {
      'Content-Type': 'application/zip',
      'Content-disposition': `attachment; filename=${req.params.aula}.zip`
    });
    // Pipe the zip file to the response
    archive.pipe(res);

    fileList.forEach(file => {
      archive.file(file, { name: path.basename(file) });
    });
    
    archive.finalize();
  });
});


// FIXME
// esta operação não é uma função injetiva, pode haver vários ficheiros com o mesmo nome
router.get('/download/:name', (req, res) => {
  console.log(__dirname + "/../public/fileStore/" + req.params.name);
  res.send(__dirname + "/../public/fileStore/" + req.params.name)
});



module.exports = router;