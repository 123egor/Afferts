document.addEventListener('DOMContentLoaded', () => {
    const validate = new JustValidate('.questions__form');

    validate
        .addField('#name', [
            { rule: 'required', errorMessage: 'Введите ваше имя' },
            { rule: 'minLength', value: 3, errorMessage: 'Минимум 3 символа' },
            { rule: 'maxLength', value: 20, errorMessage: 'Максимум 20 символов' },
        ])
        .addField('#email', [
            { rule: 'required', errorMessage: 'Введите почту' },
            { rule: 'email', errorMessage: 'Почта введена неверно' },
        ])
        .addField('#agree', [
            { rule: 'required', errorMessage: 'Соглашение обязательно' },
        ], {
            errorsContainer: '.custom-checkbox',
        })
        .onSuccess(async (event) => {
            event?.preventDefault();
            const form = document.querySelector('.questions__form');
            const formData = new FormData(form);

            try {
                const response = await fetch('https://httpbin.org/post', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    showModal('success');
                    form.reset();
                } else {
                    showModal('error');
                }
            } catch {
                showModal('error');
            }
        });
});

function createSvgIcon(iconName, width = '24', height = '24') {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('aria-hidden', 'true');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `images/sprite.svg#${iconName}`);

    svg.append(use);
    return svg;
}

function showModal(type = 'success') {
    const isSuccess = type === 'success';

    const modal = document.createElement('div');
    modal.className = 'modal';

    const content = document.createElement('div');
    content.className = 'modal__content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal__close';
    closeBtn.type = 'button';
    closeBtn.append(createSvgIcon('icon-close'));

    const iconWrap = document.createElement('div');
    iconWrap.className = `modal__icon modal__icon--${type}`;
    iconWrap.append(createSvgIcon(isSuccess ? 'icon-check' : 'icon-error'));

    const title = document.createElement('h3');
    title.className = 'modal__title';
    title.textContent = isSuccess
        ? 'Благодарим за обращение!'
        : 'Не удалось отправить обращение';

    const text = document.createElement('p');
    text.className = 'modal__text';
    text.textContent = isSuccess
        ? 'Мы получили вашу заявку и свяжемся с вами в ближайшее время'
        : 'Что-то пошло не так, попробуйте отправить форму еще раз. Если ошибка повторится — свяжитесь со службой поддержки.';

    content.append(closeBtn, iconWrap, title, text);
    modal.append(content);
    document.body.append(modal);
    document.body.style.overflow = 'hidden';

    const close = () => {
        modal.remove();
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
    });
}