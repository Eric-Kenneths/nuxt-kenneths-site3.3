import { appGlobal } from '~/composables/appGlobal';
//import { useDataState } from '~/composables/dataState';

export default defineNuxtPlugin(nuxtApp => {

    appGlobal.isDevMode = process.env.NODE_ENV ===  "production" ? false : true;
    appGlobal.apiBaseUrl = process.env.NODE_ENV ===  "production" ? "https://api.kenneths.com/api" : "https://localhost:44325/api";


    
    // const { setServices } = useDataState();    
    
    // setServices({
    //         serviceList: [],
    //         lastPullDateTime: ''
    //     });

    // const { setMarketingTracking } = useDataState();    
    
    // setMarketingTracking({
    //     webMarketingHdId: 0,
    //     customerCode: '',
    //     email: '',
    //     webMarketingDtId: 0
    //   });

    //  const { setCustomer } = useDataState();    
    
    //   setCustomer({
    //           customerId: 0,
    //           customerCode: ''
    //       });

    //   const { setLinkedTechnician } = useDataState();

    //   setLinkedTechnician({
    //     techId: 0,
    //     technicianCode: '',
    //     technicianType: '',
    //     technicianName: '',
    //     typeDescription: ''
    //   })


  })