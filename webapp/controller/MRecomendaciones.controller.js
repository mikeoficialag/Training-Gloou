sap.ui.define([
  "./BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/library",//realmente esta libreria es importante para el uso del combobox
  "sap/m/MessageBox",
  "sap/ui/util/Storage",
],
function (BaseController, JSONModel, coreLibrary,MessageBox,Storage) {
  var ValueState = coreLibrary.ValueState;//esta variable es para el uso del combobox
  "use strict";
  var nameDoctor = '';

  return BaseController.extend("ns.project1.controller.MRecomendaciones", {
   oModel : null,
   oRModel:null,
  
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
      //get usuario

      //nuevo modelo-----------------------------------------------
      // Crear el modelo con la información de los doctores
 oRModel = new JSONModel({
  Doctores: [
  
  ]
});

// Asignar el modelo a la vista
this.setModel(oRModel, 'oRModel');
//igualamos el omodel del storage session al mio 
var storedDataString = sessionStorage.getItem('oRModel');
var storedData = storedDataString ? JSON.parse(storedDataString) : { Doctores: [] };
oRModel.setData(storedData);

console.log('Contenido del modelo:', this.getModel('oRModel').getData());



//fin del omodel de doctores recomendados
      
     
     

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
        this.nameDoctor = sValue;//asignar eñl nombre del doc a una variable
        console.log(this.nameDoctor)

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
                var  btnUser = that.getView().byId('btnUser');  
                btnUser.setText('');//quitar el usuario
                that.onInit();// Destruir manualmente la vista actual

                
                
                // Realiza la lógica para cerrar la sesión aquí
            } else {
                console.log("Usuario canceló cerrar sesión");
                // Realiza la lógica si el usuario cancela cerrar sesión
            }
        }
    });
   },//end function



   onPressSave: function () {
    var comentaryBox = this.getView().byId('comentaryBox'),
        comentaryBoxValue = comentaryBox.getValue();

    if (comentaryBoxValue === '') {
        console.log('el comentaryBox está vacío');
        MessageBox.error('No deje vacía la caja de comentarios');
        comentaryBox.setValueState('Error');
    } else {
        console.log(this.__getUser().nombre + ' Escribió... ' + comentaryBoxValue);
        comentaryBox.setValueState('None');
        comentaryBox.setValue('');

        // Recuperar datos existentes del almacenamiento local (sessionStorage)
        var storedDataString = sessionStorage.getItem('oRModel');
        var storedData = storedDataString ? JSON.parse(storedDataString) : { Doctores: [] };

        // Agregar nuevo elemento al array
        var newDoctor = {
            title: this.nameDoctor,
            recommendation: comentaryBoxValue,
            recommender: this.__getUser().nombre
        };

        // Agregar el nuevo doctor al array
        storedData.Doctores.push(newDoctor);

        // Almacenar el array actualizado en el almacenamiento local (sessionStorage)
        sessionStorage.setItem('oRModel', JSON.stringify(storedData));

        // Actualizar el modelo con el array de los doctores
        var oRModel = this.getModel('oRModel');
        oRModel.setProperty('/Doctores', storedData.Doctores);
    }
},






   textAreaChange(){
    var comentaryBox = this.getView().byId('comentaryBox');
    comentaryBox.setValueState('None');
   },//end function

   showUser:function(){
    var  btnUser = this.getView().byId('btnUser');  
    btnUser.setText(this.__getUser().nombre);
   },//end function
   openDialogView: function(){
    
			// create dialog lazily
			this.pDialog ??= this.loadFragment({
				name: "ns.project1.view.fragments.ViewList"
			});

			this.pDialog.then((oDialog) => oDialog.open());
     
            
		
   },//end function


   


  });
});
