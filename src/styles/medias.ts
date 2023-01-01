export const sizes = [200, 400, 800, 1200, 1600, 2000];
const mqs = sizes.map(s=>`@media(max-width: ${s}px)`)

export default mqs;