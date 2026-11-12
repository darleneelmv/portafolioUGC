/* =====================================================================
   Darlyn Lova · Portafolio UGC
   Todo el contenido vive en /contenido/*.json y se edita desde /entrar.
   Este archivo solo arma la página y le da movimiento.
   ===================================================================== */
(() => {
"use strict";

const ARCHIVOS = ["general", "perfil", "sobre-mi", "videos", "servicios", "por-que-yo", "proceso", "marcas", "contacto"];
const $ = (s, c = document) => c.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
/* *texto* → texto resaltado (rosa / cursiva) */
const em = s => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
const txt = (sel, v) => { const el = $(sel); if (el) el.textContent = v ?? ""; };
const htm = (sel, v) => { const el = $(sel); if (el) el.innerHTML = v ?? ""; };
const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
const lista = v => Array.isArray(v) ? v.filter(x => x !== null && x !== undefined && x !== "") : [];

/* Las invitaciones y recuperaciones de contraseña de Netlify llegan a la portada:
   se carga el widget solo en ese caso y se manda al panel. */
if (/(invite|recovery|confirmation|email_change)_token/.test(location.hash)) {
  const s = document.createElement("script");
  s.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
  s.onload = () => {
    window.netlifyIdentity.on("init", u => { if (!u) window.netlifyIdentity.on("login", () => { location.href = "/entrar/"; }); });
    window.netlifyIdentity.init();
  };
  document.head.appendChild(s);
}

async function cargar() {
  const resp = await Promise.all(ARCHIVOS.map(n =>
    fetch(`/contenido/${n}.json`, { cache: "no-cache" }).then(r => { if (!r.ok) throw new Error(n); return r.json(); })));
  return Object.fromEntries(ARCHIVOS.map((n, i) => [n.replace(/-/g, "_"), resp[i]]));
}

/* ---------- Estampado de leopardo generado ---------- */
function leopardo(base = "#c8945a", tam = 220, semilla = 7) {
  let s = semilla; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const forma = (cx, cy, rad, rot) => {
    const pts = 7, out = [];
    for (let k = 0; k < pts; k++) {
      const a = (k / pts) * Math.PI * 2, rr = rad * (0.7 + r() * 0.45);
      out.push([cx + Math.cos(a) * rr * 1.25, cy + Math.sin(a) * rr]);
    }
    let d = `M${out[0][0].toFixed(1)},${out[0][1].toFixed(1)}`;
    for (let k = 0; k < pts; k++) {
      const p = out[k], q = out[(k + 1) % pts];
      d += ` Q${p[0].toFixed(1)},${p[1].toFixed(1)} ${((p[0] + q[0]) / 2).toFixed(1)},${((p[1] + q[1]) / 2).toFixed(1)}`;
    }
    return `<path d="${d}Z" transform="rotate(${rot.toFixed(0)} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`;
  };
  let centros = "", manchas = "";
  const roseta = (x, y) => {
    const R = 12 + r() * 7;
    centros += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(R * 0.9).toFixed(1)}" ry="${(R * 0.75).toFixed(1)}"/>`;
    const n = 4 + Math.floor(r() * 3), off = r() * 6;
    for (let k = 0; k < n; k++) {
      if (r() < 0.15) continue;
      const a = off + (k / n) * Math.PI * 2;
      manchas += forma(x + Math.cos(a) * R, y + Math.sin(a) * R * 0.85, 3.6 + r() * 3.2, (a * 180) / Math.PI);
    }
  };
  const pts = [];
  for (let i = 0; i < 16; i++) pts.push([r() * tam, r() * tam]);
  for (let i = 0; i < 10; i++) manchas += forma(r() * tam, r() * tam, 2 + r() * 2, r() * 360);
  pts.forEach(([x, y]) => {
    const g = s;
    for (const dx of [-tam, 0, tam]) for (const dy of [-tam, 0, tam]) {
      const X = x + dx, Y = y + dy;
      if (X > -30 && X < tam + 30 && Y > -30 && Y < tam + 30) { s = g; roseta(X, Y); }
    }
    r(); r();
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tam}" height="${tam}" viewBox="0 0 ${tam} ${tam}">
    <rect width="100%" height="100%" fill="${base}"/><g fill="#000" opacity=".16">${centros}</g><g fill="#2a1408">${manchas}</g></svg>`;
  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`;
}

const FONDOS = {
  rojo: "linear-gradient(150deg,var(--rojo-vivo),#430b17)",
  leopardo: "var(--leopard), var(--leo)",
  rosa: "linear-gradient(150deg,var(--rosa),var(--rojo))",
  vino: "linear-gradient(150deg,#5a0f1d,#0e0306)"
};
const iconoPlay = `<svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z"/></svg>`;
const icoTT = `<svg viewBox="0 0 24 24"><path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.8 5.8 0 1 0 5 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.3-1.6z"/></svg>`;
const icoIG = `<svg viewBox="0 0 24 24"><path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21.5 8c0-1.6-.5-3-1.6-4S17.6 2.5 16 2.5H8C6.4 2.5 5 3 4 4S2.5 6.4 2.5 8v8c0 1.6.5 3 1.6 4s2.4 1.5 4 1.5h8c1.6 0 3-.5 4-1.5s1.5-2.4 1.5-4V8zm-2 8c0 1-.3 1.9-1 2.5-.6.7-1.5 1-2.5 1H8c-1 0-1.9-.3-2.5-1-.7-.6-1-1.5-1-2.5V8c0-1 .3-1.9 1-2.5.6-.7 1.5-1 2.5-1h8c1 0 1.9.3 2.5 1 .7.6 1 1.5 1 2.5v8z"/></svg>`;
const slug = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "seccion";

function pintar(D) {
  const G = D.general || {}, P = D.perfil || {}, S = D.sobre_mi || {}, V = D.videos || {},
        SV = D.servicios || {}, PQ = D.por_que_yo || {}, PR = D.proceso || {}, M = D.marcas || {}, C = D.contacto || {};
  const nombre = [P.nombre, P.apellido].filter(Boolean).join(" ");

  /* SEO y colores */
  if (G.seo?.titulo) document.title = G.seo.titulo;
  if (G.seo?.descripcion) $('meta[name="description"]').setAttribute("content", G.seo.descripcion);
  const raiz = document.documentElement.style, col = G.colores || {};
  if (col.rojo) { raiz.setProperty("--rojo", col.rojo); raiz.setProperty("--rojo-vivo", `color-mix(in srgb, ${col.rojo} 82%, #ff4d6d)`); }
  if (col.rosa) raiz.setProperty("--rosa", col.rosa);
  if (col.fondo) { raiz.setProperty("--vino-900", col.fondo); raiz.setProperty("--vino-800", `color-mix(in srgb, ${col.fondo} 80%, #3a0a14)`); }
  if (col.leopardo) raiz.setProperty("--leo", col.leopardo);
  raiz.setProperty("--leopard", leopardo(col.leopardo || "#c8945a"));

  /* Secciones visibles y menú */
  const vis = Object.assign({ sobre: true, portafolio: true, servicios: true, porque: true, proceso: true, marcas: true, contacto: true }, G.secciones || {});
  if (!lista(M.marcas).length) vis.marcas = false;
  const MENU = [["sobre", "Sobre mí"], ["portafolio", "Portafolio"], ["servicios", "Servicios"], ["marcas", "Marcas"], ["contacto", "Contacto"]];
  Object.entries(vis).forEach(([id, v]) => { const el = document.getElementById(id); if (el) el.hidden = !v; });
  htm("#menu", MENU.filter(([id]) => vis[id]).map(([id, t]) => `<li><a href="#${id}">${t}</a></li>`).join(""));
  txt("#btn-barra", G.boton_barra || "Trabajemos juntas");
  $("#btn-barra").hidden = !vis.contacto;

  /* Logo */
  const logo = `${esc(P.nombre)} <span style="color:var(--rosa)">${esc(P.apellido)}</span>`;
  htm("#logo", logo); htm("#logo-pie", logo); txt("#pie", G.pie);

  /* Portada */
  txt("#h-etiqueta", P.etiqueta);
  $("#h-nombre").setAttribute("aria-label", nombre);
  txt("#h-nombre .l1", P.nombre); txt("#h-nombre .l2", P.apellido);
  txt("#h-frase", P.frase);
  htm("#h-temas", lista(P.temas).map(t => `<li><b>✦</b> ${esc(t)}</li>`).join(""));
  txt("#h-btn1", P.boton_videos); txt("#h-btn2", P.boton_contacto);
  htm("#stats", lista(P.stats).map(s => {
    const n = parseFloat(s.numero);
    return `<div class="stat"><b ${isFinite(n) ? `data-numero="${n}"` : ""} data-sufijo="${esc(s.sufijo)}">${esc(s.numero)}${esc(s.sufijo)}</b><span>${esc(s.texto)}</span></div>`;
  }).join(""));
  htm("#foto-principal", P.foto
    ? `<img src="${esc(P.foto)}" alt="${esc(nombre)}">`
    : `<div class="marco-vacio"><div><p>${esc(P.nombre)}</p><small>✦</small></div></div>`);
  txt("#sello-texto", P.sello); txt("#sello-iniciales", P.iniciales);
  const cinta = (sel, items) => { const h = lista(items).map(t => `<span>${esc(t)}</span>`).join(""); htm(sel, h + h + h + h); };
  cinta("#cinta1", P.cinta1); cinta("#cinta2", P.cinta2);

  /* Sobre mí */
  txt("#s-etiqueta", S.etiqueta); htm("#s-titulo", em(S.titulo));
  htm("#s-parrafos", lista(S.parrafos).map((p, i) => `<p class="rev d${Math.min(i + 1, 5)}">${em(p)}</p>`).join(""));
  htm("#polaroids", lista(S.fotos).slice(0, 2).map(f =>
    `<figure class="pola" style="margin:0"><div class="pola-in">${f.foto ? `<img src="${esc(f.foto)}" alt="${esc(f.pie)}" loading="lazy">` : `<span>${esc(f.palabra)}</span>`}</div><figcaption>${esc(f.pie)}</figcaption></figure>`).join(""));
  htm("#datos", [["Desde", P.ubicacion], ["Usuario", P.usuario], ["Idioma", P.idioma]].filter(([, v]) => v)
    .map(([b, s]) => `<div class="dato"><b>${b}</b><span>${esc(s)}</span></div>`).join(""));

  /* Portafolio */
  txt("#p-etiqueta", V.etiqueta); htm("#p-titulo", em(V.titulo)); txt("#p-sub", V.subtitulo);
  let n = 0;
  /* Un video puede ser un archivo propio (.mp4) o el link de un video de TikTok */
  const idTikTok = u => (String(u || "").match(/tiktok\.com\/.*\/video\/(\d+)/) || [])[1] || "";
  const esArchivo = u => !!u && !idTikTok(u) && (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(u) || u.startsWith("/"));
  const tarjeta = v => {
    const i = n++;
    const ttId = idTikTok(v.video) || idTikTok(v.tiktok);
    const archivo = esArchivo(v.video) ? v.video : "";
    const link = ttId ? `https://www.tiktok.com/@${(String(v.video || v.tiktok).match(/@([^/]+)/) || [, "tiktok"])[1]}/video/${ttId}` : (v.tiktok || "");
    let medio, play = "", verTT = "";
    if (archivo) {
      medio = `<video src="${esc(archivo)}" ${v.portada ? `poster="${esc(v.portada)}"` : ""} muted loop playsinline preload="metadata"></video>`;
      play = `<button class="play" type="button" data-sonido aria-label="Activar sonido">${iconoPlay}</button>`;
      if (link) verTT = `<a class="ver-tt" href="${esc(link)}" target="_blank" rel="noopener" aria-label="Ver en TikTok">${icoTT}</a>`;
    } else if (ttId) {
      /* Reproductor oficial de TikTok dentro del celular */
      medio = `<iframe class="tt-player" src="https://www.tiktok.com/player/v1/${ttId}?loop=1&amp;music_info=0&amp;description=0&amp;rel=0&amp;native_context_menu=0&amp;fullscreen_button=0" title="${esc(v.titulo)}" loading="lazy" allow="autoplay; fullscreen; encrypted-media" allowfullscreen></iframe>`;
    } else {
      medio = v.portada ? `<img src="${esc(v.portada)}" alt="" loading="lazy">`
        : `<div class="vacia" style="--fondo-tarjeta:${Object.values(FONDOS)[i % 4]}"><span class="grande">${esc(v.palabra || v.etiqueta)}</span><h3>${esc(v.titulo)}</h3>${link ? `<small>Míralo en mi TikTok</small>` : ""}</div>`;
      if (link) play = `<a class="play" href="${esc(link)}" target="_blank" rel="noopener" aria-label="Ver «${esc(v.titulo)}» en TikTok">${iconoPlay}</a>`;
    }
    return `<article class="tarjeta rev d${(i % 4) + 1}">
      <div class="telefono" ${ttId && !archivo ? "" : "data-tilt"}><div class="pantalla">${medio}
        ${v.vistas && !(ttId && !archivo) ? `<span class="vistas">▶ ${esc(v.vistas)}</span>` : ""}${play}${verTT}</div></div>
      <div class="pie-tarjeta"><span class="marca">${esc(v.etiqueta || v.titulo)}</span><span class="tipo">${esc(v.tipo)}</span></div>
    </article>`;
  };
  const cats = lista(V.categorias).map(c => ({ ...c, id: slug(c.nombre), lista: lista(c.videos) })).filter(c => c.lista.length);
  const cuenta = k => `${k} video${k === 1 ? "" : "s"}`;
  htm("#sectores", cats.map(c => `<a class="sector" href="#sec-${c.id}" style="--fondo-sector:${FONDOS[c.estilo] || FONDOS.rojo}"><b>${esc(c.nombre)}</b><span>${cuenta(c.lista.length)}</span></a>`).join(""));
  htm("#bloques", cats.map(c => `<div class="bloque" id="sec-${c.id}">
    <div class="bloque-tit rev"><div class="izq"><h3>${esc(c.nombre)}</h3><p>${esc(c.texto)}</p></div><span class="cuenta">${cuenta(c.lista.length)}</span></div>
    <div class="galeria">${c.lista.map(tarjeta).join("")}</div></div>`).join(""));

  /* Servicios */
  txt("#sv-etiqueta", SV.etiqueta); htm("#sv-titulo", em(SV.titulo)); txt("#sv-sub", SV.subtitulo);
  htm("#cartas", lista(SV.cartas).map((s, i) => `<article class="carta ${s.roja ? "roja" : ""} rev d${(i % 3) + 1}">
    <span class="indice ar">${esc(s.indice)}<i>${esc(s.palo)}</i></span><span class="indice ab">${esc(s.indice)}<i>${esc(s.palo)}</i></span><span class="palo" aria-hidden="true">${esc(s.palo)}</span>
    <h3>${esc(s.titulo)}</h3><p>${esc(s.texto)}</p></article>`).join(""));

  /* Por qué yo y proceso */
  htm("#cita", em(PQ.cita));
  htm("#razones", lista(PQ.razones).map((r, i) => `<div class="razon rev d${Math.min(i + 1, 5)}"><b>${String(i + 1).padStart(2, "0")}</b><h3>${esc(r.titulo)}</h3><p>${esc(r.texto)}</p></div>`).join(""));
  txt("#pr-etiqueta", PR.etiqueta); htm("#pr-titulo", em(PR.titulo));
  htm("#pasos", lista(PR.pasos).map((p, i) => `<div class="paso rev d${Math.min(i + 1, 5)}"><div class="num">${i + 1}</div><h3>${esc(p.titulo)}</h3><p>${esc(p.texto)}</p></div>`).join(""));

  /* Marcas */
  txt("#m-etiqueta", M.etiqueta); htm("#m-titulo", em(M.titulo));
  htm("#logos", `<div class="logos">${lista(M.marcas).map(m => {
    const dentro = m.logo ? `<img src="${esc(m.logo)}" alt="${esc(m.nombre)}" style="max-height:48px;margin:auto">` : esc(m.nombre);
    return m.link ? `<a class="logo-marca" href="${esc(m.link)}" target="_blank" rel="noopener" style="text-decoration:none">${dentro}</a>` : `<div class="logo-marca">${dentro}</div>`;
  }).join("")}</div>`);

  /* Contacto */
  txt("#c-etiqueta", C.etiqueta); htm("#c-titulo", em(C.titulo)); txt("#c-sub", C.subtitulo);
  txt("#correo-texto", P.correo); txt("#copiar", C.boton_copiar || "Copiar correo"); txt("#escribir", C.boton_escribir || "Escribirme");
  $("#escribir").href = `mailto:${P.correo}?subject=${encodeURIComponent(C.asunto || "Colaboración")}`;
  htm("#redes", [
    P.tiktok && `<a href="${esc(P.tiktok)}" target="_blank" rel="noopener">${icoTT} TikTok ${esc(P.usuario)}</a>`,
    P.instagram && `<a href="${esc(P.instagram)}" target="_blank" rel="noopener">${icoIG} Instagram</a>`
  ].filter(Boolean).join(""));
  $("#copiar").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(P.correo); aviso("Correo copiado ✦"); }
    catch { const r = document.createRange(); r.selectNodeContents($("#correo-texto")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); aviso("Selecciona y copia el correo"); }
  });
}

function aviso(t) { const a = $("#aviso"); a.textContent = t; a.classList.add("ver"); clearTimeout(aviso.t); aviso.t = setTimeout(() => a.classList.remove("ver"), 2200); }

/* =====================================================================
   Movimiento
   ===================================================================== */
function mover() {
  const barra = $("#barra");
  const alScroll = () => barra.classList.toggle("solida", scrollY > 40);
  addEventListener("scroll", alScroll, { passive: true }); alScroll();

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("ver"); io.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll(".rev").forEach(el => io.observe(el));

  const ioNum = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; ioNum.unobserve(e.target);
    const el = e.target, fin = parseFloat(el.dataset.numero), suf = el.dataset.sufijo || "", dec = String(fin).includes(".") ? 1 : 0;
    if (reducido) return;
    const t0 = performance.now(), dur = 1600;
    const paso = t => { const p = Math.min((t - t0) / dur, 1), k = 1 - Math.pow(1 - p, 4);
      el.textContent = (fin * k).toFixed(dec) + suf; if (p < 1) requestAnimationFrame(paso); };
    requestAnimationFrame(paso);
  }), { threshold: .6 });
  document.querySelectorAll("[data-numero]").forEach(el => ioNum.observe(el));

  /* Videos: se reproducen solos al aparecer; el botón activa el sonido */
  const ioVideo = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target; if (e.isIntersecting) v.play().catch(() => {}); else v.pause();
  }), { threshold: .5 });
  document.querySelectorAll(".pantalla video").forEach(v => ioVideo.observe(v));
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-sonido]"); if (!b) return;
    const v = b.closest(".pantalla").querySelector("video");
    document.querySelectorAll(".pantalla video").forEach(o => { if (o !== v) { o.muted = true; const ob = o.closest(".pantalla").querySelector("[data-sonido]"); if (ob) ob.style.opacity = 1; } });
    v.muted = !v.muted; v.play().catch(() => {});
    b.style.opacity = v.muted ? 1 : 0;
  });

  if (!reducido && matchMedia("(hover:hover)").matches) {
    const brillo = $(".brillo"); let bx = innerWidth / 2, by = innerHeight / 2, cx = bx, cy = by;
    addEventListener("pointermove", e => { bx = e.clientX; by = e.clientY; });
    (function sigue() { cx += (bx - cx) * .12; cy += (by - cy) * .12; brillo.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(sigue); })();

    document.querySelectorAll("[data-tilt], #marco").forEach(el => {
      el.addEventListener("pointermove", e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(0)`;
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
    document.querySelectorAll(".magnetico").forEach(b => {
      b.addEventListener("pointermove", e => { const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; });
    });
  }

  if (window.gsap && !reducido) {
    gsap.from(".hero .intro", { y: 50, opacity: 0, duration: 1.1, ease: "power3.out", stagger: .09, delay: .1 });
    gsap.from(".hero h1 .l2", { x: -40, duration: 1.4, ease: "power3.out", delay: .3 });
    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(".retrato", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-texto", { yPercent: 10, opacity: .3, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray(".pola").forEach((p, i) => gsap.to(p, { y: i ? -40 : 30, ease: "none", scrollTrigger: { trigger: ".sobre", start: "top bottom", end: "bottom top", scrub: true } }));
      gsap.to(".cita .comillas", { y: 80, rotate: 8, ease: "none", scrollTrigger: { trigger: ".porque", start: "top bottom", end: "bottom top", scrub: true } });
    }
  }
}

document.body.classList.remove("sin-js");
cargar()
  .then(D => { pintar(D); document.body.classList.remove("cargando"); mover(); })
  .catch(err => {
    console.error("No se pudo cargar el contenido:", err);
    document.body.classList.remove("cargando");
    document.body.insertAdjacentHTML("beforeend", `<div class="error-carga"><p>No se pudo cargar el contenido. Recarga la página.</p></div>`);
  });
})();
