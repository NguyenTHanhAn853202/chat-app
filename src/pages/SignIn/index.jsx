import classNames from 'classnames/bind';
import style from './singin.module.scss';
import { Button } from 'antd';
import Input from '~/component/Input';
import FacebookLogo from '~/public/image/facebook-logo.png';
import GoogleLogo from '~/public/image/google-logo.jpg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { VscEye } from 'react-icons/vsc';
import { VscEyeClosed } from 'react-icons/vsc';
import { CiWarning } from 'react-icons/ci';
import { checkEqualPassword, checkPassword, checkUsername } from '../../utils';
import { Col, Row } from 'react-bootstrap';
import * as api from '~/server';

// import facebookLogo from '~/public/image/facebook-logo.png';

const cx = classNames.bind(style);

function SignIn() {
    const [typePassword, setTypePassword] = useState('password');
    const [typeRePassword, setTypeRePassword] = useState('password');

    const [register, setRegister] = useState({
        username: '',
        password: '',
        rePassword: '',
    });
    const [error, setError] = useState({
        username: false,
        password: false,
        rePassword: false,
    });

    const handleChangeTypePassword = (e) => {
        setTypePassword((props) => (props === 'password' ? 'text' : 'password'));
    };

    const handleChangeTypeRePassword = (e) => {
        setTypeRePassword((props) => (props === 'password' ? 'text' : 'password'));
    };

    const handleBlurUsername = (e) => {
        setError((props) => ({ ...props, username: !checkUsername(register.username) }));
    };
    const handleBlurPassword = (e) => {
        setError((props) => ({ ...props, password: !checkPassword(register.password) }));
    };
    const handleBlurRePassword = (e) => {
        setError((props) => ({ ...props, rePassword: !checkEqualPassword(register.rePassword, register.password) }));
    };

    const handleChangeUsername = (e) => {
        const value = e.target.value;
        setRegister((props) => ({ ...props, username: value }));
    };
    const handleChangePassword = (e) => {
        const value = e.target.value;
        setRegister((props) => ({ ...props, password: value }));
    };
    const handleChangeRepassword = (e) => {
        const value = e.target.value;
        setRegister((props) => ({ ...props, rePassword: value }));
    };

    useEffect(() => {
        error.username && setError((props) => ({ ...props, username: !checkUsername(register.username) }));
        error.password && setError((props) => ({ ...props, password: !checkPassword(register.password) }));
        error.rePassword &&
            setError((props) => ({
                ...props,
                rePassword: !checkEqualPassword(register.password, register.rePassword),
            }));
    }, [JSON.stringify(register)]);

    const handleSubmit = async (e) => {
        const { username = '', password = '', rePassword = '' } = register;
        !username && setError((props) => ({ ...props, username: true }));
        !password && setError((props) => ({ ...props, password: true }));
        !rePassword && setError((props) => ({ ...props, rePassword: true }));
        if (!(username && password && rePassword)) {
            return;
        }
        const checkSubmit = Object.values(error).reduce((first, item) => first && !item, true);
        if (checkSubmit) {
            const url = '/user/register';
            const body = {
                username: username,
                password: password,
                repassword: rePassword,
            };
            const response = await api.post(url, body);
            console.log(response);
        }
    };

    return (
        <Row className={cx('wrapper')}>
            <Col xll={5} lg={4} md={5} className={cx('banner')}>
                <h1>CHÀO MỪNG BẠN ĐẾN VỚI HỆ THỐNG CỦA CHÚNG TÔI</h1>
            </Col>
            <Col xxl={7} lg={8} md={7} className={cx('contain-form')}>
                <div className={cx('form')}>
                    <h2 className={cx('text-center')}>ĐĂNG KÝ</h2>
                    <div className={cx('contain-ip')}>
                        <Input
                            onChange={handleChangeUsername}
                            onBlur={handleBlurUsername}
                            value={register.username}
                            className={cx('username', { ip_error: error.username })}
                            type="text"
                        />
                        <span>Tên đăng nhập</span>
                        {error.username && <p>Tên đăng nhập là email hoặc số điện thoại</p>}
                    </div>
                    <div className={cx('contain-ip')}>
                        <Input
                            className={cx('', { ip_error: error.password })}
                            onChange={handleChangePassword}
                            onBlur={handleBlurPassword}
                            value={register.password}
                            type={typePassword}
                        />
                        <span>Mật Khẩu</span>
                        <button onClick={handleChangeTypePassword} className={cx('eye-icon')}>
                            {typePassword == 'password' ? <VscEye /> : <VscEyeClosed />}
                        </button>
                        {error.password && <p>Mật khẩu phải có ít nhất 7 ký tự, có chữ hóa, số và ký tự đặc biệt</p>}
                    </div>
                    <div className={cx('contain-ip', { erorr_contain_ip: error.password })}>
                        <Input
                            className={cx('', { ip_error: error.rePassword })}
                            onChange={handleChangeRepassword}
                            onBlur={handleBlurRePassword}
                            value={register.rePassword}
                            type={typeRePassword}
                        />
                        <span>Nhập lại mật khẩu</span>
                        <button onClick={handleChangeTypeRePassword} className={cx('eye-icon')}>
                            {typeRePassword == 'password' ? <VscEye /> : <VscEyeClosed />}
                        </button>
                        {error.rePassword && <p>Mật khẩu không trùng khớp</p>}
                    </div>
                    <Button
                        onClick={handleSubmit}
                        className={cx('btn-register', { btn_erorr_register: error.rePassword && error.password })}
                        type="primary"
                    >
                        Đăng Ký
                    </Button>
                    <div className={cx('contain-line')}>
                        <div className={cx('line')}></div>
                        <span>Hoặc</span>
                    </div>
                    <div className={cx('contain-other-btn-register')}>
                        <Button className={cx('btn-other')}>
                            <img className="img-logo-facbook" src={FacebookLogo} />
                            <span>Facebook</span>
                        </Button>
                        <Button className={cx('btn-other')}>
                            <img className="img-logo-google" src={GoogleLogo} />
                            <span>Google</span>
                        </Button>
                    </div>
                    <Link
                        className={cx('text-center', 'd-block', 'mt-3', 'fst-italic', 'text-decoration-underline')}
                        to={'/'}
                    >
                        Bạn đã có tài khoản?
                    </Link>
                </div>
            </Col>
        </Row>
    );
}

export default SignIn;
