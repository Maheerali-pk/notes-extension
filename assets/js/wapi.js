// ----------------------------------------------------------------------------------------------------------------------------------------------------------
// Store and chat manipulation functions
// ----------------------------------------------------------------------------------------------------------------------------------------------------------
const loadStore = () => {
   window.Store ||
      (function () {
         function e(e) {
            let t = 0,
               n = [
                  {
                     id: "Store",
                     conditions: (e) => (e.default && e.default.Chat && e.default.Msg ? e.default : null),
                  },
               ];
            for (let o in e)
               if (
                  "object" == typeof e[o] &&
                  null !== e[o] &&
                  (n.forEach((n) => {
                     if (!n.conditions || n.foundedModule) return;
                     let i = n.conditions(e[o]);
                     if (null !== i) {
                        t++;
                        n.foundedModule = i;
                     }
                  }),
                  t == n.length)
               )
                  break;
            let o = n.find((e) => "Store" === e.id);
            return (
               (window.Store = o.foundedModule ? o.foundedModule : {}),
               n.splice(n.indexOf(o), 1),
               n.forEach((e) => {
                  e.foundedModule && (window.Store[e.id] = e.foundedModule);
               }),
               (window.Store.Chat.modelClass.prototype.sendMessage = function (e) {
                  window.Store.SendTextMsgToChat(this, ...arguments);
               }),
               window.Store
            );
         }
         if ("function" == typeof webpackJsonp)
            window.webpackJsonp(
               [],
               {
                  parasite: (t, n, o) => e(o),
               },
               ["parasite"]
            );
         else {
            let t = new Date().getTime();
            window.webpackChunkwhatsapp_web_client.push([
               ["parasite" + t],
               {},
               function (t, n, o) {
                  let i = [];
                  for (let e in t.m) {
                     let n = t(e);
                     i.push(n);
                  }
                  e(i);
               },
            ]);
         }
      })();
};
const showAllChats = () => {
   // All
   window.Store.Chat._models.forEach(function (e) {
      Object.defineProperty(e, "__x_shouldAppearInList", {
         get: function () {
            return !0;
         },
         set: function (e) {},
      });
   });
   window.Store.Chat._models[0].t = window.Store.Chat._models[0].t + 1;
};
const showAllUnreadChats = () => {
   // Unread
   window.Store.Chat._models.forEach(function (e) {
      !1 === e.__x_hasUnread
         ? Object.defineProperty(e, "__x_shouldAppearInList", {
              get: function () {
                 return !1;
              },
              set: function (e) {},
           })
         : Object.defineProperty(e, "__x_shouldAppearInList", {
              get: function () {
                 return !0;
              },
              set: function (e) {},
           });
   });
   window.Store.Chat._models[0].t = window.Store.Chat._models[0].t + 1;
};
const showAllGroupChats = () => {
   // Group
   window.Store.Chat._models.forEach(function (e) {
      !1 === e.__x_isGroup
         ? Object.defineProperty(e, "__x_shouldAppearInList", {
              get: function () {
                 return !1;
              },
              set: function (e) {},
           })
         : Object.defineProperty(e, "__x_shouldAppearInList", {
              get: function () {
                 return !0;
              },
              set: function (e) {},
           });
   });
   window.Store.Chat._models[0].t = window.Store.Chat._models[0].t + 1;
};
const getCurrentActiveChat = () => {
   // get current active chat
   for (let i of window.Store.Chat._models) {
      if (i.__x_active) return i.__x_id._serialized;
   }
};

loadStore();
