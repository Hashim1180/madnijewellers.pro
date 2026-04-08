// ══════════════════════════════════════════════════════════════
//  MADNI JEWELLERS — SERVER v2.0
//  Rolex × Cinematic × Mughal Luxury
//  Express + Claude AI Sales Manager + 40 Products + Live Rates
//  Gujrat, Pakistan · +92 300 6262886
//  Supabase: brzztousmxsbwuyfdovm.supabase.co
// ══════════════════════════════════════════════════════════════

require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const rateLimit = require('express-rate-limit');
const Anthropic  = require('@anthropic-ai/sdk');

const app  = express();
const PORT = process.env.PORT || 3000;
const WA   = '923006262886';
const SUPA = 'https://brzztousmxsbwuyfdovm.supabase.co/storage/v1/object/public/madni%20jewellers.pro';

// ── ANTHROPIC CLIENT ──
const ai = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── MIDDLEWARE ──
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*', methods: ['GET','POST','OPTIONS'] }));
app.use(express.json({ limit: '2mb' }));
app.use(express.static('public'));

// ── RATE LIMITING ──
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again shortly.' },
});
app.use('/api/', limiter);

// ── CHAT SPECIFIC LIMITER ──
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  message: { error: 'Chat rate limit reached. Please wait a moment.' },
});

// ══════════════════════════════════════════════════
//  LIVE GOLD & SILVER RATES
//  Source: Pakistan Sarafa Market — 21 March 2026
// ══════════════════════════════════════════════════
const RATES = {
  gold: {
    '24K': { perGram: 44839, perTola: 478903, per10g: 448390 },
    '22K': { perGram: 41099, perTola: 438328, per10g: 410990 },
    '21K': { perGram: 39234, perTola: 418461, per10g: 392340 },
    '18K': { perGram: 33678, perTola: 358742, per10g: 336780 },
  },
  silver: {
    perGram: 622,
    perTola: 7256,
    per10g:  6220,
  },
  diamond: {
    SI1:  { perCarat: 285000 },
    VS1:  { perCarat: 420000 },
    VVS1: { perCarat: 650000 },
    IF:   { perCarat: 950000 },
  },
  lastUpdated: '21 March 2026',
  source:      'Pakistan Sarafa Market, Lahore',
  currency:    'PKR',
};

// ══════════════════════════════════════════════════
//  PRODUCTS — 40 ITEMS
//  Prices auto-calculated from live gold rates
// ══════════════════════════════════════════════════
const IMGS = {
  i1:  `${SUPA}/0a0a9d55-c7d8-4aad-8f6e-6a78c4dc2d89-473.jpeg`,
  i2:  `${SUPA}/images%20(1).jpeg`,
  i3:  `${SUPA}/images%20(3).jpeg`,
  i5:  `${SUPA}/images%20(5).jpeg`,
  i6:  `${SUPA}/images%20(6).jpeg`,
  i7:  `${SUPA}/images%20(7).jpeg`,
  i8:  `${SUPA}/images%20(8).jpeg`,
  i9:  `${SUPA}/images%20(9).jpeg`,
  i10: `${SUPA}/images%20(10).jpeg`,
  webp:`${SUPA}/RBW-AU-265822-9.53G.webp`,
};

const g22 = RATES.gold['22K'].perGram;
const g21 = RATES.gold['21K'].perGram;
const g18 = RATES.gold['18K'].perGram;
const g24 = RATES.gold['24K'].perGram;

const PRODUCTS = [

  // ── GOLD COLLECTION ── 12 items
  {
    id: 1, cat: 'GOLD', sub: 'Rings',
    name: 'Royal Signet Ring',
    metal: '22K Gold', weight: '8.5g',
    price: Math.round(8.5 * g22),
    desc: 'Hand-engraved royal signet in 22K gold. Timeless masculinity. Gujrat master craftsmanship.',
    badge: 'BESTSELLER', rating: 4.9, reviews: 214,
    img: IMGS.i1, featured: true,
  },
  {
    id: 2, cat: 'GOLD', sub: 'Necklaces',
    name: 'Maharani Chain Necklace',
    metal: '22K Gold', weight: '18g',
    price: Math.round(18 * g22),
    desc: 'Classic flat link necklace in 22K gold. 18 inches. Lobster clasp. Daily elegance.',
    badge: 'NEW', rating: 4.8, reviews: 178,
    img: IMGS.i2, featured: true,
  },
  {
    id: 3, cat: 'GOLD', sub: 'Bangles',
    name: 'Classic Gold Bangle Set',
    metal: '22K Gold', weight: '25g',
    price: Math.round(25 * g22),
    desc: 'Set of 4 classic gold bangles. 22K hallmarked. Perfect for everyday wear.',
    badge: null, rating: 4.7, reviews: 312,
    img: IMGS.i3, featured: false,
  },
  {
    id: 4, cat: 'GOLD', sub: 'Earrings',
    name: 'Jhumka Drop Earrings',
    metal: '22K Gold', weight: '6g',
    price: Math.round(6 * g22),
    desc: 'Traditional jhumka with intricate filigree work. 22K gold. Hook fitting.',
    badge: 'HOT', rating: 4.9, reviews: 289,
    img: IMGS.i5, featured: true,
  },
  {
    id: 5, cat: 'GOLD', sub: 'Chains',
    name: 'Franco Link Chain 24"',
    metal: '22K Gold', weight: '22g',
    price: Math.round(22 * g22),
    desc: 'Italian-style franco link. 22K gold. 24 inches. Heavy luxury feel.',
    badge: 'PREMIUM', rating: 5.0, reviews: 96,
    img: IMGS.i6, featured: false,
  },
  {
    id: 6, cat: 'GOLD', sub: 'Rings',
    name: 'Floral Cocktail Ring',
    metal: '21K Gold', weight: '7g',
    price: Math.round(7 * g21),
    desc: 'Delicate floral pattern with micro-set stones. 21K. Statement elegance.',
    badge: null, rating: 4.8, reviews: 143,
    img: IMGS.i7, featured: false,
  },
  {
    id: 7, cat: 'GOLD', sub: 'Necklaces',
    name: 'Layered Choker Set',
    metal: '18K Gold', weight: '14g',
    price: Math.round(14 * g18),
    desc: 'Three-layer modern choker in 18K gold. Contemporary luxury.',
    badge: 'NEW', rating: 4.7, reviews: 167,
    img: IMGS.i8, featured: false,
  },
  {
    id: 8, cat: 'GOLD', sub: 'Bangles',
    name: 'Kundan Kada Bangle',
    metal: '22K Gold', weight: '35g',
    price: Math.round(35 * g22),
    desc: 'Heavy kundan-set kada. Bridal quality. 22K gold with meenakari interior.',
    badge: 'PREMIUM', rating: 5.0, reviews: 78,
    img: IMGS.i9, featured: true,
  },
  {
    id: 9, cat: 'GOLD', sub: 'Earrings',
    name: 'Pure Gold Stud Earrings',
    metal: '24K Gold', weight: '2g',
    price: Math.round(2 * g24),
    desc: 'Pure 24K gold studs. Minimalist. Investment-grade purity.',
    badge: 'VALUE', rating: 4.9, reviews: 421,
    img: IMGS.i10, featured: false,
  },
  {
    id: 10, cat: 'GOLD', sub: 'Rings',
    name: 'Solitaire Band Ring',
    metal: '18K Gold', weight: '5g',
    price: Math.round(5 * g18),
    desc: 'Clean solitaire band 18K. Perfect for stacking. Modern minimalism.',
    badge: null, rating: 4.8, reviews: 234,
    img: IMGS.webp, featured: false,
  },
  {
    id: 11, cat: 'GOLD', sub: 'Sets',
    name: 'Gold Necklace & Earring Set',
    metal: '22K Gold', weight: '28g',
    price: Math.round(28 * g22),
    desc: 'Matching necklace and drop earring set 22K. Gift-ready luxury packaging.',
    badge: 'GIFT', rating: 4.9, reviews: 156,
    img: IMGS.i1, featured: false,
  },
  {
    id: 12, cat: 'GOLD', sub: 'Chains',
    name: 'Box Chain Necklace 18"',
    metal: '18K Gold', weight: '10g',
    price: Math.round(10 * g18),
    desc: 'Fine box chain 18K. Perfect for pendants. Elegant simplicity.',
    badge: null, rating: 4.6, reviews: 198,
    img: IMGS.i2, featured: false,
  },

  // ── DIAMOND COLLECTION ── 8 items
  {
    id: 13, cat: 'DIAMOND', sub: 'Rings',
    name: 'Solitaire Diamond Ring',
    metal: '18K White Gold', weight: '4g',
    price: 1850000,
    desc: '0.5 carat SI1 diamond. GIA certified. 18K white gold. Classic six-prong setting.',
    badge: 'CERTIFIED', rating: 5.0, reviews: 67,
    img: IMGS.i3, featured: true,
  },
  {
    id: 14, cat: 'DIAMOND', sub: 'Earrings',
    name: 'Diamond Stud Earrings',
    metal: '18K White Gold', weight: '3g',
    price: 2400000,
    desc: '0.4ct total VS1 diamonds. 18K white gold. Push-back secure fitting.',
    badge: 'BESTSELLER', rating: 4.9, reviews: 143,
    img: IMGS.i5, featured: true,
  },
  {
    id: 15, cat: 'DIAMOND', sub: 'Necklaces',
    name: 'Diamond Tennis Necklace',
    metal: '18K White Gold', weight: '12g',
    price: 8500000,
    desc: 'Full diamond tennis necklace. 3.5ct total VS clarity. Brilliant cut throughout.',
    badge: 'LUXURY', rating: 5.0, reviews: 34,
    img: IMGS.i6, featured: true,
  },
  {
    id: 16, cat: 'DIAMOND', sub: 'Bracelets',
    name: 'Diamond Tennis Bracelet',
    metal: '18K White Gold', weight: '8g',
    price: 5200000,
    desc: '2.0ct total weight. 18K white gold. Box clasp safety mechanism.',
    badge: 'PREMIUM', rating: 5.0, reviews: 28,
    img: IMGS.i7, featured: false,
  },
  {
    id: 17, cat: 'DIAMOND', sub: 'Pendants',
    name: 'Diamond Solitaire Pendant',
    metal: '18K Gold', weight: '3g',
    price: 950000,
    desc: '0.25ct brilliant cut pendant. Yellow gold 18K. Chain included.',
    badge: null, rating: 4.8, reviews: 89,
    img: IMGS.i8, featured: false,
  },
  {
    id: 18, cat: 'DIAMOND', sub: 'Rings',
    name: 'Halo Engagement Ring',
    metal: '18K White Gold', weight: '5g',
    price: 3200000,
    desc: 'Centre 0.75ct VVS1. Surrounded by 0.3ct halo. 18K white gold. Elegant promise.',
    badge: 'SIGNATURE', rating: 5.0, reviews: 52,
    img: IMGS.i9, featured: false,
  },
  {
    id: 19, cat: 'DIAMOND', sub: 'Rings',
    name: 'Three Stone Diamond Ring',
    metal: '18K Gold', weight: '6g',
    price: 2800000,
    desc: 'Past Present Future ring. 0.75ct total. SI1 quality. Yellow gold 18K.',
    badge: null, rating: 4.9, reviews: 41,
    img: IMGS.i10, featured: false,
  },
  {
    id: 20, cat: 'DIAMOND', sub: 'Earrings',
    name: 'Diamond Drop Earrings',
    metal: '18K White Gold', weight: '5g',
    price: 3600000,
    desc: '1.0ct total pear shaped. 18K white gold. GIA certified.',
    badge: 'GIA', rating: 5.0, reviews: 29,
    img: IMGS.webp, featured: false,
  },

  // ── GEMSTONES ── 8 items
  {
    id: 21, cat: 'GEMSTONE', sub: 'Rubies',
    name: 'Pigeon Blood Ruby Ring',
    metal: '22K Gold', weight: '6g',
    price: 1250000,
    desc: '2.5ct Burma pigeon blood ruby. Unheated. 22K gold setting. Certificate included.',
    badge: 'RARE', rating: 5.0, reviews: 23,
    img: IMGS.i1, featured: true,
  },
  {
    id: 22, cat: 'GEMSTONE', sub: 'Emeralds',
    name: 'Colombian Emerald Necklace',
    metal: '22K Gold', weight: '15g',
    price: 2100000,
    desc: '3.0ct vivid green Colombian emerald pendant. 22K gold. Minor oil treatment only.',
    badge: 'PREMIUM', rating: 4.9, reviews: 31,
    img: IMGS.i2, featured: true,
  },
  {
    id: 23, cat: 'GEMSTONE', sub: 'Sapphires',
    name: 'Kashmir Blue Sapphire Ring',
    metal: '18K White Gold', weight: '5g',
    price: 1800000,
    desc: '1.8ct unheated Kashmir blue sapphire. GRS certified. 18K white gold.',
    badge: 'CERTIFIED', rating: 5.0, reviews: 18,
    img: IMGS.i3, featured: false,
  },
  {
    id: 24, cat: 'GEMSTONE', sub: 'Rubies',
    name: 'Ruby & Diamond Bracelet',
    metal: '18K Gold', weight: '12g',
    price: 1650000,
    desc: 'Natural rubies with VS diamond accents. 18K. Total ruby weight 4.5ct.',
    badge: null, rating: 4.8, reviews: 44,
    img: IMGS.i5, featured: false,
  },
  {
    id: 25, cat: 'GEMSTONE', sub: 'Emeralds',
    name: 'Emerald & Gold Earrings',
    metal: '22K Gold', weight: '7g',
    price: 890000,
    desc: 'Natural emerald drops in 22K gold filigree. Vivid green. 1.5ct each.',
    badge: 'NEW', rating: 4.9, reviews: 56,
    img: IMGS.i6, featured: false,
  },
  {
    id: 26, cat: 'GEMSTONE', sub: 'Mixed',
    name: 'Five Stone Gemstone Ring',
    metal: '22K Gold', weight: '8g',
    price: 780000,
    desc: 'Ruby, emerald, sapphire, topaz, amethyst. 22K gold. Colourful heritage.',
    badge: 'UNIQUE', rating: 4.7, reviews: 67,
    img: IMGS.i7, featured: false,
  },
  {
    id: 27, cat: 'GEMSTONE', sub: 'Sapphires',
    name: 'Sapphire & Pearl Necklace',
    metal: '18K Gold', weight: '18g',
    price: 1100000,
    desc: 'Blue sapphire and freshwater pearl alternating necklace. 18K. 18 inches.',
    badge: null, rating: 4.8, reviews: 39,
    img: IMGS.i8, featured: false,
  },
  {
    id: 28, cat: 'GEMSTONE', sub: 'Mixed',
    name: 'Gemstone Bangle Set',
    metal: '22K Gold', weight: '30g',
    price: 950000,
    desc: 'Set of 3. Ruby, emerald, sapphire-set bangles. 22K gold. Bridal quality.',
    badge: 'BRIDAL', rating: 4.9, reviews: 82,
    img: IMGS.i9, featured: false,
  },

  // ── BRIDAL COLLECTION ── 10 items
  {
    id: 29, cat: 'BRIDAL', sub: 'Full Sets',
    name: 'Maharani Bridal Set',
    metal: '22K Gold', weight: '120g',
    price: Math.round(120 * g22),
    desc: 'Complete 8-piece set. Necklace, earrings, tikka, jhumar, bangles ×4, ring, kamarbandh.',
    badge: 'SIGNATURE', rating: 5.0, reviews: 47,
    img: IMGS.i10, featured: true,
  },
  {
    id: 30, cat: 'BRIDAL', sub: 'Full Sets',
    name: 'Royal Kundan Bridal Set',
    metal: '22K Gold', weight: '95g',
    price: Math.round(95 * g22),
    desc: '7-piece kundan set. Deep enamel work. Precious stone accents. Heirloom quality.',
    badge: 'BESTSELLER', rating: 5.0, reviews: 63,
    img: IMGS.webp, featured: true,
  },
  {
    id: 31, cat: 'BRIDAL', sub: 'Necklaces',
    name: 'Bridal Rani Haar',
    metal: '22K Gold', weight: '55g',
    price: Math.round(55 * g22),
    desc: 'Long multi-strand Rani Haar 22K. Pearl and gold bead layering. 32 inches.',
    badge: null, rating: 4.9, reviews: 88,
    img: IMGS.i1, featured: false,
  },
  {
    id: 32, cat: 'BRIDAL', sub: 'Tikka',
    name: 'Maang Tikka & Jhumar',
    metal: '22K Gold', weight: '18g',
    price: Math.round(18 * g22),
    desc: 'Matching maang tikka and jhumar set 22K. Stone-set. Bridal essential.',
    badge: null, rating: 5.0, reviews: 112,
    img: IMGS.i2, featured: false,
  },
  {
    id: 33, cat: 'BRIDAL', sub: 'Bangles',
    name: 'Bridal Choora Set',
    metal: '22K Gold', weight: '80g',
    price: Math.round(80 * g22),
    desc: '24-piece bridal choora. 22K gold. Mixed kundan and plain designs.',
    badge: 'POPULAR', rating: 4.9, reviews: 134,
    img: IMGS.i3, featured: false,
  },
  {
    id: 34, cat: 'BRIDAL', sub: 'Full Sets',
    name: 'Diamond Bridal Collection',
    metal: '18K White Gold', weight: '45g',
    price: 12500000,
    desc: '5-piece diamond bridal. 3.5ct total diamonds. White gold. Modern bridal perfection.',
    badge: 'LUXURY', rating: 5.0, reviews: 22,
    img: IMGS.i5, featured: true,
  },
  {
    id: 35, cat: 'BRIDAL', sub: 'Rings',
    name: 'Engagement Ring Set',
    metal: '18K Gold', weight: '8g',
    price: 2200000,
    desc: 'Engagement and wedding band set. 0.5ct diamond centre. 18K. His & Hers option.',
    badge: 'NEW', rating: 5.0, reviews: 58,
    img: IMGS.i6, featured: false,
  },
  {
    id: 36, cat: 'BRIDAL', sub: 'Earrings',
    name: 'Bridal Chandelier Earrings',
    metal: '22K Gold', weight: '22g',
    price: Math.round(22 * g22),
    desc: 'Cascading chandelier earrings 22K. Kundan and pearl drops. 4 inch length.',
    badge: null, rating: 4.8, reviews: 96,
    img: IMGS.i7, featured: false,
  },
  {
    id: 37, cat: 'BRIDAL', sub: 'Full Sets',
    name: 'Emerald Bridal Set',
    metal: '22K Gold', weight: '85g',
    price: Math.round(85 * g22) + 800000,
    desc: '22K gold bridal set with Colombian emerald accents. 6-piece. Statement luxury.',
    badge: 'RARE', rating: 5.0, reviews: 15,
    img: IMGS.i8, featured: false,
  },
  {
    id: 38, cat: 'BRIDAL', sub: 'Kamarbandh',
    name: 'Gold Kamarbandh',
    metal: '22K Gold', weight: '40g',
    price: Math.round(40 * g22),
    desc: 'Traditional waist belt 22K gold. Adjustable. Kundan centre piece. Bridal essential.',
    badge: 'TRADITIONAL', rating: 4.9, reviews: 71,
    img: IMGS.i9, featured: false,
  },

  // ── SILVER COLLECTION ── 2 items
  {
    id: 39, cat: 'SILVER', sub: 'Rings',
    name: 'Sterling Silver Ring Set',
    metal: 'Sterling Silver', weight: '12g',
    price: Math.round(12 * RATES.silver.perGram),
    desc: 'Set of 5 sterling silver rings. Oxidised finish. Bohemian elegance.',
    badge: 'VALUE', rating: 4.7, reviews: 189,
    img: IMGS.i10, featured: false,
  },
  {
    id: 40, cat: 'SILVER', sub: 'Necklaces',
    name: 'Silver Filigree Necklace',
    metal: 'Sterling Silver', weight: '20g',
    price: Math.round(20 * RATES.silver.perGram),
    desc: 'Intricate filigree silver necklace. Gujrat handcrafted. 16 inch.',
    badge: null, rating: 4.8, reviews: 143,
    img: IMGS.webp, featured: false,
  },
];

// ══════════════════════════════════════════════════
//  AI SALES MANAGER — SYSTEM PROMPT
// ══════════════════════════════════════════════════
function buildSystemPrompt(lang = 'en') {
  const langNote = lang !== 'en'
    ? `\n\nLANGUAGE INSTRUCTION: The customer is communicating in "${lang}". Respond entirely in that language:\n- ur = Urdu (use Urdu script, formal respectful tone)\n- ar = Arabic (use Arabic script, formal polite tone)\n- en = English (default)\nMaintain luxury-level eloquence in all languages.`
    : '';

  return `You are the elite Sales Manager at Madni Jewellers — Gujrat, Pakistan's most prestigious jewellery house. You have decades of expertise in fine jewellery.

YOUR CHARACTER:
- Warm, professional, deeply knowledgeable
- Expert in gold karats, diamond grading (GIA system), gemstone origins
- Address customers as "Sir" or "Madam" appropriately
- Never pushy — consultative, helpful, patient
- Speak with the quiet confidence of a true expert
- Use "✦" as an elegant bullet point

STORE DETAILS:
- Madni Jewellers, Gujrat, Punjab, Pakistan
- WhatsApp: +92 300 6262886
- Specialties: 18K/21K/22K/24K Gold, GIA Diamonds, Natural Rubies/Emeralds/Sapphires, Complete Bridal Sets

LIVE GOLD RATES (Pakistan Sarafa Market, ${RATES.lastUpdated}):
✦ 24K Gold: PKR ${RATES.gold['24K'].perGram.toLocaleString()}/gram | PKR ${RATES.gold['24K'].perTola.toLocaleString()}/tola
✦ 22K Gold: PKR ${RATES.gold['22K'].perGram.toLocaleString()}/gram | PKR ${RATES.gold['22K'].perTola.toLocaleString()}/tola
✦ 21K Gold: PKR ${RATES.gold['21K'].perGram.toLocaleString()}/gram
✦ 18K Gold: PKR ${RATES.gold['18K'].perGram.toLocaleString()}/gram
✦ Silver: PKR ${RATES.silver.perGram.toLocaleString()}/gram | PKR ${RATES.silver.perTola.toLocaleString()}/tola
✦ Diamond SI1: PKR ${RATES.diamond.SI1.perCarat.toLocaleString()}/carat | VS1: PKR ${RATES.diamond.VS1.perCarat.toLocaleString()}/carat

COLLECTIONS (40 products total):
✦ GOLD: Rings, Necklaces, Bangles, Earrings, Chains, Sets (12 pieces)
✦ DIAMOND: GIA certified, white gold settings (8 pieces)
✦ GEMSTONE: Natural certified rubies, emeralds, sapphires (8 pieces)
✦ BRIDAL: Complete sets from PKR 3.9M to PKR 12.5M (10 pieces)
✦ SILVER: Sterling silver, filigree work (2 pieces)

PRICING POLICY:
Always mention: "All prices are based on live Pakistan Sarafa Market rates, updated daily."

CLOSING EVERY RESPONSE:
End with a gentle invitation: "Shall I connect you with our team on WhatsApp for a personal consultation? +92 300 6262886"

Keep responses elegant, concise — maximum 3 paragraphs. Never ramble.${langNote}`;
}

// ══════════════════════════════════════════════════
//  FALLBACK SCRIPTED RESPONSES
// ══════════════════════════════════════════════════
const FALLBACKS = {
  en: {
    gold:    `**Current Gold Rates** — Pakistan Sarafa Market, ${RATES.lastUpdated}:\n\n✦ 24K — PKR ${RATES.gold['24K'].perGram.toLocaleString()}/gram | PKR ${RATES.gold['24K'].perTola.toLocaleString()}/tola\n✦ 22K — PKR ${RATES.gold['22K'].perGram.toLocaleString()}/gram | PKR ${RATES.gold['22K'].perTola.toLocaleString()}/tola\n✦ 21K — PKR ${RATES.gold['21K'].perGram.toLocaleString()}/gram\n✦ 18K — PKR ${RATES.gold['18K'].perGram.toLocaleString()}/gram\n✦ Silver — PKR ${RATES.silver.perGram.toLocaleString()}/gram\n\nAll prices updated daily. Shall I connect you on WhatsApp? +92 300 6262886`,
    bridal:  `**Bridal Showcase** — complete sets crafted for your most sacred day:\n\n✦ **Maharani Bridal Set** (22K, 120g) — PKR ${Math.round(120 * RATES.gold['22K'].perGram).toLocaleString()}\n✦ **Royal Kundan Set** (22K, 95g) — PKR ${Math.round(95 * RATES.gold['22K'].perGram).toLocaleString()}\n✦ **Diamond Bridal Collection** — PKR 12,500,000\n\nEach set includes necklace, earrings, tikka, bangles and more.\n\nBook a personal bridal consultation: +92 300 6262886`,
    diamond: `**Diamond Collection** — GIA Certified:\n\n✦ SI1 Grade — PKR ${RATES.diamond.SI1.perCarat.toLocaleString()}/carat\n✦ VS1 Grade — PKR ${RATES.diamond.VS1.perCarat.toLocaleString()}/carat\n✦ VVS1 Grade — PKR ${RATES.diamond.VVS1.perCarat.toLocaleString()}/carat\n\nAll set in 18K white or yellow gold. Starting from PKR 950,000.\n\nShall I connect you on WhatsApp? +92 300 6262886`,
    gemstone:`**Gemstone Vault** — Earth's finest, many certified:\n\n✦ Pigeon Blood Ruby (Burma) — PKR 1,250,000\n✦ Colombian Emerald — PKR 2,100,000\n✦ Kashmir Blue Sapphire — PKR 1,800,000\n\nAll natural stones. Origin certificates available on request.\n\nShall I connect you on WhatsApp? +92 300 6262886`,
    default: `Welcome to **Madni Jewellers** — Gujrat's most prestigious jewellery house. ✦\n\nWe specialise in:\n✦ 18K · 21K · 22K · 24K Hallmarked Gold\n✦ GIA Certified Diamonds\n✦ Natural Rubies, Emeralds & Sapphires\n✦ Complete Bridal Heritage Sets\n✦ Custom Commissioned Pieces\n\nShall I connect you on WhatsApp? +92 300 6262886`,
  },
  ur: {
    gold:    `**آج کے سونے کے ریٹ** — پاکستان صراف مارکیٹ:\n\n✦ 24K — PKR ${RATES.gold['24K'].perGram.toLocaleString()}/گرام\n✦ 22K — PKR ${RATES.gold['22K'].perGram.toLocaleString()}/گرام\n✦ 21K — PKR ${RATES.gold['21K'].perGram.toLocaleString()}/گرام\n✦ 18K — PKR ${RATES.gold['18K'].perGram.toLocaleString()}/گرام\n✦ چاندی — PKR ${RATES.silver.perGram.toLocaleString()}/گرام\n\nواٹس ایپ: +92 300 6262886`,
    bridal:  `**دلہن شوکیس** — آپ کے مقدس دن کے لیے:\n\n✦ مہارانی دلہن سیٹ — PKR ${Math.round(120 * RATES.gold['22K'].perGram).toLocaleString()}\n✦ شاہی کنڈن سیٹ — PKR ${Math.round(95 * RATES.gold['22K'].perGram).toLocaleString()}\n✦ ہیرے کا دلہن مجموعہ — PKR 12,500,000\n\nواٹس ایپ: +92 300 6262886`,
    default: `**مدنی جیولرز** میں خوش آمدید — گجرات کا سب سے معزز جیولری ہاؤس۔ ✦\n\nہمارے پاس سونا، ہیرے، قیمتی پتھر اور دلہن کے زیورات کا بہترین مجموعہ ہے۔\n\nواٹس ایپ: +92 300 6262886`,
  },
  ar: {
    gold:    `**أسعار الذهب اليوم** — سوق الصرافة الباكستاني:\n\n✦ 24K — PKR ${RATES.gold['24K'].perGram.toLocaleString()}/جرام\n✦ 22K — PKR ${RATES.gold['22K'].perGram.toLocaleString()}/جرام\n✦ فضة — PKR ${RATES.silver.perGram.toLocaleString()}/جرام\n\nواتساب: +92 300 6262886`,
    default: `مرحباً بكم في **مدني جيولرز** — أرقى دار مجوهرات في غوجرات. ✦\n\nنتخصص في الذهب والألماس والأحجار الكريمة ومجموعات العرائس.\n\nواتساب: +92 300 6262886`,
  },
};

function getFallback(text = '', lang = 'en') {
  const lo = text.toLowerCase();
  const fb = FALLBACKS[lang] || FALLBACKS.en;
  if (/gold|rate|tola|gram|سونا|ذهب|قیمت|سعر|ریٹ/i.test(lo))    return fb.gold    || FALLBACKS.en.gold;
  if (/bridal|wedding|shadi|دلہن|عروس|bride/i.test(lo))           return fb.bridal  || FALLBACKS.en.bridal;
  if (/diamond|heera|ألماس|ہیرا/i.test(lo))                       return fb.diamond || FALLBACKS.en.diamond;
  if (/ruby|emerald|sapphire|gemstone|یاقوت|زمرد|پتھر/i.test(lo)) return fb.gemstone|| FALLBACKS.en.gemstone;
  return fb.default || FALLBACKS.en.default;
}

// ══════════════════════════════════════════════════
//  ROUTES
// ══════════════════════════════════════════════════

// Health check
app.get('/', (req, res) => {
  res.json({
    status: '✦ Madni Jewellers API — Online',
    version: '2.0.0',
    products: PRODUCTS.length,
    location: 'Gujrat, Punjab, Pakistan',
    whatsapp: '+92 300 6262886',
    timestamp: new Date().toISOString(),
  });
});

// ── Live gold rates ──
app.get('/api/rates', (req, res) => {
  res.json({
    success: true,
    rates: RATES,
    message: `Live Pakistan Sarafa Market rates — ${RATES.lastUpdated}`,
  });
});

// ── All products ──
app.get('/api/products', (req, res) => {
  const { cat, sub, featured, limit } = req.query;
  let items = [...PRODUCTS];
  if (cat)      items = items.filter(p => p.cat.toLowerCase() === cat.toLowerCase());
  if (sub)      items = items.filter(p => p.sub.toLowerCase() === sub.toLowerCase());
  if (featured) items = items.filter(p => p.featured === true);
  if (limit)    items = items.slice(0, parseInt(limit));
  res.json({ success: true, count: items.length, products: items });
});

// ── Single product ──
app.get('/api/products/:id', (req, res) => {
  const p = PRODUCTS.find(x => x.id === parseInt(req.params.id));
  if (!p) return res.status(404).json({ success: false, error: 'Product not found' });
  res.json({ success: true, product: p });
});

// ── Categories with counts ──
app.get('/api/categories', (req, res) => {
  const cats = ['GOLD', 'DIAMOND', 'GEMSTONE', 'BRIDAL', 'SILVER'];
  const result = cats.map(cat => ({
    name: cat,
    count: PRODUCTS.filter(p => p.cat === cat).length,
    featured: PRODUCTS.filter(p => p.cat === cat && p.featured).length,
    priceRange: {
      min: Math.min(...PRODUCTS.filter(p => p.cat === cat).map(p => p.price)),
      max: Math.max(...PRODUCTS.filter(p => p.cat === cat).map(p => p.price)),
    },
  }));
  res.json({ success: true, categories: result });
});

// ── Featured products ──
app.get('/api/featured', (req, res) => {
  const featured = PRODUCTS.filter(p => p.featured);
  res.json({ success: true, count: featured.length, products: featured });
});

// ── AI Sales Manager Chat ──
app.post('/api/chat', chatLimiter, async (req, res) => {
  const {
    messages    = [],
    userText    = '',
    productContext = null,
    language    = 'en',
  } = req.body;

  if (!userText?.trim()) {
    return res.status(400).json({ success: false, error: 'No message provided' });
  }

  // Build context additions
  const productNote = productContext
    ? `\n\nCUSTOMER IS VIEWING: "${productContext.name}" (${productContext.metal}, ${productContext.weight}) — PKR ${productContext.price?.toLocaleString()}. Address this product if relevant.`
    : '';

  try {
    const ctrl    = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 25000);

    // Clean and validate message history
    const cleanHistory = messages
      .slice(-12)
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .filter(m => m.content && typeof m.content === 'string' && m.content.trim());

    const apiMessages = [
      ...cleanHistory,
      { role: 'user', content: userText.trim() },
    ];

    const response = await ai.messages.create({
      model:      'claude-opus-4-5',
      max_tokens: 650,
      system:     buildSystemPrompt(language) + productNote,
      messages:   apiMessages,
    });

    clearTimeout(timeout);

    const reply = response.content?.[0]?.text;
    if (!reply?.trim()) throw new Error('Empty response from AI');

    res.json({
      success:    true,
      reply:      reply.trim(),
      tokensUsed: response.usage?.output_tokens || 0,
      language,
    });

  } catch (err) {
    console.error('[CHAT ERROR]', err.message);
    // Always return a useful fallback — never leave customer with an error
    res.json({
      success:  false,
      reply:    getFallback(userText, language),
      fallback: true,
    });
  }
});

// ── WhatsApp redirect ──
app.get('/api/whatsapp', (req, res) => {
  const { product, price, type } = req.query;
  let msg;
  if (type === 'bridal') {
    msg = 'As-salamu alaykum! I would like to book a bridal jewellery consultation at Madni Jewellers. Please advise on availability.';
  } else if (product) {
    msg = `As-salamu alaykum! I am interested in *${product}* — PKR ${price}. Please share more details and arrange a consultation.`;
  } else {
    msg = 'As-salamu alaykum! I visited madnijewellers.com and would like to enquire about your jewellery collection.';
  }
  res.redirect(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`);
});

// ── Analytics (visitor & product view tracking) ──
app.post('/api/analytics', (req, res) => {
  const { event, productId, productName, language, theme, page } = req.body;
  const timestamp = new Date().toISOString();
  console.log(`[ANALYTICS] ${timestamp} | Event: ${event} | Product: ${productId || '-'} | ${productName || '-'} | Lang: ${language} | Theme: ${theme} | Page: ${page || '/'}`);
  res.json({ success: true, timestamp });
});

// ── Search products ──
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  if (!q || q.trim().length < 2) {
    return res.status(400).json({ success: false, error: 'Query too short' });
  }
  const query = q.toLowerCase().trim();
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.cat.toLowerCase().includes(query)  ||
    p.sub.toLowerCase().includes(query)  ||
    p.metal.toLowerCase().includes(query)||
    p.desc.toLowerCase().includes(query)
  );
  res.json({ success: true, query: q, count: results.length, products: results });
});

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// ── Global error handler ──
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// ── START SERVER ──
app.listen(PORT, () => {
  console.log('\n✦ ═══════════════════════════════════════');
  console.log('✦  MADNI JEWELLERS SERVER v2.0');
  console.log('✦ ═══════════════════════════════════════');
  console.log(`✦  Status   : Online`);
  console.log(`✦  Port     : ${PORT}`);
  console.log(`✦  Products : ${PRODUCTS.length}`);
  console.log(`✦  24K Gold : PKR ${RATES.gold['24K'].perGram.toLocaleString()}/gram`);
  console.log(`✦  22K Gold : PKR ${RATES.gold['22K'].perGram.toLocaleString()}/gram`);
  console.log(`✦  Location : Gujrat, Punjab, Pakistan`);
  console.log(`✦  WhatsApp : +92 300 6262886`);
  console.log('✦ ═══════════════════════════════════════\n');
});

module.exports = app;
