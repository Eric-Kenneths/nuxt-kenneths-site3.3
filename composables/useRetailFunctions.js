import { appGlobal } from '~/composables/appGlobal';

export function useRetailFunctions() {

    const object = ref({});
    const array = ref([]);
    const integer = ref(0);
    const string = ref('');
    
    const { handleResponse, handleInstagramResponse, throwError } = useResponse();


    function getItemImage(urlRouteName) {
        if (urlRouteName !== undefined) {
            return 'https://kenneths.com/static/retail/items/' + urlRouteName + '.jpg';
        }
    }

    async function getItemWebSearchWord(search) {

        const url = appGlobal.apiBaseUrl + '/khsds/SearchWord/' + search;

        array.value = [];
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError("500", "Error in userRetailFunctions.getItemWebSearchWord");
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


      async function getItemWebForSearch(search) {
        const url = appGlobal.apiBaseUrl + '/khsds/ItemWeb/Search/' + search;
        
        object.value = {};
        
        await fetch(url)
          .then(response => response.json())
          .then(function (data) {
            if (!handleResponse(data)) { 
              throwError("500", "Error in userRetailFunctions.getItemWebForSearch");
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

    return {
        getItemImage,
        getItemWebSearchWord,
        getItemWebForSearch
    }
}