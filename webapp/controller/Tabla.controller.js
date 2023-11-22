sap.ui.define([
  "./BaseController",
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function(BaseController, Controller, JSONModel) {
  "use strict";

  return BaseController.extend("ns.project1.controller.Tabla", {

    onInit: function() {
      var oModel = new JSONModel({
        "DoctorsReport": [
          {
            "Name": "Doctor 1",
            "ProductId": "P001",
            "SupplierName": "Hospital A",
            "Width": 30,
            "Depth": 20,
            "Height": 180,
            "DimUnit": "cm",
            "WeightMeasure": 70,
            "WeightUnit": "kg",
            "Price": 100,
            "CurrencyCode": "USD"
          },
          {
            "Name": "Doctor 2",
            "ProductId": "P002",
            "SupplierName": "Clinic B",
            "Width": 25,
            "Depth": 18,
            "Height": 175,
            "DimUnit": "cm",
            "WeightMeasure": 65,
            "WeightUnit": "kg",
            "Price": 90,
            "CurrencyCode": "EUR"
          },
          {
            "Name": "Doctor 3",
            "ProductId": "P003",
            "SupplierName": "Medical Center C",
            "Width": 28,
            "Depth": 22,
            "Height": 185,
            "DimUnit": "cm",
            "WeightMeasure": 75,
            "WeightUnit": "kg",
            "Price": 110,
            "CurrencyCode": "GBP"
          },
          // Add more elements as needed
        ]
      });
      this.getView().setModel(oModel);
    },
    onNavBack: function() {
      this.getRouter().navTo('RouteLista');
    }, //end function

    handleRowClick: function(oEvent) {
      var demoToast = this.getView().byId("demoToast");
      demoToast.setText("Event rowClick fired.");
      demoToast.show();
    },
    handleSelectionChange: function(oEvent) {
      var demoToast = this.getView().byId("demoToast");
      demoToast.setText("Event selectionChange fired.");
      demoToast.show();
    }
  });
});
