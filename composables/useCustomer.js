import { appGlobal } from '~/composables/appGlobal';
import { useToast } from 'primevue/usetoast';

export function useCustomer() {

  const toast = useToast();

  // const object = ref({});
  // const array = ref([]);
  // const integer = ref(0);
  // const string = ref('');

  const { getRequestOptions, handleResponse, handleInstagramResponse, throwError } = useResponse();


  async function getWebCustomerLogin(email, password) {
    const url = appGlobal.apiBaseUrl + '/Customer/WebCustomerLogin/' + email + '/' + password;

    const customer = ref({});

    await fetch(url)
      .then(response => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, "Error in useCustomer.getWebCustomerLogin");
        }

        customer.value = data;
      })
      .catch(function (e) {
        throwError(500, e.message);
      }).finally(function () {

      })

    return customer.value;
  }


  async function putCustomerLogin(email, password) {

    appGlobal.isLoading = true; 
    
    let loginViewModel = {
      email: email,
      password: password
    }

    const url = appGlobal.apiBaseUrl + '/Customer/CustomerLogin';

    const options = getRequestOptions('PUT', false, loginViewModel);

    let customer = {};

    await fetch(url, options)
      .then(response =>  response.json().then(data => ({status: response.status, body: data})))
      .then(function(obj) {

        if (obj.status !== 200) {
          throwError(500, "Error in useCustomer.putCustomerLogin");
        } else {
          customer = obj.body;
        }
      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        appGlobal.isLoading = false;
      })

    return customer;
  }

  // async function getCustomer(customerCode) {
  //   const url = appGlobal.apiBaseUrl + '/Customer/' + customerCode;

  //   const customer = ref({});

  //   const options = {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json'}
  //   };

  //   await fetch(url, options)
  //     .then(response => response.json())
  //     .then(function (data) {
  //       if (!handleResponse(data)) {
  //         console.log(data);
  //         return;
  //       }

  //       customer.value = data;
  //     })
  //     .catch(function (e) {
  //       console.log(e);
  //     }).finally(function () {

  //     })

  //   return customer.value;
  // }



  async function getCustomer(customerCode) {

    const url = appGlobal.apiBaseUrl + '/Customer/' + customerCode;

    const customer = ref({});

    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}
    };

    await fetch(url, options)
      .then(response =>  response.json().then(data => ({status: response.status, body: data})))
      .then(function(obj) {

        if (obj.status !== 200) {
          throwError(500, "Error in useCustomer.getCustomer");
        } else {
          customer.value = obj.body;
        }
      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {

      })

      return customer.value;
  } 


  async function getReferralInformation(referralCode) {

    const url = appGlobal.apiBaseUrl + '/Customer/ReferralInformation/' + referralCode;

    let referralData = {};

    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}
    };

    await fetch(url, options)
      .then(response =>  response.json().then(data => ({status: response.status, body: data})))
      .then(function(obj) {

        if (obj.status !== 200) {
          throwError(500, "Error in useCustomer.getReferralInformation");
        } else {
          referralData = obj.body;
        }
      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {

      })

      return referralData;
  } 

  async function getCustomerFind(custFindParametersViewModel) {

    const url = appGlobal.apiBaseUrl + '/Customer/CustomerFind';

    let custFinds = [];

    const options = getRequestOptions('PUT', false, custFindParametersViewModel)

    await fetch(url, options)
      .then(response =>  response.json().then(data => ({status: response.status, body: data})))
      .then(function(obj) {

        if (obj.status !== 200) {
          throwError(500, "Error in useCustomer.getCustomerFind");
        } else {
          custFinds = obj.body.custFindViewModels;
          console.log(custFinds)
        }
      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {

      })

      return custFinds;
  } 


  async function putChangePassword(changePasswordViewModel) {
    appGlobal.loading = true;

    const url = appGlobal.apiBaseUrl + '/customer/ChangePassword';

    const options = getRequestOptions('PUT', false, changePasswordViewModel);

    let didUpdate = false;

    await fetch(url, options)
      .then(response =>  response.json().then(data => ({status: response.status, body: data})))
      .then(function(obj) {

        if (obj.status !== 200) {
          throwError(500, "Error in useCustomer.putChangePassword");
        } else {
          didUpdate = obj.body;
        }
      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {
        appGlobal.loading = false;
      })

      return didUpdate;
  }

    async function putTextUnsubscribe(custid) {
    appGlobal.loading = true;

    const url = appGlobal.apiBaseUrl + '/customer/TextUnsubscribe/' + custid;

    const options = getRequestOptions('PUT', false);

    let returnMessage= '';

    await fetch(url, options)
      .then(response =>  response.json().then(data => ({status: response.status, body: data})))
      .then(function(obj) {

        if (obj.status !== 200) {
          returnMessage = 'Oops, something went wrong in the unsubscribe process, call 614-538-5800 to resolve.'
        }
      })
      .catch(function (e) {
        returnMessage = 'Oops, something went wrong in the unsubscribe process, call 614-538-5800 to resolve.'
      })
      .finally(function () {
        appGlobal.loading = false;
      })

      return returnMessage;
  }

  async function getEmailExists(email) {

    const url = appGlobal.apiBaseUrl + '/Customer/EmailExists/' + email;

    let emailExists = false;

    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}
    };

    await fetch(url, options)
      .then(response =>  response.json().then(data => ({status: response.status, body: data})))
      .then(function(obj) {

        if (obj.status !== 200) {
          throwError(500, "Error in useCustomer.getEmailExists");
        } else {
          emailExists = obj.body.emailExists;
        }
      })
      .catch(function (e) {
        throwError(500, e.message);
      })
      .finally(function () {

      })

      return emailExists;
  } 

  return {
    putCustomerLogin,
    getWebCustomerLogin,
    getCustomer,
    getReferralInformation,
    getCustomerFind,
    putChangePassword,
    putTextUnsubscribe,
    getEmailExists
  }
}