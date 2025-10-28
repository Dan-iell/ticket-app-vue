<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { getSession } from '../lib/session'
import { useTickets } from '../composables/useTickets'

const router = useRouter()
const { tickets, create, update, remove } = useTickets()
const form = reactive({ id: null, title: '', description: '', status: 'open' })

onMounted(() => {
  if (!getSession()) {
    toast.error('Unauthorized — please sign in.')
    router.replace('/auth/login')
  }
})

function reset() { form.id = null; form.title=''; form.description=''; form.status='open' }

function submit(e) {
  e.preventDefault()
  const payload = { title: form.title, description: form.description, status: form.status }
  if (form.id) {
    const res = update(form.id, payload)
    if (!res.ok) { toast.error(Object.values(res.errors)[0]); return }
    toast.success('Ticket updated'); reset()
  } else {
    const res = create(payload)
    if (!res.ok) { toast.error(Object.values(res.errors)[0]); return }
    toast.success('Ticket created'); reset()
  }
}

function edit(t) { form.id=t.id; form.title=t.title; form.description=t.description || ''; form.status=t.status }
function delItem(id) { if (confirm('Delete this ticket?')) { remove(id); toast.info('Ticket deleted') } }

function statusClass(s) {
  if (s === 'open') return 'bg-green-100 text-green-700'
  if (s === 'in_progress') return 'bg-amber-100 text-amber-700'
  return 'bg-gray-200 text-gray-700'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6">
    <header class="max-w-[1440px] mx-auto flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-indigo-700">🎟️ Ticket Manager</h1>
      <button @click="$router.push('/dashboard')" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">← Dashboard</button>
    </header>

    <main class="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-8">
      <form @submit="submit" class="bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 class="text-xl font-semibold">{{ form.id ? 'Edit ticket' : 'Create ticket' }}</h2>

        <input v-model="form.title" type="text" required minlength="3" maxlength="80" placeholder="Title" class="w-full border p-2 rounded-md" />
        <textarea v-model="form.description" placeholder="Description (optional, max 500 chars)" maxlength="500" class="w-full border p-2 rounded-md"></textarea>
        <select v-model="form.status" class="w-full border p-2 rounded-md">
          <option value="open">Open</option>
          <option value="in_progress">In progress</option>
          <option value="closed">Closed</option>
        </select>

        <div class="flex gap-4">
          <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">{{ form.id ? 'Update' : 'Create' }}</button>
          <button v-if="form.id" type="button" @click="reset" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">Cancel</button>
        </div>
      </form>

      <div class="bg-white shadow-md rounded-xl p-6">
        <h2 class="text-xl font-semibold mb-4">Tickets</h2>
        <p v-if="tickets.length === 0" class="text-gray-500 text-center">No tickets yet.</p>
        <div v-else class="space-y-4">
          <div v-for="t in tickets" :key="t.id" class="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <div class="flex justify-between items-start">
              <h3 class="text-lg font-semibold">{{ t.title }}</h3>
              <span :class="['text-sm px-2 py-1 rounded-full font-medium', statusClass(t.status)]">{{ t.status }}</span>
            </div>
            <p v-if="t.description" class="text-gray-600 mt-2">{{ t.description }}</p>
            <div class="mt-4 flex justify-end gap-3">
              <button @click="edit(t)" class="text-indigo-600 hover:underline">Edit</button>
              <button @click="delItem(t.id)" class="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-indigo-600 text-white text-center py-4 mt-12">
      <p>© {{ new Date().getFullYear() }} TicketApp.</p>
    </footer>
  </div>
</template>
