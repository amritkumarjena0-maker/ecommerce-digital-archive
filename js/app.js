var ITEMS=[
{id:"HF-014",t:"Harbour Survey Chart, 1887",c:"Maps",y:1887,p:18,src:"Port Authority Collection",fmt:"TIFF, 600 dpi",size:"212 MB",d:"Hand-inked depth soundings of the inner harbour, scanned from the original linen-backed sheet.",added:9},
{id:"HF-022",t:"Market Street, Morning Rush",c:"Photographs",y:1931,p:12,src:"Delgado Family Papers",fmt:"JPEG, 6000 px",size:"38 MB",d:"Glass-plate negative of the produce market before opening hours, restored to remove cracks.",added:8},
{id:"HF-031",t:"Ledger of the Weavers' Guild",c:"Manuscripts",y:1764,p:35,src:"Guildhall Records",fmt:"PDF, 142 pages",size:"460 MB",d:"Complete membership and dues ledger, with a searchable transcription of every entry.",added:7},
{id:"HF-040",t:"Fishermen's Songs, Reel 3",c:"Audio",y:1958,p:9,src:"Coastal Folk Recordings",fmt:"WAV, 24-bit",size:"540 MB",d:"Field recordings of work songs captured on open reel, with a printed transcript of the lyrics.",added:6},
{id:"HF-047",t:"Rail Timetable, Winter 1912",c:"Ephemera",y:1912,p:6,src:"Eastline Railway Papers",fmt:"PDF, 24 pages",size:"58 MB",d:"Printed timetable with fold-out route map, scanned front and back.",added:5},
{id:"HF-052",t:"Cathedral Roofline Drawings",c:"Maps",y:1902,p:22,src:"Diocesan Architects",fmt:"TIFF, 400 dpi",size:"310 MB",d:"Six elevation drawings in ink and wash, scanned flat with colour targets.",added:4},
{id:"HF-063",t:"Strike Meeting, Dock Gate",c:"Photographs",y:1926,p:14,src:"Union Hall Collection",fmt:"JPEG, 5400 px",size:"31 MB",d:"Crowd outside the dock gate during the 1926 strike, from a salvaged print.",added:3},
{id:"HF-071",t:"Letters from the Lighthouse",c:"Manuscripts",y:1879,p:28,src:"Keeper's Correspondence",fmt:"PDF, 86 pages",size:"190 MB",d:"Forty-one letters between a lighthouse keeper and his family, with a plain-text transcript.",added:2},
{id:"HF-079",t:"Harvest Fair Handbill",c:"Ephemera",y:1923,p:5,src:"County Fair Association",fmt:"JPEG, 4000 px",size:"22 MB",d:"Letterpress handbill advertising prizes, rides and a brass band contest.",added:1}
];
var COLORS={Maps:"#c7d3d9",Photographs:"#d9d3c7",Manuscripts:"#d3c7d3",Audio:"#c7d9d0",Ephemera:"#d9ccc7"};
var ICON={
Maps:'<path d="M6 14l16-6 20 6 16-6v42l-16 6-20-6-16 6z M22 8v42 M42 14v42"/>',
Photographs:'<rect x="6" y="14" width="52" height="36" rx="3"/><circle cx="32" cy="32" r="10"/><path d="M22 14l4-6h12l4 6"/>',
Manuscripts:'<path d="M14 6h28l10 10v42H14z M42 6v10h10 M22 28h22 M22 38h22 M22 48h14"/>',
Audio:'<circle cx="32" cy="32" r="24"/><circle cx="32" cy="32" r="7"/><path d="M32 8v10 M56 32H46"/>',
Ephemera:'<path d="M10 12h44v40H10z M18 22h28 M18 32h28 M18 42h16"/>'};
var cart=[],owned=[];
try{cart=JSON.parse(localStorage.getItem("hf_cart")||"[]")}catch(e){cart=[]}
function save(){try{localStorage.setItem("hf_cart",JSON.stringify(cart))}catch(e){}}
function $(i){return document.getElementById(i)}
function money(n){return "$"+n.toFixed(2)}
function icon(c){return '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">'+ICON[c]+'</svg>'}
var cats=[];ITEMS.forEach(function(i){if(cats.indexOf(i.c)<0)cats.push(i.c)});
cats.forEach(function(c){var o=document.createElement("option");o.value=c;o.textContent=c;$("cat").appendChild(o)});
function render(){
  var q=$("q").value.toLowerCase().trim(),c=$("cat").value,s=$("sort").value;
  var list=ITEMS.filter(function(i){return(!c||i.c===c)&&(!q||(i.t+" "+i.src+" "+i.y+" "+i.d).toLowerCase().indexOf(q)>-1)});
  list.sort(function(a,b){return s==="low"?a.p-b.p:s==="year"?a.y-b.y:b.added-a.added});
  $("grid").innerHTML=list.length?list.map(function(i){
    var inCart=cart.indexOf(i.id)>-1;
    return '<article class="card"><div class="thumb" style="background:'+COLORS[i.c]+';color:#17262e"><span class="ref">'+i.id+'</span>'+icon(i.c)+'</div><div class="body"><h3>'+i.t+'</h3><div class="meta">'+i.c+', '+i.y+'</div><button class="view" data-view="'+i.id+'">View details</button><div class="row"><span class="price">'+money(i.p)+'</span><button class="add" data-add="'+i.id+'"'+(inCart?' disabled':'')+'>'+(inCart?'In cart':'Add to cart')+'</button></div></div></article>';
  }).join(""):'<p class="empty">No items match. Clear the search or choose All formats.</p>';
  $("count").textContent=cart.length;
}
function find(id){return ITEMS.filter(function(i){return i.id===id})[0]}
function add(id){if(cart.indexOf(id)<0)cart.push(id);save();render()}
function showItem(id){
  var i=find(id);
  $("itemBody").innerHTML='<button class="close" data-close="item">Close</button><h2>'+i.t+'</h2><div class="meta">'+i.id+' from '+i.src+'</div><p>'+i.d+'</p><dl class="spec"><dt>Category</dt><dd>'+i.c+'</dd><dt>Year</dt><dd>'+i.y+'</dd><dt>File</dt><dd>'+i.fmt+'</dd><dt>Size</dt><dd>'+i.size+'</dd><dt>Licence</dt><dd>Personal and educational use</dd></dl><button class="full" data-add="'+i.id+'" data-close="item">Add to cart for '+money(i.p)+'</button>';
  $("item").showModal();
}
function showCart(){
  var tot=0;
  var html='<button class="close" data-close="cart">Close</button><h2>Your cart</h2>';
  if(!cart.length){html+='<p class="meta">Your cart is empty. Add an item from the archive to begin.</p>'}
  else{
    cart.forEach(function(id){var i=find(id);tot+=i.p;html+='<div class="line"><span>'+i.t+'<br><span class="meta">'+i.fmt+'</span></span><span>'+money(i.p)+'<br><button data-rm="'+id+'">Remove</button></span></div>'});
    html+='<div class="total"><span>Total</span><span>'+money(tot)+'</span></div><button class="full" id="buy">Complete purchase</button>';
  }
  $("cartBody").innerHTML=html;
  if(!$("cart").open)$("cart").showModal();
}
function buy(){
  owned=cart.slice();cart=[];save();render();
  var html='<button class="close" data-close="cart">Close</button><span class="stamp">PURCHASED</span><h2>Your downloads</h2><p class="meta">Order confirmed. These files are placeholders in this demo.</p>';
  owned.forEach(function(id){var i=find(id);html+='<a class="dl" href="#" data-dl="'+id+'">Download '+i.t+' ('+i.size+')</a>'});
  $("cartBody").innerHTML=html;
}
document.addEventListener("click",function(e){
  var t=e.target.closest("[data-add],[data-view],[data-rm],[data-close],[data-dl],#buy,#cartBtn");
  if(!t)return;
  if(t.id==="cartBtn")return showCart();
  if(t.id==="buy")return buy();
  if(t.dataset.dl){e.preventDefault();t.textContent="Download started: "+find(t.dataset.dl).t;return}
  if(t.dataset.add)add(t.dataset.add);
  if(t.dataset.view)showItem(t.dataset.view);
  if(t.dataset.rm){cart=cart.filter(function(x){return x!==t.dataset.rm});save();render();showCart()}
  if(t.dataset.close)$(t.dataset.close).close();
});
["q","cat","sort"].forEach(function(i){$(i).addEventListener("input",render)});
render();
