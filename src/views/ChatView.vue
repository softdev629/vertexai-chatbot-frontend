<script setup lang="ts">
import { createToast } from "mosha-vue-toastify";
import { ref, nextTick } from "vue"
import type { Ref } from "vue"

import Connecting from "@/components/Connecting.vue";

const msg = ref("")
const history: Ref<string[]> = ref([])
const historyRef = ref<HTMLDivElement | null>(null)
const isConnected = ref(false);
const isWaiting = ref(false);

const socket = new WebSocket(`${import.meta.env.VITE_APP_WS_SERVER_ENDPOINT}`);

socket.onmessage = async (event) => {
    isWaiting.value = false;
    const message = event.data;
    history.value.push(message);
    await nextTick();
    historyRef.value?.scrollTo({ top: historyRef.value.scrollHeight });
}

socket.onopen = () => {
    isConnected.value = true;
    createToast("Connected to server successfully!")
}

async function handleSubmit() {
    history.value.push(msg.value)
    isWaiting.value = true;
    await nextTick();
    historyRef.value?.scrollTo({ top: historyRef.value.scrollHeight })
    socket.send(msg.value)
    msg.value = ""
}

</script>

<template>
    <Connecting :is-connected="isConnected" />
    <div class="w-screen h-screen flex justify-center items-center bg-slate-50">
        <div class="w-[800px] h-[700px] bg-white rounded shadow-2xl p-8 flex flex-col gap-4">
            <div class="grow p-4 scroll-smooth overflow-auto" ref="historyRef">
                <div v-for="(item, index) in history" class="flex gap-4"
                    :class="[index % 2 ? 'justify-start' : 'justify-end']">
                    <div class="rounded max-w-[300px] p-4" :class="[index % 2 ? 'bg-blue-300' : 'bg-green-300']">{{ item }}
                    </div>
                </div>
                <div v-if="isWaiting" class="bg-blue-300 max-w-[100px] h-[50px] rounded flex justify-center items-center">
                    <div class="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
            <form @submit.prevent="handleSubmit">
                <div class="flex gap-4 h-10">
                    <input v-model="msg" :disabled="!isConnected"
                        class="shadow appearance-none border rounded grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    <button type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Send</button>
                </div>
            </form>

        </div>
    </div>
</template>

<style scoped>
.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
}

.lds-ellipsis div {
    position: absolute;
    top: 16px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
    left: 4px;
    animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
    left: 4px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
    left: 16px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
    left: 28px;
    animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }

    100% {
        transform: scale(0);
    }
}

@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(12px, 0);
    }
}
</style>
