import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LoginScreen.css';

const LoginScreen = ({onLogin}) => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = () => {
        console.log('ID:', id);
        console.log('Password:', password);
        onLogin();
        navigate('/main')
    };


    const handleGoogleLogin = () => {
        console.log('Google login simulated'); // 구글 로그인 가정
        onLogin(); // onLogin 호출
        navigate('/main');
        
    };


    
    return (
        <div className="login-screen">
          <div className="login-tag" style={{ left: '255px', top: '72px', width: '113px', borderColor: '#83B987' }}>#보드게임</div>
          <div className="login-tag" style={{ left: '196px', top: '169px', width: '156px', borderColor: '#93C296' }}>#근처에서_봐요</div>
          <div className="login-tag" style={{ left: '33px', top: '169px', width: '78px', borderColor: '#83B987' }}>#조깅</div>
          <div className="login-tag" style={{ left: '93px', top: '116px', width: '95px', borderColor: '#93C296' }}>#달리기</div>
    
            <div className="input-container">
                <input
                    type="text"
                    placeholder="아이디를 입력하세요"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="input-field"
                />
            </div>
            <div className="input-container">
                <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
            </div>
            <button onClick={handleLogin} className="login-button">로그인</button>
           
            {/* <div className='google-login-container'>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleFailure}
                        render={(renderProps) => (
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google-button">
                                <img src="/google.png" alt='Google Logo' className='google-icon'/>
                                구글로 계속하기
                            </button>
                        )}
                    />
                </div> */}
            <button className="google-button" onClick={handleGoogleLogin}>
            <img src="/google.png" alt="Google Logo" className="google-icon" />
            구글로 계속하기
             </button>
           
           
            <div className="footer">
                <a href="/signup" className="footer-link1">회원가입</a>
                <a href="/find-account" className="footer-link2">계정찾기</a>
            </div>
        </div>
    );
};

export default LoginScreen;
