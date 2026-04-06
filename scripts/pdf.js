/* --- PDF VIEWER ENGINE --- */
window.pdfViewerActive = true;

function openPDFViewer(pdfUrl, title) {
    if (!pdfUrl || pdfUrl === "#") {
        alert("This PDF is coming soon!");
        return;
    }

    window.pdfViewerActive = true;
    const area = document.getElementById('contentArea');
    const topNav = document.getElementById('topNav');
    
    if(topNav) topNav.style.display = "none";

    let absoluteUrl = pdfUrl;
    if (!pdfUrl.startsWith('http')) {
        const loc = window.location;
        const root = loc.protocol + "//" + loc.host + loc.pathname.replace('index.html', '');
        absoluteUrl = root + pdfUrl;
    }

    // Use &rm=minimal to reduce Google Viewer chrome/pop-out options
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true&rm=minimal`;

    area.innerHTML = `
        <div class="flex flex-col h-full bg-white overflow-hidden animate-fade-in" style="height: 100vh; height: 100dvh;">
            <div class="flex items-center justify-between p-3 bg-orange-800 text-white z-10 shadow-md shrink-0">
                <button onclick="closePDFViewer()" class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all text-[11px] font-black shadow-lg border border-blue-400">
                    <i class="fa-solid fa-chevron-left"></i>
                    <span>BACK</span>
                </button>
                <h3 class="font-bold text-[10px] uppercase tracking-widest truncate px-4 flex-1 text-center text-orange-100">${title}</h3>
                <a href="${absoluteUrl}" target="_blank" download class="p-2 bg-orange-700 rounded-lg hover:bg-orange-600 transition">
                    <i class="fa-solid fa-download text-sm"></i>
                </a>
            </div>
            
            <div class="flex-1 bg-gray-100 relative w-full overflow-hidden">
                <div id="pdfLoading" class="absolute inset-0 flex items-center justify-center bg-white z-0">
                    <div class="flex flex-col items-center gap-3">
                        <i class="fa-solid fa-dharmachakra fa-spin text-orange-500 text-3xl"></i>
                        <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Loading...</span>
                    </div>
                </div>
                
                <iframe 
                    src="${viewerUrl}" 
                    class="w-full h-full border-none relative z-50"
                    onload="document.getElementById('pdfLoading').style.display='none';"
                    style="height: 100%; width: 100%; border: none;">
                </iframe>
            </div>
        </div>
    `;
    
    area.scrollTop = 0;
}