
const { stripPhone } = useMiscFunctions();
const { handleResponse, throwError } = useResponse();


const accountGlobal = reactive({
    customerCode: '',
    mobilePhone: '',
    textCode: '',
    showVerify: false,
    verifySuccess: false,
    verifyErrorMessage: '',
    verifyStep: 'text',
    clearAccount() {
        accountGlobal.customerCode = '';
        accountGlobal.mobilePhone = '';
        accountGlobal.verifySuccess = false;
        accountGlobal.verifyErrorMessage ='';
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
      }
  }); 
  
  export { accountGlobal };