<template>
  <!-- FULL-WIDTH NAV WRAPPER -->
  <div class="w-full bg-primary-900">
    <nav class="max-w-[1600px] mx-auto w-full" aria-label="Blog categories">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 text-center text-primary-100">
        <NuxtLink v-for="item in blogMenuItems" :key="item.slug" :to="item.href"
          class="py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900"
          :class="isActiveBlogCategory(item.slug)
            ? 'bg-primary-500 text-primary-900'
            : 'hover:bg-primary-500 hover:text-primary-900'"
          :aria-current="isActiveBlogCategory(item.slug) ? 'page' : undefined">
          {{ item.label }}
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup>
const route = useRoute()

const blogMenuItems = [
  {
    label: 'FEATURED',
    slug: 'featured',
    href: '/blog'
  },
  {
    label: 'HAIR',
    slug: 'hair',
    href: '/blog/hair'
  },
  {
    label: 'SKIN',
    slug: 'skin',
    href: '/blog/skin'
  },
  {
    label: 'NAILS',
    slug: 'nails',
    href: '/blog/nails'
  },
  {
    label: 'PRODUCTS',
    slug: 'products',
    href: '/blog/products'
  },
  {
    label: 'NEWS',
    slug: 'news',
    href: '/blog/news'
  }
]

const currentCategory = computed(() => {
  const postGroup = route.params.postGroup

  if (typeof postGroup === 'string' && postGroup !== '') {
    return postGroup.toLowerCase()
  }

  // /blog and its later pages (/blog/page/2 ...) are the Featured list
  if (route.path === '/blog' || /^\/blog\/page\/\d+$/.test(route.path)) {
    return 'featured'
  }

  return ''
})

function isActiveBlogCategory(slug) {
  return currentCategory.value === slug
}
</script>