# Image Background Removal Guide

This guide lists all images used in the project and instructions for removing their backgrounds.

## Images That Need Background Removal

### 1. **Koi Fish Images** (Need transparent backgrounds)
- **Coyfish.jpeg** - Main koi fish image
- **Coyfish2.jpeg** - Second koi fish image variant

**Current Status:** JPEG format (may have backgrounds)

**Action Required:** 
- Remove backgrounds using one of the tools below
- Convert to PNG format to preserve transparency
- Replace existing files with transparent versions

### 2. **Lily Pad Images** (Need transparent backgrounds)
- **lilypad.png** - May already have transparency (PNG format)
- **lilypad2.jpeg** - Needs background removal

**Current Status:** Mixed formats

**Action Required:**
- Verify `lilypad.png` has transparent background
- Remove background from `lilypad2.jpeg` and convert to PNG
- Replace `lilypad2.jpeg` with `lilypad2.png`

### 3. **Logo Image** (May need transparent background)
- **AGC logo.jpg** - Logo image

**Current Status:** JPEG format (may have white/solid background)

**Action Required:**
- Remove background if it has a solid color background
- Convert to PNG format if background removed
- Consider keeping as JPG if logo is meant to have a background

## Recommended Tools for Background Removal

### Option 1: Adobe Express (Free)
1. Visit: https://www.adobe.com/express/feature/ai/image/remove-background
2. Upload your image
3. Background is removed automatically
4. Download as PNG

### Option 2: remove.bg (Free with limitations)
1. Visit: https://www.remove.bg/
2. Upload image
3. Download transparent PNG

### Option 3: Fotor (Free)
1. Visit: https://www.fotor.com/features/remove-product-background/
2. Upload image
3. Download transparent version

## After Removing Backgrounds

1. **Save all images as PNG format** to preserve transparency
2. **Rename files if needed:**
   - `Coyfish.jpeg` → `Coyfish.png`
   - `Coyfish2.jpeg` → `Coyfish2.png`
   - `lilypad2.jpeg` → `lilypad2.png`
   - `AGC logo.jpg` → `AGC logo.png` (if background removed)

3. **Update HTML files** if filenames change:
   - `index.html`
   - `about-us.html` (if images are used)
   - `events.html` (if images are used)

## CSS Already Configured

The CSS files have been updated to properly support transparent backgrounds:
- ✅ `koi-fish.css` - Supports transparent koi images
- ✅ `lotus-pond.css` - Supports transparent lily pad images
- ✅ All images use `background: transparent` and `mix-blend-mode: normal`

## Testing

After updating images:
1. Open the website in a browser
2. Check that images blend seamlessly with the water/pond background
3. Verify no white/solid backgrounds appear behind images
4. Test on different background colors to ensure transparency works

## Current Image Usage

### index.html
- Logo: `AGC logo.jpg` (navbar and footer)
- Koi Fish: `Coyfish.jpeg`, `Coyfish2.jpeg` (hero, cards, quiz)
- Lily Pads: `lilypad.png`, `lilypad2.jpeg` (hero section)

All images are currently configured to work with transparent backgrounds once backgrounds are removed.

