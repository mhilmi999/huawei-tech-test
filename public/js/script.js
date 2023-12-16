const form = document.querySelector('form');
const username = document.getElementById('nama');
const email = document.getElementById('email');
const phonenumber = document.getElementById('mobile_number');

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    fetch('/v1/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json()
    .then(data => console.log(data)))
    .catch(error => console.log(error));
});


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const isValidPhone = phonenumber => {
    const re = /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/;
    return re.test(String(phonenumber));
};

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const phonenumberValue = phonenumber.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(phonenumberValue === ''){
        setError(phonenumber, 'Phone number is required')
    } else if (phonenumberValue.length < 10 || phonenumberValue.length > 14){
        setError(phonenumber, 'Length of phone number is not legal');
    } else if (!isValidPhone(phonenumberValue)){
        setError(phonenumber, 'Provide a valid indonesian mobile number');
    } 
    else {
        setSuccess(phonenumber)
    }
};
