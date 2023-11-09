
let aux=10
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */

    function (Controller,MessageToast,MessageBox,JSONModel) {
        "use strict";

        return Controller.extend("ns.project1.controller.Main", {
            oModel: null,

            onInit: function () {  
                this._setModels(); 
                this._getProducts();
               
                 console.log("On init")
            },

            _setModels:function(){
                
                this.oModel = this.getOwnerComponent().getModel("northwind");
                this.oModel.setUseBatch(false);
                let productos=new JSONModel({
                    products:[],
                    isBusy:false
                 });
                 this.getView().setModel(productos,"NWProducts");
            },




         _getProducts: function(){
          let oProducts = this.getView().getModel("NWProducts");
          let sPath= "/Products";
          oProducts.setProperty("/isBusy",true)//esto se utiliza para saber si se encuentra ocupado
          this.oModel.read(sPath, {
          
            success: function(OData){
                console.log("entrando a getproducts")
              
                console.log(OData)
                oProducts.setProperty("/products",OData.results)
                oProducts.setProperty("/isBusy",false)
            },
            error: function(err){
               
                console.error( err)
            }
         
          })
            },
            onBeforeRendering: function(){
                console.log("Antes del renderizado")
            },
            onAfterRendering(){
                console.log("onAfterRendering")
            },
            onExit: function(){
                console.log("Exit")
            },
            handleEventPress:function(event){
                MessageToast.show("Hola mundo")
            },
            handleEventBoxPress:function(event){
                aux+=1
                MessageBox.show("Hola box"+aux,{
                    title:"mi primer box",
                    icon:MessageBox.Icon.SUCCESS
                })
            }
        });
    });
