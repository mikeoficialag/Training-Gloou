sap.ui.define([

  "./BaseController",  
  'sap/m/MessageToast'
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (BaseController,MessageToast) {
    "use strict";
    var msgError = null;

    return BaseController.extend("ns.project1.controller.Main", {
      onInit: function () {

        var oModel = new sap.ui.model.json.JSONModel({
          usuario: "",
          contrasena: ""
        })
        this.getView().setModel(oModel);
       
      },//fin de la funcion

      




      ChangeScreen: function (navTo) {

      navTo === 1 ? this.getRouter().navTo('RouteLista') : this.getRouter().navTo('RouteMRecomendaciones');


      },//fin de la funcion

    

      //***************************************** */

      onLoginPress: function () {
        // Obtener el modelo asociado a la vista
        var oModel = this.getView().getModel();
        var mensajeError=this.getView().byId("mensajeError");//declaramos el mensaje error que pondremos en true
        var cBox = this.getView().byId("cBox").getSelected();//nos regresa el estado del checkbox
        var rbInfoDoctores = this.getView().byId("rbInfoDoctores");//obtenemos el valor del primer rb
        var rbRecomendaciones = this.getView().byId("rbRecomendaciones");
        var msg=""
        msgError = this.getView().byId("msgError");//esta declarada antes del return
       
        console.log(cBox,rbInfoDoctores.getSelected(),rbRecomendaciones.getSelected())
        // Obtener los valores de usuario y contraseña del modelo
        var usuario = oModel.getProperty("/usuario");
        var contrasena = oModel.getProperty("/contrasena");



      //  NOTA:EL IF ME DABA ERRORES POR QUE AL EVALUAR LA ULTIMA CONDICION
      //  DEBO DE RECORDAR ANIDAR CON PARENTESIS YA QUE EL OPERADOR LOGICO &&
      //  TIENE MAS PESO QUE EL OPERADOR LOGICO ||

        if (usuario === '' && contrasena === '' && cBox && (rbInfoDoctores.getSelected() || rbRecomendaciones.getSelected())) {
          console.log("Credenciales han sido correctas... software verificando el modulo al que sera dirigido")
          
          if(rbInfoDoctores.getSelected()){
            this.ChangeScreen(1);
          }
          else{
            this.ChangeScreen(2);
            //  le estoy mandando parametros a mi funcion ChangeScreen
            //   para que verifique a que modulo ir
          }


          
          this.__setUser(true,usuario);
          console.log(this.__getUser());
        }

      else if(!cBox){
         msg = 'Acepte los terminos y condiciones';
        MessageToast.show(msg);
      }  
      else if (!rbInfoDoctores.getSelected() && !rbRecomendaciones.getSelected()){
        msg = 'Seleccione un modulo para poder iniciar sesion!';
        MessageToast.show(msg);
        rbInfoDoctores.setValueState("Error")
        rbRecomendaciones.setValueState("Error")

      }
        else {
          console.log("credenciales invalidas")
          msgError.setVisible(true)
        }
      },//fin de la funcion

      onRBSelected:function(oEvent){
        var oRB = oEvent.getSource();
        oRB.setValueState("Information");

      },//end function esta funcion va relacionada con on login press

      onChangeInput:function(oEvent){
      msgError.setVisible(false);
      }

     //************************************************************** */

    });
  });
