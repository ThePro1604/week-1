function ChooseFile() {
    let input = document.createElement('input');
    let regex = new RegExp("(.*?)\.(png|jpg|jpeg|gif|PNG)$")
    input.type = 'file';
    let _memoryLeft = document.getElementById("memory_left").innerHTML;
    let _memoryUsed = document.getElementById("memory_used").innerHTML;
    let element = document.getElementById("progressbar");
    const change_element = document.querySelector('.progress-bar')
    progressbar = parseInt(element.style.width);
    let errors = [];
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
            document.getElementById("memory_used").innerHTML = _memoryUsed;


            let memory_detail = {"Used": _memoryUsed, "Left": _memoryLeft, "Progress": progress};

            // Trying to save to json the changed values

            // const fs = require('fs');
            //
            // fs.writeFile ("memory.json", JSON.stringify(memory_detail), function(err) {
            //         if (err) throw err;
            //         console.log('complete');
            //     }
            // );

        }
        errors = []
    };
    input.click();

}