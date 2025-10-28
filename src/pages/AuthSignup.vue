<script setup>
import { reactive } from "vue";
import { useRouter, RouterLink } from "vue-router";
import { toast } from "vue3-toastify";
import { USERS_KEY } from "../lib/session";

const router = useRouter();
const form = reactive({ name: "", email: "", password: "" });

function submit(e) {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  if (users.some((u) => u.email === form.email)) {
    toast.error("That email is already registered.");
    return;
  }
  users.push({ ...form });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  toast.success("Account created. You can sign in now.");
  setTimeout(() => router.push("/auth/login"), 700);
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-indigo-50 to-white p-6"
  >
    <div
      class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-indigo-100"
    >
      <h2 class="text-3xl font-bold text-center text-indigo-700 mb-6">
        Create account
      </h2>
      <p class="text-center text-gray-500 mb-8">Start managing your tickets</p>

      <form @submit="submit" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Full name</label
          >
          <input
            v-model="form.name"
            type="text"
            required
            minlength="2"
            placeholder="Ada Lovelace"
            class="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-3 rounded-md outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="you@example.com"
            class="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-3 rounded-md outline-none"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <input
            v-model="form.password"
            type="password"
            required
            minlength="6"
            placeholder="••••••••"
            class="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 p-3 rounded-md outline-none"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition-all duration-300"
        >
          Create account
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Already registered?
        <RouterLink
          to="/auth/login"
          class="text-indigo-600 font-medium hover:underline"
          >Sign in</RouterLink
        >
      </p>
    </div>
  </div>
</template>
