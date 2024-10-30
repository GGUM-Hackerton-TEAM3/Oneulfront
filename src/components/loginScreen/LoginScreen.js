import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import './LoginScreen.css';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log('email:', email);
        console.log('Password:', password);
        navigate('/main'); // Navigate to the main screen after logging in
    };

    const signupUser = async (userData) => {
        try {
            const response = await axios.post('https://codi.page/api/auth/signup', userData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Signup successful:', response.data);
            return response.data; // Handle the response as needed
        } catch (error) {
            console.error('Error signing up:', error.response ? error.response.data : error.message);
            throw error; // Handle the error as needed
        }
    };

    const handleJoin = async (e) => {
        e.preventDefault(); // Prevent default anchor behavior

        const formData = {
            username: 'exampleUser', // Replace with actual input values or states
            password:'asd', // Using the password state
            email: "ojspp00@catholic.ac.kr", // Using the email state
            profileImage: '/bell.png', // Add actual profile image data if available
            nickname: 'fefe', // Collect this from input if needed
            gender: 'MALE', // Adjust as necessary, could be state as well
            profileMessage: 'efef', // Collect this from input if needed
            major: 'fef', // Collect this from input if needed
            birthDate: '20010917', // Collect this from input if needed
        };

        try {
            await signupUser(formData); // Call the signup function
            navigate('/signup'); // Navigate to the signup page
        } catch (error) {
            // Handle any signup errors (show a message to the user, etc.)
            console.error("Signup failed:", error);
        }
    };

    return (
        <div className="login-screen">
            <div className="login-tag" style={{ left: '255px', top: '72px', width: '113px', borderColor: '#83B987' }}>#보드게임</div>
            <div className="login-tag" style={{ left: '196px', top: '169px', width: '156px', borderColor: '#93C296' }}>#근처에서_봐요</div>
            <div className="login-tag" style={{ left: '33px', top: '169px', width: '78px', borderColor: '#83B987' }}>#조깅</div>
            <div className="login-tag" style={{ left: '93px', top: '116px', width: '95px', borderColor: '#93C296' }}>#달리기</div>

            <div className="login-container">
                <input
                    type="email"
                    placeholder="아이디를 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
            </div>
            <div className="login-container">
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
            </div>
            <button onClick={handleLogin} className="login-button">로그인</button>

            <div className="footer">
                <a href="/signup" className="footer-link1" onClick={handleJoin}>회원가입</a>
                <a href="/find-account" className="find-account">계정찾기</a>
            </div>
        </div>
    );
};

export default LoginScreen;
