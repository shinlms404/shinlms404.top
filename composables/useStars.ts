import { ref, onMounted } from "vue";

export const useStars = () => {
  const starShadowBefore = ref("");
  const starShadowAfter = ref("");

  const generateStarShadows = (count: number) => {
    const generateShadow = (count: number) => {
      return Array.from({ length: count }, () => {
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);
        return `${x}vw ${y}vh 0 currentColor`;
      }).join(", ");
    };

    starShadowBefore.value = generateShadow(count);
    starShadowAfter.value = generateShadow(count);
  };

  onMounted(() => {
    generateStarShadows(30);
  });

  return {
    starShadowBefore,
    starShadowAfter,
    generateStarShadows
  };
};
