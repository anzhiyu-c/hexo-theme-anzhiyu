(async function() {
    async function getIpInfo() {
        var fetchUrl = "https://api.qjqq.cn/api/Local";
        try {
            var response = await fetch(fetchUrl);
            var json = await response.json();
            var ip = json.ip;
            var country = json.data.country;
            var prov = json.data.prov;
            var city = json.data.city;
            var isp = json.data.isp;
            if(document.getElementById("userAgentIp")){
                document.getElementById("userAgentIp").innerHTML = ip;
            }
            if(document.getElementById("userAgentCountry")) {
                document.getElementById("userAgentCountry").innerHTML = country;
            }
            if(document.getElementById("userAgentProv")) {
                document.getElementById("userAgentProv").innerHTML = prov;
            }
            if(document.getElementById("userAgentCity")) {
                document.getElementById("userAgentCity").innerHTML = city;
            }
            if(document.getElementById("userAgentISP")) {
                document.getElementById("userAgentISP").innerHTML = isp;
            }

            var uaInfo = navigator.userAgent;
            if(document.getElementById("userAgentDevice")) {
                document.getElementById("userAgentDevice").innerHTML = uaInfo;
            }
        } catch (error) {
            console.error("An error occurred while fetching IP info:", error);
        }
    }

    await getIpInfo();
})();