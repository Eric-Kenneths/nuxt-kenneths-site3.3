import { appGlobal } from '~/composables/appGlobal';
import { useToast } from 'primevue/usetoast';

export function useAppointmentBook() {

  const { getRequestOptions, handleResponse, throwError } = useResponse();

  const toast = useToast();

  async function putCancelAppointment(cancelAppointmentParameters) {
    appGlobal.loading = true;

    const url = appGlobal.apiBaseUrl + '/AppointmentBook/CancelAppointment';

    const options = getRequestOptions('PUT', false, cancelAppointmentParameters);

    let didCancel = false;

    await fetch(url, options)
      .then(response => response.json().then(data => ({ status: response.status, body: data })))
      .then(function (obj) {

        if (obj.status !== 200) {
          throwError(500, "Error in useAppointmentBook.putCancelAppointment");
        } else {
          let returnMessage = obj.body;
          if (returnMessage === 'Appointment Canceled') {
            //toast.add({severity: 'success', summary: 'Message', detail: returnMessage, life: 3000});
            didCancel = true;
          } else {
            toast.add({ severity: 'warn', summary: 'Oops', detail: returnMessage });
          }
        }
      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        appGlobal.loading = false;
      })

    return didCancel;
  }


  async function getModelAppointmentTypes() {
    appGlobal.loading = true;

    const url = appGlobal.apiBaseUrl + '/AppointmentBook/ModelAppointmentTypes';

    const options = getRequestOptions('GET', true);

    var modelAppointments = [];

    await fetch(url, options)
      .then(response => response.json().then(data => ({ status: response.status, body: data })))
      .then(function (obj) {

        if (obj.status !== 200) {
          throwError(500, "Error in useAppointmentBook.getModelAppointmentTypes");
        } else {
          modelAppointments = obj.body;
        }
      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        appGlobal.loading = false;
      })

    return modelAppointments;
  }

  async function getModelAppointmentByServiceType(serviceCode) {
    appGlobal.loading = true;

    const url = appGlobal.apiBaseUrl + '/AppointmentBook/ModelAppointmentByServiceType/' + serviceCode;

    const options = getRequestOptions('GET', true);

    var modelLevel = {};

    await fetch(url, options)
      .then(response => response.json().then(data => ({ status: response.status, body: data })))
      .then(function (obj) {

        if (obj.status !== 200) {
          throwError(500, "Error in useAppointmentBook.getModelAppointmentByServiceType");
        } else {
          modelLevel = obj.body;
        }
      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        appGlobal.loading = false;
      })

    return modelLevel;
  }

  async function getLastApointmentDetail(customerCode) {
    appGlobal.loading = true;

    const url = appGlobal.apiBaseUrl + '/AppointmentBook/LastApointmentDetail/' + customerCode;

    const options = getRequestOptions('GET', false);

    var appointmentDetails = '';

    await fetch(url, options)
      .then(response => response.json().then(data => ({ status: response.status, body: data })))
      .then(function (obj) {

        if (obj.status !== 200) {
          throwError(500, "Error in useAppointmentBook.getLastApointmentDetail");
        } else {
          appointmentDetails = obj.body.appointmentDetails;
        }
      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        appGlobal.loading = false;
      })

    return appointmentDetails;
  }


  async function putDaysThatTechsHaveOpenings(dailyOpeningsParameters) {
    appGlobal.loading = true;

    const url = appGlobal.apiBaseUrl + '/AppointmentBook/DaysThatTechsHaveOpenings';

    const options = getRequestOptions('PUT', false, dailyOpeningsParameters);

    let techDays = [];

    await fetch(url, options)
      .then(response => response.json().then(data => ({ status: response.status, body: data })))
      .then(function (obj) {

        if (obj.status !== 200) {
          throwError(500, "Error in useAppointmentBook.putDaysThatTechsHaveOpenings");
        } else {
          techDays = obj.body.techDaysViewModels;
        }
      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        appGlobal.loading = false;
      })

    return techDays;
  }

  async function getAppointmentsToCancelBeforeBooking(customerCode, appointmentDate, services) {
    appGlobal.loading = true;

    const url = appGlobal.apiBaseUrl + '/AppointmentBook/AppointmentsToCancelBeforeBooking/' + customerCode + '/' + appointmentDate + '/' + services;

    const options = getRequestOptions('GET', false);

    let appointments = [];

    await fetch(url, options)
      .then(response => response.json().then(data => ({ status: response.status, body: data })))
      .then(function (obj) {

        if (obj.status !== 200) {
          throwError(500, "Error in useAppointmentBook.getAppointmentsToCancelBeforeBooking");
        } else {
          appointments = obj.body;
        }
      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        appGlobal.loading = false;
      })

    return appointments;
  }

  return {
    getModelAppointmentTypes,
    putCancelAppointment,
    getModelAppointmentByServiceType,
    getLastApointmentDetail,
    putDaysThatTechsHaveOpenings,
    getAppointmentsToCancelBeforeBooking
  }



}