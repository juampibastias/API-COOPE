var express = require('express');
var router = express.Router();
  
  router.post('/agregarcortes', async(req, res, next) => {
    try {
      if(req.body.iniciocorte != "" && req.body.zonaafectada != "" && req.body.fincorte != "") {
        await cortesModel.insertCorte(req.body);
        res.redirect('/admin/cortesprogramados');
  
      } else {
        res.render('admin/agregarcortes', {
          layout: 'admin/layout',
          error: true,
          message: 'Todos los campos son requeridos'
        });
      }
    }catch (error) {
      console.log(error)
      res.render('admin/agregarcortes', {
        layout: 'admin/layout',
        error: true,
        message: 'No se cargo el corte programado'
      });
    };
  });
  
  module.exports = router;