/* --- PDF VIEWER ENGINE --- */
window.pdfViewerActive = false;

function openPDFViewer(pdfUrl, title) {
    if (!pdfUrl || pdfUrl === "#") {
        alert("This PDF is coming soon!");
        return;
    }

    window.pdfViewerActive = true;
    const area = document.getElementById('contentArea');
    const topNav = document.getElementById('topNav');
    
    // Hide top navigation while reading
    if(topNav) topNav.style.display = "none";

    // 1. Create Absolute URL for the Proxy
    // GitHub Pages needs the full path to "see" the file
    let absoluteUrl = pdfUrl;
    if (!pdfUrl.startsWith('http')) {
        const loc = window.location;
        const root = loc.protocol + "//" + loc.host + loc.pathname.replace('index.html', '');
        absoluteUrl = root + pdfUrl;
    }

    // 2. Use Google's PDF-to-HTML Proxy URL
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=true`;

    // 3. Render the Viewer Frame
    area.innerHTML = `
        <div class="flex flex-col h-full animate-fade-in bg-white overflow-hidden" style="height: 100%;">
            <div class="flex items-center justify-between p-3 bg-orange-800 text-blue z-10 shadow-md shrink-0">
                <button onclick="closePDFViewer()" class="flex items-center gap-2 bg-blue/20 hover:bg-blue/30 px-3 py-1.5 rounded-lg transition-all text-[10px] font-bold">
                    <i class="fa-solid fa-arrow-left"></i>
                    <span>BACK</span>
                </button>
                <h3 class="font-bold text-[10px] uppercase tracking-widest truncate px-2 flex-1 text-center">${title}</h3>
                <a href="${absoluteUrl}" target="_blank" download class="p-2 bg-orange-700 rounded-lg hover:bg-orange-600 transition">
                    <i class="fa-solid fa-download text-sm"></i>
                </a>
            </div>
            
            <div class="flex-grow bg-gray-100 relative w-full h-full">
                <div id="pdfLoading" class="absolute inset-0 flex items-center justify-center bg-white z-0">
                    <div class="flex flex-col items-center gap-3">
                        <i class="fa-solid fa-dharmachakra fa-spin text-orange-500 text-3xl"></i>
                        <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Loading Sacred Text...</span>
                    </div>
                </div>
                
                <iframe 
                    src="${viewerUrl}" 
                    class="absolute inset-0 w-full h-full border-none z-10"
                    onload="document.getElementById('pdfLoading').style.display='none';"
                    style="width: 100%; height: 100%; min-height: 60vh;">
                </iframe>
            </div>
        </div>
    `;
    
    area.scrollTop = 0;
}

function closePDFViewer() {
    window.pdfViewerActive = false;
    // Restore the Top Nav if the tab requires it
    const noNavTabs = ["contact", "bhajana", "about", "library"];
    if (!noNavTabs.includes(window.activeTab)) {
        const topNav = document.getElementById('topNav');
        if(topNav) topNav.style.display = "flex";
    }
    render(); // Return to the previous list view
}