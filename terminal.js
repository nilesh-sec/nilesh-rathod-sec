document.addEventListener('DOMContentLoaded', () => {
    const output = document.getElementById('output');
    const inputLine = document.getElementById('input-line');
    const commandInput = document.getElementById('command-input');
    const terminal = document.getElementById('terminal');
    let commandHistory = [];
    let historyIndex = -1;
    let isCommandRunning = false;
    terminal.addEventListener('click', () => commandInput.focus());
    document.addEventListener('contextmenu', event => event.preventDefault());
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const escapeHTML = (str) => str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[m]);
    async function type(message, speed = 2) {
        const p = document.createElement('p');
        p.innerHTML = message;
        output.appendChild(p);
        terminal.scrollTop = terminal.scrollHeight;
        await sleep(speed);
    }
    function showInput() { inputLine.classList.remove('hidden'); commandInput.focus(); }
    function hideInput() { inputLine.classList.add('hidden'); }
    
    const banner = `> Nilesh Rathod Portfolio [v13.0] :: Type 'help' to begin.`;

    const helpText = `
<span class="secondary">NileshTerm v13.0 - Command Manual</span>
-----------------------------------
<span class="notification">whoami</span>        Display professional summary.
<span class="notification">skills</span>        List technical skills.
<span class="notification">projects</span>      View project case files.
<span class="notification">certs</span>         Show verified certifications.
<span class="notification">contact</span>       Display contact information.
<span class="notification">gui</span>           Open the graphical portfolio.
<span class="notification">resume</span>        Download resume.
<span class="notification">clear</span>         Clear the screen.
`;
    async function showAboutMe() {
        await type(`
---[ Profile: Nilesh Rathod ]---
<b>STATUS:</b>   Certified Web Penetration Tester
<b>LOCATION:</b> Jalna, Maharashtra, India
<b>SUMMARY:</b>  A motivated professional with hands-on
           experience in web, network, and system
           pentesting. Proficient with tools like
           Burp Suite, Nmap, and Metasploit.
`);
    }
    async function showSkills() {
        await type(`
---[ Technical Skill Packages ]---
<b>PKG_WEB_SEC:</b>   OWASP Top 10, SQLi, XSS, IDOR
<b>PKG_NET_SYS:</b>   Nmap, Metasploit, Wireshark, PrivEsc
<b>PKG_TOOLS:</b>     Burp Suite, OWASP ZAP, Nessus, sqlmap
<b>PKG_MOBILE:</b>    APK Re-engineering, Aircrack-ng
`);
    }
    
    async function showCerts() {
        await type(`
---[ Verified Certifications ]---
> Certified Web Penetration Tester V3
  MRWEBSECURE, Mumbai (July 2025)

> Certified Cyber Security and Ethical Hacker
  MRWEBSECURE, Mumbai (March 2025)
`);
    }

    async function handleCommand(command) {
        isCommandRunning = true; hideInput();
        const p = document.createElement('p');
        p.innerHTML = `<span class="prompt">nilesh@offsec:~$</span> ${escapeHTML(command)}`;
        output.appendChild(p);
        if (command) commandHistory.unshift(command); historyIndex = -1;
        const parts = command.toLowerCase().split(' ');
        const cmd = parts[0];
        switch (cmd) {
            case 'help': await type(helpText); break;
            case 'whoami': await showAboutMe(); break;
            case 'skills': await showSkills(); break;
            case 'certs': await showCerts(); break;
            case 'projects': await type(`---[ Project Case Files ]---\n1. Web App Pentesting\n2. System Exploitation\n3. Android App Security\n4. Network Reconnaissance`); break;
            case 'contact': await type(`---[ Establish Comms ]---\nEmail:    <a href="mailto:nileshrathod052004@gmail.com">nileshrathod052004@gmail.com</a>\nLinkedIn: <a href="https://www.linkedin.com/in/nileshrathod-ccseh" target="_blank">linkedin.com/in/nileshrathod-ccseh</a>`); break;
            case 'gui': await type('<span class="status">Opening graphical interface in new tab...</span>'); window.open('index.html', '_blank'); break;
            case 'resume': await type('<span class="status">Downloading resume...</span>'); const link = document.createElement('a'); link.href = 'NILESH-RATHOD.pdf'; link.download = 'NILESH-RATHOD.pdf'; link.click(); break;
            case 'clear': output.innerHTML = ''; await type(banner); break;
            case '': break;
            default: await type(`<span class="error">Command not found: ${escapeHTML(command)}. Type 'help'.</span>`); break;
        }
        isCommandRunning = false; showInput();
    }
    
    commandInput.addEventListener('keydown', async (e) => {
        if (isCommandRunning) return;
        const key = e.key;
        if (key === 'Enter') { const command = commandInput.value.trim(); commandInput.value = ''; await handleCommand(command); } 
        else if (key === 'ArrowUp') { e.preventDefault(); if (historyIndex < commandHistory.length - 1) { historyIndex++; commandInput.value = commandHistory[historyIndex]; } } 
        else if (key === 'ArrowDown') { e.preventDefault(); if (historyIndex > 0) { historyIndex--; commandInput.value = commandHistory[historyIndex]; } else { historyIndex = -1; commandInput.value = ''; } }
    });
    async function init() {
        hideInput();
        await sleep(500);
        await type(banner);
        showInput();
    }
    
    init();
});