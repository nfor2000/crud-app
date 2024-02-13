export function showAlert(class_name, msg) {
     const alert = document.createElement('div');
     alert.className = class_name;
     alert.innerHTML = `${msg}
                                   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
     document.body.appendChild(alert);
}
