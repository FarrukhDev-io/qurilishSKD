<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SKDqurilish / UrbanPulse Samarqand UI Rules (Startup Base Light Mode)

1. **Strict Light Mode Only**:
   - Backgrounds: `#F8FAFC` (Slate-50) body background, `#FFFFFF` pure white card containers.
   - Text: `#0F172A` (Slate-900) headings, `#334155` (Slate-700) body text.
   - Dark mode is disabled across all pages and components.

2. **Vibrant Lime Green Accent (`#82C91E`)**:
   - Primary Buttons: `bg-[#82C91E] hover:bg-[#65A30D] text-white font-semibold rounded-full px-6 py-2.5 shadow-sm`
   - Card Titles: `text-[#82C91E] font-bold text-lg`
   - H1 Text Highlights: `<span class="bg-[#95E616] text-[#0F172A] px-3 py-1 rounded-md">HIGHLIGHTED TEXT</span>`

3. **Super Rounded Corners**:
   - Main Section Containers: `rounded-3xl` (24px - 32px)
   - Cards & Grids: `rounded-2xl` (16px)
   - Buttons & Badges: Full pill shape (`rounded-full`)
