<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="$emit('close')" class="relative z-50">
      <TransitionChild
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/75" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel :class="[themes[theme].boardBg, 'w-full max-w-md rounded-2xl p-6 text-left shadow-xl transition-all backdrop-blur-md']">
              <DialogTitle as="h3" class="text-xl font-bold text-white mb-4">
                {{ $t('settings.data.confirmTitle') }}
              </DialogTitle>

              <div class="mt-2">
                <p class="text-white/70">
                  {{ $t('settings.data.confirmDescription') }}
                </p>
              </div>

              <div class="mt-6 flex gap-4">
                <button
                  @click="$emit('confirm')"
                  class="flex-1 py-2 bg-red-600/50 text-white rounded-lg font-semibold hover:bg-red-700/50 transition-all duration-300"
                >
                  {{ $t('settings.data.confirmButton') }}
                </button>
                <button
                  @click="$emit('close')"
                  class="flex-1 py-2 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  {{ $t('settings.data.cancelButton') }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { themes } from '../config/themes'

defineProps<{
  isOpen: boolean
  theme: string
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>