<template>
  <div class="w-full h-full overflow-auto">
    <div
      class="h-full bg-[#0a1120] py-6 flex items-center flex-wrap justify-center relative overflow-hidden sm:py-12"
    >
      <div
        class="absolute inset-0 bg-[url(https://snippets.alexandru.so/beams.png)] bg-cover bg-center bg-fixed"
      ></div>
      <div class="absolute inset-0 bg-[url(https://snippets.alexandru.so/grid.svg)] bg-fixed"></div>

      <div
        class="bg-gray-800/40 backdrop-blur ring-1 ring-inset ring-gray-500/20 h-28 w-164 mx-auto rounded-lg flex cursor-context-menu"
      >
        <div class="m-auto text-gray-200">
          <!-- Animation Snippet -->
          <div
            class="relative after:absolute after:bg-gray-200 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-left after:scale-x-100 hover:after:origin-bottom-right hover:after:scale-x-0 after:transition-transform after:ease-in-out after:duration-300"
          >Hover over me</div>
        </div>
      </div>
      <div
        class="bg-gray-800/40 backdrop-blur ring-1 ring-inset ring-gray-500/20 h-28 w-164 mx-auto rounded-lg flex cursor-context-menu"
      >
        <div class="m-auto text-gray-200">
          <!-- Animation Snippet -->
          <div
            class="relative after:absolute after:bg-gray-200 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:translate-y-1 after:opacity-0 hover:after:translate-y-0 hover:after:opacity-100 after:transition after:ease-in-out after:duration-200"
          >Hover over me</div>
        </div>
      </div>

      <div
        class="bg-gray-800/40 backdrop-blur ring-1 ring-inset ring-gray-500/20 h-28 w-164 mx-auto rounded-lg flex cursor-context-menu"
      >
        <div class="m-auto text-gray-200">
          <!-- Animation Snippet -->
          <div
            class="relative after:absolute after:bg-gray-200 after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300"
          >Hover over me</div>
        </div>
      </div>

      <div
        class="bg-gray-800/40 backdrop-blur ring-1 ring-inset ring-gray-500/20 h-36 w-164 mx-auto rounded-lg flex cursor-context-menu"
      >
        <div class="m-auto text-gray-200">
          <!-- Animation Snippet -->
          <div
            class="underline underline-offset-[3px] hover:no-underline hover:bg-[url('https://snippets.alexandru.so/squiggle.svg')]"
          >Hover over me</div>
        </div>
      </div>

      <div class="m-auto text-gray-200">
        <!-- Animation Snippet -->
        <div
          class="group [transform:translateZ(0)] px-6 py-3 rounded-lg bg-gray-200 overflow-hidden relative before:absolute before:bg-yellow-400 before:bottom-0 before:left-0 before:h-full before:w-full before:-translate-x-full hover:before:translate-x-0 before:transition before:ease-in-out before:duration-500"
        >
          <span
            class="relative z-0 text-black group-hover:text-gray-200 transition ease-in-out duration-500"
          >Hover over me</span>
        </div>
      </div>

      <div class="m-auto text-gray-200">
        <!-- Animation Snippet -->
        <div
          class="group [transform:translateZ(0)] px-6 py-3 rounded-lg bg-gray-200 overflow-hidden relative before:absolute before:bg-red-400 before:bottom-0 before:left-0 before:h-full before:w-full before:origin-[100%_100%] before:scale-x-0 hover:before:origin-[0_0] hover:before:scale-x-100 before:transition before:ease-in-out before:duration-500"
        >
          <span
            class="relative z-0 text-black group-hover:text-gray-200 transition ease-in-out duration-500"
          >Hover over me</span>
        </div>
      </div>

      <div class="m-auto text-gray-200">
        <!-- Animation Snippet -->
        <div
          class="group [transform:translateZ(0)] px-6 py-3 rounded-lg overflow-hidden bg-gray-200 relative before:absolute before:bg-red-600 before:top-1/2 before:left-1/2 before:h-32 before:w-50 before:-translate-y-1/2 before:-translate-x-1/2 before:rounded-full before:scale-[0] before:opacity-0 hover:before:scale-[6] hover:before:opacity-100 before:transition before:ease-in-out before:duration-500"
        >
          <span
            class="relative z-0 text-black group-hover:text-gray-200 transition ease-in-out duration-500"
          >Hover over me</span>
        </div>
      </div>

      <div
        class="bg-gray-800/40 backdrop-blur ring-1 ring-inset ring-gray-500/20 h-28 w-164 mx-auto rounded-lg flex justify-center cursor-context-menu"
      >
        <svg
          class="animate-spin h-24 w-24 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      <div
        class="bg-gray-800/40 backdrop-blur ring-1 ring-inset ring-gray-500/20 h-28 w-164 mx-auto rounded-lg flex justify-center items-center cursor-context-menu"
      >
        <div class="flex h-18 w-18 absolute top-9">
          <span
            class="animate-ping absolute h-18 w-18 -top-4 -left-4 rounded-full bg-gray-200 opacity-75"
          ></span>
          <span class="relative rounded-full h-18 w-18 -top-4 -left-4 bg-gray-200"></span>
        </div>
      </div>

      <div
        class="bg-gray-800/40 backdrop-blur ring-1 ring-inset ring-gray-500/20 h-28 w-164 mx-auto rounded-lg flex cursor-context-menu"
      >
        <div class="m-auto text-gray-200">
          <!-- Animation Snippet -->
          <div
            class="animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#e2e8f0,45%,#1e293b,55%,#e2e8f0)] bg-[length:250%_100%]"
          >Text Shimmer Effect</div>
        </div>
      </div>

      <div
        class="bg-gray-800/40 backdrop-blur ring-1 ring-inset ring-gray-500/20 h-28 w-164 mx-auto rounded-lg flex cursor-context-menu"
      >
        <div class="m-auto text-gray-200">
          <!-- Animation Snippet -->
          <div>
            <span class="w-12 h-12 ml-2 rounded-full bg-gray-200 inline-block animate-flash"></span>
            <span
              class="w-12 h-12 ml-2 rounded-full bg-gray-200 inline-block animate-flash [animation-delay:0.2s]"
            ></span>
            <span
              class="w-12 h-12 ml-2 rounded-full bg-gray-200 inline-block animate-flash [animation-delay:0.4s]"
            ></span>
          </div>
        </div>
      </div>

      <div
        class="bg-gray-800/40 backdrop-blur ring-1 ring-inset ring-gray-500/20 h-28 w-164 mx-auto rounded-lg flex cursor-context-menu"
      >
        <div class="m-auto text-gray-200">
          <!-- Animation Snippet -->
          <div
            class="animate-shimmer bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-[length:400%_100%] h-32 w-164 rounded-lg"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() { },
})
</script>
