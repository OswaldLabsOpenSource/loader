const cdnUrl = "https://secure-agastya-cdn.oswaldlabs.com";
const request = new XMLHttpRequest();
request.onreadystatechange = () => {
  if (4 === request.readyState) {
    const data = JSON.parse(request.responseText);
    const scriptUrl: string = `/agastya.${data.cacheKey}.js`;
    const script = document.createElement("script");
    script.setAttribute("data-cacheKey", data.cacheKey);
    script.setAttribute("data-baseUrl", cdnUrl);
    script.setAttribute("src", scriptUrl);
    (
      document.getElementsByTagName("head")[0] ||
      document.head ||
      document.body ||
      document.documentElement
    ).appendChild(script);
  }
};
request.open("GET", `${cdnUrl}/meta.json`, false);
request.send();
