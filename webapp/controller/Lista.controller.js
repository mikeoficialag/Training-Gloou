

sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"    //libreria necesaria para poder usar el fragment

],
   
    function (BaseController,JSONModel,Fragment) {
        "use strict";

        return BaseController.extend("ns.project1.controller.Lista", {
            oModel: null,
      

            onInit: function () {  
                this.isUserActive()
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
            }, //end function
            onPressLogOut:function(){
                this.__setUser(false,this.__getUser().nombre);
                this.onInit();
                },//end function
              


             //FORMA CORRECTA DE MANDAR LLAMAR UN DIALOG
		openDialog() {
			// create dialog lazily
			this.pDialog ??= this.loadFragment({
				name: "ns.project1.view.fragments.MPDialog"
			});

			this.pDialog.then((oDialog) => oDialog.open());
     
            
		},

		onCancelDialog() {
			// note: We don't need to chain to the pDialog promise, since this event handler
			// is only called from within the loaded dialog itself.
			this.byId("firstDialog").close();
		},

















            //de qui para abajo son configuraciones fuera del Odata
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
