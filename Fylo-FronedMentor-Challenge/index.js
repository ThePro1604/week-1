function ChooseFile() {
    let input = document.createElement('input');
    let regex = new RegExp("(.*?)\.(png|jpg|jpeg|gif)$")
    input.type = 'file';
    let errors = [];
    input.onchange = _ => {
        // you can use this method to get file and perform respective operations
        let files =   Array.from(input.files);
        let fileSize = files[0].size
        console.log(fileSize.toString().substring(0,6))
        console.log(files[0].name)
        if (!(regex.test(files[0].name))) {
            errors.push('Only image files are supported. Please check the format of your file and try again.');
        }

        if (fileSize > 500) {
            errors.push('file size must be less than 500');
        }

        if (errors.length > 0) {
            alert(errors.join('\r\n'));
        }
    };
    input.click();

}

// var fileSize = file.size / 1024 / 1024,
//     regex = new RegExp("(.*?)\.(png|jpg|jpeg|gif)$"),
//     errors = [];
//
// if (fileSize > 5) {
//     errors.push("Please check the size of your image");
// }
// if (!(regex.test(val))) {
//     errors.push('Only image files are supported. Please check the format of your file and try again.');
// }
// if (errors.length > 0) {
//     $(this).val('');
//     alert(errors.join('\r\n'));
// }
