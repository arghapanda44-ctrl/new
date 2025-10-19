const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

// Sidebar elements //
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');


const hoverSign = document.querySelector('.hover-sign');

// filter out any missing video elements
const videoList = [video1, video2, video3].filter(Boolean);

videoList.forEach(function(video){
    video.addEventListener("mouseover", function(){
        if (typeof video.play === 'function') video.play();
        if(hoverSign) hoverSign.classList.add("active");
    });
    video.addEventListener("mouseout", function(){
        if (typeof video.pause === 'function') video.pause();
        if(hoverSign) hoverSign.classList.remove("active");
    });
});

// Sidebar elements: guard existence
if(menu){
    menu.addEventListener("click", function(){
        if(!sideBar) return;
        sideBar.classList.remove("close-sidebar");
        sideBar.classList.add("open-sidebar");
    });
}
if(closeIcon){
    closeIcon.addEventListener("click", function(){
        if(!sideBar) return;
        sideBar.classList.remove("open-sidebar");
        sideBar.classList.add("close-sidebar");
    });
}

// New: make "about", "skill", "project", "contact me" buttons/links work.
// - Supports elements with IDs: #aboutBtn, #skillsBtn, #projectsBtn, #contactBtn
// - Supports elements with data-target="#sectionId"
// - Supports anchor links href="#sectionId"
// - Smooth scrolls and closes the sidebar if it is open
(function(){
    function closeSidebarIfOpen(){
        if(sideBar && sideBar.classList.contains('open-sidebar')){
            sideBar.classList.remove('open-sidebar');
            sideBar.classList.add('close-sidebar');
        }
    }

    function scrollToTarget(targetId){
        if(!targetId) return;
        const id = targetId.replace(/^#/, '');
        const el = document.getElementById(id);
        if(!el){
            console.warn('Target not found for', targetId);
            return;
        }
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeSidebarIfOpen();
    }

    // Common explicit button IDs (if present in your HTML)
    const navMap = [
        { btn: document.getElementById('aboutBtn'), target: '#about' },
        { btn: document.getElementById('skillsBtn'), target: '#skills' },
        { btn: document.getElementById('projectsBtn'), target: '#projects' },
        { btn: document.getElementById('contactBtn'), target: '#contact' }
    ];
    navMap.forEach(item => {
        if(item.btn){
            item.btn.addEventListener('click', function(e){
                e.preventDefault();
                scrollToTarget(item.target);
            });
        }
    });

    // Any element with data-target="#someId"
    document.querySelectorAll('[data-target]').forEach(function(el){
        el.addEventListener('click', function(e){
            e.preventDefault();
            scrollToTarget(el.getAttribute('data-target'));
        });
    });

    // Anchor links like <a href="#about">About</a>
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
        a.addEventListener('click', function(e){
            const href = a.getAttribute('href');
            if(href && href.length > 1){
                e.preventDefault();
                scrollToTarget(href);
            }
        });
    });
})();

// New: make project "Website" buttons open dummy links in a new tab.
// - Selects buttons inside .project-card .project-info
// - Opens data-url if present, otherwise opens https://example.com/project-N
(function(){
    const projectButtons = document.querySelectorAll('.project-card .project-info button');
    projectButtons.forEach((btn, idx) => {
        btn.addEventListener('click', function(e){
            // allow HTML override: <button data-url="https://...">Website</button>
            const url = btn.getAttribute('data-url') || `https://example.com/project-${idx + 1}`;
            window.open(url, '_blank', 'noopener');
        });
    });
})();

// New: Send Message (mailto) handler
(function(){
    const sendBtn = document.getElementById('sendMessageBtn');
    if(!sendBtn) return;

    sendBtn.addEventListener('click', function(){
        const nameEl = document.getElementById('contactName');
        const emailEl = document.getElementById('contactEmail');
        const msgEl = document.getElementById('contactMessage');

        const name = nameEl ? nameEl.value.trim() : '';
        const email = emailEl ? emailEl.value.trim() : '';
        const message = msgEl ? msgEl.value.trim() : '';

        if(!name){
            if(nameEl) nameEl.focus();
            alert('Please enter your name.');
            return;
        }
        if(!email){
            if(emailEl) emailEl.focus();
            alert('Please enter your email.');
            return;
        }

        const subject = encodeURIComponent(`Message from ${name} via portfolio`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        // Replace with your real recipient email address:
        const recipient = 'arghapanda19@gmail.com'; // <-- change this to you@yourdomain.com
        const mailto = `mailto:${recipient}?subject=${subject}&body=${body}`;

        // open mail client
        window.location.href = mailto;
    });
})();