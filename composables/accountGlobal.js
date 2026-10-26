
const { stripPhone } = useMiscFunctions();
const { handleResponse, throwError } = useResponse();

const { encryptData,
  decryptData,
  generateKey,
  exportKey,
  importKey } = useMiscFunctions();


const accountGlobal = reactive({
    customerCode: '',
    customerName: '',
    mobilePhone: '',
    textCode: '',
    email: '',
    showVerify: false,
    showLogin: false,
    showForgotYourPassword: false,
    loginSuccessful: false,
    verifySuccess: false,
    verifyErrorMessage: '',
    verifyStep: 'text',
    apiClientKey: 'Qdasee934smU38dhjs4Z99dhal2shlan54Sei8K83L1oPQFEric',

    customer: {},

    hasCustomerViewModel: false,

    clearAccount() {
        accountGlobal.customerCode = '';
        accountGlobal.mobilePhone = '';
        accountGlobal.verifySuccess = false;
        accountGlobal.loginSuccessful = false;
        accountGlobal.verifyErrorMessage ='';
        accountGlobal.customer = {};
      },


      async sendVerificationText(cellPhone) {
        //validate phone number

        cellPhone = stripPhone(cellPhone);
        if (cellPhone.length !== 10) {
            accountGlobal.verifyErrorMessage = 'Not a valid phone number, must be 10 digits';
          return
        }

        accountGlobal.verifyErrorMessage = '';

        const url = appGlobal.apiBaseUrl + "/appointmentbook/SendVerificationCode/" + cellPhone;

        appGlobal.isLoading = true;

        const didSend = ref(false);
        didSend.value = false;

        let  options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
          };

        await fetch(url, options)
        .then(response => response.json())
        .then(function(data) {
            if (!handleResponse(data)) {
                accountGlobal.verifyErrorMessage = 'Oops, something went wrong' 
                didSend.value = false;
                appGlobal.isLoading = false;
                return 'Oops, something went wrong' 
            }
            
            didSend.value = data;

        })
        .catch(function(e) {
            accountGlobal.verifyErrorMessage = 'Oops, something went wrong sending text.';
        }).finally(function() {
            appGlobal.isLoading = false;
          
          if (didSend.value === false) {
            accountGlobal.verifyErrorMessage = 'Oops, something went wrong sending text.';
          } else {
            accountGlobal.verifyErrorMessage = '';
            accountGlobal.mobilePhone = cellPhone;
          }
        })      

        return didSend.value;

      },

      async emailVerificationText(email) {

        accountGlobal.verifyErrorMessage = '';

        const url = appGlobal.apiBaseUrl + "/appointmentbook/EmailVerificationCode/" + email;

        appGlobal.isLoading = true;

        const didSend = ref(false);
        didSend.value = false;

        let  options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
          };

        await fetch(url, options)
        .then(response => response.json())
        .then(function(data) {
            if (!handleResponse(data)) {
                accountGlobal.verifyErrorMessage = 'Oops, something went wrong' 
                didSend.value = false;
                appGlobal.isLoading = false;
                return 'Oops, something went wrong' 
            }
            
            didSend.value = data;

        })
        .catch(function(e) {
            accountGlobal.verifyErrorMessage = 'Oops, something went wrong sending text.';
        }).finally(function() {
            appGlobal.isLoading = false;
          
          if (didSend.value === false) {
            accountGlobal.verifyErrorMessage = 'Oops, something went wrong sending text.';
          } else {
            accountGlobal.verifyErrorMessage = '';
            accountGlobal.email = email;
          }
        })      

        return didSend.value;

      },

      async verify(verificationCode) {
        const url = appGlobal.apiBaseUrl + '/AppointmentBook/VerifyCode/' + verificationCode;

        appGlobal.isLoading = true;

        const didVerify = ref(false);
        didVerify.value = false;

        accountGlobal.verifySuccess = false;

        let status = 0;

        let  options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" }
          };


        await fetch(url, options)
        .then(response => response.json())
        .then(function (data) {
            if (!handleResponse(data)) { 
                accountGlobal.verifyErrorMessage = 'Oops, something went wrong' 
                didVerify.value = false;
                appGlobal.isLoading = false;
                return didVerify.value;
            }
        
            status = data;
            
        })
        .catch(function (e) {
            accountGlobal.verifyErrorMessage = 'Oops, something went wrong.';
        })
        .finally(function () { 
            accountGlobal.verifyErrorMessage = '';
            appGlobal.isLoading = false;

            if (status === 1) {
                accountGlobal.verifySuccess = true;
                didVerify.value = true;
              } else if (status === -1) {
                accountGlobal.verifyErrorMessage = '*Verfication code expired, try sending another code'
              } else if (status === 0) {
                accountGlobal.verifyErrorMessage = '*Verfication failed, please try again.'
              } else {
                accountGlobal.verifyErrorMessage = '*Verfication failed, please try again.'
              }
        })
        
        return didVerify.value;
      },

      async sendPasswordByEmail(email) {
        const url = appGlobal.apiBaseUrl + '/Account/SendPasswordByEmail/' + email;

        appGlobal.isLoading = true;

        var returnMessage = '';

        let  options = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          };


        await fetch(url, options)
        .then(response => response.json())
        .then(function (data) {
            if (!handleResponse(data)) { 
              returnMessage = 'Oops, something went wrong' ;
            } else {
              returnMessage = data.returnMessage;
            }
      
        })
        .catch(function (e) {
           returnMessage = 'Oops, something went wrong.';
        })
        .finally(function () { 
            appGlobal.isLoading = false;
        })
        
        return returnMessage;
      },

      async sendNewLoginInformation(sendNewLoginParametersViewModel) {
        const url = appGlobal.apiBaseUrl + '/Account/SendNewLoginInformation';

        appGlobal.isLoading = true;

        var returnMessage = '';

        let  options = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sendNewLoginParametersViewModel)
          };

        await fetch(url, options)
        .then(response =>  response.json().then(data => ({status: response.status, body: data})))
        .then(function(obj) {
          console.log(obj)
          if (obj.status !== 200) {
            returnMessage = obj.body.returnError;
          } else {
            returnMessage = obj.body.returnMessage;
          }
        })
        .catch(function (e) {
          returnMessage = 'Oop, something went wrong'
        })
        .finally(function () {
          appGlobal.isLoading = false;
        })
    
        
        return returnMessage;
      },

      async encrypt(dataToEncrypt) {

        const url = appGlobal.apiBaseUrl + '/Account/ClientKey/' + accountGlobal.apiClientKey;

        appGlobal.isLoading = true;

        let  options = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          };

        let keyAsString = '';

        await fetch(url, options)
        .then(response => response.json())
        .then(function (data) {
            if (!handleResponse(data)) { 
                accountGlobal.verifyErrorMessage = 'Oops, something went wrong' 
                didVerify.value = false;
                appGlobal.isLoading = false;
                return didVerify.value;
            }
        
            keyAsString = data.key;
        })
        .catch(function (e) {

        })
        .finally(function () { 

            appGlobal.isLoading = false;
        })
        
        let key = await importKey(keyAsString);
        let encrptedObject = await encryptData(dataToEncrypt, key)

        return encrptedObject;
      },

      async decrypt(dataToDecrypt, iv) {

        const url = appGlobal.apiBaseUrl + '/Account/ClientKey/' + accountGlobal.apiClientKey;

        appGlobal.isLoading = true;

        let  options = {
            method: "GET",
            headers: { "Content-Type": "application/json" }
          };

        let keyAsString = '';

        await fetch(url, options)
        .then(response => response.json())
        .then(function (data) {
            if (!handleResponse(data)) { 
                accountGlobal.verifyErrorMessage = 'Oops, something went wrong' 
                didVerify.value = false;
                appGlobal.isLoading = false;
                return didVerify.value;
            }
        
            keyAsString = data.key;
        })
        .catch(function (e) {

        })
        .finally(function () { 

            appGlobal.isLoading = false;
        })
        
        let key = await importKey(keyAsString);
        let decryptedData = await decryptData(dataToDecrypt, key, iv)

        return decryptedData;
      }


  }); 
  
  export { accountGlobal };