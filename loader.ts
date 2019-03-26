const cdnUrl = "https://secure-agastya-cdn.oswaldlabs.com";
const request = new XMLHttpRequest();
request.onreadystatechange = () => {
  if (4 === request.readyState) {
    const data = JSON.parse(request.responseText);
    const scriptUrl: string = `${data["plugin-url"] || cdnUrl}/agastya.${
      data.cacheKey
    }.js`;
    const script = document.createElement("script");
    script.id = "agastyascript";
    script.setAttribute("data-cacheKey", data.cacheKey);
    script.setAttribute("data-baseUrl", cdnUrl);
    script.setAttribute("data-app-url", data["app-url"]);
    script.setAttribute("data-plugin-url", data["plugin-url"]);
    script.setAttribute("src", scriptUrl);
    (
      document.getElementsByTagName("head")[0] ||
      document.head ||
      document.body ||
      document.documentElement
    ).appendChild(script);
  }
};
request.open("GET", `${cdnUrl}/meta.json`, true);
request.setRequestHeader(
  "cache-control",
  "no-cache,must-revalidate,post-check=0,pre-check=0,max-age=0"
);
request.send();
