/* --- PDF VIEWER ENGINE --- */
window.pdfViewerActive = false;

function openPDFViewer(pdfUrl, title) {
    if (!pdfUrl || pdfUrl === "#") {
        alert("This PDF is coming soon!");
        return;
    }

    window.pdfViewerActive = true;
    
    // CRITICAL: Disable body scroll to prevent lagging
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    const area = document.getElementById('contentArea');
    const topNav = document.getElementById('topNav');
    
    if(topNav) topNav.style.display = "none";

    let absoluteUrl = pdfUrl;
    if (!pdfUrl.startsWith('http')) {
        const loc = window.location;
        const root = loc.protocol + "//" + loc.host + loc.pathname.replace('index.html', '');
        absoluteUrl = root + pdfUrl;
    }

    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true&rm=minimal`;

    area.innerHTML = `
        <div class="flex flex-col h-full bg-white animate-fade-in" style="position:fixed; inset:0; z-index:9999; height:100dvh;">
            <div class="flex items-center justify-between p-3 bg-orange-800 text-white z-[100] shadow-md shrink-0">
                <button onclick="closePDFViewer()" class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all text-[11px] font-black shadow-lg border border-blue-400 active:scale-95">
                    <i class="fa-solid fa-chevron-left"></i>
                    <span>BACK</span>
                </button>
                <h3 class="font-bold text-[10px] uppercase tracking-widest truncate px-4 flex-1 text-center text-orange-100">${title}</h3>
                <a href="${absoluteUrl}" target="_blank" download class="p-2 bg-orange-700 rounded-lg">
                    <i class="fa-solid fa-download text-sm"></i>
                </a>
            </div>
            
            <div class="flex-1 bg-gray-100 relative w-full overflow-hidden" style="-webkit-overflow-scrolling: touch;">
                <div id="pdfLoading" class="absolute inset-0 flex items-center justify-center bg-white z-0">
                    <div class="flex flex-col items-center gap-3">
                        <i class="fa-solid fa-dharmachakra fa-spin text-orange-500 text-3xl"></i>
                        <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Loading Sacred Text...</span>
                    </div>
                </div>
                
                <div style="position: absolute; top: 0; right: 0; width: 60px; height: 60px; z-index: 60; background: transparent;"></div>

                <iframe 
                    src="${viewerUrl}" 
                    class="w-full h-full border-none relative z-50"
                    onload="document.getElementById('pdfLoading').style.display='none';"
                    style="height: 100%; width: 100%;">
                </iframe>
            </div>
        </div>
    `;
}

function closePDFViewer() {
    window.pdfViewerActive = false;
    
    // RE-ENABLE Scroll
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';

    const noNavTabs = ["contact", "bhajana", "about", "library"];
    const topNav = document.getElementById('topNav');
    
    if (topNav && !noNavTabs.includes(window.activeTab)) {
        topNav.style.display = "flex";
    }

    if (typeof window.render === 'function') {
        window.render();
    } else {
        switchTab(window.activeTab);
    }
}