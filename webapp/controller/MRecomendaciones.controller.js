sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/library",//realmente esta libreria es importante para el uso del combobox
],
function (BaseController, JSONModel, coreLibrary) {
  var ValueState = coreLibrary.ValueState;//esta variable es para el uso del combobox
  "use strict";

  return BaseController.extend("ns.project1.controller.MRecomendaciones", {
    onInit: function () {
      var oModel = new JSONModel({
        Id: '180172220',
        Inspectores: [
          { Id: 'dc01', Name: 'Miguel Aguilar' },
          { Id: 'dc02', Name: 'Edy Castro' },
          { Id: 'dc03', Name: 'Ximena Garcia' },
          { Id: 'dc04', Name: 'Juan Ramirez' },
          { Id: 'dc05', Name: 'Miguel Torres' }
        ],
        Materiales: null,
        IsInspectorSelected: false,
        searchFilter: "",
        selectedDoctor: {}
      });

      this.setModel(oModel, 'AsnModel');
    },

    handleChangeInspector: function (oEvent) {
      // Tu lógica de manejo de cambios en el ComboBox
      var oComboBox = oEvent.getSource(),
      sSelectedKey = oComboBox.getSelectedKey(),
      sValue = oComboBox.getValue();
      var oVBox = this.getView().byId("vboxBusqueda");
      
  
  var oAsnModel = this.getModel('AsnModel');

  if (sSelectedKey && sValue) {
    oComboBox.setValueState(ValueState.None);
    oAsnModel.setProperty('/isInspectorSelected', true);
    oVBox.setVisible(false);

  } else if (!sSelectedKey && sValue) {
    oComboBox.setValueState(ValueState.Error);          
    oComboBox.setValueStateText('Favor de introducir un doctor válido');
    oAsnModel.setProperty('/isInspectorSelected', false);
    oVBox.setVisible(true);
  } else {
    oComboBox.setValueState(ValueState.None);
    oAsnModel.setProperty('/isInspectorSelected', false);
    oVBox.setvisible(true);
  }
    }
  });
});
