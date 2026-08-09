'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { Home, Flame, Trophy, Download, MessageSquare, Search, Menu, X } from 'lucide-react';

export default function PredictionPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);


const bannerSlides = [
  {
    badge: "Bonus Terbesar",
    title: "Bonus Promo ",
    highlight: "Terbaik",
    description: "Nikmati berbagai macam bonus melimpah mulai dari New Member, Cashback, hingga Referral Seumur Hidup!",
    icon: "👑",
    image: "/images/banner-1.jpg" // Ganti dengan path atau link gambar Anda
  },
  {
    badge: "Prediksi Jitu",
    title: "Akurat Setiap ",
    highlight: "Hari",
    description: "Dapatkan angka main, BBFS, dan colok bebas terlengkap dengan tingkat akurasi tinggi di semua pasaran.",
    icon: "🎯",
    image: "/images/banner-2.jpg"
  },
  {
    badge: "Pasaran Terlengkap",
    title: "Resmi & ",
    highlight: "Terpercaya",
    description: "Tersedia puluhan pasaran togel resmi internasional dengan hasil result tercepat dan akurat.",
    icon: "🚀",
    image: "/images/banner-3.jpg"
  }
];


useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerSlides.length);
    }, 4000); // 4000ms = 4 detik

    return () => clearInterval(timer);
  }, []);

const slide = bannerSlides[currentSlide];




  
  // State untuk kontrol Modal Prediksi
  const [selectedPrediction, setSelectedPrediction] = useState<{
    name: string;
    date: string;
    bbfs: string;
    angkaMain: string;
    colokBebas: string;
    colokMacau: string;
    shio: string;
    bolakBalik: string;
  } | null>(null);

  // State untuk kontrol Modal Result
  const [selectedResult, setSelectedResult] = useState<{
    name: string;
    history: { periode: string; tanggal: string; prize1: string; prize2: string; prize3: string }[];
  } | null>(null);

  // State untuk kontrol Modal Livedraw (Sesuai gambar referensi image_2ffabe.jpg)
  const [selectedLivedraw, setSelectedLivedraw] = useState<{
    name: string;
    date: string;
    prize1: string;
    prize2: string;
    prize3: string;
    schedule: string;
  } | null>(null);

  const markets = [
    { 
      name: 'TURKI', 
      date: 'Senin - 10 Agustus 2026', 
      result: '6216',
      bbfs: '6953240',
      angkaMain: '6953',
      colokBebas: '6 / 3',
      colokMacau: '69 / 32 / 40',
      shio: 'Monyet',
      bolakBalik: '35*92*36*59*20*06*34*26*90',
      livedrawDate: 'Minggu, 09 Agustus 2026',
      prize1: '6216',
      prize2: '1362',
      prize3: '0725',
      schedule: 'Result SETIAP HARI\nLive Draw Setiap Jam 03:05 WIB',
      history: [
        { periode: '259', tanggal: '-', prize1: '-', prize2: '-', prize3: '-' },
        { periode: '258', tanggal: '09-08-2026 01:23:10', prize1: '6216', prize2: '1362', prize3: '0725' },
        { periode: '257', tanggal: '08-08-2026 01:20:54', prize1: '5299', prize2: '0146', prize3: '6097' },
        { periode: '256', tanggal: '07-08-2026 01:20:19', prize1: '4177', prize2: '0279', prize3: '6902' },
        { periode: '255', tanggal: '06-08-2026 01:20:16', prize1: '6720', prize2: '7188', prize3: '5861' },
        { periode: '254', tanggal: '05-08-2026 01:22:33', prize1: '9460', prize2: '1501', prize3: '7876' },
        { periode: '253', tanggal: '04-08-2026 01:20:15', prize1: '6977', prize2: '7342', prize3: '0651' },
        { periode: '252', tanggal: '03-08-2026 01:23:12', prize1: '6614', prize2: '4325', prize3: '7151' },
        { periode: '251', tanggal: '02-08-2026 01:22:53', prize1: '8920', prize2: '8553', prize3: '2115' },
        { periode: '250', tanggal: '01-08-2026 01:21:07', prize1: '7972', prize2: '1980', prize3: '0941' },
      ]
    },
    { 
      name: 'MAROKO', 
      date: 'Senin - 10 Agustus 2026', 
      result: '6075',
      bbfs: '1849032',
      angkaMain: '1849',
      colokBebas: '1 / 8',
      colokMacau: '18 / 49 / 03',
      shio: 'Naga',
      bolakBalik: '18*84*49*90*03*32*19*40*83',
      livedrawDate: 'Minggu, 09 Agustus 2026',
      prize1: '6075',
      prize2: '4112',
      prize3: '3901',
      schedule: 'Result SETIAP HARI\nLive Draw Setiap Jam 02:00 WIB',
      history: [
        { periode: '120', tanggal: '09-08-2026 02:00:00', prize1: '6075', prize2: '4112', prize3: '3901' },
        { periode: '119', tanggal: '08-08-2026 02:00:00', prize1: '3214', prize2: '5561', prize3: '0129' },
      ]
    },
    { 
      name: 'TASMANIA_06', 
      date: 'Senin - 10 Agustus 2026', 
      result: '2663',
      bbfs: '5731948',
      angkaMain: '5731',
      colokBebas: '5 / 7',
      colokMacau: '57 / 31 / 94',
      shio: 'Harimau',
      bolakBalik: '57*73*31*19*94*48*53*71*34',
      livedrawDate: 'Minggu, 09 Agustus 2026',
      prize1: '2663',
      prize2: '9912',
      prize3: '4452',
      schedule: 'Result SETIAP HARI\nLive Draw Setiap Jam 03:00 WIB',
      history: [
        { periode: '90', tanggal: '09-08-2026 03:00:00', prize1: '2663', prize2: '9912', prize3: '4452' },
      ]
    },
    { 
      name: 'CHICAGO_NIGHT', 
      date: 'Senin - 10 Agustus 2026', 
      result: '0588',
      bbfs: '4286109',
      angkaMain: '4286',
      colokBebas: '4 / 2',
      colokMacau: '42 / 86 / 10',
      shio: 'Kelinci',
      bolakBalik: '42*28*86*61*10*09*48*26*80',
      livedrawDate: 'Minggu, 09 Agustus 2026',
      prize1: '0588',
      prize2: '1234',
      prize3: '5678',
      schedule: 'Result SETIAP HARI\nLive Draw Setiap Jam 04:00 WIB',
      history: [
        { periode: '75', tanggal: '09-08-2026 04:00:00', prize1: '0588', prize2: '1234', prize3: '5678' },
      ]
    },
    { 
      name: 'SYDNEY', 
      date: 'Senin - 10 Agustus 2026', 
      result: '4391',
      bbfs: '7419528',
      angkaMain: '7419',
      colokBebas: '7 / 4',
      colokMacau: '74 / 19 / 52',
      shio: 'Kuda',
      bolakBalik: '74*41*19*95*52*28*71*49*58',
      livedrawDate: 'Minggu, 09 Agustus 2026',
      prize1: '4391',
      prize2: '8821',
      prize3: '3341',
      schedule: 'Result SETIAP HARI\nLive Draw Setiap Jam 13:50 WIB',
      history: [
        { periode: '310', tanggal: '09-08-2026 13:00:00', prize1: '4391', prize2: '8821', prize3: '3341' },
      ]
    },
    { 
      name: 'SINGAPORE', 
      date: 'Senin - 10 Agustus 2026', 
      result: '9820',
      bbfs: '3680214',
      angkaMain: '3680',
      colokBebas: '3 / 6',
      colokMacau: '36 / 80 / 21',
      shio: 'Ular',
      bolakBalik: '36*68*80*02*21*14*38*60*24',
      livedrawDate: 'Minggu, 09 Agustus 2026',
      prize1: '9820',
      prize2: '1122',
      prize3: '5544',
      schedule: 'Result SETIAP HARI (Kecuali Selasa & Jumat)\nLive Draw Setiap Jam 17:45 WIB',
      history: [
        { periode: '415', tanggal: '09-08-2026 17:45:00', prize1: '9820', prize2: '1122', prize3: '5544' },
      ]
    },
    { 
      name: 'HONGKONG', 
      date: 'Senin - 10 Agustus 2026', 
      result: '1547',
      bbfs: '9265471',
      angkaMain: '9265',
      colokBebas: '9 / 2',
      colokMacau: '92 / 65 / 47',
      shio: 'Ayam',
      bolakBalik: '92*26*65*54*47*71*96*25*41',
      livedrawDate: 'Minggu, 09 Agustus 2026',
      prize1: '1547',
      prize2: '8890',
      prize3: '1123',
      schedule: 'Result SETIAP HARI\nLive Draw Setiap Jam 23:00 WIB',
      history: [
        { periode: '502', tanggal: '08-08-2026 23:00:00', prize1: '1547', prize2: '8890', prize3: '1123' },
      ]
    },
    { 
      name: 'MACAU', 
      date: 'Senin - 10 Agustus 2026', 
      result: '3312',
      bbfs: '8056193',
      angkaMain: '8056',
      colokBebas: '8 / 0',
      colokMacau: '80 / 56 / 19',
      shio: 'Babi',
      bolakBalik: '80*05*56*61*19*93*85*06*13',
      livedrawDate: 'Minggu, 09 Agustus 2026',
      prize1: '3312',
      prize2: '4455',
      prize3: '6677',
      schedule: 'Result SETIAP HARI\nLive Draw Setiap Jam 22:00 WIB',
      history: [
        { periode: '210', tanggal: '09-08-2026 22:00:00', prize1: '3312', prize2: '4455', prize3: '6677' },
      ]
    },
  ];

  const filteredMarkets = markets.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      
      {/* Background Ornamen Mewah Lengkung Biru-Emas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-[#070b19] to-black pointer-events-none z-0"></div>

      {/* ================= HEADER / NAVBAR ATAS ================= */}
      <header className="relative z-10 w-full flex items-center justify-between bg-[#0e1628]/95 border-b border-amber-500/30 px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.8)] backdrop-blur-md">
        
        {/* Tombol Garis Tiga (Mobile) */}
        <div className="flex items-center md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-amber-400 hover:text-amber-300 focus:outline-none p-1 cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Logo Brand */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-black tracking-widest bg-gradient-to-r from-amber-300 via-amber-500 to-yellow-200 bg-clip-text text-transparent drop-shadow">
            ⚡ AMONISLOT
          </span>
        </div>

        {/* Menu Navigasi Desktop */}
        <nav className="hidden md:flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-200">
          <Link href="/" className="flex items-center space-x-1 hover:text-amber-400 transition">
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span>Home</span>
          </Link>
          <Link href="#" className="flex items-center space-x-1 hover:text-amber-400 transition">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>RTP Slot</span>
          </Link>
          <Link href="#" className="flex items-center space-x-1 hover:text-amber-400 transition">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Bukti Jackpot</span>
          </Link>
          <Link href="#" className="flex items-center space-x-1 hover:text-amber-400 transition">
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Download APK</span>
          </Link>
          <Link href="#" className="flex items-center space-x-1 hover:text-amber-400 transition">
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Keluhan</span>
          </Link>
        </nav>
      </header>


      {/* ================= MOBILE DRAWER / SIDEBAR MENU DARI SAMPING ================= */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0a0f1d] border-r border-amber-500/30 p-5 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col justify-between ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
            <span className="text-lg font-black tracking-widest bg-gradient-to-r from-amber-300 via-amber-500 to-yellow-200 bg-clip-text text-transparent">
              ⚡ AMONISLOT
            </span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-400 hover:text-amber-400 p-1 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-3">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 bg-gradient-to-r from-[#111c33] to-[#0e1628] border border-amber-500/40 hover:border-amber-400 text-white font-bold px-4 py-3 rounded-xl text-sm shadow-md transition">
              <Home className="w-5 h-5 text-amber-400" />
              <span>Home</span>
            </Link>
            <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 bg-gradient-to-r from-[#111c33] to-[#0e1628] border border-amber-500/40 hover:border-amber-400 text-white font-bold px-4 py-3 rounded-xl text-sm shadow-md transition">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>RTP Slot</span>
            </Link>
            <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 bg-gradient-to-r from-[#111c33] to-[#0e1628] border border-amber-500/40 hover:border-amber-400 text-white font-bold px-4 py-3 rounded-xl text-sm shadow-md transition">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Bukti Jackpot</span>
            </Link>
            <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 bg-gradient-to-r from-[#111c33] to-[#0e1628] border border-amber-500/40 hover:border-amber-400 text-white font-bold px-4 py-3 rounded-xl text-sm shadow-md transition">
              <Download className="w-5 h-5 text-amber-400" />
              <span>Download APK</span>
            </Link>
            <Link href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 bg-gradient-to-r from-[#111c33] to-[#0e1628] border border-amber-500/40 hover:border-amber-400 text-white font-bold px-4 py-3 rounded-xl text-sm shadow-md transition">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span>Keluhan</span>
            </Link>
          </div>
        </div>

        <div className="text-center text-[10px] text-slate-500 border-t border-slate-800 pt-4">
          &copy; 2026 AMONISLOT
        </div>
      </div>


{/* ================= KONTEN UTAMA ================= */}
<div className="relative z-10 w-full px-4 pt-6 pb-10 space-y-6 max-w-7xl mx-auto">

  {/* Banner & Running Text */}
  <div className="bg-[#0e1628] border-2 border-amber-500/50 rounded-2xl p-4 shadow-[0_0_25px_rgba(0,0,0,0.8)] space-y-4">
    
    {/* Running Text */}
    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-2 text-xs text-amber-300 font-medium overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-block">
        AMONISLOT - Portal Prediksi Jitu Togel Online Terlengkap & Resmi dengan Pasaran Terbanyak di Indonesia! 🚀
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      
      {/* Banner Slider Otomatis dengan Tinggi yang Disesuaikan */}
      <div 
        className="lg:col-span-2 relative h-64 sm:h-80 lg:h-[380px] rounded-xl overflow-hidden border border-amber-500/40 bg-cover bg-center flex items-center justify-between p-6 sm:p-8 shadow-inner transition-all duration-700"
        style={{ backgroundImage: `url(${slide.image})` }}
      >
        {/* Lapisan Gelap / Overlay agar teks terbaca jelas */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/70 to-black/60 pointer-events-none"></div>
        
        {/* Wrapper Kiri: Teks & Titik Indikator di Bawah Tengah */}
        <div className="relative z-10 flex flex-col justify-between h-full w-full py-1 transition-opacity duration-500">
          
          {/* Bagian Atas (Teks & Badge) */}
          <div className="space-y-3 max-w-md">
            <div className="inline-block bg-amber-500 text-black text-[10px] sm:text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {slide.badge}
            </div>
            <h1 className="text-xl sm:text-3xl font-black uppercase tracking-wide leading-tight text-white drop-shadow-md">
              {slide.title} <span className="text-amber-400">{slide.highlight}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {slide.description}
            </p>
          </div>

          {/* Bagian Bawah: Titik-titik di tengah */}
          <div className="flex space-x-2 pt-4 justify-center">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === index ? "w-6 bg-amber-400" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>

        </div>

        {/* Bagian Kanan (Icon) */}
        <div className="relative z-10 hidden sm:flex items-center justify-center">
          <div className="w-32 h-32 sm:w-48 sm:h-48 bg-amber-400/20 rounded-full blur-xl absolute"></div>
          <div className="relative text-6xl sm:text-7xl font-extrabold text-amber-400/80 drop-shadow-[0_5px_15px_rgba(245,158,11,0.5)]">
            {slide.icon}
          </div>
        </div>

      </div>

    
   

          {/* Kolom Samping Desktop */}
          <div className="hidden lg:flex flex-col justify-between space-y-3">
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 border border-amber-500/40 rounded-xl p-3 text-center shadow">
              <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">⚡ Proses Deposit Tercepat 1 Detik</p>
              <p className="text-[10px] text-slate-300 mt-0.5">Hanya dengan QRIS Rupiah, aman & anti ribet.</p>
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-blue-950 border border-amber-500/40 rounded-xl p-3 text-center shadow">
              <p className="text-xs font-bold text-amber-400">🔥 Cara Akses Tanpa Kendala</p>
              <p className="text-[10px] text-slate-300 mt-0.5">Langsung buka Google dan ketik: <strong className="text-white">AMONISLOT</strong></p>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <button className="bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold py-2 rounded-lg text-xs shadow transition cursor-pointer">
                LOGIN
              </button>
              <button className="bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold py-2 rounded-lg text-xs shadow transition cursor-pointer">
                PROMO
              </button>
              <button className="bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold py-2 rounded-lg text-xs shadow transition cursor-pointer">
                RTP SLOT
              </button>
            </div>
          </div>

        </div>

        {/* Tombol Mobile */}
        <div className="grid grid-cols-2 gap-3 pt-2 lg:hidden">
          <button className="w-full bg-gradient-to-b from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-extrabold py-3 rounded-xl text-xs sm:text-sm shadow-[0_4px_15px_rgba(37,99,235,0.4)] border border-blue-400/40 transition cursor-pointer">
            LOGIN
          </button>
          <button className="w-full bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold py-3 rounded-xl text-xs sm:text-sm shadow-[0_4px_15px_rgba(245,158,11,0.4)] border border-amber-300 transition cursor-pointer">
            DAFTAR
          </button>
        </div>

      </div>
 


        {/* ================= PENCARIAN PASARAN ================= */}
        <div className="hidden md:block relative mx-auto pt-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 pt-2">
            <Search className="w-4 h-4" />
          </div>
          <input 
            type="text"
            placeholder="Cari Pasaran..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0e1628] border border-amber-500/40 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 shadow-inner"
          />
        </div>


        {/* ================= GRID KARTU PREDIKSI PASARAN ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {filteredMarkets.map((market, index) => (
            <div 
              key={index}
              className="bg-gradient-to-b from-[#0e1628] to-[#090f1d] border-2 border-amber-500/50 rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex flex-col justify-between space-y-4 hover:border-amber-400 transition"
            >
              <div className="text-center space-y-1">
                <h3 className="text-sm font-black text-amber-400 tracking-wider uppercase">{market.name}</h3>
                <p className="text-[10px] text-slate-400">Result : {market.date}</p>
              </div>

              <div className="bg-black/80 border border-amber-500/30 rounded-xl py-3 text-center shadow-inner">
                <span className="text-2xl font-mono font-black tracking-widest text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                  {market.result}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setSelectedPrediction(market)}
                  className="bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold py-2 rounded-lg text-xs shadow transition cursor-pointer"
                >
                  Prediksi
                </button>
                {/* Tombol Livedraw untuk memicu Modal Livedraw sesuai referensi gambar */}
                <button 
                  onClick={() => setSelectedLivedraw(market)}
                  className="bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold py-2 rounded-lg text-xs shadow transition cursor-pointer"
                >
                  Livedraw
                </button>
              </div>

              <button 
                onClick={() => setSelectedResult(market)}
                className="w-full bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-extrabold py-2 rounded-lg text-xs shadow transition cursor-pointer"
              >
                Result
              </button>
            </div>
          ))}
        </div>

        <div className="text-center text-[11px] text-slate-500 py-6 border-t border-slate-800/80 mt-10">
          Copyright &copy; 2026 AMONISLOT - All Rights Reserved.
        </div>

      </div>


{/* ================= MODAL / POPUP PREDIKSI ================= */}
      {selectedPrediction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full mx-2 sm:mx-6 h-[95vh] sm:max-h-[75vh] flex flex-col bg-transparant-to-b from-[#0c1836] via-[#091024] to-[#060b18] border-transparant border-transparant rounded-lg shadow-[0_0_40px_rgba(250,204,21,0.4)] overflow-hidden">
            
            {/* Header Modal */}
            <div className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 px-7 py-2 flex items-center justify-between border-b-2 border-amber-600 flex-shrink-0">
              <span className="text-black font-black text-xs sm:text-sm tracking-wider">
                Prediksi
              </span>
              <button 
                onClick={() => setSelectedPrediction(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded shadow cursor-pointer transition border border-blue-400"
              >
                Tutup
              </button>
            </div>

{/* Area Konten */}
<div className="p-3 sm:p-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-amber-400 flex flex-col items-center justify-center">
  
  {/* Kotak tabel biru ini yang sekarang diberi max-h dan overflow-y-auto agar bisa di-scroll */}
  <div className="w-full max-w-2xl max-h-[70vh] flex flex-col border-2 border-blue-400 rounded-lg bg-gradient-to-b from-blue-900 to-blue-950 shadow-2xl overflow-hidden my-auto">
    
    {/* Header Tabel (Tetap di atas saat di-scroll) */}
    <div className="bg-blue-700/80 border-b border-blue-400 text-center py-3 px-2 flex-shrink-0">
      <h2 className="text-sm sm:text-base font-black tracking-widest text-white uppercase drop-shadow">
        PREDIKSI TOGEL {selectedPrediction.name}
      </h2>
      <p className="text-[11px] sm:text-xs font-semibold text-blue-100 mt-0.5">
        {selectedPrediction.date}
      </p>
    </div>

    {/* Bagian isi yang bisa di-scroll jika datanya panjang */}
    <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-blue-400">
      <div className="divide-y divide-blue-500/40 text-xs sm:text-sm">
        <div className="grid grid-cols-2 text-center py-3">
          <div className="font-bold text-white border-r border-blue-500/40 flex items-center justify-center">BBFS</div>
          <div className="font-mono font-black text-amber-300 tracking-wider flex items-center justify-center">{selectedPrediction.bbfs}</div>
        </div>
        <div className="grid grid-cols-2 text-center py-3 bg-blue-950/40">
          <div className="font-bold text-white border-r border-blue-500/40 flex items-center justify-center">ANGKA MAIN</div>
          <div className="font-mono font-black text-amber-300 tracking-wider flex items-center justify-center">{selectedPrediction.angkaMain}</div>
        </div>
        <div className="grid grid-cols-2 text-center py-3">
          <div className="font-bold text-white border-r border-blue-500/40 flex items-center justify-center">Colok Bebas</div>
          <div className="font-bold text-white flex items-center justify-center">{selectedPrediction.colokBebas}</div>
        </div>
        <div className="grid grid-cols-2 text-center py-3 bg-blue-950/40">
          <div className="font-bold text-white border-r border-blue-500/40 flex items-center justify-center">Colok Macau</div>
          <div className="font-bold text-white flex items-center justify-center">{selectedPrediction.colokMacau}</div>
        </div>
        <div className="grid grid-cols-2 text-center py-3">
          <div className="font-bold text-white border-r border-blue-500/40 flex items-center justify-center">SHIO</div>
          <div className="font-bold text-amber-300 flex items-center justify-center">{selectedPrediction.shio}</div>
        </div>
      </div>

      <div className="bg-blue-700/80 border-t border-b border-blue-400 text-center py-2">
        <span className="text-xs font-black tracking-wider text-white uppercase">
          2D BOLAK BALIK
        </span>
      </div>

      <div className="bg-black/90 py-4 px-3 text-center">
        <span className="font-mono text-xs sm:text-sm font-bold text-amber-300 tracking-widest break-all">
          {selectedPrediction.bolakBalik}
        </span>
      </div>
    </div>

  </div>
</div>

          </div>
        </div>
      )}













      {/* ================= MODAL / POPUP LIVEDRAW SESUAI GAMBAR REFERENSI ================= */}
      {selectedLivedraw && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full mx-2 sm:mx-6 h-[95vh] sm:max-h-[75vh] flex flex-col bg-transparant-to-b from-[#0c1836] via-[#091024] to-[#060b18] border-transparant border-transparant rounded-lg shadow-[0_0_40px_rgba(250,204,21,0.4)] overflow-hidden">
            
            {/* Header Kuning Atas */}
            <div className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 px-4 py-2 flex items-center justify-between border-b-2 border-amber-600">
              <span className="text-black font-black text-xs sm:text-sm tracking-wider">
                Livedraw
              </span>
              <button 
                onClick={() => setSelectedLivedraw(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1 rounded shadow cursor-pointer transition border border-blue-400"
              >
                Tutup
              </button>
            </div>

            {/* Kotak Konten Livedraw Persis Referensi */}
            <div className="p-4 sm:p-6 flex flex-col items-center">
              
              <div className="w-full max-w-md bg-[#090d19] border-2 border-amber-400/60 rounded-2xl p-5 shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] space-y-5 text-center relative overflow-hidden">
                
                {/* Logo & Judul Live Draw */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-900 via-blue-950 to-indigo-950 border border-amber-400/50 px-4 py-1.5 rounded-full shadow-md">
                    <span className="text-amber-400 font-extrabold text-sm">♠</span>
                    <span className="text-xs font-black tracking-widest text-white uppercase">LIVE DRAW {selectedLivedraw.name}</span>
                  </div>
                </div>

                {/* Kotak Tanggal */}
                <div className="bg-[#121c33] border border-amber-400/40 rounded-xl py-2 px-4 shadow-inner">
                  <span className="text-xs sm:text-sm font-bold text-white tracking-wider">
                    {selectedLivedraw.date}
                  </span>
                </div>

                {/* Kotak Prize 1 */}
                <div className="bg-black/90 border-2 border-amber-400 rounded-xl p-3 flex items-center justify-between shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider pl-2">
                    1st Prize
                  </span>
                  <div className="bg-[#0b1325] border border-amber-400/60 rounded-lg px-4 py-1.5 shadow-inner">
                    <span className="text-xl sm:text-2xl font-mono font-black text-amber-300 tracking-widest">
                      {selectedLivedraw.prize1}
                    </span>
                  </div>
                </div>

                {/* Kotak Prize 2 */}
                <div className="bg-black/90 border-2 border-amber-400/60 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider pl-2">
                    2nd Prize
                  </span>
                  <div className="bg-[#0b1325] border border-amber-400/40 rounded-lg px-4 py-1.5 shadow-inner">
                    <span className="text-lg sm:text-xl font-mono font-bold text-white tracking-widest">
                      {selectedLivedraw.prize2}
                    </span>
                  </div>
                </div>

                {/* Kotak Prize 3 */}
                <div className="bg-black/90 border-2 border-amber-400/60 rounded-xl p-3 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider pl-2">
                    3rd Prize
                  </span>
                  <div className="bg-[#0b1325] border border-amber-400/40 rounded-lg px-4 py-1.5 shadow-inner">
                    <span className="text-lg sm:text-xl font-mono font-bold text-white tracking-widest">
                      {selectedLivedraw.prize3}
                    </span>
                  </div>
                </div>

                {/* Keterangan Jadwal di Bawah Kartu */}
                <div className="pt-2 text-[11px] text-slate-400 font-medium whitespace-pre-line leading-relaxed">
                  {selectedLivedraw.schedule}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}













      {/* ================= MODAL / POPUP RESULT ================= */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full mx-2 sm:mx-6 h-[95vh] sm:max-h-[75vh] flex flex-col bg-transparant-to-b from-[#0c1836] via-[#091024] to-[#060b18] border-transparant border-transparant rounded-lg shadow-[0_0_40px_rgba(250,204,21,0.4)] overflow-hidden">
            
            <div className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 px-4 py-2 flex items-center justify-between border-b-2 border-amber-600">
              <span className="text-black font-black text-xs sm:text-sm tracking-wider">
                Result
              </span>
              <button 
                onClick={() => setSelectedResult(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3 py-1 rounded shadow cursor-pointer transition border border-blue-400"
              >
                Tutup
              </button>
            </div>

            <div className="p-3 sm:p-6 space-y-4">
              <div className="border-2 border-blue-400 rounded-lg bg-gradient-to-b from-blue-900 to-blue-950 shadow-2xl overflow-hidden">
                
                <div className="bg-blue-700/90 border-b border-blue-400 text-center py-2.5 px-2">
                  <h2 className="text-xs sm:text-sm font-black tracking-widest text-white uppercase drop-shadow">
                    HISTORY RESULT {selectedResult.name}
                  </h2>
                </div>

                <div className="overflow-x-auto max-h-[50vh] sm:max-h-[60vh] scrollbar-thin scrollbar-thumb-amber-400">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-blue-600/90 text-white border-b border-blue-400 text-center">
                        <th className="py-2 px-3 font-bold border-r border-blue-400/50">Periode</th>
                        <th className="py-2 px-3 font-bold border-r border-blue-400/50">Tanggal</th>
                        <th className="py-2 px-3 font-bold border-r border-blue-400/50">Prize 1</th>
                        <th className="py-2 px-3 font-bold border-r border-blue-400/50">Prize 2</th>
                        <th className="py-2 px-3 font-bold">Prize 3</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-blue-500/30 text-center bg-white text-slate-900 font-medium">
                      {selectedResult.history.map((row, idx) => (
                        <tr key={idx} className="hover:bg-amber-100 transition">
                          <td className="py-2 px-3 border-r border-slate-300 font-mono text-slate-700">{row.periode}</td>
                          <td className="py-2 px-3 border-r border-slate-300 text-slate-700">{row.tanggal}</td>
                          <td className="py-2 px-3 border-r border-slate-300 font-bold font-mono text-black">{row.prize1}</td>
                          <td className="py-2 px-3 border-r border-slate-300 font-mono text-slate-700">{row.prize2}</td>
                          <td className="py-2 px-3 font-mono text-slate-700">{row.prize3}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>

              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-2">
                {[...Array(26)].map((_, i) => (
                  <button 
                    key={i}
                    className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded font-extrabold text-xs text-black shadow transition cursor-pointer ${i === 0 ? 'bg-amber-300 border-2 border-white' : 'bg-amber-400 hover:bg-amber-300'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}