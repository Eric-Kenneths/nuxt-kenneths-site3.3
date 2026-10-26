export function useResponse() {

     function handleResponse(response) {    
        var noResponseError = true;
      
        const data = JSON.stringify(response);
      
        JSON.parse(data, (key, value) => {
          if (key === 'status' && value === 'error') {
            var description = JSON.parse(data).description;
            var title = JSON.parse(data).title;
            
            noResponseError = false;
      
            //Put a fancier alert here and/or redirect to oops page
          }
        });
        
        return noResponseError;    
      }
      
       function handleInstagramResponse(iResponse) {
        var noResponseError = true;
      
        const data = JSON.stringify(iResponse);
        JSON.parse(data, (key) => {
          if (key === 'error') {
            noResponseError = false;
          }
        });
      
        return noResponseError;    
      }

      function getRequestOptions(verb, withToken, body) {
        // if (withToken === true) {
        //   //if authenticated, check to see if bearer token is expired, if so, force re-login
        //   if (userGlobal.user.isAuthenticated) {
        //     var bearerExpiration = userGlobal.user.tokenExpiration;
        //     var todayStr =  printDate(new Date()); 
      
        //     if (bearerExpiration < todayStr) {
        //       userGlobal.user.isAuthenticated = false;
      
        //       window.location.replace('https://info.kenneths.com');
      
        //       return;
        //     }
        //   } else {
        //     window.location.replace('https://info.kenneths.com');
            
        //     return;
        //   }
        // }
      
        let options = {};
      
        if (withToken === false) {
          if (body !== undefined && body !== '') {  //no token, with body
            //console.log(48,body);
            options = {
              method: verb,
              headers: { 
                'Content-Type': 'application/json'    
              },
              body: JSON.stringify(body),
              //console.log(48,body);
            };
          } else {        //no token, no body
            options = {
              method: verb,
              headers: { 
                'Content-Type': 'application/json'  
              }
            };
          }
          //console.log(66,options);
          return options;
          
        }
      
        // //gets here, we want to use token
        // if (body !== undefined && body !== '') {  //use token, with body
        //   options = {
        //     method: verb,
        //     headers: { 
        //       'Content-Type': 'application/json',
        //       'Authorization': 'Bearer ' + userGlobal.user.token        
        //     },
        //     body: JSON.stringify(body),
        //   };
        // } else {        //use token, no body
        //   options = {
        //     method: verb,
        //     headers: { 
        //       'Content-Type': 'application/json',
        //       'Authorization': 'Bearer ' + userGlobal.user.token        
        //     }
        //   };
        // }
      
        return options;
      }

      function throwError(statusCode, statusMessage) {
        throw createError({
                    statusCode: statusCode,
                    statusMessage: statusMessage,
                    fatal: true // ensures it routes to /error.vue
                })
      }

      return {
        handleResponse,
        handleInstagramResponse,
        getRequestOptions,
        throwError
      }


}


