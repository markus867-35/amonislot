'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
// 1. Impor komponen Swiper dan CSS-nya
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Inisialisasi Supabase Client (Pastikan env sudah benar dan di-restart)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function HeroSlider() {
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    const fetchbanners = async () => {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('created_at', { ascending: false }); // Urutkan dari yang terbaru

      if (error) console.error("Error Supabase:", error);
      if (data) setBanners(data);
    };

    // Panggil pertama kali
    fetchbanners();

    // 2. Tambahkan Realtime Listener agar otomatis update saat admin menambah data
    const channel = supabase
      .channel('public:banners')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'banners' }, () => {
        fetchbanners(); // Ambil ulang data otomatis saat ada perubahan
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel); // Bersihkan listener saat komponen unmount
    };
  }, []);

  // Jika banner kosong di database, tampilkan placeholder
  if (banners.length === 0) {
    return (
      <div className="w-full h-[200px] md:h-[500px] bg-gray-800 flex items-center justify-center overflow-hidden border-b border-purple-800 relative">
        <span className="text-white text-sm">Memuat Banner...</span>
      </div>
    );
  }

  // 3. Render menggunakan komponen Swiper
  return (
    <div className="w-full h-[200px] md:h-[500px] bg-gray-800 overflow-hidden border-b border-purple-800 relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, Mousewheel]}
        spaceBetween={0} // Jarak antar slide (0 biar rapat kayak gambar)
        slidesPerView={1} // Tampilkan 1 banner penuh
        loop={true} // Geser berputar terus menerus
        autoplay={{
          delay: 4000, // Ganti otomatis setiap 4 detik
          disableOnInteraction: false, // Tetap autoplay walau disentuh/geser
        }}
        pagination={{ clickable: true, dynamicBullets: true }} // Titik navigasi di bawah
        navigation={false} // Panah kiri kanan (opsional, hapus jika tidak mau)
        mousewheel={true} // Bisa digulir pake mouse wheel
        grabCursor={true} // Kursor jadi tangan saat dihover
        className="mySwiper w-full h-full"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            <img
              src={banner.image_url}
              alt={`Hero Banner ${index + 1}`}
              className="w-full h-full object-cover md:object-cover" // Pakai object-cover biar penuhin layar
              draggable={false} // Mencegah gambar diseret secara native (Swiper yang handle)
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}