const express = require('express');
const cors = require('cors');
const app = express();
import { API_BASE_URL } from "./app-config"; // API_BASE_URL 임포트
import axios from 'axios';

// CORS 설정
const allowedOrigins = ['http://localhost:3000', 'https://codi.page']; // 허용할 출처 목록
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'OPTIONS'], // 허용할 HTTP 메서드
    allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
}));

const headers = {
    'Content-Type': 'application/json', // 명시적으로 설정
    'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` // 유효한 토큰 확인
};


// 모든 경로에 대한 OPTIONS 요청 허용
app.options('*', cors());

// 라우트 설정
app.get('/api/categories', (req, res) => { // 경로 수정
    const categories = [
        { id: 1, name: 'Books' },
        { id: 2, name: 'Writing' },
        { id: 3, name: 'Music' }
    ];
    res.json({ categories });
});

// 서버 리스닝
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export const fetchItems = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/items`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.data; // 데이터 반환
};