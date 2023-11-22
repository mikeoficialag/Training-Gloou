

sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/library"//para el uso del combobox
     //libreria necesaria para poder usar el fragment

],
   
    function (BaseController,JSONModel,coreLibrary) {
        var ValueState = coreLibrary.ValueState;//esta variable es para el uso del combobox
        "use strict";

        return BaseController.extend("ns.project1.controller.Lista", {
            oModel: null,
            odModel:null,
      

            onInit: function () {  
                this.isUserActive()
                this._setModels(); 
                this._getProducts();
                this.odModel = new JSONModel({
          Id: '180172220',
          Inspectores: [
            { Id: 'dc01', Name: 'Miguel Aguilar' },
            { Id: 'dc02', Name: 'Edy Castro' },
            { Id: 'dc03', Name: 'Ximena Garcia' },
            { Id: 'dc04', Name: 'Juan Ramirez' },
          ],
          Materiales: null,
          IsInspectorSelected: false
        });

        this.setModel(this.odModel, 'AsnModel')
               
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
		},//end function


      handleChangeInspector: function (oEvent) {
        var oComboBox = oEvent.getSource(),
				    sSelectedKey = oComboBox.getSelectedKey(),
				    sValue = oComboBox.getValue();
        
        var oAsnModel = this.getModel('AsnModel');

        if (sSelectedKey && sValue) {
          oComboBox.setValueState(ValueState.None);
          oAsnModel.setProperty('/isInspectorSelected', true);
        } else if (!sSelectedKey && sValue) {
          oComboBox.setValueState(ValueState.Error);          
          oComboBox.setValueStateText('Favor de introducir un inspector válido');
          oAsnModel.setProperty('/isInspectorSelected', false);
        } else {
          oComboBox.setValueState(ValueState.None);
          oAsnModel.setProperty('/isInspectorSelected', false);
        }
      },//end function



      onEnterToMaterialInspection:function(){
      console.log("dentro del combobox")
      let that = this;

      // se navega a la pantalla inspección material y se cierra el diálogo
      this.pDialog.then(function (oDialog) {
        that.getRouter().navTo('RouteTabla');
        oDialog.close();
      });
      },//end function













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
