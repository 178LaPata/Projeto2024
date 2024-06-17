var express = require('express');
var router = express.Router();
var Uc = require("../controllers/uc");

//  modules to deal with file uploads
var jsonfile = require('jsonfile');
var fs = require('fs');
var multer = require('multer');
const { error } = require('console');
var upload = multer({ dest: 'uploads' });

router.get('/ucs', function(req, res, next) {
    Uc.list()
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
});

router.get('/ucs/:id', function(req, res, next) {
    Uc.findById(req.params.id)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
});

router.get('/ucs/:id/aulas', function(req, res, next) {
    Uc.findById(req.params.id)
      .then(data => res.jsonp(data.aulas))
      .catch(erro => res.jsonp(erro))
});

router.get('/ucs/:id/docentes', function(req, res, next) {
    Uc.findById(req.params.id)
      .then(data => res.jsonp(data.docentes))
      .catch(erro => res.jsonp(erro))
});

router.get('/ucs/:id/exames', function(req, res, next) {
    Uc.findById(req.params.id)
      .then(data => res.jsonp(data.datas))
      .catch(erro => res.jsonp(erro))
});

router.get('/ucs/:id/informacoes', function(req, res, next) {
    Uc.Informacoes(req.params.id)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
});

router.get('/ucs/:id/anuncios', function(req, res, next) {
    Uc.findById(req.params.id)
      .then(data => res.jsonp(data.anuncios))
      .catch(erro => res.jsonp(erro))
});

router.post('/ucs', function(req, res, next) {
    Uc.inserir(req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
});

router.delete('/ucs/:id', function(req, res, next) {
    Uc.remove(req.params.id)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
});

router.put('/ucs/:id', function(req, res, next) {
    Uc.update(req.params.id, req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
});

router.post('/ucs/:id/aulas', function(req, res, next) {
  Uc.inserirAula(req.params.id, req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
});

router.delete('/ucs/:id/aulas/:aulaId', function(req, res, next) {
  Uc.removeAula(req.params.id, req.params.aulaId)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
});

router.put('/ucs/:id/aulas/:aulaId', function(req, res, next) {
  Uc.updateAula(req.params.id, req.params.aulaId, req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
});

router.post('/ucs/:id/docentes', function(req, res, next) {
  Uc.inserirDocente(req.params.id, req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
});

router.delete('/ucs/:id/docentes/:docenteId', function(req, res, next) {
  Uc.removeDocente(req.params.id, req.params.docenteId)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
});

router.put('/ucs/:id/docentes/:docenteId', function(req, res, next) {
  Uc.updateDocente(req.params.id, req.params.docenteId, req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
});

router.post('/ucs/:id/anuncios', function(req, res, next) {
  Uc.inserirAnuncio(req.params.id, req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
});

router.delete('/ucs/:id/anuncios/:anuncioId', function(req, res, next) {
  Uc.removeAnuncio(req.params.id, req.params.anuncioId)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
});

router.put('/ucs/:id/anuncios/:anuncioId', function(req, res, next) {
  Uc.updateAnuncio(req.params.id, req.params.anuncioId, req.body)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro));
});



module.exports = router;
