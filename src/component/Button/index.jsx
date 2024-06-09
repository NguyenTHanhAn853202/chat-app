import classNames from 'classnames/bind';
import styles from 'button.module.scss';

const cx = classNames.bind(styles);

function Button({ img, Icon, children, className, ...props }) {
    return (
        <button {...props} className={cx('button', { className: className })}>
            {img && <img src={img} />}
            {Icon && <span>{Icon}</span>}
            <span>{children}</span>
        </button>
    );
}

export default Button;
