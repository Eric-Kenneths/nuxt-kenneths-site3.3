const dataGlobal = reactive({
  today: new Date(),

  sideBarVisible: false,

  customer: {
    customerId: 0,
    customerCode: '',
  },

  services: {
    serviceList: [],
    lastPullDateTime: '',
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

  // kept from your new site (not in old, but fine to keep)
  subTypePricingGridHeader: '',
  subTypePricingGridVisible: false,
  subTypeServices: []
});

export { dataGlobal };
