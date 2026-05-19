function generateCommands(){

    let site = document.getElementById("siteId").value;

    let commands = `
cmedit get *XXXX* FmAlarmsupervision.* ; Inventorysupervision.* ; pmFunction.*;cmNodeHeartbeatsupervision.*; cmFunction.* -t

cmedit set NetworkElement=XXXX,CmNodeHeartbeatSupervision=1 active=false

cmedit set NetworkElement=XXXX,InventorySupervision=1 active=false

fmedit set XXXX FmAlarmSupervision alarmSupervisionState=false

cmedit set NetworkElement=XXXX,PmFunction=1 pmEnabled=false

cmedit action NetworkElement=XXXX,CmFunction=1 deleteNrmDataFromEnm

cmedit delete NetworkElement=XXXX –ALL --force

cmedit get NetworkElement=XXXX

ap order -nv file:XXXX.zip

ap status -n XXXX
`;

    commands = commands.replaceAll("XXXX", site);

    document.getElementById("output").innerText = commands;
}

function copyCommands(){

    let text = document.getElementById("output").innerText;

    navigator.clipboard.writeText(text);

    alert("Commands Copied!");
}

function downloadTxt(){

    let text = document.getElementById("output").innerText;

    let blob = new Blob([text], {type:"text/plain"});

    let a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "ENM_Delete_Commands.txt";

    a.click();
}