import classNames from 'classnames/bind';
import style from './input.module.scss';

const cx = classNames.bind(style);

function Input({ type = 'text', placeholder = '', className, id, ...props }) {
    return (
        <input
            id={id}
            {...props}
            className={cx('input', { [className]: className })}
            type={type}
            placeholder={placeholder}
        />
    );
}

export default Input;
