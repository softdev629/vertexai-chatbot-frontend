<script setup lang="ts">

const props = defineProps({ isConnected: Boolean })
</script>

<template>
    <div v-if="!props.isConnected" class="absolute">
        <div class="w-screen h-screen flex justify-center items-center bg-[#00000088]">
            <span class="loader"></span>
        </div>
    </div>
</template>

<style scoped>
.loader {
    font-size: 48px;
    font-weight: bold;
    letter-spacing: 2px;
    font-family: Arial, Helvetica, sans-serif;
    color: #fff;
    animation: smokeOut 1s ease-in-out infinite alternate;
    text-shadow: 0 0 1px white;
}

.loader:before {
    content: "Connecting";
}

@keyframes smokeOut {
    100% {
        opacity: 0.08;
        filter: blur(5px);
        letter-spacing: 4px;
    }
}
</style>