import { useState, useEffect, useRef } from "react";
import './App.css'
import Header from './Header'
import Header2 from './Header2'
import Third from './Third'
import { Link } from 'react-router-dom'
import Signup from "./pages/Signup";

const DESTINATIONS = [
  { id: 1, name: "Santorini", country: "GREECE",    price: "From $799",   tag: "Popular",   image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&q=80" },
  { id: 2, name: "Maldives",  country: "MALDIVES",  price: "From $899",   tag: "Luxury",    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500&q=80" },
  { id: 3, name: "Phuket",    country: "THAILAND",  price: "From $649",   tag: "Adventure", image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=500&q=80" },
  { id: 4, name: "Bali",      country: "INDONESIA", price: "From $699",   tag: "Culture",   image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=500&q=80" },
];

const EXPERIENCES = [
  { id: 1, name: "Paris",  country: "FRANCE", price: "From $999",   image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=700&q=80" },
  { id: 2, name: "Tokyo",  country: "JAPAN",  price: "From $1,199", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=700&q=80" },
  { id: 3, name: "Dubai",  country: "UAE",    price: "From $849",   image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80" },
];

const TRUST = [
  { icon: "💰", title: "Best Price Guarantee", desc: "We guarantee the best prices on all bookings" },
  { icon: "🎧", title: "24/7 Customer Support", desc: "We are here to help you anytime, anywhere" },
  { icon: "🏨", title: "Handpicked Hotels",     desc: "Curated luxury stays for a perfect experience" },
  { icon: "🔒", title: "Secure Booking",        desc: "Book with confidence and total peace of mind" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --gold:   #F5A623;
    --gold2:  #D4851A;
    --dark:   #080808;
    --dark2:  #101010;
    --dark3:  #181818;
    --dark4:  #222;
    --white:  #FFFFFF;
    --muted:  #9CA3AF;
    --border: rgba(255,255,255,0.07);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Outfit', sans-serif;
    background: var(--dark);
    color: var(--white);
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--dark2); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

  /* ── NAVBAR ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 900;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.25rem 2.5rem;
    transition: all .35s ease;
  }
  .nav.solid {
    background: rgba(8,8,8,.97);
    backdrop-filter: blur(24px);
    padding: .85rem 2.5rem;
    border-bottom: 1px solid rgba(245,166,35,.15);
    box-shadow: 0 4px 40px rgba(0,0,0,.6);
  }
  .nav-logo { display: flex; align-items: center; gap: .6rem; cursor: pointer; text-decoration: none; }
  .nav-badge {
    width: 40px; height: 40px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--gold2));
    display: flex; align-items: center; justify-content: center;
    font-size: 1.15rem; box-shadow: 0 4px 14px rgba(245,166,35,.4); flex-shrink: 0;
  }
  .nav-name { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 700; letter-spacing: .5px; color: #fff; display: block; line-height: 1; }
  .nav-sub  { font-size: .55rem; letter-spacing: 3px; color: var(--gold); text-transform: uppercase; display: block; margin-top: 2px; }

  .nav-links { display: flex; align-items: center; gap: 2rem; list-style: none; }
  .nav-links a {
    text-decoration: none; color: rgba(255,255,255,.75); font-size: .78rem;
    letter-spacing: 1.2px; text-transform: uppercase; font-weight: 500;
    position: relative; cursor: pointer; transition: color .3s;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: -5px; left: 0;
    width: 0; height: 2px; background: var(--gold); transition: width .3s;
  }
  .nav-links a:hover, .nav-links a.act { color: var(--gold); }
  .nav-links a:hover::after, .nav-links a.act::after { width: 100%; }

  .nav-btn {
    background: var(--gold); color: var(--dark); border: none;
    padding: .6rem 1.5rem; border-radius: 4px; font-family: 'Outfit', sans-serif;
    font-weight: 700; font-size: .78rem; letter-spacing: 1.2px;
    text-transform: uppercase; cursor: pointer; transition: all .3s;
    box-shadow: 0 4px 16px rgba(245,166,35,.3);
  }
  .nav-btn:hover { background: var(--gold2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(245,166,35,.45); }

  .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; background: none; border: none; }
  .hamburger span { display: block; width: 22px; height: 2px; background: #fff; border-radius: 2px; transition: all .3s; }

  /* ── DRAWER ── */
  .drawer {
    position: fixed; inset: 0; z-index: 950;
    background: rgba(8,8,8,.99);
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2rem;
    transform: translateX(100%); transition: transform .4s cubic-bezier(.77,0,.18,1);
    overflow-y: auto; padding: 2rem 1rem;
  }
  .drawer.open { transform: translateX(0); }
  .drawer-close {
    position: absolute; top: 1.5rem; right: 1.5rem;
    background: none; border: none; color: #fff; font-size: 1.6rem; cursor: pointer; line-height: 1;
  }
  .drawer a {
    font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 700;
    text-transform: uppercase; letter-spacing: 3px; color: #fff; text-decoration: none; cursor: pointer;
    transition: color .3s;
  }
  .drawer a:hover { color: var(--gold); }

  /* ── HERO ── */
  .hero {
    position: relative; height: 100svh; min-height: 580px; overflow: hidden;
    display: flex; align-items: center;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85');
    background-size: cover; background-position: center 40%;
    transform: scale(1.04);
  }
  .hero-grad {
    position: absolute; inset: 0;
    background: linear-gradient(105deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,.6) 55%, rgba(0,0,0,.3) 100%);
  }
  .hero-inner {
    position: relative; z-index: 2; width: 100%; max-width: 1240px;
    margin: 0 auto; padding: 5rem 2.5rem 2rem;
    display: flex; align-items: center; justify-content: space-between; gap: 3rem;
  }

  .hero-copy { flex: 1; max-width: 580px; }
  .hero-eyebrow {
    font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.5rem;
    color: var(--gold); margin-bottom: 1rem; letter-spacing: .5px;
    animation: up .7s .1s both;
  }
  .hero-h1 {
    font-family: 'Cormorant Garamond', serif; font-weight: 700; text-transform: uppercase;
    font-size: clamp(2.8rem, 6.5vw, 5.8rem); line-height: 1.03; letter-spacing: 2px;
    margin-bottom: 1.4rem; animation: up .7s .2s both;
  }
  .hero-h1 em { color: var(--gold); font-style: normal; }
  .hero-p {
    font-size: clamp(.88rem, 1.5vw, 1rem); color: rgba(255,255,255,.68); line-height: 1.75;
    max-width: 420px; margin-bottom: 2.2rem; animation: up .7s .3s both;
  }
  .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; animation: up .7s .4s both; }

  .btn-gold {
    display: inline-flex; align-items: center; gap: .5rem;
    background: var(--gold); color: var(--dark); border: 2px solid var(--gold);
    padding: .85rem 2rem; border-radius: 4px;
    font-weight: 700; font-size: .85rem; letter-spacing: 1.2px; text-transform: uppercase;
    cursor: pointer; transition: all .3s; text-decoration: none; white-space: nowrap;
  }
  .btn-gold:hover { background: var(--gold2); border-color: var(--gold2); transform: translateY(-3px); box-shadow: 0 10px 28px rgba(245,166,35,.45); }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: .5rem;
    background: transparent; color: #fff; border: 2px solid rgba(255,255,255,.35);
    padding: .85rem 2rem; border-radius: 4px;
    font-weight: 600; font-size: .85rem; letter-spacing: 1.2px; text-transform: uppercase;
    cursor: pointer; transition: all .3s; text-decoration: none; white-space: nowrap;
  }
  .btn-ghost:hover { border-color: #fff; background: rgba(255,255,255,.1); }

  .hero-stats { display: flex; gap: 2rem; margin-top: 2.5rem; animation: up .7s .5s both; flex-wrap: wrap; }
  .stat-val { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 700; color: var(--gold); line-height: 1; }
  .stat-lbl { font-size: .7rem; color: var(--muted); letter-spacing: 2px; text-transform: uppercase; margin-top: .2rem; }

  .hero-cards { display: flex; flex-direction: column; gap: .85rem; animation: fadeIn .8s .5s both; flex-shrink: 0; }
  .h-card {
    width: 230px; background: rgba(8,8,8,.82);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(245,166,35,.18); border-radius: 10px;
    padding: 1rem 1.2rem; display: flex; align-items: center; gap: 1rem;
    cursor: pointer; transition: all .3s;
  }
  .h-card:hover { background: rgba(245,166,35,.1); border-color: var(--gold); transform: translateX(-4px); }
  .h-icon { width: 38px; height: 38px; border-radius: 50%; background: var(--gold); display: flex; align-items: center; justify-content: center; font-size: 1.05rem; flex-shrink: 0; }
  .h-title { font-size: .82rem; font-weight: 600; color: #fff; }
  .h-sub   { font-size: .65rem; color: var(--muted); margin-top: 2px; }

  .scroll-hint {
    position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
    z-index: 2; display: flex; flex-direction: column; align-items: center; gap: .5rem;
    animation: bounce 2.5s infinite;
  }
  .scroll-lbl { font-size: .6rem; letter-spacing: 3px; text-transform: uppercase; color: rgba(255,255,255,.4); }
  .scroll-bar { width: 1px; height: 44px; background: linear-gradient(to bottom, var(--gold), transparent); }

  /* ── SECTION COMMONS ── */
  .wrap { max-width: 1240px; margin: 0 auto; padding: 0 2.5rem; }
  .sec  { padding: 5.5rem 0; }

  .tag { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.35rem; color: var(--gold); margin-bottom: .5rem; }
  .h2  { font-family: 'Cormorant Garamond', serif; font-weight: 700; text-transform: uppercase; font-size: clamp(2.2rem, 4.5vw, 3.8rem); line-height: 1.08; color: #fff; }

  /* ── DESTINATIONS ── */
  .dest-bg { background: var(--dark); }
  .dest-layout { display: grid; grid-template-columns: 280px 1fr; gap: 3.5rem; align-items: center; }
  .dest-intro p { font-size: .92rem; color: var(--muted); line-height: 1.8; margin: 1.4rem 0 2rem; }

  .dest-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
  .d-card {
    position: relative; border-radius: 12px; overflow: hidden;
    aspect-ratio: 3/4; cursor: pointer;
    transition: transform .4s ease, box-shadow .4s;
  }
  .d-card:hover { transform: translateY(-9px); box-shadow: 0 20px 50px rgba(0,0,0,.7); }
  .d-card img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; display: block; }
  .d-card:hover img { transform: scale(1.12); }
  .d-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.92) 0%, transparent 55%); }
  .d-badge {
    position: absolute; top: .7rem; left: .7rem;
    background: var(--gold); color: var(--dark);
    font-size: .55rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    padding: .22rem .55rem; border-radius: 3px;
  }
  .d-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 1rem; }
  .d-country { font-size: .6rem; font-weight: 700; letter-spacing: 2.5px; color: var(--gold); text-transform: uppercase; margin-bottom: .25rem; }
  .d-name    { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 700; color: #fff; line-height: 1.1; }
  .d-price   { font-size: .75rem; color: rgba(255,255,255,.65); margin-top: .25rem; }

  .outline-btn {
    display: inline-flex; align-items: center; gap: .5rem;
    background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,.28);
    padding: .7rem 1.5rem; border-radius: 4px;
    font-weight: 600; font-size: .8rem; letter-spacing: 1.2px; text-transform: uppercase;
    cursor: pointer; transition: all .3s; text-decoration: none;
  }
  .outline-btn:hover { border-color: var(--gold); color: var(--gold); }

  /* ── TRUST ── */
  .trust-bg { background: var(--dark2); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .trust-row { display: grid; grid-template-columns: repeat(4, 1fr); }
  .t-cell {
    display: flex; align-items: flex-start; gap: 1rem;
    padding: 2rem 1.5rem;
    border-right: 1px solid var(--border);
    cursor: pointer; transition: background .3s;
  }
  .t-cell:last-child { border-right: none; }
  .t-cell:hover { background: rgba(245,166,35,.04); }
  .t-ico {
    width: 46px; height: 46px; flex-shrink: 0;
    border: 1.5px solid rgba(245,166,35,.35); border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; transition: all .3s;
  }
  .t-cell:hover .t-ico { background: var(--gold); border-color: var(--gold); }
  .t-ttl { font-size: .82rem; font-weight: 700; letter-spacing: .3px; margin-bottom: .3rem; }
  .t-dsc { font-size: .73rem; color: var(--muted); line-height: 1.55; }

  /* ── EXPERIENCES ── */
  .exp-bg { background: var(--dark2); }
  .exp-head { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 1rem; margin-bottom: 2.5rem; }
  .exp-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; }
  .e-card {
    position: relative; border-radius: 14px; overflow: hidden;
    aspect-ratio: 4/3; cursor: pointer;
    transition: transform .4s ease, box-shadow .4s;
  }
  .e-card:hover { transform: translateY(-7px); box-shadow: 0 20px 50px rgba(0,0,0,.7); }
  .e-card img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s ease; display: block; }
  .e-card:hover img { transform: scale(1.1); }
  .e-card .d-info { padding: 1.2rem; }
  .e-card .d-name { font-size: 1.6rem; }

  /* ── APP SHOWCASE ── */
  .app-sec {
    position: relative; overflow: hidden;
    padding: 6rem 2.5rem;
  }
  .app-bg-img {
    position: absolute; inset: 0;
    background-image: url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80');
    background-size: cover; background-position: center;
    filter: brightness(.22) saturate(1.3);
  }
  .app-inner { position: relative; z-index: 2; max-width: 1240px; margin: 0 auto; text-align: center; }
  .app-hed {
    font-family: 'Cormorant Garamond', serif; font-weight: 700; text-transform: uppercase;
    font-size: clamp(2.8rem, 9vw, 8rem); letter-spacing: 5px; line-height: .95; color: #fff;
  }
  .app-hed i { display: block; color: var(--gold); font-style: italic; }
  .app-sub { font-size: 1rem; color: rgba(255,255,255,.55); margin-top: 1rem; letter-spacing: .5px; }

  .phones { display: flex; justify-content: center; align-items: flex-end; gap: 1.5rem; margin-top: 3.5rem; flex-wrap: wrap; }
  .ph {
    border-radius: 36px; border: 1.5px solid rgba(255,255,255,.12);
    overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,.85);
    transition: transform .3s ease; background: var(--dark2); flex-shrink: 0;
  }
  .ph:hover { transform: translateY(-12px); }
  .ph-mid   { width: 210px; height: 420px; transform: scale(1.1); }
  .ph-mid:hover { transform: scale(1.1) translateY(-12px); }
  .ph-side  { width: 180px; height: 360px; opacity: .78; }
  .ph-scr {
    width: 100%; height: 100%;
    background: linear-gradient(160deg, #12122a, #0f1e3a);
    padding: 1rem; display: flex; flex-direction: column; gap: .6rem;
  }
  .ph-bar  { display: flex; justify-content: space-between; font-size: .58rem; color: rgba(255,255,255,.5); }
  .ph-hd   { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 700; color: #fff; line-height: 1.2; }
  .ph-sm   { font-size: .62rem; color: var(--muted); }
  .ph-srch { background: rgba(255,255,255,.07); border-radius: 8px; padding: .45rem .7rem; font-size: .62rem; color: var(--muted); display: flex; align-items: center; gap: .4rem; }
  .ph-img  { border-radius: 10px; overflow: hidden; height: 90px; flex-shrink: 0; }
  .ph-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .chip-row { display: flex; gap: .35rem; }
  .chip   { font-size: .55rem; padding: .18rem .45rem; border-radius: 20px; font-weight: 600; }
  .chip-g { background: var(--gold); color: var(--dark); }
  .chip-d { background: rgba(255,255,255,.08); color: rgba(255,255,255,.45); }
  .meta-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: .35rem; }
  .meta-box { background: rgba(255,255,255,.06); border-radius: 6px; padding: .4rem; text-align: center; }
  .meta-v { font-size: .6rem; font-weight: 600; color: #fff; }
  .meta-l { font-size: .5rem; color: var(--muted); margin-top: 1px; }
  .inc-row { display: flex; flex-direction: column; gap: .18rem; }
  .inc-row span { font-size: .57rem; color: var(--muted); }
  .ph-foot { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: .5rem; border-top: 1px solid rgba(255,255,255,.07); }
  .ph-price     { font-size: 1rem; font-weight: 700; color: #fff; }
  .ph-price-lbl { font-size: .5rem; color: var(--muted); }
  .ph-book { background: var(--gold); border-radius: 6px; padding: .4rem .7rem; font-size: .62rem; font-weight: 700; color: var(--dark); cursor: pointer; }
  .it-card { background: rgba(255,255,255,.06); border-radius: 8px; padding: .55rem; display: flex; justify-content: space-between; align-items: center; }
  .it-city { font-size: .62rem; font-weight: 600; color: #fff; }
  .it-date { font-size: .52rem; color: var(--muted); margin-top: 1px; }
  .it-dot  { font-size: .75rem; }
  .tl-item { display: flex; align-items: center; gap: .4rem; padding: .28rem 0; border-top: 1px solid rgba(255,255,255,.05); font-size: .54rem; color: rgba(255,255,255,.45); }
  .pop-row { display: flex; gap: .45rem; background: rgba(255,255,255,.06); border-radius: 8px; padding: .45rem; margin-bottom: .35rem; }
  .pop-img { width: 50px; height: 42px; border-radius: 6px; overflow: hidden; flex-shrink: 0; }
  .pop-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .pop-name { font-size: .62rem; font-weight: 600; color: #fff; }
  .pop-pr   { font-size: .55rem; color: var(--gold); margin-top: 2px; }

  /* ── NEWSLETTER ── */
  .nl-sec { background: linear-gradient(105deg, var(--gold), var(--gold2)); padding: 4rem 2.5rem; }
  .nl-inner { max-width: 1240px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap; }
  .nl-h { font-family: 'Cormorant Garamond', serif; font-size: clamp(1.6rem, 3vw, 2.6rem); font-weight: 700; color: var(--dark); line-height: 1.1; }
  .nl-p { font-size: .88rem; color: rgba(0,0,0,.55); margin-top: .45rem; }
  .nl-form { display: flex; gap: .75rem; flex-wrap: wrap; }
  .nl-inp {
    padding: .85rem 1.3rem; border-radius: 4px; border: none;
    background: rgba(0,0,0,.14); color: var(--dark);
    font-family: 'Outfit', sans-serif; font-size: .88rem; outline: none;
    min-width: 240px; flex: 1;
  }
  .nl-inp::placeholder { color: rgba(0,0,0,.38); }
  .nl-btn {
    padding: .85rem 1.75rem; background: var(--dark); color: #fff; border: none;
    border-radius: 4px; font-family: 'Outfit', sans-serif; font-weight: 700;
    font-size: .82rem; letter-spacing: 1.2px; text-transform: uppercase;
    cursor: pointer; transition: all .3s;
  }
  .nl-btn:hover { background: #1a1a1a; transform: translateY(-2px); }

  /* ── FOOTER ── */
  .foot-bg { background: var(--dark2); border-top: 1px solid var(--border); }
  .foot-grid { max-width: 1240px; margin: 0 auto; padding: 4rem 2.5rem; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; }
  .foot-brand p { font-size: .83rem; color: var(--muted); line-height: 1.75; margin: 1rem 0 1.5rem; max-width: 240px; }
  .socials { display: flex; gap: .65rem; }
  .soc {
    width: 36px; height: 36px; border: 1px solid rgba(255,255,255,.13); border-radius: 7px;
    display: flex; align-items: center; justify-content: center; font-size: .75rem;
    cursor: pointer; transition: all .3s; color: #fff; text-decoration: none;
  }
  .soc:hover { background: var(--gold); border-color: var(--gold); color: var(--dark); }
  .foot-col h4 { font-size: .7rem; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold); margin-bottom: 1.2rem; }
  .foot-col ul { list-style: none; display: flex; flex-direction: column; gap: .75rem; }
  .foot-col ul li a { font-size: .83rem; color: var(--muted); text-decoration: none; cursor: pointer; transition: color .3s; }
  .foot-col ul li a:hover { color: var(--gold); }
  .foot-bot { border-top: 1px solid var(--border); }
  .foot-bot-in { max-width: 1240px; margin: 0 auto; padding: 1.4rem 2.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
  .foot-bot p { font-size: .78rem; color: var(--muted); }
  .foot-bot-links { display: flex; gap: 1.5rem; }
  .foot-bot-links a { font-size: .78rem; color: var(--muted); text-decoration: none; cursor: pointer; transition: color .3s; }
  .foot-bot-links a:hover { color: var(--gold); }

  /* ── ANIMATIONS ── */
  @keyframes up {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes bounce {
    0%,100% { transform: translateX(-50%) translateY(0); }
    50%      { transform: translateX(-50%) translateY(-10px); }
  }

  /* ── RESPONSIVE ── */

  /* Large desktop (1200px+): full layout, no changes needed */

  /* Laptop / Small desktop (900–1199px) */
  @media (max-width: 1199px) {
    .dest-layout { grid-template-columns: 1fr; }
    .dest-intro  { max-width: 520px; }
    .dest-grid   { grid-template-columns: repeat(4, 1fr); }
    .foot-grid   { grid-template-columns: repeat(2, 1fr); gap: 2.5rem; }
  }

  /* Tablet landscape (768–899px) */
  @media (max-width: 899px) {
    .nav-links, .nav-btn-wrap { display: none !important; }
    .hamburger  { display: flex; }
    .hero-cards { display: none; }
    .hero-inner { padding: 5rem 2rem 2rem; }

    .dest-layout { gap: 2.5rem; }
    .dest-grid   { grid-template-columns: repeat(2, 1fr); gap: .85rem; }

    .trust-row   { grid-template-columns: repeat(2, 1fr); }
    .t-cell      { border-bottom: 1px solid var(--border); }
    .t-cell:nth-child(2)  { border-right: none; }
    .t-cell:nth-child(3)  { border-bottom: none; }
    .t-cell:nth-child(4)  { border-right: none; border-bottom: none; }

    .exp-grid    { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
    .exp-head    { flex-direction: column; align-items: flex-start; }

    .ph-side:last-of-type { display: none; }
    .phones      { gap: 1rem; }
  }

  /* Tablet portrait (600–767px) */
  @media (max-width: 767px) {
    .wrap        { padding: 0 1.5rem; }
    .sec         { padding: 4rem 0; }
    .nav         { padding: 1rem 1.5rem; }
    .nav.solid   { padding: .75rem 1.5rem; }

    .hero-inner  { padding: 5rem 1.5rem 2rem; }
    .hero-stats  { gap: 1.5rem; }
    .hero-actions { gap: .75rem; }

    .dest-layout { gap: 2rem; }
    .dest-grid   { grid-template-columns: repeat(2, 1fr); gap: .75rem; }

    .exp-grid    { grid-template-columns: 1fr 1fr; gap: .85rem; }
    .e-card .d-name { font-size: 1.3rem; }

    .foot-grid   { grid-template-columns: repeat(2, 1fr); padding: 3rem 1.5rem; gap: 2rem; }
    .foot-grid > div:first-child { grid-column: 1 / -1; }
    .foot-brand p { max-width: 100%; }

    .nl-sec      { padding: 3rem 1.5rem; }
    .nl-inner    { flex-direction: column; align-items: flex-start; }
    .nl-form     { width: 100%; }
    .nl-inp      { min-width: 0; width: 100%; }

    .app-sec     { padding: 4.5rem 1.5rem; }
    .ph-side     { display: none; }
    .ph-mid      { transform: none; width: 220px; height: 440px; }
    .ph-mid:hover { transform: translateY(-12px); }
  }

  /* Mobile (max-width 599px) */
  @media (max-width: 599px) {
    .wrap        { padding: 0 1.1rem; }
    .sec         { padding: 3.5rem 0; }
    .nav         { padding: .9rem 1.1rem; }
    .nav.solid   { padding: .7rem 1.1rem; }

    .hero        { min-height: 100svh; }
    .hero-inner  { padding: 5rem 1.1rem 2rem; align-items: flex-start; padding-top: 6rem; }
    .hero-h1     { font-size: clamp(2.4rem, 10vw, 3.2rem); }
    .hero-p      { font-size: .88rem; }
    .hero-actions { gap: .6rem; }
    .btn-gold, .btn-ghost { padding: .75rem 1.5rem; font-size: .8rem; }
    .stat-val    { font-size: 1.8rem; }
    .hero-stats  { gap: 1.2rem; margin-top: 2rem; }
    .scroll-hint { display: none; }

    .dest-grid   { grid-template-columns: 1fr 1fr; gap: .6rem; }

    .trust-row   { grid-template-columns: 1fr; }
    .t-cell      { border-right: none !important; border-bottom: 1px solid var(--border); }
    .t-cell:last-child { border-bottom: none; }
    .t-cell      { padding: 1.5rem 1.1rem; }

    .exp-grid    { grid-template-columns: 1fr; gap: 1rem; }
    .e-card      { aspect-ratio: 16/9; }

    .app-hed     { font-size: clamp(2.5rem, 12vw, 4rem); letter-spacing: 2px; }
    .app-sec     { padding: 4rem 1.1rem; }
    .ph-mid      { width: min(200px, 80vw); height: 400px; }
    .phones      { margin-top: 2.5rem; }

    .nl-sec      { padding: 2.5rem 1.1rem; }
    .nl-btn      { width: 100%; }

    .foot-grid   { grid-template-columns: 1fr; padding: 2.5rem 1.1rem; gap: 2rem; }
    .foot-grid > div:first-child { grid-column: auto; }
    .foot-bot-in { flex-direction: column; align-items: flex-start; padding: 1.2rem 1.1rem; }
    .foot-bot-links { flex-wrap: wrap; gap: 1rem; }

    .drawer a    { font-size: 1.7rem; letter-spacing: 2px; }
  }

  /* Extra small (max 380px) */
  @media (max-width: 380px) {
    .hero-h1     { font-size: 2.2rem; }
    .dest-grid   { grid-template-columns: 1fr; }
    .btn-gold, .btn-ghost { width: 100%; justify-content: center; }
    .hero-actions { flex-direction: column; }
  }
`;

export default function WanderlustTravel() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("HOME");
  const emailRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 899) setDrawerOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const NAV_ITEMS = ["Features", "Privacy", "Help Center", "Blog", "For Bussiness", "App"];

  return (
    <>
      <style>{css}</style>

      {/* ── MOBILE DRAWER ── */}
      <div className={`drawer ${drawerOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">✕</button>
        {NAV_ITEMS.map(n => (
          <a key={n} role="button" tabIndex={0}
            onClick={() => { setActiveLink(n); setDrawerOpen(false); }}
            onKeyDown={e => e.key === "Enter" && (setActiveLink(n), setDrawerOpen(false))}
          >{n}</a>
        ))}
        
          <button className="btn-gold" style={{ fontSize: ".85rem", border: "none" }}>Login</button>
      </div>

      {/* ── NAVBAR ── */}
      <nav className={`nav ${scrolled ? "solid" : ""}`} role="navigation" aria-label="Main navigation">
        <div className="nav-logo" role="link" tabIndex={0} aria-label="Wanderlust Travel home">
          <div className="nav-badge" aria-hidden="true">✈</div>
          <div>
            <span className="nav-name">Wanderlust</span>
            <span className="nav-sub">Travel</span>
          </div>
        </div>

        <ul className="nav-links" role="list">
          {NAV_ITEMS.map(n => (
            <li key={n}>
              <a className={activeLink === n ? "act" : ""} role="button" tabIndex={0}
                onClick={() => setActiveLink(n)}
                onKeyDown={e => e.key === "Enter" && setActiveLink(n)}
                aria-current={activeLink === n ? "page" : undefined}
              >{n}</a>
            </li>
          ))}
        </ul>

        <div className="nav-btn-wrap" style={{ display: "flex" }}>
          <Link to="/login">
          <button className="nav-btn" aria-label="Book a trip now">Login</button>
        </Link>
        </div>

        <button className="hamburger" onClick={() => setDrawerOpen(true)} aria-label="Open navigation menu" aria-expanded={drawerOpen}>
          <span /><span /><span />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" aria-label="Hero section">
        <div className="hero-bg" role="img" aria-label="Scenic mountain landscape" />
        <div className="hero-grad" aria-hidden="true" />

        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-eyebrow">Explore</p>
            <h1 className="hero-h1">
              The World<br />
              Create <em>Memories</em>
            </h1>
            <p className="hero-p">
              Discover breathtaking destinations, unique experiences and unforgettable adventures around the globe.
            </p>
            <div className="hero-actions">
              <a className="btn-gold" role="button" tabIndex={0}>Explore Now &nbsp;›</a>
              <a className="btn-ghost" role="button" tabIndex={0}>▶ &nbsp;Watch Video</a>
            </div>
            <div className="hero-stats" role="list">
              {[["500+","Destinations"],["10K+","Happy Travelers"],["4.9★","Rating"]].map(([v,l]) => (
                <div key={l} role="listitem">
                  <div className="stat-val">{v}</div>
                  <div className="stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-cards" aria-hidden="true">
            {[
              { icon: "✈", title: "Best Flights",    sub: "Compare & book cheap flights" },
              { icon: "🏨", title: "Top Hotels",      sub: "Best deals on luxury stays" },
              { icon: "🗺", title: "Exclusive Tours", sub: "Handpicked tours just for you" },
            ].map(c => (
              <div key={c.title} className="h-card">
                <div className="h-icon">{c.icon}</div>
                <div>
                  <div className="h-title">{c.title}</div>
                  <div className="h-sub">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-hint" aria-hidden="true">
          <span className="scroll-lbl">Scroll</span>
          <div className="scroll-bar" />
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="sec dest-bg" aria-labelledby="dest-heading">
        <div className="wrap">
          <div className="dest-layout">
            <div>
              <p className="tag">Top Destinations</p>
              <h2 className="h2" id="dest-heading">Explore<br />Dream<br />Places</h2>
              <div className="dest-intro">
                <p>Where do you want to go next? Find the best places to stay, things to do, and see across the globe.</p>
              </div>
              <a className="outline-btn" role="button" tabIndex={0}>View All Destinations &nbsp;›</a>
            </div>

            <div className="dest-grid">
              {DESTINATIONS.map(d => (
                <article key={d.id} className="d-card" role="button" tabIndex={0} aria-label={`${d.name}, ${d.country} — ${d.price}`}>
                  <img src={d.image} alt={`${d.name}, ${d.country}`} loading="lazy" />
                  <div className="d-overlay" aria-hidden="true" />
                  <div className="d-badge" aria-label={`Tag: ${d.tag}`}>{d.tag}</div>
                  <div className="d-info">
                    <div className="d-country">{d.country}</div>
                    <div className="d-name">{d.name}</div>
                    <div className="d-price">{d.price}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <div className="trust-bg" role="region" aria-label="Why choose us">
        <div className="trust-row wrap">
          {TRUST.map(t => (
            <div key={t.title} className="t-cell">
              <div className="t-ico" aria-hidden="true">{t.icon}</div>
              <div>
                <div className="t-ttl">{t.title}</div>
                <div className="t-dsc">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXPERIENCES ── */}
      <section className="sec exp-bg" aria-labelledby="exp-heading">
        <div className="wrap">
          <div className="exp-head">
            <div>
              <p className="tag">Top Experiences</p>
              <h2 className="h2" id="exp-heading">Unforgettable<br />Journeys</h2>
            </div>
            <a className="outline-btn" role="button" tabIndex={0}>View All &nbsp;›</a>
          </div>
          <div className="exp-grid">
            {EXPERIENCES.map(e => (
              <article key={e.id} className="e-card" role="button" tabIndex={0} aria-label={`${e.name}, ${e.country} — ${e.price}`}>
                <img src={e.image} alt={`${e.name}, ${e.country}`} loading="lazy" />
                <div className="d-overlay" aria-hidden="true" />
                <div className="d-info">
                  <div className="d-country">{e.country}</div>
                  <div className="d-name">{e.name}</div>
                  <div className="d-price">{e.price}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── APP SHOWCASE ── */}
      <section className="app-sec" aria-label="Mobile app showcase">
        <div className="app-bg-img" aria-hidden="true" />
        <div className="app-inner">
          <h2 className="app-hed">Travel<i>UI Design</i></h2>
          <p className="app-sub">Plan your perfect trip with our mobile app</p>

          <div className="phones" aria-hidden="true">
            {/* Left Phone — Itinerary */}
            <div className="ph ph-side">
              <div className="ph-scr">
                <div className="ph-bar"><span>9:41</span><span>●●●</span></div>
                <div className="ph-hd" style={{ fontSize: ".88rem" }}>My Itinerary</div>
                <div className="chip-row">
                  <span className="chip chip-g">Upcoming</span>
                  <span className="chip chip-d">Past</span>
                  <span className="chip chip-d">Cancelled</span>
                </div>
                {[
                  { city: "Santorini, Greece", date: "Jun 19 – Jun 26, 2025", dot: "✅" },
                  { city: "Maldives Resort",   date: "Jul 08 – Jul 15, 2025", dot: "🟡" },
                ].map(i => (
                  <div key={i.city} className="it-card">
                    <div>
                      <div className="it-city">{i.city}</div>
                      <div className="it-date">{i.date}</div>
                    </div>
                    <span className="it-dot">{i.dot}</span>
                  </div>
                ))}
                <div style={{ marginTop: "auto" }}>
                  {["✈ Jun 19 · 10:30 AM – Flight","🏨 Jun 19 · 3:00 PM – Check-In","🌅 Jun 19 · 5:00 PM – Sunset Cruise","🚶 Jun 20 · 9:00 AM – Village Walk"].map((it, i) => (
                    <div key={i} className="tl-item">{it}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Phone — Trip Details */}
            <div className="ph ph-mid">
              <div className="ph-scr">
                <div className="ph-bar"><span>9:41</span><span>●●●</span></div>
                <div className="ph-hd">Trip Details</div>
                <div className="ph-img">
                  <img src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80" alt="Santorini" loading="lazy" />
                </div>
                <div>
                  <div className="ph-hd" style={{ fontSize: ".82rem" }}>Santorini, Greece</div>
                  <div style={{ fontSize: ".58rem", color: "var(--gold)", marginTop: "2px" }}>★★★★★ 4.8 (1.2k reviews)</div>
                </div>
                <div className="meta-row">
                  {[["7 Days","Duration"],["2 Adults","Travelers"],["Jun 10-16","Dates"]].map(([v,l]) => (
                    <div key={l} className="meta-box"><div className="meta-v">{v}</div><div className="meta-l">{l}</div></div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: ".64rem", fontWeight: 600, marginBottom: ".3rem" }}>Inclusions</div>
                  <div className="inc-row">
                    {["✓  Round trip flights","✓  4-star hotel stay","✓  Daily breakfast","✓  Airport transfers"].map(i => (
                      <span key={i}>{i}</span>
                    ))}
                  </div>
                </div>
                <div className="ph-foot">
                  <div>
                    <div className="ph-price-lbl">Total Price</div>
                    <div className="ph-price">$1,299</div>
                  </div>
                  <div className="ph-book">Login</div>
                </div>
              </div>
            </div>

            {/* Right Phone — Explore */}
            <div className="ph ph-side">
              <div className="ph-scr">
                <div className="ph-bar"><span>9:41</span><span>●●●</span></div>
                <div className="ph-sm">Hi, Explorer 👋</div>
                <div className="ph-hd">Where do you<br />want to go?</div>
                <div className="ph-srch">🔍 <span>Search destinations…</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: ".63rem", fontWeight: 600 }}>Popular Destinations</div>
                  <div style={{ fontSize: ".55rem", color: "var(--gold)", cursor: "pointer" }}>View all</div>
                </div>
                {[
                  { name: "Bora Bora, French Polynesia", price: "From $1,299", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=120&q=60" },
                  { name: "Dubai, UAE",                  price: "From $899",   img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=120&q=60" },
                  { name: "Paris, France",               price: "From $999",   img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=120&q=60" },
                ].map(d => (
                  <div key={d.name} className="pop-row">
                    <div className="pop-img"><img src={d.img} alt={d.name} loading="lazy" /></div>
                    <div>
                      <div className="pop-name">{d.name}</div>
                      <div className="pop-pr">{d.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="nl-sec" aria-labelledby="nl-heading">
        <div className="nl-inner">
          <div>
            <h2 className="nl-h" id="nl-heading">Subscribe for Travel Deals</h2>
            <p className="nl-p">Get exclusive offers and inspiration straight to your inbox</p>
          </div>
          <div className="nl-form" role="form" aria-label="Newsletter signup">
            <input
              ref={emailRef}
              className="nl-inp"
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              autoComplete="email"
            />
            <Link to="/Signup">
              <button className="nl-btn" onClick={() => emailRef.current?.focus()}>Subscribe</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="foot-bg" role="contentinfo">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="nav-logo" style={{ marginBottom: "1rem" }} aria-label="Wanderlust Travel">
              <div className="nav-badge" aria-hidden="true">✈</div>
              <div>
                <span className="nav-name">Wanderlust</span>
                <span className="nav-sub">Travel</span>
              </div>
            </div>
            <p>Discover breathtaking destinations, unique experiences and unforgettable adventures around the globe.</p>
            <div className="socials" aria-label="Social media links">
              {[["f","Facebook"],["in","LinkedIn"],["𝕏","X / Twitter"],["◉","Instagram"]].map(([ic,lb]) => (
                <a key={lb} className="soc" aria-label={lb} role="button" tabIndex={0}>{ic}</a>
              ))}
            </div>
          </div>

          <div className="foot-col">
            <h4>Quick Links</h4>
            <ul>{["Home","Destinations","Experiences","Blog","About Us"].map(l => (
              <li key={l}><a role="button" tabIndex={0}>{l}</a></li>
            ))}</ul>
          </div>
          <div className="foot-col">
            <h4>Top Destinations</h4>
            <ul>{["Santorini","Maldives","Phuket","Bali","Paris","Tokyo"].map(l => (
              <li key={l}><a role="button" tabIndex={0}>{l}</a></li>
            ))}</ul>
          </div>
          <div className="foot-col">
            <h4>Contact Us</h4>
            <ul>
              <li><a>📍 &nbsp;123 Travel Street, NY</a></li>
              <li><a>📞 &nbsp;+1 (555) 123-4567</a></li>
              <li><a>✉ &nbsp;hello@wanderlust.com</a></li>
              <li><a>🕐 &nbsp;Mon–Fri, 9am–6pm</a></li>
            </ul>
          </div>
        </div>

        <div className="foot-bot">
          <div className="foot-bot-in">
            <p>© 2025 Wanderlust Travel. All rights reserved.</p>
            <div className="foot-bot-links">
              <a role="button" tabIndex={0}>Privacy Policy</a>
              <a role="button" tabIndex={0}>Terms of Service</a>
              <a role="button" tabIndex={0}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
