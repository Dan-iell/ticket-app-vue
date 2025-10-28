<script setup>
import { reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { toast } from 'vue3-toastify'
import { USERS_KEY, setSession } from '../lib/session'

const router = useRouter()
const form = reactive({ email: '', password: '' })

function submit(e) {
  e.preventDefault()
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  const user = users.find(u => u.email === form.email && u.password === form.password)
  if (user) {
    setSession(user)
    toast.success('Signed in. Welcome back 👋')
    setTimeout(() => router.push('/dashboard'), 700)
  } else {
    toast.error('Check your email or password and try again.')
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-indigo-50 to-white p-6">
    <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-indigo-100">
      <h2 class="text-3xl font-bold text-center text-indigo-700 mb-6">Sign in</h2>
      <p class="text-center text-gray-500 mb-8">Access your workspace</p>

      <form @submit="submit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input v-model="form.email" type="email" required placeholder="you@example.com" class="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-3 rounded-md outline-none" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input v-model="form.password" type="password" required placeholder="••••••••" class="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-3 rounded-md outline-none" />
        </div>
        <button type="submit" class="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition-all duration-300">Sign in</button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        New here?
        <RouterLink to="/auth/signup" class="text-indigo-600 font-medium hover:underline">Create account</RouterLink>
      </p>
    </div>
  </div>
</template>
