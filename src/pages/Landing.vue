<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white text-gray-800 overflow-hidden">
    <header class="max-w-[1440px] w-full mx-auto flex justify-between items-center p-6 relative z-20">
      <h1 class="text-2xl font-bold text-indigo-700 flex items-center gap-2">
        🎟️ <span>TicketApp</span>
      </h1>
      <nav class="space-x-4">
        <RouterLink
          to="/auth/login"
          class="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition-all duration-300"
        >
          Sign in
        </RouterLink>
        <RouterLink
          to="/auth/signup"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300"
        >
          Get started
        </RouterLink>
      </nav>
    </header>

    <section class="relative flex flex-col items-center text-center justify-center flex-1 px-6 py-12 overflow-hidden">
      <div class="absolute top-16 left-8 w-28 h-28 bg-indigo-200 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
      <div class="absolute bottom-28 right-8 w-44 h-44 bg-indigo-100 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

      <div class="max-w-[1440px] mx-auto z-20 relative">
        <h2 class="text-4xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
          Keep work flowing,<br />not festering
        </h2>
        <p class="max-w-xl mx-auto text-lg text-gray-600 mb-8 leading-relaxed">
          Open, track, and resolve tickets effortlessly. A clean workflow for busy teams who value time.
        </p>

        <div class="flex justify-center gap-4">
          <RouterLink
            to="/auth/login"
            class="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 hover:shadow-md transition-all duration-300"
          >
            Sign in
          </RouterLink>
          <RouterLink
            to="/auth/signup"
            class="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-md font-medium hover:bg-indigo-600 hover:text-white hover:shadow-md transition-all duration-300"
          >
            Get started
          </RouterLink>
        </div>
      </div>

      <svg
        class="absolute bottom-0 left-0 w-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#c7d2fe"
          fill-opacity="1"
          d="M0,192L80,181.3C160,171,320,149,480,165.3C640,181,800,235,960,234.7C1120,235,1280,181,1360,154.7L1440,128L1440,320L0,320Z"
        ></path>
      </svg>
    </section>

    <footer class="bg-indigo-600 text-white text-center py-4 mt-auto relative z-20">
      <p class="text-sm">© {{ new Date().getFullYear() }} TicketApp.</p>
    </footer>
  </div>
</template>
