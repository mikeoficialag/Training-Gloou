sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"

], function(Controller, UIComponent) {
	"use strict";

	return Controller.extend("ns.project1.controller.BaseController", {

		 user:{
			activo:false,
			nombre:''
		},//fin de la funcion

		/**
		 * Method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return UIComponent.getRouterFor(this);
		},//fin de la funcion

		__setUser:function(activo,nombre){
       this.user.activo=activo;
	this.user.nombre=nombre;
		},//fin de la funcion
		__getUser:function(){
			// console.log("regresando usuario y activo desde baseController"+this.user)
			return this.user
		},

		isUserActive:function(){
        
			if(!this.__getUser().activo){//mejor practica de implementar un if si no existe
				console.log(this.__getUser().nombre+" sin acceso sacando...")
				console.log(this.__getUser())
				this.getRouter().navTo('RouteMain');


			}
			else{
				console.log("welcome "+this.__getUser().nombre)
			}
			

		},//end function
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},//funcion parausar el combobox
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},//end function
	



	});
});