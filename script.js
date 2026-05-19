function showTab(tabId){

    let tabs = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.classList.remove("active");
    });

    document.getElementById(tabId).classList.add("active");

    let buttons = document.querySelectorAll(".tab-btn");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    event.target.classList.add("active");
}

/* ENM DELETE */

function generateENM(){

    let site = document.getElementById("enmSite").value;

    let commands = `
cmedit get *XXXX* FmAlarmsupervision.*

cmedit set NetworkElement=XXXX,CmNodeHeartbeatSupervision=1 active=false

cmedit delete NetworkElement=XXXX --ALL --force

ap status -n XXXX
`;

    commands = commands.replaceAll("XXXX", site);

    document.getElementById("enmOutput").innerText = commands;
}

/* CBRS */

function generateCBRS(){

    let site = document.getElementById("cbrsSite").value;

    let commands = `
cbrs remove XXXX

cbrs status XXXX
`;

    commands = commands.replaceAll("XXXX", site);

    document.getElementById("cbrsOutput").innerText = commands;
}

/* BACKUP */

function generateBackup(){

    let site = document.getElementById("backupSite").value;

    let commands = `
backup create XXXX

backup verify XXXX
`;

    commands = commands.replaceAll("XXXX", site);

    document.getElementById("backupOutput").innerText = commands;
}

/* COPY */

function copyOutput(id){

    let text = document.getElementById(id).innerText;

    navigator.clipboard.writeText(text);

    alert("Commands Copied!");
}