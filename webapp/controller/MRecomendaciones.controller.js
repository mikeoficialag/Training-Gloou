sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/library",//realmente esta libreria es importante para el uso del combobox
  "sap/m/MessageBox"
],
function (BaseController, JSONModel, coreLibrary,MessageBox) {
  var ValueState = coreLibrary.ValueState;//esta variable es para el uso del combobox
  "use strict";

  return BaseController.extend("ns.project1.controller.MRecomendaciones", {
   oModel : null,
    onInit: function () {
      this.isUserActive()
     oModel = new JSONModel({
        Id: '180172220',
        Inspectores: [
          { Id: 'dc01', Name: 'Miguel Aguilar', Calle: 'Venustiano Carranza', CP: '36930',Ciudad: 'GDL',Hospital: 'Especialidades'},
          { Id: 'dc02', Name: 'Edy Castro', Calle: 'Benito Juarez',CP: '59300',Ciudad: 'MEXICO',Hospital: 'De penjamo' },
          { Id: 'dc03', Name: 'Ximena Garcia', Calle: 'Diablo place', CP: '23400',Ciudad: 'OAXACA',Hospital: 'San Angel'},
          { Id: 'dc04', Name: 'Juan Ramirez',Calle: 'Leona Vicario', CP: '36900',Ciudad: 'QUINTANARRO',Hospital: 'El unico'},
          { Id: 'dc05', Name: 'Miguel Torres', Calle: 'Josefa Ortiz De Dominguez', CP: '22500',Ciudad: 'MONTERREY',Hospital: 'Clinica Genoveva' }
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

      var oVBox = this.getView().byId("vboxBusqueda"),
      oVBoxForm = this.getView().byId("vboxFormulario");
      var oAsnModel = this.getModel('AsnModel');
      //parte para asignar a la label el elemento seleccionado del combobox
      
      var lblDoctorsName = this.getView().byId("lblDoctorsName"),
      lblDoctorsCalle = this.getView().byId('lblDoctorsCalle'),
      lblDoctorsCP = this.getView().byId('lblDoctorsCP'),
      lblDoctorsCiudad = this.getView().byId('lblDoctorsCiudad'),
      lblDoctorsHospital = this.getView().byId('lblDoctorsHospital');
      lblDoctorsName.setText(sValue);
     
      toolBarSave = this.getView().byId('toolBarSave');

      
  if (sSelectedKey && sValue ) {
    oComboBox.setValueState(ValueState.None);
    oAsnModel.setProperty('/isInspectorSelected', true);
    oVBox.setVisible(false);
    oVBoxForm.setVisible(true);//el formulario estara visible
    toolBarSave.setVisible(true);//hacer visible el boton de guardar

  } else if (!sSelectedKey && sValue) {
    oComboBox.setValueState(ValueState.Error);          
    oComboBox.setValueStateText('Favor de introducir un doctor válido');
    oAsnModel.setProperty('/isInspectorSelected', false);
    oVBox.setVisible(true);
    oVBoxForm.setVisible(false);//el formulario estara invisible
    toolBarSave.setVisible(false);
  } else {
    oComboBox.setValueState(ValueState.None);
    oAsnModel.setProperty('/isInspectorSelected', false);
    oVBox.setvisible(true);
    oVBoxForm.setVisible(false);//el formulario estara invisible
    toolBarSave.setVisible(false);
  }

  //fin de la parte de label relacionado con la seleccion del combobox
      //lista de inspectores
      //de esta manera hago el filtro del array de objetos filtrando por nombre
      var listInspectores = oModel.getProperty("/Inspectores");
      var InspectoresFilt = listInspectores.filter(function(inspector){
        return inspector.Name === sValue;
      });
   var hayCoincidencias = InspectoresFilt.length > 0;
      console.log(hayCoincidencias);
      if(InspectoresFilt){
        console.log(InspectoresFilt[0].CP);
        lblDoctorsCalle.setText(InspectoresFilt[0].Calle);
        lblDoctorsCP.setText(InspectoresFilt[0].CP);
        lblDoctorsCiudad.setText(InspectoresFilt[0].Ciudad);
        lblDoctorsHospital.setText(InspectoresFilt[0].Hospital);
      }
 
      //NOTA: se hace en la posicion 0  ya que el array de objetos solo tiene una posicion
      //fin de filtrado de lista de inspectores

    },//end function 
   onPressClear: function(){
   var comentaryBox = this.getView().byId('comentaryBox');
   comentaryBox.setValue("");
   },//end function

   onPressLogOut: function(){
    var that = this; //sirve para usar this con funciones anidadas
    MessageBox.confirm("¿Estás seguro de que quieres cerrar sesión?", {
        onClose: function(oAction) {
            if (oAction === MessageBox.Action.OK) {
                console.log("Usuario confirmó cerrar sesión");
                that.__setUser(false,that.__getUser().nombre);
                that.onInit();// Destruir manualmente la vista actual
                
                
                // Realiza la lógica para cerrar la sesión aquí
            } else {
                console.log("Usuario canceló cerrar sesión");
                // Realiza la lógica si el usuario cancela cerrar sesión
            }
        }
    });
   },//end function

  });
});
