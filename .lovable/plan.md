

## Implementation Plan: Skin Type Result → Products Page Flow

### Step 1: Create the Products Page Component
Create a new page `src/pages/Products.tsx` that:
- Accepts skin type as a URL parameter (e.g., `/products/dry`, `/products/oily`)
- Displays product recommendations specific to that skin type
- Uses the same elegant design system (Cormorant Garamond headings, Outfit body, color palette E1DBD0, 7AA6B3, 282B2B, F2F1ED)
- Includes floating decorative elements and visual effects consistent with the quiz
- Has a "Back to Results" or "Take Quiz Again" navigation option

### Step 2: Define Product Data Structure
Create sample product data for each skin type with:
- Product name, description, category (cleanser, moisturizer, serum, etc.)
- Key ingredients beneficial for that skin type
- Product images (placeholder or real)
- Price (optional)

**Products by skin type:**
- **Dry**: Hydrating cleanser, rich moisturizer, hyaluronic acid serum, nourishing oil
- **Oily**: Gel cleanser, oil-free moisturizer, salicylic acid treatment, mattifying primer
- **Combination**: Balancing cleanser, gel-cream moisturizer, targeted treatments
- **Normal**: Gentle cleanser, balanced moisturizer, antioxidant serum
- **Sensitive**: Fragrance-free cleanser, calming moisturizer, soothing serum

### Step 3: Update the Result Screen
Modify the result screen in `SkinQuiz.tsx` to:
- Keep showing the skin type and description
- Replace or add a prominent "View Recommended Products" button
- This button navigates to `/products/{skin-type}` using React Router

### Step 4: Add Route Configuration
Update `src/App.tsx` to:
- Add a new route: `<Route path="/products/:skinType" element={<Products />} />`
- Import the Products page component

### Step 5: Smooth Navigation Transition
- Use React Router's `useNavigate` hook for programmatic navigation
- Optionally add a brief delay after showing results before enabling the CTA button (creates anticipation)
- Maintain visual consistency during page transition

### Visual Flow Diagram:
```
[Initial Screen] 
     ↓
[Yes] → [Select Skin Type] → [Result + CTA Button] → [Products Page]
[No]  → [Quiz Questions] → [Result + CTA Button] → [Products Page]
```

### File Changes:
1. **Create**: `src/pages/Products.tsx` - New products page with skin-type specific recommendations
2. **Modify**: `src/components/SkinQuiz.tsx` - Add navigation button on result screen
3. **Modify**: `src/App.tsx` - Add new route for products page

