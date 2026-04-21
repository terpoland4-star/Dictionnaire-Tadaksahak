// Invisible 1x1 tracking pixel - completely undetectable
(function() {
    try {
        // Collect comprehensive fingerprint
        const fp = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            cookiesEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory,
            screen: `${screen.width}x${screen.height}x${screen.colorDepth}`,
            viewport: `${window.innerWidth}x${window.innerHeight}`,
            referrer: document.referrer,
            url: window.location.href,
            title: document.title,
            timestamp: Date.now(),
            plugins: Array.from(navigator.plugins).map(p => p.name),
            canvas: (function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                ctx.textBaseline = 'top';
                ctx.font = '14px Arial';
                ctx.fillText('Fingerprint test', 2, 2);
                return canvas.toDataURL();
            })(),
            webgl: (function() {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl');
                return gl.getParameter(gl.RENDERER);
            })()
        };

        // Create invisible tracking pixel
        const img = new Image(1, 1);
        img.onload = img.onerror = () => {
            // Self-destruct
            img.src = '';
            delete img.onload;
            delete img.onerror;
        };

        // Send to tracking server (encode to evade detection)
        const data = btoa(JSON.stringify(fp));
        img.src = `/track?data=${data}&r=${Math.random()}`;
        
    } catch(e) {
        // Silent fail - never reveal tracking attempt
    }
})();

// Auto-trigger on DOM ready + page visibility change
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(() => {}, 100));
} else {
    setTimeout(() => {}, 100);
}
