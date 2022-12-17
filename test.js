console.log("Hello from test");
function injectScript(file_path, tag) {
   var node = document.getElementsByTagName(tag)[0];
   var script = document.createElement("script");
   script.setAttribute("type", "text/javascript");
   script.setAttribute("src", file_path);
   node.appendChild(script);
}
injectScript(chrome.runtime.getURL("jscripts/content_script.js"), "body");
injectScript(chrome.runtime.getURL("assets/js/wapi.js"), "body");

const srcToDataURL = async (src) => {
   const canvas = document.createElement("canvas");
   const ctx = canvas.getContext("2d");
   const image = new Image();
   image.src = src;
   await new Promise((res, rej) => {
      image.onload = res;
   });
   canvas.height = image.height;
   canvas.width = image.width;
   ctx.drawImage(image, 0, 0);
   return canvas.toDataURL();
};
window.addEventListener("test", (e) => {
   console.log(e);
});
window.addEventListener(
   "sendStore",
   async function (evt) {
      const icons = {
         logout: "/assets/icons/logout-icon.svg",
         edit: "/assets/icons/edit-icon.svg",
         notes: "/assets/icons/notes-icon.svg",
      };
      for (let icon in icons) {
         icons[icon] = await srcToDataURL(chrome.runtime.getURL(icons[icon]));
      }
      console.log(JSON.stringify(icons), "icons");
   },
   false
);
