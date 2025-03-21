// app/api/proxy/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request:Request) {
  const url = new URL(request.url);
  const endpoint = url.searchParams.get('endpoint');  // Ambil parameter endpoint

  if (!endpoint) {
    return NextResponse.json({ error: 'No endpoint provided' }, { status: 400 });
  }

  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
  const token = request.headers.get('Authorization');

  try {
   const res = await axios.get(baseUrl, {
    headers: {
      'Authorization': token, 
    },
    });

    const response = NextResponse.json(res.data);

    // Tambahkan Header CORS
    response.headers.set('Access-Control-Allow-Origin', '*'); // Ubah * ke domain spesifik jika perlu
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  } catch (error) {
    console.error('Error fetching data :', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request:Request) {
  try {
    const url = new URL(request.url);
    const endpoint = url.searchParams.get('endpoint');

    if (!endpoint) {
      return NextResponse.json({ error: 'No endpoint provided' }, { status: 400 });
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
    const body = await request.json();

    const res = await axios.post(baseUrl, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = NextResponse.json(res.data);

    // Tambahkan Header CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  } catch (error) {
    console.error('Error posting data:', error);
    return NextResponse.json({ error: 'Failed to post data' }, { status: 500 });
  }
}
