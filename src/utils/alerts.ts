import Swal from 'sweetalert2';

const showAlert = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
  Swal.fire({
    toast: true,
    position: 'top',
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 5000,
  });
};

export const alertService = {
  success: (message: string) => showAlert('success', message),
  error: (message: string) => showAlert('error', message),
  info: (message: string) => showAlert('info', message),
  warning: (message: string) => showAlert('warning', message),
};
