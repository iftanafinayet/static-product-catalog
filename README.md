# Static Product Catalog — UKM Kemasan

Small static website demonstrating a product catalog and product detail pages for a hypothetical packaging business.


## ⚙️ Setup Instructions
1. Clone this repository:
   ```bash
   git clone https://github.com/iftanafinayet/static-product-catalog.git

## Features
- Home page with hero, slider, highlighted products and CTA
- Products listing page with product cards
- Product detail page with image gallery and product metadata
- About and Contact pages
- Data-driven product detail: `assets/data/products.json`
- Lightweight JS for slider and product gallery
- Responsive layout and CSS variables for theme colors

## Quick start (preview locally)
Requires Python 3 (for the simple static server). From the project root run:

```bash
python3 -m http.server 8000
```

Then open in your browser:
- http://localhost:8000/index.html
- http://localhost:8000/products.html
- Example product detail: http://localhost:8000/product-detail.html?id=flat-bottom

## File map
- index.html — homepage
- products.html — product listing
- product-detail.html — product details (data-driven)
- about.html, contact.html — auxiliary pages
- assets/
	- css/ — site CSS files (`index.css`, `products.css`, `product-detail.css`, `about.css`, `contact.css`)
	- js/ — small JS modules (`slider.js`, `product-detail.js`)
	- img/ — image assets referenced by pages
	- data/products.json — product catalog used by `product-detail.js`

## How product detail works
The product detail page reads a query parameter `id` (e.g. `?id=flat-bottom`). The file `assets/js/product-detail.js` fetches `assets/data/products.json`, finds the product with that id, and populates the gallery, title, price, and specification list.

If a product id is missing or not found, the page falls back to the first product in the JSON.

## Development notes & suggestions
- To make the entire product card clickable, either wrap the `.product-card` in an anchor tag linking to `product-detail.html?id=<id>` or add a small click handler that navigates to the detail URL.
- Consider adding cache headers or preloading images for the gallery to improve perceived performance.
- If you plan to expand the catalog, an optional build step could transform a single `products.json` into separate static `product-detail-<id>.html` files for SEO.

## License
This project is example/demo code and may be reused freely for learning and prototyping.
update
