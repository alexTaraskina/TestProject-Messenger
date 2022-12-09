// temp js, to show error message on amrkup

const ClassNames = {
    ERROR_VISIBLE: 'form-input-group__error_visible',
}

document.addEventListener('DOMContentLoaded', function () {
    let adminLogin = 'admin';
    let adminPassword = 'admin'
    let loginForm = document.querySelector('#login-form');
    let loginEl = loginForm.querySelector('#login');
    let passwordEl = loginForm.querySelector('#password');
    let loginErrorEl = loginEl.nextElementSibling;
    let passwordErrorEl = passwordEl.nextElementSibling;
    let errorElements = [loginErrorEl, passwordErrorEl];

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => onFormSubmit(e));
    }

    if (loginEl) {
        loginEl.addEventListener('click', onInputClick);
    }

    if (passwordEl) {
        passwordEl.addEventListener('click', onInputClick);
    }

    function onInputClick() {
        errorElements.forEach(error => error.classList.remove(ClassNames.ERROR_VISIBLE));
    }

    function onFormSubmit(e) {
        e.preventDefault();
        if (loginEl.value !== adminLogin) {
            showError(loginErrorEl);
        }
        if (passwordEl.value !== adminPassword) {
            showError(passwordErrorEl);
        }

    }

    function showError(errorEl) {
        errorEl.classList.add(ClassNames.ERROR_VISIBLE);
    }
})

