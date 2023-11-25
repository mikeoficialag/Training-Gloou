sap.ui.define([

    "./BaseController"
   
  ],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (BaseController,MessageToast) {
      "use strict";

  
      return BaseController.extend("ns.project1.controller.MRecomendaciones", {
        onInit: function () {
  
         console.log("estas en la vista MRecomendaciones");
         
        }
        
  
  
  
      });
    });
  