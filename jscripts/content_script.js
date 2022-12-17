"use strict";
const qs = (str) => document.querySelector(str);
const qsa = (str) => document.querySelectorAll(str);
let store;
const icons = {
    logout: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAAXNSR0IArs4c6QAADFtJREFUeF7tnW2oHOUVx/9ntrbVpkVLTW2pkpi0SJD4QrWCDSrRqIiIFosvIahw7+7d2bnJjQT6QegNfuiHqvXuvJtKkKBiAtYGG7ENWCIVL/GDTQpSfK2xVqtCwEBLujunzKY3TW7uvXt353l2n2c8+3me//mf//ntzOzOzC5BXpKAhgRIg6ZISgIQsAQCLQkIWFpiFVEBSxjQkoCApSVWERWwhAEtCQhYWmIVUQFLGNCSgFaw4jheCmDp0TZ9mwhLCViaZXyWqk7IwacMesvJ6L0lS7783r333vtvVdqiUywBpWBF0bbVbW6vA+g6gNcVs9bz6kMAHvbc2lTPK2WB8gQKg9VsJquoglEG1hJwoXKHvQvu89zaVb0vkxUqE+gbrDRNzzjayu4HnM0An6nSVFEtAt5puLUVRXVkff8J9AVWM0w2EGEzGBf1X1rzSsKYV68lmquI/DwJ9ARWGIbnZKiEAG6zIdEMzpUb3dFXbPBaNo+LBqsZRVcQO9sBXGBLCARKG261ZovfMvlcFFh+lKwHY4dtjTN4/7g7drltvsvgtytYfpg8D+AmS5ttffbJR6dPTk62LPVvre0FwfLDJN9Lrbe2u9x4hss8r/aa1T1YaH5esIIoeZAZD1jY00mWuV05d3x85APb+7DN/5xg+X50FxznSduamcPvIc+tnVeCPqxr4RSwoiha3WZ6EaBzrOtmtmHm3V5j7Bbr+7CwgVPAaobx4wS6z8JeTrGcZbx1ozc2WYZebOvhJLCaUbSG2NlnWxPz+N3juTVbP81aP4KTwPKj9Gkw32F9VwC4TSvHx6tvl6EXG3s4DtZUmNzgAC/Y2MRsz3IIHP4Uj4MVhMluBm4evqVCDg62mUY2NarThVRkceEEOmDFcbysldG7hdWGIUD4BxivZhkfkBP1YQxg7podsIIoHWXmVIstor3EeL+dZYfIwZuU4e+q6jA7h8p0HtWMHrsWWfv7DjkrGHx+fqoI8FvEznuZg/fH69XfqcpOt04HLD+M9wB0o+pixNk9jUb9CdW6ZdQLonQTM/9qod6IaEfrNGfLppGRj03PgPIHHloZqTY67aB9reu6R0wPwAR/vZzfMvgAkG0Zd93fm+B9Pg8UBOkYE0cqTXpuretdEyrr2azlh+k/AT675x6IfurVq7t6XjegBeSHyaMANiqst8Vzaw8p1CutVBCmCYOrfTdoMFw5WE8BuLPv5k5YmJ8DNOrVDSq0yq7RDNN1BH6xcJ+GwkVBmOzNH90q3GAuQHS3V6/moMqrSwJ+mMQA1Nw2bSBc1AyTg6qeB3RQWeW6I28IVd0T8INkGgR1t00bBld+KMw/EeaPwhd9HfbcmrLH54uaMXl9GIZLMlQ+V+7RILhysFhJg4Q/evXaNUq0Si7i+/HVcOglLW0aApeApWW6C4tq22PNlDUALgFrCGDlJZWfY83uY8hwCVjDAkvlp8L5ehgiXALWkMAKgmQtE/ZqLz8kuAQs7ZOdv4Afpo8APKHdwhDgErC0T3X+AsduAHBeBvgH2m0MGC4BS/tEFy7gR+ntYN45EBsDhEvAGshEv3hwCVgGgNX5+qFkey4ByxCwygaXgGUQWGWCS8AyDKyywCVgGQhWGeASsAwFy3a4BCyDwbIZLgHLcLBshUvAsgAsG+ESsCwByza4BCyLwLIJLgHLMrBsgUvAshAsG+ASsCwFy3S4BCyLwTIZLgHLcrBMhUvAKgFYJsIlYJUELNPgErBKBJZJcJUWrO3bt3/1yJGjy4DM/v8E6hX+inP2sB/QKBVYzWa6gir8S6DzJ+j5rw7LaxAJzPH0T2nACoL4ViZ6dhA5So05EpgFVynA8sN0D8DKf05cAOoxAcpu9er15/JV1oPlR4kHRrPHCGRzPQm83jr6r2smJiYOWw1WGP56Zcat/SCcqScnUe01ASI82qjXJqwGyw/jXwD0s16bl+31JuCArrcbrCB+EkR36Y1J1HtPgB+wG6wweRXAj3pvXFboTICB31oNVjNIPiPCN3WGJNr9JMAfClj95CZruiRgOVi+HAqNRNz6Q6EvJ+9GggVYf/IuXzeYSJb1XzfIF6QmYoVtnlsbtfrkPY9VLumYBBd/2CJeM1Gvv2M9WB245CK0GXQRxr16zS/FReiZROW2meGylWW8daM3NjnjohR7rJlm/n+jH/24r/9ZHu5srK0+G6pS7bFmT2Uqji90mC7O2rzS2okVMO5U6HYwVhWQWNTSuaAqNViLSqWEG3XeUBnl/25/ge725oNKwNKd/ID1oyha3ebKrkH8hcpCUAlYAx68znJh+NjFGTiHSvuhvxtUApbOSQ9QOwjSS0G8iwfwZNJioBKwBjh8XaX8JPkhtZFDtUxXjRndxUIlYOmehGb9ZhxfTky7wDhPcyn0ApWApXsaGvWjaNsVbW7nn/6+p7FMR7pXqAQs3RPRpO/78ZVwnJ0Af1dTieOy/UAlYOmeigb9ZjNaQ5UcKmj/TYp+oRKwNAxep2Qziq4i7kC1VGedfg9/J3oq1bVC3WEPU38qTK8h8E4CvqXbR5E91Yw3AUv3lBToB0GyNgN2DuKJJBVQyaFQwdB1SwRBch0DOwfxMwKqoBKwdFNRUN+P4+uRYSdA3ygo1XW5SqgErK5xD28DP3rsRgI/w8xf1+1CNVQClu6J9anfjNKbiPEMwF/rU2LRy3RAJWAtOv7BbdgMk5sJOVQ4XXdVXVAJWLon16P+VJDc4lAHqq/0uLTnzXVCJWD1PA59C/73MEgO1Wn6qhxT1g2VgKV7govU9/34J3Aoh6qyyCV9bzYIqASsvsejbqHvR7fDcXKoSJ3q3EqDgkrA0j3JLvpxHC9tZc7LJtyjrjoKuaSjOtEe9PwwfQTgiR6W9LXpIPdUMwYFrL5GVXxRfv2PCXuLKy2sMAyo5FCoe6oL6PthEgOo6bQwLKgELJ1T7aLtB8k0CJfrsjBMqAQsXVPtohuG4ZIMlc91lR82VAKWrsl221v58dVw6CUd5U2AagasjxXd6nrYc2tn6QirbJq69limQNUBqxkmBwm4UMXwHFRWue7IGyq0yq6h+hzLJKg6YAVhspeBtUoGSXS3V68+pUSr5CIqPxWaBtXMoTAH4U4VcySiHY16dYMKrbJr5DfygbM9Rfs0EaoZsB4FsLFogyes3+K5tYcU6pVWyg+TQm9qU6E6digM0jEmjlROz3Nr2i+oqvQ7TC0/TLif+iZD1QHr2IVQyj8ZqnxNO2hf67ruEZWiZdRqNpOLUMHeHp4XPMycbR1v1PMjjbGvzp7FD+M9ACn/T2Xi7J5Go/6Esd0bZGzKjycdh37exdJzDtpbXdd93SDrc1rpgBVE6Sgzp5rM/gGgvzCyAxVk067rytcR8wTdDNN1DvElGeNSAi6hY4/S/6md8f4K4c+NxthvNM1IuWwHrDiOl7Uyele5umZBInzKwF+J8WY747+d+DvjmkuLfJcEjp9kB2Gym4GbLU/sYJtpZFOjOm15H9bbPw7WVJjc4AAvWN9RpwGa9Nzq1nL0YmcXJ30t4Efp02C+w85WTnbNbVo5Pl59uwy92NjDSWA1o2gNsbPPxkbm8LzHc2s3laQX69o45YvMZhg/TqD7rOtkDsOmf4lYhozn6+EUsI79uwG9CJD2nyLUHizzbq8xdov2OlLglATmvPTi+9FdcJwnS5DXIc+taf+p6hLkpLyFea/pBVHyIDMeUF5xwILcrpw7Pj7ywYDLfuHLLXix2A+THQDWW51Shss8r/aa1T1YaL7rXQh+mDwPwNZPV63PPvno9MnJyZaFs7Haclew8u78KFkPRr73surF4P3j7pi2R6ysCmPAZhcFVu6pGUVXEDvbB/EHi6oyIFDacKtaHwpV5bVsOosGK288DMNzMlRCALfZEEQG58qN7ugrNngtm8eewJppvhkmG4iwGYyLjA2EMObVa4mx/kpurC+w8kzSND3jaCu7H3A2A3ymSTkR8E7Dra0wydMXzUvfYB3fezWTVVTBaP4ImarnEwsOYZ/n1q4qqCHLCyZQGKwT60fRttVtbq8D6DqA1xX01uvyQwAe9tzaVK8LZXv1CSgFa7Y939+2PKP2+RVky+HQcmZaDsJ3VLXB4EMEeiVj58CX8J8D8vCGqmSL62gFq7g9UbA1AQHL1skZ7lvAMnxAttoTsGydnOG+BSzDB2SrPQHL1skZ7lvAMnxAttoTsGydnOG+BSzDB2Srvf8CqS0anUoBNHwAAAAASUVORK5CYII=",
    edit: "data:image/png;base64,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",
    notes: "data:image/png;base64,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",
};
// type ElementNames = "notesHeader" | "notesBody" | "notesFooter" | "notesInput" | "editNoteInput" | "navbar" | "navbarRight" | "navbarLeft" | ""
// let allChats: HTMLElement[];
const allElements = {};
const ce = ({ props, tag, children, name }, elementsObj) => {
    const elm = document.createElement(tag);
    Object.entries(props).forEach(([k, v]) => {
        if (k === "style") {
            Object.entries(v).forEach(([k, v]) => {
                elm.style[k] = v;
            });
        }
        else {
            elm[k] = v;
        }
    });
    if (children) {
        children.forEach((x) => {
            if (x) {
                const child = ce(x, elementsObj);
                elm.appendChild(child);
            }
        });
    }
    if (name && elementsObj) {
        elementsObj[name] = elm;
    }
    return elm;
};
const waitForElement = async (selector) => {
    while (document.querySelector(selector) === null) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
};
const getSelectedName = () => {
    return qs("._3m_Xw > div[aria-selected=true] ._3vPI2 > .zoWT4")?.innerHTML;
};
const waitForStore = async () => {
    //@ts-ignore
    while (!window.Store) {
        await new Promise((res, rej) => setTimeout(res, 100));
    }
};
window.addEventListener("load", async () => {
    //@ts-ignore
    const mainWrapper = await waitForElement(".app-wrapper-web ._1XkO3.two");
    await waitForStore();
    console.log("Hello from content script");
    //@ts-ignore
    store = window.Store;
    //@ts-ignore
    const event = new CustomEvent("sendStore", { message: window.Store });
    window.dispatchEvent(event);
    if (!mainWrapper)
        return;
    // allChats = [...qsa("._3m_Xw")];
    const pageWrapper = qs(".app-wrapper-web");
    const notesWrapper = createNotesWrapper();
    const navbar = createNavbar();
    const loginForm = createLoginForm();
    pageWrapper.appendChild(navbar);
    pageWrapper.appendChild(loginForm);
    // const loginBtn = ce({})
    const pane = qs("#pane-side");
    // pane.addEventListener(
    //    "scroll",
    //    (e) => {
    //       e.stopImmediatePropagation();
    //    },
    //    true
    // );
    const chatList = qs("._3uIPm.WYyr1");
    chatList.addEventListener("click", () => {
        const selectedName = getSelectedName();
        const header = qs(".ext-notes-header");
        const notesWrapper = qs(".ext-notes-wrapper");
        if (selectedName) {
            header.innerHTML = selectedName;
            notesWrapper.classList.remove("disabled");
        }
        else {
            notesWrapper.classList.add("disabled");
        }
    });
    mainWrapper.appendChild(notesWrapper);
});
// ----------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                 Login Form
// ----------------------------------------------------------------------------------------------------------------------------------------------------------
const createLoginForm = () => {
    const loginForm = ce({
        tag: "div",
        props: { className: "ext-login-form" },
        children: [
            { tag: "div", props: { className: "form-header", innerHTML: "Login to write notes" } },
            {
                tag: "div",
                props: { className: "form-body" },
                children: [
                    { tag: "input", props: { placeholder: "Enter the email" } },
                    { tag: "input", props: { placeholder: "Enter the password", type: "password" } },
                    { tag: "button", props: { innerHTML: "Submit", onclick: () => (loginForm.style.display = "none") } },
                ],
            },
        ],
    });
    return loginForm;
};
const filterChatList = () => {
    const activeTab = qs(".ext-tab.active");
    if (activeTab) {
        const tabName = activeTab.name;
        if (tabName === "all") {
            store.Chat.models.forEach((x) => {
                x.__x_shouldAppearInList = true;
            });
        }
        if (tabName === "unread") {
            store.Chat.models.forEach((x) => {
                if (x.hasUnread) {
                    x.__x_shouldAppearInList = true;
                }
                else {
                    x.__x_shouldAppearInList = false;
                }
            });
        }
        store.Chat.models.forEach((x) => {
            x.__x_active = false;
        });
        store.Chat.models[0].t++;
    }
};
const createNavbar = () => {
    const navbar = ce({
        tag: "div",
        props: { className: "ext-navbar" },
        children: [
            {
                tag: "div",
                props: { className: "navbar-left" },
                children: [
                    { tag: "div", props: { className: "ext-tab active", innerHTML: "All", name: "all" } },
                    { tag: "div", props: { className: "ext-tab", innerHTML: "Unread", name: "unread" } },
                ],
            },
            {
                tag: "div",
                props: { className: "navbar-right" },
                children: [
                    {
                        tag: "div",
                        props: {
                            onclick: () => {
                                qs(".ext-notes-wrapper").classList.toggle("open");
                                qs(".ext-add-input").focus();
                            },
                            className: "notes-btn navbar-btn",
                        },
                        children: [
                            {
                                tag: "img",
                                props: { src: icons.notes },
                            },
                        ],
                    },
                    {
                        tag: "div",
                        props: {
                            className: "notes-btn navbar-btn",
                        },
                        children: [{ tag: "img", props: { src: icons.logout } }],
                    },
                ],
            },
        ],
    });
    const tabs = navbar.querySelectorAll(".ext-tab");
    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const activeTab = qs(".ext-tab.active");
            activeTab.classList.remove("active");
            tab.classList.add("active");
            filterChatList();
        });
    });
    return navbar;
};
// ----------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                 Create the container of notes
// ----------------------------------------------------------------------------------------------------------------------------------------------------------
const createNotesWrapper = () => {
    const onSaveNote = () => {
        const notesInput = qs(".ext-add-input");
        const note = createNote({ date: new Date(), text: notesInput.value });
        const body = qs(".ext-notes-body");
        body.appendChild(note);
        notesInput.value = "";
        notesInput.focus();
        qs(".ext-add-btn").disabled = true;
    };
    const notesWrapper = ce({
        tag: "div",
        props: { className: "ext-notes-wrapper disabled" },
        children: [
            { tag: "div", props: { className: "ext-select-a-chat show", innerHTML: "Please select a chat" } },
            { tag: "div", props: { className: "ext-notes-header" } },
            {
                tag: "div",
                props: { className: "ext-notes-body" },
            },
            {
                tag: "div",
                props: { className: "ext-notes-footer" },
                children: [
                    {
                        tag: "textarea",
                        props: {
                            oninput: (e) => {
                                const target = e.target;
                                const btn = qs(".ext-add-btn");
                                if (target.value.trim()) {
                                    btn.disabled = false;
                                }
                                else {
                                    btn.disabled = true;
                                }
                            },
                            onkeyup: (e) => {
                                if (e.key === "Enter") {
                                    onSaveNote();
                                }
                            },
                            value: "",
                            className: "ext-add-input",
                            placeholder: "Enter the note here",
                            rows: 5,
                        },
                    },
                    {
                        tag: "button",
                        props: {
                            onclick: onSaveNote,
                            className: "ext-add-btn",
                            innerHTML: "Save",
                            disabled: true,
                        },
                    },
                ],
            },
        ],
    });
    return notesWrapper;
};
// ----------------------------------------------------------------------------------------------------------------------------------------------------------
//                                                                         Create Note
// ----------------------------------------------------------------------------------------------------------------------------------------------------------
const createNote = ({ date, text }) => {
    const save = () => {
        const noteText = wrapper.querySelector(".note-text");
        const textarea = wrapper.querySelector("textarea");
        noteText.innerHTML = textarea.value;
        wrapper.classList.remove("editing");
    };
    const wrapper = ce({
        tag: "div",
        props: { className: "ext-note" },
        children: [
            {
                tag: "textarea",
                props: {
                    value: text,
                    rows: 5,
                    onblur: () => { },
                },
            },
            {
                tag: "div",
                props: { className: "btn-wrapper" },
                children: [
                    {
                        tag: "button",
                        props: {
                            innerHTML: "Cancel",
                            onclick: () => {
                                wrapper.classList.remove("editing");
                            },
                        },
                    },
                    { tag: "button", props: { innerHTML: "Save", onclick: save } },
                ],
            },
            {
                tag: "div",
                props: { className: "top-area" },
                children: [
                    { tag: "div", props: { className: "note-text", value: text, innerHTML: text, disabled: true } },
                    {
                        tag: "div",
                        props: { className: "note-toolbar" },
                        children: [
                            {
                                tag: "button",
                                props: {
                                    className: "note-detele-btn",
                                    onclick: (e) => {
                                        const wantToDeleteNote = confirm("Are you sure you want to delete the node");
                                        if (wantToDeleteNote)
                                            wrapper.remove();
                                    },
                                    innerHTML: "X",
                                },
                            },
                            {
                                tag: "img",
                                props: {
                                    src: icons.edit,
                                    className: "note-edit-btn",
                                    onclick: () => {
                                        wrapper.classList.add("editing");
                                        const textarea = wrapper.querySelector("textarea");
                                        const textElm = wrapper.querySelector(".note-text");
                                        textarea?.focus();
                                        textarea.value = textElm.innerHTML;
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
            {
                tag: "div",
                props: { className: "note-date", innerHTML: `${date.toDateString()} ${date.toTimeString().split(" ")[0]}` },
            },
        ],
    });
    return wrapper;
};
window.addEventListener("Hello", (e) => {
    console.log("Fromm Hello", e);
});
