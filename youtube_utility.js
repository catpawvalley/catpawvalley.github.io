document.addEventListener("DOMContentLoaded", function() {
    const createFileBtn = document.getElementById("createFileBtn");
    const addTubeBthn = document.getElementById("addBtn");
    const container  = document.getElementById("image-list");
    const filterBtn = document.getElementById("filter_btn");
    const removeBtn = document.getElementById("removeBtn");

    createFileBtn.addEventListener("click", function() {
        
        var nodes = Array.from(container.children);
        if(container.children.length > 0){
            var extract = '';
            nodes.forEach(function(childElement, index) {
                if(index === nodes.length - 1){
                    extract += childElement.getAttribute('href');
                }else{
                    extract += childElement.getAttribute('href') + "\n";
                }
            });
        }
        createTextFile("youtube_export.txt", extract);
    });

    addTubeBthn.addEventListener("click", function() {
        var sourceBox = document.getElementById("textbox");
        var text = sourceBox.value;
        if(text.indexOf("www.youtube.com") == -1 & text.indexOf("youtu.be") == -1)
            return;
        clearDuplicates(text);
        // Create a new image element
        const img = document.createElement('img');
        const a_ele = document.createElement('a');

        // Set the source of the image to the URL
        let string_final;
        if(string_final = videoID(text, false) )
            img.src = "https://img.youtube.com/vi/"+string_final+"/hqdefault.jpg";
        else
            return;
        clearDuplicates(string_final);
        img.setAttribute("title", text);
        a_ele.setAttribute("href", text);
        a_ele.appendChild(img);
        container.insertBefore(a_ele, container.firstChild);
        sourceBox.value = "";
    });

    filterBtn.addEventListener("click", function(){
        var sourceBox = document.getElementById("filter_text");
        var text = sourceBox.value;
        if(text.indexOf("www.youtube.com") == -1 & text.indexOf("youtu.be") == -1)
            return;
        const img = document.createElement('img');
        const a_ele = document.createElement('a');
        let string_final;
        if(string_final = videoID(text, true) )
            img.src = "https://img.youtube.com/vi/"+string_final+"/hqdefault.jpg";
        else
            return;
        clearDuplicates(string_final);
        if(text.indexOf("youtu.be") != -1)
            text = "https://youtu.be/"+string_final;
        else
            text = "https://www.youtube.com/watch?v="+string_final;
        img.setAttribute("title", text);
        a_ele.setAttribute("href", text);
        a_ele.appendChild(img);
        container.insertBefore(a_ele, container.firstChild);
        sourceBox.value = "";
    });

    removeBtn.addEventListener("click", function(){
        var sourceBox = document.getElementById("remove_box");
        clearDuplicates(videoID(sourceBox.value) );
        sourceBox.value = "";
    });

    function createTextFile(filename, content) {
        const data = new Blob([content], { type: 'text/plain' });

        const a = document.createElement('a');
        a.href = URL.createObjectURL(data);
        a.download = filename;
        a.click();
    }

    function clearDuplicates(target){
        if(!target)
            return;
        if(container.children.length == 0)
            return;
        var nodes = Array.from(container.children);
        nodes.forEach(function(childElement) {
            if(target === childElement.getAttribute('href') || childElement.getAttribute('href').indexOf(target) != -1 )
                container.removeChild(childElement);
        });
    }

    function videoID(link){
        //whenever you use this method, make sure you test if it is null first
        if(link.indexOf("www.youtube.com") == -1 & link.indexOf("youtu.be") == -1)
            return null;
        let start = 0;
        let end = 0;
        let result;
        if(link.indexOf("youtu.be") != -1){
            start = link.indexOf(".be/") + 4;
            if(link.indexOf('?') != -1 )
                end = link.indexOf("?");
            else
                end = -1;
        }
        else{
            start = link.indexOf("watch?v=") + 8;
            if(link.indexOf('&') != -1)
                end = link.indexOf("&");
            else
                end = -1;
        }
        if(end != -1)
            result = link.substring(start, end);
        else
            result = link.substring(start);
        return result;
    }



});