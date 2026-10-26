import { appGlobal } from '~/composables/appGlobal';
const { handleResponse, getRequestOptions, throwError } = useResponse();
const { roundTo, stripPhone } = useMiscFunctions();
const { getWebOrderGCCartId,
        setWebOrderGCCartId,
        removeWebOrderGCCartId } = useLocalStorage();

const giftCardGlobal = reactive({

    step: 'customize',

    webOrderGCs: [],

    //customize properties
    customizeType: 'D', //P for Spa, S for Services, D for Dollar Type

    webOrderGCProducts: null,
    selectServiceHeaders: [],

    customDollarAmount: 0,
    dollarAmountError: '',
    dollarAmount: 0,

    selectedSpaCode: '',
    spaDescription: '',
    spaAmount: 0,

    selectedServiceAmount: 0,
    selectedServiceError: '',
    selectedServices: [],
    hairServiceAmount: 0,

    selectionType: '', //spa-package, dollar-amount, selected-services

    //personalize properties
    tipPercent: 0,
    tipTotal: 0,

    salesTax: 0,

    deliveryMethod: '', //E-Email, P-Pickup at Location, M-US Mail

    printName: '',
    recipientEmail: '',
    pickUpLocationCode: null,
    isCurbSide: false,

    orderTotal: 0,

    locations: [],

    states: [],

    hadFailedCheckout: false,

    mailingAddress: {
      name: '',
      address: '',
      city: '',
      state: 'OH',
      zipCode: '',
      isRecipientAddress: false,
    },

    personalMessage: {
      from: '',
      to: '',
      message: ''
    },

    checkOut: {
        cardHolderName: '',
        creditCardType: '',
        cardNumber: '',
        expiration: '',
        ccv: '',
        zipCode: '',
        phone: '',
        email: '',
        verifyEmail: '',
        marketingSourceId: 0,
        isCurbSide: false,
        curbSideLocationCode: '',
        curbSideLocation: '',
        curbSideAddress: '',
        curbSideCityStateZip: '',
        carDescription: '',
        cellPhone: ''
    },

    clearGiftCard() {
      this.step = 'customize';

      this.customizeType = 'P';
      this.customDollarAmount = 0;
      this.dollarAmountError = '';
      this.dollarAmount = 0;

      this.selectedSpaCode = '';
      this.spaDescription = '';
      this.spaAmount = 0;

      this.clearSelectedServices();
      this.hairServiceAmount = 0,
      this.selectedServiceAmount = 0,
      this.selectedServices = [],
      this.selectedServiceError = '';
      this.selectionType = '';

      this.tipPercent = 0;
      this.tipTotal = 0;

      this.salesTax = 0;

      this.deliveryMethod = '';

      this.printName = '';
      this.recipientEmail = '';
      
      this.pickUpLocationCode = null;
      this.isCurbSide = false;

      this.mailingAddress.name = '';
      this.mailingAddress.address = '';
      this.mailingAddress.city = '';
      this.mailingAddress.state = 'OH';
      this.mailingAddress.zipCode = '';
      this.mailingAddress.isRecipientAddress = false;

      this.personalMessage.to = '';
      this.personalMessage.from = '';
      this.personalMessage.message = ''
    },

    clearCheckOut() {
        this.total = '';
        this.cardHolderName = '';
        this.creditCardType = '';
        this.cardNumber = '';
        this.expiration = '';
        this.ccv = '';
        this.zipCode = '';
        this.phone = '';
        this.email = '';
        this.verifyEmail = '';
        this.marketingSourceId = 0;
        this.isCurbSide = false;
        this.curbSideLocationCode = '';
        this.curbSideLocation = '';
        this.curbSideAddress = '';
        this.curbSideCityStateZip = '';
        this.carDescription = '';
        this.cellPhone = '';
    },

    clearSelectedServices() {
      for (const hd of this.selectServiceHeaders) {
        for (const dt of hd.selectedServiceDetails) {
          if (dt.selectedServiceCode !== '') {
            dt.selectedServiceCode = '';
          }

          if (dt.quantity !== 1) {
            dt.quantity = 1;
          }
        }
      }

      this.hairServiceAmount = 0;
    },

    async loadSelectedServices() {
      this.selectedServices = [];
      let serviceCode = '';
      let qty = 0;

      for (const hd of this.selectServiceHeaders) {
        for (const dt of hd.selectedServiceDetails) {
          serviceCode = '';
          if (dt.selectedServiceCode !== '') {
            serviceCode = dt.selectedServiceCode;
            qty = dt.quantity
          }

          if (qty === 0) { //handle when zero
            dt.selectedServiceCode = '';
            dt.quantity = 1;
            serviceCode = '';
          }

          if (serviceCode !== '') {
            for (const service of dt.services) {
              if (service.serviceCode === serviceCode) {
                this.selectedServices.push({serviceCode: serviceCode, 
                                            qty: qty,
                                            description: service.description,
                                            price: service.price })
                break;
              }
            }
          }
        }
      }
    },

    async setSalesTax() {

      let total = this.spaAmount;

      for (const service of this.selectedServices) {
        total += roundTo(service.price * service.qty,2);
      }

      this.salesTax =  roundTo(total * this.webOrderGCProducts.taxRate,2);
    },

    async getSelectedServiceAmount() {
      let total = 0;

      for (const service of this.selectedServices) {
        total += roundTo(service.price * service.qty,2);
      }

      total += this.hairServiceAmount;

      return total;

    },

    async getCart() {
       let webOrderGCCartId = await getWebOrderGCCartId();

       if (webOrderGCCartId === 0) {
        this.webOrderGCs = [];
        this.orderTotal = 0;
       } else {
            const url = appGlobal.apiBaseUrl + '/GiftCertificate/WebOrderGCs/' + webOrderGCCartId;

            appGlobal.loading = true;
            const options = getRequestOptions('GET', false);

            let _webOrderGcs = [];
            let orderTotal = 0;

            await fetch(url, options)
              .then(response =>  response.json().then(data => ({status: response.status, body: data})))
              .then(function(obj) {
                if (obj.status !== 200) {
                    throwError(obj.status, obj.body.errorMessage);
                } else {
                  _webOrderGcs = obj.body.webOrderGCViewModels;
                  orderTotal = obj.body.orderTotal;
                }
              })
              .catch(function (e) {
                throwError(500, e.message);
              })
              .finally(function () {
                appGlobal.loading = false;
              })

              if (_webOrderGcs.length > 0) {
                if (_webOrderGcs[0].approved === true) { //aready checked out, remove
                  _webOrderGcs = [];
                  this.orderTotal = 0;
                  await removeWebOrderGCCartId(); //remove from local storage
                }
              }

            this.webOrderGCs = _webOrderGcs;
            this.orderTotal = orderTotal;

            await this.setCurbside();  
       }
    },

    async returnCart(webOrderGCCartId) {

      const url = appGlobal.apiBaseUrl + '/GiftCertificate/WebOrderGCs/' + webOrderGCCartId;

      appGlobal.loading = true;
      const options = getRequestOptions('GET', false);

      let orderSummary = {
        webOrderGcs: [],
        orderTotal: 0
      }

      await fetch(url, options)
        .then(response =>  response.json().then(data => ({status: response.status, body: data})))
        .then(function(obj) {
          if (obj.status !== 200) {
              throwError(obj.status, obj.body.errorMessage);
          } else {
            orderSummary.webOrderGcs = obj.body.webOrderGCViewModels;
            orderSummary.orderTotal = obj.body.orderTotal;
          }
        })
        .catch(function (e) {
          throwError(500, e.message);
        })
        .finally(function () {
          appGlobal.loading = false;
        })

      return orderSummary;


    },

    async setCurbside() {
      this.checkOut.curbSideLocationCode = '';
      this.checkOut.curbSideLocation = '';
      this.checkOut.curbSideAddress = '';
      this.checkOut.curbSideCityStateZip = '';
      this.checkOut.isCurbSide = false;

      const curbSideOrder = giftCardGlobal.webOrderGCs.find(gc => gc.isCurbSide === true);

      if (curbSideOrder) {
         this.checkOut.isCurbSide = true;
        
         const location = giftCardGlobal.locations.find(l => l.locationCode === curbSideOrder.pickUpLocationCode);
        
         this.checkOut.curbSideLocationCode = location.locationCode;
         this.checkOut.curbSideLocation = location.extendedDescription;
         this.checkOut.curbSideAddress = location.address;
         this.checkOut.curbSideCityStateZip = location.cityState;;
      }

    },

    async getWebOrderGCProducts(locationCode, services, technicianTypes, showNoPreference, priceLevel, fromChairDate) {
        const url = appGlobal.apiBaseUrl + '/GiftCertificate/WebOrderGCProducts';
        let webOrderGCProductsViewModel = {};

        appGlobal.loading = true;
        const options = getRequestOptions('GET', false);

        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {
            if (obj.status !== 200) {
                throwError(obj.status, obj.body.errorMessage);
            } else {
              webOrderGCProductsViewModel = obj.body;
            }
          })
          .catch(function (e) {
             throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.loading = false;
          })

        return webOrderGCProductsViewModel;
    },

    async putWebOrderGCAddToCart() {
        const url = appGlobal.apiBaseUrl + '/GiftCertificate/WebOrderGCAddToCart';

        let webOrderGCCartId = await getWebOrderGCCartId();

        let _hairServiceAmount = this.hairServiceAmount;
        if (_hairServiceAmount === null) {
          _hairServiceAmount = 0;
        }
        
        
        let webOrderGCAddToCartParams = {
          webOrderGCCartId: webOrderGCCartId,
          spaCode: this.selectedSpaCode,
          spaPackagePrice: this.spaAmount,
          dollarAmount: this.dollarAmount,
          selectedHairServiceAmount: _hairServiceAmount,
          selectedServicesTotal: this.selectedServiceAmount,
          deliveryMethod: this.deliveryMethod,
          printName: this.printName,
          forwardEmail: this.recipientEmail,
          pickUpLocationCode: this.pickUpLocationCode,
          isCurbSide: this.isCurbSide,
          mailName: this.mailingAddress.name,
          mailAddr: this.mailingAddress.address,
          mailCity: this.mailingAddress.city,
          mailState: this.mailingAddress.state,
          mailZip: this.mailingAddress.zipCode,
          mailIsRecipient: this.mailingAddress.isRecipientAddress,
          toName: this.personalMessage.to,
          fromName: this.personalMessage.from,
          message: this.personalMessage.message,
          subTotal: this.spaAmount + this.dollarAmount + this.selectedServiceAmount,
          tipPercent: this.tipPercent,
          tipTotal: this.tipTotal,
          salesTax: this.salesTax,
          selectedServices: this.selectedServices  // equivalent to List<GCSelectedService>
      };

        appGlobal.loading = true;

        const options = getRequestOptions('PUT', false, webOrderGCAddToCartParams);

        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {
            if (obj.status !== 200) {
                throwError(obj.status, obj.body.errorMessage);
            } else {
              webOrderGCCartId = obj.body.webOrderGCCartId;
            }
          })
          .catch(function (e) {
             throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.loading = false;
          })

        await setWebOrderGCCartId(webOrderGCCartId);

        return true;

    },

    async deleteWebOrderGC(webOrderGCId) {

      const url = appGlobal.apiBaseUrl + '/GiftCertificate/WebOrderGC/' + webOrderGCId;

      appGlobal.loading = true;
      const options = getRequestOptions('DELETE', false);

      let deleted = false;

      await fetch(url, options)
        .then(response =>  response.json().then(data => ({status: response.status, body: data})))
        .then(function(obj) {
          if (obj.status !== 200) {
              throwError(obj.status, obj.body.errorMessage);
          } else {
            deleted = obj.body.deleted;
          }
        })
        .catch(function (e) {
          throwError(500, e.message);
        })
        .finally(function () {
          appGlobal.loading = false;
        })

        return deleted
    },

    async putWebOrderGCPurchase() {
        const url = appGlobal.apiBaseUrl + '/GiftCertificate/WebOrderGCPurchase';

        let webOrderGCCartId = await getWebOrderGCCartId();

        let expiration = stripPhone(this.checkOut.expiration); 
        let phone = stripPhone(this.checkOut.phone);
        let cellPhone = stripPhone(this.checkOut.cellPhone);

        let webOrderGCPurchaseParams = {
          webOrderGCCartId: webOrderGCCartId,
          total: this.orderTotal,
          customerCode: '',
          cardholderName: this.checkOut.cardHolderName,
          creditCardType: this.checkOut.creditCardType,
          cardNumber: this.checkOut.cardNumber,
          expiration: expiration,
          ccv: this.checkOut.ccv,
          zipCode: this.checkOut.zipCode,
          phone: phone,
          email: this.checkOut.email,
          marketingSourceId: this.checkOut.marketingSourceId,
          isCurbSide: this.checkOut.isCurbSide,
          curbSideLocationCode: this.checkOut.curbSideLocationCode,
          curbSideLocationDescription: this.checkOut.curbSideLocationDescription,
          carDescription: this.checkOut.carDescription,
          cellPhone: cellPhone,
          textCode: accountGlobal.textCode
      };

        appGlobal.loading = true;

        let webOrderGCReturnParams = {};

        const options = getRequestOptions('PUT', false, webOrderGCPurchaseParams);

        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {
            if (obj.status !== 200) {
                throwError(obj.status, obj.body.errorMessage);
            } else {
              webOrderGCReturnParams = obj.body.webOrderGCReturnParams;
            }
          })
          .catch(function (e) {
             throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.loading = false;
          })
  
        await setWebOrderGCCartId(webOrderGCCartId);

        return webOrderGCReturnParams;

    },

    async clearOrder() {
      this.webOrderGCs = [];
      this.clearGiftCard();
      this.clearCheckOut();
      this.orderTotal = 0;
      await removeWebOrderGCCartId();
    },

    async getWebOrderGCBySecurityCode(securityCode) {

      const url = appGlobal.apiBaseUrl + '/GiftCertificate/WebOrderGCBySecurityCode/' + securityCode;

      appGlobal.loading = true;
      const options = getRequestOptions('GET', false);

      let giftCardSummary = {
        webOrderGc: {},
        giftCardDescriptions : []
      };

      await fetch(url, options)
        .then(response =>  response.json().then(data => ({status: response.status, body: data})))
        .then(function(obj) {
          if (obj.status !== 200) {
              throwError(obj.status, obj.body.errorMessage);
          } else {
            giftCardSummary.webOrderGc = obj.body.webOrderGCViewModel;
            giftCardSummary.giftCardDescriptions = obj.body.giftCardDescriptionViewModels
          }
        })
        .catch(function (e) {
          throwError(500, e.message);
        })
        .finally(function () {
          appGlobal.loading = false;
        })

      return giftCardSummary;
    },

    async getPaymentAttemptExists() {
        let webOrderGCCartId = await getWebOrderGCCartId();
        const url = appGlobal.apiBaseUrl + '/POS/PaymentAttemptExists/WebOrderGCPurchase/' + webOrderGCCartId;
        let attemptStatus = 'N'; //N-No Attempt, Y-Yes Attempt, E-Error

        appGlobal.loading = true;
        const options = getRequestOptions('GET', false);

        await fetch(url, options)
          .then(response =>  response.json().then(data => ({status: response.status, body: data})))
          .then(function(obj) {
            if (obj.status !== 200) {
                throwError(obj.status, obj.body.errorMessage);
            } else {
              attemptStatus = obj.body.attemptStatus;
            }
          })
          .catch(function (e) {
             throwError(500, e.message);
          })
          .finally(function () {
            appGlobal.loading = false;
          })

        return attemptStatus;
    },

    consoleGC() {
      console.log(this.selectServiceHeaders)
    }

});




export { giftCardGlobal }
