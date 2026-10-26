<template>
  <div class="md:ml-7 lg:mx-7 bg-white">
    <div class="grid">
      <div class="col-12">
        <div v-for="(route, id) in state.routes" :key="id">
          {{ route }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'blank'
})

useHead({
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})

const state = reactive({
  routes: [],
  urlPrefix: '<url><loc>https://kenneths.com'
});

const {
  getItemWebGroupForWeb,
  getItemWebForSiteMap,
  getBlogHeaders,
  getGeoStackPagesForPublish,
  getSupportingStackPageForPublish
} = useKhsds();

const { getEmployeesByLocationWithSocialMedia } = useEmployee();

const router = useRouter();

onMounted(async () => {
  console.log(router.options.routes)

  await formatRoutes(router.options.routes);
});

function urlDisplayFormat(display) {
  display = display.toString();
  display = display.toLowerCase();

  display = display.replace(' (out of stock)', '');

  display = display.replaceAll('_', '');
  display = display.replaceAll('+', '');
  display = display.replaceAll(':', '');
  display = display.replaceAll(';', '');
  display = display.replaceAll('-', '');
  display = display.replaceAll('/', '');
  display = display.replaceAll('& ', '');

  display = display.replaceAll(' ', '-');

  return display;
}


async function formatRoutes(paths) {
  //routes that will not auto generate
  state.routes.push(state.urlPrefix + '/feed' + '</loc><changefreq>daily</changefreq><priority>0.90</priority></url>');
  state.routes.push(state.urlPrefix + '/book/new/service-type' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');

  //auto generated
  paths.forEach(async (path) => {

    if (path.name === undefined) {  //came from routeRules in nuxt.config.ts
      return;
    }

    if (path.path === '/s') {
      return;
    }

    if (path.path.includes('search/:searchProp') ||
      path.path.includes('admin/') ||
      path.path.includes('shop-retail/:source/:groupDescription') ||
      path.path.includes('blog-test') ||
      path.path.includes('site-map-generator') ||
      path.path.includes('catchAll') ||
      path.path.includes('test') ||
      path.path.includes('pathMatch') ||
      path.path.includes('book/new') ||
      path.path.includes('retail/checkout') ||
      path.path.includes('/promo/') ||
      path.path === ('/gc') ||
      path.path === ('/shop/gift-cards/checkout') ||
      path.path === ('/shop/gift-cards/confirmation') ||
      path.path === ('/services/hair/:hairRouteName()/:stackPageRoute()') || //below will get spa, hair and nails, as long as there is a spa
      path.path === ('/services/nail/:hairRouteName()/:stackPageRoute()') || //below will get spa, hair and nails, as long as there is a spa
      path.path === '/book/model' ||
      path.path === '/book/models-confirm' ||
      path.path === '/book/link' ||
      path.path === '/book/models' ||
      path.path === '/model-new' ||
      path.path === '/model-old' ||
      path.path === '/x' ||
      path.path === '/referral/:code()' ||
      path.path === '/gc/:secCode()' ||
      path.path === '/:path(.*)*' ||
      path.path === '/volt-examples'
    ) {
      return; //Skip this paths. We do not want to include them in the sitemap
    } else if (path.path.includes('blog/:postGroup()')) {

      state.routes.push(state.urlPrefix + '/blog/hair' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/blog/skin' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/blog/nails' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/blog/products' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/blog/news' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');

    } else if (path.path.includes('/services/spa/:spaRouteName()/:stackPageRoute()')) {  //supporting services articles


      let supportingStackPages = await getSupportingStackPageForPublish(); //this will get spa, hair and nails, as long as there is a spa

      supportingStackPages.forEach((supportingStackPage) => {
        state.routes.push(state.urlPrefix + '/services/' + supportingStackPage.serviceCategory + '/' + supportingStackPage.serviceTypeRoute + '/' + supportingStackPage.stackPageRoute + '</loc><changefreq>daily</changefreq><priority>0.70</priority></url>');
      });
    } else if (path.path.includes('/locations/:loca()')) { //main location pages

      state.routes.push(state.urlPrefix + '/locations/dublin' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/locations/powell' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/locations/polaris' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/locations/westerville' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/locations/new-albany' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/locations/hilliard' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/locations/upper-arlington' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/locations/pickerington' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/locations/grove-city' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/locations/academy' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');

    } else if (path.path.includes('/services/hair/:serviceSubType?')) {

      state.routes.push(state.urlPrefix + '/services/hair/cuts-and-styles' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/services/hair/color' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/services/hair/highlights' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/services/hair/treatments' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/services/hair/smoothing-and-perms' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/services/hair/extensions' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/services/hair/japanese-head-spa' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');

    } else if (path.path.includes('/services/nail/:serviceSubType?')) {

      state.routes.push(state.urlPrefix + '/services/nail/manicures' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/services/nail/pedicures' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');

    } else if (path.path.includes('/services/spa/:serviceSubType?')) {

      state.routes.push(state.urlPrefix + '/services/spa/facials' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/services/spa/waxing' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/services/spa/brow-and-lash' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/services/spa/makeup' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/services/spa/massage' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      state.routes.push(state.urlPrefix + '/services/spa/spa-bar' + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');

    } else if (path.path.includes('/our-team/profile/:location()/:alias()')) {  //technician profiles

      let employeeList = await getEmployeesByLocationWithSocialMedia('AL');

      let technicians = employeeList.filter(employee => employee.positionId === 26 || employee.positionId === 33 || employee.positionId === 34 || employee.positionId === 35 || employee.positionId === 43);

      // let leaderShip = employeeList.listSocialMediaByLocationForWebViewModels.filter(employee => employee.positionId === 1 || employee.positionId === 2 || employee.positionId === 3 || employee.positionId === 10 ||
      //     employee.positionId === 12 || employee.positionId === 14 || employee.positionId === 16 || employee.positionId === 17 || employee.positionId === 18 || employee.positionId === 19 || employee.positionId === 20 || employee.positionId === 24 ||
      //     employee.positionId === 37 || employee.positionId === 44 || employee.positionId === 48 || employee.positionId === 113000002 || employee.positionId === 113000003 || employee.positionId === 113000007 || employee.positionId === 113000012 );


      for (const employee of technicians) {
        state.routes.push(state.urlPrefix + '/our-team/profile/' + employee.city + '/' + employee.emalias.toLowerCase() + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>');
      }


    } else if (path.path.includes('shop/retail/:groupDescription()')) {
      let itemWebGroups = await getItemWebGroupForWeb();

      itemWebGroups.forEach((group) => {
        state.routes.push(state.urlPrefix + path.path.replace(':groupDescription()', urlDisplayFormat(group.description) + '</loc><changefreq>daily</changefreq><priority>0.85</priority></url>'));
      });

    } else if (path.path.includes('shop/retail/product/:urlRouteName()')) {
      let itemWebs = await getItemWebForSiteMap();
      itemWebs.forEach((item) => {
        state.routes.push(state.urlPrefix + path.path.replace(':urlRouteName()', item.urlRouteName + '</loc><changefreq>daily</changefreq><priority>0.80</priority></url>'));
      });
    } else if (path.path.includes('/locations/:locationRouteName()/:pointOfInterestRoute()')) {  //geo stack pages
      let geoStacks = await getGeoStackPagesForPublish();

      geoStacks.forEach((geoStack) => {
        state.routes.push(state.urlPrefix + path.path.replace(':locationRouteName()/:pointOfInterestRoute()', geoStack.locationRoute + '/' + geoStack.pointOfInterestRoute + '</loc><changefreq>daily</changefreq><priority>0.70</priority></url>'));
      });


    } else if (path.path.includes('checkout/confirmation/:status')) {
      state.routes.push(state.urlPrefix + path.path.replace(':status', 'error') + '</loc><changefreq>daily</changefreq><priority>0.50</priority></url>');
      state.routes.push(state.urlPrefix + path.path.replace(':status', 'delivery') + '</loc><changefreq>daily</changefreq><priority>0.50</priority></url>');
      state.routes.push(state.urlPrefix + path.path.replace(':status', 'pickup') + '</loc><changefreq>daily</changefreq><priority>0.50</priority></url>');

    } else if (path.path.includes('blog/post/')) {
      let blogs = await getBlogHeaders();

      blogs.forEach((blog) => {
        state.routes.push(state.urlPrefix + path.path.replace(':postRouteName()', blog.routeName) + '</loc><changefreq>daily</changefreq><priority>0.75</priority></url>');
      })

    } else if (path.path.includes('careers/tour/:step')) {
      state.routes.push(state.urlPrefix + path.path.replace(':step', '0') + '</loc><changefreq>daily</changefreq><priority>0.50</priority></url>');
      state.routes.push(state.urlPrefix + path.path.replace(':step', '1') + '</loc><changefreq>daily</changefreq><priority>0.50</priority></url>');

    } else if (path.path.includes('remodel/:locationName')) {
      state.routes.push(state.urlPrefix + path.path.replace(':locationName', 'avery') + '</loc><changefreq>daily</changefreq><priority>0.60</priority></url>');

    } else if (path.path.includes('checkout')) {
      state.routes.push(state.urlPrefix + path.path + '</loc><changefreq>daily</changefreq><priority>0.50</priority></url>');

    } else if (path.path.endsWith('/')) {
      state.routes.push(state.urlPrefix + path.path + '</loc><changefreq>daily</changefreq><priority>1.00</priority></url>');

    } else {
      state.routes.push(state.urlPrefix + path.path + '</loc><changefreq>daily</changefreq><priority>0.80</priority></url>');
    }
  })
}
</script>