import { appGlobal } from '~/composables/appGlobal';

export function useSurveyFactory() {
    const { getRequestOptions, handleResponse, throwError } = useResponse();


    async function getKenSurveyLinks(customerCode, forCheckIn) {
        const url = appGlobal.apiBaseUrl + '/Survey/KenSurveyLinks/' + customerCode + '/' + forCheckIn;
        
        const kenSurveyLinks = ref([]);

        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError("500", "Error in userSurveyFactory.getKenSurveyLinks");
            }
            kenSurveyLinks.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return kenSurveyLinks.value;
      }


      async function getQuizBookingInfo(matchCode) {
        appGlobal.loading = true;
        
        const url = appGlobal.apiBaseUrl + '/Survey/QuizBookingInfo/' + matchCode;
        
        const options = getRequestOptions('GET', false);
    
        var quizData = {};
    
        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {
  
            if (obj.status !== 200) {
              throwError(obj.status, obj.body.errorMessage);
            } else {
              quizData = obj.body;
            }
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.loading = false;
          })
    
          return quizData;
      } 

      async function putUpdateQuizBooking(matchInfoViewModel) {
        appGlobal.loading = true;
        
        const url = appGlobal.apiBaseUrl + '/Survey/UpdateQuizBooking';

        console.log(matchInfoViewModel)
        
        const options = getRequestOptions('PUT', false, matchInfoViewModel);
    
        console.log(options);
        var returnData = {
          customerCode: ''
        };
    
        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {
  
            if (obj.status !== 200) {
              throwError(obj.status, obj.body.errorMessage);
            } else {
              returnData.customerCode = obj.body.newCustomerCode;
            }
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.loading = false;
          })
    
          return returnData;
      } 

      async function putQuizTrack(trackingId, value) {
        // if (appGlobal.isDevMode) { //don't track while in development
        //   return
        // }

        if (trackingId === '0') {
          return;
        }
    
        appGlobal.loading = true;
    
        const url = appGlobal.apiBaseUrl + "/Survey/1/track/" + trackingId + "/" + value;
    
        const options = getRequestOptions('PUT', false);
    
        await fetch(url, options)
        .then(response => response.json())
        .then(function (data) {
          if (!handleResponse(data)) {
            return;
          }
          
        })
        .catch(function (e) {
          return 
        })
        .finally(function () {
          appGlobal.loading = false;
        })
    
        return;
      }

    return {
        getKenSurveyLinks,
        getQuizBookingInfo,
        putUpdateQuizBooking,
        putQuizTrack
    }
}