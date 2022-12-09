function checkLocal() {
    let _memoryLeft;
    let _memoryUsed;
    let progressbar;
    const change_element = document.querySelector('.progress-bar')

    if (!window.sessionStorage.getItem("Used")) {
        clearStorage()
    }
    else {
        _memoryUsed = window.sessionStorage.getItem("Used");
        _memoryLeft = window.sessionStorage.getItem("Left");
        progressbar = window.sessionStorage.getItem("Progress");
        document.getElementById("memory_left").innerHTML = _memoryLeft;
        document.getElementById("memory_used").innerHTML = _memoryUsed + " MB";
        change_element.style.width = progressbar + "%";
    }
}

function clearStorage(){
    localStorage.clear();
    sessionStorage.clear();
    window.sessionStorage.setItem("Left", "10");
    window.sessionStorage.setItem("Used", "0");
    window.sessionStorage.setItem("Progress", "0");
    const change_element = document.querySelector('.progress-bar')

    document.getElementById("memory_left").innerHTML = window.sessionStorage.getItem("Left");
    document.getElementById("memory_used").innerHTML = window.sessionStorage.getItem("Used") + " MB";
    change_element.style.width = window.sessionStorage.getItem("Progress") + "%";

}

function ChooseFile() {
    let _memoryLeft = window.sessionStorage.getItem("Left");
    let _memoryUsed = window.sessionStorage.getItem("Used");
    let progressbar = window.sessionStorage.getItem("Progress");
    const change_element = document.querySelector('.progress-bar')

    let errors = [];
    let progress;
    let input = document.createElement('input');
    let regex = new RegExp("(.*?)\.(png|jpg|jpeg|gif|PNG)$")
    input.type = 'file';

    input.onchange = _ => {
        // you can use this method to get file and perform respective operations
        let files =   Array.from(input.files);
        let fileSize = (files[0].size / (1024*1024));
        if (!(regex.test(files[0].name))) {
            errors.push('Only image files are supported. Please check the format of your file and try again.');
        }

        if (fileSize > _memoryLeft) {
            errors.push('file size must be less than', _memoryLeft);
        }

        if (errors.length > 0) {
            alert(errors.join('\r\n'));
        }

        if (errors.length === 0) {
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
            document.getElementById("memory_left").innerHTML = _memoryLeft;
            document.getElementById("memory_used").innerHTML = _memoryUsed + " MB";


            window.sessionStorage.setItem("Used", _memoryUsed);
            window.sessionStorage.setItem("Left", _memoryLeft);
            window.sessionStorage.setItem("Progress", progress);
        }
        errors = []
    };
    input.click();

}