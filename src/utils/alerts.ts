import Swal from 'sweetalert2';

const showAlert = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: type,
    iconColor: 'white',
    title: message,
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timerProgressBar: true,
    timer: 4000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
};

export const alertService = {
  success: (message: string) => showAlert('success', message),
  error: (message: string) => showAlert('error', message),
  info: (message: string) => showAlert('info', message),
  warning: (message: string) => showAlert('warning', message),
};
