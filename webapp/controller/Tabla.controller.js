  sap.ui.define([
    "./BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
  ], function(BaseController, JSONModel) {
    "use strict";
    return BaseController.extend("ns.project1.controller.Tabla" ,{
      //sap.ui.webc.main.sample.Table.C
      onInit: function() {
       
      },
      onNavBack:function(){
        this.getRouter().navTo('RouteLista');
         }//end function
   
    
    });
  });