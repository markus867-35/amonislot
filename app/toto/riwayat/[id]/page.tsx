'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RiwayatTotoPage() {
  const params = useParams();
  const id = params?.id;

  const [marketName, setMarketName] = useState('RIWAYAT TOGEL');
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [periodeFilter, setPeriodeFilter] = useState('');

  useEffect(() => {
    if (id) {
      fetchMarketAndHistory();
    }
  }, [id]);

const fetchMarketAndHistory = async () => {
    try {
      setLoading(true);

      const isNumericId = /^\d+$/.test(String(id));
      let targetMarketName = '';

      // Jika URL mengirim teks (slug seperti 'turki' atau 'singapore-pools'), ubah jadi spasi
      if (!isNumericId) {
        targetMarketName = String(id).replace(/-/g, ' ');
      }

      // 1. Ambil data dari tabel 'togel_results'
      let query = supabase.from('togel_results').select('*');

      if (isNumericId) {
        // Jika masih berupa angka ID, kita ambil seluruh data untuk dicocokkan atau diurutkan
        // Karena tidak ada kolom ID pasaran, kita ambil data berdasarkan baris terbaru atau urutan
        // Lebih disarankan nanti link di-orisinilkan mengirim nama pasaran.
        query = query.order('id', { ascending: false });
      } else {
        query = query.ilike('pasaran', `%${targetMarketName}%`).order('id', { ascending: false });
      }

      const { data: results, error } = await query;

      if (error) throw error;

      let finalResults = results || [];

      // Jika berupa angka ID dan data tumpul, ambil data berdasarkan indeks unik pasaran yang ada di database
      if (isNumericId && finalResults.length > 0) {
        const uniquePasaran = [...new Set(finalResults.map(item => item.pasaran))];
        const selectedPasaran = uniquePasaran[Number(id) - 1] || uniquePasaran[0];
        
        if (selectedPasaran) {
          targetMarketName = selectedPasaran;
          finalResults = finalResults.filter(item => item.pasaran === selectedPasaran);
        }
      }

      setHistoryData(finalResults);
      setFilteredData(finalResults);

      // 2. Pastikan Header Judul mengambil nama pasaran asli dari data yang tampil
      if (finalResults.length > 0 && finalResults[0].pasaran) {
        targetMarketName = finalResults[0].pasaran;
      }

      setMarketName(`RIWAYAT ANGKA ${targetMarketName.toUpperCase() || 'TOGEL'}`);

    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  
  // Fungsi Filter (Cari)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let tempData = [...historyData];

    if (periodeFilter.trim() !== '') {
      tempData = tempData.filter((item) => 
        String(item.periode || '').toLowerCase().includes(periodeFilter.toLowerCase())
      );
    }

    if (startDate) {
      tempData = tempData.filter((item) => new Date(item.tanggal || item.created_at) >= new Date(startDate));
    }

    if (endDate) {
      tempData = tempData.filter((item) => new Date(item.tanggal || item.created_at) <= new Date(endDate + 'T23:59:59'));
    }

    setFilteredData(tempData);
  };

  // Fungsi Reset Filter
  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setPeriodeFilter('');
    setFilteredData(historyData);
  };

  return (
    <div className="min-h-screen bg-[#0a020f] text-gray-900 p-5 sm:p-1.5">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        
        {/* Header Banner */}
        <div className="bg-[#1a0525] text-white p-4 font-bold text-lg sm:text-xl uppercase tracking-wider flex justify-between items-center">
          <span>{marketName}</span>
          <Link 
            href="/" 
            className="bg-blue-800 hover:bg-blue-700 text-xs px-3 py-1.5 rounded-lg transition text-white"
          >
            Kembali
          </Link>
        </div>

        {/* Form Filter */}
        <form onSubmit={handleSearch} className="p-4 bg-gray-50 border-b flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tanggal Mulai</label>
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Tanggal Akhir</label>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Periode</label>
            <input 
              type="text" 
              placeholder="Masukkan periode" 
              value={periodeFilter}
              onChange={(e) => setPeriodeFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <button 
              type="submit" 
              className="bg-yellow-400 hover:bg-yellow-500 font-semibold px-5 py-1.5 rounded text-sm transition shadow-sm cursor-pointer"
            >
              Cari
            </button>
            <button 
              type="button" 
              onClick={handleReset}
              className="bg-white border border-gray-300 hover:bg-gray-100 font-semibold px-5 py-1.5 rounded text-sm transition shadow-sm cursor-pointer"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Tabel Data Riwayat */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b text-gray-700 text-xs uppercase tracking-wider">
                <th className="p-3.5 border-r text-center w-1/4">Periode</th>
                <th className="p-3.5 border-r text-center w-2/4">Tanggal</th>
                <th className="p-3.5 text-center w-1/4 font-bold text-blue-800">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {loading ? (
                <tr>
                  <td colSpan={3} className="text-center p-6 text-gray-500">Memuat data riwayat...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center p-6 text-gray-500">Belum ada riwayat hasil untuk pasaran ini.</td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={`${item.id}-${index}`} className="hover:bg-gray-50 transition">
                    <td className="p-3.5 border-r text-center font-medium">{item.periode || '-'}</td>
                    <td className="p-3.5 border-r text-center text-gray-600">
                      {item.tanggal || item.waktu_dibuat || (item.created_at ? new Date(item.created_at).toLocaleString('id-ID') : '-')}
                    </td>
                    <td className="p-3.5 text-center font-bold text-blue-600 text-base">{item.result || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}