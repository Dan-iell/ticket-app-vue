<script setup>
  import { onMounted, ref } from 'vue'
  import { useRouter, RouterLink } from 'vue-router'
  import { toast } from 'vue3-toastify'
  import { getSession, clearSession, TICKETS_KEY } from '../lib/session'

  const router = useRouter()
  const user = ref(null)
  const tickets = ref([])

  onMounted(() => {
    const session = getSession()
    if (!session) {
      toast.error('Your session has ended — please sign in.')
      router.replace('/auth/login')
      return
    }
    user.value = session
    tickets.value = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]')
  })

  function logout() {
    clearSession()
    toast.info('You’ve been signed out.')
    setTimeout(() => router.push('/'), 600)
  }

  const total = () => tickets.value.length
  const openCount = () => tickets.value.filter(t => t.status === 'open').length
  const closedCount = () => tickets.value.filter(t => t.status === 'closed').length
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
    <header class="bg-white shadow-md">
      <div class="max-w-[1440px] mx-auto flex justify-between items-center p-6">
        <h1 class="text-2xl font-bold text-indigo-700">🎟️ TicketApp</h1>
        <div class="flex items-center gap-4">
          <RouterLink to="/tickets" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition">Tickets</RouterLink>
          <button @click="logout" class="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition">Sign out</button>
        </div>
      </div>
    </header>

    <main class="flex-1 flex flex-col items-center justify-start py-12 px-6">
      <div class="max-w-[1440px] w-full">
        <h2 class="text-3xl font-bold text-gray-800 mb-8">Hi, {{ user?.name || 'there' }} 👋</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white shadow-md rounded-xl p-6 border-t-4 border-gray-500 text-center">
            <h3 class="text-xl font-semibold text-gray-700">Resolved</h3>
            <p class="text-3xl font-bold text-gray-700 mt-2">{{ closedCount() }}</p>
          </div>
          <div class="bg-white shadow-md rounded-xl p-6 border-t-4 border-green-500 text-center">
            <h3 class="text-xl font-semibold text-gray-700">Open</h3>
            <p class="text-3xl font-bold text-green-600 mt-2">{{ openCount() }}</p>
          </div>
          <div class="bg-white shadow-md rounded-xl p-6 border-t-4 border-indigo-600 text-center">
            <h3 class="text-xl font-semibold text-gray-700">Total</h3>
            <p class="text-3xl font-bold text-indigo-600 mt-2">{{ total() }}</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-indigo-600 text-white text-center py-4 mt-12">
      <p>© {{ new Date().getFullYear() }} TicketApp.</p>
    </footer>
  </div>
</template>
