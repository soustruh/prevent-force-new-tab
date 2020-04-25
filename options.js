function hideStatus() {
    document.querySelector("#saved").style.display = "none"
    document.querySelector("#save").disabled = false
}


function saveOptions(e) {
    e.preventDefault()
    e.stopPropagation()
    console.log("saving")
    try {
        chrome.storage.sync.set({
            prevent: document.querySelector("#prevent").value,
            force: document.querySelector("#force").value,
        });
        document.querySelector("#invalid").style.display = "none"
        document.querySelector("#saved").style.display = "inline"
        document.querySelector("#save").disabled = true
        setTimeout(hideStatus, 2500)
    } catch (err) {
        console.log("kurva")
        console.log(err)
        document.querySelector("#invalid").style.display = "inline"
    }
    return false
}


function restoreOptions() {
    console.log("restoring")
    chrome.storage.sync.get(null, (res) => {
        prevent = (typeof res.prevent === "undefined" ? "" : res.prevent)
        force = (typeof res.force === "undefined" ? "" : res.force)
        document.querySelector("#prevent").value = prevent
        document.querySelector("#force").value = force
    });
}


try {
    document.addEventListener("DOMContentLoaded", restoreOptions);
    document.querySelector("#save").addEventListener("click", saveOptions)
} catch(err) {
    console.log(err)
}