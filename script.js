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

function generateDelete(){

    let site = document.getElementById("deleteSite").value;

    let commands = `
cmedit get *XXXX* FmAlarmsupervision.* ; Inventorysupervision.* ; pmFunction.*;cmNodeHeartbeatsupervision.*; cmFunction.* -t

cmedit set NetworkElement=XXXX,CmNodeHeartbeatSupervision=1 active=false

cmedit set NetworkElement=XXXX,InventorySupervision=1 active=false

fmedit set XXXX FmAlarmSupervision alarmSupervisionState=false

cmedit set NetworkElement=XXXX,PmFunction=1 pmEnabled=false

cmedit action NetworkElement=XXXX,CmFunction=1 deleteNrmDataFromEnm

cmedit delete NetworkElement=XXXX --ALL --force

cmedit get NetworkElement=XXXX

ap order -nv file:XXXX.zip

ap status -n XXXX
`;

    commands = commands.replaceAll("XXXX", site);

    document.getElementById("deleteOutput").innerText = commands;
}

/* ENM ADD */

function generateAdd(){

    let site = document.getElementById("addSite").value;

    let ip = document.getElementById("ipAddress").value;

    let timezone = document.getElementById("timeZone").value;

    let commands = `
cmedit create NetworkElement=YYYY networkElementId=YYYY, neType=RadioNode, ossPrefix="SubNetwork=ONRM_ROOT_MO,SubNetwork=Bloomfield,MeContext=YYYY" -ns=OSS_NE_DEF -v=2.0.0

cmedit create NetworkElement=YYYY,ComConnectivityInformation=1 ComConnectivityInformationId=1, transportProtocol=TLS, ipAddress="IPADDRESS", port=6513, snmpSecurityName=defaultsnmpuser, snmpVersion=SNMP_V3, snmpSecurityLevel=NO_AUTH_NO_PRIV -ns=COM_MED -v=1.1.0

secadm credentials create -sn prbs -sp "@WtIwQ-Bo2m0" -n YYYY

cmedit set NetworkElement=YYYY timeZone=TIMEZONE

cmedit set NetworkElement=YYYY managementState=NORMAL

alarm enable YYYY

cmedit set NetworkElement=YYYY,SecurityFunction=1,NetworkElementSecurity=1 algorithmAndKeySize=RSA_2048, enrollmentMode=CMPv2_VC

cmedit set NetworkElement=YYYY,CmNodeHeartbeatSupervision=1 active=true

cmedit set NetworkElement=YYYY,InventorySupervision=1 active=true

fmedit set YYYY FmAlarmSupervision alarmSupervisionState=true

cmedit set NetworkElement=YYYY,PmFunction=1 pmEnabled=true
`;

    commands = commands.replaceAll("YYYY", site);

    commands = commands.replaceAll("IPADDRESS", ip);

    commands = commands.replaceAll("TIMEZONE", timezone);

    document.getElementById("addOutput").innerText = commands;
}

/* COPY */

function copyOutput(id){

    let text = document.getElementById(id).innerText;

    navigator.clipboard.writeText(text);

    alert("Commands Copied!");
}