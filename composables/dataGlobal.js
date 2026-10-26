import { appGlobal } from '~/composables/appGlobal';
const { handleResponse, throwError } = useResponse();

const dataGlobal = reactive({
  today: new Date(),

  sideBarVisible: false,

  customer: {
    customerId: 0,
    customerCode: '',
  },

  showFirstTimerCouponPopUp: false,

  services: {
    serviceList: [],
    lastPullDateTime: '',
  },

  marketingTracking: {
    webMarketingHdId: 0,
    customerCode: '',
    email: '',
    webMarketingDtId: 0,
    app: '',
  },

  //Prevents all keys except backspace and delete
  noInput(event) {
    event.preventDefault();
  },

  numericInput(event) {
    if (
      event.key !== '0' &&
      event.key !== '1' &&
      event.key !== '2' &&
      event.key !== '3' &&
      event.key !== '4' &&
      event.key !== '5' &&
      event.key !== '6' &&
      event.key !== '7' &&
      event.key !== '8' &&
      event.key !== '8' &&
      event.key !== '9' &&
      event.key !== 'Backspace' &&
      event.key !== 'Delete' &&
      event.key !== 'Tab' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight'
    ) {
      event.preventDefault();
    }
  },

  isEmailFormat(email) {
    return email
      .trim()
      .match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g);
  },

  async putMarketingConversion(webMarketingDtId, miscId, app, customerCode) {
    const url = appGlobal.apiBaseUrl + '/khsds/MarketingConversion';

    let marketingConversionViewModel = {
      webMarketingDtId: webMarketingDtId,
      miscId: miscId,
      app: app,
      customerCode: customerCode,
    };

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(marketingConversionViewModel),
    };

    await fetch(url, options)
      .then((response) => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, 'Error in dataGlobal.putMarketingConversion');
          return;
        }
      })
      .catch(function (e) {
        throwError(500, e?.message || 'Error in dataGlobal.putMarketingConversion');
      })
      .finally(function () {});
  },

  // kept from your new site (not in old, but fine to keep)
  subTypePricingGridHeader: '',
  subTypePricingGridVisible: false,
  subTypeServices: [],

  modelPricingVisible: false,
  modelPricingServices: []
});

export { dataGlobal };
