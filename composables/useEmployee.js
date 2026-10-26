import { appGlobal } from '~/composables/appGlobal';
import { useToast } from 'primevue/usetoast';

export function useEmployee() {

   const toast = useToast();

    const object = ref({});
    const array = ref([]);
    const integer = ref(0);
    const string = ref('');

    const { getRequestOptions, handleResponse, handleInstagramResponse } = useResponse();

    async function getSocialMediaToken() {
        const url = appGlobal.apiBaseUrl + '/employees/SocialMedia/GetToken/177000/1'

        object.value = {};

        await fetch(url)
        .then(response => response.json())
        .then(function (data) {
          if (!handleResponse(data)) {
            throwError(500, "Error in useEmployee.getSocialMediaToken");
          }
    
          object.value = data.listByEmployeeAndMediaTypeViewModel[0];
    
        })
        .catch(function (e) {
          throwError(500, e.message);
        }).finally(function () {

        })
    
        return object.value;
      }

      async function getPhotos(userId, token) {
        const url = 'https://graph.instagram.com/' + userId + '/media?fields=id,media_url,media_type,caption&limit=6&access_token=' + token;
    
        const posts = [];
    
        await fetch(url)
        .then(response => response.json())
        .then(function (returnData) {
          if (!handleInstagramResponse(returnData)) {  //use this for instagram api call
            posts.value = [];
            return;
          }
          posts.value = returnData.data;
        })
        .catch(function (e) {
          throwError(500, e.message);
        }).finally(function() {              
        })
    
        return posts.value;          
      }

      async function getEmployeesByLocationWithSocialMedia(locationCode) {
        const url = appGlobal.apiBaseUrl + '/employees/SocialMedia/ForWeb/' + locationCode;
    
        array.value = [];
    
        await fetch(url)
        .then(response => response.json())
        .then(function (data) {
          if (!handleResponse(data)) {
            throwError(500, "Error in useEmployee.getEmployeesByLocationWithSocialMedia");
          }
    
          array.value = data.listSocialMediaByLocationForWebViewModels;
        })
        .catch(function (e) {
          throwError(500, e.message);
        }).finally(function() {              
    
        })  
    
        return array.value;          
      }

      async function getEmployeeSettingsByGroupAndItem(group, item) {
        const url = appGlobal.apiBaseUrl + '/employees/EmployeeSettings/' + group + '/' + item;

        array.value = [];
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) {
              throwError(500, "Error in useEmployee.getEmployeeSettingsByGroupAndItem");
            }
            
            array.value = data.employeeSettingViewModels;
          })
          .catch(function (e) {
            throwError(500, e.message);
          }).finally(function () {
          })
    
        return array;
      }

      async function getEmployeeName(employeeCode) {
        appGlobal.loading = true;
        
        const url = appGlobal.apiBaseUrl + '/Employees/EmployeeName/' + employeeCode;
        
        const options = getRequestOptions('GET', true);
    
        var employeeName = "";
    
        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {
  
            if (obj.status !== 200) {
              throwError(500, "Errror in useEmployee.getEmployeeName");
            } else {
              employeeName = obj.body.employeeName;
            }
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.loading = false;
          })
    
          return employeeName;
      } 
    
      return {
        getSocialMediaToken,
        getPhotos,
        getEmployeesByLocationWithSocialMedia,
        getEmployeeSettingsByGroupAndItem,
        getEmployeeName
      }
}