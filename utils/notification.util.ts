export function showToast(message, options = {}) {
    const {
        background = 'linear-gradient(269.1deg, #259660 0%, #197348 100%)',
        buttonBackground = 'rgba(19, 19, 20, 0.3)',
        progressBackground = 'rgba(19, 19, 20, 1)',
        duration = 4000,
    } = options;

    const body = document.body;
    const container = document.querySelector('.container');
    const containerPosition = container?.getBoundingClientRect();

    const toastRightPosition = body.clientWidth - containerPosition?.right;
    const toastElement = document.createElement('div');
    toastElement.classList.add('toast', 'fade');

    // Set the styling for the toast container
    toastElement.style.width = 'max-content';
    toastElement.style.minWidth = '360px';
    toastElement.style.position = 'fixed';
    toastElement.style.top = '110px';
    toastElement.style.right = !container ? `50px` : `${toastRightPosition}px`;
    toastElement.style.overflow = 'hidden';
    toastElement.style.transform = 'translateY(-45px)';
    toastElement.style.zIndex = '100';
    toastElement.style.background = background;
    toastElement.style.borderRadius = '40px';
    toastElement.style.boxShadow = '0px 6px 20px 0px #464D6133';

    // Set the message content
    toastElement.innerHTML = `
    <div class="flex items-center justify-between gap-5 p-[10px] pl-6 text-white font-semibold">
      <div class="w-full h-full absolute top-0 left-0 z-[-1] opacity-20 transition progressbar" style="background-color: ${progressBackground}; animation: progressAnimation ${duration}ms linear forwards;"></div>
      <span class="text-b4 capitalize">${message}</span>
      <button
          type="button"
          aria-label="Close"
          class="inline-flex items-center gap-1 py-2 px-[10px] text-b5 rounded-[26px]"
          style="background-color: ${buttonBackground}"
        >
        <i class="icon-check"></i> Got it
      </button>
    </div>
  `;

    // Show the toast
    document.body.appendChild(toastElement);

    setTimeout(() => {
        document.body.removeChild(toastElement);
    }, duration);
}


export function showSuccessMessage(message = null) {
    if (!message) {
        return;
    }
    const options = {
        background: 'linear-gradient(269.1deg, #259660 0%, #197348 100%)',
        buttonBackground: 'rgba(19, 19, 20, 0.3)'
    };
    showToast(message, options);
}

export function showInfoMessage(message = null) {
    if (!message) {
        return;
    }
    const options = {
        background: 'linear-gradient(269.1deg, #259660 0%, #197348 100%)',
        buttonBackground: 'rgba(19, 19, 20, 0.3)'
    };
    showToast(message, options);
}

export function showErrorMessage(message = null) {
    if (!message) {
        return;
    }
    const options = {
        background: 'linear-gradient(269.1deg, #DD2D22 0%, #913214 100%)',
        buttonBackground: 'rgba(19, 19, 20, 0.3)'
    };
    showToast(message, options);
}

export function showWarningMessage(message = null) {
    if (!message) {
        return;
    }
    const options = {
        background: 'linear-gradient(269.1deg, #259660 0%, #197348 100%)',
        buttonBackground: 'rgba(19, 19, 20, 0.3)'
    };
    showToast(message, options);
}

export function showDeleteSuccessMessage(message = null) {
    if (!message) {
        return;
    }
    const options = {
        background: 'linear-gradient(269.1deg, #259660 0%, #197348 100%)',
        buttonBackground: 'rgba(19, 19, 20, 0.3)'
    };
    showToast(message, options);
}