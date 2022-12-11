// Error Messages
const invalidFileSize = 'The following files are too big: ';
const invalidTotalSize = 'The total size is too big.';
const invalidFileType = 'The following files are not the correct type: ';

const sizeUnitElements = document.getElementsByClassName("size-unit");

function checkStorage() {
    for (let i = 0; i < sizeUnitElements.length; i++) {
        sizeUnitElements[i].innerHTML = "MB";
    }
    document.getElementById("max-size").innerHTML = "100";
    document.getElementById("min-size").innerHTML = "0";

    if (!window.sessionStorage.getItem("Used")) {
        clearStorage();
    }
    else {
        updateValues();
    }
}

function updateValues() {
    let _memoryUsed = window.sessionStorage.getItem("Used");
    let _memoryLeft = window.sessionStorage.getItem("Left");
    let progressbar = window.sessionStorage.getItem("Progressbar");
    document.getElementById("memory_left").innerHTML = _memoryLeft;
    document.getElementById("memory_used").innerHTML = _memoryUsed;
    const change_element = document.querySelector('.progress-bar')
    change_element.style.width = progressbar + "%";

}

function clearStorage(){
    sessionStorage.clear();
    window.sessionStorage.setItem("Left", "10");
    window.sessionStorage.setItem("Used", "0");
    window.sessionStorage.setItem("Progressbar", "0");
    const change_element = document.querySelector('.progress-bar')

    document.getElementById("memory_left").innerHTML = window.sessionStorage.getItem("Left");
    document.getElementById("memory_used").innerHTML = window.sessionStorage.getItem("Used");
    change_element.style.width = window.sessionStorage.getItem("Progressbar") + "%";
}

function progressBarUpdate(fileSize) {
    let _memoryLeft = window.sessionStorage.getItem("Left");
    let _memoryUsed = window.sessionStorage.getItem("Used");
    let progressbar = window.sessionStorage.getItem("Progressbar");
    let progress = window.sessionStorage.getItem("Progress");
    const change_element = document.querySelector('.progress-bar')

    _memoryLeft = (Number(_memoryLeft) - Number(fileSize)).toFixed(2);
    _memoryUsed = (Number(_memoryUsed) + Number(fileSize)).toFixed(2)
    progress = ((Number(_memoryUsed) / (Number(_memoryUsed) + Number(_memoryLeft))) * 100);

    let i = 0;
    if (i === 0) {
        i = 1;
        let width = parseInt(progressbar);

        let id = setInterval(frame, 1);

        function frame() {
            if (width >= progress) {
                clearInterval(id);
                i = 0;
            } else {
                width = width + 0.05;
                change_element.style.width = width + "%";
            }
        }
    }
    window.sessionStorage.setItem("Used", _memoryUsed);
    window.sessionStorage.setItem("Left", _memoryLeft);
    window.sessionStorage.setItem("Progressbar", progress);
    checkStorage()

}

function ChooseFile() {
    let _memoryLeft = window.sessionStorage.getItem("Left");
    let _memoryUsed = window.sessionStorage.getItem("Used");

    let errors = [];
    let input = document.createElement('input');
    const regex = new RegExp("(.*?)\.(png|jpg|jpeg|gif|PNG)$")
    input.type = 'file';
    input.multiple = true;

    input.onchange = _ => {
        let files =   Array.from(input.files);
        let isValidSize = true;
        let isValidType = true;
        let wrongSize = [];
        let wrongType = [];
        let totalSize = 0;


        for (let index = 0; index < files.length; ++index) {
            let filesize = (files[index].size / (1024*1024));
            if (filesize.size > _memoryLeft) {
                isValidSize = false;
                wrongSize.push(files[index].name)
            }
            else{totalSize = totalSize + filesize;}

            if (!(regex.test(files[index].name))) {
                isValidType = false;
                wrongType.push(files[index].name);
            }
        }
        if(isValidSize === false)
        {
            errors.push(invalidFileSize + wrongSize.join('<br>'));
        }
        else if(totalSize > _memoryLeft)
        {errors.push(invalidTotalSize);}

        if(isValidType === false)
        {errors.push(invalidFileType + wrongType.join('<br>'));}

        if (errors.length > 0) {
            popupModal(errors.join('<br>'));
        }

        if (errors.length === 0) {
            let progress = ((Number(_memoryUsed) / (Number(_memoryUsed) + Number(_memoryLeft))) * 100);
            window.sessionStorage.setItem("Progress", progress);
            progressBarUpdate(totalSize);
        }
        errors = []
    };
    input.click();

}