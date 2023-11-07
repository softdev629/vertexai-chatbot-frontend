<script setup lang="ts">
import { ref } from "vue"
import type { Ref } from "vue"

const msg = ref("")
const history: Ref<string[]> = ref([])
const historyRef = ref<HTMLDivElement | null>(null)

const socket = new WebSocket("ws://localhost:8000/chat");

socket.onmessage = (event) => {
    const message = event.data;
    history.value.push(message);
    setTimeout(() => historyRef.value?.scrollTo({ top: historyRef.value.scrollHeight }), 100)
}

function handleSubmit() {
    history.value.push(msg.value)
    historyRef.value?.scrollTo({ top: historyRef.value.scrollHeight })
    socket.send(msg.value)
    msg.value = ""
}

</script>

<template>
    <div class="w-screen h-screen flex justify-center items-center bg-slate-50">
        <div class="w-[800px] h-[700px] bg-white rounded shadow-2xl p-8 flex flex-col gap-4">
            <div class="grow p-4 scroll-smooth overflow-auto" ref="historyRef">
                <div v-for="(item, index) in history" class="flex gap-4"
                    :class="[index % 2 ? 'justify-start' : 'justify-end']">
                    <div class="rounded max-w-[300px] p-4" :class="[index % 2 ? 'bg-blue-300' : 'bg-green-300']">{{ item }}
                    </div>
                </div>
            </div>
            <form @submit.prevent="handleSubmit">
                <div class="flex gap-4 h-10">

                    <input v-model="msg"
                        class="shadow appearance-none border rounded grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Send</button>
                </div>
            </form>

        </div>
    </div>
</template>

<style scoped></style>
