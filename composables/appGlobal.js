const { getRequestOptions, throwError } = useResponse();

const appGlobal = reactive({
  apiBaseUrl: '',
  appName: 'Kenneths-Site',
  appVersion: '2.110',
  today: new Date(),
  isLoading: false,
  isDevMode: false,
  doAppTracking: false,
  appTrackingTranId: 0,

  async postAppTrackTran(appTrackingId, customerCode, appTrackingPageId) {
    if (this.doAppTracking === false) {
      return;
    }

    if (appGlobal.isDevMode === true) {
      return;
    }

    const url = appGlobal.apiBaseUrl + '/khsds/AppTrackTran';

    let browserType = 'D';

    if (appGlobal.appTrackingTranId === 0) {
      // Old site had this capability; it was commented out on new site.
      if (await this.isMobileBrowser()) {
        browserType = 'M';
      }
    }

    const appTrackingTranParameters = {
      appTrackingTranId: appGlobal.appTrackingTranId,
      appTrackingId: appTrackingId,
      customerCode: customerCode,
      browserType: browserType,
      appTrackingPageId: appTrackingPageId,
    };

    let appTrackingTranId = 0;

    const options = getRequestOptions('POST', false, appTrackingTranParameters);

    await fetch(url, options)
      .then((response) =>
        response.json().then((data) => ({ status: response.status, body: data }))
      )
      .then(function (obj) {
        if (obj.status !== 200) {
          appTrackingTranId = -1;
        } else {
          appTrackingTranId = obj.body.appTrackingTranId;
        }
      })
      .catch(function (e) {
        appTrackingTranId = -1;
      })
      .finally(function () {
        appGlobal.isLoading = false;
      });

    appGlobal.appTrackingTranId = appTrackingTranId;
  },

  // RESTORED (was commented out on the new site, but exists on the old site)
  async isMobileBrowser() {
    // Guard SSR
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 800px)').matches;
  },
});

export { appGlobal };
