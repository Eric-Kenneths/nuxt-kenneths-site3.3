<template>
  <div class="relative w-full">
    <button ref="triggerRef" type="button" @click="toggle" class="cursor-pointer text-left" aria-haspopup="menu"
      :aria-expanded="visible ? 'true' : 'false'">
      <slot name="trigger" />
    </button>

    <Teleport v-if="isMounted" to="body">
      <nav v-show="visible" ref="menuRef" class="popup-menu bg-primary-100" :style="menuStyle"
        aria-label="Popup Menu Links" @mousedown.stop>
        <slot name="links" />
      </nav>
    </Teleport>
  </div>
</template>

<script setup>
const visible = ref(false)
const isMounted = ref(false)
const triggerRef = ref(null)
const menuRef = ref(null)

const menuStyle = ref({
  position: 'absolute',
  left: '0px',
  top: '0px',
  minWidth: '180px',
  zIndex: 3000
})

function showMenuBelowTrigger() {
  nextTick(() => {
    const trigger = triggerRef.value
    const menu = menuRef.value

    if (trigger && menu) {
      const rect = trigger.getBoundingClientRect()
      menuStyle.value = {
        ...menuStyle.value,
        left: `${rect.left + window.scrollX}px`,
        top: `${rect.bottom + window.scrollY}px`
      }
    }
  })
}

function toggle() {
  visible.value = !visible.value
  if (visible.value) showMenuBelowTrigger()
}

function handleDocumentClick(e) {
  if (
    menuRef.value &&
    triggerRef.value &&
    !menuRef.value.contains(e.target) &&
    !triggerRef.value.contains(e.target)
  ) {
    visible.value = false
  }
}

function handleWindowEvent() {
  visible.value = false
}

onMounted(() => {
  isMounted.value = true
  document.addEventListener('mousedown', handleDocumentClick)
  window.addEventListener('scroll', handleWindowEvent)
  window.addEventListener('resize', handleWindowEvent)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleDocumentClick)
  window.removeEventListener('scroll', handleWindowEvent)
  window.removeEventListener('resize', handleWindowEvent)
})
</script>

<style scoped>
.popup-menu {
  margin-top: 8px;
  background: #f4f0ed !important;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.14);
  border-radius: 6px;
  padding: 10px 0px;
}

.popup-menu a {
  display: block;
  padding: 10px 24px;
  color: #262613;
  text-decoration: none;
  transition: background 0.09s;
}

.popup-menu a:hover {
  background: #f4f0ed;
}

.popup-menu::before {
  content: "";
  position: absolute;
  top: -7px;
  left: 24px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #f4f0ed;
  z-index: 3001;
}
</style>