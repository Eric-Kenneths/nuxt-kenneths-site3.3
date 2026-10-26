import { dataGlobal } from '~/composables/dataGlobal';
import { appGlobal } from '~/composables/appGlobal';
//import { useToast } from 'primevue/usetoast';

export function useKhsds() {

    //const toast = useToast();

    const object = ref({});
    const array = ref([]);
    const integer = ref(0);
    const string = ref('');

    const { getRequestOptions, handleResponse, throwError } = useResponse();
   

    async function getWebBookServices(app, sex, serviceFilter, department, technicianCode, locationCode) {
      const url = appGlobal.apiBaseUrl + '/khsds/WebBookServices/' + app + '/' + sex + '/' + serviceFilter + '/' + department + '/' + technicianCode + '/' + locationCode;
  
      array.value = [];
  
      await fetch(url)
        .then(response => response.json())
        .then(function (data) {
          if (!handleResponse(data)) {
            throwError(500, "Error in useKhsds.getWebBookServices");
          }
  
          array.value = data;
        })
        .catch(function (e) {
          throwError(500, e.message);
        })
        .finally(function () {
          //Maybe do something
        })
  
      return array.value;
    }

    async function getLocationListLite(hasSpa, showOffice) {
        const url = appGlobal.apiBaseUrl + '/khsds/LocationList/' + hasSpa + '/' + showOffice;
    
        array.value = [];
    
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) {
              throwError(500, "Error in useKhsds.getLocationListLite");
            }
    
            array.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            //Maybe do something
          })
    
        return array.value;
      }
    
      async function getServiceHeaders() {
        const url = appGlobal.apiBaseUrl + '/khsds/Services/HeadersForWebMenu';
    
        array.value = [];
    
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) {
              throwError(500, "Error in useKhsds.getServiceHeaders");
            }
    
            array.value = data;
    
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            //Maybe do something
          })
    
        return array.value;
      }
    
      async function getServiceDetails(headerId) {
        const url = appGlobal.apiBaseUrl + '/khsds/Services/DetailsForWebMenu/' + headerId;
    
        array.value = [];
    
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) {
              throwError(500, "Error in useKhsds.getServiceDetails");
            }
    
            array.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            //Maybe do something
          })
    
        return array.value;
      }
    
      async function getServicesGlobal() {
        const url = appGlobal.apiBaseUrl + '/khsds/WebSiteServices';
    
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) {
              throwError(500, "Error in useKhsds.getServicesGlobal");
            }
    
            dataGlobal.services.serviceList = data.servicesForWebSiteViewModels;
            dataGlobal.services.lastPullDateTime = data.lastPullDateTime;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            //Maybe do something
          })
          
        return;
      }
    
      async function getGoodForsByDepartment(department) {
        const url = appGlobal.apiBaseUrl + '/khsds/Services/GoodFor/' + department;
    
        array.value = [];
    
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getGoodForsByDepartment");
            }
    
            array.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            //Maybe do something
          })
          
        return array.value;
      }
    
      async function getItemWebListForWeb(itemWebGroupId, customerId, technicianId) {
        const url = appGlobal.apiBaseUrl + '/khsds/ItemWeb/ListForWeb/' + itemWebGroupId + '/' + customerId + '/' + technicianId;
        
        object.value = {};
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getItemWebListForWeb");
            }
    
            object.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return object.value;
      }
    
      async function getBlogHeaders() {
        const url = appGlobal.apiBaseUrl + '/khsds/Blog/ListHeaders';
        
        array.value = [];
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getBlogHeaders");
            }
            array.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return array.value;
      }
    
      async function getBlogDetailsByHeaderId(blogHeaderId) {
        const url = appGlobal.apiBaseUrl + '/khsds/Blog/GetDetails/' + blogHeaderId;
        
        object.value = {};
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getBlogDetailsByHeaderId");
            }
            object.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return object.value;
      }
    
      async function postMarketingClickThru(webMarketingHdId, customerCode, email) {
        const url = appGlobal.apiBaseUrl + '/khsds/MarketingClickThru';
    
        const marketingClickThruViewModel = {
          webMarketingHdId: webMarketingHdId,
          customerCode: customerCode,
          email: email
        }
    
        integer.value = 0;
    
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(marketingClickThruViewModel)
        };
        
        await fetch(url, options)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) {
              return 0;
            }
            
            integer.value = data.webMarketingDtId;
          })
          .catch(function (e) {

          }).finally(function () {
    
          })
    
        return integer;
      }
    
      async function putMarketingConversion(webMarketingDtId, miscId, app) {
        const url = appGlobal.apiBaseUrl + '/khsds/MarketingConversion';
    
        const marketingConversionViewModel = {
          webMarketingDtId: webMarketingDtId,
          miscId: miscId,
          app: app
        }
    
        integer.value = 0;
    
        const options = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(marketingConversionViewModel)
        };
        
        await fetch(url, options)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) {
              throwError(500, "Error in useKhsds.putMarketingConversion");
            }
            
          })
          .catch(function (e) {
            throwError(500, e.message);
          }).finally(function () {
    
          })
      }
    
      async function getItemWebById(itemWebId) {
        const url = appGlobal.apiBaseUrl + '/khsds/ItemWeb/GetByItemWebForWebRetail/' + itemWebId;
        
        object.value = {};
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getItemWebById");
            }
    
            object.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return object.value;
      }
    
      async function postWebRetailSession() {
        const url = appGlobal.apiBaseUrl + '/khsds/WebRetailSession';
      
        object.value = {};
      
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        };
        
        await fetch(url, options)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) {
              throwError(500, "Error in useKhsds.postWebRetailSession");
            }
    
            object.value = data.newWebRetailSession;
          })
          .catch(function (e) {
            throwError(500, e.message);
          }).finally(function () {
      
          })
      
        return object.value;
      }
    
      async function getWebRetailSessionById(webRetailSessionId) {
        const url = appGlobal.apiBaseUrl + '/khsds/WebRetailSession/WebRetailSessionId/' + webRetailSessionId;
        
        object.value = {};
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getWebRetailSessionById");
            }
      
            object.value = data.webRetailSession;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return object.value;
      }
    
      async function getWebRetailSessionByCustomerId(customerId) {
        const url = appGlobal.apiBaseUrl + '/khsds/WebRetailSession/CustomerId/' + customerId;
        
        object.value = {};
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getWebRetailSessionByCustomerId");
            }
        
            object.value = data.webRetailSession;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return object.value;
      }
    
      async function putWebRetailSession(webRetailSession) {
        const url = appGlobal.apiBaseUrl + '/khsds/WebRetailSession';
        
        object.value = {};
        
        const options = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(webRetailSession)
        };
        
        await fetch(url, options)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) {
              throwError(500, "Error in useKhsds.putWebRetailSession");
            }
            
            object.value = data.webRetailSession;
          })
          .catch(function (e) {
            throwError(500, e.message);
          }).finally(function () {
        
          })
        
        return object.value;
      }
    
      async function getTablesByCategoryType(categoryType) {
        const url = appGlobal.apiBaseUrl + '/khsds/Tables/' + categoryType;
        
        array.value = [];
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getTablesByCategoryType");
            }
        
            array.value = data.tables;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return array.value;
      }
    
      async function getItemWebSearchWord(search) {
        const url = appGlobal.apiBaseUrl + '/khsds/SearchWord/' + search;
        
        array.value = [];
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getItemWebSearchWord");
            }
        
            array.value = data.itemWebs;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return array.value;
      }
    
      async function getLocationByLocationCode(locationCode) {
        const url = appGlobal.apiBaseUrl + '/khsds/Location/' + locationCode;
        
        object.value = {};
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getLocationByLocationCode");
            }
        
            object.value = data.location;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return object.value;
      }
    
      async function getTechniciansForWebRetailLink(locationCode, hairOrSpa) {
        const url = appGlobal.apiBaseUrl + '/khsds/WebRetailTechnicians/' + locationCode + '/' + hairOrSpa;
      
        array.value = [];
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getTechniciansForWebRetailLink");
            }
    
            array.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return array.value;
      }

      async function getTechnicianLiteById(technicianId) {
        const url = appGlobal.apiBaseUrl + '/khsds/TechnicianLiteById/' + technicianId;
      
        const technician = ref({});
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getTechnicianLiteById");
            }
    
            technician.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return technician.value;
      }

      async function getTechnicianLiteByTechnicianCode(technicianCode) {
        const url = appGlobal.apiBaseUrl + '/khsds/Technician/' + technicianCode;
      
        const technician = ref({});
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getTechnicianLiteByTechnicianCode");
            }
    
            technician.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return technician.value;
      }
    
      async function getServiceGuidePropertiesByServiceMenuRouteName(routeName) {
        const url = appGlobal.apiBaseUrl + '/khsds/ServiceGuide/' + routeName;
        
        object.value = {};
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getServiceGuidePropertiesByServiceMenuRouteName");
            }
    
            object.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return object.value;
      }
    
      async function getTechniciansOtherLocationByBaseLocationCode(baseLocationCode) {
        const url = appGlobal.apiBaseUrl + '/khsds/TechniciansOtherLocation/' + baseLocationCode;
        
        array.value = [];
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getTechniciansOtherLocationByBaseLocationCode");
            }
            array.value = data.techniciansOtherLocationViewModels;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return array.value;
      }
    
      async function getLocationByLocationName(locationName) {
        const url = appGlobal.apiBaseUrl + '/khsds/Location/Name/' + locationName;
        
        object.value = {};
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getLocationByLocationName");
            }
            object.value = data.location;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return object.value;
      }
    
      async function getItemWebGroupIdByDescription(description) {
        const url = appGlobal.apiBaseUrl + '/khsds/ItemWebGroup/Description/' + description;
        
        integer.value = 0;
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getItemWebGroupIdByDescription");
            }
    
            integer.value = data.itemWebGroupId;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return integer.value;
      }
    
      async function getItemWebGroupById(groupId) {
        const url = appGlobal.apiBaseUrl + '/khsds/ItemWebGroup/GroupId/' + groupId;
        
        object.value = {};
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getItemWebGroupById");
            }
    
            object.value = data.itemWebGroup;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return object.value;
      }
    
      async function getItemWebByWebName(webName) {
        const url = appGlobal.apiBaseUrl + '/khsds/ItemWeb/WebName/' + webName;
        
        object.value = {};
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            //console.log(data)
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getItemWebByWebName");
            }
            object.value = data.itemWeb;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return object.value;
      }
    
      async function getBlogDetailByRouteName(routeName) {
        const url = appGlobal.apiBaseUrl + '/khsds/BlogDetail/RouteName/' + routeName;
        
        object.value = {};
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getBlogDetailByRouteName");
            }
            object.value = data.blogDetail;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return object.value;
      }
    
      async function getItemWebForSearch(search) {
        const url = appGlobal.apiBaseUrl + '/khsds/ItemWeb/Search/' + search;
        
        object.value = {};
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getItemWebForSearch");
            }
    
            object.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return object.value;
      }
    
      async function getActiveServiceMenuDetails() {
        const url = appGlobal.apiBaseUrl + '/khsds/ServiceMenuDetail/ListAllActive';
        
        array.value = [];
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getActiveServiceMenuDetails");
            }
    
            array.value = data.serviceMenuDetails;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return array.value;
      }
    
      async function getItemWebGroupForWeb() {
        const url = appGlobal.apiBaseUrl + '/khsds/ItemWebGroup/ListAllForWeb';
        
        array.value = [];
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getItemWebGroupForWeb");
            }
            array.value = data.itemWebGroups;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return array.value;
      }
    
      async function getItemWebForSiteMap() {
        const url = appGlobal.apiBaseUrl + '/khsds/ItemWeb/SiteMap';
        
        array.value = [];
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getItemWebForSiteMap");
            }
            array.value = data.listItemWebForSiteMapViewModels;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return array.value;
      }
    
      async function getTechnicianLiteForWebRetail(technicianCode) {
        const url = appGlobal.apiBaseUrl + '/khsds/Technician/' + technicianCode;
        
        const technician = {};
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getTechnicianLiteForWebRetail");
            }
    
            technician.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return technician.value;
      }
    
      async function getLocationSalons() {
        appGlobal.isLoading = true;

        const url = appGlobal.apiBaseUrl + '/khsds/Locations?ab=false&ao=false' ;

        const options = getRequestOptions('GET', false);

        let locations = [];

        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {

            if (obj.status !== 200) {
              throwError(obj.status, 'Oops...something went wrong in getLocationList');
            } else {
              locations = obj.body;
            }
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.isLoading = false;
          })

          return locations;
      }

      async function getLocationsThatCanDoService(services, appType, showAcademy, showAll) {
        const url = appGlobal.apiBaseUrl + '/khsds/LocationsThatCanDoService/' + services + '/' + appType + '/' + showAcademy + '/' + showAll;
        
        array.value = [];
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getLocationsThatCanDoService");
            }
            array.value = data.locationsThatCanDoServiceViewModels;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return array.value;
      }

      async function getLocationsThatCanDoServiceByLevel(services, level, fromChairDate, showAcademy, showAll) {
        const url = appGlobal.apiBaseUrl + '/khsds/LocationsThatCanDoServiceByLevel/' + services + '/' + level + '/' + fromChairDate + '/' + showAcademy + '/' + showAll;
        
        array.value = [];
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getLocationsThatCanDoServiceByLevel");
            }
            array.value = data.locationsThatCanDoServiceViewModels;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return array.value;
      }




      async function getServiceDescriptionNoPrice(services) {
        const url = appGlobal.apiBaseUrl + '/khsds/ServicesDescriptionNoPrice/' + services;
        
        string.value = '';
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getServiceDescriptionNoPrice");
            }
            string.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return string.value;
      }

      async function getStylistLevels(locationCode) {
        const url = appGlobal.apiBaseUrl + '/khsds/stylistlevels/' + locationCode;
        
        array.value = [];
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getStylistLevels");
            }
            array.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return array.value;
      }

      async function getMarketingSources(applicationTypeId) {
        const url = appGlobal.apiBaseUrl + '/khsds/MarketingSources/' + applicationTypeId;
        
        const marketingSources = ref([]);

        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError(500, "Error in useKhsds.getMarketingSources");
            }
            marketingSources.value = data;
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () { 
            //Maybe do something
          })
          
        return marketingSources.value;
      }


      async function getGeoStackPage(pointOfInterestRoute) {
        appGlobal.loading = true;
        
        const url = appGlobal.apiBaseUrl + '/Khsds/GeoStackPage/' + pointOfInterestRoute;
        
        const options = getRequestOptions('GET', true);
    
        var geoStackPage = {};
    
        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {
  
            if (obj.status !== 200) {
              throwError(500, "Error in useKhsds.getGeoStackPage");
            } else {
              geoStackPage = obj.body.geoStackPageViewModel;
            }
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.loading = false;
          })
    
          return geoStackPage;
      } 

      async function getGeoStackPagesForPublish() {
        appGlobal.loading = true;
        
        const url = appGlobal.apiBaseUrl + '/Khsds/GeoStackPagesForPublish';
        
        const options = getRequestOptions('GET', true);
    
        var geoStackPages = [];
    
        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {
  
            if (obj.status !== 200) {
              throwError(500, "Error in useKhsds.getGeoStackPagesForPublish");
            } else {
              geoStackPages = obj.body.geoStackPageViewModels;
            }
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.loading = false;
          })
    
          return geoStackPages;
      } 

      async function getSupportingStackPageForPublish() {
        appGlobal.loading = true;
        
        const url = appGlobal.apiBaseUrl + '/Khsds/SupportingStackPagesForPublish';
        
        const options = getRequestOptions('GET', false);
    
        var supportingStackPages = [];
    
        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {
  
            if (obj.status !== 200) {
              throwError(500, "Error in useKhsds.getSupportingStackPageForPublish");
            } else {
              supportingStackPages = obj.body.supportingStackPages;
            }
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.loading = false;
          })
    
          return supportingStackPages;
      } 

      async function getCodeDescriptions(technicianCode, locationCode, serviceCode) {
        appGlobal.loading = true;
        
        const url = appGlobal.apiBaseUrl + '/Khsds/CodeDescriptions/' + technicianCode + '/' + locationCode + '/' + serviceCode;
        
        const options = getRequestOptions('GET', false);
    
        var codeDescription = {};
    
        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {
  
            if (obj.status !== 200) {
              throwError(500, "Error in useKhsds.getCodeDescriptions");
            } else {
              codeDescription = obj.body;
            }
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.loading = false;
          })
    
          return codeDescription;
      } 

      async function getCustomerCoupon(customerCouponId) {
        appGlobal.loading = true;
        
        const url = appGlobal.apiBaseUrl + '/Khsds/CustomerCoupon/' + customerCouponId;
        
        const options = getRequestOptions('GET', false);
    
        var customerCoupon = {};
    
        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {
  
            if (obj.status !== 200) {
              throwError(500, "Error in useKhsds.getCustomerCoupon");
            } else {
              customerCoupon = obj.body.customerCouponViewModel;
            }
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.loading = false;
          })
    
          return customerCoupon;
      } 

      async function getTechnicianName(technicianCode) {
        appGlobal.loading = true;
        
        const url = appGlobal.apiBaseUrl + '/Khsds/TechnicianName/' + technicianCode;
        
        const options = getRequestOptions('GET', false);
    
        var technicianName = '';
    
        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {
  
            if (obj.status !== 200) {
              throwError(obj.status, obj.body.errorMessage);
            } else {
              technicianName = obj.body;
            }
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.loading = false;
          })
    
          return technicianName;
      } 

      async function getServiceDescriptionNoPrice(serviceCodes) {
        appGlobal.loading = true;
        
        const url = appGlobal.apiBaseUrl + '/Khsds/ServicesDescriptionNoPrice/' + serviceCodes;
        
        const options = getRequestOptions('GET', false);
    
        var serviceDescriptions = '';
    
        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {
  
            if (obj.status !== 200) {
              throwError(obj.status, obj.body.errorMessage);
            } else {
              serviceDescriptions = obj.body;
            }
          })
          .catch(function (e) {
            throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.loading = false;
          })
    
          return serviceDescriptions;
      } 

//throwError(obj.status, obj.body.errorMessage);
// throwError(500, e.message);
      return {
        getWebBookServices,
        getLocationListLite,
        getServiceHeaders,
        getServiceDetails,
        getServicesGlobal,
        getGoodForsByDepartment,
        getItemWebListForWeb,
        getBlogHeaders,
        getBlogDetailsByHeaderId,
        postMarketingClickThru,
        getItemWebById,
        postWebRetailSession,
        putMarketingConversion,
        getWebRetailSessionById,
        getWebRetailSessionByCustomerId,
        putWebRetailSession,
        getTablesByCategoryType,
        getItemWebSearchWord,
        getLocationByLocationCode,
        getTechniciansForWebRetailLink,
        getTechnicianLiteByTechnicianCode,
        getTechnicianLiteById,
        getServiceGuidePropertiesByServiceMenuRouteName,
        getTechniciansOtherLocationByBaseLocationCode,
        getLocationByLocationName,
        getItemWebGroupIdByDescription,
        getItemWebGroupById,
        getItemWebByWebName,
        getBlogDetailByRouteName,
        getItemWebForSearch,
        getActiveServiceMenuDetails,
        getItemWebGroupForWeb,
        getItemWebForSiteMap,
        getTechnicianLiteForWebRetail,
        getLocationSalons,
        getLocationsThatCanDoService,
        getLocationsThatCanDoServiceByLevel,
        getServiceDescriptionNoPrice,
        getStylistLevels,
        getMarketingSources,
        getGeoStackPage,
        getGeoStackPagesForPublish,
        getSupportingStackPageForPublish,
        getCodeDescriptions,
        getCustomerCoupon,
        getTechnicianName
      }
}