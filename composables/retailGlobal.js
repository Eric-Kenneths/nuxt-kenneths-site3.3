import { appGlobal } from '~/composables/appGlobal';
const { handleResponse, getRequestOptions, throwError } = useResponse();

const retailGlobal = reactive({
  menuVisible: false,

  holdDeliveryMethod: '',

  confirmationNumber: '',

  webOrderRetailCartId: 0,

  webOrderRetailCart: {},

  webRetailSession: {},

  hadFailedCheckout: false,

  getItemImage(urlRouteName) {
    if (urlRouteName !== undefined) {
      return 'https://kenneths.com/static/retail/items/' + urlRouteName + '.jpg';
    }
  },

  cart: {
    visible: false,
    items: [],
    count: 0,
  },

  async clearRetailCart() {
    retailGlobal.cart.visible = false;
    retailGlobal.cart.items = [];
    retailGlobal.cart.count = 0;
  },

  tryAgain: {
    phone: '',
    email: ''
  },

  linkTechnicianVisible: false,

  linkedTechnician: {
    techId: 0,
    technicianCode: '',
    technicianType: '',
    technicianName: '',
    typeDescription: '',
  },

  tiderc: {
    tidercId: 0,
    tidercCode: '',
    app: '',
    x1: '',
    x2: '',
    x3: '',
    cardholderName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    customerCode: '',
    approveId: 0,
    returnAuth: '',
  },

  clearTiderc() {
    retailGlobal.tiderc.tidercId = 0;
    retailGlobal.tiderc.tidercCode = '';
    retailGlobal.tiderc.app = '';
    retailGlobal.tiderc.x1 = '';
    retailGlobal.tiderc.x2 = '';
    retailGlobal.tiderc.x3 = '';
    retailGlobal.tiderc.cardholderName = '';
    retailGlobal.tiderc.address = '';
    retailGlobal.tiderc.city = '';
    retailGlobal.tiderc.state = '';
    retailGlobal.tiderc.zipCode = '';
    retailGlobal.tiderc.customerCode = '';
    retailGlobal.tiderc.approveId = 0;
    retailGlobal.tiderc.returnAuth = '';
  },

  softClearTiderc() {
    //This is for going back to the payment screen from the payment declined screen (confirmation with property 'error')
    retailGlobal.tiderc.tidercId = 0;
    retailGlobal.tiderc.tidercCode = '';
    //retailGlobal.tiderc.app = '',
    retailGlobal.tiderc.x1 = '';
    retailGlobal.tiderc.x2 = '';
    retailGlobal.tiderc.x3 = '';
  },

  async getItemWebSearchWord(search) {
    const url = appGlobal.apiBaseUrl + '/khsds/SearchWord/' + search;

    const array = ref([]);

    await fetch(url)
      .then((response) => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, 'Error in retailGlobal.getItemWebSearchWord');
          return;
        }

        array.value = data.itemWebs;
      })
      .catch(function (e) {
        throwError(500, e?.message || 'Error in retailGlobal.getItemWebSearchWord');
      })
      .finally(function () {
        //Maybe do something
      });

    return array.value;
  },

  async refreshRetailSession() {
    const { getWebOrderRetailCartId } = useLocalStorage();

    let id = await getWebOrderRetailCartId();

    // ✅ RESTORED old-site behavior:
    // If null or 0, new user -> clear cart and count so UI doesn't show stale state.
    if (id === 0) {
      await retailGlobal.clearRetailCart();
      await retailGlobal.refreshCartCount();
      return;
    }

    const url = appGlobal.apiBaseUrl + '/pos/WebOrderRetailSession/' + id;

    const object = ref({});

    await fetch(url)
      .then((response) => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, 'Error in retailGlobal.refreshRetailSession');
          return;
        }

        object.value = data;
      })
      .catch(function (e) {
        throwError(500, e?.message || 'Error in retailGlobal.refreshRetailSession');
      })
      .finally(function () {
        if (object.value.expired === true) {
          return;
        } else {
          retailGlobal.linkedTechnician.techId = object.value.linkedTechnician.technicianId;
          retailGlobal.linkedTechnician.technicianCode = object.value.linkedTechnician.technicianCode;
          retailGlobal.linkedTechnician.technicianType = object.value.linkedTechnician.technicianType;
          retailGlobal.linkedTechnician.technicianName = object.value.linkedTechnician.technicianName;

          retailGlobal.webOrderRetailCart = object.value.webOrderRetailCart;

          retailGlobal.webRetailSession = object.value.webRetailSession;

          retailGlobal.cart.items = object.value.webCartItems;

          retailGlobal.refreshCartCount();
        }
      });
  },

  async checkForNeededRefresh() {
    if (
      retailGlobal.webOrderRetailCart.webOrderRetailCartId === 0 ||
      retailGlobal.webOrderRetailCart.webOrderRetailCartId === null ||
      retailGlobal.webOrderRetailCart.webOrderRetailCartId === undefined
    ) {
      retailGlobal.refreshRetailSession();
    }
  },

  async refreshCartCount() {
    const { setCartCount } = useLocalStorage();

    retailGlobal.cart.count = 0;

    retailGlobal.cart.items.forEach((item) => {
      retailGlobal.cart.count += item.quantity;
    });

    await setCartCount(retailGlobal.cart.count);
  },

async webRetailInitialize(customerId, technicianId) {
  const url = appGlobal.apiBaseUrl + '/pos/WebOrderRetailCartInitialize'

  const webOrderCartInitialize = {
    customerId,
    technicianId
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webOrderCartInitialize)
    })

    const data = await response.json()

    if (!handleResponse(data)) {
      throwError(500, 'Error in retailGlobal.webRetailInitialize')
      return 0
    }

    const id = Number(data.webOrderRetailCartId || 0)

    if (id > 0) {
      const { setWebOrderRetailCartId } = useLocalStorage()
      await setWebOrderRetailCartId(id)
      return id
    }

    throwError(500, 'No webOrderRetailCartId returned from webRetailInitialize')
    return 0
  } catch (e) {
    throwError(500, e?.message || 'Error in retailGlobal.webRetailInitialize')
    return 0
  }
},

  async UpdateLinkedTechnician(webOrderRetailCartId, technicianId) {
    const url = appGlobal.apiBaseUrl + '/pos/UpdateLinkedTechnician';

    let linkedTechnician = {
      webOrderRetailCartId: webOrderRetailCartId,
      technicianId: technicianId,
    };

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(linkedTechnician),
    };

    await fetch(url, options)
      .then((response) => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, 'Error in retailGlobal.UpdateLinkedTechnician');
          return;
        }
      })
      .catch(function (e) {
        throwError(500, e?.message || 'Error in retailGlobal.UpdateLinkedTechnician');
      })
      .finally(function () {});
  },

  async postWebOrderRetail(webOrderRetailCartId, itemCode, quantity, couponCode) {
    const url =
      appGlobal.apiBaseUrl +
      '/Pos/WebOrderRetail/' +
      webOrderRetailCartId +
      '/' +
      itemCode +
      '/' +
      quantity +
      '/' +
      couponCode;

    const integer = ref(0);

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    await fetch(url, options)
      .then((response) => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, 'Error in retailGlobal.postWebOrderRetail');
          return;
        }

        integer.value = data.webOrderRetailId;
      })
      .catch(function (e) {
        throwError(500, e?.message || 'Error in retailGlobal.postWebOrderRetail');
      })
      .finally(function () {});

    return integer.value;
  },

  async putWebOrderRetail(webOrderRetailId, quantity) {
    const url = appGlobal.apiBaseUrl + '/Pos/WebOrderRetail/' + webOrderRetailId + '/' + quantity;

    const integer = ref(0);

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };

    await fetch(url, options)
      .then((response) => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, 'Error in retailGlobal.putWebOrderRetail');
          return;
        }

        integer.value = data.webOrderRetailId;
      })
      .catch(function (e) {
        throwError(500, e?.message || 'Error in retailGlobal.putWebOrderRetail');
      })
      .finally(function () {});

    return integer.value;
  },

  async deleteWebOrderRetail(webOrderRetailId) {
    const url = appGlobal.apiBaseUrl + '/Pos/WebOrderRetail/Delete/' + webOrderRetailId;

    const integer = ref(0);

    let success = false;

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    };

    await fetch(url, options)
      .then((response) => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, 'Error in retailGlobal.deleteWebOrderRetail');
          return;
        }

        integer.value = data.webOrderRetailId;

        if (integer.value === webOrderRetailId) {
          success = true;
        }
      })
      .catch(function (e) {
        throwError(500, e?.message || 'Error in retailGlobal.deleteWebOrderRetail');
      })
      .finally(function () {});

    return success;
  },

  async getPickupOrderInformation(webOrderRetailCartId) {
    const url = appGlobal.apiBaseUrl + '/Pos/WebRetailPickUp/CartId/' + webOrderRetailCartId;

    const object = ref({});

    await fetch(url)
      .then((response) => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, 'Error in retailGlobal.getPickupOrderInformation');
          return;
        }

        object.value = data.pickUpOrder;
      })
      .catch(function (e) {
        throwError(500, e?.message || 'Error in retailGlobal.getPickupOrderInformation');
      })
      .finally(function () {
        appGlobal.isProcessing = false;
      });

    return object.value;
  },

  async updateShippingAmount() {
    if (retailGlobal.webOrderRetailCart.shippingState === 'AK' || retailGlobal.webOrderRetailCart.shippingState === 'HI') {
      retailGlobal.webOrderRetailCart.shippingAmount = 32.5;
      retailGlobal.webOrderRetailCart.shippingMethod = 'A';
    } else if (retailGlobal.webOrderRetailCart.shippingState === 'OH') {
      retailGlobal.webOrderRetailCart.shippingAmount = 10.0;
      retailGlobal.webOrderRetailCart.shippingMethod = 'S';
    } else if (
      retailGlobal.webOrderRetailCart.shippingState === '' ||
      retailGlobal.webOrderRetailCart.shippingState === '  ' ||
      retailGlobal.webOrderRetailCart.shippingState === null
    ) {
      retailGlobal.webOrderRetailCart.shippingAmount = 0.0;
      retailGlobal.webOrderRetailCart.shippingMethod = '';
    } else {
      retailGlobal.webOrderRetailCart.shippingAmount = 12.5;
      retailGlobal.webOrderRetailCart.shippingMethod = 'U';
    }
  },

  async putWebOrderRetailCart(webOrderRetailCart) {
    const url = appGlobal.apiBaseUrl + '/Pos/WebOrderRetailCart';

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webOrderRetailCart),
    };

    const object = ref({});

    await fetch(url, options)
      .then((response) => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, 'Error in retailGlobal.putWebOrderRetailCart');
          return;
        }

        object.value = data.oWebOrderRetailCart;
      })
      .catch(function (e) {
        throwError(500, e?.message || 'Error in retailGlobal.putWebOrderRetailCart');
      })
      .finally(function () {});

    return object.value;
  },

  async updateShippingForPickUp() {
    retailGlobal.webOrderRetailCart.shippingName = '';
    retailGlobal.webOrderRetailCart.shippingAddress = '';
    retailGlobal.webOrderRetailCart.shippingCity = '';
    retailGlobal.webOrderRetailCart.shippingState = '';
    retailGlobal.webOrderRetailCart.shippingZipCode = '';
    retailGlobal.webOrderRetailCart.shippingMethod = '';
  },

  async updateShippingForDelivery() {
    retailGlobal.webOrderRetailCart.pickUpLocationCode = '';
    retailGlobal.webOrderRetailCart.cellPhone = '';
    retailGlobal.webOrderRetailCart.carDescription = '';
  },

  async putProccessPayment(tiderc, webOrderRetailCart, webRetailSessionId, securityCode) {
    const url = appGlobal.apiBaseUrl + '/Pos/ProcessWebRetailPayment/' + webRetailSessionId + '/' + securityCode;

    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([JSON.stringify(tiderc), JSON.stringify(webOrderRetailCart)]),
    };

    const redirectTo = ref('');

    await fetch(url, options)
      .then((response) => response.json())
      .then(function (data) {
        if (!handleResponse(data)) {
          throwError(500, 'Error in retailGlobal.putProccessPayment');
          return;
        }

        redirectTo.value = data.redirectTo;
        retailGlobal.confirmationNumber = data.confirmationNumber;
      })
      .catch(function (e) {
        throwError(500, e?.message || 'Error in retailGlobal.putProccessPayment');
      })
      .finally(function () {});

    return redirectTo.value;
  },


  async getPaymentAttemptExists() {
        const { getWebOrderRetailCartId } = useLocalStorage();

       let webOrderRetailCartId = await getWebOrderRetailCartId();
        const url = appGlobal.apiBaseUrl + '/POS/PaymentAttemptExists/ProcessWebRetailPayment/' + webOrderRetailCartId;
        
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

});

export { retailGlobal };
