/* ---------- Mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');
navToggle.addEventListener('click', ()=>mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', ()=>mobileMenu.classList.remove('open'));
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>mobileMenu.classList.remove('open')));
document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && mobileMenu.classList.contains('open')) mobileMenu.classList.remove('open'); });

/* ---------- Data ---------- */
const categories = ['All','Branding','Logo Design','Social Media','Flyers & Posters','Packaging','Clothing','Advertising','Motion Graphics'];

const projects = [
  {
    id:'3s-beauty', title:'3S BEAUTY BY FA', cat:'Branding', client:'3S BEAUTY BY FA',
    type:'Beauty Brand Identity & Promotional Design',
    colors:['#FDCEF0', '#843694', '#FED4F2'],
    desc:'A brand mark and promotional identity for a beauty parlour, built as a clean, name-forward logo for use across signage and social promotion.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/branding/3s-beauty/3s.JPG", alt:"3S BEAUTY BY FA — image 1"}
      ]
    }
  },
  {
    id:'fj-beauty-parlor', title:'FJ BEAUTY PARLOR', cat:'Advertising', client:'FJ BEAUTY PARLOR',
    type:'Beauty Promotional Design',
    colors:['#F38DA4', '#6A514D', '#3A1E1E'],
    desc:'A full-service beauty flyer for a hair, wig, and nail studio — services list, styled portrait imagery, and contact details laid out in a bold pink palette.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/fj-beauty-parlor/104 x 117 copy.jpg", alt:"FJ BEAUTY PARLOR — image 1"}
      ]
    }
  },
  {
    id:'del-hac', title:'DEL-HAC CATERING & EVENT SERVICES', cat:'Branding', client:'DEL-HAC CATERING & EVENT SERVICES',
    type:'Catering Brand Identity & Promotional Design',
    colors:['#5B0000', '#000000', '#CBC4C3'],
    desc:'Logo and promotional flyer for a catering and events company, pairing a chef-mark identity with a photo-led spread of prepared dishes.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/branding/del-hac/del hac.JPG", alt:"DEL-HAC CATERING & EVENT SERVICES — image 1"},
        {src:"../images/portfolio/branding/del-hac/4 x 3.JPG", alt:"DEL-HAC CATERING & EVENT SERVICES — image 2"}
      ]
    }
  },
  {
    id:'els-cut-pit', title:'EL\'S CUT FIT', cat:'Advertising', client:'EL\'S CUT FIT',
    type:'Business Advertising Banner',
    colors:['#910129', '#ECDABF', '#677A7A'],
    desc:'A wide advertising banner for a fashion and tailoring business, built to run across storefront and digital placements.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/els-cut-pit/114 x 24 copy.jpg", alt:"EL\'S CUT FIT — image 1"}
      ]
    }
  },
  {
    id:'hannahs-bakery', title:'HANNAH\'S BAKERY', cat:'Advertising', client:'HANNAH\'S BAKERY',
    type:'Bakery Promotional Campaign',
    colors:['#FEF7D9', '#2E0F04', '#C8A77F'],
    desc:'A promotional flyer set for a bakery, showcasing fresh bread and pastry products alongside training-course and ordering details.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/hannahs-bakery/17 X 21 copy.jpg", alt:"HANNAH\'S BAKERY — image 1"},
        {src:"../images/portfolio/advertising/hannahs-bakery/42 X 32 copy.jpg", alt:"HANNAH\'S BAKERY — image 2"},
        {src:"../images/portfolio/advertising/hannahs-bakery/a4 copy.jpg", alt:"HANNAH\'S BAKERY — image 3"}
      ]
    }
  },
  {
    id:'mobile-phones-accessories', title:'MOBILE PHONES & ACCESSORIES', cat:'Advertising', client:'MOBILE PHONES & ACCESSORIES',
    type:'Product Advertising',
    colors:['#FEFFFF', '#6B7F91', '#303547'],
    desc:'A product advertising flyer for a phone repair and accessories business, laying out services and stock in a bold red grid.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/mobile-phones-accessories/18.5 x 31.jpg", alt:"MOBILE PHONES & ACCESSORIES — image 1"}
      ]
    }
  },
  {
    id:'barbs-food-catering', title:'BARB\'S FOOD & CATERING', cat:'Advertising', client:'BARB\'S FOOD & CATERING',
    type:'Food Promotional Design',
    colors:['#BF8341', '#271714', '#82532F'],
    desc:'A circular promotional design for a catering service, showcasing a spread of prepared meals around a warm, photo-forward layout.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/barbs-food-catering/2 x 2 copy.jpg", alt:"BARB\'S FOOD & CATERING — image 1"}
      ]
    }
  },
  {
    id:'rds-catering-services', title:'RDS CATERING SERVICES', cat:'Advertising', client:'RDS CATERING SERVICES',
    type:'Catering Promotional Design',
    colors:['#FFFFFF', '#582947', '#452644'],
    desc:'A circular promotional design for a catering business, built around a badge-style logo and a gallery of signature dishes.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/rds-catering-services/2.7 x 2.7 - Copy - Copy.jpg", alt:"RDS CATERING SERVICES — image 1"}
      ]
    }
  },
  {
    id:'adepa-beauty-nails', title:'ADEPA BEAUTY & NAILS', cat:'Advertising', client:'ADEPA BEAUTY & NAILS',
    type:'Beauty Promotional Design',
    colors:['#EC72DE', '#ED95DD', '#F244D5'],
    desc:'A promotional flyer for a nail and beauty parlour, using a close-up photo grid to showcase manicure and nail-art work.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/adepa-beauty-nails/3 X 2.jpg", alt:"ADEPA BEAUTY & NAILS — image 1"}
      ]
    }
  },
  {
    id:'admission-progress', title:'ADMISSION PROGRESS', cat:'Flyers & Posters', client:'ADMISSION PROGRESS',
    type:'School Admission Campaign',
    colors:['#2F399C', '#2D2F76', '#F0EFE7'],
    desc:'A campaign banner for a foundation\'s exam-prep programme, built around a clear pass-rate headline and contact details.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/flyers-posters/admission-progress/3 x 3 banner.jpg", alt:"ADMISSION PROGRESS — image 1"}
      ]
    }
  },
  {
    id:'omo-tuo-banku-konkonte', title:'OMO TUO • BANKU • KONKONTE', cat:'Advertising', client:'OMO TUO • BANKU • KONKONTE',
    type:'Food Promotional Campaign',
    colors:['#B16B27', '#EFEDCA', '#E4A351'],
    desc:'A food promotional flyer built around a photo grid of local staple dishes, laid out for quick menu recognition.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/omo-tuo-banku-konkonte/3 X 4 copy.JPG", alt:"OMO TUO • BANKU • KONKONTE — image 1"}
      ]
    }
  },
  {
    id:'awos-special', title:'AWO\'S SPECIAL', cat:'Advertising', client:'AWO\'S SPECIAL',
    type:'Food & Beverage Promotion',
    colors:['#FAE754', '#F1DE50', '#989A9F'],
    desc:'A promotional flyer for an ice kenkey and sobolo drinks business, with product photography set against a bold yellow background.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/awos-special/30 X 19 copy.jpg", alt:"AWO\'S SPECIAL — image 1"}
      ]
    }
  },
  {
    id:'divine-blessing', title:'DIVINE BLESSING', cat:'Advertising', client:'DIVINE BLESSING',
    type:'Restaurant / Food Promotion',
    colors:['#211917', '#F6F2E7', '#B6693E'],
    desc:'A restaurant promotional flyer showcasing a spread of local dishes in a warm, earth-toned layout.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/divine-blessing/34 x 26 copy.JPG", alt:"DIVINE BLESSING — image 1"}
      ]
    }
  },
  {
    id:'eagle-ministries-annual-harvest', title:'ENCOUNTER OF EAGLE MINISTRIES — ANNUAL HARVEST', cat:'Flyers & Posters', client:'ENCOUNTER OF EAGLE MINISTRIES — ANNUAL HARVEST',
    type:'Church Event Poster',
    colors:['#FDFDFF', '#0C0B5D', '#D6D1E4'],
    desc:'An event poster for a church\'s annual harvest service, combining a host portrait with guest speakers and event details.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/flyers-posters/eagle-ministries-annual-harvest/36 x 36.jpg", alt:"ENCOUNTER OF EAGLE MINISTRIES — ANNUAL HARVEST — image 1"}
      ]
    }
  },
  {
    id:'christ-ambassadors-annual-harvest', title:'CHRIST AMBASSADORS CHURCH INTERNATIONAL — ANNUAL HARVEST', cat:'Flyers & Posters', client:'CHRIST AMBASSADORS CHURCH INTERNATIONAL — ANNUAL HARVEST',
    type:'Church Event Poster',
    colors:['#E1F3FB', '#F7FDFE', '#A0D6EC'],
    desc:'An event poster for a church\'s annual harvest and building-fund drive, pairing scripture-led messaging with the target amount and date.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/flyers-posters/christ-ambassadors-annual-harvest/4 x 3 copy (2).jpg", alt:"CHRIST AMBASSADORS CHURCH INTERNATIONAL — ANNUAL HARVEST — image 1"}
      ]
    }
  },
  {
    id:'blue-fresh', title:'BLUE FRESH', cat:'Advertising', client:'BLUE FRESH',
    type:'Product Promotional Design',
    colors:['#6072E2', '#8593EB', '#F3F3EF'],
    desc:'A product promotional flyer for a laundry and cleaning brand, built around bright product photography.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/blue-fresh/4 copy.jpg", alt:"BLUE FRESH — image 1"}
      ]
    }
  },
  {
    id:'na-god-cold-store', title:'NA GOD COLD STORE', cat:'Advertising', client:'NA GOD COLD STORE',
    type:'Food / Cold Store Advertising',
    colors:['#EBFAFE', '#D5906B', '#CCF0FD'],
    desc:'An advertising flyer for a cold store and foodstuff supplier, using a dense product photo grid to show the full range of stock.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/na-god-cold-store/4 x 3 copy (3).JPG", alt:"NA GOD COLD STORE — image 1"}
      ]
    }
  },
  {
    id:'jny-ventures', title:'J\'NY VENTURES', cat:'Advertising', client:'J\'NY VENTURES',
    type:'Business Promotional Design',
    colors:['#D5D8D7', '#FFFFFF', '#E3E3E3'],
    desc:'A promotional flyer for a hiring and events business, showcasing canopies, chairs, and other event-rental equipment.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/jny-ventures/4 x 3 copy.JPG", alt:"J\'NY VENTURES — image 1"}
      ]
    }
  },
  {
    id:'anakazo-blessings', title:'ANAKAZO BLESSINGS', cat:'Flyers & Posters', client:'ANAKAZO BLESSINGS',
    type:'Church Event Poster',
    colors:['#5179A9', '#B1B2BC', '#070264'],
    desc:'An event poster for a church programme, combining a group portrait of ministers with the event theme and schedule.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/flyers-posters/anakazo-blessings/4 x 4 copy.JPG", alt:"ANAKAZO BLESSINGS — image 1"}
      ]
    }
  },
  {
    id:'special-sobolo-bofrot', title:'SPECIAL SOBOLO & BOFROT', cat:'Advertising', client:'SPECIAL SOBOLO & BOFROT',
    type:'Food & Beverage Promotion',
    colors:['#C20102', '#D37959', '#D10203'],
    desc:'A food and beverage promotional flyer pairing product photography with bold typography and contact details.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/special-sobolo-bofrot/44 x 30.JPG", alt:"SPECIAL SOBOLO & BOFROT — image 1"}
      ]
    }
  },
  {
    id:'blue-crystal-school', title:'BLUE CRYSTAL SCHOOL', cat:'Flyers & Posters', client:'BLUE CRYSTAL SCHOOL',
    type:'School Summer Program Poster',
    colors:['#2E2E89', '#20207F', '#B9B288'],
    desc:'A poster for a school\'s summer programme, built around a clean, brand-consistent layout with programme dates and contact information.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/flyers-posters/blue-crystal-school/45 x 36  B.jpg", alt:"BLUE CRYSTAL SCHOOL — image 1"}
      ]
    }
  },
  {
    id:'tasty-corner', title:'TASTY CORNER', cat:'Advertising', client:'TASTY CORNER',
    type:'Restaurant Promotional Design',
    colors:['#E9A939', '#E4D89F', '#E77629'],
    desc:'A restaurant promotional flyer combining a friendly host illustration with photography of the food on offer.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/tasty-corner/48 x 35.jpg", alt:"TASTY CORNER — image 1"}
      ]
    }
  },
  {
    id:'connys-kitchen', title:'CONNY\'S KITCHEN', cat:'Advertising', client:'CONNY\'S KITCHEN',
    type:'Restaurant Promotional Design',
    colors:['#FD0000', '#7F0000', '#D19657'],
    desc:'A restaurant promotional flyer using a diamond photo grid to showcase a full menu of baked goods and prepared meals.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/connys-kitchen/48.5 x 48.jpg", alt:"CONNY\'S KITCHEN — image 1"}
      ]
    }
  },
  {
    id:'free-admission-school', title:'FREE ADMISSION — SCHOOL', cat:'Flyers & Posters', client:'FREE ADMISSION — SCHOOL',
    type:'School Advertising Banner',
    colors:['#2F3290', '#D7C36F', '#FBF7E3'],
    desc:'A wide advertising banner for a school\'s free-admission offer, built for storefront and roadside placement.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/flyers-posters/free-admission-school/4X2.jpg", alt:"FREE ADMISSION — SCHOOL — image 1"}
      ]
    }
  },
  {
    id:'cyeds-world-promotion', title:'CYEDS WORLD PROMOTION', cat:'Advertising', client:'CYEDS WORLD PROMOTION',
    type:'Product / Business Promotional Campaign',
    colors:['#3078C2', '#5AB1F2', '#4699DF'],
    desc:'A product promotional flyer for a home-supplies business, showcasing appliances alongside a location callout.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/cyeds-world-promotion/5 x 3 copy (2).jpg", alt:"CYEDS WORLD PROMOTION — image 1"}
      ]
    }
  },
  {
    id:'mama-thes-food', title:'MAMA THE\'S FOOD', cat:'Advertising', client:'MAMA THE\'S FOOD',
    type:'Food Promotional Campaign',
    colors:['#EEC65B', '#070605', '#FCF1C1'],
    desc:'A food promotional flyer for a food-point business, showcasing prepared dishes in a warm, photo-led layout.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/mama-thes-food/5 x 3 copy.JPG", alt:"MAMA THE\'S FOOD — image 1"}
      ]
    }
  },
  {
    id:'mama-evas-sport', title:'MAMA EVA\'S SPORT', cat:'Advertising', client:'MAMA EVA\'S SPORT',
    type:'Restaurant / Food Promotion',
    colors:['#CD6D27', '#521C1A', '#881F1A'],
    desc:'A restaurant promotional flyer for a local food spot, pairing dish photography with a bold red-and-gold palette.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/mama-evas-sport/5 X 4 copy.jpg", alt:"MAMA EVA\'S SPORT — image 1"}
      ]
    }
  },
  {
    id:'tiny-trends', title:'TINY TRENDS', cat:'Advertising', client:'TINY TRENDS',
    type:'Fashion / Children\'s Clothing Promotion',
    colors:['#F6DEED', '#FDFCF9', '#2F2D2F'],
    desc:'A promotional flyer for a children\'s hairstyling business, using a portrait grid to showcase a range of styles.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/tiny-trends/5 x 4 inches copy.jpg", alt:"TINY TRENDS — image 1"}
      ]
    }
  },
  {
    id:'afis-special', title:'AFI\'S SPECIAL', cat:'Advertising', client:'AFI\'S SPECIAL',
    type:'Food Promotional Campaign',
    colors:['#F89414', '#FE0200', '#F6F2B4'],
    desc:'A food promotional flyer showcasing a menu of local dishes in a bold red-and-yellow layout.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/afis-special/5 x4.JPG", alt:"AFI\'S SPECIAL — image 1"}
      ]
    }
  },
  {
    id:'korklui-corn-porridge', title:'KORKLUI CORN PORRIDGE', cat:'Advertising', client:'KORKLUI CORN PORRIDGE',
    type:'Food Product Advertisement',
    colors:['#F8F9EF', '#B2D7B2', '#F7DF5D'],
    desc:'A product advertisement for a corn porridge mix, built around clean packaging photography and preparation instructions.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/korklui-corn-porridge/6 x 3.jpg", alt:"KORKLUI CORN PORRIDGE — image 1"}
      ]
    }
  },
  {
    id:'christ-apostolic-international-convention', title:'CHRIST APOSTOLIC CHURCH — INTERNATIONAL CONVENTION', cat:'Flyers & Posters', client:'CHRIST APOSTOLIC CHURCH — INTERNATIONAL CONVENTION',
    type:'Church Event Campaign',
    colors:['#AEAAF7', '#CAC5F2', '#291D73'],
    desc:'An event poster for a church\'s international prophetic convention, combining ministerial portraits with the event theme and dates.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/flyers-posters/christ-apostolic-international-convention/6 x 4 copy (2).JPG", alt:"CHRIST APOSTOLIC CHURCH — INTERNATIONAL CONVENTION — image 1"}
      ]
    }
  },
  {
    id:'mid-year-harvest', title:'MID-YEAR HARVEST', cat:'Flyers & Posters', client:'MID-YEAR HARVEST',
    type:'Church Event Poster',
    colors:['#C3EBF6', '#E3F9FC', '#549CDC'],
    desc:'An event poster for a church\'s mid-year harvest and thanksgiving service, built around a light, scripture-led layout.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/flyers-posters/mid-year-harvest/6 X 4 copy.jpg", alt:"MID-YEAR HARVEST — image 1"}
      ]
    }
  },
  {
    id:'free-zone-chop-bar', title:'FREE ZONE CHOP BAR', cat:'Advertising', client:'FREE ZONE CHOP BAR',
    type:'Restaurant Promotional Campaign',
    colors:['#C39040', '#291E16', '#060202'],
    desc:'A restaurant promotional flyer for a pub and kitchen, showcasing dishes and opening hours in a dark, high-contrast layout.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/free-zone-chop-bar/6 x 4.JPG", alt:"FREE ZONE CHOP BAR — image 1"}
      ]
    }
  },
  {
    id:'angies-catering', title:'ANGIE\'S CATERING', cat:'Advertising', client:'ANGIE\'S CATERING',
    type:'Catering Promotional Design',
    colors:['#7B3615', '#FAFBFA', '#F0EADA'],
    desc:'A promotional flyer for a catering and pastries business, pairing a chef mark with event booking details.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/angies-catering/angie.jpg", alt:"ANGIE\'S CATERING — image 1"}
      ]
    }
  },
  {
    id:'peace-corner-bar', title:'PEACE CORNER BAR', cat:'Advertising', client:'PEACE CORNER BAR',
    type:'Bar / Entertainment Branding & Promotion',
    colors:['#FFFFFF', '#17B5EC', '#BB885C'],
    desc:'A set of promotional designs for a bar, spanning a bottle-display flyer, a food-and-drinks menu board, and a live-music event flyer.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/peace-corner-bar/Peace corner copy.jpg", alt:"PEACE CORNER BAR — image 1"},
        {src:"../images/portfolio/advertising/peace-corner-bar/Back.JPG", alt:"PEACE CORNER BAR — image 2"},
        {src:"../images/portfolio/advertising/peace-corner-bar/lumba copy.jpg", alt:"PEACE CORNER BAR — image 3"}
      ]
    }
  },
  {
    id:'calvary-free-health-screening', title:'CALVARY COMMISSION — FREE HEALTH SCREENING', cat:'Flyers & Posters', client:'CALVARY COMMISSION — FREE HEALTH SCREENING',
    type:'Community / Health Outreach Poster',
    colors:['#A3E7FC', '#F2FAFC', '#56BEDF'],
    desc:'An outreach poster for a free community health-screening event, built around a clean, bright healthcare-themed layout.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/flyers-posters/calvary-free-health-screening/Calvary copy.jpg", alt:"CALVARY COMMISSION — FREE HEALTH SCREENING — image 1"}
      ]
    }
  },
  {
    id:'divine-cold-store', title:'DIVINE COLD STORE', cat:'Advertising', client:'DIVINE COLD STORE',
    type:'Food / Cold Store Promotional Design',
    colors:['#D38665', '#FEEEB3', '#7A8065'],
    desc:'An advertising flyer for a cold store and foodstuff supplier, using a dense product photo grid to display the full range of stock.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/divine-cold-store/DIVINE 4X4 copy.jpg", alt:"DIVINE COLD STORE — image 1"}
      ]
    }
  },
  {
    id:'gospel-revival-network', title:'GOSPEL REVIVAL NETWORK — THE GOD FACTOR', cat:'Flyers & Posters', client:'GOSPEL REVIVAL NETWORK — THE GOD FACTOR',
    type:'Church / Gospel Event Poster',
    colors:['#4A8EA7', '#26526B', '#1E2932'],
    desc:'An event poster for a gospel programme, pairing a portrait of the host pastor with the event schedule and platform details.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/flyers-posters/gospel-revival-network/prayer.jpg", alt:"GOSPEL REVIVAL NETWORK — THE GOD FACTOR — image 1"}
      ]
    }
  },
  {
    id:'empress-dee-shito', title:'EMPRESS DEE SHITO', cat:'Advertising', client:'EMPRESS DEE SHITO',
    type:'Food Product Advertisement',
    colors:['#000000', '#0A0B0A', '#A78959'],
    desc:'A product advertisement for a signature shito pepper sauce, built around clean packaging photography and ingredient callouts.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/empress-dee-shito/shito 10 x 2.8.JPG", alt:"EMPRESS DEE SHITO — image 1"}
      ]
    }
  },
  {
    id:'empress-dee-tom-brown', title:'EMPRESS DEE TOM BROWN', cat:'Advertising', client:'EMPRESS DEE TOM BROWN',
    type:'Food Product Advertisement',
    colors:['#7C3B1C', '#C8965A', '#D1B692'],
    desc:'A product advertisement for a tom brown cereal blend, built around clean packaging photography and ingredient callouts.',
    size:'normal',
    media:{
      kind:'gallery',
      images:[
        {src:"../images/portfolio/advertising/empress-dee-tom-brown/tom brown 4.8 x 2.8.JPG", alt:"EMPRESS DEE TOM BROWN — image 1"}
      ]
    }
  },
  {
    id:'crimson-tshirts', title:'CRIMSON STUDIO T-SHIRT DESIGNS', cat:'Clothing', client:'Crimson Studio',
    type:'T-Shirt Design', date:'May 2026', tools:'Adobe Photoshop, Adobe Illustrator',
    colors:['#F97316','#0A0A0C','#F5F3F0','#C8102E'],
    desc:'Creative custom T-shirt designs for Crimson Studio featuring bold character artwork, typography, distinctive graphic compositions, and a range of unique visual concepts.',
    size:'wide',
    detailUrl:'/portfolio/crimson-studio-t-shirt-designs/',
    media:{
      kind:'gallery',
      images:Array.from({length:13}, (_,i)=>{
        const n = String(i+1).padStart(2,'0');
        return {
          src:`../images/clothing/crimson-studio/crimson-studio-shirt-${n}.jpg`,
          alt:`Crimson Studio T-shirt design ${n}`
        };
      })
    }
  },
];

/* ---------- SVG mockup generator ---------- */
function mockSVG(p, seed){
  const s = seed || 1;
  return `<svg viewBox="0 0 400 400" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g${s}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${p.media.c1}"/>
        <stop offset="100%" stop-color="${p.media.c2}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#g${s})"/>
    <circle cx="${80+s*30}" cy="${100+s*20}" r="${60+s*8}" fill="rgba(245,243,240,0.05)"/>
    <rect x="${40}" y="${260+s*4}" width="${180}" height="${2}" fill="rgba(245,243,240,0.25)"/>
    <text x="40" y="330" font-family="Unbounded, sans-serif" font-weight="700" font-size="22" fill="rgba(245,243,240,0.92)">${p.title.split(' ').slice(0,2).join(' ')}</text>
    <text x="40" y="354" font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="1" fill="rgba(200,16,46,0.95)">${p.cat.toUpperCase()}</text>
  </svg>`;
}

/* ---------- Small metadata icons ---------- */
const ICONS = {
  person:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>',
  grid:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  calendar:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>',
  pencil:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  palette:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3a9 9 0 1 0 0 18c1 0 2-.5 2-2 0-.7-.3-1.1-.6-1.5-.3-.4-.6-.8-.6-1.5 0-1 .8-2 2-2h2a4 4 0 0 0 4-4c0-4.5-4-7-8.8-7Z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="10.5" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/></svg>'
};

/* ---------- Render filters ---------- */
const filterRow = document.getElementById('filterRow');
categories.forEach((c,i)=>{
  const b = document.createElement('button');
  b.className = 'filter-btn' + (i===0?' active':'');
  b.textContent = c;
  b.dataset.cat = c;
  b.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    filterPortfolio(c);
  });
  filterRow.appendChild(b);
});

/* ---------- Render portfolio grid ---------- */
const portfolioGrid = document.getElementById('portfolioGrid');
projects.forEach((p,i)=>{
  const el = document.createElement('div');
  el.className = 'portfolio-item' + (p.size==='wide'?' wide':'') + (p.size==='tall'?' tall':'');
  el.dataset.cat = p.cat;
  const visual = p.media.kind==='gallery'
    ? `<img src="${p.media.images[0].src}" alt="${p.media.images[0].alt}" loading="lazy" decoding="async">`
    : mockSVG(p, (i%5)+1);
  const badge = p.media.kind==='gallery' ? `<div class="p-badge mono">${p.media.images.length} Designs</div>` : '';
  el.innerHTML = `<div class="p-visual">${visual}</div>
    ${badge}
    <div class="p-overlay"><div class="p-cat mono">${p.cat}</div><div class="p-title">${p.title}</div></div>`;
  el.addEventListener('click', ()=>openProject(i));
  el.setAttribute('tabindex','0');
  el.setAttribute('role','button');
  el.setAttribute('aria-label','View project: '+p.title);
  el.addEventListener('keydown', (e)=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); openProject(i);} });
  portfolioGrid.appendChild(el);
});

function filterPortfolio(cat){
  document.querySelectorAll('.portfolio-item').forEach((el)=>{
    const show = cat==='All' || el.dataset.cat===cat;
    el.classList.toggle('hidden-item', !show);
  });
}

/* ---------- Project viewer (modal) ---------- */
const modalBackdrop = document.getElementById('modalBackdrop');
const modalContent = document.getElementById('modalContent');
let currentProjectIndex = 0;
let currentDesignIndex = 0;

function metaRow(iconKey, label, valueHtml){
  return `<div class="viewer-meta-row">
    <span class="viewer-meta-icon">${ICONS[iconKey]}</span>
    <div><div class="viewer-meta-k mono">${label}</div><div class="viewer-meta-v">${valueHtml}</div></div>
  </div>`;
}

function renderProject(){
  const p = projects[currentProjectIndex];
  const isGallery = p.media.kind === 'gallery';
  currentDesignIndex = 0;

  const swatchesHtml = `<div class="viewer-swatches">${p.colors.map(c=>`<span class="viewer-swatch" style="background:${c}" title="${c}"></span>`).join('')}</div>`;

  const stageHtml = isGallery ? `
    <div class="viewer-main-image">
      <img id="viewerMainImg" src="${p.media.images[0].src}" alt="${p.media.images[0].alt}" loading="eager" decoding="async">
      <button class="viewer-design-nav prev" id="designPrev" aria-label="Previous design">‹</button>
      <button class="viewer-design-nav next" id="designNext" aria-label="Next design">›</button>
      <div class="viewer-design-counter mono">IMAGE <strong id="designCounterNum">01</strong> / ${p.media.images.length}</div>
    </div>
    <div class="viewer-thumbs" id="viewerThumbs">
      ${p.media.images.map((img,idx)=>`<button class="viewer-thumb${idx===0?' active':''}" data-idx="${idx}" aria-label="View ${img.alt}"><img src="${img.src}" alt="${img.alt}" loading="lazy"></button>`).join('')}
    </div>
  ` : `
    <div class="viewer-main-image">${mockSVG(p, (currentProjectIndex%5)+1)}</div>
  `;

  modalContent.innerHTML = `
    <button class="viewer-close" id="modalCloseBtn" aria-label="Close project viewer">✕</button>
    <div class="viewer-body">
      <div class="viewer-stage">${stageHtml}</div>
      <div class="viewer-info">
        <div class="viewer-cat mono">${p.type}</div>
        <h3 class="viewer-title">${p.title}</h3>
        <div class="viewer-title-rule"></div>
        <p class="viewer-desc">${p.desc}</p>
        <div class="viewer-meta">
          ${metaRow('person','Client', p.client)}
          ${metaRow('grid','Category', p.cat)}
          ${p.date ? metaRow('calendar','Date', p.date) : ''}
          ${p.tools ? metaRow('pencil','Tools', p.tools) : ''}
          ${metaRow('palette','Colors', swatchesHtml)}
        </div>
        ${p.detailUrl
          ? `<a class="viewer-cta" id="viewFullBtn" href="${p.detailUrl}"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg> View Full Project</a>`
          : ''}
      </div>
    </div>
    <div class="viewer-projectnav">
      <button class="viewer-projectnav-btn" id="prevProjectBtn">‹ <span class="label">Previous Project</span></button>
      <div class="viewer-projectcounter mono"><strong>${String(currentProjectIndex+1).padStart(2,'0')}</strong> / ${String(projects.length).padStart(2,'0')}</div>
      <button class="viewer-projectnav-btn" id="nextProjectBtn"><span class="label">Next Project</span> ›</button>
    </div>`;

  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  document.getElementById('prevProjectBtn').addEventListener('click', ()=>{
    currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
    renderProject();
  });
  document.getElementById('nextProjectBtn').addEventListener('click', ()=>{
    currentProjectIndex = (currentProjectIndex + 1) % projects.length;
    renderProject();
  });

  if(isGallery){
    const mainImg = document.getElementById('viewerMainImg');
    const counterNum = document.getElementById('designCounterNum');
    const thumbs = document.querySelectorAll('.viewer-thumb');

    function showDesign(idx){
      currentDesignIndex = (idx + p.media.images.length) % p.media.images.length;
      const img = p.media.images[currentDesignIndex];
      mainImg.style.opacity = '0';
      setTimeout(()=>{
        mainImg.src = img.src;
        mainImg.alt = img.alt;
        mainImg.style.opacity = '1';
      }, 120);
      counterNum.textContent = String(currentDesignIndex+1).padStart(2,'0');
      thumbs.forEach(t=>t.classList.toggle('active', Number(t.dataset.idx)===currentDesignIndex));
      const activeThumb = document.querySelector(`.viewer-thumb[data-idx="${currentDesignIndex}"]`);
      if(activeThumb) activeThumb.scrollIntoView({behavior:'smooth', block:'nearest', inline:'center'});
    }

    document.getElementById('designPrev').addEventListener('click', ()=>showDesign(currentDesignIndex - 1));
    document.getElementById('designNext').addEventListener('click', ()=>showDesign(currentDesignIndex + 1));
    thumbs.forEach(t=>t.addEventListener('click', ()=>showDesign(Number(t.dataset.idx))));
  }
}

function openProject(i){
  currentProjectIndex = i;
  renderProject();
  modalBackdrop.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(){
  modalBackdrop.classList.remove('open');
  document.body.style.overflow='';
}
modalBackdrop.addEventListener('click', (e)=>{ if(e.target===modalBackdrop) closeModal(); });
document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape') closeModal();
  if(!modalBackdrop.classList.contains('open')) return;
  if(e.key==='ArrowLeft'){
    const prevDesignBtn = document.getElementById('designPrev');
    if(prevDesignBtn) prevDesignBtn.click();
  }
  if(e.key==='ArrowRight'){
    const nextDesignBtn = document.getElementById('designNext');
    if(nextDesignBtn) nextDesignBtn.click();
  }
});

/* ---------- Scroll reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  revealEls.forEach(el=>io.observe(el));
} else {
  revealEls.forEach(el=>el.classList.add('is-visible'));
}

/* ---------- Deep link: #project-N auto-opens that project's viewer ----------
   Used by the dedicated T-shirt project page's Previous/Next Project
   controls to hand off back into this portfolio page at the right project. */
(function handleProjectDeepLink(){
  const match = location.hash.match(/^#project-(\d+)$/);
  if(!match) return;
  const idx = Number(match[1]);
  if(idx < 0 || idx >= projects.length) return;
  openProject(idx);
})();
