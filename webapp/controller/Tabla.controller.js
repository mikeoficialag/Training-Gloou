sap.ui.define([

  "./BaseController"

],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController) {
    "use strict";

    return BaseController.extend("ns.project1.controller.Tabla", {
      onInit: function () {

        console.log("welcome to table view")
      }//fin de la funcion

      





    });
  });
