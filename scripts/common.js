async function loadTemplate(template, targetElementId, scriptPath = null) {
    try {
        const response = await fetch(`../templates/${template}`);
        const html = await response.text();
        document.getElementById(targetElementId).innerHTML = html;

        if (scriptPath) {
            const scriptElement = document.createElement("script");
            scriptElement.src = scriptPath;
            scriptElement.defer = true;
            document.body.appendChild(scriptElement);
        }
    } catch (error) {
        console.error(`Error loading template ${template}:`, error);
    }
}

async function loadCommonTemplates() {
    await loadTemplate('header/header.html', 'header', '../templates/header/header.js');
    await loadTemplate('footer/footer.html', 'footer');
}

loadCommonTemplates();
