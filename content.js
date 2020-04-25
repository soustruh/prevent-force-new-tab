var prevent = ""
var force = ""
var preventHosts = []
var forceHosts = []

function addTargetBlank() {
    console.log(`🎯 Prevent/force new tab: Adding target=_blank to ${document.links.length} links on this page`)
    for (var i = 0; i < document.links.length; i++) {
        document.links[i].target = "_blank"
        document.links[i].setAttribute("rel", "noopener noreferrer")
    }
    console.log(`🎯 Prevent/force new tab: Done`)
}

function removeTarget() {
    console.log(`🎯 Prevent/force new tab: Removing target from ${document.links.length} links on this page`)
    for (var i = 0; i < document.links.length; i++) {
        document.links[i].removeAttribute("target")
    }
    console.log(`🎯 Prevent/force new tab: Done`)
}

/* LOAD SETTINGS */
chrome.storage.sync.get(null, (res) => {
    prevent = (typeof res.prevent === "undefined" ? "" : res.prevent)
    force = (typeof res.force === "undefined" ? "" : res.force)

    var preventArr = prevent.split("\n")
    var forceArr = force.split("\n")

    for (var i = 0; i < preventArr.length; i++) {
        if (preventArr[i].length > 0) {
            preventHosts.push(preventArr[i])
        }
    }
    for (var i = 0; i < forceArr.length; i++) {
        if (forceArr[i].length > 0) {
            forceHosts.push(forceArr[i])
        }
    }

    document.addEventListener("DOMContentLoaded", function(event) {
        if (preventHosts.indexOf(location.host) > -1) {
            removeTarget()
        }
        if (forceHosts.indexOf(location.host) > -1) {
            addTargetBlank()
        }
    });
});