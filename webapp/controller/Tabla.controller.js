sap.ui.define([
  "./BaseController",
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(BaseController, Controller, JSONModel,Filter,FilterOperator) {
  "use strict";

  return BaseController.extend("ns.project1.controller.Tabla", {

    onInit: function() {
      var oModel = new JSONModel({
        "DoctorsReport": [
          {
            "Id":"01",
            "Nombre": "Miguel Aguilar",
            "Edad": "21",
            "Especialidad": "Pediatra",
            "Contrato": "TiempoCompleto",
            "Sueldo": 60000,
            "Moneda":"MXN"
           
          },
          {
            "Id": "02",
            "Nombre": "Liz García",
            "Edad": "32",
            "Especialidad": "Cardiólogo",
            "Contrato": "MedioTiempo",
            "Sueldo": 80000,
            "Moneda": "USD"
          },
          {
            "Id": "03",
            "Nombre": "Carlos López",
            "Edad": "45",
            "Especialidad": "Dentista",
            "Contrato": "TiempoCompleto",
            "Sueldo": 75000,
            "Moneda": "EUR"
          },
          {
            "Id": "04",
            "Nombre": "Laura Martínez",
            "Edad": "28",
            "Especialidad": "Oftalmólogo",
            "Contrato": "MedioTiempo",
            "Sueldo": 70000,
            "Moneda": "GBP"
          },
          {
            "Id": "05",
            "Nombre": "Javier Rodríguez",
            "Edad": "40",
            "Especialidad": "Cirujano",
            "Contrato": "TiempoCompleto",
            "Sueldo": 90000,
            "Moneda": "JPY"
          },
          {
            "Id": "06",
            "Nombre": "Carmen Pérez",
            "Edad": "38",
            "Especialidad": "Ginecólogo",
            "Contrato": "TiempoCompleto",
            "Sueldo": 82000,
            "Moneda": "AUD"
          }
         
         
          // Agregar as datos de ser necesario
        ]
      });
      this.getView().setModel(oModel,'DoctorsReport');//se asigna el nombre despues del oModel
    },
    onNavBack: function() {
      this.getRouter().navTo('RouteLista');
    }, //end function

    handleRowClick: function(oEvent) {
      var demoToast = this.getView().byId("demoToast");
      demoToast.setText("Estas seleccionando un elemento de la tabla.");
      demoToast.show();
    },
    handleSelectionChange: function(oEvent) {
      var demoToast = this.getView().byId("demoToast");
      demoToast.setText("Event selectionChange fired.");
      demoToast.show();
    },//end function 

    onFilterDoctores:function(oEvent) {
			// build filter array
			const aFilter = [], sQuery = oEvent.getSource().getValue();
	
			if (sQuery) {
				aFilter.push(new Filter("Nombre", FilterOperator.Contains, sQuery));
			}

			// filter binding
			const oTable = this.getView().byId("idDoctorsTable");
			const oBinding = oTable.getBinding("items");
			oBinding.filter(aFilter);
		}//end function


    
  });
}); 
