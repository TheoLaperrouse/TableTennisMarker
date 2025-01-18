<template>
    <div class="mx-auto max-w-md rounded-lg bg-red-700 p-4 text-white shadow-lg">
        <div class="flex flex-col gap-2">
            <div
                v-for="(player, index) in table.players"
                :key="index"
                class="flex items-center justify-between rounded-lg bg-black/50 px-4 py-2"
            >
                <div class="flex items-center gap-2">
                    <span class="mr-3 font-extrabold">{{ player.name }}</span>
                </div>
                <div class="flex items-center gap-4">
                    <div class="flex h-5 w-5 items-center justify-center rounded bg-blue-700 text-center font-bold">
                        {{ player.sets }}
                    </div>
                    <span class="font-bold">{{ player.points }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    table: {
        type: Object,
        required: true,
        default: () => ({}),
    },
    teams: {
        type: Object,
        required: true,
        default: () => ({}),
    },
});
</script>

<style scoped></style>
