
export function useLocalStorage() {

   const { convertDateToApiString,
      convertStringToDate,
      addDay } = useDateFunctions();

   async function setWebOrderRetailCartId(cartId) {
      window.localStorage.setItem('webOrderRetailCartId', cartId);
   }

   async function getWebOrderRetailCartId() {
      let wid = 0;
      let id = window.localStorage.getItem('webOrderRetailCartId');

      if (id === null || id === 'null' || id === '0') {
         wid = 0
      } else {
         wid = Number(id);
      }
      return wid;
   }

   async function setCartCount(cartCount) {
      window.localStorage.setItem('cartCount', cartCount);
   }

   async function getCartCount() {
      let cartCount = 0;
      let cnt = window.localStorage.getItem('cartCount');
      if (cnt === null || cnt === 'null' || cnt === '0') {
         cartCount = 0
      } else {
         cartCount = Number(cnt);
      }

      return cartCount;
   }

   async function setMarketingTracking(marketingTrack) {

      //marketingTrack
      // { webMarketingHdId: 0,
      //    customerCode: '',
      //    email: ''
      //    }

      window.localStorage.setItem('marketingTrack', JSON.stringify(marketingTrack));
   }

   async function getMarketingTracking() {
      let mt = window.localStorage.getItem('marketingTrack')
      if (mt === null) {
         return null 
      }

      let marketingTrack = JSON.parse(mt);

      return marketingTrack;

   }

   async function setNewBookingCompleted(didComplete) {

      //marketingTrack
      // { webMarketingHdId: 0,
      //    customerCode: '',
      //    email: ''
      //    }

      window.localStorage.setItem('newBookingCompleted', didComplete);
   }

   async function getNewBookingCompleted() {
      let nbc = window.localStorage.getItem('newBookingCompleted')

      if (nbc === null) {
         return '0' 
      }

      return nbc;
   }


   async function setMarketingDiscountCode(discountCode) {

      window.localStorage.setItem('marketingDiscountCode', discountCode);

      let expireDate = addDay(new Date(),7)

      window.localStorage.setItem('marketingDiscountCodeExpireDate', convertDateToApiString(expireDate))
   }

   async function getMarketingDiscountCode() {
      let discountCode = window.localStorage.getItem('marketingDiscountCode')

      if (discountCode === null) {
         return '' 
      }

      //remove if expired...don't want pop up indefinitely
      let expireDateAPIString = window.localStorage.getItem('marketingDiscountCodeExpireDate')

      if (expireDateAPIString !== null) {
         let expireDate = convertStringToDate(expireDateAPIString);
         let today = new Date();

         if (today > expireDate) {
            localStorage.removeItem("marketingDiscountCode");
            localStorage.removeItem("marketingDiscountCodeExpireDate");
            return '';
         }
      }

      return discountCode;
   }


   async function setWebOrderGCCartId(cartId) {
      window.localStorage.setItem('webOrderGCCartId', cartId);
   }

   async function getWebOrderGCCartId() {
      let wid = 0;
      let id = window.localStorage.getItem('webOrderGCCartId');

      if (id === null || id === 'null' || id === '0') {
         wid = 0
      } else {
         wid = Number(id);
      }
      return wid;
   }

   async function removeWebOrderGCCartId() {
      window.localStorage.removeItem('webOrderGCCartId');
   }

   async function setConfirmationWebOrderGCCartId(cartId) {
      window.localStorage.setItem('confirmationWebOrderGCCartId', cartId);
   }

   async function getConfirmationWebOrderGCCartId() {
      let wid = 0;
      let id = window.localStorage.getItem('confirmationWebOrderGCCartId');

      if (id === null || id === 'null' || id === '0') {
         wid = 0
      } else {
         wid = Number(id);
      }
      return wid;
   }

   async function removeConfirmationWebOrderGCCartId() {
      window.localStorage.removeItem('confirmationWebOrderGCCartId');
   }

   async function setLastPageB4Profile(lastPageB4Profile) {
      window.localStorage.setItem('lastPageB4Profile', lastPageB4Profile);
   }

   async function getLastPageB4Profile() {
       let lastPageB4Profile = window.localStorage.getItem('lastPageB4Profile')

      if (lastPageB4Profile === null) {
         return '' 
      }

      return lastPageB4Profile;
   }

   return {
      setWebOrderRetailCartId,
      getWebOrderRetailCartId,
      setCartCount,
      getCartCount,
      setMarketingTracking,
      getMarketingTracking,
      setNewBookingCompleted,
      getNewBookingCompleted,
      setMarketingDiscountCode,
      getMarketingDiscountCode,
      setWebOrderGCCartId,
      getWebOrderGCCartId,
      removeWebOrderGCCartId,
      setConfirmationWebOrderGCCartId,
      getConfirmationWebOrderGCCartId,
      removeConfirmationWebOrderGCCartId,
      setLastPageB4Profile,
      getLastPageB4Profile
   }
}


