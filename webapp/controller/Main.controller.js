sap.ui.define([

  "./BaseController",  
  'sap/m/MessageToast'
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController,MessageToast) {
    "use strict";

    return BaseController.extend("ns.project1.controller.Main", {
      onInit: function () {

        var oModel = new sap.ui.model.json.JSONModel({
          usuario: "",
          contrasena: ""
        })
        this.getView().setModel(oModel);
       
      },//fin de la funcion

      




      ChangeScreen: function () {
        this.getRouter().navTo('RouteLista');

      },//fin de la funcion

    

      onLoginPress: function () {
        // Obtener el modelo asociado a la vista
        var oModel = this.getView().getModel();
        var mensajeError=this.getView().byId("mensajeError");//declaramos el mensaje error que pondremos en true
        var cBox = this.getView().byId("cBox").getSelected();//nos regresa el estado del checkbox
        var msg=""
       

        // Obtener los valores de usuario y contraseña del modelo
        var usuario = oModel.getProperty("/usuario");
        var contrasena = oModel.getProperty("/contrasena");

        if (usuario.localeCompare("mike") === 0 && contrasena.localeCompare("1234") === 0 && cBox) {
          console.log("has entrado a la interfaz")
          console.log("Usuario:", usuario);
          console.log("Contraseña:", contrasena);
          this.ChangeScreen()
          this.__setUser(true,usuario);
          console.log(this.__getUser());
        }

      else if(cBox ===false){
         msg = 'Acepte los terminos y condiciones para continuar';
        MessageToast.show(msg);
      }  
        else {
          console.log("credenciales invalidas")
           msg = 'Error, las credenciales introducidas son incorrectasy\r\n Corrijalas.';
          MessageToast.show(msg);
          mensajeError.setVisible(true)
        }
      }//fin de la funcion



    });
  });
