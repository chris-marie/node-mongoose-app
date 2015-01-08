document.addEventListener('DOMContentLoaded', function () {

    document.forms.create_event.addEventListener('submit', function (event) {

        event.preventDefault();

        var jsonObject = {
            title: this.title.value,
            timestamp: this.timestamp.value,
            location: this.location.value
        };

        console.log(jsonObject);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/events');
        xhr.setRequestHeader('accept', 'application/json');
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.addEventListener('readystatechange', function () {
            if( xhr.readyState === 4 && xhr.status === 200 ) {
                var obj = JSON.parse(xhr.responseText);
                console.log(obj);
            }
        });
        xhr.send(JSON.stringify(jsonObject));

    });

});
