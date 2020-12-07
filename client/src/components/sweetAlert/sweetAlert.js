import Swal from 'sweetalert2';

export const showSuccess = (message) =>
    Swal.fire({
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
    });

export const showError = (message) =>
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
    });

export const showLoginSuccess = () =>
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Login with Token!',
        showConfirmButton: false,
        timer: 1500,
    });
