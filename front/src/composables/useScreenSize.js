import { computed, onMounted, onUnmounted, ref } from 'vue';

export const useScreenSize = () => {
    let windowWidth = ref(window.innerWidth);
    let windowHeight = ref(window.innerHeight);

    const onSizeChange = () => {
        windowWidth.value = window.innerWidth;
        windowHeight.value = window.innerHeight;
    };

    onMounted(() => window.addEventListener('resize', onSizeChange));
    onUnmounted(() => window.removeEventListener('resize', onSizeChange));

    const width = computed(() => windowWidth.value);
    const height = computed(() => windowHeight.value);
    const isPortrait = computed(() => height.value > width.value);

    return { isPortrait };
};
