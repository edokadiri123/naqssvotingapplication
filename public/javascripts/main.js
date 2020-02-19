var escapeHtml = function(string){
    var escape_map = {
        '&' : '&amp;',
        '<' : '&lt;',
        '>' : '&gt;',
        '"' : '&quot;',
        "'" : '&quot;',
        "/" : '&#x2F;'
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, function(match){
        return escape_map[match];
    })
};

var dataReceived;

$(document).ready(function(){
    //start of upload form action
    $(".inputDiv").click(function(){
        $("#pickImgs").click();
    });
    $("#pickImgs").change(function(){
        $(".inputDiv").off("click");
        var files = $(this)[0].files;
        var numberOfImages = files.length;

        if (numberOfImages === 1)
            $(".report").text("You selected " + numberOfImages + " image.");
        if (numberOfImages > 1)
            $(".report").text("You selected " + numberOfImages + " images.");
    });


    // Start of setup form action
    var candidatesNumbers = [];
    $('#submitNumber').on("click", function(e){
        e.preventDefault();

        var pre = $("#presi").val(), vp = $("#vpresi").val(), gs = $("#genSec").val();
        var fs = $("#finSec").val(), doso = $("#doso").val(), dosp = $("#dosp").val();
        var ags = $("#ags").val(), trea = $("#trea").val(), pro = $("#pro").val(), lib = $("#lib").val();

        candidatesNumbers.push(pre);
        candidatesNumbers.push(vp);
        candidatesNumbers.push(gs);
        candidatesNumbers.push(fs);
        candidatesNumbers.push(doso);
        candidatesNumbers.push(dosp);
        candidatesNumbers.push(ags);
        candidatesNumbers.push(trea);
        candidatesNumbers.push(pro);
        candidatesNumbers.push(lib);
        
        for(x; x<candidatesNumbers.length; x++){
            var pass = [];
        
            if(candidatesNumbers[x] === ""){
                $(".errorInfo").eq(x).addClass("error");  
                
                if((x===(candidatesNumbers.length-1)) && (pass.length < candidatesNumbers.length)){
                    
                }
            }else{
                if (pass.length < candidatesNumbers.length){

                }
                if(pass.length === candidatesNumbers.length){
                    $('#setupForm').submit(function(){
                        return true;
                    })
                }
            }
        }
        
   });//end of setup Form submit function

   // S T A R T    O F    D E T A I L S     F O R M     A C T I O N

   $('#detailsForm').submit(function(){
        var name = $("#noc").val();
        var position = $("#poc").val();

        if ((position === "Default") || (name === "")) return false;
        else{
            var name = escapeHtml(name);

            $("#noc").val(name);

            return true;
        }
   });

   var url = "http://localhost:3000/details";
   if(document.URL === url){
    var eachDetail = '', allDetails = [], $detailsSummaryDiv = $('.detailsSummaryDiv');

        $.ajax('/candidatesAdded', {
            dataType: 'json',
        error: function(){
            console.log('This is an error');
        },
        success: function(data){
            console.log('success');
                if (data.length > 0){
                    if (data.status && data.status === 'error'){
                        eachDetail = '<span> Error: ' + data.error + '</span>';
                    }else {
                        var lenOfDetails = data.length;
                        eachDetail = "<div class='eachCandidate'><div class='candidateName'>Name Of Candidate</div><div class='candidatePosition'>Position Contesting For</div><div class='candidateVotes'>Votes for Candidate</div></div>";
                        allDetails.push(eachDetail);
                        for (var y = 0; y < lenOfDetails; y++){
                            eachDetail = "<div class='eachCandidate'>" +
                                "<div class='candidateName'>" + data[y].name + "</div>   " +
                                "<div class='candidatePosition'>" + data[y].position + "</div>" +
                                "<div class='candidateVotes'>" + data[y].votes + "</div>" 
                            + "</div>";
                            allDetails.push(eachDetail);
                        };
                        if(lenOfDetails === 1){
                            eachDetail = allDetails.toString();
                        }else{
                            eachDetail = allDetails.join('').toString();
                        }
                    }
                }else {
                    eachDetail = '';
                }
                $detailsSummaryDiv.html(eachDetail);
                var isThereContent = $(".detailsSummaryDiv").text();
                console.log(isThereContent);

                var proceedAter = $(".endAddingCandidates");

                if (isThereContent.length > 0){
                    proceedAter.css("display", 'block');
                }

            }//end of success
        }); //end of ajax call
   }
   // E N D    O F    D E T A I L S     F O R M     A C T I O N
   // S T A R T    O F    S U M M A R Y    P A G E     A C T I O N
   var callAjax = function(){
        $.ajax(ajaxURLs[x], {
            dataType: 'json',
        error: function(){
            console.log('This is an error');
        },
        success: function(data){
            dataReceived = data;
            console.log(dataReceived);
            console.log('success for using ajaxurls array');
                if (data.length > 0){
                    if (data.status && data.status === 'error'){
                        eachSummary = '<span> Error: ' + data.error + '</span>';
                    }else {
                        var lenOfDetails = dataReceived.length;
                        eachSummary = "<div class='currentPosition'>" + dataReceived[0].position + "</div>";
                        for (var y = 0; y < lenOfDetails; y++){
                            
                             allSummary.push(eachSummary);
                        };
                        if(lenOfDetails === 1){
                            eachSummary = allSummary.toString();
                        }else{
                            eachSummary = allSummary.join('').toString();
                        }
                    }
                }else {
                    eachSummary = '';
                }
                $candidatesSummaryDiv.html(eachSummary);
                
            }//end of success
        }); //end of ajax call
    }
    

   var url = "http://localhost:3000/summary";
   if(document.URL === url){
        var x = 0;
        alert(x);

        var $prev = $("#previous"), $next = $("#next");

        var eachSummary = '', allSummary = [], $candidatesSummaryDiv = $('.summaryOfCandidates');
        var ajaxURLs = ['/ps','/vps','/gs','/ags','/fs', '/trea', '/pro', '/lib', '/doso', '/dosp'];

        callAjax();

        $prev.on('click', function(){
            if (x >= 0){
                callAjax();
                x -= 1;
                alert(x);
                return x
            }
            if(x < 0){
                callAjax();
                x = (ajaxURLs.length - 1);
                alert(x);
                return x;
            }
        });
        $next.on('click', function(){
            if (x === ajaxURLs.length){
                callAjax();
                x = 0;
                alert(x);
                return x
             }
            if(x < ajaxURLs.length){
                callAjax();
                x += 1;
                alert(x);
                return x;
            }
        });
    }   // E N D    O F    S U M M A R Y    P A G E     A C T I O N
    
});//end of document dot ready function