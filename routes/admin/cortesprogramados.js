var express = require("express");
var router = express.Router();
var cortesModel = require("../../models/cortesModel");

router.get("/", async function (req, res, next) {
  var cortes = await cortesModel.getCortes();

  cortes = cortes.map((corte) => {
    return {
      ...corte,
    };
  });
  res.render("admin/cortesprogramados", {
    layout: "admin/layout",
    usuario: req.session.nombre,
    cortes,
  });
});

router.get("/agregarcortes", (req, res, next) => {
  res.render("admin/agregarcortes", {
    layout: "admin/layout",
  });
});

router.post("/agregarcortes", async (req, res, next) => {
  try {
    if (
      req.body.iniciocorte != "" &&
      req.body.zonaafectada != "" &&
      req.body.fincorte != ""
    ) {
      await cortesModel.insertCortes({
        ...req.body,
      });

      res.redirect("/admin/cortesprogramados");
    } else {
      res.render("admin/agregarcortes", {
        layout: "admin/layout",
        error: true,
        message: "Todos los campos son requeridos",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("admin/agregarcortes", {
      layout: "admin/layout",
      error: true,
      message: "No se cargo el corte programado",
    });
  }
});

router.get("/eliminarcorte/:id", async (req, res, next) => {
  var id = req.params.id;
  let corte = await cortesModel.getCorteById(id);
  await cortesModel.deleteCortesById(id);
  res.redirect("/admin/cortesprogramados");
  corte;
});

router.get("/modificarcorte/:id", async (req, res, next) => {
  let id = req.params.id;
  let corte = await cortesModel.getCorteById(id);
  res.render("admin/modificarcorte", {
    layout: "admin/layout",
    corte,
  });
});

router.post("/modificarcorte", async (req, res, next) => {
  try {
    let obj = {
      iniciocorte: req.body.iniciocorte,
      zonaafectada: req.body.zonaafectada,
      fincorte: req.body.fincorte,
    };

    await cortedesModel.modificarCorteById(obj, req.body.id);
    res.redirect("/admin/cortesprogramados");
  } catch (error) {
    console.log(error);
    res.render("admin/modificarcorte", {
      layout: "admin/layout",
      error: true,
      message: "No se modifico el corte programado",
    });
  }
});

module.exports = router;
